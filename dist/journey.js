/* ============================================================================
   Gestalt Lite — Journey page behaviors
   - reveal()        robust inline-style scroll entrances (never stuck hidden)
   - GestaltPlayer   Web-Speech narration player bound to [data-pl]
                     (stand-in for production curator audio — swap for <audio>)
   - rail scroll-spy sticky progress rail tracks the centered stop
   - nav solidify    transparent over hero → glass past 12px scroll
   - pilot form      composes a prefilled email to hello@gestalt.gallery
   ============================================================================ */
(function () {
  'use strict';
  var docEl = document.documentElement;
  docEl.classList.remove('no-js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Narration text (tiered). Production: replace with curator audio. ── */
  var GESTALT_NARRATION = {
    najee: {
      overview: "Six stories of electric blue rise over Sansom Street. On it, a young woman in a black and white coat, a mustard hat tilted on her head, looks out across Center City with quiet confidence.",
      details: "Amy Sherald paints skin in grayscale, a choice that lifts her subjects out of any single moment and into something timeless. The coat is hand rendered in crisp black line. Only the hat, and the wall behind her, carry full color.",
      context: "The subject is Najee Spencer Young, a Philadelphia teenager who took part in the city's mural education programs. Sherald, who painted Michelle Obama's official portrait, asks a simple question six stories high. Who is allowed to take up this much space in public."
    },
    common: {
      overview: "Eight stories of figures climb the wall at Broad and Spring Garden. Classical statues and Philadelphia teenagers share the same scale, the same wall, the same light.",
      details: "Meg Saligman painted it across 1997 and 1998, using a parachute cloth method that let her work enormous figures near the ground, then raise them into place. At its center stands a young woman in pink.",
      context: "Her name was Tamika, a student who chose her own pose. People came to call her the Mona Lisa on Broad Street. The mural threads one question through every figure. What do we hold in common across all that distance of time."
    },
    youth: {
      overview: "Bold figures in red, yellow, and blue move across a Point Breeze rowhome. Keith Haring painted them in 1987 with a crew of Philadelphia kids. It is the only collaborative public mural Haring made that still stands on its original wall."
    },
    muses: {
      overview: "Nine muses move across the wall at Thirteenth and Locust. Sound, words, dance, discovery. Each one is a portrait of a living Philadelphia artist, gathered around a central arts machine spinning out perfect spheres.",
      details: "A bearded man with a flute represents sound. A seated man with a book is the muse of words. A ballet dancer bears a sphere enclosing the globe, discovery. Circles, compasses, and spheres run through the whole composition, a quiet argument that creativity is the union of the ideal and the real.",
      context: "Meg Saligman painted the mural entirely in her studio, on squares of non woven polyester, then adhered it to the wall like a giant decoupage, one of the earliest demonstrations of the technique she helped pioneer. With Common Threads a few blocks north, it anchors the reputation of one of the city's defining muralists."
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
    var key = root.getAttribute('data-narration') || 'najee';
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
