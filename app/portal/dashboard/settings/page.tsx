/**
 * Settings Page
 * Client settings and team management
 */

import { headers } from 'next/headers';
import { getSession } from '@/lib/portal/sessions';
import { getClientBySubdomain, getClientCSSVariables } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';

export default async function SettingsPage() {
    const session = await getSession();
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = getSubdomain(host);

    const client = subdomain ? await getClientBySubdomain(subdomain) : null;
    const cssVars = client ? getClientCSSVariables(client) : {};
    const primaryColor = cssVars['--portal-primary'] || '#6366f1';

    const isAdmin = session?.role === 'admin';

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="opacity-60">Manage your portal settings and preferences</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* Organization Settings */}
                {isAdmin && (
                    <section className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                        <h2 className="text-lg font-semibold mb-4">Organization</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-80">Organization Name</label>
                                <input
                                    type="text"
                                    defaultValue={client?.name || ''}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2"
                                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-80">Portal Subdomain</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={subdomain || ''}
                                        disabled
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50"
                                    />
                                    <span className="text-sm opacity-50">.brandverse.tech</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Theme Settings */}
                {isAdmin && (
                    <section className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                        <h2 className="text-lg font-semibold mb-4">Brand Theme</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-80">Primary Color</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        defaultValue={client?.theme.primaryColor || '#6366f1'}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-0"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={client?.theme.primaryColor || '#6366f1'}
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-80">Secondary Color</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        defaultValue={client?.theme.secondaryColor || '#818cf8'}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-0"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={client?.theme.secondaryColor || '#818cf8'}
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="mt-4 px-6 py-2 rounded-lg font-medium text-white"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Save Theme
                        </button>
                    </section>
                )}

                {/* Notification Settings */}
                <section className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                    <div className="space-y-4">
                        <ToggleSetting
                            label="Email Notifications"
                            description="Receive email updates about your account"
                            defaultChecked={true}
                            color={primaryColor}
                        />
                        <ToggleSetting
                            label="Weekly Reports"
                            description="Get a weekly summary of your bot performance"
                            defaultChecked={true}
                            color={primaryColor}
                        />
                        <ToggleSetting
                            label="New Lead Alerts"
                            description="Get notified when a new lead is captured"
                            defaultChecked={false}
                            color={primaryColor}
                        />
                    </div>
                </section>

                {/* Security Settings */}
                <section className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <h2 className="text-lg font-semibold mb-4">Security</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-1">Change Password</h3>
                            <p className="text-sm opacity-60 mb-3">Update your password regularly for better security</p>
                            <button
                                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                            >
                                Change Password
                            </button>
                        </div>
                        <div>
                            <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                            <p className="text-sm opacity-60 mb-3">Add an extra layer of security to your account</p>
                            <button
                                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                            >
                                Enable 2FA
                            </button>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                {isAdmin && (
                    <section className="bg-red-500/10 rounded-xl border border-red-500/20 p-6">
                        <h2 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium mb-1">Delete All Data</h3>
                                <p className="text-sm opacity-60 mb-3">Permanently delete all your data. This action cannot be undone.</p>
                                <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium">
                                    Delete All Data
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

function ToggleSetting({ label, description, defaultChecked, color }: { label: string; description: string; defaultChecked: boolean; color: string }) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm opacity-60">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
                <div
                    className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{ ['--tw-ring-color' as string]: color }}
                />
            </label>
        </div>
    );
}
