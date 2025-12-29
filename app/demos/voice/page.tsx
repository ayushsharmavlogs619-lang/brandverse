'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, MicOff, Phone, PhoneOff, Settings, AlertCircle } from 'lucide-react';
import Vapi from '@vapi-ai/web';

// Initialize Vapi outside component to avoid re-instantiation
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY || 'demo-key');

export default function VoiceDemo() {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0); // For visualizer
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // Vapi Event Listeners
        vapi.on('call-start', () => setStatus('connected'));
        vapi.on('call-end', () => setStatus('idle'));
        vapi.on('error', (e) => {
            setStatus('error');
            setErrorMsg(e.message || 'Connection failed');
        });

        // Simple visualizer simulation
        let animationFrame: number;
        const animate = () => {
            if (status === 'connected') {
                // Mock volume data if Vapi doesn't expose raw audio stream easily in this version
                // In a real app, we'd use Web Audio API context from the stream
                const time = Date.now() / 1000;
                const base = Math.sin(time * 3) * 0.2 + 0.8; // pulsing
                setVolume(base);
            } else {
                setVolume(0);
            }
            animationFrame = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            // vapi.stop(); // Cleanup
        };
    }, [status]);

    const toggleCall = async () => {
        if (status === 'idle' || status === 'error') {
            setStatus('connecting');
            setErrorMsg('');
            try {
                if (!process.env.NEXT_PUBLIC_VAPI_KEY) {
                    throw new Error("Missing Vapi Public Key. Please add NEXT_PUBLIC_VAPI_KEY to .env.local");
                }
                // Start call with your assistant ID. 
                // We'll trust the user to replace 'ASSISTANT_ID' or we can make it an env var too.
                await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || 'your-assistant-id');
            } catch (e: any) {
                setStatus('error');
                setErrorMsg(e.message);
            }
        } else {
            vapi.stop();
            setStatus('idle');
        }
    };

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        vapi.setMuted(newMuted);
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
                    {status === 'connected' ? 'System Active' : 'System Idle'}
                </div>
            </header>

            <main className="h-screen flex flex-col items-center justify-center relative z-10 p-6">

                {/* Visualizer Orb */}
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

                {/* Controls */}
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
                            disabled={status === 'connecting'}
                            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${status === 'connected' ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-white text-black shadow-white/20'}`}
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

            {/* Missing Key Warning */}
            {!process.env.NEXT_PUBLIC_VAPI_KEY && (
                <div className="absolute bottom-6 left-6 max-w-sm p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-md">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div className="text-xs text-yellow-200/80">
                            <p className="font-bold text-yellow-400 mb-1">Configuration Required</p>
                            To make calls, add your <code>NEXT_PUBLIC_VAPI_KEY</code> and <code>NEXT_PUBLIC_VAPI_ASSISTANT_ID</code> to your environment variables.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
