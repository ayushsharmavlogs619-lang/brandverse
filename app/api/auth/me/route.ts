export const dynamic = 'force-static';

/**
 * Get current user API endpoint
 * GET /api/auth/me
 */

import { NextRequest } from 'next/server';
import { getSession, refreshSession, shouldRefreshSession, validateSessionSubdomain } from '@/lib/portal/sessions';
import { getPortalUser } from '@/lib/portal/users';
import { getClientBySubdomain } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { successResponse, errors, withErrorHandling } from '@/lib/utils/errors';

async function handler(request: NextRequest) {
    // Get current session
    const session = await getSession();

    if (!session) {
        return errors.unauthorized();
    }

    // Get subdomain from request
    const host = request.headers.get('host') || '';
    const subdomain = getSubdomain(host);

    // Validate session matches subdomain (multi-tenant security)
    if (subdomain && !validateSessionSubdomain(session, subdomain)) {
        return errors.tenantMismatch();
    }

    // Refresh session if needed
    if (shouldRefreshSession(session)) {
        await refreshSession(session);
    }

    // Get full user data
    const user = await getPortalUser(session.uid);

    if (!user || !user.isActive) {
        return errors.unauthorized('Account not found or inactive');
    }

    // Get client data
    const client = await getClientBySubdomain(session.clientId);

    if (!client || !client.isActive) {
        return errors.clientInactive();
    }

    return successResponse({
        user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: user.role,
            createdAt: user.createdAt,
            lastLoginAt: user.lastLoginAt,
        },
        client: {
            id: client.id,
            name: client.name,
            logoUrl: client.logoUrl,
            theme: client.theme,
            features: client.features,
            plan: client.plan,
        },
    });
}

export const GET = withErrorHandling(handler);
