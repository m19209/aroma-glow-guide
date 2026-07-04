import { r as createServerFn } from "./ssr.mjs";
import { o as eq } from "../_libs/drizzle-orm.mjs";
import { i as products, t as db } from "./db-WuMwiz6P.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-BtnRV1b9.js
var getProductStock_createServerFn_handler = createServerRpc({
	id: "e5b907195aef7540a648d27816eab4b19303bcd5186980a1c6d76de5b1e755ef",
	name: "getProductStock",
	filename: "src/lib/products.ts"
}, (opts) => getProductStock.__executeServer(opts));
var getProductStock = createServerFn().validator((id) => id).handler(getProductStock_createServerFn_handler, async ({ data: id }) => {
	return (await db.select({ stock: products.stock }).from(products).where(eq(products.id, id)).get())?.stock ?? 0;
});
var getAllStocks_createServerFn_handler = createServerRpc({
	id: "c7a9d5a364ec753ebf3bec05c9570f525445f6960e1c5d91760c1cf17250718d",
	name: "getAllStocks",
	filename: "src/lib/products.ts"
}, (opts) => getAllStocks.__executeServer(opts));
var getAllStocks = createServerFn().handler(getAllStocks_createServerFn_handler, async () => {
	return (await db.select().from(products).all()).reduce((acc, p) => {
		acc[p.id] = p.stock;
		return acc;
	}, {});
});
//#endregion
export { getAllStocks_createServerFn_handler, getProductStock_createServerFn_handler };
