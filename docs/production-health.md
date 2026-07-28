# Brandverse Production Health System

**Generated:** July 23, 2026  
**Purpose:** Comprehensive guide to diagnosing and fixing production issues

---

## Overview

This document provides a complete health system for Brandverse production infrastructure. Any engineer should be able to use this document to diagnose issues, understand root causes, and execute fix procedures without founder involvement.

---

## System Components & Failure Modes

### 1. DNS

#### Symptoms
- Website not loading (DNS_PROBE_FINISHED_NXDOMAIN)
- Intermittent loading
- Loading wrong site
- SSL certificate errors

#### Root Causes
- DNS records misconfigured
- Domain expired
- DNS propagation delay
- Cloudflare DNS outage
- Nameserver issues

#### Verification Commands
```bash
# Check DNS resolution
nslookup brandverse.tech
dig brandverse.tech

# Check DNS propagation
dig +trace brandverse.tech

# Check from multiple locations
# Use: https://dnschecker.org

# Check SSL certificate
openssl s_client -connect brandverse.tech:443 -servername brandverse.tech
```

#### Fix Procedures
**DNS Misconfigured:**
1. Log into Cloudflare Dashboard
2. Go to DNS → Records
3. Verify A record points to Cloudflare Pages IP
4. Verify CNAME for www points to brandverse.tech
5. Verify CNAME for edge points to Workers
6. Save changes
7. Wait for propagation (5-15 minutes)

**Domain Expired:**
1. Log into domain registrar
2. Renew domain immediately
3. Update DNS if nameservers changed
4. Wait for propagation

**Cloudflare DNS Outage:**
1. Check Cloudflare status page: https://www.cloudflarestatus.com
2. If outage, wait for resolution
3. Consider temporary DNS failover to backup provider

#### Rollback Procedures
```bash
# Restore previous DNS configuration from Cloudflare DNS history
# 1. Go to Cloudflare Dashboard → DNS → Records
# 2. Click "Audit Log" 
# 3. Find previous configuration
# 4. Restore records
```

---

### 2. SSL/TLS

#### Symptoms
- "Your connection is not private" error
- SSL certificate expired warning
- Mixed content errors
- HTTPS not working

#### Root Causes
- SSL certificate expired
- SSL certificate misconfigured
- Mixed content (HTTP resources on HTTPS page)
- Cloudflare SSL mode incorrect
- Certificate authority issues

#### Verification Commands
```bash
# Check SSL certificate
curl -Iv https://brandverse.tech

# Check SSL expiration
echo | openssl s_client -connect brandverse.tech:443 2>/dev/null | openssl x509 -noout -dates

# Check for mixed content
# Use browser DevTools → Console
# Or use: https://www.jitbit.com/sslcheck/
```

#### Fix Procedures
**SSL Expired:**
1. Cloudflare auto-renews SSL (if using Universal SSL)
2. If using custom SSL:
   - Log into Cloudflare Dashboard
   - Go to SSL/TLS → Edge Certificates
   - Upload new certificate
   - Update private key
3. Force SSL renewal

**Mixed Content:**
1. Identify HTTP resources in DevTools Console
2. Update code to use HTTPS for all resources
3. Deploy fix to production
4. Clear browser cache

**Cloudflare SSL Mode:**
1. Go to Cloudflare Dashboard → SSL/TLS
2. Set mode to "Full (strict)"
3. Verify origin server has valid SSL
4. Test with curl

#### Rollback Procedures
```bash
# Revert to previous SSL certificate
# 1. Cloudflare Dashboard → SSL/TLS → Edge Certificates
# 2. Upload previous certificate from backup
# 3. Update private key
```

---

### 3. Cloudflare Pages Deployment

#### Symptoms
- Website showing old content
- Deployment failed
- 404 errors on new pages
- Build errors in dashboard

#### Root Causes
- Build failure
- Deployment stuck in queue
- Branch misconfiguration
- Environment variables missing
- Git repository issues

