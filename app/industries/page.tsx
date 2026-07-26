import Link from 'next/link';
import { ArrowRight, Calendar, Wrench, Stethoscope, Scale, Building2, UtensilsCrossed, Sparkles, Car, Home, Zap, HardHat } from 'lucide-react';
import { config } from '@/lib/config';

export const metadata = {
    title: 'AI Receptionist by Industry — Brandverse',
    description: 'See how AI receptionists work for electricians, HVAC, plumbers, dentists, law firms, property managers, medical clinics, restaurants, salons, auto repair shops, and home service businesses.',
    openGraph: { title: 'AI Receptionist by Industry — Brandverse', description: 'Industry-specific AI receptionist solutions for 12+ service industries.' },
};

const industries = [
    { icon: Zap, name: 'Electricians', painPoint: 'Missed after-hours emergency calls', article: '/blog/hvac-dispatch-automation', color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30' },
    { icon: Wrench, name: 'HVAC Companies', painPoint: 'Overflow calls during peak seasons', article: '/blog/hvac-dispatch-automation', color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30' },
    { icon: HardHat, name: 'Plumbers', painPoint: 'Emergency dispatch coordination', article: '/blog/hvac-dispatch-automation', color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30' },
    { icon: Home, name: 'Roofing Companies', painPoint: 'Lead qualification for estimates', article: '/blog/construction-bidding-automation', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30' },
    { icon: Stethoscope, name: 'Dentists', painPoint: 'Appointment no-shows', article: '/blog/healthcare-no-show-cure', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
    { icon: Scale, name: 'Law Firms', painPoint: 'Missed client intake calls', article: '/blog/legal-intake-ethics', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30' },
    { icon: Building2, name: 'Property Managers', painPoint: 'After-hours maintenance requests', article: '/blog/property-management-tenant-screening', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30' },
    { icon: Stethoscope, name: 'Medical Clinics', painPoint: 'Overloaded front desk staff', article: '/blog/healthcare-no-show-cure', color: 'from-sky-500/20 to-sky-600/10 border-sky-500/30' },
    { icon: UtensilsCrossed, name: 'Restaurants', painPoint: 'Peak hour reservation overload', article: '/blog/restaurant-reservations-ai', color: 'from-red-500/20 to-red-600/10 border-red-500/30' },
    { icon: Sparkles, name: 'Salons & Spas', painPoint: 'Last-minute cancellation gaps', article: '/blog/salon-spa-cancellation-fill', color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30' },
    { icon: Car, name: 'Auto Repair Shops', painPoint: 'Service reminder follow-ups', article: '/blog/auto-service-retention', color: 'from-green-500/20 to-green-600/10 border-green-500/30' },
    { icon: Home, name: 'Home Service Businesses', painPoint: 'Missed calls across all trades', article: '/blog/ultimate-guide-business-automation', color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30' },
];

export default function IndustriesPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        AI Receptionist <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">by Industry</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Every industry has unique call handling challenges. See how AI receptionists solve specific pain points for your industry — from after-hours emergency dispatch to appointment no-show prevention.
                    </p>
                </div>
            </header>

            <main className="px-6 py-16">
                <div className="max-w-5xl mx-auto space-y-16">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Select Your Industry</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {industries.map((ind) => {
                                const Icon = ind.icon;
                                return (
                                    <Link key={ind.name} href={ind.article} className={`group p-6 rounded-2xl bg-gradient-to-br ${ind.color} bg-white/5 border hover:bg-white/[0.07] transition-all`}>
                                        <Icon className="w-8 h-8 text-white mb-3" />
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{ind.name}</h3>
                                        <p className="text-sm text-slate-400">{ind.painPoint}</p>
                                        <span className="inline-flex items-center gap-1 text-blue-400 text-xs font-semibold mt-3 group-hover:gap-2 transition-all">Read Guide <ArrowRight className="w-3 h-3" /></span>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Common Benefits */}
                    <section className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h2 className="text-2xl font-black text-white mb-6 uppercase italic tracking-wide">Common Benefits Across All Industries</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div><h3 className="font-bold text-white mb-1">100% Call Answer Rate</h3><p className="text-sm text-slate-400">Every call is answered instantly. No busy signals, no voicemail, no missed opportunities.</p></div>
                            <div><h3 className="font-bold text-white mb-1">24/7 Coverage</h3><p className="text-sm text-slate-400">After-hours, weekends, holidays — your AI receptionist works every hour of every day.</p></div>
                            <div><h3 className="font-bold text-white mb-1">50-70% Lower Cost</h3><p className="text-sm text-slate-400">AI receptionists cost a fraction of human staff while providing superior coverage.</p></div>
                            <div><h3 className="font-bold text-white mb-1">Instant Booking</h3><p className="text-sm text-slate-400">Appointments are booked directly into your calendar without back-and-forth.</p></div>
                            <div><h3 className="font-bold text-white mb-1">CRM Integration</h3><p className="text-sm text-slate-400">Every call creates a structured lead record in your CRM automatically.</p></div>
                            <div><h3 className="font-bold text-white mb-1">Full Analytics</h3><p className="text-sm text-slate-400">Track call volume, booking rates, conversion, and ROI with detailed analytics.</p></div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Frequently Asked Questions</h2>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">Which industry benefits most from AI receptionists?</h3><p className="text-slate-400 leading-relaxed">Service businesses with high inbound call volume and after-hours demand see the strongest ROI — particularly HVAC, plumbing, medical, and legal practices. However, every industry that relies on phone calls for lead generation benefits significantly.</p></div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h3 className="font-bold text-white mb-2">Can an AI receptionist handle industry-specific terminology?</h3><p className="text-slate-400 leading-relaxed">Yes. AI voice agents are trained on your industry vocabulary. A dental AI knows the difference between a cleaning and a root canal. An HVAC AI understands the difference between AC repair and furnace replacement. Scripts are customized for each industry.</p></div>
                    </section>

                    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-10 rounded-3xl border border-blue-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Find Your Industry Solution</h3>
                        <p className="text-slate-300 max-w-lg mx-auto">Book a free strategy call to see how Brandverse can solve your industry-specific call handling challenges.</p>
                        <Link href={config.calendlyUrl} className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/25">Book a Free Strategy Call <Calendar className="w-4 h-4" /></Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
