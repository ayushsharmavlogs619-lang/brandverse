#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_CONTENT = path.resolve(__dirname, '..', 'lib/blog-content.ts');

let content = fs.readFileSync(BLOG_CONTENT, 'utf8');

// ========================================================
// For each of the 20 article overrides, insert H3 subheadings
// into the template sections.
// ========================================================

// 1. Upgrade "The Cost of Missed Calls" section: add H3 subheadings
content = content.replace(
  /(<h2 class="text-2xl font-black text-white uppercase italic tracking-wide">The Cost of Missed Calls in [^<]+<\/h2>)\n\s*<p class="text-slate-400 leading-8 text-lg">The average ([^<]+) business loses 20-40% of inbound calls\. For a business receiving 100 calls per month with an average job value of \$500, that is \$10,000-\$20,000 in monthly revenue walking out the door — every single month\.<\/p>/g,
  `$1
      <p class="text-slate-400 leading-8 text-lg">The average $2 business loses 20-40% of inbound calls. For a business receiving 100 calls per month with an average job value of $500, that is $10,000-$20,000 in monthly revenue walking out the door — every single month.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">The Revenue Leak You Cannot Afford</h3>
      <p class="text-slate-400 leading-8 text-lg">Beyond the immediate revenue loss, missed calls damage your reputation. In 2026, consumers expect instant responses. If you do not answer, they assume you are too busy or simply do not care. Either way, they move to the next business on Google.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Why Speed of Response Matters</h3>`
);

// 2. Upgrade "How AI Voice Agents Work" section: add H3 per capability group
content = content.replace(
  /<p class="text-slate-400 leading-8 text-lg">Key capabilities include:<\/p>\n\s*<ul class="list-disc ml-6 space-y-2 text-slate-400 leading-relaxed">\n\s*<li><strong class="text-white">24\/7 Call Answering:<\/strong> Every call is answered instantly, never sent to voicemail<\/li>\n\s*<li><strong class="text-white">Smart Lead Qualification:<\/strong> Asks industry-specific questions to score and route leads<\/li>\n\s*<li><strong class="text-white">Automated Booking:<\/strong> Checks calendar availability and books appointments directly<\/li>\n\s*<li><strong class="text-white">CRM Integration:<\/strong> Automatically logs calls, updates records, and syncs data<\/li>\n\s*<li><strong class="text-white">SMS Follow-ups:<\/strong> Sends confirmations, reminders, and follow-up messages<\/li>\n\s*<li><strong class="text-white">Multilingual Support:<\/strong> Communicates in 50+ languages to serve diverse customers<\/li>\n\s*<\/ul>/g,
  `<h3 class="text-xl font-bold text-white mt-8 mb-4">Always-On Call Answering</h3>
      <p class="text-slate-400 leading-8 text-lg">Every call is answered instantly, never sent to voicemail. Your customers get a human-like conversation experience, not a robotic IVR tree.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Intelligent Lead Qualification</h3>
      <p class="text-slate-400 leading-8 text-lg">Asks industry-specific questions to score and route leads. Only warm, qualified prospects reach your team — tire-kickers are handled without wasting your time.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Automated Appointment Booking</h3>
      <p class="text-slate-400 leading-8 text-lg">Checks calendar availability and books appointments directly into your scheduling system. Two-way sync means zero double-booking.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Seamless CRM Integration</h3>
      <p class="text-slate-400 leading-8 text-lg">Automatically logs calls, updates records, and syncs data with your existing CRM. Every interaction is tracked without manual data entry.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Automated SMS Follow-Ups</h3>
      <p class="text-slate-400 leading-8 text-lg">Sends confirmations, reminders, and follow-up messages. Reduce no-shows by up to 60% with intelligent two-way SMS communication.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Multilingual Capabilities</h3>
      <p class="text-slate-400 leading-8 text-lg">Communicates in 50+ languages to serve diverse customers. Break language barriers without hiring multilingual staff.</p>`
);

// 3. Upgrade "Real Results" section: add H3 for key metrics
content = content.replace(
  /(<h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Real Results for[^<]+<\/h2>)\n\s*<p class="text-slate-400 leading-8 text-lg">Businesses in the ([^<]+) space that deploy AI voice agents see measurable improvements within the first 30 days:<\/p>\n\s*<ul class="list-disc ml-6 space-y-2 text-slate-400 leading-relaxed">/g,
  `$1
      <p class="text-slate-400 leading-8 text-lg">Businesses in the $2 space that deploy AI voice agents see measurable improvements within the first 30 days:</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">What Success Looks Like</h3>`
);