#### Verification Commands
```bash
# Check deployment status via Cloudflare Dashboard
# Or use Cloudflare API:
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments" \
  -H "Authorization: Bearer {api_token}"

# Check build logs in Cloudflare Dashboard
# Pages → brandverse → Deployments → Click deployment → View logs
```

#### Fix Procedures
**Build Failure:**
1. Check build logs in Cloudflare Dashboard
2. Identify error (missing dependency, syntax error, etc.)
3. Fix in local development
4. Test locally: `npm run build`
5. Commit and push to production branch
6. Monitor new deployment

**Deployment Stuck:**
1. Cancel stuck deployment in Cloudflare Dashboard
2. Clear build cache
3. Trigger new deployment with empty commit:
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push origin production
   ```

**Environment Variables Missing:**
1. Go to Cloudflare Dashboard → Pages → Settings → Environment Variables
2. Add missing variables from `env.example`
3. Trigger new deployment
4. Verify build succeeds

#### Rollback Procedures
```bash
# Via Cloudflare Dashboard:
# 1. Pages → brandverse → Deployments
# 2. Find previous successful deployment
# 3. Click "Rollback" → Confirm

# Via Git:
# 1. Revert to previous commit
git revert HEAD
# 2. Push to production
git push origin production
```

---

### 4. Cloudflare Workers

#### Symptoms
- Subdomain routing not working
- Lead capture failing
- Worker returning 500 errors
- Worker timeout errors

#### Root Causes
- Worker deployment failed
- Worker code error
- Environment variables missing
- API rate limits exceeded
- Worker CPU timeout

#### Verification Commands
```bash
# Test worker directly
curl https://edge.brandverse.tech/api/brandverse/leads

# Check worker logs in Cloudflare Dashboard
# Workers → brandverse-lead-proxy → Logs → Start real-time logs

# Check worker metrics
# Workers → brandverse-lead-proxy → Metrics
```

#### Fix Procedures
**Worker Deployment Failed:**
1. Check worker logs for errors
2. Fix code locally
3. Test locally with wrangler:
   ```bash
   npx wrangler dev
   ```
4. Deploy:
   ```bash
   npm run deploy:subdomain-router
   ```

**Worker Code Error:**
1. Check real-time logs in Cloudflare Dashboard
2. Identify error (syntax, runtime, etc.)
3. Fix code
4. Deploy fix
5. Test with curl

**Environment Variables Missing:**
1. Go to Workers → Settings → Variables
2. Add missing secrets
3. Redeploy worker
4. Test endpoint

**Rate Limits Exceeded:**
1. Check Cloudflare Workers usage
2. Upgrade plan if needed
3. Implement caching
4. Add rate limiting in code

#### Rollback Procedures
```bash
# Via Cloudflare Dashboard:
# 1. Workers → brandverse-lead-proxy → Deployments
# 2. Find previous deployment
# 3. Click "Rollback"

# Via wrangler:
# 1. Checkout previous commit
git checkout <previous-commit-hash>
# 2. Deploy
npm run deploy:subdomain-router
```

---

### 5. APIs (External Services)

#### Symptoms
- Lead capture failing
- AI features not working
- Analytics not tracking
- Forms not submitting

#### Root Causes
- API key expired/invalid
- API service down
- Rate limits exceeded
- API endpoint changed
- Network connectivity issues

#### Verification Commands
```bash
# Test Worker Proxy API
curl -X POST https://edge.brandverse.tech/api/brandverse/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","full_name":"Test User"}'

# Test Vapi API (requires API key)
curl -X GET https://api.vapi.ai/assistant \
  -H "Authorization: Bearer {VAPI_API_KEY}"

# Test Firebase connection
# Check Firebase Console → Project Settings

