// Airtable Service for Cloudflare Worker
// Securely posts leads to the Airtable base using the REST API

export class AirtableService {
  constructor(env) {
    this.env = env;
    this.apiKey = env.AIRTABLE_PAT || env.AIRTABLE_API_KEY;
    this.baseId = env.AIRTABLE_BASE_ID;
  }

  /**
   * Ingest lead data into Airtable
   * @param {string} clientId - The ID of the client (tenant)
   * @param {Object} leadData - The lead payload
   * @returns {Promise<Object>} - The response containing the Airtable record ID
   */
  async createLead(clientId, leadData) {
    try {
      if (!this.apiKey || !this.apiKey.trim()) {
        throw new Error("Missing Airtable PAT (AIRTABLE_PAT)");
      }
      if (!this.baseId || !this.baseId.trim()) {
        throw new Error("Missing Airtable Base ID (AIRTABLE_BASE_ID)");
      }

      const tableName = "Leads";
      const url = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(tableName)}`;

      // Calculate priority score defensively (0-10)
      let priorityScore = 0;
      if (leadData.email && leadData.email.trim() !== '') priorityScore += 2;
      if (leadData.phone && leadData.phone.trim() !== '') priorityScore += 2;
      if (leadData.company && leadData.company.trim() !== '') priorityScore += 2;
      if (leadData.message && leadData.message.trim() !== '') priorityScore += 2;
      if (['AI Voice Agents', 'Custom Solution', 'Consultation'].includes(leadData.service_interest)) {
        priorityScore += 2;
      }

      const payload = {
        records: [
          {
            fields: {
              "Full Name": leadData.full_name || "Unknown",
              "Email": leadData.email || "",
              "Phone": leadData.phone || "",
              "Company": leadData.company || "",
              "Website": leadData.website || "",
              "Business Type": leadData.business_type || "Other",
              "Service Interest": leadData.service_interest || "AI Voice Agents",
              "Message": leadData.message || "",
              "Source Page": leadData.source_page || "unknown",
              "Source Form": leadData.source_form || "unknown",
              "UTM Source": leadData.utm_source || "",
              "UTM Medium": leadData.utm_medium || "",
              "UTM Campaign": leadData.utm_campaign || "",
              "Lead Status": "New",
              "Priority Score": priorityScore
            }
          }
        ]
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Airtable API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (!data.records || data.records.length === 0) {
        throw new Error("No records returned from Airtable API");
      }

      return {
        success: true,
        leadId: data.records[0].id
      };
    } catch (error) {
      console.error("Airtable Service Error:", error);
      throw error;
    }
  }
}
