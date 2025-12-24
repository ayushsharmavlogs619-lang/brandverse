'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? "text-blue-400" : "hover:text-blue-400 transition-colors";

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    BRANDVERSE.TECH
                </Link>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-200">
                    <Link href="/features" className={isActive('/features')}>Features</Link>
                    <Link href="/process" className={isActive('/process')}>Process</Link>
                    <Link href="/pricing" className={isActive('/pricing')}>Pricing</Link>
                    <Link href="/faq" className={isActive('/faq')}>FAQ</Link>
                </div>
                <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
                    Book Demo
                </Link>
            </div>
        </nav>
    );
}
