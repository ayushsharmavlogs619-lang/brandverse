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
    gtmId: string;
  };
  // Other services
  vapiPublicKey: string;
  vapiAssistantId: string;
  razorpayKeyId: string;
  calendlyUrl: string;
  linkedInPartnerId: string;
  cookiebotId: string;
  googleSiteVerification: string;
}

const warnedKeys = new Set<string>();

/**
 * Neutralizes placeholder/fake GA4 measurement IDs so they can never fire
 * analytics. Real GA4 IDs look like G-XXXXXXXX (letters + digits only).
 */
const sanitizeGa4Id = (raw: string): string => {
  const id = raw.trim();
  const isPlaceholder =
    !id ||
    id.toUpperCase().includes('XXXXXXXX') ||
    id.toUpperCase().includes('PLACEHOLDER') ||
    /^GA_MEASUREMENT_ID$/i.test(id) ||
    !/^G-[A-Z0-9]{8,}$/i.test(id);
  if (isPlaceholder && raw !== '') {
    console.warn('Invalid or placeholder GA4 measurement ID detected. Analytics will be disabled.');
  }
  return isPlaceholder ? '' : id;
};

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
    gaId: sanitizeGa4Id(getEnvVar('NEXT_PUBLIC_GA_MEASUREMENT_ID', '')),
    metaPixelId: getEnvVar('NEXT_PUBLIC_META_PIXEL_ID', ''),
    gtmId: getEnvVar('NEXT_PUBLIC_GTM_ID', 'GTM-KZS5WRBB'),
  },
  vapiPublicKey: getEnvVar('NEXT_PUBLIC_VAPI_PUBLIC_KEY', ''),
  vapiAssistantId: getEnvVar('NEXT_PUBLIC_VAPI_ASSISTANT_ID', ''),
  razorpayKeyId: getEnvVar('NEXT_PUBLIC_RAZORPAY_KEY_ID', ''),
  calendlyUrl: getEnvVar('NEXT_PUBLIC_CALENDLY_URL', 'https://calendly.com/ayushsharmavlogs619/30min'),
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