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

export const customProducts = sqliteTable('custom_products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  family: text('family').notNull().default(''),
  notes: text('notes').notNull().default(''),
  price: integer('price').notNull().default(0),
  oldPrice: integer('old_price'),
  volume: text('volume').notNull().default('50 ML'),
  badgeLabel: text('badge_label'),
  badgeVariant: text('badge_variant'),
  bottle: text('bottle').notNull().default('noir'),
  label: text('label').notNull().default(''),
  concentration: text('concentration').notNull().default(''),
  longevity: text('longevity').notNull().default(''),
  sillage: text('sillage').notNull().default(''),
  occasion: text('occasion').notNull().default(''),
  gender: text('gender').notNull().default(''),
  origin: text('origin').notNull().default(''),
  topNotes: text('top_notes').notNull().default(''),
  heartNotes: text('heart_notes').notNull().default(''),
  baseNotes: text('base_notes').notNull().default(''),
  story: text('story').notNull().default(''),
  imageData: text('image_data').notNull().default(''),
  stock: integer('stock').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
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
