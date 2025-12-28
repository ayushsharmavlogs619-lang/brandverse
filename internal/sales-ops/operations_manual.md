# Service Delivery & Operations Manual

## CLIENT ONBOARDING WORKFLOW

### Phase 1: Welcome & Kickoff (Day 1)

**Deliverables:**

- Welcome email with timeline
- Onboarding questionnaire
- Kickoff call scheduled (30 minutes)

**Welcome Email Template:**

```
Subject: Welcome to Brandverse! Here's what happens next

Hi [First Name],

Welcome! We're excited to get your AI voice agent up and running.

Here's what happens over the next 7 days:

✓ Day 1-2: Onboarding questionnaire + kickoff call
✓ Day 3-5: AI training and call flow setup
✓ Day 6: Testing and refinement
✓ Day 7: Go-live + training session

I've attached an onboarding questionnaire — please fill it out by EOD tomorrow.

I'll also send a calendar invite for our kickoff call. We'll discuss your call flows, appointment types, and any specific requirements.

Looking forward to it!

[Your Name]
Brandverse.tech
```

**Onboarding Questionnaire:**

1. Business name and phone number to forward
2. Business hours
3. Appointment types (e.g., new patient exam, consultation, emergency)
4. Average appointment duration
5. Preferred scheduling software (Calendly, Acuity, Google Calendar, etc.)
6. CRM in use (HubSpot, Salesforce, none)
7. Common FAQs (pricing, insurance, services offered)
8. After-hours protocol (escalate emergencies? take messages only?)
9. Conflict-of-interest considerations (law firms only)
10. Owner/manager contact for urgent escalations

---

### Phase 2: Call Flow Design (Day 2-3)

**Kickoff Call Agenda:**

1. Understand business goals (more appointments? better lead qualification?)
2. Map out ideal call flow
3. Define lead qualification criteria
4. Set escalation rules for emergencies
5. Review calendar integration

**Call Flow Template: Dental Clinic**

```
1. Greeting
   "Thank you for calling [Practice Name]. This is [AI Name]. How can I help you today?"

2. Intent Capture
   - New patient? → Capture name, phone, reason for visit
   - Existing patient? → Capture name, DOB, reason for call
   - Emergency? → Escalate immediately to on-call

3. Qualification (New Patients Only)
   - Insurance accepted? (Yes/No based on practice)
   - Preferred appointment time? (Morning/Afternoon/Evening)
   - Urgency? (Routine checkup vs. pain/emergency)

4. Appointment Booking
   - Check calendar availability
   - Offer 2-3 time slots
   - Confirm appointment
   - Send SMS confirmation with date/time/address

5. Closing
   "Perfect! You're all set for [Date/Time]. You'll receive a text confirmation shortly. Is there anything else I can help with today?"
```

**Call Flow Template: Law Firm**

```
1. Greeting
   "Thank you for calling [Law Firm Name]. This is [AI Name]. How can I assist you today?"

2. Practice Area Triage
   "What type of legal matter are you calling about?"
   - Personal injury? Family law? Estate planning? etc.
   - If outside practice area: "We don't handle [X], but I can refer you to [Partner Firm]."

3. Conflict Check
   "Can I get your full name and the name of any other parties involved?"
   [Check against conflict database or ask attorney to review]

4. Urgency Assessment
   - Statute of limitations concern? → Escalate immediately
   - Routine consultation? → Book appointment

5. Consultation Booking
   - Offer 2-3 available consultation slots
   - Confirm date/time
   - Send calendar invite + intake form link

6. Closing
   "You're all set for [Date/Time] with [Attorney Name]. You'll receive a calendar invite and a link to complete our intake form. We'll see you soon!"
```

---

### Phase 3: AI Training & Setup (Day 3-5)

**Technical Setup:**

1. **Phone Number Forwarding**
   - Client forwards main line to Brandverse AI number
   - Test inbound calls

