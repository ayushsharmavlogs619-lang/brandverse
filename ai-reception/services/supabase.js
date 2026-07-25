// Supabase REST client for Cloudflare Workers
// Lightweight implementation using fetch - no npm dependency needed

function buildQueryString(filters, selectQuery, orderField, orderAscending, limitCount) {
  const params = new URLSearchParams();
  params.set('select', selectQuery || '*');

  if (orderField) {
    params.set('order', `${orderField}.${orderAscending ? 'asc' : 'desc'}`);
  }

  if (limitCount) {
    params.set('limit', limitCount.toString());
  }

  for (const filter of filters) {
    params.set(filter.field, `${filter.operator}.${filter.value}`);
  }

  return params.toString();
}

function createQueryBuilder(baseUrl, supabaseKey, table) {
  const filters = [];
  let selectQuery = '*';
  let orderField = null;
  let orderAscending = true;
  let limitCount = null;
  let isSingle = false;

  const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
  };

  const executeSelect = async () => {
    const qs = buildQueryString(filters, selectQuery, orderField, orderAscending, limitCount);
    const response = await fetch(`${baseUrl}/${table}?${qs}`, { headers });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(err.message || `Supabase query failed: ${response.status}`);
    }
    const result = await response.json();
    return { data: isSingle ? (result[0] || null) : result, error: null };
  };

  const builder = {
    select(cols) { selectQuery = cols || '*'; return builder; },
    eq(field, value) { filters.push({ field, operator: 'eq', value }); return builder; },
    gte(field, value) { filters.push({ field, operator: 'gte', value: value instanceof Date ? value.toISOString() : value }); return builder; },
    lte(field, value) { filters.push({ field, operator: 'lte', value }); return builder; },
    order(field, opts) { orderField = field; orderAscending = opts?.ascending !== false; return builder; },
    limit(n) { limitCount = n; return builder; },
    single() { isSingle = true; return builder; },

    then(resolve, reject) {
      return executeSelect().then(resolve, reject);
    },

    async insert(data) {
      const response = await fetch(`${baseUrl}/${table}?select=${selectQuery}`, {
        method: 'POST',
        headers: { ...headers, Prefer: 'return=representation' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(err.message || `Supabase insert failed: ${response.status}`);
      }
      const result = await response.json();
      return { data: result, error: null };
    },

    async update(data) {
      const qs = buildQueryString(filters, selectQuery, null, null, null);
      const response = await fetch(`${baseUrl}/${table}?${qs}`, {
        method: 'PATCH',
        headers: { ...headers, Prefer: 'return=representation' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(err.message || `Supabase update failed: ${response.status}`);
      }
      const result = await response.json();
      return { data: isSingle ? (result[0] || null) : result, error: null };
    },
  };

  return builder;
}

export function getSupabaseClient(env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
  }
  const baseUrl = `${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1`;
  return {
    from(table) {
      return createQueryBuilder(baseUrl, env.SUPABASE_SERVICE_KEY, table);
    },
  };
}
