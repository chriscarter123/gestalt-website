/* ===================================================================
   GESTALT — Pentagon Art Direction Interactions
   IntersectionObserver scroll reveals, hamburger morph, nav scroll,
   bento card mouse tracking, hero load animation
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initRevealStagger();
  initHamburger();
  initSmoothScroll();
  initNavScroll();
  initBentoMouseTracking();
  initHeroAudioPlayer();
});

/* Trigger hero load animation */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

/* --- Scroll Reveal via IntersectionObserver --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* --- Reveal Stagger Groups --- */
function initRevealStagger() {
  const staggerGroups = document.querySelectorAll('.reveal-stagger');
  if (!staggerGroups.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  staggerGroups.forEach((el) => observer.observe(el));
}

/* --- Hamburger Menu Morph (with ARIA + keyboard support) --- */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!hamburger || !mobileMenu) return;

  // Ensure ARIA wiring is set even if a page's markup predates this script
  if (!hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded', 'false');
  if (!hamburger.hasAttribute('aria-controls')) hamburger.setAttribute('aria-controls', mobileMenu.id || 'mobile-menu');
  if (!mobileMenu.hasAttribute('aria-hidden')) mobileMenu.setAttribute('aria-hidden', 'true');
  if (!mobileMenu.hasAttribute('role')) mobileMenu.setAttribute('role', 'dialog');
  if (!mobileMenu.hasAttribute('aria-modal')) mobileMenu.setAttribute('aria-modal', 'true');
  if (!mobileMenu.hasAttribute('aria-label')) mobileMenu.setAttribute('aria-label', 'Main navigation');

  let previouslyFocused = null;

  function getFocusable() {
    return Array.from(mobileMenu.querySelectorAll('a[href], button:not([disabled])'));
  }

  function isOpen() {
    return hamburger.classList.contains('active');
  }

  function openMenu() {
    previouslyFocused = document.activeElement;
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusables = getFocusable();
    if (focusables.length) focusables[0].focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (restoreFocus) {
      (previouslyFocused && previouslyFocused.focus ? previouslyFocused : hamburger).focus();
    }
  }

  hamburger.addEventListener('click', () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu({ restoreFocus: false }));
  });

  // Keyboard: Escape closes; Tab traps focus inside the open menu
  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getFocusable();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

/* --- Nav Background Shift on Scroll --- */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('nav-scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Bento Card Mouse Glow Tracking --- */
function initBentoMouseTracking() {
  const cards = document.querySelectorAll('.bento-card, .bento-card-shell');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

function initHeroAudioPlayer() {
  const player = document.querySelector('[data-hero-audio-player]');
  if (!player) return;

  const audio = player.querySelector('[data-hero-audio]');
  const toggleButton = player.querySelector('[data-audio-toggle]');
  const stopButton = player.querySelector('[data-audio-stop]');
  const timeLabel = player.querySelector('.lens-time') || document.querySelector('.lens-time');
  const audioBadge = player.querySelector('.audio-badge') || document.querySelector('.audio-badge');
  const transcriptToggle = document.querySelector('.hero-transcript-toggle');
  const transcript = document.getElementById('hero-audio-transcript');

  if (!audio || !toggleButton || !stopButton || !timeLabel || !audioBadge) return;

  // The badge uses decorative unicode (❚❚, ▶, ↺) that some screen readers
  // announce literally. The play button already carries the authoritative
  // state via aria-label, so keep the badge purely visual.
  audioBadge.setAttribute('aria-hidden', 'true');

  if (transcriptToggle && transcript) {
    transcriptToggle.addEventListener('click', () => {
      const isOpen = transcript.hasAttribute('hidden') === false;
      if (isOpen) {
        transcript.setAttribute('hidden', '');
        transcriptToggle.setAttribute('aria-expanded', 'false');
        transcriptToggle.textContent = 'Read transcript';
      } else {
        transcript.removeAttribute('hidden');
        transcriptToggle.setAttribute('aria-expanded', 'true');
        transcriptToggle.textContent = 'Hide transcript';
      }
    });
  }

  const icons = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5,3 19,12 5,21"></polygon></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"></rect><rect x="14" y="5" width="4" height="14" rx="1"></rect></svg>',
    replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 3v6h6"></path></svg>',
  };

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  function syncTime() {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(duration)}`;
  }

  function syncProgress() {
    const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    player.style.setProperty('--progress', `${Math.min(progress, 100)}%`);
  }

  function syncUi() {
    const isPlaying = !audio.paused && !audio.ended;
    const isEnded = audio.ended;
    const hasStarted = audio.currentTime > 0;

    player.classList.toggle('is-playing', isPlaying);
    player.classList.toggle('is-ended', isEnded);

    if (isEnded) {
      toggleButton.innerHTML = icons.replay;
      toggleButton.setAttribute('aria-label', 'Replay audio description');
      audioBadge.textContent = '↺ Replay narration';
    } else if (isPlaying) {
      toggleButton.innerHTML = icons.pause;
      toggleButton.setAttribute('aria-label', 'Pause audio description');
      audioBadge.textContent = '❚❚ Narration playing';
    } else {
      toggleButton.innerHTML = icons.play;
      toggleButton.setAttribute('aria-label', hasStarted ? 'Resume audio description' : 'Play audio description');
      audioBadge.textContent = hasStarted ? '▶ Resume narration' : '▶ Neural Narration';
    }

    stopButton.disabled = !hasStarted && !isEnded;
    syncTime();
    syncProgress();
  }

  async function togglePlayback() {
    if (audio.ended) {
      audio.currentTime = 0;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error('Unable to play hero audio.', error);
      }
      return;
    }

    audio.pause();
  }

  toggleButton.addEventListener('click', togglePlayback);
  stopButton.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    syncUi();
  });

  ['loadedmetadata', 'timeupdate', 'play', 'pause', 'ended'].forEach((eventName) => {
    audio.addEventListener(eventName, syncUi);
  });

  syncUi();
}
