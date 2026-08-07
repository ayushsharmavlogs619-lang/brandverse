# Brandverse Cloudflare Deployment Script
# NOTE: Do not use $ErrorActionPreference = "Stop": node.js warnings on stderr
# (e.g. console.warn in scripts/validate-env.js) surface as NativeCommandError
# records in PowerShell 5.1 and would terminate the script mid-deploy.
$ErrorActionPreference = "Continue"

Write-Host "Starting Brandverse deployment to Cloudflare..." -ForegroundColor Green

# Check we're in the repo root
if (-not (Test-Path "./package.json")) {
    Write-Host "Error: Run this script from the brandverse directory!" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy to Cloudflare Pages (production branch)
Write-Host "Deploying to Cloudflare Pages (production)..." -ForegroundColor Yellow
npx wrangler pages deploy out --project-name brandverse --branch=production

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment FAILED." -ForegroundColor Red
    exit 1
}

Write-Host "Deployment complete!" -ForegroundColor Green