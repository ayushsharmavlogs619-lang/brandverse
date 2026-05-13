'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { articles } from '../../lib/articles';
import { Send, CheckCircle2, Zap, Users, TrendingUp, Lock, LogOut, Eye, EyeOff } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase().trim() ?? '';

type SendResult = { success: boolean; count?: number; total?: number };

export default function AdminPanel() {
    const supabase = getSupabaseClient();
    const [session, setSession] = useState<Session | null>(null);
    const [authReady, setAuthReady] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [authPending, setAuthPending] = useState(false);
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState<SendResult | null>(null);
    const [stats, setStats] = useState({ subscribers: 0, sent: 0 });

    const isAdmin = !!session?.user?.email
        && session.user.email.toLowerCase().trim() === ADMIN_EMAIL
        && ADMIN_EMAIL !== '';

    const fetchStats = useCallback(async (accessToken: string) => {
        try {
            const response = await fetch('/api/push-stats', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!response.ok) return;
            const data = (await response.json()) as { subscribers?: number; sent?: number };
            setStats({
                subscribers: typeof data.subscribers === 'number' ? data.subscribers : 0,
                sent: typeof data.sent === 'number' ? data.sent : 0,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }, []);

    useEffect(() => {
        if (!supabase) {
            setAuthReady(true);
            return;
        }
        let mounted = true;
        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) return;
            setSession(data.session ?? null);
            setAuthReady(true);
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession ?? null);
        });
        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, [supabase]);

    useEffect(() => {
        if (isAdmin && session?.access_token) {
            void fetchStats(session.access_token);
        }
    }, [isAdmin, session?.access_token, fetchStats]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) {
            setAuthError('Supabase client not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
            return;
        }
        setAuthPending(true);
        setAuthError(null);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        setAuthPending(false);
        if (error) {
            setAuthError(error.message);
            return;
        }
        const userEmail = data.user?.email?.toLowerCase().trim();
        if (!ADMIN_EMAIL || userEmail !== ADMIN_EMAIL) {
            await supabase.auth.signOut();
            setAuthError('This account is not authorised for the admin panel.');
        }
    };

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        setEmail('');
        setPassword('');
        setSession(null);
    };

    const sendPushNotification = async (article: typeof articles[0]) => {
        if (!session?.access_token) return;
        setSending(true);
        setResult(null);
        try {
            const response = await fetch('/api/send-push', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    title: `New Article: ${article.title}`,
                    body: article.excerpt,
                    url: `https://brandverse.tech/blog/${article.slug}`,
                }),
            });
            const data = (await response.json()) as SendResult;
            setResult(data);
            void fetchStats(session.access_token);
        } catch (error) {
            console.error('Send push failed', error);
            setResult({ success: false });
        } finally {
            setSending(false);
        }
    };

    if (!authReady) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center text-slate-500 font-mono text-sm uppercase tracking-widest">
                Initialising...
            </div>
        );
    }

    // Login screen
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-[#000000] text-slate-200 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] animate-pulse" />

                <div className="relative z-10 w-full max-w-md px-6">
                    <div className="mb-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">COMMAND CENTER</h1>
                        <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.3em]">Authorised Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Admin Email"
                                required
                                autoFocus
                                className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Access Code"
                                required
                                className={`w-full px-6 py-4 bg-white/5 border-2 ${authError ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono pr-14`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {authError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold text-center">
                                {authError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={authPending}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-2xl shadow-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {authPending ? 'Authenticating...' : 'Initialise System'}
                        </button>
                    </form>

                    <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-xs text-slate-500 text-center font-mono">
                            Auth: Supabase | Encryption: AES-256
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

            <div className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white tracking-tight">BRANDVERSE COMMAND</h1>
                            <p className="text-xs text-slate-600 font-mono uppercase tracking-wider">
                                Push Control · {session?.user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="relative">
                            <Users className="w-8 h-8 text-blue-400 mb-3" />
                            <div className="text-4xl font-black text-white mb-1">{stats.subscribers.toLocaleString()}</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Active Subscribers</div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-purple-600/5 border border-purple-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                        <div className="relative">
                            <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
                            <div className="text-4xl font-black text-white mb-1">{stats.sent.toLocaleString()}</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Total Sent</div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-600/10 to-green-600/5 border border-green-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
                        <div className="relative">
                            <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
                            <div className="text-4xl font-black text-white mb-1">
                                {stats.subscribers > 0 ? Math.round((stats.sent / stats.subscribers) * 100) : 0}%
                            </div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Engagement Rate</div>
                        </div>
                    </div>
                </div>

                {result && (
                    <div className={`p-6 rounded-2xl mb-8 border-2 ${result.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        {result.success ? (
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                                <div>
                                    <div className="font-black text-green-400 text-lg">NOTIFICATION DEPLOYED</div>
                                    <div className="text-sm text-slate-400 font-mono">
                                        Sent to {result.count ?? 0}/{result.total ?? 0} subscribers
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-red-400 font-bold">DEPLOYMENT FAILED &mdash; Check configuration</div>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Content Arsenal</h2>
                    {articles.map((article, index) => (
                        <div
                            key={article.slug}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-blue-500/30 transition-all relative overflow-hidden"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                            <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                                                {article.category}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-600 font-mono">{article.date}</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-3">{article.excerpt}</p>
                                    <div className="text-xs text-slate-700 font-mono">
                                        brandverse.tech/blog/{article.slug}
                                    </div>
                                </div>
                                <button
                                    onClick={() => sendPushNotification(article)}
                                    disabled={sending}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-black uppercase tracking-widest text-sm flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
                                >
                                    <Send className="w-4 h-4" />
                                    {sending ? 'DEPLOYING...' : 'DEPLOY'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
