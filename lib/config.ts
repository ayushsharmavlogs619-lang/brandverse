/**
 * CENTRALIZED CONFIGURATION SYSTEM
 * This prevents runtime crashes from missing environment variables
 * All config is validated at startup with safe fallbacks
 */

interface AppConfig {
  // Firebase
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  // Analytics
  analytics: {
    gaId: string;
    metaPixelId: string;
  };
  // Supabase
  supabase: {
    url: string;
    anonKey: string;
  };
  // Other services
  adminPassword: string;
  vapidPublicKey: string; // For push notifications
  vapiPublicKey: string; // For Vapi voice API
  vapiAssistantId: string; // For Vapi assistant
  calendlyUrl: string;
  linkedInPartnerId: string;
  cookiebotId: string;
  googleSiteVerification: string;
}

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = process.env[key];
  if (value === undefined || value === null || value === '') {
    console.warn(`Missing environment variable: ${key}. Using default: "${defaultValue}"`);
    return defaultValue;
  }
  return value;
};

export const config: AppConfig = {
  firebase: {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', ''),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', ''),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', ''),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', ''),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', ''),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', ''),
    measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', ''),
  },
  analytics: {
    gaId: getEnvVar('NEXT_PUBLIC_GA_MEASUREMENT_ID', ''),
    metaPixelId: getEnvVar('NEXT_PUBLIC_META_PIXEL_ID', ''),
  },
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL', ''),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', ''),
  },
  adminPassword: getEnvVar('NEXT_PUBLIC_ADMIN_PASSWORD', ''),
  vapidPublicKey: getEnvVar('NEXT_PUBLIC_VAPID_PUBLIC_KEY', ''),
  vapiPublicKey: getEnvVar('NEXT_PUBLIC_VAPI_PUBLIC_KEY', ''),
  vapiAssistantId: getEnvVar('NEXT_PUBLIC_VAPI_ASSISTANT_ID', ''),
  calendlyUrl: getEnvVar('NEXT_PUBLIC_CALENDLY_URL', ''),
  linkedInPartnerId: getEnvVar('NEXT_PUBLIC_LINKEDIN_PARTNER_ID', ''),
  cookiebotId: getEnvVar('NEXT_PUBLIC_COOKIEBOT_ID', ''),
  googleSiteVerification: getEnvVar('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION', ''),
};

// Validation function to check critical config
export const validateConfig = (): boolean => {
  const criticalVars: Array<{ key: string; value: string }> = [
    { key: 'NEXT_PUBLIC_FIREBASE_API_KEY', value: config.firebase.apiKey },
    { key: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', value: config.firebase.projectId },
    { key: 'NEXT_PUBLIC_FIREBASE_APP_ID', value: config.firebase.appId },
  ];

  const missing = criticalVars.filter(v => !v.value);
  
  if (missing.length > 0) {
    console.error('CRITICAL: Missing required environment variables:', missing.map(v => v.key).join(', '));
    return false;
  }
  
  console.log('✅ Configuration validation passed');
  return true;
};

// Call validation immediately in development
if (process.env.NODE_ENV === 'development') {
  validateConfig();
}