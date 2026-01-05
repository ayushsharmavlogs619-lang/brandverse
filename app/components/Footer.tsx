
import { Shield, Zap } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-[#020617] text-center">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    BRANDVERSE.TECH / AI-powered solutions / © 2025
                </p>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">Security Audited <Shield className="w-3 h-3" /></span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">Systems Live <Zap className="w-3 h-3 text-green-500 fill-green-500/20" /></span>
                </div>
            </div>
        </footer>
    );
}
