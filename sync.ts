import { db } from './src/lib/db';
import { products } from './src/lib/db/schema';
import { syncInventoryToSheet } from './src/lib/sheets';
import { PRODUCTS } from './src/lib/inventory';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config();

async function run() {
  try {
    const list = [];
    for (const p of PRODUCTS) {
      let dbProd = await db.select().from(products).where(eq(products.id, p.id)).get();
      if (!dbProd) {
        // If not in db, insert it with 100 stock
        await db.insert(products).values({ id: p.id, stock: 100 });
        dbProd = { id: p.id, stock: 100 };
      }
      list.push({ id: p.id, name: p.name, stock: dbProd.stock });
    }
    
    console.log("Syncing to Google Sheets...");
    await syncInventoryToSheet(list);
    console.log("Sync complete!");
  } catch(e) {
    console.error(e);
  }
}

run();
