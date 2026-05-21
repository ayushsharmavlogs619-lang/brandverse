import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { config } from "./config";

const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
    measurementId: config.firebase.measurementId
};

// Initialize Firebase with error handling
let app: FirebaseApp | null = null;
try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
    console.error('Firebase initialization error:', error);
    app = null;
}

const db: Firestore | null = app ? getFirestore(app) : null;
const auth: Auth | null = app ? getAuth(app) : null;

// Initialize Analytics conditionally (only in browser) with error handling
const analytics: Promise<Analytics | null> | null = app && typeof window !== 'undefined' 
    ? isSupported()
        .then((supported) => {
            if (!supported) return null;
            try {
                return getAnalytics(app!);
            } catch (error) {
                console.warn('Analytics initialization failed:', error);
                return null;
            }
        })
        .catch((error) => {
            console.warn('Analytics support check failed:', error);
            return null;
        }) 
    : null;

export { app, db, auth, analytics };