export default function AdminSettingsPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">System Settings</h1>
                <p className="opacity-60">Global configuration for the Brandverse platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Config */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <span>⚙️</span> General Configuration
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">System Maintenance Mode</p>
                                <p className="text-xs opacity-50">Temporarily disable all portal access</p>
                            </div>
                            <div className="w-12 h-6 bg-white/10 rounded-full relative pointer-events-none opacity-50">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">New Client Registration</p>
                                <p className="text-xs opacity-50">Allow new tenants to sign up automatically</p>
                            </div>
                            <div className="w-12 h-6 bg-blue-500/20 rounded-full relative pointer-events-none">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API & Security */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <span>🛡️</span> Security & API
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Global Rate Limiting</p>
                                <p className="text-xs opacity-50">Throttling for public-facing endpoints</p>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20">
                                Active
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Session Persistence</p>
                                <p className="text-xs opacity-50">Current JWT duration: 7 days</p>
                            </div>
                            <button className="text-xs text-blue-400 hover:underline">Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Flags */}
            <div className="mt-12 bg-white/5 rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <span>🏳️</span> Feature Flags (Beta)
                        </h2>
                        <p className="text-xs opacity-50">Enable or disable experimental features across the platform</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: 'beta_dashboard', name: 'Beta Dashboard', desc: 'New high-performance dashboard layout', active: true },
                        { id: 'advanced_analytics', name: 'Advanced Analytics', desc: 'Granular conversation tracking and export', active: false },
                        { id: 'ai_voice_v2', name: 'AI Voice v2', desc: 'Next-gen low latency voice models', active: true },
                        { id: 'log_streaming', name: 'Log Streaming', desc: 'Real-time activity logs for admins', active: false },
                        { id: 'db_backups', name: 'DB Backups', desc: 'Daily automated Firestore snapshots', active: false },
                    ].map((flag) => (
                        <div key={flag.id} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${flag.active ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-500'}`}>
                                    {flag.id}
                                </span>
                                <div className={`w-8 h-4 rounded-full relative transition-colors ${flag.active ? 'bg-blue-500/40' : 'bg-white/10'}`}>
                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${flag.active ? 'right-0.5 shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'left-0.5 opacity-40'}`}></div>
                                </div>
                            </div>
                            <h3 className="font-medium text-sm mb-1">{flag.name}</h3>
                            <p className="text-xs opacity-40 leading-relaxed">{flag.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 p-8 border border-white/5 bg-white/[0.02] rounded-2xl text-center">
                <p className="text-sm opacity-40">
                    Additional system controls (Security auditing, RBAC controls) coming in v1.1.0
                </p>
            </div>
        </div>
    );
}
