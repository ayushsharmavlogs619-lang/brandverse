import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { getDeploymentsByClient } from '@/lib/portal/deployments';
import Link from 'next/link';

export default async function DeploymentsPage() {
    const session = await getSession();
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    const deployments = await getDeploymentsByClient(session?.clientId || '');

    // Safely format time
    function formatTime(date?: Date) {
        if (!date) return 'Never';
        // Basic relative time formatter assuming less than 24 hours for demo purposes
        return date.toLocaleDateString();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Deployments</h1>
                    <p className="opacity-60">Manage your AI bot deployments</p>
                </div>
                <Link
                    href="/portal/dashboard/deployments/new"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                >
                    <span>+</span>
                    New Deployment
                </Link>
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
                        {deployments.reduce((sum, d) => sum + Math.floor((d.stats?.totalConversations || 0) * (d.stats?.successRate || 0)), 0)}
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-sm opacity-60">Conversations</p>
                    <p className="text-2xl font-bold">
                        {deployments.reduce((sum, d) => sum + (d.stats?.totalConversations || 0), 0).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Deployments List */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                {deployments.length === 0 ? (
                    <div className="text-center py-24">
                         <div className="w-20 h-20 mx-auto bg-white/5 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner">🤖</div>
                         <h3 className="text-2xl font-semibold mb-3">No deployments found</h3>
                         <p className="text-slate-400 max-w-md mx-auto mb-8">
                             Get started by creating an AI voice agent or chatbot to handle customer conversations 24/7.
                         </p>
                         <Link
                             href="/portal/dashboard/deployments/new"
                             className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium hover:scale-[1.02] transition-transform shadow-lg"
                             style={{ backgroundColor: primaryColor }}
                         >
                             <span>+</span> Create Your First Agent
                         </Link>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Name</th>
                                <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Type</th>
                                <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Conversations</th>
                                <th className="text-left px-6 py-4 text-sm font-medium opacity-60">Success Rate</th>
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
                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
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
                                            className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${deployment.status === 'active'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : deployment.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                                                }`}
                                        >
                                            {deployment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{(deployment.stats?.totalConversations || 0).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm">{((deployment.stats?.successRate || 0) * 100).toFixed(1)}%</td>
                                    <td className="px-6 py-4 text-sm opacity-60">{formatTime(deployment.stats?.lastActiveAt)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link href={`/portal/dashboard/deployments/${deployment.id}`} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Edit">
                                                ✏️
                                            </Link>
                                            <Link href="/portal/dashboard/analytics" className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Analytics">
                                                📊
                                            </Link>
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
                )}
        </div>
    );
}
