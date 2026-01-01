import Link from 'next/link';
import { ArrowLeft, Sparkles, UserCheck, Calendar, DollarSign } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';

export const metadata = {
    title: 'Cosmetic Consultations on Autopilot: Filtering Serious Patients from Tire Kickers | Brandverse',
    description: 'Dermatology clinics waste hours on free consults that never convert. Use AI to pre-qualify leads and collect deposits automatically.',
    keywords: ['medspa automation', 'dermatology lead generation', 'cosmetic surgery marketing automation', 'aesthetic clinic booking software', 'high ticket sales filter'],
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-rose-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-rose-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest">
                        Industry Focus: Aesthetics
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Cosmetic Consultations on Autopilot: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Filtering the Serious</span>
                    </h1>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-rose-500">
                        <h2 className="text-lg font-bold text-white mb-2">The "Free Consult" Trap</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Instagram drives thousands of leads, but 90% are "just curious" about pricing. Your front desk spends all day quoting prices to people who can't afford the treatment.
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">The Deposit Gatekeeper</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Our AI Agents handle the pricing curveball: "Dr. Smith's lip filler treatments start at $750. We require a $50 fully refundable deposit to book the consultation. I can send you a secure payment link right now to lock in your Thursday slot?"
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            This simple automated script filters out 100% of the tire kickers and ensures that every person walking through your door is a paying customer.
                        </p>
                    </section>
                </article>
                <RelatedArticles currentSlug="dermatology-cosmetic-bookings" />
            </main>
        </div>
    );
}
