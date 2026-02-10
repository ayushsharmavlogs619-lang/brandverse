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

            {/* Coming Soon Notice */}
            <div className="mt-12 p-8 border border-white/5 bg-white/[0.02] rounded-2xl text-center">
                <p className="text-sm opacity-40">
                    Additional system controls (Log streaming, DB backups, Feature Flags) coming in v1.1.0
                </p>
            </div>
        </div>
    );
}
