import { sheets, auth } from '@googleapis/sheets';
import path from 'path';

function getGoogleAuth() {
  const credentialsJson = process.env.GOOGLE_CREDENTIALS_JSON;
  return new auth.GoogleAuth({
    ...(credentialsJson
      ? { credentials: JSON.parse(credentialsJson) }
      : { keyFile: path.join(process.cwd(), 'google-credentials.json') }
    ),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

async function getSheetsClient() {
  const googleAuth = getGoogleAuth();
  const authClient = await googleAuth.getClient();
  return sheets({ version: 'v4', auth: authClient as any });
}

export async function appendUserToSheet(name: string, id: string, passwordHash: string, email: string) {
  try {
    const sheetsClient = await getSheetsClient();
    
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

export async function updateProductStockInSheet(productId: string, productName: string, newStock: number) {
  try {
    const sheetsClient = await getSheetsClient();
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn('SPREADSHEET_ID is not set in environment variables');
      return;
    }

    const sheetName = 'Inventory';
    
    // First, get all values to find the row
    const getRes = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:C`,
    }).catch(() => null); // If sheet doesn't exist, this might fail. We should probably just let it fail and log.
    
    const rows = getRes?.data?.values;
    let rowIndex = -1;
    
    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === productId) {
          rowIndex = i + 1; // Sheets are 1-indexed
          break;
        }
      }
    }
    
    if (rowIndex !== -1) {
      // Update existing row
      await sheetsClient.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A${rowIndex}:C${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[productId, productName, newStock]]
        }
      });
    } else {
      // Append new row
      await sheetsClient.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A:C`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[productId, productName, newStock]]
        }
      });
    }
  } catch (error) {
    console.error('Error updating Google Sheet inventory:', error);
  }
}

export async function syncInventoryToSheet(productsList: { id: string, name: string, stock: number }[]) {
  try {
    const sheetsClient = await getSheetsClient();
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn('SPREADSHEET_ID is not set in environment variables');
      return;
    }

    const sheetName = 'Inventory';
    
    const values = productsList.map(p => [p.id, p.name, p.stock]);
    // Add header row
    values.unshift(['Product ID', 'Product Name', 'Stock']);

    // Clear and write all
    await sheetsClient.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A:C`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values
      }
    });
  } catch (error) {
    console.error('Error syncing Google Sheet inventory:', error);
  }
}

export async function getInventoryFromSheet(): Promise<Record<string, number>> {
  try {
    const sheetsClient = await getSheetsClient();
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn('SPREADSHEET_ID is not set in environment variables');
      return {};
    }

    const sheetName = 'Inventory';
    
    const getRes = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:C`,
    }).catch(() => null);
    
    const rows = getRes?.data?.values;
    const stockMap: Record<string, number> = {};
    
    if (rows) {
      // Skip header row if it exists
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] && row[2]) {
          stockMap[row[0]] = parseInt(row[2].toString(), 10) || 0;
        }
      }
    }
    return stockMap;
  } catch (error) {
    console.error('Error getting inventory from Google Sheet:', error);
    return {};
  }
}

// --- Get the numeric sheetId for the "Orders" tab ---
async function getOrdersSheetId(
  sheetsClient: ReturnType<typeof sheets>,
  spreadsheetId: string
): Promise<number | null> {
  try {
    const meta = await sheetsClient.spreadsheets.get({ spreadsheetId });
    const sheet = meta.data.sheets?.find(
      (s) => s.properties?.title === 'Orders'
    );
    return sheet?.properties?.sheetId ?? null;
  } catch {
    return null;
  }
}

// --- Status color palette (background + foreground per Arabic status label) ---
const STATUS_COLORS: Record<string, {
  bg: { red: number; green: number; blue: number };
  fg: { red: number; green: number; blue: number };
}> = {
  'معلق':         { bg: { red: 1.00, green: 0.95, blue: 0.80 }, fg: { red: 0.50, green: 0.35, blue: 0.00 } }, // amber
  'قيد المعالجة': { bg: { red: 0.82, green: 0.91, blue: 1.00 }, fg: { red: 0.07, green: 0.27, blue: 0.56 } }, // blue
  'تم الشحن':     { bg: { red: 0.80, green: 0.94, blue: 1.00 }, fg: { red: 0.05, green: 0.40, blue: 0.55 } }, // teal
  'تم التوصيل':   { bg: { red: 0.82, green: 0.96, blue: 0.84 }, fg: { red: 0.11, green: 0.42, blue: 0.15 } }, // green
  'ملغي':         { bg: { red: 1.00, green: 0.85, blue: 0.85 }, fg: { red: 0.60, green: 0.10, blue: 0.10 } }, // red
};

