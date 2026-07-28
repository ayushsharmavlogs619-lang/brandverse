# Brandverse.tech - AI Voice Automation Agency

## 🚀 Project Overview
Brandverse is a high-performance Next.js landing page designed to capture leads for AI Voice Agent services. It features:
- **Responsive Design**: Mobile-first, dark-themed premium UI.
- **ROI Calculator**: Interactive tool to demonstrate value to potential clients.
- **Conversion Focused**: Comparison tables, clear pricing, and sticky CTAs.
- **Legal Ready**: Integrated Privacy Policy and Terms & Conditions.

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages + Pages Functions + Cloudflare Workers
- **Lead Capture**: Cloudflare Pages Function proxy to Google Apps Script / Google Sheets, Worker fallback, FormSubmit fallback
- **Voice / AI Demo**: Vapi client integration

## 📦 How to Deploy (Production)

### Cloudflare Pages
1. Install dependencies: `npm install`
2. Build locally: `npm run build`
3. Verify deployment readiness: `npm run verify:deployment`
4. Deploy static output to Pages:
   ```bash
   npx wrangler pages deploy out --project-name brandverse --branch=production
   ```

### AI Receptionist
- Frontend/static assets live under `ai-reception/landing-pages`
- Worker/backend config lives under `ai-reception/`
- Review `ai-reception/docs/deployment.md` before production rollout

## 🔑 Environment Secrets
Create a `.env.local` for local development, and set production secrets in Cloudflare Pages / Workers dashboards as appropriate.

Common app variables:
```bash
NEXT_PUBLIC_WORKER_URL=https://edge.brandverse.tech
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/brandverse/30min
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...
NEXT_PUBLIC_COOKIEBOT_ID=...
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
NEXT_PUBLIC_VAPI_PUBLIC_KEY=...
NEXT_PUBLIC_VAPI_ASSISTANT_ID=...
NEXT_PUBLIC_VAPID_PUBLIC_KEY=...
NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID=...
```

Cloudflare Pages Function variables:
```bash
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=...
GOOGLE_APPS_SCRIPT_SECRET=...
```
