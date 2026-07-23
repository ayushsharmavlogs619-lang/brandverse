/**
 * Environment Variable Verification Script
 * 
 * This script verifies that all required environment variables are set
 * and provides recommendations for missing variables.
 * 
 * Usage: node scripts/verify-env.js
 * 
 * This script does NOT modify any configuration - it only reports.
 */

const fs = require('fs');
const path = require('path');

// Required variables for full functionality
const requiredVars = {
  // Worker Proxy (Critical for lead capture)
  NEXT_PUBLIC_WORKER_URL: {
    description: 'Worker Proxy URL for lead capture',
    defaultValue: 'https://edge.brandverse.tech',
    critical: true
  },
  
  // Firebase (Required for auth/cloud functions)
  NEXT_PUBLIC_FIREBASE_API_KEY: {
    description: 'Firebase Web API Key',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: {
    description: 'Firebase Auth Domain',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: {
    description: 'Firebase Project ID',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: {
    description: 'Firebase Storage Bucket',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: {
    description: 'Firebase Messaging Sender ID',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_FIREBASE_APP_ID: {
    description: 'Firebase App ID',
    defaultValue: null,
    critical: false
  },
  
  // AI Services
  GOOGLE_GENERATIVE_AI_API_KEY: {
    description: 'Google Generative AI API Key',
    defaultValue: null,
    critical: false
  },
  CEREBRAS_API_KEY: {
    description: 'Cerebras API Key',
    defaultValue: null,
    critical: false
  },
  
  // Voice AI
  VAPI_API_KEY: {
    description: 'Vapi API Key',
    defaultValue: null,
    critical: false
  },
  VAPI_PHONE_NUMBER: {
    description: 'Vapi Phone Number',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: {
    description: 'Vapi Public Key',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_VAPI_ASSISTANT_ID: {
    description: 'Vapi Assistant ID',
    defaultValue: null,
    critical: false
  },
  
  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: {
    description: 'Google Analytics Measurement ID',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_META_PIXEL_ID: {
    description: 'Meta Pixel ID',
    defaultValue: null,
    critical: false
  },
  
  // Marketing
  NEXT_PUBLIC_MAILCHIMP_API_KEY: {
    description: 'Mailchimp API Key',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID: {
    description: 'Mailchimp Audience ID',
    defaultValue: null,
    critical: false
  },
  
  // Scheduling
  NEXT_PUBLIC_CALENDLY_URL: {
    description: 'Calendly URL',
    defaultValue: null,
    critical: false
  },
  
  // Compliance
  NEXT_PUBLIC_COOKIEBOT_ID: {
    description: 'Cookiebot ID',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_LINKEDIN_PARTNER_ID: {
    description: 'LinkedIn Partner ID',
    defaultValue: null,
    critical: false
  },
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: {
    description: 'Google Site Verification Token',
    defaultValue: null,
    critical: false
  },
  
  // Web Push
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: {
    description: 'VAPID Public Key for web push',
    defaultValue: null,
    critical: false
  }
};

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(title, 'cyan');
  console.log('='.repeat(70));
}

// Load environment from .env.local if it exists
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^#].+?)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        // Remove quotes if present
        envVars[key] = value.replace(/^['"]|['"]$/g, '');
      }
    });
    
    return envVars;
  }
  return {};
}

// Verify environment variables
function verifyEnvironment() {
  log('Brandverse Environment Variable Verification', 'cyan');
  log(`Checking ${Object.keys(requiredVars).length} environment variables\n`, 'cyan');
  
  const envVars = loadEnvFile();
  const results = {
    critical: { set: [], missing: [], usingDefault: [] },
    optional: { set: [], missing: [] },
    total: { set: 0, missing: 0 }
  };
  
  Object.entries(requiredVars).forEach(([key, config]) => {
    const value = process.env[key] || envVars[key];
    const isSet = !!value;
    const hasDefault = !!config.defaultValue;
    
    if (config.critical) {
      if (isSet) {
        results.critical.set.push(key);
        results.total.set++;
      } else if (hasDefault) {
        results.critical.usingDefault.push({ key, defaultValue: config.defaultValue });
        results.total.set++;
      } else {
        results.critical.missing.push(key);
        results.total.missing++;
      }
    } else {
      if (isSet) {
        results.optional.set.push(key);
        results.total.set++;
      } else {
        results.optional.missing.push(key);
        results.total.missing++;
      }
    }
  });
  
  // Print results
  logSection('CRITICAL VARIABLES');
  
  if (results.critical.set.length > 0) {
    log('✓ Set:', 'green');
    results.critical.set.forEach(key => {
      const value = process.env[key] || envVars[key];
      log(`  ${key} = ${value.substring(0, 30)}${value.length > 30 ? '...' : ''}`, 'green');
    });
  }
  
  if (results.critical.usingDefault.length > 0) {
    log('\n⚠ Using Default Values:', 'yellow');
    results.critical.usingDefault.forEach(({ key, defaultValue }) => {
      log(`  ${key} = ${defaultValue} (default)`, 'yellow');
    });
  }
  
  if (results.critical.missing.length > 0) {
    log('\n✗ Missing:', 'red');
    results.critical.missing.forEach(key => {
      log(`  ${key} - ${requiredVars[key].description}`, 'red');
    });
  }
  
  logSection('EXTERNAL SERVICES (Optional)');
  
  if (results.optional.set.length > 0) {
    log(`✓ ${results.optional.set.length} optional variables set:`, 'green');
    results.optional.set.forEach(key => {
      log(`  ${key}`, 'green');
    });
  }
  
  if (results.optional.missing.length > 0) {
    log(`\n⚪ ${results.optional.missing.length} optional variables not set:`, 'yellow');
    results.optional.missing.forEach(key => {
      log(`  ${key} - ${requiredVars[key].description}`, 'yellow');
    });
  }
  
  // Summary
  logSection('SUMMARY');
  
  log(`Total Variables: ${results.total.set + results.total.missing}`, 'cyan');
  log(`Set: ${results.total.set}`, 'green');
  log(`Missing: ${results.total.missing}`, results.total.missing > 0 ? 'yellow' : 'green');
  
  // Recommendations
  if (results.critical.missing.length > 0) {
    logSection('RECOMMENDATIONS');
    log('Critical variables are missing. Add them to your .env.local file:', 'yellow');
    console.log('\n');
    results.critical.missing.forEach(key => {
      const config = requiredVars[key];
      console.log(`${key}=${config.defaultValue || 'YOUR_VALUE_HERE'}`);
      console.log(`# ${config.description}\n`);
    });
  }
  
  if (results.optional.missing.length > 0) {
    logSection('OPTIONAL ENHANCEMENTS');
    log('Consider setting these optional variables for full functionality:', 'yellow');
    console.log('\n');
    results.optional.missing.forEach(key => {
      const config = requiredVars[key];
      console.log(`${key}=YOUR_VALUE_HERE`);
      console.log(`# ${config.description}\n`);
    });
  }
  
  // Final status
  console.log('\n' + '='.repeat(70));
  
  if (results.critical.missing.length === 0) {
    log('✓ All critical environment variables are configured!', 'green');
    log('  The application will function with full lead capture capability.', 'green');
  } else {
    log('✗ Critical environment variables are missing!', 'red');
    log('  Lead capture and other features may not work correctly.', 'red');
  }
  
  if (results.optional.missing.length > 0) {
    log(`\n⚠ ${results.optional.missing.length} optional variables not set.`, 'yellow');
    log('  Some features (analytics, AI, etc.) may not work.', 'yellow');
  } else {
    log('\n✓ All optional variables are configured for full functionality.', 'green');
  }
  
  console.log('='.repeat(70) + '\n');
  
  // Return exit code
  return results.critical.missing.length === 0 ? 0 : 1;
}

// Run verification
if (require.main === module) {
  const exitCode = verifyEnvironment();
  process.exit(exitCode);
}

module.exports = { verifyEnvironment, requiredVars };
