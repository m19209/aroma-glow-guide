import { A as redirect, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getUserOrders, r as getUserProfile } from "./user-D4H6yyrY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-X-aa9MV1.js
var $$splitComponentImporter = () => import("./account-BgKWmC0P.mjs");
var Route = createFileRoute("/account")({
	loader: async () => {
		const profileRes = await getUserProfile();
		if (!profileRes.success || !profileRes.user) throw redirect({
			to: "/",
			search: { loginRequired: true }
		});
		const ordersRes = await getUserOrders();
		return {
			user: profileRes.user,
			orders: ordersRes.orders || []
		};
	},
	head: () => ({ meta: [{ title: "حسابي الفاخر — VELORE" }, {
		name: "description",
		content: "إدارة معلومات الحساب وعناوين التوصيل وسجل الطلبات."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
