import { sheets, auth } from '@googleapis/sheets';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function run() {
  try {
    const googleAuth = new auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await googleAuth.getClient();
    const sheetsClient = sheets({ version: 'v4', auth: authClient as any });
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    const res = await sheetsClient.spreadsheets.get({
      spreadsheetId
    });
    
    const sheetTitles = res.data.sheets?.map(s => s.properties?.title);
    console.log("Current sheets:", sheetTitles);

    if (!sheetTitles?.includes("Inventory")) {
      console.log("Creating Inventory sheet...");
      await sheetsClient.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "Inventory"
                }
              }
            }
          ]
        }
      });
      console.log("Inventory sheet created.");
    }
  } catch (err) {
    console.error(err);
  }
}

run();
