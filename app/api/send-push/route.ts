import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import webpush from 'web-push';

// Initialize web-push
webpush.setVapidDetails(
    process.env.NEXT_PUBLIC_VAPID_SUBJECT || 'mailto:admin@brandverse.tech',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
    try {
        const { title, body, url } = await request.json();

        // 1. Fetch all subscribers from Supabase
        const { data: subscribers, error } = await supabaseAdmin
            .from('push_subscriptions')
            .select('*');

        if (error) {
            throw error;
        }

        if (!subscribers || subscribers.length === 0) {
            return NextResponse.json({ success: true, count: 0, message: 'No subscribers found' });
        }

        // 2. Send notification to each subscriber
        const payload = JSON.stringify({
            title,
            body,
            url,
            icon: '/icon-192x192.png' // Ensure this exists or use a remote URL
        });

        const promises = subscribers.map(async (sub) => {
            try {
                await webpush.sendNotification(
                    {
                        endpoint: sub.endpoint,
                        keys: sub.keys
                    },
                    payload
                );
                return { success: true };
            } catch (err: any) {
                // If 410 Gone, remove subscription
                if (err.statusCode === 410 || err.statusCode === 404) {
                    await supabaseAdmin
                        .from('push_subscriptions')
                        .delete()
                        .eq('id', sub.id);
                }
                return { success: false, error: err };
            }
        });

        const results = await Promise.all(promises);
        const successCount = results.filter(r => r.success).length;

        return NextResponse.json({
            success: true,
            count: successCount,
            total: subscribers.length
        });

    } catch (error) {
        console.error('Error sending push notifications:', error);
        return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
    }
}
