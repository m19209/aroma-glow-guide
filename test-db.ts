import { createClient } from '@libsql/client';

async function main() {
  try {
    console.log("Trying default...");
    const c1 = createClient({ url: 'file:local.db' });
    const res1 = await c1.execute("SELECT * FROM custom_products LIMIT 1;");
    console.log("Default works!", res1.rows.length);
  } catch (e) {
    console.error("Default failed:", e);
  }
}
main();
