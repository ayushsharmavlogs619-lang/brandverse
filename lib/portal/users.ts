/**
 * Portal user operations with Firestore
 * All queries for user data within the portal
 */

import { adminDb } from '@/lib/firebase/admin';
import type { PortalUser, UserRole } from '@/types/portal';

// Collection name
const USERS_COLLECTION = 'portal_users';

/**
 * Get a portal user by Firebase UID
 * @param uid - Firebase user ID
 * @returns Portal user or null if not found
 */
export async function getPortalUser(uid: string): Promise<PortalUser | null> {
    if (!uid) return null;

    try {
        const docRef = adminDb.collection(USERS_COLLECTION).doc(uid);
        const doc = await docRef.get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data();
        return {
            id: doc.id,
            email: data?.email || '',
            displayName: data?.displayName,
            photoURL: data?.photoURL,
            clientId: data?.clientId || '',
            role: data?.role || 'member',
            createdAt: data?.createdAt?.toDate() || new Date(),
            lastLoginAt: data?.lastLoginAt?.toDate(),
            isActive: data?.isActive ?? true,
        } as PortalUser;
    } catch (error) {
        console.error(`Error fetching user ${uid}:`, error);
        return null;
    }
}

/**
 * Get a portal user by email
 * @param email - User email address
 * @returns Portal user or null if not found
 */
export async function getPortalUserByEmail(
    email: string
): Promise<PortalUser | null> {
    try {
        const snapshot = await adminDb
            .collection(USERS_COLLECTION)
            .where('email', '==', email)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        return {
            id: doc.id,
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL,
            clientId: data.clientId,
            role: data.role || 'member',
            createdAt: data.createdAt?.toDate() || new Date(),
            lastLoginAt: data.lastLoginAt?.toDate(),
            isActive: data.isActive ?? true,
        } as PortalUser;
    } catch (error) {
        console.error(`Error fetching user by email ${email}:`, error);
        return null;
    }
}

/**
 * Get all users for a client
 * @param clientId - Client subdomain
 * @returns Array of portal users
 */
export async function getClientUsers(clientId: string): Promise<PortalUser[]> {
    try {
        const snapshot = await adminDb
            .collection(USERS_COLLECTION)
            .where('clientId', '==', clientId)
            .where('isActive', '==', true)
            .get();

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                email: data.email,
                displayName: data.displayName,
                photoURL: data.photoURL,
                clientId: data.clientId,
                role: data.role || 'member',
                createdAt: data.createdAt?.toDate() || new Date(),
                lastLoginAt: data.lastLoginAt?.toDate(),
                isActive: true,
            } as PortalUser;
        });
    } catch (error) {
        console.error(`Error fetching users for client ${clientId}:`, error);
        return [];
    }
}

/**
 * Create a new portal user
 * @param uid - Firebase UID
 * @param email - User email
 * @param clientId - Associated client subdomain
 * @param role - User role
 * @param displayName - Display name (optional)
 * @returns Created user
 */
export async function createPortalUser(
    uid: string,
    email: string,
    clientId: string,
    role: UserRole = 'member',
    displayName?: string
): Promise<PortalUser> {
    const now = new Date();

    const userData = {
        email,
        clientId,
        role,
        displayName: displayName || email.split('@')[0],
        isActive: true,
        createdAt: now,
        updatedAt: now,
    };

    await adminDb.collection(USERS_COLLECTION).doc(uid).set(userData);

    return {
        id: uid,
        ...userData,
    } as PortalUser;
}

/**
 * Update user's last login timestamp
 * @param uid - User ID
 */
export async function updateLastLogin(uid: string): Promise<void> {
    await adminDb.collection(USERS_COLLECTION).doc(uid).update({
        lastLoginAt: new Date(),
    });
}

/**
 * Update portal user data
 * @param uid - User ID
 * @param updates - Fields to update
 */
export async function updatePortalUser(
    uid: string,
    updates: Partial<Omit<PortalUser, 'id' | 'createdAt'>>
): Promise<void> {
    await adminDb.collection(USERS_COLLECTION).doc(uid).update({
        ...updates,
        updatedAt: new Date(),
    });
}

/**
 * Disable a user (soft delete)
 * @param uid - User ID
 */
export async function disableUser(uid: string): Promise<void> {
    await updatePortalUser(uid, { isActive: false });
}

/**
 * Change user's role
 * @param uid - User ID
 * @param role - New role
 */
export async function changeUserRole(uid: string, role: UserRole): Promise<void> {
    await updatePortalUser(uid, { role });
}

/**
 * Check if user belongs to a client
 * @param uid - User ID
 * @param clientId - Client subdomain
 * @returns True if user belongs to client
 */
export async function userBelongsToClient(
    uid: string,
    clientId: string
): Promise<boolean> {
    const user = await getPortalUser(uid);
    return user !== null && user.clientId === clientId && user.isActive;
}

/**
 * Check if user is admin
 * @param uid - User ID
 * @returns True if user is admin
 */
export async function isUserAdmin(uid: string): Promise<boolean> {
    const user = await getPortalUser(uid);
    return user !== null && user.role === 'admin';
}

/**
 * Get total user count for a client
 * @param clientId - Client subdomain
 * @returns User count
 */
export async function getClientUserCount(clientId: string): Promise<number> {
    const snapshot = await adminDb
        .collection(USERS_COLLECTION)
        .where('clientId', '==', clientId)
        .where('isActive', '==', true)
        .count()
        .get();

    return snapshot.data().count;
}
