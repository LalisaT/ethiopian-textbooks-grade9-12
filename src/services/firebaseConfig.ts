import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  Firestore,
} from "firebase/firestore";

// Official Ethiopian Textbooks Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyArJuvaayl0rM8GxxgGU_Birr9OiClGUEM",
  authDomain: "ethiopian-textbooks.firebaseapp.com",
  projectId: "ethiopian-textbooks",
  storageBucket: "ethiopian-textbooks.firebasestorage.app",
  messagingSenderId: "83809959551",
  appId: "1:83809959551:web:fa4d274718caeddb4b894a",
  measurementId: "G-VXRKFZRVB8"
};

// Initialize Firebase App as Singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Cloud Firestore Database Instance with Single-Tab Mobile WebView Persistence
function initDb(): Firestore {
  try {
    if (typeof window !== 'undefined') {
      return initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentSingleTabManager({ forceOwnership: true }),
        }),
        experimentalAutoDetectLongPolling: true,
      });
    }
    return getFirestore(app);
  } catch (e) {
    console.warn('initializeFirestore warning, falling back to default:', e);
    try {
      return getFirestore(app);
    } catch {
      return initializeFirestore(app, {});
    }
  }
}

export const db: Firestore = initDb();

/**
 * Safely sanitizes an object before writing to Firestore.
 * Firestore throws a hard exception if any property is undefined.
 * This recursively converts undefined properties to empty strings or deletes them,
 * ensuring setDoc and updateDoc never crash.
 */
export function sanitizeForFirestore<T extends Record<string, any>>(data: T): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      continue;
    }
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      clean[key] = sanitizeForFirestore(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

// Google Analytics (Initialized conditionally in supported browser environments)
export const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

// Auto-initialize analytics
initAnalytics().catch(() => {});
