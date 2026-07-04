import { t as require_build } from "../_libs/@googleapis/sheets.mjs";
import path from "path";
//#region node_modules/.nitro/vite/services/ssr/assets/sheets-DWhWRJmy.js
var import_build = require_build();
async function appendUserToSheet(name, id, passwordHash, email) {
	try {
		const sheetsClient = (0, import_build.sheets)({
			version: "v4",
			auth: await new import_build.auth.GoogleAuth({
				keyFile: path.join(process.cwd(), "google-credentials.json"),
				scopes: ["https://www.googleapis.com/auth/spreadsheets"]
			}).getClient()
		});
		const spreadsheetId = process.env.SPREADSHEET_ID;
		if (!spreadsheetId) {
			console.warn("SPREADSHEET_ID is not set in environment variables");
			return;
		}
		const date = (/* @__PURE__ */ new Date()).toLocaleString("ar-EG");
		await sheetsClient.spreadsheets.values.append({
			spreadsheetId,
			range: "'The Client Website information'!A:E",
			valueInputOption: "USER_ENTERED",
			requestBody: { values: [[
				name || "بدون اسم",
				id,
				passwordHash,
				email,
				date
			]] }
		});
	} catch (error) {
		console.error("Error appending to Google Sheet:", error);
	}
}
//#endregion
export { appendUserToSheet };
