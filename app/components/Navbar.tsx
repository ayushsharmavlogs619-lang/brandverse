'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/918851005278?text=Hi%20Brandverse%20-%20I%27d%20like%20to%20learn%20more';

function trackClick(label: string) {
  try {
    if (typeof window !== 'undefined' && typeof (window as any).trackConversion === 'function') {
      (window as any).trackConversion('nav_click', label);
    }
  } catch {}
}

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path ? "text-blue-400" : "hover:text-blue-400 transition-colors";

    if (pathname === '/' || pathname?.startsWith('/creators') || pathname?.startsWith('/onlyfans')) return null;

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" aria-label="Brandverse Home">
                    BRANDVERSE.TECH
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-6 md:gap-8 text-sm font-medium text-slate-200">
                    <Link href="/features" className={isActive('/features')}>Features</Link>
                    <Link href="/process" className={isActive('/process')}>Process</Link>
                    <Link href="/pricing" className={isActive('/pricing')}>Pricing</Link>
                    <Link href="/blog" className={isActive('/blog')}>Intelligence</Link>
                    <Link href="/faq" className={isActive('/faq')}>FAQ</Link>
                </div>
                
                <div className="hidden md:block">
                    <div className="flex items-center gap-3">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackClick('whatsapp_nav')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-green-500/20"
                            title="Chat on WhatsApp"
                        >
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                        <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
                            Book Demo
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-200 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#020617]/95 backdrop-blur-md border-b border-white/5">
                    <div className="px-4 py-4 space-y-3">
                        <Link 
                            href="/features" 
                            className={`block py-2 text-sm font-medium ${isActive('/features')}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link 
                            href="/process" 
                            className={`block py-2 text-sm font-medium ${isActive('/process')}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Process
                        </Link>
                        <Link 
                            href="/pricing" 
                            className={`block py-2 text-sm font-medium ${isActive('/pricing')}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link 
                            href="/blog" 
                            className={`block py-2 text-sm font-medium ${isActive('/blog')}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Intelligence
                        </Link>
                        <Link 
                            href="/faq" 
                            className={`block py-2 text-sm font-medium ${isActive('/faq')}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            FAQ
                        </Link>
                        <Link 
                            href="/contact" 
                            className="block py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all text-center mt-4"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Book Demo
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
