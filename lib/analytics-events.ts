/**
 * CENTRALIZED CONVERSION TRACKING EVENTS
 * Pushes standard events into the GTM dataLayer (GTM-KZS5WRBB).
 * Safe no-op when dataLayer is unavailable. No IDs invented here —
 * events are generic so they can be mapped to GA4 conversions later.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function ensureDataLayer(): Record<string, unknown>[] | null {
  if (typeof window === 'undefined') return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function pushDataLayerEvent(eventName: string, params: EventParams = {}): void {
  const dataLayer = ensureDataLayer();
  if (!dataLayer) return;
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      cleaned[key] = value;
    }
  }
  dataLayer.push({ event: eventName, ...cleaned });
}

export function trackCalendlyClick(label: string): void {
  pushDataLayerEvent('calendly_click', { label });
}

export function trackLeadFormSubmit(sourceForm: string, success: boolean): void {
  pushDataLayerEvent('lead_form_submit', { source_form: sourceForm, success });
}

export function trackAuditRequest(sourceForm: string, success: boolean): void {
  pushDataLayerEvent('audit_request', { source_form: sourceForm, success });
}

export function trackPhoneClick(label: string): void {
  pushDataLayerEvent('phone_click', { label });
}
