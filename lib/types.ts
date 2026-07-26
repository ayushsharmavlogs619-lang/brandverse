export interface LeadData {
  full_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  business_type?: string;
  service_interest?: string;
  message?: string;
  source_page?: string;
  source_form?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  timestamp?: string;
}

export interface AIAnalysis {
  summary?: string;
  urgency?: 'low' | 'medium' | 'high';
  lead_quality?: 'low' | 'medium' | 'high';
  suggested_reply?: string;
}
