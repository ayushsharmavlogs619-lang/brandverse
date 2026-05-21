/**
 * SAFE FIREBASE FOR MR-ANFIELD PROJECT
 * Never crashes due to initialization errors
 */

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDn1-xggEGeRDgYQqjf2hXLpDfSIy8KyK8",
    authDomain: "mr-anfield.firebaseapp.com",
    projectId: "mr-anfield",
    storageBucket: "mr-anfield.firebasestorage.app",
    messagingSenderId: "741789597634",
    appId: "1:741789597634:web:908dccce74f77be50be05b",
    measurementId: "G-RT3Z2F95C3"
};

// Safe initialization
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    if (app) {
        db = getFirestore(app);
    }
} catch (error) {
    console.error('Firebase initialization failed for mr-anfield:', error);
    app = null;
    db = null;
}

export { app, db };