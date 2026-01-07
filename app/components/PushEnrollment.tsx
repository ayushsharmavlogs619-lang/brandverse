'use client';

import { useState, useEffect } from 'react';
import { Bell, ShieldCheck, X, Zap } from 'lucide-react';
import { db, messaging, getToken, isFirebaseConfigured } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

// Return null early if Firebase is not configured
function PushEnrollmentContent() {
    const [status, setStatus] = useState<'idle' | 'prompting' | 'success' | 'blocked' | 'hidden'>('idle');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check if already granted or blocked
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                setStatus('hidden');
            } else if (Notification.permission === 'denied') {
                setStatus('hidden'); // Don't annoy if they already said no
            } else {
                // Show prompt after a delay
                const timer = setTimeout(() => {
                    if (status !== 'hidden') setStatus('prompting');
                }, 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [status]);

    async function handleEnroll() {
        if (!messaging) return;

        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const token = await getToken(messaging, {
                    vapidKey: 'BMYt_HqY5i8_9vP7_XqXv_T_eY_v_S_v_G_v_H_v_I_v_J_v_K_v_L' // Users should replace this with their actual VAPID key
                });

                if (token) {
                    // Check if token already exists
                    const q = query(collection(db, 'push-subscribers'), where('token', '==', token));
                    const snapshot = await getDocs(q);

                    if (snapshot.empty) {
                        await addDoc(collection(db, 'push-subscribers'), {
                            token,
                            userAgent: navigator.userAgent,
                            timestamp: serverTimestamp(),
                            active: true
                        });
                    }
                    setStatus('success');
                    setTimeout(() => setStatus('hidden'), 3000);
                }
            } else {
                setStatus('blocked');
                setTimeout(() => setStatus('hidden'), 3000);
            }
        } catch (err) {
            console.error('Push enrollment failed:', err);
            setStatus('hidden');
        }
    }

    if (!isClient || status === 'hidden' || status === 'idle') return null;

    return (
        <div className="fixed bottom-8 left-8 z-[100] animate-in slide-in-from-left-10 duration-500">
            <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-blue-500/30 to-transparent shadow-4xl shadow-blue-500/20">
                <div className="bg-[#020617] rounded-[2.3rem] p-8 border border-white/5 max-w-sm space-y-6 relative overflow-hidden">
                    <button
                        onClick={() => setStatus('hidden')}
                        className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center shadow-lg shadow-blue-500/10">
                            <Bell className="w-8 h-8 text-blue-400 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">System <span className="text-blue-500">Broadcast.</span></h3>
                            <p className="text-[10px] font-black text-blue-400/50 uppercase tracking-[0.3em]">Operational Update Active</p>
                        </div>
                    </div>

                    <p className="text-slate-400 font-bold leading-relaxed">
                        Authorize <span className="text-blue-400">Mission Logs</span> to receive instant technical breakthroughs and tactical ROI strategies.
                    </p>

                    {status === 'prompting' && (
                        <button
                            onClick={handleEnroll}
                            className="w-full py-5 bg-black border border-blue-500/30 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-600 transition-all group"
                        >
                            Authorize Transmission <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                        </button>
                    )}

                    {status === 'success' && (
                        <div className="flex items-center justify-center gap-3 text-emerald-500 font-black uppercase tracking-widest text-[10px] py-4">
                            <ShieldCheck className="w-4 h-4" /> Link Established
                        </div>
                    )}

                    <p className="text-[8px] text-slate-600 text-center font-black uppercase tracking-[0.2em]">
                        Encrypted Subscription Protocol • 2025
                    </p>
                </div>
            </div>
        </div>
    );
}

// Wrapper that only renders if Firebase is configured
export default function PushEnrollment() {
    if (!isFirebaseConfigured) {
        return null;
    }
    return <PushEnrollmentContent />;
}
