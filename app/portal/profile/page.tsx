/**
 * Profile Page
 * User profile management
 */

import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getPortalUser } from '@/lib/portal/users';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const session = await getSession();
    if (!session) redirect('/portal');

    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const user = await getPortalUser(session.uid);
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Profile</h1>
                <p className="opacity-60">Manage your account information</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-6">
                <div className="flex items-center gap-6 mb-6">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                        style={{ backgroundColor: primaryColor + '30' }}
                    >
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{user?.displayName || 'User'}</h2>
                        <p className="opacity-60">{user?.email}</p>
                        <span
                            className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium capitalize"
                            style={{ backgroundColor: primaryColor + '20', color: primaryColor }}
                        >
                            {user?.role || 'member'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                        <p className="text-sm opacity-60">Organization</p>
                        <p className="font-medium">{client?.name || 'Unknown'}</p>
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Member Since</p>
                        <p className="font-medium">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Last Login</p>
                        <p className="font-medium">
                            {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Plan</p>
                        <p className="font-medium capitalize">{client?.plan || 'Free'}</p>
                    </div>
                </div>
            </div>

            {/* Edit Profile */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h3 className="font-semibold mb-4">Edit Profile</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">Display Name</label>
                        <input
                            type="text"
                            defaultValue={user?.displayName || ''}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2"
                            style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">Email Address</label>
                        <input
                            type="email"
                            defaultValue={user?.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50"
                        />
                        <p className="text-xs opacity-50 mt-1">Contact admin to change your email</p>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: primaryColor }}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
