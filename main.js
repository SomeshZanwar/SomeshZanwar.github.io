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

  /* ── MOBILE NAVIGATION ── */
  const links = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  if (links && navCta) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.textContent = 'Menu';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.setAttribute('aria-controls', 'site-nav');
    toggle.setAttribute('aria-expanded', 'false');
    links.id = 'site-nav';
    links.before(toggle);
    const closeMenu = () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    };
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (innerWidth > 768) closeMenu(); });
  }

  /* ── PROJECT FILTERS ── */
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b =>
        b.setAttribute('aria-pressed', String(b === button)));
      document.querySelectorAll('.catalog-card').forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
    });
  });

  /* ── SUBTLE POINTER MOVEMENT (DESKTOP ONLY) ── */
  const portrait = document.querySelector('.portrait-wrap');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (portrait && !reduced && matchMedia('(pointer: fine)').matches) {
    const hero = document.querySelector('.editorial-hero');
    hero?.addEventListener('pointermove', e => {
      const rect = portrait.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      const near = Math.hypot(dx, dy) < 380;
      portrait.style.transform = near
        ? `translateX(-50%) translate3d(${Math.max(-16, Math.min(16, dx / 18))}px,${Math.max(-16, Math.min(16, dy / 18))}px,0)`
        : 'translateX(-50%)';
    }, { passive: true });
    hero?.addEventListener('pointerleave', () => { portrait.style.transform = 'translateX(-50%)'; });
  }

});
