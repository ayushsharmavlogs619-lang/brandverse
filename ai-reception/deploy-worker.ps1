# AI Receptionist Cloudflare Worker Deployment Script
# NOTE: Do not use $ErrorActionPreference = "Stop": npm/npx warnings on stderr
# surface as NativeCommandError records in PowerShell 5.1 and would terminate
# the script mid-deploy.
$ErrorActionPreference = "Continue"

Write-Host "Deploying AI Receptionist Worker to Cloudflare..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "./wrangler.toml")) {
    Write-Host "Error: Run this script from the ai-reception directory!" -ForegroundColor Red
    exit 1
}

# Deploy the Worker to the production environment (routes + vars only exist
# under [env.production] in wrangler.toml).
Write-Host "Deploying Worker (production)..." -ForegroundColor Yellow
npx wrangler deploy --env production

if ($LASTEXITCODE -ne 0) {
    Write-Host "Worker deployment FAILED." -ForegroundColor Red
    exit 1
}

Write-Host "Worker deployment complete!" -ForegroundColor Green