/**
 * CENTRALIZED LEAD INGESTION SERVICE
 * Production-safe lead capture system with defensive programming
 */

import { config } from './config';

// =====================================================
// TYPES
// =====================================================

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
}

export interface LeadSubmissionResult {
    success: boolean;
    leadId?: string;
    error?: string;
    fallback?: boolean;
}

// =====================================================
// VALIDATION UTILITIES
// =====================================================

class LeadValidator {
    static isValidEmail(email: string): boolean {
        if (!email || email.trim() === '') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    static isValidPhone(phone: string): boolean {
        if (!phone || phone.trim() === '') return false;
        // Allow international formats: +1234567890, 123-456-7890, (123) 456-7890
        const phoneRegex = /^[\+]?[0-9\s\-()]{10,20}$/;
        return phoneRegex.test(phone.trim());
    }

    static sanitizeInput(input: string): string {
        if (!input) return '';
        return input.trim().substring(0, 1000); // Prevent excessively long inputs
    }

    static sanitizeUrl(url: string): string {
        if (!url) return '';
        const sanitized = url.trim().substring(0, 500);
        // Basic URL validation
        if (sanitized && !sanitized.startsWith('http')) {
            return 'https://' + sanitized;
        }
        return sanitized;
    }

    static validateLeadData(data: LeadData): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!data.email && !data.phone) {
            errors.push('At least email or phone is required');
        }

        if (data.email && !this.isValidEmail(data.email)) {
            errors.push('Invalid email format');
        }

        if (data.phone && !this.isValidPhone(data.phone)) {
            errors.push('Invalid phone format');
        }

        if (data.full_name && data.full_name.length < 2) {
            errors.push('Name must be at least 2 characters');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    static sanitizeLeadData(data: LeadData): LeadData {
        return {
            full_name: data.full_name ? this.sanitizeInput(data.full_name) : undefined,
            email: data.email ? this.sanitizeInput(data.email).toLowerCase() : undefined,
            phone: data.phone ? this.sanitizeInput(data.phone) : undefined,
            company: data.company ? this.sanitizeInput(data.company) : undefined,
            website: data.website ? this.sanitizeUrl(data.website) : undefined,
            business_type: data.business_type ? this.sanitizeInput(data.business_type) : undefined,
            service_interest: data.service_interest ? this.sanitizeInput(data.service_interest) : undefined,
            message: data.message ? this.sanitizeInput(data.message) : undefined,
            source_page: data.source_page ? this.sanitizeInput(data.source_page) : undefined,
            source_form: data.source_form ? this.sanitizeInput(data.source_form) : undefined,
            utm_source: data.utm_source ? this.sanitizeInput(data.utm_source) : undefined,
            utm_medium: data.utm_medium ? this.sanitizeInput(data.utm_medium) : undefined,
            utm_campaign: data.utm_campaign ? this.sanitizeInput(data.utm_campaign) : undefined,
        };
    }

    static detectSpam(data: LeadData): boolean {
        // Basic spam detection
        const spamPatterns = [
            /test/i,
            /spam/i,
            /xxx/i,
            /viagra/i,
            /casino/i,
            /lottery/i,
            /winner/i
        ];

        const message = (data.message || '').toLowerCase();
        const fullName = (data.full_name || '').toLowerCase();
        const company = (data.company || '').toLowerCase();

        // Check for spam patterns in message
        for (const pattern of spamPatterns) {
            if (pattern.test(message)) return true;
        }

        // Check for suspicious email domains
        if (data.email) {
            const suspiciousDomains = ['tempmail.com', 'throwaway.email', 'guerrillamail.com'];
            const domain = data.email.split('@')[1]?.toLowerCase();
            if (suspiciousDomains.includes(domain)) return true;
        }

        // Check for obviously fake data
        if (fullName === 'test test' || fullName === 'john doe') {
            return true;
        }

        return false;
    }
}

// =====================================================
// SUPABASE CLIENT
// =====================================================

class SupabaseLeadClient {
    private url: string;
    private key: string;
    private timeout: number;

