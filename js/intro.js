(function () {
  'use strict';

  var doc = document;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Keep the intro brisk: it plays on every load, so it must never feel like
  // the site is still loading. ~0.8s hold + ~0.55s exit.
  var DURATION = 800;
  var EXIT = 550;

  var marquee = '' +
    '<span>Leather goods</span>' +
    '<span>Fine watches</span>' +
    '<span>Jewellery</span>' +
    '<span>Made in Florence</span>' +
    '<span>Since 2012</span>' +
    '<span>Made slowly</span>';

  function build(screen) {
    screen.innerHTML =
      '<span class="intro-orb a" aria-hidden="true"></span>' +
      '<span class="intro-orb b" aria-hidden="true"></span>' +
      '<div class="intro-stage">' +
        '<span class="intro-eyebrow">Florence &mdash; Est. 2012</span>' +
        '<div class="intro-logo"><img src="assets/stackly-logo-recoloured.webp" alt="Stackly"></div>' +
        '<span class="intro-rule"></span>' +
        '<p class="intro-tagline">Luxury goods, made slowly.</p>' +
      '</div>' +
      '<div class="intro-marquee" aria-hidden="true"><div class="intro-marquee-track">' +
        marquee + marquee +
      '</div></div>' +
      '<div class="intro-progress">' +
        '<span class="intro-count">00</span>' +
        '<span class="intro-track"><i></i></span>' +
        '<span>100</span>' +
      '</div>' +
      '<button class="intro-skip" type="button">Skip intro</button>';
  }

  function boot() {
    var screen = doc.getElementById('introScreen');
    if (!screen) return;

    var is404 = window.location.pathname.toLowerCase().indexOf('404') !== -1;
    var skipRequested = /[?&]skipIntro=1(?:&|$)/.test(window.location.search);
    var restoreRequested = false;
    try {
      restoreRequested = sessionStorage.getItem('stackly_restore_requested') === 'true';
    } catch (e) {}

    // If the page took so long that the CSS failsafe already hid the empty
    // overlay, skip the intro instead of popping it up late.
    var late = !!(window.performance && performance.now && performance.now() > 1800);

    // Avoid the loading/scrolling blocker on 404 or when returning from 404.
    // The intro replays on every normal page load (home and all sub-pages).
    if (reduced || is404 || skipRequested || restoreRequested || late) {
      if (screen.parentNode) screen.parentNode.removeChild(screen);
      doc.documentElement.classList.remove('intro-pending');
      doc.body.classList.remove('intro-active');
      return;
    }

    build(screen);
    screen.classList.add('is-live');

    var count = screen.querySelector('.intro-count');
    var finished = false;
    var raf = 0;
    var safety = 0;
    var exitTimer = 0;

    // Never lock document scroll. The overlay already covers the viewport,
    // and a locked body is what made the rest of the site look frozen.
    doc.documentElement.classList.remove('intro-pending');
    doc.body.classList.remove('intro-active');

    function remove() {
      doc.documentElement.classList.remove('intro-pending');
      doc.body.classList.remove('intro-active');
      if (screen && screen.parentNode) screen.parentNode.removeChild(screen);
    }

    function dismiss(immediate) {
      if (finished) return;
      finished = true;
      if (raf) window.cancelAnimationFrame(raf);
      if (safety) window.clearTimeout(safety);
      if (exitTimer) window.clearTimeout(exitTimer);

      if (immediate) {
        remove();
        return;
      }

      screen.classList.add('is-leaving');
      window.setTimeout(remove, EXIT);
    }

    // Any deliberate interaction dismisses the intro instantly.
    screen.addEventListener('click', function () { dismiss(false); });
    screen.addEventListener('wheel', function () { dismiss(true); }, { passive: true });
    screen.addEventListener('touchmove', function () { dismiss(true); }, { passive: true });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        dismiss(true);
      }
    }, { once: true });

    var start = 0;
    function frame(now) {
      if (!start) start = now;
      var p = Math.min(1, (now - start) / DURATION);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = Math.round(eased * 100);

      if (count) count.textContent = value < 10 ? '0' + value : String(value);

      if (p < 1) {
        raf = window.requestAnimationFrame(frame);
      }
    }

    raf = window.requestAnimationFrame(frame);
    exitTimer = window.setTimeout(function () { dismiss(false); }, DURATION);
    safety = window.setTimeout(function () { dismiss(true); }, 4000);
  }

  if (doc.readyState === 'loading') {
    if (doc.getElementById('introScreen')) boot();
    else doc.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
