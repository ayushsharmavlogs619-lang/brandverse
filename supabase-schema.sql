-- Create push subscriptions table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  keys JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_endpoint ON push_subscriptions(endpoint);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_created_at ON push_subscriptions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for subscription)
CREATE POLICY "Allow public inserts" ON push_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to read/delete (for sending/cleanup)
CREATE POLICY "Allow service role all access" ON push_subscriptions
  FOR ALL
  USING (auth.role() = 'service_role');
