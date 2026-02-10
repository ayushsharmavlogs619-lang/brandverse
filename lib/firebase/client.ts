/**
 * Firebase Client SDK initialization for client-side operations
 * Used for: Authentication, real-time listeners, client-side Firestore
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type Auth,
    type User,
    type UserCredential
} from 'firebase/auth';
import {
    getFirestore,
    type Firestore
} from 'firebase/firestore';

/**
 * Firebase Client configuration from environment variables
 * These are PUBLIC keys - safe to expose in client bundles
 */
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initialize Firebase Client SDK singleton
 * Returns existing app if already initialized
 */
function initializeFirebaseClient(): FirebaseApp {
    const existingApps = getApps();

    if (existingApps.length > 0) {
        return existingApps[0];
    }

    return initializeApp(firebaseConfig);
}

// Initialize the client app
const clientApp = initializeFirebaseClient();

// Export initialized services
export const auth: Auth = getAuth(clientApp);
export const db: Firestore = getFirestore(clientApp);

/**
 * Sign in with email and password
 * @param email - User email
 * @param password - User password
 * @returns User credential
 * @throws Error on authentication failure
 */
export async function signIn(
    email: string,
    password: string
): Promise<UserCredential> {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
        const firebaseError = error as { code?: string; message?: string };

        // Map Firebase error codes to user-friendly messages
        const errorMessages: Record<string, string> = {
            'auth/invalid-email': 'Invalid email address',
            'auth/user-disabled': 'This account has been disabled',
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later',
            'auth/invalid-credential': 'Invalid email or password',
        };

        const message = errorMessages[firebaseError.code || ''] || 'Authentication failed';
        throw new Error(message);
    }
}

/**
 * Register a new user with email and password
 * @param email - User email
 * @param password - User password
 * @returns User credential
 * @throws Error on registration failure
 */
export async function register(
    email: string,
    password: string
): Promise<UserCredential> {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
        const firebaseError = error as { code?: string; message?: string };

        const errorMessages: Record<string, string> = {
            'auth/email-already-in-use': 'An account with this email already exists',
            'auth/invalid-email': 'Invalid email address',
            'auth/operation-not-allowed': 'Email/password accounts are not enabled',
            'auth/weak-password': 'Password is too weak',
        };

        const message = errorMessages[firebaseError.code || ''] || 'Registration failed';
        throw new Error(message);
    }
}

/**
 * Sign out the current user
 */
export async function logout(): Promise<void> {
    await signOut(auth);
}

/**
 * Get the current Firebase ID token
 * @param forceRefresh - Force refresh of the token
 * @returns ID token string or null if not authenticated
 */
export async function getIdToken(forceRefresh = false): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;

    try {
        return await user.getIdToken(forceRefresh);
    } catch {
        return null;
    }
}

/**
 * Subscribe to auth state changes
 * @param callback - Function called when auth state changes
 * @returns Unsubscribe function
 */
export function onAuthChange(
    callback: (user: User | null) => void
): () => void {
    return onAuthStateChanged(auth, callback);
}

/**
 * Get the current authenticated user
 * @returns Current user or null
 */
export function getCurrentUser(): User | null {
    return auth.currentUser;
}

export default clientApp;
