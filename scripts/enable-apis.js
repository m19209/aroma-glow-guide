const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.resolve(process.cwd(), 'google-credentials.json');
const credentialsStr = fs.readFileSync(credentialsPath, 'utf-8');
const credentials = JSON.parse(credentialsStr);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

async function enableApis() {
  const serviceusage = google.serviceusage({ version: 'v1', auth });
  try {
    console.log('Enabling Sheets API...');
    await serviceusage.services.enable({
      name: 'projects/373124575347/services/sheets.googleapis.com'
    });
    console.log('Sheets API enabled!');
    
    console.log('Enabling Drive API...');
    await serviceusage.services.enable({
      name: 'projects/373124575347/services/drive.googleapis.com'
    });
    console.log('Drive API enabled!');
  } catch (error) {
    console.error('Failed to enable APIs:', error.message);
  }
}

enableApis();
