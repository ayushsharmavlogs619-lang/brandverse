/** Work inbox for all form submissions */
export const WORK_EMAIL = "ayush@brandverse.tech";

/** Direct mailto links (reliable, no third-party setup needed) */
export const CONTACT_FORM_LINK = `mailto:${WORK_EMAIL}?subject=Brandverse%20Contact%20Form&body=Name:%20%0ACompany:%20%0AEmail:%20%0APhone:%20%0AService:%20%0AMessage:%20 `;

export const AUDIT_FORM_LINK = `mailto:${WORK_EMAIL}?subject=Brandverse%20Audit%20Request&body=Business%20Name:%20%0APhone:%20%0AEmail:%20%0AIndustry:%20%0A`;

export const LEAD_MAGNET_FORM_LINK = `mailto:${WORK_EMAIL}?subject=Brandverse%20Lead%20Magnet&body=Name:%20%0AEmail:%20%0ACompany:%20%0A`;

/** FormSubmit action (backup if user sets it up later) */
export const FORMSUBMIT_ACTION = `https://formsubmit.co/${encodeURIComponent(WORK_EMAIL)}`;

/** Production site origin */
export const SITE_ORIGIN = "https://brandverse.tech";
