# Per-Client Google Sheet Logging (Apps Script Web App)

Each Brandverse client gets a **private Google Sheet** for their session/call
logs — no shared dashboards, no cross-client access. The Worker appends entries
through a per-client Google Apps Script Web App (the same pattern already used
by the leads-CRM flow in `functions/api/leads/apps-script.js` — that one stays
untouched; no service account is involved here).

## Flow

```
Vapi / chat widget / /api/{clientId}/log
        │  POST { ...session/log event }
        ▼
Worker (ai-reception/workers/api.js)
  LoggingEngine / BookingEngine
        │  clientId (from the URL path) only
        ▼
ClientSheetWriter.resolve(client config)
   ├─ client.sheet_webhook_url set  → POST <webhook URL>   (primary path)
   └─ otherwise                     → service-account Sheets API (legacy fallback)
        ▼
Client's own Apps Script Web App  →  client's private Google Sheet
```

Isolation: the webhook destination is resolved server-side **only** from the
client's config, keyed by the `clientId` from the request path. Request bodies
can never name a destination, and the payload always carries the server-derived
`client_id`/`client_name`. One client's request can never write into another
client's sheet.

## 1. Create the per-client Sheet + Apps Script app

1. Create the client's private Google Sheet (shared only with your ops team).
2. In the Sheet: Extensions → Apps Script → replace `Code.gs` with
   `docs/client-sheet-logger.gs` (the template).
3. Project Settings → Script properties:
   - `SCRIPT_SECRET` — a strong random string, **unique per client**
     (recommended; a per-sheet secret means one compromised webhook can never
     write into another client's sheet).
   - `SHEET_NAME` (optional) — the tab rows are appended to; default `Sessions`.
4. Deploy → New deployment → Web app:
   - Execute as: **Me**
   - Who has access: **Anyone** (the Worker has no Google session).
5. Copy the `/exec` URL.

## 2. Configure the Worker (config-driven mapping)

Set the per-client fields where the client is defined — either the
`CLIENTS_CONFIG` secret (preferred for live) or the embedded config in
`ai-reception/services/client-config.js`:

```json
{
  "id": "acme_dental",
  "sheet_id": "",                        // legacy fallback path (optional)
  "sheet_webhook_url": "https://script.google.com/macros/s/AKfycb.../exec",
  "sheet_webhook_secret": "perClientRandomSecret"
}
```

- `sheet_webhook_url` — required for the webhook path; must start with `https://`.
- `sheet_webhook_secret` — optional; falls back to the shared
  `GOOGLE_APPS_SCRIPT_SECRET` Worker secret.
- `configs/example-client.json` and `configs/demo-client.json` include both
  fields for reference. `scripts/onboard-client.js` accepts them too.

Empty values mean the webhook path is skipped and logging falls back to the
legacy `sheet_id` service-account path (which stays in place).

## 3. Payload contract

`POST <sheet_webhook_url>`

```json
{
  "secret": "<sheet_webhook_secret or GOOGLE_APPS_SCRIPT_SECRET>",
  "type": "session_log | call_log | booking | callback_request | ...",
  "ts": "2026-08-18T03:04:05.000Z",
  "client_id": "acme_dental",
  "client_name": "Acme Dental Clinic",
  "name": "Jane Doe",
  "phone": "+61412345678",
  "email": "jane@example.com",
  "channel": "phone",
  "intent": "book_appointment",
  "status": "confirmed",
  "service": "cleaning",
  "requestedTime": "...",
  "bookedTime": "...",
  "outcome": "...",
  "notes": "...",
  "duration": "30",
  "followUpRequired": "No",
  "callId": "...",
  "recordingUrl": "...",
  "transcript": "..."         // optional
}
```

Response: `200 { "success": true, "row": 12 }` when the row was appended.
Anything else (HTTP error, `success: false`) is treated as failure by the
Worker, which retries up to 3 attempts with exponential backoff, logs, and
never fails the caller's request.

## 4. Verify

```powershell
curl https://edge.brandverse.tech/api/               # route index includes /api/health
curl https://edge.brandverse.tech/api/health         # sheets_webhook: ok / verified
```

- `/api/health` probes each configured webhook with a `GET`
  (`doGet` in the template returns `{ success: true }`).
- Test a write: `POST https://edge.brandverse.tech/api/acme_dental/log`
  with `{ "name": "Test", "phone": "+61400000000", "intent": "test" }`.

## 5. Notes

- The legacy leads-CRM webhook (`/api/leads/apps-script`,
  `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`) is **not** involved in per-client logging
  and must not be modified.
- No service account: the Apps Script web app runs as the owner and only ever
  touches its own bound spreadsheet.
- Rotating a client's secret = update the webhook's Script property + the
  client's `sheet_webhook_secret` (or the shared `GOOGLE_APPS_SCRIPT_SECRET`).