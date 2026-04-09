import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import StatusBadge from '../StatusBadge';
import { COLORS, fmt, fmtShort } from '../../data/constants';

export default function Q1Budget() {
  // Q1 2026 Corrected Monthly Data
  // Budget = normalized monthly ($3,003.20), Actual = from verified P&L
  const q1Data = [
    { month: 'January', budget: 3003.20, actual: 1641.88, variance: 1361.32 },
    { month: 'February', budget: 3003.20, actual: 3004.93, variance: -1.73 },
    { month: 'March', budget: 3003.20, actual: 5128.49, variance: -2125.29 }
  ];

  // Q1 Budget by Category (from verified P&L)
  const categoryData = [
    { category: 'Water', budget: 3600.00, actual: 4193.10, variance: -593.10, status: 'danger' },
    { category: 'Property Mgmt (LLA)', budget: 1575.00, actual: 1575.00, variance: 0, status: 'success' },
    { category: 'Trash (Texas Pride)*', budget: 1447.23, actual: 973.74, variance: 473.49, status: 'warning', note: 'Jan payment made in Dec 2025' },
    { category: 'Landscaping (St. Clair)', budget: 1301.73, actual: 1428.92, variance: -127.19, status: 'warning' },
    { category: 'Insurance', budget: 515.25, actual: 623.30, variance: -108.05, status: 'warning' },
    { category: 'Bank & Processing Fees', budget: 282.93, actual: 257.43, variance: 25.50, status: 'success' },
    { category: 'Professional Fees', budget: 84.27, actual: 200.00, variance: -115.73, status: 'danger' },
    { category: 'Repairs & Maintenance', budget: 96.24, actual: 0, variance: 96.24, status: 'success' },
    { category: 'Gate Maintenance', budget: 62.49, actual: 0, variance: 62.49, status: 'success' },
    { category: 'Electricity', budget: 37.92, actual: 37.81, variance: 0.11, status: 'success' },
    { category: 'Property Tax', budget: 6.54, actual: 0, variance: 6.54, status: 'success' },
    { category: 'Violations', budget: 0, actual: 486.00, variance: -486.00, status: 'danger' }
  ];

  const totalBudget = q1Data.reduce((sum, m) => sum + m.budget, 0);
  const totalActual = q1Data.reduce((sum, m) => sum + m.actual, 0);
  const totalVariance = totalBudget - totalActual;

  const getStatusLabel = (status) => {
    return status === 'success' ? 'On Track' : status === 'warning' ? 'Minor Variance' : 'Over Budget';
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '8px' }}>Q1 2026 Budget vs Actual</h2>
      <p style={{ margin: '0 0 20px 0', color: COLORS.muted, fontSize: '14px' }}>Verified P&L Report | January - March 2026</p>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Q1 Total Budget"
          value={fmt(totalBudget)}
          sublabel="3 months (normalized monthly basis)"
          status="neutral"
        />
        <KpiCard
          label="Q1 Actual Spending"
          value={fmt(totalActual)}
          sublabel="3 months (verified actuals)"
          status={totalVariance >= 0 ? 'positive' : 'negative'}
        />
        <KpiCard
          label="Budget Variance"
          value={fmt(Math.abs(totalVariance))}
          sublabel={totalVariance >= 0 ? 'Under budget' : 'Over budget'}
          status={totalVariance >= 0 ? 'positive' : 'negative'}
        />
        <KpiCard
          label="Variance %"
          value={`${((totalVariance / totalBudget) * 100).toFixed(1)}%`}
          sublabel={totalVariance >= 0 ? 'Favorable' : 'Unfavorable'}
          status={totalVariance >= 0 ? 'positive' : 'negative'}
        />
      </div>

      {/* Budget vs Actual Chart */}
      <ChartCard title="Monthly Budget vs Actual Spending" subtitle="Q1 2026 Comparison">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={q1Data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => fmtShort(v)} />
            <Tooltip
              formatter={(value) => fmt(value)}
              contentStyle={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}
            />
            <Legend />
            <Bar dataKey="budget" fill={COLORS.accent} name="Budget (Normalized)" />
            <Bar dataKey="actual" fill={COLORS.negative} name="Actual (P&L)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Category Breakdown Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Q1 Budget by Category</h3>
        <p style={{ margin: '0 0 16px 0', color: COLORS.muted, fontSize: '14px' }}>Budget represents 3x normalized monthly allocation; Actual from verified P&L report</p>
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
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: COLORS.navy }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>Budget</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>Actual</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: COLORS.navy }}>Variance</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: COLORS.navy }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((row, idx) => (
                <tr key={idx} style={{
                  background: idx % 2 === 0 ? COLORS.cardBg : COLORS.background,
                  borderBottom: `1px solid ${COLORS.border}`
                }}>
                  <td style={{ padding: '12px', color: COLORS.navy }}>{row.category}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(row.budget)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(row.actual)}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    color: row.variance >= 0 ? COLORS.positive : COLORS.negative,
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: '600'
                  }}>
                    {row.variance >= 0 ? '+' : ''} {fmt(row.variance)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <StatusBadge status={row.status} label={getStatusLabel(row.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Variance Analysis */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Variance Analysis & Key Insights</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h4 style={{ color: COLORS.negative, fontSize: '14px', margin: '0 0 8px 0' }}>Major Overages (Over Budget)</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '13px', lineHeight: '1.6' }}>
              <li><strong>Violations:</strong> {fmt(486)} unexpected HOA violation charges in March</li>
              <li><strong>Water:</strong> {fmt(593.10)} overage; seasonal demand and usage increase</li>
              <li><strong>Professional Fees:</strong> {fmt(115.73)} additional legal/consulting beyond budget</li>
              <li><strong>Landscaping:</strong> {fmt(127.19)} overage; spring maintenance work exceeded allocation</li>
            </ul>
          </div>
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h4 style={{ color: COLORS.positive, fontSize: '14px', margin: '0 0 8px 0' }}>Budget Favorable Items (Under Budget)</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '13px', lineHeight: '1.6' }}>
              <li><strong>Trash Service*:</strong> {fmt(473.49)} apparent savings, but January payment was made in December 2025 — variance is a timing artifact, not actual savings</li>
              <li><strong>Bank Fees:</strong> {fmt(25.50)} favorable; minimal processing charges</li>
              <li><strong>Repairs & Maintenance:</strong> {fmt(96.24)} unused; no emergency repairs needed YTD</li>
              <li><strong>Gate Maintenance:</strong> {fmt(62.49)} unused; no gate repairs required</li>
            </ul>
          </div>
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h4 style={{ color: COLORS.warning, fontSize: '14px', margin: '0 0 8px 0' }}>Summary & Recommendations</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '13px', lineHeight: '1.6' }}>
              <li><strong>Overall Status:</strong> Q1 actual spending {fmt(totalActual)} vs normalized budget {fmt(totalBudget)}</li>
              <li><strong>March Spike:</strong> Water and landscaping drove seasonal variance; expect similar patterns in spring</li>
              <li><strong>Violation Impact:</strong> {fmt(486)} unexpected violation charge requires investigation</li>
              <li><strong>Recommendation:</strong> Adjust annual water & landscaping budgets based on Q1 actuals</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
        fontSize: '13px',
        color: COLORS.muted
      }}>
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Verified P&L Report | Q1 2026 Actual Expenses</p>
      </div>
    </div>
  );
}
