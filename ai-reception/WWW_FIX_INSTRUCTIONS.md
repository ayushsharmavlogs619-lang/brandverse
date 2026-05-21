# FIX YOUR WWW BRANDVERSE.TECH RIGHT NOW

## Step 1: Fix the www redirect (5 minutes)

1. Go to https://dash.cloudflare.com/
2. Log in to your account
3. Click on your brandverse.tech domain
4. On the left sidebar, click **Workers & Pages**
5. Click on the **Pages** tab
6. Click on your **brandverse** project
7. Click on the **Custom Domains** tab
8. Click the blue button: **Set up a custom domain**
9. Enter: `www.brandverse.tech`
10. Click **Continue**
11. Cloudflare will show you the DNS record it will create. Click **Activate domain**

**That's it.** Wait 2-3 minutes for DNS to propagate, then test https://www.brandverse.tech - it should work.

---

## Step 2: Deploy AI Receptionist (optional, if you want the client portal system)

### Deploy the Backend Worker
```powershell
cd brandverse/ai-reception
./deploy-worker.ps1
```

### Deploy the Frontend Pages
```powershell
cd brandverse/ai-reception
./deploy-pages.ps1
```

### Set up the edge.brandverse.tech domain
1. In Cloudflare Dashboard, go to Workers & Pages → Pages
2. Create a new Pages project (or find the ai-reception project)
3. Click **Custom Domains** → **Set up a custom domain**
4. Enter: `edge.brandverse.tech`
5. Click **Activate domain**

---

## Step 3: Test everything

```powershell
# Test main site
curl.exe -Iv https://brandverse.tech
curl.exe -Iv https://www.brandverse.tech

# Test AI receptionist (if deployed)
curl.exe -Iv https://edge.brandverse.tech
```

---

## What if something breaks?

If you see any errors:
1. Wait 5-10 minutes for DNS to propagate
2. Clear your browser cache
3. Try incognito/private browsing mode
4. Check Cloudflare Dashboard for any error messages

If still broken, contact ayush@brandverse.tech or call +91 88510 05278