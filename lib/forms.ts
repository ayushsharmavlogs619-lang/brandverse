/** Work inbox for all FormSubmit-powered leads */
export const WORK_EMAIL = "ayush@brandverse.tech";

export const FORMSUBMIT_ACTION = `https://formsubmit.co/${encodeURIComponent(WORK_EMAIL)}`;

/** Production site (FormSubmit _next must be absolute). Override at build time if needed. */
export const SITE_ORIGIN =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
  "https://brandverse.tech";
