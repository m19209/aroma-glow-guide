import { sheets, auth } from '@googleapis/sheets';
import path from 'path';

export async function appendUserToSheet(name: string, id: string, passwordHash: string, email: string) {
  try {
    const googleAuth = new auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await googleAuth.getClient();
    const sheetsClient = sheets({ version: 'v4', auth: authClient });
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn('SPREADSHEET_ID is not set in environment variables');
      return;
    }

    const date = new Date().toLocaleString('ar-EG');
    
    await sheetsClient.spreadsheets.values.append({
      spreadsheetId,
      range: "'The Client Website information'!A:E",
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [name || 'بدون اسم', id, passwordHash, email, date]
        ]
      }
    });
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
  }
}
