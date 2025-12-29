'use client';

import { useEffect, useState } from 'react';
import { Calendar, Loader2 } from 'lucide-react';

export default function CalendlyEmbed({ url }: { url?: string }) {
    const [mounted, setMounted] = useState(false);
    const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username/30min';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full min-h-[700px] relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {!process.env.NEXT_PUBLIC_CALENDLY_URL && !url ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#020617] z-10">
                    <Calendar className="w-16 h-16 text-slate-700 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Scheduling System Offline</h3>
                    <p className="text-slate-400 max-w-md">
                        The scheduling link hasn't been configured yet.
                        <br />
                        <span className="text-xs font-mono text-slate-600 mt-4 block">
                            Admin: Add NEXT_PUBLIC_CALENDLY_URL to .env.local
                        </span>
                    </p>
                </div>
            ) : (
                <>
                    <iframe
                        src={calendlyUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                </>
            )}
        </div>
    );
}
