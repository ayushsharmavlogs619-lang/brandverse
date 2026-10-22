# Domain Cutover Runbook (Prepared Before Purchase)

**Status:** Preparation only. No production DNS, Worker routes, secrets, OAuth settings, or live deployments have been changed.
**Expected domains (confirm after purchase):**
- Brandverse: `brandverse.online`
- Mr Anfield Football: `mranfieldfootball.online`

If the purchased names differ, replace the values below before making any changes.

## What I verified in the repository

### Brandverse
- Cloudflare Pages project name in repository docs/config: `brandverse`; static build output is `out/`.
- The repository has hard-coded `brandverse.tech` values in SEO metadata, canonical/Open Graph URLs, legal/contact copy, form email, redirects, CORS allowlists, and Worker route configuration.
- Nexus/AI Receptionist Worker config (`ai-reception/wrangler.toml`) has `zone_name = "brandverse.tech"`, routes for `edge.brandverse.tech` and `brandverse.tech`, and `APP_BASE_URL`/`APP_SUBDOMAIN` set to the old edge hostname.
- Subdomain router config (`subdomain-router/wrangler.toml`) includes `creators.brandverse.tech`, `edge.brandverse.tech`, and `onlyfans.brandverse.tech`.
- Marketing form recipient in `lib/forms.ts` is `ayush@brandverse.tech`; `env.example` and `CLOUDFLARE_DEPLOYMENT.md` also mention the old email. Do not assume that inbox exists after the old domain expires.
- Current Pages production branch/deployment must be verified in the Cloudflare dashboard before deploying. Repository documentation mentions `production`, while the repository default branch is `main`; do not change production branch settings during domain setup without checking the live project.

### Mr Anfield Football
- There are multiple possible repositories, so the live Pages project is **not yet verified**:
  - `ayushsharmavlogs619-lang/mr-anfield-official`: Next.js app, metadata currently points to `https://mr-anfield.vercel.app`; README describes Vercel/Netlify as options.
  - `ayushsharmavlogs619-lang/mr-anfield-football`: older static HTML repository whose metadata references `https://mr.anfieldfootball.com` and says GitHub Pages.
  - `ayushsharmavlogs619-lang/mr-anfield-football-articles`: separate articles repository.
- Before attaching `mranfieldfootball.online`, identify which Cloudflare Pages project currently serves the intended live website. Do not attach the domain to a guessed project.

## Cutover order for the morning

### 1. Confirm purchase
- Confirm exact registered spelling of both domains and that both appear in the Hostinger account.
- Keep the receipt and renewal price handy; no extra hosting or email add-ons are needed for domain connection alone.

### 2. Connect each root domain to Cloudflare Pages
Cloudflare's documented process is **Workers & Pages → the correct Pages project → Custom domains → Set up a domain**. For an apex/root domain, Cloudflare requires the domain to be a zone in the same Cloudflare account as the Pages project and requires its assigned Cloudflare nameservers to be set at the registrar. Follow the nameservers shown in the actual dashboard; never guess them.
- Add `brandverse.online` to the verified Brandverse Pages project.
- Add `mranfieldfootball.online` only after confirming the correct Mr Anfield project.
- If Hostinger DNSSEC is enabled, follow Cloudflare's current onboarding instructions before changing nameservers.
- Do not delete unrelated DNS records. Preserve any needed mail records.

Official guide: https://developers.cloudflare.com/pages/configuration/custom-domains/

### 3. Update Brandverse domain-dependent configuration (separate code change + review)
Before production deploy, prepare and review a patch covering:
- `app/layout.tsx`: metadataBase, canonical URL, Open Graph URL/image, Twitter image.
- `app/creators/layout.tsx` and other nested layouts: metadataBase, URLs, logos and contact email where applicable.
- `public/_redirects`: old `.tech` redirects/subdomain rewrites.
- `functions/[[path]].js`: allowed-origin/CORS allowlist.
- `ai-reception/wrangler.toml`: production/staging route patterns, zone_name, APP_BASE_URL and APP_SUBDOMAIN.
- `subdomain-router/wrangler.toml` and routing code: hostnames and route behavior.
- `lib/forms.ts`, `lib/metadata.ts`, privacy/terms pages, and other hard-coded old-domain references.
- `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WORKER_URL` in Cloudflare Pages settings where present.
- Vapi webhook URL and any third-party allowlists that reference the old edge hostname.
- Google OAuth authorized origins/redirect URIs only if the actual OAuth callback uses a changed hostname. Inspect the real callback URL before editing the Google Cloud Console.
- Search for all old-domain references before merging: `brandverse.tech`, `edge.brandverse.tech`, `creators.brandverse.tech`, `onlyfans.brandverse.tech`, `staging-edge.brandverse.tech`.

Do not assume every reference must be changed: preserve old URLs where they are intentionally retained or needed for backwards compatibility.

### 4. Email plan
- For free inbound forwarding, Cloudflare Email Routing can forward addresses such as `hello@brandverse.online` and `hello@mranfieldfootball.online` into the existing Outlook inbox after domain DNS is on Cloudflare and the destination inbox is verified.
- Forwarding is not a full mailbox and does not by itself let Ayush send as that branded address. Do not publish the new address as the reply-to/contact address until the inbound route is tested and a separate outbound sending method is chosen.
- If using a form provider, update its recipient and complete any verification email for the new destination.

Official guide: https://developers.cloudflare.com/email-service/get-started/route-emails/

### 5. SEO and launch verification
- Set the primary canonical host consistently (choose apex or www; avoid conflicting canonical hosts).
- Check `robots.txt`, sitemap URLs, metadata, social previews and structured data for stale domains.
- Test both `https://domain/` and `https://www.domain/`, redirects, HTTPS certificate, mobile layout, navigation, contact forms, and any live demos.
- For Brandverse, test lead submission and the Nexus health/availability/booking flow after routes are updated.
- Check logs and browser console; verify no unexpected 404/522 or mixed-content errors.
- Keep `*.pages.dev` fallback working until the custom domain has passed checks.

## Must wait until domains are actually purchased
- Exact domain spelling/availability and Hostinger nameservers.
- Cloudflare zone creation and custom-domain activation.
- Any final production code change containing the domain.
- Updating external service allowlists/webhook URLs.
- Publishing new branded email addresses.
- Production deployment and end-to-end verification.

## Safety rule
No production DNS changes or Worker deployments until the correct Pages projects, exact purchased domains, and final route names are confirmed. Prefer a reviewed branch/PR, run the existing build/tests, then deploy intentionally.