# Check service status pages:
# - Cloudflare: https://www.cloudflarestatus.com
# - Firebase: https://status.firebase.google.com
# - Vapi: Check Vapi status page
```

#### Fix Procedures
**API Key Expired:**
1. Generate new API key from service dashboard
2. Update Cloudflare environment variables
3. Redeploy Workers/Pages
4. Test with curl/Wrangler

**API Service Down:**
1. Check service status page
2. Wait for service recovery
3. Implement fallback if available
4. Monitor service status

**Rate Limits Exceeded:**
1. Check service dashboard for usage
2. Upgrade plan if needed
3. Implement caching/queueing
4. Reduce API call frequency

**API Endpoint Changed:**
1. Check service documentation
2. Update code with new endpoint
3. Deploy fix
4. Test integration

#### Rollback Procedures
```bash
# Restore previous API key from backup
# 1. Service dashboard → API keys
# 2. Find previous key in history
# 3. Update environment variables
# 4. Redeploy
```

---

### 6. Lead Capture

#### Symptoms
- Forms not submitting
- Leads not appearing in Airtable/Sheets
- FormSubmit emails not received
- Error messages on form submission

#### Root Causes
- Worker Proxy down
- Airtable/Sheets API down
- FormSubmit service down
- Validation errors
- Spam detection blocking legitimate leads
- Network issues

#### Verification Commands
```bash
# Test lead capture endpoint
curl -X POST https://edge.brandverse.tech/api/brandverse/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","full_name":"Test User"}'

# Check Airtable connection
# Airtable Dashboard → API documentation → Test endpoint

# Check Google Sheets
# Google Sheets → Share → API access

# Check FormSubmit
# Submit test form via website
```

#### Fix Procedures
**Worker Proxy Down:**
1. Check Worker status (see Worker section)
2. Fix or redeploy worker
3. Test endpoint
4. Monitor lead capture

**Airtable/Sheets API Down:**
1. Check service status
2. Wait for recovery
3. Fallback to FormSubmit (automatic)
4. Fallback to email (automatic)

**FormSubmit Down:**
1. Check FormSubmit status
2. Wait for recovery
3. Fallback to email (automatic)
4. Monitor localStorage for failed leads

**Validation Errors:**
1. Check form validation rules in `lib/lead-service.ts`
2. Adjust validation if too strict
3. Deploy fix
4. Test form submission

**Spam Detection Issues:**
1. Check spam patterns in `lib/lead-service.ts`
2. Adjust patterns if blocking legitimate leads
3. Deploy fix
4. Test with legitimate data

#### Rollback Procedures
```bash
# Restore previous lead service version
git checkout <previous-commit>
npm run build
npm run deploy:cloudflare

# Manual lead recovery:
# 1. Check localStorage for failed leads
# 2. Check email backups
# 3. Manually enter leads into CRM
```

---

### 7. Vapi AI (Voice Receptionist)

#### Symptoms
- Voice demo not loading
- AI not responding
- Phone calls not connecting
- Voice quality issues

#### Root Causes
- Vapi API key invalid
- Assistant ID incorrect
- Phone number issues
- Vapi service down
- Browser compatibility issues

#### Verification Commands
```bash
# Test Vapi API
curl -X GET https://api.vapi.ai/assistant/{assistant_id} \
  -H "Authorization: Bearer {VAPI_API_KEY}"

# Check Vapi dashboard
# https://api.vapi.ai/dashboard

# Test voice demo page
# Navigate to /demos/voice in browser
# Open DevTools → Console for errors
```

#### Fix Procedures
**API Key Invalid:**
1. Generate new API key from Vapi dashboard
2. Update environment variables
3. Redeploy Pages
4. Test voice demo

**Assistant ID Incorrect:**
1. Check Vapi dashboard for correct assistant ID
2. Update environment variable
3. Redeploy Pages
4. Test voice demo

**Phone Number Issues:**
1. Check Vapi dashboard for phone number status
2. Verify number is active
3. Check call forwarding settings
4. Test with actual phone call

**Vapi Service Down:**
1. Check Vapi status page
2. Wait for recovery
3. Display maintenance message on site

#### Rollback Procedures
```bash
# Restore previous Vapi configuration
# 1. Vapi Dashboard → Assistants
# 2. Find previous assistant version
# 3. Update environment variable
# 4. Redeploy
```

---

### 8. Supabase

#### Symptoms
- Real-time features not working
- Database queries failing
- Authentication issues
- Connection timeouts

#### Root Causes
- Supabase service down
- API key expired
- Database connection pool exhausted
- Row-level security policies blocking access
- Network issues

#### Verification Commands
```bash
# Test Supabase connection
# Use Supabase Dashboard → SQL Editor
# Run: SELECT 1;

