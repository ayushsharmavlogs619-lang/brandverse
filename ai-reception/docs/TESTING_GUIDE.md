# AI Receptionist Testing Guide
## Simple Step-by-Step Instructions for Non-Technical Users

### 🎯 What You're Testing
You're testing a complete AI receptionist system that can:
- Check real availability from Google Calendar
- Create real bookings in Google Calendar
- Log all interactions to Google Sheets
- Handle multiple businesses (clients)

---

## 📋 BEFORE YOU START - REQUIRED SETUP

### 1. Google Calendar Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable **Google Calendar API**
4. Enable **Google Sheets API**
5. Create a **Service Account**
6. Download the JSON key file
7. Share your Google Calendar with the service account email

### 2. Google Sheets Setup
1. Create a new Google Sheet
2. Name it "AI Receptionist Logs"
3. Share it with the same service account email
4. Copy the Sheet ID from the URL (looks like: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`)

### 3. Update Configuration
Edit the file: `ai-reception/configs/clients.json`
- Replace `calendar_id` with your actual Google Calendar ID
- Replace `sheet_id` with your actual Google Sheets ID
- Update other details as needed

### 4. Set Environment Variables
In Cloudflare Workers dashboard, set these variables:
- `GOOGLE_CLIENT_EMAIL`: Your service account email
- `GOOGLE_PRIVATE_KEY`: Your service account private key
- `GOOGLE_CALENDAR_API_KEY`: Your Google Calendar API key
- `GOOGLE_SHEETS_API_KEY`: Your Google Sheets API key

---

## 🧪 TESTING STEPS

### **Step 1: Test Health Check**
**What this does:** Confirms the system is running
**URL:** `https://edge.brandverse.tech/health`

**How to test:**
1. Open your web browser
2. Go to: `https://edge.brandverse.tech/health`
3. You should see: `{"status":"healthy","timestamp":"...","version":"1.0.0"}`

**✅ Success:** You see "healthy" status
**❌ Failed:** You see an error message

---

### **Step 2: Test Client Configuration**
**What this does:** Checks if your client setup is working
**URL:** `https://edge.brandverse.tech/api/dental_melbourne_1/client-config`

**How to test:**
1. Open your web browser
2. Go to: `https://edge.brandverse.tech/api/dental_melbourne_1/client-config`
3. You should see your client configuration details

**✅ Success:** You see your client details (name, services, working hours)
**❌ Failed:** You see "Client configuration not found"

---

### **Step 3: Test Availability Check**
**What this does:** Tests if the system can read your Google Calendar
**URL:** `https://edge.brandverse.tech/api/dental_melbourne_1/test-availability`

**How to test:**
1. Open your web browser
2. Go to: `https://edge.brandverse.tech/api/dental_melbourne_1/test-availability`
3. The system will check tomorrow's availability for "cleaning" service

**✅ Success:** You see available time slots or a message about no slots
**❌ Failed:** You see an error about Google Calendar authentication

---

### **Step 4: Test Real Booking**
**What this does:** Creates a real appointment in your Google Calendar
**URL:** `https://edge.brandverse.tech/api/dental_melbourne_1/test-book`

**How to test:**
1. Open your web browser
2. Go to: `https://edge.brandverse.tech/api/dental_melbourne_1/test-book`
3. The system will create a test booking for tomorrow

**✅ Success:** You see "Test booking completed" with booking details
**❌ Failed:** You see an error about calendar access or availability

---

### **Step 5: Verify in Google Calendar**
**What this does:** Confirms the booking actually appeared in your calendar

**How to verify:**
1. Open your Google Calendar
2. Look for tomorrow's date
3. You should see an appointment titled "Appointment - cleaning"
4. The appointment should include "Test User" details

**✅ Success:** The appointment appears in your calendar
**❌ Failed:** No appointment appears

---

### **Step 6: Verify in Google Sheets**
**What this does:** Confirms the interaction was logged

**How to verify:**
1. Open your Google Sheet ("AI Receptionist Logs")
2. You should see a new row with:
   - Date and time
   - "Test User" name
   - "test_booking" type
   - Phone number
   - Status (confirmed/failed)

**✅ Success:** New row appears with booking details
**❌ Failed:** No new row appears

---

## 🔧 COMMON PROBLEMS & SOLUTIONS

### **Problem: "Client configuration not found"**
**Solution:** 
- Check if `dental_melbourne_1` exists in your `clients.json` file
- Make sure the worker has been redeployed after changes

### **Problem: Google Calendar authentication error**
**Solution:**
- Verify service account email is correct
- Make sure you shared the calendar with the service account
- Check that the private key is properly formatted (no extra spaces)
- Ensure Google Calendar API is enabled in Google Cloud Console

### **Problem: "No available slots"**
**Solution:**
- Check if your working hours are set correctly in `clients.json`
- Make sure tomorrow isn't a holiday or closed day
- Verify your calendar isn't already full

### **Problem: Booking not appearing in calendar**
**Solution:**
- Check the worker logs for any error messages
- Verify the calendar ID is correct (not the email address)
- Make sure the service account has "Make changes to events" permission

### **Problem: No logs in Google Sheets**
**Solution:**
- Verify the sheet ID is correct
- Make sure the sheet is shared with the service account
- Check that Google Sheets API is enabled

---

## 📱 TESTING WITH REAL API CALLS

If you want to test like a real application, you can use these URLs:

### **Check Real Availability**
Replace the date and service with what you need:
```
https://edge.brandverse.tech/api/dental_melbourne_1/availability?date=2024-01-15&service=cleaning
```

### **Create Real Booking**
Send this JSON data with a POST request:
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "service": "cleaning",
  "dateTime": "2024-01-15T10:00:00Z",
  "notes": "New patient appointment"
}
```

---

## 🎉 SUCCESS CRITERIA

Your AI Receptionist system is working correctly when:

✅ Health check returns "healthy"
✅ Client configuration loads successfully
✅ Availability check returns time slots (or proper "no slots" message)
✅ Test booking creates a real calendar appointment
✅ Test booking appears in your Google Calendar
✅ Test booking is logged in your Google Sheets
✅ All debug logs show in the worker console

---

## 🆘 GETTING HELP

If you're stuck:
1. Check the worker logs in Cloudflare dashboard
2. Verify all environment variables are set correctly
3. Make sure Google APIs are enabled
4. Ensure calendar and sheet are shared with service account
5. Contact support with the specific error message

---

## 📝 NEXT STEPS AFTER TESTING

Once everything works:
1. Update the `clients.json` with real business information
2. Set up real Google Calendar and Sheets for each client
3. Test with real customer data
4. Deploy to production environment
5. Start onboarding real clients!

---

## 🔄 QUICK TEST SUMMARY

| Test | URL | Expected Result |
|------|-----|----------------|
| Health | `/health` | `{"status":"healthy"}` |
| Config | `/api/dental_melbourne_1/client-config` | Client details |
| Availability | `/api/dental_melbourne_1/test-availability` | Time slots or no slots message |
| Booking | `/api/dental_melbourne_1/test-book` | Booking confirmation |
| Calendar | Check Google Calendar | New appointment appears |
| Sheets | Check Google Sheets | New log row appears |

**Follow these steps in order. If any step fails, fix it before continuing to the next step.**
