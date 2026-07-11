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
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: 'Inventory'
              }
            }
          }
        ]
      }
    });
    console.log('Added Inventory sheet');
  } catch (err) {
    console.log('Error or already exists:', err.message);
  }
}
run();
