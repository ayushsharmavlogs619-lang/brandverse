#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_CONTENT = path.join(ROOT, 'lib/blog-content.ts');

let content = fs.readFileSync(BLOG_CONTENT, 'utf8');

const firstSlug = "'optometrist-ai-appointment-scheduling'";
const blockStart = content.indexOf(firstSlug + ':', 93);
const objectClose = content.indexOf('};\n\nfunction defaultArticleBody', blockStart);

if (blockStart === -1) throw new Error('No start');
if (objectClose === -1) throw new Error('No end');

const industryList = [
  { name:'Optometry and Eye Care', lc:'optometry and eye care' },
  { name:'Physical Therapy', lc:'physical therapy' },
  { name:'Massage Therapy', lc:'massage therapy' },
  { name:'Cannabis Dispensary', lc:'cannabis dispensary' },
  { name:'Car Wash', lc:'car wash' },
  { name:'Tutoring', lc:'tutoring' },
  { name:'Dance Studio', lc:'dance studio' },
  { name:'Martial Arts School', lc:'martial arts school' },
  { name:'Yoga Studio', lc:'yoga studio' },
  { name:'Photography', lc:'photography' },
  { name:'Event Planning', lc:'event planning' },
  { name:'Catering', lc:'catering' },
  { name:'Cleaning Services', lc:'cleaning services' },
  { name:'Moving Services', lc:'moving services' },
  { name:'Locksmith', lc:'locksmith' },
  { name:'Electrical Contractor', lc:'electrical contractor' },
  { name:'Painting Contractor', lc:'painting contractor' },
  { name:'Tree Service', lc:'tree service' },
  { name:'Pool Maintenance', lc:'pool maintenance' },
  { name:'Dry Cleaning', lc:'dry cleaning' },
];

const oldOverrides = content.slice(blockStart, objectClose);
const excerptRegex = /<p class="text-slate-400 leading-8 text-lg">([^<]+?)<\/p>\s*\n\s*<p class="text-slate-400 leading-8 text-lg">In the /g;
const excerpts = [...oldOverrides.matchAll(excerptRegex)].map(m => m[1]);

const slugs = [
  'optometrist-ai-appointment-scheduling','physical-therapy-ai-patient-intake','massage-therapy-ai-booking',
  'dispensary-ai-customer-service','car-wash-ai-customer-communication','tutoring-center-ai-student-intake',
  'dance-studio-ai-class-booking','martial-arts-ai-student-retention','yoga-studio-ai-member-engagement',
  'photography-ai-client-booking','event-planner-ai-client-intake','catering-ai-event-coordination',
  'cleaning-service-ai-estimate-scheduling','moving-company-ai-customer-intake','locksmith-ai-dispatch-calls',
  'electrician-ai-customer-calls','painting-contractor-ai-lead-generation','tree-service-ai-phone-answering',
  'pool-maintenance-ai-customer-scheduling','dry-cleaning-ai-order-management',
];

