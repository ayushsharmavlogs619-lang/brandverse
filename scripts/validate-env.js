/**
 * BUILD-TIME ENVIRONMENT VALIDATION
 * Warns about missing environment variables but doesn't fail build
 * The config system has safe fallbacks, so this is just informational
 */

const optionalEnvVars = [
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'NEXT_PUBLIC_META_PIXEL_ID',
  'NEXT_PUBLIC_VAPI_PUBLIC_KEY',
  'NEXT_PUBLIC_VAPI_ASSISTANT_ID',
  'NEXT_PUBLIC_CALENDLY_URL',
  'NEXT_PUBLIC_LINKEDIN_PARTNER_ID',
  'NEXT_PUBLIC_COOKIEBOT_ID',
  'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
];

console.log('Checking environment variables...\n');

console.log('Optional variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`${varName}: not set (will use defaults)`);
  } else {
    console.log(`${varName}: ${value.substring(0, Math.min(value.length, 10))}...`);
  }
});

console.log('\nEnvironment validation check complete\n');