-- Brandverse Production Database Schema
-- Run this in Supabase SQL Editor

-- Enable RLS (Row Level Security) will be applied per table

-- ==================== CLIENTS TABLE ====================
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Business Info
    business_name TEXT NOT NULL,
    industry TEXT,
    
    -- Contact Info
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    
    -- Subscription & Billing
    subscription_status TEXT DEFAULT 'active',
    plan_type TEXT DEFAULT 'starter',
    ai_minutes_used INTEGER DEFAULT 0,
    ai_minutes_limit INTEGER DEFAULT 500,
    
    -- Configuration
    worker_routes JSONB DEFAULT '{}',
    branding_settings JSONB DEFAULT '{}',
    automation_settings JSONB DEFAULT '{}',
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    onboarded_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for clients
CREATE INDEX IF NOT EXISTS idx_clients_subscription ON clients(subscription_status);
CREATE INDEX IF NOT EXISTS idx_clients_plan ON clients(plan_type);
CREATE INDEX IF NOT EXISTS idx_clients_active ON clients(is_active) WHERE is_active = true;

-- ==================== LEADS TABLE ====================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Client Reference
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Customer Info
    customer_name TEXT,
    phone_number TEXT NOT NULL,
    email TEXT,
    business_name TEXT,
    
    -- Lead Details
    service_requested TEXT,
    lead_source TEXT DEFAULT 'ai_receptionist',
    lead_status TEXT DEFAULT 'new',
    urgency TEXT DEFAULT 'medium',
    notes TEXT,
    ai_summary TEXT,
    
    -- Assignment & Follow-up
    assigned_to TEXT,
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Constraints
    CONSTRAINT valid_lead_status CHECK (lead_status IN ('new', 'contacted', 'qualified', 'converted', 'lost', 'archived')),
    CONSTRAINT valid_urgency CHECK (urgency IN ('low', 'medium', 'high', 'critical'))
);

-- Indexes for leads
CREATE INDEX IF NOT EXISTS idx_leads_client ON leads(client_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone_number);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON leads(follow_up_required) WHERE follow_up_required = true;
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(lead_source);

-- ==================== CALL LOGS TABLE ====================
CREATE TABLE IF NOT EXISTS call_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Client Reference
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Call Details
    caller_number TEXT NOT NULL,
    transcript TEXT,
    ai_response TEXT,
    duration_seconds INTEGER,
    sentiment TEXT,
    
    -- Outcome & Follow-up
    call_outcome TEXT DEFAULT 'completed',
    recording_url TEXT,
    escalation_required BOOLEAN DEFAULT false,
    lead_created BOOLEAN DEFAULT false,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Constraints
    CONSTRAINT valid_sentiment CHECK (sentiment IN ('positive', 'neutral', 'negative', 'mixed', null)),
    CONSTRAINT valid_call_outcome CHECK (call_outcome IN ('completed', 'missed', 'voicemail', 'transferred', 'booked', 'escalated', 'error'))
);

-- Indexes for call_logs
CREATE INDEX IF NOT EXISTS idx_call_logs_client ON call_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_call_logs_caller ON call_logs(caller_number);
CREATE INDEX IF NOT EXISTS idx_call_logs_outcome ON call_logs(call_outcome);
CREATE INDEX IF NOT EXISTS idx_call_logs_created ON call_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_logs_escalation ON call_logs(escalation_required) WHERE escalation_required = true;
CREATE INDEX IF NOT EXISTS idx_call_logs_lead ON call_logs(lead_created) WHERE lead_created = true;

-- ==================== BOOKINGS TABLE ====================
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Client Reference
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Customer Info
    customer_name TEXT,
    phone_number TEXT NOT NULL,
    
    -- Appointment Details
    service_type TEXT,
    appointment_date DATE NOT NULL,
    appointment_time TIME,
    
    -- Status & Tracking
    booking_status TEXT DEFAULT 'pending',
    notes TEXT,
    calendar_event_id TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    
    -- Constraints
    CONSTRAINT valid_booking_status CHECK (booking_status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show'))
);

-- Indexes for bookings
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_reminder ON bookings(reminder_sent) WHERE reminder_sent = false;

-- ==================== AUTOMATION EVENTS TABLE ====================
CREATE TABLE IF NOT EXISTS automation_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Client Reference
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Event Details
    event_type TEXT NOT NULL,
    event_payload JSONB DEFAULT '{}',
    
    -- Execution Tracking
    automation_status TEXT DEFAULT 'pending',
    execution_result JSONB DEFAULT '{}',
    retry_count INTEGER DEFAULT 0,
    processed_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT valid_automation_status CHECK (automation_status IN ('pending', 'processing', 'completed', 'failed', 'retrying'))
);

-- Indexes for automation_events
CREATE INDEX IF NOT EXISTS idx_automation_client ON automation_events(client_id);
CREATE INDEX IF NOT EXISTS idx_automation_status ON automation_events(automation_status);
CREATE INDEX IF NOT EXISTS idx_automation_type ON automation_events(event_type);
CREATE INDEX IF NOT EXISTS idx_automation_created ON automation_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_automation_pending ON automation_events(automation_status) WHERE automation_status IN ('pending', 'retrying');

-- ==================== ROW LEVEL SECURITY POLICIES ====================

-- Enable RLS on all tables (idempotent)
ALTER TABLE IF EXISTS clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS automation_events ENABLE ROW LEVEL SECURITY;

-- Note: Create specific RLS policies based on your auth strategy
-- For now, using service key bypasses RLS (backend operations)

-- ==================== TRIGGERS FOR UPDATED_AT ====================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop triggers if they exist, then recreate
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_call_logs_updated_at ON call_logs;
CREATE TRIGGER update_call_logs_updated_at BEFORE UPDATE ON call_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_automation_events_updated_at ON automation_events;
CREATE TRIGGER update_automation_events_updated_at BEFORE UPDATE ON automation_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================== VIEWS FOR ANALYTICS ====================

CREATE OR REPLACE VIEW daily_stats AS
SELECT 
    client_id,
    DATE(created_at) as date,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as total_calls_24h,
    COUNT(*) FILTER (WHERE lead_created = true) as leads_created,
    AVG(duration_seconds) as avg_call_duration
FROM call_logs
GROUP BY client_id, DATE(created_at);

-- ==================== INITIAL DATA (Optional) ====================

-- Insert a test client (uncomment if needed)
-- INSERT INTO clients (business_name, industry, contact_name, contact_email, plan_type)
-- VALUES ('Test Business', 'HVAC', 'John Doe', 'john@test.com', 'starter');
