const fs = require('fs');
const path = require('path');

const files = ['about.html', 'services.html', 'blog.html', 'contact.html', 'index.html', 'user-dashboard.html', 'admin-dashboard.html'];

files.forEach(f => {
  const c = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('btn-3d') || l.includes('blob')) {
      console.log(`${f}:${i+1}: ${l.trim()}`);
    }
  });
});

