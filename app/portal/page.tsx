'use client';

/**
 * Portal Login Page
 * Client-branded login form with Firebase authentication
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PortalLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clientInfo, setClientInfo] = useState<{ name: string; logoUrl?: string } | null>(null);

    // Check if already logged in
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    router.push('/portal/dashboard');
                }
            } catch {
                // Not logged in, continue
            }
        }
        checkAuth();
    }, [router]);

    // Get primary color from CSS variable
    const primaryColor = typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement).getPropertyValue('--portal-primary').trim() || '#6366f1'
        : '#6366f1';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Login failed');
            }

            // Redirect to dashboard
            router.push('/portal/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4 shadow-lg"
                            style={{
                                backgroundColor: primaryColor,
                                boxShadow: `0 8px 32px ${primaryColor}40`
                            }}
                        >
                            {clientInfo?.name?.charAt(0) || 'P'}
                        </div>

                        <h1 className="text-2xl font-bold mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-sm opacity-60">
                            Sign in to access your dashboard
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 opacity-80">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                style={{
                                    '--tw-ring-color': primaryColor
                                } as React.CSSProperties}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2 opacity-80">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                style={{
                                    '--tw-ring-color': primaryColor
                                } as React.CSSProperties}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded bg-white/5 border-white/20"
                                    style={{ accentColor: primaryColor }}
                                />
                                <span className="opacity-70">Remember me</span>
                            </label>
                            <a
                                href="mailto:admin@brandverse.tech?subject=Password%20Reset%20Request"
                                className="font-medium hover:underline"
                                style={{ color: primaryColor }}
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{
                                backgroundColor: primaryColor,
                                boxShadow: `0 4px 20px ${primaryColor}50`
                            }}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 text-white/40" style={{ backgroundColor: 'var(--portal-bg)' }}>
                                or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span className="text-sm font-medium">GitHub</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm mt-6 opacity-60">
                        Don&apos;t have an account?{' '}
                        <a
                            href="mailto:admin@brandverse.tech?subject=Account%20Portal%20Access"
                            className="font-medium hover:underline"
                            style={{ color: primaryColor }}
                        >
                            Contact your admin
                        </a>
                    </p>
                </div>

                {/* Security Notice */}
                <p className="text-center text-xs opacity-40 mt-6">
                    🔒 Secured by Brandverse Enterprise Security
                </p>
            </div>
        </div>
    );
}
