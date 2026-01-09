import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the hostname (e.g., brandverse.tech, portal.brandverse.tech, localhost:3000)
    const hostname = request.headers.get('host') || '';

    // Check if we are on the "portal" subdomain
    // Adjust 'brandverse.tech' to match your actual live domain or localhost for testing
    // Use startsWith('portal.') to catch it.
    const isPortal = hostname.startsWith('portal.');

    const { pathname } = request.nextUrl;

    // 1. If we are on the PORTAL subdomain, we rewrite everything to /portal
    if (isPortal) {
        // If the user is already requesting /portal paths, let it pass (prevent loops if needed, though Rewrite is safe)
        if (pathname.startsWith('/portal')) {
            return NextResponse.next();
        }

        // Otherwise, rewrite the request. 
        // Example: portal.brandverse.tech/dashboard -> /portal/dashboard
        // Example: portal.brandverse.tech/ -> /portal

        // Construct the new URL pointing to the folder /portal
        const url = request.nextUrl.clone();
        url.pathname = `/portal${pathname}`;

        // Use rewrite (User sees portal.brandverse.tech, Server serves /portal content)
        return NextResponse.rewrite(url);
    }

    // 2. Main Domain logic (brandverse.tech)
    // If user tries to access /portal manually on the main domain, we can redirect them to the subdomain
    // (Optional, but cleaner).
    if (pathname.startsWith('/portal')) {
        const url = request.nextUrl.clone();
        url.hostname = 'portal.brandverse.tech'; // Redirect to subdomain
        url.pathname = pathname.replace('/portal', ''); // Remove /portal prefix for the subdomain
        if (url.pathname === '') url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};
