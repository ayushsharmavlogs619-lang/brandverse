/**
 * Subdomain extraction and validation utilities for multi-tenant portal
 */

// Production domains that the portal can run on
const PRODUCTION_DOMAINS = ['brandverse.tech', 'brandverse.pages.dev'];

// Local development patterns
const LOCAL_PATTERNS = ['localhost', '127.0.0.1'];

/**
 * Extract subdomain from a hostname
 * @param host - The full hostname (e.g., "phantomcat.brandverse.tech")
 * @returns The subdomain or null if none found
 */
export function getSubdomain(host: string): string | null {
  if (!host) return null;

  // Remove port if present
  const hostname = host.split(':')[0].toLowerCase();

  // Handle localhost development (e.g., phantomcat.localhost)
  for (const local of LOCAL_PATTERNS) {
    if (hostname.endsWith(`.${local}`) || hostname === local) {
      const parts = hostname.split('.');
      // phantomcat.localhost -> ['phantomcat', 'localhost']
      if (parts.length >= 2 && parts[0] !== local && parts[0] !== '') {
        return parts[0];
      }
      return null;
    }
  }

  // Handle production domains
  for (const domain of PRODUCTION_DOMAINS) {
    if (hostname.endsWith(`.${domain}`)) {
      // phantomcat.brandverse.tech -> phantomcat
      const subdomain = hostname.replace(`.${domain}`, '');
      // Ensure it's not empty and doesn't contain dots (nested subdomains)
      if (subdomain && !subdomain.includes('.')) {
        return subdomain;
      }
    }
  }

  return null;
}

/**
 * Validate subdomain format
 * @param subdomain - The subdomain to validate
 * @returns True if the subdomain format is valid
 */
export function isValidSubdomainFormat(subdomain: string): boolean {
  if (!subdomain) return false;
  
  // Subdomain rules:
  // - 3-63 characters
  // - Lowercase alphanumeric and hyphens only
  // - Cannot start or end with hyphen
  // - Cannot be only numbers
  const subdomainRegex = /^[a-z][a-z0-9-]{1,61}[a-z0-9]$/;
  const onlyNumbers = /^[0-9]+$/;
  
  return subdomainRegex.test(subdomain) && !onlyNumbers.test(subdomain);
}

/**
 * Check if the request is for a subdomain portal
 * @param host - The full hostname
 * @returns True if this is a subdomain request
 */
export function isSubdomainRequest(host: string): boolean {
  return getSubdomain(host) !== null;
}

/**
 * Get the base domain from a hostname
 * @param host - The full hostname
 * @returns The base domain or the original host if no match
 */
export function getBaseDomain(host: string): string {
  const hostname = host.split(':')[0].toLowerCase();
  
  for (const domain of PRODUCTION_DOMAINS) {
    if (hostname.endsWith(domain) || hostname.endsWith(`.${domain}`)) {
      return domain;
    }
  }
  
  for (const local of LOCAL_PATTERNS) {
    if (hostname.includes(local)) {
      return local;
    }
  }
  
  return hostname;
}
