# 🚀 SUPABASE SETUP FOR BRANDVERSE - SIMPLE GUIDE

## What we're doing:
Setting up a database to store all your website form submissions (leads) so you never lose an inquiry again.

## STEP 1: Create Supabase Account (5 minutes)
1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up with Google (easiest) or email
4. Click "New Project" 
5. Fill in:
   - **Name**: `brandverse-leads` (or whatever you want)
   - **Database Password**: (make up something, save it somewhere safe)
   - **Region**: Choose "Southeast Asia (Singapore)" - closest to India
6. Click "Create new project"
7. Wait 2-3 minutes for it to set up (grab a coffee ☕)

## STEP 2: Run the Database Setup (2 minutes)
1. In Supabase dashboard, click "SQL Editor" on the left sidebar
2. Click "New Query"
3. Copy the SQL code from the file: `supabase/schema.sql` in your project folder
4. Paste it into the SQL Editor
5. Click "Run" (bottom right)
6. You should see "Success" - this creates your leads table

## STEP 3: Get Your API Keys (1 minute)
1. In Supabase dashboard, click "Project Settings" (gear icon bottom left)
2. Click "API" in the sidebar
3. Copy these two things:
   - **Project URL** (looks like: https://xxxxxxxx.supabase.co)
   - **anon / public** Key (long string of characters)

## STEP 4: Update Your Configuration (1 minute)
Open this file in your project: `.env.local`

Find these lines at the bottom:
```
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace them with:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-long-anon-key-here
```

(Paste the actual URL and key you copied from Supabase, remove the #)

## STEP 5: Deploy (2 minutes)
1. Push your changes to GitHub
2. Cloudflare Pages will automatically redeploy
3. That's it! 🎉

## How to Check Your Leads:
1. Go to your Supabase dashboard
2. Click "Table Editor" on the left
3. Click the "leads" table
4. You'll see all form submissions here in real-time!

## What Gets Stored:
- Name, email, phone
- Company name
- What service they're interested in
- Their message
- Which page/form they submitted from
- Date/time of submission
- Automatic lead quality score (0-10)

## Need Help?
If you get stuck at any step, just tell me which step and I'll help you through it.

---

**Total time: ~10 minutes**
**Cost: FREE (Supabase free tier is generous)**