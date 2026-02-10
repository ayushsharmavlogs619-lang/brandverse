/**
 * Portal Layout with client theming
 * Applies dynamic branding based on subdomain client
 */

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Client Portal | Brandverse',
    description: 'Secure client portal access',
};

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Get subdomain
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    // Get client data
    const client = subdomain ? await getClientBySubdomain(subdomain) : null;

    // Generate CSS variables for theming
    const cssVariables = client
        ? getClientCSSVariables(client)
        : {
            '--portal-primary': '#6366f1',
            '--portal-secondary': '#818cf8',
            '--portal-bg': '#0f172a',
            '--portal-text': '#ffffff',
            '--portal-accent': '#22d3ee',
        };

    // Get session to determine if user is logged in
    const session = await getSession();

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundColor: cssVariables['--portal-bg'],
                color: cssVariables['--portal-text'],
                ...cssVariables as React.CSSProperties,
            }}
        >
            {/* Portal Header */}
            <header className="border-b border-white/10 backdrop-blur-xl bg-black/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo / Client Name */}
                        <a href="/portal" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            {client?.logoUrl ? (
                                <img
                                    src={client.logoUrl}
                                    alt={client.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                            ) : (
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg"
                                    style={{
                                        backgroundColor: cssVariables['--portal-primary'],
                                        boxShadow: `0 4px 12px ${cssVariables['--portal-primary']}40`
                                    }}
                                >
                                    {client?.name?.charAt(0) || 'P'}
                                </div>
                            )}
                            <span className="font-semibold text-lg hidden sm:block">
                                {client?.name || 'Portal'}
                            </span>
                        </a>

                        {/* Navigation - only show if logged in */}
                        {session && (
                            <nav className="hidden md:flex items-center gap-1">
                                <a
                                    href="/portal/dashboard"
                                    className="px-4 py-2 rounded-lg text-sm font-medium opacity-80 hover:opacity-100 hover:bg-white/5 transition-all"
                                >
                                    Dashboard
                                </a>
                                {client?.features.analytics && (
                                    <a
                                        href="/portal/dashboard/analytics"
                                        className="px-4 py-2 rounded-lg text-sm font-medium opacity-80 hover:opacity-100 hover:bg-white/5 transition-all"
                                    >
                                        Analytics
                                    </a>
                                )}
                                {client?.features.deployments && (
                                    <a
                                        href="/portal/dashboard/deployments"
                                        className="px-4 py-2 rounded-lg text-sm font-medium opacity-80 hover:opacity-100 hover:bg-white/5 transition-all"
                                    >
                                        Deployments
                                    </a>
                                )}
                                {client?.features.settings && (
                                    <a
                                        href="/portal/dashboard/settings"
                                        className="px-4 py-2 rounded-lg text-sm font-medium opacity-80 hover:opacity-100 hover:bg-white/5 transition-all"
                                    >
                                        Settings
                                    </a>
                                )}
                            </nav>
                        )}

                        {/* User Menu */}
                        <div className="flex items-center gap-3">
                            {session ? (
                                <div className="flex items-center gap-3">
                                    <a
                                        href="/portal/profile"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                                            style={{ backgroundColor: cssVariables['--portal-primary'] + '30' }}
                                        >
                                            {session.email?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-sm hidden sm:block">{session.email}</span>
                                    </a>
                                    <form action="/api/auth/logout" method="POST">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                                        >
                                            Logout
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <a
                                    href="/portal"
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                    style={{
                                        backgroundColor: cssVariables['--portal-primary'],
                                        boxShadow: `0 4px 12px ${cssVariables['--portal-primary']}40`
                                    }}
                                >
                                    Sign In
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Portal Footer */}
            <footer className="border-t border-white/10 mt-auto py-6 bg-black/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm opacity-50">
                            © {new Date().getFullYear()} {client?.name || 'Portal'}. Powered by{' '}
                            <a
                                href="https://brandverse.tech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-100 transition-opacity"
                                style={{ color: cssVariables['--portal-accent'] }}
                            >
                                Brandverse
                            </a>
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="/faq" className="text-sm opacity-50 hover:opacity-100 transition-opacity">
                                Support
                            </a>
                            <a href="/privacy" className="text-sm opacity-50 hover:opacity-100 transition-opacity">
                                Privacy
                            </a>
                            <a href="/terms" className="text-sm opacity-50 hover:opacity-100 transition-opacity">
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
