import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Services — Brandverse',
  description: 'Explore Brandverse services: AI call answering, voice cloning, integrations, and white-glove onboarding to drive revenue.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-6">Services</h1>
        <p className="text-slate-400 mb-10">Comprehensive AI voice solutions tailored to your business. Below are our core service offerings and what's included with each.</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">AI Call Answering</h3>
            <p className="text-slate-400 mb-4">24/7 natural-sounding voice agents that answer, qualify, and book appointments.</p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> Live call handling</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> Call recording & transcripts</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> SMS confirmations</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Custom Voice Cloning</h3>
            <p className="text-slate-400 mb-4">We can clone a brand voice or create custom personas to match your business tone.</p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> Fast voice capture</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> Privacy-friendly storage</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> Ongoing tuning</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Integrations & Automations</h3>
            <p className="text-slate-400 mb-4">Connect your AI agent to calendars, CRMs, and dispatch systems for seamless operations.</p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> CRM & calendar sync</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> Zapier / API access</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500" /> Custom workflows</li>
            </ul>
          </div>
        </div>

        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold text-white">White-Glove Onboarding</h2>
          <p className="text-slate-400">Every customer receives a dedicated AI Architect and a step-by-step onboarding plan: discovery, script design, pilot, and scale. Our process ensures we capture the right leads and deliver measurable results fast.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-bold text-white">Discovery</h4>
              <p className="text-slate-400">We evaluate workflows, busiest times, pricing, and common objections to build high-converting scripts.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-bold text-white">Pilot</h4>
              <p className="text-slate-400">Run a limited pilot for real-world tuning and metrics collection before full rollout.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-block px-10 py-4 bg-blue-600 rounded-2xl font-black text-white">Request a Custom Quote</Link>
        </div>
      </main>
    </div>
  );
}
