(function () {
  'use strict';

  var EMAIL_KEY = 'stackly_user_email';

  function readEmail() {
    try {
      return localStorage.getItem(EMAIL_KEY) || sessionStorage.getItem(EMAIL_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function saveEmail(email) {
    email = (email || '').trim().toLowerCase();
    if (!email) return;
    try {
      localStorage.setItem(EMAIL_KEY, email);
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
    var email = readEmail();
    if (!email) return;

    var fullName = displayNameFromEmail(email);
    if (!fullName) return;

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-name]'), function (el) {
      el.textContent = fullName;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-greeting]'), function (el) {
      el.textContent = (el.getAttribute('data-profile-greeting') || '') + fullName;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-profile-initials]'), function (el) {
      el.textContent = initialsFromName(fullName);
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
    } else if (form.id === 'signupForm') {
      input = document.getElementById('signupEmail');
    }

    if (input && input.value) saveEmail(input.value);
  }

  function redirectCta(e) {
    var target = e.target;
    var cta = target && target.closest
      ? target.closest('a.btn, button.btn, a.blob, button.blob, .visit-btn')
      : null;
    if (!cta) return;

    if (cta.closest('#contactForm, #loginForm, #signupForm, #journalForm, nav, .nav, .sidebar-nav, .dash-sidebar, .auth, .auth-topbar, .dash-mobile-header, .mobile-drawer, .mobile-sticky-header, .intro-screen, .page-404')) return;
    if (cta.id === 'goBackBtn' || cta.hasAttribute('disabled')) return;
    if (cta.classList.contains('hamburger-btn') ||
        cta.classList.contains('dash-menu-toggle') ||
        cta.classList.contains('dash-sidebar-close') ||
        cta.classList.contains('eye-toggle-btn') ||
        cta.classList.contains('intro-skip') ||
        cta.classList.contains('to-top')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    window.location.href = '404.html';
  }

  document.addEventListener('submit', rememberLoginEmail, true);
  document.addEventListener('click', redirectCta, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyProfileName);
  } else {
    applyProfileName();
  }
})();
