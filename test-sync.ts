import { db } from './src/lib/db';
import { products } from './src/lib/db/schema';
import { PRODUCTS } from './src/lib/inventory';
import { syncInventoryToSheet } from './src/lib/sheets';

async function run() {
  try {
    console.log('Syncing inventory directly...');
    const dbStocks = await db.select().from(products).all();
    const stockMap = dbStocks.reduce((acc, p) => {
      acc[p.id] = p.stock;
      return acc;
    }, {} as Record<string, number>);

    const productsList = PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      stock: stockMap[p.id] ?? 100 // default 100 if not in DB yet
    }));

    await syncInventoryToSheet(productsList);
    console.log('Sync complete!');
  } catch (err) {
    console.error('Failed to sync:', err);
  }
}

run();
