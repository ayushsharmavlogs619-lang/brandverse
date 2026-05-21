# Deploy AI Receptionist (Worker + Pages)
$ErrorActionPreference = "Stop"

Write-Host "Deploying AI Receptionist to Cloudflare..." -ForegroundColor Green

# Deploy Worker
Write-Host "`n=== Step 1: Deploying Worker ===" -ForegroundColor Yellow
./deploy-worker.ps1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Worker deployment failed!" -ForegroundColor Red
    exit 1
}

# Deploy Pages
Write-Host "`n=== Step 2: Deploying Pages ===" -ForegroundColor Yellow
./deploy-pages.ps1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Pages deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ AI Receptionist deployment complete!" -ForegroundColor Green
Write-Host "Next: Set up edge.brandverse.tech in Cloudflare Dashboard" -ForegroundColor Cyan