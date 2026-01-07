import Link from 'next/link';
import { Cpu, Shield, Zap, Mail, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative pt-24 pb-8 px-6 bg-[#020617] text-slate-200 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="relative max-w-7xl mx-auto">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Section - Takes more space */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                                <Cpu className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xl font-black uppercase tracking-tight text-white">Brandverse</span>
                                <span className="text-xl font-light text-blue-400">.tech</span>
                            </div>
                        </div>
                        <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
                            AI-powered solutions specifically designed for Small to Medium Sized Businesses. Transform your operations with intelligent automation that works 24/7.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span>Building the systems that build businesses</span>
                        </div>
                    </div>

                    {/* Solutions Links */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-6 uppercase tracking-widest text-[11px] text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            Solutions
                        </h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/#services" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    AI Agents
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/#roi" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    ROI Calculator
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Features
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/workroom" className="group flex items-center gap-1 text-sm text-red-400/80 hover:text-red-400 transition-colors duration-200">
                                    Inner Sanctum
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-6 uppercase tracking-widest text-[11px] text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                            Company
                        </h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/about" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    About Us
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Case Studies
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Blog
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Contact
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-6 uppercase tracking-widest text-[11px] text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                            Legal
                        </h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/privacy" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Privacy Policy
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Terms & Conditions
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="group flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Cookie Policy
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold mb-6 uppercase tracking-widest text-[11px] text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            Contact
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:ayush@brandverse.tech"
                                    className="group flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-200">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>ayush@brandverse.tech</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Copyright */}
                        <p className="text-xs text-slate-500 text-center md:text-left">
                            © 2025 <span className="text-slate-400">Brandverse AI</span>. All rights reserved. Designed for SMBs worldwide.
                        </p>

                        {/* Status Indicators */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/30">
                                <Shield className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Security Audited</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/30">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Systems Online</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/30">
                                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">AI Powered</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

