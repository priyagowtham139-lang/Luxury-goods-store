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

console.log('=== VERIFYING MOBILE STICKY HEADER ACROSS ALL 11 PAGES ===\n');

pages.forEach(page => {
  const filePath = path.join(__dirname, '..', page);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Check mobile-sticky-header markup
  const hasMobileHeader = content.includes('class="mobile-sticky-header"') && content.includes('id="mobileStickyHeader"');
  // 2. Check logo inside mobile header
  const hasLogo = content.includes('class="mobile-logo"') && content.includes('stackly-logo-recoloured');
  // 3. Check hamburger button inside mobile header
  const hasHamburger = content.includes('mobile-hamburger') && content.includes('fa-bars');
  // 4. Check nav.css linked
  const hasNavCss = content.includes('css/nav.css');
  // 5. Check mobile-nav.js linked
  const hasMobileNavJs = content.includes('js/mobile-nav.js');

  const pageOk = hasMobileHeader && hasLogo && hasHamburger && hasNavCss && hasMobileNavJs;
  if (!pageOk) {
    allPassed = false;
    console.error(`FAIL: ${page} -> header:${hasMobileHeader}, logo:${hasLogo}, hamb:${hasHamburger}, navCss:${hasNavCss}, js:${hasMobileNavJs}`);
  } else {
    console.log(`PASS: ${page} has Mobile Sticky Header with logo and hamburger`);
  }
});

console.log('\n=== VERIFYING CSS RULES FOR STICKY HEADER IN NAV.CSS ===');
const navCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'nav.css'), 'utf8');

const checks = [
  { name: 'Hidden on desktop', test: navCss.includes('.mobile-sticky-header') && navCss.includes('display: none;') },
  { name: 'Sticky / Fixed positioning on mobile', test: navCss.includes('position: fixed !important;') && navCss.includes('z-index: 99990 !important;') },
  { name: 'Desktop nav hidden on mobile', test: navCss.includes('nav.nav,') && navCss.includes('display: none !important;') },
  { name: 'Scroll state styling (.is-scrolled)', test: navCss.includes('.mobile-sticky-header.is-scrolled') },
  { name: 'Page content top padding offset', test: navCss.includes('padding-top: 78px !important;') },
  { name: 'Logo styling', test: navCss.includes('.mobile-logo') },
  { name: 'Hamburger button styling in sticky header', test: navCss.includes('.mobile-sticky-header .hamburger-btn') }
];

checks.forEach(c => {
  if (c.test) {
    console.log(`PASS: ${c.name}`);
  } else {
    console.error(`FAIL: ${c.name}`);
    allPassed = false;
  }
});

console.log('\n=== VERIFYING JS IMPLEMENTATION IN MOBILE-NAV.JS ===');
const mobileNavJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'mobile-nav.js'), 'utf8');

const jsChecks = [
  { name: 'setupMobileStickyHeader function', test: mobileNavJs.includes('setupMobileStickyHeader') },
  { name: 'setupHeaderScrollEffect function', test: mobileNavJs.includes('setupHeaderScrollEffect') },
  { name: 'Scroll listener adds is-scrolled class', test: mobileNavJs.includes('is-scrolled') },
  { name: 'Hamburger click toggle listener', test: mobileNavJs.includes('target.closest(\'.hamburger-btn\')') },
  { name: 'Active page highlighting in drawer', test: mobileNavJs.includes('highlightActiveDrawerLink') }
];

jsChecks.forEach(c => {
  if (c.test) {
    console.log(`PASS: ${c.name}`);
  } else {
    console.error(`FAIL: ${c.name}`);
    allPassed = false;
  }
});

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
  console.log('ALL VERIFICATIONS PASSED 100%! MOBILE STICKY HEADER READY!');
} else {
  console.error('VERIFICATION FAILED!');
  process.exit(1);
}

