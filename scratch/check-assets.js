const fs = require('fs');
const path = require('path');

console.log('--- CHECKING ALL LOCAL ASSET REFERENCES ---');
const pages = [
  'index.html',
  'about.html',
  'services.html',
  'blog.html',
  'contact.html',
  'cart.html',
  'signin.html',
  'signup.html',
  'user-dashboard.html',
  'admin-dashboard.html',
  '404.html'
];

let missingCount = 0;

pages.forEach(page => {
  const content = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
  // Find local hrefs and srcs (css/, js/, assets/)
  const matches = content.match(/(src|href)=["'](css\/[^"']+|js\/[^"']+|assets\/[^"']+)["']/g) || [];
  matches.forEach(m => {
    const rawPath = m.replace(/^(src|href)=["']/, '').replace(/["']$/, '');
    const fullPath = path.join(__dirname, '..', rawPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`Missing asset in ${page}: ${rawPath}`);
      missingCount++;
    }
  });
});

if (missingCount === 0) {
  console.log('PASS: All local CSS, JS, and image assets referenced in HTML pages exist on disk.');
} else {
  console.error(`FAIL: ${missingCount} missing assets found.`);
  process.exit(1);
}

