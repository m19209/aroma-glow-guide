import { getCookie } from '@tanstack/react-start/server';
import { db } from './db';
import { sessions } from './db/schema';
import { eq } from 'drizzle-orm';

export async function getUserIdFromSession(): Promise<string | null> {
  const sessionId = getCookie('velore_session');
  if (!sessionId) return null;
  const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
  if (!session || session.expiresAt.getTime() < Date.now()) return null;
  return session.userId;
}

export function normalizeOrderStatus(sheetStatus: string): string {
  if (sheetStatus === 'معلق') return 'pending';
  if (sheetStatus === 'قيد المعالجة') return 'processing';
  if (sheetStatus === 'تم الشحن') return 'shipped';
  if (sheetStatus === 'تم التوصيل') return 'delivered';
  if (sheetStatus === 'ملغي') return 'cancelled';
  return sheetStatus;
}

export function getArabicStatus(status: string): string {
  if (status === 'pending') return 'معلق';
  if (status === 'processing') return 'قيد المعالجة';
  if (status === 'shipped') return 'تم الشحن';
  if (status === 'delivered') return 'تم التوصيل';
  if (status === 'cancelled') return 'ملغي';
  return status;
}
