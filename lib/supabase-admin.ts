import { createClient } from '@supabase/supabase-js';
import { config } from './config';

const supabaseUrl = config.supabase.url;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Create a Supabase client with the service role key (for server-side admin operations)
// Only create client if env vars are available
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;
