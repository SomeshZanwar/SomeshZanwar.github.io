/* ═══════════════════════════════════════════════
   SOMESH ZANWAR — PORTFOLIO v2 · main.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── YEAR ── */
  document.querySelectorAll('.yr').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ── NAV ACTIVE STATE ── */
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active',
      href === file ||
      (href === 'index.html' && (file === '' || file === '/' || file === 'index.html'))
    );
  });

  /* ── NAV SCROLL TINT ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const tint = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', tint, { passive: true });
    tint();
  }

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => ro.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in-view'));
  }

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end    = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dec    = parseInt(el.dataset.dec || '0');
        const dur    = 1300;
        const t0     = performance.now();
        const tick   = now => {
          const p = Math.min((now - t0) / dur, 1);
          const v = end * (1 - Math.pow(1 - p, 3));
          el.textContent = v.toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => co.observe(c));
  }

  /* ── PIPELINE HOVER PROPAGATE ── */
  document.querySelectorAll('.ps').forEach((step, i, arr) => {
    step.addEventListener('mouseenter', () => {
      arr.forEach((s, j) => { if (j <= i) s.style.color = 'var(--amber)'; });
    });
    step.addEventListener('mouseleave', () => {
      arr.forEach(s => s.style.color = '');
    });
  });

  /* ── MARQUEE PAUSE ON HOVER ── */
  document.querySelectorAll('.ticker-track').forEach(track => {
    const row = track.closest('.ticker-row');
    if (!row) return;
    row.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    row.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });

});
