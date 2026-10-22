# Cloudflare deployment and launch guide

## Current architecture

- The website is a Next.js static export. `npm run build` writes the site to `out/`.
- Cloudflare Pages serves the static site and the Pages Functions in `functions/`.
- The lead form's Google Sheets proxy is `POST /api/leads/apps-script`.
- The AI receptionist is a separate Cloudflare Worker configured by `ai-reception/wrangler.toml`; the subdomain router is another Worker in `subdomain-router/`.
- The repository's default branch is `main`. Confirm the Cloudflare Pages production branch in the dashboard before connecting or changing it.

## Build and deploy

Install the locked dependencies, build the static site, then deploy the Pages output:

```sh
npm ci
npm run build
npx wrangler pages deploy out --project-name brandverse
```

The npm script `deploy:cloudflare` uploads the existing `out/` directory; it does not build it first. `deploy:all` also deploys the subdomain-router Worker, so do not use it as a site-only deploy command. Review the selected Wrangler branch and Cloudflare target before running any deployment.

For Git-connected Pages deployments, use the Cloudflare Pages dashboard to confirm the production branch, framework/build settings, output directory (`out`), and environment variables. Preview builds should use non-production credentials.

## Environment variables and secrets

Use `env.example` and `API_KEYS_CHECKLIST.md` for the current names and purposes. Values prefixed with `NEXT_PUBLIC_` are embedded in browser JavaScript; never put private credentials in them.

Set the following in the Cloudflare Pages Function environment when the lead-to-Sheets path is enabled:

- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`
- `GOOGLE_APPS_SCRIPT_SECRET`

The lead form also uses FormSubmit as a fallback. Confirm the destination inbox with FormSubmit before relying on that path.

Optional public build-time settings include the Calendly URL, Vapi public demo key and assistant ID, analytics IDs, Cookiebot domain group ID, and Google site-verification token. Analytics and advertising trackers require a consent and privacy review before enabling.

The AI receptionist Worker uses separate Worker secrets. In particular, `TOOL_API_KEY` protects outbound calls and other actions with external effects; `VAPI_WEBHOOK_SECRET` validates Vapi webhooks; `VAPI_API_KEY` is server-side only. Calendar access is configured either with the Google service-account pair or with the keyless Apps Script webhook pair. See `ai-reception/wrangler.toml` and `docs/nexus-calendar-webhook-setup.md`.

Do not copy secrets into `.env.example`, source files, build logs, public issues, or `NEXT_PUBLIC_*` settings.

## Custom domains and DNS

The current Cloudflare Pages default host is `brandverse.pages.dev`. `brandverse.pages.tech` is not a Pages default hostname.

After registering the intended domain and adding its zone to Cloudflare:

1. Add the chosen hostname under the Pages project's **Custom domains**.
2. Follow the DNS record Cloudflare presents for that exact hostname. Do not invent an A record or point it at a generic Pages IP.
3. Wait for the hostname and TLS certificate to become active, then verify HTTPS and the Pages project.
4. Configure the separate Worker hostname and routes only after the zone is active. The current Worker config targets `brandverse.tech` and `edge.brandverse.tech`; update those values only after the final domain is chosen and reviewed.
5. Make the site's canonical metadata and `public/sitemap.xml` match the selected public domain.

Keep production DNS, secrets, OAuth settings, and deployments unchanged until the domain and integration checklist is approved.

## Forms, voice, and Calendar

- Do not submit test leads to a production inbox or spreadsheet without a clearly marked test destination.
- The browser voice demo at `/demos/voice/` needs `NEXT_PUBLIC_VAPI_PUBLIC_KEY` and `NEXT_PUBLIC_VAPI_ASSISTANT_ID`. Starting the demo uses the visitor's microphone and may incur Vapi usage.
- The demo Worker client configuration is explicitly fictional and has no real phone or calendar. Do not represent it as a live business booking integration.
- Calendar integration uses Worker-side service-account credentials or the configured keyless webhook. There is no browser-based Google OAuth sign-in/session flow in this repository.

## SEO and advertising

- Verify the site's final domain, canonical URLs, sitemap, robots rules, titles, descriptions, and Search Console property after domain cutover.
- The repository has no Google AdSense publisher ID, ad units, or `ads.txt` publisher entry. Add those only after AdSense approval and after updating the privacy/cookie disclosures and consent behavior.
- Review the privacy policy and cookie consent setup before enabling GA4, Meta Pixel, LinkedIn tracking, or advertising scripts.
- Keep form confirmation and thank-you pages out of search results and the sitemap.

## Read-only readiness checks

Before a launch decision, run the project checks from the audit branch and inspect Cloudflare's current Pages deployment, Worker health, custom-domain status, and environment bindings in the dashboard. The GitHub repository currently has no Actions workflow, and the default branch has no required status checks.
