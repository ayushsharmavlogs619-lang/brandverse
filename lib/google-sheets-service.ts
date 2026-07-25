/**
 * Google Sheets Service for Lead CRM
 *
 * This service writes leads to Google Sheets via a same-origin Cloudflare
 * Pages Function (/api/leads/apps-script), which holds the Google Apps
 * Script webhook secret server-side and forwards to Apps Script. This
 * replaces the previous direct Google Sheets API v4 integration, which
 * incorrectly used an API key as a Bearer token and could never have
 * worked from browser code (the site is a static export with no
 * server-only env vars available client-side).
 */

interface LeadData {
  full_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
  business_type?: string;
  service_interest?: string;
  source_page?: string;
  source_form?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  timestamp?: string;
}

interface AIAnalysis {
  summary?: string;
  urgency?: 'low' | 'medium' | 'high';
  lead_quality?: 'low' | 'medium' | 'high';
  suggested_reply?: string;
}

const APPS_SCRIPT_ENDPOINT = '/api/leads/apps-script';
const REQUEST_TIMEOUT_MS = 10_000;

export class GoogleSheetsService {
  /**
   * Append a lead to Google Sheets via the Apps Script webhook (proxied
   * through our own /api/leads/apps-script function, so the shared secret
   * never reaches the browser).
   *
   * Note: aiAnalysis and several LeadData fields (website, business_type,
   * source_page, source_form, utm_*) are accepted for backward
   * compatibility with existing callers but are not written to the sheet —
   * the target sheet has only DATE, NAME, EMAIL, PHONE, COMPANY, SERVICE,
   * MESSAGE columns.
   */
  async appendLead(leadData: LeadData, aiAnalysis?: AIAnalysis): Promise<{ success: boolean; error?: string }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(APPS_SCRIPT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: leadData.timestamp || new Date().toISOString(),
          full_name: leadData.full_name || '',
          email: leadData.email || '',
          phone: leadData.phone || '',
          company: leadData.company || '',
          service_interest: leadData.service_interest || '',
          message: leadData.message || ''
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      let result: { success?: boolean; error?: string } | null = null;
      try {
        result = await response.json();
      } catch {
        // Non-JSON response — fall through to the generic error below.
      }

      if (!response.ok || !result?.success) {
        const message = result?.error || `Apps Script proxy returned status ${response.status}`;
        throw new Error(message);
      }

      // aiAnalysis is intentionally unused (no AI columns on the target sheet).
      void aiAnalysis;

      return { success: true };
    } catch (error) {
      clearTimeout(timeoutId);
      const message =
        error instanceof Error
          ? error.name === 'AbortError'
            ? 'Google Sheets webhook timed out'
            : error.message
          : 'Unknown error';
      console.error('Google Sheets append error:', message);
      return {
        success: false,
        error: message
      };
    }
  }

  /**
   * Not supported by the Apps Script webhook integration — the webhook
   * only appends rows to the pre-existing target spreadsheet/tab. Kept
   * for interface compatibility only; no current caller in the codebase.
   */
  async createSpreadsheet(title: string): Promise<{ success: boolean; spreadsheetId?: string; error?: string }> {
    console.warn('GoogleSheetsService.createSpreadsheet() is not supported by the Apps Script webhook integration:', title);
    return {
      success: false,
      error: 'createSpreadsheet is not supported by the Apps Script webhook integration.'
    };
  }

  /**
   * Not supported by the Apps Script webhook integration — the target
   * sheet has no status column. Kept for interface compatibility only;
   * no current caller in the codebase.
   */
  async updateStatus(rowIndex: number, status: string): Promise<{ success: boolean; error?: string }> {
    console.warn(`GoogleSheetsService.updateStatus() is not supported (row ${rowIndex}, status "${status}").`);
    return {
      success: false,
      error: 'updateStatus is not supported by the Apps Script webhook integration.'
    };
  }
}

/**
 * Factory function. No env vars are needed client-side anymore — the
 * secret lives only in the Cloudflare Pages Function — so this always
 * returns a live instance.
 */
export function createGoogleSheetsService(): GoogleSheetsService {
  return new GoogleSheetsService();
}
