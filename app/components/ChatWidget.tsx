'use client';

import { useState } from 'react';
import { MessageSquare, X, Zap, Calendar, Phone } from 'lucide-react';
import { config } from '../../lib/config';

const FAQ_STEPS: { label: string; answer: string }[] = [
    {
        label: 'What does it cost?',
        answer: "Plans start at $497/month (Starter), $997/month (Growth), and $1,497/month (Enterprise). No setup fees, no long-term contracts — cancel anytime. A 30-day money-back guarantee covers your first month."
    },
    {
        label: 'How fast can I go live?',
        answer: 'Most businesses are answering calls within 48–72 hours of kickoff. Deeper CRM customization and script tuning continue over the following 1–2 weeks.'
    },
    {
        label: 'How does it work?',
        answer: 'We forward your missed or after-hours calls to a custom AI voice agent trained on your services, pricing, and schedule. It qualifies callers, books appointments into your calendar, and hands off true emergencies to you. Callers can always ask for a human.'
    },
    {
        label: 'Do I keep my phone number?',
        answer: 'Yes. You keep your existing number. We set up conditional call forwarding so the AI only picks up when your team can\u2019t.'
    },
    {
        label: 'Talk to a human',
        answer: 'Happy to connect you. Email ayush@brandverse.tech, call +91 88510 05278, or book a 30-minute call directly below.'
    },
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Chat Bubble Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-zinc-800 rotate-90' : 'bg-blue-600 hover:bg-blue-500'
                    }`}
            >
                {isOpen ? <X className="text-white w-8 h-8" /> : <MessageSquare className="text-white w-8 h-8" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-2rem)] bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-blue-900/40 to-slate-900/40 border-b border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="text-white w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <div className="text-white font-black text-sm uppercase tracking-widest">Brandverse</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Quick answers — typically replies in seconds</div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {selected === null ? (
                            <>
                                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none text-[13px] text-slate-300 leading-relaxed">
                                    Hi! Common questions are answered below — pick one to get an instant answer, or
                                    skip straight to booking a call.
                                </div>
                                <div className="space-y-2">
                                    {FAQ_STEPS.map((step, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelected(i)}
                                            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[13px] font-semibold text-white hover:bg-white/10 hover:border-blue-500/40 transition-all"
                                        >
                                            {step.label}
                                        </button>
                                    ))}
                                </div>
                                <a
                                    href={config.calendlyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all"
                                >
                                    <Calendar className="w-4 h-4" /> Book a Free 30-Minute Call
                                </a>
                            </>
                        ) : (
                            <>
                                <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none text-[13px] leading-relaxed font-medium">
                                    {FAQ_STEPS[selected].label}
                                </div>
                                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none text-[13px] text-slate-300 leading-relaxed">
                                    {FAQ_STEPS[selected].answer}
                                </div>
                                {selected === FAQ_STEPS.length - 1 && (
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={config.calendlyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all"
                                        >
                                            <Calendar className="w-4 h-4" /> Book a Free 30-Minute Call
                                        </a>
                                        <a
                                            href="tel:+918851005278"
                                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all"
                                        >
                                            <Phone className="w-4 h-4" /> Call +91 88510 05278
                                        </a>
                                    </div>
                                )}
                                <button
                                    onClick={() => setSelected(null)}
                                    className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    ← Back to questions
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
