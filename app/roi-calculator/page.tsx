'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Calculator, DollarSign, TrendingUp, BarChart3, Percent, Clock, Phone,
    Building2, Zap, ArrowRight, Calendar, RefreshCw,
} from 'lucide-react';
import SectionHeader from '@/app/components/ui/SectionHeader';
import FeatureCard from '@/app/components/ui/FeatureCard';
import AnimatedCounter from '@/app/components/ui/AnimatedCounter';
import { config } from '@/lib/config';

const businessTypes = [
    { value: 'hvac', label: 'HVAC', avgCalls: 120, avgJobValue: 350, convRate: 30, margin: 45 },
    { value: 'plumbing', label: 'Plumbing', avgCalls: 90, avgJobValue: 400, convRate: 35, margin: 40 },
    { value: 'electrical', label: 'Electrical', avgCalls: 80, avgJobValue: 375, convRate: 32, margin: 42 },
    { value: 'roofing', label: 'Roofing', avgCalls: 50, avgJobValue: 1200, convRate: 25, margin: 38 },
    { value: 'dental', label: 'Dental', avgCalls: 100, avgJobValue: 500, convRate: 40, margin: 50 },
    { value: 'medical', label: 'Medical', avgCalls: 110, avgJobValue: 200, convRate: 45, margin: 35 },
    { value: 'legal', label: 'Legal', avgCalls: 60, avgJobValue: 800, convRate: 28, margin: 55 },
    { value: 'property', label: 'Property Management', avgCalls: 70, avgJobValue: 300, convRate: 30, margin: 40 },
    { value: 'restaurant', label: 'Restaurant', avgCalls: 150, avgJobValue: 75, convRate: 50, margin: 25 },
    { value: 'salon', label: 'Salon / Spa', avgCalls: 80, avgJobValue: 150, convRate: 45, margin: 30 },
    { value: 'auto', label: 'Auto Repair', avgCalls: 60, avgJobValue: 500, convRate: 35, margin: 38 },
    { value: 'home-services', label: 'Home Services (General)', avgCalls: 85, avgJobValue: 350, convRate: 30, margin: 40 },
];

