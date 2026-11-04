const fs = require('fs');

const files = [
  'index.html', 'about.html', 'services.html', 'blog.html', 'contact.html',
  'cart.html', 'signin.html', 'signup.html', 'user-dashboard.html',
  'admin-dashboard.html', '404.html'
];

console.log('=== GLOBAL INTEGRITY AUDIT ===');
let pass = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasSticky = content.includes('class="mobile-sticky-header"');
  const hasNavCss = content.includes('css/nav.css');
  const hasFontAwesome = content.includes('font-awesome/6.5.1/css/all.min.css');
  const hasEmoji = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(content);
  const hasArrow = /[→←↑↓↔↕↖↗↘↙⇒⇐⇑⇓➜➔]/.test(content);

  if (!hasSticky || !hasNavCss || !hasFontAwesome || hasEmoji || hasArrow) {
    console.error(`FAIL on ${f}: sticky=${hasSticky}, navCss=${hasNavCss}, fa=${hasFontAwesome}, emoji=${hasEmoji}, arrow=${hasArrow}`);
    pass = false;
  } else {
    console.log(`✓ ${f}: PASS`);
  }
});

console.log(`Result: ${pass ? 'ALL 11 PAGES 100% HEALTHY' : 'SOME ISSUES FOUND'}`);

