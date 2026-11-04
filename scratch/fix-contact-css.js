const fs = require('fs');
const path = require('path');

const contactCssPath = path.join(__dirname, '..', 'css', 'contact.css');
let content = fs.readFileSync(contactCssPath, 'utf8');

const target = `/* Responsive adjustments */
@media (max-width: 1000px) {
  .contact-title {
    font-size: 64px;
  }
  .contact-ghost {
    font-size: 110px;
    left: 40px;
  }`;

const replacement = `/* Responsive adjustments */
@media (max-width: 1000px) {
  .contact-title {
    font-size: 56px;
  }
  .contact-ghost {
    font-size: clamp(34px, 12vw, 68px) !important;
    left: 0 !important;
    right: 0 !important;
    text-align: center !important;
    top: 15px !important;
    transform: none !important;
    white-space: nowrap !important;
    opacity: 0.3 !important;
  }
}
@media (max-width: 680px) {
  .contact-hero {
    position: relative !important;
    padding: 10px 0 28px !important;
    text-align: center !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .contact-copy {
    width: 100% !important;
    max-width: 100% !important;
    text-align: center !important;
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
}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(contactCssPath, content, 'utf8');
  console.log('Successfully updated contact.css');
} else {
  console.error('Could not find target in contact.css');
}

