# AI Receptionist REAL SYSTEM Testing Guide
## STRICT REAL-WORLD TESTING - NO MOCK DATA

### 🚨 IMPORTANT: THIS SYSTEM REQUIRES REAL GOOGLE INTEGRATION

This is a **REAL** AI receptionist system that:
- Creates **actual** Google Calendar events
- Logs to **real** Google Sheets
- Uses **real** authentication
- **NO FAKE DATA OR MOCK RESPONSES**

---

## 📋 REQUIRED SETUP (NON-NEGOTIABLE)

### 1. Google Cloud Project Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select your project
3. Enable **Google Calendar API**
4. Enable **Google Sheets API**
5. Create **Service Account** with JSON key
6. Download the JSON key file

### 2. Google Calendar Setup
1. Create a new Google Calendar for testing
2. Get the Calendar ID (from Settings → Integrate calendar)
3. Share the calendar with your service account email
4. Give service account "Make changes to events" permission

### 3. Google Sheets Setup
1. Create new Google Sheet
2. Name it "AI Receptionist Test Logs"
3. Share with service account email
4. Get Sheet ID from URL (the long string between `/d/` and `/edit`)

### 4. Update Client Configuration
Edit: `ai-reception/configs/clients.json`

```json
{
  "calendar_id": "YOUR_REAL_CALENDAR_ID@group.calendar.google.com",
  "sheet_id": "YOUR_REAL_SHEET_ID_HERE",
  "timezone": "Australia/Melbourne"
}
```

### 5. Set Environment Variables
In Cloudflare Workers dashboard, set these EXACT values:

```
GOOGLE_CLIENT_EMAIL = your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
[Your actual private key here - include all newlines]
-----END PRIVATE KEY-----
GOOGLE_CALENDAR_API_KEY = your-calendar-api-key
GOOGLE_SHEETS_API_KEY = your-sheets-api-key
```

---

## 🧪 REAL SYSTEM TESTING

### **Test 1: Health Check**
**Purpose:** Verify system is running
**URL:** `https://edge.brandverse.tech/health`

**Expected:**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-05T15:30:00.000Z",
  "version": "1.0.0"
}
```

**❌ If fails:** Worker not deployed or crashed

---

### **Test 2: Client Configuration**
**Purpose:** Verify client config loads
**URL:** `https://edge.brandverse.tech/api/dental_melbourne_1/client-config`

**Expected:** Your client configuration with real calendar_id and sheet_id

**❌ If error:** Check client config file and redeploy

---

### **Test 3: REAL Availability Check**
**Purpose:** Test REAL Google Calendar integration
**URL:** `https://edge.brandverse.tech/api/dental_melbourne_1/test-availability`

**Expected Success:**
```json
{
  "message": "REAL availability test - using Google Calendar",
  "clientId": "dental_melbourne_1",
  "date": "2026-05-06",
  "service": "cleaning",
  "result": {
    "availableSlots": [
      {
        "start": "2026-05-06T09:00:00.000Z",
        "end": "2026-05-06T09:30:00.000Z",
        "duration": 30,
        "available": true
      }
    ],
    "totalEvents": 0
  }
}
```

**❌ Expected Errors:**
- `"Missing required config: calendar_id"` → You forgot to set calendar_id
- `"Calendar integration required"` → calendar_id is empty
- `"Google Calendar API error: 403"` → Service account doesn't have permission
- `"Google Calendar API error: 404"` → Calendar ID doesn't exist

---

### **Test 4: REAL Booking Creation**
**Purpose:** Create ACTUAL Google Calendar event
**URL:** `https://edge.brandverse.tech/api/dental_melbourne_1/test-book`

**Expected Success:**
```json
{
  "message": "REAL test booking completed - created actual Google Calendar event",
  "bookingData": {
    "name": "REAL Test User",
    "service": "cleaning",
    "dateTime": "2026-05-06T10:00:00.000Z"
  },
  "result": {
    "success": true,
    "eventId": "actual-google-event-id",
    "eventLink": "https://calendar.google.com/calendar/event?eid=..."
  },
  "calendarEventCreated": true,
  "googleSheetsLogged": true
}
```

**❌ Expected Errors:**
- `"Calendar integration required"` → calendar_id empty
- `"Google Calendar API error: 403"` → No calendar write permission
- `"Failed to create calendar event"` → Invalid time slot or calendar full

