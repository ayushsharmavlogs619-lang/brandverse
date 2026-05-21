'use client';

import { useEffect } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminPanel() {
    useEffect(() => {
        // Redirect to home page - admin panel temporarily disabled for production safety
        // API routes /api/push-stats and /api/send-push do not exist
        window.location.href = '/';
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-slate-200 flex items-center justify-center">
            <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-800 flex items-center justify-center">
                    <Lock className="text-zinc-600 w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-4">Admin Panel Temporarily Disabled</h1>
                <p className="text-zinc-500 mb-8 max-w-md">
                    The admin panel is temporarily disabled for production safety.
                    API endpoints are being configured.
                </p>
                <Link 
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
}