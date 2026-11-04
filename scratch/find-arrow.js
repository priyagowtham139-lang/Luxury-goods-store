const fs = require('fs');
const lines = fs.readFileSync('contact.html', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (/[→←↑↓↔↕↖↗↘↙⇒⇐⇑⇓➜➔]/.test(l)) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});

