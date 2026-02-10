/**
 * Register API endpoint
 * POST /api/auth/register
 * 
 * Note: Registration typically requires an invite code or admin approval
 */

import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { createPortalUser, getPortalUserByEmail } from '@/lib/portal/users';
import { getClientBySubdomain } from '@/lib/portal/clients';
import { getSubdomain } from '@/lib/portal/subdomain';
import { checkLoginRateLimit } from '@/lib/security/rateLimit';
import { validateEmail, validatePassword, validateDisplayName } from '@/lib/security/validators';
import { successResponse, errors, withErrorHandling } from '@/lib/utils/errors';
import { log } from '@/lib/utils/logger';
import type { RegisterRequest } from '@/types/portal';

async function handler(request: NextRequest) {
    // Get client IP for rate limiting (use same limiter as login)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown';

    // Check rate limit
    const rateLimit = await checkLoginRateLimit(ip);
    if (!rateLimit.success) {
        return errors.rateLimited(rateLimit.reset);
    }

    // Parse request body
    let body: RegisterRequest;
    try {
        body = await request.json();
    } catch {
        return errors.validationError('Invalid JSON body');
    }

    const { email, password, displayName, inviteCode } = body;

    // Validate input
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        return errors.invalidInput('email', emailValidation.error!);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        return errors.invalidInput('password', passwordValidation.error!);
    }

    if (displayName) {
        const nameValidation = validateDisplayName(displayName);
        if (!nameValidation.valid) {
            return errors.invalidInput('displayName', nameValidation.error!);
        }
    }

    // Get subdomain from request (determines which client to add user to)
    const host = request.headers.get('host') || '';
    const subdomain = getSubdomain(host);

    if (!subdomain) {
        return errors.invalidSubdomain();
    }

    // Verify client exists and is active
    const client = await getClientBySubdomain(subdomain);
    if (!client) {
        return errors.notFound('Organization');
    }

    if (!client.isActive) {
        return errors.clientInactive();
    }

    // Check if user already exists in portal
    const existingUser = await getPortalUserByEmail(email);
    if (existingUser) {
        log.auth('register', null, false, { reason: 'already_exists', email });
        return errors.alreadyExists('User');
    }

    // TODO: Verify invite code if required
    // This is where you'd check against an invites collection
    // For now, we allow open registration (you may want to change this)

    // Create Firebase Auth user
    let firebaseUser;
    try {
        firebaseUser = await adminAuth.createUser({
            email,
            password,
            displayName: displayName || email.split('@')[0],
            emailVerified: false,
        });
    } catch (error: unknown) {
        const firebaseError = error as { code?: string; message?: string };

        if (firebaseError.code === 'auth/email-already-exists') {
            return errors.alreadyExists('User with this email');
        }

        log.error('Firebase user creation failed', { email }, error as Error);
        return errors.internalError('Failed to create user');
    }

    // Create portal user record
    try {
        const portalUser = await createPortalUser(
            firebaseUser.uid,
            email,
            subdomain,
            'member', // New users are members by default
            displayName
        );

        log.auth('register', firebaseUser.uid, true, { email, subdomain });

        return successResponse({
            user: {
                id: portalUser.id,
                email: portalUser.email,
                displayName: portalUser.displayName,
                role: portalUser.role,
            },
            message: 'Registration successful. Please log in.',
        }, 201);

    } catch (error) {
        // If portal user creation fails, delete the Firebase user
        await adminAuth.deleteUser(firebaseUser.uid);

        log.error('Portal user creation failed', { email }, error as Error);
        return errors.internalError('Failed to create user record');
    }
}

export const POST = withErrorHandling(handler);
