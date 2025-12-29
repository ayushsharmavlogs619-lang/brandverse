---
description: Deploy Brandverse to Vercel production
---

# Deploy Brandverse to Vercel

This workflow deploys the Brandverse website to Vercel in production mode.

## Prerequisites
- Vercel account created
- Vercel CLI installed globally
- All environment variables ready

## Steps

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
// turbo
```bash
vercel login
```

### 3. Deploy to Production
```bash
vercel --prod --yes
```

### 4. Verify Deployment
- Check the deployment URL provided
- Test all pages (29 routes)
- Verify analytics are working

### 5. Set Up Custom Domain (Optional)
1. Go to Vercel Dashboard
2. Navigate to Settings → Domains
3. Add your custom domain (e.g., brandverse.tech)
4. Update DNS records as instructed
5. Wait for SSL certificate generation (1-24 hours)

### 6. Update Environment Variables in Vercel
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add production variables:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
   - NEXT_PUBLIC_GA_MEASUREMENT_ID
   - NEXT_PUBLIC_META_PIXEL_ID
   - NEXT_PUBLIC_COOKIEBOT_ID
3. Redeploy: `vercel --prod --yes`

## Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# If successful, try deploying again
vercel --prod --yes --debug
```

### Environment Variables Not Working
- Ensure all variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/updating variables
- Check Vercel dashboard for variable values

## Success Criteria
✅ Deployment completes in < 60 seconds
✅ All 29 routes are accessible
✅ Homepage loads correctly
✅ ROI calculator works
✅ Analytics tracking active
