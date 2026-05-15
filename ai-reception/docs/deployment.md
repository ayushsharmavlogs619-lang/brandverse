# AI Receptionist Deployment Guide

## Overview
This guide covers deploying the AI Receptionist system to a separate subdomain without affecting the main Brandverse website.

## Architecture
- **Main Site**: `brandverse.tech` (DO NOT TOUCH)
- **AI Receptionist**: `edge.brandverse.tech` (NEW SYSTEM)
- **Backend**: Cloudflare Workers
- **Frontend**: Cloudflare Pages
- **Database**: Google Calendar + Google Sheets

## Prerequisites

### 1. Cloudflare Setup
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

### 2. Environment Variables
Create `wrangler.toml` in the ai-reception directory:

```toml
name = "ai-receptionist"
main = "workers/api.js"
compatibility_date = "2024-01-01"

[env.production]
vars = [
  { name = "CEREBRAS_API_KEY", value = "your-cerebras-key" },
  { name = "OPENAI_API_KEY", value = "your-openai-key" },
  { name = "TWILIO_SID", value = "your-twilio-sid" },
  { name = "TWILIO_AUTH_TOKEN", value = "your-twilio-token" },
  { name = "TWILIO_PHONE_NUMBER", value = "+1234567890" },
  { name = "GOOGLE_CLIENT_EMAIL", value = "your-google-client-email" },
  { name = "GOOGLE_PRIVATE_KEY", value = "your-google-private-key" },
  { name = "GOOGLE_CALENDAR_API_KEY", value = "your-calendar-api-key" },
  { name = "GOOGLE_SHEETS_API_KEY", value = "your-sheets-api-key" },
  { name = "VAPI_API_KEY", value = "your-vapi-key" },
  { name = "APP_BASE_URL", value = "https://edge.brandverse.tech" },
  { name = "APP_SUBDOMAIN", value = "edge.brandverse.tech" },
  { name = "DEFAULT_TIMEZONE", value = "Australia/Melbourne" }
]
```

## Deployment Steps

### 1. Deploy Backend Worker
```bash
cd ai-reception/workers
wrangler deploy --env production
```

### 2. Deploy Frontend Pages
```bash
# Create a new Cloudflare Pages project
# Connect to the ai-reception directory
# Set build output directory: landing-pages
# Set custom domain: edge.brandverse.tech
```

### 3. Configure Subdomain
In Cloudflare DNS:
```
edge.brandverse.tech -> CNAME -> brandverse.pages.dev
```

## Service Setup

### Google Calendar API
1. Go to Google Cloud Console
2. Enable Calendar API
3. Create Service Account
4. Share calendar with service account email
5. Download JSON key file

### Google Sheets API
1. Enable Sheets API
2. Create spreadsheet template
3. Share with service account
4. Note the spreadsheet ID

### Twilio Setup
1. Create Twilio account
2. Purchase phone number
3. Configure voice webhook
4. Set webhook URL: `https://edge.brandverse.tech/api/CLIENT_ID/voice`

### Vapi Setup (Voice AI)
1. Create Vapi account
2. Configure voice agent
3. Set phone number routing
4. Configure webhook endpoints

## Client Configuration

### Add New Client
Update `configs/clients.json`:

```json
{
  "id": "new_client_1",
  "name": "Client Business Name",
  "niche": "dental",
  "timezone": "America/New_York",
  "services": {
    "consultation": 30,
    "cleaning": 45
  },
  "working_hours": {
    "monday": {"start": "09:00", "end": "17:00"}
  },
  "calendar_id": "your-calendar-id",
  "sheet_id": "your-sheet-id",
  "phone_number": "+1234567890",
  "address": "123 Business St"
}
```

## Testing

### 1. Health Check
```bash
curl https://edge.brandverse.tech/health
```

### 2. API Testing
```bash
# Check availability
curl "https://edge.brandverse.tech/api/dental_melbourne_1/availability?date=2024-01-15&service=cleaning"

# Test booking
curl -X POST https://edge.brandverse.tech/api/dental_melbourne_1/book \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","phone":"+1234567890","service":"cleaning","dateTime":"2024-01-15T10:00:00Z"}'
```

### 3. Frontend Testing
Visit: `https://edge.brandverse.tech/dental.html`

## Monitoring

### Logs
```bash
wrangler tail --env production
```

### Analytics
- Google Analytics 4 tracking
- Custom event logging
- Conversion tracking

## Security

### HIPAA Compliance
- All data encrypted in transit
- No PHI stored in logs
- Secure API endpoints
- Regular security audits

### Data Privacy
- GDPR compliant
- Data retention policies
- Secure data handling

## Troubleshooting

### Common Issues

1. **Worker Deployment Fails**
   - Check wrangler.toml configuration
   - Verify environment variables
   - Check Cloudflare account permissions

2. **Google Calendar Integration**
   - Verify service account permissions
   - Check calendar sharing settings
   - Ensure API key is valid

3. **Twilio Voice Issues**
   - Check webhook URL configuration
   - Verify phone number setup
   - Test with Twilio console

4. **Frontend Not Loading**
   - Check Cloudflare Pages build
   - Verify DNS configuration
   - Check SSL certificate

### Debug Mode
Set environment variable:
```
DEBUG=true
```

## Scaling

### Horizontal Scaling
- Workers auto-scale with Cloudflare
- No database bottlenecks
- Geographic distribution

### Vertical Scaling
- Increase rate limits
- Add more phone numbers
- Expand service offerings

## Maintenance

### Regular Tasks
- Update client configurations
- Monitor API usage
- Review security logs
- Update voice scripts

### Backups
- Google Sheets auto-backup
- Configuration version control
- Regular data exports

## Support

### Emergency Contacts
- Technical: ayush@brandverse.tech
- Phone: +91 88510 05278

### Documentation
- API docs: `/docs/api.md`
- Client setup: `/docs/client-setup.md`
- Troubleshooting: `/docs/troubleshooting.md`

## Version History

### v1.0.0 (Current)
- Basic booking system
- Voice AI integration
- Multi-client support
- HIPAA compliance

### Upcoming Features
- Advanced analytics
- Mobile app
- Additional integrations
- AI improvements
