(function () {
  function split(el, mode) {
    var out = [], i = 0;
    el.childNodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (t) {
          if (!t) return;
          if (/^\s+$/.test(t)) { out.push(document.createTextNode(' ')); return }
          if (mode === 'chars') {
            var w = document.createElement('span'); w.className = 'w';
            t.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'c'; s.style.setProperty('--i', i++); s.textContent = ch; w.appendChild(s) }); out.push(w)
          }
          else { var p = document.createElement('span'); p.className = 'pw'; p.style.setProperty('--i', i++); p.textContent = t; out.push(p) }
        })
      } else out.push(n.cloneNode(true));
    });
    el.textContent = ''; out.forEach(function (n) { el.appendChild(n) });
  }
  document.querySelectorAll('[data-split]').forEach(function (e) { split(e, e.dataset.split) });
  document.querySelectorAll('.frame').forEach(function (f) {
    var ns = 'http://www.w3.org/2000/svg', s = document.createElementNS(ns, 'svg'), r = document.createElementNS(ns, 'rect');
    s.setAttribute('class', 'ol'); r.setAttribute('pathLength', '1'); r.setAttribute('x', '1.5'); r.setAttribute('y', '1.5');
    s.appendChild(r); f.appendChild(s);
    function fit() {
      var b = f.getBoundingClientRect(); r.setAttribute('width', Math.max(b.width - 3, 0)); r.setAttribute("height", Math.max(b.height - 3, 0));
      r.setAttribute('rx', parseFloat(getComputedStyle(f).borderTopLeftRadius) || 0)
    }
    fit(); addEventListener('load', fit); if (window.ResizeObserver) { new ResizeObserver(fit).observe(f) } else { addEventListener('resize', fit) }
  });
  document.querySelectorAll('.cards,.pl,.gal,.steps,.acc,.dots,.row,.rl,.mk').forEach(function (g) {
    g.querySelectorAll('[data-a]').forEach(function (e, i) { e.style.setProperty('--d', (i * 0.12) + 's') })
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    })
  }, { threshold: .15 });
  document.querySelectorAll('[data-split],[data-a],.frame').forEach(function (e) { io.observe(e) });
  document.querySelectorAll('.btn-3d,.val,.why-card,.step-item,.member-card,.data-card,.faq-pill,.info-card,.boutique-card,.trade-card').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      b.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    b.addEventListener('pointerleave', function () {
      b.style.setProperty('--mx', '50%'); b.style.setProperty('--my', '50%');
    });
  });
})();