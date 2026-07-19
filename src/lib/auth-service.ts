import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { db } from './db';
import { users, orders, orderItems, products, sessions, customProducts } from './db/schema';
import { eq, desc } from 'drizzle-orm';
import { appendOrderToSheet, updateProductStockInSheet, getOrderStatusesFromSheet } from './sheets';
import { pbkdf2Sync, randomBytes } from 'node:crypto';

// --- Rate Limiting ---
const rateLimit = new Map<string, { count: number; timestamp: number }>();
function isRateLimited(key: string): boolean {
  const now = Date.now();
  for (const [k, v] of rateLimit.entries()) {
    if (now - v.timestamp > 60000) rateLimit.delete(k);
  }
  const limit = rateLimit.get(key);
  if (limit) {
    if (limit.count > 5) return true;
    limit.count++;
  } else {
    rateLimit.set(key, { count: 1, timestamp: now });
  }
  return false;
}

// --- Auth Hashing & Session ---
function hashPassword(password: string, salt: string) {
  return pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

async function getUserIdFromSession(): Promise<string | null> {
  const sessionId = getCookie('velore_session');
  if (!sessionId) return null;
  const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
  if (!session || session.expiresAt.getTime() < Date.now()) return null;
  return session.userId;
}

// --- Auth Endpoints ---
export const loginUser = createServerFn()
  .validator((data: { email: string; password: string }) => {
    if (!data.email.includes('@') || data.password.length < 6) {
      throw new Error('Invalid input');
    }
    return data;
  })
  .handler(async ({ data }) => {
    if (isRateLimited(data.email)) return { success: false, error: 'Too many requests' };
    
    const user = await db.select().from(users).where(eq(users.email, data.email)).get();
    
    if (user) {
      const hashed = hashPassword(data.password, user.passwordSalt);
      if (user.passwordHash === hashed) {
        const sessionId = crypto.randomUUID();
        await db.insert(sessions).values({
          id: sessionId,
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        });
        setCookie('velore_session', sessionId, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7 });
        return { success: true, userId: user.id };
      }
    }
    return { success: false, error: 'بيانات الدخول غير صحيحة' };
  });

export const signupUser = createServerFn()
  .validator((data: { name?: string; email: string; password: string }) => {
    if (!data.email.includes('@') || data.password.length < 6) {
      throw new Error('Invalid input');
    }
    return data;
  })
  .handler(async ({ data }) => {
    if (isRateLimited(data.email)) return { success: false, error: 'Too many requests' };
    
    try {
      const id = Math.random().toString(36).substring(2, 8).toUpperCase();
      const salt = randomBytes(16).toString('hex');
      const hashed = hashPassword(data.password, salt);
      
      await db.insert(users).values({
        id,
        name: data.name || null,
        email: data.email,
        passwordHash: hashed,
        passwordSalt: salt,
        createdAt: new Date(),
      });

      try {
        const { appendUserToSheet } = await import('./sheets');
        await appendUserToSheet(data.name || '', id, data.email);
      } catch (webhookErr) {
        console.error("Google Sheets sync error:", webhookErr);
      }

      const sessionId = crypto.randomUUID();
      await db.insert(sessions).values({
        id: sessionId,
        userId: id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      });
      setCookie('velore_session', sessionId, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7 });
      return { success: true, userId: id };
    } catch (e) {
      return { success: false, error: 'البريد الإلكتروني مسجل بالفعل' };
    }
  });

// --- User Endpoints ---
export const getUserProfile = createServerFn().handler(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) return { success: false, error: 'غير مصرح' };

  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  if (!user) return { success: false, error: 'المستخدم غير موجود' };

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      governorate: user.governorate || '',
      city: user.city || '',
      district: user.district || '',
      street: user.street || '',
      building: user.building || '',
      role: user.role,
      createdAt: user.createdAt,
    },
  };
});

