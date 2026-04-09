// Normalized Monthly Expenses for Martin Court HOA (16 households)
// Based on: 2025 actuals, verified contract rates, and insurance policy documents
//
// Insurance: $2,061/year per policy document (Acrisure/USLI, eff. Sep 2025)
// Professional Fees: $337/year avg based on ~$1,013 over 3 years (Anne Beauregard)
// Gate Maintenance: $250/year based on historical (1 repair in 3 years — conservative)
// Water: $1,200/month normalized from single-month billed periods (Mar-Jun 2024, Feb 2026)
// All others: 2025 full-year actuals annualized

export const NORMALIZED_MONTHLY = [
  { category: 'Water (Normalized)', monthly: 1200.00, annual: 14400.00 },
  { category: 'Property Mgmt (LLA)', monthly: 525.00, annual: 6300.00 },
  { category: 'Trash (Texas Pride)', monthly: 482.41, annual: 5788.89 },
  { category: 'Landscaping (St. Clair)', monthly: 433.91, annual: 5206.89 },
  { category: 'Insurance (USLI)', monthly: 171.75, annual: 2061.00 },
  { category: 'Bank & Processing Fees', monthly: 94.31, annual: 1131.75 },
  { category: 'Professional Fees (Anne Beauregard)', monthly: 28.09, annual: 337.00 },
  { category: 'Repairs & Maintenance', monthly: 32.08, annual: 385.00 },
  { category: 'Gate Maintenance', monthly: 20.83, annual: 250.00 },
  { category: 'Electricity', monthly: 12.64, annual: 151.65 },
  { category: 'Property Tax', monthly: 2.18, annual: 26.15 },
];

export const TOTAL_MONTHLY = 3003.20;
export const TOTAL_ANNUAL = 36039.33;
export const PER_HOUSEHOLD_MONTHLY = 187.70; // 3003.20 / 16
export const MONTHLY_SHORTFALL = 19.70; // per household: 187.70 - 168
export const BREAK_EVEN_DUES = 188;
export const FULLY_FUNDED_DUES = 225; // includes ~3-month operating reserve built over 12 months
