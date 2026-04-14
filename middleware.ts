import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSubdomain } from './lib/portal/subdomain';

/**
 * Middleware for multi-tenant portal subdomain detection
 * Runs on every request to /portal/* routes
 * 
 * NOTE: We do NOT import firebase-admin here because Edge Runtime
 * does not support dynamic code evaluation (eval). Client validation
 * against Firestore happens server-side in the page components.
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

    // Pass subdomain along — actual Firestore validation happens in server components
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
