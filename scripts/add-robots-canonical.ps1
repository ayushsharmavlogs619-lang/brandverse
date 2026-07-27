# Safely add robots and alternates.canonical to every article's metadata
$base = "C:\Brandverse.tech HQ\brandverse\app\blog"
$fixed = 0; $skipped = 0; $failed = 0

Get-ChildItem "$base\*\page.tsx" | ForEach-Object {
    $path = $_.FullName
    $slug = $_.Directory.Name
    $content = [System.IO.File]::ReadAllText($path)

    if ($slug -eq "ai-voice-roi") { Write-Host "SKIP: $slug (use client)"; $skipped++; return }
    if ($content -match "robots:" -and $content -match "alternates:") { Write-Host "OK: $slug"; $skipped++; return }

    if ($content -notmatch "export const metadata") { Write-Host "NO META: $slug"; $failed++; return }

    $lastIdx = $content.LastIndexOf("};")
    if ($lastIdx -lt 0) { Write-Host "NO CLOSE: $slug"; $failed++; return }

    $after = $content.Substring($lastIdx + 2).TrimStart()
    if ($after.StartsWith("export default") -or $after.StartsWith("const ")) {
        $canonical = "https://brandverse.tech/blog/$slug"
        $newFields = "`n    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },`n    alternates: { canonical: '$canonical' }"
        $newContent = $content.Substring(0, $lastIdx) + "," + $newFields + "`n" + $content.Substring($lastIdx)
        [System.IO.File]::WriteAllText($path, $newContent, [System.Text.UTF8Encoding]::new($false))
        Write-Host "FIXED: $slug" -ForegroundColor Cyan; $fixed++
    } else {
        # Check if it's the metadata close by looking for `export const metadata` before this `};`
        $metaStart = $content.LastIndexOf("export const metadata")
        if ($metaStart -gt 0 -and $metaStart -lt $lastIdx) {
            $canonical = "https://brandverse.tech/blog/$slug"
            $newFields = "`n    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },`n    alternates: { canonical: '$canonical' }"
            $newContent = $content.Substring(0, $lastIdx) + "," + $newFields + "`n" + $content.Substring($lastIdx)
            [System.IO.File]::WriteAllText($path, $newContent, [System.Text.UTF8Encoding]::new($false))
            Write-Host "FIXED (alt): $slug" -ForegroundColor Cyan; $fixed++
        } else {
            Write-Host "UNSAFE: $slug (after='$($after.Substring(0, [Math]::Min(30, $after.Length)))')" -ForegroundColor Red; $failed++
        }
    }
}

Write-Host "`nFixed: $fixed, Skipped: $skipped, Failed: $failed"