# Check Supabase status
# https://status.supabase.com

# Check API key validity
# Supabase Dashboard → Settings → API
```

#### Fix Procedures
**Supabase Service Down:**
1. Check status page
2. Wait for recovery
3. Implement fallback if critical

**API Key Expired:**
1. Generate new key from Supabase dashboard
2. Update environment variables
3. Redeploy Pages
4. Test connection

**Connection Pool Exhausted:**
1. Check Supabase dashboard for connection metrics
2. Upgrade plan if needed
3. Implement connection pooling
4. Optimize queries

**RLS Issues:**
1. Check RLS policies in Supabase dashboard
2. Adjust policies if too restrictive
3. Test with authenticated user
4. Deploy fix

#### Rollback Procedures
```bash
# Restore previous RLS policies
# 1. Supabase Dashboard → Authentication → Policies
# 2. Find previous policy version
# 3. Restore policy
```

---

### 9. Firebase

#### Symptoms
- Authentication failing
- Cloud Functions not executing
- Realtime Database not syncing
- Storage upload failing

#### Root Causes
- Firebase service down
- API key expired
- Quota exceeded
- Rules misconfigured
- Network issues

#### Verification Commands
```bash
# Check Firebase status
# https://status.firebase.google.com

# Test Firebase connection
# Firebase Console → Project Settings → Test connection

# Check quotas
# Firebase Console → Usage and quotas
```

#### Fix Procedures
**Firebase Service Down:**
1. Check status page
2. Wait for recovery
3. Implement fallback if critical

**API Key Expired:**
1. Generate new key from Firebase console
2. Update environment variables
3. Redeploy Pages
4. Test connection

**Quota Exceeded:**
1. Check Firebase console for usage
2. Upgrade plan if needed
3. Optimize usage
4. Implement caching

**Rules Misconfigured:**
1. Check Firebase Security Rules
2. Adjust rules if too restrictive
3. Test with authenticated user
4. Deploy fix

#### Rollback Procedures
```bash
# Restore previous security rules
# 1. Firebase Console → Database → Rules
# 2. Find previous version in history
# 3. Restore rules
```

---

### 10. Calendly Integration

#### Symptoms
- Calendly widget not loading
- Booking button not working
- Calendar not syncing

#### Root Causes
- Calendly service down
- Invalid Calendly URL
- Widget configuration issues
- Network issues

#### Verification Commands
```bash
# Test Calendly URL
curl -I https://calendly.com/ayushsharmavlogs619/30min

# Check Calendly status
# https://status.calendly.com

# Test widget in browser
# Navigate to page with Calendly embed
# Open DevTools → Console for errors
```

#### Fix Procedures
**Calendly Service Down:**
1. Check status page
2. Wait for recovery
3. Display alternative booking method

**Invalid URL:**
1. Check Calendly dashboard for correct URL
2. Update environment variable
3. Redeploy Pages
4. Test widget

**Widget Issues:**
1. Check Calendly embed code
2. Verify widget configuration
3. Test in different browsers
4. Deploy fix

#### Rollback Procedures
```bash
# Restore previous Calendly URL
# 1. Update environment variable
# 2. Redeploy Pages
```

---

### 11. Forms (FormSubmit)

#### Symptoms
- Forms not submitting
- No email received
- FormSubmit errors

#### Root Causes
- FormSubmit service down
- Email not confirmed
- Form configuration issues
- Spam filtering

#### Verification Commands
```bash
# Test FormSubmit endpoint
curl -X POST https://formsubmit.co/ayush@brandverse.tech \
  -d "email=test@example.com" \
  -d "name=Test User"

