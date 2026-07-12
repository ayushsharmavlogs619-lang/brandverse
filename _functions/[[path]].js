export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const hostname = url.hostname

  // Extract subdomain
  const subdomain = hostname.split('.')[0]

  // Subdomain routing
  if (subdomain === 'creators') {
    // Serve creators page
    url.pathname = '/creators'
    return fetch(url.toString())
  }

  if (subdomain === 'edge') {
    // Serve client dashboard
    url.pathname = '/workroom'
    return fetch(url.toString())
  }

  // Default: continue to main site
  return fetch(request)
}
