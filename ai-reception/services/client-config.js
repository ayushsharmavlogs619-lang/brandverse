// Client Configuration Service - Multi-tenant client management
// Handles loading and managing client configurations

// Canonical demo client (keep in sync with configs/demo-client.json).
const demoClientJson = `{
  "_notes": "CANONICAL DEMO CLIENT CONFIGURATION. Internally marked DEMO on purpose. Primary sales demo: ELECTRICAL CONTRACTOR niche. Sync with the demo object in services/client-config.js. Deployable standalone via the CLIENTS_CONFIG secret (JSON shape: an object containing a clients array).",
  "id": "brandverse_demo_1",
  "is_demo": true,
  "name": "Brandverse Electrical Demo",
  "niche": "electrician",
  "timezone": "Australia/Melbourne",
  "address": "Virtual office - remote sessions (demo configuration, no physical address)",
  "business_description": "FICTIONAL DEMO business representing a brand residential electrical contractor (call-outs, troubleshooting, inspections, estimates). Used only for Brandverse product demonstrations - it is not a real company, does not take real jobs, and must never claim real coverage, pricing, or guarantees.",
  "phone_number": "",
  "calendar_id": "",
  "sheet_id": "",
  "subdomain": "edge.brandverse.tech",
  "working_hours": {
    "monday": {
      "start": "07:00",
      "end": "19:00"
    },
    "tuesday": {
      "start": "07:00",
      "end": "19:00"
    },
    "wednesday": {
      "start": "07:00",
      "end": "19:00"
    },
    "thursday": {
      "start": "07:00",
      "end": "19:00"
    },
    "friday": {
      "start": "07:00",
      "end": "19:00"
    },
    "saturday": {
      "start": "08:00",
      "end": "14:00"
    },
    "sunday": {
      "start": "closed",
      "end": "closed"
    }
  },
  "services": {
    "Residential Electrical Call-Out": 60,
    "Troubleshooting & Repairs": 60,
    "Breakers & Power Outages": 60,
    "Panel & Service Work": 120,
    "Lighting & Fittings": 60,
    "Outlets & Switches": 45,
    "Safety Inspection": 60,
    "Quote & Estimate Visit": 90,
    "Emergency Electrical Callout": 60
  },
  "service_area": "",
  "timezone_info": "Melbourne, Australia",
  "booking_rules": {
    "after_hours_booking": false,
    "buffer_minutes": 10,
    "max_booking_days_ahead": 14,
    "require_confirmation_before_book": true,
    "book_during_working_hours_only": false,
    "allow_booking_for_next_open_day": true
  },
  "pricing": "not-published",
  "pricing_info": "Pricing is not published in the assistant. Never quote prices, hourly rates, or call-out fees. The team confirms any estimate after the caller's situation is captured and a Quote & Estimate Visit is booked.",
  "response_budget": 40,
  "recommended_handoff_tool": true,
  "faqs": [
    {
      "question": "Is this a real electrical company?",
      "answer": "No - this is a demo run by Brandverse to show how an AI receptionist handles calls for an electrical contractor. It is fictional, no real jobs are booked from this line, and any attendance promised is only a demonstration."
    },
    {
      "question": "What services does this demo cover?",
      "answer": "Residential work only: call-outs, troubleshooting and repairs, breakers and power issues, panel and service work, lighting, outlets and switches, safety inspections, and quote or estimate visits. Emergency electrical call-outs can be flagged but are always handled as an emergency protocol."
    },
    {
      "question": "Can I get a price over the phone?",
      "answer": "No. Prices are never quoted over the phone in this demo. We capture what is happening and a Quote & Estimate Visit is the way the business would confirm costs and scope."
    },
    {
      "question": "Can you send an electrician out right now?",
      "answer": "The demo does not dispatch anyone. If a caller describes danger to life or property, it is flagged as an emergency and recorded for the team with priority; the assistant never claims someone is on the way."
    },
    {
      "question": "Can we speak to a person or the dispatcher?",
      "answer": "Live transfer is only offered when a transfer destination is configured for the demo. Otherwise the assistant captures a callback and the team follows up. The demo never pretends you are connected."
    }
  ],
  "human_handoff": {
    "allowed": true,
    "when_rules": [
      "caller asks to speak to a person",
      "caller asks for the dispatcher (for demo client, dispatcher = live operator)",
      "caller is frustrated or escalating",
      "conversation is complex",
      "emergency escalation is required"
    ],
    "transfer_number": "",
    "transfer_configured": false,
    "callback_first_if_not_configured": true
  },
  "after_hours": {
    "behaviour": "clearly_state_closed",
    "allow_callback_request": true,
    "booking": "next_open_day_only",
    "emergency": "follow_emergency_protocol"
  },
  "emergency": {
    "enabled": true,
    "protocol": "urgent_escalation",
    "scope": "When the caller describes danger to life or property (visible sparking, burning or smoking switchboard, exposed live wires, loss of power to medical equipment, fire), do NOT give technical instructions you are not trained for. Immediately: 1) Say clearly you are flagging this as an emergency, 2) Capture the caller name and number, 3) escalate via the configured destination if one exists, 4) if no escalation destination is configured, state honestly that you have flagged it and it will be picked up - never claim a dispatcher is on the way.",
    "escalation_destination": "",
    "configured": false,
    "on_unconfigured": "say_flagged_not_immediate"
  },
  "callback_rules": {
    "require_name": true,
    "require_phone": true,
    "require_reason": true,
    "capture": [
      "name",
      "phone",
      "reason",
      "urgency",
      "service_preference",
      "notes"
    ],
    "claim_only_if_confirmed": true
  },
  "call_notes_env_vars": {}
}`;

