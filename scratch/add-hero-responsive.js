const fs = require('fs');
const path = require('path');

const navCssPath = path.join(__dirname, '..', 'css', 'nav.css');
let content = fs.readFileSync(navCssPath, 'utf8');

const heroSection = `

/* ============================================================
   7. MASTER HERO SECTION MOBILE RESPONSIVENESS (ALL PAGES)
   Zero lateral cutoffs, fluid typography, safe badge positioning,
   and bulletproof mobile scaling down to 320px viewport.
   ============================================================ */

/* Container and Overflow Guard */
@media (max-width: 900px) {
  header.hero,
  header.hero.grad,
  header.hero.ab,
  header.hero.bl,
  header.dash-hero,
  header.admin-hero,
  section.signin-hero,
  .contact-hero,
  .cart-main,
  .err-wrap {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
  }

  /* Universal Watermark / Ghost text fix:
     Constrain giant 240px text so it never stretches or cuts off */
  .wm,
  .ghost,
  .contact-ghost {
    font-size: clamp(32px, 11vw, 64px) !important;
    left: 0 !important;
    right: 0 !important;
    top: 15px !important;
    width: 100% !important;
    max-width: 100% !important;
    text-align: center !important;
    letter-spacing: 0.04em !important;
    white-space: nowrap !important;
    opacity: 0.28 !important;
    pointer-events: none !important;
    transform: none !important;
    animation: none !important;
  }

  /* Universal hero glow constraint */
  .hero-glow {
    width: min(320px, 90vw) !important;
    height: min(320px, 90vw) !important;
    right: -10% !important;
    top: 0 !important;
    filter: blur(24px) !important;
    pointer-events: none !important;
    overflow: hidden !important;
  }

  /* Wave overflow guard */
  .wave {
    width: 100% !important;
    max-width: 100vw !important;
    overflow: hidden !important;
    left: 0 !important;
    right: 0 !important;
    bottom: -1px !important;
  }
}

@media (max-width: 680px) {
  /* Ensure hero has breathing room above bottom decorative wave */
  header.hero,
  header.hero.grad,
  header.hero.ab,
  header.hero.bl {
    min-height: auto !important;
    padding-bottom: 95px !important;
  }

  /* Universal Hero-In flex layouts */
  .hero-in,
  .ab .hero-in,
  .bl .hero-in {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    text-align: center !important;
    margin-top: 18px !important;
    padding-top: 14px !important;
    gap: 22px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Universal Hero-Txt / Copy containers */
  .hero-txt,
  .hero-copy,
  .ab .hero-copy,
  .bl .hero-copy,
  .contact-copy {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 auto !important;
    text-align: center !important;
    box-sizing: border-box !important;
  }

  /* --- 1. HOME HERO (index.html) --- */
  .hero-txt .season {
    font-size: clamp(20px, 6vw, 28px) !important;
    transform: rotate(-2deg) !important;
    display: inline-block !important;
    margin-bottom: 6px !important;
    white-space: normal !important;
    max-width: 100% !important;
    line-height: 1.2 !important;
  }

  .hero-txt h1 {
    font-size: clamp(38px, 12vw, 64px) !important;
    line-height: 1.05 !important;
    letter-spacing: -0.01em !important;
    margin: 4px 0 12px !important;
    text-shadow: 2px 2px 0 #ffffff !important;
    word-break: break-word !important;
  }

  .chips {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    margin: 12px 0 16px !important;
    width: 100% !important;
  }

  .chips span {
    padding: 6px 14px !important;
    font-size: 12px !important;
    border-radius: 99px !important;
  }

  .hero-txt .lede {
    font-size: 14px !important;
    line-height: 1.55 !important;
    max-width: 380px !important;
    margin: 0 auto !important;
    text-align: center !important;
  }

  .btns {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 12px !important;
    margin: 20px auto 0 !important;
    width: 100% !important;
    max-width: 300px !important;
  }

  .btns .blob {
    flex: 1 1 120px !important;
    height: 46px !important;
    min-height: 46px !important;
    width: auto !important;
    padding: 0 16px !important;
    font-size: 14px !important;
    border-radius: 99px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }

  /* Home Hero Art & Badges */
  .hero-art {
    position: relative !important;
    width: 100% !important;
    max-width: 270px !important;
    height: 270px !important;
    left: 0 !important;
    right: 0 !important;
    top: 0 !important;
    margin: 12px auto 0 !important;
    box-sizing: border-box !important;
  }

  .hero-art .ring {
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 220px !important;
    height: 220px !important;
    max-width: 92% !important;
    max-height: 92% !important;
  }

  .hero-art img {
    position: relative !important;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
    margin: 10px auto 0 !important;
    width: 185px !important;
    max-width: 72% !important;
    height: auto !important;
    display: block !important;
    transform: none !important;
  }

  .b96 {
    position: absolute !important;
    right: 0 !important;
    top: 4px !important;
    left: auto !important;
    bottom: auto !important;
    width: 76px !important;
    height: 66px !important;
    padding-top: 8px !important;
    border-radius: 26px 26px 12px 26px !important;
    transform: none !important;
    box-sizing: border-box !important;
    z-index: 5 !important;
  }

  .b96 small,
  .b42 small {
    font-size: 10px !important;
    line-height: 1.1 !important;
  }

  .b96 b {
    font-size: 24px !important;
    line-height: 1.1 !important;
  }

  .b42 {
    position: absolute !important;
    left: 0 !important;
    bottom: 6px !important;
    top: auto !important;
    right: auto !important;
    width: 64px !important;
    height: 64px !important;
    padding-top: 10px !important;
    border-radius: 50% !important;
    transform: none !important;
    box-sizing: border-box !important;
    z-index: 5 !important;
  }

  .b42 b {
    font-size: 20px !important;
    line-height: 1.1 !important;
  }

  .scroll-cue {
    position: relative !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    margin: 18px auto 0 !important;
    justify-content: center !important;
    z-index: 3 !important;
  }

  /* --- 2. ABOUT HERO (about.html) --- */
  .ab h1 {
    font-size: clamp(36px, 11vw, 54px) !important;
    line-height: 1.05 !important;
    letter-spacing: -0.01em !important;
  }

  .ab .hero-copy p {
    font-size: 14.5px !important;
    line-height: 1.55 !important;
    max-width: 380px !important;
    margin: 12px auto 20px !important;
  }

  .ab .row,
  .hero-copy .row {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 10px !important;
    width: 100% !important;
    max-width: 320px !important;
    margin: 0 auto !important;
    flex-wrap: wrap !important;
  }

  .ab .row .btn,
  .hero-copy .row .btn {
    flex: 1 1 130px !important;
    height: 44px !important;
    font-size: 13px !important;
    padding: 0 14px !important;
    justify-content: center !important;
    border-radius: 99px !important;
    box-sizing: border-box !important;
  }

  .ab .hero-img {
    width: 100% !important;
    max-width: 290px !important;
    height: 200px !important;
    right: 0 !important;
    left: 0 !important;
    top: 0 !important;
    margin: 14px auto 0 !important;
    border-radius: 26px !important;
    animation: none !important;
    transform: none !important;
    position: relative !important;
  }

  .ab .hero-img img {
    border-radius: 24px !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .ab .hero-img::after {
    border-radius: 24px !important;
    inset: 4px !important;
  }

  /* --- 3. SERVICES HERO (services.html) --- */
  .hero h1 {
    font-size: clamp(38px, 11vw, 56px) !important;
    line-height: 1.05 !important;
  }

  .hero-copy p {
    font-size: 14.5px !important;
    line-height: 1.55 !important;
    max-width: 380px !important;
    margin: 12px auto 20px !important;
  }

  .hero-img {
    width: 100% !important;
    max-width: 290px !important;
    height: 200px !important;
    margin: 14px auto 0 !important;
    position: relative !important;
  }

  .hero-img img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    display: block !important;
    margin: 0 auto !important;
  }

  /* --- 4. BLOG HERO (blog.html) --- */
  .bl h1 {
    font-size: clamp(38px, 11vw, 56px) !important;
    line-height: 1.05 !important;
  }

  .bl .hero-copy p {
    font-size: 14.5px !important;
    line-height: 1.55 !important;
    max-width: 380px !important;
    margin: 12px auto 20px !important;
  }

  .bl .hero-copy .btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 44px !important;
    padding: 0 28px !important;
    font-size: 13.5px !important;
    margin: 0 auto !important;
    border-radius: 99px !important;
  }

  .bl .hero-img {
    width: 100% !important;
    max-width: 290px !important;
    height: 200px !important;
    margin: 14px auto 0 !important;
    border-radius: 26px !important;
    animation: none !important;
    transform: none !important;
    position: relative !important;
    left: 0 !important;
    right: 0 !important;
  }

  .bl .hero-img img {
    border-radius: 24px !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .bl .hero-img::after {
    border-radius: 26px !important;
  }

  /* --- 5. CONTACT HERO (contact.html) --- */
  .contact-hero {
    position: relative !important;
    padding: 10px 0 28px !important;
    text-align: center !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .contact-title {
    font-size: clamp(38px, 11vw, 54px) !important;
    line-height: 1.05 !important;
    letter-spacing: -0.02em !important;
    margin-bottom: 8px !important;
  }

  .contact-sub {
    font-size: 14px !important;
    line-height: 1.55 !important;
    max-width: 380px !important;
    margin: 0 auto !important;
  }

  /* --- 6. SIGN IN & SIGN UP (signin.html, signup.html) --- */
  .signin-hero {
    position: relative !important;
    padding: 14px 0 90px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .signin-card,
  .signup-card {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding: 24px 18px 22px !important;
    border-radius: 26px !important;
    margin: 0 auto !important;
  }

  .signin-card h1,
  .signup-card h1 {
    font-size: clamp(24px, 7vw, 30px) !important;
    text-align: center !important;
    line-height: 1.15 !important;
  }

  .signin-sub {
    font-size: 13px !important;
    line-height: 1.5 !important;
    text-align: center !important;
    margin: 8px auto 18px !important;
    max-width: 320px !important;
  }

  .auth-role-tabs {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 4px !important;
    gap: 4px !important;
    margin-bottom: 14px !important;
  }

  .auth-role-tab {
    padding: 8px 8px !important;
    font-size: 12px !important;
    gap: 6px !important;
    flex: 1 1 50% !important;
  }

  .auth-role-tab i {
    font-size: 13px !important;
  }

  .role-badge-hint {
    font-size: 11px !important;
    padding: 5px 10px !important;
    margin: 0 auto 14px !important;
    display: inline-flex !important;
    max-width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
  }

  .field-row {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
  }

  .signin-input,
  .tier-select {
    height: 46px !important;
    font-size: 13.5px !important;
    padding: 0 14px !important;
    border-radius: 12px !important;
  }

  .signin-btn {
    height: 46px !important;
    font-size: 13.5px !important;
    width: 100% !important;
    justify-content: center !important;
    border-radius: 99px !important;
  }

  /* --- 7. USER & ADMIN DASHBOARDS --- */
  .dash-hero,
  .admin-hero {
    padding: 12px 0 28px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .profile-banner,
  .admin-banner {
    margin-top: 14px !important;
    padding: 18px 16px !important;
    border-radius: 22px !important;
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 14px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .profile-info,
  .admin-info {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 12px !important;
    width: 100% !important;
  }

  .profile-avatar,
  .admin-avatar {
    width: 46px !important;
    height: 46px !important;
    min-width: 46px !important;
    font-size: 17px !important;
    border-radius: 14px !important;
    flex-shrink: 0 !important;
  }

  .profile-text,
  .admin-text {
    flex: 1 !important;
    min-width: 0 !important;
  }

  .profile-text h1,
  .admin-text h1 {
    font-size: clamp(17px, 5.2vw, 21px) !important;
    line-height: 1.2 !important;
    margin-bottom: 4px !important;
    word-break: break-word !important;
  }

  .profile-text p,
  .admin-text p {
    font-size: 12px !important;
    gap: 6px !important;
    line-height: 1.4 !important;
  }

  .profile-banner .btn,
  .admin-banner .btn {
    width: 100% !important;
    height: 42px !important;
    font-size: 13px !important;
    justify-content: center !important;
    border-radius: 99px !important;
    box-sizing: border-box !important;
    margin: 0 !important;
  }

  /* --- 8. CART & 404 --- */
  .cart-main {
    padding-top: 12px !important;
    width: 100% !important;
  }

  .cart-main h1 {
    font-size: clamp(28px, 9vw, 38px) !important;
    margin-bottom: 14px !important;
  }

  .err-wrap {
    min-height: 100vh !important;
    min-height: 100dvh !important;
    padding: 75px 16px 32px !important;
    box-sizing: border-box !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .err-badge {
    font-size: 11.5px !important;
    padding: 5px 12px !important;
    margin-top: 20px !important;
    margin-bottom: 12px !important;
  }

  .err-title {
    font-size: clamp(64px, 20vw, 96px) !important;
    line-height: 0.95 !important;
    margin-bottom: 10px !important;
  }

  .err-sub {
    font-size: 13.5px !important;
    line-height: 1.5 !important;
    max-width: 300px !important;
    margin: 0 auto 22px !important;
  }

  .err-actions {
    flex-direction: column !important;
    width: 100% !important;
    max-width: 250px !important;
    gap: 10px !important;
    margin: 0 auto !important;
  }

  .err-actions .blob {
    width: 100% !important;
    height: 44px !important;
    padding: 0 16px !important;
    font-size: 13.5px !important;
    justify-content: center !important;
    box-sizing: border-box !important;
  }
}

/* Micro screens (max-width: 360px - e.g. iPhone SE 1st gen, Galaxy Fold) */
@media (max-width: 360px) {
  .hero-txt h1,
  .ab h1,
  .hero h1,
  .bl h1,
  .contact-title {
    font-size: 34px !important;
  }

  .btns,
  .ab .row,
  .hero-copy .row {
    flex-direction: column !important;
    max-width: 240px !important;
  }

  .btns .blob,
  .ab .row .btn,
  .hero-copy .row .btn {
    width: 100% !important;
    flex: none !important;
  }

  .hero-art {
    max-width: 240px !important;
    height: 240px !important;
  }

  .hero-art .ring {
    width: 190px !important;
    height: 190px !important;
  }

  .hero-art img {
    width: 155px !important;
  }

  .b96 {
    width: 68px !important;
    height: 58px !important;
    padding-top: 6px !important;
  }

  .b96 b {
    font-size: 20px !important;
  }

  .b42 {
    width: 56px !important;
    height: 56px !important;
    padding-top: 8px !important;
  }

  .b42 b {
    font-size: 17px !important;
  }

  .auth-role-tab {
    font-size: 11px !important;
    padding: 6px 4px !important;
  }

  .auth-role-tab i {
    font-size: 11px !important;
  }
}
`;

fs.writeFileSync(navCssPath, content.trimEnd() + '\n' + heroSection.trim() + '\n', 'utf8');
console.log('Successfully appended Master Hero Responsive rules to css/nav.css');

