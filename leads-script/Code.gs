/**
 * Google Apps Script — BCR Leads Direct Sheet Writer
 *
 * Deploy this as a Web App on the BCR Leads & Payments sheet:
 *   Sheet ID: 1bWMWzwQnuIwJqVYwRcKZQI10OOUe6TAK4bAf4Br3meE
 *
 * SETUP INSTRUCTIONS:
 * 1. Open the Google Sheet → Extensions → Apps Script
 * 2. Replace any existing code with this file's contents
 * 3. Click Deploy → New deployment
 * 4. Type: Web app
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Click Deploy → copy the Web App URL
 * 8. Paste that URL into src/data/content.js → LEADS_SHEET_WEBAPP_URL
 *
 * Tab routing:
 *   source "fb7" → "Fb1 - 99.01 Leads"
 *   source "ga7" → "Ga5 - 99.03 Leads"
 *
 * Expected POST payload:
 * {
 *   name, email, phone, profession, reason,
 *   source,           // "fb7" | "ga7" — used for tab routing
 *   utm_source, utm_campaign, utm_medium, utm_content,
 *   fbclid, gclid
 * }
 */

var TAB_MAP = {
  fb7: 'Fb1 - 99.01 Leads',
  ga7: 'Ga5 - 99.03 Leads',
};

var DEFAULT_TAB = 'Fb1 - 99.01 Leads';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var tabName = TAB_MAP[data.source] || DEFAULT_TAB;
    var sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', message: 'Tab "' + tabName + '" not found' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Columns: A=Timestamp, B=Name, C=Email, D=Phone, E=Profession,
    //          F=Why You Joined?, G=utm source, H=utm campaign,
    //          I=utm medium, J=utm content, K=fbclid, L=gclid
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.profession || '',
      data.reason || '',
      data.utm_source || '',
      data.utm_campaign || '',
      data.utm_medium || '',
      data.utm_content || '',
      data.fbclid || '',
      data.gclid || '',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for Apps Script web app — handles GET requests with a simple status page
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'BCR Leads endpoint is live' })
  ).setMimeType(ContentService.MimeType.JSON);
}
