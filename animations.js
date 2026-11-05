/* =============================================================
   STACKLY — GSAP motion system (home page)
   Intro · scroll reveals · masked headings · parallax · counters
   magnetic hovers · smooth accordion · floating nav · progress
   ============================================================= */
(function () {
  'use strict';

  var doc = document;

  if (!window.gsap || !window.ScrollTrigger) {
    var p = doc.getElementById('preloader');
    if (p && p.parentNode) p.parentNode.removeChild(p);
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  var $  = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var EASE = 'power3.out';

  /* ---------------------------------------------------------
     helpers
  --------------------------------------------------------- */
  function pad(n, len) {
    var s = String(n);
    while (s.length < len) s = '0' + s;
    return s;
  }
  function seen(key) {
    try { return window.sessionStorage.getItem(key); } catch (e) { return null; }
  }
  function mark(key) {
    try { window.sessionStorage.setItem(key, '1'); } catch (e) {}
  }
  function rem(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  /* split an element into word spans (keeps <br> breaks) */
  function splitWords(el) {
    if (!el) return [];
    if (el.getAttribute('data-split') === '1') return $$('.split-word', el);
    el.setAttribute('data-split', '1');
    if (/^H[1-6]$/.test(el.tagName)) {
      el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    }

    var frag = doc.createDocumentFragment();
    Array.prototype.forEach.call(el.childNodes, function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/\s+/).forEach(function (w) {
          if (!w) return;
          var s = doc.createElement('span');
          s.className = 'split-word';
          s.textContent = w;
          frag.appendChild(s);
          frag.appendChild(doc.createTextNode(' '));
        });
      } else if (node.nodeName === 'BR') {
        frag.appendChild(doc.createElement('br'));
      } else {
        var s2 = doc.createElement('span');
        s2.className = 'split-word';
        s2.appendChild(node);
        frag.appendChild(s2);
        frag.appendChild(doc.createTextNode(' '));
      }
    });
    el.innerHTML = '';
    el.appendChild(frag);
    return $$('.split-word', el);
  }

  /* word by word fade-up */
  function revealWords(el, o) {
    if (!el) return;
    o = o || {};
    var ws = splitWords(el);
    if (!ws.length) return;
    var vars = {
      yPercent: o.y != null ? o.y : 65,
      opacity: 0,
      duration: o.duration != null ? o.duration : .95,
      ease: o.ease || 'power4.out',
      stagger: o.stagger != null ? o.stagger : .028
    };
    if (o.scroll !== false) {
      vars.scrollTrigger = { trigger: o.trigger || el, start: o.start || 'top 90%', once: true };
    }
    gsap.from(ws, vars);
  }

  /* masked heading reveal — the block rises from behind a curtain */
  var masks = [];

  function maskMetrics(pair) {
    var fs = parseFloat(window.getComputedStyle(pair.el).fontSize) || 16;
    pair.mask.style.fontSize = fs + 'px';
  }

  function maskReveal(el, o) {
    if (!el) return;
    o = o || {};
    if (!el.parentNode) return;

    var mask = doc.createElement('span');
    mask.className = 'rk-mask';
    el.parentNode.insertBefore(mask, el);
    mask.appendChild(el);

    var pair = { mask: mask, el: el };
    masks.push(pair);
    maskMetrics(pair);

    var vars = {
      yPercent: 112,
      duration: o.duration != null ? o.duration : 1.15,
      ease: o.ease || 'power4.out',
      delay: o.delay || 0
    };
    if (o.scroll !== false) {
      vars.scrollTrigger = { trigger: o.trigger || mask, start: o.start || 'top 90%', once: true };
    }
    gsap.from(el, vars);
  }

  /* AURELIA heading effect — letters rise in + neon shadow pulse */
  function glowHeading(el, o) {
    if (!el || !el.textContent.trim()) return;
    o = o || {};
    if (!window.SplitText) { maskReveal(el, o); return; }

    var split = SplitText.create(el, { type: 'chars' });
    var tlVars = {};
    if (o.scroll !== false) {
      tlVars.scrollTrigger = { trigger: el, start: o.start || 'top 90%', once: true };
    }
    var tl = gsap.timeline(tlVars);
    tl.from(split.chars, {
      y: 50, opacity: 0,
      stagger: o.stagger != null ? o.stagger : .03,
      duration: .6,
      ease: 'back.out(1.7)'
    });
    tl.fromTo(el,
      { textShadow: '0 0 0px #00FF66' },
      {
        textShadow: '0 0 30px #00FF66, 0 0 60px #00FF66',
        duration: 1, yoyo: true, repeat: 2, ease: 'sine.inOut'
      }, 0);
  }

  /* generic block reveal */
  function reveal(targets, o) {
    if (!targets || !targets.length) return;
    o = o || {};
    var vars = {
      y: o.y != null ? o.y : 38,
      opacity: 0,
      duration: o.duration != null ? o.duration : .95,
      ease: o.ease || EASE,
      stagger: o.stagger != null ? o.stagger : .09,
      delay: o.delay || 0
    };
    if (o.scale) vars.scale = o.scale;
    if (o.rotate) vars.rotate = o.rotate;
    if (o.scroll !== false) {
      vars.scrollTrigger = { trigger: o.trigger || targets[0], start: o.start || 'top 88%', once: true };
    }
    gsap.from(targets, vars);
  }

  /* rounded-rect path for the SVG frame overlays (CSS radius reduction included) */
  function roundRectPath(w, h, outer, i) {
    var ww = w - 2 * i, hh = h - 2 * i;
    var f = Math.min(1,
      ww / (outer[0] + outer[1]), hh / (outer[1] + outer[2]),
      ww / (outer[2] + outer[3]), hh / (outer[3] + outer[0]));
    var tl = Math.max(0, outer[0] * f - i);
    var tr = Math.max(0, outer[1] * f - i);
    var br = Math.max(0, outer[2] * f - i);
    var bl = Math.max(0, outer[3] * f - i);

    return 'M' + (i + tl) + ',' + i +
      'H' + (i + ww - tr) +
      'A' + tr + ',' + tr + ' 0 0 1 ' + (i + ww) + ',' + (i + tr) +
      'V' + (i + hh - br) +
      'A' + br + ',' + br + ' 0 0 1 ' + (i + ww - br) + ',' + (i + hh) +
      'H' + (i + bl) +
      'A' + bl + ',' + bl + ' 0 0 1 ' + i + ',' + (i + hh - bl) +
      'V' + (i + tl) +
      'A' + tl + ',' + tl + ' 0 0 1 ' + (i + tl) + ',' + i + 'Z';
  }

  /* arch frame — SVG dashes that follow the asymmetric radius */
  function buildArchFrame() {
    var wrap = $('.about .arch-wrap');
    if (!wrap) return;
    var svg = $('.arch-border', wrap);
    var path = svg && $('path', svg);
    if (!path) return;

    var w = wrap.offsetWidth, h = wrap.offsetHeight;
    if (!w || !h) return;

    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    path.setAttribute('d', roundRectPath(w, h, [210, 210, 40, 40], 1));
    wrap.classList.add('has-frame');
  }

  /* stats frames — dotted marching outline on each stat pill */
  function buildStatFrames() {
    $$('.about .stats > div').forEach(function (box) {
      var svg = $('.stat-border', box);
      var path = svg && $('path', svg);
      if (!path) return;

      var w = box.offsetWidth, h = box.offsetHeight;
      if (!w || !h) return;

      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      path.setAttribute('d', roundRectPath(w, h, [60, 60, 40, 60], 1));
      box.classList.add('has-frame');
    });
  }

  /* product image frames — dotted marching outline on Reordered most images */
  function buildProdFrames() {
    $$('.prods .prod-img-wrap').forEach(function (box) {
      var svg = $('.prod-img-border', box);
      var path = svg && $('path', svg);
      if (!path) return;

      var w = box.offsetWidth, h = box.offsetHeight;
      if (!w || !h) return;

      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      path.setAttribute('d', roundRectPath(w, h, [28, 28, 28, 28], 1));
      box.classList.add('has-frame');
    });
  }

  /* promise cards — dotted marching outline on each card's asymmetric radius */
  function buildPmFrames() {
    $$('#promise .pm').forEach(function (card) {
      var svg = $('.pm-border', card);
      var path = svg && $('path', svg);
      if (!path) return;

      var w = card.offsetWidth, h = card.offsetHeight;
      if (!w || !h) return;

      var radii = [48, 48, 48, 48];
      if (card.classList.contains('tl')) radii = [48, 48, 48, 24];
      else if (card.classList.contains('wt')) radii = [48, 48, 24, 48];
      else if (card.classList.contains('dk2')) radii = [48, 48, 150, 48];

      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      path.setAttribute('d', roundRectPath(w, h, radii, 1));
      card.classList.add('has-frame');
    });
  }

  function buildQ2Frame() {
    var card = $('.quotes .q2');
    if (!card) return;
    var svg = $('.q2-border', card);
    var path = svg && $('path', svg);
    if (!path) return;

    var w = card.offsetWidth, h = card.offsetHeight;
    if (!w || !h) return;

    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    path.setAttribute('d', roundRectPath(w, h, [48, 20, 48, 48], 1));
    card.classList.add('has-frame');
  }

  /* number counter that keeps leading zeros */
  function countUp(el, o) {
    if (!el) return;
    o = o || {};
    var original = el.textContent.trim();
    var digits = original.replace(/[^0-9]/g, '');
    var target = parseInt(digits, 10);
    if (!digits || isNaN(target)) return;

    var len = digits.length;
    var obj = { v: 0 };
    var vars = {
      v: target,
      duration: o.duration != null ? o.duration : 1.7,
      ease: o.ease || 'power2.out',
      delay: o.delay || 0,
      onUpdate: function () { el.textContent = pad(Math.round(obj.v), len); },
      onComplete: function () { el.textContent = original; }
    };
    if (o.trigger) {
      vars.scrollTrigger = { trigger: o.trigger, start: o.start || 'top 94%', once: true };
    }
    gsap.to(obj, vars);
  }

  /* scroll linked parallax */
  function parallax(target, o) {
    if (!target || !target.length) return;
    o = o || {};
    gsap.fromTo(target,
      { yPercent: o.from != null ? o.from : -7 },
      {
        yPercent: o.to != null ? o.to : 7,
        ease: 'none',
        scrollTrigger: {
          trigger: o.trigger || target[0].closest('section') || target[0],
          start: o.start || 'top bottom',
          end: o.end || 'bottom top',
          scrub: true
        }
      }
    );
  }

  /* magnetic hover */
  function magnetic(el, strength) {
    if (!el) return;
    var s = strength || .3;
    var xTo = gsap.quickTo(el, 'x', { duration: .55, ease: 'power3' });
    var yTo = gsap.quickTo(el, 'y', { duration: .55, ease: 'power3' });
    el.addEventListener('mouseenter', function () {
      gsap.to(el, { scale: 1.06, duration: .35, ease: 'power2.out', overwrite: 'auto' });
    });
    el.addEventListener('mouseleave', function () {
      gsap.to(el, { scale: 1, x: 0, y: 0, duration: .55, ease: 'power2.out', overwrite: 'auto' });
    });
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * s);
      yTo((e.clientY - (r.top + r.height / 2)) * s);
    });
  }

  /* ---------------------------------------------------------
     0 · logo pinball (disabled)
  --------------------------------------------------------- */
  var pre = $('#preloader');
  var boot = null;

  if (pre) {
    if (REDUCED || seen('stacklyIntro')) {
      rem(pre);
    } else {
      mark('stacklyIntro');
      var n = { v: 0 };
      boot = gsap.timeline();
      boot
        .from('.pl-logo', { y: 26, autoAlpha: 0, scale: .9, duration: .85, ease: 'power3.out' })
        .to('.pl-bar i', { scaleX: 1, duration: .95, ease: 'power2.inOut' }, .08)
        .to(n, {
          v: 100, duration: .95, ease: 'power2.inOut',
          onUpdate: function () { var c = $('.pl-count'); if (c) c.textContent = Math.round(n.v); }
        }, .08)
        .to('.pl-in', { y: -22, autoAlpha: 0, duration: .45, ease: 'power2.in' }, .95)
        .to(pre, { clipPath: 'inset(0% 0% 100% 0%)', duration: .8, ease: 'power4.inOut' }, 1)
        .add(function () { rem(pre); });
    }
  }

  /* ---------------------------------------------------------
     2d · hero ring animation
  --------------------------------------------------------- */
  if (!REDUCED && $('.hero-art .ring')) {
    gsap.to('.hero-art .ring', { rotation: 360, duration: 40, ease: 'none', repeat: -1 });
  }
  if (!REDUCED && $('.hero .wm')) {
    gsap.set('.hero .wm', { xPercent: -12, opacity: 0.55 });
    gsap.to('.hero .wm', {
      xPercent: 12,
      duration: 14,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
  if (!REDUCED && $('.season')) {
    gsap.from('.season', {
      y: -200, opacity: 0,
      duration: 1, ease: 'bounce.out'
    });
  }
  var heroTitle = $('.hero-txt h1');
  var heroReveal = null;

  if (heroTitle && !REDUCED && window.SplitText) {
    gsap.registerPlugin(SplitText);
    heroReveal = function () {
      var split = SplitText.create(heroTitle, { type: 'chars' });
      gsap.from(split.chars, {
        y: 50, opacity: 0,
        stagger: .03, duration: .6,
        ease: 'back.out(1.7)'
      });
      gsap.fromTo(heroTitle,
        { textShadow: '0 0 0px #00FF66' },
        {
          textShadow: '0 0 30px #00FF66, 0 0 60px #00FF66',
          duration: 1, yoyo: true, repeat: 2, ease: 'sine.inOut'
        }
      );
    };
  }

  if (heroReveal) {
    if (boot) boot.add(heroReveal);
    else heroReveal();
  }

  /* ---------------------------------------------------------
     2e · typewriter paragraphs
  --------------------------------------------------------- */
  function initTypewriters() {
    var targets = $$('p').filter(function (p) {
      if (p.classList.contains('sub') || p.classList.contains('err')) return false;
      if (p.closest('.qa')) return false;
      var kids = p.children;
      for (var i = 0; i < kids.length; i++) {
        if (kids[i].tagName !== 'BR') return false;
      }
      return p.textContent.trim().length > 0;
    });

    var io = window.IntersectionObserver
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            io.unobserve(en.target);
            if (en.target.__type) en.target.__type();
          });
        }, { rootMargin: '0px 0px -6% 0px' })
      : null;

    targets.forEach(function (p) {
      var text = p.innerHTML
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .split('\n')
        .map(function (s) { return s.replace(/\s+/g, ' ').trim(); })
        .filter(function (s) { return s.length; })
        .join('\n')
        .trim();
      if (!text) return;

      var lines = text.split('\n');
      p.innerHTML = '';
      var holders = lines.map(function (line, i) {
        if (i) p.appendChild(doc.createElement('br'));
        var h = doc.createElement('span');
        h.className = 'tw-text';
        p.appendChild(h);
        return h;
      });
      var caret = doc.createElement('span');
      caret.className = 'typewriter-cursor';
      caret.setAttribute('aria-hidden', 'true');
      caret.textContent = '|';
      p.appendChild(caret);

      p.__type = function () {
        var tl = gsap.timeline();
        holders.forEach(function (h, i) {
          tl.to(h, {
            text: { value: lines[i], delimiter: '' },
            duration: Math.min(4, Math.max(.6, lines[i].length * .035)),
            ease: 'none'
          }, i === 0 ? 0 : '>');
        });
      };

      if (io) io.observe(p);
      else p.__type();
    });
  }

  if (!REDUCED && window.TextPlugin) {
    gsap.registerPlugin(TextPlugin);
    if (boot) boot.add(initTypewriters);
    else initTypewriters();
  }

  /* ---------------------------------------------------------
     3 · global chrome (progress, floating nav, back to top)
  --------------------------------------------------------- */
  gsap.to('.scroll-progress i', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: doc.body, start: 'top top', end: 'bottom bottom', scrub: .25 }
  });

  function setActiveNav(i) {
    $$('.nav ul li').forEach(function (li, idx) { li.classList.toggle('on', idx === i); });
    $$('.mini-nav ul li').forEach(function (li, idx) { li.classList.toggle('on', idx === i); });
  }

  setActiveNav(0);

  var toTop = $('#toTop');
  if (toTop) {
    gsap.set(toTop, { autoAlpha: 0, y: 20 });
    ScrollTrigger.create({
      trigger: doc.body, start: 'top -700', end: 'max',
      onEnter: function () { gsap.to(toTop, { autoAlpha: 1, y: 0, duration: REDUCED ? 0 : .45, ease: 'power3.out' }); },
      onLeaveBack: function () { gsap.to(toTop, { autoAlpha: 0, y: 20, duration: REDUCED ? 0 : .4, ease: 'power2.in' }); }
    });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     4 · scroll reveals, per section
  --------------------------------------------------------- */
  var archWrap = $('.about .arch-wrap');
  if (archWrap) {
    buildArchFrame();
    if (window.ResizeObserver) new ResizeObserver(buildArchFrame).observe(archWrap);
    else window.addEventListener('resize', buildArchFrame);
  }
  buildStatFrames();

  var promCards = $('#promise .prom');
  if (promCards) {
    buildPmFrames();
    if (window.ResizeObserver) new ResizeObserver(buildPmFrames).observe(promCards);
    else window.addEventListener('resize', buildPmFrames);
  }

  var quotes = $('.quotes');
  if (quotes) {
    var quoteTrack = $('.quotes-track', quotes);
    var quoteSet = $('.quotes-set', quoteTrack);
    if (quoteTrack && quoteSet && !$('.quotes-set[aria-hidden="true"]', quoteTrack)) {
      var quoteClone = quoteSet.cloneNode(true);
      quoteClone.setAttribute('aria-hidden', 'true');
      quoteTrack.appendChild(quoteClone);
    }
    buildQ2Frame();
    if (window.ResizeObserver) new ResizeObserver(buildQ2Frame).observe(quotes);
    else window.addEventListener('resize', buildQ2Frame);
  }

  var prodGrid = $('.prods');
  if (prodGrid) {
    buildProdFrames();
    if (window.ResizeObserver) new ResizeObserver(buildProdFrames).observe(prodGrid);
    else window.addEventListener('resize', buildProdFrames);
  }

  if (!REDUCED) {
    if (window.SplitText) gsap.registerPlugin(SplitText);

    /* — services / bento — */
    glowHeading($('#services h2'));
    revealWords($('#services .sub'));
    reveal($$('#services .cat'), { y: 60, scale: .95, stagger: .09, duration: 1.05 });
    gsap.fromTo('#services .cat img',
      { scale: 1.22, clipPath: 'inset(0% 0% 100% 0%)' },
      {
        scale: 1, clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4, ease: 'power4.out', stagger: .11,
        scrollTrigger: { trigger: '.bento', start: 'top 82%', once: true },
        clearProps: 'clipPath'
      }
    );
    parallax($$('#services .cat img'), { from: -9, to: 9, trigger: '.bento' });
    $$('#services .cat i').forEach(function (el) { countUp(el, { trigger: '.bento' }); });
    gsap.from('#services .cat i', {
      scale: 0, rotate: -35, duration: .85, ease: 'back.out(2.4)', stagger: .09,
      scrollTrigger: { trigger: '.bento', start: 'top 82%', once: true }
    });
    $$('#services .cat').forEach(function (card) {
      var img = $('img', card);
      if (!img) return;
      card.addEventListener('mouseenter', function () {
        gsap.to(img, { scale: 1.09, duration: 1, ease: 'power3.out', overwrite: 'auto' });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(img, { scale: 1, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
      });
    });

    /* — autumn run — */
    glowHeading($('#runs h2'));
    revealWords($('#runs .sub'));
    reveal($$('#runs .run'), { y: 60, scale: .95, stagger: .1, duration: 1.05 });
    $$('#runs .run b').forEach(function (el) { countUp(el, { trigger: '#runs .runs' }); });
    gsap.to('.gold img', { y: -12, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.gold img', { rotation: 360, duration: 26, ease: 'none', repeat: -1 });

    /* — about — */
    glowHeading($('.about h2'));
    revealWords($('.about .sub'));
    reveal($('.about .arch-wrap'), { y: 50, scale: 1.06, duration: 1.3, ease: 'power3.out' });
    parallax($('.about .arch-wrap'), { from: -8, to: 8, trigger: '.about' });
    reveal($$('.stats div'), { y: 36, stagger: .1 });
    $$('.stats b').forEach(function (el) { countUp(el, { trigger: '.stats' }); });

    /* — reordered + how — */
    glowHeading($('.sec2 h2'));
    revealWords($('.sec2 .wrap > .sub'));
    reveal($$('.prods .prod'), { y: 80, scale: .92, stagger: .15, duration: 1.15, ease: 'back.out(1.8)' });
    gsap.fromTo('.prods .prod img',
      { scale: 1.2, clipPath: 'inset(0% 0% 100% 0%)' },
      {
        scale: 1, clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4, ease: 'power4.out', stagger: .11,
        scrollTrigger: { trigger: '.prods', start: 'top 84%', once: true },
        clearProps: 'clipPath'
      }
    );
    parallax($$('.prods .prod img'), { from: -8, to: 8, trigger: '.prods' });
    $$('.prods .prod').forEach(function (card) {
      var img = $('img', card);
      if (!img) return;
      card.addEventListener('mouseenter', function () {
        gsap.to(img, { scale: 1.07, duration: .9, ease: 'power3.out', overwrite: 'auto' });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(img, { scale: 1, duration: 1.1, ease: 'power3.out', overwrite: 'auto' });
      });
    });

    glowHeading($('.how h2'));
    revealWords($('.how .sub'));
    reveal($$('.how ol li'), { y: 50, scale: .9, stagger: .14, duration: 1, ease: 'back.out(1.6)' });
    gsap.from('.how ol li i', {
      scale: 0, rotate: -35, duration: .85, ease: 'back.out(2.4)', stagger: .14,
      scrollTrigger: { trigger: '.how-steps', start: 'top 84%', once: true }
    });
    $$('.how i').forEach(function (el) { countUp(el, { trigger: '.how' }); });

    /* — promises — */
    glowHeading($('#promise h2'));
    revealWords($('#promise .sub'));
    reveal($$('.prom .pm'), { y: 60, scale: .95, stagger: .12, duration: 1.05 });
    $$('.prom .pm b').forEach(function (el) { countUp(el, { trigger: '.prom' }); });

    /* — journal / testimonials — */
    glowHeading($('#journal h2'));
    revealWords($('#journal .sub'));
    reveal($$('.quotes-set:not([aria-hidden="true"]) blockquote'), { y: 60, scale: .96, stagger: .14, duration: 1.05 });
    gsap.from('.q1 .quote-mark', {
      scale: .3, autoAlpha: 0, duration: 1.1, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.quotes', start: 'top 82%', once: true }
    });
    reveal($('.care'), { y: 50, duration: 1.05 });
    reveal($('.news'), { y: 50, duration: 1.05 });
    glowHeading($('.news h2'));
    parallax($('.care img'), { from: -8, to: 8, trigger: '.care' });

    /* — faq — */
    glowHeading($('.faq h2'));
    revealWords($('.faq .sub'));
    reveal($('.visit'), { y: 46, duration: 1 });
    reveal($$('.qa details'), { y: 34, stagger: .08, duration: .8 });

    /* — card + footer headings — */
    $$('h3:not(.sub), h5').forEach(function (el) {
      glowHeading(el, { stagger: .025, start: 'top 92%' });
    });

    /* — footer — */
    reveal($$('.fgrid > div'), { y: 40, stagger: .09, duration: .9 });
  }

  /* ---------------------------------------------------------
     5 · micro interactions
  --------------------------------------------------------- */
  $$('.gold .blob, .visit .blob, .add').forEach(function (btn) {
    magnetic(btn, .2);
  });
  $$('.qa details').forEach(function (d) {
    var summary = $('summary', d);
    var body = $('p', d);
    if (!summary || !body) return;

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.open) {
        gsap.to(body, {
          height: 0, opacity: 0, y: -10, duration: .32, ease: 'power2.inOut',
          onComplete: function () { d.open = false; gsap.set(body, { clearProps: 'height,opacity,transform' }); }
        });
      } else {
        d.open = true;
        gsap.fromTo(body,
          { height: 0, opacity: 0, y: -10 },
          {
            height: 'auto', opacity: 1, y: 0, duration: .55, ease: 'power3.out',
            onComplete: function () { gsap.set(body, { clearProps: 'height,opacity,transform' }); }
          }
        );
      }
    });
  });

  /* ---------------------------------------------------------
     6 · kickoff
  --------------------------------------------------------- */
  /* safety net: never let the curtain trap the page */
  window.setTimeout(function () { rem($('#preloader')); }, 6000);

  /* layout can shift once fonts + images land */
  window.addEventListener('load', function () {
    masks.forEach(maskMetrics);
    ScrollTrigger.refresh();
    buildArchFrame();
    buildStatFrames();
    buildProdFrames();
    buildPmFrames();
    buildQ2Frame();
  });
  if (doc.fonts && doc.fonts.ready) {
    doc.fonts.ready.then(function () {
      masks.forEach(maskMetrics);
      ScrollTrigger.refresh();
      buildArchFrame();
      buildStatFrames();
      buildProdFrames();
      buildPmFrames();
      buildQ2Frame();
    });
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      masks.forEach(maskMetrics);
      ScrollTrigger.refresh();
    }, 200);
  });
})();
