import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import StatusBadge from '../StatusBadge';
import { COLORS, TOTAL_HOUSEHOLDS, DELINQUENT_ACCOUNTS, fmt, fmtShort } from '../../data/constants';
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

  const expenseChartData = NORMALIZED_MONTHLY.map(item => ({
    category: item.category.split(' (')[0],
    monthly: item.monthly
  }));

  const duesCollectionData = [
    { household: 'Household 1', current: 162, days1_30: 168, days31_60: 168, days61_90: 168, total: 666 },
    { household: 'Household 2', current: 162, days1_30: 168, days31_60: 168, days61_90: 0, total: 498 },
    { household: 'Household 3', current: 162, days1_30: 0, days31_60: 0, days61_90: 0, total: 162 }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Financial Health</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="2025 Total Income"
          value={fmt(33768)}
          sublabel=""
          status="positive"
        />
        <KpiCard
          label="2025 Total Expenses"
          value={fmt(43130.84)}
          sublabel=""
          status="negative"
        />
        <KpiCard
          label="2025 Net Result"
          value={fmt(-9362.84)}
          sublabel="Deficit"
          status="negative"
        />
        <KpiCard
          label="Actual Monthly Costs"
          value={fmt(TOTAL_MONTHLY)}
          sublabel={`${fmt(PER_HOUSEHOLD_MONTHLY)} per household`}
          status="warning"
        />
      </div>

      {/* Q1 2026 Income vs Expenses */}
      <ChartCard
        title="Q1 2026: Income vs Expenses"
        subtitle="Monthly comparison of revenue collected and expenses incurred"
        height={300}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={q12026Data}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => fmtShort(v)} />
            <Tooltip formatter={(value) => fmt(value)} />
            <Legend />
            <Bar dataKey="income" fill={COLORS.positive} />
            <Bar dataKey="expenses" fill={COLORS.negative} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 2025 Monthly Trend */}
      <ChartCard
        title="2025 Monthly Income & Expenses"
        subtitle="Trend analysis showing the seasonal pattern and persistent expense-to-income gap"
        height={300}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData2025}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => fmtShort(v)} />
            <Tooltip formatter={(value) => fmtShort(value)} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke={COLORS.positive} strokeWidth={2} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke={COLORS.negative} strokeWidth={2} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Year-over-Year Net Income */}
      <ChartCard
        title="Year-over-Year Net Income"
        subtitle="Annual net income shows the HOA's financial trajectory"
        height={300}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yearData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(v) => fmtShort(v)} />
            <Tooltip formatter={(value) => fmtShort(value)} />
            <Bar dataKey="net">
              {yearData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.net >= 0 ? COLORS.positive : COLORS.negative} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Monthly Expenses by Category */}
      <ChartCard
        title="Monthly Expenses by Category"
        subtitle="Normalized monthly cost by category based on 2025 actuals and verified contract rates"
        height={400}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={expenseChartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis type="number" tickFormatter={(v) => fmtShort(v)} />
            <YAxis dataKey="category" type="category" width={195} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => fmt(value)} />
            <Bar dataKey="monthly" fill={COLORS.accent} radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Expense Summary */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ color: COLORS.navy, margin: '0 0 4px 0' }}>Expense Summary</h3>
          <p style={{ color: COLORS.muted, fontSize: '13px', margin: 0 }}>All 11 normalized monthly categories</p>
        </div>
        <div style={{
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '12px',
          padding: '0',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px'
          }}>
            <tbody>
              {NORMALIZED_MONTHLY.map((item, idx) => (
                <tr key={idx} style={{
                  borderBottom: idx < NORMALIZED_MONTHLY.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                  background: idx % 2 === 0 ? COLORS.cardBg : COLORS.background
                }}>
                  <td style={{
                    padding: '12px 16px',
                    color: COLORS.navy,
                    fontWeight: '500'
                  }}>
                    {item.category}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    textAlign: 'right',
                    color: COLORS.navy,
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: '600'
                  }}>
                    {fmt(item.monthly)}
                  </td>
                </tr>
              ))}
              <tr style={{
                background: COLORS.navy,
                fontWeight: '700'
              }}>
                <td style={{
                  padding: '12px 16px',
                  color: 'white'
                }}>
                  Total Monthly
                </td>
                <td style={{
                  padding: '12px 16px',
                  textAlign: 'right',
                  color: 'white',
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {fmt(TOTAL_MONTHLY)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dues Collection Status Table */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ color: COLORS.navy, margin: '0 0 4px 0' }}>Dues Collection Status</h3>
          <p style={{ color: COLORS.muted, fontSize: '13px', margin: 0 }}>Based on AR Aging Report as of March 31, 2026</p>
        </div>
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
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: COLORS.navy }}>Household</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>Current</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>1-30 Days</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>31-60 Days</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>61-90 Days</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {duesCollectionData.map((row, idx) => (
                <tr key={idx} style={{
                  background: idx % 2 === 0 ? COLORS.cardBg : COLORS.background,
                  borderBottom: `1px solid ${COLORS.border}`
                }}>
                  <td style={{ padding: '12px 16px', color: COLORS.navy, fontWeight: '500' }}>
                    {row.household}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(row.current)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(row.days1_30)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(row.days31_60)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: row.days61_90 > 0 ? COLORS.negative : COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(row.days61_90)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums', fontWeight: '600' }}>
                    {fmt(row.total)}
                  </td>
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
