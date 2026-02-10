
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? "text-blue-400" : "text-slate-400 hover:text-blue-400 transition-colors";

    const navLinks = [
        { href: "/#services", label: "Digital Agents" },
        { href: "/#roi", label: "ROI Engine" },
        { href: "/portfolio", label: "Case Studies" },
        { href: "/about", label: "Manifesto" },
        { href: "/blog", label: "Intel" },
    ];

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
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={isActive(link.href)}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href="/workroom"
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-all group"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <span className="hidden xs:inline">War Room</span>
                    </Link>

                    <Link href="https://calendly.com/ayushsharmavlogs619/30min" target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-3 bg-brand-gradient text-white rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group">
                        <span className="hidden md:inline">Book Audit</span>
                        <span className="md:hidden">Book</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-[#020617] border-b border-white/10 py-8 px-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-6 text-sm font-black uppercase tracking-widest">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={isActive(link.href)}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
