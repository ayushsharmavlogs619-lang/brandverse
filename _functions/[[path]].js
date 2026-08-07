/**
 * Allowed request origins for cross-origin browser calls.
 * Subdomain routing is handled by Cloudflare's _redirects rules, so this
 * function only serves API endpoints (push) executed from these origins.
 */
function isAllowedOrigin(origin) {
  const allowed = [
    'https://brandverse.tech',
    'https://www.brandverse.tech',
    'https://creators.brandverse.tech',
    'https://onlyfans.brandverse.tech',
    'https://edge.brandverse.tech',
  ];
  return allowed.includes(origin);
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  if (origin && isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function jsonRequest(data, status = 200, cors = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...cors,
    },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders(request) });
  }

  // --- ADMIN API ROUTES ---
  // Push endpoints are intentionally fail-closed. They only report real
  // capability and NEVER claim success for notifications that were not sent.

  // GET /api/push-stats
  if (path === '/api/push-stats' && method === 'GET') {
    // No persistent store configured => report availability honestly.
    if (!env.PUSH_KV) {
      return jsonRequest(
        { success: false, error: 'Push infrastructure not configured' },
        503,
        corsHeaders(request)
      );
    }

    const subscribers = await env.PUSH_KV.get('subscriptions', 'json').catch(
      () => []
    );
    const counts = (subscribers && subscribers.length) || 0;
    return jsonRequest({ subscribers: counts, sent: 0 }, 200, corsHeaders(request));
  }

  // POST /api/send-push
  if (path === '/api/send-push' && method === 'POST') {
    try {
      const body = await request.json();
      const { adminPassword } = body;

      const expectedPassword = env.ADMIN_PUSH_PASSWORD;
      if (!expectedPassword) {
        return jsonRequest(
          { success: false, error: 'Push auth not configured on server' },
          503,
          corsHeaders(request)
        );
      }
      if (adminPassword !== expectedPassword) {
        return jsonRequest({ success: false, error: 'Unauthorized' }, 401, corsHeaders(request));
      }

      // Sending requires the VAPID key pair bound server-side. This site does
      // not configure web-push on the Pages edge today, so refuse rather than
      // fabricate a result.
      if (!env.PUSH_KV || !env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY) {
        return jsonRequest(
          {
            success: false,
            error:
              'Web push is not configured on this deployment. Set PUSH_KV, VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in the Cloudflare Pages environment.',
          },
          503,
          corsHeaders(request)
        );
      }

      // Placeholder: once KV + VAPID are provisioned, enumerate subscriptions
      // from PUSH_KV and call webPush.sendNotification() for each. Never
      // return sent counts that were not actually delivered.
      return jsonRequest(
        { success: false, error: 'Push delivery not implemented on this server' },
        501,
        corsHeaders(request)
      );
    } catch (e) {
      return jsonRequest({ success: false, error: e.message }, 500, corsHeaders(request));
    }
  }

  // POST /api/mailchimp/subscribe
  // Server-side proxy: the browser never receives the Mailchimp API key.
  if (path === '/api/mailchimp/subscribe' && method === 'POST') {
    try {
      const apiKey = env.MAILCHIMP_API_KEY;
      const audienceId = env.MAILCHIMP_AUDIENCE_ID;
      if (!apiKey || !audienceId) {
        return jsonRequest(
          { success: false, error: 'Mailchimp not configured on server' },
          503,
          corsHeaders(request)
        );
      }

      const body = await request.json();
      if (!body.email) {
        return jsonRequest({ success: false, error: 'Missing email' }, 400, corsHeaders(request));
      }

      const serverPrefix = apiKey.split('-').pop() || 'us1';
      const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${apiKey}`
        },
        body: JSON.stringify({
          email_address: body.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: body.firstName || '',
            LNAME: body.lastName || ''
          },
          tags: body.tags || []
        })
      });

      if (!response.ok) {
        return jsonRequest(
          { success: false, error: `Mailchimp API error: ${response.status}` },
          response.status,
          corsHeaders(request)
        );
      }

      return jsonRequest({ success: true }, 200, corsHeaders(request));
    } catch (e) {
      return jsonRequest({ success: false, error: e.message }, 500, corsHeaders(request));
    }
  }

  // POST /api/subscribe
  if (path === '/api/subscribe' && method === 'POST') {
    try {
      const body = await request.json();
      if (!body || !body.endpoint) {
        return jsonRequest(
          { success: false, error: 'Missing subscription payload' },
          400,
          corsHeaders(request)
        );
      }

      if (!env.PUSH_KV) {
        return jsonRequest(
          { success: false, error: 'Push storage not configured' },
          503,
          corsHeaders(request)
        );
      }

      const current = await env.PUSH_KV.get('subscriptions', 'json').catch(() => []);
      const subs = Array.isArray(current) ? current : [];
      subs.push({ endpoint: body.endpoint, keys: body.keys || {} });
      await env.PUSH_KV.put('subscriptions', JSON.stringify(subs));
      return jsonRequest({ success: true }, 200, corsHeaders(request));
    } catch (e) {
      return jsonRequest({ success: false, error: e.message }, 500, corsHeaders(request));
    }
  }

  // Non-API paths are served by static assets. Use env.ASSETS.fetch so the
  // request is resolved by the Pages asset system instead of re-entering this
  // function (which would cause a routing loop).
  return env.ASSETS.fetch(request);
}