import fs from 'fs';
const c = fs.readFileSync('lib/blog-content.ts', 'utf8');
const s = c.indexOf("'optometrist-ai-appointment-scheduling'");
const e = c.indexOf('`,\n};', s);
const block = c.slice(s, e);
const headings = [...block.matchAll(/<(h[1-4])[^>]*>([^<]+)<\/h[1-4]>/g)];
headings.forEach(h => console.log(h[1], ':', h[2].trim()));
