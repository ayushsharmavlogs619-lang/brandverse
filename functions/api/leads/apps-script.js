/**
 * POST /api/leads/apps-script
 *
 * Cloudflare Pages Function. Receives a lead from the browser, adds the
 * Google Apps Script shared secret server-side (never exposed to the
 * client), and forwards the lead to the Apps Script webhook that writes
 * into Google Sheets.
 *
 * Env vars (set in Cloudflare Pages dashboard → Settings → Environment
 * variables, NOT in .env.local — Pages Functions read `context.env`,
 * which is populated from the dashboard/CI config, not the Next.js build):
 *   GOOGLE_APPS_SCRIPT_WEBHOOK_URL
 *   GOOGLE_APPS_SCRIPT_SECRET
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const webhookUrl = env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  const secret = env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!webhookUrl || !secret) {
    console.error('[api/leads/apps-script] Missing GOOGLE_APPS_SCRIPT_WEBHOOK_URL or GOOGLE_APPS_SCRIPT_SECRET');
    return jsonResponse({ success: false, error: 'Apps Script integration is not configured' }, 500);
  }

  let lead;
  try {
    lead = await request.json();
  } catch {
    return jsonResponse({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        date: lead.timestamp || new Date().toISOString(),
        name: lead.full_name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        service: lead.service_interest || '',
        message: lead.message || '',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let result = null;
    try {
      result = await upstream.json();
    } catch {
      // Non-JSON response from Apps Script — fall through to generic error below.
    }

    if (!upstream.ok || !result?.success) {
      const errorMessage = result?.error || `Apps Script webhook returned status ${upstream.status}`;
      console.error('[api/leads/apps-script] webhook failed:', errorMessage);
      return jsonResponse({ success: false, error: errorMessage }, 502);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    clearTimeout(timeoutId);
    const errorMessage =
      err && err.name === 'AbortError'
        ? 'Apps Script webhook timed out'
        : err instanceof Error
          ? err.message
          : 'Unknown error calling Apps Script webhook';
    console.error('[api/leads/apps-script] request threw:', errorMessage);
    return jsonResponse({ success: false, error: errorMessage }, 502);
  }
}
