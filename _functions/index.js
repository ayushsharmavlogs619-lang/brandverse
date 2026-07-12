export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)
  const hostname = url.hostname

  // Extract subdomain (e.g., creators from creators.brandverse.tech)
  const subdomain = hostname.split('.')[0]

  // Subdomain routing
  if (subdomain === 'creators') {
    // Rewrite to creators page
    url.pathname = '/creators' + url.pathname
    return fetch(url.toString())
  }

  if (subdomain === 'edge') {
    // Rewrite to client dashboard
    url.pathname = '/workroom' + url.pathname
    return fetch(url.toString())
  }

  // Default: continue to main site
  return fetch(request)
}