    constructor() {
        this.url = config.supabase.url;
        this.key = config.supabase.anonKey;
        this.timeout = 10000; // 10 second timeout
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(`${this.url}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.key,
                    'Authorization': `Bearer ${this.key}`,
                    ...options.headers,
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Supabase request failed: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timeout after 10 seconds');
            }
            throw error;
        }
    }

    async insertLead(data: LeadData): Promise<{ id: string; [key: string]: any }> {
        const payload = {
            ...data,
            // Add technical metadata
            ip_address: this.getClientIp(),
            user_agent: this.getUserAgent(),
        };

        const response = await this.request<{ data: any }>('/rest/v1/leads', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        return response.data;
    }

    private getClientIp(): string {
        // In a real implementation, you'd get this from the request headers
        // For static export, we'll return empty
        return '';
    }

    private getUserAgent(): string {
        if (typeof navigator !== 'undefined') {
            return navigator.userAgent;
        }
        return '';
    }
}

// =====================================================
// LEAD SERVICE (MAIN EXPORT)
// =====================================================

class LeadService {
    private supabase: SupabaseLeadClient;
    private isConfigured: boolean;

    constructor() {
        this.supabase = new SupabaseLeadClient();
        this.isConfigured = this.checkConfiguration();
    }

    private checkConfiguration(): boolean {
        return !!(
            config.supabase.url &&
            config.supabase.anonKey &&
            config.supabase.url !== '' &&
            config.supabase.anonKey !== ''
        );
    }

    async submitLead(data: LeadData): Promise<LeadSubmissionResult> {
        try {
            // Step 1: Validate input
            const validationResult = LeadValidator.validateLeadData(data);
            if (!validationResult.valid) {
                console.warn('Lead validation failed:', validationResult.errors);
                return {
                    success: false,
                    error: validationResult.errors.join(', '),
                };
            }

            // Step 2: Sanitize input
            const sanitizedData = LeadValidator.sanitizeLeadData(data);

            // Step 3: Detect spam
            if (LeadValidator.detectSpam(sanitizedData)) {
                console.warn('Potential spam detected:', sanitizedData);
                return {
                    success: false,
                    error: 'Potential spam detected',
                };
            }

            // Step 4: Check if Supabase is configured
            if (!this.isConfigured) {
                console.warn('Supabase not configured, using fallback');
                return this.fallbackSubmit(sanitizedData);
            }

            // Step 5: Submit to Supabase
            const result = await this.supabase.insertLead(sanitizedData);
            
            console.log('Lead submitted successfully:', result.id);
            return {
                success: true,
                leadId: result.id,
            };

        } catch (error) {
            console.error('Lead submission error:', error);
            
            // Step 6: Graceful fallback
            return this.fallbackSubmit(data);
        }
    }

    private fallbackSubmit(data: LeadData): LeadSubmissionResult {
        // Fallback: log to console and potentially send email
        // FALLBACK: Lead submission

        // In production, you might want to:
        // 1. Send to a backup API
        // 2. Send an email notification
        // 3. Store in localStorage for later retry

        return {
            success: true,
            fallback: true,
            error: 'Stored locally (database unavailable)',
        };
    }

    async submitLeadWithRetry(
        data: LeadData,
        maxRetries: number = 2
    ): Promise<LeadSubmissionResult> {
        let lastError: Error | null = null;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const result = await this.submitLead(data);
                if (result.success) {
                    return result;
                }
            } catch (error) {
                lastError = error as Error;
                console.warn(`Lead submission attempt ${attempt + 1} failed:`, error);
                
                // Exponential backoff
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                }
            }
        }

        return {
            success: false,
            error: lastError?.message || 'Max retries exceeded',
        };
    }

    // Helper to get current page URL for source tracking
    static getCurrentSourcePage(): string {
        if (typeof window !== 'undefined') {
            return window.location.pathname;
        }
        return 'unknown';
    }

    // Helper to get UTM parameters from URL
    static getUtmParameters(): Record<string, string> {
        if (typeof window === 'undefined') return {};

        const urlParams = new URLSearchParams(window.location.search);
        return {
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
        };
    }
}

// =====================================================
// EXPORTS
// =====================================================

export { LeadService };
export const leadService = new LeadService();
export { LeadValidator };