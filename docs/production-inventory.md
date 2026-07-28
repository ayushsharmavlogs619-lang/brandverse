# Brandverse Production Inventory

**Generated:** July 23, 2026  
**Purpose:** Complete inventory of production assets for disaster recovery and handoff

---

## Domains & DNS

### Primary Domain
- **Domain:** `brandverse.tech`
- **Registrar:** [To be confirmed]
- **DNS Provider:** Cloudflare
- **Status:** Active

### Subdomains
- **edge.brandverse.tech** - Worker Proxy for lead capture
- **[Additional subdomains]** - Routed via subdomain-router worker

### DNS Records (Cloudflare)
```
A Record: brandverse.tech → Cloudflare Pages IP
CNAME: www.brandverse.tech → brandverse.tech
CNAME: edge.brandverse.tech → Cloudflare Workers
CNAME: *.brandverse.tech → Subdomain Router Worker
```

---

## Cloudflare Pages Configuration

### Project Settings
- **Project Name:** `brandverse`
- **Production Branch:** `production`
- **Preview Branches:** All branches
- **Build Command:** `npm run build`
- **Build Output Directory:** `out`
- **Root Directory:** `/`
- **Compatibility Date:** 2024-01-01

### Environment Variables (Cloudflare Pages Dashboard)
```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_web_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI Services
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key_here
CEREBRAS_API_KEY=your_cerebras_api_key_here

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id
NEXT_PUBLIC_COOKIEBOT_ID=your_cookiebot_id
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=your_linkedin_partner_id
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_search_console_token

# Scheduling
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/ayushsharmavlogs619/30min

# Voice AI
VAPI_API_KEY=your_vapi_api_key_here
VAPI_PHONE_NUMBER=+1your-phone-number-here

# Worker Proxy
NEXT_PUBLIC_WORKER_URL=https://edge.brandverse.tech

# Mailchimp (Optional)
NEXT_PUBLIC_MAILCHIMP_API_KEY=your_mailchimp_api_key
NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID=your_audience_id

# Web Push (Optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

### Deployment Commands
```bash
# Deploy to Cloudflare Pages
npm run deploy:cloudflare

# Deploy subdomain router worker
npm run deploy:subdomain-router

# Deploy both
npm run deploy:all
```

### Rollback Commands
```bash
# Via Cloudflare Dashboard:
# 1. Go to Pages project
# 2. Select Deployments
# 3. Click "Rollback" on previous deployment

# Via Git:
# 1. Revert to previous commit
# 2. Push to production branch
# 3. Automatic deployment triggers
```

---

## Cloudflare Workers

### Worker 1: Main Site Worker
- **Name:** Brandverse Pages Functions
- **Script:** `_functions/[[path]].js`
- **Purpose:** Subdomain routing for Pages
- **Triggers:** HTTP requests to Pages functions
- **Environment Variables:** None (uses Pages env vars)

### Worker 2: Subdomain Router
- **Name:** Brandverse Subdomain Router
- **Script:** `subdomain-router/worker.js`
- **Config:** `subdomain-router/wrangler.toml`
- **Purpose:** Standalone subdomain routing
- **Environment Variables:**
  - `PAGES_BASE` - Base URL for Pages (default: https://brandverse.tech)

### Worker 3: Lead Capture Worker (Inferred)
- **Name:** Brandverse Lead Proxy
- **URL:** `https://edge.brandverse.tech`
- **Purpose:** Lead capture with Airtable/Sheets integration
- **Environment Variables:**
  - `AIRTABLE_API_KEY`
  - `AIRTABLE_BASE_ID`
  - `AIRTABLE_TABLE_NAME`
  - `GOOGLE_SHEETS_API_KEY`
  - `GOOGLE_SHEETS_SPREADSHEET_ID`
  - `GOOGLE_SHEETS_TAB_NAME`

---

## Third-Party Services

### Firebase
- **Project ID:** [To be provided]
- **API Key:** [To be provided]
- **Auth Domain:** [To be provided]
- **Storage Bucket:** [To be provided]
- **Messaging Sender ID:** [To be provided]
- **App ID:** [To be provided]
- **Services Used:**
  - Authentication (if implemented)
  - Cloud Functions
  - Realtime Database
  - Cloud Storage
  - Cloud Messaging (FCM)

