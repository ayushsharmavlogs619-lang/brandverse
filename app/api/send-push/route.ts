import { NextResponse } from 'next/server';
import { generatePushHTTPRequest } from 'webpush-webcrypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdmin } from '@/lib/admin-auth';
import { buildApplicationServerKeys } from '@/lib/vapid';

export const runtime = 'edge';

interface SendPushBody {
  title?: unknown;
  body?: unknown;
  url?: unknown;
}

interface StoredSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export async function POST(request: Request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase env vars not configured on the server' },
      { status: 500 },
    );
  }

  const vapidPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  const adminContact = process.env.VAPID_CONTACT_EMAIL ?? 'ayush@brandverse.tech';
  if (!vapidPublic || !vapidPrivate) {
    return NextResponse.json(
      { error: 'VAPID keys not configured on the server' },
      { status: 500 },
    );
  }

  let payload: SendPushBody;
  try {
    payload = (await request.json()) as SendPushBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const title = typeof payload.title === 'string' ? payload.title : 'Brandverse';
  const body = typeof payload.body === 'string' ? payload.body : '';
  const url = typeof payload.url === 'string' ? payload.url : 'https://brandverse.tech/';

  const { data: subs, error: fetchError } = await supabaseAdmin
    .from('push_subscriptions')
    .select('endpoint, keys');

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const subscriptions = (subs ?? []) as StoredSubscription[];
  const keys = await buildApplicationServerKeys(vapidPublic, vapidPrivate);
  const messageJson = JSON.stringify({ title, body, url });

  let sent = 0;
  const expired: string[] = [];

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        const req = await generatePushHTTPRequest({
          applicationServerKeys: keys,
          payload: messageJson,
          target: { endpoint: sub.endpoint, keys: sub.keys },
          adminContact: `mailto:${adminContact}`,
          ttl: 60 * 60 * 24,
          urgency: 'normal',
        });
        const bodyBuffer = req.body.buffer.slice(
          req.body.byteOffset,
          req.body.byteOffset + req.body.byteLength,
        ) as ArrayBuffer;
        const response = await fetch(req.endpoint, {
          method: 'POST',
          headers: req.headers,
          body: bodyBuffer,
        });
        if (response.ok) {
          sent += 1;
        } else if (response.status === 404 || response.status === 410) {
          expired.push(sub.endpoint);
        }
      } catch {
        // swallow individual failures so one bad endpoint doesn't kill the batch
      }
    }),
  );

  if (expired.length > 0) {
    await supabaseAdmin
      .from('push_subscriptions')
      .delete()
      .in('endpoint', expired);
  }

  return NextResponse.json({
    success: true,
    count: sent,
    total: subscriptions.length,
    expired: expired.length,
  });
}
