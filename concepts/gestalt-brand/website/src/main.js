/* ═══════════════════════════════════════════════════════════════════════
   Gestalt — scroll-driven landing page
   Lenis smooth scroll · GSAP ScrollTrigger pins · scroll-scrubbed video

   Reduced-motion is handled first and hard. Everything below the guard is
   optional enhancement; the page is fully readable and navigable without
   any of it. That ordering is deliberate — see brand kit §12.
   ═══════════════════════════════════════════════════════════════════════ */

import "./style.css";
import "./glass.css";

import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TOUCH = window.matchMedia("(hover: none), (max-width: 768px)").matches;
// Video gating is touch-only: narrow desktop windows scrub fine (see CSS)
const TOUCH_DEVICE = window.matchMedia("(hover: none)").matches;

/* ═══ 1 · Smooth scroll ══════════════════════════════════════════════════
   Lenis is skipped entirely under reduced-motion. Hijacking scroll for a
   user who asked for less motion is the opposite of accessible, and native
   scrolling also keeps keyboard paging and screen-reader virtual cursors
   behaving normally. */

let lenis = null;

/* ═══ 0 · Preloader ══════════════════════════════════════════════════════
   The overlay hides when the background video can play — or right away on
   touch/reduced-motion where the video never loads, or at a hard 3.5s cap.
   A 600ms minimum stops it flashing on cache hits. Emits "gestalt:loaded"
   so the hero waterfall starts against a visible page. */

function setupLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const MIN_SHOW = 600;
  const MAX_WAIT = 3500;
  const start = performance.now();
  let hidden = false;

  const hide = () => {
    if (hidden) return;
    hidden = true;
    const wait = Math.max(0, MIN_SHOW - (performance.now() - start));
    setTimeout(() => {
      loader.classList.add("loader--done");
      document.dispatchEvent(new CustomEvent("gestalt:loaded"));
      loader.addEventListener("transitionend", () => loader.remove(), { once: true });
      // Reduced-motion collapses the transition to ~0ms; sweep regardless
      setTimeout(() => loader.isConnected && loader.remove(), 900);
    }, wait);
  };

  const video = document.getElementById("bgv");
  if (!video || REDUCED || TOUCH_DEVICE) {
    hide();
    return;
  }

  if (video.readyState >= 3) hide();
  video.addEventListener("canplay", hide, { once: true });
  video.addEventListener("canplaythrough", hide, { once: true });
  video.addEventListener("error", hide, { once: true });
  setTimeout(hide, MAX_WAIT);
}

function setupSmoothScroll() {
  if (REDUCED) return;

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchors need routing through Lenis or they fight it
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    });
  });
}

/* ═══ 2 · Scroll-scrubbed background video ═══════════════════════════════
   The video is decorative (aria-hidden in markup). If bg.mp4 is missing or
   fails to decode, the pale static field stays visible and nothing else
   breaks — the page must never depend on the media being present. */

function setupBackgroundVideo() {
  const video = document.getElementById("bgv");
  if (!video || REDUCED || TOUCH_DEVICE) return;

  let lastT = -1;
  let ready = false;

  const onReady = () => {
    if (ready) return;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    ready = true;
    document.body.classList.add("has-video");
    video.pause();
    scrub();
  };

  video.addEventListener("loadedmetadata", onReady);
  video.addEventListener("canplay", onReady);
  video.addEventListener("error", () => {
    // Leave .has-video off; the fallback field remains
    console.info("[gestalt] bg.mp4 unavailable — using static background.");
  });

  // Some browsers need a play/pause nudge before seeking works reliably
  video.play().then(() => video.pause()).catch(() => {});

  // Metadata may already be in by the time listeners attach (fast local
  // loads, cache hits) — in that case neither event fires again
  if (video.readyState >= 1) onReady();

  function scrub() {
    if (!ready) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? gsap.utils.clamp(0, 1, window.scrollY / max) : 0;
    const t = p * (video.duration - 0.05);

    // Throttle redundant seeks — each one costs a decode
    if (Math.abs(t - lastT) > 0.008) {
      video.currentTime = t;
      lastT = t;
    }
  }

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: scrub,
    invalidateOnRefresh: true,
  });

  window.addEventListener("resize", scrub);

  if (import.meta.env.DEV) window.__bgv = video;
}

