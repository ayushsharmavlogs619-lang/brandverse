/**
 * Deployments Page
 * Manage AI bot deployments
 */

import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';

export default async function DeploymentsPage() {
    const session = await getSession();
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    // Mock deployments data
    const deployments = [
        {
            id: '1',
            name: 'Main Website Chat',
            type: 'chat' as const,
            status: 'active' as const,
            conversations: 8420,
            leads: 342,
            lastActive: '2 minutes ago'
        },
        {
            id: '2',
            name: 'Phone Assistant',
            type: 'voice' as const,
            status: 'active' as const,
            conversations: 4280,
            leads: 189,
            lastActive: '5 minutes ago'
        },
        {
            id: '3',
            name: 'Support Bot',
            type: 'chat' as const,
            status: 'active' as const,
            conversations: 2720,
            leads: 98,
            lastActive: '12 minutes ago'
        },
        {
            id: '4',
            name: 'Sales Outreach',
            type: 'voice' as const,
            status: 'paused' as const,
            conversations: 1520,
            leads: 67,
            lastActive: '2 days ago'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Deployments</h1>
                    <p className="opacity-60">Manage your AI bot deployments</p>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                >
                    <span>+</span>
                    New Deployment
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-sm opacity-60">Total Deployments</p>
                    <p className="text-2xl font-bold">{deployments.length}</p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-sm opacity-60">Active</p>
                    <p className="text-2xl font-bold text-green-400">
                        {deployments.filter(d => d.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-sm opacity-60">Total Leads</p>
                    <p className="text-2xl font-bold">
                        {deployments.reduce((sum, d) => sum + d.leads, 0)}
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-sm opacity-60">Conversations</p>
                    <p className="text-2xl font-bold">
                        {deployments.reduce((sum, d) => sum + d.conversations, 0).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Deployments List */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Name</th>
                            <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Type</th>
                            <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Status</th>
                            <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Conversations</th>
                            <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Leads</th>
                            <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Last Active</th>
                            <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.map((deployment) => (
                            <tr key={deployment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                                            style={{ backgroundColor: primaryColor + '20' }}
                                        >
                                            {deployment.type === 'voice' ? '📞' : '💬'}
                                        </div>
                                        <span className="font-medium">{deployment.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="capitalize text-sm">{deployment.type}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${deployment.status === 'active'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}
                                    >
                                        {deployment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">{deployment.conversations.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm">{deployment.leads}</td>
                                <td className="px-6 py-4 text-sm opacity-60">{deployment.lastActive}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Edit">
                                            ✏️
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Analytics">
                                            📊
                                        </button>
                                        <button
                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                            title={deployment.status === 'active' ? 'Pause' : 'Resume'}
                                        >
                                            {deployment.status === 'active' ? '⏸️' : '▶️'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
