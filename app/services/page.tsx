import Link from 'next/link';
import { MessageCircle, Mic, Target, Check, ArrowRight, Zap } from 'lucide-react';

export const metadata = {
  title: 'Services — Brandverse',
  description: 'AI chatbots, AI voice agents, and paid ads management. Three ways to grow your business on autopilot.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-blue-500/30">
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6">Three Ways to Grow</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Every service we offer has one goal: make you more money than you pay us.
            Pick one, two, or all three. The math works every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-8 mb-24">

          {/* AI Chatbot */}
          <section className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-blue-500/10 hover:border-blue-500/20 transition-all">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                  <MessageCircle className="w-3 h-3" />
                  AI Chatbot
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  Your Website, Answering Questions 24/7
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Visitors have questions. If they can&apos;t find answers in 10 seconds, they leave.
                  Our AI chatbot is trained on your website content—docs, FAQs, product pages—and
                  answers instantly in natural language. Support tickets drop. Conversions rise.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Live in under 10 minutes", "No coding required", "60% reduction in support tickets", "Captures leads automatically", "Escalates to humans when needed"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all">
                  Get AI Chatbot <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-[#12121a] rounded-xl border border-white/10 p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-end"><div className="bg-blue-600 text-white px-4 py-2 rounded-xl">What&apos;s your return policy?</div></div>
                  <div className="flex gap-2"><div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0"></div><div className="bg-white/5 text-slate-200 px-4 py-2 rounded-xl">We offer 30-day returns on all items. Would you like me to start a return request?</div></div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Voice Agent */}
          <section className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-green-500/10 hover:border-green-500/20 transition-all">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-[#12121a] rounded-xl border border-white/10 p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0"></div>
                    <div className="bg-white/5 text-slate-200 px-4 py-2 rounded-xl">&quot;I need a plumber tomorrow morning.&quot;</div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex-shrink-0"></div>
                    <div className="bg-green-600/10 border border-green-500/20 text-slate-200 px-4 py-2 rounded-xl">&quot;I have 9 AM and 11 AM available. Which works better for you?&quot;</div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6">
                  <Mic className="w-3 h-3" />
                  AI Voice Agent
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  Every Call Answered. Every Lead Captured.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Missed calls = missed money. Our AI voice agents answer every call in under 2 rings,
                  24/7/365. They sound human, book appointments, qualify leads, and sync with your
                  calendar and CRM. No sick days. No attitude. Just results.
                </p>
                <ul className="space-y-3 mb-8">
                  {["24/7/365 availability", "Books directly into your calendar", "CRM integration (Salesforce, HubSpot, etc.)", "Custom voice and personality", "Handles unlimited concurrent calls"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-all">
                  Get Voice Agent <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* SMMA / Paid Ads */}
          <section className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/20 transition-all">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
                  <Target className="w-3 h-3" />
                  Paid Ads (SMMA)
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  We Run Ads. You Count Money.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Pay us $1,000/month. We run your Meta, Google, and TikTok ads. You make $6,000-$13,000+ back.
                  That&apos;s not a promise—that&apos;s what our clients actually see. You own the ad accounts.
                  You see every dollar spent. Complete transparency.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Meta, Google & TikTok ads", "$1K/mo → $6-13K+ returns (real client results)", "You own all ad accounts", "Transparent reporting dashboard", "No long-term contracts"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all">
                  Get SMMA <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-[#12121a] rounded-xl border border-white/10 p-8">
                <h3 className="text-lg font-semibold text-white mb-6">Real Client Results</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-slate-400">Monthly Investment</span>
                    <span className="text-2xl font-bold text-white">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-slate-400">Monthly Returns</span>
                    <span className="text-2xl font-bold text-green-400">$6,000 - $13,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">ROI Multiple</span>
                    <span className="text-2xl font-bold text-purple-400">6-13x</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Why Clients Stay */}
        <section className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Why Clients Stay For Years
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            We don&apos;t do one-off projects. We build long-term relationships because
            when the math works, nobody wants to leave. Our job is to make you more than you pay us—every single month.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: "6-13x", label: "Average client ROI" },
              { metric: "93%", label: "Client retention rate" },
              { metric: "48hrs", label: "Average response time" }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.metric}</div>
                <div className="text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 rounded-2xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 border border-white/5">
          <h2 className="text-3xl font-semibold text-white mb-4">Ready to Stop Leaving Money on the Table?</h2>
          <p className="text-slate-400 mb-8">Pick the service that fits. We&apos;ll handle the rest.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-lg transition-all">
            Let&apos;s Talk <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

      </main>
    </div>
  );
}
