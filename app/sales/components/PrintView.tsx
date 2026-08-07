'use client';

import { ReactNode, useEffect } from 'react';
import { Printer, X } from 'lucide-react';

/**
 * Full-screen print/PDF view. Adds `printing` class to <body> so the
 * global @media print CSS hides everything except `.print-root`.
 */
export default function PrintView({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('printing');
    return () => document.body.classList.remove('printing');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-4 md:p-8">
      <div className="max-w-[900px] mx-auto">
        <div className="no-print flex items-center justify-between mb-4 gap-3">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="print-root rounded-2xl overflow-hidden shadow-2xl">{children}</div>
      </div>
    </div>
  );
}
