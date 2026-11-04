/**
 * Stackly - Gmail-only email validation
 * Adds inline validation to every email field on the page and prevents
 * submission/navigation while a non-Gmail address is present.
 */
(function () {
  'use strict';

  var GMAIL_PATTERN = /^[^\s@]+@gmail\.com$/i;
  var ERROR_MESSAGE = 'Only Gmail addresses are allowed.';
  var ERROR_CLASS = 'gmail-error';
  var initialized = false;

  function injectStyles() {
    if (document.getElementById('gmailValidationStyles')) return;
    var style = document.createElement('style');
    style.id = 'gmailValidationStyles';
    style.textContent = [
      '.' + ERROR_CLASS + '{display:none;margin-top:2px;font-family:var(--sans,inherit);font-size:12px;font-weight:600;line-height:1.4;color:#b8572d;}',
      '.' + ERROR_CLASS + '.is-visible,.' + ERROR_CLASS + '.on{display:block;}',
      'input.is-invalid{border-color:#b8572d !important;box-shadow:0 0 0 3px rgba(184,87,45,.14) !important;}',
      'input.is-invalid:focus{border-color:#b8572d !important;box-shadow:0 0 0 4px rgba(184,87,45,.18) !important;}'
    ].join('');
    (document.head || document.documentElement).appendChild(style);
  }

  function isErrorNode(node) {
    if (!node) return false;
    var className = typeof node.className === 'string' ? node.className : '';
    var id = node.id || '';
    return /(^|\s)(err|error|field-error|gmail-error|form-feedback)(\s|$)/i.test(className) || /err/i.test(id);
  }

  function getErrorEl(input) {
    var describedBy = input.getAttribute('aria-describedby');
    if (describedBy) {
      var ids = describedBy.split(/\s+/);
      for (var i = 0; i < ids.length; i++) {
        var described = ids[i] ? document.getElementById(ids[i]) : null;
        if (described && isErrorNode(described)) return described;
      }
    }

    var parent = input.parentNode;
    if (parent) {
      var existing = parent.querySelector('.' + ERROR_CLASS + ', .field-error');
      if (existing) return existing;
    }

    var error = document.createElement('span');
    error.className = 'field-error ' + ERROR_CLASS;
    error.id = (input.id || 'email') + 'Error';
    error.setAttribute('aria-live', 'polite');
    input.insertAdjacentElement('afterend', error);

    var current = input.getAttribute('aria-describedby');
    input.setAttribute('aria-describedby', current ? current + ' ' + error.id : error.id);
    return error;
  }

  function showError(input, errorEl) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    if (!errorEl) return;
    errorEl.textContent = ERROR_MESSAGE;
    errorEl.classList.add('is-visible');
    if (errorEl.classList.contains('err')) errorEl.classList.add('on');
  }

  function clearError(input, errorEl) {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
    errorEl.classList.remove('on');
  }

  function validate(input, errorEl) {
    var value = (input.value || '').trim();
    if (!value) {
      clearError(input, errorEl);
      return true;
    }
    if (!GMAIL_PATTERN.test(value)) {
      showError(input, errorEl);
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function bindInput(input) {
    if (!input || input.__gmailValidationBound) return;
    input.__gmailValidationBound = true;

    var errorEl = getErrorEl(input);
    var check = function () {
      validate(input, errorEl);
    };

    input.addEventListener('input', check);
    input.addEventListener('change', check);
    input.addEventListener('blur', check);
  }

  function emailInputsIn(form) {
    if (!form || !form.querySelectorAll) return [];
    return Array.prototype.slice.call(form.querySelectorAll('input[type="email"]'));
  }

  function firstInvalidInput(inputs) {
    var invalid = null;
    inputs.forEach(function (input) {
      var errorEl = getErrorEl(input);
      if (!validate(input, errorEl) && !invalid) invalid = input;
    });
    return invalid;
  }

  function blockEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
  }

  // Validate before page-level submit handlers (inline onsubmit, JS listeners)
  // can navigate away.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.nodeName !== 'FORM') return;
    var inputs = emailInputsIn(form);
    if (!inputs.length) return;

    var invalid = firstInvalidInput(inputs);
    if (invalid) {
      blockEvent(e);
      invalid.focus();
    }
  }, true);

  // Some forms navigate from a button click instead of a submit event
  // (e.g. the contact page "Send message" button). Block those too.
  document.addEventListener('click', function (e) {
    var trigger = e.target && e.target.closest
      ? e.target.closest('button, input[type="submit"], input[type="image"], [role="button"], a[href]')
      : null;
    if (!trigger) return;

    var form = trigger.form || (trigger.closest ? trigger.closest('form') : null);
    if (!form) return;

    var inputs = emailInputsIn(form);
    if (!inputs.length) return;

    var tag = trigger.tagName;
    var type = (trigger.getAttribute('type') || '').toLowerCase();
    var isSubmit = tag === 'BUTTON'
      ? type !== 'button' && type !== 'reset'
      : tag === 'INPUT' && (type === 'submit' || type === 'image');
    var isLink = tag === 'A' && trigger.hasAttribute('href');
    var hasInlineAction = trigger.hasAttribute('onclick');
    if (!isSubmit && !isLink && !hasInlineAction) return;

    var invalid = firstInvalidInput(inputs);
    if (invalid) {
      blockEvent(e);
      invalid.focus();
    }
  }, true);

  function init() {
    if (initialized) return;
    initialized = true;
    injectStyles();
    Array.prototype.forEach.call(document.querySelectorAll('input[type="email"]'), bindInput);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
