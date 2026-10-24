/* ═══════════════════════════════════════════════════════════════════════
   Gestalt — ADA Readiness Scorecard lead capture
   The scorecard page is self contained (its own styles and scoring); this
   module only records the lead when someone submits for their results.
   A failed write never blocks the score: the visitor gets their report
   either way.
   ═══════════════════════════════════════════════════════════════════════ */

import { submitSignup, getUtm } from "./signup.js";

getUtm();
window.__gestaltLead = (lead) => {
  submitSignup({ ...lead, type: "scorecard" }).catch(() => {});
};
