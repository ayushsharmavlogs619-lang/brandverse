# Brandverse System Architecture Report

**Generated:** July 23, 2026  
**Repository:** https://github.com/ayushsharmavlogs619-lang/brandverse.git  
**Node Version:** v24.18.0  
**Package Manager:** npm 11.16.0

---

## Executive Summary

Brandverse is a Next.js 16 static site deployed on Cloudflare Pages with AI voice agent capabilities. The architecture prioritizes reliability, lead capture redundancy, and minimal operational overhead.

**Key Characteristics:**
- Static export deployment (no server-side runtime)
- Multi-layer lead capture fallback system
- Cloudflare Workers for edge routing
- Vapi AI integration for voice agents
- Firebase and Supabase for backend services

---

## Frontend Architecture

### Framework & Runtime
- **Framework:** Next.js 16.1.1 (Turbopack)
- **React:** 19.2.1
- **TypeScript:** 5.x
- **Output Mode:** Static export (`output: "export"`)
- **Build Output:** `out/` directory
- **Deployment Target:** Cloudflare Pages

### Styling
- **CSS Framework:** Tailwind CSS 4
- **PostCSS:** Enabled
- **Custom CSS:** `app/globals.css`
- **Design System:** Custom gradient-based dark theme

### Key Components
```
app/
├── components/
│   ├── Analytics.tsx          # Google Analytics & Meta Pixel
│   ├── CTASection.tsx         # Call-to-action sections
│   ├── ChatWidget.tsx         # AI chat interface
│   ├── ErrorBoundary.tsx      # React error boundary
│   ├── Footer.tsx            # Site footer
│   ├── LeadForm.tsx          # Lead capture form
│   ├── Navbar.tsx            # Navigation
│   ├── PushNotificationBanner.tsx  # Web push notifications
│   ├── StructuredData.tsx    # SEO structured data
│   └── TeamMember.tsx        # Team member cards
├── lib/
│   ├── ai.ts                 # AI service integrations
│   ├── api-client.ts         # Safe API client with fallbacks
│   ├── blog-content.ts       # Blog article data
│   ├── config.ts             # Centralized configuration
│   ├── forms.ts              # FormSubmit integration
│   ├── lead-service.ts       # Lead capture service
│   ├── mailchimp-service.ts  # Mailchimp integration
│   └── subdomain-routing.js  # Subdomain routing logic
└── pages/
    ├── /                     # Landing page
    ├── /about               # About page
    ├── /blog/[slug]         # Blog posts (SSG)
    ├── /contact             # Contact form
    ├── /demos/voice         # Voice demo
    ├── /lead-magnet         # Lead magnet landing
    └── /prospects/*         # Prospect-specific pages
```

---

## Backend Architecture

### Cloudflare Workers

#### 1. Main Site Worker (`_functions/[[path]].js`)
- **Purpose:** Subdomain routing for Cloudflare Pages
- **Location:** `_functions/[[path].js`
- **Function:** Routes subdomain requests to appropriate paths

#### 2. Subdomain Router Worker (`subdomain-router/worker.js`)
- **Purpose:** Standalone worker for subdomain routing
- **Config:** `subdomain-router/wrangler.toml`
- **Deployment:** Separate Cloudflare Workers deployment

### External APIs & Services

#### Lead Capture Pipeline
```
Frontend Form → Lead Service → Worker Proxy → Airtable (primary)
                                          ↓
                                      Google Sheets (fallback)
                                          ↓
                                      FormSubmit (backup)
                                          ↓
                                      mailto (last resort)
```

**Components:**
- **Worker Proxy URL:** `https://edge.brandverse.tech` (configurable via `NEXT_PUBLIC_WORKER_URL`)
- **Primary Storage:** Airtable (via Worker)
- **Fallback Storage:** Google Sheets (via Worker)
- **Backup Storage:** FormSubmit (direct from browser)
- **Last Resort:** mailto link + localStorage

#### AI Services
- **Vapi AI:** Voice agent platform
  - Config: `VAPI_API_KEY`, `VAPI_PHONE_NUMBER`
  - Public Key: `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
  - Assistant ID: `NEXT_PUBLIC_VAPI_ASSISTANT_ID`
- **Google Generative AI:** LLM integration
  - Config: `GOOGLE_GENERATIVE_AI_API_KEY`
- **Cerebras AI:** Alternative LLM (optional)
  - Config: `CEREBRAS_API_KEY`

#### Analytics & Tracking
- **Google Analytics:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Meta Pixel:** `NEXT_PUBLIC_META_PIXEL_ID`
- **LinkedIn Insight:** `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- **Cookiebot:** `NEXT_PUBLIC_COOKIEBOT_ID`

