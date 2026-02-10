'use client';

import { Check, MessageCircle, Mic, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto">

        {/* Header */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6">Simple Pricing. Real Results.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            No hidden fees. No per-message charges. Just flat rates and undeniable ROI.
          </p>
        </section>

        {/* AI Products Pricing */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-white mb-8">AI Products</h2>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Starter */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <p className="text-slate-500 text-sm mb-6">For small teams getting started</p>
              <div className="text-4xl font-bold text-white mb-6">$497<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["AI Chatbot OR Voice Agent", "1 Website / Phone Line", "5,000 messages included", "Email support", "Basic analytics"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-blue-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
                Get Started
              </Link>
            </div>

            {/* Growth - Featured */}
            <div className="p-8 rounded-2xl bg-blue-600 border border-blue-400 shadow-lg shadow-blue-600/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-blue-600 text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Growth</h3>
              <p className="text-blue-200 text-sm mb-6">For scaling businesses</p>
              <div className="text-4xl font-bold text-white mb-6">$997<span className="text-lg text-blue-200 font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["AI Chatbot + Voice Agent", "3 Websites / Phone Lines", "Unlimited messages", "CRM integrations", "Priority support", "Advanced analytics"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-sm">
                    <Check className="w-4 h-4" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center rounded-xl bg-white text-blue-600 font-medium hover:bg-blue-50 transition-all">
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <p className="text-slate-500 text-sm mb-6">For large organizations</p>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-3 mb-8">
                {["Everything in Growth", "Unlimited sites & lines", "Custom integrations", "Dedicated account manager", "SLA guarantees", "White-label options"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-blue-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* SMMA Pricing */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-white mb-8">Paid Ads Management (SMMA)</h2>
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-600/10 to-transparent border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
                  <Target className="w-3 h-3" />
                  Highest ROI Service
                </div>
                <h3 className="text-3xl font-semibold text-white mb-4">$1,000/month</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  We manage your Meta, Google & TikTok ads. You pay your ad spend directly to the platforms.
                  We handle strategy, creative, optimization, and reporting.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Full management of Meta, Google & TikTok ads",
                    "You own all ad accounts (full transparency)",
                    "Weekly performance reports",
                    "Unlimited creative iterations",
                    "No long-term contracts"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-purple-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all">
                  Get Started with SMMA <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-[#12121a] rounded-xl border border-white/10 p-8">
                <h4 className="text-lg font-semibold text-white mb-6">Real Client Results</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-slate-400">You Pay Us</span>
                    <span className="text-2xl font-bold text-white">$1,000/mo</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-slate-400">You Make Back</span>
                    <span className="text-2xl font-bold text-green-400">$6,000 - $13,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Your ROI</span>
                    <span className="text-2xl font-bold text-purple-400">6-13x</span>
                  </div>
                </div>
                <p className="mt-6 text-slate-500 text-sm">
                  *Based on real results from a dental practice client.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-white mb-8">Common Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "What's the difference between message-based and unlimited?", a: "Starter plans have a message cap. Growth and above are truly unlimited—no surprises." },
              { q: "Can I switch plans later?", a: "Yes. Upgrade or downgrade anytime. Changes take effect on your next billing cycle." },
              { q: "What's included in ad spend?", a: "Your ad spend goes directly to Meta/Google/TikTok. We charge $1K/mo flat for management." },
              { q: "Is there a setup fee?", a: "No setup fees. No hidden costs. The price you see is the price you pay." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 rounded-2xl bg-white/[0.02] border border-white/5">
          <h2 className="text-3xl font-semibold text-white mb-4">Not Sure Which Plan?</h2>
          <p className="text-slate-400 mb-8">Let's talk. We'll figure out what makes sense for your business.</p>
          <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-lg transition-all">
            Schedule a Call <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

      </main>
    </div>
  );
}
