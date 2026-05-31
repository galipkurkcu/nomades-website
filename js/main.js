/* ============================================================
   NOMADES AGENCY — 2026
   Signal Pulse · Nav · Parallax · Cursor · Army · Reveal
   ============================================================ */

'use strict';


/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */

function initCustomCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Disable on touch-only devices
  if (window.matchMedia('(hover: none)').matches) {
    dot.remove(); ring.remove(); return;
  }

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.add('is-hidden');
    ring.classList.add('is-hidden');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.remove('is-hidden');
    ring.classList.remove('is-hidden');
  });

  // Lerp ring behind cursor
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animRing() {
    rx = lerp(rx, mx, 0.11);
    ry = lerp(ry, my, 0.11);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(animRing);
  }
  animRing();

  // Expand on interactive elements
  const interactives = 'a, button, [data-agent-id], .stat-item, .manifesto-col, .process-item, .sovereign-visual, .hq-card, .chronicle-card';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
}


/* ═══════════════════════════════════════
   HERO PARALLAX — Scroll + Mouse
═══════════════════════════════════════ */

function initHeroParallax() {
  const hero    = document.querySelector('.hero');
  const heroImg = document.getElementById('hero-pax-img');
  if (!hero || !heroImg) return;

  let targetMX = 0, targetMY = 0;
  let currMX   = 0, currMY   = 0;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function applyTransform() {
    currMX = lerp(currMX, targetMX, 0.07);
    currMY = lerp(currMY, targetMY, 0.07);
    const scrollOff = window.scrollY * 0.28;
    heroImg.style.transform = `translate3d(${currMX}px, ${scrollOff + currMY}px, 0)`;
    requestAnimationFrame(applyTransform);
  }

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const nx   = (e.clientX - (rect.left + rect.width  * 0.5)) / rect.width;
    const ny   = (e.clientY - (rect.top  + rect.height * 0.5)) / rect.height;
    targetMX = nx * -22;
    targetMY = ny * -14;
  });

  hero.addEventListener('mouseleave', () => {
    targetMX = 0; targetMY = 0;
  });

  applyTransform();
}


/* ═══════════════════════════════════════
   REALM PARALLAX — Scroll
═══════════════════════════════════════ */

