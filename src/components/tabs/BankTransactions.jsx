import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import { COLORS, fmt, fmtShort } from '../../data/constants';
import { TRANSACTIONS } from '../../data/transactions';

export default function BankTransactions() {
  // Calculate KPIs
  const deposits = TRANSACTIONS.filter(t => t.type === 'Deposit');
  const withdrawals = TRANSACTIONS.filter(t => t.type === 'Withdrawal');
  const totalDeposits = deposits.reduce((sum, t) => sum + t.credit, 0);
  const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.debit, 0);
  const netFlow = totalDeposits - totalWithdrawals;

  // Fee analysis
  const feeTransactions = TRANSACTIONS.filter(t =>
    t.description.toLowerCase().includes('fee') ||
    t.description.toLowerCase().includes('tran fee')
  );
  const totalFees = feeTransactions.reduce((sum, t) => sum + t.debit, 0);

  // Top vendors with normalization for LLA Property Management
  const vendorSpending = {};
  withdrawals.forEach(t => {
    const desc = t.description.toUpperCase();
    let vendor;

    // Normalize vendor names
    if (desc.includes('LLA PROP') || desc.includes('LORI ANDERSON')) {
      vendor = 'LLA Property Management';
    } else if (desc.includes('TEXAS PRIDE')) {
      vendor = 'Texas Pride Disposal';
    } else if (desc.includes('SAINT CLAIR') || desc.includes('ST. CLAIR') || desc.includes('ST CLAIR')) {
      vendor = 'St. Clair Landscaping';
    } else {
      vendor = t.description.split(' ').slice(0, 3).join(' ');
    }

    vendorSpending[vendor] = (vendorSpending[vendor] || 0) + t.debit;
  });

  const topVendors = Object.entries(vendorSpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([name, amount]) => ({ name: name.substring(0, 30), amount }));

  // Monthly cash flow
  const monthlyData = {};
  TRANSACTIONS.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyData[monthKey]) monthlyData[monthKey] = { deposits: 0, withdrawals: 0 };
    if (t.type === 'Deposit') monthlyData[monthKey].deposits += t.credit;
    else monthlyData[monthKey].withdrawals += t.debit;
  });
  const monthlyCashFlow = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([month, { deposits, withdrawals }]) => ({
      month: month.split('-')[1] + '/' + month.split('-')[0].slice(-2),
      deposits,
      withdrawals,
      net: deposits - withdrawals
    }));

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Bank Transactions</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Total Deposits"
          value={fmt(totalDeposits)}
          sublabel={`${deposits.length} transactions`}
          status="positive"
        />
        <KpiCard
          label="Total Withdrawals"
          value={fmt(totalWithdrawals)}
          sublabel={`${withdrawals.length} transactions`}
          status="negative"
        />
        <KpiCard
          label="Net Cash Flow"
          value={fmt(netFlow)}
          sublabel={netFlow >= 0 ? 'Positive' : 'Negative'}
          status={netFlow >= 0 ? 'positive' : 'negative'}
        />
        <KpiCard
          label="Total Bank Fees"
          value={fmt(totalFees)}
          sublabel={`${feeTransactions.length} fee transactions`}
          status="warning"
        />
      </div>

      {/* Top 5 Vendors */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Top 4 Vendors by Spending</h3>
        <p style={{ color: COLORS.muted, fontSize: '14px', margin: '0 0 16px 0' }}>Highest spending vendors since inception</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {topVendors.map((vendor, idx) => (
            <div
              key={idx}
              style={{
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: '600' }}>
                {idx + 1}. {vendor.name}
              </p>
              <p style={{ color: COLORS.navy, fontSize: '20px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                {fmt(vendor.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Cash Flow */}
      <div style={{ marginBottom: '40px' }}>
        <ChartCard title="Monthly Cash Flow (Last 12 Months)" height={300}>
          <p style={{ color: COLORS.muted, fontSize: '14px', margin: '0 0 16px 0' }}>Deposits vs withdrawals by month</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => fmtShort(v)} />
              <Tooltip formatter={(value) => fmtShort(value)} />
              <Legend />
              <Bar dataKey="deposits" fill={COLORS.positive} />
              <Bar dataKey="withdrawals" fill={COLORS.negative} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Fee Analysis */}
      <div style={{ marginBottom: '40px' }}>
        <CalloutBox type="warning" title="Processing Fees Analysis">
          <p>Total bank and processing fees: <strong>{fmt(totalFees)}</strong> across {feeTransactions.length} transactions over 3+ years. Primary sources: Intuit ACH fees, check processing, and wire transfers. Consider: consolidating vendors, batch processing, or negotiating fee rates with bank.</p>
        </CalloutBox>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
        fontSize: '13px',
        color: COLORS.muted
      }}>
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Bank account history (Account ending in 51)</p>
      </div>
    </div>
  );
}
