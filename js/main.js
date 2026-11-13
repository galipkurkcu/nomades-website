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

  // Parallax causes visible jitter on touch/mobile (scroll-driven repaint lags).
  // Desktop only — leave the image static on mobile.
  if (window.matchMedia('(hover: none), (max-width: 768px)').matches) return;

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
  const nav   = document.querySelector('.nav');
  if (!btn || !links) return;

  const spans = btn.querySelectorAll('span');

  const open = () => {
    links.classList.add('is-open');
    // Drop the nav's backdrop-filter while open: a filtered ancestor becomes the
    // containing block for the fixed fullscreen menu, clipping it to half-height.
    nav?.classList.add('nav-menu-open');
    spans[0].style.transform = 'rotate(45deg) translate(4.5px,4.5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4.5px,-4.5px)';
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    links.classList.remove('is-open');
    nav?.classList.remove('nav-menu-open');
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
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
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
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();

      // Mobile: the open menu locks body scroll (overflow:hidden). Close it and release
      // the lock BEFORE scrolling, otherwise window.scrollTo is blocked / lands wrong.
      const links = document.querySelector('.nav-links');
      if (links && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        document.querySelector('.nav')?.classList.remove('nav-menu-open');
        const ham = document.querySelector('.nav-hamburger');
        ham?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        document.body.style.overflow = '';
      }

      // Offset = compact nav height (the state the nav settles into after scrolling),
      // read from a single CSS source so desktop and mobile stay in sync.
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 92;

      // Measure after the layout settles (menu close / overflow release) to get the true position
      requestAnimationFrame(() => {
        const top = t.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      });
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

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
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
  // Formun ekranda belirdigi an. Gonderim bundan birkac yuz milisaniye sonra
  // geliyorsa insan doldurmamistir; sunucu bu kaydi sessizce atar.
  const acilisMs = Date.now();
  // Stricter than the browser default: requires @ and a real domain with a dot (e.g. name@site.com)
  const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

  // Clear the invalid highlight as soon as the user starts fixing a field
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('cf-invalid');
      field.setCustomValidity('');
    });
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate before sending — block empty/invalid submissions and guide the user
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('cf-invalid');
      field.setCustomValidity('');
      let ok = field.checkValidity();
      if (ok && field.type === 'email' && !EMAIL_RE.test(field.value.trim())) {
        field.setCustomValidity(currentLang === 'tr'
          ? 'Geçerli bir e-posta gir (ör. isim@site.com)'
          : 'Enter a valid email (e.g. name@site.com)');
        ok = false;
      }
      if (!ok) {
        field.classList.add('cf-invalid');
        if (!firstInvalid) firstInvalid = field;
      }
    });
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.reportValidity();
      return;
    }

    const btn = form.querySelector('.cf-submit');
    // Uzunluk siniri sunucuda da var; buradaki kirpma yalnizca gereksiz
    // buyuklukteki gonderimi agdan once keser.
    const kirp = (alan, sinir) => String(alan ? alan.value : '').trim().slice(0, sinir);
    const payload = {
      name:      kirp(form.elements.name, 120),
      email:     kirp(form.elements.email, 160),
      brand:     kirp(form.elements.brand, 120),
      instagram: kirp(form.elements.instagram, 120),
      message:   kirp(form.elements.message, 4000),
      company:   kirp(form.elements.company, 120),   // tuzak alan: doluysa bot
      _ms:       Date.now() - acilisMs
    };
    btn.disabled = true;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    btn.textContent = t['form.sending'] || 'Sending...';
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
      btn.innerHTML = t['form.submit'] || 'Apply &nbsp;&rarr;';
      alert(currentLang === 'tr' ? 'Bir hata oluştu. Lütfen tekrar dene.' : 'An error occurred. Please try again.');
    }
  });
}

/* ── Sticky CTA: show after hero, hide when contact form is in view ── */
(function initStickyCTA() {
  const btn = document.getElementById('sticky-cta');
  const hero = document.getElementById('hero');
  const contact = document.getElementById('contact');
  if (!btn || !hero) return;

  let contactVisible = false;
  if (contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(entries) {
      contactVisible = entries[0].isIntersecting;
    }, { rootMargin: '0px 0px -20% 0px' }).observe(contact);
  }

  function update() {
    const pastHero = window.scrollY > (hero.offsetHeight * 0.8);
    btn.classList.toggle('is-visible', pastHero && !contactVisible);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ── Lazy background images: load [data-bg] when near viewport ── */
(function initLazyBg() {
  const els = document.querySelectorAll('[data-bg]');
  if (!els.length) return;
  const load = el => { el.style.backgroundImage = `url('${el.dataset.bg}')`; el.removeAttribute('data-bg'); };
  if (!('IntersectionObserver' in window)) { els.forEach(load); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { load(e.target); obs.unobserve(e.target); } });
  }, { rootMargin: '300px' });
  els.forEach(el => io.observe(el));
})();