function initRealmParallax() {
  const section = document.querySelector('.df-col--realm');
  const bg      = document.getElementById('realm-pax-img');
  if (!section || !bg) return;

  function update() {
    const rect   = section.getBoundingClientRect();
    const viewH  = window.innerHeight;
    if (rect.bottom < 0 || rect.top > viewH) return;

    // centerOffset: 0 when element center is at viewport center
    const centerOffset = (rect.top + rect.height * 0.5) - viewH * 0.5;
    const offset = centerOffset * 0.22;
    bg.style.transform = `translate3d(0, ${offset}px, 0)`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ═══════════════════════════════════════
   SIGNAL IMAGE PARALLAX
═══════════════════════════════════════ */

function initSignalParallax() {
  const section = document.querySelector('.signal-section');
  const img     = document.getElementById('signal-pax-img');
  if (!section || !img) return;

  function update() {
    const rect  = section.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.bottom < 0 || rect.top > viewH) return;

    const centerOffset = (rect.top + rect.height * 0.5) - viewH * 0.5;
    const offset = centerOffset * -0.12;
    img.style.transform = `translate3d(0, ${offset}px, 0)`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ═══════════════════════════════════════
   COUNT-UP — Stats
═══════════════════════════════════════ */

function initCountUp() {
  const items = document.querySelectorAll('[data-count]');
  if (!items.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.count, 10);
      const dur    = 1400;
      const start  = performance.now();

      function tick(now) {
        const t    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }

      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  items.forEach(el => io.observe(el));
}


/* ═══════════════════════════════════════
   SPIRAL — Signal Pulse Canvas
═══════════════════════════════════════ */

function initSpiral() {
  const canvas = document.getElementById('spiral-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, cx, cy, rafId;
  let sweepAngle = -Math.PI / 2;
  let lastTime   = 0;
  const rings    = [];
  let nextPulse  = 1200;

  class PulseRing {
    constructor(opts = {}) {
      this.r     = opts.r     ?? 0;
      this.maxR  = opts.maxR  ?? 800;
      this.speed = opts.speed ?? 1.0;
      this.a     = opts.a     ?? 0.5;
      this.lw    = opts.lw    ?? 0.6;
      this.color = opts.color ?? '240,170,0';
      this.dead  = false;
    }
    update(dt) {
      this.r += this.speed * (dt / 16);
      this.a  = 0.55 * Math.pow(1 - this.r / this.maxR, 2);
      if (this.r >= this.maxR) this.dead = true;
    }
    draw() {
      if (this.a < .003) return;
      ctx.beginPath();
      ctx.arc(cx, cy, this.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${this.color},${this.a.toFixed(3)})`;
      ctx.lineWidth = this.lw;
      ctx.stroke();
    }
  }

  function spawnPulse() {
    const maxR = Math.hypot(W, H) * .56;
    rings.push(new PulseRing({ maxR, speed: .85, a: .55, lw: .7, color: '240,170,0' }));
    rings.push(new PulseRing({ maxR: maxR * .6, speed: 1.3, a: .3, lw: .5, color: '240,140,0' }));
    rings.push(new PulseRing({ maxR: maxR * .85, speed: .5, a: .2, lw: .4, color: '176,28,46' }));
  }

  function drawStatic() {
    const radii  = [100, 210, 340, 500, 680, 880];
    const alphas = [.055, .044, .034, .025, .018, .011];
    radii.forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(240,170,0,${alphas[i]})`;
      ctx.lineWidth = .5;
      ctx.stroke();
    });
  }

  function drawSweep() {
    const maxR  = Math.hypot(W, H) * .55;
    const span  = Math.PI * .42;
    const steps = 40;

    for (let i = 0; i < steps; i++) {
      const t  = i / steps;
      const a0 = sweepAngle - span * t;
      const a1 = sweepAngle - span * (t + 1 / steps);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, a1, a0, false);
      ctx.closePath();
      ctx.fillStyle = `rgba(240,170,0,${(.03 * (1 - t) * (1 - t)).toFixed(4)})`;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
    ctx.strokeStyle = 'rgba(240,170,0,0.18)';
    ctx.lineWidth = .8;
    ctx.stroke();

    sweepAngle += .0028;
  }

  function drawGlow() {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
    grd.addColorStop(0, 'rgba(240,170,0,0.13)');
    grd.addColorStop(.5, 'rgba(240,170,0,0.05)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 80, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(240,170,0,0.6)';
    ctx.fill();
  }

  function render(ts) {
    const dt = lastTime ? Math.min(ts - lastTime, 50) : 16;
    lastTime = ts;

    ctx.clearRect(0, 0, W, H);

    drawSweep();
    drawStatic();

    if (ts >= nextPulse) {
      spawnPulse();
      nextPulse = ts + 4000 + Math.random() * 600;
    }

    for (let i = rings.length - 1; i >= 0; i--) {
      rings[i].update(dt); rings[i].draw();
      if (rings[i].dead) rings.splice(i, 1);
    }

    drawGlow();
    rafId = requestAnimationFrame(render);
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    cx = W / 2; cy = H / 2;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      lastTime = 0;
      rafId = requestAnimationFrame(render);
    }
  });

  setTimeout(spawnPulse, 500);
  setTimeout(() => canvas.classList.add('is-ready'), 200);
  rafId = requestAnimationFrame(render);
}


/* ═══════════════════════════════════════
   NAV
═══════════════════════════════════════ */

function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 64);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* ═══════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════ */

function initHamburger() {
  const btn   = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  const spans = btn.querySelectorAll('span');

  const open = () => {
    links.classList.add('is-open');
    spans[0].style.transform = 'rotate(45deg) translate(4.5px,4.5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4.5px,-4.5px)';
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    links.classList.remove('is-open');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => links.classList.contains('is-open') ? close() : open());
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}


/* ═══════════════════════════════════════
   DRAG SCROLL — All .drag-scroll containers
═══════════════════════════════════════ */

function initDragScrolls() {
  document.querySelectorAll('.drag-scroll').forEach(el => {
    let isDown = false, startX, scrollLeft, didDrag = false;

    el.addEventListener('mousedown', e => {
      isDown = true;
      didDrag = false;
      el.classList.add('is-dragging');
      startX     = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      e.preventDefault();
    });
    el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('is-dragging'); });
    el.addEventListener('mouseup',    () => { isDown = false; el.classList.remove('is-dragging'); });
    el.addEventListener('mousemove',  e => {
      if (!isDown) return;
      e.preventDefault();
      if (Math.abs(e.pageX - el.offsetLeft - startX) > 6) didDrag = true;
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.4;
    });

    // Block card clicks if user dragged
    el.addEventListener('click', e => {
      if (didDrag) { e.stopPropagation(); didDrag = false; }
    }, true);

    let touchStartX, touchScrollLeft;
    el.addEventListener('touchstart', e => {
      touchStartX     = e.touches[0].pageX;
      touchScrollLeft = el.scrollLeft;
    }, { passive: true });
    el.addEventListener('touchmove', e => {
      el.scrollLeft = touchScrollLeft - (e.touches[0].pageX - touchStartX);
    }, { passive: true });
  });
}


/* ═══════════════════════════════════════
   SCROLL REVEAL + FREQ BARS
═══════════════════════════════════════ */

