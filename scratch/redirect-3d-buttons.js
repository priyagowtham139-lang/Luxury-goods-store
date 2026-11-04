const fs = require('fs');
const path = require('path');

// 1. services.html
const servicesPath = path.join(__dirname, '..', 'services.html');
let servicesContent = fs.readFileSync(servicesPath, 'utf8');

// Replace hero 3D buttons
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d dark lg" href="contact.html" data-a>Book a consultation</a>',
  '<a class="btn btn-3d dark lg" href="404.html" data-a>Book a consultation</a>'
);
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d light lg" href="#plans" data-a>See plans</a>',
  '<a class="btn btn-3d light lg" href="404.html" data-a>See plans</a>'
);

// Replace 6 card 3D buttons
servicesContent = servicesContent.replace(
  /<a class="btn btn-3d dark sm" href="contact\.html">Enquire<\/a>/g,
  '<a class="btn btn-3d dark sm" href="404.html">Enquire</a>'
);
servicesContent = servicesContent.replace(
  /<a class="btn btn-3d light sm" href="contact\.html">Enquire<\/a>/g,
  '<a class="btn btn-3d light sm" href="404.html">Enquire</a>'
);

// Replace feature section 3D buttons
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d dark lg" href="contact.html" data-a>Book a session</a>',
  '<a class="btn btn-3d dark lg" href="404.html" data-a>Book a session</a>'
);
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d dark lg" href="contact.html" data-a>Request a repair</a>',
  '<a class="btn btn-3d dark lg" href="404.html" data-a>Request a repair</a>'
);

// Replace plan 3D buttons
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d dark sm" href="signin.html">Included with pieces</a>',
  '<a class="btn btn-3d dark sm" href="404.html">Included with pieces</a>'
);
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d light sm" href="contact.html">Join Patron Tier</a>',
  '<a class="btn btn-3d light sm" href="404.html">Join Patron Tier</a>'
);
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d dark sm" href="contact.html">Enquire for Archive</a>',
  '<a class="btn btn-3d dark sm" href="404.html">Enquire for Archive</a>'
);

// Replace bottom CTA 3D button
servicesContent = servicesContent.replace(
  '<a class="btn btn-3d cta-btn" href="contact.html">Book a consultation</a>',
  '<a class="btn btn-3d cta-btn" href="404.html">Book a consultation</a>'
);
fs.writeFileSync(servicesPath, servicesContent, 'utf8');
console.log('Updated services.html 3D CTA buttons to 404.html');

// 2. blog.html
const blogPath = path.join(__dirname, '..', 'blog.html');
let blogContent = fs.readFileSync(blogPath, 'utf8');
blogContent = blogContent.replace(
  '<a class="btn btn-3d dark lg" href="#journal" data-a>Subscribe</a>',
  '<a class="btn btn-3d dark lg" href="404.html" data-a>Subscribe</a>'
);
blogContent = blogContent.replace(
  '<a class="btn dark lg btn-3d" href="#journal">Read article</a>',
  '<a class="btn dark lg btn-3d" href="404.html">Read article</a>'
);
blogContent = blogContent.replace(
  '<a class="btn light btn-3d" href="signup.html">Subscribe</a>',
  '<a class="btn light btn-3d" href="404.html">Subscribe</a>'
);
fs.writeFileSync(blogPath, blogContent, 'utf8');
console.log('Updated blog.html 3D CTA buttons to 404.html');

// 3. contact.html
const contactPath = path.join(__dirname, '..', 'contact.html');
let contactContent = fs.readFileSync(contactPath, 'utf8');
contactContent = contactContent.replace(
  '<a class="btn btn-3d light" href="signup.html">Create account</a>',
  '<a class="btn btn-3d light" href="404.html">Create account</a>'
);
fs.writeFileSync(contactPath, contactContent, 'utf8');
console.log('Updated contact.html 3D CTA buttons to 404.html');

