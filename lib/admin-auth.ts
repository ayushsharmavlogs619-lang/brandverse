import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();

/**
 * Verify the caller is the configured admin by validating the Supabase access
 * token in the Authorization header and matching the user's email to
 * ADMIN_EMAIL. Returns the user email on success, or null on failure.
 */
export async function verifyAdmin(request: Request): Promise<string | null> {
  if (!supabaseUrl || !supabaseAnonKey || !adminEmail) return null;

  const authHeader = request.headers.get('authorization') ?? '';
  const token = authHeader.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : '';
  if (!token) return null;

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data, error } = await client.auth.getUser(token);
  if (error || !data?.user?.email) return null;
  const email = data.user.email.toLowerCase().trim();
  return email === adminEmail ? email : null;
}
