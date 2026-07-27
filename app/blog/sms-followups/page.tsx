import Link from 'next/link';
import { ArrowLeft, MessageSquare, Bell, Clock, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import ArticleSchema from '../../components/Article/ArticleSchema';
import KeyTakeaways from '../../components/Article/KeyTakeaways';
import CTABlock from '../../components/Article/CTABlock';
import { config } from '@/lib/config';

export const metadata = {
    title: 'Automated SMS Follow-ups that Convert — Brandverse',
    description: 'Best practices for SMS confirmations and follow-ups that increase show-rates and conversions. Templates and timing strategies for AI-powered SMS.',
    openGraph: { title: 'Automated SMS Follow-ups that Convert — Brandverse', description: 'Best practices for SMS confirmations and follow-ups.' },
    twitter: { card: 'summary_large_image', title: 'Automated SMS Follow-ups that Convert — Brandverse', description: 'Best practices for SMS confirmations and follow-ups.' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/sms-followups' }
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-green-500/30">
            <ArticleSchema title="Automated SMS Follow-ups that Convert" description="Best practices for SMS confirmations and follow-ups." slug="sms-followups" date="Jan 3, 2025" category="Templates & Scripts" />
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-green-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Intelligence</Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-widest">Templates & Scripts</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Automated SMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Follow-ups that Convert</span></h1>
                    <p className="text-lg text-slate-400 font-medium">Templates and timing strategies for confirmation and reminder messages.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500"><span>Jan 3, 2025</span><span>·</span><span>6 min read</span><span>·</span><span className="text-green-400">Templates & Scripts</span></div>
                </div>
            </header>
            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-12">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-green-500">
                        <h2 className="text-lg font-bold text-white mb-3">How do automated SMS follow-ups increase conversions?</h2>
                        <p className="text-slate-300 leading-relaxed">Automated SMS follow-ups reduce no-show rates by 50-70%, increase booking completion rates, and keep your business top-of-mind. The key is timing: confirmation within 1 minute, reminder 24 hours before, and follow-up 1 hour after the appointment.</p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The SMS Follow-Up Sequence</h2>
                        <div className="space-y-4">
                            <div className="p-5 rounded-xl bg-green-900/10 border border-green-500/20"><h3 className="font-bold text-white mb-1">1. Instant Confirmation (within 1 minute)</h3>
                                <pre className="bg-black/40 p-3 rounded text-xs text-slate-300 mt-2">{`"[Business Name] here! Your appointment is confirmed for [Day, Date] at [Time]. Reply C to confirm or R to reschedule. We'll send a reminder 24 hours before!"`}</pre>
                            </div>
                            <div className="p-5 rounded-xl bg-green-900/10 border border-green-500/20"><h3 className="font-bold text-white mb-1">2. 24-Hour Reminder</h3>
                                <pre className="bg-black/40 p-3 rounded text-xs text-slate-300 mt-2">{`"Reminder: You're booked with [Business Name] tomorrow at [Time] at [Address]. Reply C to confirm or R to reschedule. See you soon!"`}</pre>
                            </div>
                            <div className="p-5 rounded-xl bg-green-900/10 border border-green-500/20"><h3 className="font-bold text-white mb-1">3. Post-Appointment Follow-Up</h3>
                                <pre className="bg-black/40 p-3 rounded text-xs text-slate-300 mt-2">{`"Thanks for visiting [Business Name] today! How was your experience? Reply with a rating 1-5. We'd love your feedback!"`}</pre>
                            </div>
                        </div>
                    </section>

                    <KeyTakeaways items={['Send confirmation within 1 minute of booking.', 'Send reminder 24 hours before the appointment.', 'Send follow-up 1 hour after the appointment.', 'Include clear CTAs: confirm, reschedule, or cancel.', 'Track open rates and conversion rates to optimize timing.']} color="green" />

                    <CTABlock headline="Automate Your Follow-Ups" subheadline="Set up automated SMS sequences that increase show rates and drive repeat business." color="green" />
                </article>
                <RelatedArticles currentSlug="sms-followups" />
            </main>
        </div>
    );
}
