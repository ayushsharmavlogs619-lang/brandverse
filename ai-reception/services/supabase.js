import { createClient } from '@supabase/supabase-js'

// Supabase client for Cloudflare Workers
// Uses the REST API (not realtime) for edge compatibility

let supabaseClient = null

export function getSupabaseClient(env) {
  if (supabaseClient) {
    return supabaseClient
  }
  
  const supabaseUrl = env.SUPABASE_URL
  const supabaseKey = env.SUPABASE_SERVICE_KEY || env.SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY/SUPABASE_ANON_KEY must be set')
  }
  
  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
  
  return supabaseClient
}

// Reset client (useful for testing)
export function resetSupabaseClient() {
  supabaseClient = null
}
