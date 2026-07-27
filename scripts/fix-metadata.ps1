# Fix metadata: add robots, canonical, OG, Twitter to all blog articles
param([string]$ArticlesFile = "$PSScriptRoot\..\app\lib\articles.ts")

$base = "C:\Brandverse.tech HQ\brandverse\app\blog"
$skipped = @()

# Get article slugs from articles.ts
$articlesContent = Get-Content -Path $ArticlesFile -Raw
$slugPattern = "slug:\s+'([^']+)'"
$matches = [regex]::Matches($articlesContent, $slugPattern)
$slugs = $matches | ForEach-Object { $_.Groups[1].Value }

Write-Host "Found $($slugs.Count) articles in articles.ts`n" -ForegroundColor Cyan

foreach ($slug in $slugs) {
    $path = "$base\$slug\page.tsx"
    if (-not (Test-Path $path)) {
        Write-Host "MISSING: $slug" -ForegroundColor Red
        continue
    }

    $content = Get-Content -Path $path -Raw

    # Skip ai-voice-roi (use client, needs manual fix)
    if ($slug -eq "ai-voice-roi") {
        $skipped += "ai-voice-roi (use client)"
        Write-Host "SKIP: $slug (use client)" -ForegroundColor Yellow
        continue
    }

    $hasRobots = $content -match "robots:"
    $hasCanonical = $content -match "alternates:"
    $hasOG = $content -match "openGraph:"
    $hasTwitter = $content -match "twitter:"

    if ($hasRobots -and $hasCanonical) {
        Write-Host "OK: $slug" -ForegroundColor Green
        continue
    }

    # Find metadata block: export const metadata = { ... };
    if ($content -match '(?s)(export const metadata = \{)(.*?)(\};)(\s*export (default|async))') {
        $before = $Matches[1]
        $metaBody = $Matches[2]
        $after = $Matches[4]

        $insertions = @()
        if (-not $hasRobots) {
            $insertions += "    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } }"
        }
        if (-not $hasCanonical) {
            $insertions += "    alternates: { canonical: 'https://brandverse.tech/blog/$slug' }"
        }

        if ($insertions.Count -gt 0) {
            $metaBody = $metaBody.TrimEnd() + ",`n" + ($insertions -join ",`n") + ",`n"
            $newContent = $before + $metaBody + "}" + $after
            Set-Content -Path $path -Value $newContent -NoNewline
            Write-Host "FIXED robots/canonical: $slug" -ForegroundColor Cyan
        }
    } else {
        Write-Host "PARSE FAIL: $slug" -ForegroundColor Red
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor White
Write-Host "Articles processed: $($slugs.Count)" -ForegroundColor White
Write-Host "Skipped: $($skipped -join ', ')" -ForegroundColor Yellow
Write-Host "Manually fix OG/Twitter for 19 articles listed in the audit" -ForegroundColor Yellow
