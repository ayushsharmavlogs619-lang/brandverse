'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Calculator,
  CalendarClock,
  FileText,
  Globe,
  LayoutDashboard,
  Mail,
  MessagesSquare,
  PhoneCall,
  ScrollText,
  StickyNote,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  file: FileText,
  calc: Calculator,
  messages: MessagesSquare,
  phone: PhoneCall,
  scroll: ScrollText,
  note: StickyNote,
  clock: CalendarClock,
  building: Building2,
  globe: Globe,
  mail: Mail,
};

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export default function SystemNav({
  brand,
  subtitle,
  accent,
  items,
  base,
}: {
  brand: string;
  subtitle: string;
  accent: string; // tailwind gradient classes, e.g. "from-blue-600 to-purple-600"
  items: NavItem[];
  base: string;
}) {
  const pathname = usePathname();
  const LogoIcon = ICONS[items[0].icon] ?? LayoutDashboard;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-14 flex items-center gap-4">
        <Link href={base} className="flex items-center gap-2.5 group shrink-0">
          <div
            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accent} flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform`}
          >
            <LogoIcon className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight">
              BRANDVERSE <span className="text-blue-400">{brand}</span>
            </p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{subtitle}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide ml-auto">
          {items.map(({ href, label, icon }) => {
            const Icon = ICONS[icon] ?? LayoutDashboard;
            const active = pathname === href || (href !== base && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  active
                    ? `bg-gradient-to-r ${accent} text-white shadow-lg shadow-blue-600/25`
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
