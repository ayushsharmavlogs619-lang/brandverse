'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import CTASection from '../../components/CTASection';

export default function Post() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* Article Header */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/10 blur-[100px] rounded-full -z-10" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-red-400">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>
            <span className="text-slate-600">•</span>
            <span>Emergency Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            When Every Second Counts: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Emergency Response Automation</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
            For plumbers, HVAC techs, and emergency clinics—missing an after-hours call isn't just lost revenue, it's a customer in crisis. Here's how AI voice agents handle emergencies 24/7.
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

          {/* Section 1: The Emergency Problem */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">The 2 AM Crisis</h2>
            <p className="text-slate-400 leading-8 text-lg">
              It's 2:17 AM. A pipe bursts. The AC dies in July. A patient has an allergic reaction. They call your business.
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              If nobody picks up, they don't leave a voicemail. They call the next number on Google. And you've lost a customer for life—not just tonight's job.
            </p>
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4 items-start">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-400 mb-2">The Emergency Call Reality</h3>
                <p className="text-sm text-red-200/60 leading-relaxed">
                  Emergency service businesses lose 40-60% of after-hours calls to competitors simply because nobody answered the phone.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: AI Emergency Handling */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">How AI Handles Emergencies</h2>
            <p className="text-slate-400 leading-8 text-lg">
              AI voice agents aren't just answering machines—they're trained emergency dispatchers who know your business, your services, and your escalation protocols.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <Clock className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Instant Response</h3>
                  <p className="text-sm text-slate-400">Zero ring time. The AI answers on the first ring, every time, 24/7/365.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Triage & Qualification</h3>
                  <p className="text-sm text-slate-400">AI assesses urgency, collects key details, and determines if it's a true emergency.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Smart Escalation</h3>
                  <p className="text-sm text-slate-400">True emergencies trigger immediate calls to your on-call technician or doctor.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 🎯 MID-ARTICLE CTA */}
          <CTASection 
            title="Your Emergency Line Should Never Go to Voicemail."
            subtitle="Every missed emergency call is a customer who needed you NOW. Let's make sure they always reach you."
            primaryText="Secure My 24/7 Line"
            secondaryText="See Emergency Case Studies"
            variant="blog"
          />

          {/* Section 3: Real Emergency Scenarios */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Real Scenarios, Real Results</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Scenario 1: Burst Pipe at 3 AM</h3>
                <p className="text-slate-400 mb-4">Customer calls frantic about water damage. AI answers immediately, assesses severity, collects address, and dispatches the on-call plumber within 2 minutes.</p>
                <div className="text-green-400 font-bold text-sm">Result: $3,200 emergency job saved, customer for life.</div>
              </div>
              
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Scenario 2: AC Failure in Heatwave</h3>
                <p className="text-slate-400 mb-4">Family with elderly parent calls at 11 PM. AI schedules priority appointment for next morning, texts confirmation, and adds to emergency queue.</p>
                <div className="text-green-400 font-bold text-sm">Result: $1,800 job secured, 5-star review.</div>
              </div>
              
              <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
                <h3 className="font-bold text-white mb-3">Scenario 3: Dental Emergency</h3>
                <p className="text-slate-400 mb-4">Patient with tooth pain calls after hours. AI triages pain level, collects insurance info, and schedules next-day emergency slot.</p>
                <div className="text-green-400 font-bold text-sm">Result: $450 emergency treatment, patient retention.</div>
              </div>
            </div>
          </section>

          {/* Section 4: Implementation */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Deploy Your Emergency AI in 48 Hours</h2>
            <p className="text-slate-400 leading-8 text-lg">
              We train your AI on your specific emergency protocols, services, and escalation rules. It learns the difference between "can you come Tuesday?" and "my house is flooding."
            </p>
            <p className="text-slate-400 leading-8 text-lg">
              After-hours and emergency calls typically carry the highest job values — capturing them consistently is where the biggest revenue upside is.
            </p>
          </section>

          {/* 🎯 END-ARTICLE CTA */}
          <CTASection 
            title="Don't Let Another Emergency Call Go to Voicemail."
            subtitle="Your customers are calling you in crises. Make sure someone is always there to answer."
            primaryText="Deploy Emergency AI"
            secondaryText="View Emergency Case Studies"
            variant="form"
          />

        </article>
      </main>
    </div>
  );
}
