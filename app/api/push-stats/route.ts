import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
    try {
        // Get count of subscribers
        const { count, error } = await supabaseAdmin
            .from('push_subscriptions')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        // For "sent" stats, we might need another table or just store in local/file for now. 
        // Since we don't have a 'push_logs' table in the request, we'll return 0 or mock it.
        // Or we can just count current subs.

        return NextResponse.json({
            subscribers: count || 0,
            sent: 0 // Placeholder, or we could add a counter in DB later
        });

    } catch (error) {
        console.error('Error getting push stats:', error);
        return NextResponse.json({ subscribers: 0, sent: 0 }, { status: 500 });
    }
}
