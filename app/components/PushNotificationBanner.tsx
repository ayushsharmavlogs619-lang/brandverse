'use client';

import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';

export default function PushNotificationBanner() {
    const [show, setShow] = useState(false);
    const [permission, setPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        // Check if user already granted/denied or if we've already asked recently
        const askedRecently = localStorage.getItem('pushAsked');
        const currentPermission = Notification.permission;

        setPermission(currentPermission);

        // Show banner if:
        // 1. Notifications are supported
        // 2. User hasn't been asked in last 7 days
        // 3. Permission is default (not granted or denied)
        if ('Notification' in window && !askedRecently && currentPermission === 'default') {
            // Wait 5 seconds before showing (don't annoy immediately)
            setTimeout(() => setShow(true), 5000);
        }
    }, []);

    const handleAllow = async () => {
        try {
            const permission = await Notification.requestPermission();
            setPermission(permission);

            if (permission === 'granted') {
                // Register service worker for push notifications
                if ('serviceWorker' in navigator) {
                    const registration = await navigator.serviceWorker.register('/sw.js');

                    // Subscribe to push notifications (you'll need to set up Firebase or OneSignal)
                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '')
                    });

                    // Send subscription to your backend
                    await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(subscription)
                    });

                    console.log('Push notification subscription successful');
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
