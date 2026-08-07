/**
 * Cloudflare Configuration Verification Script
 * 
 * This script verifies Cloudflare Pages and Workers configuration
 * without making any changes to the infrastructure.
 * 
 * Usage: node scripts/verify-cloudflare.js
 * 
 * Requires: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID environment variables
 * If not provided, performs local configuration verification only
 */

const fs = require('fs');
const path = require('path');

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(title, 'cyan');
  console.log('='.repeat(70));
}

// Verify local Cloudflare configuration files
function verifyLocalConfig() {
  logSection('LOCAL CLOUDFLARE CONFIGURATION');
  
  const results = {
    wranglerToml: { exists: false, valid: false, errors: [] },
    pagesConfig: { exists: false, valid: false, errors: [] },
    workerConfig: { exists: false, valid: false, errors: [] }
  };
  
  // Check main wrangler.toml
  const mainWranglerPath = path.join(process.cwd(), 'wrangler.toml');
  if (fs.existsSync(mainWranglerPath)) {
    results.wranglerToml.exists = true;
    try {
      const content = fs.readFileSync(mainWranglerPath, 'utf8');
      
      // Check for required fields
      if (content.includes('name = "brandverse"')) {
        log('✓ wrangler.toml exists with correct project name', 'green');
        results.wranglerToml.valid = true;
      } else {
        log('✗ wrangler.toml exists but project name is incorrect', 'red');
        results.wranglerToml.errors.push('Project name should be "brandverse"');
      }
      
      if (content.includes('pages_build_output_dir')) {
        log('✓ Pages build output directory configured', 'green');
      } else {
        log('⚠ pages_build_output_dir not found in wrangler.toml', 'yellow');
        results.wranglerToml.errors.push('Missing pages_build_output_dir');
      }
    } catch (error) {
      log(`✗ Error reading wrangler.toml: ${error.message}`, 'red');
      results.wranglerToml.errors.push(error.message);
    }
  } else {
    log('✗ wrangler.toml not found', 'red');
    results.wranglerToml.errors.push('File not found');
  }
  
  // Check subdomain router wrangler.toml
  const subdomainWranglerPath = path.join(process.cwd(), 'subdomain-router', 'wrangler.toml');
  if (fs.existsSync(subdomainWranglerPath)) {
    results.workerConfig.exists = true;
    try {
      const content = fs.readFileSync(subdomainWranglerPath, 'utf8');
      log('✓ subdomain-router/wrangler.toml exists', 'green');
      results.workerConfig.valid = true;
    } catch (error) {
      log(`✗ Error reading subdomain-router/wrangler.toml: ${error.message}`, 'red');
      results.workerConfig.errors.push(error.message);
    }
  } else {
    log('✗ subdomain-router/wrangler.toml not found', 'red');
    results.workerConfig.errors.push('File not found');
  }
  
  // Check worker.js
  const workerPath = path.join(process.cwd(), 'subdomain-router', 'worker.js');
  if (fs.existsSync(workerPath)) {
    try {
      const content = fs.readFileSync(workerPath, 'utf8');
      if (content.includes('export default')) {
        log('✓ subdomain-router/worker.js exists with default export', 'green');
      } else {
        log('⚠ subdomain-router/worker.js may not have proper export', 'yellow');
        results.workerConfig.errors.push('Missing default export');
      }
    } catch (error) {
      log(`✗ Error reading worker.js: ${error.message}`, 'red');
      results.workerConfig.errors.push(error.message);
    }
  } else {
    log('✗ subdomain-router/worker.js not found', 'red');
    results.workerConfig.errors.push('File not found');
  }
  
  // Check Pages functions
  const functionsPath = path.join(process.cwd(), 'functions');
  if (fs.existsSync(functionsPath)) {
    const files = fs.readdirSync(functionsPath);
    if (files.length > 0) {
      log(`✓ functions directory exists with ${files.length} file(s)`, 'green');
      results.pagesConfig.exists = true;
      results.pagesConfig.valid = true;
    } else {
      log('⚠ functions directory exists but is empty', 'yellow');
      results.pagesConfig.errors.push('Directory is empty');
    }
  } else {
    log('⚠ functions directory not found (optional for Pages)', 'yellow');
  }
  
  // Check next.config.ts for Pages compatibility
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
  if (fs.existsSync(nextConfigPath)) {
    try {
      const content = fs.readFileSync(nextConfigPath, 'utf8');
      if (content.includes('output: "export"')) {
        log('✓ next.config.ts configured for static export (Pages compatible)', 'green');
        results.pagesConfig.valid = true;
      } else {
        log('✗ next.config.ts not configured for static export', 'red');
        results.pagesConfig.errors.push('Missing output: "export"');
      }
      
      if (content.includes('distDir: "out"')) {
        log('✓ Build output directory set to "out"', 'green');
      } else {
        log('⚠ Build output directory may not be "out"', 'yellow');
        results.pagesConfig.errors.push('distDir should be "out"');
      }
    } catch (error) {
      log(`✗ Error reading next.config.ts: ${error.message}`, 'red');
      results.pagesConfig.errors.push(error.message);
    }
  } else {
    log('✗ next.config.ts not found', 'red');
    results.pagesConfig.errors.push('File not found');
  }
  
  return results;
}

