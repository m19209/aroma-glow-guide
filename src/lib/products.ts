import { createServerFn } from '@tanstack/react-start';
import { db } from './db';
import { products } from './db/schema';
import { eq } from 'drizzle-orm';

export const getProductStock = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const result = await db.select({ stock: products.stock }).from(products).where(eq(products.id, id)).get();
    return result?.stock ?? 0;
  });

export const getAllStocks = createServerFn()
  .handler(async () => {
    const result = await db.select().from(products).all();
    const stockMap = result.reduce((acc, p) => {
      acc[p.id] = p.stock;
      return acc;
    }, {} as Record<string, number>);
    return stockMap;
  });
