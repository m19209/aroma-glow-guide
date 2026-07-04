import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, h as Link, m as createRootRouteWithContext, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$1 } from "../_productId-DsaG5joi.mjs";
import { t as Route$2 } from "./account-X-aa9MV1.mjs";
import { t as Route$3 } from "./routes-DZvhqV9j.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BvsWbr7s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			display: "flex",
			minHeight: "100vh",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "#fdfbf7",
			padding: "1rem",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontSize: "4rem",
					color: "#1a1a1a",
					fontFamily: "Cinzel, serif"
				},
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "1.5rem",
					color: "#1a1a1a",
					marginTop: "1rem",
					fontFamily: "Cairo, sans-serif"
				},
				children: "الصفحة غير موجودة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: "2rem" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					style: {
						padding: "0.75rem 2rem",
						backgroundColor: "#1a1a1a",
						color: "#fff",
						textDecoration: "none",
						fontFamily: "Cairo, sans-serif"
					},
					children: "العودة للرئيسية"
				})
			})
		] })
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			display: "flex",
			minHeight: "100vh",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "#fdfbf7",
			padding: "1rem",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			style: {
				fontSize: "1.5rem",
				color: "#1a1a1a",
				fontFamily: "Cairo, sans-serif"
			},
			children: "عذراً، حدث خطأ ما"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				marginTop: "2rem",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				gap: "1rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					router.invalidate();
					reset();
				},
				style: {
					padding: "0.75rem 2rem",
					backgroundColor: "#1a1a1a",
					color: "#fff",
					border: "none",
					cursor: "pointer",
					fontFamily: "Cairo, sans-serif"
				},
				children: "حاول مرة أخرى"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				style: {
					padding: "0.75rem 2rem",
					backgroundColor: "transparent",
					color: "#1a1a1a",
					border: "1px solid #1a1a1a",
					textDecoration: "none",
					fontFamily: "Cairo, sans-serif"
				},
				children: "العودة للرئيسية"
			})]
		})] })
	});
}
var Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VELORE — Eau de Parfum" },
			{
				name: "description",
				content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية."
			},
			{
				name: "author",
				content: "VELORE Parfums"
			},
			{
				property: "og:title",
				content: "VELORE — Eau de Parfum"
			},
			{
				property: "og:description",
				content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@VELOREParfums"
			},
			{
				name: "twitter:title",
				content: "VELORE — Eau de Parfum"
			},
			{
				name: "twitter:description",
				content: "Maison de Parfum — عطور فاخرة مُستوحاة من أعمق اللحظات الإنسانية."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3292e5ed-6db8-48eb-b963-62ec9b70a9ec/id-preview-5616a25b--770eedcd-543e-461e-909b-b1086e89f1cf.lovable.app-1782734182741.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3292e5ed-6db8-48eb-b963-62ec9b70a9ec/id-preview-5616a25b--770eedcd-543e-461e-909b-b1086e89f1cf.lovable.app-1782734182741.png"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&family=Cairo:wght@300;400;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var AccountRoute = Route$2.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route
});
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route
	}),
	AccountRoute,
	ProductProductIdRoute: Route$1.update({
		id: "/product/$productId",
		path: "/product/$productId",
		getParentRoute: () => Route
	})
};
var routeTree = Route._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		basepath: "/",
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
