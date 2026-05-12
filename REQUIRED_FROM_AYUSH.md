# 📋 The "Ship It" Checklist

Here is exactly what I need from you to make the site 100% functional and polished.

## 1. Team Photos (Critical for About Page)
Please place the following **9 images** into the `public/team/` folder.  
*Ensure they are JPG format and roughly square (e.g. 500x500px) or portrait.*

- [ ] `ayush.jpg`
- [ ] `arjun-sen.jpg`
- [ ] `raveena.jpg`
- [ ] `krishanu.jpg`
- [ ] `siddhant.jpg`
- [ ] `rohit.jpg`
- [ ] `harsh.jpg`
- [ ] `arjun-nair.jpg`
- [ ] `amit.jpg`

---

## 2. Cloudflare Pages Environment Variables (Critical for Features)
You need to add these in your **Cloudflare Pages Dashboard** -> your project -> **Settings** -> **Environment variables**. Set the secret ones (`SUPABASE_SERVICE_KEY`, `VAPID_PRIVATE_KEY`, `ADMIN_EMAIL`) as **encrypted** variables, not plain text.

| Variable Name | Value Needed | Why? |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://xxx.supabase.co`) | Push notifications, lead capture, admin login. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase **anon public** key | Lets the browser talk to Supabase Auth (admin login). |
| `SUPABASE_SERVICE_KEY` | Supabase **service_role** key (encrypted) | Lets `/api/*` routes write subscribers & leads, bypass RLS. |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Your admin email (same as below) | Frontend uses this to gate the admin UI. |
| `ADMIN_EMAIL` | Your admin email (encrypted) | `/api/send-push` and `/api/push-stats` verify this on the server. |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | VAPID public key (from `npx web-push generate-vapid-keys`) | Browser uses this to subscribe to push. |
| `VAPID_PRIVATE_KEY` | VAPID private key (encrypted) | Server signs push requests with this. |
| `VAPID_CONTACT_EMAIL` | `ayush@brandverse.tech` (optional) | Push servers contact you about subscription issues. Defaults to ayush@brandverse.tech. |
| `NEXT_PUBLIC_CALENDLY_URL` | e.g. `https://calendly.com/brandverse/30min` | **"Book Demo"** buttons will show "System Offline" without this. |
| `NEXT_PUBLIC_VAPI_KEY` | Your Vapi Public Key | **Voice Demo** will fail without this. |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | Your Vapi Assistant ID | **Voice Demo** needs to know which agent to call. |

### Supabase setup (one-time)
1. Create a Supabase project at https://supabase.com.
2. Open the **SQL Editor** and paste the contents of [`supabase-schema.sql`](supabase-schema.sql). Click **Run**. This creates the `push_subscriptions` and `leads` tables with the right RLS policies.
3. Open **Authentication → Users → Add User**. Create a user with **your admin email** and a strong password. (Auto-confirm the email so you can log in immediately.) That email must match `ADMIN_EMAIL` / `NEXT_PUBLIC_ADMIN_EMAIL` exactly.
4. Settings → API → copy the **Project URL**, **anon public** key, and **service_role** key into the Cloudflare env vars above.
5. Generate VAPID keys locally: `npx web-push generate-vapid-keys`. Paste public into `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, private into `VAPID_PRIVATE_KEY`.

---

## 3. Social Media Links
Currently, the buttons link to generic pages or placeholders. I need your real URLs for:
- [ ] X / Twitter
- [ ] LinkedIn (Company Page)
- [ ] Instagram (if applicable)
- [ ] YouTube (if applicable)

---

## 4. Company Address
- [ ] Physical address for the Footer/Privacy Policy (Legal requirement).

---

## 5. Logo (Optional)
- [ ] Any specific logo file to replace the text "BRANDVERSE" in the header? (Otherwise text looks fine).
