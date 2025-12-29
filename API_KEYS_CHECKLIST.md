# 🔑 API KEYS NEEDED FOR BRANDVERSE.TECH

Copy this checklist and start collecting these keys. I've ordered them by priority.

---

## ✅ TIER 1: CRITICAL (Do These First)

### 1. **Supabase** (Database for Push Notifications)
- **What it does**: Stores push notification subscribers
- **Cost**: FREE (up to 500MB database)
- **Get it from**: https://supabase.com
- **Steps**:
  1. Create account
  2. Create new project
  3. Go to Settings → API
  4. Copy:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public key** → (not needed)
     - **service_role secret** → `SUPABASE_SERVICE_KEY`
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
  SUPABASE_SERVICE_KEY=eyJxxx...
  ```

### 2. **VAPID Keys** (For Push Notifications)
- **What it does**: Enables browser push notifications
- **Cost**: FREE (built-in browser API)
- **Get it from**: Your terminal
- **Steps**:
  1. Run: `npx web-push generate-vapid-keys`
  2. Copy the output
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_VAPID_PUBLIC_KEY=BHxxx...
  VAPID_PRIVATE_KEY=oQxxx...
  ```

### 3. **Admin Password**
- **What it does**: Protects your `/admin/push` panel
- **Cost**: FREE
- **Get it from**: Your brain
- **Steps**:
  1. Think of a strong password (e.g., `Brandverse2025!Secure`)
  2. Remember it (you'll use it to login)
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_ADMIN_PASSWORD=YourStrongPasswordHere
  ```

---

## ✅ TIER 2: IMPORTANT (Do Within 48 Hours)

### 4. **Cookiebot** (Cookie Consent / GDPR Compliance)
- **What it does**: Shows cookie consent banner, tracks user consent
- **Cost**: FREE for <100 pages (then $9/mo)
- **Get it from**: https://www.cookiebot.com
- **Steps**:
  1. Create account
  2. Add your domain: `brandverse.tech`
  3. Copy the **Domain Group ID**
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_COOKIEBOT_ID=abc123-xyz-...
  ```

### 5. **Google Analytics 4** (Traffic Analytics)
- **What it does**: Tracks website visitors, page views, conversions
- **Cost**: FREE
- **Get it from**: https://analytics.google.com
- **Steps**:
  1. Create account
  2. Create new GA4 property
  3. Get Measurement ID (looks like `G-XXXXXXXXXX`)
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```

### 6. **Meta Pixel** (Facebook/Instagram Ads Tracking)
- **What it does**: Tracks conversions from Facebook/Instagram ads
- **Cost**: FREE
- **Get it from**: https://business.facebook.com/events_manager
- **Steps**:
  1. Create Meta Business account
  2. Events Manager → Create Pixel
  3. Copy Pixel ID (16-digit number)
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_META_PIXEL_ID=123456789012345
  ```

---

## ✅ TIER 3: OPTIONAL (For Voice Demo - Do Later)

### 7. **Vapi.ai** (AI Voice Agent Demo)
- **What it does**: Powers the `/demos/voice` page
- **Cost**: $10 trial credit (then pay-as-you-go)
- **Get it from**: https://vapi.ai
- **Steps**:
  1. Create account
  2. Dashboard → API Keys → Copy Public Key
  3. Create an Assistant → Copy Assistant ID
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_VAPI_KEY=sk_xxx...
  NEXT_PUBLIC_VAPI_ASSISTANT_ID=asst_xxx...
  ```

### 8. **Cerebras API** (For Ultra-Fast AI Brain)
- **What it does**: Makes Vapi voice agent respond 10x faster
- **Cost**: FREE tier available
- **Get it from**: https://cerebras.ai
- **Steps**:
  1. Sign up for API access
  2. Get API key
  3. Configure in Vapi Dashboard (not .env)

---

### 9. **Calendly** (Meeting Booking)
- **What it does**: Lets clients book appointments directly on your site
- **Cost**: FREE (Basic plan is enough)
- **Get it from**: https://calendly.com
- **Steps**:
  1. Create account
  2. Create a "30 Minute Meeting" event
  3. Copy the event link (e.g. `calendly.com/yourname/30min`)
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourusername/call
  ```

### 10. **Social Media Accounts** (To Create)
- **LinkedIn**: Create "Brandverse Tech" Company Page
- **X (Twitter)**: Create `@brandverse_tech`
- **Instagram**: Create `@brandverse.tech`
- **YouTube**: Create Brandverse Channel (for video demos)

---

## 📋 FINAL CHECKLIST

Your complete `.env.local` should look like this:

```bash
# === CRITICAL (Do First) ===
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJxxx...
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BHxxx...
VAPID_PRIVATE_KEY=oQxxx...
NEXT_PUBLIC_ADMIN_PASSWORD=YourStrongPassword
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourname/call

# === IMPORTANT (Do Next) ===
NEXT_PUBLIC_COOKIEBOT_ID=abc123-xyz...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# === OPTIONAL (Do Later) ===
NEXT_PUBLIC_VAPI_KEY=sk_xxx...
NEXT_PUBLIC_VAPI_ASSISTANT_ID=asst_xxx...

# === EXISTING (Already Set) ===
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDCbYX5rmE8KwXO-b_Clv5On3vbAxmJlu8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=brandverse-8207e.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=brandverse-8207e
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=brandverse-8207e.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=790805284794
NEXT_PUBLIC_FIREBASE_APP_ID=1:790805284794:web:7d8e2ec29c2b90d70f7f83
```

---

## 🚨 ALSO: Add to Vercel

After adding to `.env.local`, also add to Vercel:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable above
3. Deploy

---

## 💡 ESTIMATED TOTAL COST

- **Tier 1 (Critical)**: $0/month
- **Tier 2 (Important)**: $0/month (Cookie consent free tier)
- **Tier 3 (Optional)**: $0-$20/month (depends on Vapi usage)

**Grand Total**: $0-$20/month for a fully operational system.
