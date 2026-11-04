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

const headerSnippet = `  <!-- Mobile Sticky Header (Mobile View: Logo on Left, Hamburger on Right) -->
  <header class="mobile-sticky-header" id="mobileStickyHeader" aria-label="Mobile Navigation Header">
    <div class="mobile-header-inner">
      <a href="index.html" class="mobile-logo" aria-label="Stackly Home">
        <img src="assets/stackly-logo-recoloured.webp" alt="Stackly Florence">
      </a>
      <button class="hamburger-btn mobile-hamburger" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileDrawer">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </header>`;

pages.forEach(page => {
  const filePath = path.join(__dirname, '..', page);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('id="mobileStickyHeader"')) {
    console.log(`Already contains mobileStickyHeader: ${page}`);
    return;
  }

  const isCRLF = content.includes('\r\n');
  const newline = isCRLF ? '\r\n' : '\n';
  const snippet = headerSnippet.split('\n').join(newline);

  if (content.includes('<div id="introScreen"')) {
    const regex = /(<div id="introScreen"[^>]*><\/div>\r?\n)/;
    if (regex.test(content)) {
      content = content.replace(regex, `$1${snippet}${newline}`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Inserted mobileStickyHeader after introScreen in ${page}`);
      return;
    }
  }

  // Fallback: insert after <body ...>
  const bodyRegex = /(<body[^>]*>\r?\n)/;
  if (bodyRegex.test(content)) {
    content = content.replace(bodyRegex, `$1${snippet}${newline}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Inserted mobileStickyHeader after body in ${page}`);
    return;
  }

  console.error(`Could not insert into ${page}`);
});

