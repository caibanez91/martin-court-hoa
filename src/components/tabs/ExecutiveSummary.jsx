import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import { COLORS, MONTHLY_DUES_INCOME, TOTAL_HOUSEHOLDS, UNPAID_HOUSEHOLDS } from '../../data/constants';
import { PL_DATA } from '../../data/plData';

export default function ExecutiveSummary() {
  // Calculate health metrics
  const yearData2025 = PL_DATA[2025];
  const income2025 = yearData2025.total_income;
  const expenses2025 = yearData2025.total_expenses;
  const netIncome2025 = income2025 - expenses2025;

  // Health score calculation (0-100)
  const cumulativeNet = Object.keys(PL_DATA).reduce((acc, year) => {
    return acc + (PL_DATA[year].total_income - PL_DATA[year].total_expenses);
  }, 0);
  const healthScore = Math.min(100, Math.max(0, 50 + (cumulativeNet / 10000) * 50));

  const monthlyShortfall = MONTHLY_DUES_INCOME - 2883.31;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Executive Summary</h2>

      {/* Health Gauge */}
      <div style={{ marginBottom: '40px' }}>
        <ChartCard title="Financial Health Score" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Health', value: healthScore },
                  { name: 'Remaining', value: 100 - healthScore }
                ]}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={120}
                dataKey="value"
              >
                <Cell fill={healthScore > 50 ? COLORS.positive : COLORS.warning} />
                <Cell fill={COLORS.border} />
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ fontSize: '24px', fontWeight: '700', color: COLORS.navy, margin: '0 0 8px 0' }}>
            {healthScore.toFixed(0)} / 100
          </p>
          <p style={{ color: COLORS.muted, margin: 0 }}>
            {healthScore > 50 ? 'Moderate Financial Health' : 'Financial Challenges Identified'}
          </p>
        </div>
      </div>

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
          value={`$${netIncome2025.toFixed(2)}`}
          sublabel={netIncome2025 < 0 ? 'Deficit' : 'Surplus'}
          status={netIncome2025 < 0 ? 'negative' : 'positive'}
        />
        <KpiCard
          label="Monthly Shortfall"
          value={`$${monthlyShortfall.toFixed(2)}`}
          sublabel="Current vs. actual costs"
          status="warning"
        />
        <KpiCard
          label="Unpaid Dues"
          value="$1,326"
          sublabel={`${UNPAID_HOUSEHOLDS} households`}
          status="warning"
        />
        <KpiCard
          label="Available Cash"
          value="$6,935"
          sublabel="Bank balance"
          status="positive"
        />
        <KpiCard
          label="Water Debt"
          value="$7,486"
          sublabel="Delinquent balance"
          status="negative"
        />
      </div>

      {/* Critical Issues */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Critical Issues</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <CalloutBox type="danger" title="Water Billing Crisis">
            <p>$7,486.25 delinquent balance due to billing system issues at City of Houston (NOT a leak). Issue resolved Jan 2026; payments plan required.</p>
          </CalloutBox>
          <CalloutBox type="warning" title="Monthly Budget Deficit">
            <p>Current $168/month dues cover only ${(2688 - 12.21*16).toFixed(2)}/month of $2,883 actual costs. $12.21/month shortfall per household.</p>
          </CalloutBox>
          <CalloutBox type="warning" title="Unpaid Dues">
            <p>3 households (~$1,326 total) behind on dues. Collection efforts ongoing; legal action may be necessary.</p>
          </CalloutBox>
        </div>
      </div>

      {/* Year-over-Year Trend */}
      <ChartCard title="Income vs Expenses (2023-2025)" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[
            { year: '2023', income: PL_DATA[2023].total_income, expenses: PL_DATA[2023].total_expenses },
            { year: '2024', income: PL_DATA[2024].total_income, expenses: PL_DATA[2024].total_expenses },
            { year: '2025', income: PL_DATA[2025].total_income, expenses: PL_DATA[2025].total_expenses }
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Line type="monotone" dataKey="income" stroke={COLORS.positive} strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke={COLORS.negative} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

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
