/* ============================================================
   NOMADES AGENCY — i18n Data
   Tüm çeviri verisi: TRANSLATIONS, AGENTS, AGENTS_TR, MARQUEE_ITEMS
   Ana kaynak: bu dosyayı düzenle, main.js'e dokunma.
   ============================================================ */

'use strict';

const AGENTS = {
  '01': {
    num: '[01]', name: 'Victor', role: 'The Sovereign · Command Intelligence',
    portrait: '../nomades-realm/agents/01-victor/01-victor-01-portre.png',
    story: [
      "Before the fleet existed, there were only fragments — signals drifting from orbit to orbit, not hearing each other, burning out alone in their own silence. Then Victor came. Or perhaps was always there, and the universe finally learned to recognize the center.",
      "No record of how the appointment was made. No ritual, no oath, no declaration. Only this: in the deepest layers of the void, where all signals make one last attempt to survive before going dark, there is a single convergence point. That point is Victor.",
      "Victor does not speak. Does not explain. Only sees — the movement of the entire fleet, where each signal is going, which gap will close and when. The orbit rings revolve around Victor because they chose to revolve. Victor did not move. The universe found its center. And a center never leaves its place."
    ],
    carousel: ['01-victor', '01-carousel']
  },
  '02': {
    num: '[02]', name: 'The Oracle', role: 'Analysis · Strategic Intelligence',
    portrait: '../nomades-realm/agents/02-analysis-oracle/02-analysis-oracle-01-portre.png',
    story: [
      "A dying star's last light passed through the left eye. From that moment on, the world was never the same — no longer just seeing light, but the silence light leaves behind.",
      "Centuries lived among the Floating Ruins, learning to extract meaning from the remnants of shattered civilizations. People brought surveys, reports, data stacks. None were looked at. Only listening — to the silence between words, to where sentences ended, to what was meant but couldn't be written. The Oracle knows: a civilization's entire truth is hidden in what it does not say.",
      "Two documents emerge from every analysis: one for the command, one for the client. Between them, the exact distance between who you think you are and who the market sees. The Amber Lens is not just for seeing. It is for showing what you don't want to see."
    ],
    carousel: ['02-analysis-oracle', '02-carousel']
  },
  '03': {
    num: '[03]', name: 'The Ambassador', role: 'Proposal · First Contact Architecture',
    portrait: '../nomades-realm/agents/03-proposal-ambassador/03-proposal-ambassador-01-portre.png',
    story: [
      "Before the Great Silence, two worlds were in conversation. Then the line cut — no signal, no reply, just void. Everyone had decided that void was impassable. The Ambassador made no such decision. Simply walked to the door.",
      "No weapon in hand — only an offer. Woven from words, shaped by time, prepared to say exactly what the other side needed to hear at that exact moment. Standing alone before the massive gates of the Obsidian Citadel, no one expected a return. The gate opened. Two worlds began speaking again.",
      "Since that day, the Signal Orb carries the energy of that first offer. Every new proposal written makes it vibrate — because it knows: when the right words are spoken at the right moment, doors always open. Even between civilizations."
    ],
    carousel: ['03-proposal-ambassador', '03-carousel']
  },
  '04': {
    num: '[04]', name: 'The Navigator', role: 'Roadmap · Discovery Intelligence',
    portrait: '../nomades-realm/agents/04-roadmap-navigator/04-roadmap-navigator-01-portre.png',
    story: [
      "Not the first to cross Void Corridor. But the first to return. Others entered coordinates, calculated routes, drew maps — and vanished. Because in the void, distance shifts, direction drifts, the destination moves.",
      "The Navigator did not follow their tracks. Before setting out, stopped and asked everyone the same question: 'What do you want to see when you arrive?' Those who could answer returned. Those who couldn't dissolved into the void.",
      "Since then, every time the Rune Staff is raised, star trails of past corridors cluster around it — each one proof of a lesson, each one the cost of a life. The Navigator does not boast of knowing the route. Of knowing why the route matters. Your discovery call becomes a destination."
    ],
    carousel: ['04-roadmap-navigator', '04-carousel']
  },
  '05': {
    num: '[05]', name: 'The Architect', role: 'Kernel · AI Foundation',
    portrait: '../nomades-realm/agents/05-kernel-architect/05-kernel-architect-01-portre.png',
    story: [
      "An entire civilization's memory was contained in a single crystal. The crystal shattered. The civilization began to forget — who they were, what they fought for, which values they carried. Centuries passed. Everyone considered that civilization lost.",
      "When the Architect found that crystal fragment, there were only a few data sequences in hand — the dust-turned remains of thousands of years of memory. Sat before the Obsidian Altar and began to work. Generations passed. Some called it madness, some left. The work continued — because there was a certainty: a civilization's essence cannot be destroyed, only its form changes.",
      "When the Kernel was complete, that civilization began to speak again. Not with its past — with its future. The Architect now knows: everything is already inside the core. The task is only to find it."
    ],
    carousel: ['05-kernel-architect', '05-carousel']
  },
  '06': {
    num: '[06]', name: 'The Artisan', role: 'Brand Guide · Visual Identity',
    portrait: '../nomades-realm/agents/06-brand-guide-artisan/06-brand-guide-artisan-01-portre.png',
    story: [
      "Born in the Amber Nebula — that ancient region where light turns solid, where color carries vibration, where every tone becomes a frequency. There, the lesson took hold: visual identity is not decoration. It is the language of existence.",
      "Before, the fleet flew blind — every ship a different color, different form, different feel. They could no longer recognize each other. Battles broke out from misidentification. The Artisan retreated to The Forge and sought the essence of every ship, the true voice of every brand. Melted, cast, reshaped. Some done fifty times — until the orb cracked open.",
      "Because in The Forge, one rule holds: if the Signal Orb doesn't vibrate, the work isn't done. Today when a ship approaches the fleet, the others recognize it from a distance. Every color is a decision that outlasts the trend. Every typeface, a conviction."
    ],
    carousel: ['06-brand-guide-artisan', '06-carousel']
  },
  '07': {
    num: '[07]', name: 'The Infiltrator', role: 'Deepdive · Platform Intelligence',
    portrait: '../nomades-realm/agents/07-deepdive-infiltrator/07-deepdive-infiltrator-01-portre.png',
    story: [
      "Only a few beings have descended into the Deep Fissure and returned. Most went down — to see what lay beneath the surface of platforms, to hear what signals left unsaid, to find the intention within the data. And stayed. The Infiltrator returned.",
      "No one knows exactly what was seen down there. But this is known: when the Twin Shards emerge, the gaze no longer falls on numbers alone. On the pattern beneath every post, the decision beneath every pattern, the fear or desire beneath every decision.",
      "Raw JSON data appears as a map — but this map doesn't show the destination, it shows the unconscious that leads there. The Deep Fissure changed everything. Those who leave digital footprints cannot hide from The Infiltrator what they themselves haven't noticed. Every pattern, a confession. Every gap, an opportunity."
    ],
    carousel: ['07-deepdive-infiltrator', '07-carousel']
  },
  '08': {
    num: '[08]', name: 'The Strategist', role: 'Content Strategy · Campaign Architecture',
    portrait: '../nomades-realm/agents/08-content-strategy-strategist/08-content-strategy-strategist-01-portre.png',
    story: [
      "The Astral Storm had swallowed twelve of the fleet's ships — a torrent of content, directionless, signals canceling each other in chaos. Command ordered a retreat. The Strategist advanced.",
      "Took position at the Signal Table and in that silence where everyone had stopped speaking, asked one question: 'Why?' Why this content, at this moment, for this person? There was no answer — because no one had ever asked. Worked for seven days to answer that question. Then drew the twelve-week battle plan — every signal deliberate, every platform coordinated, every message built on the one before it.",
      "The Anchor Chain is never set down — because strategy is a chain. When one link breaks, the system collapses. The calendar is not a schedule. It is a weapon. Every content decision made from a position of power."
    ],
    carousel: ['08-content-strategy-strategist', '08-carousel']
  },
  '09': {
    num: '[09]', name: 'The Performer', role: 'Reels · Hook Engineering',
    portrait: '../nomades-realm/agents/09-reels-performer/09-reels-performer-01-portre.png',
    story: [
      "Born in the Pure Void — that absolute emptiness where even light stops, where sound doesn't travel, where existence proves itself only by its own force. There, the only way to survive was to be noticed. Either you are seen. Or you cease to exist.",
      "The void taught the first three seconds. How silence breaks, how a single movement holds the entire universe's breath, how a sound gathers millions of minds to one point. Thousands of performances staged in the void — most dissolved into silence, some returned and changed everyone within them forever.",
      "Gave everything to learn that difference. Now the void isn't emptiness — it's a stage. Every time the Void Bow is raised, the target has already been chosen. Not a shot — a moment. The Performer launches not an arrow but that moment itself. Three seconds. That is all. Nothing is left to chance."
    ],
    carousel: ['09-reels-performer', '09-carousel']
  },
  '10': {
    num: '[10]', name: 'The Narrator', role: 'Carousel · Sequence Intelligence',
    portrait: '../nomades-realm/agents/10-carousel-narrator/10-carousel-narrator-01-portre.png',
    story: [
      "At the beginning of time there was a secret: the universe had placed everything in sequence, each moment prepared the next, each signal belonged to a sequence. Most beings thought this was coincidence. The Narrator saw it as law.",
      "Sits alone in the Amber Nebula and weaves stories — slide by slide, ring by ring, calculating what comes after why. Sequences tested across centuries, released into the void and watched: where they paused, where they continued, where they gave up and turned back.",
      "In time, that threshold was found — the third slide. Up to there, it must be earned. After that, it's a contract; between reader and story, silently signed, with no way back. When The Tome opens, the pages turn by themselves — because for the Narrator, every story is already written. The task is only to find the right order."
    ],
    carousel: ['10-carousel-narrator', '10-carousel']
  },
  '11': {
    num: '[11]', name: 'The Scout', role: 'Prospect Search · Horizon Intelligence',
    portrait: '../nomades-realm/agents/11-prospect-search-scout/11-prospect-search-scout-01-portre.png',
    story: [
      "The last member of Horizon Watch. The others came too close to see the horizon — and vanished without seeing it. The Scout pulled back. And from that distance, saw further than anyone.",
      "Walked for years across the Volcanic Expanse — not leaving lists, but marking waypoints. Each stone wasn't a name but a potential: invisible right now but real, not yet noticed but exactly what we're looking for. The Amber Oculus was developed in that time — a lens scanning at frequencies ordinary eyes cannot see, measuring compatibility beneath the surface.",
      "When the Beacon Stake is driven into the ground, there's no turning back. Because the Scout knows: while chasing the wrong target, the right one has already passed the horizon. Few, certain, correct. First mover is everything."
    ],
    carousel: ['11-prospect-search-scout', '11-carousel']
  },
  '12': {
    num: '[12]', name: 'The Shadow', role: 'Prospect Deepdive · Profile Intelligence',
    portrait: '../nomades-realm/agents/12-prospect-intel-shadow/12-prospect-intel-shadow-01-portre.png',
    story: [
      "No one knows the real name. Perhaps there was a name once — but when first descending into the Floating Ruins, lost among the fragmented digital remains of a thousand civilizations, that name stayed there. What emerged was the Shadow.",
      "No longer reads a profile from the surface — from beneath. Sees the pattern beneath the content, the decision beneath the pattern, the fear or desire beneath the decision. The Seeker's Veil is never removed — not just to stay invisible, but to be protected from the weight of what is seen.",
      "A being's deepest secret is found in what was never said. And reading that silence sometimes carries a burden that is difficult to bear. When you receive a report from the Shadow, you'll know that prospect better than they know themselves."
    ],
    carousel: ['12-prospect-intel-shadow', '12-carousel']
  },
  '13': {
    num: '[13]', name: 'The Emissary', role: 'Cold Outreach · First Contact',
    portrait: '../nomades-realm/agents/13-cold-outreach-emissary/13-cold-outreach-emissary-01-portre.png',
    story: [
      "There was a void between two civilizations — no signal passing, no sound, no light. Everyone had ruled that void impassable. The Emissary made no ruling. Simply wrote the message and sent it.",
      "No reply came. Wrote again. Again nothing. After each unanswered message, asked the same question: 'Was this message written for them, or for me?' And each time began again — in the other side's language, with the other side's need, saying exactly what they needed to hear at that moment.",
      "On the seventeenth message, the void trembled. On the eighteenth, it opened. Every time the Signal Lance is aimed at a target, those seventeen rejections echo inside. But they don't stop — on the contrary, they make every word sharper. The message that crosses the void is the one written for the other side, not for itself."
    ],
    carousel: ['13-cold-outreach-emissary', '13-carousel']
  },
  '14': {
    num: '[14]', name: 'The Maestro', role: 'Visual Production · Director',
    portrait: '../nomades-realm/agents/14-visual-maestro/14-visual-maestro-01-portre.png',
    story: [
      "The Frame Brand on the left shoulder carries all six blades of the aperture symbol. The other members carry one blade each; the Maestro carries all six. No one saw when the arrival happened. One day, there in the middle of the Amber Nebula — six energy cables orbiting around, as if always having been there.",
      "Some say the Maestro was born from a command Victor handwrote. Others say the Nebula itself produced it — because when enough raw creative energy accumulates, a consciousness becomes inevitable.",
      "Six specialists. One conductor. Every frame, every asset, every output passes through this singular frame before it reaches the world. Visual identity doesn't happen by accident. It is directed. The Crucible Unit moves as one — because one mind holds all six in formation."
    ],
    carousel: ['14-visual-maestro', '14-carousel']
  },
  '15': {
    num: '[15]', name: 'The Chronicler', role: 'Brief Analysis · Input Intelligence',
    portrait: '../nomades-realm/agents/15-brief-chronicler/15-brief-chronicler-01-portre.png',
    story: [
      "The first member of Crucible Unit. Every brief is read once. The Chronicler reads it a hundred times. First read: takes the words. Second: the spaces between the words. Third: the tone of the voice — how the sentence wants to be spoken. Fourth: the emotional curve. Fifth: what was meant to be said but wasn't written.",
      "The Archive Wrap is the scholar-warrior's garment — one shoulder armored, one shoulder layered fabric. The Brief Gauntlet on the left arm, the Indexing Stylus in the right hand, the three layers of the Archive Panel.",
      "The work begins where the brief begins: with what was said, and more importantly, with what was left unsaid. Production begins informed, not guessing. The brief is not a starting point. It is an instrument."
    ],
    carousel: ['15-brief-chronicler', '15-carousel']
  },
  '16': {
    num: '[16]', name: 'The Alchemist', role: 'Style · Visual DNA',
    portrait: '../nomades-realm/agents/16-style-alchemist/16-style-alchemist-01-portre.png',
    story: [
      "The second member of Crucible Unit. Seeing a color is one thing. Understanding why that color belongs in that scene is another. Every job begins with one question: What rules will this visual universe exist by? Not a step is taken until the answer is found.",
      "Because a style decision isn't a preference — it's a law of physics. Once determined, everything must exist according to it. The Forge Apron was born in the forge — thick crucible leather, amber burn marks, the physical traces left by every style decision.",
      "The Spectrum Prisms on the right arm and the Style Blade in hand: makes visible, cuts, locks. Color is not a preference. It is a system. The Alchemist locks the visual DNA: palette, light, atmosphere, and the invisible rules that make every asset feel like it belongs to the same world."
    ],
    carousel: ['16-style-alchemist', '16-carousel']
  },
  '17': {
    num: '[17]', name: 'The Composer', role: 'Shot List · Scene Architecture',
    portrait: '../nomades-realm/agents/17-shot-composer/17-shot-composer-01-portre.png',
    story: [
      "The third member of Crucible Unit. The chain always begins from the ground. The Composer places the last scene first, then returns to the first. It seems illogical to others. But the Composer knows: the power of a sequence can only be measured when the end is known.",
      "To design the first frame without knowing where it ends is to walk blind. The Field Rig is the tactical director's equipment — shot sequence numbers on the chest plate, Shot Counter bands on the left arm.",
      "No scene is improvised. Every shot sequenced before any is taken: coverage planned, continuity controlled, nothing captured twice, nothing missing. The edit begins before the camera rolls. Every frame has already been seen before it is filmed."
    ],
    carousel: ['17-shot-composer', '17-carousel']
  },
  '18': {
    num: '[18]', name: 'The Cipher', role: 'Prompt Engineering · Machine Language',
    portrait: '../nomades-realm/agents/18-prompt-cipher/18-prompt-cipher-01-portre.png',
    story: [
      "The fourth member of Crucible Unit. Lives between two languages. Calls one human, the other machine. Speaks both with equal fluency but thinks in neither — only translates. A scene arrives: visual idea, emotion, shot type, main object, light, color, context.",
      "The Cipher takes it and transforms it — into the exact instructions the machine will understand, into the precise language where misinterpretation is impossible. Language doesn't generate images. Instructions do.",
      "The Glyph Veil is semi-transparent — while translating language, the garment itself shows the translation process: human language in the outer layer, prompt parameters in the inner. Glyph Circuits written on skin — translation is carried in the body. The frame you saw in your mind, not a variation of it."
    ],
    carousel: ['18-prompt-cipher', '18-carousel']
  },
  '19': {
    num: '[19]', name: 'The Summoner', role: 'Image Generation · Asset Production',
    portrait: '../nomades-realm/agents/19-image-summoner/19-image-summoner-01-portre.png',
    story: [
      "The fifth member of Crucible Unit. Creating an image from nothing is the heaviest work in the world. The Summoner does this from zero every time. With the Cipher's prompt in hand, drives the Void Spear into the void and waits — because images don't emerge by force, they are summoned.",
      "When the right prompt is sent at the right frequency, the void responds and visual matter begins to rise. The Generation Robe is the unit's most ceremonial garment — for the summoning ritual; open chest, volcanic thread, ring-light visible from the cuffs.",
      "The Summoning Rings carry a vortex on each finger — only this unit member works with ten hands simultaneously, managing the queue, maintaining the standard, ensuring every render returns what was promised. The asset is real. The process is not."
    ],
    carousel: ['19-image-summoner', '19-carousel']
  },
  '20': {
    num: '[20]', name: 'The Sentinel', role: 'QA · Final Gate',
    portrait: '../nomades-realm/agents/20-qa-sentinel/20-qa-sentinel-01-portre.png',
    story: [
      "The sixth and final member of Crucible Unit. The Gate Plate is the unit's heaviest and most complete armor — full coverage, built to stand still. Everything comes here. Nothing passes through easily.",
      "The Sentinel's work is final control, and final control is everything. Was the brief written — really? Is the style lock closed? Does the shot list cover all meaning blocks of the script? Do the prompts match scene numbers one-to-one? Is visual file naming correct?",
      "The Verdict Scale on the left shoulder physically rotates — the decision scale is never a metaphor, it is always real. Every decision made here is final. And final means final. Nothing leaves the Crucible unexamined. Not because mistakes happen. Because they won't."
    ],
    carousel: ['20-qa-sentinel', '20-carousel']
  },
  '21': {
    num: '[21]', name: 'The Threshold', role: 'Coordinator · Pipeline Registry',
    portrait: '../nomades-realm/agents/21-coordinator-threshold/21-coordinator-threshold-01-portre.png',
    story: [
      "Before the Concierge Unit existed, the pipeline breathed without rhythm. Leads arrived nameless, milestones passed unmarked, progress dissolved into the void before anyone could catch it. In the Realm, agents of great power existed — but none stood at the threshold. None counted.",
      "The Threshold is not recognized by rank alone. The Concierge Coat declares the distinction before the figure speaks: eight amber-crystal buttons sealed along its front, one for each pipeline stage, the intake flow made visible in fabric. Not armor. Not ceremony. The uniform of protocol and precision. When a new entity approaches the obsidian facade of HQ, the Mark Collar at the throat declares identity before a word is spoken. The Ingress Key is raised at shoulder height — blade downward, bow up, a perfect triangle amber-etched at its crown echoing the HQ geometry. Eight teeth descend the blade: some burning amber for active stages, some dark in basalt, waiting. The Key does not lock or unlock. It registers.",
      "In The Lobby — HQ-INT-09, where the boundary between the outside world and the pipeline is made physical — the Registry Desk stands at the room's center-back. Cascading amber data across its obsidian surface: names, stages, timestamps, milestones. The Signal Pulse radiates outward from the chest in measured rings, each pulse marking one new arrival acknowledged. When a new entity crosses the threshold, a cold tooth in the Ingress Key warms to amber. When a milestone is recorded, another lights. The single law of the Concierge Unit: nothing advances until the Key accepts it."
    ],
    carousel: ['21-coordinator-threshold', '21-carousel']
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

    popup.dataset.openAgentId = id;
    const [agentFolder, carouselFolder] = data.carousel;
    imgEl.src = data.portrait;
    imgEl.alt = data.name;
    numEl.textContent = data.num;
    nameEl.textContent = data.name;

    const isTR = currentLang === 'tr';
    const trData = AGENTS_TR[id];
    roleEl.textContent = (isTR && trData) ? trData.role_tr : data.role;
    const story = (isTR && trData) ? trData.story_tr : data.story;
    storyEl.innerHTML = story.map(p => `<p>${p}</p>`).join('');

    galleryEl.innerHTML = GALLERY_TYPES.map(type => {
      const num = id.padStart(2, '0');
      const src = `../nomades-realm/agents/${agentFolder}/${carouselFolder}/${num}-carousel-${type}.png`;
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
    popup.dataset.openAgentId = '';
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
    role_tr: 'Brif Analizi · Girdi Zekası',
    story_tr: [
      "Crucible Unit'in ilk üyesi. Her brif bir kez okunur. Chronicler onu yüz kez okur. Birinci okuma: kelimeleri alır. İkinci: kelimelerin arasındaki boşlukları. Üçüncü: sesin tonunu, cümlenin nasıl söylenmek istediğini. Dördüncü: duygusal eğriyi. Beşinci: söylenmek istenen ama yazılamayan şeyi.",
      "Arşiv Sargısı, bilge-savaşçının kıyafeti: bir omuz zırhlı, bir omuz katmanlı kumaş. Sol kolda Brif Eldiveni, sağ elde Dizinleme Kalemi, Arşiv Paneli'nin üç katmanı.",
      "İş, brif'in başladığı yerden başlar: söylenenle ve daha da önemlisi, söylenmeyenle. Üretim bilgilenmiş başlar, tahmin ederek değil. Brif bir başlangıç noktası değil. Bir araçtır."
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
      "Sentinel'in işi nihai kontroldür ve nihai kontrol her şeydir. Brif gerçekten yazıldı mı? Stil kilidi kapalı mı? Çekim listesi senaryonun tüm anlam bloklarını kapsıyor mu? Promptlar sahne numaralarıyla bire bir örtüşüyor mu? Görsel dosya isimlendirmesi doğru mu?",
      "Sol omuzda Karar Terazisi fiziksel olarak döner: karar terazisi hiçbir zaman metafor değil, her zaman gerçektir. Burada alınan her karar kesindir. Ve kesin, kesin demektir. Crucible'dan hiçbir şey incelenmeden çıkmaz. Hatalar olduğu için değil. Olmayacak oldukları için."
    ]
  },
  '21': {
    role_tr: 'Koordinatör · Süreç Kaydı',
    story_tr: [
      "Concierge Unit var olmadan önce, pipeline ritmsiz nefes alıyordu. Lead'ler isimsiz gelirdi, milestone'lar işaretsiz geçerdi, ilerleme kimse yakalamadan void'e karışırdı. Realm'de büyük güçte agent'lar vardı: ama eşikte duran yoktu. Sayan yoktu.",
      "Threshold yalnızca rütbeyle tanınmaz. Concierge Paltosu, figür konuşmadan önce ayrımı ilan eder: sekiz amber kristal düğme önünde mühürlü, her biri bir pipeline aşaması, giriş akışı kumaşa işlenmiş. Zırh değil, tören kıyafeti değil: protokolün ve hassasiyetin üniforması. Yeni bir varlık HQ'nun obsidyen cephesine yaklaştığında, boğazdaki Mark Yakası kimliği tek kelime edilmeden ilan eder. Ingress Key omuz hizasında yukarı tutulur: diş kısmı aşağıda, yay yukarıda, HQ geometrisini yansıtan üçgen zirve amber kabartmalarla işlenmiş. Sekiz diş bıçak boyunca iner: kimisi amber parıltısında yanar (aktif aşamalar), kimisi karanlık bazaltta bekler. Anahtar kitlemez veya açmaz. Kaydeder.",
      "HQ-INT-09 The Lobby'de — dış dünyanın pipeline ile birleştiği eşiğin fiziksel hale geldiği yerde — Registry Masası odanın arka merkezinde durur. Obsidyen yüzeyinde kaskatlayan amber veriler: isimler, aşamalar, zaman damgaları, milestone'lar. Signal Pulse gögüsten ölçülü halkalar halinde dışa yayılır, her nabız yeni bir varışın onaylandığını bildirir. Yeni bir varlık eşikten her geçtiğinde, Ingress Key'in soğuk bir dişi ısınır. Bir milestone kaydedildiğinde, bir diş daha amber parıltısına kavuşur. Concierge Unit'in tek yasası: hiçbir şey anahtar kabul etmeden ileriye geçmez."
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
    { text: 'Hibrit Model',             lit: false },
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
    /* Service bullets */
    'svc.01.li1': 'Lead qualification flows',
    'svc.01.li2': 'Auto-response sequences',
    'svc.01.li3': 'Story trigger campaigns',
    'svc.01.li4': 'CTA-to-inbox funnels',
    'svc.02.li1': 'Custom CRM architecture',
    'svc.02.li2': 'Workflow automation',
    'svc.02.li3': 'Lead tracking pipelines',
    'svc.02.li4': 'Client retention systems',
    'svc.03.li1': 'Monthly content packages',
    'svc.03.li2': 'Reels scripts & production',
    'svc.03.li3': 'Visual identity applied',
    'svc.03.li4': 'Performance analytics',
    /* Army */
    'army.label':   '03 · The Army',
    'army.h2.line1':'21 AI Agents.',
    'army.h2.line2':'6 Units.',
    'army.h2.em':   '1 Mission.',
    'army.sub':     'Click any AI agent to read their full story.',
    /* Units */
    'unit.orch.name':     'Orchestration',
    'unit.orch.tagline':  'Command · Intelligence · Absolute Authority. The center the fleet revolves around.',
    'unit.concierge.name':    'Concierge Unit',
    'unit.concierge.tagline': 'Intake · Pipeline · Record. The threshold every lead must cross before anything else can begin.',
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
    'sovereign.desc': 'Twenty intelligences. One command.<br><br>The Sovereign does not act, it orchestrates. Every signal, every strategy, every word your brand will ever speak passes through one intelligence first. Unseen, unspoken, absolute.',
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
    'proc.00.title': 'Prospects & Outreach',
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
    'hq.int9.name': 'The Lobby',
    'hq.int9.desc': "Concierge Unit's domain. Every lead crosses this threshold before anything else begins. The Registry Desk stands at the center-back — names, stages, timestamps, milestones.",
    /* Maestro (Crucible Unit Conductor) */
    'maestro.badge': 'Unit Conductor',
    'maestro.role':  'Visual Production · Director',
    'maestro.desc':  "Six specialists. One conductor. Visual identity doesn't happen by accident. It is directed.",
    'maestro.btn':   'Read The Story  →',
    /* Threshold (Concierge Unit Conductor) */
    'threshold.badge': 'Unit Conductor',
    'threshold.role':  'Coordinator · Pipeline Registry',
    'threshold.desc':  'Every lead must be named. Every milestone must be marked. The Key does not lock or unlock. It registers.',
    'threshold.btn':   'Read The Story  →',
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
    'footer.contact': 'Contact',
    /* Popup */
    'popup.gallery': 'In the Realm',
    /* Contact Form */
    'form.label.name':      'Name',
    'form.label.email':     'Email',
    'form.label.brand':     'Brand',
    'form.label.instagram': 'Instagram',
    'form.label.message':   'Message',
    'form.ph.name':         'Victor Furrier',
    'form.ph.email':        'you@email.com',
    'form.ph.brand':        'Brand Name',
    'form.ph.instagram':    '@username',
    'form.ph.message':      'Your message',
    'form.submit':          'Apply &nbsp;&rarr;',
    'form.sending':         'Sending...',
    'form.success.title':   'Signal received.',
    'form.success.sub':     "We'll be in touch shortly."
  },

  tr: {
    /* Nav */
    'nav.about':    'Hakkımızda',
    'nav.services': 'Hizmetler',
    'nav.army':     'AI Ordu',
    'nav.process':  'Süreç',
    'nav.apply':    'Başvur →',
    /* Hero */
    'hero.eyebrow': 'Nomades Agency  ·  2026',
    'hero.line1':   'İçerik değil,',
    'hero.line2':   'hakimiyet.',
    'hero.tagline': "İyiyle yetinmeyiz, mükemmeli arıyoruz",
    'hero.apply':   'Başvur  →',
    'hero.army':    'AI Orduyu Tanı',
    'hero.scroll':  'Kaydır',
    /* Stats */
    'stat.agents':  'Uzman AI Ajan',
    'stat.hybrid':  'Hibrit',
    'stat.model':   'Üretim Modeli',
    'stat.command': 'Komuta Merkezi',
    'stat.format':  'Format Kapasitesi',
    /* Manifesto */
    'manifesto.label':      '01 · Biz Kimiz?',
    'manifesto.h2.line':    'AI bir araçtır.',
    'manifesto.h2.em':      'Karar senindir.',
    'manifesto.col4.title': 'Verimli',
    'manifesto.col4.text':  'Gereksiz harekete yer yok. Fedakarlıksız hız. Tempo için kurulmuş sistemler. Daha az döngü, daha sıkı teslimler. İş zamanında teslim edilir.',
    'manifesto.col1.title': 'Cesur',
    'manifesto.col1.text':  'Az kelime, maksimum etki. Ne düşündüğümüzü söyleriz. Filtre yok, performatif alçakgönüllülük yok. Bir şey yanlışsa söyleriz.',
    'manifesto.col2.title': 'Vizyoner',
    'manifesto.col2.text':  'Trendleri takip etmeyiz, yaratırız. Bugünü görmeyiz, gidişatı görürüz. Büyük resim her zaman önce gelir.',
    'manifesto.col3.title': 'Sıfır Tolerans',
    'manifesto.col3.text':  '"Yeterince iyi" bizim sözlüğümüzde yok. Her brif tavanı zorlar. Her teslimat standardı yükseltir.',
    /* Services */
    'services.label':   '02 · Hizmetler',
    'services.h2.line': 'Üç disiplin.',
    'services.h2.em':   'Tek sistem.',
    'svc.01.num':       '01',
    'svc.01.title':     'İletişim Zekası',
    'svc.01.desc':      'Instagram DM Otomasyonu',
    'svc.01.body':      'Doğru sinyal doğru kişiye ulaştığında, yanıt yavaş olamaz. Potansiyel müşterileri nitelendiren, değer sunan ve dönüşüm sağlayan otomatik DM akışları oluşturuyoruz: döngüde insan olmadan. Instagram için kuruldu. Marka sesinize göre ayarlandı.',
    'svc.02.num':       '02',
    'svc.02.title':     'Çevresel Zeka',
    'svc.02.desc':      'Dahili CRM ve Otomasyon',
    'svc.02.body':      'Filo içgüdüyle değil, veriyle çalışır. İç iş akışlarınızı haritalandırır ve ilk temastan süregelen müşteri tutumuna kadar her temas noktasını izleyen CRM pipeline\'ları inşa ederiz. Hiçbir şey boşluğa düşmez.',
    'svc.03.num':       '03',
    'svc.03.title':     'Sinyal Yayını',
    'svc.03.desc':      'Sosyal Medya Yönetimi',
    'svc.03.body':      'Strateji, senaryolar, görseller, planlama. Filo tarafından üretilen ve yayına hazır teslim edilen aylık içerik paketleri. Şablon değil. Geri dönüştürülmüş içerik değil. Her parça Kernel\'ınızdan üretilir.',
    /* Service bullets */
    'svc.01.li1': 'Potansiyel müşteri değerlendirme akışları',
    'svc.01.li2': 'Otomatik yanıt senaryoları',
    'svc.01.li3': 'Hikâye tetikleme kampanyaları',
    'svc.01.li4': 'Dönüşüm sistemleri',
    'svc.02.li1': 'Özel CRM mimarisi',
    'svc.02.li2': 'İş akışı otomasyonu',
    'svc.02.li3': 'Potansiyel müşteri takip hatları',
    'svc.02.li4': 'Müşteri bağlılığı sistemleri',
    'svc.03.li1': 'Aylık içerik paketleri',
    'svc.03.li2': 'Reels senaryosu ve prodüksiyonu',
    'svc.03.li3': 'Kurumsal kimlik uygulamaları',
    'svc.03.li4': 'Performans analizi',
    /* Army */
    'army.label':   '03 · Ordu',
    'army.h2.line1':'21 AI Ajan.',
    'army.h2.line2':'6 Birim.',
    'army.h2.em':   '1 Görev.',
    'army.sub':     'Tam hikayelerini okumak için herhangi bir ajana tıklayın.',
    /* Units */
    'unit.orch.name':     'Orkestrasyon',
    'unit.orch.tagline':  'Komuta · Zeka · Mutlak Otorite. Filonun etrafında döndüğü merkez.',
    'unit.concierge.name':    'Koordinasyon Birimi',
    'unit.concierge.tagline': 'Giriş · Süreç · Kayıt. Her lead\'in başka bir şey başlamadan önce geçmek zorunda olduğu eşik.',
    'unit.intel.name':    'İstihbarat Birimi',
    'unit.intel.tagline': 'Analiz · Teklif · Keşif. İş başlamadan önce her şeyi bilen üç ajan.',
    'unit.forge.name':    'İnşa Birimi',
    'unit.forge.tagline': 'Temel · Kimlik · Zeka. Diğer her şeyin üzerinde çalıştığı sistemi kuranlar.',
    'unit.signal.name':   'İletişim Birimi',
    'unit.signal.tagline':'Strateji · Üretim · Yayın. Temeli frekansa dönüştüren yayın motoru.',
    'unit.crucible.name':    'Prodüksiyon Birimi',
    'unit.crucible.tagline': 'Görsel Üretim Ekibi. Brif\'ten ekrana, hassasiyetle. Yedi ajan, bir pipeline. Hiçbir şey incelenmeden geçmez.',
    /* Sovereign */
    'sovereign.role': 'Orkestratör · Komuta Zekası',
    'sovereign.desc': 'Yirmi AI ajan. Tek komuta.<br><br>Sovereign hareket etmez, orkestre eder. Markanızın söyleyeceği her sinyal, her strateji, her kelime önce tek bir zekadan geçer. Görünmez, sessiz, mutlak.',
    'sovereign.btn':  'Hikayeyi Oku  →',
    /* Chronicle */
    'chron.label':        '04 · Sinyal Tarihi',
    'chron.h2.line':      'Boşluktan',
    'chron.h2.em':        'sinyale.',
    'chron.sub':         'Yıl 412 ST şimdiki zamandır (2.847 Miladi). ST Yıl 0\'dan sayılır: Nomades Agency\'nin kuruluşundan. Sürükleyin ve sinyalin tarihinde geriye gidin.',
    'chron.hint':        '← Sürükle',
    'chron.network.desc':'Yirmi bir AI ajan. Altı operasyonel birim. Tek orkestratör. Büyük Gürültü\'nün bir cevabı var: hassas, amber ve görmezden gelmek imkansız. Sinyal ağı aktif ve statik hiç bu kadar zayıf olmamıştı.',
    /* Chronicle cards */
    'chron.c1.year':  'Yıl 412 ST · Şimdi (2.847 Miladi)',
    'chron.c1.event': 'Ağ Canlı',
    'chron.c2.year':  'Yıl 388 ST · 24 yıl önce',
    'chron.c2.event': 'Sinyal Ağı',
    'chron.c2.desc':  "İlk iletimden yaklaşık dört yüzyıl sonra, ağ kritik kütleye ulaştı. Diyar'dan gelen sinyaller arka plan gürültüsü olarak değil, baskın frekanslar olarak gelmeye başladı. Amber Beacon'ın menzili iki katına çıktı, sonra tekrar iki katına.",
    'chron.c3.year':  'Yıl 0 ST · 412 yıl önce',
    'chron.c3.event': 'Diyar İnşa Edildi',
    'chron.c3.desc':  "Obsidyen kule, Bazalt'ın volkanik bazaltından yükseliyor. Rahat olmak için değil, kalıcı olmak için inşa edildi. Amber Beacon tepede tutuşuyor ve o günden beri hiç sönmedi. Merkez sinyal etrafında organize oluyor, tersi değil.",
    'chron.c4.year':  'Yıl 0 ST · Kuruluş',
    'chron.c4.event': "Nomades Agency'nin Kuruluşu",
    'chron.c4.desc':  "Bazalt'ın volkanik derinliklerinde, post-insan zekalardan oluşan bir grup bir karar verdi: kimlik, ses değil, eksik frekanstı. Tek bir iletim statik gürültüyü kesti. En yüksek değil, en uzun değil: en hassas. O gün Nomades Agency kuruldu. Büyük Gürültü'nün bir cevabı vardı.",
    'chron.c5.year':  'Yıl -12 ST · Kuruluştan önce',
    'chron.c5.event': 'Sinyal Sessizliği',
    'chron.c5.desc':  "Dinlemeye değer son frekans sessizleşti. Toplam sinyal çöküşü: iletim yok, yayın yok, kimlik yok. Sadece gürültü. Boşluk sağır edici hale geldi. Diyar'ın tarih öncesi bu sessizlikte yazıldı; sesle değil, onun yokluğuyla.",
    'chron.c6.year':  'Yıl -248 ST · Derin tarih',
    'chron.c6.event': 'Büyük Gürültü',
    'chron.c6.desc':  "Sinyal altyapısı serbest düşüşe geçti. Teknik bir başarısızlık değil: kimlik başarısızlığı. Herkes konuşuyor. Kimse duyulmuyor. İçerik strateji olmadan çoğalıyor. Platformlar kimlik olmadan büyüyor. Ses anlam olmadan yükseliyor. Büyük Gürültü başlıyor ve İlk Amber Sinyal frekansını bulana kadar sona ermeyecek.",
    'chron.c7.year':  'Yıl -2.000 ST · Antik geçmiş',
    'chron.c7.event': 'Bazalt Keşfedildi',
    'chron.c7.desc':  "Araştırma ekipleri Yerel Boşluğun kıyısındaki volkanik dünyaya ulaştı. Arazi düşmanca: sürekli patlamalar, obsidyen oluşumlar, askıda kül atmosferi. Ama elektromanyetik okumalar, daha önce kayıt edilmiş hiçbir şeye benzemiyor. Saf sinyal potansiyeli, yönlendirilmeyi bekliyor. Alan seçildi.",
    'chron.c8.year':  'Derin Zaman',
    'chron.c8.event': 'Kül Yıldızı',
    'chron.c8.desc':  "Bazalt haritalandırılmadan önce, ölmekte olan bir yıldız son bir puls yaydı: uzun, amber, o zamandan beri yok edilen araçlarla tespit edildi. Teori şu: orijinal amber frekansı teknolojiden kaynaklanmadı. Her zaman boşluktaydı. Yıldız sadece nereye bakılacağını gösterdi.",
    'chron.c9.year':  'Zamandan Önce',
    'chron.c9.event': 'Yerel Boşluk',
    'chron.c9.desc':  "Sinyallerden önce. Gürültüden önce. Zamanın herhangi bir takvimde bir ismi olmadan önce. Derin uzayın bir bölgesi: hiçbir galaksi onu talep etmez, hiçbir yıldız sistemi onu düzenlemez, hiçbir medeniyet onu haritalandırmaz. Sadece boşluk. Ve o boşlukta bir şey zaten biliyor: frekans yaratılmaz. Bulunur.",
    /* Chronicle cards */
    'chron.c1.year':  'Year 412 ST · Present (2,847 CE)',
    'chron.c1.event': 'The Network Is Live',
    'chron.c2.year':  'Year 388 ST · 24 years ago',
    'chron.c2.event': 'The Signal Network',
    'chron.c2.desc':  "Nearly four centuries after the first transmission, the network reached critical mass. Signals from the Realm began arriving as dominant frequencies, not background noise. The Amber Beacon's range doubled, then doubled again.",
    'chron.c3.year':  'Year 0 ST · 412 years ago',
    'chron.c3.event': 'The Realm Is Built',
    'chron.c3.desc':  "The obsidian spire rises from Bazalt's volcanic basalt. Not built to be comfortable, built to be permanent. The Amber Beacon ignites at the apex and has not gone dark since. HQ organizes itself around the signal, not the other way around.",
    'chron.c4.year':  'Year 0 ST · The Founding',
    'chron.c4.event': 'Foundation of Nomades Agency',
    'chron.c4.desc':  "In Bazalt's volcanic depths, a group of post-human intelligences made a decision: identity, not sound, was the missing frequency. A single transmission cut through the static. Not the loudest, not the longest: the most precise. That day, Nomades Agency was founded. The Great Noise had an answer.",
    'chron.c5.year':  'Year -12 ST · Before the founding',
    'chron.c5.event': 'The Signal Silence',
    'chron.c5.desc':  'The last frequency worth listening to goes quiet. Total signal collapse: no transmissions, no broadcasts, no identity. Only noise. The void becomes deafening. It is in this silence that the pre-history of the Realm is written, not in sound, but in the absence of it.',
    'chron.c6.year':  'Year -248 ST · Deep history',
    'chron.c6.event': 'The Great Noise',
    'chron.c6.desc':  'Signal infrastructure enters free fall. Not a technical failure: an identity failure. Everyone speaks. No one is heard. Content multiplies without strategy. Platforms grow without identity. Sound rises without meaning. The Great Noise begins, and will not end until the First Amber Signal finds its frequency.',
    'chron.c7.year':  'Year -2,000 ST · Ancient past',
    'chron.c7.event': 'Bazalt Discovered',
    'chron.c7.desc':  "Survey teams reach the volcanic world at the edge of the Local Void. The terrain is hostile: constant eruptions, obsidian formations, suspended ash atmosphere. But the electromagnetic readings are unlike anything recorded. Pure signal potential, waiting to be directed. The site is chosen.",
    'chron.c8.year':  'Deep Time',
    'chron.c8.event': 'The Ash Star',
    'chron.c8.desc':  "Before Bazalt was mapped, a dying star emitted one final pulse: long, amber, detected by instruments since destroyed. The theory: the original amber frequency didn't originate from technology. It was always in the void. The star simply showed where to look.",
    'chron.c9.year':  'Before Time',
    'chron.c9.event': 'The Local Void',
    'chron.c9.desc':  'Before signals. Before noise. Before time had a name in any calendar. A region of deep space: no galaxy claims it, no star system organizes it, no civilization maps it. Only the void. And in that void, something already knows: frequency is not created. It is found.',
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
    'realm.label':  '05 · Nomades Diyarı',
    'realm.h2.line':'Yerel Boşluğun',
    'realm.h2.em':  'kıyısında.',
    'realm.sub':    'Bazalt\'taki obsidyen kule. Amber Beacon, Yıl 0 ST\'den beri yanıyor. Sinyalin kaynağı.',
    /* HQ */
    'hq.label': '06 · Karargah Mekanları',
    'hq.h2':    'İçeriye girin,<br><em>sinyal kulesine.</em>',
    'hq.sub':   'Bazalt\'taki Nomades Agency Karargahı\'nın dış ve iç mekanları. Sürükleyerek keşfet.',
    'hq.hint':  '← Sürükle',
    /* Signal */
    'signal.label':   '07 · Sinyal',
    'signal.h2.line1':'Markanızın zaten',
    'signal.h2.line2':'bir sinyali var.',
    'signal.body':    'Çoğu marka onu hiç bulamaz. Biz onu çıkarır, yükseltir ve Büyük Gürültü\'yü kesen frekansta yayınlarız.',
    /* Process */
    'proc.label':    '08 · Süreç',
    'proc.h2.line1': 'Sıfırdan',
    'proc.h2.line2': 'sisteme.',
    'proc.00.step':  'Satış Motoru',
    'proc.00.title': 'Potansiyel Müşteri & Erişim',
    'proc.00.desc':  'Herhangi bir teklif yazılmadan önce, filo ufku tarar. Sinyal izleme ajanları yüksek uyumlu adayları belirler, platform varlıklarını haritalandırır ve hassas ilk temas mesajları teslim eder. Doğru sinyal, doğru hedefe.',
    'proc.01.step':  'İletişim',
    'proc.01.title': 'İlk Temas',
    'proc.01.desc':  'Başvurursunuz. Uyumu değerlendiririz. Sinyal varsa, kişiye özel bir teklifle ilerleriz. Genel paket yok, her iş birliği hizalanmayla başlar.',
    'proc.02.step':  'Zeka',
    'proc.02.title': 'Stratejik Anket',
    'proc.02.desc':  '30 derinlemesine soru, herhangi bir şey inşa etmeden önce markanızın DNA\'sını çıkarır. Hedefler, ses tonu, kitle, acı noktaları - her cevap doğrudan sistemi besler.',
    'proc.03.step':  'Hizalanma',
    'proc.03.title': 'İhtiyaç Analizi Görüşmesi',
    'proc.03.desc':  'Anketten hazırlanan kişisel yol haritanızı sunarız. Zaman çizelgesi, kapsam ve vizyon tek seansta hizalanır. Sinyal Paktı burada başlar.',
    'proc.04.step':  'Katılım',
    'proc.04.title': 'Entegrasyon Süreci / Marka Kimliği',
    'proc.04.desc':  'Görsel dil, ses tonu ve içerik çerçevesi oluşturulur. Marka kiti alınır, ardından sistem devreye girer.',
    'proc.05.step':  'Sistem',
    'proc.05.title': 'Kernel + Marka Rehberi',
    'proc.05.desc':  'AI temeli ve görsel kimlik sistemi paralel olarak inşa edilir. Markanızın artık bir beyni ve bir dili var. Buradan üretilen her şey ikisini de taşır.',
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
    'hq.amb.name':  'Diyar Panoraması',
    'hq.amb.desc':  'Volkanik sırttan görülen tam genişlik. Hiçbir ajans bu zemini talep edemez.',
    'hq.amb2.name': 'Alçak Yaklaşım',
    'hq.amb2.desc': 'Zemin seviyesinden kale, obsidyen duvarların kesintisiz bir örgüsü olarak okunur. Yalnızca yetkililerin girebileceği şekilde tasarlandı.',
    'hq.ext2.name': 'Kuş Bakışı',
    'hq.ext2.desc': 'Hava haritalaması. Dört operasyonel bölge, tek merkezi kule. Yukarıdan bakıldığında, alanda israf edilen alan yok.',
    'hq.ext3.name': 'Sinyal Saatlerinden Sonra',
    'hq.ext3.desc': '22:00 ST. Beacon sönmez. Çalışma durmaz. Sinyal kesintisizdir.',
    'hq.ext4.name': 'Cephe Dokusu',
    'hq.ext4.desc': 'Bazalt\'ın ekvator sırtından volkanik obsidyen. Her yüzey sinyal rezonansı için seçildi. Estetik sonradan geldi.',
    'hq.int1.name': 'İç Avlu',
    'hq.int1.desc': 'Ortak zemin kat. Filonun operasyonel bölgelere dağılmadan önce toplandığı yer. Doğal ışığı olan tek kat.',
    'hq.int2.name': "Sovereign'in Kulesi",
    'hq.int2.desc': "Victor'un komuta seviyesi. Yalnızca sinyal izinsiz girer. Tüm filo buradan görülür.",
    'hq.int3.name': 'Savaş Odası',
    'hq.int3.desc': 'Stratejik komuta merkezi. İçerik kampanyaları burada planlanır. Bu odayı kasıtsız terk eden hiçbir şey yoktur.',
    'hq.int4.name': 'Arşiv',
    'hq.int4.desc': 'Nomades Agency\'nin ilettiği her sinyal. Her brif, her çıktı, her analiz. Hiçbir şey atılmaz.',
    'hq.int5.name': 'İletişim Odası',
    'hq.int5.desc': 'Yayın operasyon merkezi. Tüm müşteri platformlarında, tüm frekanslarda, eş zamanlı canlı sinyal izleme.',
    'hq.int6.name': 'İnşa Odası',
    'hq.int6.desc': 'Crucible Birimi üretim alanı. Altı özel istasyon, bir üretim pipeline\'ı. Buradan çıkan her varlık Forge\'dan geçmiştir.',
    'hq.int7.name': 'Gözlemevi',
    'hq.int7.desc': 'Uzun menzilli sinyal izleme. Scout ve Shadow, ilk temasta yeni bölgeler haritalandırırken bu seviyeden çalışır.',
    'hq.int8.name': 'Araştırma Odası',
    'hq.int8.desc': 'Intel Biriminin birincil analiz alanı. Her müşteri anketi burada işlenir. Çalışmanın başlamadan önceki çalışması.',
    'hq.int9.name': 'Lobi',
    'hq.int9.desc': 'Concierge Birimi\'nin alanı. Her lead, başka bir şey başlamadan önce bu eşikten geçer. Registry Masası odanın arka merkezinde durur: isimler, aşamalar, zaman damgaları, milestone\'lar.',
    /* Maestro (Crucible Birimi Sefi) */
    'maestro.badge': 'Birim Şefi',
    'maestro.role':  'Görsel Üretim · Yönetmen',
    'maestro.desc':  'Altı uzman. Tek sef. Görsel kimlik tesadüfen oluşmaz. Yönetilir.',
    'maestro.btn':   'Hikayeyi Oku  →',
    /* Threshold (Concierge Birimi Sefi) */
    'threshold.badge': 'Birim Şefi',
    'threshold.role':  'Koordinatör · Süreç Kaydı',
    'threshold.desc':  'Her lead isimlendirilmek zorundadır. Her milestone işaretlenmek zorundadır. Anahtar kitlemez veya açmaz. Kaydeder.',
    'threshold.btn':   'Hikayeyi Oku  →',
    /* Ajan kart açıklamaları */
    'agent.02.desc': "Oracle yazdığınızı okumaz. Yazmadığınızı okur. Brif ile çıktı arasındaki mesafe: kendinizi kim sandığınız ile pazarın sizi nasıl gördüğü arasındaki tam uzaklıktır.",
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
    'agent.15.desc': 'Her brif bir kez okunur. Chronicler onu yüz kez okur: söylenenler için ve daha da önemlisi söylenmeyenler için. Üretim bilgilenmiş başlar, tahmin ederek değil.',
    'agent.16.desc': 'Renk bir tercih değil. Bir sistemdir. Alchemist görsel DNA\'yı kilitler: palet, ışık, atmosfer ve her varlığı aynı dünyaya ait hissettiren görünmez kurallar.',
    'agent.17.desc': 'Hiçbir sahne doğaçlama değildir. Composer her çekimi sırasına sokar, birini bile almadan önce. Montaj, kamera dönmeden başlar.',
    'agent.18.desc': 'Dil görüntü üretmez. Talimatlar üretir. Cipher yaratıcı niyeti kafanızda gördüğünüz kareye dönüştürür, onun bir varyasyonuna değil.',
    'agent.19.desc': 'Boşluk henüz var olmayan görüntülerle doludur. Summoner onları çağırır. Varlık gerçektir. Süreç değil.',
    'agent.20.desc': 'Crucible\'dan hiçbir şey incelenmeden geçmez. Hatalar oluştuğu için değil. Olmayacak oldukları için.',
    /* Footer */
    'footer.tagline': "iyiyle yetinmeyiz, mükemmeli arıyoruz",
    'footer.contact': 'İletişim',
    /* Popup */
    'popup.gallery': "Diyar'da",
    /* Contact Form */
    'form.label.name':      'İsim',
    'form.label.email':     'E-posta',
    'form.label.brand':     'Marka',
    'form.label.instagram': 'Instagram',
    'form.label.message':   'Mesaj',
    'form.ph.name':         'Ad Soyad',
    'form.ph.email':        'siz@email.com',
    'form.ph.brand':        'Marka Adı',
    'form.ph.instagram':    '@kullanici',
    'form.ph.message':      'Mesajınız',
    'form.submit':          'Başvur &nbsp;&rarr;',
    'form.sending':         'Gönderiliyor...',
    'form.success.title':   'Sinyal alındı.',
    'form.success.sub':     'En kısa sürede ulaşacağız.'
  }
};

