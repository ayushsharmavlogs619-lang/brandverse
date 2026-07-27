// Repair all TS1109 (truncated) article files by restoring function bodies from git
// Preserves current metadata (with robots/canonical), restores only what was lost

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Slugs of the 21 ArticleLayout articles (need special handling)
const articleLayoutSlugs = new Set([
  'construction-bidding-automation', 'dermatology-cosmetic-bookings',
  'healthcare-no-show-cure', 'legal-intake-ethics', 'podiatry-patient-growth',
  'real-estate-lead-speed', 'ai-vs-ivr-comparison', 'case-study-apex-property',
  'case-study-brightsmile-dental', 'crm-integration-guide', 'future-of-voice-ai',
  'how-ai-boosts-leads', 'hvac-dispatch-automation', 'measuring-success',
  'multilingual-outreach', 'onboarding-checklist', 'scaling-multi-location',
  'scripts-that-convert', 'sms-followups', 'tcpa-gdpr-compliance', 'voice-cloning-ethics',
]);

const articleLayoutTemplate = (slug) => `import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('${slug}')!;
`;

const articleLayoutReturn = `export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title={post.title}
      subtitle={post.excerpt}
      description={post.excerpt}
      date={post.date}
      readTime={post.readTime}
      category={post.category}
      accent={post.category === 'case-studies' ? 'green' : 'blue'}
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}
`;

// All 45 failing files
const failingSlugs = [
  '24-7-employee-paradox', '24-7-sales-revolution', '5-signs-youre-ready',
  'ai-receptionist-guide-2026', 'ai-voice-agents-transforming-customer-service',
  'ai-vs-ivr-comparison', 'auto-service-retention', 'case-study-apex-property',
  'case-study-brightsmile-dental', 'case-study-elite-climate',
  'construction-bidding-automation', 'cost-of-not-using-ai', 'crm-automation-blueprint',
  'crm-integration-guide', 'cure-data-blindness-analytics',
  'dermatology-cosmetic-bookings', 'ecommerce-customer-service-ai',
  'fitness-studio-booking-ai', 'future-of-voice-ai', 'healthcare-no-show-cure',
  'hidden-cost-good-enough-web-design', 'how-ai-boosts-leads', 'hvac-dispatch-automation',
  'legal-intake-ethics', 'measuring-success', 'multilingual-outreach',
  'onboarding-checklist', 'podiatry-patient-growth', 'property-management-tenant-screening',
  'real-estate-lead-speed', 'restaurant-reservations-ai', 'salon-spa-cancellation-fill',
  'scaling-multi-location', 'scaling-vs-swelling-automation', 'scripts-that-convert',
  'sms-followups', 'stop-burning-cash-customer-support', 'stop-losing-leads-after-hours',
  'stop-wasting-marketing-budget', 'tcpa-gdpr-compliance', 'ultimate-guide-business-automation',
  'voice-ai-ethics-trust', 'voice-ai-vs-human-receptionists', 'voice-cloning-ethics',
  'why-never-regret-ai-agents',
];

function getGitContent(slug) {
  try {
    const path = `app/blog/${slug}/page.tsx`;
    return execSync(`git show HEAD:${path}`, { cwd: root, encoding: 'utf-8' });
  } catch {
    return null;
  }
}

let fixed = 0;
for (const slug of failingSlugs) {
  const pagePath = join(root, 'app', 'blog', slug, 'page.tsx');
  
  // Read current (truncated) file
  let current;
  try {
    current = readFileSync(pagePath, 'utf-8');
  } catch {
    console.log(`SKIP: ${slug} (no file)`);
    continue;
  }

  // Skip if already has a function body (export default function)
  if (/export default function/.test(current)) {
    console.log(`OK: ${slug} (already complete)`);
    continue;
  }

  if (articleLayoutSlugs.has(slug)) {
    // ArticleLayout file — reconstruct from template
    const metaMatch = current.match(/^export const metadata = \{[\s\S]*?\};/m);
    if (!metaMatch) {
      console.log(`FAIL: ${slug} (no metadata found)`);
      continue;
    }
    const meta = metaMatch[0];
    const newContent = articleLayoutTemplate(slug) + '\n' + meta + '\n\n' + articleLayoutReturn;
    writeFileSync(pagePath, newContent, 'utf-8');
    console.log(`FIXED: ${slug} (ArticleLayout)`);
    fixed++;
  } else {
    // Old template — restore function body + imports from git
    const gitContent = getGitContent(slug);
    if (!gitContent) {
      console.log(`FAIL: ${slug} (not in git)`);
      continue;
    }

    // Extract imports from git (everything before export const metadata)
    const importMatch = gitContent.match(/^((?:import .+?;\n)*)/);
    const imports = importMatch ? importMatch[1] : '';

    // Extract function body from git (export default function ... to end)
    const funcMatch = gitContent.match(/(export default function [\s\S]*)$/);
    if (!funcMatch) {
      console.log(`FAIL: ${slug} (no function body in git)`);
      continue;
    }
    const funcBody = funcMatch[1];

    // Remove trailing `export default` (from truncation) before appending the full function body
    const cleanedCurrent = current.replace(/\n\s*export default\s*$/, '\n');
    const newContent = imports + '\n' + cleanedCurrent + funcBody;
    writeFileSync(pagePath, newContent, 'utf-8');
    console.log(`FIXED: ${slug} (old template)`);
    fixed++;
  }
}

console.log(`\nFixed: ${fixed}`);