### Supabase
- **Project URL:** [To be provided]
- **Anon Key:** [To be provided]
- **Services Used:**
  - Postgres Database
  - Real-time Subscriptions
  - Authentication (alternative)

### Vapi AI
- **API Key:** [To be provided]
- **Phone Number:** [To be provided]
- **Assistant ID:** [To be provided]
- **Public Key:** [To be provided]
- **Services Used:**
  - Voice AI agents
  - Phone call handling
  - Webhooks for lead capture

### Google Generative AI
- **API Key:** [To be provided]
- **Services Used:**
  - LLM integration
  - AI content generation

### Cerebras AI
- **API Key:** [To be provided]
- **Services Used:**
  - High-performance LLM (alternative to Google)

### Airtable
- **API Key:** [To be provided]
- **Base ID:** [To be provided]
- **Table Name:** [To be provided]
- **Services Used:**
  - Primary lead storage
  - CRM integration

### Google Sheets
- **API Key:** [To be provided]
- **Spreadsheet ID:** [To be provided]
- **Tab Name:** [To be provided]
- **Services Used:**
  - Fallback lead storage
  - Simple CRM

### FormSubmit
- **Email:** ayush@brandverse.tech
- **Services Used:**
  - Backup lead capture
  - Email notifications

### Mailchimp
- **API Key:** [To be provided]
- **Audience ID:** [To be provided]
- **Services Used:**
  - Email marketing
  - Newsletter management

### Google Analytics
- **Measurement ID:** [To be provided]
- **Services Used:**
  - Website analytics
  - User tracking

### Meta Pixel
- **Pixel ID:** [To be provided]
- **Services Used:**
  - Conversion tracking
  - Ad optimization

### Calendly
- **URL:** [To be provided]
- **Services Used:**
  - Appointment scheduling
  - Meeting booking

### Cookiebot
- **ID:** [To be provided]
- **Services Used:**
  - GDPR compliance
  - Cookie consent management

### LinkedIn Insight
- **Partner ID:** [To be provided]
- **Services Used:**
  - B2B tracking
  - LinkedIn ads optimization

---

## Build & Deployment Configuration

### Package.json Scripts
```json
{
  "dev": "next dev",
  "build": "node scripts/validate-env.js && next build",
  "build:skip-validation": "next build",
  "start": "next start",
  "lint": "eslint",
  "deploy": "node deploy-cloudflare.js",
  "deploy:cloudflare": "npx wrangler pages deploy out --project-name brandverse --branch=production",
  "deploy:subdomain-router": "npx wrangler deploy --config subdomain-router/wrangler.toml",
  "deploy:all": "node deploy-cloudflare.js && npm run deploy:subdomain-router"
}
```

### Next.js Configuration
```typescript
{
  output: "export",
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: "http", hostname: "localhost", pathname: "/**" }],
    unoptimized: true
  },
  distDir: "out"
}
```

### TypeScript Configuration
```json
{
  "target": "ES2017",
  "strict": true,
  "jsx": "react-jsx",
  "moduleResolution": "bundler",
  "paths": { "@/*": ["./*"] }
}
```

---

## Git Repository

### Repository
- **URL:** https://github.com/ayushsharmavlogs619-lang/brandverse.git
- **Visibility:** Private
- **Main Branch:** `production`
- **Development Branches:** Feature branches

### Branch Protection (Recommended)
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Block force pushes

### Deployment Triggers
- Push to `production` branch → Cloudflare Pages deployment
- Manual deployment via `npm run deploy`

---

## Local Development Setup

### Prerequisites
- Node.js v24.18.0
- npm 11.16.0
- Git

