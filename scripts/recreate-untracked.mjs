import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDir = join(__dirname, '..', 'app', 'blog');
const articlesPath = join(__dirname, '..', 'app', 'lib', 'articles.ts');

// Parse articles from articles.ts
const src = readFileSync(articlesPath, 'utf-8');
const articleRegex = /slug:\s+'([^']+)'[\s\S]*?title:\s+'((?:[^'\\]|\\.)+)'[\s\S]*?excerpt:\s+'((?:[^'\\]|\\.)+)'[\s\S]*?date:\s+'([^']+)'[\s\S]*?category:\s+'([^']+)'/g;

const articles = [];
let m;
while ((m = articleRegex.exec(src)) !== null) {
  articles.push({
    slug: m[1],
    title: m[2].replace(/\\'/g, "'"),
    excerpt: m[3].replace(/\\'/g, "'"),
    date: m[4],
    category: m[5],
  });
}

// Corrupted untracked articles that need full recreation
const corruptedSlugs = [
  'ai-call-scoring-quality-assurance', 'ai-outbound-campaign-automation',
  'ai-receptionist-migration-guide', 'ai-vs-answer-service-comparison',
  'change-management-ai-adoption', 'childcare-daycare-enrollment-ai',
  'church-nonprofit-automation', 'ecommerce-abandoned-cart-recovery-ai',
  'financial-advisor-ai-automation', 'hipaa-compliance-ai-healthcare',
  'holiday-season-prep-automation', 'home-services-landscaping-pest-control',
  'hotel-hospitality-ai', 'insurance-lead-automation',
  'internal-operations-ai-automation', 'missed-call-recovery-systems',
  'quickbooks-xero-integration-ai', 'senior-care-assisted-living-automation',
  'veterinary-pet-care-automation', 'voice-analytics-conversation-intelligence',
];

const pageTemplate = (a) => `import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('${a.slug}')!;

export const metadata = {
  title: '${a.title.replace(/'/g, "\\'")} | Brandverse',
  description: '${a.excerpt.replace(/'/g, "\\'")}',
  openGraph: { title: '${a.title.replace(/'/g, "\\'")}', description: '${a.excerpt.replace(/'/g, "\\'")}', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: '${a.title.replace(/'/g, "\\'")}', description: '${a.excerpt.replace(/'/g, "\\'")}' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/${a.slug}' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="${a.title.replace(/"/g, '\\"')}"
      subtitle="${a.excerpt.replace(/"/g, '\\"')}"
      description={post.excerpt}
      date="${a.date}"
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
`;

let count = 0;
for (const a of articles) {
  if (!corruptedSlugs.includes(a.slug)) continue;
  const dir = join(blogDir, a.slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'page.tsx'), pageTemplate(a), 'utf-8');
  console.log(`RECREATED: ${a.slug}`);
  count++;
}

console.log(`\nRecreated ${count} articles.`);
