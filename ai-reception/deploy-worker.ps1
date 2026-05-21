# AI Receptionist Cloudflare Worker Deployment Script
$ErrorActionPreference = "Stop"

Write-Host "Deploying AI Receptionist Worker to Cloudflare..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "./wrangler.toml")) {
    Write-Host "Error: Run this script from the ai-reception directory!" -ForegroundColor Red
    exit 1
}

# Deploy the Worker
Write-Host "Deploying Worker..." -ForegroundColor Yellow
npx wrangler deploy

Write-Host "Worker deployment complete!" -ForegroundColor Green