/**
 * Brandverse Health Check Script
 * 
 * This script performs automated health checks on the Brandverse infrastructure.
 * It does NOT deploy anything - it only diagnoses and reports issues.
 * 
 * Usage: node scripts/health-check.js
 * 
 * Environment variables needed:
 * - NEXT_PUBLIC_WORKER_URL (defaults to https://edge.brandverse.tech)
 * - Optional: VAPI_API_KEY, FIREBASE_API_KEY, etc. for deeper checks
 */

import https from 'https';
import http from 'http';
import dns from 'dns';

// Configuration
const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://edge.brandverse.tech';
const MAIN_SITE_URL = 'https://brandverse.tech';
const TIMEOUT_MS = 10000;

// Health check results
const results = {
  timestamp: new Date().toISOString(),
  checks: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0
  }
};

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

// HTTP request helper
function checkUrl(url, method = 'GET', data = null) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      method,
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      headers: data ? { 'Content-Type': 'application/json' } : {},
      timeout: TIMEOUT_MS
    };

    const protocol = urlObj.protocol === 'https:' ? https : http;

    const req = protocol.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 400,
          response: body
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        url,
        status: 0,
        success: false,
        error: error.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        success: false,
        error: 'Request timeout'
      });
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Check 1: Main Website Availability
async function checkMainSite() {
  logSection('CHECK 1: Main Website Availability');
  
  const result = await checkUrl(MAIN_SITE_URL);
  const check = {
    name: 'Main Website',
    url: MAIN_SITE_URL,
    status: result.success ? 'PASS' : 'FAIL',
    details: result.success 
      ? `HTTP ${result.status}` 
      : `Error: ${result.error || 'HTTP ' + result.status}`
  };
  
  results.checks.push(check);
  results.summary.total++;
  
  if (result.success) {
    results.summary.passed++;
    log(`✓ Main website is accessible (HTTP ${result.status})`, 'green');
  } else {
    results.summary.failed++;
    log(`✗ Main website is not accessible: ${check.details}`, 'red');
  }
  
  return result.success;
}

// Check 2: Worker Proxy Availability
async function checkWorkerProxy() {
  logSection('CHECK 2: Worker Proxy Availability');
  
  const result = await checkUrl(WORKER_URL);
  const check = {
    name: 'Worker Proxy',
    url: WORKER_URL,
    status: result.success ? 'PASS' : 'FAIL',
    details: result.success 
      ? `HTTP ${result.status}` 
      : `Error: ${result.error || 'HTTP ' + result.status}`
  };
  
  results.checks.push(check);
  results.summary.total++;
  
  if (result.success) {
    results.summary.passed++;
    log(`✓ Worker proxy is accessible (HTTP ${result.status})`, 'green');
  } else {
    results.summary.failed++;
    log(`✗ Worker proxy is not accessible: ${check.details}`, 'red');
  }
  
  return result.success;
}

// Check 3: Worker Reachability (read-only probe)
// NOTE: We intentionally do NOT POST a fake lead to production during a health
// check. A GET probe is enough to verify the worker is live without polluting
// the leads database.
async function checkWorkerProbe() {
  logSection('CHECK 3: Worker Probe (read-only)');
  
  // GET -> the worker should answer anything; we only care that it is reachable.
  const result = await checkUrl(WORKER_URL);
  const reachable = result.status !== 0;
  const check = {
    name: 'Worker Probe',
    url: WORKER_URL,
    status: reachable ? 'PASS' : 'FAIL',
    details: reachable
      ? `Responded (HTTP ${result.status})`
      : `Error: ${result.error || 'No response'}`
  };
  
  results.checks.push(check);
  results.summary.total++;
  
  if (reachable) {
    results.summary.passed++;
    log(`✓ Worker is reachable (HTTP ${result.status})`, 'green');
  } else {
    results.summary.failed++;
    log(`✗ Worker is not reachable: ${check.details}`, 'red');
  }
  
  return reachable;
}

