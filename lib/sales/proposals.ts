/**
 * BRANDVERSE SALES SYSTEM — document HTML builders.
 * Renders branded, printable proposals and contracts, plus a self-contained
 * landing page generator. All user input is HTML-escaped.
 */

import type { ContractData, ProposalData } from './types';

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function money(n: number | null): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const BASE_STYLE = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #ffffff; line-height: 1.6; }
  .doc { max-width: 800px; margin: 0 auto; padding: 24px; }
  .topbar { height: 6px; background: linear-gradient(90deg, #0066ff, #8b5cf6, #ec4899); border-radius: 4px; margin-bottom: 32px; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; border-bottom: 2px solid #1a1a2e; padding-bottom: 24px; margin-bottom: 28px; }
  .brand { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
  .brand span { color: #0066ff; }
  .brand .sub { display: block; font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #8a8aa0; text-transform: uppercase; margin-top: 2px; }
  .doctitle { text-align: right; }
  .doctitle h1 { font-size: 26px; letter-spacing: 1px; text-transform: uppercase; }
  .doctitle p { font-size: 12px; color: #8a8aa0; }
  h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #0066ff; margin: 28px 0 12px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; }
  .kv b { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #8a8aa0; }
  .kv span { font-size: 14px; font-weight: 600; }
  .desc { background: #f5f7ff; border: 1px solid #e4e8f5; border-radius: 10px; padding: 16px; font-size: 14px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8a8aa0; border-bottom: 2px solid #1a1a2e; padding: 8px 10px; }
  td { padding: 10px; border-bottom: 1px solid #ececf5; }
  tr.total td { font-weight: 800; font-size: 16px; border-top: 2px solid #1a1a2e; border-bottom: none; }
  .list { list-style: none; }
  .list li { padding: 6px 0; font-size: 14px; }
  .list li::before { content: '✓ '; color: #0066ff; font-weight: 700; }
  .sig { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 48px; }
  .sig div { border-top: 1px solid #1a1a2e; padding-top: 8px; font-size: 12px; color: #8a8aa0; }
  .foot { margin-top: 48px; padding-top: 16px; border-top: 1px solid #ececf5; font-size: 11px; color: #8a8aa0; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  @media (max-width: 600px) { .grid, .sig { grid-template-columns: 1fr; } .head { flex-direction: column; } .doctitle { text-align: left; } }
`;

export function renderProposalHtml(data: ProposalData): string {
  const hasMonthly = data.monthlyFee !== null;
  const oneTime = data.oneTimeFee ?? 0;

  const rows: string[] = [];
  if (data.setupFee) {
    rows.push(`<tr><td>Setup & Onboarding</td><td>One-time</td><td style="text-align:right">${money(data.setupFee)}</td></tr>`);
  }
  if (data.oneTimeFee !== null) {
    rows.push(`<tr><td>${escapeHtml(data.serviceName || 'Service')}</td><td>One-time</td><td style="text-align:right">${money(oneTime)}</td></tr>`);
  }
  if (data.monthlyFee !== null) {
    rows.push(`<tr><td>${escapeHtml(data.serviceName || 'Service')}</td><td>Monthly</td><td style="text-align:right">${money(data.monthlyFee)}</td></tr>`);
  }

  const deliverables = (data.deliverables || []).filter((d) => d.trim());
  const total = data.oneTimeFee !== null && data.monthlyFee !== null
    ? money((data.oneTimeFee ?? 0) + (data.monthlyFee ?? 0))
    : '—';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Proposal — ${escapeHtml(data.clientCompany || data.clientName)}</title><style>${BASE_STYLE}</style></head><body><div class="doc">
<div class="topbar"></div>
<div class="head">
  <div class="brand">BRANDVERSE<span>AI Voice Agents & Automation</span></div>
  <div class="doctitle"><h1>Proposal</h1><p>${escapeHtml(data.serviceName)}</p><p>Prepared ${formatDate(new Date().toISOString())}</p></div>
</div>

<h2>Prepared For</h2>
<div class="grid">
  <div class="kv"><b>Client</b><span>${escapeHtml(data.clientName)}</span></div>
  <div class="kv"><b>Company</b><span>${escapeHtml(data.clientCompany)}</span></div>
  <div class="kv"><b>Email</b><span>${escapeHtml(data.clientEmail)}</span></div>
  <div class="kv"><b>Proposal valid until</b><span>${formatDate(data.validUntil)}</span></div>
</div>

<h2>Overview</h2>
<div class="desc">${escapeHtml(data.description).replace(/\n/g, '<br/>') || 'Service overview goes here.'}</div>

${deliverables.length > 0 ? `<h2>What's Included</h2><ul class="list">${deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>` : ''}

<h2>Investment</h2>
<table>
  <tr><th>Item</th><th>Type</th><th style="text-align:right">Amount</th></tr>
  ${rows.length > 0 ? rows.join('') : '<tr><td colspan="3" style="color:#8a8aa0">Pricing to be confirmed.</td></tr>'}
  ${hasMonthly ? `<tr class="total"><td colspan="2">Total (setup + first month)</td><td style="text-align:right">${total}</td></tr>` : ''}
</table>

<h2>Payment Terms</h2>
<p style="font-size:14px">${escapeHtml(data.paymentTerms) || 'Standard terms apply.'}</p>

${data.notes ? `<h2>Notes</h2><p style="font-size:14px">${escapeHtml(data.notes).replace(/\n/g, '<br/>')}</p>` : ''}

<div class="sig">
  <div>${escapeHtml(data.clientName)}<br/>Client signature</div>
  <div>${escapeHtml(data.preparedBy)} — ${escapeHtml(data.preparedByTitle)}<br/>Brandverse signature</div>
</div>

<div class="foot">
  <span>Brandverse · brandverse.tech</span>
  <span>This proposal is a quotation and does not constitute a binding contract until both parties sign.</span>
</div>
</div></body></html>`;
}

export function renderContractHtml(data: ContractData): string {
  const scope = (data.scope || '').split('\n').filter((l) => l.trim());
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Contract — ${escapeHtml(data.clientCompany || data.clientName)}</title><style>${BASE_STYLE}</style></head><body><div class="doc">
<div class="topbar"></div>
<div class="head">
  <div class="brand">BRANDVERSE<span>AI Voice Agents & Automation</span></div>
  <div class="doctitle"><h1>Service Agreement</h1><p>Effective ${formatDate(data.effectiveDate)}</p></div>
</div>

<h2>Parties</h2>
<div class="grid">
  <div class="kv"><b>Client</b><span>${escapeHtml(data.clientName)}</span></div>
  <div class="kv"><b>Company</b><span>${escapeHtml(data.clientCompany)}</span></div>
  <div class="kv"><b>Address</b><span>${escapeHtml(data.clientAddress)}</span></div>
  <div class="kv"><b>Provider</b><span>Brandverse · brandverse.tech</span></div>
</div>

<h2>Services</h2>
<p style="font-size:14px">The Provider shall deliver: <b>${escapeHtml(data.serviceName)}</b>.</p>
${scope.length > 0 ? `<ul class="list">${scope.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ul>` : ''}

<h2>Fees & Payment</h2>
<table>
  <tr><th>Item</th><th>Type</th><th style="text-align:right">Amount</th></tr>
  ${data.monthlyFee !== null ? `<tr><td>Monthly service</td><td>Monthly</td><td style="text-align:right">${money(data.monthlyFee)}</td></tr>` : ''}
  ${data.oneTimeFee !== null ? `<tr><td>One-time charges</td><td>One-time</td><td style="text-align:right">${money(data.oneTimeFee)}</td></tr>` : ''}
</table>
<p style="font-size:14px; margin-top:12px">${escapeHtml(data.paymentTerms) || 'Invoiced monthly, due within 14 days.'}</p>

<h2>Term</h2>
<p style="font-size:14px">This agreement begins on ${formatDate(data.effectiveDate)} and continues for an initial term of <b>${data.termMonths || 12} months</b>, after which it renews month-to-month unless either party gives 30 days' notice.</p>

<h2>Intellectual Property</h2>
<p style="font-size:14px">${escapeHtml(data.ipClause) || 'Client owns all of its content and customer data. Brandverse retains ownership of its platform, templates, and proprietary software.'}</p>

<h2>Cancellation</h2>
<p style="font-size:14px">${escapeHtml(data.cancellation) || 'Either party may terminate with 30 days written notice. Fees already incurred remain payable.'}</p>

<h2>Limitation of Liability</h2>
<p style="font-size:14px">${escapeHtml(data.liability) || "Provider's liability is limited to fees paid in the 3 months prior to the claim. Provider is not liable for indirect or consequential damages."}</p>

<div class="sig">
  <div>${escapeHtml(data.clientName)}<br/>Client signature · Date: ______</div>
  <div>For Brandverse<br/>Authorized signature · Date: ______</div>
</div>

<div class="foot">
  <span>Brandverse · brandverse.tech</span>
  <span>Agreement governed by applicable law. Signed copies to be exchanged by both parties.</span>
</div>
</div></body></html>`;
}

// ---------------------------------------------------------------------------
// Landing page generator (self-contained HTML)
// ---------------------------------------------------------------------------

export interface LandingPageData {
  business: string;
  niche: string;
  city: string;
  phone: string;
  headline: string;
  offer: string;
  cta: string;
  benefits: string[];
  accent: 'blue' | 'green' | 'amber';
}

const ACCENTS: Record<LandingPageData['accent'], { main: string; dark: string; gradient: string }> = {
  blue: { main: '#0066ff', dark: '#0044bb', gradient: 'linear-gradient(135deg, #0066ff, #8b5cf6)' },
  green: { main: '#0e9f6e', dark: '#0b7a54', gradient: 'linear-gradient(135deg, #0e9f6e, #06b6d4)' },
  amber: { main: '#d97706', dark: '#b45309', gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)' },
};

export function renderLandingPageHtml(data: LandingPageData): string {
  const a = ACCENTS[data.accent] ?? ACCENTS.blue;
  const esc = escapeHtml;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(data.business)} — ${esc(data.headline)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; background: #f8fafc; line-height: 1.6; }
  .hero { background: ${a.gradient}; color: #fff; padding: 64px 24px 56px; text-align: center; }
  .hero h1 { font-size: clamp(28px, 5vw, 44px); font-weight: 800; letter-spacing: -1px; max-width: 720px; margin: 0 auto 16px; }
  .hero p { font-size: clamp(15px, 2vw, 18px); opacity: .95; max-width: 560px; margin: 0 auto 28px; }
  .cta { display: inline-block; background: #fff; color: ${a.dark}; font-weight: 800; font-size: 17px; padding: 14px 36px; border-radius: 999px; text-decoration: none; box-shadow: 0 8px 30px rgba(0,0,0,.2); }
  .cta:hover { transform: translateY(-2px); }
  .wrap { max-width: 900px; margin: 0 auto; padding: 48px 24px; }
  .benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; box-shadow: 0 2px 12px rgba(2,6,23,.05); }
  .card h3 { color: ${a.main}; font-size: 16px; margin-bottom: 6px; }
  .offer { background: #fff; border: 2px solid ${a.main}; border-radius: 16px; padding: 28px; text-align: center; margin: 40px 0; box-shadow: 0 6px 30px rgba(0,102,255,.08); }
  .offer h2 { font-size: 22px; margin-bottom: 8px; }
  form { display: flex; flex-direction: column; gap: 12px; max-width: 420px; margin: 24px auto 0; }
  input { padding: 13px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 15px; }
  button { background: ${a.main}; color: #fff; font-weight: 800; font-size: 16px; padding: 14px; border: none; border-radius: 10px; cursor: pointer; }
  button:hover { background: ${a.dark}; }
  .foot { text-align: center; padding: 24px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
  @media (max-width: 600px) { .hero { padding: 44px 18px 40px; } }
</style></head><body>
<section class="hero">
  <h1>${esc(data.headline)}</h1>
  <p>${esc(data.offer)}</p>
  <a class="cta" href="tel:${esc(data.phone.replace(/\s/g, ''))}">${esc(data.cta)}</a>
</section>
<section class="wrap">
  <div class="benefits">
    ${data.benefits.filter(Boolean).map((b) => `<div class="card"><h3>✓</h3><p>${esc(b)}</p></div>`).join('')}
  </div>
  <div class="offer">
    <h2>Get started with ${esc(data.business)} today</h2>
    <p>Leave your name and number — we'll call you back within the hour.</p>
    <form action="mailto:${esc((data.phone || '').replace(/\s/g, ''))}" method="get" onsubmit="this.action='mailto:'+encodeURIComponent('hello@brandverse.tech?subject=Lead from ${encodeURIComponent(data.business)}&body=Name:');">
      <input type="text" name="name" placeholder="Your name" required/>
      <input type="tel" name="phone" placeholder="Phone number" required/>
      <button type="submit">${esc(data.cta)}</button>
    </form>
    <p style="font-size:12px; color:#64748b; margin-top:10px">Serving ${esc(data.city)} — response within 1 hour.</p>
  </div>
</section>
<div class="foot">${esc(data.business)} · ${esc(data.city)} · Powered by Brandverse</div>
</body></html>`;
}

export const LANDING_BENEFITS = [
  'Fast, friendly service',
  'Local experts you can trust',
  'Free estimates',
  'Available 7 days a week',
  'Satisfaction guaranteed',
  'Transparent pricing',
];
