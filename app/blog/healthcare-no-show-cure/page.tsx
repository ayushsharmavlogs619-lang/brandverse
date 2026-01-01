import Link from 'next/link';
import { ArrowLeft, Stethoscope, CalendarX, UserCheck, Bell } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'The No-Show Cure: AI Appointment Reminders for Modern Clinics | Brandverse',
    description: 'Patient no-shows cost healthcare providers billions annually. Eliminate gaps in your schedule with intelligent, conversational AI reminders.',
    keywords: ['patient appointment reminders', 'medical no show reduction', 'healthcare ai scheduling', 'doctor appointment automation', 'clinic efficiency'],
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-green-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-green-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-widest">
                        Industry Focus: Healthcare
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        The No-Show Cure: AI Appointment <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Reminders for Clinics</span>
                    </h1>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-green-500">
                        <h2 className="text-lg font-bold text-white mb-2">The $150 Billion Problem</h2>
                        <p className="text-slate-300 leading-relaxed">
                            A missed appointment isn't just an hour of wasted time; it's lost revenue, disrupted workflow, and a delayed treatment for another patient on the waitlist. Basic SMS (text "Y" to confirm) is easily ignored.
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Conversational Confirmation</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Brandverse AI calls the patient 24 hours prior. It speaks naturally: "Hi Sarah, just checking you're still good for your 2 PM cleaning tomorrow?"
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            If Sarah says "Oh, I forgot, I can't make it," the AI immediately pivots: "No problem. Would you like to reschedule for Thursday at 10 AM or Friday at 3 PM?" It fills your calendar actively, rather than letting it bleed passively.
                        </p>
                    </section>
                </article>
                <RelatedArticles currentSlug="healthcare-no-show-cure" />
            </main>
        </div>
    );
}
