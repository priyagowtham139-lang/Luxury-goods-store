const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'js', 'mobile-nav.js');
let content = fs.readFileSync(jsPath, 'utf8');

const target = `  // 8. Global Init
  function init() {
    setupMobileStickyHeader();
    setupMobileDrawer();
    highlightActiveDrawerLink();
    setupDrawerEvents();
    setupHeaderScrollEffect();
    setupEyeToggle();
    setupSectionTracking();
  }`;

const replacement = `  // 8. Universal CTA 3D Buttons Redirection to 404 Page
  function setupCta3dRedirects() {
    document.addEventListener('click', function (e) {
      var cta = e.target.closest('.btn-3d, .blob, .visit-btn, .cta-btn');
      if (!cta) return;

      // Do NOT intercept on 404.html itself (preserves Go Back and Return Home buttons)
      var path = window.location.pathname.split('/').pop().toLowerCase();
      if (path === '404.html' || window.location.href.indexOf('404.html') !== -1) return;

      // Do NOT intercept navigation, drawer, eye toggles, or filter chips
      if (cta.closest('.mobile-sticky-header, .drawer-links, .nav, .err-actions, .go-back-btn, .password-wrap')) return;
      if (cta.classList.contains('chip') || cta.tagName.toLowerCase() === 'span') return;
      if (cta.type === 'submit' && cta.closest('form#contactForm')) return;

      // Record current section and URL for seamless 404 Go Back fallback
      try {
        sessionStorage.setItem('stackly_prev_url', window.location.href);
      } catch (err) {}

      e.preventDefault();
      window.location.href = '404.html';
    });
  }

  // 9. Global Init
  function init() {
    setupMobileStickyHeader();
    setupMobileDrawer();
    highlightActiveDrawerLink();
    setupDrawerEvents();
    setupHeaderScrollEffect();
    setupEyeToggle();
    setupSectionTracking();
    setupCta3dRedirects();
  }`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(jsPath, content, 'utf8');
  console.log('Successfully updated js/mobile-nav.js with CTA 3D redirection handler');
} else {
  console.error('Could not find target in js/mobile-nav.js');
}