/* ── Proof metrics: animated count-up that preserves prefix/suffix spans ── */
(function initProofCount() {
  const els = document.querySelectorAll('[data-count-to]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseFloat(el.dataset.countTo);
      const dec    = parseInt(el.dataset.countDec || '0', 10);
      const dur    = 1500;
      const start  = performance.now();
      function tick(now) {
        const t    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = (ease * target).toFixed(dec);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(dec);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
})();


/* ── Process: draw the vertical spine once the list scrolls into view ── */
(function initProcessDraw() {
  const list = document.querySelector('.process-list');
  if (!list) return;
  if (!('IntersectionObserver' in window)) { list.classList.add('is-drawn'); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { list.classList.add('is-drawn'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  io.observe(list);
})();


/* ═══════════════════════════════════════
   2026-11 · Bolum davranislari + Sinyal imleci
═══════════════════════════════════════ */

(function () {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;


  /* ── 2a · Hizmetler: uc panel ───────────────────────────── */

  function initTrio() {
    const trio = document.querySelector('[data-trio]');
    if (!trio) return;
    const panels = Array.from(trio.querySelectorAll('.trio-panel'));
    const wide = window.matchMedia('(min-width: 901px)');
    let timer = null;

    const activate = p => panels.forEach(x => x.classList.toggle('is-active', x === p));
    const stopAuto = () => { trio.classList.remove('is-auto', 'is-running'); clearInterval(timer); timer = null; };

    panels.forEach(p => {
      p.addEventListener('mouseenter', () => { if (wide.matches) { stopAuto(); activate(p); } });
      p.addEventListener('focus', () => { stopAuto(); activate(p); });
      p.addEventListener('click', () => { stopAuto(); activate(p); });
      // Acik panelin gorseli fareyi hafifce izler
      if (!noHover && !reduced) {
        p.addEventListener('mousemove', e => {
          const r = p.getBoundingClientRect();
          p.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3));
          p.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3));
        });
        p.addEventListener('mouseleave', () => { p.style.setProperty('--mx', 0); p.style.setProperty('--my', 0); });
      }
    });

    // Kullanici dokunana kadar paneller sirayla kendiliginden acilir (yalniz ekrandayken)
    if (reduced || !('IntersectionObserver' in window)) { stopAuto(); return; }
    new IntersectionObserver(entries => {
      if (!trio.classList.contains('is-auto')) return;
      const on = entries[0].isIntersecting && wide.matches;
      trio.classList.toggle('is-running', on);
      clearInterval(timer); timer = null;
      if (on) timer = setInterval(() => {
        const i = panels.findIndex(x => x.classList.contains('is-active'));
        activate(panels[(i + 1) % panels.length]);
      }, 6500);
    }, { threshold: 0.45 }).observe(trio);
  }


  /* ── 2b · Surec: kaydirdikca dolan hat ──────────────────── */

  function initRail() {
    const rail = document.querySelector('[data-rail]');
    if (!rail) return;
    const steps = Array.from(rail.querySelectorAll('.rail-step'));
    let queued = false;

    function update() {
      queued = false;
      const r = rail.getBoundingClientRect();
      const vh = window.innerHeight;
      const vertical = parseFloat(getComputedStyle(rail).borderLeftWidth) > 0;
      // Yatay hat: bolum ekrana girdikce dolar ve 05'in dugumunde biter.
      // Dikey hat: ekranin ortasina kadar olan kisim dolar.
      let p = vertical ? (vh * 0.62 - r.top) / r.height : (vh * 0.86 - r.top) / (vh * 0.5);
      p = Math.max(0, Math.min(1, p));
      rail.style.setProperty('--p', p.toFixed(4));
      steps.forEach((s, i) => {
        const at = vertical ? (s.offsetTop + 24) / rail.offsetHeight : i / (steps.length - 1) - 0.004;
        s.classList.toggle('is-lit', p > 0 && p >= at);
      });
    }
    const ask = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('resize', ask, { passive: true });
    update();
  }


  /* ── 2c · Biz Kimiz: satirlarda 3B egim (Ordu kartlariyla ayni his) ── */

  function initCreedTilt() {
    if (noHover || reduced) return;
    document.querySelectorAll('.creed-row').forEach(row => {
      row.addEventListener('mouseenter', () => { row.style.transition = 'transform .1s linear'; });
      row.addEventListener('mousemove', e => {
        const r = row.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width * .5)) / (r.width * .5);
        const dy = (e.clientY - (r.top + r.height * .5)) / (r.height * .5);
        row.style.transform = `perspective(1100px) rotateX(${(dy * -5).toFixed(2)}deg) rotateY(${(dx * 2).toFixed(2)}deg) translateZ(8px)`;
      });
      row.addEventListener('mouseleave', () => {
        row.style.transition = 'transform .65s cubic-bezier(.22,1,.36,1)';
        row.style.transform = '';
        setTimeout(() => { row.style.transition = ''; }, 700);
      });
    });
  }


  /* ── 3 · Imlec: Sinyal ──────────────────────────────────── */

  function initCursor() {
    if (noHover) { delete root.dataset.cursor; return; }

    const cur = document.createElement('div');
    cur.id = 'dr-cur';
    cur.className = 'is-out';
    cur.setAttribute('aria-hidden', 'true');
    cur.innerHTML = `
      <div class="dc-core"><svg viewBox="0 0 30 30" fill="none" stroke="#F0AA00" stroke-width="1.5">
        <path d="M15 2v9M15 19v9M2 15h9M19 15h9"/><circle cx="15" cy="15" r="1.7" fill="#F0AA00" stroke="none"/>
      </svg></div>
      <div class="dc-label"></div>`;
    document.body.appendChild(cur);
    const core = cur.querySelector('.dc-core');
    const label = cur.querySelector('.dc-label');

    document.addEventListener('mousemove', e => {
      cur.classList.remove('is-out');
      const t = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      core.style.transform = t;
      label.style.transform = t;
    });
    document.documentElement.addEventListener('mouseleave', () => cur.classList.add('is-out'));

    const HOT = 'a, button, [data-agent-id], .drag-scroll, .trio-panel:not(.is-active), .creed-row, .diff-row, .stat-item';
    const LABELS = {
      story: { en: 'Read story', tr: 'Hikâyeyi oku' },
      drag:  { en: 'Drag', tr: 'Sürükle' },
      send:  { en: 'Send', tr: 'Gönder' },
      open:  { en: 'Open', tr: 'Aç' },
      go:    { en: 'Go', tr: 'Git' }
    };
    document.addEventListener('mouseover', e => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      cur.classList.toggle('is-text', !!t.closest('input, textarea, select'));
      const hot = t.closest(HOT);
      cur.classList.toggle('is-hover', !!hot);
      let key = null;
      if (hot) {
        if (t.closest('[data-agent-id]')) key = 'story';
        else if (t.closest('.cf-submit')) key = 'send';
        else if (t.closest('a[href]')) key = 'go';
        else if (t.closest('.trio-panel')) key = 'open';
        else if (t.closest('.drag-scroll')) key = 'drag';
      }
      cur.classList.toggle('has-label', !!key);
      if (key) label.textContent = LABELS[key][root.lang === 'tr' ? 'tr' : 'en'];
    });

    document.addEventListener('mousedown', e => {
      cur.classList.add('is-down');
      for (let i = 0; i < 2; i++) {
        const p = document.createElement('div');
        p.className = 'dc-pulse';
        p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
        document.body.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
      }
    });
    document.addEventListener('mouseup', () => cur.classList.remove('is-down'));
  }

  // panellerin nasil acilacagina (kaydirma ya da uzerine gelme) sahne kodu karar verir
  window.__trioHover = initTrio;
  document.addEventListener('DOMContentLoaded', () => { initRail(); initCreedTilt(); initCursor(); });
})();


