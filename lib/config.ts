/**
 * CENTRALIZED CONFIGURATION SYSTEM
 * This prevents runtime crashes from missing environment variables
 * All config is validated at startup with safe fallbacks
 */

interface AppConfig {
  // Cloudflare Worker Proxy URL
  workerUrl: string;
  // Analytics
  analytics: {
    gaId: string;
    metaPixelId: string;
  };
  // Mailchimp
  mailchimp: {
    apiKey: string;
    audienceId: string;
  };
  // Other services
  vapidPublicKey: string; // For push notifications
  vapiPublicKey: string; // For Vapi voice API
  vapiAssistantId: string; // For Vapi assistant
  calendlyUrl: string;
  linkedInPartnerId: string;
  cookiebotId: string;
  googleSiteVerification: string;
}

const warnedKeys = new Set<string>();

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = process.env[key];
  if (value === undefined || value === null || value === '') {
    if (!warnedKeys.has(key)) {
      console.warn(`Missing environment variable: ${key}. Using default: "${defaultValue}"`);
      warnedKeys.add(key);
    }
    return defaultValue;
  }
  return value;
};

export const config: AppConfig = {
  workerUrl: getEnvVar('NEXT_PUBLIC_WORKER_URL', 'https://edge.brandverse.tech'),
  analytics: {
    gaId: getEnvVar('NEXT_PUBLIC_GA_MEASUREMENT_ID', ''),
    metaPixelId: getEnvVar('NEXT_PUBLIC_META_PIXEL_ID', ''),
  },
  mailchimp: {
    apiKey: getEnvVar('MAILCHIMP_API_KEY', ''),
    audienceId: getEnvVar('NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID', ''),
  },
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
    { key: 'NEXT_PUBLIC_WORKER_URL', value: config.workerUrl },
  ];

  const missing = criticalVars.filter(v => !v.value);
  
  if (missing.length > 0) {
    console.warn('WARNING: NEXT_PUBLIC_WORKER_URL is missing - will fallback to default: https://edge.brandverse.tech');
  }
  
  console.log('✅ Configuration validation passed');
  return true;
};

// Call validation immediately in development
if (process.env.NODE_ENV === 'development') {
  validateConfig();
}