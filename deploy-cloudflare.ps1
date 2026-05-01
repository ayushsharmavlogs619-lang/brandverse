# Brandverse Cloudflare Deployment Script
$ErrorActionPreference = "Stop"

Write-Host "Starting Brandverse deployment to Cloudflare..." -ForegroundColor Green

# Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy to Cloudflare Pages
Write-Host "Deploying to Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy out --project-name=brandverse

Write-Host "Deployment complete!" -ForegroundColor Green
