/**
 * The Curb — petition Web App backend.
 *
 * 1. Open https://script.google.com → New project. Paste this whole file.
 * 2. Connect to a Google Sheet via Resources → Properties:
 *      Project Properties → Script Properties → add SHEET_ID = <your sheet id>
 *      (the long alphanumeric chunk in the Sheet URL).
 *    Or, if the script is bound to a Sheet already, leave SHEET_ID empty.
 * 3. Deploy → New deployment → Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the resulting /exec URL.
 * 4. In GitHub repo → Settings → Secrets and variables → Actions → add a
 *    new repository secret:
 *      Name:  PETITION_ENDPOINT
 *      Value: the /exec URL from step 3
 * 5. Push any commit (or re-run the deploy workflow). The site rebuild
 *    will inject the URL via NEXT_PUBLIC_PETITION_ENDPOINT.
 *
 * That's it. No DB, no server. Submissions append to the Sheet's
 * "Signatures" tab; the form reads the live count on each page load.
 */

const SHEET_NAME = 'Signatures';
const HEADER = ['Timestamp', 'Email', 'ZIP', 'IP', 'UserAgent'];

function doGet(e) {
  const sheet = getSheet();
  const count = Math.max(sheet.getLastRow() - 1, 0);
  return jsonResponse({ count });
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const email = String(params.email || '').trim();
  const zip = String(params.zip || '').trim();

  if (!email || !zip || email.indexOf('@') === -1) {
    return jsonResponse({ ok: false, error: 'Email and 5-digit ZIP required' });
  }

  const sheet = getSheet();
  // Trivial dedupe: skip if the same email is already present (case-insensitive).
  if (emailAlreadySigned(sheet, email)) {
    const count = Math.max(sheet.getLastRow() - 1, 0);
    return jsonResponse({ ok: true, alreadySigned: true, count });
  }

  const ip = (params.ip || '').toString().slice(0, 64);
  const ua = (params.ua || '').toString().slice(0, 256);
  sheet.appendRow([new Date(), email, zip, ip, ua]);

  const count = Math.max(sheet.getLastRow() - 1, 0);
  return jsonResponse({ ok: true, count });
}

function getSheet() {
  const sheetIdProp = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  const ss = sheetIdProp
    ? SpreadsheetApp.openById(sheetIdProp)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      'No spreadsheet bound. Either bind the script to a Sheet, ' +
      'or set the SHEET_ID script property.'
    );
  }
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
  }
  return sheet;
}

function emailAlreadySigned(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  const target = email.toLowerCase();
  for (let i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).toLowerCase() === target) return true;
  }
  return false;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
