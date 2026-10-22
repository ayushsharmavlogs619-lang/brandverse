# Brandverse configuration checklist

Use this as a deployment reference. The committed `env.example` is the source of truth for current variable names. Configure public values at build time and server-only values in the relevant Cloudflare dashboard or Worker secrets. Never put a secret in a `NEXT_PUBLIC_*` variable or commit a real value.

## Website build values (optional unless a feature is enabled)

- `NEXT_PUBLIC_CALENDLY_URL` — booking link; defaults to the current Brandverse Calendly URL.
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY` and `NEXT_PUBLIC_VAPI_ASSISTANT_ID` — enable the browser voice demo at `/demos/voice/`. These are public client configuration values, not server API credentials.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` — analytics/ad tracking IDs. Configure consent and privacy disclosures before enabling non-essential tracking.
- `NEXT_PUBLIC_COOKIEBOT_ID` — Cookiebot domain group, if Cookiebot is used.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Search Console verification token.

## Cloudflare Pages Function values

Set these in the Pages project's environment variables for production and preview as appropriate:

- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` and `GOOGLE_APPS_SCRIPT_SECRET` — required for the website lead form's Google Sheets path (`POST /api/leads/apps-script`). The secret stays in the Pages Function environment.
- `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` — optional newsletter integration.
- `ADMIN_PUSH_PASSWORD` — server-side only. Do not use `NEXT_PUBLIC_ADMIN_PASSWORD`. The push delivery endpoint is currently a placeholder and returns 501, so configuring a password does not make push notifications operational.

Website lead forms also submit to FormSubmit as a fallback. Confirm the destination inbox with FormSubmit before relying on that path.

## AI receptionist Worker values

Set secrets on the Worker using Wrangler secrets or the Cloudflare dashboard; do not put them in the static website build:

- `TOOL_API_KEY` — required to authorize outbound calls and booking, callback, transfer, cancellation, and rescheduling actions.
- `VAPI_WEBHOOK_SECRET` — required to validate incoming Vapi webhooks.
- `VAPI_API_KEY` — server-side Vapi API credential, needed for outbound calls and live call transfer.
- Google Calendar access: configure either `GOOGLE_CLIENT_EMAIL` + `GOOGLE_PRIVATE_KEY`, or the keyless Apps Script pair `NEXUS_CALENDAR_WEBHOOK_URL` + `NEXUS_CALENDAR_WEBHOOK_SECRET`.
- `CLIENTS_CONFIG` or the embedded client configuration, plus any per-client calendar IDs and sheet/notification settings. Keep client-specific secrets in Worker secrets, not the repo.

See `ai-reception/wrangler.toml`, `ai-reception/docs/deployment.md` when present, and `env.example` for details. Verify integrations with the Worker health endpoint after its custom domain resolves.

## Domain and launch checks

The Pages default host is `brandverse.pages.dev`. Add the chosen custom domain in the Cloudflare Pages project after registering and connecting the domain; do not use `brandverse.pages.tech` unless that is a domain you own and configure. Worker routes in this repository target `brandverse.tech` and `edge.brandverse.tech`, so they require that zone and DNS setup.

The repository currently has no AdSense publisher ID or ad-unit integration. Add AdSense only after account approval, consent/privacy review, and the correct publisher ID are available; then add the publisher-specific `ads.txt` entry.