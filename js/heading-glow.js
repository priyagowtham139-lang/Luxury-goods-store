(function(){
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || !window.gsap || !window.SplitText) return;

  gsap.registerPlugin(SplitText);
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  function animate(el){
    if(el.hasAttribute('data-heading-glow')) return;
    if(!el.textContent.trim() || !el.getClientRects().length) return;
    if(el.closest('#introScreen, .mini-nav, nav, .nav')) return;

    var chars = el.getAttribute('data-split') === 'chars' ? el.querySelectorAll('.c') : null;

    try {
      if(!chars || !chars.length){
        chars = SplitText.create(el, { type: 'chars' }).chars;
      }

      el.setAttribute('data-heading-glow', '');

      var step = { y: 0, opacity: 1, rotation: 0, stagger: .03, duration: .6, ease: 'back.out(1.7)' };
      var glow = { textShadow: '0 0 30px #00FF66, 0 0 60px #00FF66', duration: 1, yoyo: true, repeat: 2, ease: 'sine.inOut' };

      if(window.ScrollTrigger){
        var trigger = { trigger: el, start: 'top 90%', once: true };
        step.scrollTrigger = trigger;
        glow.scrollTrigger = { trigger: el, start: 'top 90%', once: true };
      }

      gsap.fromTo(chars, { y: 50, opacity: 0, rotation: 0 }, step);
      gsap.fromTo(el, { textShadow: '0 0 0px #00FF66' }, glow);
    } catch(e){}
  }

  function run(){
    document.querySelectorAll('h1,h2,h3,h4,h5').forEach(animate);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  }else{
    run();
  }
})();