'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarX, TrendingDown, AlertCircle, ArrowRight } from 'lucide-react';

export default function NoShowCalculator() {
    const [appointmentsPerMonth, setAppointmentsPerMonth] = useState(80);
    const [noShowRate, setNoShowRate] = useState(15); // %
    const [avgAppointmentValue, setAvgAppointmentValue] = useState(200);
    const [rebookRate, setRebookRate] = useState(30); // % who reschedule
    const [email, setEmail] = useState('');

    // Calculations
    const noShowsPerMonth = appointmentsPerMonth * (noShowRate / 100);
    const rebookedAppointments = noShowsPerMonth * (rebookRate / 100);
    const permanentLosses = noShowsPerMonth - rebookedAppointments;

    const monthlyLostRevenue = permanentLosses * avgAppointmentValue;
    const annualLostRevenue = monthlyLostRevenue * 12;

    // With AI Automation scenario
    // Assumption: Automated reminders reduce no-shows by 60-70%
    const reducedNoShowRate = noShowRate * 0.35; // 65% reduction
    const newNoShows = appointmentsPerMonth * (reducedNoShowRate / 100);
    const recoveredRevenue = (noShowsPerMonth - newNoShows) * avgAppointmentValue * (1 - rebookRate / 100);
    const annualRecoveredRevenue = recoveredRevenue * 12;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full mb-6">
                        <CalendarX className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">Free Revenue Recovery Tool</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Appointment No-Show Cost Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Every no-show is money left on the table. Calculate the true cost and see how automated reminders can recover tens of thousands in lost revenue.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Your Appointment Data</h2>

                        <div className="space-y-6">
                            {/* Appointments per month */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Scheduled Appointments Per Month
                                </label>
                                <input
                                    type="number"
                                    value={appointmentsPerMonth}
                                    onChange={(e) => setAppointmentsPerMonth(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                                    min="0"
                                />
                            </div>

                            {/* No-show rate */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    No-Show Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={noShowRate}
                                    onChange={(e) => setNoShowRate(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Industry average: 12-25% for service businesses
                                </p>
                            </div>

                            {/* Avg appointment value */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average Appointment Value ($)
                                </label>
                                <input
                                    type="number"
                                    value={avgAppointmentValue}
                                    onChange={(e) => setAvgAppointmentValue(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                                    min="0"
                                />
                            </div>

                            {/* Rebook rate */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    % Who Reschedule After No-Show
                                </label>
                                <input
                                    type="number"
                                    value={rebookRate}
                                    onChange={(e) => setRebookRate(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                                    min="0"
                                    max="100"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    How many no-shows do you successfully get back on the schedule?
                                </p>
                            </div>

                            {/* Info Box */}
                            <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-purple-400 mt-0.5" />
                                    <div className="text-xs text-slate-400">
                                        <div className="font-semibold text-white mb-1">Did You Know?</div>
                                        Automated SMS/email reminders reduce no-shows by 60-70% on average. AI can send personalized reminders, confirm appointments, and even handle rescheduling automatically.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Lost Revenue Analysis</h2>

                        <div className="space-y-6">

                            {/* Current Status */}
                            <div className="p-6 bg-black/20 rounded-xl border border-red-500/20">
                                <div className="text-sm text-slate-400 mb-3">Current No-Show Impact</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">No-Shows/Month</div>
                                        <div className="text-2xl font-bold text-red-400">
                                            {noShowsPerMonth.toFixed(1)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Permanent Losses</div>
                                        <div className="text-2xl font-bold text-red-400">
                                            {permanentLosses.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Revenue Loss */}
                            <div className="p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
                                <div className="text-sm text-slate-400 mb-2">Lost Revenue</div>
                                <div className="text-4xl font-bold text-white mb-1">
                                    ${monthlyLostRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                                </div>
                                <div className="text-sm text-red-400">
                                    ${annualLostRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} per year
                                </div>
                            </div>

                            {/* With Automation */}
                            <div className="p-6 bg-black/20 rounded-xl border border-green-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                                    WITH AI REMINDERS
                                </div>
                                <div className="text-sm text-slate-400 mb-3">Potential Recovery</div>
                                <div className="text-3xl font-bold text-green-400">
                                    ${recoveredRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                                </div>
                                <div className="text-sm text-green-500 mt-2">
                                    ${annualRecoveredRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} annually
                                </div>
                                <div className="mt-3 text-xs text-slate-500">
                                    By reducing no-show rate to {reducedNoShowRate.toFixed(1)}% with automated reminders
                                </div>
                            </div>

                            {/* Email Capture */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-sm font-semibold text-white mb-3">Get No-Show Prevention Guide</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Download "7 Proven Tactics to Reduce Appointment No-Shows by 70%"
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                                    />
                                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all">
                                        Send Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breakdown Chart */}
                <div className="mb-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="text-2xl font-semibold text-white mb-8 text-center">Where No-Shows Come From</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { reason: 'Forgot Appointment', percent: 45, solution: 'Automated SMS/email reminders 24hrs before' },
                            { reason: 'Schedule Conflict', percent: 30, solution: 'AI-powered easy rescheduling via text' },
                            { reason: 'Lost Interest / No Longer Need', percent: 25, solution: 'Qualification calls + value reminders' }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-3xl font-bold text-purple-400 mb-2">{item.percent}%</div>
                                <div className="text-white font-medium mb-3">{item.reason}</div>
                                <div className="text-sm text-slate-400">{item.solution}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Stop Leaving Money on the Table
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Brandverse AI sends automated reminders, handles rescheduling, and confirms appointments—so you never lose revenue to preventable no-shows again.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-lg transition-all"
                        >
                            Eliminate No-Shows <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
