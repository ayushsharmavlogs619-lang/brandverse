'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PieChart, TrendingUp, ArrowRight } from 'lucide-react';

export default function MarginCalculator() {
    const [revenue, setRevenue] = useState(50000); // Monthly revenue
    const [laborCost, setLaborCost] = useState(20000);
    const [materialCost, setMaterialCost] = useState(10000);
    const [overheadCost, setOverheadCost] = useState(8000);
    const [marketingCost, setMarketingCost] = useState(2000);
    const [email, setEmail] = useState('');

    // Current Margin Calculation
    const totalCost = laborCost + materialCost + overheadCost + marketingCost;
    const netProfit = revenue - totalCost;
    const profitMargin = (netProfit / revenue) * 100;

    // AI Impact Scenario
    // Assumption: AI reduces overhead (admin/phone staff) and increases revenue (capture missed calls)
    const aiCost = 497;
    const overheadReduction = 2000; // Saving on receptionist/answering service
    const revenueIncrease = revenue * 0.15; // 15% boost from captured leads

    const newRevenue = revenue + revenueIncrease;
    const newOverhead = overheadCost - overheadReduction + aiCost;
    const newTotalCost = laborCost + materialCost + newOverhead + marketingCost;
    const newNetProfit = newRevenue - newTotalCost;
    const newProfitMargin = (newNetProfit / newRevenue) * 100;

    const annualProfitIncrease = (newNetProfit - netProfit) * 12;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 border border-emerald-500/20 rounded-full mb-6">
                        <PieChart className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">Profit Optimization Tool</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Service Business Margin Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Analyze your profit margins and see how automation can instantly boost your bottom line.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Monthly Numbers</h2>

                        <div className="space-y-6">
                            {/* Revenue */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Total Monthly Revenue ($)
                                </label>
                                <input
                                    type="number"
                                    value={revenue}
                                    onChange={(e) => setRevenue(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                                    min="0"
                                />
                            </div>

                            {/* Labor */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Labor Costs ($)
                                </label>
                                <input
                                    type="number"
                                    value={laborCost}
                                    onChange={(e) => setLaborCost(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                                    min="0"
                                />
                            </div>

                            {/* Materials */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Material/Equipment Costs ($)
                                </label>
                                <input
                                    type="number"
                                    value={materialCost}
                                    onChange={(e) => setMaterialCost(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                                    min="0"
                                />
                            </div>

                            {/* Overhead */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Overhead (Rent, Admin, Software) ($)
                                </label>
                                <input
                                    type="number"
                                    value={overheadCost}
                                    onChange={(e) => setOverheadCost(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                                    min="0"
                                />
                            </div>

                            {/* Marketing */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Marketing Spend ($)
                                </label>
                                <input
                                    type="number"
                                    value={marketingCost}
                                    onChange={(e) => setMarketingCost(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Profit Analysis</h2>

                        <div className="space-y-6">

                            {/* Current Status */}
                            <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                <div className="text-sm text-slate-400 mb-3">Current Performance</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">Net Profit</div>
                                        <div className="text-2xl font-bold text-white">
                                            ${netProfit.toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Margin</div>
                                        <div className={`text-2xl font-bold ${profitMargin > 20 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                            {profitMargin.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* With Automation */}
                            <div className="p-6 bg-black/20 rounded-xl border border-emerald-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                                    WITH AI AUTOMATION
                                </div>
                                <div className="text-sm text-slate-400 mb-3">Projected Performance</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">Net Profit</div>
                                        <div className="text-2xl font-bold text-emerald-400">
                                            ${newNetProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Margin</div>
                                        <div className="text-2xl font-bold text-emerald-400">
                                            {newProfitMargin.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-slate-500">
                                    Assumes 15% revenue boost (missed call capture) + $1,500/mo overhead reduction
                                </div>
                            </div>

                            {/* The Gain */}
                            <div className="p-6 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl border border-emerald-500/30">
                                <div className="text-sm text-slate-400 mb-2">Additional Annual Profit</div>
                                <div className="text-4xl font-bold text-white">
                                    +${annualProfitIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-sm text-emerald-400 mt-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Pure bottom line growth
                                </div>
                            </div>

                            {/* Email Capture */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-sm font-semibold text-white mb-3">Get Margin Improvement Plan</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Download our "5 Ways to Boost Service Margins with AI" guide.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all">
                                        Send Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Increase Margins Without Raising Prices
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Automation cuts specific overhead costs while capturing more value from existing leads. It's the fastest way to improve profitability.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Book Profit Audit <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
