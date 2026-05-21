/**
 * SAFE FIREBASE WRAPPER
 * Never crashes due to missing config or initialization errors
 */

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { config } from "./config";

let firebaseApp: FirebaseApp | null = null;
let firestoreDB: Firestore | null = null;
let firebaseAuth: Auth | null = null;
let firebaseAnalytics: Promise<Analytics | null> | null = null;

// Safe initialization that never crashes
const safeInitialize = (): FirebaseApp | null => {
  try {
    if (!config.firebase.apiKey) {
      console.warn('Firebase not initialized: Missing API key');
      return null;
    }

    if (getApps().length > 0) {
      return getApps()[0];
    }

    return initializeApp(config.firebase);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    return null;
  }
};

// Initialize once at module load
firebaseApp = safeInitialize();

// Safe getters with null checks
export const getFirebaseApp = (): FirebaseApp | null => firebaseApp;

export const getFirestoreDB = (): Firestore | null => {
  if (!firebaseApp) {
    console.warn('Firestore not available: Firebase not initialized');
    return null;
  }
  try {
    if (!firestoreDB) {
      firestoreDB = getFirestore(firebaseApp);
    }
    return firestoreDB;
  } catch (error) {
    console.error('Firestore initialization failed:', error);
    return null;
  }
};

export const getFirebaseAuth = (): Auth | null => {
  if (!firebaseApp) {
    console.warn('Firebase Auth not available: Firebase not initialized');
    return null;
  }
  try {
    if (!firebaseAuth) {
      firebaseAuth = getAuth(firebaseApp);
    }
    return firebaseAuth;
  } catch (error) {
    console.error('Firebase Auth initialization failed:', error);
    return null;
  }
};

export const getFirebaseAnalytics = (): Promise<Analytics | null> => {
  if (firebaseAnalytics) {
    return firebaseAnalytics;
  }

  if (!firebaseApp || typeof window === 'undefined') {
    firebaseAnalytics = Promise.resolve(null);
    return firebaseAnalytics;
  }

  firebaseAnalytics = isSupported()
    .then((supported) => {
      if (!supported) {
        console.warn('Analytics not supported in this environment');
        return null;
      }
      try {
        return getAnalytics(firebaseApp);
      } catch (error) {
        console.warn('Analytics initialization failed:', error);
        return null;
      }
    })
    .catch((error) => {
      console.warn('Analytics support check failed:', error);
      return null;
    });

  return firebaseAnalytics;
};

// Backward compatible exports (deprecated but kept for compatibility)
export const app = firebaseApp;
export const db = getFirestoreDB();
export const auth = getFirebaseAuth();
export const analytics = getFirebaseAnalytics();