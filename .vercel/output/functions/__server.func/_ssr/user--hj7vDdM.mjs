import { a as getCookie, r as createServerFn } from "./ssr.mjs";
import { a as desc, o as eq } from "../_libs/drizzle-orm.mjs";
import { a as users, i as products, n as orderItems, r as orders, t as db } from "./db-WuMwiz6P.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user--hj7vDdM.js
var getUserProfile_createServerFn_handler = createServerRpc({
	id: "8502df2780c482f7d351114de990b19f98de6ba2180f7c755bf2ffd371a06c47",
	name: "getUserProfile",
	filename: "src/lib/user.ts"
}, (opts) => getUserProfile.__executeServer(opts));
var getUserProfile = createServerFn().handler(getUserProfile_createServerFn_handler, async () => {
	const userId = getCookie("velore_session");
	if (!userId) return {
		success: false,
		error: "غير مصرح"
	};
	const user = await db.select().from(users).where(eq(users.id, userId)).get();
	if (!user) return {
		success: false,
		error: "المستخدم غير موجود"
	};
	return {
		success: true,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone || "",
			city: user.city || "",
			district: user.district || "",
			street: user.street || "",
			building: user.building || "",
			createdAt: user.createdAt
		}
	};
});
var updateUserProfile_createServerFn_handler = createServerRpc({
	id: "e99aaa654fe477e4457a0b5e55999725c47f8538ace0ba5f9dd703cee6c9fdfe",
	name: "updateUserProfile",
	filename: "src/lib/user.ts"
}, (opts) => updateUserProfile.__executeServer(opts));
var updateUserProfile = createServerFn().validator((data) => data).handler(updateUserProfile_createServerFn_handler, async ({ data }) => {
	const userId = getCookie("velore_session");
	if (!userId) return {
		success: false,
		error: "غير مصرح"
	};
	if (data.name && data.name.trim().length < 3) return {
		success: false,
		error: "يجب أن يتكون الاسم من 3 أحرف على الأقل"
	};
	await db.update(users).set({
		name: data.name,
		phone: data.phone,
		city: data.city,
		district: data.district,
		street: data.street,
		building: data.building
	}).where(eq(users.id, userId));
	return { success: true };
});
var getUserOrders_createServerFn_handler = createServerRpc({
	id: "ae5add63322d1c9fe087adf96fa1d67d7914de30b52914b40be479b9c4e54af3",
	name: "getUserOrders",
	filename: "src/lib/user.ts"
}, (opts) => getUserOrders.__executeServer(opts));
var getUserOrders = createServerFn().handler(getUserOrders_createServerFn_handler, async () => {
	const userId = getCookie("velore_session");
	if (!userId) return {
		success: false,
		error: "غير مصرح"
	};
	const userOrders = await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt)).all();
	const ordersWithItems = [];
	for (const order of userOrders) {
		const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id)).all();
		ordersWithItems.push({
			...order,
			items
		});
	}
	return {
		success: true,
		orders: ordersWithItems
	};
});
var createOrder_createServerFn_handler = createServerRpc({
	id: "236ab82eec62e39a2df1f6067932ad8e4e84fb6987f03d333d8e92fc336d760c",
	name: "createOrder",
	filename: "src/lib/user.ts"
}, (opts) => createOrder.__executeServer(opts));
var createOrder = createServerFn().validator((data) => data).handler(createOrder_createServerFn_handler, async ({ data }) => {
	const userId = getCookie("velore_session");
	if (!userId) return {
		success: false,
		error: "غير مصرح"
	};
	const orderId = crypto.randomUUID();
	try {
		await db.transaction(async (tx) => {
			await tx.insert(orders).values({
				id: orderId,
				userId,
				status: "pending",
				totalAmount: data.totalAmount,
				shippingAddress: data.shippingAddress,
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date()
			});
			for (const item of data.items) {
				const current = await tx.select({ stock: products.stock }).from(products).where(eq(products.id, item.productId)).get();
				if (!current) throw new Error(`المنتج غير موجود: ${item.productName}`);
				if (current.stock < item.quantity) throw new Error(`كمية غير متوفرة للمنتج: ${item.productName}`);
				await tx.insert(orderItems).values({
					id: crypto.randomUUID(),
					orderId,
					productId: item.productId,
					productName: item.productName,
					quantity: item.quantity,
					unitPrice: item.unitPrice
				});
				await tx.update(products).set({ stock: current.stock - item.quantity }).where(eq(products.id, item.productId));
			}
		});
	} catch (e) {
		return {
			success: false,
			error: e.message || "حدث خطأ أثناء إنشاء الطلب"
		};
	}
	return {
		success: true,
		orderId
	};
});
//#endregion
export { createOrder_createServerFn_handler, getUserOrders_createServerFn_handler, getUserProfile_createServerFn_handler, updateUserProfile_createServerFn_handler };
