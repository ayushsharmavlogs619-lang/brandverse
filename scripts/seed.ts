/**
 * Seed script for demo clients
 * Run with: npx ts-node --require dotenv/config scripts/seed.ts
 * Make sure your .env.local file has the Firebase configuration
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const app = initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
});

const db = getFirestore(app);

// Demo clients data
const clients = [
    {
        id: 'phantomcat',
        data: {
            name: 'Phantom Cat AI',
            theme: {
                primaryColor: '#FF6B6B',
                secondaryColor: '#FF8E8E',
                backgroundColor: '#1a1a2e',
                textColor: '#ffffff',
                accentColor: '#ffd93d',
            },
            features: {
                dashboard: true,
                analytics: true,
                reports: true,
                settings: true,
                deployments: true,
            },
            isActive: true,
            plan: 'pro',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
    {
        id: 'acme',
        data: {
            name: 'ACME Corp',
            theme: {
                primaryColor: '#4ECDC4',
                secondaryColor: '#6EE7DE',
                backgroundColor: '#16213e',
                textColor: '#ffffff',
                accentColor: '#f77f00',
            },
            features: {
                dashboard: true,
                analytics: true,
                reports: false,
                settings: true,
                deployments: true,
            },
            isActive: true,
            plan: 'enterprise',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
];

async function seed() {
    console.log('🌱 Starting seed...');

    // Create clients
    for (const client of clients) {
        console.log(`  Creating client: ${client.id}`);
        await db.collection('clients').doc(client.id).set(client.data);
    }

    console.log('✅ Seed complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Create users in Firebase Auth for each client');
    console.log('2. Create portal_users documents linking Firebase UID to clientId');
    console.log('3. Test login at phantomcat.localhost:3000/portal');

    process.exit(0);
}

seed().catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
});
