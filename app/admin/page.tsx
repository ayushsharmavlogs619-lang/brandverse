/**
 * Admin Dashboard - Client List
 * Manage all tenant clients
 */

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { adminDb } from '@/lib/firebase/admin';
import type { Client } from '@/types/portal';

async function getClients() {
    try {
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return [];
        const snapshot = await adminDb.collection('clients').get();
        return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })) as Client[];
    } catch (e) {
        console.error('Firebase Client fetch failed. Operating in offline mode.');
        return [];
    }
}

export default async function AdminDashboard() {
    const clients = await getClients();

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Tenant <span className="text-blue-500 text-glow-blue">Fleet</span></h1>
                    <p className="text-slate-400 mt-2 font-medium">Monitoring and managing active operational units.</p>
                </div>
                <Link
                    href="/admin/clients/create"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95 group"
                >
                    <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                    Deploy New Client
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    label="Total Clients"
                    value={clients.length.toString()}
                    icon="🏢"
                />
                <StatsCard
                    label="Active Tenants"
                    value={clients.filter(c => c.isActive).length.toString()}
                    icon="✅"
                    color="text-green-400"
                />
                <StatsCard
                    label="Total Revenue"
                    value="$12.4k"
                    icon="💰"
                    color="text-yellow-400"
                />
            </div>

            {/* Client List */}
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 font-medium opacity-60">Client Name</th>
                            <th className="px-6 py-4 font-medium opacity-60">Subdomain</th>
                            <th className="px-6 py-4 font-medium opacity-60">Plan</th>
                            <th className="px-6 py-4 font-medium opacity-60">Status</th>
                            <th className="px-6 py-4 font-medium opacity-60">Created</th>
                            <th className="px-6 py-4 font-medium opacity-60">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-xs"
                                            style={{ backgroundColor: client.theme?.primaryColor || '#6366f1' }}
                                        >
                                            {client.name?.charAt(0) || 'C'}
                                        </div>
                                        <span className="font-medium">{client.name || 'Unnamed Client'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {client.subdomain ? (
                                        <a
                                            href={`http://${client.subdomain}.brandverse.tech`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            {client.subdomain}.brandverse.tech
                                        </a>
                                    ) : (
                                        <span className="text-slate-500 italic text-sm">No subdomain</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${client.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-400' :
                                            client.plan === 'pro' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {client.plan || 'freemium'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {client.isActive ? (
                                        <span className="text-green-400 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-400"></span> Active
                                        </span>
                                    ) : (
                                        <span className="text-red-400 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-400"></span> Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm opacity-60">
                                    {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    <Link 
                                        href={`/admin/clients/${client.id}`}
                                        className="text-sm hover:text-white opacity-60 hover:opacity-100 transition-opacity"
                                    >
                                        Manage
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatsCard({ label, value, icon, color = 'text-white' }: { label: string; value: string; icon: string; color?: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                    {icon}
                </div>
                <div>
                    <p className="text-sm opacity-60 mb-1">{label}</p>
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
            </div>
        </div>
    );
}
