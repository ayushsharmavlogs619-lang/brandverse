/**
 * Shared subdomain routing rules for Cloudflare Workers and Pages Functions.
 */

export const SUBDOMAIN_ROUTES = {
  creators: '/creators',
  onlyfans: '/onlyfans',
  edge: '/workroom',
  www: '/', // Handle www subdomain correctly by mapping to root
};

/** Paths on edge.brandverse.tech handled by the AI receptionist Worker, not Pages. */
export const EDGE_WORKER_PATH_PREFIXES = ['/api', '/health'];

export const DEFAULT_PAGES_BASE = 'https://production.brandverse.pages.dev';

export function isEdgeWorkerPath(pathname) {
  return EDGE_WORKER_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

/**
 * @param {string} hostname
 * @param {string} pathname
 * @returns {{ rewritePath: string | null, passthrough: boolean }}
 */
export function resolveSubdomainRoute(hostname, pathname) {
  const subdomain = hostname.split('.')[0];
  const basePath = SUBDOMAIN_ROUTES[subdomain];

  if (!basePath) {
    return { rewritePath: null, passthrough: false };
  }

  if (subdomain === 'edge' && isEdgeWorkerPath(pathname)) {
    return { rewritePath: null, passthrough: true };
  }

  if (pathname === '/' || pathname === '') {
    return { rewritePath: basePath, passthrough: false };
  }

  if (pathname.startsWith(basePath)) {
    return { rewritePath: null, passthrough: false };
  }

  return { rewritePath: basePath + pathname, passthrough: false };
}
