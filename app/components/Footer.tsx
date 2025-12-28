import Link from 'next/link';
import { Cpu, Shield, Zap } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-[#020617] text-slate-200">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
                <div className="md:col-span-2 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center">
                            <Cpu className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-black uppercase tracking-tighter text-white">Brandverse</span>
                    </div>
                    <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
                        We aren't a marketing agency. We are an operational engine. We build the systems that build the businesses.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px] text-slate-500">Tactical</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><Link href="/#services" className="text-slate-400 hover:text-blue-400">AI Agents</Link></li>
                        <li><Link href="/#roi" className="text-slate-400 hover:text-blue-400">ROI Engine</Link></li>
                        <li><Link href="/portfolio" className="text-slate-400 hover:text-blue-400">Case Studies</Link></li>
                        <li><Link href="/workroom" className="text-red-500/80 hover:text-red-400">Inner Sanctum</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px] text-slate-500">Legal</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><Link href="/privacy" className="text-slate-400 hover:text-blue-400 font-bold uppercase tracking-tighter">Privacy Policy</Link></li>
                        <li><Link href="/cookies" className="text-slate-400 hover:text-blue-400 font-bold uppercase tracking-tighter">Cookies Audit</Link></li>
                        <li><Link href="/terms" className="text-slate-400 hover:text-blue-400 font-bold uppercase tracking-tighter">Terms & Conditions</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    © 2025 Brandverse.Tech Technologies. All rights reserved.
                </p>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1.5">Security Audited <Shield className="w-3 h-3" /></span>
                    <span className="flex items-center gap-1.5">Systems Live <Zap className="w-3 h-3 text-green-500" /></span>
                </div>
            </div>
        </footer>
    );
}

