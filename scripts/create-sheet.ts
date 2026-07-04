import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// read the JSON to get the credentials
const credentialsPath = path.resolve(process.cwd(), 'google-credentials.json');
const credentialsStr = fs.readFileSync(credentialsPath, 'utf-8');
const credentials = JSON.parse(credentialsStr);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ],
});

async function createSheet() {
  const sheets = google.sheets({ version: 'v4', auth });
  const drive = google.drive({ version: 'v3', auth });

  try {
    console.log('Creating spreadsheet...');
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: 'Velore Accounts',
        },
      },
    });
    
    const spreadsheetId = spreadsheet.data.spreadsheetId;
    const spreadsheetUrl = spreadsheet.data.spreadsheetUrl;
    console.log(`Spreadsheet created successfully!`);
    console.log(`Spreadsheet ID: ${spreadsheetId}`);
    console.log(`URL: ${spreadsheetUrl}`);

    console.log('Sharing spreadsheet to anyone with the link as writer...');
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: 'writer',
        type: 'anyone',
      },
    });
    console.log('Permissions updated!');

    // Initialize columns
    console.log('Adding header columns...');
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A1:E1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          ['Full Name', 'Email', 'Password', 'Signup Date', 'Newsletter']
        ]
      }
    });
    
    console.log('Headers added successfully!');

  } catch (error) {
    console.error('Error creating spreadsheet:', error);
  }
}

createSheet();
