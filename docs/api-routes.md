# API Routes — Brandverse AI Receptionist (edge.brandverse.tech)

Audit of every route served by the Cloudflare Worker (`ai-reception/workers/api.js`,
deployed as `ai-receptionist` → `edge.brandverse.tech` / `brandverse.tech`).
Wrangler route patterns (`ai-reception/wrangler.toml`):

- `edge.brandverse.tech/api/*`, `edge.brandverse.tech/health`
- `brandverse.tech/api/*`, `brandverse.tech/health` (staging: `staging-edge.brandverse.tech/*`)

## Global behaviour (applies to every route below)

| Rule | Detail |
|---|---|
| CORS | `OPTIONS` preflight handled first; allowed origins: `env.APP_BASE_URL`, `https://brandverse.tech`, `https://www.brandverse.tech`, `https://edge.brandverse.tech`. Unlisted origins fall back to `https://brandverse.tech`. |
| Rate limit | 100 requests / 60 s per `CF-Connecting-IP`, else per `clientId`, else `unknown` → `429` + `Retry-After`. |
| Errors | Unhandled handler exceptions → `500` JSON `{ error, message }`. |
| Passthrough | Unmatched `/api/*` is proxied to the Pages deployment (`env.PAGES_UPSTREAM`, default `https://brandverse.pages.dev`) — see "Passthrough routes" below. |

## Worker routes

| Path | Method | Required params / headers | Auth | Purpose |
|---|---|---|---|---|
| `/health` | GET | — | none | Liveness: `{ status: "healthy", timestamp, version }`. |
| `/api/` (also `/api`) | GET | — | none | **Self-documenting route index** (JSON list of endpoints; no auth). Non-GET → `405`. |
| `/api/health` | GET | — | none | **Dependency health**: per-dependency JSON status for `clients_config`, `google_auth`, `vapi`, `sheets_webhook`, `twilio` (+ `routes` from the index). `503` when any dependency is down. |
| `/api/vapi/webhook` | POST | Body: Vapi event payload (`message.type`: `assistant-request`, `status-update`, `end-of-call-report`, `function-call`) | `x-vapi-secret` (or `x-vapi-signature`) header must equal `VAPI_WEBHOOK_SECRET`; if no secret configured, allowed only when `ALLOW_INSECURE_WEBHOOKS=true`, else `401` | Entry point for all Vapi call events: returns assistant config for the matched number, logs call states / end-of-call reports (+ transcript) to the client's Sheet, sends call notifications. |
| `/api/vapi/call` | POST | Body: `clientId`, `customerNumber`, optional assistant overrides | none (server-side `VAPI_API_KEY`) | Initiates an outbound call through the Vapi API. |
| `/api/{clientId}/availability` | GET | Query: `date` (YYYY-MM-DD), `service` | none | Returns available slots for the client/date/service. `400` when `calendar_id` not configured, service unknown, or date invalid. |
| `/api/{clientId}/book` | POST | Body: `name`, `phone`, `service`, `dateTime`; optional `email`, `notes` | `X-Tool-Key` must equal `TOOL_API_KEY` (else `401`) | Creates the booking (Google Calendar event) and logs it to the client's Sheet; fires booking notification webhook when configured. |
| `/api/{clientId}/callback` | POST | Body: `name`, `phone`, `reason`; optional `urgency` (normal\|urgent), `service`, `notes` | `X-Tool-Key` | Captures a callback request, logs it, notifies via webhook; response `{ success, confirmed }` — `confirmed` is true only when the notification webhook acknowledged it. |
| `/api/{clientId}/transfer` | POST | `callId` (body `callId`/`call_id` or query `callId`) | `X-Tool-Key` | Transfers the live Vapi call to `human_handoff.transfer_number`. Returns `200` with honest `confirmed:false` when handoff/Vapi not configured. |
| `/api/{clientId}/cancel` | POST | Body: `bookingId`; optional `reason` | `X-Tool-Key` | Cancels a booking (deletes the calendar event) and logs it. |
| `/api/{clientId}/reschedule` | POST | Body: `bookingId`, `dateTime` (parseable ISO); optional `service` | `X-Tool-Key` | Reschedules a booking and logs it. |
| `/api/{clientId}/log` | POST | Body: log event fields (`phone` validated, all other fields free-form, sanitized only at JSON level) | none | Appends a session/log event to the client's own Google Sheet — via the client's Apps Script webhook (`sheet_webhook_url`) when configured, otherwise the service-account Sheets API path. Failures are logged, never crash the request. |
| `/api/{clientId}/client-config` | GET | — | none | Returns the client's full config (feeds Vapi's `get_business_hours` tool). `404` for unknown clients. |

