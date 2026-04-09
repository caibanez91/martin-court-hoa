import { useState } from 'react';
import CalloutBox from '../CalloutBox';
import { COLORS, TOTAL_HOUSEHOLDS, WATER_BALANCE, WATER_PER_HOUSEHOLD, fmt, fmtShort } from '../../data/constants';
import { TOTAL_MONTHLY, BREAK_EVEN_DUES, PER_HOUSEHOLD_MONTHLY } from '../../data/normalizedExpenses';

export default function ProposedSolutions() {
  const [proposedDues, setProposedDues] = useState(BREAK_EVEN_DUES);

  const lumpSumPerHousehold = WATER_PER_HOUSEHOLD; // $468.14 actual consumption only
  const waterOptionA = 78; // +$78/mo for 6 months
  const waterOptionB = 58; // +$58/mo for 8 months

  const solutions = [
    {
      id: 'sol-1',
      number: 1,
      name: 'Lump Sum + Dues Increase to Break-Even',
      details: [
        `One-time lump sum payment of ${fmt(lumpSumPerHousehold)} per household (actual consumption only, no late fees/penalties).`,
        `Increase dues to ${fmt(BREAK_EVEN_DUES)} (calculated break-even: ${fmt(PER_HOUSEHOLD_MONTHLY)}/household/month).`,
        'Special projects funded via separate one-time community assessments.',
        'Assumes current service pricing — no new bids requested.'
      ],
      pros: [
        'Clears water debt immediately',
        'Dues cover all ongoing normalized expenses',
        'Simplest ongoing model — no renegotiations needed',
        'Lowest recurring dues among increase options'
      ],
      cons: [
        `High upfront cost: ${fmt(lumpSumPerHousehold)} per household`,
        'May burden households with cash flow constraints',
        'Does not build reserve fund',
        'No cost optimization from competitive bidding'
      ]
    },
    {
      id: 'sol-2',
      number: 2,
      name: 'Keep Dues at $168, Renegotiate Contracts',
      details: [
        'Keep dues at $168/month.',
        `One-time lump sum payment of ${fmt(lumpSumPerHousehold)} per household (actual consumption only).`,
        'Competitive bids: Property Management, Trash, Landscaping, Bank Fees, Insurance, Professional Fees.',
        'Use reserves as interim buffer — do not deploy permanently.',
        'Target: end of Q2 community meeting to reassess new dues.'
      ],
      pros: [
        'No monthly dues increase for residents',
        'Potential savings from competitive bidding (est. $2,000-$3,500/year)',
        'Forces vendor accountability and market-rate pricing',
        'Preserves reserves as buffer during transition'
      ],
      cons: [
        `Still requires ${fmt(lumpSumPerHousehold)} lump sum per household`,
        'Vendors may not agree to lower rates',
        'Risk of service disruption during transitions',
        '$168 still does not cover normalized costs — deficit continues until bids reduce expenses',
        'Reserves depleting during negotiation period'
      ]
    },
    {
      id: 'sol-3',
      number: 3,
      name: 'Dues Increase + Monthly Water Payments',
      details: [
        `Increase dues to break-even (${fmt(BREAK_EVEN_DUES)}) immediately.`,
        'At end of Q2 community meeting, reassess dues based on new budget from renegotiated contracts.',
        `Option A: +${fmt(waterOptionA)}/month for 6 months to cover water balance (${fmt(BREAK_EVEN_DUES + waterOptionA)}/month total).`,
        `Option B: +${fmt(waterOptionB)}/month for 8 months to cover water balance (${fmt(BREAK_EVEN_DUES + waterOptionB)}/month total).`,
        'Competitive bids: Property Management, Trash, Landscaping, Bank Fees, Insurance, Professional Fees.',
        'Advantage: Reserves fully preserved.'
      ],
      pros: [
        'No large lump sum — water debt spread over monthly payments',
        'Reserves fully preserved for emergencies',
        'Competitive bidding may lower future dues',
        'Q2 reassessment allows data-driven adjustment'
      ],
      cons: [
        `Higher monthly dues during payoff period (${fmt(BREAK_EVEN_DUES + waterOptionA)} or ${fmt(BREAK_EVEN_DUES + waterOptionB)})`,
        'Residents pay more per month than Solution 1 during payoff',
        'Requires sustained community commitment to payoff schedule',
        'Two-phase approach requires another vote at Q2 meeting'
      ]
    }
  ];

  const userProposedIncome = proposedDues * TOTAL_HOUSEHOLDS;
  const monthlyShortfall = TOTAL_MONTHLY - userProposedIncome;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '8px' }}>Proposed Solutions</h2>
      <p style={{ color: COLORS.muted, fontSize: '14px', marginBottom: '20px' }}>
        Three scenarios to address the budget deficit and water debt — each with different trade-offs for the community
      </p>

      <CalloutBox type="info" title="Interactive What-If Analysis">
        <p>Use the slider below to model different dues levels and see how they impact monthly cash flow.</p>
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
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Model Your Own Dues Scenario</h3>
        <p style={{ color: COLORS.muted, fontSize: '13px', marginBottom: '16px' }}>
          Adjust the slider to test different dues levels against normalized monthly expenses of {fmt(TOTAL_MONTHLY)}
        </p>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: COLORS.navy, fontWeight: '600' }}>Proposed Dues per Household</span>
            <span style={{ fontSize: '20px', fontWeight: '700', color: COLORS.accent }}>
              {fmt(proposedDues)} ({fmt(proposedDues - 168)} increase)
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
            <span>${BREAK_EVEN_DUES} (Break-even)</span>
            <span>$225 (Full funding)</span>
            <span>$300</span>
          </div>
        </div>

        {/* Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ background: COLORS.background, padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Monthly Income (16 households)</p>
            <p style={{ color: COLORS.navy, fontSize: '24px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
              {fmt(userProposedIncome)}
            </p>
          </div>
          <div style={{ background: COLORS.background, padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Monthly Surplus / Shortfall</p>
            <p style={{
              color: monthlyShortfall > 0 ? COLORS.negative : COLORS.positive,
              fontSize: '24px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums'
            }}>
              {monthlyShortfall > 0 ? '-' : '+'}{fmt(Math.abs(monthlyShortfall))}
            </p>
          </div>
          <div style={{ background: COLORS.background, padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Outstanding Water Debt</p>
            <p style={{ color: COLORS.negative, fontSize: '24px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
              {fmt(WATER_BALANCE)}
            </p>
          </div>
        </div>
      </div>

      {/* Solution Cards */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Three Proposed Solutions</h3>
        <div style={{ display: 'grid', gap: '24px' }}>
          {solutions.map(solution => (
            <div
              key={solution.id}
              style={{
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: '24px',
                borderTop: `4px solid ${COLORS.accent}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{
                  background: COLORS.accent,
                  color: 'white',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>{solution.number}</span>
                <h4 style={{ color: COLORS.navy, margin: 0, fontSize: '16px' }}>
                  {solution.name}
                </h4>
              </div>

              {/* Details */}
              <div style={{
                background: COLORS.background,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <ul style={{ margin: 0, paddingLeft: '18px', color: COLORS.navy, fontSize: '13px', lineHeight: '1.8' }}>
                  {solution.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ color: COLORS.positive, fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0' }}>Advantages</p>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '12px', lineHeight: '1.7' }}>
                    {solution.pros.map((pro, idx) => <li key={idx}>{pro}</li>)}
                  </ul>
                </div>
                <div>
                  <p style={{ color: COLORS.negative, fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0' }}>Challenges</p>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: COLORS.muted, fontSize: '12px', lineHeight: '1.7' }}>
                    {solution.cons.map((con, idx) => <li key={idx}>{con}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <CalloutBox type="info" title="Recommended Path: Solution 3 — Dues Increase + Monthly Water Payments">
        <p><strong>Rationale:</strong> Solution 3 offers the most balanced path forward. It immediately addresses the operational deficit by raising dues to break-even ({fmt(BREAK_EVEN_DUES)}), spreads the water debt across manageable monthly payments (Option A: {fmt(waterOptionA)}/month for 6 months or Option B: {fmt(waterOptionB)}/month for 8 months), and fully preserves reserves for emergencies. Combined with competitive bidding on all vendor contracts, this positions the community to potentially <em>lower</em> dues at the end-of-Q2 meeting once new contract rates are secured. No lump sum required.</p>
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
