/**
 * Firebase Authentication helper functions
 * Shared utilities for auth operations across client and server
 */

import { auth, getIdToken } from './client';

/**
 * Authentication result interface
 */
export interface AuthResult {
    success: boolean;
    user?: {
        uid: string;
        email: string | null;
        displayName: string | null;
    };
    token?: string;
    error?: string;
}

/**
 * Wait for auth to be initialized
 * Firebase auth state is async on page load
 * @param timeout - Max wait time in ms (default 10s)
 * @returns Current user or null
 */
export function waitForAuth(timeout = 10000): Promise<import('firebase/auth').User | null> {
    return new Promise((resolve) => {
        // If already initialized, return immediately
        if (auth.currentUser !== undefined) {
            resolve(auth.currentUser);
            return;
        }

        const timeoutId = setTimeout(() => {
            unsubscribe();
            resolve(null);
        }, timeout);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            clearTimeout(timeoutId);
            unsubscribe();
            resolve(user);
        });
    });
}

/**
 * Get auth headers for API requests
 * @returns Headers object with Authorization token
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
    const token = await getIdToken();

    if (!token) {
        return {};
    }

    return {
        'Authorization': `Bearer ${token}`,
    };
}

/**
 * Make an authenticated API request
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns Fetch response
 */
export async function authFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const authHeaders = await getAuthHeaders();

    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...options.headers,
        },
        credentials: 'include',
    });
}

/**
 * Extract user info from Firebase user object
 * @param user - Firebase User object
 * @returns Simplified user info
 */
export function extractUserInfo(user: import('firebase/auth').User) {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
    };
}

/**
 * Check if user's email is verified
 * @returns True if email is verified
 */
export function isEmailVerified(): boolean {
    return auth.currentUser?.emailVerified ?? false;
}

/**
 * Refresh the current user's profile
 * Call after updating user profile
 */
export async function refreshUser(): Promise<void> {
    if (auth.currentUser) {
        await auth.currentUser.reload();
    }
}
