import fs from 'fs';
const content = fs.readFileSync('lib/blog-content.ts', 'utf8');
const start = content.indexOf("'dry-cleaning-ai-order-management'");
const end = content.indexOf('function defaultArticleBody', start);
console.log('Block after slug to end:');
console.log(JSON.stringify(content.slice(start + 50, start + 100)));
console.log('Between block end and defaultArticleBody:');
console.log(JSON.stringify(content.slice(end - 30, end)));
