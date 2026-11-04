(function () {
  function createFallbackNav() {
    var tpl = document.createElement('div');
    tpl.innerHTML =
      '<a class="logo" href="index.html"><img src="assets/stackly-logo-recoloured.webp" alt="Stackly"></a>' +
      '<ul>' +
      '<li><a href="index.html">Home</a></li>' +
      '<li><a href="about.html">About</a></li>' +
      '<li><a href="services.html">Services</a></li>' +
      '<li><a href="blog.html">Blog</a></li>' +
      '<li><a href="contact.html">Contact</a></li>' +
      '</ul>' +
      '<div class="auth">' +
      '<a class="btn light icon-btn" href="cart.html" aria-label="Cart"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.66 17h8.66a2 2 0 0 0 1.97-1.61L23 6H6"></path></svg></a>' +
      '<a class="btn light" href="signin.html">Sign in</a>' +
      '</div>';
    return tpl;
  }

  function markActive(bar) {
    var currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!currentFile) currentFile = 'index.html';

    var matched = false;
    bar.querySelectorAll('ul a').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split(/[?#]/)[0].toLowerCase();
      var li = link.closest('li');
      if (href === currentFile) {
        link.classList.add('on');
        if (li) li.classList.add('on');
        matched = true;
      } else {
        link.classList.remove('on');
        if (li) li.classList.remove('on');
      }
    });

    if (matched) return;
    var original = document.querySelector('.nav ul a.on, .nav ul li.on a');
    if (!original) return;
    var originalHref = (original.getAttribute('href') || '').split(/[?#]/)[0].toLowerCase();
    bar.querySelectorAll('ul a').forEach(function (link) {
      if ((link.getAttribute('href') || '').split(/[?#]/)[0].toLowerCase() === originalHref) {
        link.classList.add('on');
        var li = link.closest('li');
        if (li) li.classList.add('on');
      }
    });
  }

  function updateCartIndicator() {
    try {
      var itemKey = localStorage.getItem('stackly_cart_item');
      document.querySelectorAll('a[aria-label="Cart"]').forEach(function (btn) {
        var existing = btn.querySelector('.cart-dot');
        if (itemKey) {
          if (!existing) {
            var dot = document.createElement('span');
            dot.className = 'cart-dot';
            btn.appendChild(dot);
          }
        } else if (existing) {
          existing.remove();
        }
      });
    } catch (e) {}
  }

  function init() {
    if (document.querySelector('.mini-nav')) return;

    var nav = document.querySelector('.nav');
    var logo = nav && nav.querySelector('.logo');
    var ul = nav && nav.querySelector('ul');
    var auth = nav && nav.querySelector('.auth');

    if (!logo || !ul) {
      var fallback = createFallbackNav();
      logo = fallback.querySelector('.logo');
      ul = fallback.querySelector('ul');
      auth = fallback.querySelector('.auth');
    }
    if (!logo || !ul) return;

    var bar = document.createElement('nav');
    bar.className = 'mini-nav';
    bar.setAttribute('aria-label', 'Sticky navigation');
    bar.setAttribute('data-sticky-nav', '');

    bar.appendChild(logo.cloneNode(true));
    bar.appendChild(ul.cloneNode(true));
    if (auth) bar.appendChild(auth.cloneNode(true));

    var miniHamb = document.createElement('button');
    miniHamb.className = 'hamburger-btn';
    miniHamb.type = 'button';
    miniHamb.setAttribute('aria-label', 'Toggle navigation menu');
    miniHamb.setAttribute('aria-expanded', 'false');
    miniHamb.setAttribute('aria-controls', 'mobileDrawer');
    miniHamb.innerHTML = '<i class="fa-solid fa-bars"></i>';
    bar.appendChild(miniHamb);

    markActive(bar);
    document.body.appendChild(bar);
    updateCartIndicator();

    /* Reveal the sticky header exactly when the original header leaves the viewport */
    var triggerAt = 80;
    function measureTrigger() {
      if (!nav) return;
      var top = window.pageYOffset || document.documentElement.scrollTop || 0;
      triggerAt = Math.max(60, nav.getBoundingClientRect().bottom + top);
    }

    var ticking = false;
    function updateScroll() {
      var top = window.pageYOffset || document.documentElement.scrollTop || 0;
      bar.classList.toggle('is-scrolled', top > triggerAt);
      ticking = false;
    }

    measureTrigger();
    updateScroll();

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', function () {
      measureTrigger();
      updateScroll();
    }, { passive: true });

    window.addEventListener('load', function () {
      measureTrigger();
      updateScroll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
