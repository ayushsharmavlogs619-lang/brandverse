/**
 * Deployments data operations with Firestore
 * Manages AI bot deployments for tenants
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Deployment } from '@/types/portal';

const DEPLOYMENTS_COLLECTION = 'deployments';

/**
 * Get all deployments for a specific client
 * @param clientId - Client subdomain/ID
 * @returns Array of deployments
 */
export async function getDeploymentsByClient(clientId: string): Promise<Deployment[]> {
    if (!clientId) return [];

    try {
        const snapshot = await adminDb
            .collection(DEPLOYMENTS_COLLECTION)
            .where('clientId', '==', clientId)
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                type: data.type,
                status: data.status,
                clientId: data.clientId,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
                config: data.config || {},
                stats: {
                    totalConversations: data.stats?.totalConversations || 0,
                    avgDuration: data.stats?.avgDuration || 0,
                    successRate: data.stats?.successRate || 0,
                    lastActiveAt: data.stats?.lastActiveAt?.toDate()
                }
            } as Deployment;
        });
    } catch (error) {
        console.error(`Error fetching deployments for client ${clientId}:`, error);
        return [];
    }
}

/**
 * Get a specific deployment by ID
 * @param id - Deployment ID
 * @param clientId - Client ID (for security verification)
 * @returns Deployment or null
 */
export async function getDeployment(id: string, clientId: string): Promise<Deployment | null> {
    try {
        const docRef = adminDb.collection(DEPLOYMENTS_COLLECTION).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) return null;
        
        const data = doc.data()!;
        
        // Security check
        if (data.clientId !== clientId) return null;

        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            stats: {
                ...data.stats,
                lastActiveAt: data.stats?.lastActiveAt?.toDate()
            }
        } as Deployment;
    } catch (error) {
        console.error(`Error fetching deployment ${id}:`, error);
        return null;
    }
}
