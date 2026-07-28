// AI Receptionist API - Cloudflare Worker
// Handles real bookings, calendar integration, and lead logging

import { GoogleCalendarService } from '../services/calendar.js';
import { GoogleSheetsService } from '../services/sheets.js';
import { ClientConfigService } from '../services/client-config.js';
import { AvailabilityEngine } from '../services/availability.js';
import { BookingEngine } from '../services/booking.js';
import { LoggingEngine } from '../services/logging.js';
import { VapiService } from '../services/vapi.js';

function getCorsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const allowedOrigins = new Set([
    env.APP_BASE_URL,
    'https://brandverse.tech',
    'https://www.brandverse.tech',
    'https://edge.brandverse.tech',
  ].filter(Boolean));

  const allowOrigin = origin && allowedOrigins.has(origin)
    ? origin
    : 'https://brandverse.tech';

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  };
}

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    void ctx;

    // CORS headers for cross-origin requests
    const corsHeaders = getCorsHeaders(request, env);

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Health check endpoint
      if (path === '/health') {
        return new Response(JSON.stringify({ 
          status: 'healthy', 
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Vapi webhook endpoints (no client ID needed in path)
      if (path === '/api/vapi/webhook' && method === 'POST') {
        return handleVapiWebhook(request, env, corsHeaders);
      }

      if (path === '/api/vapi/call' && method === 'POST') {
        return handleVapiOutboundCall(request, env, corsHeaders);
      }

      // Extract client ID from URL for client-specific routes
      const pathParts = path.split('/');
      const clientId = pathParts[2]; // /api/:clientId/...

      if (!clientId) {
        return new Response(JSON.stringify({ error: 'Client ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Initialize services
      const clientConfig = new ClientConfigService(env);
      const calendarService = new GoogleCalendarService(env);
      const sheetsService = new GoogleSheetsService(env);
      const availabilityEngine = new AvailabilityEngine(calendarService, clientConfig);
      const bookingEngine = new BookingEngine(calendarService, sheetsService, clientConfig);
      const loggingEngine = new LoggingEngine(sheetsService, clientConfig);

      // Route handling
      if (path === `/api/${clientId}/availability` && method === 'GET') {
        return handleAvailability(clientId, url.searchParams, availabilityEngine, corsHeaders);
      }

      if (path === `/api/${clientId}/book` && method === 'POST') {
        return handleBooking(clientId, await request.json(), bookingEngine, loggingEngine, corsHeaders);
      }

      if (path === `/api/${clientId}/log` && method === 'POST') {
        return handleLog(clientId, await request.json(), loggingEngine, corsHeaders);
      }

      if (path === `/api/${clientId}/client-config` && method === 'GET') {
        return handleClientConfig(clientId, clientConfig, corsHeaders);
      }

      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } catch (error) {
      console.error('API Error:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};

export default worker;

// Handle availability requests
async function handleAvailability(clientId, searchParams, availabilityEngine, corsHeaders) {
  try {
    const date = searchParams.get('date');
    const service = searchParams.get('service');

    if (!date || !service) {
      return new Response(JSON.stringify({ 
        error: 'Date and service parameters required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const availableSlots = await availabilityEngine.getAvailableSlots(
      clientId, 
      date, 
      service
    );

    return new Response(JSON.stringify({
      clientId,
      date,
      service,
      availableSlots,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Availability Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to check availability',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// Handle booking requests
async function handleBooking(clientId, bookingData, bookingEngine, loggingEngine, corsHeaders) {
  try {
    const { name, phone, email, service, dateTime, notes } = bookingData;

    // Validate required fields
    if (!name || !phone || !service || !dateTime) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: name, phone, service, dateTime' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Attempt booking
    const bookingResult = await bookingEngine.createBooking(clientId, {
      name,
      phone,
      email,
      service,
      dateTime: new Date(dateTime),
      notes
    });

    // Log the booking attempt
    await loggingEngine.logInteraction(clientId, {
      type: 'booking',
      channel: 'api',
      name,
      phone,
      email,
      service,
      requestedTime: dateTime,
      status: bookingResult.success ? 'confirmed' : 'failed',
      outcome: bookingResult.message,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify(bookingResult), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Booking Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create booking',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// Handle logging requests
async function handleLog(clientId, logData, loggingEngine, corsHeaders) {
  try {
    await loggingEngine.logInteraction(clientId, {
      ...logData,
      timestamp: logData.timestamp || new Date().toISOString()
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Log entry created'
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Logging Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create log entry',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// Handle client config requests
async function handleClientConfig(clientId, clientConfig, corsHeaders) {
  try {
    console.log(`[DEBUG] Getting client config for: ${clientId}`);
    const config = await clientConfig.getClientConfig(clientId);

    if (!config) {
      console.log(`[DEBUG] Client config not found for: ${clientId}`);
      return new Response(JSON.stringify({ 
        error: 'Client configuration not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    console.log(`[DEBUG] Client config found for: ${clientId}`);
    return new Response(JSON.stringify(config), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Config Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to load client configuration',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// ==================== VAPI HANDLERS ====================

async function handleVapiWebhook(request, env, corsHeaders) {
  try {
    const clientConfig = new ClientConfigService(env);
    const sheetsService = new GoogleSheetsService(env);
    const loggingEngine = new LoggingEngine(sheetsService, clientConfig);
    const vapiService = new VapiService(env, clientConfig, loggingEngine);
    const result = await vapiService.handleWebhook(request);

    return new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Vapi webhook error:', error);
    return new Response(JSON.stringify({ error: 'Vapi webhook processing failed', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

async function handleVapiOutboundCall(request, env, corsHeaders) {
  try {
    const body = await request.json();
    const { clientId, customerNumber, ...overrides } = body;

    if (!clientId || !customerNumber) {
      return new Response(JSON.stringify({ error: 'clientId and customerNumber are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const clientConfig = new ClientConfigService(env);
    const sheetsService = new GoogleSheetsService(env);
    const loggingEngine = new LoggingEngine(sheetsService, clientConfig);
    const vapiService = new VapiService(env, clientConfig, loggingEngine);
    const callResult = await vapiService.triggerOutboundCall(clientId, customerNumber, overrides);

    return new Response(JSON.stringify({
      success: true,
      callId: callResult.id,
      message: 'Outbound call initiated',
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Vapi outbound call error:', error);
    return new Response(JSON.stringify({ error: 'Failed to initiate outbound call', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}