export const updateUserProfile = createServerFn()
  .validator((data: {
    name: string;
    phone: string;
    city: string;
    district: string;
    street: string;
    building: string;
  }) => data)
  .handler(async ({ data }) => {
    const userId = await getUserIdFromSession();
    if (!userId) return { success: false, error: 'غير مصرح' };

    if (data.name && data.name.trim().length < 3) {
      return { success: false, error: 'يجب أن يتكون الاسم من 3 أحرف على الأقل' };
    }

    await db.update(users)
      .set({
        name: data.name,
        phone: data.phone,
        city: data.city,
        district: data.district,
        street: data.street,
        building: data.building,
      })
      .where(eq(users.id, userId));

    return { success: true };
  });

export const getUserOrders = createServerFn().handler(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) return { success: false, error: 'غير مصرح' };

  try {
    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt))
      .all();

      // Sync statuses from Google Sheets before returning
      try {
        const sheetStatuses = await getOrderStatusesFromSheet();
        for (const order of userOrders) {
          const sheetStatus = sheetStatuses[order.id];
          // Only update if the sheet has a valid status and it's different
          if (sheetStatus && sheetStatus !== order.status) {
            // If the user typed Arabic, map it back to English enum for DB, or we can just accept Arabic.
            // Let's assume the user types: pending, processing, shipped, delivered, cancelled
            // OR Arabic versions: معلق, قيد المعالجة, تم الشحن, تم التوصيل, ملغي
            let normalizedStatus = sheetStatus;
            if (sheetStatus === 'معلق') normalizedStatus = 'pending';
            else if (sheetStatus === 'قيد المعالجة') normalizedStatus = 'processing';
            else if (sheetStatus === 'تم الشحن') normalizedStatus = 'shipped';
            else if (sheetStatus === 'تم التوصيل') normalizedStatus = 'delivered';
            else if (sheetStatus === 'ملغي') normalizedStatus = 'cancelled';
            
            await db.update(orders)
              .set({ status: normalizedStatus, updatedAt: new Date() })
              .where(eq(orders.id, order.id));
              
            order.status = normalizedStatus; // update the object in memory too
          }
        }
      } catch (e) {
        console.error('Failed to sync statuses from sheet:', e);
      }

    const ordersWithItems = [];
    for (const order of userOrders) {
      const items = await db.select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id))
        .all();
      ordersWithItems.push({
        ...order,
        items,
      });
    }

    return { success: true, orders: ordersWithItems };
  } catch (e) {
    console.error("Database query failed in getUserOrders:", e);
    return { success: false, error: 'خطأ في قاعدة البيانات' };
  }
});

