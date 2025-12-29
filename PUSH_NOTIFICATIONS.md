# Push Notification Setup Guide

## 🔔 Overview
This system allows you to send push notifications to thousands of users when you publish new content.

## 🛠️ Setup Steps

### 1. Get Firebase Cloud Messaging (FCM) Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create one)
3. Go to **Project Settings** > **Cloud Messaging**
4. Copy the **Server Key** (for sending notifications)
5. Generate a **VAPID Key Pair** (for web push)

### 2. Add Environment Variables
Add to your `.env.local`:
```bash
# Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key_here
VAPID_PRIVATE_KEY=your_vapid_private_key_here
FCM_SERVER_KEY=your_fcm_server_key_here

# Database (Choose one)
# Option A: Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# Option B: Firebase
FIREBASE_ADMIN_SDK_JSON='{...your service account json...}'
```

### 3. Create Database Table
If using Supabase, create this table:
```sql
CREATE TABLE push_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  keys JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

If using Firebase, create a Firestore collection called `pushSubscriptions`.

### 4. Send Notifications
Use this script to send push notifications to all subscribers:

```javascript
// scripts/send-push.js
const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

webpush.setVapidDetails(
  'mailto:ayush@brandverse.tech',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

async function sendToAll(title, body, url) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data } = await supabase.from('push_subscriptions').select('*');

  const promises = data.map(sub => {
    return webpush.sendNotification(
      { endpoint: sub.endpoint, keys: sub.keys },
      JSON.stringify({ title, body, url })
    );
  });

  await Promise.all(promises);
  console.log(`✅ Sent to ${promises.length} subscribers`);
}

// Usage
sendToAll(
  'New Article: Why AI Voice Agents Never Fail',
  'Discover the 3 reasons businesses never regret this decision.',
  'https://brandverse.tech/blog/why-never-regret-ai-agents'
);
```

### 5. Install Dependencies
```bash
npm install web-push @supabase/supabase-js
```

## 📊 Tracking & Analytics
- All subscriptions are stored in your database
- You can see:
  - Total subscriber count
  - User agent (device/browser)
  - Subscription date
  - Geographic data (if you add IP tracking)

## 🚀 Sending Notifications at Scale
When you have 10,000+ subscribers:
1. Write new article
2. Run: `node scripts/send-push.js "Title" "Description" "URL"`
3. All subscribers get notified instantly

---

## Cookie Consent (Already Configured)
- **Cookiebot** is already in your `layout.tsx`
- You need to sign up at [cookiebot.com](https://www.cookiebot.com/)
- Add your `NEXT_PUBLIC_COOKIEBOT_ID` to `.env.local`
- Cookiebot automatically:
  - Shows GDPR-compliant consent banner
  - Stores user choices
  - Provides compliance dashboard
  - Blocks cookies until consent
