import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { db } from './db';
import { users, orders, orderItems, products } from './db/schema';
import { eq, desc } from 'drizzle-orm';

// --- Rate Limiting ---
const rateLimit = new Map<string, { count: number; timestamp: number }>();
function isRateLimited(key: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(key);
  if (limit && now - limit.timestamp < 60000) {
    if (limit.count > 5) return true;
    limit.count++;
  } else {
    rateLimit.set(key, { count: 1, timestamp: now });
  }
  return false;
}

// --- Auth Hashing ---
async function hashPassword(password: string) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Auth Endpoints ---
export const loginUser = createServerFn()
  .validator((data: { email: string; password: string }) => {
    if (!data.email.includes('@') || data.password.length < 4) {
      throw new Error('Invalid input');
    }
    return data;
  })
  .handler(async ({ data }) => {
    if (isRateLimited(data.email)) return { success: false, error: 'Too many requests' };
    
    const hashed = await hashPassword(data.password);
    const user = await db.select().from(users).where(eq(users.email, data.email)).get();
    
    if (user && user.passwordHash === hashed) {
      setCookie('velore_session', user.id, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7 });
      return { success: true, userId: user.id };
    }
    return { success: false, error: 'بيانات الدخول غير صحيحة' };
  });

export const signupUser = createServerFn()
  .validator((data: { name?: string; email: string; password: string }) => {
    if (!data.email.includes('@') || data.password.length < 4) {
      throw new Error('Invalid input');
    }
    return data;
  })
  .handler(async ({ data }) => {
    if (isRateLimited(data.email)) return { success: false, error: 'Too many requests' };
    
    try {
      const id = Math.random().toString(36).substring(2, 8).toUpperCase();
      const hashed = await hashPassword(data.password);
      
      await db.insert(users).values({
        id,
        name: data.name || null,
        email: data.email,
        passwordHash: hashed,
        createdAt: new Date(),
      });

      try {
        const { appendUserToSheet } = await import('./sheets');
        await appendUserToSheet(data.name || '', id, data.password, data.email);
      } catch (webhookErr) {
        console.error("Google Sheets sync error:", webhookErr);
      }

      setCookie('velore_session', id, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7 });
      return { success: true, userId: id };
    } catch (e) {
      return { success: false, error: 'البريد الإلكتروني مسجل بالفعل' };
    }
  });

// --- User Endpoints ---
export const getUserProfile = createServerFn().handler(async () => {
  const userId = getCookie('velore_session');
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
      city: user.city || '',
      district: user.district || '',
      street: user.street || '',
      building: user.building || '',
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
    const userId = getCookie('velore_session');
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
  const userId = getCookie('velore_session');
  if (!userId) return { success: false, error: 'غير مصرح' };

  const userOrders = await db.select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
    .all();

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
    shippingAddress: string;
  }) => data)
  .handler(async ({ data }) => {
    const userId = getCookie('velore_session');
    if (!userId) return { success: false, error: 'غير مصرح' };

    const orderId = crypto.randomUUID();

    try {
      await db.transaction(async (tx) => {
        await tx.insert(orders).values({
          id: orderId,
          userId,
          status: 'pending',
          totalAmount: data.totalAmount,
          shippingAddress: data.shippingAddress,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        for (const item of data.items) {
          const current = await tx.select({ stock: products.stock })
            .from(products)
            .where(eq(products.id, item.productId))
            .get();

          if (!current) {
            throw new Error(`المنتج غير موجود: ${item.productName}`);
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
        }
      });
    } catch (e: any) {
      return { success: false, error: e.message || 'حدث خطأ أثناء إنشاء الطلب' };
    }

    return { success: true, orderId };
  });
