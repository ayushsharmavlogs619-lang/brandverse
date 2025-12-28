'use client';

import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32">
        {/* Tier Header */}
        <section className="text-center space-y-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Investment Structure
          </div>
          <h1 className="text-6xl md:text-[9.5rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic text-glow-blue">
            Scale Your <br />
            <span className="text-blue-500">Output.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-bold leading-relaxed">
            Transparent, performance-driven pricing built for businesses that demand <span className="text-blue-400">absolute efficiency</span>.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="grid md:grid-cols-3 gap-8">
          <h2 className="sr-only">Strategic Tier Modules</h2>
          {[
            {
              name: "Starter Protocol",
              price: "850",
              desc: "Engineered for local dominance.",
              features: ["1 AI Voice Agent", "500 Minutes Included", "Standard CRM Sync", "Email Support", "Business Hours Coverage"],
              cta: "Initiate Starter",
              popular: false
            },
            {
              name: "Growth Engine",
              price: "1,950",
              desc: "The industry standard for scaling.",
              features: ["3 AI Voice Agents", "1,500 Minutes Included", "Priority CRM Injection", "24/7/365 Deployment", "Emergency Triage Logic", "Sentiment Analysis"],
              cta: "Launch Growth",
              popular: true
            },
            {
              name: "Enterprise Core",
              price: "Custom",
              desc: "Maximum operational velocity.",
              features: ["Unlimited Voice Agents", "Custom Minute Volume", "Full API Integration", "Dedicated AI Architect", "White-Glove Onboarding", "Custom System Training"],
              cta: "Deploy Enterprise",
              popular: false
            }
          ].map((tier, i) => (
            <article key={i} className={`p-10 md:p-12 rounded-[3.5rem] bg-[#020617] border relative overflow-hidden transition-all hover:scale-[1.02] ${tier.popular ? 'border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20' : 'border-white/5 hover:border-white/20'}`}>
              {tier.popular && (
                <div className="absolute top-10 right-10 bg-blue-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic animate-pulse shadow-2xl">Most ROI</div>
              )}

              <div className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <h3 className={`text-xs font-black uppercase tracking-[0.3em] ${tier.popular ? 'text-blue-400' : 'text-slate-500'}`}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-white italic tracking-tighter">{tier.price === 'Custom' ? '' : '$'}{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-slate-500 font-bold text-sm">/mo</span>}
                  </div>
                  <p className="text-slate-400 font-bold text-base leading-snug">{tier.desc}</p>
                </div>

                <div className="space-y-6 pt-10 border-t border-white/5">
                  <h4 className="sr-only">Inclusions</h4>
                  {tier.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${tier.popular ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 font-bold text-sm tracking-tight">{f}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${tier.popular ? 'bg-brand-gradient text-white shadow-2xl shadow-blue-500/30' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                  {tier.cta} <Zap className={`w-4 h-4 ${tier.popular ? 'fill-current' : ''}`} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Satisfaction Block */}
        <section className="max-w-4xl mx-auto p-16 md:p-20 rounded-[4rem] bg-[#020617] border border-white/5 text-center space-y-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 blur-[100px] -z-10 group-hover:bg-blue-600/10 transition-colors" />
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">The Efficiency <span className="text-blue-500">Guarantee.</span></h2>
          <p className="text-slate-400 text-xl font-bold leading-relaxed max-w-2xl mx-auto">
            We are so confident in our AI systems that we offer a <span className="text-blue-400">30-day performance audit</span>. If your business doesn't see a measurable increase in operational speed, we'll refund your setup fee.
          </p>
          <div className="pt-8 border-t border-white/5">
            <h3 className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">Operational Security Protocol Secured</h3>
          </div>
        </section>
      </main>
    </div>
  );
}
