export interface CaseStudy {
    slug: string;
    industry: string;
    title: string;
    subtitle: string;
    problem: string;
    solution: string;
    implementation: string;
    results: string;
    metrics: { label: string; value: string }[];
    timeline: string;
    technology: string[];
    faqs: { q: string; a: string }[];
    illustrative: boolean;
    icon?: string;
    existingLink?: string;
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'electricians',
        industry: 'Electrical Services',
        title: 'AI Receptionist for Electricians',
        subtitle: 'How an electrical contracting company captured 100% of after-hours emergency calls.',
        problem: 'A mid-sized electrical company was losing 40% of inbound calls during after-hours and weekends. Emergency service calls were being missed, and potential customers were leaving voicemails that went unanswered for hours.',
        solution: 'Deployed Brandverse AI receptionist to handle all incoming calls 24/7. The AI was trained on emergency triage, service areas, pricing estimates, and scheduling. It handles call qualification, appointment booking, and emergency dispatch coordination.',
        implementation: 'The implementation took 18 days. The AI was trained on electrical terminology, service categories (residential, commercial, emergency), pricing structures, and service area mapping. It integrates with their existing dispatch system and Google Calendar.',
        results: 'Emergency call capture increased from 60% to 100%. Customer satisfaction scores improved as callers received immediate assistance rather than voicemail. The electrical company reported significant revenue recovery from previously missed after-hours calls.',
        metrics: [
            { label: 'Missed Call Recovery', value: '100%' },
            { label: 'After-Hours Revenue', value: '+45%' },
            { label: 'Response Time', value: '< 5 sec' },
        ],
        timeline: '2.5 weeks',
        technology: ['Voice AI', 'CRM Sync', 'Calendar Integration', 'SMS Follow-up', 'Emergency Triage'],
        faqs: [
            { q: 'Can the AI handle emergency electrical calls?', a: 'Yes. The AI is trained to recognize emergency situations and dispatch immediately, providing callers with safety instructions while routing the nearest available electrician.' },
            { q: 'Does it integrate with dispatch software?', a: 'Yes. The AI integrates with popular dispatch and scheduling platforms to route emergency calls and schedule appointments automatically.' },
        ],
        illustrative: true,
    },
    {
        slug: 'hvac',
        industry: 'HVAC',
        title: 'AI Receptionist for HVAC Companies',
        subtitle: 'How an HVAC company captured peak-season call overflow and increased service bookings.',
        problem: 'An HVAC company experienced 50% call abandonment during peak seasons (summer AC repairs, winter heating emergencies). Their small front desk team could not keep up with the volume, leading to lost revenue and frustrated customers.',
        solution: 'Brandverse AI was deployed as a virtual receptionist to handle overflow calls. The AI manages appointment scheduling, emergency triage, FAQ answering, and lead qualification before transferring complex issues to human staff.',
        implementation: 'Deployed in 16 days. The AI was trained on HVAC-specific knowledge including common problems (AC not cooling, furnace not starting, refrigerant leaks), pricing tiers, service packages, and seasonal promotions.',
        results: 'Call abandonment dropped from 50% to under 5%. The HVAC company captured an additional $18,000 in monthly revenue from calls that previously went unanswered. Customer satisfaction improved with instant response times.',
        metrics: [
            { label: 'Call Abandonment', value: '50% → 5%' },
            { label: 'Monthly Revenue Lift', value: '+$18K' },
            { label: 'Peak Season Capacity', value: 'Unlimited' },
        ],
        timeline: '2 weeks',
        technology: ['Voice AI', 'Overflow Routing', 'Calendar Sync', 'SMS Confirmations', 'CRM Integration'],
        faqs: [
            { q: 'What happens during extreme weather events when call volume spikes?', a: 'The AI scales automatically to handle any call volume. During emergencies like heatwaves or cold snaps, it continues answering every call without hold times.' },
            { q: 'Can it differentiate between emergency and routine calls?', a: 'Yes. The AI is trained to identify urgency based on caller descriptions and prioritizes emergency situations for immediate dispatch.' },
        ],
        illustrative: true,
    },
    {
        slug: 'plumbing',
        industry: 'Plumbing',
        title: 'AI Receptionist for Plumbers',
        subtitle: 'How a plumbing company eliminated missed emergency calls and streamlined dispatch.',
        problem: 'A plumbing company was losing emergency service calls to competitors because they could not answer their phones 24/7. Their voicemail system was causing 6+ hour delays in responding to urgent plumbing emergencies.',
        solution: 'Brandverse AI was deployed as a 24/7 receptionist specifically trained on plumbing emergencies. It handles burst pipe calls, water heater failures, drain emergencies, and routine scheduling with equal expertise.',
        implementation: 'Implementation took 14 days. The AI was trained on plumbing diagnostics, emergency procedures (shut-off valve locations, water damage mitigation tips), service pricing, and dispatch protocols.',
        results: 'Emergency call response improved to under 10 seconds. The plumbing company added 24/7 service capacity without hiring additional staff. Revenue from after-hours calls increased by 60%.',
        metrics: [
            { label: 'Response Time', value: '< 10 sec' },
            { label: 'After-Hours Revenue', value: '+60%' },
            { label: 'Customer Rating', value: '4.9/5' },
        ],
        timeline: '2 weeks',
        technology: ['Voice AI', 'Emergency Triage', 'Dispatch Integration', 'SMS Alerts', 'Customer Portal'],
        faqs: [
            { q: 'How does the AI handle emergency plumbing situations?', a: 'It immediately identifies emergencies (burst pipes, gas leaks, sewage backups), provides caller safety instructions, captures location details, and dispatches the nearest available plumber.' },
            { q: 'Can customers schedule non-emergency plumbing work?', a: 'Yes. The AI handles both emergency and routine scheduling, booking regular maintenance, inspections, and installation appointments during business hours.' },
        ],
        illustrative: true,
    },
    {
        slug: 'roofing',
        industry: 'Roofing',
        title: 'AI Receptionist for Roofing Companies',
        subtitle: 'How a roofing contractor automated lead qualification and estimate scheduling.',
        problem: 'A roofing company was struggling to qualify leads efficiently. Every call required a lengthy conversation to determine project scope, roof size, and urgency — taking up significant staff time and causing delays in estimate scheduling.',
        solution: 'Brandverse AI was deployed to handle initial lead qualification. The AI asks key questions (roof type, damage extent, insurance involvement, property size) and schedules estimate appointments automatically.',
        implementation: 'Completed in 20 days. The AI was trained on roofing terminology (shingle types, flat vs pitched roofs, storm damage assessment), insurance claim processes, and pricing estimation frameworks.',
        results: 'Lead qualification time decreased from 15 minutes to 2 minutes. Estimate show rates improved by 35% because appointments were booked immediately while the customer was on the phone.',
        metrics: [
            { label: 'Lead Qualification', value: '15 min → 2 min' },
            { label: 'Show Rate', value: '+35%' },
            { label: 'Estimate Volume', value: '+50%' },
        ],
        timeline: '3 weeks',
        technology: ['Voice AI', 'Lead Scoring', 'Calendar Sync', 'CRM Integration', 'Estimate Scheduling'],
        faqs: [
            { q: 'Can the AI handle insurance-related roofing questions?', a: 'Yes. It is trained on common insurance claim processes, deductible questions, and can provide guidance on documentation needed for claim filing.' },
            { q: 'Does it work with storm-chasing scenarios?', a: 'Absolutely. During severe weather events, the AI manages high call volumes and prioritizes emergency tarping and storm damage assessments.' },
        ],
        illustrative: true,
    },
    {
        slug: 'dental',
        industry: 'Dental',
        title: 'AI Receptionist for Dental Practices',
        subtitle: 'How a dental clinic reduced no-shows and increased patient bookings.',
        problem: 'A dental practice was experiencing 25% no-show rates and struggling to fill last-minute cancellations. Their front desk was overwhelmed with appointment confirmations, insurance questions, and new patient inquiries.',
        solution: 'Brandverse AI handled appointment scheduling, automated reminders, and cancellation fill-in. The AI also answered common questions about insurance, procedures, and office policies.',
        implementation: 'Deployed in 16 days. The AI was trained on dental procedures (cleanings, fillings, crowns, root canals, orthodontics), insurance plan structures, and patient intake processes.',
        results: 'No-show rates dropped by 60%. The practice filled 80% of last-minute cancellations through automated waitlist calls. Front desk workload decreased by 40%.',
        metrics: [
            { label: 'No-Show Reduction', value: '-60%' },
            { label: 'Cancellation Fill Rate', value: '80%' },
            { label: 'Front Desk Workload', value: '-40%' },
        ],
        timeline: '2 weeks',
        technology: ['Voice AI', 'SMS Reminders', 'Waitlist Automation', 'Insurance FAQ', 'Patient Portal'],
        faqs: [
            { q: 'Can it handle insurance verification questions?', a: 'Yes. The AI is trained on common dental insurance plans and can answer coverage questions, explain deductibles, and check patient eligibility.' },
            { q: 'Does it integrate with practice management software?', a: 'Yes. The AI integrates with major dental practice management platforms for seamless scheduling and patient record updates.' },
        ],
        illustrative: true,
    },
    {
        slug: 'medical',
        industry: 'Medical',
        title: 'AI Receptionist for Medical Clinics',
        subtitle: 'How a multi-specialty clinic reduced patient wait times and front desk burden.',
        problem: 'A medical clinic was losing patients due to long hold times and difficulty scheduling appointments. Front desk staff were overwhelmed with appointment booking, prescription refill requests, and general inquiries.',
        solution: 'Brandverse AI was deployed as a medical receptionist handling appointment scheduling, prescription refill requests, provider referrals, and common medical inquiries with HIPAA-compliant protocols.',
        implementation: 'Implementation took 18 days with HIPAA compliance review. The AI was trained on medical specialties, provider schedules, insurance acceptance, and common patient workflows.',
        results: 'Average hold time dropped from 12 minutes to under 30 seconds. Patient satisfaction scores improved by 40%. Staff could focus on clinical support rather than phone management.',
        metrics: [
            { label: 'Hold Time', value: '12 min → 30 sec' },
            { label: 'Patient Satisfaction', value: '+40%' },
            { label: 'Staff Efficiency', value: '+50%' },
        ],
        timeline: '2.5 weeks',
        technology: ['Voice AI (HIPAA)', 'Schedule Management', 'Prescription Refill', 'Provider Directory', 'Insurance Verification'],
        faqs: [
            { q: 'Is the AI HIPAA compliant?', a: 'Yes. Brandverse AI is configured with HIPAA-compliant data handling, encryption, and access controls suitable for healthcare environments.' },
            { q: 'Can it handle prescription refill requests?', a: 'Yes. The AI captures patient details, medication information, and pharmacy preferences, then routes refill requests to the appropriate provider for approval.' },
        ],
        illustrative: true,
    },
    {
        slug: 'legal',
        industry: 'Legal',
        title: 'AI Receptionist for Law Firms',
        subtitle: 'How a law firm captured more client intake calls and improved after-hours coverage.',
        problem: 'A law firm was missing 35% of potential client calls during off-hours and weekends. Intake calls were being routed to voicemail, and potential clients were calling competitor firms instead.',
        solution: 'Brandverse AI was deployed as a legal intake specialist. The AI qualifies potential clients by practice area, captures case details, schedules consultations, and provides initial information about legal services.',
        implementation: 'Deployed in 22 days. The AI was trained on multiple practice areas (personal injury, family law, criminal defense, estate planning), legal terminology, and intake ethics.',
        results: 'Client intake capture increased to 100% of all calls. The firm reported 30% more initial consultations booked. The AI handled sensitive inquiries with appropriate confidentiality protocols.',
        metrics: [
            { label: 'Call Capture', value: '100%' },
            { label: 'Consultations Booked', value: '+30%' },
            { label: 'After-Hours Coverage', value: '24/7' },
        ],
        timeline: '3 weeks',
        technology: ['Voice AI', 'Intake Automation', 'Practice Area Routing', 'Calendar Sync', 'Secure Data Handling'],
        faqs: [
            { q: 'How does the AI handle attorney-client confidentiality?', a: 'The AI is designed to collect initial intake information without requesting privileged details. It schedules consultations for sensitive discussions with attorneys.' },
            { q: 'Can it handle multiple practice areas?', a: 'Yes. The AI accurately routes callers to the right practice area based on their described legal needs and schedules with the appropriate attorney.' },
        ],
        illustrative: true,
    },
    {
        slug: 'property-management',
        industry: 'Property Management',
        title: 'AI Receptionist for Property Managers',
        subtitle: 'How a property management company automated maintenance requests and tenant communications.',
        problem: 'A property management company was receiving 100+ calls daily — maintenance requests, rent inquiries, lease questions, and prospect calls. Their small team could not keep up, leading to tenant dissatisfaction.',
        solution: 'Brandverse AI was deployed to handle maintenance requests, tenant inquiries, lease renewal questions, and prospect tours. The AI coordinated with maintenance teams and property managers.',
        implementation: 'Completed in 15 days. The AI was trained on property management workflows including maintenance prioritization, lease terms, rent collection, and showing scheduling.',
        results: 'Tenant satisfaction scores increased by 35%. Maintenance requests were triaged and dispatched automatically. The team saved 30+ hours per week on phone management.',
        metrics: [
            { label: 'Tenant Satisfaction', value: '+35%' },
            { label: 'Team Time Saved', value: '30+ hrs/week' },
            { label: 'Response Time', value: '< 1 min' },
        ],
        timeline: '2 weeks',
        technology: ['Voice AI', 'Maintenance Ticketing', 'Tenant Portal', 'Lease Management', 'Tour Scheduling'],
        faqs: [
            { q: 'Can the AI handle emergency maintenance requests?', a: 'Yes. It prioritizes emergencies (water leaks, electrical hazards, lockouts) and dispatches immediately while keeping tenants informed.' },
            { q: 'Can prospects schedule tours through the AI?', a: 'Yes. The AI handles prospect calls, answers questions about available units, and schedules property tours automatically.' },
        ],
        illustrative: true,
    },
    {
        slug: 'restaurants',
        industry: 'Restaurants',
        title: 'AI Receptionist for Restaurants',
        subtitle: 'How a restaurant group eliminated missed reservations and streamlined call management.',
        problem: 'A restaurant group was overwhelmed with phone calls during peak hours — reservations, takeout orders, catering inquiries, and general questions. Hosts could not keep up, leading to lost reservations.',
        solution: 'Brandverse AI was deployed to handle reservation bookings, answer menu questions, provide hours and location information, and manage call volume during peak dining hours.',
        implementation: 'Implementation took 12 days. The AI was trained on menu items, pricing, dietary accommodations, reservation policies, and catering packages.',
        results: 'Reservation capacity increased by 40% during peak hours. Staff could focus on in-person guests rather than phone management. Online reviews mentioning phone issues dropped to near zero.',
        metrics: [
            { label: 'Peak Hour Capacity', value: '+40%' },
            { label: 'Phone Complaints', value: '-90%' },
            { label: 'Reservation Accuracy', value: '99.5%' },
        ],
        timeline: '12 days',
        technology: ['Voice AI', 'Reservation System', 'Menu Knowledge Base', 'Waitlist Management', 'POS Integration'],
        faqs: [
            { q: 'Can it handle large party reservations and special requests?', a: 'Yes. The AI handles parties of any size, dietary restrictions, special occasion notes, and seating preferences.' },
            { q: 'Does it integrate with OpenTable or Resy?', a: 'Yes. The AI integrates with major reservation platforms for seamless booking management.' },
        ],
        illustrative: true,
    },
    {
        slug: 'salons',
        industry: 'Salon & Spa',
        title: 'AI Receptionist for Salons and Spas',
        subtitle: 'How a salon filled last-minute cancellations and increased booking efficiency.',
        problem: 'A salon was losing revenue from last-minute cancellations and no-shows. Staff spent significant time on the phone confirming appointments and managing the booking calendar.',
        solution: 'Brandverse AI was deployed to handle appointment booking, automated confirmations, cancellation fill-in via waitlist, and service inquiries. The AI also managed gift card purchases and special packages.',
        implementation: 'Deployed in 14 days. The AI was trained on all services (hair, nails, skincare, massage), pricing, stylist availability, and service duration estimates.',
        results: 'No-show rate dropped by 55%. Revenue from filled cancellation slots increased by $5,000/month. Staff productivity improved as phone interruptions decreased.',
        metrics: [
            { label: 'No-Show Reduction', value: '-55%' },
            { label: 'Recovered Revenue', value: '+$5K/mo' },
            { label: 'Staff Phone Time', value: '-60%' },
        ],
        timeline: '2 weeks',
        technology: ['Voice AI', 'Booking System', 'Waitlist Automation', 'SMS Reminders', 'Gift Card Processing'],
        faqs: [
            { q: 'Can clients book specific stylists or service providers?', a: 'Yes. The AI checks individual provider availability and schedules with the client preferred stylist or recommends alternatives.' },
            { q: 'How does the cancellation waitlist work?', a: 'When a cancellation occurs, the AI automatically calls or texts waitlisted clients to fill the slot, typically filling 80%+ of cancellations.' },
        ],
        illustrative: true,
    },
    {
        slug: 'auto-repair',
        industry: 'Auto Repair',
        title: 'AI Receptionist for Auto Repair Shops',
        subtitle: 'How an auto repair shop automated service reminders and appointment scheduling.',
        problem: 'An auto repair shop was losing repeat business because they lacked a system for service reminders and follow-ups. Customers would forget scheduled maintenance, and the shop had no way to proactively reach out.',
        solution: 'Brandverse AI was deployed to handle incoming service bookings and proactive outbound appointment reminders. The AI also answered diagnostic questions and provided estimates.',
        implementation: 'Completed in 16 days. The AI was trained on vehicle maintenance schedules, common repairs, diagnostic processes, warranty information, and service pricing.',
        results: 'Service appointment volume increased by 35%. Customer retention improved with automated follow-ups. The shop filled 90% of available service slots.',
        metrics: [
            { label: 'Appointment Volume', value: '+35%' },
            { label: 'Slot Fill Rate', value: '90%' },
            { label: 'Customer Retention', value: '+25%' },
        ],
        timeline: '2 weeks',
        technology: ['Voice AI', 'Service Scheduling', 'Vehicle History', 'SMS Reminders', 'CRM Integration'],
        faqs: [
            { q: 'Can the AI provide repair estimates?', a: 'Yes. It provides estimated price ranges for common repairs based on vehicle make, model, and year, and can schedule diagnostic appointments for accurate quotes.' },
            { q: 'Does it handle warranty and insurance questions?', a: 'Yes. The AI is trained on common warranty terms, extended service plans, and insurance repair processes.' },
        ],
        illustrative: true,
    },
    {
        slug: 'home-services',
        industry: 'Home Services',
        title: 'AI Receptionist for Home Service Businesses',
        subtitle: 'How a multi-trade home services company consolidated call handling across all divisions.',
        problem: 'A home services company offering plumbing, electrical, and HVAC services was managing separate phone lines for each division. Calls were frequently misrouted, and customers had to repeat information when transferred.',
        solution: 'Brandverse AI was deployed as a unified receptionist handling calls for all service divisions. The AI identifies the required service, captures project details, and routes to the appropriate team.',
        implementation: 'Implementation took 20 days. The AI was trained across all three trades with specialized knowledge for each, creating a seamless multi-service experience.',
        results: 'Call misrouting was eliminated. Cross-selling increased by 25% as the AI identified opportunities for additional services. Customer satisfaction improved with single-number simplicity.',
        metrics: [
            { label: 'Call Misrouting', value: 'Eliminated' },
            { label: 'Cross-Sell Revenue', value: '+25%' },
            { label: 'Customer Satisfaction', value: '4.8/5' },
        ],
        timeline: '3 weeks',
        technology: ['Voice AI', 'Multi-Trade Routing', 'Unified CRM', 'Cross-Sell Engine', 'Centralized Dispatch'],
        faqs: [
            { q: 'How does the AI determine which trade is needed?', a: 'It asks targeted questions about the issue (water, electrical, temperature) to identify the correct service division before routing.' },
            { q: 'Can a customer request multiple services in one call?', a: 'Yes. The AI can schedule multiple service appointments across different trades in a single call and coordinate timing.' },
        ],
        illustrative: true,
    },
];
