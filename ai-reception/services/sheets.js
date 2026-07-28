import { GoogleAuth } from './google-auth.js';

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

const HEADERS = ['Date', 'Time', 'Client ID', 'Name', 'Phone', 'Email', 'Channel', 'Intent', 'Status', 'Service', 'Requested Time', 'Booked Time', 'Outcome', 'Notes', 'Duration', 'Follow Up Required'];

async function withRetry(fn, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const msg = error.message || '';
      const isTransient = msg.includes('503') || msg.includes('429') || msg.includes('ECONNRESET') || msg.includes('timeout') || msg.includes('network') || msg.includes('ETIMEDOUT');
      if (!isTransient) throw error;
      await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 500));
    }
  }
}

async function fetchWithRetry(url, opts) {
  return withRetry(async () => {
    const r = await fetch(url, opts);
    if (!r.ok && (r.status === 503 || r.status === 429)) {
      throw new Error(`HTTP ${r.status}`);
    }
    return r;
  });
}

export class GoogleSheetsService {
  constructor(env) {
    this.env = env;
    this.auth = new GoogleAuth(env);
    this.baseURL = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  async ensureWorksheet(sheetId, worksheetName = 'Interactions') {
    try {
      const token = await this.auth.getAccessToken(SHEETS_SCOPE);
      const resp = await fetch(`${this.baseURL}/${sheetId}?includeGridData=false`, {
        headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) throw new Error(`Failed to access spreadsheet: ${resp.status}`);
      const sheet = await resp.json();
      const exists = sheet.sheets?.some(s => s.properties.title === worksheetName);
      if (!exists) {
        await this.createWorksheet(sheetId, worksheetName, token);
        await this.setHeaders(sheetId, worksheetName, token);
      } else {
        await this.ensureHeaders(sheetId, worksheetName, token);
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to prepare worksheet: ${error.message}`);
    }
  }

  async createWorksheet(sheetId, name, token) {
    const resp = await fetch(`${this.baseURL}/${sheetId}:batchUpdate`, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title: name, gridProperties: { rowCount: 1000, columnCount: HEADERS.length } } } }] }),
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) throw new Error(`Create worksheet failed: ${resp.status}`);
  }

  async setHeaders(sheetId, name, token) {
    const range = `${name}!A1:${String.fromCharCode(64 + HEADERS.length)}1`;
    const resp = await fetch(`${this.baseURL}/${sheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
      method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [HEADERS] }), signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) throw new Error(`Set headers failed: ${resp.status}`);
  }

  async ensureHeaders(sheetId, name, token) {
    const range = `${name}!A1:${String.fromCharCode(64 + HEADERS.length)}1`;
    const resp = await fetch(`${this.baseURL}/${sheetId}/values/${range}`, {
      headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) throw new Error(`Check headers failed: ${resp.status}`);
    const data = await resp.json();
    if (!data.values?.length) {
      await this.setHeaders(sheetId, name, token);
    }
  }

  async logInteraction(sheetId, data) {
    try {
      await withRetry(() => this.ensureWorksheet(sheetId));
      const token = await this.auth.getAccessToken(SHEETS_SCOPE);

      const row = [
        data.date || new Date().toLocaleDateString(),
        data.time || new Date().toLocaleTimeString(),
        data.clientId || '', data.name || '', data.phone || '', data.email || '',
        data.channel || '', data.intent || '', data.status || '', data.service || '',
        data.requestedTime || '', data.bookedTime || '', data.outcome || '',
        data.notes || '', String(data.duration || ''), data.followUpRequired || 'Yes',
      ];

      const nextRow = await this.nextRow(sheetId, token);
      const range = `Interactions!A${nextRow}:${String.fromCharCode(64 + HEADERS.length)}${nextRow}`;

      const resp = await fetchWithRetry(`${this.baseURL}/${sheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
        method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [row] }), signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) throw new Error(`Log failed: ${resp.status}`);
      return { success: true, row: nextRow };
    } catch (error) {
      return { success: false, error: 'Failed to log interaction', message: error.message };
    }
  }

  async nextRow(sheetId, token) {
    try {
      const resp = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A:A`, {
        headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) return 2;
      const data = await resp.json();
      return (data.values?.length || 0) + 2;
    } catch {
      return 2;
    }
  }

  async getRecentInteractions(sheetId, limit = 50) {
    try {
      const token = await this.auth.getAccessToken(SHEETS_SCOPE);
      const resp = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A2:${String.fromCharCode(64 + HEADERS.length)}${limit + 1}`, {
        headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) return { success: false, error: `Sheets API error: ${resp.status}` };
      const data = await resp.json();
      const keys = HEADERS.map(h => h.toLowerCase().replace(/\s+/g, ''));
      const interactions = (data.values || []).map(row => {
        const obj = {};
        keys.forEach((k, i) => { obj[k] = row[i] || ''; });
        return obj;
      });
      return { success: true, interactions: interactions.reverse() };
    } catch (error) {
      return { success: false, error: 'Failed to get interactions', message: error.message };
    }
  }

  async getInteractionsByDateRange(sheetId, startDate, endDate) {
    try {
      const all = await this.getRecentInteractions(sheetId, 10000);
      if (!all.success) return all;
      const filtered = all.interactions.filter(i => i.date >= startDate && i.date <= endDate);
      return { success: true, interactions: filtered };
    } catch (error) {
      return { success: false, error: 'Failed to filter interactions', message: error.message };
    }
  }

  async updateInteraction(sheetId, rowNumber, updateData) {
    try {
      const token = await this.auth.getAccessToken(SHEETS_SCOPE);
      const range = `Interactions!A${rowNumber}:${String.fromCharCode(64 + HEADERS.length)}${rowNumber}`;
      const cur = await fetch(`${this.baseURL}/${sheetId}/values/${range}`, {
        headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000),
      });
      if (!cur.ok) throw new Error(`Get row failed: ${cur.status}`);
      const curData = await cur.json();
      const row = curData.values?.[0] || [];
      const keys = HEADERS.map(h => h.toLowerCase().replace(/\s+/g, ''));
      keys.forEach((k, i) => {
        if (updateData[k] !== undefined) row[i] = updateData[k];
      });

      const resp = await fetch(`${this.baseURL}/${sheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
        method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [row] }), signal: AbortSignal.timeout(10000),
      });
      if (!resp.ok) throw new Error(`Update failed: ${resp.status}`);
      return { success: true, message: 'Interaction updated' };
    } catch (error) {
      return { success: false, error: 'Failed to update interaction', message: error.message };
    }
  }
}