export const createOrder = createServerFn()
  .validator((data: {
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
    }>;
    totalAmount: number;
    customerName: string;
    customerPhone: string;
    governorate: string;
    city: string;
    district: string;
    street: string;
    building?: string;
    notes?: string;
    paymentMethod: 'cod' | 'vodafone';
  }) => data)
  .handler(async ({ data }) => {
    if (isRateLimited(data.customerPhone)) return { success: false, error: 'لقد تجاوزت الحد الأقصى للطلبات، يرجى المحاولة لاحقاً' };
    const userId = (await getUserIdFromSession()) || 'guest';

    const orderId = crypto.randomUUID();
    const addressStr = `${data.building ? data.building + '، ' : ''}${data.street}، ${data.district}، ${data.city}، ${data.governorate} (هاتف: ${data.customerPhone})`;

    let dbSuccess = true;

    // Secure Order Validation: server-side price calculation and size constraints
    if (data.items.length > 20) {
      return { success: false, error: 'تجاوزت الحد الأقصى للمنتجات في الطلب الواحد' };
    }

    let serverTotalAmount = 0;
    const { PRODUCTS } = await import('./inventory');

    for (const item of data.items) {
      if (item.productId.startsWith('cp_')) {
        const cp = await db.select().from(customProducts).where(eq(customProducts.id, item.productId)).get();
        if (!cp) return { success: false, error: `المنتج غير موجود: ${item.productName}` };
        item.unitPrice = cp.price;
        item.productName = cp.name;
      } else {
        const std = PRODUCTS.find(p => p.id === item.productId);
        if (!std) return { success: false, error: `المنتج غير موجود: ${item.productName}` };
        item.unitPrice = std.price;
        item.productName = std.name;
      }
      serverTotalAmount += item.unitPrice * item.quantity;
    }
    
    data.totalAmount = serverTotalAmount;

    try {
      await db.transaction(async (tx) => {
        // Update user profile info so it is prefilled next time (only if logged in)
        if (userId !== 'guest') {
          await tx.update(users)
            .set({
              name: data.customerName,
              phone: data.customerPhone,
              governorate: data.governorate,
              city: data.city,
              district: data.district,
              street: data.street,
              building: data.building || null,
            })
            .where(eq(users.id, userId));
        } else {
          // Ensure guest user exists in the DB to satisfy foreign key constraints
          const guestExists = await tx.select({ id: users.id }).from(users).where(eq(users.id, 'guest')).get();
          if (!guestExists) {
            await tx.insert(users).values({
              id: 'guest',
              name: 'Guest User',
              email: `guest_${crypto.randomUUID()}@aroma-glow.com`, // Ensure uniqueness if needed, though 'guest' id is primary
              passwordHash: 'none',
              passwordSalt: 'none',
              createdAt: new Date(),
            }).onConflictDoNothing();
          }
        }

        // Insert the order
        await tx.insert(orders).values({
          id: orderId,
          userId,
          status: 'pending',
          totalAmount: data.totalAmount,
          shippingAddress: addressStr,
          notes: data.notes || null,
          paymentMethod: data.paymentMethod,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        for (const item of data.items) {
          let current = await tx.select({ stock: products.stock })
            .from(products)
            .where(eq(products.id, item.productId))
            .get();

          if (!current) {
            // Seed the product in the database with default stock if it doesn't exist
            await tx.insert(products).values({
              id: item.productId,
              stock: 100
            });
            current = { stock: 100 };
          }
          if (current.stock < item.quantity) {
            throw new Error(`كمية غير متوفرة للمنتج: ${item.productName}`);
          }

          await tx.insert(orderItems).values({
            id: crypto.randomUUID(),
            orderId,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          });

          await tx.update(products)
            .set({ stock: current.stock - item.quantity })
            .where(eq(products.id, item.productId));
            
          // Update Google Sheets synchronously to avoid race condition with getAllStocks
          try {
            await updateProductStockInSheet(item.productId, item.productName, current.stock - item.quantity);
          } catch (err) {
            console.error("Failed to update stock in Google Sheets:", err);
          }
        }
      });
    } catch (e: any) {
      console.error("Database transaction failed during order creation:", e);
      // In production (Vercel) or read-only database, proceed with Sheets/Telegram fallback
      const isReadOnlyDb = e.message?.includes('READONLY') || e.message?.includes('readonly') || e.message?.includes('Read-only');
      if (isReadOnlyDb || process.env.NODE_ENV === 'production') {
        dbSuccess = false;
        console.warn("Proceeding with Google Sheets & Telegram notification fallback...");
      } else {
        return { success: false, error: e.message || 'حدث خطأ أثناء إنشاء الطلب' };
      }
    }

    // Send Telegram Notification
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (botToken && chatId) {
        const paymentLabel = data.paymentMethod === 'vodafone' ? 'فودافون كاش' : 'الدفع عند الاستلام';
        const dateStr = new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });
        
        const itemsList = data.items.map(i => `▪️ ${i.productName} (العدد: ${i.quantity})`).join('\n');
        const message = `🛍️ <b>طلب جديد!</b>\n` +
          `🔢 <b>رقم الطلب:</b> <code>${orderId.slice(0, 8)}</code>\n` +
          `🕒 <b>الوقت:</b> ${dateStr}\n\n` +
          `👤 <b>أسم العميل:</b> ${data.customerName}\n` +
          `📞 <b>رقم الهاتف:</b> <code>${data.customerPhone}</code>\n` +
          `💳 <b>طريقة الدفع:</b> ${paymentLabel}\n\n` +
          `📦 <b>المنتجات:</b>\n${itemsList}\n\n` +
          `📍 <b>العنوان بالتفصيل:</b>\n` +
          `المحافظة: ${data.governorate}\n` +
          `المدينة: ${data.city}\n` +
          `المنطقة/الحي: ${data.district}\n` +
          `الشارع: ${data.street} ${data.building ? ' - مبنى: ' + data.building : ''}\n\n` +
          (data.notes ? `📝 <b>ملاحظات:</b>\n${data.notes}\n\n` : '') +
          `💰 <b>إجمالي الطلب:</b> ${data.totalAmount} ج.م`;
        
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
          })
        });
      }
    } catch (telegramError) {
      console.error("Failed to send telegram notification:", telegramError);
      // We don't fail the order if the notification fails
    }

    // Append to Google Sheets for Admin tracking
    const productsString = data.items.map(item => `${item.productName} (x${item.quantity})`).join('\n');
    await appendOrderToSheet({
      id: orderId,
      date: new Date().toLocaleString('ar-EG'),
      customerName: data.customerName,
      phone: data.customerPhone,
      address: addressStr,
      products: productsString,
      total: data.totalAmount,
      notes: data.notes || '',
      status: 'pending' // will display as "معلق" initially in sheets, you can change it to pending, processing, shipped, delivered, cancelled in the sheet
    });

    let redirectUrl: string | undefined;

    if (data.paymentMethod === 'vodafone') {
      try {
        const { authenticatePaymob, registerPaymobOrder, getPaymentKey, requestWalletPayment } = await import('./paymob-service');
        const authToken = await authenticatePaymob();
        
        // Convert to cents
        const amountCents = Math.round(data.totalAmount * 100);
        
        const paymobOrderId = await registerPaymobOrder(authToken, orderId, amountCents);
        
        const paymentKey = await getPaymentKey(
          authToken,
          paymobOrderId,
          amountCents,
          {
            first_name: data.customerName.split(' ')[0] || "Customer",
            last_name: data.customerName.split(' ').slice(1).join(' ') || "Name",
            email: "customer@velore.com", 
            phone_number: data.customerPhone,
            city: data.city,
            street: data.street,
            building: data.building || "NA",
            country: "EG",
          }
        );

        redirectUrl = await requestWalletPayment(paymentKey, data.customerPhone);
      } catch (err: any) {
        console.error("Paymob initialization failed:", err);
        return { success: false, error: err.message || "فشل في تهيئة بوابة الدفع، يرجى المحاولة لاحقاً" };
      }
    }

    return { success: true, orderId, redirectUrl };
  });

