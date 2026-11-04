const fs = require('fs');
const path = require('path');

const navCssPath = path.join(__dirname, '..', 'css', 'nav.css');
let content = fs.readFileSync(navCssPath, 'utf8');

const stickyHeaderCss = `
/* ============================================================
   8. MOBILE STICKY HEADER (ALL PAGES)
   Sticky bar containing logo on left and hamburger on right
   Active on all viewports <= 1000px
   ============================================================ */

/* Hidden on desktop view */
.mobile-sticky-header {
  display: none;
}

@media (max-width: 1000px) {
  /* Hide the in-flow desktop nav elements on mobile */
  nav.nav,
  header .nav,
  .wrap.nav {
    display: none !important;
  }

  /* Specific page header cleanup on mobile */
  .contact-page .top,
  .contact-page .top header.hero.bl,
  .signin-page header#top,
  .signup-page header#top,
  .cart-page .cart-head {
    display: none !important;
  }

  /* Mobile Sticky Header Bar */
  .mobile-sticky-header {
    display: block !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-width: 100vw !important;
    height: 64px !important;
    z-index: 99990 !important;
    background: rgba(255, 255, 255, 0.94) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(52, 49, 47, 0.08) !important;
    box-shadow: 0 2px 10px rgba(52, 49, 47, 0.04) !important;
    transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
    box-sizing: border-box !important;
  }

  .mobile-sticky-header.is-scrolled {
    background: rgba(255, 255, 255, 0.98) !important;
    box-shadow: 0 4px 20px rgba(52, 49, 47, 0.1) !important;
    border-bottom-color: rgba(52, 49, 47, 0.12) !important;
  }

  .mobile-header-inner {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    height: 100% !important;
    width: min(1180px, calc(100% - 32px)) !important;
    max-width: 100% !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
    padding: 0 !important;
  }

  .mobile-logo {
    display: inline-flex !important;
    align-items: center !important;
    text-decoration: none !important;
    flex-shrink: 0 !important;
    line-height: 1 !important;
    z-index: 2 !important;
  }

  .mobile-logo img {
    height: 38px !important;
    width: auto !important;
    display: block !important;
    object-fit: contain !important;
  }

  .mobile-sticky-header .hamburger-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 42px !important;
    height: 42px !important;
    min-width: 42px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    color: var(--ink, #34312f) !important;
    border: 1.5px solid rgba(52, 49, 47, 0.14) !important;
    box-shadow: 0 2px 8px rgba(52, 49, 47, 0.08) !important;
    font-size: 17px !important;
    cursor: pointer !important;
    padding: 0 !important;
    line-height: 1 !important;
    margin: 0 !important;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease !important;
    -webkit-tap-highlight-color: transparent !important;
    z-index: 2 !important;
  }

  .mobile-sticky-header .hamburger-btn:hover {
    background: #f4faf7 !important;
    color: #2f8f8a !important;
    transform: translateY(-1px) !important;
  }

  .mobile-sticky-header .hamburger-btn:active {
    transform: scale(0.96) !important;
  }

  .mobile-sticky-header .hamburger-btn.is-active {
    background: #b8572d !important;
    color: #ffffff !important;
    border-color: #b8572d !important;
  }

  /* Offset hero and page containers so content is never hidden behind the 64px sticky header */
  header.hero,
  header.hero.grad,
  header.hero.ab,
  header.hero.bl,
  header.dash-hero,
  header.admin-hero,
  .cart-main,
  section.signin-hero,
  .contact-hero,
  .err-wrap {
    padding-top: 78px !important;
  }

  .hero-in,
  .ab .hero-in,
  .bl .hero-in {
    margin-top: 6px !important;
    padding-top: 4px !important;
  }

  .contact-hero {
    padding-top: 78px !important;
  }

  .signin-hero {
    padding-top: 82px !important;
  }

  .cart-main {
    padding-top: 76px !important;
  }

  .err-wrap {
    padding-top: 92px !important;
  }
}

@media (max-width: 480px) {
  .mobile-sticky-header {
    height: 58px !important;
  }

  .mobile-logo img {
    height: 33px !important;
  }

  .mobile-sticky-header .hamburger-btn {
    width: 38px !important;
    height: 38px !important;
    min-width: 38px !important;
    font-size: 16px !important;
  }

  header.hero,
  header.hero.grad,
  header.hero.ab,
  header.hero.bl,
  header.dash-hero,
  header.admin-hero,
  .cart-main,
  section.signin-hero,
  .contact-hero,
  .err-wrap {
    padding-top: 70px !important;
  }
}
`;

fs.writeFileSync(navCssPath, content.trimEnd() + '\n' + stickyHeaderCss.trim() + '\n', 'utf8');
console.log('Successfully appended Section 8 Mobile Sticky Header rules to css/nav.css');

