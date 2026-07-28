/**
 * CENTRALIZED LEAD INGESTION SERVICE
 * Production-safe lead capture system with defensive programming
 */

import { FORMSUBMIT_ACTION } from './forms';
import { GoogleSheetsService, createGoogleSheetsService } from './google-sheets-service';
import type { LeadData } from './types';

// Re-export for convenience so consumers can import from lead-service
export type { LeadData };

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
        const phoneRegex = /^[\+]?[0-9\s\-()]{10,20}$/;
        return phoneRegex.test(phone.trim());
    }

    static sanitizeInput(input: string): string {
        if (!input) return '';
        return input.trim().substring(0, 1000);
    }

    static sanitizeUrl(url: string): string {
        if (!url) return '';
        const sanitized = url.trim().substring(0, 500);
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
        return { valid: errors.length === 0, errors };
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
        const spamPatterns = [
            /test/i, /spam/i, /xxx/i, /viagra/i, /casino/i, /lottery/i, /winner/i
        ];
        const message = (data.message || '').toLowerCase();
        const fullName = (data.full_name || '').toLowerCase();
        for (const pattern of spamPatterns) {
            if (pattern.test(message)) return true;
        }
        if (data.email) {
            const suspiciousDomains = ['tempmail.com', 'throwaway.email', 'guerrillamail.com'];
            const domain = data.email.split('@')[1]?.toLowerCase();
            if (suspiciousDomains.includes(domain)) return true;
        }
        if (fullName === 'test test' || fullName === 'john doe') {
            return true;
        }
        return false;
    }
}

// =====================================================
// LEAD SERVICE (MAIN EXPORT)
// =====================================================

class LeadService {
    private googleSheetsService: GoogleSheetsService | null;

    constructor() {
        this.googleSheetsService = createGoogleSheetsService();
    }

    private async submitToSheets(data: LeadData): Promise<boolean> {
        if (!this.googleSheetsService) return false;
        try {
            const result = await this.googleSheetsService.appendLead(data);
            if (result.success) {
                console.log('Lead submitted to Google Sheets');
                return true;
            }
            console.warn('Google Sheets submission failed:', result.error);
            return false;
        } catch (error) {
            console.error('Google Sheets error:', error);
            return false;
        }
    }

    async submitLead(data: LeadData): Promise<LeadSubmissionResult> {
        try {
            // Step 1: Validate
            const validationResult = LeadValidator.validateLeadData(data);
            if (!validationResult.valid) {
                console.warn('Lead validation failed:', validationResult.errors);
                return { success: false, error: validationResult.errors.join(', ') };
            }

            // Step 2: Sanitize
            const sanitizedData = LeadValidator.sanitizeLeadData(data);

            // Step 3: Detect spam
            if (LeadValidator.detectSpam(sanitizedData)) {
                console.warn('Potential spam detected:', sanitizedData);
                return { success: false, error: 'Potential spam detected' };
            }

            // Step 4: Fire Google Sheets and FormSubmit CONCURRENTLY
            const [sheetsResult, formSubmitResult] = await Promise.allSettled([
                this.submitToSheets(sanitizedData),
                this.formSubmitBackup(sanitizedData),
            ]);

            const submittedToSheets = sheetsResult.status === 'fulfilled' && sheetsResult.value === true;
            const submittedToFormSubmit =
                formSubmitResult.status === 'fulfilled' && formSubmitResult.value.success === true;

            // Step 5: Success if ANY channel got through
            if (submittedToSheets || submittedToFormSubmit) {
                return { success: true, fallback: !submittedToSheets };
            }

            // Step 6: Both failed — last-resort mailto + localStorage
            console.error('All lead channels failed (Sheets, FormSubmit)');
            return this.fallbackSubmit(sanitizedData);

        } catch (error) {
            console.error('Lead submission error:', error);
            return this.fallbackSubmit(data);
        }
    }

    private async formSubmitBackup(data: LeadData): Promise<LeadSubmissionResult> {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);
            const response = await fetch(FORMSUBMIT_ACTION, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    _subject: `LEAD [${data.source_form || 'website'}]: ${data.full_name || data.company || 'Unknown'}`,
                    _template: 'table',
                    _captcha: 'false',
                    full_name: data.full_name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    company: data.company || '',
                    website: data.website || '',
                    business_type: data.business_type || '',
                    service_interest: data.service_interest || '',
                    message: data.message || '',
                    source_page: data.source_page || '',
                    source_form: data.source_form || '',
                    utm_source: data.utm_source || '',
                    utm_medium: data.utm_medium || '',
                    utm_campaign: data.utm_campaign || '',
                    timestamp: new Date().toISOString(),
                }),
            });

            clearTimeout(timeout);
            if (response.ok) {
                console.log('Lead captured via FormSubmit');
                return { success: true, fallback: true };
            }

            console.error('FormSubmit failed:', response.status, response.statusText);
        } catch (error: any) {
            if (error?.name === 'AbortError') {
                console.error('FormSubmit timed out');
            } else {
                console.error('FormSubmit error:', error);
            }
        }

        return { success: false, fallback: true, error: 'FormSubmit failed' };
    }

    private async fallbackSubmit(data: LeadData): Promise<LeadSubmissionResult> {
        const emailBody = `
BRANDVERSE LEAD BACKUP (Database Failed)

Name: ${data.full_name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Website: ${data.website || 'Not provided'}
Business Type: ${data.business_type || 'Not provided'}
Service Interest: ${data.service_interest || 'Not provided'}
Message: ${data.message || 'Not provided'}

Source Page: ${data.source_page || 'unknown'}
Source Form: ${data.source_form || 'unknown'}
UTM Source: ${data.utm_source || 'unknown'}
UTM Medium: ${data.utm_medium || 'unknown'}
UTM Campaign: ${data.utm_campaign || 'unknown'}

Timestamp: ${new Date().toISOString()}
        `.trim();

        const mailtoLink = `mailto:ayush@brandverse.tech?subject=LEAD BACKUP: ${data.full_name || 'Unknown'} - ${data.company || 'No Company'}&body=${encodeURIComponent(emailBody)}`;

        try {
            if (typeof window !== 'undefined') {
                const failedLeads = JSON.parse(localStorage.getItem('failed_leads') || '[]');
                failedLeads.push({ ...data, timestamp: new Date().toISOString(), attempted: false });
                localStorage.setItem('failed_leads', JSON.stringify(failedLeads));
            }
        } catch (e) {
            console.error('Failed to store lead in localStorage:', e);
        }

        try {
            if (typeof window !== 'undefined') {
                window.open(mailtoLink, '_blank');
            }
        } catch (e) {
            console.error('Failed to open email client:', e);
        }

        console.error('CRITICAL: Lead submission failed - email backup triggered', data);

        return {
            success: false,
            fallback: true,
            error: 'All channels unavailable - email backup opened. Please send the email to save this lead.',
        };
    }

    async submitLeadWithRetry(data: LeadData, maxRetries: number = 2): Promise<LeadSubmissionResult> {
        let lastResult: LeadSubmissionResult | null = null;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            const result = await this.submitLead(data);
            if (result.success) return result;

            lastResult = result;

            const nonRetryable =
                result.error?.includes('required') ||
                result.error?.includes('Invalid') ||
                result.error?.includes('spam') ||
                result.fallback;

            if (nonRetryable) return result;

            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }

        return lastResult || { success: false, error: 'Max retries exceeded' };
    }

    static getCurrentSourcePage(): string {
        if (typeof window !== 'undefined') {
            return window.location.pathname;
        }
        return 'unknown';
    }

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