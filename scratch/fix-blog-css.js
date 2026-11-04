const fs = require('fs');
const path = require('path');

const blogCssPath = path.join(__dirname, '..', 'css', 'blog.css');
let content = fs.readFileSync(blogCssPath, 'utf8');

const target = `@media(max-width:1000px){.fbox{flex-direction:column;height:auto}.fbox .frame{width:100%;height:240px}.arts,.pk,.mk{grid-template-columns:1fr}.bl h1{font-size:64px}.bl .ghost{font-size:110px;left:0}.bl .hero-img{width:100%;height:240px;margin-top:30px}.jbox{height:auto;padding:36px 28px}.chips{flex-wrap:wrap}.art{height:auto;padding-bottom:26px}.pk .art{height:auto}}`;

const replacement = `@media(max-width:1000px){
  .fbox{flex-direction:column;height:auto}.fbox .frame{width:100%;height:240px}.arts,.pk,.mk{grid-template-columns:1fr}.bl h1{font-size:64px}.bl .ghost{font-size:110px;left:0}.bl .hero-img{width:100%;height:240px;margin-top:30px;animation:none!important;transform:none!important}.jbox{height:auto;padding:36px 28px}.chips{flex-wrap:wrap}.art{height:auto;padding-bottom:26px}.pk .art{height:auto}
}
@media(max-width:680px){
  .hero.bl{min-height:auto!important;padding-bottom:95px!important}
  .bl .hero-in{flex-direction:column!important;gap:20px!important;padding-top:14px!important;text-align:center!important;align-items:center!important}
  .bl .hero-copy{width:100%!important;max-width:100%!important;text-align:center!important}
  .bl h1{font-size:clamp(38px,11vw,56px)!important;line-height:1.05!important;letter-spacing:-0.01em!important}
  .bl .hero-copy p{font-size:14.5px!important;max-width:380px!important;margin:12px auto 20px!important}
  .bl .hero-copy .btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:44px!important;padding:0 28px!important;font-size:13.5px!important;margin:0 auto!important;border-radius:99px!important}
  .bl .ghost{font-size:clamp(32px,11vw,64px)!important;left:0!important;right:0!important;text-align:center!important;top:15px!important;animation:none!important;transform:none!important;white-space:nowrap!important}
  .bl .hero-img{width:100%!important;max-width:290px!important;height:200px!important;margin:14px auto 0!important;border-radius:26px!important;animation:none!important;transform:none!important;position:relative!important;left:0!important;right:0!important}
  .bl .hero-img img{border-radius:24px!important;width:100%!important;height:100%!important;object-fit:cover!important}
  .bl .hero-img::after{border-radius:26px!important}
}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(blogCssPath, content, 'utf8');
  console.log('Successfully updated blog.css');
} else {
  console.error('Could not find target in blog.css');
}

