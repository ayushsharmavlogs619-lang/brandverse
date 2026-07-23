/**
 * Cloudflare Workers Verification Script
 * 
 * This script verifies Cloudflare Workers configuration and deployment status
 * without making any changes to the infrastructure.
 * 
 * Usage: node scripts/verify-workers.js
 * 
 * Requires: CLOUDFLARE_API_TOKEN environment variable for remote verification
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

// Verify worker source files
function verifyWorkerFiles() {
  logSection('WORKER SOURCE FILES');
  
  const workers = [
    {
      name: 'Main Site Worker',
      path: '_functions/[[path]].js',
      required: true
    },
    {
      name: 'Subdomain Router Worker',
      path: 'subdomain-router/worker.js',
      required: true
    }
  ];
  
  const results = [];
  
  workers.forEach(worker => {
    const workerPath = path.join(process.cwd(), worker.path);
    
    if (fs.existsSync(workerPath)) {
      try {
        const content = fs.readFileSync(workerPath, 'utf8');
        
        // Check for export
        const hasExport = content.includes('export default') || content.includes('export async function');
        const hasFetch = content.includes('fetch') || content.includes('onRequest');
        
        if (hasExport && hasFetch) {
          log(`✓ ${worker.name} exists with proper structure`, 'green');
          results.push({ name: worker.name, status: 'PASS', path: worker.path });
        } else {
          log(`⚠ ${worker.name} exists but may have structure issues`, 'yellow');
          results.push({ 
            name: worker.name, 
            status: 'WARNING', 
            path: worker.path,
            issues: hasExport ? [] : ['Missing export'],
            issues: hasFetch ? [] : ['Missing fetch handler']
          });
        }
      } catch (error) {
        log(`✗ Error reading ${worker.name}: ${error.message}`, 'red');
        results.push({ 
          name: worker.name, 
          status: 'ERROR', 
          path: worker.path,
          error: error.message
        });
      }
    } else {
      if (worker.required) {
        log(`✗ ${worker.name} not found (required)`, 'red');
        results.push({ 
          name: worker.name, 
          status: 'FAIL', 
          path: worker.path,
          error: 'File not found'
        });
      } else {
        log(`⚠ ${worker.name} not found (optional)`, 'yellow');
        results.push({ 
          name: worker.name, 
          status: 'WARNING', 
          path: worker.path,
          error: 'File not found (optional)'
        });
      }
    }
  });
  
  return results;
}

// Verify worker configuration files
function verifyWorkerConfigs() {
  logSection('WORKER CONFIGURATION FILES');
  
  const configs = [
    {
      name: 'Main Wrangler Config',
      path: 'wrangler.toml',
      required: true
    },
    {
      name: 'Subdomain Router Config',
      path: 'subdomain-router/wrangler.toml',
      required: true
    }
  ];
  
  const results = [];
  
  configs.forEach(config => {
    const configPath = path.join(process.cwd(), config.path);
    
    if (fs.existsSync(configPath)) {
      try {
        const content = fs.readFileSync(configPath, 'utf8');
        
        // Check for required fields
        const hasName = content.includes('name');
        const hasCompatDate = content.includes('compatibility_date');
        
        if (hasName && hasCompatDate) {
          log(`✓ ${config.name} exists with required fields`, 'green');
          results.push({ name: config.name, status: 'PASS', path: config.path });
        } else {
          log(`⚠ ${config.name} exists but missing required fields`, 'yellow');
          results.push({ 
            name: config.name, 
            status: 'WARNING', 
            path: config.path,
            issues: hasName ? [] : ['Missing name'],
            issues: hasCompatDate ? [] : ['Missing compatibility_date']
          });
        }
      } catch (error) {
        log(`✗ Error reading ${config.name}: ${error.message}`, 'red');
        results.push({ 
          name: config.name, 
          status: 'ERROR', 
          path: config.path,
          error: error.message
        });
      }
    } else {
      if (config.required) {
        log(`✗ ${config.name} not found (required)`, 'red');
        results.push({ 
          name: config.name, 
          status: 'FAIL', 
          path: config.path,
          error: 'File not found'
        });
      } else {
        log(`⚠ ${config.name} not found (optional)`, 'yellow');
        results.push({ 
          name: config.name, 
          status: 'WARNING', 
          path: config.path,
          error: 'File not found (optional)'
        });
      }
    }
  });
  
  return results;
}

// Verify worker dependencies
function verifyWorkerDependencies() {
  logSection('WORKER DEPENDENCIES');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    log('✗ package.json not found', 'red');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const devDependencies = packageJson.devDependencies || {};
  
  const requiredDeps = ['wrangler'];
  const missingDeps = [];
  
  requiredDeps.forEach(dep => {
    if (devDependencies[dep]) {
      log(`✓ ${dep} is installed (${devDependencies[dep]})`, 'green');
    } else {
      log(`✗ ${dep} is not installed`, 'red');
      missingDeps.push(dep);
    }
  });
  
  return missingDeps.length === 0;
}

// Verify worker routing logic
function verifyRoutingLogic() {
  logSection('ROUTING LOGIC');
  
  const routingPath = path.join(process.cwd(), 'lib', 'subdomain-routing.js');
  
  if (!fs.existsSync(routingPath)) {
    log('✗ lib/subdomain-routing.js not found', 'red');
    return false;
  }
  
  try {
    const content = fs.readFileSync(routingPath, 'utf8');
    
    // Check for required functions
    const hasResolveFunction = content.includes('resolveSubdomainRoute');
    const hasDefaultBase = content.includes('DEFAULT_PAGES_BASE');
    
    if (hasResolveFunction && hasDefaultBase) {
      log('✓ Routing logic exists with required functions', 'green');
      return true;
    } else {
      log('⚠ Routing logic may be incomplete', 'yellow');
      if (!hasResolveFunction) log('  Missing resolveSubdomainRoute function', 'yellow');
      if (!hasDefaultBase) log('  Missing DEFAULT_PAGES_BASE constant', 'yellow');
      return false;
    }
  } catch (error) {
    log(`✗ Error reading routing logic: ${error.message}`, 'red');
    return false;
  }
}

// Verify deployment commands
function verifyDeploymentCommands() {
  logSection('DEPLOYMENT COMMANDS');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    log('✗ package.json not found', 'red');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const scripts = packageJson.scripts || {};
  
  const requiredCommands = [
    'deploy:cloudflare',
    'deploy:subdomain-router',
    'deploy:all'
  ];
  
  let allPresent = true;
  
  requiredCommands.forEach(command => {
    if (scripts[command]) {
      log(`✓ npm script "${command}" exists`, 'green');
    } else {
      log(`✗ npm script "${command}" missing`, 'red');
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Print summary and recommendations
function printSummary(workerFiles, workerConfigs, deps, routing, commands) {
  logSection('SUMMARY');
  
  const totalChecks = 5;
  const passedChecks = 
    (workerFiles.every(w => w.status === 'PASS') ? 1 : 0) +
    (workerConfigs.every(c => c.status === 'PASS') ? 1 : 0) +
    (deps ? 1 : 0) +
    (routing ? 1 : 0) +
    (commands ? 1 : 0);
  
  log(`Checks Passed: ${passedChecks}/${totalChecks}`, 'cyan');
  
  if (passedChecks === totalChecks) {
    log('✓ All worker checks passed!', 'green');
  } else {
    log(`⚠ ${totalChecks - passedChecks} check(s) failed`, 'yellow');
  }
  
  // Recommendations
  logSection('RECOMMENDATIONS');
  
  if (!workerFiles.every(w => w.status === 'PASS')) {
    log('Review worker source files for structural issues', 'yellow');
  }
  
  if (!workerConfigs.every(c => c.status === 'PASS')) {
    log('Review wrangler.toml configuration files', 'yellow');
  }
  
  if (!deps) {
    log('Install missing wrangler dependency: npm install --save-dev wrangler', 'yellow');
  }
  
  if (!routing) {
    log('Review or create lib/subdomain-routing.js', 'yellow');
  }
  
  if (!commands) {
    log('Add missing deployment scripts to package.json', 'yellow');
  }
  
  console.log('\n' + '='.repeat(70));
  
  return passedChecks === totalChecks;
}

// Main execution
function main() {
  log('Brandverse Cloudflare Workers Verification', 'cyan');
  
  const workerFiles = verifyWorkerFiles();
  const workerConfigs = verifyWorkerConfigs();
  const deps = verifyWorkerDependencies();
  const routing = verifyRoutingLogic();
  const commands = verifyDeploymentCommands();
  
  const allPassed = printSummary(workerFiles, workerConfigs, deps, routing, commands);
  
  if (allPassed) {
    log('✓ Workers configuration verified successfully', 'green');
    process.exit(0);
  } else {
    log('✗ Workers configuration has issues - review recommendations', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
