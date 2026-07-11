import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  phone: text('phone'),
  governorate: text('governorate'),
  city: text('city'),
  district: text('district'),
  street: text('street'),
  building: text('building'),
  role: text('role').notNull().default('user'), // 'user' | 'admin'
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  stock: integer('stock').notNull().default(0),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status').notNull().default('pending'), // pending | processing | shipped | delivered | cancelled
  totalAmount: integer('total_amount').notNull(),
  shippingAddress: text('shipping_address'),
  notes: text('notes'),
  paymentMethod: text('payment_method'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const orderItems = sqliteTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull(),
  productName: text('product_name').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: integer('unit_price').notNull(),
});
