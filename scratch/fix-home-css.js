const fs = require('fs');
const path = require('path');

const homeCssPath = path.join(__dirname, '..', 'css', 'home.css');
let content = fs.readFileSync(homeCssPath, 'utf8');

// Replace the 680px hero rules with clean responsive rules
const oldBlock = `  .hero-txt{width:100%!important;padding-top:10px}
  .hero-txt h1{font-size:clamp(48px,14vw,72px)!important}
  .hero-art{width:100%!important;max-width:310px!important;height:360px!important;left:0!important;margin:20px auto 0!important;position:relative}
  .hero-art .ring{width:320px!important;height:320px!important;left:-10px!important;top:20px!important}
  .hero-art img{left:50%!important;transform:translateX(-50%)!important;top:30px!important;width:230px!important;max-width:80%!important}
  .b96{right:0!important;top:10px!important;transform:scale(0.85)}
  .b42{left:10px!important;top:auto!important;bottom:20px!important;transform:scale(0.85)}
  .chips{flex-wrap:wrap!important}
  .btns{flex-wrap:wrap;gap:12px}
  .btns .blob{width:auto!important;height:auto!important;padding:16px 28px!important;border-radius:99px!important}`;

const newBlock = `  .hero{min-height:auto!important;padding-bottom:95px!important}
  .hero-txt{width:100%!important;padding-top:0!important;text-align:center!important}
  .season{font-size:clamp(20px,6vw,28px)!important;transform:rotate(-2deg)!important;display:inline-block!important;margin-bottom:6px!important;max-width:100%!important}
  .hero-txt h1{font-size:clamp(38px,12vw,64px)!important;letter-spacing:-0.01em!important;margin:4px 0 12px!important;word-break:break-word!important}
  .chips{justify-content:center!important;flex-wrap:wrap!important;gap:8px!important;margin:12px 0 16px!important}
  .lede{font-size:14px!important;max-width:380px!important;margin:0 auto!important;text-align:center!important}
  .btns{justify-content:center!important;gap:12px!important;margin:20px auto 0!important;max-width:300px!important;width:100%!important}
  .btns .blob{flex:1 1 120px!important;width:auto!important;height:46px!important;min-height:46px!important;padding:0 16px!important;font-size:14px!important;border-radius:99px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}
  .hero-art{width:100%!important;max-width:270px!important;height:270px!important;left:0!important;right:0!important;margin:16px auto 0!important;position:relative!important}
  .hero-art .ring{width:220px!important;height:220px!important;max-width:92%!important;max-height:92%!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important}
  .hero-art img{left:auto!important;right:auto!important;margin:10px auto 0!important;top:auto!important;transform:none!important;width:185px!important;max-width:72%!important;position:relative!important;display:block!important}
  .b96{right:0!important;top:4px!important;left:auto!important;width:76px!important;height:66px!important;padding-top:8px!important;border-radius:26px 26px 12px 26px!important;transform:none!important;box-sizing:border-box!important}
  .b96 b{font-size:24px!important}
  .b96 small{font-size:10px!important}
  .b42{left:0!important;bottom:6px!important;top:auto!important;right:auto!important;width:64px!important;height:64px!important;padding-top:10px!important;border-radius:50%!important;transform:none!important;box-sizing:border-box!important}
  .b42 b{font-size:20px!important}
  .b42 small{font-size:10px!important}
  .scroll-cue{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;margin:18px auto 0!important;justify-content:center!important}`;

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync(homeCssPath, content, 'utf8');
  console.log('Successfully updated home.css');
} else {
  console.error('Could not find oldBlock in home.css');
}

