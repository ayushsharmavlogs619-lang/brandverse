import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const blogDir = join(import.meta.dirname, '..', 'app', 'blog');
const articles = readdirSync(blogDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let fixed = 0, ok = 0, fail = 0;

for (const slug of articles) {
  const pagePath = join(blogDir, slug, 'page.tsx');
  const layoutPath = join(blogDir, slug, 'layout.tsx');
  
  if (!existsSync(pagePath)) { fail++; continue; }
  
  let content = readFileSync(pagePath, 'utf-8');
  
  // Skip ai-voice-roi (uses 'use client', handled via layout.tsx)
  if (slug === 'ai-voice-roi') { ok++; continue; }
  
  // Check if robots + alternates already exist (not double-comma corrupted)
  if (/robots:/.test(content) && /alternates:/.test(content) && !/,\s*,\s*robots/.test(content)) {
    ok++; continue;
  }
  
  // Remove any existing corrupted robots/alernates (from previous bad scripts)
  content = content.replace(/,\s*robots:[^}]*\}[^}]*\}[^}]*\}[^}]*\}[^}]*\}[^}]*\},?\s*/g, '');
  content = content.replace(/,\s*alternates:\s*\{[^}]*\},?\s*/g, '');
  content = content.replace(/,\s*,\s*/g, ','); // fix double commas
  
  // Now cleanly add robots + canonical
  // Find the metadata closing `};`
  const metaMatch = content.match(/^([\s\S]*?)(export const metadata = \{[\s\S]*?)\};([\s\S]*$)/);
  if (!metaMatch) {
    // Try 'use client' pattern - no metadata, add layout.tsx
    if (content.includes("'use client'") || content.includes('"use client"')) {
      const layoutContent = `export const metadata = {
  title: '${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | Brandverse',
  description: '',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/${slug}' },
  openGraph: { title: '...', description: '...', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: '...', description: '...' },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
`;
      writeFileSync(layoutPath, layoutContent, 'utf-8');
      console.log(`LAYOUT: ${slug}`);
    } else {
      console.log(`FAIL: ${slug} (no metadata pattern)`);
      fail++;
    }
    continue;
  }
  
  const [, beforeMeta, metaBody, rest] = metaMatch;
  const canonical = `https://brandverse.tech/blog/${slug}`;
  const robotsLine = `    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },\n    alternates: { canonical: '${canonical}' }`;

  // Remove trailing comma from last field in metadata (if any)
  const cleanBody = metaBody.replace(/,\s*$/, '');
  const newContent = beforeMeta + cleanBody + ',\n' + robotsLine + '\n};' + rest;
  
  writeFileSync(pagePath, newContent, 'utf-8');
  console.log(`FIXED: ${slug}`);
  fixed++;
}

console.log(`\nFixed: ${fixed}, OK: ${ok}, Failed: ${fail}`);
