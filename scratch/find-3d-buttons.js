const fs = require('fs');
const path = require('path');

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

console.log('=== FINDING ALL 3D & CTA BUTTONS ACROSS ALL PAGES ===\n');

pages.forEach(p => {
  const content = fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
  const lines = content.split('\n');
  console.log(`\n--- ${p} ---`);
  lines.forEach((l, idx) => {
    if (l.includes('btn-3d') || l.includes('blob') || l.includes('cta') || (l.includes('class=') && l.includes('btn') && (l.includes('href') || l.includes('onclick')))) {
      console.log(`Line ${idx + 1}: ${l.trim()}`);
    }
  });
});

