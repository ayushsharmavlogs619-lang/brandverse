'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { config } from '@/lib/config';
import {
    ArrowLeft, Phone, PhoneOff, Mic, MicOff, Calendar, Clock, User, MessageSquare,
    ChevronRight, Zap, CheckCircle2, ArrowRight, Play, Pause, Volume2, Building2,
} from 'lucide-react';

interface Message {
    role: 'ai' | 'caller' | 'system';
    text: string;
    delay?: number;
}

interface Scenario {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    messages: Message[];
}

const scenarios: Scenario[] = [
    {
        id: 'appointment',
        title: 'Appointment Booking',
        icon: <Calendar className="w-5 h-5" />,
        description: 'Watch how the AI books a service appointment naturally.',
        messages: [
            { role: 'system', text: '📞 Incoming call from Sarah Johnson...', delay: 500 },
            { role: 'caller', text: 'Hi, I need to schedule an HVAC tune-up for my home.', delay: 1500 },
            { role: 'ai', text: 'I can help with that! Let me pull up the next available appointments. May I have your full name please?', delay: 1000 },
            { role: 'caller', text: 'Sarah Johnson.', delay: 1200 },
            { role: 'ai', text: 'Thanks Sarah! I have openings this Thursday at 2 PM or Friday at 10 AM. Which works better for you?', delay: 1000 },
            { role: 'caller', text: 'Friday at 10 AM sounds perfect.', delay: 1200 },
            { role: 'ai', text: 'Excellent! I have you booked for Friday at 10 AM for a standard HVAC tune-up. You will receive a confirmation text shortly. Is there anything else I can help with?', delay: 1500 },
            { role: 'caller', text: 'No, that is all. Thank you!', delay: 1000 },
            { role: 'ai', text: 'You are welcome, Sarah! Have a great day. 👋', delay: 800 },
            { role: 'system', text: '✅ Appointment booked automatically. Calendar synced. SMS confirmation sent.', delay: 500 },
        ],
    },
    {
        id: 'lead-qualification',
        title: 'Lead Qualification',
        icon: <User className="w-5 h-5" />,
        description: 'See how the AI qualifies leads before routing.',
        messages: [
            { role: 'system', text: '📞 Incoming call from Mike Chen...', delay: 500 },
            { role: 'caller', text: 'Yeah, I am looking to get some electrical work done at my restaurant.', delay: 1500 },
            { role: 'ai', text: 'I would be happy to help! Could you tell me a bit about the project so I can connect you with the right electrician?', delay: 1000 },
            { role: 'caller', text: 'We are remodeling our kitchen and need new wiring, outlets, and lighting fixtures installed.', delay: 1200 },
            { role: 'ai', text: 'Great, that sounds like a commercial electrical project. What is the approximate size of your restaurant space?', delay: 1000 },
            { role: 'caller', text: 'About 2,000 square feet.', delay: 1200 },
            { role: 'ai', text: 'Perfect. I have your details — commercial kitchen rewiring, 2,000 sq ft. Your estimated project range is $4,000–$8,000. I will have our commercial team specialist call you back within 30 minutes. Does that work?', delay: 1500 },
            { role: 'caller', text: 'That works, thanks!', delay: 1000 },
            { role: 'ai', text: 'You are welcome, Mike! Your lead has been prioritized as "high value — commercial." Talk soon!', delay: 1000 },
            { role: 'system', text: '✅ Lead qualified: Commercial | Value: $4k–$8k | Priority: High. Routed to specialist.', delay: 500 },
        ],
    },
    {
        id: 'faq',
        title: 'FAQ & Information',
        icon: <MessageSquare className="w-5 h-5" />,
        description: 'Observe the AI answering detailed service questions.',
        messages: [
            { role: 'system', text: '📞 Incoming call from David Park...', delay: 500 },
            { role: 'caller', text: 'Hey, I am wondering — what is the typical cost to replace a water heater, and how long does it take?', delay: 1500 },
            { role: 'ai', text: 'Great question! A standard water heater replacement typically costs between $800 and $1,500 depending on the unit type and labor. The installation itself usually takes 2 to 4 hours.', delay: 1000 },
            { role: 'caller', text: 'Okay, and do you offer financing options?', delay: 1200 },
            { role: 'ai', text: 'Yes, we do offer financing through our partners. We have 0% APR options for qualified customers and flexible payment plans. Would you like me to check your eligibility?', delay: 1000 },
            { role: 'caller', text: 'Sure, that would be helpful.', delay: 1000 },
            { role: 'ai', text: 'I will have our financing specialist reach out within an hour with personalized options. In the meantime, would you like to schedule a free estimate?', delay: 1200 },
            { role: 'caller', text: 'Yes, let us do that.', delay: 1000 },
            { role: 'ai', text: 'I have you down for tomorrow at 2 PM. Confirmation is on its way to your phone!', delay: 1000 },
            { role: 'system', text: '✅ FAQ answered. Financing eligibility checked. Estimate scheduled.', delay: 500 },
        ],
    },
    {
        id: 'missed-call',
        title: 'Missed Call Recovery',
        icon: <Phone className="w-5 h-5" />,
        description: 'Watch the AI recover a missed after-hours call.',
        messages: [
            { role: 'system', text: '📞 After-hours call (9:47 PM) — incoming from Emily Torres...', delay: 500 },
            { role: 'caller', text: 'Oh thank goodness someone answered! Our basement is flooding — our pipe burst and water is everywhere!', delay: 1500 },
            { role: 'ai', text: 'I understand this is urgent. Let me help you right away. First, do you have a shut-off valve you can access? If so, please turn off the main water supply.', delay: 800 },
            { role: 'caller', text: 'I found it! Okay, water is off now.', delay: 1200 },
            { role: 'ai', text: 'Well done. I am dispatching our emergency plumber to your location right now. Your address on file is 742 Evergreen Terrace — is that correct?', delay: 1000 },
            { role: 'caller', text: 'Yes, that is right.', delay: 800 },
            { role: 'ai', text: 'Our emergency team is en route and should arrive within 30–45 minutes. In the meantime, try to mop up standing water to prevent further damage. Is there anything else you need?', delay: 1500 },
            { role: 'caller', text: 'No, thank you so much! I thought no one would answer this late.', delay: 1200 },
            { role: 'ai', text: 'We are here 24/7. A plumber is on the way. Stay safe, Emily! 🚒', delay: 1000 },
            { role: 'system', text: '✅ Emergency dispatch initiated. Plumber routed. ETA: 32 minutes. Customer notified via SMS.', delay: 500 },
        ],
    },
    {
        id: 'handoff',
        title: 'Human Handoff',
        icon: <Building2 className="w-5 h-5" />,
        description: 'See how the AI seamlessly transfers to a human.',
        messages: [
            { role: 'system', text: '📞 Incoming call from Lisa Kim — high-value real estate investor...', delay: 500 },
            { role: 'caller', text: 'I need to speak with someone about a custom smart home automation system for a 12-unit luxury apartment building we are developing.', delay: 1500 },
            { role: 'ai', text: 'That sounds like an exciting project! Let me gather some details first. Could you tell me which building systems you are looking to automate?', delay: 1000 },
            { role: 'caller', text: 'We are looking at everything — HVAC, lighting, security, access control, and smart appliances across all 12 units.', delay: 1200 },
            { role: 'ai', text: 'This is a substantial commercial project. I think you would benefit from speaking directly with our senior solutions architect who specializes in multifamily automation. Let me connect you.', delay: 1000 },
            { role: 'system', text: '🔄 Transferring to human specialist — Senior Solutions Architect...', delay: 1500 },
            { role: 'ai', text: 'Lisa, I am transferring you now. I have sent over all the details you shared. Our architect is already briefed on your 12-unit project. It was a pleasure!', delay: 1000 },
            { role: 'system', text: '✅ Seamless handoff complete. Context: {project_type: "multifamily smart home", units: 12, systems: ["HVAC","lighting","security","access","appliances"]}', delay: 500 },
        ],
    },
];

