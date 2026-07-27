$base = "C:\Brandverse.tech HQ\brandverse\app\blog"
$articlesFile = "C:\Brandverse.tech HQ\brandverse\app\lib\articles.ts"

# Parse articles.ts
$content = [System.IO.File]::ReadAllText($articlesFile)
$articles = @()
$pattern = [regex]::new("slug:\s+'([^']+)'[\s\S]*?title:\s+'([^']+)'[\s\S]*?excerpt:\s+'([^']+)'[\s\S]*?date:\s+'([^']+)'[\s\S]*?category:\s+'([^']+)'")
$matches = $pattern.Matches($content)
foreach ($m in $matches) {
    $articles += @{Slug=$m.Groups[1].Value; Title=$m.Groups[2].Value; Excerpt=$m.Groups[3].Value; Date=$m.Groups[4].Value; Category=$m.Groups[5].Value}
}

$corrupted = @('ai-call-scoring-quality-assurance','ai-outbound-campaign-automation','ai-receptionist-migration-guide','ai-vs-answer-service-comparison','change-management-ai-adoption','childcare-daycare-enrollment-ai','church-nonprofit-automation','ecommerce-abandoned-cart-recovery-ai','financial-advisor-ai-automation','hipaa-compliance-ai-healthcare','holiday-season-prep-automation','home-services-landscaping-pest-control','hotel-hospitality-ai','insurance-lead-automation','internal-operations-ai-automation','missed-call-recovery-systems','quickbooks-xero-integration-ai','senior-care-assisted-living-automation','veterinary-pet-care-automation','voice-analytics-conversation-intelligence')
$clientOnly = @('ai-appointment-setting','ai-customer-retention','ai-lead-qualification','emergency-response-automation','multilingual-ai-support')

$template = @'
import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('SLUG')!;

export const metadata = {
  title: 'TITLE | Brandverse',
  description: 'DESC',
  openGraph: { title: 'TITLE', description: 'DESC', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'TITLE', description: 'DESC' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/SLUG' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="TITLE"
      subtitle="DESC"
      description={post.excerpt}
      date="DATE"
      readTime="9 min read"
      category={post.category}
      accent="blue"
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}
'@

$layoutTemplate = @'
export const metadata = {
  title: 'TITLE | Brandverse',
  description: 'DESC',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/SLUG' },
  openGraph: { title: 'TITLE', description: 'DESC', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'TITLE', description: 'DESC' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
'@

$count = 0
foreach ($a in $articles) {
    $s = $a.Slug
    $t = $a.Title -replace "'", "\'"
    $d = $a.Excerpt -replace "'", "\'"
    $date = $a.Date

    if ($s -in $corrupted) {
        # Ensure directory exists
        $dir = "$base\$s"
        if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        
        $content = $template -replace 'SLUG', $s -replace 'TITLE', $t -replace 'DESC', $d -replace 'DATE', $date
        [System.IO.File]::WriteAllText("$dir\page.tsx", $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "RECREATED: $s" -ForegroundColor Green; $count++
    }

    if ($s -in $clientOnly) {
        $dir = "$base\$s"
        $content = $layoutTemplate -replace 'SLUG', $s -replace 'TITLE', $t -replace 'DESC', $d
        [System.IO.File]::WriteAllText("$dir\layout.tsx", $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "LAYOUT: $s" -ForegroundColor Cyan
    }
}

Write-Host "`nDone! Recreated $count article files." -ForegroundColor White
