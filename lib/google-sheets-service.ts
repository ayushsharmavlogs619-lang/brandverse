/**
 * Google Sheets Service for Lead CRM
 * 
 * This service handles writing leads to Google Sheets via the Google Sheets API.
 * Designed to be used in Cloudflare Workers or server-side environments.
 */

interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  apiKey: string;
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
   * Append a lead to Google Sheets
   */
  async appendLead(leadData: LeadData, aiAnalysis?: AIAnalysis): Promise<{ success: boolean; error?: string }> {
    try {
      const timestamp = leadData.timestamp || new Date().toISOString();
      
      // Prepare row data in the correct order
      const rowData = [
        timestamp,
        leadData.full_name || '',
        leadData.email || '',
        leadData.phone || '',
        leadData.company || '',
        leadData.website || '',
        leadData.business_type || '',
        leadData.service_interest || '',
        leadData.message || '',
        leadData.source_page || '',
        leadData.source_form || '',
        leadData.utm_source || '',
        leadData.utm_medium || '',
        leadData.utm_campaign || '',
        aiAnalysis?.summary || '',
        aiAnalysis?.urgency || '',
        aiAnalysis?.lead_quality || '',
        aiAnalysis?.suggested_reply || '',
        'new' // Default status
      ];

      // Use Google Sheets API v4
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.sheetName}:append?valueInputOption=USER_ENTERED`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          values: [rowData]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Google Sheets API error: ${error}`);
      }

      const result = await response.json();
      
      return { success: true };
    } catch (error) {
      console.error('Google Sheets append error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Create a new spreadsheet with headers (one-time setup)
   */
  async createSpreadsheet(title: string): Promise<{ success: boolean; spreadsheetId?: string; error?: string }> {
    try {
      const url = 'https://sheets.googleapis.com/v4/spreadsheets';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          properties: {
            title
          },
          sheets: [
            {
              properties: {
                title: this.config.sheetName
              }
            }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Google Sheets API error: ${error}`);
      }

      const result = await response.json();
      const spreadsheetId = result.spreadsheetId;

      // Add headers
      await this.addHeaders(spreadsheetId);

      return { success: true, spreadsheetId };
    } catch (error) {
      console.error('Google Sheets creation error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Add headers to the sheet
   */
  private async addHeaders(spreadsheetId: string): Promise<void> {
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Website',
      'Business Type',
      'Service Interest',
      'Message',
      'Source Page',
      'Source Form',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'AI Summary',
      'AI Urgency',
      'AI Lead Quality',
      'AI Suggested Reply',
      'Status'
    ];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${this.config.sheetName}!A1:R1?valueInputOption=USER_ENTERED`;
    
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        values: [headers]
      })
    });
  }

  /**
   * Update lead status
   */
  async updateStatus(rowIndex: number, status: string): Promise<{ success: boolean; error?: string }> {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.sheetName}!R${rowIndex}C18?valueInputOption=USER_ENTERED`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          values: [[status]]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      return { success: true };
    } catch (error) {
      console.error('Google Sheets update error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

/**
 * Factory function to create service from environment variables
 */
export function createGoogleSheetsService(): GoogleSheetsService | null {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Leads';
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!spreadsheetId || !apiKey) {
    console.warn('Google Sheets service not configured: missing spreadsheet ID or API key');
    return null;
  }

  return new GoogleSheetsService({
    spreadsheetId,
    sheetName,
    apiKey
  });
}
