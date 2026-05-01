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

// Check if .next/out exists (static export)
const outDir = path.join(process.cwd(), '.next', 'server');
if (!fs.existsSync(outDir)) {
  console.error('❌ Build output not found. Make sure the build completed successfully.');
  process.exit(1);
}

// Deploy using Wrangler
console.log('🌐 Deploying to Cloudflare Pages...');
try {
  execSync('npx wrangler pages deploy .next/server --project-name brandverse', { 
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
  console.log('3. Deploy manually: npx wrangler pages deploy .next/server --project-name brandverse');
  process.exit(1);
}
