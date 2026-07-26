import type { LeadData, AIAnalysis } from './types';

export class GoogleSheetsService {
  /**
   * Append a lead by forwarding it to the Cloudflare Pages Function,
   * which forwards it to the Google Apps Script webhook.
   */
  async appendLead(leadData: LeadData, aiAnalysis?: AIAnalysis): Promise<{ success: boolean; error?: string }> {
    try {
      const timestamp = leadData.timestamp || new Date().toISOString();

      const response = await fetch('/api/leads/apps-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          timestamp,
          ai_summary: aiAnalysis?.summary || '',
          ai_urgency: aiAnalysis?.urgency || '',
          ai_lead_quality: aiAnalysis?.lead_quality || '',
          ai_suggested_reply: aiAnalysis?.suggested_reply || '',
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result?.success) {
        return {
          success: false,
          error: result?.error || `Apps Script proxy returned ${response.status}`,
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Google Sheets (Apps Script) append error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

/**
 * Factory function - always returns a service instance now, since the
 * secret lives server-side in the Cloudflare Pages Function rather than
 * needing to be checked client-side.
 */
export function createGoogleSheetsService(): GoogleSheetsService | null {
  return new GoogleSheetsService();
}
