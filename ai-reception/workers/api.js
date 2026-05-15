// AI Receptionist API - Cloudflare Worker
// Handles real bookings, calendar integration, and lead logging

import { GoogleCalendarService } from '../services/calendar.js';
import { GoogleSheetsService } from '../services/sheets.js';
import { SMSService } from '../services/sms.js';
import { ClientConfigService } from '../services/client-config.js';
import { AvailabilityEngine } from '../services/availability.js';
import { BookingEngine } from '../services/booking.js';
import { LoggingEngine } from '../services/logging.js';
import { DatabaseService } from '../services/database.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS headers for cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

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

      // Extract client ID from URL
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
      const smsService = new SMSService(env);
      const availabilityEngine = new AvailabilityEngine(calendarService, clientConfig);
      const bookingEngine = new BookingEngine(calendarService, sheetsService, smsService);
      const loggingEngine = new LoggingEngine(sheetsService, clientConfig);
      
      // Initialize Supabase Database Service (if credentials available)
      let dbService = null;
      try {
        if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
          dbService = new DatabaseService(env);
        }
      } catch (dbError) {
        console.warn('Database service not available:', dbError.message);
      }

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

      // REAL test routes - no mock data
      if (path === `/api/${clientId}/test-availability` && method === 'GET') {
        return handleTestAvailability(clientId, availabilityEngine, corsHeaders);
      }

      if (path === `/api/${clientId}/test-book` && method === 'POST') {
        return handleTestBooking(clientId, bookingEngine, loggingEngine, corsHeaders);
      }

      // Supabase database routes
      if (path === `/api/${clientId}/test-db` && method === 'GET') {
        return handleTestDatabase(dbService, corsHeaders);
      }

      if (path === `/api/${clientId}/leads` && method === 'GET') {
        return handleGetLeads(clientId, url.searchParams, dbService, corsHeaders);
      }

      if (path === `/api/${clientId}/leads` && method === 'POST') {
        return handleCreateLead(clientId, await request.json(), dbService, corsHeaders);
      }

      if (path === `/api/${clientId}/call-logs` && method === 'GET') {
        return handleGetCallLogs(clientId, url.searchParams, dbService, corsHeaders);
      }

      if (path === `/api/${clientId}/call-logs` && method === 'POST') {
        return handleCreateCallLog(clientId, await request.json(), dbService, corsHeaders);
      }

      if (path === `/api/${clientId}/bookings` && method === 'GET') {
        return handleGetBookings(clientId, url.searchParams, dbService, corsHeaders);
      }

      if (path === `/api/${clientId}/bookings` && method === 'POST') {
        return handleCreateBooking(clientId, await request.json(), dbService, corsHeaders);
      }

      if (path === `/api/${clientId}/analytics` && method === 'GET') {
        return handleGetAnalytics(clientId, url.searchParams, dbService, corsHeaders);
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

// Handle test availability requests (REAL ONLY)
async function handleTestAvailability(clientId, availabilityEngine, corsHeaders) {
  try {
    console.log(`[DEBUG] REAL test availability for client: ${clientId}`);
    
    // Use tomorrow's date for testing
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    
    console.log(`[DEBUG] Testing real availability for: ${clientId} on ${dateStr}`);
    
    // Test with 'cleaning' service - REAL calendar integration
    const result = await availabilityEngine.getAvailableSlots(
      clientId, 
      dateStr, 
      'cleaning'
    );

    console.log(`[DEBUG] REAL test availability result:`, result);

    return new Response(JSON.stringify({
      message: 'REAL availability test - using Google Calendar',
      clientId,
      date: dateStr,
      service: 'cleaning',
      result: result,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('[DEBUG] REAL Test Availability Error:', error);
    return new Response(JSON.stringify({ 
      error: 'REAL availability test failed',
      message: error.message,
      note: 'This error indicates missing Google Calendar integration or configuration issues'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// MOCK FUNCTION REMOVED - No fake data allowed

// Handle test booking requests (REAL ONLY)
async function handleTestBooking(clientId, bookingEngine, loggingEngine, corsHeaders) {
  try {
    console.log(`[DEBUG] REAL test booking for client: ${clientId}`);
    
    // Create REAL test booking data for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0); // Set to 10:00 AM
    
    const testBookingData = {
      name: 'REAL Test User',
      phone: '+1234567890',
      email: 'real-test@example.com',
      service: 'cleaning',
      dateTime: tomorrow.toISOString(),
      notes: 'This is a REAL test booking - will create actual Google Calendar event'
    };

    console.log(`[DEBUG] Attempting REAL booking:`, testBookingData);

    // Attempt REAL booking (creates actual Google Calendar event)
    const bookingResult = await bookingEngine.createBooking(clientId, testBookingData);
    console.log(`[DEBUG] REAL test booking result:`, bookingResult);

    // Log the REAL test booking to Google Sheets
    await loggingEngine.logInteraction(clientId, {
      type: 'real_test_booking',
      channel: 'api',
      ...testBookingData,
      status: bookingResult.success ? 'confirmed' : 'failed',
      outcome: bookingResult.message,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({
      message: 'REAL test booking completed - created actual Google Calendar event',
      bookingData: testBookingData,
      result: bookingResult,
      calendarEventCreated: bookingResult.success,
      googleSheetsLogged: true,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('[DEBUG] REAL Test Booking Error:', error);
    return new Response(JSON.stringify({ 
      error: 'REAL test booking failed',
      message: error.message,
      note: 'This error indicates missing Google Calendar or Google Sheets integration'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// ==================== SUPABASE DATABASE HANDLERS ====================

async function handleTestDatabase(dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({
        error: 'Database service not initialized',
        status: 'unavailable',
        note: 'SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment'
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Test connection by attempting a simple query
    const result = await dbService.getAnalytics('test-client', 1);
    
    return new Response(JSON.stringify({
      message: 'Supabase database connection successful',
      status: 'connected',
      timestamp: new Date().toISOString(),
      testResult: result.success
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('[DEBUG] Database Test Error:', error);
    return new Response(JSON.stringify({
      error: 'Database connection test failed',
      message: error.message,
      status: 'error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleGetLeads(clientId, searchParams, dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({ error: 'Database service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const options = {
      status: searchParams.get('status') || undefined,
      limit: parseInt(searchParams.get('limit')) || 50,
      orderBy: searchParams.get('orderBy') || 'created_at',
      ascending: searchParams.get('ascending') === 'true'
    };
    
    const result = await dbService.getLeads(clientId, options);
    
    return new Response(JSON.stringify({
      success: true,
      clientId,
      leads: result.data,
      count: result.data.length
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error getting leads:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get leads',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleCreateLead(clientId, body, dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({ error: 'Database service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Validate required fields
    if (!body.phoneNumber) {
      return new Response(JSON.stringify({
        error: 'Validation failed',
        message: 'phoneNumber is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const leadData = {
      clientId,
      customerName: body.customerName,
      phoneNumber: body.phoneNumber,
      email: body.email,
      businessName: body.businessName,
      serviceRequested: body.serviceRequested,
      leadSource: body.leadSource || 'api',
      leadStatus: body.leadStatus,
      urgency: body.urgency,
      notes: body.notes,
      aiSummary: body.aiSummary,
      assignedTo: body.assignedTo,
      followUpRequired: body.followUpRequired,
      followUpDate: body.followUpDate,
      metadata: body.metadata
    };
    
    const result = await dbService.createLead(leadData);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Lead created successfully',
      lead: result.data
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return new Response(JSON.stringify({
      error: 'Failed to create lead',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleGetCallLogs(clientId, searchParams, dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({ error: 'Database service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const options = {
      limit: parseInt(searchParams.get('limit')) || 50
    };
    
    const result = await dbService.getCallLogs(clientId, options);
    
    return new Response(JSON.stringify({
      success: true,
      clientId,
      callLogs: result.data,
      count: result.data.length
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error getting call logs:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get call logs',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleCreateCallLog(clientId, body, dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({ error: 'Database service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Validate required fields
    if (!body.callerNumber) {
      return new Response(JSON.stringify({
        error: 'Validation failed',
        message: 'callerNumber is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const callData = {
      clientId,
      callerNumber: body.callerNumber,
      transcript: body.transcript,
      aiResponse: body.aiResponse,
      durationSeconds: body.durationSeconds,
      sentiment: body.sentiment,
      callOutcome: body.callOutcome,
      recordingUrl: body.recordingUrl,
      escalationRequired: body.escalationRequired,
      leadCreated: body.leadCreated,
      metadata: body.metadata
    };
    
    const result = await dbService.createCallLog(callData);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Call log created successfully',
      callLog: result.data
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error creating call log:', error);
    return new Response(JSON.stringify({
      error: 'Failed to create call log',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleGetBookings(clientId, searchParams, dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({ error: 'Database service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const options = {
      status: searchParams.get('status') || undefined,
      fromDate: searchParams.get('fromDate') || undefined,
      toDate: searchParams.get('toDate') || undefined,
      limit: parseInt(searchParams.get('limit')) || 50
    };
    
    const result = await dbService.getBookings(clientId, options);
    
    return new Response(JSON.stringify({
      success: true,
      clientId,
      bookings: result.data,
      count: result.data.length
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error getting bookings:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get bookings',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleCreateBooking(clientId, body, dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({ error: 'Database service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Validate required fields
    if (!body.phoneNumber || !body.appointmentDate) {
      return new Response(JSON.stringify({
        error: 'Validation failed',
        message: 'phoneNumber and appointmentDate are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const bookingData = {
      clientId,
      customerName: body.customerName,
      phoneNumber: body.phoneNumber,
      serviceType: body.serviceType,
      appointmentDate: body.appointmentDate,
      appointmentTime: body.appointmentTime,
      bookingStatus: body.bookingStatus,
      notes: body.notes,
      calendarEventId: body.calendarEventId,
      reminderSent: body.reminderSent
    };
    
    const result = await dbService.createBooking(bookingData);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Booking created successfully',
      booking: result.data
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({
      error: 'Failed to create booking',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleGetAnalytics(clientId, searchParams, dbService, corsHeaders) {
  try {
    if (!dbService) {
      return new Response(JSON.stringify({ error: 'Database service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const days = parseInt(searchParams.get('days')) || 30;
    
    const result = await dbService.getAnalytics(clientId, days);
    
    return new Response(JSON.stringify({
      success: true,
      clientId,
      days,
      analytics: result.data
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get analytics',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