export default function ROICalculator() {
    const [businessType, setBusinessType] = useState('hvac');
    const [monthlyCalls, setMonthlyCalls] = useState(120);
    const [missedPct, setMissedPct] = useState(30);
    const [avgJobValue, setAvgJobValue] = useState(350);
    const [convRate, setConvRate] = useState(30);
    const [margin, setMargin] = useState(45);
    const [hours, setHours] = useState(12);
    const [aiCost, setAiCost] = useState(500);
    const [aiRecovery, setAiRecovery] = useState(70);
    const [showResults, setShowResults] = useState(false);

    const biz = businessTypes.find((b) => b.value === businessType);

    const handleBusinessChange = (value: string) => {
        const b = businessTypes.find((bt) => bt.value === value);
        if (b) {
            setBusinessType(value);
            setMonthlyCalls(b.avgCalls);
            setAvgJobValue(b.avgJobValue);
            setConvRate(b.convRate);
            setMargin(b.margin);
        }
    };

    const results = useMemo(() => {
        const missedCalls = monthlyCalls * (missedPct / 100);
        const leadsLost = missedCalls * (convRate / 100);
        const monthlyRevenueLost = leadsLost * avgJobValue;
        const annualRevenueLost = monthlyRevenueLost * 12;
        const recoveredLeads = leadsLost * (aiRecovery / 100);
        const monthlyRecovered = recoveredLeads * avgJobValue;
        const annualRecovered = monthlyRecovered * 12;
        const profitOnRecovered = annualRecovered * (margin / 100);
        const annualAICost = aiCost * 12;
        const netROI = profitOnRecovered - annualAICost;
        const roiPct = annualAICost > 0 ? ((netROI / annualAICost) * 100) : 0;
        const breakEvenDays = annualAICost > 0 ? Math.ceil((aiCost / (monthlyRecovered * (margin / 100))) * 30) : 0;
        return { missedCalls, leadsLost, monthlyRevenueLost, annualRevenueLost, recoveredLeads, monthlyRecovered, annualRecovered, profitOnRecovered, annualAICost, netROI, roiPct, breakEvenDays };
    }, [monthlyCalls, missedPct, avgJobValue, convRate, margin, aiCost, aiRecovery]);

    const opportunities = [
        { icon: Phone, title: '24/7 Call Answering', description: 'Never miss a call again. AI answers every call instantly, day or night.', accent: 'blue' },
        { icon: Calendar, title: 'Instant Appointment Booking', description: 'Convert callers into booked appointments without back-and-forth.', accent: 'emerald' },
        { icon: Zap, title: 'Lead Qualification', description: 'AI qualifies every lead before routing, saving your team hours.', accent: 'purple' },
    ] as const;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">ROI Calculator</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        How Much Are <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Missed Calls Costing You?
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Use our interactive calculator to see exactly how much revenue you lose from unanswered calls — and what you could recover with Brandvoice AI.
                    </p>
                </div>
            </header>

            <main className="px-6 py-16">
                <div className="max-w-5xl mx-auto space-y-16">
                    <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-wide">
                            1. Select Your Business
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                            {businessTypes.map((b) => (
                                <button
                                    key={b.value}
                                    onClick={() => handleBusinessChange(b.value)}
                                    className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                                        businessType === b.value
                                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {b.label}
                                </button>
                            ))}
                        </div>

                        <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-wide">
                            2. Adjust Your Numbers
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">Monthly Calls</label>
                                        <span className="text-lg font-black text-white">{monthlyCalls.toLocaleString()}</span>
                                    </div>
                                    <input type="range" min={10} max={500} value={monthlyCalls} onChange={(e) => setMonthlyCalls(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>10</span><span>500+</span></div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">Missed Call Rate</label>
                                        <span className="text-lg font-black text-white">{missedPct}%</span>
                                    </div>
                                    <input type="range" min={5} max={70} value={missedPct} onChange={(e) => setMissedPct(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>5%</span><span>70%</span></div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">Average Job Value</label>
                                        <span className="text-lg font-black text-white">${avgJobValue.toLocaleString()}</span>
                                    </div>
                                    <input type="range" min={25} max={2000} step={25} value={avgJobValue} onChange={(e) => setAvgJobValue(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>$25</span><span>$2,000+</span></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">Lead Conversion Rate</label>
                                        <span className="text-lg font-black text-white">{convRate}%</span>
                                    </div>
                                    <input type="range" min={5} max={70} value={convRate} onChange={(e) => setConvRate(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>5%</span><span>70%</span></div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">Profit Margin</label>
                                        <span className="text-lg font-black text-white">{margin}%</span>
                                    </div>
                                    <input type="range" min={10} max={70} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>10%</span><span>70%</span></div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">AI Call Recovery Rate</label>
                                        <span className="text-lg font-black text-white">{aiRecovery}%</span>
                                    </div>
                                    <input type="range" min={30} max={95} value={aiRecovery} onChange={(e) => setAiRecovery(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>30%</span><span>95%</span></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-transparent border border-blue-500/20">
                        <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-wide">
                            3. Your Results
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <DollarSign className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-red-400">${results.monthlyRevenueLost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                                <p className="text-xs text-slate-400 mt-1">Monthly Revenue Lost</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <DollarSign className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-red-400">${results.annualRevenueLost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                                <p className="text-xs text-slate-400 mt-1">Annual Revenue Lost</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 border border-emerald-500/20 text-center">
                                <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-emerald-400">${results.annualRecovered.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                                <p className="text-xs text-slate-400 mt-1">Potential Revenue Recovered</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 border border-blue-500/20 text-center">
                                <Percent className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                <p className="text-3xl font-black text-blue-400">{results.roiPct >= 0 ? '+' : ''}{results.roiPct.toLocaleString('en-US', { maximumFractionDigits: 0 })}%</p>
                                <p className="text-xs text-slate-400 mt-1">Estimated ROI</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-4">Detailed Breakdown</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-slate-400">Missed calls per month</span>
                                    <span className="text-sm font-bold text-white">{Math.round(results.missedCalls)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-slate-400">Lost leads per month</span>
                                    <span className="text-sm font-bold text-red-400">{Math.round(results.leadsLost)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-slate-400">Monthly AI investment</span>
                                    <span className="text-sm font-bold text-white">${aiCost}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-slate-400">Recovered leads per month</span>
                                    <span className="text-sm font-bold text-emerald-400">{Math.round(results.recoveredLeads)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-slate-400">Break-even period</span>
                                    <span className="text-sm font-bold text-blue-400">{results.breakEvenDays} days</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href={config.calendlyUrl}
                                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/25"
                            >
                                Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
                            </Link>
                            <p className="text-xs text-slate-500 mt-3">Get a personalized ROI analysis and demo tailored to your business.</p>
                        </div>
                    </section>

                    <section>
                        <SectionHeader label="Opportunities" title="What You Can Recover" subtitle="Beyond the numbers — here is how an AI receptionist transforms your business." />
                        <div className="grid md:grid-cols-3 gap-6">
                            {opportunities.map((opp) => (
                                <FeatureCard key={opp.title} icon={opp.icon} title={opp.title} description={opp.description} accent={opp.accent} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">How accurate is this calculator?</h3><p className="text-sm text-slate-400 leading-relaxed">This calculator uses industry averages and your inputs to provide a strong estimate. For a precise ROI analysis tailored to your exact business metrics, book a strategy call with our team.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">What if my numbers are different from the defaults?</h3><p className="text-sm text-slate-400 leading-relaxed">All inputs are adjustable. Simply change the sliders to match your actual business metrics. The results update in real time.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">How quickly can I see results with Brandverse?</h3><p className="text-sm text-slate-400 leading-relaxed">Most businesses see ROI within the first 30 days. Our typical onboarding takes 1–2 weeks, and call recovery begins immediately after launch.</p></div>
                    </section>

                    <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Ready to Stop Losing Revenue?</h3>
                        <p className="text-slate-300 max-w-lg mx-auto font-medium">
                            Every day you wait is more revenue lost to missed calls. Let us show you how Brandverse can help.
                        </p>
                        <Link href={config.calendlyUrl} className="inline-flex items-center gap-2 bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/25">
                            Book a Free Strategy Call <Calendar className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