// --- Apply dropdown validation + color formatting to Status column (col I = index 8) ---
export async function setupOrderSheetDropdown() {
  try {
    const sheetsClient = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) return;

    const sheetId = await getOrdersSheetId(sheetsClient, spreadsheetId);
    if (sheetId === null) {
      console.warn('Orders sheet not found — cannot set dropdown validation');
      return;
    }

    const statusValues = Object.keys(STATUS_COLORS);

    // Range used by both validation and formatting (col I, rows 2→10000)
    const statusRange = {
      sheetId,
      startRowIndex: 1,
      endRowIndex: 10000,
      startColumnIndex: 8,
      endColumnIndex: 9,
    };

    // Build one addConditionalFormatRule request per status value
    const colorRules = statusValues.map((label) => {
      const { bg, fg } = STATUS_COLORS[label];
      return {
        addConditionalFormatRule: {
          rule: {
            ranges: [statusRange],
            booleanRule: {
              condition: {
                type: 'TEXT_EQ',
                values: [{ userEnteredValue: label }],
              },
              format: {
                backgroundColor: bg,
                textFormat: { foregroundColor: fg, bold: true },
              },
            },
          },
          index: 0, // prepend — higher-priority rules go first
        },
      };
    });

    await sheetsClient.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          // 1. Clear any existing conditional format rules on this sheet
          //    (prevents duplicates on repeated runs)
          { deleteConditionalFormatRule: { sheetId, index: 0 } },
          { deleteConditionalFormatRule: { sheetId, index: 0 } },
          { deleteConditionalFormatRule: { sheetId, index: 0 } },
          { deleteConditionalFormatRule: { sheetId, index: 0 } },
          { deleteConditionalFormatRule: { sheetId, index: 0 } },

          // 2. Dropdown validation
          {
            setDataValidation: {
              range: statusRange,
              rule: {
                condition: {
                  type: 'ONE_OF_LIST',
                  values: statusValues.map((v) => ({ userEnteredValue: v })),
                },
                showCustomUi: true,
                strict: true,
              },
            },
          },

          // 3. Conditional formatting colors
          ...colorRules,
        ],
      },
    });

    console.log('✅ Dropdown + color formatting applied to Orders!I column in Google Sheets');
  } catch (error) {
    // deleteConditionalFormatRule fails if there are fewer rules than we tried to delete — that's fine
    // Retry without the delete step in case the sheet is fresh
    try {
      const sheetsClient = await getSheetsClient();
      const spreadsheetId = process.env.SPREADSHEET_ID;
      if (!spreadsheetId) return;

      const sheetId = await getOrdersSheetId(sheetsClient, spreadsheetId);
      if (sheetId === null) return;

      const statusValues = Object.keys(STATUS_COLORS);
      const statusRange = {
        sheetId,
        startRowIndex: 1,
        endRowIndex: 10000,
        startColumnIndex: 8,
        endColumnIndex: 9,
      };

      const colorRules = statusValues.map((label) => {
        const { bg, fg } = STATUS_COLORS[label];
        return {
          addConditionalFormatRule: {
            rule: {
              ranges: [statusRange],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: label }],
                },
                format: {
                  backgroundColor: bg,
                  textFormat: { foregroundColor: fg, bold: true },
                },
              },
            },
            index: 0,
          },
        };
      });

      await sheetsClient.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              setDataValidation: {
                range: statusRange,
                rule: {
                  condition: {
                    type: 'ONE_OF_LIST',
                    values: statusValues.map((v) => ({ userEnteredValue: v })),
                  },
                  showCustomUi: true,
                  strict: true,
                },
              },
            },
            ...colorRules,
          ],
        },
      });
      console.log('✅ Dropdown + color formatting applied (fresh sheet)');
    } catch (retryError) {
      console.error('Error setting dropdown/color formatting on Orders sheet:', retryError);
    }
  }
}


export async function appendOrderToSheet(orderData: {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  products: string;
  total: number;
  notes: string;
  status: string;
}) {
  try {
    const sheetsClient = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) return;

    await sheetsClient.spreadsheets.values.append({
      spreadsheetId,
      range: "Orders!A:I",
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            orderData.id,
            orderData.date,
            orderData.customerName,
            orderData.phone,
            orderData.address,
            orderData.products,
            orderData.total,
            orderData.notes,
            orderData.status
          ]
        ]
      }
    });

    // Ensure the Status column always has a dropdown — idempotent & fast
    setupOrderSheetDropdown().catch((e) =>
      console.error('Dropdown setup error after append:', e)
    );
  } catch (error) {
    console.error('Error appending order to Google Sheet:', error);
  }
}

export async function getOrderStatusesFromSheet(): Promise<Record<string, string>> {
  try {
    const sheetsClient = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) return {};

    const getRes = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range: "Orders!A:I",
    }).catch(() => null);

    const rows = getRes?.data?.values;
    const statusMap: Record<string, string> = {};
    
    if (rows) {
      // row[0] is Order ID, row[8] is Status
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] && row[8]) {
          statusMap[row[0]] = row[8].toString();
        }
      }
    }
    return statusMap;
  } catch (error) {
    console.error('Error getting order statuses from Google Sheet:', error);
    return {};
  }
}

export async function updateOrderInSheet(orderId: string, status: string) {
  try {
    const sheetsClient = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) return;

    // Get all values to find the row of the order
    const getRes = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range: "Orders!A:I",
    }).catch(() => null);

    const rows = getRes?.data?.values;
    let rowIndex = -1;

    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === orderId) {
          rowIndex = i + 1; // 1-indexed for Sheets
          break;
        }
      }
    }

    if (rowIndex !== -1) {
      // Update Column I (Status) which is the 9th column
      await sheetsClient.spreadsheets.values.update({
        spreadsheetId,
        range: `Orders!I${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[status]]
        }
      });
      console.log(`Order ${orderId} status updated to ${status} in Google Sheets`);
    } else {
      console.warn(`Order ${orderId} not found in Google Sheets to update status`);
    }
  } catch (error) {
    console.error('Error updating order status in Google Sheet:', error);
  }
}
