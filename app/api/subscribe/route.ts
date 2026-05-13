import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const runtime = 'edge';

interface SubscriptionPayload {
  endpoint?: unknown;
  keys?: { p256dh?: unknown; auth?: unknown } | null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase env vars not configured on the server' },
      { status: 500 },
    );
  }

  let body: SubscriptionPayload;
  try {
    body = (await request.json()) as SubscriptionPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const endpoint = body.endpoint;
  const p256dh = body.keys?.p256dh;
  const auth = body.keys?.auth;

  if (!isString(endpoint) || !isString(p256dh) || !isString(auth)) {
    return NextResponse.json(
      { error: 'Missing endpoint or keys.p256dh / keys.auth' },
      { status: 400 },
    );
  }

  const userAgent = request.headers.get('user-agent') ?? null;

  const { error } = await supabaseAdmin
    .from('push_subscriptions')
    .upsert(
      { endpoint, keys: { p256dh, auth }, user_agent: userAgent },
      { onConflict: 'endpoint' },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
