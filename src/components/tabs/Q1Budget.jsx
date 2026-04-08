import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import StatusBadge from '../StatusBadge';
import { COLORS } from '../../data/constants';

export default function Q1Budget() {
  const q1Data = [
    { month: 'January', budget: 2400, actual: 1819.98, variance: 580.02 },
    { month: 'February', budget: 2400, actual: 2504.20, variance: -104.20 },
    { month: 'March', budget: 2400, actual: 6765.30, variance: -4365.30 }
  ];

  const categoryData = [
    { category: 'Water', budget: 400, actual: 414.10, status: 'warning', variance: -14.10 },
    { category: 'Property Mgmt (LLA)', budget: 525, actual: 525, status: 'success', variance: 0 },
    { category: 'Trash (Texas Pride)', budget: 480, actual: 486.87, status: 'warning', variance: -6.87 },
    { category: 'Landscaping (St. Clair)', budget: 400, actual: 476.30, status: 'danger', variance: -76.30 },
    { category: 'Insurance', budget: 200, actual: 623.30, status: 'danger', variance: -423.30 },
    { category: 'Bank & Processing Fees', budget: 90, actual: 89.13, status: 'success', variance: 0.87 },
    { category: 'Professional Fees', budget: 100, actual: 200, status: 'danger', variance: -100 },
    { category: 'Repairs & Maintenance', budget: 200, actual: 0, status: 'success', variance: 200 },
    { category: 'Electricity', budget: 15, actual: 12.27, status: 'success', variance: 2.73 }
  ];

  const totalBudget = q1Data.reduce((sum, m) => sum + m.budget, 0);
  const totalActual = q1Data.reduce((sum, m) => sum + m.actual, 0);
  const totalVariance = totalBudget - totalActual;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Q1 2026 Budget vs Actual</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Q1 Total Budget"
          value={`$${totalBudget.toFixed(2)}`}
          sublabel="3 months"
          status="neutral"
        />
        <KpiCard
          label="Q1 Actual Spending"
          value={`$${totalActual.toFixed(2)}`}
          sublabel="3 months"
          status={totalVariance >= 0 ? 'positive' : 'negative'}
        />
        <KpiCard
          label="Budget Variance"
          value={`$${Math.abs(totalVariance).toFixed(2)}`}
          sublabel={totalVariance >= 0 ? 'Under budget' : 'Over budget'}
          status={totalVariance >= 0 ? 'positive' : 'negative'}
        />
        <KpiCard
          label="Avg Monthly Budget"
          value={`$${(totalBudget / 3).toFixed(2)}`}
          sublabel="Per month target"
          status="neutral"
        />
      </div>

      {/* Budget vs Actual Chart */}
      <ChartCard title="Monthly Budget vs Actual Spending" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={q1Data}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="budget" fill={COLORS.accent} name="Budget" />
            <Bar dataKey="actual" fill={COLORS.negative} name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Category Breakdown Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Q1 Budget by Category</h3>
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
                    ${row.budget.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', color: COLORS.navy, fontVariantNumeric: 'tabular-nums' }}>
                    ${row.actual.toFixed(2)}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    color: row.variance >= 0 ? COLORS.positive : COLORS.negative,
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: '600'
                  }}>
                    {row.variance >= 0 ? '+' : ''} ${row.variance.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <StatusBadge status={row.status} label={row.status === 'success' ? 'On Track' : row.status === 'warning' ? 'Minor Variance' : 'Over Budget'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Variance Analysis */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Variance Analysis & Notes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h4 style={{ color: COLORS.negative, fontSize: '14px', margin: '0 0 8px 0' }}>Major Overages</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '13px', lineHeight: '1.6' }}>
              <li><strong>Insurance (Jan):</strong> $623.30 annual premium paid in January; budget spread across months</li>
              <li><strong>Professional Fees (Mar):</strong> $200 additional legal/consulting work beyond budget</li>
              <li><strong>Landscaping (Mar):</strong> $627.86 vs $400 budgeted; seasonal spring work</li>
            </ul>
          </div>
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h4 style={{ color: COLORS.positive, fontSize: '14px', margin: '0 0 8px 0' }}>Good News</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '13px', lineHeight: '1.6' }}>
              <li><strong>Processing Fees:</strong> Minimal fees; only $89.13 vs $90 budgeted</li>
              <li><strong>Electricity:</strong> $12.27 actual vs $15 budgeted</li>
              <li><strong>Repairs & Maintenance:</strong> No emergency repairs needed YTD</li>
            </ul>
          </div>
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h4 style={{ color: COLORS.warning, fontSize: '14px', margin: '0 0 8px 0' }}>Key Observations</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '13px', lineHeight: '1.6' }}>
              <li><strong>March Spike:</strong> Water and landscaping expenses drove Q1 over budget</li>
              <li><strong>Seasonal Pattern:</strong> Spring landscaping and water usage increase typical</li>
              <li><strong>Budget Revision Recommended:</strong> Consider adjusting annual budget based on actual Q1</li>
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
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Bank statements, Monthly reconciliation</p>
      </div>
    </div>
  );
}
