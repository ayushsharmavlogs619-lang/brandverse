export const dynamic = 'force-static';

/**
 * Login API endpoint
 * POST /api/auth/login
 */

import { NextRequest } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { verifyIdToken } from '@/lib/firebase/admin';
import { getPortalUser, updateLastLogin } from '@/lib/portal/users';
import { getClientBySubdomain } from '@/lib/portal/clients';
import { createSession, setSessionCookie } from '@/lib/portal/sessions';
import { getSubdomain } from '@/lib/portal/subdomain';
import { checkLoginRateLimit, getRateLimitHeaders } from '@/lib/security/rateLimit';
import { validateEmail, validatePassword } from '@/lib/security/validators';
import { successResponse, errors, withErrorHandling } from '@/lib/utils/errors';
import { log } from '@/lib/utils/logger';
import type { LoginRequest, LoginResponse } from '@/types/portal';

async function handler(request: NextRequest) {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown';

    // Check rate limit
    const rateLimit = await checkLoginRateLimit(ip);
    if (!rateLimit.success) {
        log.auth('login', null, false, { reason: 'rate_limited', ip });
        const response = errors.rateLimited(rateLimit.reset);
        // Add rate limit headers
        Object.entries(getRateLimitHeaders(rateLimit)).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        return response;
    }

    // Parse request body
    let body: LoginRequest;
    try {
        body = await request.json();
    } catch {
        return errors.validationError('Invalid JSON body');
    }

    const { email, password } = body;

    // Validate input
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        return errors.invalidInput('email', emailValidation.error!);
    }

    if (!password) {
        return errors.invalidInput('password', 'Password is required');
    }

    // Get subdomain from request
    const host = request.headers.get('host') || '';
    const subdomain = getSubdomain(host);

    if (!subdomain) {
        log.auth('login', null, false, { reason: 'no_subdomain', host });
        return errors.invalidSubdomain();
    }

    // Verify client exists and is active
    const client = await getClientBySubdomain(subdomain);
    if (!client) {
        log.auth('login', null, false, { reason: 'client_not_found', subdomain });
        return errors.notFound('Organization');
    }

    if (!client.isActive) {
        log.auth('login', null, false, { reason: 'client_inactive', subdomain });
        return errors.clientInactive();
    }

    // Authenticate with Firebase
    let userCredential;
    try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        log.auth('login', null, false, { reason: 'invalid_credentials', email });
        return errors.invalidCredentials();
    }

    // Get Firebase ID token
    const idToken = await userCredential.user.getIdToken();

    // Verify the token
    let decodedToken;
    try {
        decodedToken = await verifyIdToken(idToken);
    } catch {
        log.auth('login', null, false, { reason: 'token_verification_failed' });
        return errors.invalidCredentials();
    }

    // Get portal user record
    const portalUser = await getPortalUser(decodedToken.uid);

    if (!portalUser) {
        log.auth('login', decodedToken.uid, false, { reason: 'no_portal_user' });
        return errors.forbidden('You do not have access to this portal. Contact your administrator.');
    }

    // Verify user belongs to this client
    if (portalUser.clientId !== subdomain) {
        log.auth('login', decodedToken.uid, false, {
            reason: 'client_mismatch',
            userClient: portalUser.clientId,
            requestedClient: subdomain
        });
        return errors.tenantMismatch();
    }

    // Check if user is active
    if (!portalUser.isActive) {
        log.auth('login', decodedToken.uid, false, { reason: 'user_inactive' });
        return errors.forbidden('Your account has been disabled. Contact your administrator.');
    }

    // Create session token
    const sessionToken = await createSession(portalUser, subdomain);

    // Set session cookie
    await setSessionCookie(sessionToken);

    // Update last login
    await updateLastLogin(decodedToken.uid);

    // Log successful login
    log.auth('login', decodedToken.uid, true, { email, subdomain });

    // Return success response
    const response: LoginResponse = {
        user: {
            id: portalUser.id,
            email: portalUser.email,
            displayName: portalUser.displayName || null,
            role: portalUser.role,
        },
        client: {
            id: client.id,
            name: client.name,
            logoUrl: client.logoUrl,
        },
    };

    return successResponse(response);
}

export const POST = withErrorHandling(handler);
