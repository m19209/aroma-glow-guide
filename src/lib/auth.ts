import { createServerFn } from '@tanstack/react-start';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { setCookie } from '@tanstack/react-start/server';

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

async function hashPassword(password: string) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

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
      // Generate a shorter 6-character alphanumeric ID
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
