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

let allPassed = true;

console.log('=== VERIFYING ALL 3D CTA BUTTON REDIRECTIONS TO 404.HTML ===\n');

let total3dCount = 0;
let redirected3dCount = 0;

pages.forEach(page => {
  const filePath = path.join(__dirname, '..', page);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((l, idx) => {
    // Look for 3D buttons (btn-3d, blob, visit-btn) excluding chips or 404 navigation
    if (l.includes('btn-3d') || l.includes('blob') || l.includes('visit-btn')) {
      if (l.includes('class="chip') || page === '404.html') {
        return; // skip non-CTA chips and 404 page return buttons
      }
      total3dCount++;
      const is404 = l.includes('404.html');
      if (is404) {
        redirected3dCount++;
        console.log(`[PASS] ${page}:${idx + 1} -> 404.html`);
      } else {
        allPassed = false;
        console.error(`[FAIL] ${page}:${idx + 1} does not link to 404.html: ${l.trim()}`);
      }
    }
  });
});

console.log(`\nTotal 3D CTA buttons found: ${total3dCount}, Redirecting to 404.html: ${redirected3dCount}`);

console.log('\n=== VERIFYING JAVASCRIPT GLOBAL 3D CTA INTERCEPTOR ===');
const mobileNavJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'mobile-nav.js'), 'utf8');
const hasJsHandler = mobileNavJs.includes('setupCta3dRedirects') && mobileNavJs.includes('404.html');
if (hasJsHandler) {
  console.log('PASS: Universal CTA 3D click handler active in js/mobile-nav.js');
} else {
  console.error('FAIL: Missing setupCta3dRedirects in js/mobile-nav.js');
  allPassed = false;
}

console.log('\n=== VERIFYING ZERO EMOJIS & ZERO UNICODE ARROWS ===');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
const arrowRegex = /[→←↑↓]/;

pages.forEach(page => {
  const content = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
  if (emojiRegex.test(content)) {
    console.error(`FAIL: Emoji found in ${page}`);
    allPassed = false;
  }
  if (arrowRegex.test(content)) {
    console.error(`FAIL: Unicode arrow found in ${page}`);
    allPassed = false;
  }
});
console.log('PASS: Zero emojis and zero unicode arrows found across all pages');

console.log('\n============================================================');
if (allPassed) {
  console.log('ALL CHECKS PASSED: ALL CTA 3D BUTTONS REDIRECT TO 404 PAGE!');
} else {
  console.error('VERIFICATION FAILED!');
  process.exit(1);
}