2. **Calendar Integration**
   - Connect to Google Calendar, Calendly, Acuity, or practice management software
   - Set buffer times, working hours, appointment types

3. **CRM Integration**
   - Connect to HubSpot, Salesforce, or custom API
   - Map fields (name, phone, email, appointment type, notes)

4. **AI Voice Training**
   - Upload FAQs and business info
   - Train on common objections (pricing, availability, services)
   - Set tone/personality (professional, friendly, empathetic)

5. **SMS & Email Confirmations**
   - Set up automated confirmations
   - Include business name, date/time, address, cancellation policy

---

### Phase 4: Testing & Refinement (Day 6)

**Internal Testing:**

- Make 10-15 test calls
- Scenarios: new patient, existing patient, emergency, after-hours
- Review AI responses for accuracy

**Client Testing:**

- Have client and team make test calls
- Gather feedback
- Adjust call scripts and flows

**QA Checklist:**

- [ ] AI answers within 3 seconds
- [ ] Greets caller with business name
- [ ] Correctly qualifies leads
- [ ] Books appointments accurately
- [ ] Sends confirmations
- [ ] Escalates emergencies properly
- [ ] Sounds natural and professional

---

### Phase 5: Go-Live & Training (Day 7)

**Go-Live:**

- Switch phone forwarding to AI number
- Monitor first 50 calls closely
- Make real-time adjustments as needed

**Client Training Session (30 minutes):**

1. How to access call logs and transcripts
2. How to review missed/escalated calls
3. How to adjust availability and settings
4. How to pull reports
5. Who to contact for support

**Post-Launch Email:**

```
Subject: You're live! Here's what to expect

Hi [First Name],

You're officially live! Your AI voice agent is now answering calls 24/7.

Here's what to expect:
- Calls are answered in ~3 seconds
- Appointments are booked automatically
- You'll get email notifications for escalations
- Call logs and transcripts are available in your dashboard

I'll check in with you in 7 days to review performance and make any tweaks.

In the meantime, if you have any questions, reply to this email or call me at [Phone].

Congrats on never missing another call!

[Your Name]
Brandverse.tech
```

---

## ONGOING OPERATIONS

### Weekly Check-Ins (First Month)

- Review call volume and answer rate
- Identify any AI errors or missed intents
- Adjust call scripts as needed
- Track appointments booked vs. missed

### Monthly Performance Review

- **Metrics to track:**
  - Total calls received
  - Calls answered by AI
  - Appointments booked
  - Escalations triggered
  - Revenue attributed to AI
  - Client satisfaction score (1-10)

**Monthly Report Template:**

```
Subject: Your monthly AI performance report

Hi [First Name],

Here's how your AI voice agent performed in [Month]:

📞 Calls Answered: [X] (up from [Y] last month)
📅 Appointments Booked: [X]
💰 Estimated Revenue Generated: $[X]
⏱ Average Call Duration: [X] seconds
📈 Answer Rate: [X]% (vs industry avg of 70%)

Top 3 Call Reasons:
1. [Reason 1] - [X]%
2. [Reason 2] - [X]%
3. [Reason 3] - [X]%

Recommended Optimizations:
- [Suggestion 1]
- [Suggestion 2]

Let me know if you'd like to discuss any of this!

Best,
[Your Name]
```

---

## CRM INTEGRATION GUIDE

### HubSpot Integration

1. Connect via Zapier or API
2. Map fields:
   - Contact Name → HubSpot Contact
   - Phone Number → Phone
   - Email → Email
   - Appointment Date/Time → Custom Field
   - Lead Source → "Brandverse AI"
3. Trigger: New call completed → Create/update contact in HubSpot

### Salesforce Integration

1. Connect via API or MuleSoft
2. Create custom Lead object for AI calls
3. Auto-assign leads to sales reps based on territory or practice area

### Google Sheets (For Non-CRM Clients)

1. Log every call to Google Sheets
2. Columns: Timestamp, Caller Name, Phone, Intent, Outcome, Appointment Booked (Y/N), Notes
3. Share sheet with client for manual follow-up