const embeddedClientsJson = `{
  "clients": [
    {
      "id": "dental_melbourne_1",
      "name": "Melbourne Dental Clinic",
      "niche": "dental",
      "timezone": "Australia/Melbourne",
      "services": {
        "cleaning": 30,
        "whitening": 45,
        "root_canal": 60,
        "consultation": 30,
        "checkup": 30,
        "filling": 45
      },
      "working_hours": {
        "monday": {"start": "09:00", "end": "18:00"},
        "tuesday": {"start": "09:00", "end": "18:00"},
        "wednesday": {"start": "09:00", "end": "18:00"},
        "thursday": {"start": "09:00", "end": "18:00"},
        "friday": {"start": "09:00", "end": "18:00"},
        "saturday": {"start": "09:00", "end": "14:00"},
        "sunday": {"start": "closed", "end": "closed"}
      },
      "calendar_id": "",
      "sheet_id": "",
      "phone_number": "",
      "address": "123 Dental Street, Melbourne, VIC 3000",
      "subdomain": "edge.brandverse.tech",
      "business_description": "Professional dental care for the whole family",
      "after_hours_booking": true,
      "buffer_minutes": 10,
      "max_booking_days_ahead": 30
    },
    {
      "id": "hvac_sydney_1",
      "name": "Sydney HVAC Services",
      "niche": "hvac",
      "timezone": "Australia/Sydney",
      "services": {
        "emergency_repair": 60,
        "maintenance": 90,
        "installation": 180,
        "inspection": 60,
        "diagnostic": 45
      },
      "working_hours": {
        "monday": {"start": "07:00", "end": "19:00"},
        "tuesday": {"start": "07:00", "end": "19:00"},
        "wednesday": {"start": "07:00", "end": "19:00"},
        "thursday": {"start": "07:00", "end": "19:00"},
        "friday": {"start": "07:00", "end": "19:00"},
        "saturday": {"start": "08:00", "end": "16:00"},
        "sunday": {"start": "closed", "end": "closed"}
      },
      "calendar_id": "",
      "sheet_id": "",
      "phone_number": "",
      "address": "456 Service Road, Sydney, NSW 2000",
      "subdomain": "edge.brandverse.tech",
      "business_description": "24/7 Emergency HVAC Repair and Installation",
      "after_hours_booking": true,
      "buffer_minutes": 15,
      "max_booking_days_ahead": 14,
      "emergency_service": true
    },
    {
      "id": "electrician_brisbane_1",
      "name": "Brisbane Electricians Pro",
      "niche": "electrician",
      "timezone": "Australia/Brisbane",
      "services": {
        "emergency_callout": 60,
        "installation": 120,
        "repair": 90,
        "inspection": 60,
        "upgrade": 180
      },
      "working_hours": {
        "monday": {"start": "06:00", "end": "20:00"},
        "tuesday": {"start": "06:00", "end": "20:00"},
        "wednesday": {"start": "06:00", "end": "20:00"},
        "thursday": {"start": "06:00", "end": "20:00"},
        "friday": {"start": "06:00", "end": "20:00"},
        "saturday": {"start": "07:00", "end": "18:00"},
        "sunday": {"start": "closed", "end": "closed"}
      },
      "calendar_id": "",
      "sheet_id": "",
      "phone_number": "",
      "address": "789 Circuit Lane, Brisbane, QLD 4000",
      "subdomain": "edge.brandverse.tech",
      "business_description": "Licensed Electricians for Residential and Commercial",
      "after_hours_booking": true,
      "buffer_minutes": 10,
      "max_booking_days_ahead": 21,
      "emergency_service": true
    },
    {
      "id": "plastic_surgery_melbourne_1",
      "name": "Melbourne Plastic Surgery Center",
      "niche": "plastic-surgery",
      "timezone": "Australia/Melbourne",
      "services": {
        "consultation": 60,
        "follow_up": 30,
        "pre_op_assessment": 45,
        "post_op_check": 30,
        "non_surgical_treatment": 90
      },
      "working_hours": {
        "monday": {"start": "09:00", "end": "17:00"},
        "tuesday": {"start": "09:00", "end": "17:00"},
        "wednesday": {"start": "09:00", "end": "17:00"},
        "thursday": {"start": "09:00", "end": "17:00"},
        "friday": {"start": "09:00", "end": "17:00"},
        "saturday": {"start": "closed", "end": "closed"},
        "sunday": {"start": "closed", "end": "closed"}
      },
      "calendar_id": "",
      "sheet_id": "",
      "phone_number": "",
      "address": "321 Cosmetic Avenue, Melbourne, VIC 3000",
      "subdomain": "edge.brandverse.tech",
      "business_description": "Expert Plastic Surgery and Cosmetic Procedures",
      "after_hours_booking": false,
      "buffer_minutes": 30,
      "max_booking_days_ahead": 60,
      "consultation_required": true
    }
  ]
}`;