function build(slug, ind, excerpt) {
  return `  '${slug}': \`
    <section class="space-y-6">
      <p class="text-slate-400 leading-8 text-lg">${excerpt}</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">The Hidden Cost of Missed Calls in ${ind.name}</h2>
      <p class="text-slate-400 leading-8 text-lg">Every missed phone call in the ${ind.lc} industry is more than an annoyance — it is a direct hit to your bottom line. When potential customers call and reach voicemail, they do not leave a message. They hang up and dial your competitor. Businesses in this space lose 30-50% of inbound leads simply because nobody answers the phone.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">The Revenue Drain You May Be Overlooking</h3>
      <p class="text-slate-400 leading-8 text-lg">The average ${ind.lc} business loses 20-40% of inbound calls. For a business receiving 100 calls per month with an average job value of \$500, that is \$10,000-\$20,000 in monthly revenue walking out the door — every single month. Over a year, that is \$120,000-\$240,000 in lost revenue.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Why Response Speed Is Everything</h3>
      <p class="text-slate-400 leading-8 text-lg">In 2026, consumers expect instant responses. Studies show that calling a business back within 5 minutes increases conversion rates by over 80%. If you do not answer, they assume you are too busy or simply do not care. Either way, they move to the next business on Google.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">How AI Voice Agents Solve This for ${ind.name} Businesses</h2>
      <p class="text-slate-400 leading-8 text-lg">AI voice agents use advanced natural language processing to understand callers, qualify leads, book appointments, and handle routine inquiries — all in a natural, human-like conversation. For ${ind.lc} businesses, this means:</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Always-On Call Answering</h3>
      <p class="text-slate-400 leading-8 text-lg">Every call is answered instantly, never sent to voicemail. Your customers get a human-like conversation, not a frustrating IVR tree. The AI handles multiple calls simultaneously — no more busy signals or long hold times.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Intelligent Lead Qualification</h3>
      <p class="text-slate-400 leading-8 text-lg">Asks industry-specific questions to score and route leads. Only warm, qualified prospects reach your team. Tire-kickers and casual inquiries are handled automatically without wasting your valuable time.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Automated Appointment Booking</h3>
      <p class="text-slate-400 leading-8 text-lg">Checks calendar availability and books appointments directly into your scheduling system. Two-way calendar sync means zero double-booking. Customers get instant confirmation via SMS.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Seamless CRM Integration</h3>
      <p class="text-slate-400 leading-8 text-lg">Automatically logs calls, updates records, and syncs data with your existing CRM. Every interaction is tracked without manual data entry — perfect for follow-ups and analytics.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Automated SMS Follow-Ups</h3>
      <p class="text-slate-400 leading-8 text-lg">Sends confirmations, reminders, and follow-up messages automatically. Reduce no-shows by up to 60% with intelligent two-way SMS communication that customers love.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Multilingual Capabilities</h3>
      <p class="text-slate-400 leading-8 text-lg">Communicates in 50+ languages to serve diverse customers. Break language barriers without hiring multilingual staff — your AI agent speaks your customer's preferred language fluently.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Real Results: What ${ind.name} Businesses Are Achieving</h2>
      <p class="text-slate-400 leading-8 text-lg">Businesses in the ${ind.lc} space that deploy AI voice agents see measurable improvements within the first 30 days. Here is what the data shows:</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Key Performance Metrics</h3>
      <ul class="list-disc ml-6 space-y-2 text-slate-400 leading-relaxed">
        <li><strong class="text-white">100% Answer Rate:</strong> Every call answered, every time — no exceptions</li>
        <li><strong class="text-white">40-60% More Bookings:</strong> Capturing previously missed after-hours and overflow calls</li>
        <li><strong class="text-white">80% Cost Reduction:</strong> Compared to hiring additional front desk or dispatch staff</li>
        <li><strong class="text-white">60% Fewer No-Shows:</strong> Automated reminders and easy rescheduling options</li>
        <li><strong class="text-white">3-Week ROI:</strong> Most businesses recoup their investment within the first month</li>
      </ul>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Real Impact on Your Bottom Line</h3>
      <p class="text-slate-400 leading-8 text-lg">Beyond the numbers, business owners report reduced stress, better work-life balance, and the confidence that comes from knowing every lead is captured. Your team focuses on delivering great service instead of racing to answer the phone.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Implementation Timeline: From Sign-Up to Live</h2>
      <p class="text-slate-400 leading-8 text-lg">Deploying an AI voice agent for your ${ind.lc} business is faster than hiring and training a new employee. Most businesses go from sign-up to live in 2-3 weeks:</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Week 1: Discovery & Foundation</h3>
      <p class="text-slate-400 leading-8 text-lg">Discovery call, script design tailored to your ${ind.lc} business, and integration setup. We map your existing workflows and identify the highest-ROI automation opportunities so nothing is missed.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Week 2: Training & Customization</h3>
      <p class="text-slate-400 leading-8 text-lg">AI training on your ${ind.lc}-specific terminology, workflows, and compliance requirements. Your agent learns your products, services, pricing, and brand voice until it sounds like a natural extension of your team.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Week 3: Launch & Optimization</h3>
      <p class="text-slate-400 leading-8 text-lg">Go-live, monitoring, and optimization based on real call data. We analyze every conversation and fine-tune for maximum conversion rates. Most businesses see positive ROI within days, not months.</p>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Ready to Transform Your ${ind.name} Business?</h2>
      <p class="text-slate-400 leading-8 text-lg">The cost of inaction is clear: every day without an AI voice agent means more missed calls, more lost leads, and more revenue handed to competitors who answer their phones.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Get Started Today</h3>
      <p class="text-slate-400 leading-8 text-lg">Brandverse AI specializes in ${ind.lc} automation. Our AI voice agents are trained on your industry's specific terminology, workflows, and compliance requirements. Whether you have questions about pricing, want to see a live demo tailored to your business, or are ready to deploy — we are here to help.</p>
    </section>\``;
}

const newBlock = slugs.map((slug, i) => build(slug, industryList[i], excerpts[i])).join(',\n\n');

// Replace old overrides keeping the closing `};` intact
content = content.slice(0, blockStart) + newBlock + ',' + content.slice(objectClose);
fs.writeFileSync(BLOG_CONTENT, content, 'utf8');
console.log('✅ Rebuilt all 20 overrides with H2→H3→H4 heading hierarchy');
