export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)
  const hostname = url.hostname

  const parts = hostname.split('.')
  if (parts.length > 2) {
    const subdomain = parts[0]
    
    if (subdomain === 'creators') {
      url.pathname = '/creators' + (url.pathname === '/' ? '' : url.pathname)
      return fetch(url.toString())
    }

    if (subdomain === 'edge') {
      url.pathname = '/workroom' + (url.pathname === '/' ? '' : url.pathname)
      return fetch(url.toString())
    }
  }

  return fetch(request)
}
