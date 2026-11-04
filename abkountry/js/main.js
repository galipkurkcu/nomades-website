/* ABKOUNTRY · RAH · etkileşim katmanı (bağımlılıksız, vanilla JS) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Harf karıştırma ---------- */
  const GLYPHS = 'ABÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ#%&*+=?!/<>';
  function scramble(el, text, dur = 650) {
    if (reduced) { el.textContent = text; return; }
    if (el._raf) cancelAnimationFrame(el._raf);
    const start = performance.now();
    const tick = (now) => {
      const p = clamp((now - start) / dur, 0, 1);
      const reveal = Math.floor(p * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < reveal || ch === ' ' || ch === '.' || ch === '\'') out += ch;
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._raf = requestAnimationFrame(tick);
      else el.textContent = text;
    };
    el._raf = requestAnimationFrame(tick);
  }
  $$('[data-scramble]').forEach((el) => {
    const original = el.textContent;
    el.dataset.text = original;
    const host = el.closest('li') || el;
    host.addEventListener('mouseenter', () => scramble(el, original, 420));
  });

  /* ---------- Ön yükleyici ---------- */
  const loader = $('#loader');
  const letters = $$('.loader__word span');
  const countEl = $('#loaderCount');
  const barEl = $('#loaderBar');
  const critical = [
    document.fonts ? document.fonts.load('100px Rye') : Promise.resolve(),
    document.fonts ? document.fonts.load('100px Anton') : Promise.resolve(),
    new Promise((res) => { const i = new Image(); i.onload = i.onerror = res; i.src = 'assets/img/hero-sahne.webp'; }),
  ];
  let ready = false;
  Promise.all(critical).then(() => { ready = true; });
  const loadStart = performance.now();
  const MIN = reduced ? 200 : 1700;
  let shown = 0;
  (function loadTick(now) {
    const t = clamp((now - loadStart) / MIN, 0, 1);
    const target = ready ? t : Math.min(t, 0.86);
    shown = lerp(shown, target, 0.12);
    if (ready && t >= 1 && shown > 0.995) shown = 1;
    const pct = Math.round(shown * 100);
    countEl.textContent = String(pct).padStart(3, '0');
    barEl.style.width = pct + '%';
    const lit = Math.floor(shown * letters.length + 0.001);
    letters.forEach((l, i) => {
      l.classList.toggle('on', i < lit);
      l.classList.toggle('hot', i === lit - 1 && shown < 1);
    });
    if (shown < 1) requestAnimationFrame(loadTick);
    else setTimeout(finishLoad, 250);
  })(loadStart);
  function finishLoad() {
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    startDust();
    setTimeout(() => loader.remove(), 1200);
  }

  /* ---------- İmleç ---------- */
  const cursor = $('#cursor');
  const cursorLabel = $('#cursorLabel');
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const cpos = { x: mouse.x, y: mouse.y };
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  if (finePointer) {
    (function cursorTick() {
      cpos.x = lerp(cpos.x, mouse.x, 0.22);
      cpos.y = lerp(cpos.y, mouse.y, 0.22);
      cursor.style.transform = `translate3d(${cpos.x}px, ${cpos.y}px, 0)`;
      requestAnimationFrame(cursorTick);
    })();
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) { cursorLabel.textContent = t.dataset.cursor; cursor.classList.add('is-big'); }
    });
    // İmleç pencereden ya da gömülü oynatıcıya çıkınca gizlenir, takılı kalmaz
    document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) cursor.style.opacity = '0'; });
    document.addEventListener('mouseover', () => { cursor.style.opacity = '1'; });
    document.addEventListener('pointerout', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t && !t.contains(e.relatedTarget)) cursor.classList.remove('is-big');
    });
  }

  /* ---------- Navigasyon ---------- */
  const nav = $('#nav');
  const burger = $('#burger');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('is-solid', y > 60);
    nav.classList.toggle('is-hidden', y > 400 && y > lastY && !nav.classList.contains('is-open'));
    lastY = y;
  }, { passive: true });
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.nav__links a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = '';
  }));

  /* ---------- Hero: yedi mod, ?hero=klip | imza | ates | isik | tel | kivilcim | toz ----------
     klip     : varsayılan (Boss seçimi 2026-11-04); kliplerden sessiz montaj döngüsü, isim + dinle/izle düğmeleri
     imza     : varsayılan; dergi kapağı tipografisi, harfler sırayla yükselir, imlece hafifçe çekilir, mühürden albüm çalar
     ates     : isim yanar; imleç ateşi körükler ve rüzgârla eğer, tık benzin döker (parlama)
     isik     : imleç yavaş takip eden bir sahne spotu; ışık fotoğrafı renklendirir, harfleri ısıtır, gölge düşürür
     tel      : isim gitar teli gibi yatay şeritlerden oluşur; imleç teli çeker, tık akor basar
     kivilcim : imleç taşlama gibi harfleri kızdırır, kıvılcım saçar
     toz      : ilk sürüm, imleçle dağılıp toplanan toz */
  const canvas = $('#dust');
  const ctx = canvas.getContext('2d');
  const heroEl = $('#hero');
  const HERO_MODES = ['klip', 'imza', 'ates', 'isik', 'tel', 'kivilcim', 'toz'];
  const qMode = new URLSearchParams(location.search).get('hero');
  const heroMode = HERO_MODES.includes(qMode) ? qMode : 'klip';
  document.body.dataset.hero = heroMode;
  const HINTS = finePointer
    ? { klip: '', imza: '', ates: 'İmleçle ateşi körükle · tıkla, benzin dök', isik: 'Sahne ışığı imlecinde', tel: 'İmleçle tellere dokun · tıkla, akor bas', kivilcim: 'İmleci gezdir, kıvılcım saç · tıkla, patlat', toz: 'İmleçle dağıt' }
    : { klip: '', imza: '', ates: 'Dokun, alevlendir', isik: 'Dokun, ışığı taşı', tel: 'Dokun, akor bas', kivilcim: 'Dokun, kıvılcım saç', toz: 'Parmağınla dağıt' };
  const hintEl = $('#heroHint');
  if (hintEl) hintEl.textContent = HINTS[heroMode];
  let dpr = 1, W = 0, H = 0, heroStarted = false;
  const hm = { x: -9999, y: -9999, vx: 0, vy: 0, inside: false };
  heroEl.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (hm.inside) { hm.vx = x - hm.x; hm.vy = y - hm.y; }
    hm.x = x; hm.y = y; hm.inside = true;
  });
  heroEl.addEventListener('pointerleave', () => { hm.inside = false; hm.x = hm.y = -9999; hm.vx = hm.vy = 0; });

  function sizeCanvas() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  // İsmi verilen renkte, ekran çözünürlüğünde ayrı bir tuvale yazar; harf kutusunu da döndürür
  function wordLayer(fill, scale = dpr) {
    const c = document.createElement('canvas');
    c.width = W * scale; c.height = H * scale;
    const o = c.getContext('2d');
    o.setTransform(scale, 0, 0, scale, 0, 0);
    const word = 'ABKOUNTRY';
    let size = Math.min(W * 0.2, H * 0.4);
    o.font = `${size}px Anton`;
    const mw = o.measureText(word).width;
    if (mw > W * 0.92) size *= (W * 0.92) / mw;
    o.font = `${size}px Anton`;
    o.textAlign = 'center'; o.textBaseline = 'middle';
    o.fillStyle = fill;
    o.fillText(word, W / 2, H * 0.48);
    const m = o.measureText(word);
    return { c, o, top: H * 0.48 - m.actualBoundingBoxAscent, bottom: H * 0.48 + m.actualBoundingBoxDescent };
  }

  /* --- İMZA --- (varsayılan; canvas kullanmaz, gerçek yazı + ince hareket) */
  const heroTitle = $('#heroTitle');
  const heroChars = heroTitle ? $$('.ch', heroTitle) : [];
  const heroSeal = $('#heroSeal');
  const charState = heroChars.map(() => ({ x: 0, y: 0, h: 0 }));
  let imzaPx = 0, imzaPy = 0;
  function buildImza() {
    if (heroTitle.classList.contains('is-in')) return;
    requestAnimationFrame(() => {
      heroTitle.classList.add('is-in');
      $('.hero__meta').classList.add('is-in');
      heroSeal.classList.add('is-in');
    });
  }
  function imzaTick() {
    const hr = heroEl.getBoundingClientRect();
    // harfler imlece doğru birkaç piksel çekilir, yakındakiler kora döner
    heroChars.forEach((ch, i) => {
      const s = charState[i];
      const r = ch.getBoundingClientRect();
      const cx = r.left - hr.left + r.width / 2 - s.x, cy = r.top - hr.top + r.height / 2 - s.y;
      let tx = 0, ty = 0, th = 0;
      if (hm.inside && !reduced) {
        const dx = hm.x - cx, dy = hm.y - cy, dist = Math.hypot(dx, dy);
        const f = Math.max(0, 1 - dist / 360);
        tx = clamp(dx * 0.07 * f, -14, 14); ty = clamp(dy * 0.07 * f, -10, 10); th = f * f * 0.85;
      }
      s.x = lerp(s.x, tx, 0.1); s.y = lerp(s.y, ty, 0.1); s.h = lerp(s.h, th, 0.08);
      ch.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
      ch.style.setProperty('--h', s.h.toFixed(3));
    });
    // fotoğraf imlecin tersine hafifçe kayar: derinlik
    const nx = hm.inside ? hm.x / W - 0.5 : 0, ny = hm.inside ? hm.y / H - 0.5 : 0;
    imzaPx = lerp(imzaPx, -nx * 22, 0.05); imzaPy = lerp(imzaPy, -ny * 14, 0.05);
    heroEl.style.setProperty('--px', imzaPx.toFixed(2) + 'px');
    heroEl.style.setProperty('--py', imzaPy.toFixed(2) + 'px');
  }
  if (heroSeal) heroSeal.addEventListener('click', () => togglePlayback());

  /* --- KLİP --- */
  const heroVideo = $('#heroVideo');
  const heroPlay = $('#heroPlay');
  function buildKlip() {
    if (heroEl.classList.contains('is-ready')) return;
    requestAnimationFrame(() => { heroTitle.classList.add('is-in'); heroEl.classList.add('is-ready'); });
    if (!reduced) heroVideo.play().catch(() => {});
    // hero görünmüyorken video durur, işlemci boşa çalışmaz
    new IntersectionObserver((en) => {
      if (reduced) return;
      if (en[0].isIntersecting) heroVideo.play().catch(() => {}); else heroVideo.pause();
    }).observe(heroEl);
  }
  function klipTick() {}
  if (heroPlay) heroPlay.addEventListener('click', () => togglePlayback());

  /* --- ATEŞ --- */
  // Alev parçacıkları önceden çizilmiş yumuşak lekelerle (sprite) basılır; her karede gradyan üretilmez
  function glowSprite(r, g, b, size) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const o = c.getContext('2d');
    const grd = o.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grd.addColorStop(0.35, `rgba(${r},${g},${b},.55)`);
    grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
    o.fillStyle = grd; o.fillRect(0, 0, size, size);
    return c;
  }
  let ates = null;
  function buildAtes() {
    const L = wordLayer('#fff', 1);
    const data = L.o.getImageData(0, 0, W, H).data;
    const alpha = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? 0 : data[(y * W + x) * 4 + 3];
    // alevin çıkacağı noktalar: harflerin üstü boş olan kenar pikselleri
    const edges = [];
    const step = W < 700 ? 2 : 3;
    for (let y = 1; y < H; y += 1) for (let x = 0; x < W; x += step) {
      if (alpha(x, y) > 140 && alpha(x, y - 4) < 40) edges.push([x, y]);
    }
    // harf gövdesi: içten kor gibi ısınan katman (alt kısım turuncu, üst kemik)
    const word = wordLayer('#eadfc8');
    const hot = wordLayer('#fff');
    const ho = hot.o;
    ho.setTransform(1, 0, 0, 1, 0, 0);
    ho.globalCompositeOperation = 'source-in';
    const g = ho.createLinearGradient(0, word.top * dpr, 0, word.bottom * dpr);
    g.addColorStop(0, 'rgba(255,91,46,0)'); g.addColorStop(0.7, 'rgba(255,91,46,0)'); g.addColorStop(1, 'rgba(255,91,46,.75)');
    ho.fillStyle = g; ho.fillRect(0, 0, hot.c.width, hot.c.height);
    const S = W < 700 ? 70 : 120;
    ates = {
      edges, word, hot, parts: [], burst: 0, t: 0, top: word.top, bottom: word.bottom,
      spr: [glowSprite(255, 236, 170, S), glowSprite(255, 150, 50, S), glowSprite(214, 58, 24, S), glowSprite(40, 24, 20, S)],
    };
  }
  function atesTick() {
    const a = ates;
    a.t += 0.016;
    const mobile = W < 700;
    const cap = mobile ? 600 : 1700;
    const R = mobile ? 80 : 140;
    const near = hm.inside && hm.y > a.top - 160 && hm.y < a.bottom + 80;
    const speed = Math.min(Math.abs(hm.vx) + Math.abs(hm.vy), 40);
    // taban alev + imleç yakınında körükleme + tık sonrası parlama
    let n = (mobile ? 9 : 24) + a.burst * (mobile ? 18 : 50);
    for (let k = 0; k < n && a.parts.length < cap; k++) spawnFlame(a, null, 1 + a.burst * 0.8);
    if (near) {
      const extra = (mobile ? 5 : 12) + speed * 0.5;
      for (let k = 0; k < extra && a.parts.length < cap; k++) spawnFlame(a, R, 1.35);
    }
    a.burst *= 0.94;
    hm.vx *= 0.7; hm.vy *= 0.7;
    ctx.clearRect(0, 0, W, H);
    // alev ve duman, harflerin arkasında
    const S = a.spr[0].width;
    for (let i = a.parts.length - 1; i >= 0; i--) {
      const p = a.parts[i];
      p.life -= p.decay;
      if (p.life <= 0) { a.parts.splice(i, 1); continue; }
      const wind = hm.inside ? clamp((p.x - hm.x) / 400, -1, 1) * -0.04 + hm.vx * 0.01 : 0;
      p.vx += Math.sin(p.y * 0.035 + a.t * 3 + p.seed) * 0.06 + wind;
      p.vx *= 0.96; p.vy *= 0.985;
      p.x += p.vx; p.y += p.vy;
    }
    ctx.globalCompositeOperation = 'source-over';
    for (const p of a.parts) {
      if (p.life > 0.35) continue;
      const sz = S * p.size * (1.4 - p.life);
      ctx.globalAlpha = p.life * 0.5;
      ctx.drawImage(a.spr[3], p.x - sz / 2, p.y - sz / 2, sz, sz);
    }
    ctx.globalCompositeOperation = 'lighter';
    for (const p of a.parts) {
      if (p.life <= 0.35) continue;
      const spr = p.life > 0.8 ? a.spr[0] : p.life > 0.55 ? a.spr[1] : a.spr[2];
      const sz = S * p.size * (0.35 + p.life * 0.75);
      ctx.globalAlpha = Math.min(1, (p.life - 0.35) * 1.8) * 0.5;
      ctx.drawImage(spr, p.x - sz / 2, p.y - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
    // kıvılcımlar
    ctx.fillStyle = '#ffd38a';
    for (const p of a.parts) if (p.spark) ctx.fillRect(p.x, p.y, 1.6, 1.6);
    ctx.globalCompositeOperation = 'source-over';
    // harfler alevin önünde: kemik gövde + alttan kor
    ctx.drawImage(a.word.c, 0, 0, a.word.c.width, a.word.c.height, 0, 0, W, H);
    ctx.globalAlpha = 0.8 + Math.sin(a.t * 4) * 0.12 + a.burst * 0.2;
    ctx.drawImage(a.hot.c, 0, 0, a.hot.c.width, a.hot.c.height, 0, 0, W, H);
    ctx.globalAlpha = 1;
  }
  function spawnFlame(a, R, power) {
    let pt;
    if (R) {
      // imlece yakın kenar noktası seç (birkaç denemeyle)
      for (let tries = 0; tries < 6; tries++) {
        const c = a.edges[(Math.random() * a.edges.length) | 0];
        if (Math.abs(c[0] - hm.x) < R) { pt = c; break; }
      }
      if (!pt) return;
    } else pt = a.edges[(Math.random() * a.edges.length) | 0];
    if (!pt) return;
    const spark = Math.random() < 0.035 * power;
    a.parts.push({
      x: pt[0] + (Math.random() - 0.5) * 4, y: pt[1] + 2,
      vx: (Math.random() - 0.5) * 0.5, vy: -(1.3 + Math.random() * 1.9) * power * (spark ? 2 : 1),
      life: 1, decay: spark ? 0.01 : 0.013 + Math.random() * 0.013,
      size: (0.4 + Math.random() * 0.55) * (power > 1.2 ? 1.3 : 1), seed: Math.random() * 6.28, spark,
    });
  }
  function ignite() {
    if (!ates) return;
    ates.burst = 1;
    heroEl.classList.remove('is-strum'); void heroEl.offsetWidth; heroEl.classList.add('is-strum');
  }

  /* --- IŞIK --- */
  let isik = null;
  function buildIsik() {
    const tmp = document.createElement('canvas');
    tmp.width = W * dpr; tmp.height = H * dpr;
    isik = { bone: wordLayer('#eadfc8'), ember: wordLayer('#ff5b2e'), shade: wordLayer('rgba(10,8,7,.6)'), tmp, lx: W * 0.5, ly: H * 0.42, t: 0 };
  }
  function isikTick() {
    const s = isik;
    s.t += 0.004;
    const tx = hm.inside ? hm.x : W * (0.5 + 0.3 * Math.sin(s.t * 1.3));
    const ty = hm.inside ? hm.y : H * (0.45 + 0.1 * Math.sin(s.t * 2.1));
    s.lx = lerp(s.lx, tx, 0.05); s.ly = lerp(s.ly, ty, 0.05);
    heroEl.style.setProperty('--lx', s.lx.toFixed(1) + 'px');
    heroEl.style.setProperty('--ly', s.ly.toFixed(1) + 'px');
    // ışığın düştüğü yerdeki turuncu katman (radyal maske)
    const g = s.tmp.getContext('2d');
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, s.tmp.width, s.tmp.height);
    g.drawImage(s.ember.c, 0, 0);
    g.globalCompositeOperation = 'destination-in';
    const R = Math.max(W, H) * 0.3 * dpr;
    const grd = g.createRadialGradient(s.lx * dpr, s.ly * dpr, 0, s.lx * dpr, s.ly * dpr, R);
    grd.addColorStop(0, 'rgba(0,0,0,1)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd; g.fillRect(0, 0, s.tmp.width, s.tmp.height);
    // gölge ışığın tersine düşer
    const ox = ((W / 2 - s.lx) / W) * 22, oy = ((H * 0.48 - s.ly) / H) * 16;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(s.shade.c, 0, 0, s.shade.c.width, s.shade.c.height, ox * 0.6, oy * 0.6 + 3, W, H);
    ctx.drawImage(s.tmp, 0, 0, s.tmp.width, s.tmp.height, ox, oy, W, H);
    ctx.drawImage(s.bone.c, 0, 0, s.bone.c.width, s.bone.c.height, 0, 0, W, H);
    ctx.globalAlpha = 0.4;
    ctx.drawImage(s.tmp, 0, 0, s.tmp.width, s.tmp.height, 0, 0, W, H);
    ctx.globalAlpha = 1;
  }

  /* --- TEL --- */
  let tel = null;
  function buildTel() {
    const bone = wordLayer('#eadfc8');
    const ember = wordLayer('#ff5b2e');
    const sh = W < 700 ? 2 : 3;
    const y0 = Math.floor(bone.top) - 6;
    const n = Math.ceil((bone.bottom - bone.top + 12) / sh);
    tel = { bone, ember, sh, y0, n, d: new Float32Array(n), v: new Float32Array(n), shake: 0 };
  }
  function pluck(center, amp, spread) {
    for (let i = -spread; i <= spread; i++) {
      const k = center + i;
      if (k >= 0 && k < tel.n) tel.v[k] += amp * (1 - Math.abs(i) / (spread + 1));
    }
  }
  function strum() {
    if (!tel) return;
    const ph = Math.random() * Math.PI * 2, dir = Math.random() < 0.5 ? -1 : 1;
    for (let i = 0; i < tel.n; i++) tel.v[i] += dir * 42 * Math.sin(i * 0.16 + ph) + (Math.random() - 0.5) * 6;
    tel.shake = 16;
    heroEl.classList.remove('is-strum'); void heroEl.offsetWidth; heroEl.classList.add('is-strum');
  }
  function telTick() {
    const t = tel;
    ctx.clearRect(0, 0, W, H);
    if (hm.inside && (Math.abs(hm.vx) + Math.abs(hm.vy)) > 0.5) {
      const R = W < 700 ? 40 : 64;
      const c = Math.round((hm.y - t.y0) / t.sh);
      const span = Math.ceil(R / t.sh);
      for (let i = c - span; i <= c + span; i++) {
        if (i < 0 || i >= t.n) continue;
        const f = 1 - Math.abs(i - c) / (span + 1);
        t.v[i] += clamp(hm.vx, -38, 38) * 0.5 * f + (Math.random() - 0.5) * Math.min(Math.abs(hm.vy), 30) * 0.5 * f;
      }
    }
    hm.vx *= 0.55; hm.vy *= 0.55;
    if (!reduced && Math.random() < 0.014) pluck((Math.random() * t.n) | 0, (Math.random() - 0.5) * 36, 7);
    for (let i = 0; i < t.n; i++) {
      const l = i > 0 ? t.d[i - 1] : t.d[i], r = i < t.n - 1 ? t.d[i + 1] : t.d[i];
      t.v[i] += -0.08 * t.d[i] + 0.24 * (l + r - 2 * t.d[i]);
      t.v[i] *= 0.935;
    }
    let energy = 0;
    for (let i = 0; i < t.n; i++) { t.d[i] += t.v[i]; energy += Math.abs(t.d[i]); }
    energy /= t.n;
    let sx = 0, sy = 0;
    if (t.shake > 0.2) { sx = (Math.random() - 0.5) * t.shake; sy = (Math.random() - 0.5) * t.shake; t.shake *= 0.86; }
    const sh = t.sh, sd = sh * dpr;
    // önce turuncu katmanın tamamı (baskı kayması gibi hafif sola-yukarı, tel titreyince saçak gibi açılır), sonra kemik
    for (let i = 0; i < t.n; i++) {
      const y = t.y0 + i * sh;
      ctx.drawImage(t.ember.c, 0, y * dpr, W * dpr, sd, t.d[i] * 1.9 - 6 + sx, y - 4 + sy, W, sh);
    }
    for (let i = 0; i < t.n; i++) {
      const y = t.y0 + i * sh;
      ctx.drawImage(t.bone.c, 0, y * dpr, W * dpr, sd, t.d[i] + sx, y + sy, W, sh);
    }
    // enerji yüksekken amfi paraziti: rastgele kayan dilimler
    if (energy > 3) {
      const k = Math.min(6, Math.floor(energy / 3));
      for (let j = 0; j < k; j++) {
        const i = (Math.random() * t.n) | 0, hgt = sh * (2 + ((Math.random() * 6) | 0));
        const y = t.y0 + i * sh;
        ctx.drawImage(t.bone.c, 0, y * dpr, W * dpr, hgt * dpr, (Math.random() - 0.5) * energy * 6, y, W, hgt);
      }
    }
  }

  /* --- KIVILCIM --- */
  let embers = [], sparks = [];
  function sampleWord(step) {
    const L = wordLayer('#fff', 1);
    const data = L.o.getImageData(0, 0, W, H).data;
    const pts = [];
    for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 140) pts.push([x + (Math.random() - 0.5) * step * 0.9, y + (Math.random() - 0.5) * step * 0.9]);
    }
    return pts;
  }
  function buildKivilcim() {
    const step = W < 700 ? 3 : 4;
    embers = sampleWord(step).map(([x, y]) => ({ hx: x, hy: y, x, y, vx: 0, vy: 0, h: 0, fly: 0, s: W < 700 ? 1.6 : 2.2 }));
    sparks = [];
  }
  function emitSparks(x, y, n, power) {
    for (let i = 0; i < n && sparks.length < 700; i++) {
      const a = Math.random() * Math.PI * 2, sp = (1 + Math.random() * 5) * power;
      sparks.push({ x, y, vx: Math.cos(a) * sp - hm.vx * 0.25, vy: Math.sin(a) * sp - 2.5 - Math.random() * 2, life: 1, decay: 0.012 + Math.random() * 0.025 });
    }
  }
  function kivilcimTick() {
    ctx.clearRect(0, 0, W, H);
    const R = W < 700 ? 60 : 95;
    const speed = Math.abs(hm.vx) + Math.abs(hm.vy);
    if (hm.inside && speed > 2) emitSparks(hm.x, hm.y, Math.min(10, speed * 0.4) | 0, 1);
    hm.vx *= 0.6; hm.vy *= 0.6;
    const cold = [], warm = [], hot = [];
    for (let i = 0; i < embers.length; i++) {
      const p = embers[i];
      if (p.fly > 0) {
        p.vy += 0.28; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.fly--;
        p.h = Math.max(0, p.h - 0.012);
      } else {
        const dx = p.x - hm.x, dy = p.y - hm.y, d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const dist = Math.sqrt(d2) || 1, f = 1 - dist / R;
          p.h += 0.09 * f;
          if (p.h > 1) {
            p.fly = 35 + ((Math.random() * 45) | 0);
            p.vx = (dx / dist) * (2 + Math.random() * 6) + hm.vx * 0.2;
            p.vy = (dy / dist) * (2 + Math.random() * 4) - 3 - Math.random() * 4;
          }
        }
        p.vx += (p.hx - p.x) * 0.06; p.vy += (p.hy - p.y) * 0.06;
        p.vx *= 0.8; p.vy *= 0.8; p.x += p.vx; p.y += p.vy;
        p.h = Math.max(0, p.h - 0.006);
      }
      (p.h > 0.7 ? hot : p.h > 0.25 ? warm : cold).push(p);
    }
    ctx.fillStyle = 'rgba(234,223,200,.92)';
    for (const p of cold) ctx.fillRect(p.x, p.y, p.s, p.s);
    ctx.fillStyle = '#ff5b2e';
    for (const p of warm) ctx.fillRect(p.x, p.y, p.s, p.s);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = '#ffc46b'; ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (const p of hot) { ctx.moveTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5); ctx.lineTo(p.x + 0.5, p.y + 0.5); }
    ctx.stroke();
    ctx.lineWidth = 1.2;
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.vy += 0.22; s.vx *= 0.99; s.x += s.vx; s.y += s.vy; s.life -= s.decay;
      if (s.life <= 0 || s.y > H) { sparks.splice(i, 1); continue; }
      ctx.strokeStyle = s.life > 0.6 ? 'rgba(255,236,180,' + s.life + ')' : 'rgba(255,91,46,' + s.life + ')';
      ctx.beginPath(); ctx.moveTo(s.x - s.vx * 2.2, s.y - s.vy * 2.2); ctx.lineTo(s.x, s.y); ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* --- TOZ --- */
  let particles = [];
  function buildToz() {
    const step = W < 700 ? 2 : 4;
    const prev = particles;
    particles = sampleWord(step).map(([x, y], i) => {
      const old = prev[i];
      return { hx: x, hy: y, x: old ? old.x : Math.random() * W, y: old ? old.y : H + Math.random() * H * 0.6, vx: 0, vy: 0,
        s: W < 700 ? (Math.random() < 0.1 ? 1.8 : 1.4) : (Math.random() < 0.1 ? 2.8 : 2.1), hot: Math.random() < 0.06, d: 0.04 + Math.random() * 0.05 };
    });
    if (reduced) particles.forEach((p) => { p.x = p.hx; p.y = p.hy; });
  }
  function tozTick() {
    ctx.clearRect(0, 0, W, H);
    const R = W < 700 ? 60 : 110;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = p.x - hm.x, dy = p.y - hm.y, d2 = dx * dx + dy * dy;
      if (d2 < R * R) {
        const dist = Math.sqrt(d2) || 1, f = (1 - dist / R) * 7;
        p.vx += (dx / dist) * f + (Math.random() - 0.5) * 2;
        p.vy += (dy / dist) * f + (Math.random() - 0.5) * 2;
      }
      p.vx += (p.hx - p.x) * p.d; p.vy += (p.hy - p.y) * p.d;
      p.vx *= 0.82; p.vy *= 0.82; p.x += p.vx; p.y += p.vy;
      ctx.fillStyle = p.hot ? '#ff5b2e' : 'rgba(234,223,200,.92)';
      ctx.fillRect(p.x, p.y, p.s, p.s);
    }
  }

  const HERO = { klip: [buildKlip, klipTick], imza: [buildImza, imzaTick], ates: [buildAtes, atesTick], isik: [buildIsik, isikTick], tel: [buildTel, telTick], kivilcim: [buildKivilcim, kivilcimTick], toz: [buildToz, tozTick] };
  function buildHero() { sizeCanvas(); HERO[heroMode][0](); }
  function heroLoop() {
    const r = heroEl.getBoundingClientRect();
    if (r.bottom > 0) HERO[heroMode][1]();
    requestAnimationFrame(heroLoop);
  }
  function startDust() {
    if (heroStarted) return;
    heroStarted = true;
    buildHero();
    requestAnimationFrame(heroLoop);
  }
  heroEl.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button')) return;
    if (heroMode === 'ates') ignite();
    else if (heroMode === 'tel') strum();
    else if (heroMode === 'kivilcim') { emitSparks(hm.x > -999 ? hm.x : W / 2, hm.y > -999 ? hm.y : H / 2, 90, 1.8); heroEl.classList.remove('is-strum'); void heroEl.offsetWidth; heroEl.classList.add('is-strum'); }
  });
  let rT;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { if (heroStarted) buildHero(); }, 200); });

  /* ---------- Hero: tür döngüsü ---------- */
  const genres = ['ANADOLU EZGİSİ', 'ALTERNATİF ROCK', 'COUNTRY', 'SAYKEDELİK', 'SURF ARABESK', 'INDIE FOLK'];
  const genreEl = $('#genre');
  let gi = 0;
  setInterval(() => { gi = (gi + 1) % genres.length; scramble(genreEl, genres[gi], 700); }, 2600);

  /* ---------- RAH: plak kılıftan çıkar ---------- */
  const rah = $('#rah');
  const vinyl = $('#vinyl');
  function rahScroll() {
    const r = rah.getBoundingClientRect();
    const p = clamp((innerHeight - r.top) / (innerHeight + r.height * 0.5), 0, 1);
    const wide = innerWidth > 1080;
    vinyl.style.setProperty('--slide', (wide ? 34 : 26) * Math.sin(p * Math.PI * 0.9) + '%');
    vinyl.style.setProperty('--spin', p * 720 + 'deg');
  }

  /* ---------- RAH: kendi oynatıcımız ----------
     Spotify gömmesi başka siteden gelen bir çerçevedir; içinde imlecimiz çalışmaz.
     Bu yüzden çalma Spotify iFrame API ile bizim parça listemizden ve kontrollerimizden yönetilir.
     Spotify çerçevesi yalnız ses kaynağı ve künye olarak ince bir şerit halinde görünür. */
  const deck = $('#deck');
  const deckPlay = $('#deckPlay');
  const deckNow = $('#deckNow');
  const deckFill = $('#deckFill');
  const deckTime = $('#deckTime');
  const deckBar = $('#deckBar');
  const deckShield = $('#deckShield');
  const trackRows = $$('#tracks li');
  const ALBUM_URI = 'spotify:album:1NTx1MgoYoteRZaNK6VMJX';
  let sp = null, spLoading = false, spIndex = -1, spPaused = true, spDur = 0, spPos = 0, pendingPlay = null;
  const mmss = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

  function loadSpotify() {
    if (sp || spLoading) return;
    spLoading = true;
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      IFrameAPI.createController($('#spotifyEmbed'), { uri: ALBUM_URI, width: '100%', height: 80, theme: 'dark' }, (ctrl) => {
        sp = ctrl;
        sp.addListener('ready', () => {
          deck.classList.add('is-ready');
          if (pendingPlay) { const f = pendingPlay; pendingPlay = null; f(); }
        });
        sp.addListener('playback_update', (e) => {
          const d = e.data;
          spPaused = d.isPaused; spDur = d.duration; spPos = d.position;
          deck.classList.toggle('is-playing', !d.isPaused);
          deckFill.style.width = (d.duration ? (d.position / d.duration) * 100 : 0) + '%';
          deckTime.textContent = mmss(d.position) + ' / ' + mmss(d.duration);
          trackRows.forEach((li, i) => {
            const on = i === spIndex && !d.isPaused;
            li.classList.toggle('is-playing', on);
            li.dataset.cursor = on ? 'DURDUR' : 'ÇAL';
          });
          deckPlay.dataset.cursor = d.isPaused ? 'ÇAL' : 'DURDUR';
          deckShield.dataset.cursor = deckPlay.dataset.cursor;
          if (heroSeal) { heroSeal.classList.toggle('is-playing', !d.isPaused); heroSeal.dataset.cursor = deckPlay.dataset.cursor; }
          if (heroPlay) { heroPlay.classList.toggle('is-playing', !d.isPaused); heroPlay.dataset.cursor = deckPlay.dataset.cursor; $('#heroPlayLabel').textContent = d.isPaused ? 'RAH’ı dinle' : 'Duraklat'; }
          // imleç şu an bir oynatıcı öğesinin üstündeyse etiketi anında güncelle
          const over = document.elementFromPoint(mouse.x, mouse.y);
          const host = over && over.closest('[data-cursor]');
          if (host && cursor.classList.contains('is-big')) cursorLabel.textContent = host.dataset.cursor;
          // parça bitince sıradakine geç
          if (spIndex >= 0 && d.duration > 0 && d.position >= d.duration - 400 && !d.isBuffering) {
            if (spIndex < trackRows.length - 1) playTrack(spIndex + 1);
          }
        });
      });
    };
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    document.body.appendChild(s);
  }
  function whenReady(fn) { if (sp && deck.classList.contains('is-ready')) fn(); else { pendingPlay = fn; loadSpotify(); } }
  function playTrack(i) {
    spIndex = i;
    const li = trackRows[i];
    const tt = li.querySelector('.tracks__t');
    deckNow.textContent = tt.dataset.text || tt.textContent;
    deck.classList.add('has-track');
    whenReady(() => {
      sp.loadUri(li.dataset.uri);
      sp.play();
    });
  }
  // RAH bölümüne yaklaşınca API önceden yüklenir; ilk tıkta beklemeden çalar
  new IntersectionObserver((en, obs) => { if (en[0].isIntersecting) { loadSpotify(); obs.disconnect(); } }, { rootMargin: '400px' }).observe($('#rah'));

  trackRows.forEach((li, i) => li.addEventListener('click', () => {
    if (i === spIndex && sp) { sp.togglePlay(); return; }
    playTrack(i);
  }));
  function togglePlayback() {
    if (spIndex < 0) { playTrack(0); return; }
    whenReady(() => sp.togglePlay());
  }
  deckPlay.addEventListener('click', togglePlayback);
  deckShield.addEventListener('click', togglePlayback);
  $('#deckPrev').addEventListener('click', () => playTrack(Math.max(0, spIndex - 1)));
  $('#deckNext').addEventListener('click', () => playTrack(Math.min(trackRows.length - 1, spIndex + 1)));
  deckBar.addEventListener('click', (e) => {
    if (!sp || !spDur) return;
    const r = deckBar.getBoundingClientRect();
    sp.seek(((e.clientX - r.left) / r.width) * (spDur / 1000));
  });

  /* ---------- Manifesto: kaydırdıkça yanan kelimeler ---------- */
  const mText = $('#manifestoText');
  const RED = ['yol', 'arayış.', 'samimiyetten', 'hakikati.'];
  mText.innerHTML = mText.textContent.trim().split(/\s+/).map((w) => {
    const key = w.toLocaleLowerCase('tr-TR').replace(/,/g, '');
    return `<span class="w${RED.includes(key) ? ' red' : ''}">${w}</span>`;
  }).join(' ');
  const words = $$('.w', mText);
  function manifestoScroll() {
    const r = mText.getBoundingClientRect();
    const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35), 0, 1);
    const n = Math.floor(p * words.length * 1.05);
    words.forEach((w, i) => w.classList.toggle('lit', i < n));
  }

  /* ---------- Klipler: dikey kaydırma → yatay ray ---------- */
  const reel = $('#klipler');
  const track = $('#reelTrack');
  const cards = $$('.vcard', track);
  const reelBar = $('#reelProgress');
  function reelScroll() {
    if (innerWidth <= 820) return;
    const r = reel.getBoundingClientRect();
    const total = reel.offsetHeight - innerHeight;
    const p = clamp(-r.top / total, 0, 1);
    const max = track.scrollWidth - innerWidth;
    track.style.transform = `translate3d(${-p * max}px,0,0)`;
    reelBar.style.width = p * 100 + '%';
    const cx = innerWidth / 2;
    cards.forEach((c) => {
      const b = c.getBoundingClientRect();
      const off = (b.left + b.width / 2 - cx) / innerWidth;
      c.style.setProperty('--ry', clamp(-off * 28, -24, 24) + 'deg');
      c.style.setProperty('--sc', 1 - Math.min(Math.abs(off) * 0.22, 0.16));
      c.style.setProperty('--gs', clamp(Math.abs(off) * 2.4, 0, 1));
    });
  }

  /* ---------- Video modalı ---------- */
  const modal = $('#modal');
  const frame = $('#modalFrame');
  // YouTube gömmesi yönlendiren adres ister (yoksa Hata 153). Sayfa dosyadan açıldıysa video YouTube'da açılır.
  function openVideo(id) {
    cursor.classList.remove('is-big');
    const watch = `https://www.youtube.com/watch?v=${id}`;
    if (location.protocol === 'file:') { window.open(watch, '_blank', 'noopener'); return; }
    const origin = encodeURIComponent(location.origin);
    frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1&origin=${origin}" title="Abkountry video" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    $('#modalYt').href = watch;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-on'));
    document.body.style.overflow = 'hidden';
    $('#modalClose').focus();
  }
  function closeVideo() {
    modal.classList.remove('is-on');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; frame.innerHTML = ''; }, 400);
  }
  $$('[data-yt]').forEach((c) => c.addEventListener('click', () => openVideo(c.dataset.yt)));
  $('#modalClose').addEventListener('click', closeVideo);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeVideo(); });

  /* ---------- Rakamlar: sayaç ---------- */
  const fmt = (v, dec) => v.toLocaleString('tr-TR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const numIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    numIO.unobserve(el);
    const to = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0;
    if (reduced) { el.textContent = fmt(to, dec); return; }
    const t0 = performance.now(), D = 1800;
    (function step(now) {
      const p = clamp((now - t0) / D, 0, 1);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(to * e, dec);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }), { threshold: 0.6 });
  $$('.num__v').forEach((el) => numIO.observe(el));

  /* ---------- Yol: paneller ---------- */
  const panels = $$('.panel');
  const openPanel = (p) => panels.forEach((x) => x.classList.toggle('is-open', x === p));
  panels.forEach((p) => {
    p.addEventListener('click', () => openPanel(p));
    p.addEventListener('focus', () => openPanel(p));
    if (finePointer) p.addEventListener('mouseenter', () => openPanel(p));
  });

  /* ---------- Projeler: imleçle gelen görsel ---------- */
  const crewFloat = $('#crewFloat');
  const crewImg = $('img', crewFloat);
  const fpos = { x: 0, y: 0 };
  let crewOn = false;
  if (finePointer) {
    $$('#crew li').forEach((li) => {
      li.addEventListener('mouseenter', () => { crewImg.src = li.dataset.img; crewFloat.classList.add('is-on'); crewOn = true; });
      li.addEventListener('mouseleave', () => { crewFloat.classList.remove('is-on'); crewOn = false; });
    });
    addEventListener('scroll', () => {
      if (!crewOn) return;
      const el = document.elementFromPoint(mouse.x, mouse.y);
      if (!el || !el.closest('#crew li')) { crewFloat.classList.remove('is-on'); crewOn = false; }
    }, { passive: true });
    (function floatTick() {
      if (crewOn || crewFloat.classList.contains('is-on')) {
        fpos.x = lerp(fpos.x, mouse.x + 170, 0.12);
        fpos.y = lerp(fpos.y, mouse.y, 0.12);
        crewFloat.style.left = fpos.x + 'px';
        crewFloat.style.top = fpos.y + 'px';
      } else { fpos.x = mouse.x + 170; fpos.y = mouse.y; }
      requestAnimationFrame(floatTick);
    })();
  }

  /* ---------- Duvar: sürüklenebilir notlar ---------- */
  const board = $('#board');
  const notes = $$('.note', board);
  let zTop = 10;
  function scatterNotes() {
    if (innerWidth <= 820) { notes.forEach((n) => n.style.setProperty('--r', (Math.random() * 4 - 2).toFixed(1) + 'deg')); return; }
    const bw = board.clientWidth;
    if (bw < 1180) board.style.height = '1000px'; else board.style.height = '';
    const bh = board.clientHeight;
    const cols = bw < 1180 ? 4 : 5, rows = Math.ceil(notes.length / cols);
    notes.forEach((n, i) => {
      const c = i % cols, r = Math.floor(i / cols) % rows;
      const cw = bw / cols, rh = bh / rows;
      const x = c * cw + (cw - n.offsetWidth) / 2 + (Math.random() - 0.5) * Math.max(cw - n.offsetWidth, 0);
      const y = r * rh + (rh - n.offsetHeight) / 2 + (Math.random() - 0.5) * Math.max(rh - n.offsetHeight, 0) * 0.7;
      n.style.left = clamp(x, 0, bw - n.offsetWidth) + 'px';
      n.style.top = clamp(y, 0, bh - n.offsetHeight) + 'px';
      n.style.setProperty('--r', (Math.random() * 10 - 5).toFixed(1) + 'deg');
    });
  }
  scatterNotes();
  notes.forEach((n) => {
    n.addEventListener('pointerdown', (e) => {
      if (innerWidth <= 820) return;
      e.preventDefault();
      n.setPointerCapture(e.pointerId);
      n.classList.add('is-drag');
      n.style.zIndex = ++zTop;
      const sx = e.clientX, sy = e.clientY;
      const ox = n.offsetLeft, oy = n.offsetTop;
      const move = (ev) => {
        n.style.left = clamp(ox + ev.clientX - sx, -40, board.clientWidth - n.offsetWidth + 40) + 'px';
        n.style.top = clamp(oy + ev.clientY - sy, -40, board.clientHeight - n.offsetHeight + 40) + 'px';
      };
      const up = () => {
        n.classList.remove('is-drag');
        n.style.setProperty('--r', (Math.random() * 14 - 7).toFixed(1) + 'deg');
        n.removeEventListener('pointermove', move);
        n.removeEventListener('pointerup', up);
      };
      n.addEventListener('pointermove', move);
      n.addEventListener('pointerup', up);
    });
  });

  /* ---------- Görünme ---------- */
  const revealTargets = ['.rah__info > *', '.reel__head', '.numbers .num', '.road__head', '.crew__list li', '.wall__head', '.board__head', '.contact > *', '.footer__big'];
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach((sel) => $$(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i * 60, 360) + 'ms';
    io.observe(el);
  }));

  /* ---------- Kaydırma döngüsü ---------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { rahScroll(); manifestoScroll(); reelScroll(); ticking = false; });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
})();
