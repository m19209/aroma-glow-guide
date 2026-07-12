import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

let client: ReturnType<typeof createClient> | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

try {
  client = createClient({
    url: process.env.DATABASE_URL || 'file:local.db',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  dbInstance = drizzle(client, { schema });
} catch (e) {
  console.warn("Failed to initialize database client (likely read-only FS). Falling back to mock db.", e);
}

// Export a proxy that throws an error when any method is called if dbInstance is null
export const db = new Proxy({}, {
  get: (target, prop) => {
    if (dbInstance) {
      return (dbInstance as any)[prop];
    }
    throw new Error(`Database is not initialized. Failed to access db.${String(prop)}`);
  }
}) as ReturnType<typeof drizzle>;
