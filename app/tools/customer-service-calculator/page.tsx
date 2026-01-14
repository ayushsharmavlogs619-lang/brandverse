'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DollarSign, Users, Calculator, ArrowRight, XCircle } from 'lucide-react';

export default function CSCostCalculator() {
    const [numAgents, setNumAgents] = useState(3);
    const [avgSalary, setAvgSalary] = useState(45000);
    const [turnoverRate, setTurnoverRate] = useState(30); // %
    const [trainingCost, setTrainingCost] = useState(5000); // per new hire
    const [techCost, setTechCost] = useState(250); // per agent/month (software/hardware)
    const [email, setEmail] = useState('');

    // Calculations
    const annualSalaryTotal = numAgents * avgSalary;
    const benefitsTotal = annualSalaryTotal * 0.25; // 25% burden
    const annualTechCost = numAgents * techCost * 12;

    // Turnover cost calculation
    // How many agents leave per year?
    const agentsLeaving = numAgents * (turnoverRate / 100);
    const annualTurnoverCost = agentsLeaving * trainingCost;

    const totalAnnualCost = annualSalaryTotal + benefitsTotal + annualTechCost + annualTurnoverCost;
    const costPerAgent = totalAnnualCost / numAgents;
    const costPerMonth = totalAnnualCost / 12;

    // AI Comparison
    // AI replaces Tier 1 support (typically 60-80% of volume)
    // Assumption: AI allows reduction of headcount or handling 3x volume with same headcount
    const aiMonthlyCost = 497;
    const aiAnnualCost = aiMonthlyCost * 12;

    // Scenario: Replace 1 agent with AI
    const savings = costPerAgent - aiAnnualCost;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/10 border border-pink-500/20 rounded-full mb-6">
                        <Calculator className="w-4 h-4 text-pink-400" />
                        <span className="text-sm font-medium text-pink-400">Total Cost of Ownership</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Customer Service Cost Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Calculate the hidden costs of your support team (turnover, training, tech) and compare with AI efficiency.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Team Metrics</h2>

                        <div className="space-y-6">
                            {/* Headcount */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Number of Support Agents
                                </label>
                                <input
                                    type="number"
                                    value={numAgents}
                                    onChange={(e) => setNumAgents(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                                    min="1"
                                />
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average Annual Salary ($)
                                </label>
                                <input
                                    type="number"
                                    value={avgSalary}
                                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                                    min="0"
                                />
                            </div>

                            {/* Turnover */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Annual Turnover Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={turnoverRate}
                                    onChange={(e) => setTurnoverRate(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                                    min="0"
                                    max="100"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Industry average for support centers is 30-45%
                                </p>
                            </div>

                            {/* Training Cost */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Cost to Hire & Train New Agent ($)
                                </label>
                                <input
                                    type="number"
                                    value={trainingCost}
                                    onChange={(e) => setTrainingCost(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                                    min="0"
                                />
                            </div>

                            {/* Tech Cost */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Tech/Software Cost Per Agent/Month ($)
                                </label>
                                <input
                                    type="number"
                                    value={techCost}
                                    onChange={(e) => setTechCost(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-pink-600/10 to-rose-600/10 border border-pink-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Total Cost Analysis</h2>

                        <div className="space-y-6">

                            {/* Annual Total */}
                            <div className="p-6 bg-black/20 rounded-xl border border-pink-500/20">
                                <div className="text-sm text-slate-400 mb-2">Total Annual Cost of Support</div>
                                <div className="text-4xl font-bold text-white mb-1">
                                    ${totalAnnualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-sm text-pink-400">
                                    ${costPerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })} per month burn rate
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl">
                                    <div className="text-xs text-slate-500 mb-1">True Cost Per Agent</div>
                                    <div className="text-xl font-bold text-white">
                                        ${costPerAgent.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl">
                                    <div className="text-xs text-slate-500 mb-1">Hidden Turnover Cost</div>
                                    <div className="text-xl font-bold text-red-400">
                                        ${annualTurnoverCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                            </div>

                            {/* Automation Opportunity */}
                            <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 bg-green-500 rounded-md">
                                        <DollarSign className="w-4 h-4 text-black" />
                                    </div>
                                    <span className="text-sm font-semibold text-white">Automation Opportunity</span>
                                </div>
                                <p className="text-xs text-slate-400 mb-3">
                                    A Brandverse AI agent works for $5,964/year. Replacing just ONE agent saves you:
                                </p>
                                <div className="text-3xl font-bold text-green-400">
                                    ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
                                </div>
                            </div>

                            {/* Email Capture */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-sm font-semibold text-white mb-3">Reduce Support Costs by 40%</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Download the "Support Automation Cost-Benefit Analysis" whitepaper.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-pink-500"
                                    />
                                    <button className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all">
                                        Send Analysis
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-pink-600/10 to-rose-600/10 border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Stop Paying for Turnover
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        AI agents never quit, never need retraining, and cost 10x less than a human agent. Scale your support without scaling headcount.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Book Strategy Call <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
