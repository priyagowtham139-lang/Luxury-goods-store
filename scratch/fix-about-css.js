const fs = require('fs');
const path = require('path');

const aboutCssPath = path.join(__dirname, '..', 'css', 'about.css');
let content = fs.readFileSync(aboutCssPath, 'utf8');

// Replace the @media(max-width:600px) in about.css with complete hero responsive styling
const old600 = `@media(max-width:600px){.pills{grid-template-columns:1fr}.ab h1{font-size:44px}.ab .hero-img{height:240px}.team .frame,.mat .frame{height:240px}.pill{height:80px}.pill b{font-size:30px}}`;

const new600 = `@media(max-width:1000px){.ab .hero-img{animation:none!important;transform:none!important}}
@media(max-width:680px){
  .hero.ab{min-height:auto!important;padding-bottom:95px!important}
  .ab .hero-in{flex-direction:column!important;gap:20px!important;padding-top:14px!important;text-align:center!important;align-items:center!important}
  .ab .hero-copy{width:100%!important;max-width:100%!important;text-align:center!important}
  .ab h1{font-size:clamp(36px,11vw,54px)!important;line-height:1.05!important;letter-spacing:-0.01em!important}
  .ab .hero-copy p{font-size:14.5px!important;max-width:380px!important;margin:12px auto 20px!important}
  .ab .ghost{font-size:clamp(32px,11vw,64px)!important;left:0!important;right:0!important;text-align:center!important;top:15px!important;animation:none!important;transform:none!important;white-space:nowrap!important}
  .ab .row{display:flex!important;justify-content:center!important;align-items:center!important;gap:10px!important;width:100%!important;max-width:320px!important;margin:0 auto!important;flex-wrap:wrap!important}
  .ab .row .btn{flex:1 1 130px!important;height:44px!important;font-size:13px!important;padding:0 14px!important;justify-content:center!important;border-radius:99px!important}
  .ab .hero-img{width:100%!important;max-width:290px!important;height:200px!important;margin:14px auto 0!important;border-radius:26px!important;right:0!important;left:0!important;animation:none!important;transform:none!important;position:relative!important}
  .ab .hero-img img{border-radius:24px!important;width:100%!important;height:100%!important;object-fit:cover!important}
  .ab .hero-img::after{border-radius:24px!important;inset:4px!important}
}
@media(max-width:600px){.pills{grid-template-columns:1fr}.team .frame,.mat .frame{height:240px}.pill{height:80px}.pill b{font-size:30px}}`;

if (content.includes(old600)) {
  content = content.replace(old600, new600);
  fs.writeFileSync(aboutCssPath, content, 'utf8');
  console.log('Successfully updated about.css');
} else {
  console.error('Could not find old600 in about.css');
}

