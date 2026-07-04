import { db } from './src/lib/db';
import { products } from './src/lib/db/schema';

async function seed() {
  await db.insert(products).values([
    { id: 'p1', stock: 5 },
    { id: 'p2', stock: 12 },
    { id: 'p3', stock: 2 },
    { id: 'p4', stock: 8 },
    { id: 'p5', stock: 0 },
    { id: 'p6', stock: 15 },
    { id: 'p7', stock: 20 },
    { id: 'p8', stock: 4 },
    { id: 'p9', stock: 7 },
    { id: 'p10', stock: 10 },
  ]).onConflictDoNothing();
  
  console.log('Seeded products.');
}

seed().catch(console.error);
