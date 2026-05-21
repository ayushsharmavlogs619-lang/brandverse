# AI Receptionist Cloudflare Pages Deployment Script
$ErrorActionPreference = "Stop"

Write-Host "Deploying AI Receptionist Frontend to Cloudflare Pages..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "./landing-pages")) {
    Write-Host "Error: Run this script from the ai-reception directory!" -ForegroundColor Red
    exit 1
}

# Deploy to Cloudflare Pages
Write-Host "Deploying to Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy landing-pages --project-name=ai-reception

Write-Host "Pages deployment complete!" -ForegroundColor Green