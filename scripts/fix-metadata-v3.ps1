$base = "C:\Brandverse.tech HQ\brandverse\app\blog"
$fixed = 0; $ok = 0; $fail = 0

Get-ChildItem "$base\*\page.tsx" | ForEach-Object {
    $path = $_.FullName
    $slug = $_.Directory.Name
    $content = [System.IO.File]::ReadAllText($path)

    if ($slug -eq "ai-voice-roi") { Write-Host "SKIP: $slug"; return }

    if ($content -match "robots:" -and $content -match "alternates:") { Write-Host "OK: $slug"; $ok++; return }

    # Match metadata closing `};` followed by export or const
    $pattern = '(?s)(export const metadata = \{.*?)(\};)(\s*\n\s*(?:export\s+(?:default|function|const)|const\s))'
    if ($content -match $pattern) {
        $add = "`n    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },`n    alternates: { canonical: 'https://brandverse.tech/blog/$slug' }"
        $newContent = $Matches[1].TrimEnd() + "," + $add + "`n" + $Matches[2] + $Matches[3]
        [System.IO.File]::WriteAllText($path, $newContent)
        Write-Host "FIXED: $slug" -ForegroundColor Cyan; $fixed++
    } else {
        Write-Host "PARSE FAIL: $slug" -ForegroundColor Red; $fail++
    }
}

Write-Host "`nOK: $ok, Fixed: $fixed, Failed: $fail"
