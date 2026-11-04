/**
 * Stackly — Dashboard mobile header / off-canvas sidebar.
 * Shared by the collector and admin dashboard sub-pages so their mobile
 * header and menu behave exactly like the overview pages.
 */
(function () {
  'use strict';

  var toggle = document.querySelector('.dash-menu-toggle');
  var sidebar = document.getElementById('dashSidebar');
  var backdrop = document.getElementById('dashNavBackdrop');
  var closeBtn = document.querySelector('.dash-sidebar-close');
  if (!toggle || !sidebar || !backdrop) return;

  function openMenu() {
    sidebar.classList.add('is-open');
    backdrop.classList.add('is-open');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('dash-menu-open');
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    if (!sidebar.classList.contains('is-open')) return;
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('dash-menu-open');
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeMenu();
      toggle.focus();
    });
  }

  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1080) closeMenu();
  });
})();
