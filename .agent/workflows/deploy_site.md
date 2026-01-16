---
description: Deploy the Brandverse.tech site to Cloudflare Pages
---

# Deploy Site

1. Install dependencies (if needed) and Build the project for Cloudflare Pages
// turbo
2. npm run pages:build

3. Deploy to Cloudflare Pages
   Note: This assumes you are logged in to Wrangler. If not, run `npx wrangler login` first.
// turbo
4. npx wrangler pages deploy .vercel/output/static --project-name brandverse
