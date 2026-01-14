'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DollarSign, Users, TrendingUp, ArrowRight } from 'lucide-react';

export default function AIReceptionistROICalculator() {
    const [businessSize, setBusinessSize] = useState('small');
    const [callsPerDay, setCallsPerDay] = useState(30);
    const [afterHours, setAfterHours] = useState(true);
    const [currentSolution, setCurrentSolution] = useState('none');
    const [email, setEmail] = useState('');

    const sizes = [
        { value: 'solo', label: 'Solo/1-2 people', calls: 15 },
        { value: 'small', label: 'Small (3-10 people)', calls: 30 },
        { value: 'medium', label: 'Medium (11-25 people)', calls: 60 },
        { value: 'large', label: 'Large (25+ people)', calls: 100 },
    ];

    const handleSizeChange = (value: string) => {
        setBusinessSize(value);
        const selected = sizes.find(s => s.value === value);
        if (selected) setCallsPerDay(selected.calls);
    };

    // Human receptionist costs
    const humanSalaryMonthly = 3500;
    const humanBenefits = humanSalaryMonthly * 0.25; // 25% for benefits/taxes
    const humanTotal = humanSalaryMonthly + humanBenefits;
    const humanHoursPerWeek = 40;
    const totalHoursPerWeek = 168;
    const humanCoveragePercent = (humanHoursPerWeek / totalHoursPerWeek) * 100;

    // AI costs
    const aiCostMonthly = 497;
    const aiCoveragePercent = 100;

    // Savings
    const monthlySavings = humanTotal - aiCostMonthly;
    const annualSavings = monthlySavings * 12;
    const fiveYearSavings = annualSavings * 5;

    // Missed calls calculation
    const callsPerMonth = callsPerDay * 30;
    const afterHoursPercent = afterHours ? 0.35 : 0; // 35% of calls outside business hours
    const missedCallsHuman = callsPerMonth * afterHoursPercent;
    const missedCallsAI = 0;
    const additionalCallsCaptured = missedCallsHuman;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 border border-green-500/20 rounded-full mb-6">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Free ROI Analysis Tool</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        AI Receptionist ROI Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Compare the true cost of human receptionists vs AI. The numbers might surprise you.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Your Business</h2>

                        <div className="space-y-6">
                            {/* Business Size */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Business Size
                                </label>
                                <select
                                    value={businessSize}
                                    onChange={(e) => handleSizeChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                >
                                    {sizes.map(size => (
                                        <option key={size.value} value={size.value} className="bg-[#0a0a0f]">
                                            {size.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Calls per day */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Incoming Calls Per Day
                                </label>
                                <input
                                    type="number"
                                    value={callsPerDay}
                                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                />
                            </div>

                            {/* After hours */}
                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={afterHours}
                                        onChange={(e) => setAfterHours(e.target.checked)}
                                        className="w-5 h-5 rounded bg-white/5 border-white/10 text-blue-600"
                                    />
                                    <span className="text-white">Need after-hours coverage?</span>
                                </label>
                                <p className="text-xs text-slate-500 mt-2 ml-8">
                                    Includes evenings, weekends, holidays
                                </p>
                            </div>

                            {/* Current solution */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Current Solution
                                </label>
                                <select
                                    value={currentSolution}
                                    onChange={(e) => setCurrentSolution(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="none" className="bg-[#0a0a0f]">Voicemail only</option>
                                    <option value="receptionist" className="bg-[#0a0a0f]">Human receptionist</option>
                                    <option value="service" className="bg-[#0a0a0f]">Answering service</option>
                                    <option value="owner" className="bg-[#0a0a0f]">Owner answers</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Cost Comparison</h2>

                        <div className="space-y-6">
                            {/* Human Receptionist */}
                            <div className="p-6 bg-black/20 rounded-xl border border-red-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <Users className="w-5 h-5 text-red-400" />
                                    <div className="text-sm text-slate-400">Human Receptionist</div>
                                </div>
                                <div className="text-3xl font-bold text-red-400 mb-2">
                                    ${humanTotal.toLocaleString()}/mo
                                </div>
                                <div className="space-y-1 text-sm text-slate-500">
                                    <div>Salary: ${humanSalaryMonthly.toLocaleString()}</div>
                                    <div>Benefits/Taxes: ${humanBenefits.toLocaleString()}</div>
                                    <div>Coverage: {humanCoveragePercent.toFixed(0)}% (40 hrs/week)</div>
                                    <div className="text-red-400">Missed after-hours: {missedCallsHuman.toFixed(0)}/month</div>
                                </div>
                            </div>

                            {/* AI Agent */}
                            <div className="p-6 bg-black/20 rounded-xl border border-green-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                    <div className="text-sm text-slate-400">Brandverse AI Agent</div>
                                </div>
                                <div className="text-3xl font-bold text-green-400 mb-2">
                                    ${aiCostMonthly}/mo
                                </div>
                                <div className="space-y-1 text-sm text-slate-500">
                                    <div>Flat rate, unlimited calls</div>
                                    <div>No benefits, no taxes</div>
                                    <div>Coverage: {aiCoveragePercent}% (24/7/365)</div>
                                    <div className="text-green-400">Missed calls: 0</div>
                                </div>
                            </div>

                            {/* Savings */}
                            <div className="p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl border border-green-500/30">
                                <div className="text-sm text-slate-400 mb-2">Your Savings</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">Per Month</div>
                                        <div className="text-xl font-bold text-green-400">
                                            ${monthlySavings.toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Per Year</div>
                                        <div className="text-xl font-bold text-green-400">
                                            ${annualSavings.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <div className="text-xs text-slate-500">5-Year Savings</div>
                                    <div className="text-2xl font-bold text-green-400">
                                        ${fiveYearSavings.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Additional value */}
                            {additionalCallsCaptured > 0 && (
                                <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl">
                                    <div className="text-sm font-semibold text-white mb-1">Bonus: Capture More Leads</div>
                                    <div className="text-xs text-slate-400">
                                        AI will answer {additionalCallsCaptured.toFixed(0)} additional calls/month that would go to voicemail after hours
                                    </div>
                                </div>
                            )}

                            {/* Email Capture */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-sm font-semibold text-white mb-3">Get Full Cost Analysis</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Detailed PDF report with industry comparisons and implementation guide.
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
                                        Email Me
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl p-12 text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Save ${monthlySavings.toLocaleString()}/Month?
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        See Brandverse AI in action. Book a demo and we'll show you exactly how it works for your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Book Free Demo <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-4 text-white">Feature</th>
                                    <th className="p-4 text-white text-center">Human</th>
                                    <th className="p-4 text-white text-center">AI Agent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr>
                                    <td className="p-4">Monthly Cost</td>
                                    <td className="p-4 text-center text-red-400">${humanTotal.toLocaleString()}</td>
                                    <td className="p-4 text-center text-green-400">${aiCostMonthly}</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Availability</td>
                                    <td className="p-4 text-center">40 hrs/week</td>
                                    <td className="p-4 text-center text-green-400">24/7/365</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Simultaneous Calls</td>
                                    <td className="p-4 text-center">1</td>
                                    <td className="p-4 text-center text-green-400">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Sick Days / Vacations</td>
                                    <td className="p-4 text-center text-red-400">Yes (need backup)</td>
                                    <td className="p-4 text-center text-green-400">Never</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Training Time</td>
                                    <td className="p-4 text-center">2-4 weeks</td>
                                    <td className="p-4 text-center text-green-400">1 week</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Turnover Risk</td>
                                    <td className="p-4 text-center text-red-400">High (restart training)</td>
                                    <td className="p-4 text-center text-green-400">None</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Call Quality</td>
                                    <td className="p-4 text-center">Varies by mood</td>
                                    <td className="p-4 text-center text-green-400">Consistent</td>
                                </tr>
                                <tr>
                                    <td className="p-4">CRM Integration</td>
                                    <td className="p-4 text-center">Manual entry</td>
                                    <td className="p-4 text-center text-green-400">Automatic</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Common Questions</h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                Will customers know it's AI?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                The voice quality is virtually indist inguishable from human. We're transparent about it being AI, but most customers don't care—they just want their question answered fast.
                            </p>
                        </details>
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                What if I already have a receptionist?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                AI handles after-hours, overflow, and lets your receptionist focus on in-person tasks. Many clients use AI + human hybrid for best results.
                            </p>
                        </details>
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                How fast can I get started?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                Typically 7-10 days from booking to live. We handle all setup, training, and integration with your existing systems.
                            </p>
                        </details>
                    </div>
                </div>

            </main>
        </div>
    );
}
