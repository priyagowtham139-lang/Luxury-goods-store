(function () {
  'use strict';

  var EMAIL_KEY = 'stackly_user_email';
  var ADMIN_EMAIL_KEY = 'stackly_admin_email';
  var CLIENT_EMAIL_KEY = 'stackly_client_email';
  var ROLE_KEY = 'stackly_current_role';

  function isCurrentAdmin() {
    try {
      var path = (window.location.pathname || '').toLowerCase();
      var href = (window.location.href || '').toLowerCase();
      if (path.indexOf('admin-') !== -1 || href.indexOf('admin-') !== -1) return true;
      if (document.querySelector('.admin-banner, nav[aria-label*="Admin"], .admin-badge, .admin-avatar')) return true;
    } catch (e) {}
    return false;
  }

  function getDashboardEmail() {
    var admin = isCurrentAdmin();
    var roleKey = admin ? ADMIN_EMAIL_KEY : CLIENT_EMAIL_KEY;
    var defaultEmail = admin ? 'admin@gmail.com' : 'marco.bellini@gmail.com';
    var email = '';
    try {
      email = localStorage.getItem(roleKey) || sessionStorage.getItem(roleKey) || '';
      if (!email) {
        var storedRole = localStorage.getItem(ROLE_KEY) || '';
        var general = localStorage.getItem(EMAIL_KEY) || sessionStorage.getItem(EMAIL_KEY) || '';
        if (general) {
          if (admin && storedRole === 'admin') email = general;
          else if (!admin && storedRole !== 'admin') email = general;
          else if (!storedRole) email = general;
        }
      }
    } catch (e) {}
    return (email || defaultEmail).trim().toLowerCase();
  }

  function readEmail() {
    return getDashboardEmail();
  }

  function saveEmail(email, role) {
    email = (email || '').trim().toLowerCase();
    if (!email) return;
    try {
      localStorage.setItem(EMAIL_KEY, email);
      if (role === 'admin') {
        localStorage.setItem(ADMIN_EMAIL_KEY, email);
        localStorage.setItem(ROLE_KEY, 'admin');
      } else if (role === 'user') {
        localStorage.setItem(CLIENT_EMAIL_KEY, email);
        localStorage.setItem(ROLE_KEY, 'user');
      }
    } catch (e) {}
  }

  function displayNameFromEmail(email) {
    var local = String(email || '').split('@')[0] || '';
    local = local
      .replace(/[._\-+]+/g, ' ')
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!local) return '';
    return local.split(' ').map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }

  function initialsFromName(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  function applyProfileName() {
    var email = getDashboardEmail();
    var admin = isCurrentAdmin();

    var fullName = '';
    if (admin && (email === 'admin@gmail.com' || (email.split('@')[0] || '').toLowerCase() === 'admin')) {
      fullName = 'Administrator';
    } else {
      fullName = displayNameFromEmail(email);
    }
    if (!fullName) {
      fullName = admin ? 'Administrator' : 'Marco Bellini';
    }

    var initials = '';
    if (admin && fullName === 'Administrator') {
      initials = 'AD';
    } else {
      initials = initialsFromName(fullName) || (admin ? 'AD' : 'MB');
    }

    // Synchronize all email elements (inputs, text containers, badges)
    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-email]'), function (el) {
      if ('value' in el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
        el.value = email;
      } else {
        el.textContent = email;
      }
      el.setAttribute('title', email);
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-name]'), function (el) {
      el.textContent = fullName;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-greeting]'), function (el) {
      el.textContent = (el.getAttribute('data-profile-greeting') || '') + fullName;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-initials]'), function (el) {
      el.textContent = initials;
    });

    var nameParts = fullName.split(/\s+/);
    var firstName = nameParts.shift() || '';
    var lastName = nameParts.join(' ');

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-first]'), function (el) {
      if ('value' in el) el.value = firstName;
      else el.textContent = firstName;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-last]'), function (el) {
      if ('value' in el) el.value = lastName;
      else el.textContent = lastName;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-owner]'), function (el) {
      el.textContent = fullName;
    });
  }

  function rememberLoginEmail(e) {
    var form = e.target;
    if (!form || form.nodeName !== 'FORM') return;

    var input = null;
    if (form.id === 'loginForm') {
      input = document.getElementById('email');
      var role = 'user';
      var adminTab = document.getElementById('adminRoleTab');
      if (adminTab && (adminTab.classList.contains('active') || adminTab.getAttribute('aria-selected') === 'true')) {
        role = 'admin';
      }
      if (input && input.value) {
        var loginEmail = input.value.trim().toLowerCase();
        saveEmail(loginEmail, role);
      }
    } else if (form.id === 'signupForm') {
      input = document.getElementById('signupEmail') || document.getElementById('email');
      if (input && input.value) {
        var signupEmail = input.value.trim().toLowerCase();
        saveEmail(signupEmail, 'user');
      }
    }
  }

  function redirectCta(e) {
    var target = e.target;
    var cta = target && target.closest
      ? target.closest('a.btn, button.btn, a.blob, button.blob, .visit-btn')
      : null;
    if (!cta) return;

    if (cta.closest('#contactForm, #loginForm, #signupForm, #journalForm, nav, .nav, .sidebar-nav, .dash-sidebar, .sidebar-user-card, .dash-context-menu, .auth, .auth-topbar, .dash-mobile-header, .mobile-drawer, .mobile-sticky-header, .intro-screen, .page-404')) return;
    if (cta.id === 'goBackBtn' || cta.hasAttribute('disabled')) return;
    if (cta.classList.contains('hamburger-btn') ||
        cta.classList.contains('dash-menu-toggle') ||
        cta.classList.contains('dash-sidebar-close') ||
        cta.classList.contains('sidebar-ctx-trigger') ||
        cta.classList.contains('eye-toggle-btn') ||
        cta.classList.contains('intro-skip') ||
        cta.classList.contains('to-top')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    window.location.href = '404.html';
  }

  /* Interactive Sidebar Context Menu */
  function initDashboardContextMenu() {
    var userCard = document.getElementById('sidebarUserCard') || document.querySelector('.sidebar-user-card');
    if (!userCard) return;

    // Ensure menu container exists in body
    var menu = document.getElementById('dashContextMenu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'dashContextMenu';
      menu.className = 'dash-context-menu';
      menu.setAttribute('role', 'menu');
      menu.setAttribute('aria-label', 'Account options');
      document.body.appendChild(menu);
    }

    // Ensure toast notification container exists in body
    var toast = document.getElementById('dashToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dashToast';
      toast.className = 'dash-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span id="dashToastMsg">Email address copied to clipboard</span>';
      document.body.appendChild(toast);
    }

    var toastTimer = null;
    function showToast(msg) {
      var msgEl = document.getElementById('dashToastMsg');
      if (msgEl) msgEl.textContent = msg;
      toast.classList.add('is-visible');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 2600);
    }

    function renderMenuContent() {
      var currentEmail = getDashboardEmail();
      var isAdmin = isCurrentAdmin();
      var fullName = '';
      if (isAdmin && (currentEmail === 'admin@gmail.com' || (currentEmail.split('@')[0] || '').toLowerCase() === 'admin')) {
        fullName = 'Administrator';
      } else {
        fullName = displayNameFromEmail(currentEmail);
      }
      if (!fullName) fullName = isAdmin ? 'Administrator' : 'Marco Bellini';

      var initials = (isAdmin && fullName === 'Administrator') ? 'AD' : (initialsFromName(fullName) || (isAdmin ? 'AD' : 'MB'));
      var roleBadge = isAdmin
        ? '<span class="dash-ctx-role admin"><i class="fa-solid fa-shield-halved"></i> Administrator</span>'
        : '<span class="dash-ctx-role"><i class="fa-solid fa-gem"></i> Gold Collector</span>';

      var roleNavHtml = isAdmin
        ? [
            '<a href="admin-dashboard.html" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-gauge-high"></i><span>Admin Overview</span></a>',
            '<a href="admin-artisans.html" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-people-group"></i><span>Artisans Bench</span></a>',
            '<a href="user-dashboard.html" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-gem"></i><span>Switch to User View</span></a>',
            '<a href="signin.html?role=user" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-arrow-right-arrow-left"></i><span>Switch Account</span></a>'
          ].join('')
        : [
            '<a href="user-profile.html" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-id-card"></i><span>My Profile</span></a>',
            '<a href="user-orders.html" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-bag-shopping"></i><span>My Orders</span></a>',
            '<a href="admin-dashboard.html" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-shield-halved"></i><span>Switch to Admin View</span></a>',
            '<a href="signin.html?role=admin" class="dash-ctx-item" role="menuitem"><i class="fa-solid fa-arrow-right-arrow-left"></i><span>Switch Account</span></a>'
          ].join('');

      menu.innerHTML = [
        '<div class="dash-ctx-header">',
          '<div class="dash-ctx-avatar' + (isAdmin ? ' admin-mode' : '') + '">' + initials + '</div>',
          '<div class="dash-ctx-info">',
            '<div class="dash-ctx-name">' + fullName + '</div>',
            '<div class="dash-ctx-email" title="' + currentEmail + '">' + currentEmail + '</div>',
            roleBadge,
          '</div>',
        '</div>',
        '<div class="dash-ctx-divider"></div>',
        '<div class="dash-ctx-group">',
          '<button type="button" class="dash-ctx-item" id="dashCtxCopyBtn" role="menuitem">',
            '<i class="fa-solid fa-copy"></i>',
            '<span class="dash-ctx-item-text">Copy Email Address</span>',
            '<span class="dash-ctx-badge">Copy</span>',
          '</button>',
        '</div>',
        '<div class="dash-ctx-divider"></div>',
        '<div class="dash-ctx-group">',
          roleNavHtml,
        '</div>',
        '<div class="dash-ctx-divider"></div>',
        '<div class="dash-ctx-group">',
          '<a href="signin.html" class="dash-ctx-item ctx-danger" role="menuitem">',
            '<i class="fa-solid fa-right-from-bracket"></i>',
            '<span>Log out</span>',
          '</a>',
        '</div>'
      ].join('');

      var copyBtn = document.getElementById('dashCtxCopyBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var copyEmailVal = getDashboardEmail();
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(copyEmailVal).then(function () {
              handleCopySuccess(copyEmailVal);
            }, function () {
              fallbackCopy(copyEmailVal);
            });
          } else {
            fallbackCopy(copyEmailVal);
          }
        });
      }

      function fallbackCopy(text) {
        try {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          handleCopySuccess(text);
        } catch (err) {
          showToast('Email: ' + text);
        }
      }

      function handleCopySuccess(text) {
        if (!copyBtn) return;
        copyBtn.classList.add('is-copied');
        var textSpan = copyBtn.querySelector('.dash-ctx-item-text');
        var badgeSpan = copyBtn.querySelector('.dash-ctx-badge');
        var icon = copyBtn.querySelector('i');
        if (textSpan) textSpan.textContent = 'Copied to Clipboard!';
        if (badgeSpan) badgeSpan.textContent = 'Done';
        if (icon) icon.className = 'fa-solid fa-check';
        showToast('Email address copied: ' + text);
        setTimeout(function () {
          closeMenu();
          if (textSpan) textSpan.textContent = 'Copy Email Address';
          if (badgeSpan) badgeSpan.textContent = 'Copy';
          if (icon) icon.className = 'fa-solid fa-copy';
          copyBtn.classList.remove('is-copied');
        }, 800);
      }
    }

    var isOpen = false;

    function openMenu(anchorRect, mouseCoord) {
      renderMenuContent();
      menu.classList.add('is-open');
      userCard.classList.add('is-active');
      userCard.setAttribute('aria-expanded', 'true');
      isOpen = true;

      var menuWidth = 270;
      var menuHeight = menu.offsetHeight || 310;
      var x, y;

      if (mouseCoord) {
        x = mouseCoord.x;
        y = mouseCoord.y;
        if (x + menuWidth > window.innerWidth - 12) {
          x = window.innerWidth - menuWidth - 12;
        }
        if (x < 12) x = 12;
        if (y + menuHeight > window.innerHeight - 12) {
          y = Math.max(12, y - menuHeight);
        }
      } else {
        var rect = anchorRect || userCard.getBoundingClientRect();
        x = rect.left;
        if (x + menuWidth > window.innerWidth - 12) {
          x = Math.max(12, rect.right - menuWidth);
        }
        y = rect.top - menuHeight - 8;
        if (y < 12) {
          y = rect.bottom + 8;
        }
        if (y + menuHeight > window.innerHeight - 12) {
          y = Math.max(12, window.innerHeight - menuHeight - 12);
        }
      }

      menu.style.left = Math.round(x) + 'px';
      menu.style.top = Math.round(y) + 'px';
    }

    function closeMenu() {
      if (!isOpen) return;
      menu.classList.remove('is-open');
      userCard.classList.remove('is-active');
      userCard.setAttribute('aria-expanded', 'false');
      isOpen = false;
    }

    // Right-click contextmenu event on the sidebar user card
    userCard.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openMenu(null, { x: e.clientX, y: e.clientY });
    });

    // Context trigger 3-dots button click
    var ctxTriggerBtn = document.getElementById('sidebarCtxBtn') || userCard.querySelector('.sidebar-ctx-trigger');
    if (ctxTriggerBtn) {
      ctxTriggerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (isOpen) closeMenu();
        else openMenu(userCard.getBoundingClientRect(), null);
      });
    }

    // Card click toggles context menu
    userCard.addEventListener('click', function (e) {
      if (e.target && (e.target.closest('.sidebar-ctx-trigger') || e.target.closest('#sidebarCtxBtn'))) return;
      if (isOpen) {
        closeMenu();
      } else {
        openMenu(userCard.getBoundingClientRect(), null);
      }
    });

    // Keyboard support: Enter / Space to open, Escape to close
    userCard.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isOpen) closeMenu();
        else openMenu(userCard.getBoundingClientRect(), null);
      } else if (e.key === 'Escape') {
        closeMenu();
      }
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!isOpen) return;
      if (menu.contains(e.target) || userCard.contains(e.target)) return;
      closeMenu();
    }, true);

    // Close on Escape key from anywhere
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        userCard.focus();
      }
    });

    // Close on resize or scroll
    window.addEventListener('resize', closeMenu);
    window.addEventListener('scroll', closeMenu, true);
  }

  document.addEventListener('submit', rememberLoginEmail, true);
  document.addEventListener('click', redirectCta, true);

  function init() {
    applyProfileName();
    initDashboardContextMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
