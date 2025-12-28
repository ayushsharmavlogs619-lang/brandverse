'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? "text-blue-400" : "text-slate-400 hover:text-blue-400 transition-colors";

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 h-20">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <Cpu className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter text-white">Brandverse</span>
                </Link>

                <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest">
                    <Link href="/#services" className={isActive('/#services')}>Digital Agents</Link>
                    <Link href="/#roi" className={isActive('/#roi')}>ROI Engine</Link>
                    <Link href="/portfolio" className={isActive('/portfolio')}>Case Studies</Link>
                    <Link href="/about" className={isActive('/about')}>Manifesto</Link>
                    <Link href="/blog" className={isActive('/blog')}>Intel</Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="/workroom"
                        className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-all group"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        War Room
                    </Link>

                    <Link href="/contact" className="px-6 py-3 bg-brand-gradient text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group">
                        Book Audit
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

