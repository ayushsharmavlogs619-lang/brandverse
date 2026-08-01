'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  CalendarClock,
  FileText,
  MessagesSquare,
  PhoneCall,
  ScrollText,
  StickyNote,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

const TOOLS: { href: string; title: string; blurb: string; icon: LucideIcon; accent: string }[] = [
  {
    href: '/sales/proposals',
    title: 'Proposal Generator',
    blurb: 'Branded, print-ready proposals with pricing tables, terms, and signature blocks.',
    icon: FileText,
    accent: 'from-blue-600 to-blue-400',
  },
  {
    href: '/sales/roi',
    title: 'ROI Calculator',
    blurb: 'Missed calls × lead value → yearly revenue recovered. The math that closes deals.',
    icon: Calculator,
    accent: 'from-emerald-600 to-emerald-400',
  },
  {
    href: '/sales/objections',
    title: 'Objection Library',
    blurb: 'Store every objection you hear and generate tailored responses by category.',
    icon: MessagesSquare,
    accent: 'from-red-600 to-pink-500',
  },
  {
    href: '/sales/demo-scripts',
    title: 'Demo Script Generator',
    blurb: 'Structured discovery + live demo scripts, ready for any prospect.',
    icon: PhoneCall,
    accent: 'from-purple-600 to-purple-400',
  },
  {
    href: '/sales/contracts',
    title: 'Contract Generator',
    blurb: 'Service agreements with fees, term, IP, cancellation, and liability clauses.',
    icon: ScrollText,
    accent: 'from-cyan-600 to-cyan-400',
  },
  {
    href: '/sales/pricing',
    title: 'Pricing Calculator',
    blurb: 'Line-item pricing with monthly/annual totals and discount modeling.',
    icon: Wallet,
    accent: 'from-amber-600 to-amber-400',
  },
  {
    href: '/sales/discovery',
    title: 'Discovery Call Notes',
    blurb: 'Structured intake notes: pain points, budget, timeline, decision makers.',
    icon: StickyNote,
    accent: 'from-fuchsia-600 to-pink-400',
  },
  {
    href: '/sales/followups',
    title: 'Follow-up Scheduler',
    blurb: 'Never drop a deal: schedule follow-ups and track them to close.',
    icon: CalendarClock,
    accent: 'from-indigo-600 to-blue-400',
  },
];

export default function SalesHubPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Brandverse <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Sales System</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Everything you need to move prospects from call to contract.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOOLS.map(({ href, title, blurb, icon: Icon, accent }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 hover:border-white/25 hover:bg-[#0d0d13] transition-all hover:-translate-y-0.5"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-lg mb-4 group-hover:scale-105 transition-transform`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="font-bold">{title}</h2>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">{blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
