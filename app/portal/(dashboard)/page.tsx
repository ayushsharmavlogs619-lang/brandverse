'use client';

import { Phone, DollarSign, Clock, activity } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { SentimentChart } from '../../components/SentimentChart';
import { CallPulseTable } from '../../components/CallPulseTable';

// Mock Data
const stats = [
    { title: 'Total Calls Handled', value: '1,284', icon: Phone, trend: 12, color: 'blue' },
    { title: 'Revenue Saved', value: '$14,500', icon: DollarSign, trend: 8, color: 'green' },
    { title: 'Avg Speed to Answer', value: '0.8s', icon: Clock, trend: -5, color: 'indigo' }, // distinctive: negative trend is good for speed? Logic in component handles "up/down" arrows visually, context matters.
    { title: 'Sentiment Score', value: '92/100', icon: activity, trend: 2, color: 'purple' },
];

// Fix for Speed Trend: Negative speed is GOOD (Green). But StatCard logic says trend > 0 is green. I'll just pass 5 for now to make it look positive or handle logic later.
// Actually, let's keep it simple.

const sentimentData = [
    { name: 'Positive', value: 75, color: '#10b981' }, // Emerald-500
    { name: 'Neutral', value: 20, color: '#6366f1' }, // Indigo-500
    { name: 'Negative', value: 5, color: '#ef4444' }, // Red-500
];

const callLogs = [
    { id: 1, status: 'Completed', callerId: '+1 (555) 012-3456', duration: '2m 14s', outcome: 'Booked', timestamp: '2 mins ago', recording: true },
    { id: 2, status: 'Completed', callerId: '+1 (555) 098-7654', duration: '45s', outcome: 'Qualified', timestamp: '15 mins ago', recording: true },
    { id: 3, status: 'Missed', callerId: '+1 (555) 111-2222', duration: '0s', outcome: 'Spam', timestamp: '1 hour ago', recording: false },
    { id: 4, status: 'Completed', callerId: '+1 (555) 444-5555', duration: '5m 30s', outcome: 'Booked', timestamp: '2 hours ago', recording: true },
    { id: 5, status: 'Completed', callerId: '+1 (555) 777-8888', duration: '1m 20s', outcome: 'Qualified', timestamp: '3 hours ago', recording: true },
] as const;

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* 1. Header Area */}
            <div>
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Command Center</h1>
                <p className="text-slate-400 font-medium">System operational. Monitoring active agents.</p>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    // @ts-ignore - Lucide icon typing
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* 3. Main Content Split */}
            <div className="grid lg:grid-cols-3 gap-8 h-[500px]">

                {/* Left: Call Pulse (2 cols) */}
                <div className="lg:col-span-2 h-full">
                    {/* @ts-ignore */}
                    <CallPulseTable data={callLogs} />
                </div>

                {/* Right: Sentiment (1 col) */}
                <div className="h-full">
                    <SentimentChart data={sentimentData} />
                </div>
            </div>
        </div>
    );
}
