# Brandverse — Agent Instructions

## Quick start

```bash
npm run dev       # Next.js dev server (Turbopack)
npm run build     # validate-env.js + next build (static export → out/)
npm run build:skip-validation  # skip env check
npm run lint      # ESLint flat config (eslint.config.mjs)
npm run type-check  # tsc --noEmit
npm run verify:deployment  # build + type-check + verify:cloudflare + verify:workers
```

## Build & deploy quirks

- **Static export only** (`output: "export"` in `next.config.ts`). No SSR/API routes at runtime.
- **`npm run build` requires `.env.local`** because `scripts/validate-env.js` reads `process.env`. The script only warns, never fails — but it crashes if `.env.local` is missing entirely because `node` can't read it. Use `build:skip-validation` if no env file.
- **Two-part deploy**: (1) `npm run deploy:cloudflare` → Pages (`out/` → `brandverse.pages.dev`), (2) `npm run deploy:subdomain-router` → Workers (`subdomain-router/worker.js`). `npm run deploy:all` runs both.
- **`deploy-cloudflare.js`** builds then runs `npx wrangler pages deploy out --project-name brandverse`.
- **`functions/api/leads/apps-script.js`** is a Pages Function. Its env vars (`GOOGLE_APPS_SCRIPT_*`) come from `context.env` (Cloudflare dashboard), **not** `process.env` — do NOT put them in `.env.local`.
- **FormSubmit** first-time setup: submit a test form, then click the confirmation email that FormSubmit sends to ayush@brandverse.tech. Until confirmed, form submissions silently drop.

## Project structure

```
app/              # Next.js App Router pages (29 routes)
functions/        # Pages Functions (lead proxy → Google Apps Script)
_functions/       # Pages Functions (subdomain routing via [[path]].js)
lib/              # Shared client logic (config, forms, lead-service, subdomain-routing)
ai-reception/     # Separate AI receptionist system → edge.brandverse.tech
internal/         # Confidential sales/ops docs — do not modify
subdomain-router/ # Cloudflare Worker for subdomain → path rewriting
scripts/          # Build-time validation scripts
docs/             # Architecture, troubleshooting, production health
```

## Subdomain routing

Defined in `lib/subdomain-routing.js`, shared by Pages Functions and the Worker:
- `creators.brandverse.tech` → `/creators`
- `onlyfans.brandverse.tech` → `/onlyfans`
- `edge.brandverse.tech` → `/workroom` (API paths passthrough to the AI Receptionist Worker)

## Lead capture pipeline

Multi-layer fallback, all fired concurrently via `Promise.allSettled`:
1. Worker proxy (`NEXT_PUBLIC_WORKER_URL` / default `https://edge.brandverse.tech`)
2. Google Sheets (via service account)
3. FormSubmit (POST to `ayush@brandverse.tech`)
4. Mailto + localStorage (last resort)

## Config & env

- **`lib/config.ts`** centralizes all `NEXT_PUBLIC_*` vars with safe defaults. Never crashes on missing vars.
- **`@/*`** path alias maps to repo root (e.g. `@/lib/config` → `lib/config`).
- Client-side vars must be prefixed `NEXT_PUBLIC_`. Server-side-only vars (API keys, webhook secrets) must NOT.

## No tests

No test framework or test files exist. Verification is manual via `npm run build`, `npm run type-check`, and `npm run lint`.

## AI Receptionist (separate system)

`ai-reception/` is a standalone Cloudflare Worker + Pages project for voice AI agents. See `ai-reception/docs/deployment.md`. Deployed to `edge.brandverse.tech`. Its config (client list, Google Calendar/Sheet IDs) is in `ai-reception/configs/clients.json`.
