import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';
import { eq, desc } from 'drizzle-orm';
import { db } from './db';
import { users, customProducts } from './db/schema';
import type { Product, BottleKey } from './inventory';

async function getSessionUser() {
  const userId = getCookie('velore_session');
  if (!userId) return null;
  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  return user || null;
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function ensureAdminFlag(user: { id: string; email: string; role: string }) {
  if (user.role === 'admin') return true;
  if (adminEmails().includes(user.email.toLowerCase())) {
    await db.update(users).set({ role: 'admin' }).where(eq(users.id, user.id));
    return true;
  }
  // Bootstrap: if no admin exists yet, promote the first authenticated user.
  const existingAdmin = await db.select({ id: users.id }).from(users).where(eq(users.role, 'admin')).get();
  if (!existingAdmin) {
    await db.update(users).set({ role: 'admin' }).where(eq(users.id, user.id));
    return true;
  }
  return false;
}

export const checkAdmin = createServerFn().handler(async () => {
  const user = await getSessionUser();
  if (!user) return { isAdmin: false, loggedIn: false };
  const isAdmin = await ensureAdminFlag(user);
  return { isAdmin, loggedIn: true, email: user.email };
});

export const listCustomProducts = createServerFn().handler(async () => {
  try {
    const rows = await db.select().from(customProducts).orderBy(desc(customProducts.createdAt)).all();
    return rows.map(rowToProduct);
  } catch (e) {
    console.error("Database query failed in listCustomProducts, returning empty array:", e);
    return [];
  }
});

type ProductInput = {
  name: string;
  family: string;
  notes: string;
  price: number;
  oldPrice?: number | null;
  volume: string;
  badgeLabel?: string;
  badgeVariant?: string;
  bottle: string;
  label: string;
  concentration: string;
  longevity: string;
  sillage: string;
  occasion: string;
  gender: string;
  origin: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  story: string;
  imageData: string;
  stock: number;
};

export const createCustomProduct = createServerFn()
  .validator((data: ProductInput) => {
    if (!data.name || data.name.trim().length < 2) throw new Error('الاسم مطلوب');
    if (!data.imageData) throw new Error('الصورة مطلوبة');
    if (data.imageData.length > 2_500_000) throw new Error('حجم الصورة كبير جداً (الحد 2MB)');
    if (typeof data.price !== 'number' || data.price < 0) throw new Error('السعر غير صحيح');
    return data;
  })
  .handler(async ({ data }) => {
    const user = await getSessionUser();
    if (!user) return { success: false, error: 'غير مصرح' };
    const isAdmin = await ensureAdminFlag(user);
    if (!isAdmin) return { success: false, error: 'صلاحيات غير كافية' };

    const id = 'cp_' + Math.random().toString(36).slice(2, 10);
    await db.insert(customProducts).values({
      id,
      name: data.name,
      family: data.family || '',
      notes: data.notes || '',
      price: Math.round(data.price),
      oldPrice: data.oldPrice ? Math.round(data.oldPrice) : null,
      volume: data.volume || '50 ML',
      badgeLabel: data.badgeLabel || null,
      badgeVariant: data.badgeVariant || null,
      bottle: data.bottle || 'noir',
      label: data.label || data.name,
      concentration: data.concentration || '',
      longevity: data.longevity || '',
      sillage: data.sillage || '',
      occasion: data.occasion || '',
      gender: data.gender || '',
      origin: data.origin || '',
      topNotes: data.topNotes || '',
      heartNotes: data.heartNotes || '',
      baseNotes: data.baseNotes || '',
      story: data.story || '',
      imageData: data.imageData,
      stock: Math.max(0, Math.round(data.stock ?? 0)),
      createdAt: new Date(),
    });
    return { success: true, id };
  });

export const deleteCustomProduct = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const user = await getSessionUser();
    if (!user) return { success: false, error: 'غير مصرح' };
    const isAdmin = await ensureAdminFlag(user);
    if (!isAdmin) return { success: false, error: 'صلاحيات غير كافية' };
    await db.delete(customProducts).where(eq(customProducts.id, id));
    return { success: true };
  });

function rowToProduct(row: typeof customProducts.$inferSelect): Product & { imageData: string; isCustom: true } {
  return {
    id: row.id,
    name: row.name,
    family: row.family,
    notes: row.notes,
    price: row.price,
    oldPrice: row.oldPrice ?? undefined,
    volume: row.volume,
    badge: row.badgeLabel
      ? { label: row.badgeLabel, variant: (row.badgeVariant as 'new' | 'sale' | 'hot' | 'limited') || 'new' }
      : undefined,
    bottle: (row.bottle as BottleKey) || 'noir',
    label: row.label,
    concentration: row.concentration,
    longevity: row.longevity,
    sillage: row.sillage,
    occasion: row.occasion,
    gender: row.gender,
    origin: row.origin,
    topNotes: row.topNotes,
    heartNotes: row.heartNotes,
    baseNotes: row.baseNotes,
    story: row.story,
    imageData: row.imageData,
    isCustom: true,
  };
}
