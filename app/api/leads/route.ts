import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const runtime = 'edge';

interface LeadPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  message?: unknown;
  source?: unknown;
}

function asTrimmedString(value: unknown, max = 1000): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase env vars not configured on the server' },
      { status: 500 },
    );
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = asTrimmedString(payload.email, 254);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  const lead = {
    name: asTrimmedString(payload.name, 200),
    email,
    phone: asTrimmedString(payload.phone, 50),
    company: asTrimmedString(payload.company, 200),
    message: asTrimmedString(payload.message, 4000),
    source: asTrimmedString(payload.source, 100) ?? 'website',
    user_agent: request.headers.get('user-agent')?.slice(0, 500) ?? null,
  };

  const { error } = await supabaseAdmin.from('leads').insert(lead);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
