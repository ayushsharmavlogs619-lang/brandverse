import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Bell } from 'lucide-react';
import { config } from '@/lib/config';
import { articles } from '@/app/lib/articles';

export const metadata = {
    title: 'AI Appointment Booking — Guides & Resources | Brandverse',
    description: 'Resource hub for AI-powered appointment booking: automated scheduling, no-show reduction, cancellation fill, and calendar integration.',
    openGraph: { title: 'Appointment Booking Hub — Brandverse', description: 'Guides on automating appointment booking with AI.', type: 'website' },
};

export default function AppointmentBookingHub() {
    const hubArticles = articles.filter(a =>
        ['ai-appointment-setting', 'healthcare-no-show-cure', 'salon-spa-cancellation-fill', 'restaurant-reservations-ai', 'fitness-studio-booking-ai', 'dermatology-cosmetic-bookings', 'podiatry-patient-growth', 'crm-integration-guide', 'sms-followups'].includes(a.slug)
    );
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
            <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">Appointment Booking<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Resource Hub</span></h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Automate your appointment booking process: let AI handle scheduling, reminders, cancellations, and follow-ups so your team can focus on service.</p>
                </div>
            </header>
            <main className="px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    <section><h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-8">Featured Guides</h2>
                        <div className="grid md:grid-cols-2 gap-4">{hubArticles.map((article) => (<Link key={article.slug} href={`/blog/${article.slug}`} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-cyan-500/30 transition-all group"><div className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2">{article.category}</div><h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{article.title}</h3><p className="text-sm text-slate-400 mb-4">{article.excerpt}</p><span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all">Read Guide <ArrowRight className="w-3 h-3" /></span></Link>))}</div>
                    </section>
                    <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-10 rounded-3xl border border-cyan-500/30 text-center space-y-6">
                        <h3 className="text-3xl font-black text-white italic">Automate Your Booking</h3>
                        <p className="text-slate-300 max-w-lg mx-auto">See how Brandverse can automate your appointment booking and reduce no-shows.</p>
                        <Link href={config.calendlyUrl} className="inline-flex items-center gap-2 bg-cyan-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/25">Book a Free Strategy Call <Calendar className="w-4 h-4" /></Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
