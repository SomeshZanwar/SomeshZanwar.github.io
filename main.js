/* ═══════════════════════════════════════════════
   SOMESH ZANWAR — PORTFOLIO JS
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── YEAR ── */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── CUSTOM CURSOR ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursor && cursorRing && window.innerWidth > 768) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      document.documentElement.style.setProperty('--mx', mx + 'px');
      document.documentElement.style.setProperty('--my', my + 'px');
    });
    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();
  }

  /* ── TYPED HERO TEXT ── */
  const typed  = document.getElementById('hero-typed');
  const tcursor = document.getElementById('hero-cursor');
  if (typed) {
    const phrases = [
      'SQL · Python · Power BI',
      'A/B Testing · Experiment Design',
      'AI & Agent Governance',
      'KPI & Funnel Analytics',
      'Data Quality · dbt · PostgreSQL',
    ];
    let pi = 0, ci = 0, deleting = false, wait = 0;
    const type = () => {
      if (wait > 0) { wait--; setTimeout(type, 40); return; }
      const phrase = phrases[pi];
      if (!deleting) {
        typed.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) { deleting = true; wait = 40; }
        setTimeout(type, 60);
      } else {
        typed.textContent = phrase.slice(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; wait = 10; }
        setTimeout(type, 30);
      }
    };
    setTimeout(type, 1200);
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const cobs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
        const duration = 1200;
        const start = performance.now();
        const animate = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          const val = target * ease;
          el.textContent = prefix + val.toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        cobs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cobs.observe(c));
  }

  /* ── ACTIVE NAV ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const onScroll = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── NAV SCROLL TINT ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.style.background = window.scrollY > 50
      ? 'rgba(8,8,10,0.96)'
      : 'rgba(8,8,10,0.8)';
  }, { passive: true });

  /* ── PIPELINE STEP HOVER PROPAGATE ── */
  document.querySelectorAll('.pipe-step').forEach((step, i, arr) => {
    step.addEventListener('mouseenter', () => {
      arr.forEach((s, j) => {
        if (j <= i) s.style.color = 'var(--amber)';
      });
    });
    step.addEventListener('mouseleave', () => {
      arr.forEach(s => s.style.color = '');
    });
  });

  /* ── SKILL LIST HOVER RIPPLE ── */
  document.querySelectorAll('.skill-list li').forEach(li => {
    li.addEventListener('mouseenter', function() {
      this.style.paddingLeft = '12px';
      this.style.transition = 'padding-left 0.2s var(--ease-spring)';
    });
    li.addEventListener('mouseleave', function() {
      this.style.paddingLeft = '';
    });
  });

});
