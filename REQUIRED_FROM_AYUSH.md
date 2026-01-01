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

## 2. Vercel Environment Variables (Critical for Features)
You need to add these in your **Vercel Dashboard** -> **Settings** -> **Environment Variables**.

| Variable Name | Value Needed | Why? |
| :--- | :--- | :--- |
| `SUPABASE_SERVICE_KEY` | Your Supabase `service_role` key | **Push Notifications** won't work without this. |
| `NEXT_PUBLIC_CALENDLY_URL` | e.g. `https://calendly.com/brandverse/30min` | **"Book Demo"** buttons will show "System Offline" without this. |
| `NEXT_PUBLIC_VAPI_KEY` | Your Vapi Public Key | **Voice Demo** will fail without this. |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | Your Vapi Assistant ID | **Voice Demo** needs to know which agent to call. |

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
