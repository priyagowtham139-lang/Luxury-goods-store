const fs = require('fs');

const homeCss = fs.readFileSync('css/home.css', 'utf8');
const navCss = fs.readFileSync('css/nav.css', 'utf8');

// Search for any CSS rules under max-width: 768px or max-width: 680px that have hardcoded pixel widths > 320px
const combinedMobileCss = homeCss + '\n' + navCss;

// Extract mobile media query blocks
const mediaQueryRegex = /@media[^{]+\((?:max-width:\s*(?:768|680|600|500|480)px)\)[^{]*\{([\s\S]*?)(?=\n@media|\n\/\* ===|$)/g;

let match;
let issues = [];

while ((match = mediaQueryRegex.exec(combinedMobileCss)) !== null) {
  const block = match[1];
  // look for width: [3-9]\d{2}px where value > 320
  const widthMatches = block.matchAll(/(?:min-width|width|max-width):\s*(\d+)px/g);
  for (const wm of widthMatches) {
    const val = parseInt(wm[1], 10);
    // If it's a fixed min-width or width > 320px without being max-width, flag it
    if (val > 320 && !wm[0].startsWith('max-width')) {
      issues.push(wm[0]);
    }
  }
}

console.log('Mobile media query hardcoded width check (>320px):');
if (issues.length === 0) {
  console.log('✓ PASS: Zero unconstrained pixel widths > 320px found in mobile media queries!');
} else {
  console.log('Issues found:', issues);
}