---

## 🔍 VERIFICATION STEPS (CRITICAL)

### After Test 3 (Availability):
1. Check your Google Calendar
2. Verify you can see the calendar events
3. Confirm working hours are respected

### After Test 4 (Booking):
1. **Check Google Calendar:**
   - Open your test calendar
   - Look for "Appointment - cleaning" event
   - Verify it's at the correct time
   - Check that "REAL Test User" is in the event

2. **Check Google Sheets:**
   - Open your test spreadsheet
   - Look for new row with:
     - Date: 2026-05-06
     - Time: 10:00
     - Name: REAL Test User
     - Phone: +1234567890
     - Intent: real_test_booking
     - Status: confirmed

---

## 🚨 COMMON ERRORS & SOLUTIONS

### **Error: "Missing required config: calendar_id"**
**Solution:** Edit `clients.json` and add real calendar ID

### **Error: "Missing required config: sheet_id"**
**Solution:** Edit `clients.json` and add real sheet ID

### **Error: "Google Calendar API error: 403"**
**Solution:**
1. Share calendar with service account email
2. Give "Make changes to events" permission
3. Check service account has Calendar API enabled

### **Error: "Google Calendar API error: 404"**
**Solution:** Calendar ID is incorrect or doesn't exist

### **Error: "Google token exchange failed"**
**Solution:**
1. Check GOOGLE_CLIENT_EMAIL is correct
2. Verify GOOGLE_PRIVATE_KEY format (include newlines)
3. Ensure service account is active

### **Error: "No available slots"**
**Solution:**
1. Check working hours in client config
2. Verify calendar isn't full
3. Check if date is weekend/holiday

---

## 📱 TESTING WITH REAL API CALLS

### **Check Real Availability:**
```
GET https://edge.brandverse.tech/api/dental_melbourne_1/availability?date=2026-05-06&service=cleaning
```

### **Create Real Booking:**
```
POST https://edge.brandverse.tech/api/dental_melbourne_1/book
{
  "name": "John Smith",
  "phone": "+61412345678",
  "email": "john@example.com",
  "service": "cleaning",
  "dateTime": "2026-05-06T10:00:00Z",
  "notes": "Real customer booking"
}
```

---

## ✅ SUCCESS CRITERIA

Your REAL AI Receptionist is working when:

✅ Health check returns "healthy"
✅ Client config loads with real calendar_id and sheet_id
✅ Availability check returns REAL time slots from Google Calendar
✅ Test booking creates ACTUAL calendar event
✅ Calendar event appears in your Google Calendar
✅ Booking is logged to your Google Sheets
✅ All debug logs show in worker console

---

## 🆘 GETTING HELP

If stuck:
1. Check Cloudflare Worker logs for debug output
2. Verify all environment variables are set
3. Ensure Google APIs are enabled
4. Confirm calendar and sheet are shared with service account
5. Check that calendar_id and sheet_id are real values

---

## 🔄 FINAL VERIFICATION CHECKLIST

| Test | URL | Expected Result |
|------|-----|-----------------|
| Health | `/health` | `{"status":"healthy"}` |
| Config | `/api/dental_melbourne_1/client-config` | Real calendar_id and sheet_id |
| Availability | `/api/dental_melbourne_1/test-availability` | Real slots from calendar |
| Booking | `/api/dental_melbourne_1/test-book` | Real calendar event created |
| Calendar | Check Google Calendar | Event appears |
| Sheets | Check Google Sheets | Row logged |

---

## 🚨 FINAL WARNING

**This system creates REAL calendar events and logs REAL data.**
- Test bookings will appear in your actual calendar
- All interactions are logged to your actual spreadsheet
- There is NO mock data or fake responses
- If calendar_id or sheet_id are missing, the system will ERROR (not fake success)

**This is intentional - this is a production-ready AI receptionist system.**

---

## 🎯 NEXT STEPS AFTER SUCCESS

Once all tests pass:
1. Update client configs with real business information
2. Set up production Google Calendar and Sheets
3. Test with real customer scenarios
4. Deploy to production environment
5. Start onboarding real clients!

**Your AI Receptionist is now REAL and ready for production use!** 🚀