#### Email & Marketing
- **Mailchimp:** 
  - API Key: `NEXT_PUBLIC_MAILCHIMP_API_KEY`
  - Audience ID: `NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID`
- **FormSubmit:** All forms POST to ayush@brandverse.tech

#### Scheduling
- **Calendly:** `NEXT_PUBLIC_CALENDLY_URL`

---

## Database Architecture

### Firebase
**Purpose:** Authentication, Cloud Functions, Real-time Database

**Configuration Variables:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Usage:**
- Authentication (if implemented)
- Cloud Functions for backend logic
- Real-time data sync
- Push notifications

### Supabase
**Purpose:** Postgres database, real-time subscriptions

**Current Usage:** Referenced in tech stack but implementation not fully visible in current codebase
**Potential Use:**
- Alternative to Firebase for real-time features
- Postgres database for structured data
- Authentication alternative

---

## Deployment Architecture

### Cloudflare Pages
**Primary Deployment Target**

**Configuration:**
- **Build Command:** `npm run build`
- **Output Directory:** `out`
- **Branch:** `production`
- **Project Name:** `brandverse`
- **Compatibility Date:** 2024-01-01

**Build Process:**
1. Environment validation (`scripts/validate-env.js`)
2. Next.js static build
3. Output to `out/` directory
4. Deploy to Cloudflare Pages

**Environment Variables (Cloudflare Pages Dashboard):**
- All `NEXT_PUBLIC_*` variables from `env.example`
- Worker-specific variables in Workers dashboard

### Cloudflare Workers
**Edge Routing & Backend**

**Workers:**
1. **Main Site Worker:** Handles subdomain routing
2. **Subdomain Router Worker:** Standalone routing

**Deployment Commands:**
```bash
npm run deploy:cloudflare        # Deploy Pages
npm run deploy:subdomain-router # Deploy subdomain worker
npm run deploy:all              # Deploy both
```

### Alternative Deployment (Vercel)
**Configuration:** `vercel.json` exists but not primary target

---

## DNS Configuration

### Domains
- **Primary:** `brandverse.tech`
- **Subdomains:** Routed via Cloudflare Workers

### DNS Records (Inferred)
```
brandverse.tech        → Cloudflare Pages
*.brandverse.tech      → Cloudflare Workers (subdomain routing)
edge.brandverse.tech   → Worker Proxy (lead capture)
```

---

## Authentication Flows

### Current State
- Firebase authentication configured but not actively used in visible code
- No protected routes visible in current implementation
- Public-facing marketing site

### Potential Implementation
- Firebase Auth for client portal
- Supabase Auth as alternative
- Cookie-based sessions for protected areas

---

## Lead Capture Flow

### Multi-Layer Fallback System

**Flow:**
```
User submits form
    ↓
Lead validation & sanitization (lib/lead-service.ts)
    ↓
Spam detection
    ↓
POST to Worker Proxy (https://edge.brandverse.tech/api/brandverse/leads)
    ↓ success
Airtable storage (primary)
    ↓ failure
Google Sheets (fallback)
    ↓ failure
FormSubmit direct from browser (backup)
    ↓ failure
mailto link + localStorage (last resort)
```

**Data Collected:**
- Full name
- Email
- Phone
- Company
- Website
- Business type
- Service interest
- Message
- Source page
- Source form
- UTM parameters (source, medium, campaign)

**Validation:**
- Email format validation
- Phone format validation
- Spam pattern detection
- Input sanitization

---

## AI Receptionist Flow

### Vapi Integration
**Components:**
- Voice SDK: `@vapi-ai/web`
- Configuration: `lib/config.ts`
- Demo page: `/demos/voice`

**Flow:**
1. User visits voice demo page
2. Vapi widget initializes with public key
3. User interacts with AI voice agent
4. Conversation data sent to Vapi platform
5. Lead data captured via Vapi webhooks (if configured)

