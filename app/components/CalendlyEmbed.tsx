'use client';

import { useSyncExternalStore } from 'react';
import { Calendar, Loader2 } from 'lucide-react';

const subscribe = () => () => {};

export default function CalendlyEmbed({ url }: { url?: string }) {
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    );
    const base = url || 'https://calendly.com/ayushsharmavlogs619/30min';
    const calendlyUrl = `${base}${base.includes('?') ? '&' : '?'}embed_type=Inline&hide_gdpr_banner=1`;

    if (!mounted) return null;

    return (
        <div className="w-full min-h-[700px] relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {!url ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#020617] z-10">
                    <Calendar className="w-16 h-16 text-slate-700 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Scheduling System Offline</h3>
                    <p className="text-slate-400 max-w-md">
                        The scheduling link hasn't been configured yet.
                        <br />
                        <span className="text-xs font-mono text-slate-600 mt-4 block">
                            Admin: Pass Calendly URL as prop to this component
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