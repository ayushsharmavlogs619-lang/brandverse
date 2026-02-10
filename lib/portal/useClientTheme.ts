'use client';

/**
 * useClientTheme hook for client-side theme management
 */

import { useState, useEffect } from 'react';
import type { ClientTheme } from '@/types/portal';

interface UseClientThemeReturn {
    theme: ClientTheme;
    cssVariables: Record<string, string>;
    primaryColor: string;
    isLoading: boolean;
}

const DEFAULT_THEME: ClientTheme = {
    primaryColor: '#6366f1',
    secondaryColor: '#818cf8',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    accentColor: '#22d3ee',
};

export function useClientTheme(): UseClientThemeReturn {
    const [theme, setTheme] = useState<ClientTheme>(DEFAULT_THEME);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTheme() {
            try {
                const res = await fetch('/api/auth/me', {
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.data?.client?.theme) {
                        setTheme({ ...DEFAULT_THEME, ...data.data.client.theme });
                    }
                }
            } catch {
                // Use default theme on error
            } finally {
                setIsLoading(false);
            }
        }

        fetchTheme();
    }, []);

    const cssVariables: Record<string, string> = {
        '--portal-primary': theme.primaryColor,
        '--portal-secondary': theme.secondaryColor,
        '--portal-bg': theme.backgroundColor,
        '--portal-text': theme.textColor,
        '--portal-accent': theme.accentColor || theme.primaryColor,
    };

    return {
        theme,
        cssVariables,
        primaryColor: theme.primaryColor,
        isLoading,
    };
}

export default useClientTheme;
