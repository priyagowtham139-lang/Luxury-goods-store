/**
 * Stackly — instant section restore when returning from the 404 page.
 * Runs in <head> so the destination page never paints its top before the
 * saved section is restored. mobile-nav.js removes the curtain afterwards.
 */
(function () {
  'use strict';

  try {
    if (sessionStorage.getItem('stackly_restore_requested') !== 'true') return;

    var root = document.documentElement;
    root.classList.add('stackly-restoring');

    var style = document.createElement('style');
    style.id = 'stacklyRestoreStyle';
    style.textContent =
      'html.stackly-restoring{scroll-behavior:auto!important;background:#eef8f4!important}' +
      'html.stackly-restoring body{visibility:hidden!important}';
    document.head.appendChild(style);

    // Do not let the browser apply its own scroll restoration on top of ours.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    // Failsafe: never leave the page hidden if something else fails.
    window.setTimeout(function () {
      root.classList.remove('stackly-restoring');
      if (style.parentNode) style.parentNode.removeChild(style);
    }, 5000);
  } catch (err) {}
})();
