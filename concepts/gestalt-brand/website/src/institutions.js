/* ═══════════════════════════════════════════════════════════════════════
   Gestalt — For Institutions subpage
   A trimmed cut of main.js: smooth scroll, scrubbed background video,
   reveals, and head parallax. No pins — an inside page should read top to
   bottom without hijacking the scroll the way the landing page's set
   pieces do. Reduced-motion collapses everything to static, same as main.
   ═══════════════════════════════════════════════════════════════════════ */

import "./style.css";
import "./glass.css";
import "./institutions.css";

import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TOUCH = window.matchMedia("(hover: none), (max-width: 768px)").matches;
const TOUCH_DEVICE = window.matchMedia("(hover: none)").matches;

let lenis = null;

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
    console.info("[gestalt] bg.mp4 unavailable — using static background.");
  });

  video.play().then(() => video.pause()).catch(() => {});

  if (video.readyState >= 1) onReady();

  function scrub() {
    if (!ready) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? gsap.utils.clamp(0, 1, window.scrollY / max) : 0;
    const t = p * (video.duration - 0.05);

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
}

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

  // Hero copy waterfalls on load rather than waiting for a scroll
  const heroItems = gsap.utils.toArray("#home .reveal");
  gsap.to(heroItems, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: "power3.out",
    delay: 0.15,
  });
}

function setupParallax() {
  if (REDUCED || TOUCH) return;

  gsap.utils.toArray(".section-head").forEach((head) => {
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

function init() {
  setupSmoothScroll();
  setupBackgroundVideo();
  setupReveals();
  setupParallax();

  ScrollTrigger.refresh();

  if (import.meta.env.DEV) {
    window.__lenis = lenis;
    window.__ST = ScrollTrigger;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
