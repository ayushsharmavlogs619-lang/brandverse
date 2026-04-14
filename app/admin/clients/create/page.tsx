'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, Plus, Globe, Shield, Zap } from 'lucide-react';

export default function CreateClientPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        subdomain: '',
        plan: 'free',
        primaryColor: '#6366f1',
        secondaryColor: '#4f46e5'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // In a real app, this would be a Server Action
            // For now, we simulate the creation
            const response = await fetch('/api/admin/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to create client');

            router.push('/admin');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            <main className="max-w-4xl mx-auto pt-32 pb-24 px-6">
                <Link 
                    href="/admin" 
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Fleet
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Deploy New <span className="text-blue-500 text-glow-blue">Tenant</span></h1>
                        <p className="text-slate-400 mt-2 font-medium">Provisioning a new autonomous operational engine.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold">
                            PROTOCOL ERROR: {error}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Core Config */}
                        <section className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                            <div className="flex items-center gap-3 mb-2">
                                <Globe className="w-5 h-5 text-blue-400" />
                                <h2 className="text-lg font-bold text-white uppercase tracking-tight">Core Infrastructure</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Legal Entity Name</label>
                                    <input 
                                        required
                                        type="text"
                                        placeholder="e.g. Apex Plumbers Inc"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Target Subdomain</label>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            required
                                            type="text"
                                            placeholder="apex"
                                            value={formData.subdomain}
                                            onChange={e => setFormData({...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                        <span className="text-slate-500 font-mono text-xs">.brandverse.tech</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Plan & Branding */}
                        <section className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                            <div className="flex items-center gap-3 mb-2">
                                <Shield className="w-5 h-5 text-purple-400" />
                                <h2 className="text-lg font-bold text-white uppercase tracking-tight">Service Protocol</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Subscription Tier</label>
                                    <select 
                                        value={formData.plan}
                                        onChange={e => setFormData({...formData, plan: e.target.value})}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="free">Standard (Free)</option>
                                        <option value="pro">Pro Engine ($997/mo)</option>
                                        <option value="enterprise">Enterprise ($Custom)</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Primary Color</label>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="color"
                                                value={formData.primaryColor}
                                                onChange={e => setFormData({...formData, primaryColor: e.target.value})}
                                                className="w-10 h-10 bg-transparent rounded cursor-pointer"
                                            />
                                            <span className="font-mono text-[10px] uppercase text-slate-400">{formData.primaryColor}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Secondary Color</label>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="color"
                                                value={formData.secondaryColor}
                                                onChange={e => setFormData({...formData, secondaryColor: e.target.value})}
                                                className="w-10 h-10 bg-transparent rounded cursor-pointer"
                                            />
                                            <span className="font-mono text-[10px] uppercase text-slate-400">{formData.secondaryColor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="flex justify-end pt-8">
                        <button
                            disabled={loading || !formData.name || !formData.subdomain}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all shadow-2xl shadow-blue-600/20 active:scale-95 group"
                        >
                            {loading ? (
                                <Zap className="w-5 h-5 animate-spin" />
                            ) : (
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            )}
                            Initialize Deployment
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
