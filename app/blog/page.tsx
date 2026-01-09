'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Clock, ArrowUpRight } from 'lucide-react';

const posts = [
  {
    title: "The 7-Day Sprint: From Zero to AI Deployed",
    excerpt: "Think AI is complicated? We deploy enterprise-grade voice agents in 7 days or less. Here is the exact roadmap we use.",
    date: "Jan 10, 2026",
    readTime: "4 min read",
    slug: "implementation-blueprint",
    category: "Execution"
  },
  {
    title: "Shocking Efficiency: Why Top Electricians Are Automating",
    excerpt: "Emergency electrical work is a high-margin game, but only if you answer the phone. See how AI helps electricians scale to $1M+.",
    date: "Jan 09, 2026",
    readTime: "5 min read",
    slug: "electrician-ai-dispatch",
    category: "Trades"
  },
  {
    title: "The AI Inside Sales Agent (ISA): Reclaiming Real Estate Time",
    excerpt: "Realtors spend 3 hours a day cold calling. An AI ISA does it 24/7 for a fraction of the commission split.",
    date: "Jan 08, 2026",
    readTime: "6 min read",
    slug: "real-estate-ai-voice",
    category: "Real Estate"
  },
  {
    title: "Case Study: How HVAC Companies Add $10k/mo with AI",
    excerpt: "A breakdown of how a local HVAC business automated dispatch and booking, resulting in a 40% increase in revenue during peak season.",
    date: "Jan 07, 2026",
    readTime: "5 min read",
    slug: "hvac-automation-guide",
    category: "Case Study"
  },
  {
    title: "The Midnight Economy: Capturing Revenue While You Sleep",
    excerpt: "40% of service bookings happen after 5 PM. If your phone goes to voicemail at 5:01 PM, you are donating customers to your competition.",
    date: "Jan 06, 2026",
    readTime: "4 min read",
    slug: "after-hours-revenue",
    category: "Operations"
  },
  {
    title: "The 'Human Touch' Fallacy: Why Customers Actually Prefer AI",
    excerpt: "Business owners obsession with 'sounding human' is costing them deals. Customers don't want a friend; they want a solution.",
    date: "Jan 05, 2026",
    readTime: "5 min read",
    slug: "human-touch-fallacy",
    category: "Psychology"
  },
  {
    title: "Speed to Lead: Why 5 Minutes is Too Slow in 2026",
    excerpt: "The old '5-minute rule' is dead. In the age of AI, if you don't respond in 10 seconds, you lose the deal.",
    date: "Jan 04, 2026",
    readTime: "3 min read",
    slug: "speed-to-lead-2026",
    category: "Tactics"
  },
  {
    title: "AI Voice Agents vs. Virtual Assistants: The ROI Cage Match",
    excerpt: "We compared the cost, efficiency, and reliability of hiring human VAs versus deploying Brandverse AI. The winner wasn't even close.",
    date: "Jan 03, 2026",
    readTime: "7 min read",
    slug: "ai-vs-va-roi",
    category: "Comparison"
  },
  {
    title: "Stop Bleeding Revenue: The True Cost of Missed Calls",
    excerpt: "62% of calls to small businesses go unanswered. Learn how to calculate exactly how much revenue you are losing every single month.",
    date: "Jan 02, 2026",
    readTime: "4 min read",
    slug: "cost-of-missed-calls",
    category: "Finance"
  },
  {
    title: "The 2026 Automation Mandate: Adapt or Die",
    excerpt: "Why 2026 is the extinction event for manual service businesses, and how AI voice agents are the only lifeboat left.",
    date: "Jan 01, 2026",
    readTime: "6 min read",
    slug: "2026-automation-mandate",
    category: "Strategy"
  },
  {
    title: "Why Your Sales Team Doesn't Sleep (And Yours Shouldn't Either)",
    excerpt: "How 24/7 AI availability transforms lead conversion rates and customer satisfaction scores overnight.",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    slug: "24-7-sales-team-blueprint",
    category: "Sales"
  },
  {
    title: "The Silent Killer of SMB Growth: Manual Admin",
    excerpt: "How much time are you wasting on tasks that a machine could do instantly? We break down the hidden costs.",
    date: "Dec 28, 2025",
    readTime: "4 min read",
    slug: "hidden-cost-manual-admin",
    category: "Operations"
  }
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      <main className="py-32 px-6 max-w-7xl mx-auto space-y-24">
        <header className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Intelligence Hub
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
            Tactical <span className="text-blue-500 text-glow-blue">Briefings.</span>
          </h1>
          <p className="text-xl text-slate-400 font-bold leading-relaxed">
            Declassified strategies for business automation, AI deployment, and market dominance.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col h-full p-8 rounded-[2.5rem] bg-[#020617] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors rounded-[2.5rem]" />

              <div className="relative z-10 flex flex-col h-full space-y-6">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                    {post.category}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center -mr-2 -mt-2 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="space-y-4 flex-grow">
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
