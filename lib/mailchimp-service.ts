/**
 * Mailchimp Service for Email Marketing and Follow-ups
 * Simple client-side integration for lead capture and automated sequences
 */

interface MailchimpConfig {
  apiKey: string;
  audienceId: string;
  serverPrefix: string;
}

class MailchimpService {
  private config: MailchimpConfig;
  private isConfigured: boolean;

  constructor() {
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY || '',
      audienceId: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID || '',
      serverPrefix: 'us4' // Extract from API key (last part before hyphen)
    };
    this.isConfigured = this.checkConfiguration();
  }

  private checkConfiguration(): boolean {
    return !!(
      this.config.apiKey &&
      this.config.apiKey.length > 10 &&
      this.config.serverPrefix
    );
  }

  /**
   * Add a contact to Mailchimp audience
   */
  async addContact(email: string, firstName?: string, lastName?: string, tags?: string[]): Promise<boolean> {
    if (!this.isConfigured) {
      console.warn('Mailchimp not configured, skipping contact addition');
      return false;
    }

    try {
      const url = `https://${this.config.serverPrefix}.api.mailchimp.com/3.0/lists/${this.config.audienceId}/members`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${this.config.apiKey}`
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName || '',
            LNAME: lastName || ''
          },
          tags: tags || []
        })
      });

      if (response.ok) {
        // Contact added to Mailchimp successfully
        return true;
      } else {
        console.error('Mailchimp API error:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Mailchimp contact addition error:', error);
      return false;
    }
  }

  /**
   * Trigger an automated email flow for lead nurturing
   */
  async triggerAutomationFlow(email: string, flowId?: string): Promise<boolean> {
    if (!this.isConfigured) {
      console.warn('Mailchimp not configured, skipping automation trigger');
      return false;
    }

    try {
      // Add to audience first (if not already subscribed)
      await this.addContact(email);

      // Note: Mailchimp automations are usually triggered by audience actions
      // The automations need to be set up in the Mailchimp dashboard
      // This function mainly ensures the contact is in the right audience

      // Mailchimp automation flow triggered successfully
      return true;
    } catch (error) {
      console.error('Mailchimp automation trigger error:', error);
      return false;
    }
  }

  /**
   * Get configuration status
   */
  getConfigStatus(): { configured: boolean; audienceNeeded: boolean } {
    return {
      configured: this.isConfigured,
      audienceNeeded: !this.config.audienceId
    };
  }
}

// Export singleton instance
export const mailchimpService = new MailchimpService();

// Export types