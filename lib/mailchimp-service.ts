/**
 * Mailchimp Service for Email Marketing and Follow-ups
 * Client-safe status helper only.
 *
 * Production note: Mailchimp private API keys must never be used from the
 * browser bundle. Any real Mailchimp subscription/automation work must happen
 * through a server-side endpoint or Cloudflare Worker.
 */

interface MailchimpConfig {
  audienceId: string;
}

class MailchimpService {
  private config: MailchimpConfig;
  private isConfigured: boolean;

  constructor() {
    this.config = {
      audienceId: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID || '',
    };
    this.isConfigured = this.checkConfiguration();
  }

  private checkConfiguration(): boolean {
    return !!(
      this.config.audienceId
    );
  }

  /**
   * Add a contact to Mailchimp audience
   */
  async addContact(email: string, firstName?: string, lastName?: string, tags?: string[]): Promise<boolean> {
    void email;
    void firstName;
    void lastName;
    void tags;
    console.warn('Mailchimp client-side contact sync is disabled for security. Use a server-side integration instead.');
    return false;
  }

  /**
   * Trigger an automated email flow for lead nurturing
   */
  async triggerAutomationFlow(email: string, flowId?: string): Promise<boolean> {
    void email;
    void flowId;
    if (!this.isConfigured) {
      console.warn('Mailchimp not configured, skipping automation trigger');
      return false;
    }

    console.warn('Mailchimp client-side automation trigger is disabled for security. Use a server-side integration instead.');
    return false;
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