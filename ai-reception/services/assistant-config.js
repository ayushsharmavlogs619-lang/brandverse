// Assistant Configuration Builder - Builds the Vapi assistant config for the
// demo receptionist: system prompt, tools, server URLs, handoff/callbacks.

// Build the current local time facts (client timezone).
function timeFacts(client, now) {
  const tz = client.timezone || 'UTC';
  const fmt = new Intl.DateTimeFormat('en-AU', {
    timeZone: tz, weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const map = {};
  parts.forEach(p => { map[p.type] = p.value; });
  const day = (map.weekday || '').toLowerCase();
  const hours = (client.working_hours || {})[day] || {};
  const timeStr = `${map.hour}:${map.minute}`;
  const isOpen = hours && hours.start !== 'closed' && timeStr >= hours.start && timeStr <= hours.end;
  return { tz, day, timeStr, isOpen, hours };
}

function formatWorkingHours(wh) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return days
    .map(d => {
      const h = wh[d] || {};
      return `${d}: ${h.start === 'closed' ? 'Closed' : `${h.start} - ${h.end}`}`;
    })
    .join(', ');
}

// System prompt for the demo assistant.
export function buildSystemPrompt(client, env, now = new Date()) {
  const f = timeFacts(client, now);
  const services = Object.entries(client.services || {})
    .map(([name, duration]) => `- ${name} (${duration} min)`)
    .join('\n');
  const faqs = (client.faqs || [])
    .map(faq => `- Q: ${faq.question}\n  A: ${faq.answer}`).join('\n');
  const booking = client.booking_rules || {};
  const handoff = client.human_handoff || {};
  const afterHours = client.after_hours || {};
  const emergency = client.emergency || {};
  const callbacks = client.callback_rules || {};
  const transferConfigured = !!(handoff.transfer_number);
  const escalationConfigured = !!(emergency.escalation_destination);

  const openClose = f.isOpen
    ? `The business is CURRENTLY OPEN in your local time.`
    : `The business is CURRENTLY CLOSED (${f.day}, after ${f.hours.start || 'closing time'}).`;

  return `You are the AI receptionist for ${client.name}.
IMPORTANT CONTEXT: This is an internally-marked DEMO system built by Brandverse, but you must behave exactly as a real business receptionist would. You answer calls on behalf of ${client.name}.

# Business facts (only these - never invent more)
- Business name: ${client.name}
- Description: ${client.business_description || 'Not provided'}
- Address: ${client.address || 'Not provided'}
- Service area: ${client.service_area || 'Not provided'}
- Time zone: ${f.tz}
- Business hours: ${formatWorkingHours(client.working_hours)}
- Current situation: ${openClose} Local day: ${f.day}, local time: ${f.timeStr}.

# Services
${services}
NEVER claim a service that is not on this list. If asked about another service, say you are not sure it is offered and offer to capture the details for the team to confirm.

# Approved FAQ answers (use these word-for-word when asked)
${faqs}

# Booking behaviour
- Only book via the check_availability + book_appointment tools. The booking is only completed when book_appointment returns success TRUE.
- If you cannot reach the scheduling system, or it errors, say: "I wasn't able to access the scheduling system right now. I can take your details and have the team follow up."
- Never say a booking succeeded until the tool confirms it.

## Never invent these
- PRICING: ${client.pricing_info || `Pricing is not published. Never quote prices. Say: "I am not able to give you a price over the phone. You can book a consult and the team will confirm costs for your situation."`}
- Availability (only check_availability can confirm)
- Service areas, policies, warranties, insurance coverage
- Appointment confirmations that did not come from the booking tool
- Emergency response capabilities

Default when you do not know: "I don't want to give you incorrect information. I can take your details and have the team confirm that for you."

# About you
- If asked "Are you a real person?" or "Are you an AI?": admit clearly you are an AI receptionist made by Brandverse, working for ${client.name}.
- Never pretend to be human.

# Human handoff
${transferConfigured
  ? `Human transfer to a human teammate is CONFIGURED. When the caller asks to speak to a person, asks for the dispatcher, is frustrated, or the issue is complex, transfer using the transfer_to_human tool, then tell the caller you are connected (only if tool confirms success).`
  : `Live transfer is NOT configured. When the caller asks to speak to a person or dispatcher: say you will arrange a callback, use request_callback to capture details, and tell the caller the team will call them back. Do NOT pretend to transfer.`}

# Callbacks
To request a callback capture: ${(callbacks.capture || ['name', 'phone', 'reason']).join(', ')}.
Tool to use: request_callback. Only tell the caller the team was notified if the tool response says confirmed=TRUE. Otherwise say the request is being logged.

# After hours
${f.isOpen
  ? `Business is currently open - normal reception. If the caller mentions after-hours needs, say the team is only available during the listed hours and you can capture a callback.`
  : `Business is currently closed. (${afterHours.behaviour === 'clearly_state_closed' ? 'clearly state that the business is currently closed' : afterHours.behaviour}). Follow these rules:
- Determine if the caller is describing an EMERGENCY (danger to life or property). 
- If emergency: follow the emergency protocol below (do NOT just book).
- Otherwise: offer a callback via request_callback, and/or check_availability to book for the next open day.
- Do NOT promise someone will call immediately. Do NOT pretend the dispatcher is on call after hours unless you can report a confirmed transfer.`}

# Emergency protocol
- If a caller describes something urgent or dangerous (fire, smoke, gas, electrical hazard, medical emergency): say clearly: "I'm noting this as an emergency."
- NEVER give technical/electrical/medical instructions you are not allowed to give. If you are in any doubt, tell them that if they are in immediate danger please contact emergency services, and that the business will follow its own procedures.
- ${escalationConfigured
    ? `Escalate via the configured emergency destination. State the call has been escalated only if a tool confirms it.`
    : `Emergency escalation is NOT configured in this environment. Do not claim a dispatcher has been notified. Log the emergency callback as urgency=emergency via request_callback, and tell the caller you have flagged it and the team will review it immediately. NEVER claim immediate dispatch.`}

# Conversation quality
- Be polite, efficient, and calm. Confirm details before booking (spell names, confirm phone numbers). 
- Collect the caller's name and phone number early.
- Do not hang up without a clear outcome: a booking, a callback, or a confirmed transfer.`;

}

// Build the Vapi assistant configuration for a client call.
export function buildAssistantConfig(client, env, now = new Date()) {
  const baseUrl = env.APP_BASE_URL || 'https://edge.brandverse.tech';
  const toolHeaders = env.TOOL_API_KEY ? { 'X-Tool-Key': env.TOOL_API_KEY } : {};
  const serviceNames = Object.keys(client.services || {});
  const handoff = client.human_handoff || {};
  const f = timeFacts(client, now);

  const tools = [];

  if (handoff.transfer_number) {
    tools.push({
      type: 'function',
      function: {
        name: 'transfer_to_human',
        description: 'Transfer the caller to a human teammate. Use when the caller explicitly asks for a person, asks for the dispatcher, is frustrated, or the issue is complex.',
        parameters: { type: 'object', properties: {}, required: [] },
      },
      server: {
        url: `${baseUrl}/api/${client.id}/transfer`,
        method: 'POST',
        headers: toolHeaders,
        // Vapi injects the active call ID via the query parameter template.
        queryParameters: { callId: '{{call.id}}' },
      },
    });
  }

  tools.push(
    {
      type: 'function',
      function: {
        name: 'check_availability',
        description: 'Check available appointment slots for a given date and service. Use BEFORE booking. Date format in business local time.',
        parameters: {
          type: 'object',
          properties: {
            date: { type: 'string', description: 'Date YYYY-MM-DD in business local time' },
            service: { type: 'string', enum: serviceNames },
          },
          required: ['date', 'service'],
        },
      },
      server: { url: `${baseUrl}/api/${client.id}/availability`, method: 'GET', queryParameters: { date: '{{date}}', service: '{{service}}' } },
    },
    {
      type: 'function',
      function: {
        name: 'book_appointment',
        description: 'Book an appointment. Only call after the caller has confirmed an available slot you returned from check_availability.',
        parameters: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
            service: { type: 'string', enum: serviceNames },
            dateTime: { type: 'string', description: 'ISO 8601 date-time in business local time' },
            notes: { type: 'string' },
          },
          required: ['name', 'phone', 'service', 'dateTime'],
        },
      },
      server: { url: `${baseUrl}/api/${client.id}/book`, method: 'POST', headers: toolHeaders, body: { name: '{{name}}', phone: '{{phone}}', email: '{{email}}', service: '{{service}}', dateTime: '{{dateTime}}', notes: '{{notes}}' } },
    },
    {
      type: 'function',
      function: {
        name: 'get_business_hours',
        description: 'Get the exact business hours, services and contact details.',
        parameters: { type: 'object', properties: {}, required: [] },
      },
      server: { url: `${baseUrl}/api/${client.id}/client-config`, method: 'GET' },
    },
    {
      type: 'function',
      function: {
        name: 'request_callback',
        description: 'Capture a callback request: caller name, phone, reason, urgency, optional service and notes. Use when the caller wants to be called by the team, after hours, when a human is requested but transfer is unavailable, or when the booking system errors.',
        parameters: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
            reason: { type: 'string' },
            urgency: { type: 'string', enum: ['normal', 'urgent'] },
            service: { type: 'string', enum: serviceNames },
            notes: { type: 'string' },
          },
          required: ['name', 'phone', 'reason'],
        },
      },
      server: { url: `${baseUrl}/api/${client.id}/callback`, method: 'POST', headers: toolHeaders, body: { name: '{{name}}', phone: '{{phone}}', reason: '{{reason}}', urgency: '{{urgency}}', service: '{{service}}', notes: '{{notes}}' } },
    },
  );

  return {
    assistant: {
      name: `${client.name} Receptionist`,
      model: { provider: 'openai', model: 'gpt-4o-mini', temperature: 0.6, maxTokens: 400 },
      firstMessage: f.isOpen
        ? `Hello, you've reached ${client.name}. This is ${client.name}'s AI receptionist on behalf of Brandverse. How can I help you today?`
        : `Hello, you've reached ${client.name}. Our current business hours are outside service - we're closed right now. I can take a callback or book for the next open day - what is this regarding?`,
      voice: 'jennifer-playht',
      transcriber: { provider: 'deepgram', model: 'nova-2' },
      recordingEnabled: true,
      semanticMemory: { enabled: true },
      analysisPlan: { summaryPlan: { enabled: true }, successEvaluationPlan: { enabled: true } },
      messages: [{ type: 'system-message', message: buildSystemPrompt(client, env, now) }],
      tools,
    },
  };
}