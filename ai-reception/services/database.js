import { getSupabaseClient } from './supabase.js'

// Production Database Service Layer
// Handles all Supabase operations with proper error handling and validation

export class DatabaseService {
  constructor(env) {
    this.supabase = getSupabaseClient(env)
    this.env = env
  }

  // ==================== LEADS ====================
  
  async createLead(leadData) {
    const { data, error } = await this.supabase
      .from('leads')
      .insert([{
        client_id: leadData.clientId,
        customer_name: leadData.customerName,
        phone_number: leadData.phoneNumber,
        email: leadData.email,
        business_name: leadData.businessName,
        service_requested: leadData.serviceRequested,
        lead_source: leadData.leadSource,
        lead_status: leadData.leadStatus || 'new',
        urgency: leadData.urgency,
        notes: leadData.notes,
        ai_summary: leadData.aiSummary,
        assigned_to: leadData.assignedTo,
        follow_up_required: leadData.followUpRequired || false,
        follow_up_date: leadData.followUpDate,
        metadata: leadData.metadata || {}
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating lead:', error)
      throw new Error(`Failed to create lead: ${error.message}`)
    }
    
    return { success: true, data }
  }

  async getLeads(clientId, options = {}) {
    let query = this.supabase
      .from('leads')
      .select('*')
      .eq('client_id', clientId)
    
    if (options.status) {
      query = query.eq('lead_status', options.status)
    }
    
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? false })
    } else {
      query = query.order('created_at', { ascending: false })
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching leads:', error)
      throw new Error(`Failed to fetch leads: ${error.message}`)
    }
    
