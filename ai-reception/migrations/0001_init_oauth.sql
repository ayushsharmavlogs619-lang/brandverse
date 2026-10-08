-- OAuth credentials for multi-tenant Google Calendar integration
CREATE TABLE IF NOT EXISTS oauth_credentials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id TEXT NOT NULL UNIQUE,
  google_account_id TEXT,
  google_account_email TEXT,
  encrypted_refresh_token TEXT NOT NULL,
  calendar_id TEXT,
  connection_status TEXT DEFAULT 'disconnected' CHECK (connection_status IN ('disconnected', 'connected', 'reconnect_required')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_oauth_client_id ON oauth_credentials(client_id);

-- OAuth state for CSRF protection during OAuth flow
CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  session_token TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_oauth_states_client_id ON oauth_states(client_id);
CREATE INDEX IF NOT EXISTS idx_oauth_states_expires_at ON oauth_states(expires_at);

-- Dashboard sessions for tenant authentication
CREATE TABLE IF NOT EXISTS dashboard_sessions (
  session_token TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_dashboard_sessions_client_id ON dashboard_sessions(client_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_sessions_expires_at ON dashboard_sessions(expires_at);
