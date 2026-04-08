import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import { COLORS, TOTAL_HOUSEHOLDS, WATER_BALANCE } from '../../data/constants';
import { TOTAL_MONTHLY, FULLY_FUNDED_DUES, BREAK_EVEN_DUES } from '../../data/normalizedExpenses';

export default function ProposedSolutions() {
  const [proposedDues, setProposedDues] = useState(225);

  // Solution scenarios
  const solutions = [
    {
      id: 'lump-sum',
      name: 'Lump Sum + Break-Even Dues',
      description: 'One-time special assessment of $468/household + increase dues to $181/month',
      duesIncrease: BREAK_EVEN_DUES,
      specialAssessment: 468,
      timeline: '2 months',
      pros: ['Covers delinquent water debt', 'Dues cover ongoing costs', 'Lowest ongoing expense'],
      cons: ['High upfront cost to residents', 'May burden those with cash flow issues'],
      waterPayoffMonths: (WATER_BALANCE / (16 * 468)).toFixed(1)
    },
    {
      id: 'keep-168',
      name: 'Keep $168 + Renegotiate Expenses',
      description: 'Maintain current dues but reduce expenses through vendor renegotiation',
      duesIncrease: 168,
      specialAssessment: 0,
      timeline: '6 months',
      pros: ['No dues increase burden', 'Improves vendor relationships', 'Seeks operational efficiency'],
      cons: ['Vendors may not agree', 'Risk of service cuts', 'Uncertain timeline'],
      waterPayoffMonths: null
    },
    {
      id: 'phased',
      name: 'Phased Dues Increase',
      description: 'Increase to $200/month immediately, then $225 after 6 months',
      duesIncrease: 200,
      specialAssessment: 234,
      timeline: '6-12 months',
      pros: ['Gradual financial impact', 'Smaller near-term increase', 'Demonstrates progress'],
      cons: ['Prolonged adjustment', 'Requires two approval votes', 'Temporary deficit continues'],
      waterPayoffMonths: ((WATER_BALANCE / (16 * 234)) * 6 + (WATER_BALANCE / (16 * 468)) * 6).toFixed(1)
    },
    {
      id: 'full-fund',
      name: 'Fully Funded Model ($225)',
      description: 'Increase dues to $225/month with small special assessment for delinquent debt',
      duesIncrease: 225,
      specialAssessment: 234,
      timeline: '3 months',
      pros: ['Covers all expenses + 3-mo reserve', 'Highest sustainability', 'Builds financial cushion'],
      cons: ['Largest % increase (34%)', 'May face resident resistance', 'Higher tax burden estimate'],
      waterPayoffMonths: (WATER_BALANCE / (16 * 234)).toFixed(1)
    }
  ];

  const comparisonData = solutions.map(sol => ({
    name: sol.name.split('+')[0].trim(),
    dues: sol.duesIncrease,
    assessment: sol.specialAssessment,
    monthlyChange: sol.duesIncrease - 168
  }));

  const userProposedIncome = proposedDues * TOTAL_HOUSEHOLDS;
  const monthlyShortfall = TOTAL_MONTHLY - userProposedIncome;
  const waterPayoffMonthsCalc = WATER_BALANCE / (monthlyShortfall < 0 ? 1 : monthlyShortfall);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Proposed Solutions</h2>

      <CalloutBox type="info" title="Interactive What-If Analysis">
        <p>Use the controls below to model different dues scenarios and see projected water debt payoff timelines.</p>
      </CalloutBox>

      {/* Interactive Slider */}
      <div style={{
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '12px',
        padding: '24px',
        marginTop: '20px',
        marginBottom: '40px'
      }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Model Your Own Dues Scenario</h3>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: COLORS.navy, fontWeight: '600' }}>Proposed Dues per Household</span>
            <span style={{ fontSize: '20px', fontWeight: '700', color: COLORS.accent }}>
              ${proposedDues} (${(proposedDues - 168).toFixed(0)} increase)
            </span>
          </label>
          <input
            type="range"
            min="150"
            max="300"
            value={proposedDues}
            onChange={(e) => setProposedDues(Number(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '5px',
              background: COLORS.border,
              outline: 'none',
              WebkitAppearance: 'none',
              appearance: 'none'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: COLORS.muted, marginTop: '8px' }}>
            <span>$150</span>
            <span>$181 (Break-even)</span>
            <span>$225 (Full funding)</span>
            <span>$300</span>
          </div>
        </div>

        {/* Preset Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button onClick={() => setProposedDues(181)} style={{
            padding: '8px 16px',
            background: COLORS.accent,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}>Break-Even ($181)</button>
          <button onClick={() => setProposedDues(200)} style={{
            padding: '8px 16px',
            background: COLORS.accent,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}>Phased ($200)</button>
          <button onClick={() => setProposedDues(225)} style={{
            padding: '8px 16px',
            background: COLORS.accent,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}>Full-Funded ($225)</button>
        </div>

        {/* Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{
            background: COLORS.background,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Monthly Income</p>
            <p style={{ color: COLORS.navy, fontSize: '24px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
              ${userProposedIncome.toFixed(2)}
            </p>
          </div>
          <div style={{
            background: COLORS.background,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Monthly Shortfall</p>
            <p style={{
              color: monthlyShortfall > 0 ? COLORS.negative : COLORS.positive,
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              fontVariantNumeric: 'tabular-nums'
            }}>
              {monthlyShortfall > 0 ? '-' : '+'} ${Math.abs(monthlyShortfall).toFixed(2)}
            </p>
          </div>
          <div style={{
            background: COLORS.background,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Water Debt Payoff</p>
            <p style={{
              color: monthlyShortfall < 0 ? COLORS.positive : COLORS.warning,
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              fontVariantNumeric: 'tabular-nums'
            }}>
              {monthlyShortfall < 0 ? Math.ceil(waterPayoffMonthsCalc) : '∞'} months
            </p>
          </div>
        </div>
      </div>

      {/* Solution Comparison Chart */}
      <ChartCard title="Dues & Special Assessment Comparison" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Legend />
            <Bar dataKey="dues" fill={COLORS.accent} />
            <Bar dataKey="assessment" fill={COLORS.warning} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Solution Cards */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Five Proposed Solutions</h3>
        <div style={{ display: 'grid', gap: '20px' }}>
          {solutions.map(solution => (
            <div
              key={solution.id}
              style={{
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: '20px'
              }}
            >
              <h4 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '15px' }}>
                {solution.name}
              </h4>
              <p style={{ color: COLORS.muted, fontSize: '13px', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                {solution.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Dues Increase</p>
                  <p style={{ color: COLORS.navy, fontSize: '18px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                    +${(solution.duesIncrease - 168).toFixed(0)}
                  </p>
                </div>
                <div>
                  <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Special Assessment</p>
                  <p style={{ color: COLORS.navy, fontSize: '18px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                    ${solution.specialAssessment.toFixed(0)}/household
                  </p>
                </div>
                <div>
                  <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Timeline</p>
                  <p style={{ color: COLORS.navy, fontSize: '18px', fontWeight: '700', margin: 0 }}>
                    {solution.timeline}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <p style={{ color: COLORS.positive, fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0' }}>Advantages</p>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '12px', lineHeight: '1.6' }}>
                    {solution.pros.map((pro, idx) => <li key={idx}>{pro}</li>)}
                  </ul>
                </div>
                <div>
                  <p style={{ color: COLORS.negative, fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0' }}>Challenges</p>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '12px', lineHeight: '1.6' }}>
                    {solution.cons.map((con, idx) => <li key={idx}>{con}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <CalloutBox type="info" title="Recommended Path: Phased Dues Increase + Special Assessment">
        <p><strong>Rationale:</strong> The Phased approach balances financial sustainability with resident acceptance. Increase to $200/month immediately solves 80% of the shortfall, then move to $225 after 6 months once residents see budget stability improving. Pair with a smaller special assessment (~$234) to address water debt without overwhelming households.</p>
      </CalloutBox>

      <div style={{
        marginTop: '40px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
        fontSize: '13px',
        color: COLORS.muted
      }}>
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Normalized expense analysis, Financial projections</p>
      </div>
    </div>
  );
}
