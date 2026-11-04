/**
 * Stackly - Contact Page & Section Interactive Script
 * Handles form validation, FAQ accordion behavior, and interactive light effects.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Contact Form Handling
    var contactForm = document.getElementById('contactForm');
    var feedbackEl = document.getElementById('formFeedback');

    if (contactForm) {
      var firstNameInput = document.getElementById('cFirstName');
      var lastNameInput = document.getElementById('cLastName');

      function setFieldError(input, message) {
        if (!input) return;
        var errorEl = document.getElementById(input.id + 'Error');
        if (message) {
          input.classList.add('is-invalid');
          input.setAttribute('aria-invalid', 'true');
          if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('is-visible');
          }
        } else {
          input.classList.remove('is-invalid');
          input.removeAttribute('aria-invalid');
          if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('is-visible');
          }
        }
      }

      function validateName(input) {
        if (!input) return true;
        var value = input.value.trim();
        if (!value) {
          setFieldError(input, '');
          return true;
        }
        if (/[^A-Za-z]/.test(value)) {
          setFieldError(input, 'Only alphabets are allowed.');
          return false;
        }
        setFieldError(input, '');
        return true;
      }

      [firstNameInput, lastNameInput].forEach(function (input) {
        if (!input) return;
        input.addEventListener('input', function () {
          validateName(input);
        });
        input.addEventListener('blur', function () {
          validateName(input);
        });
      });

      // Keep the message button from moving on while a name still has
      // numerals or other characters that are not alphabets.
      contactForm.addEventListener('click', function (e) {
        var target = e.target;
        if (!target || !target.closest || !target.closest('.btn-submit')) return;
        var firstValid = validateName(firstNameInput);
        var lastValid = validateName(lastNameInput);
        if (!firstValid || !lastValid) {
          e.preventDefault();
          e.stopPropagation();
          (firstValid ? lastNameInput : firstNameInput).focus();
        }
      }, true);

      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateName(firstNameInput) || !validateName(lastNameInput)) {
          (firstNameInput && firstNameInput.classList.contains('is-invalid') ? firstNameInput : lastNameInput).focus();
          return;
        }

        var fname = (document.getElementById('cFirstName') || {}).value || '';
        var lname = (document.getElementById('cLastName') || {}).value || '';
        var email = (document.getElementById('cEmail') || {}).value || '';
        var message = (document.getElementById('cMessage') || {}).value || '';

        fname = fname.trim();
        lname = lname.trim();
        email = email.trim();
        message = message.trim();

        if (!fname || !lname || !email || !message) {
          showFeedback('Please fill in your name, email, and message.', 'error');
          return;
        }

        var emailPattern = /^[^\s@]+@gmail\.com$/i;
        if (!emailPattern.test(email)) {
          showFeedback('Only Gmail addresses are allowed.', 'error');
          return;
        }

        window.location.href = '404.html';
      });
    }

    function showFeedback(msg, type) {
      if (!feedbackEl) return;
      feedbackEl.textContent = msg;
      feedbackEl.className = 'form-feedback ' + type;
      feedbackEl.style.opacity = '1';

      if (type === 'success') {
        setTimeout(function () {
          feedbackEl.style.opacity = '0';
          setTimeout(function () {
            feedbackEl.textContent = '';
            feedbackEl.className = 'form-feedback';
          }, 400);
        }, 7000);
      }
    }

    // 2. FAQ Accordion Single-Open Behavior
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          faqItems.forEach(function (other) {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });

    // 3. Interactive Mouse Lighting for Contact Cards
    var interactiveCards = document.querySelectorAll(
      '.direct-card, .info-card, .boutique-card, .trade-card, .msg-card, .account-banner'
    );

    interactiveCards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });

      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });
    // 4. Send a Message Dotted Border Fitting
    var msgFrame = document.querySelector('.msg-card.frame');
    if (msgFrame) {
      var existingSvg = msgFrame.querySelector('svg.ol');
      if (!existingSvg) {
        var ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(ns, 'svg');
        var rect = document.createElementNS(ns, 'rect');
        svg.setAttribute('class', 'ol');
        rect.setAttribute('pathLength', '1');
        rect.setAttribute('x', '2.5');
        rect.setAttribute('y', '2.5');
        svg.appendChild(rect);
        msgFrame.appendChild(svg);
      }
      function fitMsgFrame() {
        var rectEl = msgFrame.querySelector('svg.ol rect');
        if (!rectEl) return;
        var b = msgFrame.getBoundingClientRect();
        rectEl.setAttribute('width', Math.max(b.width - 5, 0));
        rectEl.setAttribute('height', Math.max(b.height - 5, 0));
        rectEl.setAttribute('rx', parseFloat(getComputedStyle(msgFrame).borderTopLeftRadius) || 48);
      }
      fitMsgFrame();
      window.addEventListener('resize', fitMsgFrame);
      if (window.ResizeObserver) {
        new ResizeObserver(fitMsgFrame).observe(msgFrame);
      }
      msgFrame.classList.add('in');
    }
  });
})();

