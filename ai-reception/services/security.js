// Shared security primitives for the AI receptionist Worker.
//
// 1) Client-scoped API tokens (HMAC-SHA256)
//    The worker generates short-lived tokens and embeds them in the server
//    URLs of the dynamic Vapi assistant configuration. Every /api/{clientId}/*
//    request must carry a valid token; without one it is rejected. Attackers
//    cannot forge tokens because they do not know WORKER_HMAC_SECRET.
//
// 2) Vapi webhook verification
//    Vapi signs every webhook with HMAC-SHA256 of the raw request body using
//    the webhook secret (x-vapi-signature header). Verification FAILS CLOSED:
//    if VAPI_WEBHOOK_SECRET is not configured the webhook is rejected so a
//    misconfiguration can never silently open an unauthenticated endpoint.

const TOKEN_WINDOW_MS = 12 * 60 * 60 * 1000; // tokens valid for ~24h (current + previous window)

async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function tokenWindows(now = Date.now()) {
  const current = Math.floor(now / TOKEN_WINDOW_MS);
  return [current, current - 1];
}

/** Sign a client token valid for the current 12h window. */
export async function signClientToken(env, clientId, now = Date.now()) {
  if (!env.WORKER_HMAC_SECRET) return null;
  const windowId = tokenWindows(now)[0];
  return hmacHex(env.WORKER_HMAC_SECRET, `${clientId}|${windowId}`);
}

/** Verify a client token (accepts current or previous window for overlap). */
export async function verifyClientToken(env, clientId, token) {
  if (!env.WORKER_HMAC_SECRET || !token || !clientId) return false;
  for (const windowId of tokenWindows()) {
    const expected = await hmacHex(env.WORKER_HMAC_SECRET, `${clientId}|${windowId}`);
    if (constantTimeEqual(token, expected)) return true;
  }
  return false;
}

/**
 * Verify a Vapi webhook signature over the RAW request body.
 * Accepts hex, base64 or "sha256=" prefixed encodings (delivery varies).
 * Returns 'ok', 'missing_secret', 'missing_signature' or 'invalid'.
 */
export async function verifyVapiSignature(env, rawBody, signature) {
  const secret = env.VAPI_WEBHOOK_SECRET;
  if (!secret) return 'missing_secret';
  if (!signature) return 'missing_signature';

  const raw = typeof signature === 'string' ? signature.replace(/^sha256=/, '') : '';
  if (!raw) return 'missing_signature';

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  const bytes = new Uint8Array(sig);

  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  const base64 = btoa(String.fromCharCode(...bytes));

  return constantTimeEqual(hex, raw) || constantTimeEqual(base64, raw) ? 'ok' : 'invalid';
}
