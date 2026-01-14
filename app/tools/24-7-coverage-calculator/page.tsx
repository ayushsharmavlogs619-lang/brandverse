'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Moon, Sun, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CoverageCalculator() {
    const [hourlyRate, setHourlyRate] = useState(20);
    const [shiftsNeeded, setShiftsNeeded] = useState(3); // 3 shifts for 24 hours
    const [employeesPerShift, setEmployeesPerShift] = useState(1);
    const [includeWeekends, setIncludeWeekends] = useState(true);
    const [email, setEmail] = useState('');

    // Calculations
    const hoursPerDay = 24;
    const daysPerWeek = includeWeekends ? 7 : 5;
    const totalHoursPerWeek = hoursPerDay * daysPerWeek;

    // Human Cost
    const weeklyBasePay = totalHoursPerWeek * hourlyRate * employeesPerShift;
    const benefitsLoad = 0.25; // 25% for taxes/benefits
    const weeklyTotalPay = weeklyBasePay * (1 + benefitsLoad);

    // Overtime/Weekend differential assumption (simplified)
    const shiftDiff = 1.1; // 10% premium for nights/weekends blended
    const weeklyTotalWithDiff = weeklyTotalPay * shiftDiff;

    const monthlyHumanCost = weeklyTotalWithDiff * 4.33;
    const annualHumanCost = monthlyHumanCost * 12;

    // AI Cost
    const aiMonthlyCost = 497;
    const aiAnnualCost = aiMonthlyCost * 12;

    const annualSavings = annualHumanCost - aiAnnualCost;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full mb-6">
                        <Moon className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium text-indigo-400">Free Staffing Analysis</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        24/7 Coverage Cost Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Calculate the true cost of staffing your business 24/7 with humans vs. AI.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Staffing Requirements</h2>

                        <div className="space-y-6">
                            {/* Hourly Rate */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average Hourly Wage ($)
                                </label>
                                <input
                                    type="number"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                />
                            </div>

                            {/* Employees per shift */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Employees Needed Per Shift
                                </label>
                                <input
                                    type="number"
                                    value={employeesPerShift}
                                    onChange={(e) => setEmployeesPerShift(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="1"
                                />
                            </div>

                            {/* Weekend Coverage */}
                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeWeekends}
                                        onChange={(e) => setIncludeWeekends(e.target.checked)}
                                        className="w-5 h-5 rounded bg-white/5 border-white/10 text-indigo-600"
                                    />
                                    <span className="text-white">Include Weekend Coverage (Sat/Sun)</span>
                                </label>
                            </div>

                            {/* Info Box */}
                            <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-indigo-400 mt-0.5" />
                                    <div className="text-xs text-slate-400">
                                        <div className="font-semibold text-white mb-1">Coverage Math</div>
                                        To cover 24 hours, you typically need 3 shifts (8 hours each). To cover 7 days (168 hours), you need ~4.2 Full Time Equivalent (FTE) employees.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Cost Breakdown</h2>

                        <div className="space-y-6">

                            {/* Human Cost */}
                            <div className="p-6 bg-black/20 rounded-xl border border-red-500/20">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm text-slate-400">Human Staffing (24/{daysPerWeek})</div>
                                    <div className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">High Cost</div>
                                </div>
                                <div className="text-3xl font-bold text-red-400 mb-1">
                                    ${monthlyHumanCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                                </div>
                                <div className="text-sm text-slate-500">
                                    ${annualHumanCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} per year including benefits/taxes
                                </div>
                            </div>

                            {/* AI Cost */}
                            <div className="p-6 bg-black/20 rounded-xl border border-green-500/20">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm text-slate-400">AI Coverage (24/7)</div>
                                    <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">Best Value</div>
                                </div>
                                <div className="text-3xl font-bold text-green-400 mb-1">
                                    ${aiMonthlyCost}/mo
                                </div>
                                <div className="text-sm text-slate-500">
                                    ${aiAnnualCost.toLocaleString()} per year flat rate
                                </div>
                            </div>

                            {/* Savings */}
                            <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                                <div className="text-sm text-slate-400 mb-2">Total Annual Savings</div>
                                <div className="text-4xl font-bold text-white">
                                    ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-sm text-emerald-400 mt-2 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    98% cost reduction
                                </div>
                            </div>

                            {/* Email Capture */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-sm font-semibold text-white mb-3">Get the Staffing Plan</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Download our guide: "How to Transition to Hybrid AI Staffing"
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all">
                                        Send Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-indigo-600/10 to-blue-600/10 border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Get 24/7 Coverage without the Payroll
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Brandverse AI never sleeps, never takes breaks, and costs less than your office coffee budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Book Free Demo <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            See Pricing
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
