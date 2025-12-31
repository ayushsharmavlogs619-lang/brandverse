import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
    try {
        const subscription = await request.json();

        if (!subscription || !subscription.endpoint || !subscription.keys) {
            return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 });
        }

        // Insert into Supabase
        const { error } = await supabaseAdmin
            .from('push_subscriptions')
            .upsert({
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                user_agent: request.headers.get('user-agent') || 'Unknown',
                // Update user_agent if endpoint already exists
            }, { onConflict: 'endpoint' });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving subscription:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