// Check 4: DNS Resolution
async function checkDNS() {
  logSection('CHECK 4: DNS Resolution');
  
  const dnsPromises = dns.promises;
  
  try {
    const addresses = await dnsPromises.lookup('brandverse.tech');
    const check = {
      name: 'DNS Resolution',
      url: 'brandverse.tech',
      status: 'PASS',
      details: `Resolved to ${addresses.address}`
    };
    
    results.checks.push(check);
    results.summary.total++;
    results.summary.passed++;
    
    log(`✓ DNS resolves to ${addresses.address}`, 'green');
    return true;
  } catch (error) {
    const check = {
      name: 'DNS Resolution',
      url: 'brandverse.tech',
      status: 'FAIL',
      details: `Error: ${error.message}`
    };
    
    results.checks.push(check);
    results.summary.total++;
    results.summary.failed++;
    
    log(`✗ DNS resolution failed: ${error.message}`, 'red');
    return false;
  }
}

// Check 5: SSL Certificate
async function checkSSL() {
  logSection('CHECK 5: SSL Certificate');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'brandverse.tech',
      port: 443,
      method: 'GET',
      timeout: TIMEOUT_MS
    };
    
    const req = https.request(options, (res) => {
      const cert = res.socket.getPeerCertificate();
      
      if (cert && cert.valid_to) {
        const expiryDate = new Date(cert.valid_to);
        const daysUntilExpiry = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
        
        const check = {
          name: 'SSL Certificate',
          url: 'brandverse.tech',
          status: daysUntilExpiry > 7 ? 'PASS' : 'WARNING',
          details: `Expires in ${daysUntilExpiry} days (${cert.valid_to})`
        };
        
        results.checks.push(check);
        results.summary.total++;
        
        if (daysUntilExpiry > 7) {
          results.summary.passed++;
          log(`✓ SSL certificate valid for ${daysUntilExpiry} more days`, 'green');
        } else {
          results.summary.warnings++;
          log(`⚠ SSL certificate expires in ${daysUntilExpiry} days - renew soon!`, 'yellow');
        }

        // Drain the response body so the socket closes cleanly.
        res.on('data', () => {});
        res.on('end', () => {
          resolve(daysUntilExpiry > 7);
        });
      } else {
        const check = {
          name: 'SSL Certificate',
          url: 'brandverse.tech',
          status: 'FAIL',
          details: 'Could not retrieve certificate'
        };

        results.checks.push(check);
        results.summary.total++;
        results.summary.failed++;

        log(`✗ Could not retrieve SSL certificate`, 'red');
        res.on('data', () => {});
        res.on('end', () => resolve(false));
      }
    });
    
    req.on('error', (error) => {
      const check = {
        name: 'SSL Certificate',
        url: 'brandverse.tech',
        status: 'FAIL',
        details: `Error: ${error.message}`
      };
      
      results.checks.push(check);
      results.summary.total++;
      results.summary.failed++;
      
      log(`✗ SSL check failed: ${error.message}`, 'red');
      resolve(false);
    });
    
    req.on('timeout', () => {
      req.destroy();
      const check = {
        name: 'SSL Certificate',
        url: 'brandverse.tech',
        status: 'FAIL',
        details: 'Request timeout'
      };
      
      results.checks.push(check);
      results.summary.total++;
      results.summary.failed++;
      
      log(`✗ SSL check timed out`, 'red');
      resolve(false);
    });
    
    req.end();
  });
}

// Check 6: Environment Variables
function checkEnvironmentVariables() {
  logSection('CHECK 6: Environment Variables');
  
  const criticalVars = [
    'NEXT_PUBLIC_WORKER_URL'
  ];
  
  const optionalVars = [
    'NEXT_PUBLIC_VAPI_PUBLIC_KEY',
    'NEXT_PUBLIC_VAPI_ASSISTANT_ID',
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'NEXT_PUBLIC_VAPID_PUBLIC_KEY',
    'MAILCHIMP_API_KEY',
    'NEXT_PUBLIC_CALENDLY_URL'
  ];
  
  let criticalSet = 0;
  let optionalSet = 0;
  
  log('Critical Variables:', 'cyan');
  criticalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      criticalSet++;
      log(`  ✓ ${varName} is set`, 'green');
    } else {
      log(`  ✗ ${varName} is NOT set`, 'red');
    }
  });
  
  log('\nOptional Variables:', 'cyan');
  optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      optionalSet++;
      log(`  ✓ ${varName} is set`, 'green');
    } else {
      log(`  ⚪ ${varName} is not set (optional)`, 'yellow');
    }
  });
  
  const check = {
    name: 'Environment Variables',
    status: criticalSet === criticalVars.length ? 'PASS' : 'WARNING',
    details: `${criticalSet}/${criticalVars.length} critical, ${optionalSet}/${optionalVars.length} optional set`
  };
  
  results.checks.push(check);
  results.summary.total++;
  
  if (criticalSet === criticalVars.length) {
    results.summary.passed++;
  } else {
    results.summary.warnings++;
  }
  
  return criticalSet === criticalVars.length;
}

