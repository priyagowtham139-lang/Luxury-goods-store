const fs = require('fs');
const path = require('path');

const files = [
  {
    file: 'about.html',
    from: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/nav.css">\n  <link rel="stylesheet" href="css/about.css">`,
    to: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/about.css">\n  <link rel="stylesheet" href="css/nav.css">`
  },
  {
    file: 'services.html',
    from: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/nav.css">\n  <link rel="stylesheet" href="css/services.css">`,
    to: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/services.css">\n  <link rel="stylesheet" href="css/nav.css">`
  },
  {
    file: 'blog.html',
    from: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/nav.css">\n  <link rel="stylesheet" href="css/blog.css">`,
    to: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/blog.css">\n  <link rel="stylesheet" href="css/nav.css">`
  },
  {
    file: 'contact.html',
    from: `<link rel="stylesheet" href="css/nav.css">\n  <link rel="stylesheet" href="css/contact.css">`,
    to: `<link rel="stylesheet" href="css/contact.css">\n  <link rel="stylesheet" href="css/nav.css">`
  },
  {
    file: 'signin.html',
    from: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/nav.css">\n  <link rel="stylesheet" href="css/signin.css">`,
    to: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/signin.css">\n  <link rel="stylesheet" href="css/nav.css">`
  },
  {
    file: 'signup.html',
    from: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/nav.css">\n  <link rel="stylesheet" href="css/signin.css">`,
    to: `<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/signin.css">\n  <link rel="stylesheet" href="css/nav.css">`
  }
];

files.forEach(({ file, from, to }) => {
  const filePath = path.join(__dirname, '..', file);
  let content = fs.readFileSync(filePath, 'utf8');
  // Normalize CRLF to LF for matching
  const normalizedFrom = from.replace(/\r\n/g, '\n');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  if (normalizedContent.includes(normalizedFrom)) {
    const updated = normalizedContent.replace(normalizedFrom, to.replace(/\r\n/g, '\n'));
    // Preserve CRLF if original had it
    fs.writeFileSync(filePath, content.includes('\r\n') ? updated.replace(/\n/g, '\r\n') : updated, 'utf8');
    console.log(`Reordered nav.css in ${file}`);
  } else {
    console.warn(`Could not find target in ${file}`);
  }
});

