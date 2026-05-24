-- =====================================================
-- BRANDVERSE DATABASE - 2 TABLES
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE 1: LEADS (People who fill forms themselves)
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
    
    -- Technical metadata
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
-- TABLE 2: SCRAPED PROSPECTS (Data you scrape)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.scraped_prospects (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    scraped_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Company information
    company_name TEXT NOT NULL,
    company_website TEXT,
    industry TEXT,
    employee_count TEXT,
    revenue TEXT,
    founded_year INTEGER,
    
    -- Location
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    
    -- Contact information
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    contact_title TEXT,
    
    -- Source tracking
    source_url TEXT,
    source_platform TEXT,
    scrape_method TEXT,
    
    -- Data quality
    data_confidence INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Outreach status
    outreach_status TEXT DEFAULT 'not_contacted',
    last_contacted_at TIMESTAMPTZ,
    notes TEXT,
    
    -- Link to actual lead if they convert
    converted_to_lead_id UUID,
    
    -- Constraints
    CONSTRAINT scraped_prospects_email_check CHECK (contact_email IS NULL OR contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
    CONSTRAINT scraped_prospects_outreach_status_check CHECK (outreach_status IN ('not_contacted', 'contacted', 'interested', 'not_interested', 'converted')),
    CONSTRAINT scraped_prospects_data_confidence_check CHECK (data_confidence >= 0 AND data_confidence <= 100)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Leads indexes
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_lead_status_idx ON public.leads(lead_status);
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS leads_company_idx ON public.leads(company);

-- Scraped prospects indexes
CREATE INDEX IF NOT EXISTS scraped_prospects_company_name_idx ON public.scraped_prospects(company_name);
CREATE INDEX IF NOT EXISTS scraped_prospects_industry_idx ON public.scraped_prospects(industry);
CREATE INDEX IF NOT EXISTS scraped_prospects_outreach_status_idx ON public.scraped_prospects(outreach_status);
CREATE INDEX IF NOT EXISTS scraped_prospects_scraped_at_idx ON public.scraped_prospects(scraped_at DESC);
CREATE INDEX IF NOT EXISTS scraped_prospects_contact_email_idx ON public.scraped_prospects(contact_email) WHERE contact_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS scraped_prospects_converted_lead_idx ON public.scraped_prospects(converted_to_lead_id) WHERE converted_to_lead_id IS NOT NULL;

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

CREATE TRIGGER update_scraped_prospects_updated_at
    BEFORE UPDATE ON public.scraped_prospects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Leads RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert leads" ON public.leads
    FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow service read leads" ON public.leads
    FOR SELECT TO service_role USING (true);

CREATE POLICY "Allow service update leads" ON public.leads
    FOR UPDATE TO service_role USING (true);

-- Scraped prospects RLS
ALTER TABLE public.scraped_prospects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service read scraped_prospects" ON public.scraped_prospects
    FOR SELECT TO service_role USING (true);

CREATE POLICY "Allow service insert scraped_prospects" ON public.scraped_prospects
    FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Allow service update scraped_prospects" ON public.scraped_prospects
    FOR UPDATE TO service_role USING (true);

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE public.leads IS 'Inbound leads from website forms - people who contact you themselves';
COMMENT ON TABLE public.scraped_prospects IS 'Outbound prospecting data scraped from external sources';

COMMENT ON COLUMN public.scraped_prospects.outreach_status IS 'not_contacted, contacted, interested, not_interested, converted';
COMMENT ON COLUMN public.scraped_prospects.data_confidence IS 'Data quality score 0-100, higher is more reliable';
COMMENT ON COLUMN public.scraped_prospects.converted_to_lead_id IS 'Links to actual lead if this prospect fills out a form';