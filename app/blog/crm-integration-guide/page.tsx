import Link from 'next/link';
import { ArrowLeft, Settings, Database, RefreshCw, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import ArticleSchema from '../../components/Article/ArticleSchema';
import KeyTakeaways from '../../components/Article/KeyTakeaways';
import CTABlock from '../../components/Article/CTABlock';
import { config } from '@/lib/config';

export const metadata = {
    title: 'CRM & Calendar Integration Guide — Brandverse',
    description: 'How to connect Brandverse AI voice agents to ServiceTitan, Housecall Pro, Calendly, and CRMs for seamless booking and lead capture.',
    openGraph: { title: 'CRM & Calendar Integration Guide — Brandverse', description: 'How to connect Brandverse to ServiceTitan, Housecall Pro, Calendly, and CRMs.', type: 'article' },
    twitter: { card: 'summary_large_image', title: 'CRM & Calendar Integration Guide — Brandverse', description: 'How to connect Brandverse to ServiceTitan, Housecall Pro, Calendly, and CRMs.' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/crm-integration-guide' }
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
            <ArticleSchema title="CRM & Calendar Integration Guide" description="How to connect Brandverse AI voice agents to ServiceTitan, Housecall Pro, Calendly, and CRMs." slug="crm-integration-guide" date="Jan 3, 2025" category="Technical Guide" />
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-cyan-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Intelligence</Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest">Technical Guide</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">CRM & Calendar <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Integration Guide</span></h1>
                    <p className="text-lg text-slate-400 font-medium">How to connect Brandverse AI voice agents to your existing tools for seamless booking and lead capture.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500"><span>Jan 3, 2025</span><span>·</span><span>6 min read</span><span>·</span><span className="text-cyan-400">Technical Guide</span></div>
                </div>
            </header>
            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-12">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-cyan-500">
                        <h2 className="text-lg font-bold text-white mb-3">How does Brandverse integrate with CRMs and calendars?</h2>
                        <p className="text-slate-300 leading-relaxed">Brandverse AI voice agents connect to your CRM and calendar via API, webhook, or direct integration. When a caller books an appointment, the AI creates a calendar event and a CRM lead record automatically — no manual data entry required.</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Why Integration Matters</h2>
                        <p className="text-slate-400 leading-8 text-lg">Your AI voice agent is only as powerful as its connections. Without integration, you have an AI that takes messages but creates manual work. With integration, you close the loop: call comes in, appointment is booked, lead is created, client gets a confirmation — all without a human touching a keyboard.</p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Supported Integrations</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Google Calendar</h3><p className="text-xs text-slate-400 mt-1">Two-way sync, real-time availability</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Outlook / Office 365</h3><p className="text-xs text-slate-400 mt-1">Calendar integration for enterprise</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Calendly</h3><p className="text-xs text-slate-400 mt-1">Round-robin booking, link generation</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">ServiceTitan</h3><p className="text-xs text-slate-400 mt-1">HVAC, plumbing, electrical dispatch</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Housecall Pro</h3><p className="text-xs text-slate-400 mt-1">Field service management</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Salesforce</h3><p className="text-xs text-slate-400 mt-1">Lead and opportunity creation</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">HubSpot</h3><p className="text-xs text-slate-400 mt-1">Contact creation, deal tracking</p></div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white text-sm">Zoho CRM</h3><p className="text-xs text-slate-400 mt-1">Lead capture, activity logging</p></div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Integration Methods</h2>
                        <div className="space-y-4">
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-1">Direct API Integration</h3><p className="text-sm text-slate-400">Your AI agent communicates directly with your CRM or calendar via API. This is the most reliable method, offering real-time synchronization and full feature access. Setup requires API credentials, which your provider manages securely.</p></div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-1">Webhook-Based Integration</h3><p className="text-sm text-slate-400">Your AI sends webhooks to your CRM or custom middleware whenever a booking occurs. This flexible approach works well with custom or legacy systems that do not offer direct API access.</p></div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-1">Zapier / Make (Integromat)</h3><p className="text-sm text-slate-400">For rapid prototyping or connecting systems without native integration, your AI triggers Zapier workflows that create records in hundreds of supported apps. This is the fastest path to integration.</p></div>
                        </div>
                    </section>

                    <KeyTakeaways items={['Integration eliminates manual data entry and reduces booking errors.', 'Brandverse supports direct API, webhook, and Zapier connections.', 'Two-way calendar sync ensures availability is always accurate.', 'CRM integration creates structured lead records automatically.', 'Most integrations are configured during the 1-3 day setup process.']} color="cyan" />

                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">How long does integration setup take?</h3><p className="text-slate-400 leading-relaxed">Most CRM and calendar integrations are configured during the initial setup process, which takes 1-3 days. Webhook and Zapier integrations can be set up in hours.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">Do I need technical skills to set up integrations?</h3><p className="text-slate-400 leading-relaxed">No. Brandverse handles the technical configuration. You only need to provide API credentials or grant access permissions. The setup team manages all technical details.</p></div>
                    </div>

                    <CTABlock headline="Integrate Your Tools" subheadline="See how Brandverse can connect your AI voice agent to your CRM and calendar." color="cyan" />
                </article>
                <RelatedArticles currentSlug="crm-integration-guide" />
            </main>
        </div>
    );
}
