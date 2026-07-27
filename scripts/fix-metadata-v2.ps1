# Safer version - reads full files, does targeted replacement
$base = "C:\Brandverse.tech HQ\brandverse\app\blog"
$fixed = 0; $ok = 0; $fail = 0

Get-ChildItem "$base\*\page.tsx" | ForEach-Object {
    $path = $_.FullName
    $slug = $_.Directory.Name
    $content = Get-Content -Path $path -Raw

    if ($slug -eq "ai-voice-roi") { Write-Host "SKIP: $slug (use client)"; return }

    $hasRobots = $content -match "robots:"
    $hasCanonical = $content -match "alternates:"

    if ($hasRobots -and $hasCanonical) { Write-Host "OK: $slug"; $ok++; return }

    # Find metadata closing: `};` followed by either `export default` or `\n\n` + `const` or `export`
    $pattern = '(?s)(export const metadata = \{.*?)(\};)(\s*export (default|function|const)|\s*\n\s*(export|const))'
    if ($content -match $pattern) {
        $start = $Matches[1]
        $closing = $Matches[2]
        $rest = $Matches[3]

        $addRobots = "`n    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } }"
        $addCanonical = "`n    alternates: { canonical: 'https://brandverse.tech/blog/$slug' }"

        $newStart = $start.TrimEnd() + "," + $addRobots + "," + $addCanonical + "`n"
        $newContent = $newStart + $closing + $rest

        Set-Content -Path $path -Value $newContent -NoNewline
        Write-Host "FIXED: $slug" -ForegroundColor Cyan
        $fixed++
    } else {
        Write-Host "PARSE FAIL: $slug" -ForegroundColor Red
        $fail++
    }
}

Write-Host "`n=== Results ===" -ForegroundColor White
Write-Host "OK: $ok, Fixed: $fixed, Failed: $fail" -ForegroundColor White
