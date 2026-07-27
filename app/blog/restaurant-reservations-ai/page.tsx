import Link from 'next/link';
import { ArrowLeft, Phone, Clock, Bell, Calendar, ArrowRight } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import { config } from '@/lib/config';

export const metadata = {
    title: 'AI Voice for Restaurants: Automating Reservations, Takeout, and Catering Inquiries | Brandverse',
    description: 'How restaurants use AI voice agents to handle reservations, takeout orders, and catering inquiries 24/7 without adding staff.',
    keywords: ['ai voice restaurant', 'automate restaurant reservations', 'ai restaurant phone system', 'catering inquiry automation', 'restaurant takeout ai'],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: 'https://brandverse.tech/blog/restaurant-reservations-ai' }
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-orange-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-orange-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest">
                        Industry Focus
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        AI Voice for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Restaurants</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        Automating reservations, takeout, and catering inquiries without adding a single host.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    {/* AEO: Quick Answer Block */}
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-orange-500">
                        <h2 className="text-lg font-bold text-white mb-2">How can restaurants use AI voice agents to handle reservations?</h2>
                        <ul className="list-disc ml-4 space-y-2 text-slate-300">
                            <li><strong>Inbound Reservations:</strong> AI answers every call instantly, checks table availability, and books reservations directly into your POS.</li>
                            <li><strong>Takeout Orders:</strong> Customers speak their order naturally; the AI transcribes and pushes it straight to the kitchen display system.</li>
                            <li><strong>Catering Inquiries:</strong> AI qualifies event details (date, guest count, budget) and forwards qualified leads to your events team.</li>
                            <li><strong>Waitlist Management:</strong> Callers are automatically added to the waitlist and notified via SMS when their table is ready.</li>
                        </ul>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Never Miss a Reservation Again</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            The restaurant industry runs on phone calls. Reservations, takeout orders, catering inquiries, special requests — all of it comes through the same phone line. And during a Friday night rush, every ring that goes unanswered is revenue walking out the door.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            An AI voice agent doesn't put callers on hold. It doesn't miss dinner rush calls. It picks up every single time, handles the conversation naturally, and books directly into your system.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            The result? <strong>Higher reservation volume, zero missed calls, and a front-of-house team that can focus on the guests already in the building.</strong>
                        </p>
                    </section>

                    <section className="space-y-8">
                        <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                                <Phone className="w-6 h-6 text-orange-400" />
                                3 Ways AI Transforms Restaurant Phone Operations
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="group p-5 hover:bg-white/5 rounded-xl transition-colors border-b border-white/5 last:border-0">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">1. Peak Hour Overload</h4>
                                            <p className="text-sm text-slate-400">Hosts juggling walk-ins while phones ring off the hook.</p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-3 py-1 rounded-full">
                                            <Clock className="w-3 h-3" />
                                            Saved: 20+ hrs/week
                                        </div>
                                    </div>
                                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                        <strong>The Brandverse Fix:</strong> AI voice agent answers all inbound calls instantly, checks live table availability via your POS, books reservations, and sends confirmation SMS — all while your hosts focus on the dining room.
                                    </p>
                                </div>

                                <div className="group p-5 hover:bg-white/5 rounded-xl transition-colors border-b border-white/5 last:border-0">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">2. Takeout Order Errors</h4>
                                            <p className="text-sm text-slate-400">Misheard orders, missing items, incorrect pickup times.</p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-3 py-1 rounded-full">
                                            <Bell className="w-3 h-3" />
                                            Saved: 15+ hrs/week
                                        </div>
                                    </div>
                                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                        <strong>The Brandverse Fix:</strong> AI takes takeout orders with conversational confirmation — it repeats each item back, asks about modifications, and pushes the order directly to the kitchen display. Errors drop to near zero.
                                    </p>
                                </div>

                                <div className="group p-5 hover:bg-white/5 rounded-xl transition-colors border-b border-white/5 last:border-0">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">3. Catering Lead Leakage</h4>
                                            <p className="text-sm text-slate-400">Catering calls go to voicemail, leads never call back.</p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-3 py-1 rounded-full">
                                            <Calendar className="w-3 h-3" />
                                            Saved: 10+ hrs/week
                                        </div>
                                    </div>
                                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                        <strong>The Brandverse Fix:</strong> AI qualifies every catering caller — collects date, guest count, budget, and dietary needs — then creates a formatted lead record and alerts your events team via email or Slack. Only warm leads get human attention.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Block */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h3>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="font-bold text-white mb-2">Can AI voice agents handle the call volume during peak lunch and dinner hours?</h4>
                            <p className="text-slate-400 leading-relaxed">
                                Absolutely. AI voice agents scale instantly — they can handle hundreds of simultaneous calls without holding, without transferring, and without sounding rushed. During a Friday night rush when your host is already stretched thin, the AI picks up every single call, books reservations, confirms takeout orders, and never puts a caller on hold.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="font-bold text-white mb-2">Can the AI integrate with my existing reservation system or POS?</h4>
                            <p className="text-slate-400 leading-relaxed">
                                Yes. Brandverse's AI voice agents integrate with major POS and reservation platforms including Toast, Square, OpenTable, Resy, and more. The AI reads live table availability, books directly into your system, and sends SMS confirmations — no manual entry required.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="font-bold text-white mb-2">How does the AI handle special dietary requests or food allergies?</h4>
                            <p className="text-slate-400 leading-relaxed">
                                The AI is trained to ask about dietary restrictions and allergies during every reservation and takeout call. It logs these details and attaches them to the order or reservation notes so your kitchen and waitstaff have full visibility. For severe allergies, the AI can flag the order and alert the kitchen directly.
                            </p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-orange-900/40 to-amber-900/40 p-10 rounded-3xl border border-orange-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Never Miss a Reservation.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            See how Brandverse AI can handle your restaurant's phone calls 24/7 and book more tables.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={config.calendlyUrl}
                                className="inline-flex items-center gap-2 bg-orange-500 text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/25"
                            >
                                Book a Free Strategy Call <Calendar className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-colors border border-white/20"
                            >
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </article>

                <RelatedArticles currentSlug="restaurant-reservations-ai" />
            </main>
        </div>
    );
}
