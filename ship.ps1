# ship.ps1 - PowerShell deployment script for Windows

Write-Host "🚀 STARTING DEPLOYMENT MISSION..." -ForegroundColor Green
Write-Host ""

Write-Host "🏗️  STEP 1: CLEANING PREVIOUS BUILD..." -ForegroundColor Cyan
if (Test-Path "out") {
  Remove-Item -Recurse -Force out
  Write-Host "✓ Cleaned 'out' directory"
}

if (Test-Path ".next") {
  Remove-Item -Recurse -Force .next
  Write-Host "✓ Cleaned '.next' directory"
}

Write-Host ""
Write-Host "📦 STEP 2: INSTALLING DEPENDENCIES..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ NPM INSTALL FAILED. ABORTING." -ForegroundColor Red
  exit 1
}
Write-Host "✓ Dependencies installed"

Write-Host ""
Write-Host "🔨 STEP 3: BUILDING PROJECT..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ BUILD FAILED. ABORTING." -ForegroundColor Red
  exit 1
}
Write-Host "✓ Build completed successfully"

Write-Host ""
Write-Host "☁️  STEP 4: DEPLOYING TO CLOUDFLARE..." -ForegroundColor Cyan
npx wrangler pages deploy out --project-name brandverse --commit-dirty=true
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ DEPLOY FAILED. CHECK WRANGLER LOGIN." -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "✅ MISSION ACCOMPLISHED. SITE IS LIVE." -ForegroundColor Green
Write-Host ""
