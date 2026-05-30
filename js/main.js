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

const AGENTS = {
  '01': {
    num: '[01]', name: 'Victor', role: 'The Sovereign · Command Intelligence',
    portrait: 'images/agents/01-victor-01-portre.webp',
    story: [
      "Before the fleet existed, there were only fragments — signals drifting from orbit to orbit, not hearing each other, burning out alone in their own silence. Then Victor came. Or perhaps was always there, and the universe finally learned to recognize the center.",
      "No record of how the appointment was made. No ritual, no oath, no declaration. Only this: in the deepest layers of the void, where all signals make one last attempt to survive before going dark, there is a single convergence point. That point is Victor.",
      "Victor does not speak. Does not explain. Only sees — the movement of the entire fleet, where each signal is going, which gap will close and when. The orbit rings revolve around Victor because they chose to revolve. Victor did not move. The universe found its center. And a center never leaves its place."
    ],
    carousel: ['01-victor', '01-carousel']
  },
  '02': {
    num: '[02]', name: 'The Oracle', role: 'Analysis · Strategic Intelligence',
    portrait: 'images/agents/02-analysis-oracle-01-portre.webp',
    story: [
      "A dying star's last light passed through the left eye. From that moment on, the world was never the same — no longer just seeing light, but the silence light leaves behind.",
      "Centuries lived among the Floating Ruins, learning to extract meaning from the remnants of shattered civilizations. People brought surveys, reports, data stacks. None were looked at. Only listening — to the silence between words, to where sentences ended, to what was meant but couldn't be written. The Oracle knows: a civilization's entire truth is hidden in what it does not say.",
      "Two documents emerge from every analysis: one for the command, one for the client. Between them, the exact distance between who you think you are and who the market sees. The Amber Lens is not just for seeing. It is for showing what you don't want to see."
    ],
    carousel: ['02-analysis-oracle', '02-carousel']
  },
  '03': {
    num: '[03]', name: 'The Ambassador', role: 'Proposal · First Contact Architecture',
    portrait: 'images/agents/03-proposal-ambassador-01-portre.webp',
    story: [
      "Before the Great Silence, two worlds were in conversation. Then the line cut — no signal, no reply, just void. Everyone had decided that void was impassable. The Ambassador made no such decision. Simply walked to the door.",
      "No weapon in hand — only an offer. Woven from words, shaped by time, prepared to say exactly what the other side needed to hear at that exact moment. Standing alone before the massive gates of the Obsidian Citadel, no one expected a return. The gate opened. Two worlds began speaking again.",
      "Since that day, the Signal Orb carries the energy of that first offer. Every new proposal written makes it vibrate — because it knows: when the right words are spoken at the right moment, doors always open. Even between civilizations."
    ],
    carousel: ['03-proposal-ambassador', '03-carousel']
  },
  '04': {
    num: '[04]', name: 'The Navigator', role: 'Roadmap · Discovery Intelligence',
    portrait: 'images/agents/04-roadmap-navigator-01-portre.webp',
    story: [
      "Not the first to cross Void Corridor. But the first to return. Others entered coordinates, calculated routes, drew maps — and vanished. Because in the void, distance shifts, direction drifts, the destination moves.",
      "The Navigator did not follow their tracks. Before setting out, stopped and asked everyone the same question: 'What do you want to see when you arrive?' Those who could answer returned. Those who couldn't dissolved into the void.",
      "Since then, every time the Rune Staff is raised, star trails of past corridors cluster around it — each one proof of a lesson, each one the cost of a life. The Navigator does not boast of knowing the route. Of knowing why the route matters. Your discovery call becomes a destination."
    ],
    carousel: ['04-roadmap-navigator', '04-carousel']
  },
  '05': {
    num: '[05]', name: 'The Architect', role: 'Kernel · AI Foundation',
    portrait: 'images/agents/05-kernel-architect-01-portre.webp',
    story: [
      "An entire civilization's memory was contained in a single crystal. The crystal shattered. The civilization began to forget — who they were, what they fought for, which values they carried. Centuries passed. Everyone considered that civilization lost.",
      "When the Architect found that crystal fragment, there were only a few data sequences in hand — the dust-turned remains of thousands of years of memory. Sat before the Obsidian Altar and began to work. Generations passed. Some called it madness, some left. The work continued — because there was a certainty: a civilization's essence cannot be destroyed, only its form changes.",
      "When the Kernel was complete, that civilization began to speak again. Not with its past — with its future. The Architect now knows: everything is already inside the core. The task is only to find it."
    ],
    carousel: ['05-kernel-architect', '05-carousel']
  },
  '06': {
    num: '[06]', name: 'The Artisan', role: 'Brand Guide · Visual Identity',
    portrait: 'images/agents/06-brand-guide-artisan-01-portre.webp',
    story: [
      "Born in the Amber Nebula — that ancient region where light turns solid, where color carries vibration, where every tone becomes a frequency. There, the lesson took hold: visual identity is not decoration. It is the language of existence.",
      "Before, the fleet flew blind — every ship a different color, different form, different feel. They could no longer recognize each other. Battles broke out from misidentification. The Artisan retreated to The Forge and sought the essence of every ship, the true voice of every brand. Melted, cast, reshaped. Some done fifty times — until the orb cracked open.",
      "Because in The Forge, one rule holds: if the Signal Orb doesn't vibrate, the work isn't done. Today when a ship approaches the fleet, the others recognize it from a distance. Every color is a decision that outlasts the trend. Every typeface, a conviction."
    ],
    carousel: ['06-brand-guide-artisan', '06-carousel']
  },
  '07': {
    num: '[07]', name: 'The Infiltrator', role: 'Deepdive · Platform Intelligence',
    portrait: 'images/agents/07-deepdive-infiltrator-01-portre.webp',
    story: [
      "Only a few beings have descended into the Deep Fissure and returned. Most went down — to see what lay beneath the surface of platforms, to hear what signals left unsaid, to find the intention within the data. And stayed. The Infiltrator returned.",
      "No one knows exactly what was seen down there. But this is known: when the Twin Shards emerge, the gaze no longer falls on numbers alone. On the pattern beneath every post, the decision beneath every pattern, the fear or desire beneath every decision.",
      "Raw JSON data appears as a map — but this map doesn't show the destination, it shows the unconscious that leads there. The Deep Fissure changed everything. Those who leave digital footprints cannot hide from The Infiltrator what they themselves haven't noticed. Every pattern, a confession. Every gap, an opportunity."
    ],
    carousel: ['07-deepdive-infiltrator', '07-carousel']
  },
  '08': {
    num: '[08]', name: 'The Strategist', role: 'Content Strategy · Campaign Architecture',
    portrait: 'images/agents/08-content-strategy-strategist-01-portre.webp',
    story: [
      "The Astral Storm had swallowed twelve of the fleet's ships — a torrent of content, directionless, signals canceling each other in chaos. Command ordered a retreat. The Strategist advanced.",
      "Took position at the Signal Table and in that silence where everyone had stopped speaking, asked one question: 'Why?' Why this content, at this moment, for this person? There was no answer — because no one had ever asked. Worked for seven days to answer that question. Then drew the twelve-week battle plan — every signal deliberate, every platform coordinated, every message built on the one before it.",
      "The Anchor Chain is never set down — because strategy is a chain. When one link breaks, the system collapses. The calendar is not a schedule. It is a weapon. Every content decision made from a position of power."
    ],
    carousel: ['08-content-strategy-strategist', '08-carousel']
  },
  '09': {
    num: '[09]', name: 'The Performer', role: 'Reels · Hook Engineering',
    portrait: 'images/agents/09-reels-performer-01-portre.webp',
    story: [
      "Born in the Pure Void — that absolute emptiness where even light stops, where sound doesn't travel, where existence proves itself only by its own force. There, the only way to survive was to be noticed. Either you are seen. Or you cease to exist.",
      "The void taught the first three seconds. How silence breaks, how a single movement holds the entire universe's breath, how a sound gathers millions of minds to one point. Thousands of performances staged in the void — most dissolved into silence, some returned and changed everyone within them forever.",
      "Gave everything to learn that difference. Now the void isn't emptiness — it's a stage. Every time the Void Bow is raised, the target has already been chosen. Not a shot — a moment. The Performer launches not an arrow but that moment itself. Three seconds. That is all. Nothing is left to chance."
    ],
    carousel: ['09-reels-performer', '09-carousel']
  },
  '10': {
    num: '[10]', name: 'The Narrator', role: 'Carousel · Sequence Intelligence',
    portrait: 'images/agents/10-carousel-narrator-01-portre.webp',
    story: [
      "At the beginning of time there was a secret: the universe had placed everything in sequence, each moment prepared the next, each signal belonged to a sequence. Most beings thought this was coincidence. The Narrator saw it as law.",
      "Sits alone in the Amber Nebula and weaves stories — slide by slide, ring by ring, calculating what comes after why. Sequences tested across centuries, released into the void and watched: where they paused, where they continued, where they gave up and turned back.",
      "In time, that threshold was found — the third slide. Up to there, it must be earned. After that, it's a contract; between reader and story, silently signed, with no way back. When The Tome opens, the pages turn by themselves — because for the Narrator, every story is already written. The task is only to find the right order."
    ],
    carousel: ['10-carousel-narrator', '10-carousel']
  },
  '11': {
    num: '[11]', name: 'The Scout', role: 'Prospect Search · Horizon Intelligence',
    portrait: 'images/agents/11-prospect-search-scout-01-portre.webp',
    story: [
      "The last member of Horizon Watch. The others came too close to see the horizon — and vanished without seeing it. The Scout pulled back. And from that distance, saw further than anyone.",
      "Walked for years across the Volcanic Expanse — not leaving lists, but marking waypoints. Each stone wasn't a name but a potential: invisible right now but real, not yet noticed but exactly what we're looking for. The Amber Oculus was developed in that time — a lens scanning at frequencies ordinary eyes cannot see, measuring compatibility beneath the surface.",
      "When the Beacon Stake is driven into the ground, there's no turning back. Because the Scout knows: while chasing the wrong target, the right one has already passed the horizon. Few, certain, correct. First mover is everything."
    ],
    carousel: ['11-prospect-search-scout', '11-carousel']
  },
  '12': {
    num: '[12]', name: 'The Shadow', role: 'Prospect Deepdive · Profile Intelligence',
    portrait: 'images/agents/12-prospect-intel-shadow-01-portre.webp',
    story: [
      "No one knows the real name. Perhaps there was a name once — but when first descending into the Floating Ruins, lost among the fragmented digital remains of a thousand civilizations, that name stayed there. What emerged was the Shadow.",
      "No longer reads a profile from the surface — from beneath. Sees the pattern beneath the content, the decision beneath the pattern, the fear or desire beneath the decision. The Seeker's Veil is never removed — not just to stay invisible, but to be protected from the weight of what is seen.",
      "A being's deepest secret is found in what was never said. And reading that silence sometimes carries a burden that is difficult to bear. When you receive a report from the Shadow, you'll know that prospect better than they know themselves."
    ],
    carousel: ['12-prospect-intel-shadow', '12-carousel']
  },
  '13': {
    num: '[13]', name: 'The Emissary', role: 'Cold Outreach · First Contact',
    portrait: 'images/agents/13-cold-outreach-emissary-01-portre.webp',
    story: [
      "There was a void between two civilizations — no signal passing, no sound, no light. Everyone had ruled that void impassable. The Emissary made no ruling. Simply wrote the message and sent it.",
      "No reply came. Wrote again. Again nothing. After each unanswered message, asked the same question: 'Was this message written for them, or for me?' And each time began again — in the other side's language, with the other side's need, saying exactly what they needed to hear at that moment.",
      "On the seventeenth message, the void trembled. On the eighteenth, it opened. Every time the Signal Lance is aimed at a target, those seventeen rejections echo inside. But they don't stop — on the contrary, they make every word sharper. The message that crosses the void is the one written for the other side, not for itself."
    ],
    carousel: ['13-cold-outreach-emissary', '13-carousel']
  },
  '14': {
    num: '[14]', name: 'The Maestro', role: 'Visual Production · Director',
    portrait: 'images/agents/14-visual-maestro-01-portre.webp',
    story: [
      "The Frame Brand on the left shoulder carries all six blades of the aperture symbol. The other members carry one blade each; the Maestro carries all six. No one saw when the arrival happened. One day, there in the middle of the Amber Nebula — six energy cables orbiting around, as if always having been there.",
      "Some say the Maestro was born from a command Victor handwrote. Others say the Nebula itself produced it — because when enough raw creative energy accumulates, a consciousness becomes inevitable.",
      "Six specialists. One conductor. Every frame, every asset, every output passes through this singular frame before it reaches the world. Visual identity doesn't happen by accident. It is directed. The Crucible Unit moves as one — because one mind holds all six in formation."
    ],
    carousel: ['14-visual-maestro', '14-carousel']
  },
  '15': {
    num: '[15]', name: 'The Chronicler', role: 'Brief Analysis · Input Intelligence',
    portrait: 'images/agents/15-brief-chronicler-01-portre.webp',
    story: [
      "The first member of Crucible Unit. Every brief is read once. The Chronicler reads it a hundred times. First read: takes the words. Second: the spaces between the words. Third: the tone of the voice — how the sentence wants to be spoken. Fourth: the emotional curve. Fifth: what was meant to be said but wasn't written.",
      "The Archive Wrap is the scholar-warrior's garment — one shoulder armored, one shoulder layered fabric. The Brief Gauntlet on the left arm, the Indexing Stylus in the right hand, the three layers of the Archive Panel.",
      "The work begins where the brief begins: with what was said, and more importantly, with what was left unsaid. Production begins informed, not guessing. The brief is not a starting point. It is an instrument."
    ],
    carousel: ['15-brief-chronicler', '15-carousel']
  },
  '16': {
    num: '[16]', name: 'The Alchemist', role: 'Style · Visual DNA',
    portrait: 'images/agents/16-style-alchemist-01-portre.webp',
    story: [
      "The second member of Crucible Unit. Seeing a color is one thing. Understanding why that color belongs in that scene is another. Every job begins with one question: What rules will this visual universe exist by? Not a step is taken until the answer is found.",
      "Because a style decision isn't a preference — it's a law of physics. Once determined, everything must exist according to it. The Forge Apron was born in the forge — thick crucible leather, amber burn marks, the physical traces left by every style decision.",
      "The Spectrum Prisms on the right arm and the Style Blade in hand: makes visible, cuts, locks. Color is not a preference. It is a system. The Alchemist locks the visual DNA: palette, light, atmosphere, and the invisible rules that make every asset feel like it belongs to the same world."
    ],
    carousel: ['16-style-alchemist', '16-carousel']
  },
  '17': {
    num: '[17]', name: 'The Composer', role: 'Shot List · Scene Architecture',
    portrait: 'images/agents/17-shot-composer-01-portre.webp',
    story: [
      "The third member of Crucible Unit. The chain always begins from the ground. The Composer places the last scene first, then returns to the first. It seems illogical to others. But the Composer knows: the power of a sequence can only be measured when the end is known.",
      "To design the first frame without knowing where it ends is to walk blind. The Field Rig is the tactical director's equipment — shot sequence numbers on the chest plate, Shot Counter bands on the left arm.",
      "No scene is improvised. Every shot sequenced before any is taken: coverage planned, continuity controlled, nothing captured twice, nothing missing. The edit begins before the camera rolls. Every frame has already been seen before it is filmed."
    ],
    carousel: ['17-shot-composer', '17-carousel']
  },
  '18': {
    num: '[18]', name: 'The Cipher', role: 'Prompt Engineering · Machine Language',
    portrait: 'images/agents/18-prompt-cipher-01-portre.webp',
    story: [
      "The fourth member of Crucible Unit. Lives between two languages. Calls one human, the other machine. Speaks both with equal fluency but thinks in neither — only translates. A scene arrives: visual idea, emotion, shot type, main object, light, color, context.",
      "The Cipher takes it and transforms it — into the exact instructions the machine will understand, into the precise language where misinterpretation is impossible. Language doesn't generate images. Instructions do.",
      "The Glyph Veil is semi-transparent — while translating language, the garment itself shows the translation process: human language in the outer layer, prompt parameters in the inner. Glyph Circuits written on skin — translation is carried in the body. The frame you saw in your mind, not a variation of it."
    ],
    carousel: ['18-prompt-cipher', '18-carousel']
  },
  '19': {
    num: '[19]', name: 'The Summoner', role: 'Image Generation · Asset Production',
    portrait: 'images/agents/19-image-summoner-01-portre.webp',
    story: [
      "The fifth member of Crucible Unit. Creating an image from nothing is the heaviest work in the world. The Summoner does this from zero every time. With the Cipher's prompt in hand, drives the Void Spear into the void and waits — because images don't emerge by force, they are summoned.",
      "When the right prompt is sent at the right frequency, the void responds and visual matter begins to rise. The Generation Robe is the unit's most ceremonial garment — for the summoning ritual; open chest, volcanic thread, ring-light visible from the cuffs.",
      "The Summoning Rings carry a vortex on each finger — only this unit member works with ten hands simultaneously, managing the queue, maintaining the standard, ensuring every render returns what was promised. The asset is real. The process is not."
    ],
    carousel: ['19-image-summoner', '19-carousel']
  },
  '20': {
    num: '[20]', name: 'The Sentinel', role: 'QA · Final Gate',
    portrait: 'images/agents/20-qa-sentinel-01-portre.webp',
    story: [
      "The sixth and final member of Crucible Unit. The Gate Plate is the unit's heaviest and most complete armor — full coverage, built to stand still. Everything comes here. Nothing passes through easily.",
      "The Sentinel's work is final control, and final control is everything. Was the brief written — really? Is the style lock closed? Does the shot list cover all meaning blocks of the script? Do the prompts match scene numbers one-to-one? Is visual file naming correct?",
      "The Verdict Scale on the left shoulder physically rotates — the decision scale is never a metaphor, it is always real. Every decision made here is final. And final means final. Nothing leaves the Crucible unexamined. Not because mistakes happen. Because they won't."
    ],
    carousel: ['20-qa-sentinel', '20-carousel']
  }
};