### Setup Commands
```bash
# Clone repository
git clone https://github.com/ayushsharmavlogs619-lang/brandverse.git
cd brandverse

# Install dependencies
npm install

# Create environment file
cp env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

---

## Security Secrets

### Critical Secrets (Never Commit to Git)
- Firebase private keys
- Vapi private API key
- Airtable API keys
- Google Sheets service account credentials
- Mailchimp API keys
- Cerebras API key
- Google Generative AI API key

### Secret Management
- **Cloudflare Pages:** Environment variables in dashboard
- **Cloudflare Workers:** Secrets in worker settings
- **Local Development:** `.env.local` (gitignored)

### Secret Rotation Strategy
- Rotate API keys every 90 days
- Document rotation in changelog
- Test rotation in staging first
- Update all environments simultaneously

---

## Monitoring & Alerting

### Current Monitoring
- Google Analytics (user analytics)
- Console logging (development)
- Cloudflare Pages analytics (deployment metrics)

### Recommended Monitoring
- Uptime monitoring (Pingdom, UptimeRobot)
- Error tracking (Sentry, LogRocket)
- Worker health monitoring (Cloudflare analytics)
- Lead capture failure alerts (custom webhook)

---

## Backup Strategy

### Code Backup
- **Git Repository:** Primary backup
- **Frequency:** Every commit
- **Retention:** Infinite (GitHub)

### Database Backup
- **Airtable:** Automatic (Airtable responsibility)
- **Google Sheets:** Version history (Google responsibility)
- **Firebase:** Automatic (Firebase responsibility)

### Configuration Backup
- **Environment Variables:** Documented in this file
- **DNS Records:** Cloudflare backup
- **Worker Configs:** Git repository

---

## Disaster Recovery Procedures

### Website Down
1. Check Cloudflare Pages status
2. Check DNS propagation
3. Verify SSL certificate
4. Restore from previous deployment if needed

### Lead Capture Failure
1. Check Worker Proxy status
2. Verify Airtable/Sheets API keys
3. Check FormSubmit service status
4. Fallback to email backup automatically

### Worker Failure
1. Check Cloudflare Workers status
2. Redeploy worker from Git
3. Verify environment variables
4. Test worker endpoints

### Database Failure
1. Check Airtable/Sheets status
2. Verify API credentials
3. Switch to fallback storage
4. Restore from backup if needed

---

## Contact Information

### Technical Contacts
- **Founder/Owner:** Ayush Sharma
- **Email:** ayush@brandverse.tech

### Service Provider Contacts
- **Cloudflare:** https://support.cloudflare.com
- **Firebase:** https://firebase.google.com/support
- **Vapi AI:** https://vapi.ai/support
- **GitHub:** https://github.com/contact

---

## Maintenance Schedule

### Daily
- Monitor uptime
- Check lead capture success rate
- Review error logs

### Weekly
- Review analytics
- Check for dependency updates
- Monitor API usage quotas

### Monthly
- Security audit
- Dependency updates
- Performance review
- Backup verification

### Quarterly
- Secret rotation
- Architecture review
- Cost optimization
- Disaster recovery testing

---

## Cost Summary

### Cloudflare Pages
- **Cost:** Free tier (sufficient for current traffic)
- **Limits:** 500 builds/month, unlimited bandwidth

### Cloudflare Workers
- **Cost:** Free tier (100k requests/day)
- **Limits:** 10ms CPU time per request

### Firebase
- **Cost:** Spark plan (free) or Blaze plan (pay-as-you-go)
- **Estimated:** $0-25/month depending on usage

### Airtable
- **Cost:** Free tier (1,000 records) or Pro plan ($20/month)
- **Estimated:** $0-20/month

### Vapi AI
- **Cost:** Usage-based
- **Estimated:** $50-200/month depending on call volume

### Google Services
- **Cost:** Free tier with usage limits
- **Estimated:** $0-50/month

### Total Estimated Monthly Cost
- **Minimum:** $0-50/month (free tiers)
- **Production:** $100-300/month (with paid services)

---

## Change Log

### July 23, 2026
- Initial production inventory created
- Documented all domains, services, and configurations
- Established disaster recovery procedures

---

## Notes

### Missing Information
The following information needs to be filled in by the founder:
- [ ] Firebase project details
- [ ] Vapi API keys and phone number
- [ ] Airtable base and table IDs
- [ ] Google Sheets spreadsheet ID
- [ ] Mailchimp API keys
- [ ] Google Analytics measurement ID
- [ ] Meta Pixel ID
- [ ] Calendly URL
- [ ] DNS registrar details
- [ ] Actual service costs

### Action Items
- [ ] Fill in missing service credentials
- [ ] Set up uptime monitoring
- [ ] Implement error tracking
- [ ] Create backup verification process
- [ ] Document actual costs
- [ ] Set up alerting for failures
