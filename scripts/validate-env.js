/**
 * BUILD-TIME ENVIRONMENT VALIDATION
 * Warns about missing environment variables but doesn't fail build
 * The config system has safe fallbacks, so this is just informational
 */

const importantEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const optionalEnvVars = [
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'NEXT_PUBLIC_META_PIXEL_ID',
  'NEXT_PUBLIC_VAPID_PUBLIC_KEY',
  'NEXT_PUBLIC_LINKEDIN_PARTNER_ID',
  'NEXT_PUBLIC_COOKIEBOT_ID',
  'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
];

console.log('🔍 Checking environment variables...\n');

let missingImportant = false;

// Check important variables
console.log('Important variables (features may not work without these):');
importantEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.warn(`⚠️  NOT SET: ${varName} (some features may not work)`);
    missingImportant = true;
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
  }
});

// Check optional variables
console.log('\nOptional variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚪ ${varName}: not set (will use defaults)`);
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
  }
});

if (missingImportant) {
  console.warn('\n⚠️  WARNING: Some important environment variables are not set');
  console.warn('The app will still build and run, but some features may not work correctly');
  console.warn('Consider setting these variables in .env.local or your deployment platform\n');
} else {
  console.log('\n✅ All important environment variables are set\n');
}