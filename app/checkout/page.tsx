'use client';

import Navbar from '../components/Navbar';
import RazorpayCheckout from '../components/RazorpayCheckout';
import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function CheckoutPage() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Checkout
          </h1>
          <p className="text-xl text-slate-400">
            Secure payment via Razorpay
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Amount</p>
            <p className="text-5xl font-black text-white">₹499</p>
          </div>

          <RazorpayCheckout
            amount={49900}
            currency="INR"
            prefill={{
              name: 'Test User',
              email: 'test@example.com',
              contact: '9999999999',
            }}
            onSuccess={(data) => {
              setStatus({ type: 'success', message: `Payment successful! ID: ${data.payment_id}` });
            }}
            onError={(error) => {
              setStatus({ type: 'error', message: error });
            }}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all text-lg"
            buttonText="Pay ₹499"
          />

          {status && (
            <div className={`flex items-center gap-3 p-4 rounded-xl ${
              status.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
              <span className="text-sm">{status.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
