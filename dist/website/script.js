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

/* --- Hamburger Menu Morph --- */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
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
