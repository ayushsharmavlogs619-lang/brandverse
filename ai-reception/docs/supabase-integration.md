# Supabase Integration Documentation

## Overview

Brandverse AI Receptionist now integrates with Supabase as the primary persistent data layer. This provides enterprise-grade data storage, scalability, and future dashboard capabilities.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BRANDVERSE.TECH                          │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Cloudflare Pages)                                │
│  └── React + Next.js                                      │
├─────────────────────────────────────────────────────────────┤
│  Backend (Cloudflare Workers)                               │
│  └── edge.brandverse.tech                                   │
│      ├── /api/:clientId/leads (GET, POST)                   │
│      ├── /api/:clientId/call-logs (GET, POST)               │
│      ├── /api/:clientId/bookings (GET, POST)                │
│      ├── /api/:clientId/analytics (GET)                     │
│      └── /api/:clientId/test-db (GET)                       │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (Supabase)                                      │
│  └── PostgreSQL Database                                    │
│      ├── clients table                                      │
│      ├── leads table                                        │
│      ├── call_logs table                                    │
│      ├── bookings table                                     │
│      └── automation_events table                            │
└─────────────────────────────────────────────────────────────┘
```

## Environment Variables

### Required Variables

Add these to your `wrangler.toml` or via `wrangler secret`:

```toml
[env.production.vars]
SUPABASE_URL = "https://ewqbqrelnjpauqablnvt.supabase.co"

# Set via wrangler secret (DO NOT commit to git)
# wrangler secret put SUPABASE_SERVICE_KEY --env production
```

### Secret Setup

```bash
# For production
wrangler secret put SUPABASE_SERVICE_KEY --env production
# Enter your Supabase service role key

# For staging
wrangler secret put SUPABASE_SERVICE_KEY --env staging
# Enter your Supabase service role key
```

## Database Schema

### Tables

#### 1. clients
Stores business/client information

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| business_name | TEXT | Business name |
| industry | TEXT | Industry category |
| contact_name | TEXT | Primary contact |
| contact_email | TEXT | Contact email |
| contact_phone | TEXT | Contact phone |
| subscription_status | TEXT | active, suspended, cancelled |
| plan_type | TEXT | starter, professional, enterprise |
| ai_minutes_used | INTEGER | Usage tracking |
| ai_minutes_limit | INTEGER | Plan limit |
| worker_routes | JSONB | Worker configuration |
| branding_settings | JSONB | Custom branding |
| automation_settings | JSONB | Automation rules |

#### 2. leads
Stores potential customer inquiries

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| client_id | UUID | FK to clients |
| customer_name | TEXT | Lead name |
| phone_number | TEXT | Phone (required) |
| email | TEXT | Email address |
| business_name | TEXT | Business name |
| service_requested | TEXT | Service type |
| lead_source | TEXT | Source: api, ai_receptionist, manual |
| lead_status | TEXT | new, contacted, qualified, converted, lost |
| urgency | TEXT | low, medium, high, critical |
| notes | TEXT | Notes |
| ai_summary | TEXT | AI-generated summary |
| assigned_to | TEXT | Assigned agent |
| follow_up_required | BOOLEAN | Needs follow-up |
| follow_up_date | TIMESTAMP | Follow-up date |
| metadata | JSONB | Extra data |

#### 3. call_logs
Stores AI receptionist call records

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| client_id | UUID | FK to clients |
| caller_number | TEXT | Caller phone (required) |
| transcript | TEXT | Call transcript |
| ai_response | TEXT | AI responses |
| duration_seconds | INTEGER | Call length |
| sentiment | TEXT | positive, neutral, negative |
| call_outcome | TEXT | completed, missed, voicemail, etc. |
| recording_url | TEXT | Recording link |
| escalation_required | BOOLEAN | Escalated flag |
| lead_created | BOOLEAN | Lead generated |
| metadata | JSONB | Extra data |

#### 4. bookings
Stores appointment bookings

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| client_id | UUID | FK to clients |
| customer_name | TEXT | Customer name |
| phone_number | TEXT | Phone (required) |
| service_type | TEXT | Service booked |
| appointment_date | DATE | Date (required) |
| appointment_time | TIME | Time slot |
| booking_status | TEXT | pending, confirmed, completed, cancelled |
| notes | TEXT | Notes |
| calendar_event_id | TEXT | Calendar integration ID |
| reminder_sent | BOOLEAN | Reminder status |

#### 5. automation_events
Stores automation workflow events

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| client_id | UUID | FK to clients |
| event_type | TEXT | Event type |
| event_payload | JSONB | Event data |
| automation_status | TEXT | pending, processing, completed, failed |
| execution_result | JSONB | Result data |
| retry_count | INTEGER | Retry attempts |
| processed_at | TIMESTAMP | Processing time |

## API Endpoints

### Test Database Connection
```
GET /api/:clientId/test-db
```
Tests Supabase connectivity.

**Response:**
```json
{
  "message": "Supabase database connection successful",
  "status": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "testResult": true
}
```

### Leads

#### Get Leads
```
GET /api/:clientId/leads?status=new&limit=50&orderBy=created_at
```

**Query Parameters:**
- `status` (optional): Filter by status
- `limit` (optional): Max results (default: 50)
- `orderBy` (optional): Sort field
- `ascending` (optional): true/false

**Response:**
```json
{
  "success": true,
  "clientId": "client-slug",
  "leads": [...],
  "count": 10
}
```

#### Create Lead
```
POST /api/:clientId/leads
```

**Request Body:**
```json
{
  "customerName": "John Doe",
  "phoneNumber": "+1234567890",
  "email": "john@example.com",
  "businessName": "Acme Corp",
  "serviceRequested": "HVAC Repair",
  "leadSource": "ai_receptionist",
  "leadStatus": "new",
  "urgency": "high",
  "notes": "Called about emergency repair",
  "aiSummary": "Customer needs urgent AC repair",
  "assignedTo": "agent@brandverse.tech",
  "followUpRequired": true,
  "followUpDate": "2024-01-02T10:00:00Z",
  "metadata": { "campaign": "google-ads" }
}
```

**Required Fields:** `phoneNumber`

### Call Logs

#### Get Call Logs
```
GET /api/:clientId/call-logs?limit=50
```

**Response:**
```json
{
  "success": true,
  "clientId": "client-slug",
  "callLogs": [...],
  "count": 25
}
```

#### Create Call Log
```
POST /api/:clientId/call-logs
```

**Request Body:**
```json
{
  "callerNumber": "+1234567890",
  "transcript": "Hello, I need help with...",
  "aiResponse": "I can help you with that...",
  "durationSeconds": 120,
  "sentiment": "positive",
  "callOutcome": "booked",
  "recordingUrl": "https://...",
  "escalationRequired": false,
  "leadCreated": true,
  "metadata": { "agent": "Nexus" }
}
```

**Required Fields:** `callerNumber`

### Bookings

#### Get Bookings
```
GET /api/:clientId/bookings?status=pending&fromDate=2024-01-01&toDate=2024-01-31
```

**Query Parameters:**
- `status` (optional): Filter by status
- `fromDate` (optional): Start date
- `toDate` (optional): End date
- `limit` (optional): Max results

**Response:**
```json
{
  "success": true,
  "clientId": "client-slug",
  "bookings": [...],
  "count": 15
}
```

#### Create Booking
```
POST /api/:clientId/bookings
```

**Request Body:**
```json
{
  "customerName": "Jane Smith",
  "phoneNumber": "+1234567890",
  "serviceType": "AC Repair",
  "appointmentDate": "2024-01-15",
  "appointmentTime": "14:00:00",
  "bookingStatus": "confirmed",
  "notes": "Customer requested afternoon slot",
  "calendarEventId": "google-calendar-id-123",
  "reminderSent": false
}
```

**Required Fields:** `phoneNumber`, `appointmentDate`

### Analytics

#### Get Analytics
```
GET /api/:clientId/analytics?days=30
```

**Query Parameters:**
- `days` (optional): Time range (default: 30)

**Response:**
```json
{
  "success": true,
  "clientId": "client-slug",
  "days": 30,
  "analytics": {
    "totalCalls": 150,
    "totalLeads": 45,
    "totalBookings": 23,
    "callsByOutcome": {
      "completed": 120,
      "booked": 20,
      "voicemail": 10
    },
    "leadsByStatus": {
      "new": 15,
      "contacted": 20,
      "converted": 10
    },
    "bookingsByStatus": {
      "confirmed": 20,
      "completed": 3
    }
  }
}
```

## Setup Instructions

### 1. Run Database Schema

1. Go to Supabase Dashboard: https://ewqbqrelnjpauqablnvt.supabase.co
2. Open SQL Editor
3. Copy contents from `/docs/supabase-schema.sql`
4. Run the SQL

### 2. Set Environment Variables

```bash
# Add to wrangler.toml (public variables)
SUPABASE_URL = "https://ewqbqrelnjpauqablnvt.supabase.co"