// 4. Upgrade "Implementation Timeline" section: add H3 per week
content = content.replace(
  /(<h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Implementation Timeline<\/h2>)\n\s*<p class="text-slate-400 leading-8 text-lg">Deploying an AI voice agent for your ([^<]+) business is faster than hiring and training a new employee\. Most businesses go from sign-up to live in 2-3 weeks:<\/p>\n\s*<ul class="list-disc ml-6 space-y-2 text-slate-400 leading-relaxed">\n\s*<li><strong class="text-white">Week 1:<\/strong> Discovery call, script design tailored to your ([^<]+) business, and integration setup<\/li>\n\s*<li><strong class="text-white">Week 2:<\/strong> AI training on your ([^<]+)-specific terminology, workflows, and compliance requirements<\/li>\n\s*<li><strong class="text-white">Week 3:<\/strong> Go-live, monitoring, and optimization based on real call data<\/li>\n\s*<\/ul>/g,
  `$1
      <p class="text-slate-400 leading-8 text-lg">Deploying an AI voice agent for your $2 business is faster than hiring and training a new employee. Most businesses go from sign-up to live in 2-3 weeks:</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Week 1: Discovery & Foundation</h3>
      <p class="text-slate-400 leading-8 text-lg">Discovery call, script design tailored to your $3 business, and integration setup. We map your existing workflows and identify the highest-ROI automation opportunities.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Week 2: Training & Customization</h3>
      <p class="text-slate-400 leading-8 text-lg">AI training on your $4-specific terminology, workflows, and compliance requirements. Your agent learns your products, services, pricing, and brand voice.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Week 3: Launch & Optimization</h3>
      <p class="text-slate-400 leading-8 text-lg">Go-live, monitoring, and optimization based on real call data. We analyze every conversation and fine-tune for maximum conversion rates.</p>`
);

// 5. Upgrade "Ready to Transform" section: add H3
content = content.replace(
  /(<h2 class="text-2xl font-black text-white uppercase italic tracking-wide">Ready to Transform Your[^<]+<\/h2>)\n\s*<p class="text-slate-400 leading-8 text-lg">The cost of inaction is clear: every day without an AI voice agent means more missed calls, more lost leads, and more revenue handed to competitors who answer their phones\.<\/p>/g,
  `$1
      <p class="text-slate-400 leading-8 text-lg">The cost of inaction is clear: every day without an AI voice agent means more missed calls, more lost leads, and more revenue handed to competitors who answer their phones.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Your Next Step</h3>`
);

// Fix the first intro section: add H3
content = content.replace(
  /(<section class="space-y-6">\n\s*<p class="text-slate-400 leading-8 text-lg">[^<]+<\/p>\n\s*<p class="text-slate-400 leading-8 text-lg">In the ([^<]+) industry, every missed phone call is a missed opportunity\. When a potential customer calls and gets voicemail, they do not leave a message — they call your competitor\. Businesses in this space lose 30-50% of inbound leads simply because no one answers the phone\.<\/p>\n\s*<p class="text-slate-400 leading-8 text-lg">AI voice agents solve this problem permanently for ([^<]+) businesses\. They answer every call instantly, 24 hours a day, 7 days a week, 365 days a year\. Every caller gets the same professional, consistent experience — every single time\.<\/p>)/g,
  `$1

    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white uppercase italic tracking-wide">The Problem: Missed Calls Are Costing You Real Revenue</h2>
      <p class="text-slate-400 leading-8 text-lg">In the $2 industry, every missed phone call is a missed opportunity. When a potential customer calls and gets voicemail, they do not leave a message — they call your competitor. Businesses in this space lose 30-50% of inbound leads simply because no one answers the phone.</p>
      <p class="text-slate-400 leading-8 text-lg">AI voice agents solve this problem permanently for $3 businesses. They answer every call instantly, 24 hours a day, 7 days a week, 365 days a year. Every caller gets the same professional, consistent experience — every single time.</p>
    </section>`
);

fs.writeFileSync(BLOG_CONTENT, content, 'utf8');
console.log('✅ Headings upgraded in all 20 content overrides');
