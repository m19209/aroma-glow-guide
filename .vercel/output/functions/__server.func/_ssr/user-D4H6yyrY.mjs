import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-D4H6yyrY.js
var getUserProfile = createServerFn().handler(createSsrRpc("8502df2780c482f7d351114de990b19f98de6ba2180f7c755bf2ffd371a06c47"));
var updateUserProfile = createServerFn().validator((data) => data).handler(createSsrRpc("e99aaa654fe477e4457a0b5e55999725c47f8538ace0ba5f9dd703cee6c9fdfe"));
var getUserOrders = createServerFn().handler(createSsrRpc("ae5add63322d1c9fe087adf96fa1d67d7914de30b52914b40be479b9c4e54af3"));
var createOrder = createServerFn().validator((data) => data).handler(createSsrRpc("236ab82eec62e39a2df1f6067932ad8e4e84fb6987f03d333d8e92fc336d760c"));
//#endregion
export { updateUserProfile as i, getUserOrders as n, getUserProfile as r, createOrder as t };
