import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import DataTable from '../DataTable';
import CalloutBox from '../CalloutBox';
import { COLORS, WATER_BALANCE, CASH_AVAILABLE, fmt, fmtShort } from '../../data/constants';
import { PL_DATA } from '../../data/plData';

export default function PLSinceInception() {
  // Calculate cumulative data
  const allMonths = [];

  Object.keys(PL_DATA).forEach(year => {
    const data = PL_DATA[year];
    data.months.forEach((month, idx) => {
      const fullMonth = `${month} ${year}`;
      const monthExpenses = Object.values(data.expenses).reduce((sum, arr) => sum + arr[idx], 0);
      allMonths.push({
        month: fullMonth,
        income: data.income[idx],
        expenses: monthExpenses,
        net: data.income[idx] - monthExpenses
      });
    });
  });

  // Calculate summary KPIs
  const totalIncome = Object.values(PL_DATA).reduce((sum, data) => sum + data.total_income, 0);
  const totalExpenses = Object.values(PL_DATA).reduce((sum, data) => sum + data.total_expenses, 0);
  const totalNet = totalIncome - totalExpenses;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>P&L Since Inception</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Total Income (2023-2026)"
          value={fmt(totalIncome)}
          sublabel="All periods combined"
          status="positive"
        />
        <KpiCard
          label="Total Expenses (2023-2026)"
          value={fmt(totalExpenses)}
          sublabel="All periods combined"
          status="negative"
        />
        <KpiCard
          label="Cumulative Net"
          value={fmt(totalNet)}
          sublabel={totalNet >= 0 ? 'Surplus' : 'Deficit'}
          status={totalNet >= 0 ? 'positive' : 'negative'}
        />
      </div>

      {/* Net Income Trend */}
      <ChartCard
        title="Net Income Trend (All Months)"
        subtitle="Monthly net income over the entire period"
        height={300}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={allMonths}>
            <defs>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => fmtShort(v)} />
            <Tooltip formatter={(value) => fmtShort(value)} />
            <Area type="monotone" dataKey="net" stroke={COLORS.accent} fillOpacity={1} fill="url(#colorNet)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Full Detail Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Detailed Monthly P&L</h3>
        <p style={{ color: COLORS.muted, marginBottom: '16px', fontSize: '14px' }}>Complete breakdown of income and expenses by month</p>
        <DataTable
          columns={[
            { key: 'month', label: 'Month', type: 'text' },
            { key: 'income', label: 'Income', type: 'currency' },
            { key: 'expenses', label: 'Expenses', type: 'currency' },
            { key: 'net', label: 'Net Income', type: 'currency' }
          ]}
          data={allMonths}
          searchable={true}
        />
      </div>

      {/* Important Notes */}
      <CalloutBox type="danger" title="Cash Position After Water Debt">
        <p>The current cash on hand ({fmt(CASH_AVAILABLE)}) has <strong>not</strong> accounted for the {fmt(WATER_BALANCE)} owed to the City of Houston. If we were to pay this debt from available cash, the HOA would be at {fmt(CASH_AVAILABLE - WATER_BALANCE)} — effectively negative.</p>
      </CalloutBox>

      <CalloutBox type="info" title="P&L vs. Bank Statement Differences">
        <p>The P&L totals shown here may differ from the Bank Transactions tab because: (1) the P&L uses accrual-based accounting, recording income when assessed and expenses when incurred, while the bank statement records cash movements when they actually clear; (2) some bank deposits (e.g., refunds, transfers) may not classify as "income" on the P&L; and (3) period boundaries cause timing differences between when a transaction is recorded on each report.</p>
      </CalloutBox>

      {/* Analysis */}
      <div style={{
        marginTop: '40px',
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '12px' }}>Key Findings</h3>
        <ul style={{ color: COLORS.muted, lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
          <li>2023 was largely an administrative period with minimal activities; only ~$8.6K income and $2.1K expenses</li>
          <li>2024 showed strong income growth ($28.6K) but high landscaping costs</li>
          <li>2025 continued income growth ($33.8K) but massive water bills pushed expenses to $43.1K, creating a $9.4K deficit</li>
          <li>2026 YTD (Jan-Mar) shows continued cash burn with water billing and management fees</li>
          <li>Cumulative net position: approximately {totalNet < 0 ? 'negative' : 'positive'} due to water crisis in late 2025</li>
        </ul>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
        fontSize: '13px',
        color: COLORS.muted
      }}>
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Complete P&L records 2023-2026</p>
      </div>
    </div>
  );
}
