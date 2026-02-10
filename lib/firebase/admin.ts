/**
 * Firebase Admin SDK initialization for server-side operations
 * Used for: JWT verification, Firestore admin operations, user management
 * 
 * Uses lazy initialization to avoid build-time errors when env vars aren't set
 */

import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Firebase Admin configuration from environment variables
 * These are PRIVATE keys - never expose to client
 */
function getFirebaseAdminConfig() {
    return {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };
}

/**
 * Validate that all required environment variables are present
 * @throws Error if any required config is missing
 */
function validateConfig(): void {
    const config = getFirebaseAdminConfig();
    const missing: string[] = [];

    if (!config.projectId) missing.push('FIREBASE_PROJECT_ID');
    if (!config.clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
    if (!config.privateKey) missing.push('FIREBASE_PRIVATE_KEY');

    if (missing.length > 0) {
        throw new Error(
            `Missing Firebase Admin configuration: ${missing.join(', ')}. ` +
            'Please check your .env.local file.'
        );
    }
}

// Cached instances for lazy initialization
let _adminApp: App | null = null;
let _adminAuth: Auth | null = null;
let _adminDb: Firestore | null = null;

/**
 * Get initialized Firebase Admin App (lazy initialization)
 * Returns existing app if already initialized
 */
export function getAdminApp(): App {
    if (_adminApp) {
        return _adminApp;
    }

    const existingApps = getApps();
    if (existingApps.length > 0) {
        _adminApp = existingApps[0];
        return _adminApp;
    }

    validateConfig();
    const config = getFirebaseAdminConfig();

    _adminApp = initializeApp({
        credential: cert({
            projectId: config.projectId,
            clientEmail: config.clientEmail,
            privateKey: config.privateKey,
        }),
    });

    return _adminApp;
}

/**
 * Get Firebase Auth instance (lazy initialization)
 */
export function getAdminAuth(): Auth {
    if (_adminAuth) {
        return _adminAuth;
    }
    _adminAuth = getAuth(getAdminApp());
    return _adminAuth;
}

/**
 * Get Firebase Firestore instance (lazy initialization)
 */
export function getAdminDb(): Firestore {
    if (_adminDb) {
        return _adminDb;
    }
    _adminDb = getFirestore(getAdminApp());
    return _adminDb;
}

// Convenience exports (will be lazily initialized on first use)
export const adminAuth = {
    get instance() {
        return getAdminAuth();
    },
    verifyIdToken: async (idToken: string) => {
        return getAdminAuth().verifyIdToken(idToken);
    },
    getUser: async (uid: string) => {
        return getAdminAuth().getUser(uid);
    },
    getUserByEmail: async (email: string) => {
        return getAdminAuth().getUserByEmail(email);
    },
    createUser: async (properties: Parameters<Auth['createUser']>[0]) => {
        return getAdminAuth().createUser(properties);
    },
    deleteUser: async (uid: string) => {
        return getAdminAuth().deleteUser(uid);
    },
    createCustomToken: async (uid: string, claims?: Record<string, unknown>) => {
        return getAdminAuth().createCustomToken(uid, claims);
    },
    setCustomUserClaims: async (uid: string, claims: Record<string, unknown>) => {
        return getAdminAuth().setCustomUserClaims(uid, claims);
    },
};

export const adminDb = {
    get instance() {
        return getAdminDb();
    },
    collection: (path: string) => {
        return getAdminDb().collection(path);
    },
    doc: (path: string) => {
        return getAdminDb().doc(path);
    },
};

/**
 * Verify a Firebase ID token
 * @param idToken - The Firebase ID token to verify
 * @returns Decoded token with user info
 * @throws Error if token is invalid or expired
 */
export async function verifyIdToken(idToken: string) {
    try {
        const decodedToken = await getAdminAuth().verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid or expired authentication token');
    }
}

/**
 * Get a user by their UID
 * @param uid - Firebase user UID
 * @returns User record
 */
export async function getUserByUid(uid: string) {
    try {
        return await getAdminAuth().getUser(uid);
    } catch (error) {
        throw new Error(`User not found: ${uid}`);
    }
}

/**
 * Get a user by email
 * @param email - User email address
 * @returns User record or null if not found
 */
export async function getUserByEmail(email: string) {
    try {
        return await getAdminAuth().getUserByEmail(email);
    } catch {
        return null;
    }
}

/**
 * Create a custom token for a user
 * @param uid - User UID
 * @param claims - Additional claims to include
 * @returns Custom token string
 */
export async function createCustomToken(
    uid: string,
    claims?: Record<string, unknown>
) {
    return await getAdminAuth().createCustomToken(uid, claims);
}

/**
 * Set custom user claims
 * @param uid - User UID
 * @param claims - Claims to set
 */
export async function setCustomUserClaims(
    uid: string,
    claims: Record<string, unknown>
) {
    await getAdminAuth().setCustomUserClaims(uid, claims);
}
