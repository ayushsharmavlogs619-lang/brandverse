'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, MicOff, Phone, PhoneOff, Settings, AlertCircle } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { config } from '../../../lib/config';

// Initialize Vapi only when API key is available to prevent errors
const vapiKey = config.vapiPublicKey; // Vapi public key for voice API
const vapi = vapiKey ? new Vapi(vapiKey) : null;

export default function VoiceDemo() {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [apiKeyMissing, setApiKeyMissing] = useState(!vapiKey);

    const animationFrameRef = useRef<number | undefined>(undefined);
    const vapiRef = useRef<typeof vapi | null>(vapi || null);

    useEffect(() => {
        const currentVapi = vapiRef.current;
        if (!currentVapi) return;

        const handleCallStart = () => setStatus('connected');
        const handleCallEnd = () => setStatus('idle');
        const handleError = (e: any) => {
            setStatus('error');
            setErrorMsg(e.message || 'Connection failed');
        };

        currentVapi.on('call-start', handleCallStart);
        currentVapi.on('call-end', handleCallEnd);
        currentVapi.on('error', handleError);

        const animate = () => {
            if (status === 'connected') {
                const time = Date.now() / 1000;
                const base = Math.sin(time * 3) * 0.2 + 0.8;
                setVolume(base);
            } else {
                setVolume(0);
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (currentVapi) {
                currentVapi.off('call-start', handleCallStart);
                currentVapi.off('call-end', handleCallEnd);
                currentVapi.off('error', handleError);
            }
        };
    }, [status]);

    const toggleCall = async () => {
        if (!vapiRef.current) {
            setStatus('error');
            setErrorMsg('Vapi API key not configured. Add Vapi configuration to environment variables.');
            return;
        }

        if (status === 'idle' || status === 'error') {
            setStatus('connecting');
            setErrorMsg('');
            try {
                const assistantId = config.vapiAssistantId;
                if (!assistantId) {
                    throw new Error("Vapi Assistant ID not configured");
                }
                await vapiRef.current.start(assistantId);
            } catch (e: any) {
                setStatus('error');
                setErrorMsg(e.message);
            }
        } else {
            if (vapiRef.current) {
                vapiRef.current.stop();
            }
            setStatus('idle');
        }
    };

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        if (vapiRef.current) {
            vapiRef.current.setMuted(newMuted);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full transition-all duration-1000 ${status === 'connected' ? 'bg-green-500/10 scale-125' : ''}`} />
            </div>

            <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
                <Link href="/demos" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Exit Demo
                </Link>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
                    {status === 'connected' ? 'System Active' : apiKeyMissing ? 'Configuration Required' : 'System Idle'}
                </div>
            </header>

            <main className="h-screen flex flex-col items-center justify-center relative z-10 p-6">

                <div className="relative mb-20">
                    <div
                        className={`w-64 h-64 rounded-full flex items-center justify-center transition-all duration-300 ${status === 'connected' ? 'shadow-[0_0_100px_rgba(59,130,246,0.3)]' : 'border border-white/5 bg-slate-900/50'}`}
                        style={{
                            transform: `scale(${1 + volume * 0.1})`,
                        }}
                    >
                        {status === 'idle' && <Mic className="w-16 h-16 text-slate-600" />}
                        {status === 'connecting' && <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />}
                        {status === 'error' && <AlertCircle className="w-16 h-16 text-red-500" />}
                        {status === 'connected' && (
                            <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping" />
                        )}
                    </div>
                </div>

                <div className="space-y-8 text-center">
                    <div>
                        <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">
                            {status === 'idle' && 'Talk to Nexus'}
                            {status === 'connecting' && 'Establishing Uplink...'}
                            {status === 'connected' && 'Nexus Online'}
                            {status === 'error' && 'Connection Failed'}
                        </h1>
                        <p className="text-slate-400 font-medium h-6">
                            {status === 'idle' && 'Tap below to start the interview'}
                            {errorMsg && <span className="text-red-400">{errorMsg}</span>}
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                        <button
                            onClick={toggleCall}
                            disabled={status === 'connecting' || apiKeyMissing}
                            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${status === 'connected' ? 'bg-red-500 text-white shadow-red-500/30' : apiKeyMissing ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-white text-black shadow-white/20'}`}
                        >
                            {status === 'connected' ? <PhoneOff className="w-8 h-8" /> : <Phone className="w-8 h-8" />}
                        </button>

                        {status === 'connected' && (
                            <button
                                onClick={toggleMute}
                                className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-95 ${isMuted ? 'bg-white text-red-600 border-transparent' : 'border-white/20 text-white hover:bg-white/10'}`}
                            >
                                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                            </button>
                        )}
                    </div>
                </div>
            </main>

            {apiKeyMissing && (
                <div className="absolute bottom-6 left-6 max-w-sm p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-md">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div className="text-xs text-yellow-200/80">
                            <p className="font-bold text-yellow-400 mb-1">Configuration Required</p>
                            Add Vapi configuration (NEXT_PUBLIC_VAPI_PUBLIC_KEY and NEXT_PUBLIC_VAPI_ASSISTANT_ID) to environment variables to enable voice demos.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}