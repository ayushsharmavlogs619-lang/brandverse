/**
 * BRANDVERSE SALES SYSTEM — pricing calculator logic.
 */

import type { PricingLine } from './types';

export interface PricingResult {
  monthlyTotal: number;
  oneTimeTotal: number;
  annualDiscountPct: number;
  annualPaidMonthly: number; // 12 × monthly, paid monthly (no discount)
  annualPaidUpfront: number; // one-time total + 12 × monthly × discount
  annualSavings: number;
  avgMonthlyCost: number; // amortized first-year monthly cost
}

export function calculatePricing(lines: PricingLine[], annualDiscountPct: number): PricingResult {
  const monthlyTotal = lines
    .filter((l) => l.type === 'monthly')
    .reduce((sum, l) => sum + l.amount * l.qty, 0);
  const oneTimeTotal = lines
    .filter((l) => l.type === 'one-time')
    .reduce((sum, l) => sum + l.amount * l.qty, 0);

  const discount = Math.min(50, Math.max(0, annualDiscountPct)) / 100;
  const annualPaidMonthly = monthlyTotal * 12;
  const annualPaidUpfront = oneTimeTotal + annualPaidMonthly * (1 - discount);
  const annualSavings = annualPaidMonthly - (annualPaidUpfront - oneTimeTotal);

  return {
    monthlyTotal,
    oneTimeTotal,
    annualDiscountPct,
    annualPaidMonthly,
    annualPaidUpfront: Math.round(annualPaidUpfront),
    annualSavings: Math.max(0, Math.round(annualSavings)),
    avgMonthlyCost: Math.round((oneTimeTotal + annualPaidMonthly) / 12),
  };
}
