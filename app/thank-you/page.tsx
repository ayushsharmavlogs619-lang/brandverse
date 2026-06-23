import Link from 'next/link';
import { ArrowRight, Calendar, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Thank You | Brandverse',
  description: 'Thanks for contacting Brandverse. Book a discovery call or reach us directly while we review your request.',
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 px-6 pt-32 pb-20">
      <section className="max-w-4xl mx-auto text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
          Message Received
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Thanks. We will review this and get back fast.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            If this is tied to missed calls, lead response time, or booking flow, grab a slot now so we can diagnose the revenue leak live.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="https://calendly.com/ayushsharmavlogs619/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            <Calendar className="w-5 h-5" />
            Book Discovery Call
            <ArrowRight className="w-5 h-5" />
          </a>
          <Link
            href="/demos/voice"
            className="w-full sm:w-auto px-8 py-4 border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            Try Voice Demo
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-8 text-left">
          <a
            href="mailto:ayush@brandverse.tech"
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-colors flex items-start gap-4"
          >
            <Mail className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Email</div>
              <div className="text-white font-semibold">ayush@brandverse.tech</div>
            </div>
          </a>
          <a
            href="tel:+918851005278"
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors flex items-start gap-4"
          >
            <Phone className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Phone</div>
              <div className="text-white font-semibold">+91 88510 05278</div>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
