const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'js', 'mobile-nav.js');
let content = fs.readFileSync(jsPath, 'utf8');

// Find insertion point before // 6. Global Init
const target = `  // 6. Global Init
  function init() {
    setupMobileDrawer();
    highlightActiveDrawerLink();
    setupDrawerEvents();
    setupEyeToggle();
    setupSectionTracking();
  }`;

const replacement = `  // 6. Setup Mobile Sticky Header (Logo on left, Hamburger on right)
  function setupMobileStickyHeader() {
    var existing = document.getElementById('mobileStickyHeader');
    if (!existing) {
      var header = document.createElement('header');
      header.className = 'mobile-sticky-header';
      header.id = 'mobileStickyHeader';
      header.setAttribute('aria-label', 'Mobile Navigation Header');
      header.innerHTML =
        '<div class="mobile-header-inner">' +
          '<a href="index.html" class="mobile-logo" aria-label="Stackly Home">' +
            '<img src="assets/stackly-logo-recoloured.webp" alt="Stackly Florence">' +
          '</a>' +
          '<button class="hamburger-btn mobile-hamburger" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileDrawer">' +
            '<i class="fa-solid fa-bars"></i>' +
          '</button>' +
        '</div>';
      document.body.insertBefore(header, document.body.firstChild);
    }
  }

  // 7. Sticky Header Scroll Effect (frosted glass shadow when scrolled)
  function setupHeaderScrollEffect() {
    var header = document.getElementById('mobileStickyHeader');
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 8. Global Init
  function init() {
    setupMobileStickyHeader();
    setupMobileDrawer();
    highlightActiveDrawerLink();
    setupDrawerEvents();
    setupHeaderScrollEffect();
    setupEyeToggle();
    setupSectionTracking();
  }`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(jsPath, content, 'utf8');
  console.log('Successfully updated js/mobile-nav.js with Mobile Sticky Header support');
} else {
  console.error('Could not find target in js/mobile-nav.js');
}

