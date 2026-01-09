'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Activity,
    Database,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

const menuItems = [
    { name: 'Overview', href: '/portal', icon: Home },
    { name: 'Live Pulse', href: '/portal/live-pulse', icon: Activity },
    { name: 'Call Logs', href: '/portal/call-logs', icon: Database },
    { name: 'ROI Tracker', href: '/portal/roi-tracker', icon: TrendingUp },
    { name: 'Settings', href: '/portal/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <aside
                className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-white/10 backdrop-blur-md transition-transform duration-300 z-30 flex flex-col`}
            >
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-black tracking-widest bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                        BRANDVERSE
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-widest">Client Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'text-blue-400' : 'group-hover:text-white transition-colors'} />
                                <span className="text-sm font-bold uppercase tracking-wide">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-lg shadow-lg">
                            👨‍💼
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">John Doe</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Doe HVAC</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold uppercase tracking-widest transition-colors">
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
