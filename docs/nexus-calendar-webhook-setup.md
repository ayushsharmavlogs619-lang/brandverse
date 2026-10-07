# Nexus Calendar Webhook Setup

This is the keyless Google Calendar path for Nexus. It avoids the
`iam.disableServiceAccountKeyCreation` organization-policy blocker because
Google Apps Script runs the Calendar operation as the Google account that owns
the script.

## 1. Create the Apps Script

Open Google Apps Script and create a new standalone project.

Copy the contents of:

`docs/nexus-calendar-webhook.gs`

into `Code.gs`.

## 2. Set Script Properties

In Apps Script, open Project Settings -> Script Properties and add:

- `NEXUS_CALENDAR_ID` = the Calendar ID for the private NEXUS CALENDAR
- `NEXUS_CALENDAR_SECRET` = a long random secret shared only with the Worker

Do not put either value in GitHub.

## 3. Authorize Calendar access

In the Apps Script editor, run `doGet` once. Google will ask the script owner
to authorize Calendar access. Approve it.

The script owner must have access to the NEXUS CALENDAR. The calendar does not
need to be public.

## 4. Deploy as a web app

Deploy -> New deployment -> Web app.

Use:

- Execute as: Me
- Who has access: Anyone

Copy the resulting `/exec` URL.

For production, use a versioned web-app deployment rather than a temporary
/dev test deployment.

## 5. Add two Cloudflare Worker secrets

For the production `ai-receptionist-prod` Worker, add:

- `NEXUS_CALENDAR_WEBHOOK_URL` = the Apps Script `/exec` URL
- `NEXUS_CALENDAR_WEBHOOK_SECRET` = the same secret as
  `NEXUS_CALENDAR_SECRET`

No `GOOGLE_CLIENT_EMAIL` or `GOOGLE_PRIVATE_KEY` is required when this path
is configured.

## 6. Test

The Worker will automatically use the Apps Script calendar path for:

- availability reads
- booking creation
- event lookup
- cancellation
- rescheduling

If the webhook variables are absent, the existing service-account path remains
available as a fallback.

The Worker should be redeployed after the code changes. Then test Nexus with a
real appointment time and verify the event appears in NEXUS CALENDAR.