export const getAdminStats = createServerFn().handler(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) return { success: false, error: 'غير مصرح' };
  
  try {
    const user = await db.select().from(users).where(eq(users.id, userId)).get();
    if (!user || user.role !== 'admin') {
      return { success: false, error: 'غير مصرح - للمسؤولين فقط' };
    }

    // Aggregate stats
    const allOrders = await db.select().from(orders).all();
    const totalRevenue = allOrders
      .filter(o => o.status === 'delivered') // only count delivered orders for revenue
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const totalOrders = allOrders.length;
    const pendingOrders = allOrders.filter(o => o.status === 'pending').length;

    // Stock alerts
    const lowStockItems = await db.select().from(products).all();
    const { PRODUCTS } = await import('./inventory');
    const alertItems = lowStockItems
      .filter(p => p.stock <= 5)
      .map(p => {
        const prodMeta = PRODUCTS.find(meta => meta.id === p.id);
        return {
          id: p.id,
          name: prodMeta ? prodMeta.name : p.id,
          stock: p.stock
        };
      });

    return {
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        lowStockItems: alertItems
      }
    };
  } catch (e) {
    console.error("Database query failed in getAdminStats:", e);
    return {
      success: false,
      error: 'خطأ في قاعدة البيانات',
      stats: { totalRevenue: 0, totalOrders: 0, pendingOrders: 0, lowStockItems: [] }
    };
  }
});

