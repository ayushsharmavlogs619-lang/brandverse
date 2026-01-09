'use client';

import { Bell, Wifi } from 'lucide-react';
import { usePathname } from 'next/navigation';

const breadcrumbMap: Record<string, string> = {
    '/portal': 'Overview',
    '/portal/live-pulse': 'Live Pulse',
    '/portal/call-logs': 'Call Logs',
    '/portal/roi-tracker': 'ROI Tracker',
    '/portal/settings': 'Settings',
};

export function Header() {
    const pathname = usePathname();
    const currentPage = breadcrumbMap[pathname] || 'Dashboard';

    return (
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center justify-between h-20 px-8">
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Brandverse</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-white font-black text-sm uppercase tracking-widest">{currentPage}</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_-3px_rgba(16,185,129,0.3)]">
                        <div className="relative">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-0 left-0 opacity-75" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500 relative z-10" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">System Online</span>
                    </div>

                    <button className="relative group">
                        <Bell size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-slate-950" />
                    </button>
                </div>
            </div>
        </header>
    );
}
