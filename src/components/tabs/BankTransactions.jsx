import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import DataTable from '../DataTable';
import CalloutBox from '../CalloutBox';
import { COLORS } from '../../data/constants';
import { TRANSACTIONS } from '../../data/transactions';

export default function BankTransactions() {
  // Calculate KPIs
  const deposits = TRANSACTIONS.filter(t => t.type === 'Deposit');
  const withdrawals = TRANSACTIONS.filter(t => t.type === 'Withdrawal');
  const totalDeposits = deposits.reduce((sum, t) => sum + t.credit, 0);
  const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.debit, 0);
  const netFlow = totalDeposits - totalWithdrawals;

  // Top vendors
  const vendorSpending = {};
  withdrawals.forEach(t => {
    const vendor = t.description.split(' ').slice(0, 3).join(' ');
    vendorSpending[vendor] = (vendorSpending[vendor] || 0) + t.debit;
  });
  const topVendors = Object.entries(vendorSpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
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

  // Fee analysis
  const feeTransactions = TRANSACTIONS.filter(t =>
    t.description.toLowerCase().includes('fee') ||
    t.description.toLowerCase().includes('tran fee')
  );
  const totalFees = feeTransactions.reduce((sum, t) => sum + t.debit, 0);

  // Format for table
  const tableData = TRANSACTIONS.slice(0, 100).map(t => ({
    date: t.date,
    description: t.description,
    amount: t.type === 'Deposit' ? t.credit : -t.debit,
    type: t.type,
    status: t.status
  }));

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Bank Transactions</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Total Deposits"
          value={`$${totalDeposits.toFixed(2)}`}
          sublabel={`${deposits.length} transactions`}
          status="positive"
        />
        <KpiCard
          label="Total Withdrawals"
          value={`$${totalWithdrawals.toFixed(2)}`}
          sublabel={`${withdrawals.length} transactions`}
          status="negative"
        />
        <KpiCard
          label="Net Cash Flow"
          value={`$${netFlow.toFixed(2)}`}
          sublabel={netFlow >= 0 ? 'Positive' : 'Negative'}
          status={netFlow >= 0 ? 'positive' : 'negative'}
        />
        <KpiCard
          label="Total Bank Fees"
          value={`$${totalFees.toFixed(2)}`}
          sublabel={`${feeTransactions.length} fee transactions`}
          status="warning"
        />
        <KpiCard
          label="Transaction Count"
          value={TRANSACTIONS.length}
          sublabel="Mar 2023 - Apr 2026"
          status="neutral"
        />
      </div>

      {/* Top 5 Vendors */}
      <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Top 5 Vendors by Spending</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
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
              ${vendor.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Cash Flow */}
      <ChartCard title="Monthly Cash Flow (Last 12 Months)" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyCashFlow}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Legend />
            <Bar dataKey="deposits" fill={COLORS.positive} />
            <Bar dataKey="withdrawals" fill={COLORS.negative} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Vendor Spending Distribution */}
      <ChartCard title="Top Vendors by Total Spending" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topVendors} layout="vertical" margin={{ top: 5, right: 30, left: 200, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={190} />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Bar dataKey="amount" fill={COLORS.accent} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Fee Analysis */}
      <CalloutBox type="warning" title="Processing Fees Analysis">
        <p>Total bank and processing fees: <strong>${totalFees.toFixed(2)}</strong> over 3+ years. Primary sources: Intuit ACH fees, check processing, and wire transfers. Consider: consolidating vendors, batch processing, or negotiating fee rates with bank.</p>
      </CalloutBox>

      {/* Transaction Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Transaction Details ({TRANSACTIONS.length} Total)</h3>
        <DataTable
          columns={[
            { key: 'date', label: 'Date', type: 'text' },
            { key: 'description', label: 'Description', type: 'text' },
            { key: 'amount', label: 'Amount', type: 'currency' },
            { key: 'type', label: 'Type', type: 'text' },
            { key: 'status', label: 'Status', type: 'text' }
          ]}
          data={tableData}
          searchable={true}
        />
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