export class ClientConfigService {
  constructor(env) {
    this.env = env;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Get client configuration by ID
  async getClientConfig(clientId) {
    try {
      // Check cache first
      const cached = this.cache.get(clientId);
      if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
        return cached.config;
      }

      // Load from CLIENTS_CONFIG env var or embedded fallback
      const clientsData = await this.loadClientsData();
      const client = clientsData.clients.find(c => c.id === clientId);

      if (!client) {
        console.warn(`Client configuration not found: ${clientId}`);
        return null;
      }

      // Validate required fields
      this.validateClientConfig(client);

      // Cache the result
      this.cache.set(clientId, {
        config: client,
        timestamp: Date.now()
      });

      return client;
    } catch (error) {
      console.error('Error getting client config:', error);
      throw new Error(`Failed to load client configuration: ${error.message}`);
    }
  }

  // Load clients data from env var or embedded fallback
  async loadClientsData() {
    try {
      // 1. Try environment variable (set via wrangler secret or dashboard)
      if (this.env.CLIENTS_CONFIG) {
        try {
          const parsed = JSON.parse(this.env.CLIENTS_CONFIG);
          // Ensure the demo client exists even when a custom CLIENTS_CONFIG
          // is provided (unless the override already includes its own demo).
          if (!parsed.clients.some(c => c.is_demo === true)) {
            parsed.clients.push(JSON.parse(demoClientJson));
          }
          // Apply env-based demo phone override (see embedded branch below).
          parsed.clients.forEach(c => {
            if (c.is_demo === true && this.env.DEMO_PHONE_NUMBER) {
              c.phone_number = this.env.DEMO_PHONE_NUMBER;
              c.human_handoff = c.human_handoff || {};
              c.human_handoff.transfer_number = this.env.DEMO_HANDOFF_NUMBER || c.human_handoff.transfer_number || '';
              c.human_handoff.transfer_configured = !!(c.human_handoff.transfer_number);
            }
          });
          return parsed;
        } catch (e) {
          console.warn('Failed to parse CLIENTS_CONFIG env var, falling back to embedded config');
        }
      }

      // 2. Fall back to embedded configuration
      const parsed = JSON.parse(embeddedClientsJson);
      if (!parsed.clients.some(c => c.is_demo === true)) {
        parsed.clients.push(JSON.parse(demoClientJson));
      }
      // Apply env-based demo phone override so phone matching works when the
      // demo client's phone_number is supplied at deploy time.
      parsed.clients.forEach(c => {
        if (c.is_demo === true && this.env.DEMO_PHONE_NUMBER) {
          c.phone_number = this.env.DEMO_PHONE_NUMBER;
          c.human_handoff = c.human_handoff || {};
          c.human_handoff.transfer_number = this.env.DEMO_HANDOFF_NUMBER || c.human_handoff.transfer_number || '';
          c.human_handoff.transfer_configured = !!(c.human_handoff.transfer_number);
        }
      });
      return parsed;
    } catch (error) {
      console.error('Error loading clients data:', error);
      throw new Error('Failed to load clients data');
    }
  }

