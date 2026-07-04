import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/promo-BoiVO0El.js
var PROMOS = {
	VELORE10: 10,
	LUXE20: 20,
	NOIR15: 15
};
var validatePromo_createServerFn_handler = createServerRpc({
	id: "fbb2a54a643ebfc9696d034a65d9e40a0bcfd593ca667af15edf6afe23a9172c",
	name: "validatePromo",
	filename: "src/lib/promo.ts"
}, (opts) => validatePromo.__executeServer(opts));
var validatePromo = createServerFn().validator((code) => code.trim().toUpperCase()).handler(validatePromo_createServerFn_handler, async ({ data: code }) => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	if (PROMOS[code]) return {
		success: true,
		pct: PROMOS[code],
		code
	};
	return {
		success: false,
		error: "رمز الخصم غير صحيح أو منتهي الصلاحية"
	};
});
//#endregion
export { validatePromo_createServerFn_handler };
