export class RateLimiter {
  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.clients = new Map();
  }

  check(key) {
    const now = Date.now();
    let entry = this.clients.get(key);
    if (!entry || now - entry.windowStart > this.windowMs) {
      entry = { windowStart: now, count: 0 };
      this.clients.set(key, entry);
    }
    entry.count++;
    return {
      allowed: entry.count <= this.maxRequests,
      remaining: Math.max(0, this.maxRequests - entry.count),
      resetMs: this.windowMs - (now - entry.windowStart),
    };
  }
}

export function validateBookingInput(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 1) {
    errors.push('name is required (min 1 char)');
  }
  if (!body.phone || typeof body.phone !== 'string' || !/^[\+]?[0-9\s\-()]{7,20}$/.test(body.phone)) {
    errors.push('phone is required (valid phone number)');
  }
  if (body.email && typeof body.email === 'string' && body.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('email has invalid format');
  }
  if (!body.service || typeof body.service !== 'string') {
    errors.push('service is required');
  }
  if (!body.dateTime || isNaN(new Date(body.dateTime).getTime())) {
    errors.push('dateTime is required (valid ISO date)');
  }
  return errors;
}

export function validateLogInput(body) {
  const errors = [];
  if (body.phone && typeof body.phone === 'string' && !/^[\+]?[0-9\s\-()]{7,20}$/.test(body.phone)) {
    errors.push('phone has invalid format');
  }
  return errors;
}

export function sanitizeStr(val, maxLen = 1000) {
  if (typeof val !== 'string') return '';
  return val.trim().substring(0, maxLen).replace(/[<>&"']/g, '');
}