'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, TrendingDown, ArrowRight } from 'lucide-react';

export default function MissedCallCalculator() {
    const [industry, setIndustry] = useState('hvac');
    const [avgJobValue, setAvgJobValue] = useState(500);
    const [callsPerWeek, setCallsPerWeek] = useState(20);
    const [missedPercent, setMissedPercent] = useState(30);
    const [email, setEmail] = useState('');
    const [showResults, setShowResults] = useState(false);

    const industries = [
        { value: 'hvac', label: 'HVAC', avgJob: 500 },
        { value: 'plumbing', label: 'Plumbing', avgJob: 450 },
        { value: 'electrical', label: 'Electrical', avgJob: 400 },
        { value: 'dental', label: 'Dental Practice', avgJob: 350 },
        { value: 'legal', label: 'Legal Services', avgJob: 1500 },
        { value: 'roofing', label: 'Roofing', avgJob: 8000 },
        { value: 'landscaping', label: 'Landscaping', avgJob: 300 },
        { value: 'realestate', label: 'Real Estate', avgJob: 7000 },
    ];

    const handleIndustryChange = (value: string) => {
        setIndustry(value);
        const selected = industries.find(i => i.value === value);
        if (selected) setAvgJobValue(selected.avgJob);
    };

    const calculate = () => {
        setShowResults(true);
    };

    const missedCallsPerWeek = (callsPerWeek * missedPercent) / 100;
    const missedCallsPerMonth = missedCallsPerWeek * 4;
    const missedCallsPerYear = missedCallsPerWeek * 52;

    const conversionRate = 0.3; // 30% of calls that answer convert
    const lostCustomersPerMonth = missedCallsPerMonth * conversionRate;
    const lostCustomersPerYear = missedCallsPerYear * conversionRate;

    const lostRevenuePerMonth = lostCustomersPerMonth * avgJobValue;
    const lostRevenuePerYear = lostCustomersPerYear * avgJobValue;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-full mb-6">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400">Free Revenue Analysis Tool</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Missed Call Revenue Calculator
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Calculate exactly how much money you're losing every month from missed calls. The results might shock you.
                    </p>
                </div>

                {/* Calculator */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Your Business Details</h2>

                        <div className="space-y-6">
                            {/* Industry */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Industry
                                </label>
                                <select
                                    value={industry}
                                    onChange={(e) => handleIndustryChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                >
                                    {industries.map(ind => (
                                        <option key={ind.value} value={ind.value} className="bg-[#0a0a0f]">
                                            {ind.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Avg Job Value */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Average Job Value ($)
                                </label>
                                <input
                                    type="number"
                                    value={avgJobValue}
                                    onChange={(e) => setAvgJobValue(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                    step="50"
                                />
                            </div>

                            {/* Calls per week */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Incoming Calls Per Week
                                </label>
                                <input
                                    type="number"
                                    value={callsPerWeek}
                                    onChange={(e) => setCallsPerWeek(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                />
                            </div>

                            {/* Missed % */}
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    % of Calls That Go to Voicemail
                                </label>
                                <input
                                    type="number"
                                    value={missedPercent}
                                    onChange={(e) => setMissedPercent(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    min="0"
                                    max="100"
                                />
                                <div className="mt-2 text-xs text-slate-500">
                                    Industry average: 20-40%
                                </div>
                            </div>

                            <button
                                onClick={calculate}
                                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all"
                            >
                                Calculate My Lost Revenue
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-red-600/10 to-orange-600/10 border border-red-500/20 rounded-2xl p-8">
                        {!showResults ? (
                            <div className="flex items-center justify-center h-full text-center">
                                <div>
                                    <Phone className="w-16 h-16 text-red-400 mx-auto mb-4" />
                                    <p className="text-slate-400">Fill out the form and click calculate to see your results</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-semibold text-white mb-6">Your Lost Revenue</h2>

                                <div className="space-y-6">
                                    {/* Per Month */}
                                    <div className="p-6 bg-black/20 rounded-xl border border-red-500/20">
                                        <div className="text-sm text-slate-400 mb-2">Lost Revenue Per Month</div>
                                        <div className="text-4xl font-bold text-red-400">
                                            ${lostRevenuePerMonth.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-500 mt-2">
                                            ~{lostCustomersPerMonth.toFixed(1)} potential customers
                                        </div>
                                    </div>

                                    {/* Per Year */}
                                    <div className="p-6 bg-black/20 rounded-xl border border-red-500/20">
                                        <div className="text-sm text-slate-400 mb-2">Lost Revenue Per Year</div>
                                        <div className="text-4xl font-bold text-red-400">
                                            ${lostRevenuePerYear.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-500 mt-2">
                                            ~{lostCustomersPerYear.toFixed(0)} potential customers
                                        </div>
                                    </div>

                                    {/* Missed Calls */}
                                    <div className="p-6 bg-black/20 rounded-xl border border-yellow-500/20">
                                        <div className="text-sm text-slate-400 mb-2">Missed Calls</div>
                                        <div className="text-2xl font-bold text-yellow-400">
                                            {missedCallsPerMonth.toFixed(0)} per month
                                        </div>
                                        <div className="text-sm text-slate-500 mt-2">
                                            {missedCallsPerYear.toFixed(0)} per year
                                        </div>
                                    </div>
                                </div>

                                {/* Email Capture */}
                                <div className="mt-8 p-6 bg-blue-600/10 border border-blue-500/20 rounded-xl">
                                    <h3 className="text-lg font-semibold text-white mb-3">Want the Full Report?</h3>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Get a detailed PDF breakdown with industry benchmarks and recovery strategies.
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                        />
                                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold whitespace-nowrap transition-all">
                                            Email Me
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Stop Losing Money?
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Brandverse AI Voice Agents answer every call, 24/7/365. Never miss another customer again.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer"
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

                {/* How It Works */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">How AI Voice Agents Work</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-blue-400">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Customer Calls</h3>
                            <p className="text-slate-400">
                                Your AI agent answers instantly, 24/7. No hold music, no voicemail.
                            </p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-blue-400">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">AI Qualifies Lead</h3>
                            <p className="text-slate-400">
                                Asks the right questions, captures details, books appointments.
                            </p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-blue-400">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">You Get the Job</h3>
                            <p className="text-slate-400">
                                Lead sent to your CRM. You follow up and close the deal.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                Is this calculator accurate?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                The calculator uses industry-standard conversion rates (30% of answered calls convert) and is based on data from thousands of service businesses. Your actual results may vary.
                            </p>
                        </details>
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                How much does an AI voice agent cost?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                Brandverse AI Voice Agents start at $497/month for unlimited calls. Compare that to hiring a receptionist at $3,000+/month or losing $5,000+/month to missed calls.
                            </p>
                        </details>
                        <details className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <summary className="font-semibold text-white cursor-pointer">
                                Will customers know it's AI?
                            </summary>
                            <p className="mt-3 text-slate-400">
                                We're transparent - the AI introduces itself. But the voice quality is so good that most customers don't care. They just want their problem solved fast.
                            </p>
                        </details>
                    </div>
                </div>

            </main>
        </div>
    );
}
