$base = "C:\Brandverse.tech HQ\brandverse\app\blog"
$fixed = 0; $ok = 0; $fail = 0
$utf8 = [System.Text.UTF8Encoding]::new($false)

Get-ChildItem "$base\*\page.tsx" | ForEach-Object {
    $path = $_.FullName
    $slug = $_.Directory.Name
    $content = [System.IO.File]::ReadAllText($path)
    if ($slug -eq "ai-voice-roi") { $ok++; return }
    if ($content -match "robots:" -and $content -match "alternates:" -and $content -notmatch '},\s+robots') { $ok++; return }

    $lastIdx = $content.LastIndexOf("};")
    if ($lastIdx -lt 0) { $fail++; return }

    $after = $content.Substring($lastIdx + 2).TrimStart()
    if (-not ($after.StartsWith("export default") -or $after.StartsWith("const ") -or ($content.LastIndexOf("export const metadata") -gt 0 -and $content.LastIndexOf("export const metadata") -lt $lastIdx))) {
        $fail++; return
    }

    $beforeClose = $content.Substring(0, $lastIdx).TrimEnd()
    $canonical = "https://brandverse.tech/blog/$slug"
    $newFields = "`n    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },`n    alternates: { canonical: '$canonical' }"
    $newContent = $beforeClose + $newFields + "`n" + $content.Substring($lastIdx)
    [System.IO.File]::WriteAllText($path, $newContent, $utf8)
    Write-Host "FIXED: $slug" -ForegroundColor Cyan; $fixed++
}

Write-Host "Fixed: $fixed, OK: $ok, Fail: $fail"
