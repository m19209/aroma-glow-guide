import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';
import { db } from './db';
import { users, orders, orderItems, products } from './db/schema';
import { eq, desc } from 'drizzle-orm';

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

  // Fetch all orders
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
