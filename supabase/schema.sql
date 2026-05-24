-- =====================================================
-- BRANDVERSE LEAD INFRASTRUCTURE - SUPABASE SCHEMA
-- =====================================================
-- Production-ready lead ingestion system
-- Migration-safe schema with proper indexes and RLS

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- LEADS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.leads (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Contact information
    full_name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    website TEXT,
    
    -- Business classification
    business_type TEXT,
    service_interest TEXT,
    message TEXT,
    
    -- Source tracking
    source_page TEXT,
    source_form TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    
    -- Technical metadata (optional)
    ip_address TEXT,
    user_agent TEXT,
    
    -- Lead management
    lead_status TEXT DEFAULT 'new' NOT NULL,
    priority_score INTEGER DEFAULT 0,
    
    -- Constraints
    CONSTRAINT leads_email_check CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
    CONSTRAINT leads_phone_check CHECK (phone IS NULL OR phone ~* '^[\+]?[0-9\s\-()]{10,20}$'),
    CONSTRAINT leads_lead_status_check CHECK (lead_status IN ('new', 'contacted', 'qualified', 'proposal', 'closed', 'lost')),
    CONSTRAINT leads_priority_score_check CHECK (priority_score >= 0 AND priority_score <= 10)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Email uniqueness (optional - remove if you want duplicate leads allowed)
CREATE UNIQUE INDEX IF NOT EXISTS leads_email_unique_idx ON public.leads(email) WHERE email IS NOT NULL;

-- Query optimization indexes
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_lead_status_idx ON public.leads(lead_status);
CREATE INDEX IF NOT EXISTS leads_service_interest_idx ON public.leads(service_interest);
CREATE INDEX IF NOT EXISTS leads_business_type_idx ON public.leads(business_type);
CREATE INDEX IF NOT EXISTS leads_source_page_idx ON public.leads(source_page);
CREATE INDEX IF NOT EXISTS leads_priority_score_idx ON public.leads(priority_score DESC);
CREATE INDEX IF NOT EXISTS leads_utm_source_idx ON public.leads(utm_source);
CREATE INDEX IF NOT EXISTS leads_created_at_status_idx ON public.leads(created_at DESC, lead_status);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS leads_status_created_idx ON public.leads(lead_status, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_business_status_idx ON public.leads(business_type, lead_status);

-- =====================================================
-- AUTOMATIC UPDATED_AT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert leads (public web forms)
CREATE POLICY "Allow public insert" ON public.leads
    FOR INSERT
    TO PUBLIC
    WITH CHECK (true);

-- Allow service role to read all leads (for dashboard/CRM)
CREATE POLICY "Allow service read all" ON public.leads
    FOR SELECT
    TO service_role
    USING (true);

-- Allow service role to update leads (for CRM management)
CREATE POLICY "Allow service update" ON public.leads
    FOR UPDATE
    TO service_role
    USING (true);

-- Allow service role to delete leads (for data management)
CREATE POLICY "Allow service delete" ON public.leads
    FOR DELETE
    TO service_role
    USING (true);

-- =====================================================
-- HELPER FUNCTIONS FOR LEAD SCORING
-- =====================================================

-- Function to calculate priority score based on lead quality
CREATE OR REPLACE FUNCTION public.calculate_lead_priority(
    p_email TEXT,
    p_phone TEXT,
    p_company TEXT,
    p_message TEXT,
    p_service_interest TEXT
)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER DEFAULT 0;
BEGIN
    -- Email presence = +2 points
    IF p_email IS NOT NULL AND p_email != '' THEN
        score := score + 2;
    END IF;
    
    -- Phone presence = +2 points
    IF p_phone IS NOT NULL AND p_phone != '' THEN
        score := score + 2;
    END IF;
    
    -- Company presence = +2 points
    IF p_company IS NOT NULL AND p_company != '' THEN
        score := score + 2;
    END IF;
    
    -- Message presence = +2 points
    IF p_message IS NOT NULL AND p_message != '' THEN
        score := score + 2;
    END IF;
    
    -- High-value services = +2 points
    IF p_service_interest IN ('AI Voice Agents', 'Custom Solution', 'Enterprise Plan') THEN
        score := score + 2;
    END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to auto-calculate priority score on insert
CREATE OR REPLACE FUNCTION public.set_lead_priority()
RETURNS TRIGGER AS $$
BEGIN
    NEW.priority_score = public.calculate_lead_priority(
        NEW.email,
        NEW.phone,
        NEW.company,
        NEW.message,
        NEW.service_interest
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_lead_priority_on_insert
    BEFORE INSERT ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.set_lead_priority();

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for new leads (dashboard ready)
CREATE OR REPLACE VIEW public.new_leads_view AS
SELECT 
    id,
    full_name,
    email,
    phone,
    company,
    business_type,
    service_interest,
    message,
    source_page,
    source_form,
    created_at,
    priority_score
FROM public.leads
WHERE lead_status = 'new'
ORDER BY created_at DESC;

-- View for lead analytics
CREATE OR REPLACE VIEW public.lead_analytics_view AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN lead_status = 'new' THEN 1 END) as new_leads,
    COUNT(CASE WHEN lead_status = 'contacted' THEN 1 END) as contacted_leads,
    COUNT(CASE WHEN lead_status = 'qualified' THEN 1 END) as qualified_leads,
    COUNT(CASE WHEN lead_status = 'closed' THEN 1 END) as closed_leads,
    AVG(priority_score) as avg_priority_score,
    source_form,
    business_type
FROM public.leads
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at), source_form, business_type
ORDER BY date DESC;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE public.leads IS 'Production lead ingestion table for Brandverse.tech - stores all form submissions with tracking and lead management fields';
COMMENT ON COLUMN public.leads.lead_status IS 'Lead status: new, contacted, qualified, proposal, closed, lost';
COMMENT ON COLUMN public.leads.priority_score IS 'Automated lead quality score (0-10), calculated on insert';
COMMENT ON COLUMN public.leads.source_form IS 'Identifier of which form submitted the lead (contact_form, audit_request, etc.)';
COMMENT ON COLUMN public.leads.utm_source IS 'UTM tracking parameter for marketing attribution';
