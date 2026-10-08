# Nexus OAuth Calendar Integration Setup

This document explains how to set up the multi-tenant Google OAuth calendar integration for Nexus AI Receptionist.

## Prerequisites

- Cloudflare Workers account
- Wrangler CLI installed
- Google Cloud Project with OAuth 2.0 credentials

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Navigate to APIs & Services > Library
   - Search for "Google Calendar API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Navigate to APIs & Services > Credentials
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Name: "Nexus AI Receptionist"
   - Authorized redirect URIs:
     - Production: `https://edge.brandverse.tech/api/auth/google/callback`
     - Development: `http://localhost:3000/dashboard/auth/callback`
   - Click "Create"
5. Copy the **Client ID** and **Client Secret**

## Step 2: Create D1 Database

```bash
# Navigate to the ai-reception directory
cd ai-reception

# Create D1 database
wrangler d1 create nexus_oauth

# Copy the database_id from the output
```

## Step 3: Update wrangler.toml

Edit `ai-reception/wrangler.toml` and add the database_id:

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "nexus_oauth"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with actual ID from step 2
```

## Step 4: Run Database Migrations

```bash
# Apply the migration
wrangler d1 migrations apply nexus_oauth --remote --env production
```

## Step 5: Set Cloudflare Worker Secrets

```bash
# Set Google OAuth secrets
wrangler secret put GOOGLE_OAUTH_CLIENT_ID --env production
# Paste your Google OAuth Client ID when prompted

wrangler secret put GOOGLE_OAUTH_CLIENT_SECRET --env production
# Paste your Google OAuth Client Secret when prompted

# Generate and set token encryption key (32+ random characters)
wrangler secret put GOOGLE_TOKEN_ENCRYPTION_KEY --env production
# Generate a secure random key, e.g.: openssl rand -base64 32

# Set OAuth redirect URI (optional, defaults to APP_BASE_URL/dashboard/auth/callback)
wrangler secret put GOOGLE_OAUTH_REDIRECT_URI --env production
# Paste: https://edge.brandverse.tech/api/auth/google/callback
```

## Step 6: Deploy Worker

```bash
# Deploy the updated worker
wrangler deploy --env production
```

## Step 7: Update Client Configuration

For each client that needs Google Calendar integration, update their client config to include a `calendar_id` field. This will be set automatically when they select a calendar in the dashboard.

## Step 8: Test the Integration

1. Navigate to `https://edge.brandverse.tech/dashboard`
2. Enter your Client ID (e.g., `brandverse_demo_1`)
3. Click "Create Session"
4. Click "Connect Google Calendar"
5. Complete the Google OAuth consent flow
6. Select a calendar from the list
7. Verify the connection status shows "Connected"

## Security Notes

- **Never commit secrets to GitHub**
- **Never use NEXT_PUBLIC_ for sensitive values**
- **GOOGLE_TOKEN_ENCRYPTION_KEY must be a cryptographically secure random string**
- **Refresh tokens are encrypted before storage in D1**
- **OAuth state is validated to prevent CSRF attacks**
- **Dashboard sessions are required for calendar operations**

## Troubleshooting

### "GOOGLE_OAUTH_CLIENT_ID not configured"
- Ensure you've set the `GOOGLE_OAUTH_CLIENT_ID` secret
- Run `wrangler secret list --env production` to verify

### "GOOGLE_TOKEN_ENCRYPTION_KEY not configured"
- Generate a secure key: `openssl rand -base64 32`
- Set it as a secret: `wrangler secret put GOOGLE_TOKEN_ENCRYPTION_KEY --env production`

### "D1 database not found"
- Verify the database_id in wrangler.toml matches your actual database
- Ensure you've created the database: `wrangler d1 create nexus_oauth`

### OAuth callback fails
- Verify the redirect URI in Google Console matches your deployment URL
- Check that the redirect URI includes the full path: `/dashboard/auth/callback`

### "Google Calendar needs to be reconnected"
- The refresh token may have been revoked
- User needs to reconnect via the dashboard
- This is normal behavior when Google credentials change

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_OAUTH_CLIENT_ID` | Yes | Google OAuth 2.0 Client ID |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Yes | Google OAuth 2.0 Client Secret |
| `GOOGLE_TOKEN_ENCRYPTION_KEY` | Yes | AES-256 key for encrypting refresh tokens |
| `GOOGLE_OAUTH_REDIRECT_URI` | No | OAuth callback URL (defaults to APP_BASE_URL/dashboard/auth/callback) |

## Database Schema

The migration creates three tables:

### oauth_credentials
Stores encrypted OAuth credentials per client
- `client_id` (unique)
- `google_account_id`
- `google_account_email`
- `encrypted_refresh_token`
- `calendar_id`
- `connection_status`
- `created_at`, `updated_at`

### oauth_states
Stores OAuth state for CSRF protection
- `state` (primary key)
- `client_id`
- `session_token`
- `created_at`
- `expires_at`

### dashboard_sessions
Stores dashboard session tokens for tenant authentication
- `session_token` (primary key)
- `client_id`
- `created_at`
- `expires_at`

## API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/auth/google` | POST | Generate OAuth authorization URL | Session token |
| `/api/auth/google/callback` | GET | Handle OAuth callback | None (state validation) |
| `/api/dashboard/session` | POST | Create dashboard session | None |
| `/api/{clientId}/oauth/status` | GET | Get OAuth connection status | Session token |
| `/api/{clientId}/oauth/calendars` | GET | List available calendars | Session token |
| `/api/{clientId}/oauth/select-calendar` | POST | Select booking calendar | Session token |
| `/api/{clientId}/oauth/disconnect` | POST | Disconnect Google Calendar | Session token |

## Legacy Service Account Support

The system maintains backward compatibility with the existing service-account architecture. If no OAuth credentials are found for a client, the system falls back to the service-account authentication using `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`.

This allows gradual migration of existing clients to OAuth without breaking current integrations.
