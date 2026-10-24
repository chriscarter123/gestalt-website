/* ============================================================================
   Gestalt Lite — New York City Journey page behaviors
   Same engine as journey.js; only the narration content differs.
   - reveal()        robust inline-style scroll entrances (never stuck hidden)
   - GestaltPlayer   Web-Speech narration player bound to [data-pl]
                     (stand-in for production curator audio — swap for <audio>)
   - rail scroll-spy sticky progress rail tracks the centered stop
   - nav solidify    transparent over hero → glass past 12px scroll
   - pilot form      composes a prefilled email to hello@gestalt.gallery

   NOTE: narration text below is a DRAFT written from public record. Verify all
   facts (years, locations, attributions) before publishing, and replace with
   real curator-narrated audio in production.
   ============================================================================ */
(function () {
  'use strict';
  var docEl = document.documentElement;
  docEl.classList.remove('no-js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Narration text (tiered). Production: replace with curator audio. ── */
  var GESTALT_NARRATION = {
    crack: {
      overview: "On a handball court off the Harlem River Drive, day-glo orange blazes behind black figures twisting in alarm. Keith Haring painted it in 1986, at the height of the crack epidemic, two words repeating across the wall like a warning. Crack is Wack.",
      details: "Haring painted it without a permit, and was briefly arrested. The public response was so strong that the city invited him back to restore it, and the handball court was later renamed the Keith Haring Playground. It still stands, repainted to his design, visible from the drive.",
      context: "Haring came up drawing in the subways, chalking the empty black ad panels, and spent his short career insisting that art belonged in public, free, for everyone. He died in 1990 at thirty-one. Crack is Wack is one of the last of his New York walls still standing on its original site."
    },
    houston: {
      overview: "The corner of East Houston Street and the Bowery holds the most-painted wall in New York. Keith Haring covered it in 1982. Since 2008 it has been a rotating canvas, repainted by a different major artist every few months.",
      details: "Os Gemeos, Shepard Fairey, Crash, Retna, and many others have each taken a turn. By design the wall holds no permanent image. The work is the turning over, a living record of who is painting the city right now.",
      context: "When Haring first painted it the Bowery was a different street, rougher and cheaper, full of artists. The wall outlived that era and became a landmark of the change, a single rectangle of brick that the whole story of New York street art keeps passing through."
    },
    bushwick: {
      overview: "Around Troutman Street and Saint Nicholas Avenue in Bushwick, Brooklyn, warehouse walls carry hundreds of murals by artists from around the world. It is an open-air gallery that never stops changing.",
      details: "It began around 2011, when a local named Joe Ficalora started inviting artists to paint the industrial blocks he grew up on, in a neighborhood he had watched struggle. There is no ticket and no closing time. Walls are repainted year after year.",
      context: "Bushwick was an unlikely place for one of the world's best-known street-art destinations, and that is the point. The Collective turned a working-class corner of Brooklyn into a stop on a global map, painted by the people who came to it."
    },
    audubon: {
      overview: "Across Hamilton Heights and Washington Heights, storefront gates and building walls carry murals of birds. Hundreds of species, each one threatened by a warming climate, painted at life and larger than life across upper Manhattan.",
      details: "The project began around 2014, a collaboration between the National Audubon Society and a neighborhood gallery. The site was chosen with care. The naturalist John James Audubon lived in this part of Manhattan and is buried nearby, at Trinity Church Cemetery on 155th Street.",
      context: "Audubon's great work was a book of painted birds. Two centuries later the murals answer it in the open air, turning his catalog of American species into a public warning about which of them the next century may lose."
    }
  };

  /* ── Reveal on scroll ────────────────────────────────────────────────── */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-stagger'));
    function kids(el) {
      return el.classList.contains('reveal-stagger') ? Array.prototype.slice.call(el.children) : [el];
    }
    function hide(el) {
      kids(el).forEach(function (n) {
        n.style.opacity = '0';
        n.style.transform = el.classList.contains('reveal-stagger') ? 'translateY(16px)' : 'translateY(24px)';
      });
    }
    function show(el) {
      if (el.__shown) return; el.__shown = true;
      kids(el).forEach(function (n, i) {
        if (el.classList.contains('reveal-stagger')) n.style.transitionDelay = (i * 0.07) + 's';
        n.style.opacity = '1'; n.style.transform = 'none';
      });
    }
    var pending = [];
    if (!reduceMotion) {
      var vh0 = window.innerHeight || 700;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top > vh0 * 0.9) { hide(el); pending.push(el); }
      });
    }
    function flush() {
      var vh = window.innerHeight || 700;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > -60) { show(pending[i]); pending.splice(i, 1); }
      }
    }
    if ('IntersectionObserver' in window && pending.length) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) show(e.target); });
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
      pending.forEach(function (el) { io.observe(el); });
    }
    window.addEventListener('scroll', flush, { passive: true });
    window.addEventListener('resize', flush);
    requestAnimationFrame(flush);
    setTimeout(function () { els.forEach(show); pending.length = 0; }, 1700);
  }

  /* ── Nav solidify ────────────────────────────────────────────────────── */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    function onScroll() { nav.classList.toggle('solid', window.scrollY > 12); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Rail scroll-spy ─────────────────────────────────────────────────── */
  function initRail() {
    var stops = Array.prototype.slice.call(document.querySelectorAll('.stop'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.rdot'));
    var cur = document.getElementById('rail-cur');
    var now = document.getElementById('rail-now');
    if (!stops.length || !dots.length) return;
    function setActive(idx) {
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
        d.classList.toggle('done', i < idx);
      });
      if (cur) cur.textContent = stops[idx].getAttribute('data-stop-n') || '01';
      if (now) now.textContent = stops[idx].getAttribute('data-stop-title') || '';
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setActive(stops.indexOf(e.target));
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      stops.forEach(function (s) { io.observe(s); });
    }
    setActive(0);
  }

  /* ── Narration player ────────────────────────────────────────────────── */
  var WPM = 165;
  function GestaltPlayer(root) {
    var key = root.getAttribute('data-narration') || 'crack';
    var N = GESTALT_NARRATION[key];
    if (!N) return;
    var TTS = 'speechSynthesis' in window;
    var btn = root.querySelector('[data-pl-btn]');
    var icon = root.querySelector('[data-pl-icon]');
    var label = root.querySelector('[data-pl-label]');
    var scrub = root.querySelector('[data-pl-scrub]');
    var fill = root.querySelector('[data-pl-fill]');
    var timeEl = root.querySelector('[data-pl-time]');
    var trBox = root.querySelector('[data-pl-transcript]');
    var trText = root.querySelector('[data-pl-trtext]');
    var trToggle = root.querySelector('[data-pl-trtoggle]');

    var order = ['overview', 'details', 'context'].filter(function (k) { return N[k]; });
    var cur = order[0], playing = false, paused = false, elapsed = 0, total = 0, raf = null, last = 0, played = false;
    var words = [], spans = [], utter = null;

    function fmt(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }
    function tierTotal(t) { return N[t].trim().split(/\s+/).length / (WPM / 60); }
    function showTime() { if (timeEl) timeEl.textContent = fmt(elapsed) + ' / ' + fmt(total); }
    function build(t) {
      if (!trText) return;
      words = N[t].trim().split(/\s+/); trText.innerHTML = '';
      spans = words.map(function (w, i) { var s = document.createElement('span'); s.textContent = w + (i < words.length - 1 ? ' ' : ''); trText.appendChild(s); return s; });
    }
    function clearHl() { spans.forEach(function (s) { s.classList.remove('pl-word'); }); }
    function hlAt(ci) {
      var acc = 0, t = N[cur].trim();
      for (var i = 0; i < words.length; i++) {
        var st = t.indexOf(words[i], acc);
        if (ci <= st + words[i].length) { clearHl(); if (spans[i]) spans[i].classList.add('pl-word'); return; }
        acc = st + words[i].length;
      }
    }
    function setIcon(p) {
      if (icon) icon.innerHTML = p
        ? '<rect x="6" y="5" width="4" height="14" rx="1"></rect><rect x="14" y="5" width="4" height="14" rx="1"></rect>'
        : '<path d="M8 5v14l11-7z"></path>';
      if (btn) btn.setAttribute('aria-label', p ? 'Pause narration' : 'Play narration');
      if (label) label.textContent = p ? 'Pause' : (played ? 'Resume' : 'Listen');
    }
    function tick(ts) {
      if (!playing) return; if (!last) last = ts;
      elapsed += (ts - last) / 1000; last = ts;
      if (elapsed >= total) { elapsed = total; finish(); return; }
      if (fill) fill.style.width = (elapsed / total * 100) + '%'; showTime();
      raf = requestAnimationFrame(tick);
    }
    function startT() { last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); }
    function stopT() { cancelAnimationFrame(raf); last = 0; }
    function speak() {
      if (!TTS) return; window.speechSynthesis.cancel();
      utter = new SpeechSynthesisUtterance(N[cur]); utter.rate = 0.98; utter.lang = 'en-US';
      var vs = window.speechSynthesis.getVoices().filter(function (v) { return /en(-|_)?(US|GB)?/i.test(v.lang); });
      if (vs.length) utter.voice = vs.find(function (v) { return /Samantha|Google US English|Daniel|Karen|Microsoft/i.test(v.name); }) || vs[0];
      utter.onboundary = function (e) { if (e.charIndex != null) hlAt(e.charIndex); };
      utter.onend = function () { if (playing) finish(); };
      window.speechSynthesis.speak(utter);
    }
    function play() {
      if (!total) total = tierTotal(cur);
      playing = true; paused = false; played = true; setIcon(true); startT(); if (TTS) speak();
    }
    function pause() { playing = false; paused = true; setIcon(false); stopT(); if (TTS) window.speechSynthesis.pause(); }
    function finish() {
      playing = false; paused = false; stopT(); if (TTS) window.speechSynthesis.cancel();
      elapsed = 0; if (fill) fill.style.width = '0%'; showTime(); clearHl(); setIcon(false);
      if (label) label.textContent = 'Listen again';
    }
    function reset(t) { cur = t; total = tierTotal(t); elapsed = 0; if (fill) fill.style.width = '0%'; build(t); showTime(); }

    if (btn) btn.addEventListener('click', function () {
      if (playing) pause();
      else if (paused) { playing = true; paused = false; setIcon(true); startT(); if (TTS) window.speechSynthesis.resume(); }
      else play();
    });
    if (scrub) scrub.addEventListener('click', function (e) {
      if (!total) total = tierTotal(cur);
      var r = scrub.getBoundingClientRect(), ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      elapsed = ratio * total; if (fill) fill.style.width = (ratio * 100) + '%'; showTime(); if (playing && TTS) speak();
    });
    if (trToggle && trBox) trToggle.addEventListener('click', function () {
      var open = trBox.classList.toggle('open');
      trToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      var l = trToggle.querySelector('[data-pl-trlabeltoggle]'); if (l) l.textContent = open ? 'Hide transcript' : 'Read transcript';
    });
    if (TTS) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = function () { window.speechSynthesis.getVoices(); }; }
    window.addEventListener('pagehide', function () { if (TTS) window.speechSynthesis.cancel(); });
    reset(order[0]); setIcon(false);
  }
  function initPlayers() { document.querySelectorAll('[data-pl]').forEach(GestaltPlayer); }

  /* ── Pilot form → prefilled email (no backend; nothing sent silently) ── */
  function initForm() {
    var f = document.getElementById('pilot-form');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (f.querySelector('#j-name') || {}).value || '';
      var org = (f.querySelector('#j-org') || {}).value || '';
      var email = (f.querySelector('#j-email') || {}).value || '';
      var what = (f.querySelector('#j-what') || {}).value || '';
      var subject = 'Pilot conversation' + (org ? ' — ' + org : '');
      var body = 'Name: ' + name + '\nOrganization: ' + org + '\nEmail: ' + email + '\nWhat we would narrate: ' + what + '\n';
      window.location.href = 'mailto:hello@gestalt.gallery?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var note = f.querySelector('[data-form-note]');
      if (note) note.textContent = 'This opens your email app — nothing is sent without you.';
    });
  }

  function start() { initReveal(); initNav(); initRail(); initPlayers(); initForm(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
