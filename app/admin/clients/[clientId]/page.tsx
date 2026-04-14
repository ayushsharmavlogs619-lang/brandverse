/**
 * Admin Client Details Page
 * Manage specific client settings
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Client, PortalUser } from '@/types/portal';
import { notFound } from 'next/navigation';

async function getClient(subdomain: string) {
    const doc = await adminDb.collection('clients').doc(subdomain).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Client;
}

async function getClientUsers(clientId: string) {
    const snapshot = await adminDb.collection('portal_users')
        .where('clientId', '==', clientId)
        .limit(10)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PortalUser[];
}

export default async function ClientDetailsPage({
    params
}: {
    params: Promise<{ clientId: string }>
}) {
    const { clientId } = await params;
    const client = await getClient(clientId);

    if (!client) {
        notFound();
    }

    const users = await getClientUsers(clientId);

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold shadow-lg"
                        style={{ backgroundColor: client.theme?.primaryColor || '#6366f1' }}
                    >
                        {client.name?.charAt(0) || 'C'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{client.name}</h1>
                        <p className="opacity-60">{client.subdomain}.brandverse.tech</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                        Edit Details
                    </button>
                    <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors">
                        Suspend Client
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Overview */}
                    <section className="bg-white/5 rounded-xl border border-white/10 p-6">
                        <h2 className="text-lg font-semibold mb-4">Overview</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm opacity-60 mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${client.isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                    <span className="font-medium">{client.isActive ? 'Active' : 'Suspended'}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm opacity-60 mb-1">Plan</p>
                                <p className="font-medium capitalize">{client.plan}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-60 mb-1">Created At</p>
                                <p className="font-medium">{new Date().toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-60 mb-1">Owner ID</p>
                                <p className="font-medium font-mono text-sm opacity-80">{client.ownerId || 'N/A'}</p>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="bg-white/5 rounded-xl border border-white/10 p-6">
                        <h2 className="text-lg font-semibold mb-4">Enabled Features</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(client.features).map(([feature, enabled]) => (
                                <div
                                    key={feature}
                                    className={`p-3 rounded-lg border ${enabled
                                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                                            : 'bg-white/5 border-white/5 opacity-50'
                                        }`}
                                >
                                    <p className="text-sm font-medium capitalize">{feature}</p>
                                    <p className="text-xs">{enabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Users */}
                    <section className="bg-white/5 rounded-xl border border-white/10 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Users</h2>
                            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                        </div>

                        {users.length > 0 ? (
                            <div className="space-y-3">
                                {users.map(user => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                                                {user.email.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{user.displayName || user.email}</p>
                                                <p className="text-xs opacity-50">{user.email}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded bg-white/10">{user.role}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm opacity-50 py-4 text-center">No users found.</p>
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Branding */}
                    <section className="bg-white/5 rounded-xl border border-white/10 p-6">
                        <h2 className="text-lg font-semibold mb-4">Branding</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm opacity-60 mb-2">Primary Color</p>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-lg shadow-sm"
                                        style={{ backgroundColor: client.theme?.primaryColor || '#6366f1' }}
                                    />
                                    <code className="text-sm bg-white/10 px-2 py-1 rounded">
                                        {client.theme?.primaryColor || '#6366f1'}
                                    </code>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm opacity-60 mb-2">Secondary Color</p>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-lg shadow-sm"
                                        style={{ backgroundColor: client.theme?.secondaryColor || '#4f46e5' }}
                                    />
                                    <code className="text-sm bg-white/10 px-2 py-1 rounded">
                                        {client.theme?.secondaryColor || '#4f46e5'}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
