# WWW.TROUBLESHOOTING - CNAME Already Exists But Still Broken

## If CNAME Already Exists, Check These 5 Things:

### 1. Check Cloudflare Pages Custom Domain (Most Likely Issue)
Even if DNS CNAME exists, Cloudflare Pages needs the domain added separately:

**Go to:** Cloudflare Dashboard → Workers & Pages → Pages → brandverse → Custom Domains

**Look for:**
- Is `www.brandverse.tech` listed under Custom Domains?
- If not listed → Click "Set up a custom domain" → Add it
- If listed but inactive → Click "Activate"
- If listed and active → Check status (should show "Active")

**This is different from DNS records!** Cloudflare Pages has its own domain configuration separate from DNS.

### 2. Check DNS Record Configuration
**Go to:** Cloudflare Dashboard → DNS → Records

**Check the www CNAME:**
- **Name**: `www`
- **Target**: Should be `brandverse.tech` (NOT something else)
- **Proxy status**: Must be ☁️ Proxied (orange cloud icon)
- **Status**: Should show "Active" (not grayed out)

**If target is wrong:** Update it to `brandverse.tech`
**If proxy is gray (DNS only):** Click to toggle to orange cloud
**If status is inactive:** Click to activate

### 3. Check SSL/TLS Certificate
**Go to:** Cloudflare Dashboard → SSL/TLS → Overview

**Check:**
- Encryption mode should be "Full" or "Full (strict)"
- Universal SSL status should be "Active Certificate"
- Edge Certificates should be ON

**If SSL is wrong:** Set to "Full" mode

### 4. Test Actual DNS Resolution
Run these commands to see what's actually happening:

**Windows Command Prompt:**
```cmd
nslookup www.brandverse.tech
ping www.brandverse.tech
```

**What to look for:**
- Should resolve to Cloudflare IPs (not "can't find")
- Should not show "Non-existent domain"

### 5. Check for Conflicting Records
**Go to:** Cloudflare Dashboard → DNS → Records

**Look for:**
- Any A records for `www` (should delete these, keep only CNAME)
- Any other CNAME records for `www` (should only have one)
- Any TXT records interfering with `www`

**Delete any conflicting records, keep only:**
- CNAME: www → brandverse.tech (Proxied)

---

## Most Likely Scenario:

**Your DNS CNAME exists, BUT Cloudflare Pages Custom Domain is missing/inactive.**

These are TWO DIFFERENT things:
- DNS CNAME = Routes traffic to your domain
- Cloudflare Pages Custom Domain = Tells Cloudflare Pages to serve that domain

**Fix:** Add/activate www.brandverse.tech in Cloudflare Pages → Custom Domains section (NOT DNS section)

---

## If Still Broken After All This:

**Check Cloudflare Pages Logs:**
1. Workers & Pages → Pages → brandverse → Functions → Logs
2. Look for errors related to www.domain requests

**Try Temporary Redirect:**
If www can't work immediately, set up a page-level redirect in Next.js:
```javascript
// In middleware or layout
if (hostname === 'www.brandverse.tech') {
  return NextResponse.redirect('https://brandverse.tech' + url);
}
```

---

## Quick Diagnostic Steps:

1. Check Cloudflare Pages Custom Domains (most likely missing)
2. Verify DNS CNAME target is correct
3. Check SSL/TLS status
4. Run nslookup/ping to test actual DNS
5. Look for conflicting DNS records

**Start with #1 - that's usually the issue when CNAME exists but site still shows 522.**