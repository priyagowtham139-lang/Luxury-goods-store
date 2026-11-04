const fs = require('fs');
const path = require('path');

const servicesCssPath = path.join(__dirname, '..', 'css', 'services.css');
let content = fs.readFileSync(servicesCssPath, 'utf8');

const target = `@media(max-width:1000px){.wrap{padding:0 24px}.nav ul{display:none}.hero-in,.split,.fq{flex-direction:column;display:flex}.hero h1,h2,.copy h2,.offer h2,.how h2,.plans h2,.recent h2,.faq h2{font-size:46px}.hero-img,.private .frame,.repair .frame{width:100%;height:300px}.cards,.pl,.gal,.steps,.fg{grid-template-columns:1fr}.ghost{font-size:100px;left:0}.cta{margin-top:20px}.steps:before{display:none}.card{height:auto;min-height:260px}.plan{height:auto;gap:12px}}`;

const replacement = `@media(max-width:1000px){
  .wrap{padding:0 24px}.nav ul{display:none}.hero-in,.split,.fq{flex-direction:column;display:flex}.hero h1,h2,.copy h2,.offer h2,.how h2,.plans h2,.recent h2,.faq h2{font-size:46px}.hero-img,.private .frame,.repair .frame{width:100%;height:300px}.cards,.pl,.gal,.steps,.fg{grid-template-columns:1fr}.ghost{font-size:100px;left:0}.cta{margin-top:20px}.steps:before{display:none}.card{height:auto;min-height:260px}.plan{height:auto;gap:12px}
}
@media(max-width:680px){
  .hero{min-height:auto!important;padding-bottom:95px!important}
  .hero-in{flex-direction:column!important;gap:20px!important;padding-top:14px!important;text-align:center!important;align-items:center!important}
  .hero-copy{width:100%!important;max-width:100%!important;text-align:center!important}
  .hero h1{font-size:clamp(38px,11vw,56px)!important;line-height:1.05!important;letter-spacing:-0.01em!important}
  .hero-copy p{font-size:14.5px!important;max-width:380px!important;margin:12px auto 20px!important}
  .ghost{font-size:clamp(32px,11vw,64px)!important;left:0!important;right:0!important;text-align:center!important;top:15px!important;animation:none!important;transform:none!important;white-space:nowrap!important}
  .row{display:flex!important;justify-content:center!important;align-items:center!important;gap:10px!important;width:100%!important;max-width:320px!important;margin:0 auto!important;flex-wrap:wrap!important}
  .row .btn{flex:1 1 130px!important;height:44px!important;font-size:13px!important;padding:0 14px!important;justify-content:center!important;border-radius:99px!important}
  .hero-img{width:100%!important;max-width:290px!important;height:200px!important;margin:14px auto 0!important;position:relative!important}
  .hero-img img{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;margin:0 auto!important}
}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(servicesCssPath, content, 'utf8');
  console.log('Successfully updated services.css');
} else {
  console.error('Could not find target in services.css');
}

