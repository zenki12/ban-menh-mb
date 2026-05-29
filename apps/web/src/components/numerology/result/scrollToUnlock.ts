export const UNLOCK_CTA_ID = "unlock-cta";

export function scrollToUnlockCTA() {
  if (typeof window === "undefined") return;
  const el = document.getElementById(UNLOCK_CTA_ID);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