    return { success: true, data }
  }

  async updateLead(leadId, updates) {
    const { data, error } = await this.supabase
      .from('leads')
      .update(updates)
      .eq('id', leadId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating lead:', error)
      throw new Error(`Failed to update lead: ${error.message}`)
    }
    
    return { success: true, data }
  }

  // ==================== CALL LOGS ====================

  async createCallLog(callData) {
    const { data, error } = await this.supabase
      .from('call_logs')
      .insert([{
        client_id: callData.clientId,
        caller_number: callData.callerNumber,
        transcript: callData.transcript,
        ai_response: callData.aiResponse,
        duration_seconds: callData.durationSeconds,
        sentiment: callData.sentiment,
        call_outcome: callData.callOutcome,
        recording_url: callData.recordingUrl,
        escalation_required: callData.escalationRequired || false,
        lead_created: callData.leadCreated || false,
        metadata: callData.metadata || {}
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating call log:', error)
      throw new Error(`Failed to create call log: ${error.message}`)
    }
    
    return { success: true, data }
  }

  async getCallLogs(clientId, options = {}) {
    let query = this.supabase
      .from('call_logs')
      .select('*')
      .eq('client_id', clientId)
    
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    query = query.order('created_at', { ascending: false })
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching call logs:', error)
      throw new Error(`Failed to fetch call logs: ${error.message}`)
    }
    
    return { success: true, data }
  }

  // ==================== BOOKINGS ====================

  async createBooking(bookingData) {
    const { data, error } = await this.supabase
      .from('bookings')
      .insert([{
        client_id: bookingData.clientId,
        customer_name: bookingData.customerName,
        phone_number: bookingData.phoneNumber,
        service_type: bookingData.serviceType,
        appointment_date: bookingData.appointmentDate,
        appointment_time: bookingData.appointmentTime,
        booking_status: bookingData.bookingStatus || 'pending',
        notes: bookingData.notes,
        calendar_event_id: bookingData.calendarEventId,
        reminder_sent: bookingData.reminderSent || false
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating booking:', error)
      throw new Error(`Failed to create booking: ${error.message}`)
    }
    
    return { success: true, data }
  }

  async getBookings(clientId, options = {}) {
    let query = this.supabase
      .from('bookings')
      .select('*')
      .eq('client_id', clientId)
    
    if (options.status) {
      query = query.eq('booking_status', options.status)
    }
    
    if (options.fromDate) {
      query = query.gte('appointment_date', options.fromDate)
    }
    
    if (options.toDate) {
      query = query.lte('appointment_date', options.toDate)
    }
    
    query = query.order('appointment_date', { ascending: true })
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching bookings:', error)
      throw new Error(`Failed to fetch bookings: ${error.message}`)
    }
    
    return { success: true, data }
  }

  async updateBooking(bookingId, updates) {
    const { data, error } = await this.supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating booking:', error)
      throw new Error(`Failed to update booking: ${error.message}`)
    }
    
    return { success: true, data }
  }

  // ==================== CLIENTS ====================

  async getClient(clientId) {
    const { data, error } = await this.supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single()
    
    if (error) {
      console.error('Error fetching client:', error)
      throw new Error(`Failed to fetch client: ${error.message}`)
    }
    
    return { success: true, data }
  }

  async updateClient(clientId, updates) {
    const { data, error } = await this.supabase
      .from('clients')
      .update(updates)
      .eq('id', clientId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating client:', error)
      throw new Error(`Failed to update client: ${error.message}`)
    }
    
    return { success: true, data }
  }

  // ==================== AUTOMATION EVENTS ====================

  async createAutomationEvent(eventData) {
    const { data, error } = await this.supabase
      .from('automation_events')
      .insert([{
        client_id: eventData.clientId,
        event_type: eventData.eventType,
        event_payload: eventData.eventPayload,
        automation_status: eventData.automationStatus || 'pending',
        execution_result: eventData.executionResult,
        retry_count: eventData.retryCount || 0
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating automation event:', error)
      throw new Error(`Failed to create automation event: ${error.message}`)
    }
    
    return { success: true, data }
  }

  async updateAutomationEvent(eventId, updates) {
    const { data, error } = await this.supabase
      .from('automation_events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating automation event:', error)
      throw new Error(`Failed to update automation event: ${error.message}`)
    }
    
    return { success: true, data }
  }

  // ==================== ANALYTICS ====================

  async getAnalytics(clientId, days = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data: calls, error: callsError } = await this.supabase
      .from('call_logs')
      .select('*')
      .eq('client_id', clientId)
      .gte('created_at', startDate.toISOString())
    
    if (callsError) {
      console.error('Error fetching call analytics:', callsError)
    }
    
    const { data: leads, error: leadsError } = await this.supabase
      .from('leads')
      .select('*')
      .eq('client_id', clientId)
      .gte('created_at', startDate.toISOString())
    
    if (leadsError) {
      console.error('Error fetching lead analytics:', leadsError)
    }
    
    const { data: bookings, error: bookingsError } = await this.supabase
      .from('bookings')
      .select('*')
      .eq('client_id', clientId)
      .gte('created_at', startDate.toISOString())
    
    if (bookingsError) {
      console.error('Error fetching booking analytics:', bookingsError)
    }
    
    const analytics = {
      totalCalls: calls?.length || 0,
      totalLeads: leads?.length || 0,
      totalBookings: bookings?.length || 0,
      callsByOutcome: {},
      leadsByStatus: {},
      bookingsByStatus: {}
    }
    
    // Aggregate call outcomes
    calls?.forEach(call => {
      const outcome = call.call_outcome || 'unknown'
      analytics.callsByOutcome[outcome] = (analytics.callsByOutcome[outcome] || 0) + 1
    })
    
    // Aggregate lead statuses
    leads?.forEach(lead => {
      const status = lead.lead_status || 'unknown'
      analytics.leadsByStatus[status] = (analytics.leadsByStatus[status] || 0) + 1
    })
    
    // Aggregate booking statuses
    bookings?.forEach(booking => {
      const status = booking.booking_status || 'unknown'
      analytics.bookingsByStatus[status] = (analytics.bookingsByStatus[status] || 0) + 1
    })
    
    return { success: true, data: analytics }
  }
}
