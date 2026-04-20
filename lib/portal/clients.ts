/**
 * Client data operations with Firestore
 * All queries for client/tenant data
 */

import { adminDb } from '@/lib/firebase/admin';
import type { Client, ClientTheme, ClientFeatures } from '@/types/portal';

// Collection name
const CLIENTS_COLLECTION = 'clients';

/**
 * Default theme for new clients
 */
export const DEFAULT_THEME: ClientTheme = {
    primaryColor: '#6366f1',
    secondaryColor: '#818cf8',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    accentColor: '#22d3ee',
};

/**
 * Default features for new clients
 */
export const DEFAULT_FEATURES: ClientFeatures = {
    dashboard: true,
    analytics: false,
    reports: false,
    settings: true,
    deployments: true,
};

/**
 * Get a client by subdomain
 * @param subdomain - Client subdomain identifier
 * @returns Client data or null if not found
 */
export async function getClientBySubdomain(
    subdomain: string
): Promise<Client | null> {
    if (!subdomain) return null;

    try {
        const docRef = adminDb.collection(CLIENTS_COLLECTION).doc(subdomain);
        const doc = await docRef.get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data();
        return {
            id: doc.id,
            subdomain: doc.id,
            name: data?.name || subdomain,
            logoUrl: data?.logoUrl,
            theme: { ...DEFAULT_THEME, ...data?.theme },
            features: { ...DEFAULT_FEATURES, ...data?.features },
            isActive: data?.isActive ?? true,
            createdAt: data?.createdAt?.toDate() || new Date(),
            plan: data?.plan || 'free',
            ownerId: data?.ownerId,
        } as Client;
    } catch (error) {
        console.error(`Error fetching client ${subdomain}:`, error);
        return null;
    }
}

/**
 * Check if a client exists and is active
 * @param subdomain - Client subdomain
 * @returns True if client exists and is active
 */
export async function isValidClient(subdomain: string): Promise<boolean> {
    const client = await getClientBySubdomain(subdomain);
    return client !== null && client.isActive;
}

/**
 * Get all active clients
 * @returns Array of active clients
 */
export async function getAllActiveClients(): Promise<Client[]> {
    try {
        const snapshot = await adminDb
            .collection(CLIENTS_COLLECTION)
            .where('isActive', '==', true)
            .get();

        return snapshot.docs.map((doc: any) => {
            const data = doc.data();
            return {
                id: doc.id,
                subdomain: doc.id,
                name: data.name || doc.id,
                logoUrl: data.logoUrl,
                theme: { ...DEFAULT_THEME, ...data.theme },
                features: { ...DEFAULT_FEATURES, ...data.features },
                isActive: true,
                createdAt: data.createdAt?.toDate() || new Date(),
                plan: data.plan || 'free',
                ownerId: data.ownerId,
            } as Client;
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
        return [];
    }
}

/**
 * Create a new client
 * @param subdomain - Unique subdomain identifier
 * @param name - Display name
 * @param ownerId - Owner user ID
 * @param theme - Custom theme (optional)
 * @param features - Enabled features (optional)
 * @returns Created client
 */
export async function createClient(
    subdomain: string,
    name: string,
    ownerId: string,
    theme?: Partial<ClientTheme>,
    features?: Partial<ClientFeatures>
): Promise<Client> {
    const now = new Date();

    const clientData = {
        name,
        ownerId,
        theme: { ...DEFAULT_THEME, ...theme },
        features: { ...DEFAULT_FEATURES, ...features },
        isActive: true,
        createdAt: now,
        updatedAt: now,
        plan: 'free',
    };

    await adminDb.collection(CLIENTS_COLLECTION).doc(subdomain).set(clientData);

    return {
        id: subdomain,
        subdomain,
        ...clientData,
    } as Client;
}

/**
 * Update client data
 * @param subdomain - Client subdomain
 * @param updates - Fields to update
 */
export async function updateClient(
    subdomain: string,
    updates: Partial<Omit<Client, 'id' | 'subdomain' | 'createdAt'>>
): Promise<void> {
    await adminDb.collection(CLIENTS_COLLECTION).doc(subdomain).update({
        ...updates,
        updatedAt: new Date(),
    });
}

/**
 * Disable a client (soft delete)
 * @param subdomain - Client subdomain
 */
export async function disableClient(subdomain: string): Promise<void> {
    await updateClient(subdomain, { isActive: false });
}

/**
 * Enable a disabled client
 * @param subdomain - Client subdomain
 */
export async function enableClient(subdomain: string): Promise<void> {
    await updateClient(subdomain, { isActive: true });
}

/**
 * Update client theme
 * @param subdomain - Client subdomain
 * @param theme - New theme settings
 */
export async function updateClientTheme(
    subdomain: string,
    theme: Partial<ClientTheme>
): Promise<void> {
    const client = await getClientBySubdomain(subdomain);
    if (!client) throw new Error('Client not found');

    await updateClient(subdomain, {
        theme: { ...client.theme, ...theme },
    });
}

/**
 * Update client features
 * @param subdomain - Client subdomain
 * @param features - New feature flags
 */
export async function updateClientFeatures(
    subdomain: string,
    features: Partial<ClientFeatures>
): Promise<void> {
    const client = await getClientBySubdomain(subdomain);
    if (!client) throw new Error('Client not found');

    await updateClient(subdomain, {
        features: { ...client.features, ...features },
    });
}

/**
 * Get CSS variables for client theme
 * @param client - Client data
 * @returns CSS variables object
 */
export function getClientCSSVariables(
    client: Client
): Record<string, string> {
    return {
        '--portal-primary': client.theme.primaryColor,
        '--portal-secondary': client.theme.secondaryColor,
        '--portal-bg': client.theme.backgroundColor,
        '--portal-text': client.theme.textColor,
        '--portal-accent': client.theme.accentColor || client.theme.primaryColor,
    };
}
