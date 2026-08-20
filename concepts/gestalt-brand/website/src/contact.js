/* ═══════════════════════════════════════════════════════════════════════
   Gestalt — Contact page
   Reuses the institutions boot (smooth scroll, scrubbed video, reveals,
   parallax — all reduced-motion guarded) and adds the form submission,
   posting to the same Cloud Function endpoint as the previous site.
   ═══════════════════════════════════════════════════════════════════════ */

import "./institutions.js";
import "./contact.css";

const ENDPOINT = "https://us-central1-gestalt-17ce0.cloudfunctions.net/contactForm";

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  const button = form.querySelector('button[type="submit"]');
  const buttonHTML = button.innerHTML;

  /* Arithmetic check. The answer lives in this closure, not in the DOM, so
     the laziest scrapers can't read it off an attribute. It's a speed bump
     for dumb bots, not real bot defense — the endpoint stays open. */
  const captchaLabel = document.getElementById("captcha-label");
  const captchaInput = document.getElementById("captcha");
  let captchaAnswer = null;

  function newCaptcha() {
    const a = 2 + Math.floor(Math.random() * 8);
    const b = 2 + Math.floor(Math.random() * 8);
    captchaAnswer = a + b;
    captchaLabel.textContent = `Quick check — what is ${a} + ${b}?`;
    captchaInput.value = "";
  }

  if (captchaLabel && captchaInput) newCaptcha();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (captchaInput && Number(captchaInput.value.trim()) !== captchaAnswer) {
      status.className = "form-status error";
      status.textContent = "That answer isn't right — try the new question.";
      newCaptcha();
      captchaInput.focus();
      return;
    }

    button.disabled = true;
    button.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          institution: form.institution.value,
          message: form.message.value,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        form.reset();
        if (captchaInput) newCaptcha();
        status.className = "form-status success";
        status.textContent = "Thanks for reaching out! We’ll be in touch shortly.";
      } else {
        status.className = "form-status error";
        status.textContent =
          data.error || "Something went wrong. Please try again, or email hello@gestalt.gallery.";
      }
    } catch (err) {
      status.className = "form-status error";
      status.textContent =
        "Couldn’t reach the server. Please try again, or email hello@gestalt.gallery.";
    } finally {
      button.disabled = false;
      button.innerHTML = buttonHTML;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupContactForm);
} else {
  setupContactForm();
}
