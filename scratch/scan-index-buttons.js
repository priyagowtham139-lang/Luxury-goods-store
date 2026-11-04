const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<button') || (l.includes('<a') && (l.includes('class=') || l.includes('href')))) {
    // filter out nav links
    if (!l.includes('nav-links') && !l.includes('drawer-links') && !l.includes('logo') && !l.includes('class="crumb"')) {
      console.log(`index.html:${i + 1}: ${l.trim()}`);
    }
  }
});