# Set secrets (DO NOT commit these)
wrangler secret put SUPABASE_SERVICE_KEY --env production
```

### 3. Deploy Worker

```bash
# Deploy with Supabase integration
wrangler deploy --env production

# Test connection
curl https://edge.brandverse.tech/api/test-client/test-db
```

### 4. Verify Integration

```bash
# Create a test lead
curl -X POST https://edge.brandverse.tech/api/test-client/leads \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890", "customerName": "Test Lead"}'

# Get leads
curl https://edge.brandverse.tech/api/test-client/leads

# Get analytics
curl https://edge.brandverse.tech/api/test-client/analytics?days=7
```

## Security

### Row Level Security (RLS)

All tables have RLS enabled. Currently using service key for backend operations.

### Future RBAC

For future client dashboards, implement:
```sql
-- Example policy for client data access
CREATE POLICY "Clients can only access their own data" ON leads
  FOR ALL
  USING (client_id = current_setting('app.current_client_id')::uuid);
```

### API Validation

- All inputs validated before database operations
- Required fields enforced
- Malformed payloads rejected with 400
- Database errors caught and logged

## Error Handling

### Common Errors

**503 - Service Unavailable**
```json
{
  "error": "Database service unavailable"
}
```
Cause: SUPABASE_SERVICE_KEY not set or invalid

**400 - Validation Failed**
```json
{
  "error": "Validation failed",
  "message": "phoneNumber is required"
}
```
Cause: Missing required fields

**500 - Database Error**
```json
{
  "error": "Failed to create lead",
  "message": "constraint violation..."
}
```
Cause: Database constraint violation or connection issue

## Future Roadmap

### Phase 2: Client Dashboards
- JWT authentication for client portals
- Real-time data with Supabase subscriptions
- Custom analytics views

### Phase 3: SaaS Scaling
- Multi-tenant architecture
- Billing integration
- Usage tracking
- Plan management

### Phase 4: Advanced Features
- AI-powered insights
- Automated workflows
- CRM integrations
- WhatsApp automation

## Support

For issues or questions:
1. Check logs in Cloudflare Workers dashboard
2. Verify Supabase connection: `/api/:clientId/test-db`
3. Review database schema: `/docs/supabase-schema.sql`
4. Check environment variables in wrangler.toml
