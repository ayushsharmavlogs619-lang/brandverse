'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, FileText, Settings, Brain, TestTube, Rocket, RefreshCw, LifeBuoy, Clock, CheckCircle2, ArrowRight, Calendar, BarChart3 } from 'lucide-react';
import Timeline from '@/app/components/ui/Timeline';
import SectionHeader from '@/app/components/ui/SectionHeader';
import FeatureCard from '@/app/components/ui/FeatureCard';
import { config } from '@/lib/config';

const phases = [
    {
        icon: Search,
        title: 'Discovery',
        duration: 'Days 1–3',
        description: 'We analyze your current call handling, identify gaps, and define success metrics. Our team reviews your service offerings, hours of operation, CRM setup, and existing phone systems to create a comprehensive implementation blueprint.',
        deliverables: ['Call volume analysis & peak time mapping', 'Current process audit', 'Success metrics definition (KPI targets)', 'Implementation blueprint document'],
    },
    {
        icon: FileText,
        title: 'Planning',
        duration: 'Days 3–5',
        description: 'We design your AI receptionist personality, scripts, and conversation flows. This phase determines how your AI handles different call scenarios, transfers calls, and integrates with your existing tools.',
        deliverables: ['Conversation flow diagrams', 'Script templates for all scenarios', 'CRM integration specification', 'Call routing rules & escalation paths'],
    },
    {
        icon: Settings,
        title: 'Configuration',
        duration: 'Days 5–10',
        description: 'We configure the AI voice agent, connect your CRM, set up calendar sync, and implement your custom scripts. Our team handles all technical setup so you can focus on running your business.',
        deliverables: ['AI voice agent configuration', 'CRM integration (HubSpot, Salesforce, etc.)', 'Calendar sync (Google, Outlook, Calendly)', 'SMS template setup', 'Knowledge base population'],
    },
    {
        icon: Brain,
        title: 'Training',
        duration: 'Days 10–14',
        description: 'We train the AI on your business knowledge, services, pricing, and frequently asked questions. The AI learns your terminology, service areas, and unique value propositions.',
        deliverables: ['Business knowledge training', 'Service catalog ingestion', 'FAQ database creation', 'Voice customization & personality tuning', 'Test call scenarios'],
    },
    {
        icon: TestTube,
        title: 'Testing',
        duration: 'Days 14–18',
        description: 'We run extensive testing with real-world scenarios. Your team can make test calls, review transcripts, and provide feedback. We iterate on scripts and flows until they meet your standards.',
        deliverables: ['Internal team test calls', 'Script refinement based on feedback', 'Edge case handling verification', 'Performance benchmark testing', 'Quality assurance sign-off'],
    },
    {
        icon: Rocket,
        title: 'Launch',
        duration: 'Days 18–21',
        description: 'We go live! Your AI receptionist starts handling real calls. We monitor the first 48 hours closely to ensure smooth operation and make real-time adjustments as needed.',
        deliverables: ['Production deployment', '48-hour hyper-care monitoring', 'Live call review & adjustment', 'Team training session', 'Launch documentation'],
    },
    {
        icon: RefreshCw,
        title: 'Optimization',
        duration: 'Weeks 2–6',
        description: 'We analyze call data, refine scripts based on real interactions, and optimize conversion rates. This phase ensures your AI continuously improves over time.',
        deliverables: ['Weekly performance reports', 'Call transcript reviews', 'Script optimization based on data', 'Conversion rate analysis', 'A/B testing of call flows'],
    },
    {
        icon: LifeBuoy,
        title: 'Ongoing Support',
        duration: 'Continuous',
        description: 'You get dedicated support, regular performance reviews, and continuous improvements. Your AI evolves with your business — adding new services, updating scripts, and improving based on call data.',
        deliverables: ['24/7 technical support', 'Monthly business reviews', 'Quarterly strategy sessions', 'Continuous script updates', 'Feature upgrades & improvements'],
    },
];

const metrics = [
    { value: '48–72', label: 'Hours to Go-Live', icon: Clock },
    { value: '99.9%', label: 'Uptime Guarantee', icon: CheckCircle2 },
    { value: '8', label: 'Implementation Phases', icon: BarChart3 },
    { value: '24/7', label: 'Support After Launch', icon: LifeBuoy },
];

export default function ImplementationPage() {
    const [activePhase, setActivePhase] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Implementation Timeline</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        From Sign-Up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Go-Live in 48–72 Hours</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Our 8-phase implementation process takes you from sign-up to a live AI receptionist in days — then optimizes your call flows for weeks after launch.
                    </p>
                </div>
            </header>

            <main className="px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-20">
                    {/* Metric Bar */}
                    <div className="grid grid-cols-4 gap-4">
                        {metrics.map((m) => {
                            const Icon = m.icon;
                            return (
                                <div key={m.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                                    <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                                    <p className="text-2xl font-black text-white">{m.value}</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">{m.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Timeline */}
                    <section>
                        <SectionHeader title="Your Implementation Journey" subtitle="Interactive timeline — click each phase for details and deliverables." />
                        <Timeline phases={phases} />
                    </section>

                    {/* Why This Works */}
                    <section>
                        <SectionHeader label="Why It Works" title="Proven Methodology" subtitle="Every phase is designed to minimize risk and maximize results." />
                        <div className="grid md:grid-cols-2 gap-6">
                            <FeatureCard icon={Rocket} title="Fast Time-to-Value" description="Most businesses see ROI within 30 days of launch. Our streamlined onboarding gets you live in 48–72 hours, not months." accent="blue" />
                            <FeatureCard icon={LifeBuoy} title="Continuous Optimization" description="Your AI improves over time. We analyze calls, refine scripts, and optimize conversion rates through ongoing A/B testing." accent="purple" />
                            <FeatureCard icon={Settings} title="Minimal Disruption" description="Your existing phone system stays active during transition. We handle all technical setup — you keep running your business." accent="emerald" />
                            <FeatureCard icon={Brain} title="Knowledge-Driven" description="Your AI learns your business inside out — services, pricing, service areas, and unique value propositions — before taking a single call." accent="amber" />
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">How long does implementation actually take?</h3><p className="text-sm text-slate-400 leading-relaxed">Most businesses go live within 48–72 hours of sign-up. Full optimization — CRM depth, custom scripts, and conversion tuning — continues over the following 2–3 weeks. We provide a specific timeline after the discovery phase.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">Do I need to change my phone system?</h3><p className="text-sm text-slate-400 leading-relaxed">No. Brandverse works with your existing phone system. We can set up call forwarding, routing rules, and backup answering without changing your provider.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">What happens if something goes wrong during launch?</h3><p className="text-sm text-slate-400 leading-relaxed">We provide 48-hour hyper-care monitoring after launch. If any issues arise, we have immediate rollback capabilities and 24/7 support to resolve them quickly.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">How involved does my team need to be?</h3><p className="text-sm text-slate-400 leading-relaxed">Minimally. Your team needs to provide business information during discovery and make a few test calls during testing. We handle the technical heavy lifting.</p></div>
                    </section>

                    {/* CTA */}
                    <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Start Your Journey</h3>
                        <p className="text-slate-300 max-w-lg mx-auto font-medium">
                            Ready to deploy your AI receptionist? Book a free strategy call and we will map out your implementation timeline.
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
