-- Brandverse Supabase schema
-- Run this in your Supabase SQL Editor whenever the file changes.
-- Safe to run multiple times: every statement is idempotent.

-- =====================================================
-- push_subscriptions: web push subscribers
-- =====================================================
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  keys JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_push_subscriptions_endpoint
  ON push_subscriptions (endpoint);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_created_at
  ON push_subscriptions (created_at DESC);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anon users may never read subscriber list (they could enumerate users).
-- All writes go through the API route that uses the service role key, which
-- bypasses RLS — so we deliberately do not grant INSERT to anon either.
DROP POLICY IF EXISTS "Allow public inserts" ON push_subscriptions;
DROP POLICY IF EXISTS "Allow service role all access" ON push_subscriptions;

CREATE POLICY "service role full access on push_subscriptions"
  ON push_subscriptions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- =====================================================
-- leads: contact form submissions and other lead sources
-- If the table already exists (e.g. created by the AI receptionist setup),
-- the CREATE is a no-op and the ALTERs below backfill the columns we need.
-- =====================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Backfill columns expected by /api/leads when the table predates this schema.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Older receptionist schemas marked phone_number / client_id NOT NULL;
-- relax those so website leads (which don't supply them) can insert.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'phone_number'
  ) THEN
    EXECUTE 'ALTER TABLE leads ALTER COLUMN phone_number DROP NOT NULL';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'client_id'
  ) THEN
    EXECUTE 'ALTER TABLE leads ALTER COLUMN client_id DROP NOT NULL';
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service role full access on leads" ON leads;
CREATE POLICY "service role full access on leads"
  ON leads
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
