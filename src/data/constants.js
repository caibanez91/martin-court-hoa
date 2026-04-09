export const HOA_NAME = 'Martin Court HOA';
export const TOTAL_HOUSEHOLDS = 16;
export const MONTHLY_DUES = 168;
export const MONTHLY_DUES_INCOME = 2688; // 16 × 168
export const WATER_BALANCE = 7486.25;
export const WATER_PER_HOUSEHOLD = 468.14;
export const CASH_AVAILABLE = 6935.28;
export const UNPAID_DUES = 1326;
export const UNPAID_HOUSEHOLDS = 3;
export const LAST_UPDATED = 'April 8, 2026';

// Verified AR Aging as of March 31, 2026
export const DELINQUENT_ACCOUNTS = [
  { household: 'Household 1', current: 162, days30: 168, days60: 168, days90: 168, total: 666 },
  { household: 'Household 2', current: 162, days30: 168, days60: 168, days90: 0, total: 498 },
  { household: 'Household 3', current: 162, days30: 0, days60: 0, days90: 0, total: 162 },
];

export const COLORS = {
  navy: '#0F2B46',
  accent: '#1A73E8',
  positive: '#0D9488',
  negative: '#DC2626',
  warning: '#D97706',
  muted: '#6B7280',
  border: '#E5E7EB',
  background: '#F8F9FA',
  cardBg: '#FFFFFF',
  tableHeader: '#F3F4F6',
};

// Currency formatter for consistent $ with commas
export function fmt(num) {
  if (num == null || isNaN(num)) return '$0.00';
  const abs = Math.abs(num);
  const formatted = abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return num < 0 ? `-$${formatted}` : `$${formatted}`;
}

// Short currency (no decimals) for charts
export function fmtShort(num) {
  if (num == null || isNaN(num)) return '$0';
  const abs = Math.abs(num);
  const formatted = abs.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return num < 0 ? `-$${formatted}` : `$${formatted}`;
}
