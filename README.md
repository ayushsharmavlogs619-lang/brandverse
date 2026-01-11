# Brandverse.tech - AI Voice Automation Agency

## 🚀 Project Overview
Brandverse is a high-performance Next.js landing page designed to capture leads for AI Voice Agent services. It features:
- **Responsive Design**: Mobile-first, dark-themed premium UI.
- **ROI Calculator**: Interactive tool to demonstrate value to potential clients.
- **Conversion Focused**: Comparison tables, clear pricing, and sticky CTAs.
- **Legal Ready**: Integrated Privacy Policy and Terms & Conditions.

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend (Ready)**: Firebase (Configured in `lib/firebase.ts`)

## 📦 How to Deploy (Production)

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm install -g vercel`
2. Run deployment:
   ```bash
   vercel login
   vercel
   ```
3. Follow the prompts. Your site will be live in ~1 minute.

### Option 2: Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run deployment:
   ```bash
   netlify login
   netlify deploy --prod
   ```

### Option 3: GitHub (Version Control)
To save your work to the cloud:
1. Create a new repository on GitHub.
2. Run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/brandverse.git
   git branch -M main
   git push -u origin main
   ```

## 🔑 Environment Secrets
To enable Firebase or other API features, create a `.env.local` file with:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id_here
```


<!-- Deployment triggered from Vercel configuration -->
