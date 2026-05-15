// Client Configuration Service - Multi-tenant client management
// Handles loading and managing client configurations

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

      // Load from clients.json (in production, this could be from a database)
      const clientsData = await this.loadClientsData();
      const client = clientsData.clients.find(c => c.id === clientId);

      if (!client) {
        throw new Error(`Client configuration not found: ${clientId}`);
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

  // Load clients data from JSON file
  async loadClientsData() {
    try {
      // In a real implementation, this would load from a file or database
      // For now, we'll use the hardcoded clients.json structure
      const clientsData = {
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
      };

      return clientsData;
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

    // CRITICAL: Validate real integration fields
    if (!client.calendar_id || client.calendar_id.trim() === '') {
      throw new Error('Missing required config: calendar_id - Real Google Calendar integration required');
    }

    if (!client.sheet_id || client.sheet_id.trim() === '') {
      throw new Error('Missing required config: sheet_id - Real Google Sheets integration required');
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
      
      // Add client
      clientsData.clients.push(clientData);
      
      // In a real implementation, this would save to database or file
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
      
      // Remove client
      clientsData.clients.splice(clientIndex, 1);
      
      // Clear cache
      this.cache.delete(clientId);
      
      // In a real implementation, this would update the database or file
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
      console.log(`[DEBUG] Getting working hours for client: ${clientId}, date: ${date.toISOString()}`);
      const client = await this.getClientConfig(clientId);
      
      // Get day name in lowercase - try multiple approaches
      const dayName1 = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const dayName2 = date.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
      const dayName3 = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
      
      console.log(`[DEBUG] Day names: ${dayName1}, ${dayName2}, ${dayName3}`);
      console.log(`[DEBUG] Available working hours keys:`, Object.keys(client.working_hours));
      
      // Try different day name formats
      let dayHours = client.working_hours[dayName1] || client.working_hours[dayName2] || client.working_hours[dayName3];
      
      console.log(`[DEBUG] Found working hours:`, dayHours);
      
      if (!dayHours || dayHours.start === 'closed') {
        console.log(`[DEBUG] Business is closed on this day`);
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
