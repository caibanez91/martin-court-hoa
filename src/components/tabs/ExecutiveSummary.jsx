import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import { COLORS, TOTAL_HOUSEHOLDS, UNPAID_HOUSEHOLDS, CASH_AVAILABLE, WATER_BALANCE, UNPAID_DUES, fmt, fmtShort } from '../../data/constants';
import { PL_DATA } from '../../data/plData';
import { PER_HOUSEHOLD_MONTHLY, MONTHLY_SHORTFALL, TOTAL_MONTHLY } from '../../data/normalizedExpenses';

export default function ExecutiveSummary() {
  // Calculate 2025 net income
  const yearData2025 = PL_DATA[2025];
  const income2025 = yearData2025.total_income;
  const expenses2025 = yearData2025.total_expenses;
  const netIncome2025 = income2025 - expenses2025;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '8px' }}>Executive Summary</h2>
      <p style={{ color: COLORS.muted, margin: '0 0 40px 0', fontSize: '13px' }}>Key metrics as of April 2026</p>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Monthly Dues"
          value="$168"
          sublabel="Per household"
          status="neutral"
        />
        <KpiCard
          label="2025 Net Income"
          value={fmt(netIncome2025)}
          sublabel="Deficit"
          status="negative"
        />
        <KpiCard
          label="Unpaid Dues"
          value={fmt(UNPAID_DUES)}
          sublabel={`${UNPAID_HOUSEHOLDS} households`}
          status="negative"
        />
        <KpiCard
          label="Available Cash"
          value={fmt(CASH_AVAILABLE)}
          sublabel="Bank balance"
          status="positive"
        />
        <KpiCard
          label="Water Debt"
          value={fmt(WATER_BALANCE)}
          sublabel="Delinquent balance"
          status="negative"
        />
      </div>

      {/* Critical Issues */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Critical Issues</h3>
        <p style={{ color: COLORS.muted, margin: '0 0 16px 0', fontSize: '13px' }}>Urgent action items requiring immediate attention</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <CalloutBox type="danger" title="Water Billing">
            <p>$7,486.25 delinquent balance due to billing issue. Issue resolved Jan 2026; payments plan required.</p>
          </CalloutBox>
          <CalloutBox type="warning" title="Monthly Budget Deficit">
            <p>Current $168/month dues cover $168 of the $187.70 actual per-household cost. $19.70/month shortfall per household with normalized water consumption of $1,200 per month for the entire community. If water consumption is greater then so will the shortfall.</p>
          </CalloutBox>
          <CalloutBox type="warning" title="Unpaid Dues">
            <p>3 households (~$1,326 total) behind on dues. Collection efforts ongoing.</p>
          </CalloutBox>
        </div>
      </div>

      {/* Year-over-Year Trend */}
      <div style={{ marginBottom: '40px' }}>
        <ChartCard title="Income vs Expenses (2023-2025)" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { year: '2023', income: PL_DATA[2023].total_income, expenses: PL_DATA[2023].total_expenses },
              { year: '2024', income: PL_DATA[2024].total_income, expenses: PL_DATA[2024].total_expenses },
              { year: '2025', income: PL_DATA[2025].total_income, expenses: PL_DATA[2025].total_expenses }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => fmtShort(v)} />
              <Tooltip formatter={(value) => fmtShort(value)} />
              <Line type="monotone" dataKey="income" stroke={COLORS.positive} strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke={COLORS.negative} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
        fontSize: '13px',
        color: COLORS.muted
      }}>
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Bank statements, City of Houston records, Property Management</p>
      </div>
    </div>
  );
}
