import { t as createClient } from "../_libs/@libsql/client+[...].mjs";
import { i as integer, n as sqliteTable, r as text, t as drizzle } from "../_libs/drizzle-orm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-WuMwiz6P.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var schema_exports = /* @__PURE__ */ __exportAll({
	orderItems: () => orderItems,
	orders: () => orders,
	products: () => products,
	users: () => users
});
var users = sqliteTable("users", {
	id: text("id").primaryKey(),
	name: text("name"),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	phone: text("phone"),
	city: text("city"),
	district: text("district"),
	street: text("street"),
	building: text("building")
});
var products = sqliteTable("products", {
	id: text("id").primaryKey(),
	stock: integer("stock").notNull().default(0)
});
var orders = sqliteTable("orders", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
	status: text("status").notNull().default("pending"),
	totalAmount: integer("total_amount").notNull(),
	shippingAddress: text("shipping_address"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var orderItems = sqliteTable("order_items", {
	id: text("id").primaryKey(),
	orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
	productId: text("product_id").notNull(),
	productName: text("product_name").notNull(),
	quantity: integer("quantity").notNull(),
	unitPrice: integer("unit_price").notNull()
});
var db = drizzle(createClient({
	url: process.env.DATABASE_URL || "file:local.db",
	authToken: process.env.DATABASE_AUTH_TOKEN
}), { schema: schema_exports });
//#endregion
export { users as a, products as i, orderItems as n, orders as r, db as t };