Notes on auth values:

- `TOOL_API_KEY` is injected by Vapi into every server-tool call via the `X-Tool-Key`
  header (see `ai-reception/services/assistant-config.js`); the endpoints refuse to
  act when the key is unset.
- Client-ID routing: `clientId` is always taken from the URL path (`path.split('/')[2]`).
  A request with no client ID (`/api/`, `/api/foo/…` partial) previously returned a bare
  `400`; `/api/` now serves the route index instead.

## Passthrough routes (Pages Functions via `PAGES_UPSTREAM`)

Unmatched `/api/*` is forwarded (method + body preserved, `host` stripped) to the
Cloudflare Pages deployment so legacy endpoints keep working. Implementations:

| Path | Method | Required params / headers | Auth | Purpose |
|---|---|---|---|---|
| `/api/leads/apps-script` | POST | Body: lead fields (`full_name`, `email`, `phone`, `company`, `service_interest`, `message`) | none (secret added server-side) | Lead-CRM bridge: forwards the lead to the Google Apps Script webhook (`GOOGLE_APPS_SCRIPT_WEBHOOK_URL` + `GOOGLE_APPS_SCRIPT_SECRET`) that writes the leads Sheet. *(Unchanged — do not modify.)* |
| `/api/create-order` | POST | Body: `amount` (min 100), `currency` | none (server uses `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET`) | Creates a Razorpay order. |
| `/api/verify-payment` | POST | Body: `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature` | none (server uses `RAZORPAY_KEY_SECRET`) | Verifies Razorpay payment signature. |
| `/api/subscribe` | POST | Body: `endpoint`, `keys` | none | Stores a web-push subscription in `PUSH_KV`. |
| `/api/send-push` | POST | Body: `adminPassword` | `adminPassword` must equal `ADMIN_PUSH_PASSWORD` | Admin-only web push (currently `501` — delivery not implemented). |
| `/api/push-stats` | GET | — | none | Subscriber count from `PUSH_KV` (`503` when unconfigured). |
| `/api/mailchimp/subscribe` | POST | Body: `email` (+ `firstName`, `lastName`, `tags`) | none (server uses `MAILCHIMP_API_KEY`) | Adds a newsletter subscriber. |

## 400 root cause (historical)

`GET /api/` used to hit `if (!clientId) return json({ error: 'Client ID required' }, 400)`.
That bare 400 is why `edge.brandverse.tech/api/` looked broken — there was never a
route for the index. Fixed by task 2 (self-documenting index) and task 4 (`/api/health`).

## Related config

Per-client fields that drive routing/logging (in `ai-reception/services/client-config.js`,
loadable via the `CLIENTS_CONFIG` secret or embedded JSON):

- `calendar_id` — Google Calendar ID for availability/booking.
- `sheet_id` — legacy service-account Sheets API spreadsheet ID (fallback logging path).
- `sheet_webhook_url` — per-client Apps Script Web App URL; when set, all session/call
  log writes go through it (primary path).
- `sheet_webhook_secret` — optional per-client secret; falls back to the shared
  `GOOGLE_APPS_SCRIPT_SECRET` env var. Payload contract:
  `docs/client-sheet-onboarding.md`.