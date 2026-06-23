'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, TrendingUp } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* Article Header */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-600/10 blur-[100px] rounded-full -z-10" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-green-400">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>
            <span className="text-slate-600">•</span>
            <span>Appointment Automation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            The AI That Never Sleeps: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">24/7 Appointment Setting</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
            Medical clinics, salons, and service businesses are losing 30% of bookings to voicemail. Here's how AI voice agents fill your calendar while you sleep.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white">AS</div>
            <div className="text-sm">
              <div className="font-bold text-white">Ayush Sharma</div>
              <div className="text-slate-500">Head of Operations, Brandverse</div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-20">
        <article className="max-w-3xl mx-auto space-y-16">

          {/* Section 1: The Booking Problem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The Empty Calendar Problem</h2>
            <p className="text-slate-400 leading-8 text-lg">
              Your calendar shows gaps tomorrow. Your phone shows missed calls from last night. Those two facts are directly connected.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              When potential clients call after hours and get voicemail, they don't leave messages. They book with someone else who picks up.
            </p>
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex gap-4 items-start">
              <TrendingUp className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-green-400 mb-2">The Booking Gap</h3>
                <p className="text-sm text-green-200/60 leading-relaxed">
                  Service businesses with 24/7 booking see 35% more appointments and 28% higher revenue than those with limited hours.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: AI Appointment Setting */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">How AI Books Appointments</h2>
            <p className="text-slate-400 leading-8 text-lg">
              AI voice agents don't just answer calls—they're trained schedulers who know your availability, services, and booking preferences.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Real-Time Availability</h3>
                  <p className="text-sm text-slate-400">AI checks your actual calendar and offers only available slots.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Clock className="w-6 h-6 text-purple-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Service Matching</h3>
                  <p className="text-sm text-slate-400">AI understands service durations and blocks appropriate time slots.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Instant Confirmation</h3>
                  <p className="text-sm text-slate-400">Books the appointment, sends confirmation, and syncs to your calendar immediately.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 🎯 MID-ARTICLE CTA */}
          <CTASection 
            title="Your Calendar Should Be Full, Not Your Voicemail."
            subtitle="Every missed call is a missed appointment. Let AI fill those gaps while you focus on serving clients."
            primaryText="Start Booking 24/7"
            secondaryText="See Booking Case Studies"
            variant="blog"
          />

          {/* Section 3: Industry Results */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Results by Industry</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Medical Clinics</h3>
                <p className="text-slate-400 mb-4">AI handles new patient calls, insurance questions, and appointment scheduling after hours.</p>
                <div className="text-green-400 font-bold text-sm">Result: 42% increase in new patient bookings.</div>
              </div>
              
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Salons & Spas</h3>
                <p className="text-slate-400 mb-4">AI books services, explains treatments, and manages rescheduling requests 24/7.</p>
                <div className="text-green-400 font-bold text-sm">Result: 35% reduction in no-shows, 28% more bookings.</div>
              </div>
              
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Service Businesses</h3>
                <p className="text-slate-400 mb-4">AI schedules consultations, estimates, and service calls around your availability.</p>
                <div className="text-green-400 font-bold text-sm">Result: 50% more estimate appointments scheduled.</div>
              </div>
            </div>
          </section>

          {/* Section 4: Integration */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Seamless Calendar Integration</h2>
            <p className="text-slate-400 leading-8 text-lg">
              Your AI integrates with Google Calendar, Calendly, Acuity, or any scheduling system. It sees your real availability and books accordingly.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              No double bookings. No scheduling conflicts. Just a full calendar and happy clients.
            </p>
          </section>

          {/* 🎯 END-ARTICLE CTA */}
          <CTASection 
            title="Stop Losing Appointments to Voicemail."
            subtitle="Your competitors are booking clients while you sleep. It's time to level the playing field."
            primaryText="Deploy Booking AI"
            secondaryText="View Booking Case Studies"
            variant="form"
          />

        </article>
      </main>
    </div>
  );
}
