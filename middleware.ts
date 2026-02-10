import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSubdomain } from './lib/portal/subdomain';
import { isValidClient } from './lib/portal/clients';

/**
 * Middleware for multi-tenant portal subdomain detection
 * Runs on every request to /portal/* routes
 */
export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || '';
    const pathname = request.nextUrl.pathname;

    // Only process portal routes
    if (!pathname.startsWith('/portal')) {
        return NextResponse.next();
    }

    // Skip static files and API routes
    if (
        pathname.includes('/_next') ||
        pathname.includes('/api/') ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2)$/)
    ) {
        return NextResponse.next();
    }

    // Extract subdomain
    const subdomain = getSubdomain(host);

    // If no subdomain found, redirect to main site or show error
    if (!subdomain) {
        return new NextResponse(
            JSON.stringify({
                error: 'Portal Access Denied',
                message: 'No valid subdomain detected. Please access the portal via your organization URL.',
                example: 'yourcompany.brandverse.tech/portal',
            }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    // Validate the client exists
    if (!isValidClient(subdomain)) {
        return new NextResponse(
            JSON.stringify({
                error: 'Organization Not Found',
                message: `The organization "${subdomain}" was not found or is inactive.`,
                status: 404,
            }),
            {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    // Valid subdomain - add to headers for downstream use
    const response = NextResponse.next();
    response.headers.set('x-client-subdomain', subdomain);

    // Also set as a cookie for client-side access
    response.cookies.set('portal-subdomain', subdomain, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
}

// Configure which routes the middleware runs on
export const config = {
    matcher: [
        // Match all portal routes
        '/portal/:path*',
    ],
};
