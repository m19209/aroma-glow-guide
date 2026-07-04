import { r as createServerFn, s as setCookie$1 } from "./ssr.mjs";
import { o as eq } from "../_libs/drizzle-orm.mjs";
import { a as users, t as db } from "./db-WuMwiz6P.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BMzGjijJ.js
var rateLimit = /* @__PURE__ */ new Map();
function isRateLimited(key) {
	const now = Date.now();
	const limit = rateLimit.get(key);
	if (limit && now - limit.timestamp < 6e4) {
		if (limit.count > 5) return true;
		limit.count++;
	} else rateLimit.set(key, {
		count: 1,
		timestamp: now
	});
	return false;
}
async function hashPassword(password) {
	const msgUint8 = new TextEncoder().encode(password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var loginUser_createServerFn_handler = createServerRpc({
	id: "6c94d701ef22ff58d7a82ea654edf2cb08167b608dd3c9298c1b897db0e2c255",
	name: "loginUser",
	filename: "src/lib/auth.ts"
}, (opts) => loginUser.__executeServer(opts));
var loginUser = createServerFn().validator((data) => {
	if (!data.email.includes("@") || data.password.length < 4) throw new Error("Invalid input");
	return data;
}).handler(loginUser_createServerFn_handler, async ({ data }) => {
	if (isRateLimited(data.email)) return {
		success: false,
		error: "Too many requests"
	};
	const hashed = await hashPassword(data.password);
	const user = await db.select().from(users).where(eq(users.email, data.email)).get();
	if (user && user.passwordHash === hashed) {
		setCookie$1("velore_session", user.id, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
			maxAge: 3600 * 24 * 7
		});
		return {
			success: true,
			userId: user.id
		};
	}
	return {
		success: false,
		error: "بيانات الدخول غير صحيحة"
	};
});
var signupUser_createServerFn_handler = createServerRpc({
	id: "1324ede70119ed4bf81a9910fa6bb7eee7c397bfbcc908462e9030043955a6b6",
	name: "signupUser",
	filename: "src/lib/auth.ts"
}, (opts) => signupUser.__executeServer(opts));
var signupUser = createServerFn().validator((data) => {
	if (!data.email.includes("@") || data.password.length < 4) throw new Error("Invalid input");
	return data;
}).handler(signupUser_createServerFn_handler, async ({ data }) => {
	if (isRateLimited(data.email)) return {
		success: false,
		error: "Too many requests"
	};
	try {
		const id = Math.random().toString(36).substring(2, 8).toUpperCase();
		const hashed = await hashPassword(data.password);
		await db.insert(users).values({
			id,
			name: data.name || null,
			email: data.email,
			passwordHash: hashed,
			createdAt: /* @__PURE__ */ new Date()
		});
		try {
			const { appendUserToSheet } = await import("./sheets-DWhWRJmy.mjs");
			await appendUserToSheet(data.name || "", id, data.password, data.email);
		} catch (webhookErr) {
			console.error("Google Sheets sync error:", webhookErr);
		}
		setCookie$1("velore_session", id, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
			maxAge: 3600 * 24 * 7
		});
		return {
			success: true,
			userId: id
		};
	} catch (e) {
		return {
			success: false,
			error: "البريد الإلكتروني مسجل بالفعل"
		};
	}
});
//#endregion
export { loginUser_createServerFn_handler, signupUser_createServerFn_handler };