export const getAdminOrders = createServerFn().handler(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) return { success: false, error: 'غير مصرح' };

  try {
    const user = await db.select().from(users).where(eq(users.id, userId)).get();
    if (!user || user.role !== 'admin') {
      return { success: false, error: 'غير مصرح - للمسؤولين فقط' };
    }

    // Sync statuses from Google Sheets before returning admin list
    try {
      const sheetStatuses = await getOrderStatusesFromSheet();
      const dbOrders = await db.select().from(orders).all();
      for (const order of dbOrders) {
        const sheetStatus = sheetStatuses[order.id];
        if (sheetStatus && sheetStatus !== order.status) {
          let normalizedStatus = sheetStatus;
          if (sheetStatus === 'معلق') normalizedStatus = 'pending';
          else if (sheetStatus === 'قيد المعالجة') normalizedStatus = 'processing';
          else if (sheetStatus === 'تم الشحن') normalizedStatus = 'shipped';
          else if (sheetStatus === 'تم التوصيل') normalizedStatus = 'delivered';
          else if (sheetStatus === 'ملغي') normalizedStatus = 'cancelled';
          
          await db.update(orders)
            .set({ status: normalizedStatus, updatedAt: new Date() })
            .where(eq(orders.id, order.id));
        }
      }
    } catch (e) {
      console.error('Failed to sync statuses from sheet for admin:', e);
    }

    const allOrders = await db.select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .all();

    const ordersWithItems = [];
    for (const order of allOrders) {
      const items = await db.select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id))
        .all();
      ordersWithItems.push({
        ...order,
        items,
      });
    }

    return { success: true, orders: ordersWithItems };
  } catch (e) {
    console.error("Database query failed in getAdminOrders:", e);
    return { success: false, error: 'خطأ في قاعدة البيانات', orders: [] };
  }
});

export const updateOrderStatus = createServerFn()
  .validator((data: { orderId: string; status: string }) => data)
  .handler(async ({ data }) => {
    const userId = await getUserIdFromSession();
    if (!userId) return { success: false, error: 'غير مصرح' };

    const user = await db.select().from(users).where(eq(users.id, userId)).get();
    if (!user || user.role !== 'admin') {
      return { success: false, error: 'غير مصرح - للمسؤولين فقط' };
    }

    try {
      // Update local SQLite
      await db.update(orders)
        .set({ status: data.status, updatedAt: new Date() })
        .where(eq(orders.id, data.orderId));

      // Update Google Sheets
      let arabicStatus = data.status;
      if (data.status === 'pending') arabicStatus = 'معلق';
      else if (data.status === 'processing') arabicStatus = 'قيد المعالجة';
      else if (data.status === 'shipped') arabicStatus = 'تم الشحن';
      else if (data.status === 'delivered') arabicStatus = 'تم التوصيل';
      else if (data.status === 'cancelled') arabicStatus = 'ملغي';

      try {
        const { updateOrderInSheet } = await import('./sheets');
        await updateOrderInSheet(data.orderId, arabicStatus);
      } catch (sheetsErr) {
        console.error("Sheets update error in updateOrderStatus:", sheetsErr);
      }

      return { success: true };
    } catch (e: any) {
      console.error(e);
      return { success: false, error: e.message || 'حدث خطأ أثناء التحديث' };
    }
  });
