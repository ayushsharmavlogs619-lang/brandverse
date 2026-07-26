# AI Receptionist MVP — Test Guide

Use this guide to verify the complete call flow end-to-end.

## Prerequisites

| Item | Where to get it |
|---|---|
| Vapi account | [dashboard.vapi.ai](https://dashboard.vapi.ai) — sign up, add billing |
| Vapi API Key | Dashboard → Settings → API Keys |
| Phone number | Buy in Vapi dashboard (Phone Numbers → Buy Number) OR import your Twilio number |
| Vapi assistant | Created via `node scripts/create-vapi-assistant.mjs` (run it with `VAPI_API_KEY` set) |

## Setup Steps

### 1. Configure environment variables

For **local assistant creation** (`.env.local`):
```
VAPI_API_KEY=your_vapi_api_key
```

For **Cloudflare Pages** (dashboard → Settings → Environment variables — set for Production AND Preview):
```
VAPI_WEBHOOK_SECRET=your_vapi_webhook_secret (optional, for signature verification)
FORMSUBMIT_ACTION=https://formsubmit.co/ayush@brandverse.tech (optional override)
```

### 2. Create the Vapi assistant

```bash
VAPI_API_KEY=sk-... node scripts/create-vapi-assistant.mjs
```

This creates an assistant that:
- Answers calls with "Hello, thank you for calling Brandverse..."
- Gathers name, phone number, reason for calling, and appointment request
- Calls `captureLeadInfo` function with the collected data
- Sends webhooks to `https://brandverse.tech/api/vapi/webhook`

Save the returned **Assistant ID**.

### 3. Assign a phone number

**Option A — Vapi-managed number (simplest):**
1. Go to Vapi dashboard → Phone Numbers
2. Click "Buy Number" and select a US number
3. Assign your assistant to it

**Option B — Existing Twilio number:**
1. In Vapi dashboard → Phone Numbers → Import Twilio Number
2. Follow the instructions to link your Twilio account
3. Make sure your Twilio number's Voice webhook URL points to Vapi

## Test the Flow

### Step 1: Verify the webhook is reachable

```bash
curl -X POST https://brandverse.tech/api/vapi/webhook \
  -H "Content-Type: application/json" \
  -d '{"message":{"type":"status-update","call":{"id":"test-123"}}}'
```

Expected response: `{"received":true}`

### Step 2: Make a test call

1. Call the phone number you assigned to the assistant
2. The AI should answer and ask how it can help
3. Say something like: *"Hi, I'm looking for information about your AI receptionist services. My name is John Smith and I run an HVAC business. I want to book a demo."*
4. The AI should gather your name, reason, and appointment interest
5. End the call (hang up)

### Step 3: Verify lead delivery

After the call, check:
1. **Email**: Check ayush@brandverse.tech inbox for a FormSubmit email with subject `[Phone Lead] John Smith - <your number>`
2. **Edge Worker**: Check the edge.brandverse.tech logs if you have access
3. **Cloudflare**: The webhook logs are visible in Cloudflare Pages dashboard → Functions

### What success looks like

```
Caller dials number
  → AI answers ("Hello, thank you for calling Brandverse...")
  → AI asks for name, reason, appointment
  → Caller provides information
  → AI calls captureLeadInfo function
  → Webhook at brandverse.tech/api/vapi/webhook receives the data
  → Lead is emailed to ayush@brandverse.tech
  → Call ends naturally
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Call goes to voicemail | Assistant not assigned to phone number | Check Vapi dashboard → Phone Numbers |
| AI doesn't answer | Vapi webhook not configured | Check assistant's Server settings in Vapi dashboard |
| No email received | FormSubmit not confirmed | First time: submit a test form, check inbox for FormSubmit confirmation link |
| Webhook returns 404 | Pages Function not deployed | Ensure `functions/api/vapi/webhook.js` is deployed with the site |
| "Invalid signature" error | VAPI_WEBHOOK_SECRET mismatch | Set matching secrets in Vapi dashboard and Cloudflare Pages env vars |

## Monitoring

- **Webhook logs**: Cloudflare Pages dashboard → Functions → `api/vapi/webhook`
- **Call logs**: Vapi dashboard → Calls → view transcripts and recordings
- **Email delivery**: Check FormSubmit dashboard or email inbox
