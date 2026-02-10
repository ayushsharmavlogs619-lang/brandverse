'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Target, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';

export default function AdsROICalculator() {
    const [adSpend, setAdSpend] = useState(2000); // Monthly budget
    const [cpc, setCpc] = useState(5.00); // Cost per click
    const [conversionRate, setConversionRate] = useState(3.0); // % of visitors who become leads
    const [closeRate, setCloseRate] = useState(20); // % of leads who become customers
    const [dealValue, setDealValue] = useState(1000); // LTV
    const [email, setEmail] = useState('');

    // Calculations
    const clicks = adSpend / cpc;
    const leads = clicks * (conversionRate / 100);
    const customers = leads * (closeRate / 100);

    const revenue = customers * dealValue;
    const profit = revenue - adSpend;
    const roas = revenue / adSpend; // Return on Ad Spend
    const roi = (profit / adSpend) * 100;

    // Optimized Scenario (with AI Agents improving conversion & response speed)
    // Assumption: Conversation Rate +50% (from 3% to 4.5%), Close Rate +25% (from instant response)
    const optConversionRate = conversionRate * 1.5;
    const optCloseRate = closeRate * 1.25;

    const optLeads = clicks * (optConversionRate / 100);
    const optCustomers = optLeads * (optCloseRate / 100);
    const optRevenue = optCustomers * dealValue;
    const optProfit = optRevenue - adSpend;
    const optRoas = optRevenue / adSpend;

    const revenueLift = optRevenue - revenue;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/10 border border-yellow-500/20 rounded-full mb-6">
                        <Target className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-400">Marketing ROI Tool</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Google Ads ROI Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Stop burning cash. See how improving your conversion rate creates massive leverage in your ad campaigns.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Campaign Metrics</h2>

                        <div className="space-y-6">
                            {/* Ad Spend */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Monthly Ad Spend ($)
                                </label>
                                <input
                                    type="number"
                                    value={adSpend}
                                    onChange={(e) => setAdSpend(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                                    min="0"
                                />
                            </div>

                            {/* CPC */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average CPC (Cost Per Click) ($)
                                </label>
                                <input
                                    type="number"
                                    value={cpc}
                                    onChange={(e) => setCpc(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            {/* Conversion Rate */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Website Conversion Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={conversionRate}
                                    onChange={(e) => setConversionRate(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                            </div>

                            {/* Close Rate */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Sales Close Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={closeRate}
                                    onChange={(e) => setCloseRate(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                                    min="0"
                                    max="100"
                                />
                            </div>

                            {/* Deal Value */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average Deal Value / LTV ($)
                                </label>
                                <input
                                    type="number"
                                    value={dealValue}
                                    onChange={(e) => setDealValue(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border border-yellow-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Campaign Performance</h2>

                        <div className="space-y-6">

                            {/* Current Status */}
                            <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                <div className="text-sm text-slate-400 mb-3">Current ROI</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">ROAS</div>
                                        <div className="text-2xl font-bold text-white">
                                            {roas.toFixed(1)}x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Net Profit</div>
                                        <div className={`text-2xl font-bold ${profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            ${profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* With Optimized Conversion */}
                            <div className="p-6 bg-black/20 rounded-xl border border-yellow-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                                    WITH CONVERSION AI
                                </div>
                                <div className="text-sm text-slate-400 mb-3">Projected ROI</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">ROAS</div>
                                        <div className="text-2xl font-bold text-yellow-400">
                                            {optRoas.toFixed(1)}x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Net Profit</div>
                                        <div className="text-2xl font-bold text-yellow-400">
                                            ${optProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-slate-500">
                                    By increasing conversion to {optConversionRate.toFixed(1)}% and closing rate to {optCloseRate.toFixed(0)}%
                                </div>
                            </div>

                            {/* The Gain */}
                            <div className="p-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
                                <div className="text-sm text-slate-400 mb-2">Monthly Revenue Increase</div>
                                <div className="text-4xl font-bold text-white">
                                    +${revenueLift.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-sm text-yellow-400 mt-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Same ad spend, higher return
                                </div>
                            </div>

                            {/* Email Capture */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-sm font-semibold text-white mb-3">Fix Your Conversion Rate</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Download "The AI Ad Funnel Checklist" to see where you're losing leads.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-500"
                                    />
                                    <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all">
                                        Send Checklist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Maximize Every Ad Dollar
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Don't send paid traffic to a voicemail box. Brandverse Agents engage instantly, qualifying leads and booking appointments to skyrocket your ROAS.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Audit My Funnel <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