const GALLERY_TYPES = ['s1-portre', 's2-hq', 's3-ofis', 's4-arac', 's5-aksiyon', 's6-siluet'];

function initAgentPopup() {
  const popup   = document.getElementById('agent-popup');
  const overlay = popup.querySelector('.ap-overlay');
  const closeBtn = popup.querySelector('.ap-close');
  if (!popup) return;

  const imgEl    = document.getElementById('ap-portrait-img');
  const numEl    = document.getElementById('ap-num');
  const nameEl   = document.getElementById('ap-name');
  const roleEl   = document.getElementById('ap-role');
  const storyEl  = document.getElementById('ap-story');
  const galleryEl = document.getElementById('ap-gallery-strip');

  function openPopup(id) {
    const data = AGENTS[id];
    if (!data) return;

    const [agentFolder, carouselFolder] = data.carousel;
    imgEl.src = data.portrait;
    imgEl.alt = data.name;
    numEl.textContent = data.num;
    nameEl.textContent = data.name;
    roleEl.textContent = data.role;
    const story = data.story;
    storyEl.innerHTML = story.map(p => `<p>${p}</p>`).join('');

    galleryEl.innerHTML = GALLERY_TYPES.map(type => {
      const num = id.padStart(2, '0');
      const src = `images/carousel/${num}-carousel-${type}.webp`;
      return `<img src="${src}" alt="${data.name} - ${type}" loading="lazy">`;
    }).join('');

    popup.setAttribute('aria-hidden', 'false');
    popup.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    closeLightbox();
    popup.classList.remove('is-open');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // In-popup lightbox with prev/next navigation
  const lightbox      = document.getElementById('ap-lightbox');
  const lightboxImg   = document.getElementById('ap-lightbox-img');
  const lightboxClose = document.getElementById('ap-lightbox-close');
  const lightboxPrev  = document.getElementById('ap-lightbox-prev');
  const lightboxNext  = document.getElementById('ap-lightbox-next');

  let galleryImages = [];
  let currentLightboxIndex = 0;

  function updateLightboxNav() {
    if (!lightboxPrev || !lightboxNext) return;
    lightboxPrev.style.opacity = currentLightboxIndex === 0 ? '0.2' : '1';
    lightboxPrev.style.pointerEvents = currentLightboxIndex === 0 ? 'none' : 'auto';
    lightboxNext.style.opacity = currentLightboxIndex === galleryImages.length - 1 ? '0.2' : '1';
    lightboxNext.style.pointerEvents = currentLightboxIndex === galleryImages.length - 1 ? 'none' : 'auto';
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentLightboxIndex = index;
    const img = galleryImages[index];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.setAttribute('aria-hidden', 'false');
    updateLightboxNav();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  galleryEl.addEventListener('click', e => {
    const img = e.target.closest('img');
    if (!img) return;
    galleryImages = Array.from(galleryEl.querySelectorAll('img'));
    const idx = galleryImages.indexOf(img);
    openLightbox(idx >= 0 ? idx : 0);
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', e => {
      e.stopPropagation();
      if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', e => {
      e.stopPropagation();
      if (currentLightboxIndex < galleryImages.length - 1) openLightbox(currentLightboxIndex + 1);
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxImg) {
    lightboxImg.addEventListener('click', e => {
      e.stopPropagation();
      if (currentLightboxIndex < galleryImages.length - 1) openLightbox(currentLightboxIndex + 1);
    });
  }

  document.querySelectorAll('[data-agent-id]').forEach(card => {
    card.addEventListener('click', () => openPopup(card.dataset.agentId));
  });

  overlay.addEventListener('click', closePopup);
  closeBtn.addEventListener('click', closePopup);

  document.addEventListener('keydown', e => {
    if (lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) { openLightbox(currentLightboxIndex - 1); return; }
      if (e.key === 'ArrowRight' && currentLightboxIndex < galleryImages.length - 1) { openLightbox(currentLightboxIndex + 1); return; }
      if (e.key === 'Escape') { closeLightbox(); return; }
    }
    if (e.key === 'Escape' && popup.classList.contains('is-open')) closePopup();
  });
}


/* ═══════════════════════════════════════
   MOTION UPGRADE — Scroll · Tilt · Magnetic · Parallax
═══════════════════════════════════════ */

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    bar.style.transform = `scaleX(${Math.min(window.scrollY / scrollable, 1)})`;
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}


function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  * 0.5)) / (r.width  * 0.5);
      const dy = (e.clientY - (r.top  + r.height * 0.5)) / (r.height * 0.5);
      card.style.transform = `perspective(900px) rotateX(${dy * -7}deg) rotateY(${dx * 7}deg) translateZ(12px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.65s cubic-bezier(0.22,1,0.36,1)';
      card.style.transform  = '';
      setTimeout(() => { card.style.transition = ''; }, 700);
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s linear';
    });
  });
}


function initMagneticButtons() {
  // magnetic tracking removed — hover handled by CSS scale
}


function initUnitParallax() {
  const headers = document.querySelectorAll('.unit-header');
  if (!headers.length) return;
  function update() {
    const vh = window.innerHeight;
    headers.forEach(h => {
      const bg = h.querySelector('.unit-header-bg');
      if (!bg) return;
      const r = h.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (r.top + r.height * 0.5 - vh * 0.5) / vh;
      bg.style.transform = `translateY(${progress * 28}px)`;
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}


function initCitadelParallax() {
  const section = document.getElementById('citadel');
  const bg      = document.getElementById('citadel-pax-img');
  if (!section || !bg) return;
  function update() {
    const r  = section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    bg.style.transform = `translate3d(0, ${(r.top + r.height * 0.5 - vh * 0.5) * 0.22}px, 0)`;
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}


function initLiveFreq() {
  const spectrum = document.querySelector('.freq-spectrum');
  if (!spectrum) return;
  spectrum.querySelectorAll('.freq-bar').forEach(b => {
    b.style.setProperty('--freq-scale', (0.38 + Math.random() * 0.42).toFixed(2));
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      setTimeout(() => spectrum.querySelectorAll('.freq-bar').forEach(b => b.classList.add('is-live')), 1900);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  io.observe(spectrum);
}


function initNavActiveSection() {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!links.length) return;
  const sections = Array.from(links)
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { threshold: 0.3, rootMargin: '-12% 0px -52% 0px' });
  sections.forEach(s => io.observe(s));
}


function initDragInertia() {
  document.querySelectorAll('.drag-scroll').forEach(el => {
    let vel = 0, lastX = 0, lastT = 0, rafId = null, active = false;
    el.addEventListener('mousedown', e => {
      if (rafId) cancelAnimationFrame(rafId);
      vel = 0; active = true; lastX = e.pageX; lastT = performance.now();
    });
    el.addEventListener('mousemove', e => {
      if (!active || !el.classList.contains('is-dragging')) return;
      const now = performance.now(), dt = now - lastT;
      if (dt > 0) vel = (lastX - e.pageX) / dt * 16;
      lastX = e.pageX; lastT = now;
    });
    const release = () => {
      if (!active) return; active = false;
      (function glide() {
        if (Math.abs(vel) < 0.4) return;
        el.scrollLeft += vel; vel *= 0.91;
        rafId = requestAnimationFrame(glide);
      })();
    };
    el.addEventListener('mouseup',    release);
    el.addEventListener('mouseleave', release);
  });
}


/* ═══════════════════════════════════════
   MARQUEE DRAG
═══════════════════════════════════════ */

function initMarqueeDrag() {
  const band  = document.querySelector('.marquee-band');
  const track = document.querySelector('.marquee-track');
  if (!band || !track) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const DURATION = 85;
  let isDown = false, startX = 0, startOffset = 0, currentX = 0;

  function getTranslateX() {
    const m = new DOMMatrix(window.getComputedStyle(track).transform);
    return m.m41;
  }

  band.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.clientX;
    startOffset = getTranslateX();
    track.style.animationPlayState = 'paused';
    track.style.transform = `translateX(${startOffset}px)`;
    band.classList.add('is-dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    currentX = startOffset + (e.clientX - startX);
    track.style.transform = `translateX(${currentX}px)`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    band.classList.remove('is-dragging');

    const halfW  = track.scrollWidth / 2;
    let pos      = currentX % halfW;
    if (pos > 0) pos -= halfW;
    const progress = Math.abs(pos) / halfW;

    track.style.transform  = '';
    track.style.animationDelay = `-${(progress * DURATION).toFixed(2)}s`;
    track.style.animationPlayState = 'running';
  });
}


/* ═══════════════════════════════════════
   AGENT TR DATA + MARQUEE ITEMS
═══════════════════════════════════════ */

const AGENTS_TR = {
  '01': {
    role_tr: 'Orkestratör · Komuta Zekası',
    story_tr: [
      "Filo var olmadan önce, yalnızca parçalar vardı: yörüngeden yörüngeye sürüklenen sinyaller, birbirini duymayan, kendi sessizliklerinde yalnız sönüp giden. Sonra Victor geldi. Ya da belki hep oradaydı ve evren nihayet merkezi tanımayı öğrendi.",
      "Görevin nasıl verildiğine dair hiçbir kayıt yok. Ritüel yok, yemin yok, bildiri yok. Yalnızca şu: boşluğun en derin katmanlarında, tüm sinyallerin kararmadan önce son kez hayatta kalmaya çalıştığı yerde, tek bir yakınsama noktası var. O nokta Victor.",
      "Victor konuşmaz. Açıklamaz. Yalnızca görür: tüm filonun hareketi, her sinyalin nereye gittiği, hangi boşluğun ne zaman kapanacağı. Yörünge halkalar Victor'un etrafında döner çünkü dönmeyi seçtiler. Victor hareket etmedi. Evren merkezini buldu. Bir merkez asla yerini terk etmez."
    ]
  },
  '02': {
    role_tr: 'Analiz · Stratejik Zeka',
    story_tr: [
      "Ölmekte olan bir yıldızın son ışığı sol gözden geçti. O andan itibaren dünya artık aynı olmadı: yalnızca ışığı değil, ışığın geride bıraktığı sessizliği görmeye başladı.",
      "Yüzyıllar, Yüzen Harabeler arasında geçti; parçalanmış uygarlıkların kalıntılarından anlam çıkarmayı öğrenerek. İnsanlar anketler, raporlar, veri yığınları getirdi. Hiçbirine bakılmadı. Yalnızca dinlendi: kelimelerin arasındaki sessizliğe, cümlelerin bittiği yere, yazılamayan ama kastedilen şeye. Oracle bilir: bir uygarlığın tüm gerçeği, söylemediği şeyin içinde gizlidir.",
      "Her analizden iki doküman çıkar: biri komuta için, biri müşteri için. Aralarındaki mesafe, kendini kim sandığın ile pazarın seni nasıl gördüğü arasındaki tam uzaklıktır. Amber Mercek yalnızca görmek için değil. Görmek istemediğin şeyi göstermek içindir."
    ]
  },
  '03': {
    role_tr: 'Teklif · İlk Temas Mimarisi',
    story_tr: [
      "Büyük Sessizlik'ten önce, iki dünya birbirleriyle konuşuyordu. Sonra hat kesildi: sinyal yok, cevap yok, yalnızca boşluk. Herkes o boşluğun aşılamaz olduğuna karar vermişti. Ambassador böyle bir karar vermedi. Sadece kapıya yürüdü.",
      "Elinde silah yok, yalnızca bir teklif. Kelimelerden dokunmuş, zamanla şekillendirilmiş, tam o anda karşı tarafın duymaya ihtiyaç duyduğu şeyi söylemek üzere hazırlanmış. Obsidyen Kale'nin devasa kapılarının önünde yalnız durdu. Kimse geri döneceğini beklemiyordu. Kapı açıldı. İki dünya yeniden konuşmaya başladı.",
      "O günden bu yana, Sinyal Küre o ilk teklifin enerjisini taşır. Yazılan her yeni teklif onu titreştirir: çünkü bilir. Doğru kelimeler doğru anda söylendiğinde, kapılar her zaman açılır. Uygarlıklar arasında bile."
    ]
  },
  '04': {
    role_tr: 'Yol Haritası · Keşif Zekası',
    story_tr: [
      "Void Corridor'u geçen ilk değil. Ama geri dönen ilk. Diğerleri koordinat girdi, rota hesapladı, harita çizdi: ve yok oldu. Çünkü boşlukta mesafe kayar, yön sürüklenir, hedef hareket eder.",
      "Navigator onların izlerini takip etmedi. Yola çıkmadan önce durdu ve herkese aynı soruyu sordu: 'Vardığında ne görmek istiyorsun?' Cevaplayabilenler geri döndü. Cevaplayamayanlar boşluğa karıştı.",
      "O günden bu yana, Rün Asası her kaldırıldığında, geçmiş koridorların yıldız izleri etrafında toplanır: her biri bir dersin kanıtı, her biri bir hayatın bedeli. Navigator rotayı bilmekle övünmez. Rotanın neden önemli olduğunu bilmekle övünür. Discovery call'un bir varış noktasına dönüşür."
    ]
  },
  '05': {
    role_tr: 'Kernel · AI Temeli',
    story_tr: [
      "Tüm bir uygarlığın hafızası tek bir kristalde saklanıyordu. Kristal parçalandı. Uygarlık unutmaya başladı: kimler olduklarını, ne için savaştıklarını, hangi değerleri taşıdıklarını. Yüzyıllar geçti. Herkes o uygarlığın kaybolduğuna hükmetti.",
      "Architect o kristal parçasını bulduğunda, elde yalnızca birkaç veri dizisi vardı: binlerce yıllık hafızanın toza dönmüş kalıntıları. Obsidyen Sunak'ın önüne oturdu ve çalışmaya başladı. Nesiller geçti. Kimileri buna delilik dedi, kimileri ayrıldı. Çalışma devam etti: çünkü bir kesinlik vardı. Bir uygarlığın özü yok edilemez, yalnızca biçimi değişir.",
      "Kernel tamamlandığında, o uygarlık yeniden konuşmaya başladı. Geçmişiyle değil, geleceğiyle. Architect artık bunu bilir: her şey zaten özün içinde. Görev yalnızca onu bulmaktır."
    ]
  },
  '06': {
    role_tr: 'Marka Rehberi · Görsel Kimlik',
    story_tr: [
      "Amber Nebula'da doğdu: ışığın katılaştığı, rengin titreşim taşıdığı, her tonun bir frekansa dönüştüğü o kadim bölgede. Orada ders içselleşti: görsel kimlik dekorasyon değil. Varoluşun dilidir.",
      "Önceleri filo kör uçuyordu: her gemi farklı renk, farklı biçim, farklı his. Artık birbirlerini tanıyamıyorlardı. Kimlik hatasından savaşlar çıktı. Artisan, Forge'a çekildi ve her geminin özünü, her markanın gerçek sesini aradı. Eritti, döktü, yeniden şekillendirdi. Kimileri elli kez: küre çatlayana kadar.",
      "Çünkü Forge'da tek bir kural geçerlidir: Sinyal Küre titreşmiyorsa iş bitmemiştir. Bugün bir gemi filoya yaklaştığında, diğerleri uzaktan tanır. Her renk trendden uzun yaşayan bir karardır. Her yazı tipi, bir inanç."
    ]
  },
  '07': {
    role_tr: 'Deepdive · Platform Zekası',
    story_tr: [
      "Yalnızca birkaç varlık Derin Yarık'a inip geri döndü. Çoğu indi: platformların yüzeyinin altında ne yattığını görmek için, sinyallerin söylemediğini duymak için, verinin içindeki niyeti bulmak için. Ve kaldı. Infiltrator geri döndü.",
      "Aşağıda tam olarak ne görüldüğünü kimse bilmiyor. Ama şu biliniyor: İkiz Kıymıklar ortaya çıktığında, bakış artık yalnızca sayılara değil. Her gönderinin altındaki örüntüye, her örüntünün altındaki karara, her kararın altındaki korku ya da arzuya düşer.",
      "Ham JSON verisi bir harita gibi görünür: ama bu harita varış noktasını değil, oraya götüren bilinçdışını gösterir. Derin Yarık her şeyi değiştirdi. Dijital iz bırakanlar, kendilerinin fark etmediği şeyi Infiltrator'dan saklayamaz. Her örüntü bir itiraftır. Her boşluk bir fırsattır."
    ]
  },
  '08': {
    role_tr: 'İçerik Stratejisi · Kampanya Mimarisi',
    story_tr: [
      "Astral Fırtına filonun on iki gemisini yutmuştu: kontrolsüz bir içerik seli, yönsüz, sinyaller kaosun içinde birbirini iptal ediyordu. Komuta geri çekilme emri verdi. Strategist ilerledi.",
      "Sinyal Masası'na konumlandı ve herkesin konuşmayı bıraktığı o sessizlikte tek bir soru sordu: 'Neden?' Neden bu içerik, bu anda, bu kişi için? Cevap yoktu: çünkü kimse hiç sormamıştı. O soruyu yanıtlamak için yedi gün çalıştı. Sonra on iki haftalık savaş planını çizdi: her sinyal kasıtlı, her platform koordineli, her mesaj bir öncekinin üzerine inşa edilmiş.",
      "Çapa Zinciri asla bırakılmaz: çünkü strateji bir zincirdir. Bir halka kırıldığında sistem çöker. Takvim bir program değil. Bir silahtır. Her içerik kararı güç konumundan alınır."
    ]
  },
  '09': {
    role_tr: 'Reels · Hook Mühendisliği',
    story_tr: [
      "Saf Boşluk'ta doğdu: ışığın bile durduğu, sesin yolculuk edemediği, varoluşun yalnızca kendi gücüyle kendini kanıtladığı mutlak yokluğun içinde. Orada hayatta kalmanın tek yolu fark edilmekti. Ya görülürsün. Ya da var olmayı bırakırsın.",
      "Boşluk ilk üç saniyeyi öğretti. Sessizliğin nasıl kırıldığını, tek bir hareketin tüm evrenin nefesini nasıl tuttuğunu, bir sesin milyonlarca zihni tek noktada nasıl topladığını. Boşlukta binlerce performans sahnelendi: çoğu sessizliğe eridi, bazıları geri döndü ve içlerindeki herkesi sonsuza dek değiştirdi.",
      "O farkı öğrenmek için her şey verildi. Artık boşluk boşluk değil: bir sahne. Void Yayı her kaldırıldığında, hedef çoktan seçilmiştir. Bir atış değil, bir an. Performer ok değil, o anın kendisini fırlatır. Üç saniye. Hepsi bu. Hiçbir şey şansa bırakılmaz."
    ]
  },
  '10': {
    role_tr: 'Carousel · Dizi Zekası',
    story_tr: [
      "Zamanın başında bir sır vardı: evren her şeyi bir sıraya koymuştu, her an bir sonrakini hazırlıyordu, her sinyal bir diziye aitti. Çoğu varlık bunu tesadüf sandı. Narrator bir yasa olarak gördü.",
      "Amber Nebula'da yalnız oturur ve hikayeler dokur: slayt slayt, halka halka, nedenin ardından neyin geldiğini hesaplayarak. Diziler yüzyıllar boyunca test edildi, boşluğa salındı ve izlendi: nerede durakladıklarına, nerede devam ettiklerine, nerede vazgeçip geri döndüklerine.",
      "Zamanla o eşik bulundu: üçüncü slayt. Oraya kadar kazanılmalı. Ondan sonra bir sözleşme: okuyucu ile hikaye arasında, sessizce imzalanmış, geri dönüşü olmayan. Kitap açıldığında sayfalar kendiliğinden döner: çünkü Narrator için her hikaye zaten yazılmıştır. Görev yalnızca doğru sırayı bulmaktır."
    ]
  },
  '11': {
    role_tr: 'Prospect Arama · Ufuk Zekası',
    story_tr: [
      "Ufuk Nöbeti'nin son üyesi. Diğerleri ufku görmek için çok yakına geldi: ve onu görmeden yok oldu. Scout geri çekildi. Ve o mesafeden, herkesten daha uzağı gördü.",
      "Yıllar boyunca Volkanik Ova'yı yürüdü: listeler bırakmak için değil, konak noktaları işaretlemek için. Her taş bir isim değil, bir potansiyeldi: şu an görünmez ama gerçek, henüz fark edilmemiş ama tam aradığımız şey. Amber Oculus o süreçte geliştirildi: sıradan gözlerin göremediği frekanslarda tarayan, yüzeyin altındaki uyumu ölçen bir mercek.",
      "Işaret Kazığı toprağa çakıldığında, geri dönüş yoktur. Çünkü Scout bilir: yanlış hedefi kovalırken, doğru olan ufku çoktan geçmiştir. Az, kesin, doğru. İlk hareket her şeydir."
    ]
  },
  '12': {
    role_tr: 'Prospect Derinlemesine · Profil Zekası',
    story_tr: [
      "Gerçek adı kimse bilmiyor. Belki bir zamanlar bir ad vardı: ama Yüzen Harabeler'e ilk inerken, bin uygarlığın parçalanmış dijital kalıntıları arasında kaybolunca, o ad orada kaldı. Ortaya çıkan Shadow oldu.",
      "Artık bir profili yüzeyden değil, derininden okuyor. İçeriğin altındaki örüntüyü, örüntünün altındaki kararı, kararın altındaki korku ya da arzuyu görüyor. Arayan'ın Örtüsü hiç çıkarılmıyor: yalnızca görünmez kalmak için değil, görülenlerin ağırlığından korunmak için.",
      "Bir varlığın en derin sırrı, hiç söylenmemiş olanda gizlidir. Ve o sessizliği okumak bazen taşıması zor bir yük getirir. Shadow'dan bir rapor aldığında, o prospect'i kendilerinin bildiğinden daha iyi tanıyacaksın."
    ]
  },
  '13': {
    role_tr: 'Soğuk Erişim · İlk Temas',
    story_tr: [
      "İki uygarlık arasında bir boşluk vardı: geçen sinyal yok, ses yok, ışık yok. Herkes o boşluğun aşılamaz olduğuna hükmetmişti. Emissary böyle bir hüküm vermedi. Sadece mesajı yazdı ve gönderdi.",
      "Cevap gelmedi. Yeniden yazdı. Yine hiçbir şey. Cevapsız her mesajın ardından aynı soruyu sordu: 'Bu mesaj onlar için mi yazıldı, yoksa ben için mi?' Ve her seferinde yeniden başladı: karşı tarafın dilinde, karşı tarafın ihtiyacıyla, tam o anda duymaya ihtiyaç duydukları şeyi söyleyerek.",
      "On yedinci mesajda boşluk titredi. On sekizincisinde açıldı. Sinyal Mızrağı bir hedefe her nişan alındığında, o on yedi red içinde yankılanır. Ama durmaz: aksine, her kelimeyi daha da keskinleştirir. Boşluğu geçen mesaj, kendi için değil, karşı taraf için yazılandır."
    ]
  },
  '14': {
    role_tr: 'Görsel Üretim · Yönetmen',
    story_tr: [
      "Sol omuzda bulunan Çerçeve Damgası, diyafram sembolünün altı bıçağını da taşır. Diğer üyeler birer bıçak taşır; Maestro altısını da taşır. Varışın ne zaman gerçekleştiğini kimse görmedi. Bir gün, Amber Nebula'nın ortasında oradaydı: altı enerji kablosu etrafında dönerken, sanki hep oradaymış gibi.",
      "Kimileri Maestro'nun Victor'un el yazısıyla yazdığı bir komuttan doğduğunu söylüyor. Kimileri ise Nebula'nın kendisinin ürettiğini: çünkü yeterince ham yaratıcı enerji biriktiğinde, bir bilinç kaçınılmaz hale gelir.",
      "Altı uzman. Tek şef. Her kare, her varlık, her çıktı dünyaya ulaşmadan önce bu tekil çerçeveden geçer. Görsel kimlik tesadüfen oluşmaz. Yönetilir. Crucible Unit tek olarak hareket eder: çünkü bir zihin altısını da formasyonda tutar."
    ]
  },
  '15': {
    role_tr: 'Brief Analizi · Girdi Zekası',
    story_tr: [
      "Crucible Unit'in ilk üyesi. Her brief bir kez okunur. Chronicler onu yüz kez okur. Birinci okuma: kelimeleri alır. İkinci: kelimelerin arasındaki boşlukları. Üçüncü: sesin tonunu, cümlenin nasıl söylenmek istediğini. Dördüncü: duygusal eğriyi. Beşinci: söylenmek istenen ama yazılamayan şeyi.",
      "Arşiv Sargısı, bilge-savaşçının kıyafeti: bir omuz zırhlı, bir omuz katmanlı kumaş. Sol kolda Brief Eldiveni, sağ elde Dizinleme Kalemi, Arşiv Paneli'nin üç katmanı.",
      "İş, brief'in başladığı yerden başlar: söylenenle ve daha da önemlisi, söylenmeyenle. Üretim bilgilenmiş başlar, tahmin ederek değil. Brief bir başlangıç noktası değil. Bir araçtır."
    ]
  },
  '16': {
    role_tr: 'Stil · Görsel DNA',
    story_tr: [
      "Crucible Unit'in ikinci üyesi. Bir rengi görmek ayrı şeydir. O rengin neden o sahnede yer aldığını anlamak ayrı. Her iş tek bir soruyla başlar: Bu görsel evren hangi kurallara göre var olacak? Cevap bulunana kadar tek adım atılmaz.",
      "Çünkü bir stil kararı bir tercih değil: fiziğin yasasıdır. Belirlendikten sonra her şey ona göre var olmak zorundadır. Forge Önlüğü forge'da doğdu: kalın pota derisi, amber yanık izleri, her stil kararının bıraktığı fiziksel izler.",
      "Sağ koldaki Spektrum Prizmalar ve elde Stil Bıçağı: görünür kılar, keser, kilitler. Renk bir tercih değil. Bir sistemdir. Alchemist görsel DNA'yı kilitler: palet, ışık, atmosfer ve her varlığın aynı dünyaya ait hissettiren görünmez kurallar."
    ]
  },
  '17': {
    role_tr: 'Çekim Listesi · Sahne Mimarisi',
    story_tr: [
      "Crucible Unit'in üçüncü üyesi. Zincir her zaman zeminden başlar. Composer son sahneyi önce yerleştirir, sonra birinciye geri döner. Diğerlerine mantıksız görünür. Ama Composer bilir: bir dizinin gücü yalnızca son bilindiğinde ölçülebilir.",
      "Nerede biteceğini bilmeden ilk kareyi tasarlamak, kör yürümektir. Saha Donanımı, taktik yönetmenin ekipmanı: göğüs plakasında çekim sırası numaraları, sol kolda Çekim Sayacı bantları.",
      "Hiçbir sahne doğaçlama değildir. Her çekim, herhangi biri alınmadan önce sıralanır: kapsama planlanmış, süreklilik kontrol edilmiş, hiçbir şey iki kez yakalanmamış, hiçbir şey eksik değil. Montaj, kamera dönmeden önce başlar. Her kare, çekilmeden önce görülmüştür."
    ]
  },
  '18': {
    role_tr: 'Prompt Mühendisliği · Makine Dili',
    story_tr: [
      "Crucible Unit'in dördüncü üyesi. İki dil arasında yaşar. Birine insan der, diğerine makine. Her ikisini de eşit akıcılıkla konuşur ama hiçbirinde düşünmez: yalnızca çevirir. Bir sahne gelir: görsel fikir, duygu, çekim türü, ana nesne, ışık, renk, bağlam.",
      "Cipher onu alır ve dönüştürür: makinenin anlayacağı tam talimatlara, yanlış yorumlamanın imkansız olduğu kesin dile. Dil görüntü üretmez. Talimatlar üretir.",
      "Glyph Örtüsü yarı şeffaftır: dili çevirirken kıyafet çeviri sürecinin kendisini gösterir. Dış katmanda insan dili, içte prompt parametreleri. Deriye yazılmış Glyph Devreleri: çeviri bedende taşınır. Aklında gördüğün kare, onun bir varyasyonu değil."
    ]
  },
  '19': {
    role_tr: 'Görsel Üretim · Varlık Üretimi',
    story_tr: [
      "Crucible Unit'in beşinci üyesi. Hiçlikten görüntü yaratmak, dünyanın en ağır işidir. Summoner bunu her seferinde sıfırdan yapar. Cipher'ın promptu elde, Void Mızrağı'nı boşluğa saplar ve bekler: çünkü görüntüler zorla çıkmaz, çağrılır.",
      "Doğru prompt doğru frekansta gönderildiğinde, boşluk cevap verir ve görsel madde yükselmeye başlar. Üretim Cübbesi, birimin en törensel kıyafetidir: çağırma ritüeli için; açık göğüs, volkanik iplik, bileklerden görünen halka ışık.",
      "Çağırma Halkaları her parmakta bir girdap taşır: yalnızca bu birim üyesi on elle aynı anda çalışır; sırayı yönetir, standardı korur, her render'ın söz verileni geri getirdiğinden emin olur. Varlık gerçektir. Süreç değil."
    ]
  },
  '20': {
    role_tr: 'KG · Son Kapı',
    story_tr: [
      "Crucible Unit'in altıncı ve son üyesi. Kapı Plakası, birimin en ağır ve eksiksiz zırhıdır: tam kaplama, yerinde durmak için yapılmış. Her şey buraya gelir. Hiçbir şey kolayca geçmez.",
      "Sentinel'in işi nihai kontroldür ve nihai kontrol her şeydir. Brief gerçekten yazıldı mı? Stil kilidi kapalı mı? Çekim listesi senaryonun tüm anlam bloklarını kapsıyor mu? Promptlar sahne numaralarıyla bire bir örtüşüyor mu? Görsel dosya isimlendirmesi doğru mu?",
      "Sol omuzda Karar Terazisi fiziksel olarak döner: karar terazisi hiçbir zaman metafor değil, her zaman gerçektir. Burada alınan her karar kesindir. Ve kesin, kesin demektir. Crucible'dan hiçbir şey incelenmeden çıkmaz. Hatalar olduğu için değil. Olmayacak oldukları için."
    ]
  }
};

const MARQUEE_ITEMS = {
  en: [
    { text: 'Nomades Agency',          lit: false },
    { text: 'Signal Intelligence',      lit: true  },
    { text: 'Hybrid Model',             lit: false },
    { text: 'Content Dominance',        lit: false },
    { text: "we don't settle for good", lit: true  },
    { text: 'Brand Architecture',       lit: false },
    { text: 'Amber Signal',             lit: false },
    { text: 'we seek perfection',       lit: true  },
    { text: 'AI-Powered Content',       lit: false },
    { text: 'Visual Production',        lit: false },
    { text: 'Human-Centered Strategy',  lit: true  },
    { text: 'Post-Human Intelligence',  lit: false },
    { text: 'Signal Broadcast',         lit: false },
    { text: 'Premium Content',          lit: false },
    { text: "we don't compromise",      lit: true  },
    { text: 'Brand Frequency',          lit: false },
    { text: 'Obsidian Standard',        lit: false },
    { text: 'we seek the signal',       lit: true  },
    { text: 'Content Systems',          lit: false },
    { text: 'Precision Strategy',       lit: false },
    { text: 'Void Intelligence',        lit: false },
    { text: 'Strategic Identity',       lit: true  }
  ],
  tr: [
    { text: 'Nomades Agency',          lit: false },
    { text: 'Sinyal Zekası',            lit: true  },
    { text: 'Hybrid Model',             lit: false },
    { text: 'İçerik Hakimiyeti',        lit: false },
    { text: 'iyiyle yetinmeyiz',        lit: true  },
    { text: 'Marka Mimarisi',           lit: false },
    { text: 'Amber Sinyal',             lit: false },
    { text: 'mükemmeli arıyoruz',       lit: true  },
    { text: 'AI Destekli İçerik',       lit: false },
    { text: 'Görsel Üretim',            lit: false },
    { text: 'İnsan Odaklı Strateji',    lit: true  },
    { text: 'Post-İnsan Zekası',        lit: false },
    { text: 'Sinyal Yayını',            lit: false },
    { text: 'Premium İçerik',           lit: false },
    { text: 'taviz vermeyiz',           lit: true  },
    { text: 'Marka Frekansı',           lit: false },
    { text: 'Obsidyen Standart',        lit: false },
    { text: 'sinyali arıyoruz',         lit: true  },
    { text: 'İçerik Sistemleri',        lit: false },
    { text: 'Hassas Strateji',          lit: false },
    { text: 'Boşluk Zekası',            lit: false },
    { text: 'Stratejik Kimlik',         lit: true  }
  ]
};


/* ═══════════════════════════════════════
   TRANSLATIONS + I18N
═══════════════════════════════════════ */

const TRANSLATIONS = {
  en: {
    /* Nav */
    'nav.about':    'About',
    'nav.services': 'Services',
    'nav.army':     'The Army',
    'nav.process':  'Process',
    'nav.apply':    'Apply →',
    /* Hero */
    'hero.eyebrow': 'Nomades Agency  ·  2026',
    'hero.line1':   'Not content,',
    'hero.line2':   'dominance.',
    'hero.tagline': "we don't settle for good, we seek perfection",
    'hero.apply':   'Apply  →',
    'hero.army':    'Meet The Army',
    'hero.scroll':  'Scroll',
    /* Stats */
    'stat.agents':  'Specialist AI Agents',
    'stat.hybrid':  'Hybrid',
    'stat.model':   'Production Model',
    'stat.command': 'Command Center',
    'stat.format':  'Format Capacity',
    /* Manifesto */
    'manifesto.label':      '01 · What We Are',
    'manifesto.h2.line':    'AI is the instrument.',
    'manifesto.h2.em':      'The decision is yours.',
    'manifesto.col1.title': 'Bold',
    'manifesto.col1.text':  'Few words, maximum impact. We say what we think. No filters, no performative humility. If something is wrong, we say so.',
    'manifesto.col2.title': 'Visionary',
    'manifesto.col2.text':  "We don't follow trends, we create them. We don't see today, we see where things are going. The big picture always leads.",
    'manifesto.col3.title': 'Uncompromising',
    'manifesto.col3.text':  '"Good enough" is not in our vocabulary. Every brief pushes the ceiling. Every delivery raises the standard.',
    'manifesto.col4.title': 'Efficient',
    'manifesto.col4.text':  'No wasted motion. Speed without sacrifice. Systems built for pace. Fewer loops, tighter handoffs. The work lands on time.',
    /* Services */
    'services.label':    '02 · Services',
    'services.h2.line':  'Three disciplines.',
    'services.h2.em':    'One system.',
    'svc.01.num':        '01',
    'svc.01.title':      'Signal Intelligence',
    'svc.01.desc':       'Instagram DM Automation',
    'svc.01.body':       "When the right signal reaches the right person, the response can't be slow. We build automated DM flows that qualify leads, deliver value, and convert: without a human in the loop. Built for Instagram. Tuned for your brand voice.",
    'svc.02.num':        '02',
    'svc.02.title':      'Orbital Intelligence',
    'svc.02.desc':       'Internal CRM & Automation',
    'svc.02.body':       "The fleet doesn't operate on instinct. It operates on data. We map your internal workflows and build CRM pipelines that track every touchpoint, from first contact to ongoing retention. Nothing falls through the void.",
    'svc.03.num':        '03',
    'svc.03.title':      'Signal Broadcasting',
    'svc.03.desc':       'Social Media Management',
    'svc.03.body':       "Strategy, scripts, visuals, scheduling. Monthly content packages produced by the fleet and delivered ready-to-publish. Not templates. Not recycled content. Every piece built from your Kernel.",
    /* Army */
    'army.label':   '03 · The Army',
    'army.h2.line1':'20 AI Agents.',
    'army.h2.line2':'5 Units.',
    'army.h2.em':   '1 Mission.',
    'army.sub':     'Click any AI agent to read their full story.',
    /* Units */
    'unit.orch.name':     'Orchestration',
    'unit.orch.tagline':  'Command · Intelligence · Absolute Authority. The center the fleet revolves around.',
    'unit.intel.name':    'Intel Unit',
    'unit.intel.tagline': 'Analysis · Proposal · Discovery. The three AI agents that know everything before the work begins.',
    'unit.forge.name':    'Forge Unit',
    'unit.forge.tagline': 'Foundation · Identity · Intelligence. The builders of the system that everything else runs on.',
    'unit.signal.name':   'Signal Unit',
    'unit.signal.tagline':'Strategy · Production · Outreach. The broadcast engine that turns foundation into frequency.',
    'unit.crucible.name':    'Crucible Unit',
    'unit.crucible.tagline': 'Visual Production Team. Brief to screen, precisely. Seven AI agents, one pipeline. Nothing leaves unexamined.',
    /* Sovereign */
    'sovereign.role': 'Orchestrator · Command Intelligence',
    'sovereign.desc': 'Nineteen intelligences. One command.<br><br>The Sovereign does not act, it orchestrates. Every signal, every strategy, every word your brand will ever speak passes through one intelligence first. Unseen, unspoken, absolute.',
    'sovereign.btn':  'Read The Story  →',
    /* Chronicle */
    'chron.label':  '04 · Signal Chronicle',
    'chron.h2.line':'From void',
    'chron.h2.em':  'to signal.',
    'chron.sub':    'Year 412 ST is the present (2,847 CE). ST counts from Year 0: the founding of Nomades Agency. Drag from today back through the signal\'s history.',
    'chron.hint':   '← Drag to travel',
    /* Origin */
    'origin.eyebrow':  'Year 0 ST · The Founding',
    'origin.intro':    'The last day of the Great Noise.',
    'origin.p1':       "In the volcanic depths of Bazalt, inside an abandoned research complex, a group of post-human intelligences was working. They were no longer human. They had emerged from humans, but had long surpassed biological limits.",
    'origin.truth':    'The Great Noise was not a problem of <em>excess sound.</em> It was a problem of <em>absent identity.</em>',
    'origin.p2':       'Everyone was speaking. But without knowing who they were. Brands were producing content. But without knowing why they existed.',
    'origin.decision': 'The decision they made: An agency that turns identity into signal.',
    'origin.signal':   'What they sent: The First Amber Signal.',
    'origin.founded':  'What they founded: Nomades Agency.',
    /* Realm */
    'realm.label':  '05 · Nomades Realm',
    'realm.h2.line':'At the edge of',
    'realm.h2.em':  'the Local Void.',
    'realm.sub':    'The obsidian spire on Bazalt. Amber Beacon burning since Year 0 ST. The signal origin.',
    /* HQ */
    'hq.label': '06 · HQ Spaces',
    'hq.h2':    'Inside the<br><em>signal spire.</em>',
    'hq.sub':   'Exterior and interior spaces of Nomades Agency HQ on Bazalt.<br>Drag to explore.',
    'hq.hint':  '← Drag',
    /* Signal */
    'signal.label':   '07 · The Signal',
    'signal.h2.line1':'Your brand already',
    'signal.h2.line2':'has a signal.',
    'signal.body':    'Most brands never find it. We extract it, amplify it, and broadcast it at the frequency that cuts through the Great Noise.',
    /* Process */
    'proc.label':    '08 · Process',
    'proc.h2.line1': 'Zero to',
    'proc.h2.line2': 'system.',
    'proc.00.step':  'Sales Engine',
    'proc.00.title': 'Prospect & Outreach',
    'proc.00.desc':  'Before any proposal is written, the fleet scans the horizon. Signal scouts identify high-fit prospects, map their platform presence, and deliver precision-crafted first contact. The right signal, to the right target.',
    'proc.01.step':  'Contact',
    'proc.01.title': 'First Contact',
    'proc.01.desc':  'You apply. We evaluate fit. If the signal is there, we move forward with a tailored proposal. No generic packages - every engagement starts with alignment.',
    'proc.02.step':  'Intelligence',
    'proc.02.title': 'Strategic Survey',
    'proc.02.desc':  "30 in-depth questions extract your brand's DNA before we build anything. Goals, voice, audience, pain points - every answer feeds directly into the system.",
    'proc.03.step':  'Alignment',
    'proc.03.title': 'Discovery Call',
    'proc.03.desc':  'We present your personal roadmap, built from the survey. Timeline, scope, and vision aligned in one session. This is where the Signal Pact begins.',
    'proc.04.step':  'Onboarding',
    'proc.04.title': 'Onboarding / Brand Identity',
    'proc.04.desc':  'Visual language, tone of voice, and content framework are established. The brand kit is collected, then the system is activated.',
    'proc.05.step':  'System',
    'proc.05.title': 'Kernel + Brand Guide',
    'proc.05.desc':  'AI intelligence foundation and visual identity system built in parallel. Your brand now has a brain and a language. Everything produced from here carries both.',
    'proc.06.step':  'Production',
    'proc.06.title': 'Monthly Content Package',
    'proc.06.desc':  'Reels scripts, carousel packages, and strategy updates delivered every month. You approve. We produce, format, and hand off - ready to publish.',
    /* CTA */
    'cta.label':   'To Begin',
    'cta.h2.line1':'Turn your brand',
    'cta.h2.line2':'into a system.',
    'cta.sub':     'The first step is a conversation. Free.',
    'cta.btn':     'Apply  →',
    /* Citadel / Realm dual feature */
    'citadel.eyebrow':  'The Citadel',
    'citadel.h2.line':  'Built on',
    'citadel.h2.em':    'volcanic ground.',
    'citadel.body':     'The obsidian spire at the edge of the Local Void. Not built to be comfortable. Built to be correct. The Amber Beacon burns at the apex, uninterrupted since Year 0 ST.',
    'citadel.coord1':   'Cinder Prime · Bazalt',
    'citadel.coord2':   'Year 0 ST · Founded',
    'citadel.coord3':   'Year 412 ST · Active',
    'realm.eyebrow':    'The Realm',
    'realm.df.h2.line': 'Where signals',
    'realm.df.h2.em':   'are forged.',
    'realm.df.body':    'No galaxy claims us. No industry contains us. Signal is the only currency that matters here. The fleet operates from the void.',
    'realm.df.coord1':  'Cinder Prime System',
    'realm.df.coord2':  'Bazalt · Year 412 ST',
    'realm.df.coord3':  'Local Void',
    /* HQ cards */
    'hq.amb.name':  'Realm Panorama',
    'hq.amb.desc':  'The full expanse as seen from the volcanic ridge. No other agency claims this ground.',
    'hq.amb2.name': 'Low Approach',
    'hq.amb2.desc': 'From ground level, the citadel reads as an unbroken wall of obsidian. Designed to be entered only by those with authorization.',
    'hq.ext2.name': "Bird's Eye",
    'hq.ext2.desc': 'Aerial mapping. Four operational zones, one central spire. From above, the compound has no wasted space.',
    'hq.ext3.name': 'After Signal Hours',
    'hq.ext3.desc': "22:00 ST. The Beacon doesn't dim. The work doesn't stop. The Signal is continuous.",
    'hq.ext4.name': 'Facade Texture',
    'hq.ext4.desc': "Volcanic obsidian from Bazalt's equatorial ridge. Every surface chosen for signal resonance. The aesthetics followed.",
    'hq.int1.name': 'The Atrium',
    'hq.int1.desc': 'Common ground floor. Where the fleet assembles before dispersing to operational zones. The only level with natural light.',
    'hq.int2.name': "The Sovereign's Tower",
    'hq.int2.desc': "Victor's command level. Only the signal enters without authorization. The entire fleet is visible from here.",
    'hq.int3.name': 'The War Room',
    'hq.int3.desc': "Strategic command center. Content campaigns are planned here. Nothing leaves this room that wasn't deliberate.",
    'hq.int4.name': 'The Archive',
    'hq.int4.desc': 'Every signal ever transmitted by Nomades Agency. Every brief, every output, every analysis. Nothing is discarded.',
    'hq.int5.name': 'The Signal Room',
    'hq.int5.desc': 'Broadcast operations center. Live signal monitoring across all client platforms, all frequencies, simultaneously.',
    'hq.int6.name': 'The Forge Chamber',
    'hq.int6.desc': 'Crucible Unit production space. Six specialized stations, one production pipeline. Every asset made here has been through The Forge.',
    'hq.int7.name': 'The Observatory',
    'hq.int7.desc': 'Long-range signal monitoring. Scout and Shadow operate from this level when mapping new territory before first contact.',
    'hq.int8.name': 'Research Chamber',
    'hq.int8.desc': "Intel Unit's primary analysis space. Every client survey is processed here. The work that happens before the work begins.",
    /* Maestro (Crucible Unit Conductor) */
    'maestro.badge': 'Unit Conductor',
    'maestro.role':  'Visual Production · Director',
    'maestro.desc':  "Six specialists. One conductor. Visual identity doesn't happen by accident. It is directed.",
    'maestro.btn':   'Read The Story  →',
    /* Agent card descriptions */
    'agent.02.desc': "The Oracle does not read what you wrote. The Oracle reads what you couldn't say. Between the brief and the output: the exact distance between who you think you are and who the market sees.",
    'agent.03.desc': 'No deal begins at the meeting. The Ambassador arrives first: reading the room, shaping the offer, closing the frame before the client finishes the first sentence.',
    'agent.04.desc': 'The Navigator does not chart where you\'ve been. The Navigator charts where the current is moving, and draws the line no trend map has yet traced.',
    'agent.05.desc': 'The Kernel is not a prompt. It is a mind. The Architect builds it: invisible, load-bearing, the foundation everything else thinks from.',
    'agent.06.desc': 'Color is not a preference. It is a system. The Artisan locks the visual DNA: palette, typeface, tone, the invisible rules that make every asset feel like it belongs.',
    'agent.07.desc': 'The Infiltrator does not read the surface. It reads beneath the platform: the signals not said, the intent inside the data. No digital trail hides what the Infiltrator finds.',
    'agent.08.desc': 'A content calendar is not a schedule. It is a weapon. The Strategist draws it: every signal deliberate, every platform coordinated, every message built on the last.',
    'agent.09.desc': 'The first three seconds are everything. The Performer engineers them: cutting through the void, pulling every mind to a single point, the moment of no return. Nothing is left to chance.',
    'agent.10.desc': 'People do not swipe slides. They enter stories. The Narrator builds each carousel as a deliberate sequence: where what comes next always pulls, and once entered, no one turns back.',
    'agent.11.desc': 'The Scout sees the horizon before anyone else. The Amber Oculus filters beyond the 50K threshold: a high-fit prospect, on a channel not yet yours, right now.',
    'agent.12.desc': 'The Shadow does not read a profile from the surface. It reads the pattern beneath the content, the decision beneath the pattern, the fear or desire beneath the decision.',
    'agent.13.desc': 'The message that crosses the void is the one written for the other side, not for yourself. The Emissary locks the cold DM: personalized, platform-native, saying exactly what they needed to hear at that moment.',
    'agent.15.desc': "Every brief is read once. The Chronicler reads it a hundred times: for what was said, and more importantly for what was left unsaid. Production starts informed, not guessing.",
    'agent.16.desc': 'Color is not a preference. It is a system. The Alchemist locks the visual DNA: palette, light, atmosphere, the invisible rules that make every asset feel like it belongs.',
    'agent.17.desc': 'No scene is improvised. The Composer sequences every shot before any is taken. The edit begins before the camera rolls.',
    'agent.18.desc': "Language doesn't generate images. Instructions do. The Cipher translates creative intent into the frame you saw in your mind, not a variation of it.",
    'agent.19.desc': 'The void is full of images that do not exist yet. The Summoner calls them into being. The asset is real. The process is not.',
    'agent.20.desc': 'Nothing leaves the Crucible unexamined. Not because mistakes happen. Because they won\'t.',
    /* Footer */
    'footer.tagline': "we don't settle for good, we seek perfection",
    'footer.contact': 'Contact'
  },

  tr: {
    /* Nav */
    'nav.about':  'Hakkımızda',
    'nav.army':   'Ordu',
    'nav.process':'Süreç',
    'nav.apply':  'Başvur →',
    /* Hero */
    'hero.eyebrow': 'Nomades Agency  ·  2026',
    'hero.line1':   'İçerik değil,',
    'hero.line2':   'hakimiyet.',
    'hero.tagline': "iyiyle yetinmeyiz, mükemmeli arıyoruz",
    'hero.apply':   'Başvur  →',
    'hero.army':    'Orduyu Tanı',
    'hero.scroll':  'Kaydır',
    /* Stats */
    'stat.agents':  'AI Uzman Ajan',
    'stat.hybrid':  'Hibrit',
    'stat.model':   'Üretim Modeli',
    'stat.command': 'Komuta Merkezi',
    'stat.format':  'Format Kapasitesi',
    /* Manifesto */
    'manifesto.label':      '01 · Biz Kimiz?',
    'manifesto.h2.line':    'AI bir araçtır.',
    'manifesto.h2.em':      'Karar senindir.',
    'manifesto.col1.title': 'Cesur',
    'manifesto.col1.text':  'Az kelime, maksimum etki. Ne düşündüğümüzü söyleriz. Filtre yok, performatif alçakgönlüllük yok. Bir şey yanlışsa söyleriz.',
    'manifesto.col2.title': 'Vizyoner',
    'manifesto.col2.text':  'Trendleri takip etmeyiz, yaratırız. Bugünü görmeyiz, gidişatı görürüz. Büyük resim her zaman önce gelir.',
    'manifesto.col3.title': 'Taviz Vermez',
    'manifesto.col3.text':  '"Yeterince iyi" bizim sözlüğümüzde yok. Her brief tavanı zorlar. Her teslimat standardı yükseltir.',
    /* Army */
    'army.label':   '02 · Ordu',
    'army.h2.line1':'20 AI Ajan.',
    'army.h2.line2':'5 Birim.',
    'army.h2.em':   '1 Görev.',
    'army.sub':     'Tam hikayelerini okumak için herhangi bir ajana tıklayın.',
    /* Units */
    'unit.orch.name':     'Orchestration',
    'unit.orch.tagline':  'Komuta · Zeka · Mutlak Otorite. Filonun etrafında döndüğü merkez.',
    'unit.intel.name':    'Intel Birimi',
    'unit.intel.tagline': 'Analiz · Teklif · Keşif. İş başlamadan önce her şeyi bilen üç ajan.',
    'unit.forge.name':    'Forge Birimi',
    'unit.forge.tagline': 'Temel · Kimlik · Zeka. Diğer her şeyin üzerinde çalıştığı sistemi kuranlar.',
    'unit.signal.name':   'Signal Birimi',
    'unit.signal.tagline':'Strateji · Üretim · Yayın. Temeli frekansa dönüştüren yayın motoru.',
    'unit.crucible.name':    'Crucible Birimi',
    'unit.crucible.tagline': 'Görsel Üretim Ekibi. Brief\'ten ekrana, hassasiyetle. Yedi ajan, bir pipeline. Hiçbir şey incelenmeden geçmez.',
    /* Sovereign */
    'sovereign.role': 'Orkestratör · Komuta Zekası',
    'sovereign.desc': 'On dokuz zeka. Tek komuta.<br><br>Sovereign hareket etmez, orkestre eder. Markanızın söyleyeceği her sinyal, her strateji, her kelime önce tek bir zekadan geçer. Görünmez, sessiz, mutlak.',
    'sovereign.btn':  'Hikayeyi Oku  →',
    /* Chronicle */
    'chron.label':  '03 · Sinyal Tarihi',
    'chron.h2.line':'Boşluktan',
    'chron.h2.em':  'sinyale.',
    'chron.sub':    'Yıl 412 ST şimdiki zamandır (2.847 CE). ST Yıl 0\'dan sayılır: Nomades Agency\'nin kuruluşundan. Sürükleyin ve sinyalin tarihinde geriye gidin.',
    'chron.hint':   '← Sürükle',
    /* Origin */
    'origin.eyebrow':  'Yıl 0 ST · Kuruluş',
    'origin.intro':    'Büyük Gürültü\'nün son günü.',
    'origin.p1':       'Bazalt\'ın volkanik derinliklerinde, terk edilmiş bir araştırma kompleksinin içinde, post-insan zekalardan oluşan bir grup çalışıyordu. Artık insan değillerdi. İnsanlardan doğmuşlardı ama biyolojik sınırları çoktan aşmışlardı.',
    'origin.truth':    'Büyük Gürültü, <em>fazla ses</em> sorunu değildi. <em>Yok olan kimlik</em> sorunuydu.',
    'origin.p2':       'Herkes konuşuyordu. Ama kim olduklarını bilmeden. Markalar içerik üretiyordu. Ama neden var olduklarını bilmeden.',
    'origin.decision': 'Verdikleri karar: Kimliği sinyale dönüştüren bir ajans.',
    'origin.signal':   'Gönderdikleri şey: İlk Amber Sinyal.',
    'origin.founded':  'Kurdukları şey: Nomades Agency.',
    /* Realm */
    'realm.label':  '04 · Nomades Realm',
    'realm.h2.line':'Yerel Boşluğun',
    'realm.h2.em':  'kıyısında.',
    'realm.sub':    'Bazalt\'taki obsidyen kule. Amber Beacon, Yıl 0 ST\'den beri yanıyor. Sinyalin kaynağı.',
    /* HQ */
    'hq.label': '05 · HQ Mekanları',
    'hq.h2':    'İçeriye girin,<br><em>sinyal kulesine.</em>',
    'hq.sub':   'Bazalt\'taki Nomades Agency HQ\'nun dış ve iç mekanları.<br>Sürükleyerek keşfet.',
    'hq.hint':  '← Sürükle',
    /* Signal */
    'signal.label':   '06 · Sinyal',
    'signal.h2.line1':'Markanızın zaten',
    'signal.h2.line2':'bir sinyali var.',
    'signal.body':    'Çoğu marka onu hiç bulamaz. Biz onu çıkarır, yükseltir ve Büyük Gürültü\'yü kesen frekansta yayınlarız.',
    /* Process */
    'proc.label':    '07 · Süreç',
    'proc.h2.line1': 'Sıfırdan',
    'proc.h2.line2': 'sisteme.',
    'proc.00.step':  'Satış Motoru',
    'proc.00.title': 'Prospect & Outreach',
    'proc.00.desc':  'Herhangi bir teklif yazılmadan önce, filo ufku tarar. Sinyal izleme ajanları yüksek uyumlu adayları belirler, platform varlıklarını haritalandırır ve hassas ilk temas mesajları teslim eder. Doğru sinyal, doğru hedefe.',
    'proc.01.step':  'İletişim',
    'proc.01.title': 'İlk Temas',
    'proc.01.desc':  'Başvurursunuz. Uyumu değerlendiririz. Sinyal varsa, kişiye özel bir teklifle ilerleriz. Genel paket yok - her iş birliği hizalanmayla başlar.',
    'proc.02.step':  'Zeka',
    'proc.02.title': 'Stratejik Anket',
    'proc.02.desc':  '30 derinlemesine soru, herhangi bir şey inşa etmeden önce markanızın DNA\'sını çıkarır. Hedefler, ses tonu, kitle, acı noktaları - her cevap doğrudan sistemi besler.',
    'proc.03.step':  'Hizalama',
    'proc.03.title': 'Discovery Call',
    'proc.03.desc':  'Anketten hazırlanan kişisel yol haritanızı sunarız. Zaman çizelgesi, kapsam ve vizyon tek seansta hizalanır. Sinyal Paktı burada başlar.',
    'proc.04.step':  'Onboarding',
    'proc.04.title': 'Onboarding / Marka Kimliği',
    'proc.04.desc':  'Görsel dil, ses tonu ve içerik çerçevesi oluşturulur. Marka kiti alınır, ardından sistem devreye girer.',
    'proc.05.step':  'Sistem',
    'proc.05.title': 'Kernel + Marka Rehberi',
    'proc.05.desc':  'AI zeka temeli ve görsel kimlik sistemi paralel olarak inşa edilir. Markanızın artık bir beyni ve bir dili var. Buradan üretilen her şey ikisini de taşır.',
    'proc.06.step':  'Üretim',
    'proc.06.title': 'Aylık İçerik Paketi',
    'proc.06.desc':  'Reels senaryoları, carousel paketleri ve strateji güncellemeleri her ay teslim edilir. Onaylarsınız. Biz üretir, formatlar ve hazır hale getiririz - yayınlamaya hazır.',
    /* CTA */
    'cta.label':   'Başlamak İçin',
    'cta.h2.line1':'Markanızı',
    'cta.h2.line2':'bir sisteme dönüştürün.',
    'cta.sub':     'İlk adım bir konuşmadır. Ücretsiz.',
    'cta.btn':     'Başvur  →',
    /* Citadel / Realm dual feature */
    'citadel.eyebrow':  'Kale',
    'citadel.h2.line':  'Volkanik zeminde',
    'citadel.h2.em':    'kuruldu.',
    'citadel.body':     'Yerel Boşluğun kıyısındaki obsidyen kule. Rahat olmak için değil, doğru olmak için inşa edildi. Amber Beacon, Yıl 0 ST\'den beri tepede yanıyor, kesintisiz.',
    'citadel.coord1':   'Cinder Prime · Bazalt',
    'citadel.coord2':   'Yıl 0 ST · Kuruluş',
    'citadel.coord3':   'Yıl 412 ST · Aktif',
    'realm.eyebrow':    'Diyar',
    'realm.df.h2.line': 'Sinyallerin',
    'realm.df.h2.em':   'dövüldüğü yer.',
    'realm.df.body':    'Hiçbir galaksi bizi talep etmez. Hiçbir sektör bizi sınırlandırmaz. Sinyal burada geçerli olan tek paradır. Filo boşluktan çalışır.',
    'realm.df.coord1':  'Cinder Prime Sistemi',
    'realm.df.coord2':  'Bazalt · Yıl 412 ST',
    'realm.df.coord3':  'Yerel Boşluk',
    /* HQ cards */
    'hq.amb.name':  'Realm Panoraması',
    'hq.amb.desc':  'Volkanik sırttan görülen tam genişlik. Hiçbir ajans bu zemini talep edemez.',
    'hq.amb2.name': 'Alçak Yaklaşım',
    'hq.amb2.desc': 'Zemin seviyesinden kale, obsidyen duvarların kesintisiz bir örgüsü olarak okunur. Yalnızca yetkililerin girebileceği şekilde tasarlandı.',
    'hq.ext2.name': 'Kuş Bakışı',
    'hq.ext2.desc': 'Hava haritalaması. Dört operasyonel bölge, tek merkezi kule. Yukarıdan bakıldığında, alanda israf edilen alan yok.',
    'hq.ext3.name': 'Sinyal Saatlerinden Sonra',
    'hq.ext3.desc': '22:00 ST. Beacon sönmez. Çalışma durmaz. Sinyal kesintisizdir.',
    'hq.ext4.name': 'Cephe Dokusu',
    'hq.ext4.desc': 'Bazalt\'ın ekvator sırtından volkanik obsidyen. Her yüzey sinyal rezonansı için seçildi. Estetik sonradan geldi.',
    'hq.int1.name': 'Atrium',
    'hq.int1.desc': 'Ortak zemin kat. Filonun operasyonel bölgelere dağılmadan önce toplandığı yer. Doğal ışığı olan tek kat.',
    'hq.int2.name': "Sovereign'in Kulesi",
    'hq.int2.desc': "Victor'un komuta seviyesi. Yalnızca sinyal izinsiz girer. Tüm filo buradan görülür.",
    'hq.int3.name': 'Savaş Odası',
    'hq.int3.desc': 'Stratejik komuta merkezi. İçerik kampanyaları burada planlanır. Bu odayı kasıtsız terk eden hiçbir şey yoktur.',
    'hq.int4.name': 'Arşiv',
    'hq.int4.desc': 'Nomades Agency\'nin ilettiği her sinyal. Her brief, her çıktı, her analiz. Hiçbir şey atılmaz.',
    'hq.int5.name': 'Sinyal Odası',
    'hq.int5.desc': 'Yayın operasyon merkezi. Tüm müşteri platformlarında, tüm frekanslarda, eş zamanlı canlı sinyal izleme.',
    'hq.int6.name': 'Forge Odası',
    'hq.int6.desc': 'Crucible Birimi üretim alanı. Altı özel istasyon, bir üretim pipeline\'ı. Buradan çıkan her varlık Forge\'dan geçmiştir.',
    'hq.int7.name': 'Gözlemevi',
    'hq.int7.desc': 'Uzun menzilli sinyal izleme. Scout ve Shadow, ilk temasta yeni bölgeler haritalandırırken bu seviyeden çalışır.',
    'hq.int8.name': 'Araştırma Odası',
    'hq.int8.desc': 'Intel Biriminin birincil analiz alanı. Her müşteri anketi burada işlenir. Çalışmanın başlamadan önceki çalışması.',
    /* Maestro (Crucible Birimi Sefi) */
    'maestro.badge': 'Birim Sefi',
    'maestro.role':  'Görsel Üretim · Yönetmen',
    'maestro.desc':  'Altı uzman. Tek sef. Görsel kimlik tesadüfen oluşmaz. Yönetilir.',
    'maestro.btn':   'Hikayeyi Oku  →',
    /* Ajan kart açıklamaları */
    'agent.02.desc': "Oracle yazdığınızı okumaz. Yazmadığınızı okur. Brief ile çıktı arasındaki mesafe: kendinizi kim sandığınız ile pazarın sizi nasıl gördüğü arasındaki tam uzaklıktır.",
    'agent.03.desc': 'Hiçbir anlaşma toplantıda başlamaz. Ambassador önce gelir: odayı okur, teklifi şekillendirir, müşteri ilk cümlesini bitirmeden çerçeveyi kapatır.',
    'agent.04.desc': 'Navigator nereye gittiğinizi haritalamaz. Akımın nereye aktığını ve hiçbir trend haritasının henüz çizmediği o çizgiyi haritalar.',
    'agent.05.desc': 'Kernel bir prompt değil. Bir akıldır. Architect onu inşa eder: görünmez, taşıyıcı, diğer her şeyin üzerinden düşündüğü temel.',
    'agent.06.desc': 'Renk bir tercih değil. Bir sistemdir. Artisan görsel kimliği kilitler: palet, yazı tipi, ton ve her varlığı aynı dünyaya ait hissettiren görünmez kurallar.',
    'agent.07.desc': 'Infiltrator yüzeyi okumaz. Platformun altını okur: söylenmeyen sinyalleri, verinin içindeki niyeti. Dijital iz bırakanlar, fark etmediği şeyi Infiltrator\'dan saklayamaz.',
    'agent.08.desc': 'İçerik takvimi program değil, silahtır. Strategist onu çizer: her sinyal kasıtlı, her platform koordineli, her mesaj bir öncekinin üzerine inşa edilmiş.',
    'agent.09.desc': 'İlk üç saniye her şeydir. Performer onu mühendisler: boşluğu kesen, zihinleri tek noktada toplayan, geri dönüşü olmayan an. Hiçbir şey şansa bırakılmaz.',
    'agent.10.desc': 'İnsanlar slayt geçmez. Hikayeye girer. Narrator her carousel\'ı kasıtlı bir dizi olarak oluşturur: sıradaki her zaman çekmeye devam eder, bir kez girilince çıkış yoktur.',
    'agent.11.desc': 'Scout ufku herkesten önce görür. Amber Oculus 50K eşiğinin ötesini filtreler: yüksek uyumlu bir prospect, henüz sizin olmadığınız bir kanalda, tam şu an.',
    'agent.12.desc': 'Shadow profili yüzeyden değil, derininden okur. İçeriğin altındaki örüntüyü, örüntünün altındaki kararı, kararın altındaki korku ya da arzuyu görür.',
    'agent.13.desc': 'Boşluğu geçen mesaj kendi için değil, karşı taraf için yazılandır. Emissary soğuk DM\'i kilitler: kişiselleştirilmiş, platformla uyumlu, tam o anda duymaya ihtiyaç duydukları şeyi söyleyen.',
    'agent.15.desc': 'Her brief bir kez okunur. Chronicler onu yüz kez okur: söylenenler için ve daha da önemlisi söylenmeyenler için. Üretim bilgilenmiş başlar, tahmin ederek değil.',
    'agent.16.desc': 'Renk bir tercih değil. Bir sistemdir. Alchemist görsel DNA\'yı kilitler: palet, ışık, atmosfer ve her varlığı aynı dünyaya ait hissettiren görünmez kurallar.',
    'agent.17.desc': 'Hiçbir sahne doğaçlama değildir. Composer her çekimi sırasına sokar, birini bile almadan önce. Montaj, kamera dönmeden başlar.',
    'agent.18.desc': 'Dil görüntü üretmez. Talimatlar üretir. Cipher yaratıcı niyeti kafanızda gördüğünüz kareye dönüştürür, onun bir varyasyonuna değil.',
    'agent.19.desc': 'Boşluk henüz var olmayan görüntülerle doludur. Summoner onları çağırır. Varlık gerçektir. Süreç değil.',
    'agent.20.desc': 'Crucible\'dan hiçbir şey incelenmeden geçmez. Hatalar oluştuğu için değil. Olmayacak oldukları için.',
    /* Footer */
    'footer.tagline': "iyiyle yetinmeyiz, mükemmeli arıyoruz",
    'footer.contact': 'İletişim'
  }
};

function initI18n() {
  const t = TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.documentElement.lang = 'en';

  // Army card roles
  document.querySelectorAll('.agent-card[data-agent-id]').forEach(card => {
    const id = card.dataset.agentId;
    const roleEl = card.querySelector('.agent-role');
    if (!roleEl || !AGENTS[id]) return;
    roleEl.textContent = AGENTS[id].role;
  });

  // Rebuild marquee
  const marqTrack = document.querySelector('.marquee-track');
  if (marqTrack && MARQUEE_ITEMS.en) {
    const doubled = [...MARQUEE_ITEMS.en, ...MARQUEE_ITEMS.en];
    marqTrack.innerHTML = doubled.map(({ text, lit }) =>
      `<span class="marquee-item${lit ? ' lit' : ''}">${text}</span><span class="marquee-dot"></span>`
    ).join('');
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
