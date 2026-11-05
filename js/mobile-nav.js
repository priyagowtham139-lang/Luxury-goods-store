/**
 * Stackly — Universal Mobile Navigation, Eye Toggle & 404 Fallback
 * Provides hamburger menu with close button, active page highlighting,
 * cross-browser password visibility toggle, and seamless 404 section fallback.
 */
(function () {
  'use strict';

  // 1. Get or Create Mobile Drawer Elements
  function setupMobileDrawer() {
    var existingDrawer = document.getElementById('mobileDrawer');
    var existingBackdrop = document.getElementById('mobileNavBackdrop');

    if (!existingDrawer) {
      var backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      backdrop.id = 'mobileNavBackdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);

      var drawer = document.createElement('aside');
      drawer.className = 'mobile-nav-drawer';
      drawer.id = 'mobileDrawer';
      drawer.setAttribute('aria-label', 'Mobile Navigation');
      drawer.setAttribute('aria-hidden', 'true');

      drawer.innerHTML =
        '<div class="drawer-header">' +
          '<a href="index.html" class="drawer-logo">' +
            '<img src="assets/stackly-logo-recoloured.webp" alt="Stackly">' +
          '</a>' +
          '<button class="drawer-close-btn" id="drawerCloseBtn" type="button" aria-label="Close navigation menu">' +
            '<i class="fa-solid fa-xmark"></i>' +
          '</button>' +
        '</div>' +
        '<div class="drawer-body">' +
          '<div class="drawer-section-label">Atelier Navigation</div>' +
          '<ul class="drawer-links">' +
            '<li><a href="index.html" data-page="index.html"><i class="fa-solid fa-house"></i><span>Home</span></a></li>' +
            '<li><a href="about.html" data-page="about.html"><i class="fa-solid fa-circle-info"></i><span>About</span></a></li>' +
            '<li><a href="services.html" data-page="services.html"><i class="fa-solid fa-gem"></i><span>Services</span></a></li>' +
            '<li><a href="blog.html" data-page="blog.html"><i class="fa-solid fa-newspaper"></i><span>Journal</span></a></li>' +
            '<li><a href="contact.html" data-page="contact.html"><i class="fa-solid fa-envelope"></i><span>Contact</span></a></li>' +
            '<li><a href="cart.html" data-page="cart.html"><i class="fa-solid fa-bag-shopping"></i><span>Cart</span></a></li>' +
          '</ul>' +
          '<div class="drawer-section-label">Client & Atelier Portals</div>' +
          '<ul class="drawer-links drawer-portal-links">' +
            '<li><a href="signin.html" data-page="signin.html"><i class="fa-solid fa-arrow-right-to-bracket"></i><span>Sign In</span></a></li>' +
            '<li><a href="signup.html" data-page="signup.html"><i class="fa-solid fa-user-plus"></i><span>Sign Up</span></a></li>' +
            '<li><a href="user-dashboard.html" data-page="user-dashboard.html"><i class="fa-solid fa-user"></i><span>User Dashboard</span></a></li>' +
            '<li><a href="admin-dashboard.html" data-page="admin-dashboard.html"><i class="fa-solid fa-shield-halved"></i><span>Admin Dashboard</span></a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="drawer-footer">' +
          '<div class="drawer-footer-badge">' +
            '<i class="fa-solid fa-compass"></i>' +
            '<div>' +
              '<strong>Salem Atelier & Workshop</strong>' +
              '<span>MMR Complex, Periyakollappatty, Salem</span>' +
            '</div>' +
          '</div>' +
          '<p class="drawer-copyright">&copy; 2026 Stackly. Handcrafted slowly.</p>' +
        '</div>';

      document.body.appendChild(drawer);
    }

    // Ensure Hamburger Button exists in the navigation header on the right side
    var nav = document.querySelector('header nav.nav') || document.querySelector('.nav') || document.querySelector('nav');
    if (nav) {
      var existingBtn = nav.querySelector('.hamburger-btn');
      if (!existingBtn) {
        var btn = document.createElement('button');
        btn.className = 'hamburger-btn';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle mobile navigation menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'mobileDrawer');
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';

        // Insert at the right side of nav
        var authOrRight = nav.querySelector('.auth') || nav.querySelector('.nav-actions');
        if (authOrRight) {
          authOrRight.parentNode.insertBefore(btn, authOrRight.nextSibling);
        } else {
          nav.appendChild(btn);
        }
      }
    }
  }

  // 2. Highlight Active Page & Handle Clicks in Hamburger Menu
  function highlightActiveDrawerLink() {
    var path = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    if (!path || path === '/') path = 'index.html';

    var links = document.querySelectorAll('.drawer-links a');
    var matched = false;

    links.forEach(function (link) {
      var href = (link.getAttribute('href') || '').split(/[?#]/)[0].toLowerCase();
      var dataPage = (link.getAttribute('data-page') || '').toLowerCase();
      var li = link.closest('li');

      if (href === path || dataPage === path) {
        link.classList.add('on');
        link.classList.add('active');
        if (li) {
          li.classList.add('on');
          li.classList.add('active');
        }
        matched = true;
      } else {
        link.classList.remove('on');
        link.classList.remove('active');
        if (li) {
          li.classList.remove('on');
          li.classList.remove('active');
        }
      }

      // Requirement: When we click any pages in hamburger that page should get highlighting in hamburger menu page
      link.addEventListener('click', function () {
        links.forEach(function (l) {
          l.classList.remove('on');
          l.classList.remove('active');
          var pLi = l.closest('li');
          if (pLi) {
            pLi.classList.remove('on');
            pLi.classList.remove('active');
          }
        });
        link.classList.add('on');
        link.classList.add('active');
        var curLi = link.closest('li');
        if (curLi) {
          curLi.classList.add('on');
          curLi.classList.add('active');
        }
      });
    });

    if (!matched && (path === '' || path === 'index.html')) {
      var homeLink = document.querySelector('.drawer-links a[data-page="index.html"]');
      if (homeLink) {
        homeLink.classList.add('on');
        homeLink.classList.add('active');
      }
    }
  }

  // 3. Open & Close Drawer Controller
  function setupDrawerEvents() {
    var drawer = document.getElementById('mobileDrawer');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var closeBtn = document.getElementById('drawerCloseBtn');

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      if (backdrop) {
        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
      }
      document.body.classList.add('menu-open');
      document.querySelectorAll('.hamburger-btn').forEach(function (btn) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      });
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      if (backdrop) {
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.remove('menu-open');
      document.querySelectorAll('.hamburger-btn').forEach(function (btn) {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    }

    document.addEventListener('click', function (e) {
      var target = e.target;
      var hambBtn = target.closest('.hamburger-btn');
      if (hambBtn) {
        e.preventDefault();
        if (drawer && drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
        return;
      }

      var closeTrigger = target.closest('#drawerCloseBtn, .drawer-close-btn');
      if (closeTrigger) {
        e.preventDefault();
        closeDrawer();
        return;
      }

      if (target.id === 'mobileNavBackdrop' || target.classList.contains('mobile-nav-backdrop')) {
        closeDrawer();
        return;
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // 4. Cross-browser Password Eye Toggle with Dual-eye Suppression
  function setupEyeToggle() {
    document.querySelectorAll('.eye-toggle-btn').forEach(function (btn) {
      // Prevent duplicate listener binding
      if (btn.dataset.eyeBound) return;
      btn.dataset.eyeBound = 'true';

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var wrap = this.closest('.password-wrap');
        if (!wrap) return;
        var input = wrap.querySelector('input');
        var icon = this.querySelector('i');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          }
          this.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
          this.setAttribute('aria-label', 'Show password');
        }
        input.focus();
      });
    });
  }

  // 5. Track Previous Section for 404 Go Back
  var restoreInProgress = false;

  function getPageScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  // Save the exact page + section + offset the visitor is leaving from.
  // This only runs on real content pages, never on 404.html itself.
  function capturePrevPosition() {
    if (restoreInProgress) return;
    try {
      var scrollY = getPageScrollTop();
      sessionStorage.setItem('stackly_prev_url', window.location.href.split('#')[0]);
      sessionStorage.setItem('stackly_prev_scroll', String(scrollY));

      // Find the section currently in view (last matching element in DOM order)
      var sections = document.querySelectorAll('section[id], header[id], main[id], div[id]');
      var currentId = '';
      var sectionTop = 0;
      sections.forEach(function (sec) {
        if (sec.id === 'mobileStickyHeader' || sec.id === 'mobileNavBackdrop') return;
        var rect = sec.getBoundingClientRect();
        if (rect.top > 250 || rect.bottom < 100) return;
        if (rect.width === 0 && rect.height === 0) return;
        var style = window.getComputedStyle(sec);
        if (style.position === 'fixed' || style.position === 'sticky') return;
        if (style.display === 'none' || style.visibility === 'hidden') return;
        currentId = sec.id;
        sectionTop = rect.top + scrollY;
      });

      if (currentId) {
        sessionStorage.setItem('stackly_prev_section', currentId);
        // Offset inside the section keeps the position stable if content above
        // the section changes height while the next page loads.
        sessionStorage.setItem('stackly_prev_section_offset', String(scrollY - sectionTop));
      } else {
        sessionStorage.removeItem('stackly_prev_section');
        sessionStorage.removeItem('stackly_prev_section_offset');
      }
    } catch (err) {}
  }

  // Remove the restore curtain so the page appears already at the section.
  function revealRestoredPage() {
    try {
      var root = document.documentElement;
      root.classList.remove('stackly-restoring');
      var style = document.getElementById('stacklyRestoreStyle');
      if (style && style.parentNode) style.parentNode.removeChild(style);
      root.style.removeProperty('scroll-behavior');
      root.style.removeProperty('background-color');
    } catch (err) {}
    restoreInProgress = false;
  }

  // Restore the exact section/scroll position after arriving from 404.
  function restorePrevPosition() {
    var requested = false;
    try {
      requested = sessionStorage.getItem('stackly_restore_requested') === 'true';
    } catch (err) {}
    if (!requested) return false;

    try {
      sessionStorage.removeItem('stackly_restore_requested');
    } catch (err) {}

    var targetY = 0;
    var sectionId = '';
    var sectionOffset = 0;
    try {
      targetY = parseInt(sessionStorage.getItem('stackly_prev_scroll') || '0', 10) || 0;
      sectionId = sessionStorage.getItem('stackly_prev_section') || '';
      sectionOffset = parseInt(sessionStorage.getItem('stackly_prev_section_offset') || '0', 10) || 0;
    } catch (err) {}

    if (targetY <= 0 && !sectionId) {
      revealRestoredPage();
      return false;
    }

    restoreInProgress = true;
    try {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      // Prevent the browser's own hash jump from animating from the top.
      document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
    } catch (err) {}

    function applyRestore() {
      if (!restoreInProgress) return;
      var target = targetY;
      if (sectionId) {
        var sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
          target = sectionEl.getBoundingClientRect().top + getPageScrollTop() + sectionOffset;
        }
      }
      if (target > 0) {
        try {
          window.scrollTo({ top: target, left: 0, behavior: 'instant' });
        } catch (err) {
          window.scrollTo(0, target);
        }
      }
    }

    var revealed = false;
    function finishRestore() {
      if (revealed) return;
      applyRestore();
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(function () {
          if (revealed) return;
          applyRestore();
          revealed = true;
          revealRestoredPage();
        });
      } else {
        revealed = true;
        revealRestoredPage();
      }
    }

    // Position the page while it is still behind the curtain.
    applyRestore();
    if (window.requestAnimationFrame) window.requestAnimationFrame(applyRestore);

    // Reveal only after images and fonts have settled, so the visitor never
    // sees the top of the page or a correction scroll.
    var pending = 2;
    function partDone() {
      pending -= 1;
      if (pending <= 0) finishRestore();
    }

    if (document.readyState === 'complete') {
      partDone();
    } else {
      window.addEventListener('load', partDone, { once: true });
    }

    if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
      document.fonts.ready.then(partDone, partDone);
    } else {
      partDone();
    }

    // Failsafe so a slow asset can never keep the page hidden.
    window.setTimeout(finishRestore, 1200);

    // Let the visitor take control immediately if they interact.
    ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
      window.addEventListener(evt, finishRestore, { passive: true, once: true });
    });

    return true;
  }

  // Return to the exact section the 404 was opened from — never to a random
  // history entry. Falls back to the same-origin referrer, then home.
  function handleGoBack(e) {
    if (e) e.preventDefault();

    var destination = '';
    var section = '';
    var hasSavedPosition = false;
    try {
      destination = sessionStorage.getItem('stackly_prev_url') || '';
      section = sessionStorage.getItem('stackly_prev_section') || '';
      hasSavedPosition = !!destination;
    } catch (err) {}

    // Last resort: only trust a same-origin referrer.
    if (!destination && document.referrer) {
      try {
        var ref = new URL(document.referrer);
        if (ref.origin === window.location.origin) destination = ref.href;
      } catch (err) {}
    }

    if (!destination || /404\.html?($|[?#])/i.test(destination)) {
      destination = 'index.html';
      section = '';
      hasSavedPosition = false;
    }

    try {
      if (hasSavedPosition) {
        // Ask the destination page to jump back to the saved section/offset.
        sessionStorage.setItem('stackly_restore_requested', 'true');
      } else {
        // No reliable previous position: open the page at the top instead of
        // applying a stale scroll value from another page.
        sessionStorage.removeItem('stackly_restore_requested');
        sessionStorage.removeItem('stackly_prev_scroll');
        sessionStorage.removeItem('stackly_prev_section');
        sessionStorage.removeItem('stackly_prev_section_offset');
      }
    } catch (err) {}

    destination = destination.split('#')[0];
    if (section) destination += '#' + section;

    try {
      window.location.replace(destination);
    } catch (err) {
      window.location.href = destination;
    }
  }

  function setupSectionTracking() {
    var currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    // Do not record 404 as the previous section
    if (currentFile.indexOf('404') === -1) {
      // Restore before any recording happens, otherwise the fresh page scroll
      // position (usually 0) would overwrite the stored section.
      restorePrevPosition();

      window.addEventListener('scroll', capturePrevPosition, { passive: true });
      window.addEventListener('beforeunload', capturePrevPosition);
      window.addEventListener('pagehide', capturePrevPosition);
      capturePrevPosition();
    } else {
      // We are ON the 404 page: wire up the Go Back button
      var goBackBtn = document.getElementById('goBackBtn') || document.querySelector('.go-back-btn');
      if (goBackBtn && !goBackBtn.dataset.goBackBound) {
        goBackBtn.dataset.goBackBound = 'true';
        goBackBtn.addEventListener('click', handleGoBack);
      }
    }
  }

  // 6. Setup Mobile Sticky Header (Logo on left, Hamburger on right)
  function setupMobileStickyHeader() {
    var existing = document.getElementById('mobileStickyHeader');
    if (!existing) {
      var header = document.createElement('header');
      header.className = 'mobile-sticky-header';
      header.id = 'mobileStickyHeader';
      header.setAttribute('aria-label', 'Mobile Navigation Header');
      header.innerHTML =
        '<div class="mobile-header-inner">' +
          '<a href="index.html" class="mobile-logo" aria-label="Stackly Home">' +
            '<img src="assets/stackly-logo-recoloured.webp" alt="Stackly Florence">' +
          '</a>' +
          '<button class="hamburger-btn mobile-hamburger" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileDrawer">' +
            '<i class="fa-solid fa-bars"></i>' +
          '</button>' +
        '</div>';
      document.body.insertBefore(header, document.body.firstChild);
    }
  }

  // 7. Sticky Header Scroll Effect (frosted glass shadow when scrolled)
  function setupHeaderScrollEffect() {
    var header = document.getElementById('mobileStickyHeader');
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 8. Universal CTA 3D Buttons Redirection to 404 Page
  function setupCta3dRedirects() {
    document.addEventListener('click', function (e) {
      var cta = e.target.closest('.btn-3d, .blob, .visit-btn, .cta-btn');
      if (!cta) return;

      // Do NOT intercept on 404.html itself (preserves Go Back and Return Home buttons)
      var path = window.location.pathname.split('/').pop().toLowerCase();
      if (path === '404.html' || window.location.href.indexOf('404.html') !== -1) return;

      // Do NOT intercept navigation, drawer, eye toggles, or filter chips
      if (cta.closest('.mobile-sticky-header, .drawer-links, .nav, .err-actions, .go-back-btn, .password-wrap')) return;
      if (cta.classList.contains('chip') || cta.tagName.toLowerCase() === 'span') return;
      if (cta.type === 'submit' && cta.closest('form#contactForm, form#journalForm')) return;

      // Record the exact section and URL for seamless 404 Go Back fallback
      capturePrevPosition();

      e.preventDefault();
      window.location.href = '404.html';
    });
  }

  // 9. Global Init
  function init() {
    setupMobileStickyHeader();
    setupMobileDrawer();
    highlightActiveDrawerLink();
    setupDrawerEvents();
    setupHeaderScrollEffect();
    setupEyeToggle();
    setupSectionTracking();
    setupCta3dRedirects();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

