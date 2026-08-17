// Sheet Log Writer - appends a client's session/call log events to that
// client's OWN Google Sheet via a per-client Google Apps Script Web App.
// No service account involved (matches the existing leads-CRM webhook pattern).
//
// ISOLATION GUARANTEE
// -------------------
// The webhook destination is resolved ONLY from server-side client config
// (client.sheet_webhook_url), keyed by the clientId in the request path.
// Request bodies can never name a destination, so one client's Worker request
// can never write into another client's Sheet. The payload always carries the
// server-derived client_id + client_name.
//
// Webhook contract (see docs/client-sheet-logger.gs):
//   POST <sheet_webhook_url>
//   { "secret": "...", "type": "session_log"|"call_log"|..., "client_id": "...",
//     "client_name": "...", "ts": "<ISO>", ...event fields }
//   => 200 { "success": true, "row": N }
//   Any non-2xx response or { "success": false } counts as failure.

const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 10000;

// Payload keys accepted from the event data (everything else is dropped).
const ALLOWED_FIELDS = new Set([
  'logDate', 'logTime', 'name', 'phone', 'email', 'channel', 'intent', 'status',
  'service', 'requestedTime', 'bookedTime', 'outcome', 'notes', 'duration',
  'followUpRequired', 'callId', 'recordingUrl', 'calendarEventId', 'smsSent',
  'chatSessionId', 'sessionId', 'transcript', 'formType', 'smsType', 'smsId', 'urgency',
]);

function isTransient(error, status) {
  if (status === 429 || (status >= 500 && status <= 599)) return true;
  const msg = (error && error.message) || '';
  return /timeout|network|econnreset|etimedout|abort|fetch failed|socket/i.test(msg);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class SheetLogWriter {
  constructor(clientConfigService, env, maxAttempts = MAX_ATTEMPTS) {
    this.clientConfigService = clientConfigService;
    this.env = env;
    this.maxAttempts = maxAttempts;
  }

  // Build the flat, allow-listed payload from a log event. The caller owns
  // event shaping; this only filters and maps fields.
  normalize(sessionData) {
    const out = {};
    for (const [key, value] of Object.entries(sessionData || {})) {
      if (!ALLOWED_FIELDS.has(key)) continue;
      if (value === undefined || value === null) continue;
      out[key] = typeof value === 'object' ? JSON.stringify(value) : String(value);
    }
    // Map the LoggingEngine field names (date/time) to the webhook contract.
    if (sessionData && sessionData.date !== undefined && out.logDate === undefined) {
      out.logDate = String(sessionData.date);
    }
    if (sessionData && sessionData.time !== undefined && out.logTime === undefined) {
      out.logTime = String(sessionData.time);
    }
    return out;
  }

  // Append one session/log event to the client's Google Sheet.
  // Returns { success: true, logId?, attempts } or
  //         { success: false, error, message?, attempts }.
  async logSession(clientId, sessionData) {
    const client = await this.clientConfigService.getClientConfig(clientId).catch(() => null);
    if (!client) {
      return { success: false, error: 'client_not_found', message: `No configuration for client "${clientId}"` };
    }

    const webhookUrl = client.sheet_webhook_url;
    if (!webhookUrl || typeof webhookUrl !== 'string' || !webhookUrl.startsWith('https://')) {
      return { success: false, error: 'not_configured', message: `sheet_webhook_url is not set for client "${clientId}"` };
    }

    const secret = client.sheet_webhook_secret || this.env.GOOGLE_APPS_SCRIPT_SECRET;
    if (!secret) {
      return { success: false, error: 'not_configured', message: `No webhook secret for client "${clientId}" (set sheet_webhook_secret or GOOGLE_APPS_SCRIPT_SECRET)` };
    }

    const payload = {
      secret,
      type: sessionData?.type || 'session_log',
      ts: new Date().toISOString(),
      client_id: clientId,
      client_name: client.name || '',
      ...this.normalize(sessionData),
    };

    return this.post(webhookUrl, payload);
  }

  // POST the payload with retry + exponential backoff. Only transient
  // failures (network/timeout/429/5xx) are retried.
  async post(webhookUrl, payload) {
    let lastError = null;
    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        const resp = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
        });

        const text = await resp.text().catch(() => '');
        let result = null;
        try { result = JSON.parse(text); } catch { /* non-JSON response */ }

        if (resp.ok && result && result.success === true) {
          return {
            success: true,
            logId: result.row != null ? String(result.row) : undefined,
            attempts: attempt,
          };
        }
        if (resp.ok) {
          // Web app responded but rejected the write - not transient.
          const reason = result?.error || 'webhook returned success:false';
          console.error(`[sheet-log] webhook rejected write for client ${payload.client_id}: ${reason}`);
          return { success: false, error: 'webhook_rejected', message: reason, attempts: attempt };
        }

        if (!isTransient(null, resp.status)) {
          return { success: false, error: `webhook_http_${resp.status}`, message: text.slice(0, 200), attempts: attempt };
        }
        lastError = new Error(`HTTP ${resp.status}`);
      } catch (error) {
        if (!isTransient(error)) {
          return { success: false, error: 'webhook_error', message: error.message, attempts: attempt };
        }
        lastError = error;
      }

      if (attempt < this.maxAttempts) await sleep(500 * 2 ** (attempt - 1));
    }

    return {
      success: false,
      error: 'webhook_failed',
      message: lastError?.message || 'unknown error',
      attempts: this.maxAttempts,
    };
  }
}

// Preference-aware write target shared by LoggingEngine and BookingEngine:
// client with sheet_webhook_url (Apps Script webhook) => webhook writer;
// otherwise fall back to the legacy service-account Sheets API path.
export class ClientSheetWriter {
  constructor(clientConfigService, sheetsService, sheetLogWriter) {
    this.clientConfigService = clientConfigService;
    this.sheetsService = sheetsService;
    this.sheetLogWriter = sheetLogWriter || null;
  }

  async writeFor(client, clientId, logData) {
    if (client && client.sheet_webhook_url && this.sheetLogWriter) {
      return this.sheetLogWriter.logSession(clientId, logData);
    }
    return this.sheetsService.logInteraction((client && client.sheet_id) || '', logData);
  }

  async write(clientId, logData) {
    const client = await this.clientConfigService.getClientConfig(clientId).catch(() => null);
    return this.writeFor(client, clientId, logData);
  }
}

// GET probe used by /api/health: any HTTP response = reachable; a JSON body
// with success:true = fully verified (the Code.gs template's doGet returns this).
export async function probeWebhook(url, timeoutMs = 6000) {
  const start = Date.now();
  try {
    const resp = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
    });
    const text = await resp.text().catch(() => '');
    let verified = false;
    try {
      const parsed = JSON.parse(text);
      verified = parsed && parsed.success === true;
    } catch { /* not JSON */ }
    return {
      url,
      reachable: true,
      verified,
      status: resp.status,
      ms: Date.now() - start,
      detail: verified ? 'verified (doGet health ok)' : `reachable (http ${resp.status})`,
    };
  } catch (error) {
    return { url, reachable: false, verified: false, status: 0, ms: Date.now() - start, error: error.message };
  }
}