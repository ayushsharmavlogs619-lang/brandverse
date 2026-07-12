export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const hostname = url.hostname

  const parts = hostname.split('.')
  if (parts.length > 2) {
    const subdomain = parts[0]
    
    if (subdomain === 'creators') {
      url.pathname = '/creators' + (url.pathname === '/' ? '' : url.pathname)
      return env.ASSETS.fetch(new Request(url.toString(), request))
    }

    if (subdomain === 'edge') {
      url.pathname = '/workroom' + (url.pathname === '/' ? '' : url.pathname)
      return env.ASSETS.fetch(new Request(url.toString(), request))
    }
  }

  return context.next()
}
