#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Brandverse to Cloudflare Pages...');

// Build the project
console.log('📦 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Static export output (see next.config.js: output: 'export', distDir: 'out')
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir) || !fs.existsSync(path.join(outDir, 'index.html'))) {
  console.error('❌ Build output not found (expected ./out/index.html). Run npm run build first.');
  process.exit(1);
}

// Deploy using Wrangler
console.log('🌐 Deploying to Cloudflare Pages...');
try {
  execSync('npx wrangler pages deploy out --project-name brandverse', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  console.log('✅ Deployment successful!');
  console.log('🎉 Your Brandverse site is now live on Cloudflare Pages!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  
  // Fallback instructions
  console.log('\n📋 Manual deployment steps:');
  console.log('1. Install Wrangler: npm install -g wrangler');
  console.log('2. Login to Cloudflare: wrangler login');
  console.log('3. Deploy manually: npx wrangler pages deploy out --project-name brandverse');
  process.exit(1);
}
