'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Cpu, RefreshCw, Home, AlertTriangle } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter">Brandverse</span>
        </div>

        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            System Exception
          </h1>
          <p className="text-slate-400 leading-relaxed">
            An unexpected error occurred in the application. 
            This has been logged and our team has been notified.
          </p>
          
          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-left">
              <p className="text-red-400 font-mono text-sm mb-2">Error Details:</p>
              <p className="text-slate-500 font-mono text-xs break-all">
                {error.message || 'Unknown error'}
              </p>
              {error.digest && (
                <p className="text-slate-600 font-mono text-xs mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Support */}
        <p className="text-slate-500 text-sm">
          Need help?{' '}
          <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
