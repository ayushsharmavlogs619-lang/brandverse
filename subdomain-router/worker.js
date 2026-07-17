/**
 * Brandverse Subdomain Router
 * Routes subdomain hosts to the matching Pages path on the main site.
 */

import {
  DEFAULT_PAGES_BASE,
  resolveSubdomainRoute,
} from '../lib/subdomain-routing.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pagesBase = env.PAGES_BASE || DEFAULT_PAGES_BASE;
    const { rewritePath, passthrough } = resolveSubdomainRoute(
      url.hostname,
      url.pathname
    );

    if (passthrough) {
      return fetch(request);
    }

    if (rewritePath) {
      const targetUrl = new URL(pagesBase);
      targetUrl.pathname = rewritePath;
      targetUrl.search = url.search;

      const rewrittenRequest = new Request(targetUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body:
          request.method !== 'GET' && request.method !== 'HEAD'
            ? request.body
            : undefined,
        redirect: 'follow',
      });

      return fetch(rewrittenRequest);
    }

    return fetch(request);
  },
};
