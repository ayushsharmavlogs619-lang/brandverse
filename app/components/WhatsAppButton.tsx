'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '+918851005278';

export default function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=Hi%20Brandverse%20-%20I%27d%20like%20to%20learn%20more%20about%20AI%20voice%20agents%20for%20my%20business.`;
        window.open(url, '_blank');
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'whatsapp_click', {
                event_category: 'Acquisition',
                event_label: 'WhatsApp CTA',
                value: 1,
            });
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
                aria-label="Chat on WhatsApp"
                title="Chat with us on WhatsApp"
            >
                <MessageCircle className="w-7 h-7 text-white" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 bg-green-400 border-2 border-[#020617] rounded-full animate-pulse" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-[91] flex items-center justify-end p-4">
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white font-bold text-sm">WhatsApp</span>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-slate-300 text-sm mb-4">Quick message us on WhatsApp for a fast response.</p>
                        <button
                            onClick={() => { handleClick(); setIsOpen(false); }}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                            Open WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