# Check FormSubmit status
# https://formsubmit.co/status

# Check email confirmation
# Check inbox for FormSubmit confirmation email
```

#### Fix Procedures
**FormSubmit Down:**
1. Check status page
2. Wait for recovery
3. Fallback to email (automatic)

**Email Not Confirmed:**
1. Check inbox for confirmation email
2. Click confirmation link
3. Resend confirmation if needed

**Configuration Issues:**
1. Check form configuration in `lib/forms.ts`
2. Verify FormSubmit action URL
3. Test form submission
4. Deploy fix

#### Rollback Procedures
```bash
# Restore previous form configuration
git checkout <previous-commit>
npm run build
npm run deploy:cloudflare
```

---

## Emergency Procedures

### Complete Website Outage

**Immediate Actions:**
1. Check Cloudflare status page
2. Check DNS resolution
3. Check SSL certificate
4. Check Pages deployment status
5. Check Worker status

**Decision Tree:**
```
Is Cloudflare down?
├─ Yes → Wait for recovery, monitor status page
└─ No → Continue

Is DNS resolving?
├─ No → Fix DNS records, wait for propagation
└─ No → Continue

Is SSL valid?
├─ No → Renew SSL certificate
└─ Yes → Continue

Is Pages deployment successful?
├─ No → Rollback to previous deployment
└─ Yes → Continue

Is Worker functioning?
├─ No → Redeploy worker
└─ Yes → Check other services
```

### Lead Capture Complete Failure

**Immediate Actions:**
1. Test Worker Proxy endpoint
2. Check Airtable/Sheets status
3. Check FormSubmit status
4. Monitor localStorage for failed leads
5. Check email backup

**Fallback Chain:**
```
Worker Proxy → Airtable (primary)
    ↓ fail
Worker Proxy → Google Sheets (fallback)
    ↓ fail
FormSubmit direct (backup)
    ↓ fail
mailto + localStorage (last resort)
```

**Manual Recovery:**
1. Extract failed leads from localStorage
2. Check email backups
3. Manually enter leads into CRM
4. Fix root cause
5. Test lead capture flow

### Data Loss Incident

**Immediate Actions:**
1. Identify scope of data loss
2. Check service backups
3. Check Git history for configuration
4. Notify stakeholders
5. Begin recovery

**Recovery Priority:**
1. Lead data (highest priority)
2. Configuration data
3. Analytics data
4. User data (if applicable)

---

## Monitoring Setup

### Recommended Monitoring Tools

**Uptime Monitoring:**
- UptimeRobot (free)
- Pingdom (paid)
- StatusCake (free tier)

**Error Tracking:**
- Sentry (paid)
- LogRocket (paid)
- Cloudflare Analytics (free)

**Performance Monitoring:**
- web.dev / Lighthouse
- Cloudflare Web Analytics
- Google PageSpeed Insights

**Log Aggregation:**
- Cloudflare Logs
- Service-specific dashboards
- Custom logging solution

### Alert Configuration

**Critical Alerts (Immediate):**
- Website down
- Lead capture failure rate > 10%
- Worker failure
- SSL certificate expiring < 7 days

**Warning Alerts (Daily):**
- High error rate
- Slow page load times
- API rate limits approaching

**Info Alerts (Weekly):**
- Deployment summaries
- Usage statistics
- Cost reports

---

## Health Check Scripts

See `scripts/health-check.js` for automated health checks.

---

## Contact Information

**Technical Lead:** Ayush Sharma (ayush@brandverse.tech)

**Service Support:**
- Cloudflare: https://support.cloudflare.com
- Firebase: https://firebase.google.com/support
- Vapi: https://vapi.ai/support
- Supabase: https://supabase.com/support

---

## Change Log

### July 23, 2026
- Initial production health system created
- Documented all failure modes and fix procedures
- Established emergency procedures
