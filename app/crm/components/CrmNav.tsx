'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, Users, Zap } from 'lucide-react';

const LINKS = [
  { href: '/crm', label: 'Pipeline', icon: Users },
  { href: '/crm/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/crm/outreach', label: 'Follow-up Generator', icon: Zap },
];

export default function CrmNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
        <Link href="/crm" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight">
              BRANDVERSE <span className="text-blue-400">CRM</span>
            </p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Creator Outreach Engine
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 bg-zinc-900/60 border border-white/5 rounded-full p-1">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href === '/crm' && pathname.startsWith('/crm/creator'));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
