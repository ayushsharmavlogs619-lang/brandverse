export const dynamic = 'force-static';

/**
 * Logout API endpoint
 * POST /api/auth/logout
 */

import { NextRequest } from 'next/server';
import { clearSession, getSession } from '@/lib/portal/sessions';
import { successResponse, withErrorHandling } from '@/lib/utils/errors';
import { log } from '@/lib/utils/logger';

async function handler(request: NextRequest) {
    // Get current session (for logging)
    const session = await getSession();

    // Clear the session cookie
    await clearSession();

    // Log the logout
    if (session) {
        log.auth('logout', session.uid, true, {
            email: session.email,
            subdomain: session.subdomain
        });
    }

    return successResponse({ message: 'Logged out successfully' });
}

export const POST = withErrorHandling(handler);
