/**
 * Dashboard Main Page
 * Shows client-specific stats and activity
 */

import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { adminDb } from '@/lib/firebase/admin';

// Mock data for demo - replace with real Firestore queries
async function getDashboardData(clientId: string) {
    // TODO: Replace with real Firestore queries
    const stats = {
        totalDeployments: 12,
        activeDeployments: 8,
        totalConversations: 15420,
        conversionRate: 23.5,
        avgResponseTime: 1.2,
    };

    const recentActivity = [
        { id: '1', action: 'New conversation started', time: '2 min ago', user: 'Customer', icon: '💬' },
        { id: '2', action: 'Lead captured successfully', time: '15 min ago', user: 'AI Agent', icon: '🎯' },
        { id: '3', action: 'Deployment updated', time: '1 hour ago', user: 'Admin', icon: '🔄' },
        { id: '4', action: 'New team member added', time: '3 hours ago', user: 'Admin', icon: '👤' },
        { id: '5', action: 'Monthly report generated', time: '1 day ago', user: 'System', icon: '📊' },
    ];

    const deployments = [
        { id: '1', name: 'Main Website Chat', type: 'chat', status: 'active', conversations: 8420 },
        { id: '2', name: 'Phone Assistant', type: 'voice', status: 'active', conversations: 4280 },
        { id: '3', name: 'Support Bot', type: 'chat', status: 'active', conversations: 2720 },
        { id: '4', name: 'Sales Outreach', type: 'voice', status: 'paused', conversations: 0 },
    ];

    return { stats, recentActivity, deployments };
}

export default async function DashboardPage() {
    const session = await getSession();
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    const { stats, recentActivity, deployments } = await getDashboardData(session?.clientId || '');

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
                    value={`${stats.conversionRate}%`}
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
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Your Deployments</h2>
                        <a
                            href="/portal/dashboard/deployments"
                            className="text-sm font-medium opacity-60 hover:opacity-100"
                            style={{ color: primaryColor }}
                        >
                            View All →
                        </a>
                    </div>
                    <div className="space-y-3">
                        {deployments.map((deployment) => (
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
                                        <p className="text-sm opacity-60">{deployment.type} • {formatNumber(deployment.conversations)} conversations</p>
                                    </div>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${deployment.status === 'active'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-yellow-500/20 text-yellow-400'
                                        }`}
                                >
                                    {deployment.status}
                                </span>
                            </div>
                        ))}
                    </div>
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
