import Link from 'next/link';
import { ArrowLeft, Building2, ShieldCheck, Search, Calendar } from 'lucide-react';
import RelatedArticles from '../../components/RelatedArticles';
import { config } from '@/lib/config';

export const metadata = {
    title: 'Property Management Automation: AI for Maintenance Requests and Tenant Screening | Brandverse',
    description: 'Property managers waste hours on maintenance calls and tenant screening. Automate emergency dispatch and tenant qualification with AI voice agents.',
    keywords: ['property management automation', 'tenant screening ai', 'maintenance request automation', 'property manager ai', 'rental property automation'],
};

export default function Post() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/blog" className="text-amber-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest">
                        Industry Focus
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Property Management Automation: AI for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Maintenance &amp; Tenant Screening</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        From emergency leak triage to tenant qualification, AI handles the calls so property managers can focus on actual property growth.
                    </p>
                </div>
            </header>

            <main className="px-6 py-20">
                <article className="max-w-3xl mx-auto space-y-16">

                    {/* AEO: Quick Answer Block */}
                    <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-amber-500">
                        <h2 className="text-lg font-bold text-white mb-2">What property management tasks can AI voice agents automate?</h2>
                        <ul className="list-disc ml-4 space-y-2 text-slate-300">
                            <li><strong>Emergency Maintenance Triage:</strong> AI answers after-hours calls, assesses urgency, and dispatches the right vendor instantly.</li>
                            <li><strong>Tenant Screening &amp; Qualification:</strong> AI asks pre-qualification questions — income, credit range, move-in date — before scheduling a showing.</li>
                            <li><strong>Showing Scheduling:</strong> AI books self-guided or agent-led showings 24/7 based on agent availability and tenant preferences.</li>
                            <li><strong>Lease Renewal Reminders:</strong> AI contacts tenants 60 days before lease end to start renewal conversations.</li>
                        </ul>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The 2 AM Pipe Burst</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Every property manager knows the dread of a 2 AM phone call. A toilet is overflowing, a pipe burst, or the HVAC died mid-August. If you miss that call, you have a flooded unit and an angry tenant by morning.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            AI voice agents handle these calls instantly. The tenant calls your number, the AI answers: <em>&quot;You've reached Brandverse Properties. Are you reporting an emergency?&quot;</em> If yes, it determines water, fire, or electrical, verifies the tenant's identity, and dispatches the nearest vendor — all before you've even woken up to check your phone.
                        </p>
                    </section>

                    <section className="space-y-8">
                        <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                                <Building2 className="w-6 h-6 text-amber-400" />
                                3 Workflows You Must Automate Now
                            </h3>

                            <div className="space-y-6 relative z-10">

                                <div className="group p-5 hover:bg-white/5 rounded-xl transition-colors border-b border-white/5 last:border-0">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">1. Emergency Maintenance Triage</h4>
                                            <p className="text-sm text-slate-400">Tenant calls &rarr; AI triages urgency &rarr; Vendor dispatched.</p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-3 py-1 rounded-full">
                                            <ShieldCheck className="w-3 h-3" />
                                            Response: Under 60s
                                        </div>
                                    </div>
                                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                        <strong>The Brandverse Fix:</strong> AI voice agent asks structured questions: &quot;Is there water actively flowing?&quot; &quot;Is the power off?&quot; Based on the answers, it tags the issue as Emergency, Urgent, or Routine. Emergency calls trigger an immediate SMS to the on-call vendor with the tenant's unit number and issue summary. Routine requests go into the next-day queue.
                                    </p>
                                </div>

                                <div className="group p-5 hover:bg-white/5 rounded-xl transition-colors border-b border-white/5 last:border-0">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">2. Tenant Qualification Engine</h4>
                                            <p className="text-sm text-slate-400">Lead calls &rarr; AI screens &rarr; Only qualified leads get showings.</p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-3 py-1 rounded-full">
                                            <Search className="w-3 h-3" />
                                            Time Saved: 8 hrs/week
                                        </div>
                                    </div>
                                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                        <strong>The Brandverse Fix:</strong> When a prospect calls about a listing, the AI asks: &quot;What's your monthly budget? Are you pre-approved? What's your desired move-in date?&quot; It verifies answers against your minimum criteria. If they qualify, it offers available showing slots. If not, it politely explains why and ends the call — no human time wasted.
                                    </p>
                                </div>

                                <div className="group p-5 hover:bg-white/5 rounded-xl transition-colors border-b border-white/5 last:border-0">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">3. After-Hours Showing Scheduler</h4>
                                            <p className="text-sm text-slate-400">Prospect inquires &rarr; AI books self-guided tour &rarr; Access code sent.</p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 bg-green-900/20 px-3 py-1 rounded-full">
                                            <Calendar className="w-3 h-3" />
                                            Showings: 3x More
                                        </div>
                                    </div>
                                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                        <strong>The Brandverse Fix:</strong> For properties with smart locks, the AI can schedule and authorize self-guided tours 24/7. The prospect picks a time, the AI verifies their identity, and generates a one-time access code valid for that 30-minute window. No keys, no coordination. Just a QR code at the door and a follow-up call the next day.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Tenant Screening Done Right</h2>
                        <p className="text-slate-400 leading-8 text-lg">
                            Most property managers spend hours on the phone asking the same questions: <em>&quot;How much do you make?&quot; &quot;Why are you moving?&quot; &quot;Do you have pets?&quot;</em> These conversations are tedious, inconsistent, and often forget to ask key qualifying criteria.
                        </p>
                        <p className="text-slate-400 leading-8 text-lg">
                            An AI agent asks every prospect the <strong>exact same questions in the exact same order</strong>. It never forgets to ask about eviction history or income verification. It logs every response directly into your CRM with a qualification score. You only follow up with the tier A leads.
                        </p>
                    </section>

                    {/* FAQ Block */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white mb-2">How does AI route emergency maintenance requests?</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    The AI asks a series of yes/no questions to determine urgency: &quot;Is there flooding?&quot; &quot;Can you safely turn off the water?&quot; &quot;Is anyone injured?&quot; If the situation is critical, it immediately dispatches the nearest vendor via SMS and phone call, then notifies the property manager via push notification. For non-emergencies, it creates a ticket and schedules the next available appointment.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white mb-2">What tenant qualification questions can AI handle?</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    AI can ask about monthly income, employment status, credit score range, rental history, number of occupants, pet ownership, eviction history, desired lease term, and move-in timeline. Responses are cross-checked against your minimum requirements. If a prospect fails any criteria, the AI politely disqualifies them. If they pass, the AI offers available showing slots.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white mb-2">Can AI schedule after-hours showings for rental properties?</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Yes. AI integrates with your calendar to show real-time availability for showings. For properties with smart locks (August, Schlage, or Latch), AI can generate one-time access codes for self-guided tours. For agent-led showings, it coordinates both the prospect's and agent's availability and adds the appointment to both calendars with all relevant details.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Block */}
                    <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 p-10 rounded-3xl border border-amber-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Manage Properties, Not Phones.</h3>
                        <p className="text-slate-300 font-medium max-w-lg mx-auto">
                            Delegate the calls to AI and reclaim your time. Better tenant experiences, fewer emergencies.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={config.calendlyUrl}
                                className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
                            >
                                Book a Free Strategy Call <Calendar className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 border border-amber-500/50 text-amber-400 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-amber-500/10 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                </article>

                <RelatedArticles currentSlug="property-management-tenant-screening" />
            </main>
        </div>
    );
}
