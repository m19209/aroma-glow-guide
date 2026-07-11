import { db } from '../src/lib/db/index.ts';
import { users } from '../src/lib/db/schema.ts';

async function hashPassword(password: string) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function run() {
  const hashed = await hashPassword('velore123'); // Password is now velore123 (9 characters)
  
  await db.insert(users).values({
    id: 'admin_user_id_123',
    name: 'مدير النظام',
    email: 'admin@velore.com',
    passwordHash: hashed,
    createdAt: new Date(),
    role: 'admin'
  }).onConflictDoUpdate({
    target: users.email,
    set: { 
      role: 'admin',
      passwordHash: hashed
    }
  });
  console.log('Admin user updated with password velore123');
}

run();
