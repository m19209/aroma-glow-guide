import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZvhqV9j.js
var $$splitComponentImporter = () => import("./routes-DVQY_1Oi.mjs");
var Route = createFileRoute("/")({
	validateSearch: (search) => {
		return { loginRequired: search.loginRequired === "true" || search.loginRequired === true ? true : void 0 };
	},
	head: () => ({ meta: [
		{ title: "VELORE — Eau de Parfum" },
		{
			name: "description",
			content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية."
		},
		{
			property: "og:title",
			content: "VELORE — Eau de Parfum"
		},
		{
			property: "og:description",
			content: "Maison de Parfum — عطور فاخرة."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
