// Supabase client stub.
//
// The Supabase-backed DatabaseService is deprecated (kept only for backward
// compatibility). Cloudflare Workers do not ship the `@supabase/supabase-js`
// npm client by default, so this module returns a stand-in client that throws
// whenever it is actually used. The API layer only invokes the DB service when
// SUPABASE_URL and SUPABASE_SERVICE_KEY are present in the environment; without
// them, every database route already returns a clean 503 (see workers/api.js).

function unavailable() {
  throw new Error(
    'Supabase operations are unavailable: @supabase/supabase-js is not installed. ' +
      'Remove SUPABASE_URL/SUPABASE_SERVICE_KEY from the environment or install the SDK.'
  );
}

function makeUnavailableClient() {
  return new Proxy(
    {},
    {
      get() {
        return unavailable;
      },
    }
  );
}

export function getSupabaseClient() {
  return makeUnavailableClient();
}