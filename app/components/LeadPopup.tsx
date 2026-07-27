'use client';

import { useEffect, useState, useRef } from 'react';
import { X, Mail } from 'lucide-react';
import { leadService } from '../../lib/lead-service';

interface LeadPopupProps {
  delay?: number;
  enableExitIntent?: boolean;
  storageKey?: string;
}

export default function LeadPopup({
  delay = 30000,
  enableExitIntent = true,
  storageKey = 'leadPopupDismissed',
}: LeadPopupProps) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (hasShownRef.current) return;

    const dismissed = (() => {
      try {
        return localStorage.getItem(storageKey);
      } catch {
        return null;
      }
    })();

    if (dismissed || show) return;

    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    let exitHandler: ((e: MouseEvent) => void) | null = null;

    if (delay > 0) {
      delayTimer = setTimeout(() => {
        if (!hasShownRef.current) {
          hasShownRef.current = true;
          setShow(true);
        }
      }, delay);
    }

    if (enableExitIntent) {
      exitHandler = (e: MouseEvent) => {
        if (e.clientY > 0 || hasShownRef.current) return;
        hasShownRef.current = true;
        setShow(true);
        document.removeEventListener('mouseleave', exitHandler!);
      };
      document.addEventListener('mouseleave', exitHandler);
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (exitHandler) document.removeEventListener('mouseleave', exitHandler);
    };
  }, [delay, enableExitIntent, storageKey, show]);

  const dismiss = () => {
    try {
      localStorage.setItem(storageKey, 'true');
    } catch {}
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setStatus('loading');
    await leadService.submitLeadWithRetry({
      full_name: name,
      email,
      service_interest: 'Cold Lead - Popup',
      source_page: window.location.pathname,
      source_form: 'lead_popup',
    }, 1);
    setStatus('success');
    setTimeout(dismiss, 3000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-300">
      <div className="bg-[#0f172a] border border-white/10 rounded-[2rem] p-8 md:p-10 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">You're In!</h3>
            <p className="text-slate-400 text-sm">Check your inbox — we'll send you the best AI automation strategies.</p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-2xl font-black text-white mb-2">
              Don't Let Another Lead Slip Away
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Get free AI automation strategies, case studies, and early access to new tools — straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Get AI Strategies'}
              </button>
            </form>

            <p className="text-center text-[10px] text-slate-600 mt-4">
              No spam. Unsubscribe anytime.
            </p>

            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={dismiss}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                No thanks, I'm good
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
