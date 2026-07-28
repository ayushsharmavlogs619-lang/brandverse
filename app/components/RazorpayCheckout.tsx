'use client';

import { useState, useCallback, useEffect } from 'react';
import { config } from '@/lib/config';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  currency?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (data: { payment_id: string; order_id: string }) => void;
  onError?: (error: string) => void;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function RazorpayCheckout({
  amount,
  currency = 'INR',
  prefill = {},
  onSuccess,
  onError,
  buttonText = 'Pay Now',
  className = '',
  disabled = false,
  children,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (window.Razorpay) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptError(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = useCallback(async () => {
    if (!config.razorpayKeyId) {
      onError?.('Payment gateway key is not configured');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create payment order');
      }

      const order = await res.json();

      const options = {
        key: config.razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Brandverse',
        description: 'Brandverse Payment',
        order_id: order.order_id,
        prefill: {
          name: prefill.name || '',
          email: prefill.email || '',
          contact: prefill.contact || '',
        },
        theme: {
          color: '#2563eb',
        },
        handler(response: any) {
          fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
            .then((r) => r.json())
            .then((data) => {
              if (data.success) {
                onSuccess?.({
                  payment_id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                });
              } else {
                onError?.(data.error || 'Payment verification failed');
              }
            })
            .catch(() => {
              onError?.('Payment verification failed');
            });
        },
        modal: {
          ondismiss() {
            onError?.('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        onError?.(response.error?.description || 'Payment failed');
      });
      razorpay.open();
    } catch (err) {
      onError?.(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  }, [amount, currency, prefill, onSuccess, onError]);

  if (scriptError) {
    return (
      <div className="text-red-400 text-sm">Failed to load payment gateway. Please refresh the page.</div>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled || loading || !scriptLoaded}
      className={className}
    >
      {children || (loading ? 'Processing...' : !scriptLoaded ? 'Loading...' : buttonText)}
    </button>
  );
}
