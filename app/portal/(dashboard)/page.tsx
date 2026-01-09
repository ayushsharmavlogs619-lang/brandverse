'use client';

import { StatCard } from '@/app/portal/components/StatCard';
import { SentimentChart } from '@/app/portal/components/SentimentChart';
import { CallPulseTable } from '@/app/portal/components/CallPulseTable';
import { mockDashboardData, mockCallLogs } from '@/app/portal/lib/mockData';
import { TrendingUp, Phone, Zap, Target } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-black tracking-tight mb-2">Overview</h1>
        <p className="text-gray-400">Welcome back! Here's your AI system performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Calls Handled"
          value={mockDashboardData.totalCalls.toLocaleString()}
          icon={Phone}
          trend={mockDashboardData.callsGrowth}
          color="blue"
        />
        <StatCard
          title="Revenue Saved"
          value={`$${mockDashboardData.revenueSaved.toLocaleString()}`}
          icon={TrendingUp}
          trend={15}
          color="green"
        />
        <StatCard
          title="Avg Speed to Answer"
          value={`${mockDashboardData.avgSpeedToAnswer}s`}
          icon={Zap}
          trend={-5}
          color="indigo"
        />
        <StatCard
          title="Lead Quality Score"
          value="94%"
          icon={Target}
          trend={8}
          color="purple"
        />
      </div>

      {/* Charts & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sentiment Analysis */}
        <div className="lg:col-span-1">
          <SentimentChart data={mockDashboardData.sentimentData} />
        </div>

        {/* Call Pulse Table */}
        <div className="lg:col-span-2">
          <CallPulseTable data={mockCallLogs} />
        </div>
      </div>
    </div>
  );
}
