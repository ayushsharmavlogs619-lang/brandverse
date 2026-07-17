import { resolveSubdomainRoute } from '../lib/subdomain-routing.js';

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const { rewritePath, passthrough } = resolveSubdomainRoute(
    url.hostname,
    url.pathname
  );

  if (passthrough) {
    return fetch(request);
  }

  if (rewritePath) {
    url.pathname = rewritePath;
    return fetch(url.toString());
  }

  return fetch(request);
}
