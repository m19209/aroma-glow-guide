import { t as BOTTLE_IMAGES } from "./product-data-BvAzUcIU.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-C421Fslf.js
var import_jsx_runtime = require_jsx_runtime();
function Bottle({ variant, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		className: "pbottle",
		src: BOTTLE_IMAGES[variant],
		alt: label,
		loading: "lazy",
		width: 1024,
		height: 1024,
		style: {
			width: "100%",
			height: "100%",
			objectFit: "contain",
			display: "block"
		}
	});
}
createServerFn().validator((id) => id).handler(createSsrRpc("e5b907195aef7540a648d27816eab4b19303bcd5186980a1c6d76de5b1e755ef"));
var getAllStocks = createServerFn().handler(createSsrRpc("c7a9d5a364ec753ebf3bec05c9570f525445f6960e1c5d91760c1cf17250718d"));
//#endregion
export { getAllStocks as n, Bottle as t };
