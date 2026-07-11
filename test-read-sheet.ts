import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), 'google-credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = '11Fy4Pws8WQatKwYnEEtCoryXusMHCTX7CTxo9GFek6E';

async function run() {
  try {
    const res = await sheets.spreadsheets.get({ spreadsheetId });
    console.log('Sheets in spreadsheet:', res.data.sheets?.map(s => s.properties?.title));
    
    const valuesRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Inventory!A:C'
    });
    console.log('Values in Inventory:', valuesRes.data.values);
  } catch (err) {
    console.error('Error fetching sheet data:', err);
  }
}
run();