  // Validate client configuration
  validateClientConfig(client) {
    const requiredFields = ['id', 'name', 'niche', 'timezone', 'services', 'working_hours'];
    
    for (const field of requiredFields) {
      if (!client[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // CRITICAL: Validate real integration fields - warn but don't block
    if (!client.calendar_id || client.calendar_id.trim() === '') {
      console.warn(`WARNING: calendar_id is empty for client "${client.id}". Calendar booking will fail until set.`);
    }

    if (!client.sheet_id || client.sheet_id.trim() === '') {
      console.warn(`WARNING: sheet_id is empty for client "${client.id}". Sheets logging will fail until set.`);
    }

    // Validate services
    if (typeof client.services !== 'object' || Object.keys(client.services).length === 0) {
      throw new Error('Services must be a non-empty object');
    }

    // Validate working hours
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (const day of days) {
      if (!client.working_hours[day]) {
        throw new Error(`Missing working hours for ${day}`);
      }
    }

    // Validate service durations
    for (const [service, duration] of Object.entries(client.services)) {
      if (typeof duration !== 'number' || duration <= 0) {
        throw new Error(`Invalid duration for service ${service}: ${duration}`);
      }
    }
  }

  // Get all clients
  async getAllClients() {
    try {
      const clientsData = await this.loadClientsData();
      return clientsData.clients;
    } catch (error) {
      console.error('Error getting all clients:', error);
      throw new Error('Failed to load clients');
    }
  }

  // Get clients by niche
  async getClientsByNiche(niche) {
    try {
      const clientsData = await this.loadClientsData();
      return clientsData.clients.filter(client => client.niche === niche);
    } catch (error) {
      console.error('Error getting clients by niche:', error);
      throw new Error('Failed to load clients by niche');
    }
  }

  // Update client configuration
  async updateClientConfig(clientId, updates) {
    try {
      const currentConfig = await this.getClientConfig(clientId);
      const updatedConfig = { ...currentConfig, ...updates };

      // Validate updated configuration
      this.validateClientConfig(updatedConfig);

      // Clear cache
      this.cache.delete(clientId);

      // In a real implementation, this would update the database or file
      console.log(`Client configuration updated: ${clientId}`, updatedConfig);

      return updatedConfig;
    } catch (error) {
      console.error('Error updating client config:', error);
      throw new Error(`Failed to update client configuration: ${error.message}`);
    }
  }

  // Add new client
  async addClient(clientData) {
    try {
      // Validate client data
      this.validateClientConfig(clientData);

      // Check if client already exists
      const clientsData = await this.loadClientsData();
      const existingClient = clientsData.clients.find(c => c.id === clientData.id);

      if (existingClient) {
        throw new Error(`Client with ID ${clientData.id} already exists`);
      }

      clientsData.clients.push(clientData);
      console.log(`New client added: ${clientData.id}`, clientData);

      return clientData;
    } catch (error) {
      console.error('Error adding client:', error);
      throw new Error(`Failed to add client: ${error.message}`);
    }
  }

  // Delete client
  async deleteClient(clientId) {
    try {
      const clientsData = await this.loadClientsData();
      const clientIndex = clientsData.clients.findIndex(c => c.id === clientId);

      if (clientIndex === -1) {
        throw new Error(`Client not found: ${clientId}`);
      }

      clientsData.clients.splice(clientIndex, 1);

      // Clear cache
      this.cache.delete(clientId);

      console.log(`Client deleted: ${clientId}`);

      return true;
    } catch (error) {
      console.error('Error deleting client:', error);
      throw new Error(`Failed to delete client: ${error.message}`);
    }
  }

  // Get client working hours for a specific date
  async getWorkingHoursForDate(clientId, date) {
    try {
      const client = await this.getClientConfig(clientId);

      // Get day name in multiple formats
      const dayName1 = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const dayName2 = date.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
      const dayName3 = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];

      let dayHours = client.working_hours[dayName1] || client.working_hours[dayName2] || client.working_hours[dayName3];

      if (!dayHours || dayHours.start === 'closed') {
        return null; // Closed on this day
      }

      return dayHours;
    } catch (error) {
      console.error('Error getting working hours for date:', error);
      throw new Error('Failed to get working hours for date');
    }
  }

  // Check if client is open at specific time
  async isClientOpen(clientId, dateTime) {
    try {
      const workingHours = await this.getWorkingHoursForDate(clientId, dateTime);

      if (!workingHours) {
        return false; // Closed
      }

      const time = dateTime.toTimeString().slice(0, 5); // HH:MM format
      return time >= workingHours.start && time <= workingHours.end;
    } catch (error) {
      console.error('Error checking if client is open:', error);
      return false;
    }
  }

  // Get service duration
  async getServiceDuration(clientId, service) {
    try {
      const client = await this.getClientConfig(clientId);
      const duration = client.services[service];

      if (!duration) {
        throw new Error(`Service not found: ${service}`);
      }

      return duration;
    } catch (error) {
      console.error('Error getting service duration:', error);
      throw new Error('Failed to get service duration');
    }
  }

  // Get client timezone
  async getClientTimezone(clientId) {
    try {
      const client = await this.getClientConfig(clientId);
      return client.timezone;
    } catch (error) {
      console.error('Error getting client timezone:', error);
      throw new Error('Failed to get client timezone');
    }
  }

  // Look up client by inbound phone number (for Vapi call routing)
  // Handles E.164, national, and partially-stripped formats by comparing
  // digit-only strings on the last 10 digits, with AU/NZ style variants
  // (leading 0 national vs 61/64 country code).
  async getClientByPhoneNumber(inboundNumber) {
    try {
      const clientsData = await this.loadClientsData();
      const normalized = this.normalizePhone(inboundNumber);
      if (!normalized) return null;

      const client = clientsData.clients.find(c => {
        const clientPhone = this.normalizePhone(c.phone_number);
        if (!clientPhone) return false;
        return this.phoneNumbersMatch(normalized, clientPhone);
      });

      // If no specific phone match but a demo client exists, only fall back to
      // the demo client when DEMO_PHONE_NUMBER env var matches the inbound
      // number (so the demo client never answers random calls).
      if (!client && this.env.DEMO_PHONE_NUMBER && this.phoneNumbersMatch(normalized, this.normalizePhone(this.env.DEMO_PHONE_NUMBER))) {
        const demo = clientsData.clients.find(c => c.is_demo === true);
        return demo || null;
      }

      return client || null;
    } catch (error) {
      console.error('Error looking up client by phone:', error);
      return null;
    }
  }

  // Compare two digit-only strings, accounting for country code vs
  // leading-zero national formats (e.g. 61412345678 vs 0412345678).
  phoneNumbersMatch(a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    if (a.length >= 10 && b.length >= 10 && a.slice(-10) === b.slice(-10)) return true;
    return this.normalizeCountry(a) === this.normalizeCountry(b);
  }

  // Convert a 10-digit '0'-prefixed national number to its country-code
  // form (e.g. 0412345678 -> 61412345678) so AU/NZ numbers match in either
  // format. Country-code numbers and other locales pass through unchanged.
  normalizeCountry(digits) {
    if (digits.length === 10 && digits.startsWith('0')) return '61' + digits.slice(1);
    return digits;
  }

  // Normalize a phone number to digits only (E.164 or national formats)
  normalizePhone(phone) {
    if (!phone || typeof phone !== 'string') return '';
    return phone.replace(/\D/g, '');
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Get cache stats
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}