function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('is-visible');

      // Activate freq bars when their container is revealed
      if (el.hasAttribute('data-freq')) {
        el.classList.add('is-visible');
      }

      io.unobserve(el);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => io.observe(el));
}


/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const offset = (document.querySelector('.nav')?.offsetHeight ?? 72) + 16;
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
    });
  });
}


/* ═══════════════════════════════════════
   AGENT POPUP
═══════════════════════════════════════ */


/* ── Translation data lives in js/i18n.js ── */

let currentLang = 'en';

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  currentLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.documentElement.lang = lang;

  // Army card roles
  document.querySelectorAll('.agent-card[data-agent-id]').forEach(card => {
    const id = card.dataset.agentId;
    const roleEl = card.querySelector('.agent-role');
    if (!roleEl) return;
    if (lang === 'tr' && AGENTS_TR[id]) {
      roleEl.textContent = AGENTS_TR[id].role_tr;
    } else if (AGENTS[id]) {
      roleEl.textContent = AGENTS[id].role;
    }
  });

  // Rebuild marquee
  const marqTrack = document.querySelector('.marquee-track');
  const items = MARQUEE_ITEMS[lang] || MARQUEE_ITEMS.en;
  if (marqTrack && items) {
    const doubled = [...items, ...items];
    marqTrack.innerHTML = doubled.map(({ text, lit }) =>
      `<span class="marquee-item${lit ? ' lit' : ''}">${text}</span><span class="marquee-dot"></span>`
    ).join('');
  }

  // Update open popup content if any
  const popup = document.getElementById('agent-popup');
  if (popup && popup.classList.contains('is-open')) {
    const agentId = popup.dataset.openAgentId;
    if (agentId) {
      const roleEl = document.getElementById('ap-role');
      const storyEl = document.getElementById('ap-story');
      if (lang === 'tr' && AGENTS_TR[agentId]) {
        if (roleEl) roleEl.textContent = AGENTS_TR[agentId].role_tr;
        if (storyEl) storyEl.innerHTML = AGENTS_TR[agentId].story_tr.map(p => `<p>${p}</p>`).join('');
      } else if (AGENTS[agentId]) {
        if (roleEl) roleEl.textContent = AGENTS[agentId].role;
        if (storyEl) storyEl.innerHTML = AGENTS[agentId].story.map(p => `<p>${p}</p>`).join('');
      }
    }
  }
}

function switchLanguage(lang) {
  applyTranslations(lang);
  try { localStorage.setItem('nomades-lang', lang); } catch(e) {}

  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.dataset.lang = lang;
    btn.querySelector('.lang-en').classList.toggle('is-active', lang === 'en');
    btn.querySelector('.lang-tr').classList.toggle('is-active', lang === 'tr');
  }
}

function initI18n() {
  let savedLang = 'en';
  try { savedLang = localStorage.getItem('nomades-lang') || 'en'; } catch(e) {}
  if (!TRANSLATIONS[savedLang]) savedLang = 'en';

  applyTranslations(savedLang);

  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.dataset.lang = savedLang;
    btn.querySelector('.lang-en').classList.toggle('is-active', savedLang === 'en');
    btn.querySelector('.lang-tr').classList.toggle('is-active', savedLang === 'tr');

    btn.addEventListener('click', () => {
      switchLanguage(currentLang === 'en' ? 'tr' : 'en');
    });
  }
}


/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */

document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initSpiral();
  initNav();
  initHamburger();
  initHeroParallax();
  initRealmParallax();
  initCitadelParallax();
  initSignalParallax();
  initCountUp();
  initDragScrolls();
  initDragInertia();
  initReveal();
  initSmoothScroll();
  initAgentPopup();
  initScrollProgress();
  initCardTilt();
  initMagneticButtons();
  initUnitParallax();
  initLiveFreq();
  initNavActiveSection();
  initMarqueeDrag();
  initI18n();
  initContactForm();
});

function initContactForm() {
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEN0bBZTpCTIPRphjvezleR-7r-3oCKqEUUJ4a10LWL8LlivL4cWDwCGD87HfhFhJlJw/exec';
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.cf-submit');
    const payload = {
      name:      form.elements.name.value.trim(),
      email:     form.elements.email.value.trim(),
      brand:     form.elements.brand.value.trim(),
      instagram: form.elements.instagram.value.trim(),
      message:   form.elements.message.value.trim(),
      timestamp: new Date().toISOString()
    };
    btn.disabled = true;
    btn.textContent = 'Sending...';
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      form.hidden = true;
      document.getElementById('cf-success').hidden = false;
    } catch(err) {
      btn.disabled = false;
      btn.textContent = 'Başvur  →';
      alert('Bir hata oluştu. Lütfen tekrar dene.');
    }
  });
}