// Check 7: Build Configuration
function checkBuildConfiguration() {
  logSection('CHECK 7: Build Configuration');
  
  const requiredFiles = [
    'package.json',
    'next.config.ts',
    'tsconfig.json',
    'wrangler.toml'
  ];
  
  let allPresent = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      log(`  ✓ ${file} exists`, 'green');
    } else {
      log(`  ✗ ${file} is missing`, 'red');
      allPresent = false;
    }
  });
  
  const check = {
    name: 'Build Configuration',
    status: allPresent ? 'PASS' : 'FAIL',
    details: allPresent ? 'All required files present' : 'Some required files missing'
  };
  
  results.checks.push(check);
  results.summary.total++;
  
  if (allPresent) {
    results.summary.passed++;
  } else {
    results.summary.failed++;
  }
  
  return allPresent;
}

// Check 8: Dependencies
function checkDependencies() {
  logSection('CHECK 8: Dependencies');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  
  if (!fs.existsSync(packageJsonPath)) {
    log('  ✗ package.json not found', 'red');
    results.checks.push({
      name: 'Dependencies',
      status: 'FAIL',
      details: 'package.json not found'
    });
    results.summary.total++;
    results.summary.failed++;
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  log(`  ✓ Found ${dependencies.length} production dependencies`, 'green');
  log(`  ✓ Found ${devDependencies.length} dev dependencies`, 'green');
  
  if (!fs.existsSync(nodeModulesPath)) {
    log('  ⚠ node_modules directory not found - run npm install', 'yellow');
    results.checks.push({
      name: 'Dependencies',
      status: 'WARNING',
      details: 'node_modules not found'
    });
    results.summary.total++;
    results.summary.warnings++;
    return false;
  }
  
  results.checks.push({
    name: 'Dependencies',
    status: 'PASS',
    details: `${dependencies.length} prod, ${devDependencies.length} dev dependencies installed`
  });
  results.summary.total++;
  results.summary.passed++;
  
  return true;
}

// Print summary
function printSummary() {
  logSection('HEALTH CHECK SUMMARY');
  
  log(`Total Checks: ${results.summary.total}`, 'cyan');
  log(`Passed: ${results.summary.passed}`, 'green');
  log(`Failed: ${results.summary.failed}`, results.summary.failed > 0 ? 'red' : 'green');
  log(`Warnings: ${results.summary.warnings}`, results.summary.warnings > 0 ? 'yellow' : 'green');
  
  console.log('\nDetailed Results:');
  results.checks.forEach(check => {
    const statusColor = check.status === 'PASS' ? 'green' : 
                       check.status === 'WARNING' ? 'yellow' : 'red';
    const statusSymbol = check.status === 'PASS' ? '✓' : 
                        check.status === 'WARNING' ? '⚠' : '✗';
    log(`  ${statusSymbol} ${check.name}: ${check.details}`, statusColor);
  });
  
  console.log('\n' + '='.repeat(60));
  
  if (results.summary.failed === 0 && results.summary.warnings === 0) {
    log('✓ All systems operational!', 'green');
  } else if (results.summary.failed === 0) {
    log('⚠ Systems operational with warnings - review above', 'yellow');
  } else {
    log('✗ CRITICAL ISSUES DETECTED - immediate attention required', 'red');
  }
  
  console.log('='.repeat(60) + '\n');
  
  // Output JSON for programmatic use
  console.log('JSON Output:');
  console.log(JSON.stringify(results, null, 2));
}

// Main execution
async function main() {
  log('Brandverse Health Check Script', 'cyan');
  log(`Started at: ${results.timestamp}`, 'cyan');
  
  try {
    await checkMainSite();
    await checkWorkerProxy();
    await checkWorkerProbe();
    await checkDNS();
    await checkSSL();
    checkEnvironmentVariables();
    checkBuildConfiguration();
    checkDependencies();
    
    printSummary();
    
    // Exit with appropriate code
    process.exit(results.summary.failed > 0 ? 1 : 0);
  } catch (error) {
    log(`\n✗ Health check failed with error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, results };
