/**
 * BUILD-TIME ENVIRONMENT VALIDATION
 * Warns about missing environment variables but doesn't fail build
 * The config system has safe fallbacks, so this is just informational
 */

const importantEnvVars = [
  'NEXT_PUBLIC_WORKER_URL',
];

const optionalEnvVars = [
  'NEXT_PUBLIC_MAILCHIMP_API_KEY',
  'NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'NEXT_PUBLIC_META_PIXEL_ID',
  'NEXT_PUBLIC_VAPI_PUBLIC_KEY',
  'NEXT_PUBLIC_VAPI_ASSISTANT_ID',
  'NEXT_PUBLIC_CALENDLY_URL',
  'NEXT_PUBLIC_VAPID_PUBLIC_KEY',
  'NEXT_PUBLIC_LINKEDIN_PARTNER_ID',
  'NEXT_PUBLIC_COOKIEBOT_ID',
  'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
];

console.log('🔍 Checking environment variables...\n');

// Check important variables
console.log('Worker Proxy Config:');
importantEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.warn(`⚠️  NOT SET: ${varName} (leads will use default Worker: https://edge.brandverse.tech)`);
  } else {
    console.log(`✅ ${varName}: ${value}`);
  }
});

// Check optional variables
console.log('\nOptional variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚪ ${varName}: not set (will use defaults)`);
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, Math.min(value.length, 10))}...`);
  }
});

console.log('\n✅ Environment validation check complete\n');
