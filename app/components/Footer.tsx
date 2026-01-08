import Link from 'next/link';
import { Cpu, Shield, Zap } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative pt-24 pb-12 px-6 bg-[#020617] text-slate-200 overflow-hidden font-mono">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/5 rounded-full blur-[100px]" />
            </div>
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* Brand / Mission Section */}
                    <div className="md:col-span-6 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-900/20 rounded-lg flex items-center justify-center border border-blue-500/20">
                                <Cpu className="text-blue-400 w-4 h-4" />
                            </div>
                            <span className="text-lg font-black uppercase tracking-widest text-white">Brandverse</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                            We aren't a marketing agency. We are an operational engine. We build the systems that build the businesses.
                        </p>
                    </div>

                    {/* Tactical Column */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6">Tactical</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-400">
                            <li>
                                <Link href="/#services" className="hover:text-white transition-colors">AI Agents</Link>
                            </li>
                            <li>
                                <Link href="/#roi" className="hover:text-white transition-colors">ROI Engine</Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="hover:text-white transition-colors">Case Studies</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal / Contact Column */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-400">
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white hover:text-blue-400 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-widest text-slate-600">
                        © 2025 Brandverse.Tech Technologies. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Shield className="w-3 h-3 text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Audited</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Systems Live</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
