# Brandverse production-readiness audit — 2026-10-23

## Decision

**NO-GO for custom-domain production lead capture and live receptionist actions.** The Pages preview is live, but the intended hostname and Worker/API hostnames do not resolve from the current browser, required production bindings cannot be inspected, and the repository contains material marked confidential while its GitHub visibility is public.

The site at `https://brandverse.pages.dev/` and the voice-demo page at `https://brandverse.pages.dev/demos/voice/` loaded in the browser. The requested `brandverse.pages.tech` hostname returned `ERR_NAME_NOT_RESOLVED`. The repository's configured `brandverse.tech` and `edge.brandverse.tech` hosts also returned `ERR_NAME_NOT_RESOLVED`; the Worker health endpoint therefore could not be checked. DNS may be intentionally pending domain registration.

## Findings and branch fixes

- **Pages response encoding:** `_headers` unconditionally set `Content-Encoding: br`, which can mark ordinary uncompressed files as Brotli and break page delivery. Removed the forced header; Cloudflare should negotiate compression.
- **Outbound-call security:** `POST /api/vapi/call` could call the Vapi account without caller authentication. It now requires the server-side `TOOL_API_KEY`, like the other Worker actions with external effects.
- **Search metadata:** The root canonical URL was inherited by every route, incorrectly pointing all pages at the homepage. Removed that global canonical. Added noindex metadata for form confirmation pages and removed them from the sitemap.
- **Operator documentation:** Replaced the unsafe `NEXT_PUBLIC_ADMIN_PASSWORD` advice and corrected stale deploy commands, Pages DNS guidance, and Vapi variable names. The push delivery endpoint remains a placeholder and is not launch-ready.
- **Pages app behavior:** Next.js is configured for a static export; Pages Functions handle the server-side lead-to-Sheets proxy. Marketing forms submit to that proxy and FormSubmit as a fallback. Production delivery depends on Cloudflare Pages environment bindings and FormSubmit inbox confirmation, which were not accessible to this audit.
- **Voice and Calendar:** The demo page loads, but no microphone session was started. The committed demo client is explicitly fictional, with no phone number or calendar ID. Worker Calendar access is server-side via a service-account JWT or a keyless Apps Script webhook. There is no browser-based Google OAuth callback/session flow in this repository.
- **SEO, analytics, and ads:** The sitemap and robots file target `brandverse.tech`. GA4, Meta Pixel, LinkedIn tracking, Cookiebot, and Vapi browser demo rely on optional build-time `NEXT_PUBLIC_*` values. Consent behavior was not verified on the live deployment. No AdSense publisher ID, ad units, or `ads.txt` publisher entry is present.
- **Repository exposure:** GitHub reports this repository as **public**. `internal/README.md` marks the sales-ops directory confidential and says the repository is private; it includes a starter lead list with business contact data. Review visibility and remove/redact sensitive material. Deleting files from the latest branch alone does not remove them from Git history.
- **Release controls:** `main` is the default branch and has no required status checks. No `.github/workflows` CI workflow was found. The repository contains manual build, lint, type-check, and verification scripts. Cloudflare's actual Pages deployment settings and Worker secrets were not available to inspect.

## Manual launch checklist

1. Choose the final hostname. Use `brandverse.pages.dev` for the current Pages host, or register the intended custom domain and add it under the Pages project's Custom domains. Do not use `brandverse.pages.tech` unless that domain is owned and configured. Follow Cloudflare's generated DNS instructions; do not use a guessed Pages A record.
2. Decide whether to make the GitHub repository private or remove/redact the confidential `internal/` materials. Review the public Git history for sensitive content and scrub/rotate anything that must no longer be public.
3. In Cloudflare Pages, confirm the production branch, successful deployment, TLS, preview-vs-production variables, `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`, `GOOGLE_APPS_SCRIPT_SECRET`, and any optional integration variables. Confirm the FormSubmit destination inbox before relying on its fallback.
4. After the final domain is active, update Worker routes and `APP_BASE_URL`; configure `TOOL_API_KEY`, `VAPI_WEBHOOK_SECRET`, Vapi credentials, client config, and Calendar access as Worker secrets. Check Worker health before enabling real calls or bookings.
5. Test lead capture with a clearly marked test destination and verify the demo with a non-production Vapi setup. Confirm consent handling before enabling non-essential analytics or advertising.
6. Before monetizing with AdSense, obtain approval, add the publisher ID/ad units and publisher-specific `ads.txt`, and update privacy/cookie disclosures. Add branch protection and automated checks before allowing production merges.

## Scope limits

No production DNS, secrets, OAuth settings, or deployments were changed. No lead form was submitted, no microphone session was started, and no live Calendar booking was attempted. Cloudflare deployment records and environment bindings were not available through the connected accounts.