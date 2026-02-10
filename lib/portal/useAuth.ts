'use client';

/**
 * useAuth hook for client-side authentication
 */

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { PortalUser, Client } from '@/types/portal';

interface AuthState {
    user: PortalUser | null;
    client: Client | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

interface UseAuthReturn extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
    const router = useRouter();
    const [state, setState] = useState<AuthState>({
        user: null,
        client: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
    });

    /**
     * Fetch current user from API
     */
    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/me', {
                credentials: 'include',
            });

            if (!res.ok) {
                setState((prev) => ({
                    ...prev,
                    user: null,
                    client: null,
                    isLoading: false,
                    isAuthenticated: false,
                }));
                return;
            }

            const data = await res.json();

            setState({
                user: data.data.user,
                client: data.data.client,
                isLoading: false,
                isAuthenticated: true,
                error: null,
            });
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: 'Failed to fetch user',
            }));
        }
    }, []);

    /**
     * Login with email and password
     */
    const login = useCallback(async (email: string, password: string) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error?.message || 'Login failed');
            }

            // Fetch full user data
            await fetchUser();

            // Redirect to dashboard
            router.push('/portal/dashboard');
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed',
            }));
            throw error;
        }
    }, [fetchUser, router]);

    /**
     * Logout and clear session
     */
    const logout = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true }));

        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            setState({
                user: null,
                client: null,
                isLoading: false,
                isAuthenticated: false,
                error: null,
            });

            router.push('/portal');
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: 'Logout failed',
            }));
        }
    }, [router]);

    /**
     * Refresh user data
     */
    const refresh = useCallback(async () => {
        await fetchUser();
    }, [fetchUser]);

    // Fetch user on mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        ...state,
        login,
        logout,
        refresh,
    };
}

export default useAuth;
