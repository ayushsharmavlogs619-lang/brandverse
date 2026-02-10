/**
 * Input validation utilities
 * Sanitizes and validates user input
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
    valid: boolean;
    error?: string;
}

/**
 * Email validation regex (RFC 5322)
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Subdomain validation regex
 * - 3-63 characters
 * - Lowercase alphanumeric and hyphens
 * - Cannot start or end with hyphen
 */
const SUBDOMAIN_REGEX = /^[a-z][a-z0-9-]{1,61}[a-z0-9]$/;

/**
 * Password requirements
 */
const PASSWORD_MIN_LENGTH = Number(process.env.PASSWORD_MIN_LENGTH) || 8;
const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_REQUIRE_UPPERCASE = process.env.PASSWORD_REQUIRE_UPPERCASE !== 'false';
const PASSWORD_REQUIRE_NUMBERS = process.env.PASSWORD_REQUIRE_NUMBERS !== 'false';
const PASSWORD_REQUIRE_SPECIAL = process.env.PASSWORD_REQUIRE_SPECIAL !== 'false';

/**
 * Validate email address
 * @param email - Email to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
    if (!email) {
        return { valid: false, error: 'Email is required' };
    }

    if (email.length > 254) {
        return { valid: false, error: 'Email is too long' };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    return { valid: true };
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Validation result
 */
export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return { valid: false, error: 'Password is required' };
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        return {
            valid: false,
            error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
        };
    }

    if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            valid: false,
            error: `Password must be less than ${PASSWORD_MAX_LENGTH} characters`
        };
    }

    // Check for at least one uppercase letter
    if (PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        return {
            valid: false,
            error: 'Password must contain at least one uppercase letter'
        };
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return {
            valid: false,
            error: 'Password must contain at least one lowercase letter'
        };
    }

    // Check for at least one number
    if (PASSWORD_REQUIRE_NUMBERS && !/[0-9]/.test(password)) {
        return {
            valid: false,
            error: 'Password must contain at least one number'
        };
    }

    // Check for at least one special character
    if (PASSWORD_REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            valid: false,
            error: 'Password must contain at least one special character'
        };
    }

    return { valid: true };
}

/**
 * Validate subdomain format
 * @param subdomain - Subdomain to validate
 * @returns Validation result
 */
export function validateSubdomain(subdomain: string): ValidationResult {
    if (!subdomain) {
        return { valid: false, error: 'Subdomain is required' };
    }

    const lowercased = subdomain.toLowerCase();

    if (lowercased.length < 3) {
        return { valid: false, error: 'Subdomain must be at least 3 characters' };
    }

    if (lowercased.length > 63) {
        return { valid: false, error: 'Subdomain must be less than 63 characters' };
    }

    if (!SUBDOMAIN_REGEX.test(lowercased)) {
        return {
            valid: false,
            error: 'Subdomain can only contain lowercase letters, numbers, and hyphens. Cannot start or end with hyphen.'
        };
    }

    // Reserved subdomains
    const reserved = ['www', 'api', 'admin', 'mail', 'ftp', 'portal', 'app', 'staging', 'dev'];
    if (reserved.includes(lowercased)) {
        return { valid: false, error: 'This subdomain is reserved' };
    }

    return { valid: true };
}

/**
 * Sanitize string input (prevent XSS)
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
    if (!input) return '';

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

/**
 * Validate string length
 * @param input - String to validate
 * @param maxLength - Maximum allowed length
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateLength(
    input: string,
    maxLength: number,
    fieldName: string
): ValidationResult {
    if (!input) {
        return { valid: false, error: `${fieldName} is required` };
    }

    if (input.length > maxLength) {
        return {
            valid: false,
            error: `${fieldName} must be less than ${maxLength} characters`
        };
    }

    return { valid: true };
}

/**
 * Validate display name
 * @param name - Display name to validate
 * @returns Validation result
 */
export function validateDisplayName(name: string): ValidationResult {
    if (!name) {
        return { valid: false, error: 'Display name is required' };
    }

    if (name.length < 2) {
        return { valid: false, error: 'Display name must be at least 2 characters' };
    }

    if (name.length > 100) {
        return { valid: false, error: 'Display name must be less than 100 characters' };
    }

    // Only allow letters, numbers, spaces, and basic punctuation
    if (!/^[a-zA-Z0-9\s\-_.]+$/.test(name)) {
        return {
            valid: false,
            error: 'Display name can only contain letters, numbers, spaces, hyphens, underscores, and periods'
        };
    }

    return { valid: true };
}

/**
 * Validate hex color code
 * @param color - Hex color to validate
 * @returns Validation result
 */
export function validateHexColor(color: string): ValidationResult {
    if (!color) {
        return { valid: false, error: 'Color is required' };
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
        return { valid: false, error: 'Invalid hex color format (use #RRGGBB)' };
    }

    return { valid: true };
}
