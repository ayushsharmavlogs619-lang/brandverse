/**
 * System Admin Layout
 * Only accessible by system admins
 */

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/portal/sessions';
import { getPortalUser } from '@/lib/portal/users';
import { verifyIdToken } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We need to verify if the user has system admin privileges
    // This is usually done via a custom claim in the ID token or a specific whitelist
    // For this demo, we'll check if the user is in the 'admin' role of the 'system' client (if we had one)
    // OR we can check email against an env var list

    // If no Firebase keys, enable 'Local Master' mode for easier dev/outreach
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.warn('MISSION CRITICAL: Operating in Local Master mode (No Firebase Keys).');
        return (
            <div className="min-h-screen bg-slate-900 text-white flex">
                <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
                    <div className="mb-8 font-black uppercase italic tracking-tighter text-blue-500">
                        Brandverse <span className="text-white">Local</span>
                    </div>
                    <nav className="flex-1 space-y-1">
                        <NavLink href="/admin/leads" icon="🎯">Mission Intel</NavLink>
                        <NavLink href="/admin" icon="🏢">Fleet (Offline)</NavLink>
                    </nav>
                </aside>
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        );
    }

    const session = await getSession();

    if (!session) {
        redirect('/portal');
    }

    // Check if user is a system admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@brandverse.tech';

    if (session.email !== adminEmail) {
        redirect('/portal/dashboard');
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Brandverse Admin
                    </h1>
                    <p className="text-xs opacity-50">System Management</p>
                </div>

                <nav className="flex-1 space-y-1">
                    <NavLink href="/admin" icon="🏢">Clients</NavLink>
                    <NavLink href="/admin/leads" icon="🎯">Leads</NavLink>
                    <NavLink href="/admin/users" icon="👥">Users</NavLink>
                    <NavLink href="/admin/settings" icon="⚙️">Settings</NavLink>
                </nav>

                <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                            {session.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{session.email}</p>
                            <p className="text-xs opacity-50">System Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors opacity-80 hover:opacity-100"
        >
            <span>{icon}</span>
            <span className="font-medium">{children}</span>
        </a>
    );
}
