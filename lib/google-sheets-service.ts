/**
 * Google Sheets Service for Lead CRM
 *
 * This service handles writing leads to Google Sheets via Google Apps Script Webhook.
 * The Apps Script expects:
 * { secret, date, name, email, phone, company, service, message }
 */

interface GoogleSheetsConfig {
  webhookUrl: string;
  secret: string;
}

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

export class GoogleSheetsService {
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  /**
   * Append a lead to Google Sheets via Apps Script Webhook
   */
  async appendLead(
    leadData: LeadData,
    aiAnalysis?: AIAnalysis
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const date = leadData.timestamp || new Date().toISOString();

      const payload = {
        secret: this.config.secret,
        date,
        name: leadData.full_name || '',
        email: leadData.email || '',
        phone: leadData.phone || '',
        company: leadData.company || '',
        service: leadData.service_interest || leadData.business_type || '',
        message: leadData.message || ''
      };

      console.log('==============================');
      console.log('GOOGLE SHEETS WEBHOOK REQUEST');
      console.log('Webhook URL:', this.config.webhookUrl);
      console.log('Payload:', payload);
      console.log('==============================');

      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();

      console.log('==============================');
      console.log('GOOGLE SHEETS WEBHOOK RESPONSE');
      console.log('Status:', response.status);
      console.log('OK:', response.ok);
      console.log('Body:', responseText);
      console.log('==============================');

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${responseText}`
        };
      }

      return {
        success: true
      };
    } catch (error) {
      console.error('Google Sheets webhook exception:', error);

      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown webhook error'
      };
    }
  }
}

/**
 * Factory function to create service from environment variables
 */
export function createGoogleSheetsService(): GoogleSheetsService | null {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  console.log('==============================');
  console.log('GOOGLE SHEETS CONFIG');
  console.log('Webhook URL:', webhookUrl);
  console.log('Secret Loaded:', !!secret);
  console.log('==============================');

  if (!webhookUrl || !secret) {
    console.warn(
      'Google Sheets service not configured: missing webhook URL or secret'
    );
    return null;
  }

  return new GoogleSheetsService({
    webhookUrl,
    secret
  });
}