---

## CALL FLOW TEMPLATES BY INDUSTRY

### Med Spa

```
1. Greeting: "Thank you for calling [Med Spa Name]."
2. Intent: "Are you calling to book a treatment, or do you have a question about our services?"
3. Treatment Inquiry: Provide pricing, explain procedure, offer consultation
4. Booking: Offer available times, confirm, send SMS confirmation
5. Upsell: "We also offer [related service]. Would you like to add that to your appointment?"
```

### HVAC/Plumbing (Emergency-Focused)

```
1. Greeting: "Thank you for calling [Company Name]. Is this an emergency?"
2. Emergency Triage:
   - Gas leak / No heat in winter / Burst pipe → Escalate to on-call tech immediately
   - Non-emergency → Book appointment
3. Dispatch: "I'm connecting you to our on-call technician now. Please stay on the line."
4. Non-Emergency Booking: "What day works best for you? Morning or afternoon?"
```

### Real Estate

```
1. Greeting: "Thank you for calling [Agency Name]."
2. Intent: "Are you looking to buy, sell, or rent?"
3. Property Inquiry: "Which property are you interested in?"
4. Qualification: "Have you been pre-approved for a mortgage?" (Buyers only)
5. Showing Booking: "I can schedule a showing for you. What day works best?"
```

---

## REPORTING DASHBOARD (CLIENT-FACING)

**Metrics Displayed:**

- Total calls (last 7 days, last 30 days)
- Answer rate (%)
- Appointments booked
- Revenue generated (estimated)
- Top call reasons
- Busiest call times
- Average call duration

**Sample Dashboard (Airtable or Google Data Studio):**

| Metric | This Month | Last Month | Change |
|--------|------------|------------|--------|
| Calls Received | 450 | 380 | +18% |
| Appointments Booked | 127 | 98 | +30% |
| Revenue (Est.) | $63,500 | $49,000 | +30% |
| Answer Rate | 96% | 71% | +35% |

---

## SUPPORT & ESCALATION

### Tier 1: Self-Service

- Client accesses dashboard
- Reviews call logs
- Adjusts availability

### Tier 2: Email Support (4-hour response)

- Client emails <support@brandverse.tech>
- Questions about call flows, integrations, billing

### Tier 3: Priority Support (1-hour response, Domination tier only)

- Dedicated Slack channel or phone line
- Technical issues, urgent script changes

---

## SCALING OPERATIONS: ONE OPERATOR, MANY CLIENTS

**Systems to Scale:**

1. **Standardized Onboarding:** Use templates for every step
2. **Automated Reporting:** Monthly reports generated via Zapier/scripts
3. **Client Self-Service:** Dashboard access reduces support load
4. **Batch Check-Ins:** Review 10 clients/day (30 minutes each)
5. **Async Communication:** Use Loom videos for training instead of live calls

**Capacity per Operator:**

- 1 operator can manage **50-75 active clients** at steady state
- 1 operator can onboard **10 new clients/month**

**When to Hire:**

- Client count > 50
- Support response time > 8 hours
- Onboarding backlog > 2 weeks

---

## RETENTION PLAYBOOK

### Red Flags (Churn Risk)

- Client hasn't logged into dashboard in 30 days
- Call volume dropped significantly (business issue?)
- Support tickets increasing

### Retention Actions

1. **Proactive check-in:** "Hey [First Name], I noticed your call volume dropped. Everything okay?"
2. **Feature upsell:** "Have you tried our outbound calling feature for re-engagement?"
3. **ROI reminder:** "Just a reminder: you've booked 127 appointments this month — that's $63K in revenue. Not bad!"

### Win-Back Campaign (If they cancel)

- Wait 60 days
- Send case study of similar client success
- Offer 1-month free trial to come back

---

**OPERATIONS GOAL:** Deliver consistent, predictable results so clients never want to leave.
