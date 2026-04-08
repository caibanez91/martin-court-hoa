import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import DataTable from '../DataTable';
import { COLORS } from '../../data/constants';
import { PL_DATA } from '../../data/plData';

export default function PLSinceInception() {
  // Calculate cumulative data
  const allMonths = [];
  const monthExpenseBreakdown = {};

  Object.keys(PL_DATA).forEach(year => {
    const data = PL_DATA[year];
    data.months.forEach((month, idx) => {
      const fullMonth = `${month} ${year}`;
      allMonths.push({
        month: fullMonth,
        income: data.income[idx],
        expenses: Object.values(data.expenses).reduce((sum, arr) => sum + arr[idx], 0),
        net: data.income[idx] - Object.values(data.expenses).reduce((sum, arr) => sum + arr[idx], 0)
      });
    });
  });

  // Calculate summary KPIs
  const totalIncome = Object.values(PL_DATA).reduce((sum, data) => sum + data.total_income, 0);
  const totalExpenses = Object.values(PL_DATA).reduce((sum, data) => sum + data.total_expenses, 0);
  const totalNet = totalIncome - totalExpenses;

  const incomeByYear = Object.keys(PL_DATA).map(year => ({
    year,
    income: PL_DATA[year].total_income,
    expenses: PL_DATA[year].total_expenses,
    net: PL_DATA[year].total_income - PL_DATA[year].total_expenses
  }));

  // Best and worst months
  const bestMonth = allMonths.reduce((best, curr) => curr.net > best.net ? curr : best);
  const worstMonth = allMonths.reduce((worst, curr) => curr.net < worst.net ? curr : worst);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>P&L Since Inception</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Total Income (2023-2026)"
          value={`$${totalIncome.toFixed(2)}`}
          sublabel="All periods"
          status="positive"
        />
        <KpiCard
          label="Total Expenses (2023-2026)"
          value={`$${totalExpenses.toFixed(2)}`}
          sublabel="All periods"
          status="negative"
        />
        <KpiCard
          label="Cumulative Net"
          value={`$${totalNet.toFixed(2)}`}
          sublabel={totalNet >= 0 ? 'Surplus' : 'Deficit'}
          status={totalNet >= 0 ? 'positive' : 'negative'}
        />
        <KpiCard
          label="Best Month"
          value={bestMonth.month.split(' ').slice(0, 2).join(' ')}
          sublabel={`Net: $${bestMonth.net.toFixed(2)}`}
          status="positive"
        />
        <KpiCard
          label="Worst Month"
          value={worstMonth.month.split(' ').slice(0, 2).join(' ')}
          sublabel={`Net: $${worstMonth.net.toFixed(2)}`}
          status="negative"
        />
        <KpiCard
          label="Avg Monthly Income"
          value={`$${(totalIncome / allMonths.length).toFixed(0)}`}
          sublabel={`${allMonths.length} months`}
          status="neutral"
        />
      </div>

      {/* Year-over-Year Comparison */}
      <ChartCard title="Year-over-Year P&L Comparison" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={incomeByYear}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Legend />
            <Bar dataKey="income" fill={COLORS.positive} />
            <Bar dataKey="expenses" fill={COLORS.negative} />
            <Bar
              dataKey="net"
              fill="transparent"
              shape={<CustomBar />}
            >
              {incomeByYear.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.net >= 0 ? COLORS.positive : COLORS.negative} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Net Income Trend */}
      <ChartCard title="Net Income Trend (All Months)" height={300}>
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
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Area type="monotone" dataKey="net" stroke={COLORS.accent} fillOpacity={1} fill="url(#colorNet)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Monthly Heatmap */}
      <ChartCard title="Monthly Net Income Heatmap" height={250}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '4px',
          padding: '20px'
        }}>
          {allMonths.map((month, idx) => (
            <div
              key={idx}
              style={{
                background: month.net >= 0 ? COLORS.positive : COLORS.negative,
                opacity: Math.min(1, Math.abs(month.net) / 5000),
                borderRadius: '4px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px',
                cursor: 'pointer',
                color: 'white',
                fontSize: '11px',
                fontWeight: '600'
              }}
              title={`${month.month}: $${month.net.toFixed(0)}`}
            >
              <div>${Math.abs(month.net).toFixed(0)}</div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Full Detail Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Detailed Monthly P&L</h3>
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

function CustomBar(props) {
  const { fill, x, y, width, height, data } = props;
  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
}
