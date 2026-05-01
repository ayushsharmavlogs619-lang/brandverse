# Brandverse Vercel Deployment Script
# Run this in PowerShell from the brandverse directory

Write-Host "🚀 Deploying Brandverse to Vercel..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "./package.json")) {
    Write-Host "❌ Error: Run this script from the brandverse directory!" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod --yes

Write-Host "✅ Deployment complete!" -ForegroundColor Green
