'use client';

import { useEffect, useState, useRef } from 'react';
import { Bell, X } from 'lucide-react';
import { config } from '../../lib/config';
import { SafeApiClient } from '../../lib/api-client';

import { usePathname } from 'next/navigation';

export default function PushNotificationBanner() {
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Check if user already granted/denied or if we've already asked recently
        const askedRecently = localStorage.getItem('pushAsked');
        const currentPermission = Notification.permission;

        setPermission(currentPermission);

        // Show banner if:
        // 1. Notifications are supported
        // 2. User hasn't been asked in last 7 days
        // 3. Permission is default (not granted or denied)
        // 4. VAPID key is configured
        if ('Notification' in window && !askedRecently && currentPermission === 'default' && config.vapidPublicKey) {
            // Wait 5 seconds before showing (don't annoy immediately)
            timeoutRef.current = setTimeout(() => setShow(true), 5000);
        }

        // Cleanup: clear timeout if component unmounts
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleAllow = async () => {
        try {
            const permission = await Notification.requestPermission();
            setPermission(permission);

            if (permission === 'granted') {
                const vapidKey = config.vapidPublicKey;
                if ('serviceWorker' in navigator && vapidKey) {
                    try {
                        const registration = await navigator.serviceWorker.register('/sw.js');
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(vapidKey),
                        });
                        
                        // Use safe API client - won't crash if route doesn't exist
                        await SafeApiClient.post('/api/subscribe', subscription, {
                            fallbackData: null,
                            silent: true,
                        });
                    } catch (swError) {
                        console.warn('Service worker registration failed:', swError);
                    }
                }
            }

            // Remember we asked
            localStorage.setItem('pushAsked', new Date().toISOString());
            setShow(false);
        } catch (error) {
            console.error('Push notification error:', error);
            setShow(false);
        }
    };

    const handleDismiss = () => {
        localStorage.setItem('pushAsked', new Date().toISOString());
        setShow(false);
    };

    // Don't show if VAPID key not configured
    if (!config.vapidPublicKey) return null;
    
    // Don't show on certain pages
    if (pathname?.startsWith('/creators') || pathname?.startsWith('/onlyfans')) return null;
    
    if (!show || permission !== 'default') return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-slide-up">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-2xl border border-white/20">
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-black text-lg mb-2">Stay Updated</h3>
                        <p className="text-white/90 text-sm mb-4">
                            Get notified when we publish new articles, case studies, and AI insights.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleAllow}
                                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:scale-105 transition-transform"
                            >
                                Allow Notifications
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-colors"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