// Verify deployment scripts
function verifyDeploymentScripts() {
  logSection('DEPLOYMENT SCRIPTS');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    log('✗ package.json not found', 'red');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const scripts = packageJson.scripts || {};
  
  const requiredScripts = [
    { name: 'build', required: true },
    { name: 'deploy:cloudflare', required: true },
    { name: 'deploy:subdomain-router', required: true },
    { name: 'deploy:all', required: false }
  ];
  
  let allPresent = true;
  
  requiredScripts.forEach(({ name, required }) => {
    if (scripts[name]) {
      log(`✓ npm script "${name}" exists`, 'green');
    } else if (required) {
      log(`✗ Required npm script "${name}" missing`, 'red');
      allPresent = false;
    } else {
      log(`⚠ Optional npm script "${name}" missing`, 'yellow');
    }
  });
  
  return allPresent;
}

// Verify Cloudflare API credentials (if provided)
function verifyApiCredentials() {
  logSection('CLOUDFLARE API CREDENTIALS');
  
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  
  if (!apiToken && !accountId) {
    log('⚠ CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID not set', 'yellow');
    log('  Skipping remote verification. Local verification only.', 'yellow');
    log('  To enable remote verification, set these environment variables.', 'yellow');
    return null;
  }
  
  if (!apiToken) {
    log('✗ CLOUDFLARE_API_TOKEN not set', 'red');
    return false;
  }
  
  if (!accountId) {
    log('✗ CLOUDFLARE_ACCOUNT_ID not set', 'red');
    return false;
  }
  
  log('✓ Cloudflare API credentials found', 'green');
  log('  API Token: ' + apiToken.substring(0, 10) + '...', 'green');
  log('  Account ID: ' + accountId, 'green');
  
  // Note: Actual API verification would require making HTTP requests
  // This is a placeholder for that functionality
  log('⚠ Remote API verification not implemented in this version', 'yellow');
  log('  Credentials are present but not validated against Cloudflare API', 'yellow');
  
  return true;
}

// Print recommendations
function printRecommendations(localConfig, deploymentScripts, apiCreds) {
  logSection('RECOMMENDATIONS');
  
  const recommendations = [];
  
  if (!localConfig.wranglerToml.valid) {
    recommendations.push({
      priority: 'HIGH',
      issue: 'wrangler.toml configuration issues',
      action: 'Review and fix wrangler.toml configuration'
    });
  }
  
  if (!localConfig.workerConfig.valid) {
    recommendations.push({
      priority: 'HIGH',
      issue: 'Subdomain router configuration issues',
      action: 'Review subdomain-router/wrangler.toml and worker.js'
    });
  }
  
  if (!localConfig.pagesConfig.valid) {
    recommendations.push({
      priority: 'HIGH',
      issue: 'Pages configuration issues',
      action: 'Review next.config.ts for static export configuration'
    });
  }
  
  if (!deploymentScripts) {
    recommendations.push({
      priority: 'MEDIUM',
      issue: 'Missing deployment scripts',
      action: 'Add missing npm scripts to package.json'
    });
  }
  
  if (apiCreds === false) {
    recommendations.push({
      priority: 'MEDIUM',
      issue: 'Cloudflare API credentials missing',
      action: 'Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID for remote verification'
    });
  }
  
  if (apiCreds === null) {
    recommendations.push({
      priority: 'LOW',
      issue: 'Remote verification disabled',
      action: 'Set Cloudflare credentials to enable remote verification'
    });
  }
  
  if (recommendations.length === 0) {
    log('✓ No issues found - configuration looks good!', 'green');
  } else {
    recommendations.forEach(({ priority, issue, action }) => {
      const color = priority === 'HIGH' ? 'red' : priority === 'MEDIUM' ? 'yellow' : 'cyan';
      log(`[${priority}] ${issue}`, color);
      log(`  → ${action}`, color);
    });
  }
}

// Main execution
function main() {
  log('Brandverse Cloudflare Configuration Verification', 'cyan');
  
  const localConfig = verifyLocalConfig();
  const deploymentScripts = verifyDeploymentScripts();
  const apiCreds = verifyApiCredentials();
  
  printRecommendations(localConfig, deploymentScripts, apiCreds);
  
  console.log('\n' + '='.repeat(70));
  
  const hasErrors = 
    !localConfig.wranglerToml.valid || 
    !localConfig.workerConfig.valid || 
    !localConfig.pagesConfig.valid ||
    !deploymentScripts ||
    apiCreds === false;
  
  if (hasErrors) {
    log('✗ Configuration issues detected - review recommendations above', 'red');
    process.exit(1);
  } else {
    log('✓ Cloudflare configuration verified successfully', 'green');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, verifyLocalConfig };
