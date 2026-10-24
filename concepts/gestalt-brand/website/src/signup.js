/* ═══════════════════════════════════════════════════════════════════════
   Gestalt — email signups
   Every signup on the site (footer "new murals" field, /designphilly,
   the ADA Readiness Scorecard) lands in one Firestore collection,
   `signups`, written over the Firestore REST API so no SDK ships to the
   page. Rules allow create only, with a fixed field set, and no client
   reads (see firestore-signups.rules).

   Campaign tracking: utm_source / utm_medium / utm_campaign are read from
   the landing URL and kept for the browser session, so a reader who
   arrives on /designphilly and signs up two pages later is still
   credited to the channel that sent them.
   ═══════════════════════════════════════════════════════════════════════ */

const PROJECT = "gestalt-17ce0";
// Public web API key (identifies the project; access is governed by rules)
const API_KEY = "AIzaSyAi-EeTlhYrfAG7AnJSCYIM_6fls-LPDQE";
const ENDPOINT = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/signups?key=${API_KEY}`;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];
const UTM_STORE = "gestalt_utm";

function readStore() {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORE) || "{}");
  } catch {
    return {};
  }
}

export function getUtm() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) fromUrl[k] = v.slice(0, 100);
  });
  if (Object.keys(fromUrl).length) {
    try {
      sessionStorage.setItem(UTM_STORE, JSON.stringify(fromUrl));
    } catch {
      /* storage blocked: tracking falls back to this page's URL only */
    }
    return fromUrl;
  }
  return readStore();
}

/* Appends the session's UTM tags to an outbound link, so the mural tour
   sees the same channel the reader arrived from. */
export function withUtm(href) {
  const utm = getUtm();
  if (!Object.keys(utm).length) return href;
  const url = new URL(href, window.location.href);
  Object.entries(utm).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

const str = (v) => ({ stringValue: String(v).slice(0, 200) });

/**
 * @param {{email:string, type:"visitor"|"scorecard", organization?:string,
 *          name?:string, collectionSize?:string}} lead
 */
export async function submitSignup(lead) {
  const utm = getUtm();
  const fields = {
    email: str(lead.email.trim().toLowerCase()),
    type: str(lead.type),
    sourcePage: str(window.location.pathname),
    utm_source: str(utm.utm_source || ""),
    utm_medium: str(utm.utm_medium || ""),
    utm_campaign: str(utm.utm_campaign || ""),
    createdAt: { timestampValue: new Date().toISOString() },
  };
  if (lead.organization) fields.organization = str(lead.organization.trim());
  if (lead.name) fields.name = str(lead.name.trim());
  if (lead.collectionSize) fields.collectionSize = str(lead.collectionSize);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`signup failed: ${res.status}`);
}

/* Wires every <form data-signup="visitor|scorecard">. Expects an email
   input, optional organization/name inputs, a honeypot input named
   "website", and a [role=status] element for the result message. */
function wire(form) {
  const status = form.querySelector("[data-signup-status]");
  const button = form.querySelector('button[type="submit"]');
  const say = (text, kind) => {
    if (!status) return;
    status.textContent = text;
    status.dataset.state = kind;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.elements.email;
    if (!email.value.trim() || !email.checkValidity()) {
      say("Please enter a valid email address.", "error");
      email.setAttribute("aria-invalid", "true");
      email.focus();
      return;
    }
    email.removeAttribute("aria-invalid");

    // Honeypot: real visitors never see or fill this field
    if (form.elements.website && form.elements.website.value) {
      form.reset();
      say("Thanks. You're on the list.", "success");
      return;
    }

    button.disabled = true;
    say("Sending…", "pending");
    try {
      await submitSignup({
        email: email.value,
        type: form.dataset.signup || "visitor",
        organization: form.elements.organization?.value,
        name: form.elements.name?.value,
      });
      form.reset();
      say(form.dataset.successText || "Thanks. You're on the list.", "success");
      form.dispatchEvent(new CustomEvent("signup:done", { bubbles: true }));
    } catch {
      say("That didn't go through. Please try again, or write to hello@gestalt.gallery.", "error");
    } finally {
      button.disabled = false;
    }
  });
}

function init() {
  getUtm(); // capture tags on landing, before any navigation
  document.querySelectorAll("form[data-signup]").forEach(wire);
  document.querySelectorAll("a[data-utm-pass]").forEach((a) => {
    a.href = withUtm(a.getAttribute("href"));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
