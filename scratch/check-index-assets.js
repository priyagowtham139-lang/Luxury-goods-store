const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const imgMatches = [...indexHtml.matchAll(/src="([^"]+)"/g)].map(m => m[1]);

console.log(`Checking ${imgMatches.length} asset references in index.html:`);
let missing = 0;
imgMatches.forEach(src => {
  if (src.startsWith('http')) return;
  const exists = fs.existsSync(src);
  if (!exists) {
    console.log(`  MISSING: ${src}`);
    missing++;
  } else {
    console.log(`  ✓ OK: ${src}`);
  }
});

console.log(`Missing assets: ${missing}`);

