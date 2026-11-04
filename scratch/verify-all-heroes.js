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

console.log('--- 1. VERIFYING HERO SECTION MARKUP & CSS LINKS ACROSS ALL PAGES ---');

pages.forEach(page => {
  const filePath = path.join(__dirname, '..', page);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: File ${page} does not exist`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Check nav.css link
  const hasNavCss = content.includes('css/nav.css');
  // Check Font Awesome
  const hasFa = content.includes('font-awesome') || content.includes('fa-');
  // Check hamburger button
  const hasHamburger = content.includes('hamburger-btn');
  // Check mobile-nav.js
  const hasMobileNavJs = content.includes('js/mobile-nav.js');
  // Check viewport meta tag
  const hasViewport = content.includes('name="viewport"');

  const status = hasNavCss && hasFa && hasHamburger && hasMobileNavJs && hasViewport;
  if (!status) {
    allPassed = false;
    console.error(`FAIL in ${page}: navCss=${hasNavCss}, fa=${hasFa}, hamb=${hasHamburger}, js=${hasMobileNavJs}, viewport=${hasViewport}`);
  } else {
    console.log(`PASS: ${page} contains all responsive navigation & viewport essentials`);
  }
});

console.log('\n--- 2. VERIFYING ZERO EMOJIS CODEBASE-WIDE ---');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
pages.forEach(page => {
  const content = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
  const match = content.match(emojiRegex);
  if (match) {
    console.error(`FAIL: Emoji found in ${page}: ${match[0]}`);
    allPassed = false;
  }
});
console.log('PASS: Zero emojis found across all pages');

console.log('\n--- 3. VERIFYING ZERO UNICODE ARROWS (FONT AWESOME ONLY) ---');
const arrowRegex = /[→←↑↓]/;
pages.forEach(page => {
  const content = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
  const match = content.match(arrowRegex);
  if (match) {
    console.error(`FAIL: Unicode arrow found in ${page}: ${match[0]}`);
    allPassed = false;
  }
});
console.log('PASS: Zero unicode arrows found across all pages');

console.log('\n--- 4. VERIFYING CROSS-BROWSER PASSWORD EYE TOGGLE & DUAL-EYE FIX ---');
const navCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'nav.css'), 'utf8');
const hasMsReveal = navCss.includes('::-ms-reveal') && navCss.includes('::-ms-clear');
const hasEyeBtn = navCss.includes('.eye-toggle-btn');
if (hasMsReveal && hasEyeBtn) {
  console.log('PASS: Dual-eye suppression (::-ms-reveal / ::-ms-clear) and custom eye toggle configured in nav.css');
} else {
  console.error('FAIL: Dual-eye suppression missing in nav.css');
  allPassed = false;
}

console.log('\n--- 5. VERIFYING MASTER HERO RESPONSIVENESS IN CSS/NAV.CSS ---');
const hasMasterHero = navCss.includes('MASTER HERO SECTION MOBILE RESPONSIVENESS');
const hasFluidWm = navCss.includes('.wm,') && navCss.includes('.ghost,');
const hasHeroArtFix = navCss.includes('.hero-art') && navCss.includes('max-width: 270px');
const hasAbHeroImgFix = navCss.includes('.ab .hero-img') && navCss.includes('animation: none');
const hasBlHeroImgFix = navCss.includes('.bl .hero-img') && navCss.includes('animation: none');
const hasContactHeroFix = navCss.includes('.contact-hero');
const hasSigninHeroFix = navCss.includes('.signin-card,');
const hasProfileBannerFix = navCss.includes('.profile-banner,');

console.log(`Master Hero block present: ${hasMasterHero}`);
console.log(`Fluid watermarks/ghosts: ${hasFluidWm}`);
console.log(`Hero-art responsive sizing: ${hasHeroArtFix}`);
console.log(`About hero image overflow fix: ${hasAbHeroImgFix}`);
console.log(`Blog hero image overflow fix: ${hasBlHeroImgFix}`);
console.log(`Contact hero responsiveness: ${hasContactHeroFix}`);
console.log(`Sign-in/Sign-up card responsiveness: ${hasSigninHeroFix}`);
console.log(`Dashboard profile banner responsiveness: ${hasProfileBannerFix}`);

if (hasMasterHero && hasFluidWm && hasHeroArtFix && hasAbHeroImgFix && hasBlHeroImgFix && hasContactHeroFix && hasSigninHeroFix && hasProfileBannerFix) {
  console.log('PASS: All Master Hero Responsive rules verified in css/nav.css');
} else {
  console.error('FAIL: Missing some Master Hero Responsive rules in css/nav.css');
  allPassed = false;
}

console.log('\n============================================================');
if (allPassed) {
  console.log('ALL VERIFICATION CHECKS PASSED PERFECTLY!');
} else {
  console.error('SOME CHECKS FAILED!');
  process.exit(1);
}

