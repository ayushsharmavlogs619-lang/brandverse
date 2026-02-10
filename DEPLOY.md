# Deployment Guide - Brandverse Portal

Complete instructions for deploying to production on Vercel and Cloudflare.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Cloudflare Configuration](#cloudflare-configuration)
5. [Post-Deployment Checklist](#post-deployment-checklist)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- GitHub account with repository access
- Vercel account (vercel.com)
- Firebase project created
- Upstash Redis account
- Cloudflare domain (brandverse.tech)

---

## Environment Setup

### Step 1: Gather Credentials

Before deploying, collect these from your service accounts:

#### Firebase Console (console.firebase.google.com)
```
Project Settings → Service Accounts → Generate Private Key
```

Extract from the downloaded JSON:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (entire key with -----BEGIN/END-----)

Also from Project Settings → Web SDK Configuration:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

#### Upstash Console (console.upstash.com)
```
Your Database → REST API
```

Copy:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

#### Generate Secrets
```bash
# Generate JWT_SECRET (32+ characters)
openssl rand -base64 32
```

### Step 2: Create `.env.local`

```bash
# Copy template
cp .env.example .env.local

# Edit and fill in all values
nano .env.local
```

### Required Variables Reference

| Variable | Description | Required? |
|----------|-------------|-----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Public API Key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `FIREBASE_PRIVATE_KEY` | Service Account Private Key | Yes |
| `FIREBASE_CLIENT_EMAIL` | Service Account Email | Yes |
| `JWT_SECRET` | 32+ char random string | Yes |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis Token | Yes |
| `NEXT_PUBLIC_APP_URL` | Main application URL | Yes |
| `ADMIN_EMAIL` | Super admin email address | Yes |

---

## Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: production release v1.0.0"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Import your GitHub repository

3. **Configure Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `next build` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   - Copy-paste all variables from `.env.local` to Vercel's Environment Variables section.
   - **Tip**: You can copy the entire file content and Vercel will parse it.

5. **Deploy**
   - Click **Deploy**
   - Wait for build to complete (approx 1-2 mins)

---

## Cloudflare Configuration

To enable `*.brandverse.tech` subdomains:

1. **DNS Management**
   - Go to Cloudflare Dashboard → DNS
   - Add a **CNAME** record:
     - **Name**: `*` (wildcard)
     - **Target**: `cname.vercel-dns.com` (or your Vercel project URL)
     - **Proxy status**: Proxied (orange cloud)

2. **Vercel Domains**
   - In Vercel Project Settings → Domains
   - Add `brandverse.tech`
   - Add `*.brandverse.tech` (Wildcard)

---

## Post-Deployment Checklist

- [ ] **Verify SSL**: Visit `https://brandverse.tech`
- [ ] **Check Subdomain**: Visit `https://demo.brandverse.tech` (should show 404 or login if client exists)
- [ ] **Test Login**: Log in with a valid user
- [ ] **Check Admin**: Visit `https://brandverse.tech/admin`
- [ ] **Verify Rate Limits**: Check Upstash console for activity

---

## Troubleshooting

### Build Failures
- **Error**: `Firebase Admin SDK configuration missing`
- **Fix**: Ensure all `FIREBASE_*` private variables are set in Vercel Environment variables.

### 404 on Subdomains
- **Error**: Subdomain not resolving
- **Fix**: Check Cloudflare wildcard DNS record and Vercel Domain configuration.

### Login Loops
- **Error**: Redirecting back to login after success
- **Fix**: Check `JWT_SECRET` consistency and Cookie settings (Secure/SameSite).

For additional support, contact the DevOps team.
