import Link from 'next/link';
import { ArrowLeft, CheckSquare, ListChecks, ClipboardList, CheckCircle, ArrowRight, Calendar, Clock, Settings } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import ArticleSchema from '../../components/Article/ArticleSchema';
import KeyTakeaways from '../../components/Article/KeyTakeaways';
import CTABlock from '../../components/Article/CTABlock';
import { config } from '@/lib/config';

export const metadata = {
    title: 'Onboarding Checklist for AI Agents — Brandverse',
    description: 'A step-by-step onboarding checklist to get your AI agent live and converting quickly. From discovery to full rollout in 1-2 weeks.',
    openGraph: { title: 'Onboarding Checklist for AI Agents — Brandverse', description: 'Step-by-step AI agent onboarding checklist.' },
    twitter: { card: 'summary_large_image', title: 'Onboarding Checklist for AI Agents — Brandverse', description: 'Step-by-step AI agent onboarding checklist.' },
};

export default function Post() {
    const steps = [
        { phase: 'Discovery', tasks: ['Identify top call types and volumes', 'Map current call handling process', 'Define KPIs and success metrics', 'Document business rules and escalation paths', 'Choose target languages and scripts'] },
        { phase: 'Script Design', tasks: ['Draft greeting and intake flow', 'Write qualification questions', 'Map objection handling responses', 'Create escalation triggers', 'Design SMS confirmation templates', 'Review and approve script drafts'] },
        { phase: 'Integration', tasks: ['Connect calendar (Google/Outlook/Calendly)', 'Configure CRM integration', 'Set up call forwarding', 'Configure SMS/email notifications', 'Test API connections'] },
        { phase: 'Testing', tasks: ['Run 20+ test calls with edge cases', 'Review transcripts for accuracy', 'Test escalation to human team', 'Verify booking flow end-to-end', 'Check SMS delivery and timing'] },
        { phase: 'Launch', tasks: ['Forward production phone number', 'Monitor first 48 hours of live calls', 'Review daily transcripts for week 1', 'Optimize scripts based on real calls', 'Train team on escalation procedures'] },
        { phase: 'Ongoing', tasks: ['Weekly KPI review (answer rate, booking rate)', 'Monthly script optimization', 'Quarterly integration health check', 'Customer satisfaction monitoring'] },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-violet-500/30">
            <ArticleSchema title="Onboarding Checklist for AI Agents" description="Step-by-step AI agent onboarding checklist from discovery to full rollout." slug="onboarding-checklist" date="Jan 3, 2025" category="Implementation" />
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-violet-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Intelligence</Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-black uppercase tracking-widest">Implementation</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Onboarding Checklist <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">for AI Agents</span></h1>
                    <p className="text-lg text-slate-400 font-medium">From discovery to full deployment — a step-by-step checklist to get your AI agent live.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500"><span>Jan 3, 2025</span><span>·</span><span>5 min read</span><span>·</span><span className="text-violet-400">Implementation</span></div>
                </div>
            </header>
            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-12">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-violet-500">
                        <h2 className="text-lg font-bold text-white mb-3">How long does AI agent onboarding take?</h2>
                        <p className="text-slate-300 leading-relaxed">End-to-end onboarding typically takes 1-2 weeks: 2-3 days for discovery and script design, 1-2 days for integration setup, 2-3 days of testing, then go-live. Ongoing optimization continues weekly for the first month.</p>
                    </div>

                    {steps.map((step) => (
                        <section key={step.phase} className="space-y-4">
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">{step.phase}</h2>
                            <div className="space-y-2">
                                {step.tasks.map((task, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                        <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-300">{task}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    <KeyTakeaways items={['Full onboarding takes 1-2 weeks from start to live.', 'Discovery and script design are the most critical phases.', 'Test with 20+ edge case calls before going live.', 'Monitor transcripts daily for the first week of live calls.', 'Ongoing optimization ensures long-term performance.']} color="violet" />

                    <CTABlock headline="Get Started Today" subheadline="Book a free strategy call to start your AI agent onboarding process." color="violet" />
                </article>
                <RelatedArticles currentSlug="onboarding-checklist" />
            </main>
        </div>
    );
}
