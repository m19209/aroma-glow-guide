import { n as PRODUCTS } from "./_ssr/product-data-BvAzUcIU.mjs";
import { N as notFound, f as lazyRouteComponent, p as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_productId-DsaG5joi.js
var $$splitComponentImporter = () => import("./_productId-CE06psSz.mjs");
var Route = createFileRoute("/product/$productId")({
	loader: async ({ params }) => {
		const product = PRODUCTS.find((p) => p.id === params.productId);
		if (!product) throw notFound();
		return product;
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: `${loaderData?.name} — VELORE` },
		{
			name: "description",
			content: loaderData?.story
		},
		{
			property: "og:title",
			content: `${loaderData?.name} — VELORE`
		},
		{
			property: "og:description",
			content: loaderData?.story
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
