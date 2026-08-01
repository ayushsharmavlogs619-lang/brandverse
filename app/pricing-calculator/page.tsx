'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, Phone, MapPin, Check, X, ArrowRight, Calendar, DollarSign, TrendingUp, Zap } from 'lucide-react';
import SectionHeader from '@/app/components/ui/SectionHeader';
import PricingCard from '@/app/components/ui/PricingCard';
import { config } from '@/lib/config';

const features = [
    { id: 'appointment', label: 'Appointment Booking', basePrice: 100 },
    { id: 'crm', label: 'CRM Integration', basePrice: 150 },
    { id: 'voice', label: 'Voice AI', basePrice: 200 },
    { id: 'sms', label: 'SMS Follow-ups', basePrice: 75 },
    { id: 'afterhours', label: 'After-Hours Coverage', basePrice: 125 },
] as const;

const plans = [
    { name: 'Starter', price: 497, description: 'For small businesses getting started with AI', maxCalls: 500, maxLocations: 1, features: ['Appointment Booking', 'Voice AI', 'Basic Analytics'] },
    { name: 'Growth', price: 997, description: 'For growing businesses with higher call volume', maxCalls: 2000, maxLocations: 3, features: ['Everything in Starter', 'CRM Integration', 'SMS Follow-ups', 'After-Hours Coverage', 'Advanced Analytics'] },
    { name: 'Enterprise', price: 1497, description: 'For multi-location businesses with complex needs', maxCalls: 10000, maxLocations: 10, features: ['Everything in Growth', 'Dedicated Account Manager', 'Custom Scripts', 'API Access', 'White-Label Option', 'Priority Support'] },
];

export default function PricingCalculator() {
    const [businessSize, setBusinessSize] = useState<'small' | 'medium' | 'large'>('small');
    const [monthlyCalls, setMonthlyCalls] = useState(300);
    const [locations, setLocations] = useState(1);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['appointment', 'voice']);

    const toggleFeature = (id: string) => {
        setSelectedFeatures((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
    };

    const results = useMemo(() => {
        const featureCost = selectedFeatures.reduce((sum, id) => {
            const feat = features.find((f) => f.id === id);
            return sum + (feat?.basePrice || 0);
        }, 0);
        const locationMultiplier = 1 + (locations - 1) * 0.3;
        const callMultiplier = businessSize === 'small' ? 1 : businessSize === 'medium' ? 1.5 : 2.5;
        const basePrice = businessSize === 'small' ? 497 : businessSize === 'medium' ? 997 : 1497;
        const estimatedMonthly = Math.round((basePrice + featureCost) * locationMultiplier * callMultiplier);
        const humanReplacement = businessSize === 'small' ? 3500 : businessSize === 'medium' ? 7000 : 14000;
        const monthlySavings = humanReplacement - estimatedMonthly;
        const annualSavings = monthlySavings * 12;
        const roi = ((annualSavings / (estimatedMonthly * 12)) * 100);

        let recommendedPlan = plans[0];
        let planIndex = 0;
        if (monthlyCalls > 500 || locations > 1 || selectedFeatures.length >= 4) {
            recommendedPlan = plans[1];
            planIndex = 1;
        }
        if (monthlyCalls > 2000 || locations > 3 || selectedFeatures.length >= 5) {
            recommendedPlan = plans[2];
            planIndex = 2;
        }

        return { featureCost, locationMultiplier, callMultiplier, estimatedMonthly, humanReplacement, monthlySavings, annualSavings, roi, recommendedPlan, planIndex };
    }, [businessSize, monthlyCalls, locations, selectedFeatures]);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Pricing Calculator</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Perfect Plan</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Customize your needs and get an instant price estimate. Compare against what you would pay for a human receptionist.
                    </p>
                </div>
            </header>

            <main className="px-6 py-16">
                <div className="max-w-5xl mx-auto space-y-16">
                    <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-wide">Configure Your Plan</h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-semibold text-slate-300 mb-3 block">Business Size</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['small', 'medium', 'large'] as const).map((size) => (
                                            <button key={size} onClick={() => setBusinessSize(size)}
                                                className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                                                    businessSize === size
                                                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                                }`}>
                                                {size === 'small' ? '1–5 staff' : size === 'medium' ? '5–20 staff' : '20+ staff'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">Monthly Call Volume</label>
                                        <span className="text-lg font-black text-white">{monthlyCalls.toLocaleString()}</span>
                                    </div>
                                    <input type="range" min={50} max={10000} step={50} value={monthlyCalls} onChange={(e) => setMonthlyCalls(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>50</span><span>10,000+</span></div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-300">Number of Locations</label>
                                        <span className="text-lg font-black text-white">{locations}</span>
                                    </div>
                                    <input type="range" min={1} max={20} value={locations} onChange={(e) => setLocations(Number(e.target.value))} className="w-full accent-blue-500" />
                                    <div className="flex justify-between text-xs text-slate-600 mt-1"><span>1</span><span>20+</span></div>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-300 mb-3 block">Required Features</label>
                                <div className="space-y-2">
                                    {features.map((f) => (
                                        <button key={f.id} onClick={() => toggleFeature(f.id)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm border transition-all ${
                                                selectedFeatures.includes(f.id)
                                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                            }`}>
                                            <span>{f.label}</span>
                                            <span className="text-xs text-slate-500">+${f.basePrice}/mo</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20">
                            <h3 className="text-lg font-bold text-white mb-4">Estimated Monthly Cost</h3>
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-black text-blue-400">${results.estimatedMonthly.toLocaleString()}</p>
                                    <p className="text-xs text-slate-400 mt-1">Brandverse AI</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-black text-white">${results.humanReplacement.toLocaleString()}</p>
                                    <p className="text-xs text-slate-400 mt-1">Human Receptionist</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-black text-emerald-400">${results.monthlySavings.toLocaleString()}</p>
                                    <p className="text-xs text-slate-400 mt-1">Monthly Savings</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-black text-amber-400">{results.roi.toFixed(0)}%</p>
                                    <p className="text-xs text-slate-400 mt-1">Annual ROI</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <SectionHeader label="Recommendation" title={`We Recommend: ${results.recommendedPlan.name}`} subtitle={results.recommendedPlan.description} />
                        <div className="grid md:grid-cols-3 gap-6">
                            {plans.map((plan, i) => (
                                <PricingCard key={plan.name} name={plan.name} price={`$${plan.price}`} description={plan.description} features={plan.features}
                                    cta={i === results.planIndex ? 'Get Started' : 'Compare'} ctaLink={config.calendlyUrl} popular={i === results.planIndex}
                                    accent={i === 0 ? 'blue' : i === 1 ? 'purple' : 'amber'} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">Is there a setup fee?</h3><p className="text-sm text-slate-400 leading-relaxed">Setup and onboarding are included in all plans. There are no hidden fees or surprise charges.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">Can I change plans later?</h3><p className="text-sm text-slate-400 leading-relaxed">Yes, you can upgrade or downgrade at any time. Your pricing adjusts prorata for the remainder of the billing cycle.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">What if my call volume exceeds plan limits?</h3><p className="text-sm text-slate-400 leading-relaxed">We monitor usage and will proactively recommend an upgrade before you hit limits. We never cut you off or drop calls.</p></div>
                    </section>
                </div>
            </main>
        </div>
    );
}
