# 🚀 Cloudflare Pages Deployment Guide

## Quick Deploy (No GitHub Required)

### Prerequisites
1. Install Wrangler CLI: `npm install -g wrangler`
2. Login to Cloudflare: `wrangler login`

### Method 1: One-Command Deploy
```bash
npm run deploy
```

### Method 2: Direct Wrangler Deploy
```bash
npm run deploy:cloudflare
```

### Method 3: Manual Deploy
```bash
# Build first
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name brandverse
```

## Environment Variables Setup

In your Cloudflare Pages dashboard, add these environment variables:

### Forms (FormSubmit)
Marketing forms POST to **ayush@brandverse.tech**. The first time FormSubmit sees a new inbox, it sends a **confirmation link**—you must click it or submissions never arrive. Optional: set `NEXT_PUBLIC_SITE_URL` if production is not `https://brandverse.tech` (thank-you redirects).

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_web_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### AI API Keys
```
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key_here
CEREBRAS_API_KEY=your_cerebras_api_key_here
```

### Analytics & Tracking
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=your_actual_pixel_id_here
NEXT_PUBLIC_COOKIEBOT_ID=your_cookiebot_id_here
```

### Scheduling
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min
```

### Voice AI
```
VAPI_API_KEY=your_vapi_api_key_here
VAPI_PHONE_NUMBER=+1your-phone-number-here
```

## DNS Configuration

1. Go to Cloudflare DNS settings
2. Add A record: `@` → Cloudflare Pages IP
3. Add CNAME record: `www` → `brandverse.pages.dev`
4. Enable SSL/TLS (Full mode)

## Custom Domain Setup

1. In Cloudflare Pages dashboard → Custom domains
2. Add: `brandverse.tech`
3. Add: `www.brandverse.tech`
4. Wait for SSL certificate issuance

## Performance Optimizations Enabled

✅ Static Site Generation (SSG)
✅ Image Optimization
✅ Font Optimization  
✅ CSS/JS Minification
✅ Edge Caching
✅ Gzip Compression
✅ Browser Caching

## Monitoring

- Cloudflare Analytics
- Google Analytics (if configured)
- Vercel Analytics (built-in)

## Troubleshooting

### Build Issues
- Clear cache: `rm -rf .next`
- Reinstall: `npm install`
- Check Node.js version: `node --version` (should be 18+)

### Deployment Issues
- Verify Wrangler auth: `wrangler whoami`
- Check project name in wrangler.toml
- Ensure build output exists: `out/` (static export from `next.config.js`)

### Environment Variables
- Must be prefixed with `NEXT_PUBLIC_` for client-side access
- Server-side variables don't need prefix
- Restart deployment after adding variables

## Production Checklist

- [ ] All environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking working
- [ ] Contact forms functional
- [ ] Blog articles loading
- [ ] ROI calculator working
- [ ] Chat widget functional
- [ ] Mobile responsive test passed

## Support

For issues:
1. Check Cloudflare Pages logs
2. Verify environment variables
3. Test build locally: `npm run build && npm start`
4. Check this guide for common issues