/* ═══ 3 · Generic reveals ════════════════════════════════════════════════ */

function setupReveals() {
  const items = gsap.utils.toArray(".reveal");
  if (!items.length) return;

  if (REDUCED) {
    gsap.set(items, { opacity: 1, y: 0 });
    return;
  }

  items.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  // Hero copy waterfalls on load rather than waiting for a scroll — but not
  // behind the preloader: hold until the overlay lifts so the reveal is seen
  const heroItems = gsap.utils.toArray("#home .reveal");
  const playHero = () =>
    gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05, // brand kit §12 stagger token
      ease: "power3.out",
      delay: 0.15,
    });

  if (document.getElementById("loader")) {
    document.addEventListener("gestalt:loaded", playHero, { once: true });
  } else {
    playHero();
  }
}

/* ═══ 3.5 · Hero phone — scroll-scrubbed screen crossfade ════════════════
   The hero pins briefly while the phone in the top right walks through the
   app's screens. Under reduced motion or on touch, the phone (when shown at
   all) simply holds its first screen — CSS handles that default. */

function setupHeroPhone() {
  const hero = document.querySelector("#home");
  const screens = [...document.querySelectorAll("#hero-screens img")];
  if (!hero || screens.length < 2 || REDUCED || TOUCH) return;

  const N = screens.length;

  function render(p) {
    // pos slides across the deck; each screen fades over its neighbours
    const pos = p * (N - 1);
    screens.forEach((img, i) => {
      const o = gsap.utils.clamp(0, 1, 1 - Math.abs(pos - i));
      img.style.opacity = String(o);
      // A whisper of drift so the swap reads as motion, not a cut
      img.style.transform = `scale(${0.985 + o * 0.015})`;
    });
  }

  render(0);

  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: () => "+=" + window.innerHeight * 2.2,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => render(self.progress),
  });
}

/* ═══ 4 · Impact — pinned word-by-word reveal ════════════════════════════ */

function setupImpact() {
  const section = document.querySelector("#impact");
  if (!section || REDUCED || TOUCH) return;

  const pin = section.querySelector(".impact__pin");
  const words = [...section.querySelectorAll(".word")];
  if (!pin || !words.length) return;

  function render(p) {
    words.forEach((word, i) => {
      const start = (i / words.length) * 0.72;
      const o = gsap.utils.clamp(0, 1, (p - start) / 0.12);
      word.style.opacity = String(0.14 + o * 0.86);
      // A resolved word must drop the filter entirely — blur(0px) still
      // rasterizes the glyphs through a filter layer and reads as soft text
      word.style.filter = o >= 1 ? "none" : `blur(${(1 - o) * 7}px)`;
      word.style.transform = o >= 1 ? "none" : `translateY(${(1 - o) * 16}px)`;
    });
  }

  render(0);

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + window.innerHeight * 1.7,
    pin,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => render(self.progress),
  });
}

/* ═══ 5 · Audiences — one-card-at-a-time gallery inside the showcase ═════
   Lives in the showcase's right column now: the argument holds still on
   the left while the four audiences cycle through beside it. */

function setupWorkflowGallery() {
  const track = document.querySelector("#workflow-track");
  if (!track || REDUCED || TOUCH) return;

  const slides = [...track.querySelectorAll(".workflow-card")];
  const N = slides.length;
  if (N < 2) return;

  function render(p) {
    const pos = p * (N - 1);

    slides.forEach((el, i) => {
      const d = pos - i;
      const ad = Math.abs(d);
      const opacity = Math.max(0, 1 - ad / 0.6);

      el.style.opacity = String(opacity);
      // Shorter slide than the old full-width section — the column is narrow
      el.style.transform = `translate(${-d * 48}px, -50%) scale(${1 - Math.min(ad, 1) * 0.06})`;
      // Same rule as the impact words: the centred card must not carry a
      // zero-blur filter layer, or its text renders soft
      el.style.filter = ad < 0.02 ? "none" : `blur(${Math.min(ad * 10, 14)}px)`;
      el.style.zIndex = String(100 - Math.round(ad * 10));

      // Off-screen cards must leave the tab order, or keyboard focus lands
      // on an invisible blurred card and the page appears to jump nowhere
      const hidden = opacity < 0.6;
      el.style.pointerEvents = hidden ? "none" : "auto";
      if (hidden) {
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("aria-hidden");
      }
    });
  }

  render(0);

  ScrollTrigger.create({
    trigger: "#showcase",
    start: "top top",
    end: () => "+=" + Math.max(1, N - 1) * window.innerHeight * 0.72,
    pin: ".showcase__pin",
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => render(self.progress),
  });
}

