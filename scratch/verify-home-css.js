const fs = require('fs');

const css = fs.readFileSync('css/home.css', 'utf8');

// Check brace matching
let openCount = 0;
let inString = false;
let stringChar = '';
let inComment = false;
let line = 1;
let col = 0;

for (let i = 0; i < css.length; i++) {
  const ch = css[i];
  if (ch === '\n') {
    line++;
    col = 0;
  } else {
    col++;
  }

  if (inComment) {
    if (ch === '*' && css[i + 1] === '/') {
      inComment = false;
      i++;
    }
    continue;
  }

  if (inString) {
    if (ch === stringChar && css[i - 1] !== '\\') {
      inString = false;
    }
    continue;
  }

  if (ch === '/' && css[i + 1] === '*') {
    inComment = true;
    i++;
    continue;
  }

  if (ch === '"' || ch === "'") {
    inString = true;
    stringChar = ch;
    continue;
  }

  if (ch === '{') {
    openCount++;
  } else if (ch === '}') {
    openCount--;
    if (openCount < 0) {
      console.error(`Extra closing brace at line ${line}, col ${col}`);
      process.exit(1);
    }
  }
}

if (openCount !== 0) {
  console.error(`Unclosed braces remaining: ${openCount}`);
  process.exit(1);
}

console.log('✓ css/home.css brace balance OK! (Balance: 0)');

