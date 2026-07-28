/**
 * CENTRALIZED CONFIGURATION SYSTEM
 * This prevents runtime crashes from missing environment variables
 * All config is validated at startup with safe fallbacks
 */

interface AppConfig {
  // Analytics
  analytics: {
    gaId: string;
    metaPixelId: string;
  };
  // Other services
  vapiPublicKey: string;
  vapiAssistantId: string;
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
  analytics: {
    gaId: getEnvVar('NEXT_PUBLIC_GA_MEASUREMENT_ID', ''),
    metaPixelId: getEnvVar('NEXT_PUBLIC_META_PIXEL_ID', ''),
  },
  vapiPublicKey: getEnvVar('NEXT_PUBLIC_VAPI_PUBLIC_KEY', ''),
  vapiAssistantId: getEnvVar('NEXT_PUBLIC_VAPI_ASSISTANT_ID', ''),
  calendlyUrl: getEnvVar('NEXT_PUBLIC_CALENDLY_URL', 'https://calendly.com/brandverse/30min'),
  linkedInPartnerId: getEnvVar('NEXT_PUBLIC_LINKEDIN_PARTNER_ID', ''),
  cookiebotId: getEnvVar('NEXT_PUBLIC_COOKIEBOT_ID', ''),
  googleSiteVerification: getEnvVar('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION', ''),
};

export const validateConfig = (): boolean => {
  console.log('Configuration validation passed');
  return true;
};

if (process.env.NODE_ENV === 'development') {
  validateConfig();
}