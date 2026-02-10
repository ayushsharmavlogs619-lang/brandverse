/**
 * Dashboard Layout
 * Requires authentication - redirects to login if not authenticated
 */

import { redirect } from 'next/navigation';
import { getSession, validateSessionSubdomain } from '@/lib/portal/sessions';
import { getClientBySubdomain } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { headers } from 'next/headers';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Get session
    const session = await getSession();

    if (!session) {
        redirect('/portal');
    }

    // Get subdomain and validate
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    if (subdomain && !validateSessionSubdomain(session, subdomain)) {
        redirect('/portal');
    }

    // Verify client is still active
    const client = await getClientBySubdomain(session.clientId);
    if (!client || !client.isActive) {
        redirect('/portal');
    }

    return <>{children}</>;
}
