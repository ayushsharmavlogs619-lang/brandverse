/**
 * Analytics Page
 * Shows detailed performance metrics
 */

import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';

export default async function AnalyticsPage() {
    const session = await getSession();
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    // Mock analytics data
    const weeklyData = [
        { day: 'Mon', conversations: 245, leads: 18, conversions: 4 },
        { day: 'Tue', conversations: 312, leads: 24, conversions: 6 },
        { day: 'Wed', conversations: 287, leads: 21, conversions: 5 },
        { day: 'Thu', conversations: 398, leads: 32, conversions: 8 },
        { day: 'Fri', conversations: 456, leads: 38, conversions: 9 },
        { day: 'Sat', conversations: 234, leads: 15, conversions: 3 },
        { day: 'Sun', conversations: 189, leads: 12, conversions: 2 },
    ];

    const topPerformers = [
        { name: 'Main Website Chat', score: 94, conversations: 8420 },
        { name: 'Phone Assistant', score: 89, conversations: 4280 },
        { name: 'Support Bot', score: 87, conversations: 2720 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Analytics</h1>
                <p className="opacity-60">Performance metrics for {client?.name}</p>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 mb-6">
                {['7 Days', '30 Days', '90 Days', 'Year'].map((range) => (
                    <button
                        key={range}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${range === '7 Days'
                                ? 'bg-white/10 text-white'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {range}
                    </button>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard label="Total Conversations" value="2,121" change="+12.5%" positive />
                <MetricCard label="Leads Generated" value="160" change="+8.2%" positive />
                <MetricCard label="Conversion Rate" value="23.5%" change="+2.1%" positive />
                <MetricCard label="Avg. Response Time" value="1.2s" change="-15%" positive />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Weekly Overview */}
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h3 className="font-semibold mb-4">Weekly Overview</h3>
                    <div className="space-y-4">
                        {weeklyData.map((day) => (
                            <div key={day.day} className="flex items-center gap-4">
                                <span className="w-10 text-sm opacity-60">{day.day}</span>
                                <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${(day.conversations / 500) * 100}%`,
                                            backgroundColor: primaryColor
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-medium w-16 text-right">{day.conversations}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h3 className="font-semibold mb-4">Top Performing Bots</h3>
                    <div className="space-y-4">
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
                </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h3 className="font-semibold mb-4">💡 AI Insights</h3>
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
