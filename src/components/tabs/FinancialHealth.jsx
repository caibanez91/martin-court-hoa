import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import StatusBadge from '../StatusBadge';
import { COLORS, MONTHLY_DUES, TOTAL_HOUSEHOLDS } from '../../data/constants';
import { PL_DATA } from '../../data/plData';
import { NORMALIZED_MONTHLY, TOTAL_MONTHLY, PER_HOUSEHOLD_MONTHLY } from '../../data/normalizedExpenses';

export default function FinancialHealth() {
  const [selectedYear, setSelectedYear] = useState(2025);

  const q12026Data = [
    { month: 'January', income: 2352, expenses: 1819.98 },
    { month: 'February', income: 2688, expenses: 2504.20 },
    { month: 'March', income: 2520, expenses: 6765.30 }
  ];

  const monthlyData2025 = PL_DATA[2025].months.map((month, idx) => ({
    month,
    income: PL_DATA[2025].income[idx],
    expenses: Object.values(PL_DATA[2025].expenses).reduce((sum, arr) => sum + arr[idx], 0)
  }));

  const yearData = [
    { year: '2023', income: 8652, expenses: 2102.16, net: 6549.84 },
    { year: '2024', income: 28560, expenses: 19796.42, net: 8763.58 },
    { year: '2025', income: 33768, expenses: 43130.84, net: -9362.84 }
  ];

  const cashProjection = [
    { month: 'Jan', balance: 6410 },
    { month: 'Feb', balance: 6598 },
    { month: 'Mar', balance: 2353 },
    { month: 'Apr', balance: 4845 },
    { month: 'May', balance: 4500 },
    { month: 'Jun', balance: 3200 }
  ];

  const expenseCategories = NORMALIZED_MONTHLY.map(item => ({
    name: item.category.split(' (')[0],
    value: item.monthly
  }));

  const duesCollectionData = [
    { household: 'Household A', amount: 336, status: 'Paid', date: '2026-04-01' },
    { household: 'Household B', amount: 168, status: 'Delinquent', date: 'Unknown' },
    { household: 'Household C', amount: 504, status: 'Delinquent', date: 'Unknown' },
    { household: 'Household D', amount: 318, status: 'Delinquent', date: 'Unknown' }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Financial Health</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="2025 Total Income"
          value="$33,768"
          sublabel="12 months"
          status="positive"
        />
        <KpiCard
          label="2025 Total Expenses"
          value="$43,131"
          sublabel="12 months"
          status="negative"
        />
        <KpiCard
          label="2025 Net Result"
          value="-$9,363"
          sublabel="Deficit"
          status="negative"
        />
        <KpiCard
          label="Avg Monthly Income"
          value={`$${(33768 / 12).toFixed(0)}`}
          sublabel="2025 average"
          status="neutral"
        />
        <KpiCard
          label="Actual Monthly Costs"
          value={`$${TOTAL_MONTHLY.toFixed(2)}`}
          sublabel={`Per household: $${PER_HOUSEHOLD_MONTHLY.toFixed(2)}`}
          status="warning"
        />
      </div>

      {/* Q1 2026 Income vs Expenses */}
      <ChartCard title="Q1 2026: Income vs Expenses" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={q12026Data}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="income" fill={COLORS.positive} />
            <Bar dataKey="expenses" fill={COLORS.negative} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 2025 Monthly Trend */}
      <ChartCard title="2025 Monthly Income & Expenses" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData2025}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke={COLORS.positive} strokeWidth={2} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke={COLORS.negative} strokeWidth={2} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Year-over-Year */}
      <ChartCard title="Year-over-Year Net Income" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yearData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Bar dataKey="net">
              {yearData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.net >= 0 ? COLORS.positive : COLORS.negative} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Cash Balance Projection */}
      <ChartCard title="Cash Balance Projection (April - June 2026)" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cashProjection}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Line type="monotone" dataKey="balance" stroke={COLORS.navy} strokeWidth={2} />
            <ReferenceLine y={0} stroke={COLORS.negative} strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Expense Breakdown by Category */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <ChartCard title="Monthly Expenses by Category" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[COLORS.accent, COLORS.positive, COLORS.warning, COLORS.negative][index % 4]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <div>
          <h4 style={{ color: COLORS.navy, marginBottom: '16px' }}>Expense Summary</h4>
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            {NORMALIZED_MONTHLY.slice(0, 5).map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: idx < 4 ? `1px solid ${COLORS.border}` : 'none',
                fontSize: '13px'
              }}>
                <span style={{ color: COLORS.muted }}>{item.category}</span>
                <span style={{ fontWeight: '600', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                  ${item.monthly.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dues Collection Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Dues Collection Status</h3>
        <div style={{
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px'
          }}>
            <thead>
              <tr style={{ background: COLORS.tableHeader, borderBottom: `1px solid ${COLORS.border}` }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: COLORS.navy }}>Household</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>Amount Owed</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: COLORS.navy }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: COLORS.navy }}>Last Payment</th>
              </tr>
            </thead>
            <tbody>
              {duesCollectionData.map((row, idx) => (
                <tr key={idx} style={{
                  background: idx % 2 === 0 ? COLORS.cardBg : COLORS.background,
                  borderBottom: `1px solid ${COLORS.border}`
                }}>
                  <td style={{ padding: '12px', color: COLORS.navy }}>{row.household}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    ${row.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <StatusBadge
                      status={row.status === 'Paid' ? 'success' : 'danger'}
                      label={row.status}
                    />
                  </td>
                  <td style={{ padding: '12px', color: COLORS.muted }}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CalloutBox type="warning" title="Key Finding">
        <p>Even with improved income collection in 2024-2025, monthly expenses consistently exceed income. A dues increase or expense reduction is necessary to achieve financial stability.</p>
      </CalloutBox>

      <div style={{
        marginTop: '40px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
        fontSize: '13px',
        color: COLORS.muted
      }}>
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Bank statements, Normalized expense analysis</p>
      </div>
    </div>
  );
}
