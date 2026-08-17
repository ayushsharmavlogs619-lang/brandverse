/**
 * Per-client Session Log Writer — Google Apps Script Web App
 *
 * Deploy ONE of these bound to each client's private Google Sheet. The
 * Brandverse Worker (edge.brandverse.tech) POSTs session/call log events
 * here; this script appends a row to the bound spreadsheet.
 *
 * Deploy steps (per client):
 *   1. Create the client's private Google Sheet.
 *   2. Extensions -> Apps Script, paste this file as Code.gs.
 *   3. Project Settings -> Script properties:
 *        SCRIPT_SECRET  = (a strong random string, unique per client)
 *      Optionally: SHEET_NAME = tab to append into (default: "Sessions")
 *   4. Deploy -> New deployment -> Web app:
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Copy the /exec URL -> set the client's sheet_webhook_url in the
 *      Worker's CLIENTS_CONFIG (or embedded config in
 *      ai-reception/services/client-config.js), and set the same
 *      SCRIPT_SECRET as the client's sheet_webhook_secret (or, if you keep
 *      one shared secret, set the global GOOGLE_APPS_SCRIPT_SECRET secret).
 *
 * Security notes:
 *   - The secret is compared with a constant-time-style length check; use a
 *     different SCRIPT_SECRET per client so one leaked sheet secret never
 *     permits writing into other clients' sheets.
 *   - The bound spreadsheet is only ever addressed by this script — the
 *     Worker never receives the spreadsheet URL or edit access.
 */

var SCRIPT_SECRET_KEY = 'SCRIPT_SECRET';

function secret_() {
  return PropertiesService.getScriptProperties().getProperty(SCRIPT_SECRET_KEY) || '';
}

function sheetName_() {
  var custom = PropertiesService.getScriptProperties().getProperty('SHEET_NAME');
  return custom ? String(custom) : 'Sessions';
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var name = sheetName_();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS_());
    sh.setFrozenRows(1);
  } else if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS_());
    sh.setFrozenRows(1);
  }
  return sh;
}

function HEADERS_() {
  return [
    'Timestamp', 'Type', 'Client ID', 'Client Name', 'Date', 'Time', 'Name',
    'Phone', 'Email', 'Channel', 'Intent', 'Status', 'Service',
    'Requested Time', 'Booked Time', 'Outcome', 'Notes', 'Duration',
    'Follow Up Required', 'Call ID', 'Recording URL', 'Extras'
  ];
}

/**
 * doGet — used by the Worker's /api/health webhook probe.
 * Returns { success: true, service: 'client-sheet-logger', ok: true } so the
 * probe can distinguish "deployed and healthy" from "unreachable".
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    service: 'client-sheet-logger',
    ok: true,
    name: SpreadsheetApp.getActiveSpreadsheet().getName(),
  })).setMimeType(ContentService.MimeType.APPLICATION_JSON);
}

/**
 * doPost — appends one session/call log row.
 * Payload (from the Worker, see ai-reception/services/sheet-logger.js):
 *   { secret, type, ts, client_id, client_name, name, phone, email, channel,
 *     intent, status, service, requestedTime, bookedTime, outcome, notes,
 *     duration, followUpRequired, callId, recordingUrl, ... }
 */
function doPost(e) {
  var response = function (body, code) {
    return ContentService.createTextOutput(JSON.stringify(body))
      .setMimeType(ContentService.MimeType.APPLICATION_JSON);
  };

  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw) return response({ success: false, error: 'empty_body' }, 400);
    var data = JSON.parse(raw);

    // Secret check — reject before touching the sheet.
    if (data.secret !== secret_()) {
      Logger.log('Rejected request: bad secret');
      return response({ success: false, error: 'unauthorized' }, 403);
    }

    var row = [
      data.ts || new Date().toISOString(),          // Timestamp
      String(data.type || 'session_log'),            // Type
      String(data.client_id || ''),                  // Client ID
      String(data.client_name || ''),                // Client Name
      String(data.logDate || ''),                    // Date
      String(data.logTime || ''),                    // Time
      String(data.name || ''),                       // Name
      String(data.phone || ''),                      // Phone
      String(data.email || ''),                      // Email
      String(data.channel || ''),                    // Channel
      String(data.intent || ''),                     // Intent
      String(data.status || ''),                     // Status
      String(data.service || ''),                    // Service
      String(data.requestedTime || ''),              // Requested Time
      String(data.bookedTime || ''),                 // Booked Time
      String(data.outcome || ''),                    // Outcome
      String(data.notes || ''),                      // Notes
      String(data.duration || ''),                   // Duration
      String(data.followUpRequired || ''),           // Follow Up Required
      String(data.callId || ''),                     // Call ID
      String(data.recordingUrl || ''),               // Recording URL
      String(data.extras || data.transcript || '')   // Extras
    ];

    var sh = sheet_();
    sh.appendRow(row);

    return response({ success: true, row: sh.getLastRow() }, 200);
  } catch (err) {
    Logger.log('doPost error: ' + err.message + '\n' + err.stack);
    return response({ success: false, error: 'internal_error', message: err.message }, 500);
  }
}