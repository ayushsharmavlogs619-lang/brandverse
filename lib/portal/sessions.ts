/**
 * JWT Session management for portal authentication
 * Handles token creation, verification, and cookie management
 */

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import type { PortalUser } from '@/types/portal';

// Cookie configuration
const COOKIE_NAME = 'portal-session';
const SESSION_DURATION = Number(process.env.SESSION_COOKIE_MAX_AGE) || 60 * 60 * 24 * 7; // Default 7 days

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_DURATION,
};

/**
 * Get the JWT secret key for signing/verifying tokens
 * @throws Error if JWT_SECRET is not configured
 */
function getSecretKey(): Uint8Array {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error(
            'JWT_SECRET must be configured and at least 32 characters. ' +
            'Generate one with: openssl rand -base64 32'
        );
    }

    return new TextEncoder().encode(secret);
}

/**
 * Session payload stored in JWT
 */
export interface SessionPayload extends JWTPayload {
    uid: string;
    email: string;
    clientId: string;
    subdomain: string;
    role: 'admin' | 'member' | 'viewer';
}

/**
 * Create a new session JWT token
 * @param user - Portal user data
 * @param subdomain - Current subdomain
 * @returns JWT token string
 */
export async function createSession(
    user: PortalUser,
    subdomain: string
): Promise<string> {
    const payload: SessionPayload = {
        uid: user.id,
        email: user.email,
        clientId: user.clientId,
        subdomain,
        role: user.role,
    };

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_DURATION)
        .sign(getSecretKey());

    return token;
}

/**
 * Verify a session JWT token
 * @param token - JWT token to verify
 * @returns Decoded session payload or null if invalid
 */
export async function verifySession(
    token: string
): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getSecretKey());
        return payload as SessionPayload;
    } catch {
        return null;
    }
}

/**
 * Set the session cookie
 * @param token - JWT token to store
 */
export async function setSessionCookie(token: string): Promise<void> {
    try {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);
    } catch (_error) {
        console.warn('setSessionCookie called during build or unsupported environment');
    }
}

/**
 * Get the current session from cookies
 * @returns Session payload or null if not authenticated
 */
export async function getSession(): Promise<SessionPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME)?.value;

        if (!token) {
            return null;
        }

        return verifySession(token);
    } catch (_error) {
        return null; // Return null session during build
    }
}

/**
 * Clear the session cookie (logout)
 */
export async function clearSession(): Promise<void> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(COOKIE_NAME);
    } catch (_error) {
        // Build-time safe
    }
}

/**
 * Refresh session expiry (extend by 7 days)
 * @param session - Current session payload
 * @returns New JWT token
 */
export async function refreshSession(
    session: SessionPayload
): Promise<string> {
    const { uid, email, clientId, subdomain, role } = session;

    const newToken = await new SignJWT({
        uid,
        email,
        clientId,
        subdomain,
        role,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_DURATION)
        .sign(getSecretKey());

    await setSessionCookie(newToken);
    return newToken;
}

/**
 * Check if session is about to expire (within 1 day)
 * @param session - Session payload
 * @returns True if session should be refreshed
 */
export function shouldRefreshSession(session: SessionPayload): boolean {
    if (!session.exp) return true;

    const expiresAt = session.exp * 1000; // Convert to ms
    const oneDayFromNow = Date.now() + 24 * 60 * 60 * 1000;

    return expiresAt < oneDayFromNow;
}

/**
 * Validate that session matches the current subdomain
 * Prevents cross-tenant access
 * @param session - Session payload
 * @param subdomain - Current subdomain
 * @returns True if session is valid for subdomain
 */
export function validateSessionSubdomain(
    session: SessionPayload,
    subdomain: string
): boolean {
    return session.subdomain === subdomain && session.clientId === subdomain;
}
