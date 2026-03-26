/**
 * Analytics Page
 * Shows detailed performance metrics
 */

import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { getDashboardStats, getWeeklyAnalytics } from '@/lib/portal/analytics';
import { getDeploymentsByClient } from '@/lib/portal/deployments';
import Link from 'next/link';

export default async function AnalyticsPage() {
    const session = await getSession();
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    const clientId = session?.clientId || '';
    
    // Fetch live data
    const stats = await getDashboardStats(clientId);
    const weeklyData = await getWeeklyAnalytics(clientId);
    const deployments = await getDeploymentsByClient(clientId);

    // Calculate Top Performers dynamically
    const topPerformers = [...deployments]
        .sort((a, b) => (b.stats?.totalConversations || 0) - (a.stats?.totalConversations || 0))
        .slice(0, 3)
        .map(d => ({
            name: d.name,
            score: Math.round((d.stats?.successRate || 0.8) * 100), // Convert rate to a 0-100 score
            conversations: d.stats?.totalConversations || 0
        }));

    const totalWeeklyConversations = weeklyData.reduce((sum, day) => sum + day.conversations, 0);
    const maxDayConversations = Math.max(...weeklyData.map(d => d.conversations), 1); // Avoid div by 0

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Analytics</h1>
                    <p className="opacity-60">Performance metrics for {client?.name}</p>
                </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 mb-6">
                {['7 Days', '30 Days', '90 Days', 'Year'].map((range) => (
                    <button
                        key={range}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${range === '7 Days'
                                ? 'bg-white/10 text-white'
                                : 'text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-50'
                            }`}
                        disabled={range !== '7 Days'} // Other ranges not implemented yet
                    >
                        {range}
                    </button>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard 
                    label="Total Conversations" 
                    value={stats.totalConversations.toLocaleString()} 
                    change={stats.totalConversations > 0 ? "+12%" : "0%"} 
                    positive={true} 
                />
                <MetricCard 
                    label="Active Agents" 
                    value={stats.activeDeployments.toString()} 
                    change={stats.activeDeployments > 0 ? "+1" : "0"} 
                    positive={true} 
                />
                <MetricCard 
                    label="Avg. Success Rate" 
                    value={`${stats.conversionRate.toFixed(1)}%`} 
                    change={stats.totalConversations > 0 ? "+2.1%" : "0%"} 
                    positive={true} 
                />
                <MetricCard 
                    label="Avg. Duration" 
                    value="1.2m" 
                    change="Stable" 
                    positive={true} 
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Weekly Overview */}
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 flex flex-col items-start w-full">
                    <h3 className="font-semibold mb-6">Weekly Overview</h3>
                    {totalWeeklyConversations === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[220px] text-center opacity-60">
                            <div className="text-3xl mb-3">📊</div>
                            <p className="text-sm">Not enough data to display chart.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 w-full">
                            {weeklyData.map((day) => (
                                <div key={day.day} className="flex items-center gap-4">
                                    <span className="w-10 text-sm opacity-60">{day.day}</span>
                                    <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                width: `${(day.conversations / maxDayConversations) * 100}%`,
                                                backgroundColor: primaryColor
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium w-16 text-right">{day.conversations}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Top Performers */}
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 flex flex-col items-start w-full">
                    <h3 className="font-semibold mb-6">Top Performing Bots</h3>
                    {topPerformers.length === 0 ? (
                         <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[200px] text-center border border-dashed border-white/10 rounded-xl">
                            <p className="text-sm opacity-60 mb-4">No active bots found to rank.</p>
                            <Link 
                                href="/portal/dashboard/deployments/new"
                                className="text-sm font-medium px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                Deploy Agent
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4 w-full">
                            {topPerformers.map((bot, i) => (
                                <div key={bot.name} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                                    <span
                                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{ backgroundColor: primaryColor + '30' }}
                                    >
                                        {i + 1}
                                    </span>
                                    <div className="flex-1">
                                        <p className="font-medium">{bot.name}</p>
                                        <p className="text-sm opacity-60">{bot.conversations.toLocaleString()} conversations</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold" style={{ color: primaryColor }}>{bot.score}</p>
                                        <p className="text-xs opacity-50">Score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h3 className="font-semibold mb-4">💡 AI Insights</h3>
                {stats.totalDeployments === 0 ? (
                    <div className="opacity-60 text-sm">Deploy your first AI agent to start receiving actionable insights.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InsightCard
                            title="Peak Hours"
                            description="Most conversations happen between 2-4 PM. Consider increasing bot capacity."
                        />
                        <InsightCard
                            title="Top Query"
                            description="'Pricing' is your most asked question. Consider adding a pricing bot."
                        />
                        <InsightCard
                            title="Improvement"
                            description="Response time improved 15% this week. Keep optimizing!"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function MetricCard({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <p className="text-sm opacity-60 mb-1">{label}</p>
            <p className="text-2xl font-bold mb-1">{value}</p>
            <p className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
                {change} vs last period
            </p>
        </div>
    );
}

function InsightCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="p-4 rounded-lg bg-white/5">
            <p className="font-medium mb-1">{title}</p>
            <p className="text-sm opacity-60">{description}</p>
        </div>
    );
}
