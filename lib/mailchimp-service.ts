/**
 * Mailchimp Service for Email Marketing
 *
 * The server-side Page Function (see _functions/[[path]].js, POST /api/mailchimp/subscribe)
 * makes the actual Mailchimp API call using a server-only credential. The browser
 * never receives the Mailchimp API key.
 */

class MailchimpService {
  /**
   * Add a contact to a Mailchimp audience via the server-side proxy.
   * Returns true only when the server confirmed the member was added/upserted.
   */
  async addContact(email: string, firstName?: string, lastName?: string, tags?: string[]): Promise<boolean> {
    if (!email) return false;

    try {
      const response = await fetch('/api/mailchimp/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || '',
          lastName: lastName || '',
          tags: tags || []
        })
      });

      if (!response.ok) {
        console.error('Mailchimp proxy error:', response.status, response.statusText);
        return false;
      }

      const data = await response.json();
      return !!(data && data.success);
    } catch (error) {
      console.error('Mailchimp contact addition error:', error);
      return false;
    }
  }

  /**
   * Trigger an automated email flow for lead nurturing.
   * Contact is added to the audience first; automations are fired by the
   * Mailchimp dashboard. Returns the addContact result.
   */
  async triggerAutomationFlow(email: string): Promise<boolean> {
    return this.addContact(email);
  }
}

// Export singleton instance
export const mailchimpService = new MailchimpService();