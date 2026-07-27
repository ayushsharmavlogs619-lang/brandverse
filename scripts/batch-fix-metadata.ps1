# Batch fix metadata across all 72 blog articles
# Adds: robots, alternates.canonical, openGraph, twitter where missing

$articles = @(
    @{Slug="scaling-vs-swelling-automation"; OG=$false; PubDate="2025-01-01"}
    @{Slug="cure-data-blindness-analytics"; OG=$false; PubDate="2025-01-01"}
    @{Slug="24-7-employee-paradox"; OG=$false; PubDate="2025-01-01"}
    @{Slug="hidden-cost-good-enough-web-design"; OG=$false; PubDate="2025-01-01"}
    @{Slug="stop-burning-cash-customer-support"; OG=$false; PubDate="2025-01-01"}
    @{Slug="why-never-regret-ai-agents"; OG=$false; PubDate="2024-12-29"}
    @{Slug="cost-of-not-using-ai"; OG=$false; PubDate="2024-12-28"}
    @{Slug="5-signs-youre-ready"; OG=$false; PubDate="2024-12-27"}
    @{Slug="case-study-elite-climate"; OG=$false; PubDate="2024-12-22"}
    @{Slug="case-study-apex-property"; OG=$true; PubDate="2024-12-18"}
    @{Slug="case-study-brightsmile-dental"; OG=$true; PubDate="2024-12-15"}
    @{Slug="ai-voice-roi"; OG=$false; PubDate="2024-12-10"}
    @{Slug="24-7-sales-revolution"; OG=$false; PubDate="2024-12-30"}
    @{Slug="stop-wasting-marketing-budget"; OG=$false; PubDate="2024-12-30"}
    @{Slug="voice-ai-ethics-trust"; OG=$false; PubDate="2024-12-30"}
    @{Slug="crm-automation-blueprint"; OG=$false; PubDate="2024-12-30"}
    @{Slug="how-ai-boosts-leads"; OG=$true; PubDate="2024-12-12"}
    @{Slug="hvac-dispatch-automation"; OG=$true; PubDate="2025-01-02"}
    @{Slug="real-estate-lead-speed"; OG=$true; PubDate="2025-01-02"}
    @{Slug="legal-intake-ethics"; OG=$true; PubDate="2025-01-02"}
    @{Slug="construction-bidding-automation"; OG=$true; PubDate="2025-01-02"}
    @{Slug="healthcare-no-show-cure"; OG=$true; PubDate="2025-01-02"}
    @{Slug="auto-service-retention"; OG=$true; PubDate="2025-01-02"}
    @{Slug="podiatry-patient-growth"; OG=$true; PubDate="2025-01-02"}
    @{Slug="dermatology-cosmetic-bookings"; OG=$true; PubDate="2025-01-02"}
    @{Slug="crm-integration-guide"; OG=$true; PubDate="2025-01-03"}
    @{Slug="measuring-success"; OG=$true; PubDate="2025-01-03"}
    @{Slug="multilingual-outreach"; OG=$true; PubDate="2025-01-03"}
    @{Slug="onboarding-checklist"; OG=$true; PubDate="2025-01-03"}
    @{Slug="scaling-multi-location"; OG=$true; PubDate="2025-01-03"}
    @{Slug="scripts-that-convert"; OG=$true; PubDate="2025-01-03"}
    @{Slug="sms-followups"; OG=$true; PubDate="2025-01-03"}
    @{Slug="tcpa-gdpr-compliance"; OG=$true; PubDate="2025-01-03"}
    @{Slug="voice-cloning-ethics"; OG=$true; PubDate="2025-01-03"}
    @{Slug="restaurant-reservations-ai"; OG=$false; PubDate="2026-07-26"}
    @{Slug="fitness-studio-booking-ai"; OG=$false; PubDate="2026-07-26"}
    @{Slug="salon-spa-cancellation-fill"; OG=$false; PubDate="2026-07-27"}
    @{Slug="property-management-tenant-screening"; OG=$false; PubDate="2026-07-27"}
    @{Slug="ai-receptionist-guide-2026"; OG=$true; PubDate="2026-07-26"}
    @{Slug="ai-voice-agents-transforming-customer-service"; OG=$true; PubDate="2026-07-26"}
    @{Slug="ultimate-guide-business-automation"; OG=$true; PubDate="2026-07-26"}
    @{Slug="stop-losing-leads-after-hours"; OG=$true; PubDate="2026-07-26"}
    @{Slug="voice-ai-vs-human-receptionists"; OG=$true; PubDate="2026-07-26"}
    @{Slug="internal-operations-ai-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ecommerce-abandoned-cart-recovery-ai"; OG=$true; PubDate="2026-07-27"}
    @{Slug="missed-call-recovery-systems"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-call-scoring-quality-assurance"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-receptionist-migration-guide"; OG=$true; PubDate="2026-07-27"}
    @{Slug="financial-advisor-ai-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="home-services-landscaping-pest-control"; OG=$true; PubDate="2026-07-27"}
    @{Slug="church-nonprofit-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="hipaa-compliance-ai-healthcare"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-vs-answer-service-comparison"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ecommerce-customer-service-ai"; OG=$false; PubDate="2026-07-27"}
    @{Slug="ai-appointment-setting"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-customer-retention"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-lead-qualification"; OG=$true; PubDate="2026-07-27"}
    @{Slug="emergency-response-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="multilingual-ai-support"; OG=$true; PubDate="2026-07-27"}
    @{Slug="future-of-voice-ai"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-receptionist-pricing-guide"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-vs-ivr-comparison"; OG=$true; PubDate="2026-07-27"}
    @{Slug="quickbooks-xero-integration-ai"; OG=$true; PubDate="2026-07-27"}
    @{Slug="ai-outbound-campaign-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="voice-analytics-conversation-intelligence"; OG=$true; PubDate="2026-07-27"}
    @{Slug="change-management-ai-adoption"; OG=$true; PubDate="2026-07-27"}
    @{Slug="holiday-season-prep-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="insurance-lead-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="hotel-hospitality-ai"; OG=$true; PubDate="2026-07-27"}
    @{Slug="senior-care-assisted-living-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="veterinary-pet-care-automation"; OG=$true; PubDate="2026-07-27"}
    @{Slug="childcare-daycare-enrollment-ai"; OG=$true; PubDate="2026-07-27"}
)

$base = "C:\Brandverse.tech HQ\brandverse\app\blog"

foreach ($a in $articles) {
    $path = "$base\$($a.Slug)\page.tsx"
    if (-not (Test-Path $path)) {
        Write-Host "MISSING: $($a.Slug)" -ForegroundColor Red
        continue
    }

    $content = Get-Content -Path $path -Raw

    # Skip ai-voice-roi (uses 'use client', needs manual fix)
    if ($a.Slug -eq "ai-voice-roi") {
        Write-Host "SKIP: $($a.Slug) (use client)" -ForegroundColor Yellow
        continue
    }

    # Check if metadata already has openGraph
    $hasOG = $content -match "openGraph:"
    $hasTwitter = $content -match "twitter:"
    $hasRobots = $content -match "robots:"
    $hasCanonical = $content -match "alternates:"

    if ($hasRobots -and $hasCanonical -and ($hasOG -or $a.OG)) {
        Write-Host "OK: $($a.Slug)" -ForegroundColor Green
        continue
    }

    # Find the metadata export and modify it
    # Pattern: find `export const metadata = {` ... `};` before `export default function`
    if ($content -match '(?s)(export const metadata = \{)(.*?)(\};)(\s*export default function)') {
        $before = $Matches[1]
        $metaBody = $Matches[2]
        $closing = $Matches[3]
        $after = $Matches[4]

        $additions = @()

        if (-not $hasRobots) {
            $additions += "    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } }"
        }
        if (-not $hasCanonical) {
            $additions += "    alternates: { canonical: 'https://brandverse.tech/blog/$($a.Slug)' }"
        }
        if (-not $hasOG) {
            $additions += "    openGraph: { title: '...', description: '...', type: 'article', siteName: 'Brandverse', publishedTime: '$($a.PubDate)' }"
        }
        if (-not $hasTwitter) {
            $additions += "    twitter: { card: 'summary_large_image', title: '...', description: '...' }"
        }

        if ($additions.Count -gt 0) {
            # Remove trailing whitespace from metaBody, add new lines
            $metaBody = $metaBody.TrimEnd() + "`n" + ($additions -join ",`n") + "`n"
            $newContent = $before + $metaBody + $closing + $after
            Set-Content -Path $path -Value $newContent -NoNewline
            Write-Host "FIXED: $($a.Slug) [+$($additions.Count) fields]" -ForegroundColor Cyan
        }
    } else {
        Write-Host "PARSE FAIL: $($a.Slug)" -ForegroundColor Red
    }
}

Write-Host "`nDone! Remaining manual fixes needed:" -ForegroundColor Yellow
Write-Host "- ai-voice-roi (use client, no metadata)" -ForegroundColor Yellow
Write-Host "- Update OG/Twitter title/description placeholders for 19 articles" -ForegroundColor Yellow
