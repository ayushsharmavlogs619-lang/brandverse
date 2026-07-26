import Link from 'next/link';
import { ArrowLeft, MessageSquare, Phone, FileText, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import ArticleSchema from '../../components/Article/ArticleSchema';
import KeyTakeaways from '../../components/Article/KeyTakeaways';
import CTABlock from '../../components/Article/CTABlock';
import { config } from '@/lib/config';

export const metadata = {
    title: 'High-Converting Call Scripts for AI Agents — Brandverse',
    description: 'Real AI call script examples that convert callers into booked appointments. Templates for HVAC, medical, legal, real estate, and service businesses.',
    openGraph: { title: 'High-Converting Call Scripts for AI Agents — Brandverse', description: 'Real AI call script examples that convert callers into booked appointments.' },
    twitter: { card: 'summary_large_image', title: 'High-Converting Call Scripts for AI Agents — Brandverse', description: 'Real AI call script examples that convert callers into booked appointments.' },
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-orange-500/30">
            <ArticleSchema title="High-Converting Call Scripts for AI Agents" description="Real AI call script examples that convert callers into booked appointments." slug="scripts-that-convert" date="Jan 3, 2025" category="Templates & Scripts" />
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-orange-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Intelligence</Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest">Templates & Scripts</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">High-Converting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Call Scripts</span></h1>
                    <p className="text-lg text-slate-400 font-medium">Real script templates that convert callers into booked appointments.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500"><span>Jan 3, 2025</span><span>·</span><span>8 min read</span><span>·</span><span className="text-orange-400">Templates & Scripts</span></div>
                </div>
            </header>
            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-12">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-orange-500">
                        <h2 className="text-lg font-bold text-white mb-3">What makes an AI call script convert?</h2>
                        <p className="text-slate-300 leading-relaxed">High-converting AI call scripts follow a proven structure: warm greeting, rapid qualification, urgency creation, and immediate booking offer. The best scripts sound natural, ask open-ended questions, and steer callers toward a booking decision within 30 seconds.</p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Service Business Script Template</h2>
                        <pre className="bg-black/40 p-6 rounded-xl text-sm text-slate-300 border border-white/10 leading-relaxed">{`"Hi, thanks for calling [Business Name]. This is [AI Name], your virtual assistant. How can I help you today?

[Caller responds with issue]

I can help with that. Let me ask a couple quick questions so I can get the right person out to you.

1. What's your zip code or address?
2. When would be the best time for a technician to come by?
3. Is this an emergency or can it wait until regular hours?

Great, I have an opening [today/tomorrow] at [time]. Can I book that for you?

Perfect! I'll send you a confirmation text right now. Is [phone number] the best number to reach you?"`}</pre>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Medical/Dental Appointment Script</h2>
                        <pre className="bg-black/40 p-6 rounded-xl text-sm text-slate-300 border border-white/10 leading-relaxed">{`"Thank you for calling [Practice Name]. I'm [AI Name], your virtual scheduling assistant. Are you a new or existing patient?

[New patient flow]
Great! I just need a few details to get you set up.
1. What's your full name and date of birth?
2. What's the reason for your visit?
3. Are you experiencing any pain or discomfort?

[Existing patient flow]
Welcome back! Is this for a regular checkup or are you having a specific concern?

Let me check available appointments. I have [day] at [time] — does that work?"`}</pre>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Script Best Practices</h2>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm text-slate-400"><CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> <strong className="text-white">Ask open-ended questions</strong> — Avoid yes/no questions that stall the conversation.</li>
                            <li className="flex items-start gap-2 text-sm text-slate-400"><CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> <strong className="text-white">Create urgency</strong> — "I have an opening today at 3 PM" converts better than "When would you like to come in?"</li>
                            <li className="flex items-start gap-2 text-sm text-slate-400"><CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> <strong className="text-white">Confirm next steps</strong> — Always end with a clear confirmation and SMS follow-up.</li>
                        </ul>
                    </section>

                    <KeyTakeaways items={['Lead with a warm greeting and rapid qualification.', 'Ask open-ended questions to keep the conversation flowing.', 'Create urgency by offering specific available times.', 'Always send an SMS confirmation after booking.', 'Test and optimize scripts based on real call transcripts.']} color="orange" />

                    <CTABlock headline="Get Custom Scripts" subheadline="Let Brandverse create high-converting AI scripts tailored to your business." color="orange" />
                </article>
                <RelatedArticles currentSlug="scripts-that-convert" />
            </main>
        </div>
    );
}