function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
    const [displayed, setDisplayed] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!text) { onComplete(); return; }
        setDisplayed('');
        setIsComplete(false);
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(interval);
                setIsComplete(true);
                onComplete();
            }
        }, 15 + Math.random() * 10);
        return () => clearInterval(interval);
    }, [text, onComplete]);

    return <span>{displayed}{!isComplete && <span className="animate-pulse">|</span>}</span>;
}

export default function DemoPage() {
    const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
    const [messages, setMessages] = useState<{ role: string; text: string; id: number; typing: boolean }[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isRinging, setIsRinging] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const messageIndexRef = useRef(0);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [showTranscript, setShowTranscript] = useState(true);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addMessage = useCallback((msg: Message) => {
        const id = Date.now();
        return new Promise<void>((resolve) => {
            setMessages((prev) => [...prev, { role: msg.role, text: msg.text, id, typing: true }]);
            setTimeout(() => {
                setMessages((prev) => prev.map((m) => m.id === id ? { ...m, typing: false } : m));
                resolve();
            }, msg.text.length * 15 + 200);
        });
    }, []);

    const runScenario = useCallback(async () => {
        setIsRunning(true);
        setMessages([]);
        setIsRinging(true);

        await new Promise((r) => setTimeout(r, 2000));
        setIsRinging(false);
        setIsAnswered(true);

        await new Promise((r) => setTimeout(r, 500));

        for (const msg of selectedScenario.messages) {
            if (msg.delay) await new Promise((r) => setTimeout(r, msg.delay));
            await addMessage(msg);
        }

        setIsRunning(false);
    }, [selectedScenario, addMessage]);

    const resetDemo = () => {
        setIsRunning(false);
        setIsRinging(false);
        setIsAnswered(false);
        setMessages([]);
        messageIndexRef.current = 0;
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
            <header className="relative pt-24 pb-12 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
                <div className="max-w-6xl mx-auto space-y-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Live Demo</p>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Experience Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">AI Receptionist</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl font-medium">
                        Select a scenario below and watch how Brandvoice AI handles real inbound calls — from booking appointments to handling emergencies.
                    </p>
                </div>
            </header>

            <main className="px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Scenario Selector */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {scenarios.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => { resetDemo(); setSelectedScenario(s); }}
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                                    selectedScenario.id === s.id
                                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {s.icon}
                                {s.title}
                            </button>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-500 mb-6">{selectedScenario.description}</p>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Phone Interface */}
                        <div className="lg:col-span-2">
                            <div className="rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-white/10 overflow-hidden">
                                {/* Phone Top Bar */}
                                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${isRinging ? 'bg-red-500 animate-pulse' : isAnswered ? 'bg-green-500' : 'bg-slate-600'}`} />
                                        <span className="text-sm font-semibold text-white">
                                            {isRinging ? 'Incoming Call...' : isAnswered ? 'Call Connected' : 'Ready'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Volume2 className="w-3 h-3" />
                                        Brandverse AI Receptionist
                                    </div>
                                </div>

                                {/* Call Animation */}
                                {isRinging && (
                                    <div className="py-16 flex flex-col items-center justify-center gap-4">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                                                <Phone className="w-10 h-10 text-white" />
                                            </div>
                                            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                                        </div>
                                        <p className="text-sm text-slate-400 font-medium">Incoming call...</p>
                                        <p className="text-xs text-slate-500">{selectedScenario.messages[1]?.text || ''}</p>
                                    </div>
                                )}

                                {/* Chat Interface */}
                                {isAnswered && (
                                    <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto scrollbar-hide">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.role === 'caller' ? 'justify-start' : msg.role === 'system' ? 'justify-center' : 'justify-end'}`}>
                                                <div className={`max-w-[80%] ${
                                                    msg.role === 'system'
                                                        ? 'bg-white/5 text-slate-400 text-xs text-center px-4 py-2 rounded-full'
                                                        : msg.role === 'caller'
                                                        ? 'bg-slate-800/80 text-slate-200 px-4 py-3 rounded-2xl rounded-bl-md text-sm'
                                                        : 'bg-blue-500/20 text-blue-100 px-4 py-3 rounded-2xl rounded-br-md text-sm border border-blue-500/20'
                                                }`}>
                                                    {msg.role === 'ai' ? (
                                                        <span className="text-xs font-black uppercase tracking-widest text-blue-400 block mb-1">AI Receptionist</span>
                                                    ) : msg.role === 'caller' ? (
                                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Caller</span>
                                                    ) : null}
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </div>
                                )}

                                {/* Controls */}
                                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {!isRunning && !isRinging ? (
                                            <button onClick={runScenario} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25">
                                                <Play className="w-4 h-4" /> Simulate Call
                                            </button>
                                        ) : (
                                            <button onClick={resetDemo} className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-red-500/30">
                                                <PhoneOff className="w-4 h-4" /> End Call
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Mic className="w-3 h-3" />
                                        Voice-ready architecture
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Panel */}
                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-4">Scenario Features</h3>
                                <ul className="space-y-3">
                                    {selectedScenario.id === 'appointment' && (
                                        <>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Natural conversation booking</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Calendar availability check</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Automated SMS confirmation</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> CRM sync ready</li>
                                        </>
                                    )}
                                    {selectedScenario.id === 'lead-qualification' && (
                                        <>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Project scope capture</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Estimated value calculation</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Priority scoring & routing</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> CRM integration ready</li>
                                        </>
                                    )}
                                    {selectedScenario.id === 'faq' && (
                                        <>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Dynamic knowledge base queries</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Pricing & availability answers</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Financing eligibility check</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Seamless booking conversion</li>
                                        </>
                                    )}
                                    {selectedScenario.id === 'missed-call' && (
                                        <>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> 24/7 emergency response</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Dispatch automation</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Real-time ETA updates</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Customer SMS notifications</li>
                                        </>
                                    )}
                                    {selectedScenario.id === 'handoff' && (
                                        <>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Context-aware routing</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Detailed context capture</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Seamless team transfer</li>
                                            <li className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> Briefed handoff protocol</li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20">
                                <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-3">Ready for Your Business?</h3>
                                <p className="text-sm text-slate-300 mb-4">This simulation shows a fraction of what Brandverse AI can do. Your actual AI receptionist will be trained on your business, your services, and your customers.</p>
                                <Link href={config.calendlyUrl || 'https://calendly.com/ayushsharmavlogs619/30min'} className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all w-full shadow-lg shadow-blue-500/25">
                                    Book Your Demo <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Audio Ready</p>
                                <p className="text-xs text-slate-400">Voice mode coming soon. This simulation demonstrates the conversational flow that powers our AI receptionists. Audio integration placeholders are in place for future Vapi deployment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
