// Phase 2: Add OG + Twitter metadata to old template articles
// Phase 3a: Add ArticleSchema import + usage to old template articles
// Preserves all existing content. Only adds missing pieces.

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Slug list for articles in app/lib/articles.ts
function getArticle(slug) {
  const src = readFileSync(join(root, 'app', 'lib', 'articles.ts'), 'utf-8');
  const re = new RegExp(`slug:\\s+'(${slug})'[\\s\\S]*?title:\\s+'((?:[^'\\\\]|\\\\.)+)'[\\s\\S]*?excerpt:\\s+'((?:[^'\\\\]|\\\\.)+)'[\\s\\S]*?date:\\s+'([^']+)'[\\s\\S]*?category:\\s+'([^']+)'`);
  const m = src.match(re);
  if (!m) return null;
  return { slug: m[1], title: m[2].replace(/\\'/g, "'"), excerpt: m[3].replace(/\\'/g, "'"), date: m[4], category: m[5] };
}

// Old template articles that need OG + Twitter + ArticleSchema (no ArticleLayout, no ArticleSchema inline, no 'use client')
const oldTemplateSlugs = [
  '24-7-employee-paradox', '24-7-sales-revolution', '5-signs-youre-ready',
  'auto-service-retention', 'case-study-apex-property', 'case-study-brightsmile-dental',
  'case-study-elite-climate', 'construction-bidding-automation', 'cost-of-not-using-ai',
  'crm-automation-blueprint', 'cure-data-blindness-analytics', 'dermatology-cosmetic-bookings',
  'ecommerce-customer-service-ai', 'fitness-studio-booking-ai', 'healthcare-no-show-cure',
  'hidden-cost-good-enough-web-design', 'how-ai-boosts-leads', 'hvac-dispatch-automation',
  'legal-intake-ethics', 'podiatry-patient-growth', 'property-management-tenant-screening',
  'real-estate-lead-speed', 'restaurant-reservations-ai', 'salon-spa-cancellation-fill',
  'scaling-vs-swelling-automation', 'stop-burning-cash-customer-support',
  'stop-wasting-marketing-budget', 'voice-ai-ethics-trust', 'why-never-regret-ai-agents',
  // These 5 already have OG+Twitter but not ArticleSchema
  'ai-receptionist-guide-2026', 'ai-voice-agents-transforming-customer-service',
  'stop-losing-leads-after-hours', 'ultimate-guide-business-automation',
  'voice-ai-vs-human-receptionists',
];

let metaFixed = 0;
let schemaAdded = 0;

for (const slug of oldTemplateSlugs) {
  const pagePath = join(root, 'app', 'blog', slug, 'page.tsx');
  let content;
  try { content = readFileSync(pagePath, 'utf-8'); }
  catch { console.log(`SKIP: ${slug} (no file)`); continue; }

  const article = getArticle(slug);
  if (!article) { console.log(`SKIP: ${slug} (not in articles.ts)`); continue; }

  // ---------- PHASE 2: Add OG + Twitter metadata ----------
  if (!/openGraph:/.test(content) || !/twitter:/.test(content)) {
    // Find metadata closing `};` — preserve everything before and after
    const metaMatch = content.match(/^([\s\S]*?)(export const metadata = \{[\s\S]*?)(\};)([\s\S]*$)/);
    if (metaMatch) {
      const beforeMeta = metaMatch[1];  // imports
      const metaBody = metaMatch[2];    // properties before closing };
      const closeParen = metaMatch[3];  // };
      const afterMeta = metaMatch[4];   // function body
      const cleanBody = metaBody.replace(/,\s*$/, '');
      const ogBlock = `  openGraph: { title: '${article.title.replace(/'/g, "\\'")}', description: '${(article.excerpt || '').replace(/'/g, "\\'")}', type: 'article' as const, siteName: 'Brandverse' },\n  twitter: { card: 'summary_large_image' as const, title: '${article.title.replace(/'/g, "\\'")}', description: '${(article.excerpt || '').replace(/'/g, "\\'")}' }\n`;
      content = beforeMeta + cleanBody + ',\n' + ogBlock + closeParen + afterMeta;
      metaFixed++;
      console.log(`META: ${slug}`);
    } else {
      console.log(`SKIP-META: ${slug} (no metadata)`);
    }
  }

  // ---------- PHASE 3a: Add ArticleSchema ----------
  if (!content.includes('ArticleSchema') && !content.includes("'use client'") && !content.includes('ArticleLayout')) {
    // Add import after last import line
    const importMatch = content.match(/^(import .+?;\n)*/);
    if (importMatch) {
      const importBlock = importMatch[0];
      const importLen = importBlock.length;
      // Check if ArticleSchema import already exists somehow
      if (!importBlock.includes('ArticleSchema')) {
        const insertPoint = importLen;
        content = content.slice(0, insertPoint) + `import ArticleSchema from '../../components/Article/ArticleSchema';\n` + content.slice(insertPoint);
      }
    }

    // Find the first `<div` in the returned JSX and add `<ArticleSchema />` after it
    // Pattern: return (\n\s+)\((\n\s+)<div
    const schemaJSX = `\n        <ArticleSchema\n          title={'${article.title.replace(/'/g, "\\'")}'}\n          description={'${(article.excerpt || '').replace(/'/g, "\\'")}'}\n          slug="${slug}"\n          date="${article.date}"\n          category="${article.category}"\n        />`;
    
    const returnMatch = content.match(/(return\s*\()/);
    if (returnMatch) {
      // Find the first opening div tag after the return, insert after it
      const afterReturn = returnMatch.index + returnMatch[0].length;
      const afterDiv = content.indexOf('<div', afterReturn);
      if (afterDiv !== -1) {
        const afterDivClose = content.indexOf('>', afterDiv) + 1;
        content = content.slice(0, afterDivClose) + schemaJSX + content.slice(afterDivClose);
        schemaAdded++;
        console.log(`SCHEMA: ${slug}`);
      }
    }
  }

  writeFileSync(pagePath, content, 'utf-8');
}

console.log(`\nMetadata OG+Twitter fixed: ${metaFixed}`);
console.log(`ArticleSchema added: ${schemaAdded}`);
