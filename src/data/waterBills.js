export const WATER_BILLS = [
  { date: '2022-07-24', period: 'Feb 2022 – Jun 2023', type: 'Drainage Only', consumption: null, amount: 179.84, status: 'Paid', notes: 'Drainage charge only, no water consumption' },
  { date: '2024-03-01', period: 'Jun 2023 – Feb 2024', type: 'Delinquent', consumption: 280000, amount: 5553.60, status: 'Delinquent', notes: 'First major bill after account setup. $12,000 deposit credited.' },
  { date: '2024-03-28', period: 'Feb 29 – Mar 27, 2024', type: 'Monthly', consumption: 23000, amount: 1545.44, status: 'Delinquent', notes: 'Includes $533.75 in penalties' },
  { date: '2024-04-25', period: 'Mar 27 – Apr 25, 2024', type: 'Monthly', consumption: 32000, amount: 1331.52, status: 'Delinquent', notes: 'Includes $100.70 in penalties' },
  { date: '2024-05-24', period: 'Apr 25 – May 23, 2024', type: 'Monthly', consumption: 31000, amount: 1223.42, status: 'Delinquent', notes: 'No penalties on current charges' },
  { date: '2024-06-25', period: 'May 23 – Jun 25, 2024', type: 'Monthly', consumption: 37000, amount: 1332.62, status: 'Delinquent', notes: 'Last bill before billing gap' },
  { date: '2026-01-28', period: 'Jun 2025 – Jan 2026', type: '7-Month Catch-Up', consumption: 307000, amount: 1488.69, status: 'Delinquent', notes: '$7,800 in payments received. ~11 months with no invoices.' },
  { date: '2026-02-18', period: 'Jan 28 – Feb 17, 2026', type: 'Monthly', consumption: 27000, amount: 1204.41, status: 'Delinquent', notes: 'First regular monthly bill after resolution' }
];

export const WATER_TIMELINE_EVENTS = [
  { date: 'Oct 2024', event: 'HOA and LLA identify billing issue', detail: 'Root cause: FEIN preventing address update at city level — administrative barrier, not HOA error.' },
  { date: 'Jul 2024 – May 2025', event: 'Billing Gap (~11 months)', detail: 'City of Houston did not issue invoices despite repeated contact. Water services continued normally.' },
  { date: 'Nov 2025', event: 'City of Houston responds', detail: 'After ~13 months. Weekly to bi-weekly communication begins.' },
  { date: 'Dec 2025', event: 'First address change request filed', detail: 'LLA filed Public Works address change request to update mailing to management company.' },
  { date: 'Jan 2026', event: 'Issue fully resolved', detail: 'Second request filed. Invoices now being sent to correct HOA address.' }
];
