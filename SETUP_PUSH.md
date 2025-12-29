# Quick Setup Guide

## Step 1: Get Supabase Credentials (2 minutes)
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **Settings** → **API**
4. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → (not needed, we use service key)
   - `service_role` key → `SUPABASE_SERVICE_KEY`

## Step 2: Create Database Table (1 minute)
1. In Supabase dashboard, go to **SQL Editor**
2. Copy contents of `supabase-schema.sql`
3. Click **Run**
4. Done ✅

## Step 3: Get VAPID Keys for Push (2 minutes)
Run this command:
```bash
npx web-push generate-vapid-keys
```

Copy the output:
- Public Key → `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- Private Key → `VAPID_PRIVATE_KEY`

## Step 4: Add to .env.local
```bash
# Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BHxxx...
VAPID_PRIVATE_KEY=oQxxx...

# Database
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJxxx...

# Cookies (Optional - sign up at cookiebot.com)
NEXT_PUBLIC_COOKIEBOT_ID=your_id_here
```

## Step 5: Add to Vercel Environment Variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the same variables above
3. Deploy

---

## 🚀 Usage

### Sending Push Notifications
1. Go to: `https://brandverse.tech/admin/push`
2. Click "Send Push" next to any article
3. **Every subscriber gets notified instantly**

### Viewing Subscribers
1. Go to Supabase Dashboard → Table Editor
2. Open `push_subscriptions` table
3. See all subscribers, their devices, and join dates

---

## 🔒 Security
- Admin panel at `/admin/push` is publicly accessible
- **Add password protection** (next step if you want)
- Service key is server-side only (never exposed to browser)
