/**
 * Stackly - Password strength alert
 * Updates every .password-strength panel (data-level, meter bars and label)
 * that points at a password field through its data-input attribute.
 */
(function () {
  'use strict';

  var LABELS = [
    'Use 8+ characters with a mix of letters, numbers and symbols.',
    'Weak password',
    'Fair password',
    'Good password',
    'Strong password'
  ];

  function getScore(value) {
    if (!value) return 0;
    var score = 0;
    if (value.length >= 8) score += 1;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    return score;
  }

  function getMessage(value, score) {
    if (!value) return LABELS[0];
    if (score <= 1) return LABELS[1] + ' — add more characters, numbers and symbols.';
    if (score === 2) return LABELS[2] + ' — add an uppercase letter, number or symbol.';
    if (score === 3) return LABELS[3] + ' — add a symbol for maximum strength.';
    return LABELS[4];
  }

  function initPanel(panel) {
    if (!panel || panel.__passwordStrengthBound) return;
    var input = document.getElementById(panel.getAttribute('data-input'));
    if (!input) return;
    panel.__passwordStrengthBound = true;

    var text = panel.querySelector('.password-strength-text');

    function update() {
      var value = input.value || '';
      var score = getScore(value);
      panel.setAttribute('data-level', String(score));
      if (text) text.textContent = getMessage(value, score);
    }

    input.addEventListener('input', update);
    update();
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('.password-strength[data-input]'), initPanel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
