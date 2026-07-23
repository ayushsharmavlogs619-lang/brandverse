/**
 * Cerebras AI Service for Lead Analysis
 * 
 * This service analyzes leads using Cerebras API to generate:
 * - Summary
 * - Urgency level
 * - Lead quality
 * - Suggested reply
 */

interface CerebrasConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface AIAnalysis {
  summary?: string;
  urgency?: 'low' | 'medium' | 'high';
  lead_quality?: 'low' | 'medium' | 'high';
  suggested_reply?: string;
}

interface LeadData {
  full_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  business_type?: string;
  service_interest?: string;
  message?: string;
}

export class CerebrasService {
  private config: CerebrasConfig;

  constructor(config: CerebrasConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl || 'https://api.cerebras.ai/v1'
    };
  }

  /**
   * Analyze a lead and generate AI insights
   */
  async analyzeLead(leadData: LeadData): Promise<AIAnalysis> {
    try {
      const prompt = this.buildAnalysisPrompt(leadData);
      
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: 'llama3.1-70b',
          messages: [
            {
              role: 'system',
              content: 'You are an expert sales analyst. Analyze leads and provide structured insights in JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 500,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        console.error('Cerebras API error:', response.status);
        return this.getDefaultAnalysis();
      }

      const result = await response.json();
      const content = result.choices?.[0]?.message?.content;

      if (!content) {
        return this.getDefaultAnalysis();
      }

      const analysis = JSON.parse(content);
      
      return {
        summary: analysis.summary || this.generateSummary(leadData),
        urgency: this.normalizeUrgency(analysis.urgency),
        lead_quality: this.normalizeQuality(analysis.lead_quality),
        suggested_reply: analysis.suggested_reply || this.generateSuggestedReply(leadData)
      };
    } catch (error) {
      console.error('Cerebras analysis error:', error);
      return this.getDefaultAnalysis();
    }
  }

  /**
   * Build the analysis prompt
   */
  private buildAnalysisPrompt(leadData: LeadData): string {
    const leadInfo = `
Name: ${leadData.full_name || 'N/A'}
Email: ${leadData.email || 'N/A'}
Phone: ${leadData.phone || 'N/A'}
Company: ${leadData.company || 'N/A'}
Website: ${leadData.website || 'N/A'}
Business Type: ${leadData.business_type || 'N/A'}
Service Interest: ${leadData.service_interest || 'N/A'}
Message: ${leadData.message || 'N/A'}
    `.trim();

    return `Analyze this lead and provide a JSON response with the following structure:
{
  "summary": "Brief 1-2 sentence summary of the lead",
  "urgency": "low, medium, or high based on immediate need",
  "lead_quality": "low, medium, or high based on fit and potential value",
  "suggested_reply": "A personalized response that addresses their specific needs"
}

Lead Information:
${leadInfo}`;
  }

  /**
   * Normalize urgency to valid values
   */
  private normalizeUrgency(urgency: any): 'low' | 'medium' | 'high' {
    const valid = ['low', 'medium', 'high'];
    const normalized = String(urgency).toLowerCase();
    return valid.includes(normalized) ? normalized as 'low' | 'medium' | 'high' : 'medium';
  }

  /**
   * Normalize quality to valid values
   */
  private normalizeQuality(quality: any): 'low' | 'medium' | 'high' {
    const valid = ['low', 'medium', 'high'];
    const normalized = String(quality).toLowerCase();
    return valid.includes(normalized) ? normalized as 'low' | 'medium' | 'high' : 'medium';
  }

  /**
   * Generate a basic summary without AI
   */
  private generateSummary(leadData: LeadData): string {
    const parts = [];
    if (leadData.company) parts.push(`${leadData.company}`);
    if (leadData.business_type) parts.push(`a ${leadData.business_type} business`);
    if (leadData.service_interest) parts.push(`interested in ${leadData.service_interest}`);
    return parts.join(' is ') || 'New lead inquiry';
  }

  /**
   * Generate a suggested reply without AI
   */
  private generateSuggestedReply(leadData: LeadData): string {
    const name = leadData.full_name?.split(' ')[0] || 'there';
    const service = leadData.service_interest || 'our services';
    return `Hi ${name}, thanks for reaching out about ${service}. I'd love to learn more about your needs and how we can help. Would you be available for a quick call this week?`;
  }

  /**
   * Get default analysis when AI fails
   */
  private getDefaultAnalysis(): AIAnalysis {
    return {
      summary: 'New lead inquiry',
      urgency: 'medium',
      lead_quality: 'medium',
      suggested_reply: 'Thanks for reaching out! We\'ll review your inquiry and get back to you shortly.'
    };
  }
}

/**
 * Factory function to create service from environment variables
 */
export function createCerebrasService(): CerebrasService | null {
  const apiKey = process.env.CEREBRAS_API_KEY;

  if (!apiKey) {
    console.warn('Cerebras service not configured: missing API key');
    return null;
  }

  return new CerebrasService({ apiKey });
}
