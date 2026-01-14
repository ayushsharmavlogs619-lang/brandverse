'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, TrendingDown, AlertTriangle, ArrowRight } from 'lucide-react';

export default function LeadResponseTimeCalculator() {
    const [leadsPerMonth, setLeadsPerMonth] = useState(50);
    const [avgResponseTime, setAvgResponseTime] = useState(120); // minutes
    const [avgDealValue, setAvgDealValue] = useState(1000);
    const [email, setEmail] = useState('');

    // Industry data: conversion rate drop based on response time
    const getConversionRate = (minutes: number) => {
        if (minutes <= 1) return 0.39; // 39% if respond within 1 minute
        if (minutes <= 5) return 0.21; // 21% if respond within 5 minutes
        if (minutes <= 10) return 0.13; // 13% if respond within 10 minutes
        if (minutes <= 30) return 0.08; // 8% if respond within 30 minutes
        if (minutes <= 60) return 0.05; // 5% if respond within 1 hour
        if (minutes <= 120) return 0.03; // 3% if respond within 2 hours
        return 0.02; // 2% if respond after 2+ hours
    };

    const currentConversion = getConversionRate(avgResponseTime);
    const idealConversion = getConversionRate(1); // AI responds in <1 min

    const currentCustomers = leadsPerMonth * currentConversion;
    const potentialCustomers = leadsPerMonth * idealConversion;
    const lostCustomers = potentialCustomers - currentCustomers;

    const currentRevenue = currentCustomers * avgDealValue;
    const potentialRevenue = potentialCustomers * avgDealValue;
    const lostRevenue = lostCustomers * avgDealValue;

    const annualLostRevenue = lostRevenue * 12;

    const getResponseCategory = (minutes: number) => {
        if (minutes <= 1) return { label: 'Excellent', color: 'text-green-400' };
        if (minutes <= 5) return { label: 'Good', color: 'text-blue-400' };
        if (minutes <= 30) return { label: 'Fair', color: 'text-yellow-400' };
        if (minutes <= 120) return { label: 'Poor', color: 'text-orange-400' };
        return { label: 'Very Poor', color: 'text-red-400' };
    };

    const category = getResponseCategory(avgResponseTime);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full mb-6">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span className="text-sm font-medium text-orange-400">Free Lead Analysis Tool</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Lead Response Time Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Every minute you wait to respond, your conversion rate drops. Calculate exactly how much slow response times are costing you.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Your Lead Flow</h2>

                        <div className="space-y-6">
                            {/* Leads per month */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Leads Per Month
                                </label>
                                <input
                                    type="number"
                                    value={leadsPerMonth}
                                    onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Phone calls, form fills, chat messages—all lead sources
                                </p>
                            </div>

                            {/* Avg response time */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average Response Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={avgResponseTime}
                                    onChange={(e) => setAvgResponseTime(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                />
                                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400">Your Speed:</span>
                                        <span className={`text-sm font-semibold ${category.color}`}>
                                            {category.label}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">
                                        Current conversion rate: {(currentConversion * 100).toFixed(1)}%
                                    </div>
                                </div>
                            </div>

                            {/* Avg deal value */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average Deal Value ($)
                                </label>
                                <input
                                    type="number"
                                    value={avgDealValue}
                                    onChange={(e) => setAvgDealValue(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                    step="50"
                                />
                            </div>

                            {/* Quick tips */}
                            <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-blue-400 mt-0.5" />
                                    <div className="text-xs text-slate-400">
                                        <div className="font-semibold text-white mb-1">Industry Benchmark</div>
                                        Leads contacted within 1 minute convert at 391% higher rate than those contacted within 1 hour.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">The Cost of Waiting</h2>

                        <div className="space-y-6">
                            {/* Current Performance */}
                            <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                <div className="text-sm text-slate-400 mb-3">Current Performance</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">Conversion Rate</div>
                                        <div className="text-2xl font-bold text-white">
                                            {(currentConversion * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Customers/Month</div>
                                        <div className="text-2xl font-bold text-white">
                                            {currentCustomers.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <div className="text-xs text-slate-500">Monthly Revenue</div>
                                    <div className="text-xl font-bold text-white">
                                        ${currentRevenue.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* With Instant Response */}
                            <div className="p-6 bg-black/20 rounded-xl border border-green-500/20">
                                <div className="text-sm text-slate-400 mb-3">With Instant Response (&lt;1 min)</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">Conversion Rate</div>
                                        <div className="text-2xl font-bold text-green-400">
                                            {(idealConversion * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Customers/Month</div>
                                        <div className="text-2xl font-bold text-green-400">
                                            {potentialCustomers.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <div className="text-xs text-slate-500">Monthly Revenue</div>
                                    <div className="text-xl font-bold text-green-400">
                                        ${potentialRevenue.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Lost Opportunity */}
                            <div className="p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                    <div className="text-sm font-semibold text-white">Lost Opportunity</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <div className="text-xs text-slate-400">Lost Customers</div>
                                        <div className="text-xl font-bold text-red-400">
                                            {lostCustomers.toFixed(1)}/month
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Lost Revenue</div>
                                        <div className="text-xl font-bold text-red-400">
                                            ${lostRevenue.toLocaleString()}/mo
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-red-500/30">
                                    <div className="text-xs text-slate-400">Annual Lost Revenue</div>
                                    <div className="text-3xl font-bold text-red-400">
                                        ${annualLostRevenue.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Email Capture */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-sm font-semibold text-white mb-3">Get Detailed Analysis</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Industry benchmarks, optimization strategies, and implementation guide.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Response Time Breakdown */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Response Time vs Conversion Rate</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { time: '< 1 min', rate: 39, level: 'Excellent', color: 'green' },
                            { time: '1-5 min', rate: 21, level: 'Good', color: 'blue' },
                            { time: '5-10 min', rate: 13, level: 'Fair', color: 'yellow' },
                            { time: '10-30 min', rate: 8, level: 'Below Average', color: 'orange' },
                            { time: '30-60 min', rate: 5, level: 'Poor', color: 'red' },
                            { time: '60+ min', rate: 2, level: 'Very Poor', color: 'red' },
                        ].map((tier, i) => (
                            <div key={i} className={`p-6 bg-white/5 border border-${tier.color}-500/20 rounded-xl`}>
                                <div className="text-sm text-slate-400 mb-2">{tier.time}</div>
                                <div className={`text-3xl font-bold text-${tier.color}-400 mb-1`}>
                                    {tier.rate}%
                                </div>
                                <div className={`text-xs text-${tier.color}-400`}>{tier.level}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Source: Harvard Business Review study of 1.25M leads
                    </p>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl p-12 text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Respond Instantly with AI
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Brandverse AI voice agents and chatbots respond in under 3 seconds, 24/7. Never lose another lead to slow response times.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Book Free Demo <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/tools/missed-call-calculator"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Try Another Calculator
                        </Link>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Common Questions</h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                Is this data accurate?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                Yes. The conversion rates are from a Harvard Business Review study analyzing 1.25 million leads across multiple industries. Your specific rates may vary, but the trend is consistent.
                            </p>
                        </details>
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                How can AI respond faster than humans?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                AI doesn't sleep, take breaks, or handle other tasks. It responds to every lead within seconds, qualifies them, and books appointments—all instantly.
                            </p>
                        </details>
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                What if my team is already fast?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                Even the fastest humans can't respond at 2 AM or handle 10 simultaneous leads. AI fills those gaps, ensuring 100% instant response 24/7.
                            </p>
                        </details>
                    </div>
                </div>

            </main>
        </div>
    );
}