### Custom AI Agent Setup
**Script:** `scripts/setup-cerebras-agent.js`
**Purpose:** Create custom Vapi assistant with Cerebras LLM backend
**Requirements:**
- `VAPI_PRIVATE_KEY`
- `CEREBRAS_API_KEY`

---

## Environment Variables

### Required for Build
None - build succeeds with safe fallbacks

### Required for Runtime (Full Functionality)
**Critical:**
- `NEXT_PUBLIC_WORKER_URL` - Lead capture (defaults to https://edge.brandverse.tech)

**Optional but Recommended:**
- Firebase config (for auth/cloud functions)
- Vapi keys (for AI receptionist)
- Google Analytics (for tracking)
- Mailchimp keys (for email marketing)

**Full List:** See `env.example`

---

## Security Considerations

### Current Implementation
- Input sanitization in lead service
- Spam detection patterns
- No server-side secrets in frontend code
- Environment variable validation at build time

### Recommendations
- Implement rate limiting on Worker Proxy
- Add CSRF protection for forms
- Implement Content Security Policy headers
- Add API key rotation strategy
- Implement webhook signature verification for Vapi

---

## Performance Optimization

### Current Optimizations
- Static export (no server runtime)
- Image optimization disabled (unoptimized: true) - for static compatibility
- Tailwind CSS 4 (modern CSS engine)
- Turbopack for development builds

### Recommendations
- Enable image optimization with appropriate loader
- Implement service worker for offline support
- Add CDN caching headers
- Optimize bundle size (currently 105 warnings for unused code)

---

## Monitoring & Observability

### Current State
- Google Analytics integration
- Console logging for lead capture failures
- LocalStorage for failed lead retry

### Recommendations
- Add error tracking (Sentry, LogRocket)
- Implement uptime monitoring
- Add performance monitoring (Web Vitals)
- Set up alerting for lead capture failures
- Monitor Worker health

---

## Scalability Considerations

### Current Architecture
- Static site (scales infinitely via CDN)
- Cloudflare Workers (auto-scaling edge compute)
- Airtable/Sheets (API rate limits apply)

### Bottlenecks
- Airtable API rate limits (5 requests/second free tier)
- Google Sheets API quotas
- FormSubmit rate limits

### Recommendations
- Implement queue system for high-volume lead capture
- Consider direct database integration for scale
- Add caching layer for frequently accessed data
- Implement CDN caching for API responses

---

## Disaster Recovery

### Current Protections
- Multi-layer lead capture fallback
- LocalStorage backup for failed leads
- Static site (can be redeployed from Git)

### Recommendations
- Automated database backups
- Git-based configuration backup
- Disaster recovery runbook
- Regular restore testing

---

## Technology Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | Next.js 16, React 19 | Static site framework |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| Type Safety | TypeScript 5 | Static typing |
| Deployment | Cloudflare Pages | Static hosting |
| Edge Routing | Cloudflare Workers | Subdomain routing |
| Voice AI | Vapi AI | Voice agents |
| LLM | Google Generative AI, Cerebras | AI processing |
| Backend | Firebase, Supabase | Database & auth |
| Analytics | Google Analytics, Meta Pixel | Tracking |
| Email | FormSubmit, Mailchimp | Email marketing |
| Scheduling | Calendly | Appointment booking |

---

## Known Issues & Technical Debt

### Linting Warnings (105 total)
- Unused imports/variables (non-blocking)
- `any` types in API client (acceptable for dynamic data)
- Unused variables in calculations (yearlyROI, techStack)

### Recommendations
- Clean up unused imports
- Add proper type definitions for API responses
- Remove dead code from page.tsx

---

## Next Steps for Engineering Team

1. **Environment Setup:** Create `.env.local` from `env.example`
2. **Worker Deployment:** Deploy Worker Proxy to Cloudflare
3. **Database Setup:** Configure Airtable/Sheets integration
4. **AI Configuration:** Set up Vapi assistant
5. **Monitoring:** Implement error tracking
6. **Testing:** End-to-end lead capture testing
7. **Documentation:** Update this doc as architecture evolves

---

## Conclusion

The Brandverse architecture is well-designed for a static marketing site with AI capabilities. The multi-layer lead capture system provides excellent redundancy. The primary areas for improvement are monitoring, error tracking, and cleanup of technical debt (unused code).

**Production Readiness:** 85%
**Blockers:** None (builds and runs successfully)
**Recommendations:** Implement monitoring and clean up warnings before full production deployment.
