let counter = 0;

export function createLogger(request, clientId) {
  const id = `req_${++counter}_${Date.now().toString(36)}`;
  const start = Date.now();

  function log(level, event, data) {
    const entry = {
      requestId: id,
      timestamp: new Date().toISOString(),
      level,
      event,
      clientId: clientId || '',
      ...data,
    };
    if (level === 'error') {
      console.error(JSON.stringify(entry));
    } else if (level === 'warn') {
      console.warn(JSON.stringify(entry));
    } else {
      console.log(JSON.stringify(entry));
    }
  }

  return {
    id,
    info: (event, data) => log('info', event, data),
    warn: (event, data) => log('warn', event, data),
    error: (event, data) => log('error', event, data),

    complete(endpoint, success, extra) {
      const ms = Date.now() - start;
      log(success ? 'info' : 'warn', 'request_complete', {
        endpoint,
        durationMs: ms,
        success,
        ...extra,
      });
      return ms;
    },

    child(childClientId) {
      const childId = childClientId || clientId || '';
      const sub = createLogger(request, childId);
      sub.id = id;
      return sub;
    },
  };
}