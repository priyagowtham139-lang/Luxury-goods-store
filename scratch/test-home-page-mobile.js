const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const regex = /<a\s+[^>]*>/gi;
const allLinks = indexHtml.match(regex) || [];
const ctaLinks = allLinks.filter(l => l.includes('blob') || l.includes('visit-btn') || l.includes('class="add"'));

console.log(`Found ${ctaLinks.length} CTA links on index.html:`);
ctaLinks.forEach((l, i) => console.log(`  ${i + 1}: ${l}`));
