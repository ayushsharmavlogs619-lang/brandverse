import Link from 'next/link';
import { ArrowLeft, Footprints, CalendarPlus, Activity, UserPlus } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'Step Up Your Practice: Filling Cancellations with AI in Podiatry | Brandverse',
    description: 'Specialist appointments are high-value. Don\'t let cancellations leave holes in your revenue. Use AI to auto-fill slots from your waitlist.',
    keywords: ['podiatry practice marketing', 'medical specialist automated scheduling', 'waitlist automation software', 'clinic cancellation filler', 'patient recall system'],
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-teal-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-teal-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest">
                        Industry Focus: Podiatry
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Step Up Your Practice: Filling <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">Cancellations with AI</span>
                    </h1>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-teal-500">
                        <h2 className="text-lg font-bold text-white mb-2">The Orthotic Production Lag</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Patients anxious about their custom orthotics call the front desk constantly. &quot;Are they ready yet?&quot; This ties up your staff.
                        </p>
                        <p className="text-slate-300 leading-relaxed mt-4">
                            <strong>The Fix:</strong> An automated SMS/Voice system that updates the patient at every stage: &quot;Scanned&quot; &rarr; &quot;Fabricating&quot; &rarr; &quot;Ready for Pickup.&quot; It proactively stops the inbound call volume.
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Waitlist Warrior</h2>
                        <p className="text-slate-400 leading-relaxed">
                            When a patient cancels a Tuesday 10 AM slot, your AI agent instantly texts the top 5 people on your &quot;Urgent&quot; waitlist: &quot;We had a last minute opening for tomorrow at 10 AM. First to reply YES gets it.&quot;
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            The slot fills in 3 minutes. Your revenue for the day stays intact.
                        </p>
                    </section>
                </article>
                <RelatedArticles currentSlug="podiatry-patient-growth" />
            </main>
        </div>
    );
}
