import { google } from 'googleapis';
import path from 'path';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'google-credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient as any });
  const drive = google.drive({ version: 'v3', auth: authClient as any });

  console.log('Creating new spreadsheet "Database"...');
  
  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Database',
      },
      sheets: [
        {
          properties: {
            title: 'Users',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Name' }, userEnteredFormat: { textFormat: { bold: true } } },
                    { userEnteredValue: { stringValue: 'Email' }, userEnteredFormat: { textFormat: { bold: true } } },
                    { userEnteredValue: { stringValue: 'Created At' }, userEnteredFormat: { textFormat: { bold: true } } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const spreadsheetId = spreadsheet.data.spreadsheetId;
  console.log(`Successfully created spreadsheet! ID: ${spreadsheetId}`);
  console.log(`URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`);

  console.log('Sharing with mostafa192099@gmail.com...');
  await drive.permissions.create({
    fileId: spreadsheetId as string,
    sendNotificationEmail: true,
    requestBody: {
      role: 'writer',
      type: 'user',
      emailAddress: 'mostafa192099@gmail.com'
    },
  });

  console.log('Permission added. You should receive an email shortly.');
}

main().catch(console.error);