/* ═══ 5.5 · Listen — audio description demo ══════════════════════════════
   Ported from gestalt.gallery's hero player. Deliberately outside every
   REDUCED/TOUCH gate: user-initiated audio is content, not motion, and it
   must work everywhere. */

function setupAudioDemo() {
  const player = document.querySelector("[data-audio-player]");
  if (!player) return;

  const audio = player.querySelector("[data-audio]");
  const toggleButton = player.querySelector("[data-audio-toggle]");
  const stopButton = player.querySelector("[data-audio-stop]");
  const timeLabel = player.querySelector("[data-audio-time]");
  const badge = player.querySelector("[data-audio-badge]");
  if (!audio || !toggleButton || !stopButton || !timeLabel || !badge) return;

  const icons = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5,3 19,12 5,21"></polygon></svg>',
    pause:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"></rect><rect x="14" y="5" width="4" height="14" rx="1"></rect></svg>',
    replay:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 3v6h6"></path></svg>',
  };

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function syncUi() {
    const isPlaying = !audio.paused && !audio.ended;
    const hasStarted = audio.currentTime > 0;

    if (audio.ended) {
      toggleButton.innerHTML = icons.replay;
      toggleButton.setAttribute("aria-label", "Replay audio description");
      badge.textContent = "↺ Replay audio description";
    } else if (isPlaying) {
      toggleButton.innerHTML = icons.pause;
      toggleButton.setAttribute("aria-label", "Pause audio description");
      badge.textContent = "❚❚ Audio description playing";
    } else {
      toggleButton.innerHTML = icons.play;
      toggleButton.setAttribute(
        "aria-label",
        hasStarted ? "Resume audio description" : "Play audio description"
      );
      badge.textContent = hasStarted ? "▶ Resume audio description" : "▶ Audio description";
    }

    stopButton.disabled = !hasStarted && !audio.ended;

    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(duration)}`;

    const progress = duration ? (audio.currentTime / duration) * 100 : 0;
    player.style.setProperty("--progress", `${Math.min(progress, 100)}%`);
  }

  toggleButton.addEventListener("click", async () => {
    if (audio.ended) audio.currentTime = 0;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Unable to play audio description.", error);
      }
    } else {
      audio.pause();
    }
  });

  stopButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    syncUi();
  });

  ["loadedmetadata", "timeupdate", "play", "pause", "ended"].forEach((eventName) =>
    audio.addEventListener(eventName, syncUi)
  );

  syncUi();
}

/* ═══ 6 · Subtle parallax on section heads ═══════════════════════════════ */

function setupParallax() {
  if (REDUCED || TOUCH) return;

  // The showcase head sits inside a pin now; parallaxing it would fight
  // the pinned transform and drift the heading out of place
  gsap.utils.toArray(".section-head:not(.showcase .section-head)").forEach((head) => {
    gsap.to(head, {
      y: -28,
      ease: "none",
      scrollTrigger: {
        trigger: head,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
}

/* ═══ Boot ═══════════════════════════════════════════════════════════════ */

function init() {
  setupLoader();
  setupSmoothScroll();
  setupBackgroundVideo();
  setupReveals();
  setupHeroPhone();
  setupImpact();
  setupAudioDemo();
  setupWorkflowGallery();
  setupParallax();

  // Pins change document height; later triggers need recalculating
  ScrollTrigger.refresh();

  if (import.meta.env.DEV) {
    window.__lenis = lenis;
    window.__ST = ScrollTrigger;
    console.info(
      "[gestalt] dev hooks: __lenis, __ST, __bgv · reduced=%s touch=%s",
      REDUCED,
      TOUCH
    );
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Fonts land after first paint and shift layout, which invalidates pin math
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
