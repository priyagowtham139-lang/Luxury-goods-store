const fs = require('fs');
const path = require('path');

const signinCssPath = path.join(__dirname, '..', 'css', 'signin.css');
let content = fs.readFileSync(signinCssPath, 'utf8');

const target = `@media (max-width: 680px) {
  .sec-title {
    font-size: 34px;
  }
  .signin-card {
    padding: 34px 26px 30px;
    border-radius: 32px;
  }
  .why-grid,
  .data-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .steps-grid::before {
    display: none;
  }
  .cta-banner {
    padding: 34px 24px;
    border-radius: 32px;
  }
  .faq-pill {
    padding: 0 22px;
  }
}`;

const replacement = `@media (max-width: 680px) {
  .sec-title {
    font-size: 34px;
  }
  .signin-hero {
    position: relative !important;
    padding: 14px 0 90px !important;
    width: 100% !important;
  }
  .signin-card,
  .signup-card {
    padding: 24px 18px 22px !important;
    border-radius: 26px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .signin-card h1,
  .signup-card h1 {
    font-size: clamp(24px, 7vw, 30px) !important;
    text-align: center !important;
  }
  .signin-sub {
    font-size: 13px !important;
    text-align: center !important;
  }
  .auth-role-tabs {
    padding: 4px !important;
    gap: 4px !important;
    width: 100% !important;
  }
  .auth-role-tab {
    padding: 8px 6px !important;
    font-size: 12px !important;
    gap: 6px !important;
  }
  .field-row {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
  }
  .why-grid,
  .data-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .steps-grid::before {
    display: none;
  }
  .cta-banner {
    padding: 34px 24px;
    border-radius: 32px;
  }
  .faq-pill {
    padding: 0 22px;
  }
}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(signinCssPath, content, 'utf8');
  console.log('Successfully updated signin.css');
} else {
  console.error('Could not find target in signin.css');
}