/* ═══════════════════════════════════════
   2026-11 · Canli hero, sabitlenen hizmet sahnesi, basliklar
═══════════════════════════════════════ */

(function () {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  const lang = () => (root.lang === 'tr' ? 'tr' : 'en');
  const tr = key => (TRANSLATIONS[lang()] || TRANSLATIONS.en)[key] || TRANSLATIONS.en[key] || '';
  // Sayfa koordinati: gorunme animasyonlarinin gecici kaydirmasindan etkilenmez
  const pageBox = el => {
    let x = 0, y = 0, n = el;
    while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  };


  /* ── 4 · Sabitlenen hizmet sahnesi ──────────────────────── */

  function initPin() {
    const pin = document.querySelector('[data-trio-pin]');
    const trio = pin && pin.querySelector('.trio');
    if (!trio) return;
    const hint = document.querySelector('.trio-hint');
    const panels = Array.from(trio.querySelectorAll('.trio-panel'));
    const navH = parseInt(getComputedStyle(root).getPropertyValue('--nav-h'), 10) || 96;

    // Sahne yalniz yeterince genis ve yuksek ekranda kilitlenir; degilse onceki
    // davranis (uzerine gelince acilma, mobilde alt alta) aynen calisir.
    const fits = () => innerWidth > 900 && innerHeight >= 800 && !reduced;
    if (!fits()) { if (window.__trioHover) window.__trioHover(); return; }

    pin.classList.add('is-pinned');
    trio.classList.remove('is-auto');
    if (hint) { hint.dataset.i18n = 'trio.hint.pin'; hint.textContent = tr('trio.hint.pin'); }

    let top = 0, h = 0;
    function measure() {
      h = Math.min(800, Math.max(620, innerHeight - navH - 44));
      top = navH + Math.max(12, (innerHeight - navH - h) / 2);
      pin.style.setProperty('--trio-h', h + 'px');
      pin.style.setProperty('--trio-top', top + 'px');
      pin.classList.toggle('is-short', innerHeight < 860);
    }
    function update() {
      const r = pin.getBoundingClientRect();
      const span = r.height - h;
      const p = Math.max(0, Math.min(0.9999, (top - r.top) / span));
      const i = Math.floor(p * panels.length);
      panels.forEach((x, k) => {
        x.classList.toggle('is-active', k === i);
        if (k === i) x.style.setProperty('--sp', (p * panels.length - i).toFixed(3));
      });
    }
    // Kapali panele tiklamak o panelin kaydirma konumuna goturur
    panels.forEach((x, k) => {
      const go = () => {
        if (x.classList.contains('is-active')) return;
        const r = pin.getBoundingClientRect();
        const span = r.height - h;
        window.scrollTo({ top: r.top + scrollY - top + span * ((k + 0.12) / panels.length), behavior: 'smooth' });
      };
      x.addEventListener('click', go);
      x.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    measure(); update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', () => { measure(); update(); }, { passive: true });
  }


  /* ── 2 · Parazitten sinyale basliklar ───────────────────── */

  function initScramble() {
    if (reduced) return;
    const heads = document.querySelectorAll('.hero-h1, .services-headline, .process-headline, .army-section-title, .manifesto-display, .signal-h2, .diff-headline, .cta-headline');

    function run(leaf) {
      const final = leaf.textContent;
      const pool = Array.from(final.replace(/\s/g, ''));
      if (pool.length < 2) return;
      const startLang = root.lang;
      const dur = 520 + final.length * 34;
      const t0 = performance.now();
      let last = 0;
      (function tick(now) {
        if (root.lang !== startLang) return;                 // dil degistiyse yeni metne dokunma
        const t = Math.min(1, (now - t0) / dur);
        if (t >= 1) { leaf.textContent = final; return; }
        if (now - last > 45) {
          last = now;
          const fixed = Math.floor(t * final.length);
          let out = '';
          for (let i = 0; i < final.length; i++) {
            out += (i < fixed || /\s/.test(final[i])) ? final[i] : pool[(Math.random() * pool.length) | 0];
          }
          leaf.textContent = out;
        }
        requestAnimationFrame(tick);
      })(t0);
    }
    function play(h) {
      h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
      const leaves = h.querySelectorAll('[data-i18n]');
      (leaves.length ? leaves : [h]).forEach((leaf, i) => {
        if (leaf.children.length) return;                    // yalniz duz metin tasiyan ogeler
        setTimeout(() => run(leaf), i * 160);
      });
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        setTimeout(() => play(e.target), e.target.classList.contains('hero-h1') ? 700 : 120);
      });
    }, { threshold: 0.45 });
    heads.forEach(h => io.observe(h));
  }


  /* ── 3 · Canli hero ─────────────────────────────────────── */

  function initHeroLive() {
    const hero = document.querySelector('.hero');
    const host = document.querySelector('.hero-parallax');
    const fog = document.querySelector('.hero-pax-fog');
    if (!hero || !host || reduced) return;

    const cv = document.createElement('canvas');
    cv.id = 'hero-live';
    cv.setAttribute('aria-hidden', 'true');
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;                                         // WebGL yoksa sabit gorsel kalir

    const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const FS = `
      precision mediump float;
      uniform vec2 r; uniform float t;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
      float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return s;}
      void main(){
        vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
        // yavasca akan bulut: imlecten bagimsiz, hic bukulmez
        vec2 q=p*1.55+vec2(t*.030,-t*.018);
        vec2 w=vec2(fbm(q+vec2(0.,t*.05)),fbm(q+vec2(5.2,1.3)-t*.04));
        float f=fbm(q+2.3*w);
        float cloud=smoothstep(.40,.95,f);
        vec3 col=mix(vec3(.62,.09,.04),vec3(.94,.62,.02),smoothstep(.48,.9,f))*cloud*.50;
        col+=vec3(1.,.78,.36)*pow(cloud,5.)*.55;
        gl_FragColor=vec4(col,1.);
      }`;
    function sh(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const pr = gl.createProgram();
    gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {}; ['r', 't'].forEach(k => { U[k] = gl.getUniformLocation(pr, k); });

    host.insertBefore(cv, fog || null);

    const SCALE = 0.5;                                       // yari cozunurluk: bulut zaten yumusak, pil dostu
    let W = 0, H = 0;
    let visible = true, raf = 0;
    function resize() {
      W = Math.max(2, Math.round(hero.clientWidth * SCALE));
      H = Math.max(2, Math.round(hero.clientHeight * SCALE));
      cv.width = W; cv.height = H;
      gl.viewport(0, 0, W, H);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function frame(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      const t = now / 1000;
      gl.uniform2f(U.r, W, H);
      gl.uniform1f(U.t, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }
    const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };
    new IntersectionObserver(es => { visible = es[0].isIntersecting; kick(); }).observe(hero);
    document.addEventListener('visibilitychange', kick);
    kick();
    requestAnimationFrame(() => cv.classList.add('is-on'));
    initEmbers(hero, host, fog);
  }

  // Kivilcim: yukari suzulen korlar; imlece yaklasinca yavasca kenara cekilirler
  function initEmbers(hero, host, fog) {
    const cv = document.createElement('canvas');
    cv.id = 'hero-embers';
    cv.setAttribute('aria-hidden', 'true');
    host.insertBefore(cv, fog || null);
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, mx = -999, my = -999, visible = true, raf = 0;
    const P = [];
    const seed = (p, fresh) => {
      p.x = Math.random() * W; p.y = fresh ? Math.random() * H : H + 10;
      p.vy = -(.12 + Math.random() * .38); p.sway = Math.random() * 6.28; p.r = .6 + Math.random() * 1.7;
      p.a = .25 + Math.random() * .6; p.ox = 0; p.oy = 0;
    };
    function resize() {
      W = cv.width = hero.clientWidth; H = cv.height = hero.clientHeight;
      const want = Math.round(Math.min(110, W / 13));
      while (P.length < want) { const p = {}; seed(p, true); P.push(p); }
      P.length = want;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    hero.addEventListener('mousemove', e => { const b = hero.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; });
    hero.addEventListener('mouseleave', () => { mx = my = -999; });
    function frame() {
      raf = 0;
      ctx.clearRect(0, 0, W, H);
      if (!visible || document.hidden) return;
      ctx.globalCompositeOperation = 'lighter';
      for (const p of P) {
        p.sway += .012;
        p.y += p.vy; p.x += Math.sin(p.sway) * .18;
        const dx = p.x + p.ox - mx, dy = p.y + p.oy - my, d = Math.hypot(dx, dy);
        const push = d < 150 ? (1 - d / 150) * 26 : 0;         // yumusak itme, sicrama yok
        p.ox += ((d ? dx / d : 0) * push - p.ox) * .05;
        p.oy += ((d ? dy / d : 0) * push - p.oy) * .05;
        if (p.y < -12) seed(p, false);
        const fade = Math.min(1, (H - p.y) / 160) * Math.min(1, p.y / 220);
        ctx.fillStyle = `rgba(255,${150 + Math.round(p.a * 70)},60,${(p.a * fade).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgba(240,140,20,${(p.a * fade * .18).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x + p.ox, p.y + p.oy, p.r * 4, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    new IntersectionObserver(es => { visible = es[0].isIntersecting; kick(); }).observe(hero);
    document.addEventListener('visibilitychange', kick);
    kick();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPin();
    initHeroLive();
    initScramble();
  });
})();
