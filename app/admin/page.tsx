/**
 * Admin Dashboard - Client List
 * Manage all tenant clients
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Client } from '@/types/portal';

async function getClients() {
    const snapshot = await adminDb.collection('clients').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Client[];
}

export default async function AdminDashboard() {
    const clients = await getClients();

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Clients</h1>
                    <p className="opacity-60">Manage your SaaS tenants</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
                    + New Client
                </button>
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
                                            style={{ backgroundColor: client.theme?.primaryColor }}
                                        >
                                            {client.name.charAt(0)}
                                        </div>
                                        <span className="font-medium">{client.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href={`http://${client.subdomain}.brandverse.tech`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        {client.subdomain}.brandverse.tech
                                    </a>
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${client.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-400' :
                                            client.plan === 'pro' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {client.plan}
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
                                    {/* Handle Firestore timestamp or Date object */}
                                    {new Date().toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-sm hover:text-white opacity-60 hover:opacity-100 transition-opacity">
                                        Manage
                                    </button>
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
