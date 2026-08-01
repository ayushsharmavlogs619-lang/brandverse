/**
 * BRANDVERSE SALES SYSTEM — ROI calculation engine.
 * Client inputs: monthly revenue, missed calls per month, lead value.
 * Estimates the yearly revenue recovered by capturing those missed calls
 * with an AI voice agent.
 */

export interface RoiInput {
  revenue: number; // monthly revenue
  missedCalls: number; // per month
  leadValue: number; // avg $ per closed lead
  closeRatePct: number; // % of captured leads that close (default 30)
  captureRatePct: number; // % of missed calls the agent captures (default 85)
}

export interface RoiResult {
  missedCallsPerYear: number;
  leadsCapturedPerYear: number;
  dealsClosedPerYear: number;
  recoveredRevenuePerMonth: number;
  recoveredRevenuePerYear: number;
  revenueShare: number; // recovered / revenue as %
  additionalCallsNeeded: number; // equivalent calls you would need to generate
}

export function calculateRoi(input: RoiInput): RoiResult {
  const safe = (n: number, fallback: number) =>
    Number.isFinite(n) && n > 0 ? n : fallback;

  const revenue = safe(input.revenue, 0);
  const missedCalls = safe(input.missedCalls, 0);
  const leadValue = safe(input.leadValue, 0);
  const closeRate = Math.min(100, Math.max(0, input.closeRatePct || 0)) / 100;
  const captureRate = Math.min(100, Math.max(0, input.captureRatePct || 0)) / 100;

  const missedCallsPerYear = missedCalls * 12;
  const leadsCapturedPerYear = missedCallsPerYear * captureRate;
  const dealsClosedPerYear = leadsCapturedPerYear * closeRate;
  const recoveredRevenuePerMonth = dealsClosedPerYear * leadValue * (1 / 12);
  const recoveredRevenuePerYear = dealsClosedPerYear * leadValue;
  const revenueShare = revenue > 0 ? (recoveredRevenuePerYear / (revenue * 12)) * 100 : 0;
  const additionalCallsNeeded = Math.round(leadValue > 0 ? recoveredRevenuePerMonth / leadValue : 0);

  return {
    missedCallsPerYear: Math.round(missedCallsPerYear),
    leadsCapturedPerYear: Math.round(leadsCapturedPerYear),
    dealsClosedPerYear: Math.round(dealsClosedPerYear),
    recoveredRevenuePerMonth: Math.round(recoveredRevenuePerMonth),
    recoveredRevenuePerYear: Math.round(recoveredRevenuePerYear),
    revenueShare: Math.round(revenueShare * 10) / 10,
    additionalCallsNeeded,
  };
}

export function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
