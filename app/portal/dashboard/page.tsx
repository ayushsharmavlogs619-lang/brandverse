/**
 * Dashboard Main Page
 * Shows client-specific stats and activity
 */

import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { getDashboardStats } from '@/lib/portal/analytics';
import { getDeploymentsByClient } from '@/lib/portal/deployments';

export default async function DashboardPage() {
    const session = await getSession();
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    const clientId = session?.clientId || '';
    const stats = await getDashboardStats(clientId);
    const deployments = await getDeploymentsByClient(clientId);

    // Provide a simple welcome activity if empty
    const recentActivity = [
        { id: '1', action: 'Portal accessed successfully', time: 'Just now', user: session?.email || 'Admin', icon: '👋' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Dashboard
                </h1>
                <p className="opacity-60">
                    Welcome back! Here&apos;s your overview for {client?.name || 'your organization'}.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <StatCard
                    label="Total Deployments"
                    value={stats.totalDeployments.toString()}
                    icon="🤖"
                    color={primaryColor}
                />
                <StatCard
                    label="Active Bots"
                    value={stats.activeDeployments.toString()}
                    icon="✅"
                    color="#22c55e"
                />
                <StatCard
                    label="Conversations"
                    value={formatNumber(stats.totalConversations)}
                    icon="💬"
                    color={primaryColor}
                />
                <StatCard
                    label="Conversion Rate"
                    value={`${stats.conversionRate.toFixed(1)}%`}
                    icon="🎯"
                    color="#f59e0b"
                />
                <StatCard
                    label="Avg Response"
                    value={`${stats.avgResponseTime}s`}
                    icon="⚡"
                    color="#8b5cf6"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Deployments */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">Your Deployments</h2>
                        {deployments.length > 0 && (
                            <a
                                href="/portal/dashboard/deployments"
                                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                                style={{ color: primaryColor }}
                            >
                                View All →
                            </a>
                        )}
                    </div>
                    
                    {deployments.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                            <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-4">🤖</div>
                            <h3 className="text-lg font-medium mb-2">No active deployments</h3>
                            <p className="text-sm opacity-60 max-w-sm mx-auto mb-6">Create your first AI agent to start handling conversations and capturing leads automatically.</p>
                            <a 
                                href="/portal/dashboard/deployments/new"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <span>+</span> Create Agent
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {deployments.slice(0, 5).map((deployment) => (
                                <div
                                    key={deployment.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                                            style={{ backgroundColor: primaryColor + '20' }}
                                        >
                                            {deployment.type === 'voice' ? '📞' : '💬'}
                                        </div>
                                        <div>
                                            <p className="font-medium">{deployment.name}</p>
                                            <p className="text-sm opacity-60 capitalize">{deployment.type} • {formatNumber(deployment.stats.totalConversations)} conversations</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${deployment.status === 'active'
                                                ? 'bg-green-500/20 text-green-400'
                                                : deployment.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                                            }`}
                                    >
                                        {deployment.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                            >
                                <span className="text-lg">{activity.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{activity.action}</p>
                                    <p className="text-xs opacity-50">{activity.user} • {activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <QuickAction
                        title="New Deployment"
                        description="Create a new AI bot"
                        icon="➕"
                        href="/portal/dashboard/deployments/new"
                        color={primaryColor}
                    />
                    <QuickAction
                        title="View Analytics"
                        description="Check performance"
                        icon="📊"
                        href="/portal/dashboard/analytics"
                        color={primaryColor}
                    />
                    <QuickAction
                        title="Team Settings"
                        description="Manage your team"
                        icon="👥"
                        href="/portal/dashboard/settings"
                        color={primaryColor}
                    />
                    <QuickAction
                        title="Get Support"
                        description="Contact Brandverse"
                        icon="💬"
                        href="mailto:support@brandverse.tech"
                        color={primaryColor}
                    />
                </div>
            </div>
        </div>
    );
}

// Helper components
function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-2">
                <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ backgroundColor: color + '20' }}
                >
                    {icon}
                </span>
                <p className="text-sm opacity-60">{label}</p>
            </div>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

function QuickAction({ title, description, icon, href, color }: { title: string; description: string; icon: string; href: string; color: string }) {
    return (
        <a
            href={href}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
            <span
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: color + '15' }}
            >
                {icon}
            </span>
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-xs opacity-50">{description}</p>
            </div>
        </a>
    );
}

function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}
