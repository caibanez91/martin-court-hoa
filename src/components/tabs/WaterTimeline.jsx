import KpiCard from '../KpiCard';
import CalloutBox from '../CalloutBox';
import { COLORS, WATER_BALANCE, WATER_PER_HOUSEHOLD, fmt, fmtShort } from '../../data/constants';
import { WATER_BILLS, WATER_TIMELINE_EVENTS } from '../../data/waterBills';

export default function WaterTimeline() {
  // Calculate average from single-month billing periods only (most accurate monthly cost)
  // Single-month bills: Mar 2024 ($1,545.44), Apr 2024 ($1,331.52), May 2024 ($1,223.42),
  // Jun 2024 ($1,332.62), Feb 2026 ($1,204.41)
  const singleMonthBills = WATER_BILLS.filter(b => b.type === 'Monthly');
  const avgMonthlyBill = singleMonthBills.length > 0
    ? singleMonthBills.reduce((sum, b) => sum + b.amount, 0) / singleMonthBills.length
    : 0;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '8px' }}>Water Bill Timeline & Crisis Resolution</h2>
      <p style={{ color: COLORS.muted, margin: '0 0 20px 0', fontSize: '13px' }}>Understanding the billing crisis, its root cause, and the path to resolution</p>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Delinquent Water Balance"
          value={fmt(WATER_BALANCE)}
          sublabel="Owed to City of Houston"
          status="negative"
        />
        <KpiCard
          label="Per Household Debt"
          value={fmt(WATER_PER_HOUSEHOLD)}
          sublabel="16 households"
          status="negative"
        />
        <KpiCard
          label="Bills Issued"
          value={WATER_BILLS.length}
          sublabel="Since account setup"
          status="neutral"
        />
        <KpiCard
          label="Avg Monthly Bill"
          value={fmt(avgMonthlyBill)}
          sublabel="Based on 5 single-month billing periods"
          status="warning"
        />
      </div>

      {/* Timeline Events */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Crisis Timeline & Resolution</h3>
        <p style={{ color: COLORS.muted, marginBottom: '16px', fontSize: '13px' }}>Key dates and events in the water billing crisis and recovery</p>
        <div style={{ display: 'grid', gap: '16px' }}>
          {WATER_TIMELINE_EVENTS.map((event, idx) => (
            <div
              key={idx}
              style={{
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: '16px',
                borderLeft: `4px solid ${COLORS.accent}`,
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '16px'
              }}
            >
              <div style={{ minWidth: '120px' }}>
                <p style={{ fontSize: '14px', fontWeight: '700', color: COLORS.accent, margin: 0 }}>
                  {event.date}
                </p>
              </div>
              <div>
                <h4 style={{ color: COLORS.navy, margin: '0 0 6px 0', fontSize: '14px' }}>
                  {event.event}
                </h4>
                <p style={{ color: COLORS.muted, margin: 0, fontSize: '13px', lineHeight: '1.5' }}>
                  {event.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Root Cause Analysis */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Root Cause Analysis</h3>
        <p style={{ color: COLORS.muted, marginBottom: '16px', fontSize: '13px' }}>Understanding what led to the crisis and how it was resolved</p>
        <CalloutBox type="info" title="Key Finding: NOT a Leak or Overage">
          <p><strong>The water crisis was NOT caused by a leak or abnormal usage.</strong> The issue was administrative:</p>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px' }}>
            <li>FEIN (Federal Employer ID Number) on file prevented the City of Houston from updating HOA's mailing address</li>
            <li>This administrative barrier meant invoices could not be sent to the correct address</li>
            <li>For ~11 months (Jul 2024 - May 2025), no invoices were issued despite normal water service</li>
            <li>Water was being used normally during this period; meters were functioning</li>
          </ul>
        </CalloutBox>

        <CalloutBox type="success" title="Resolution Achieved">
          <p>By January 2026, the issue was fully resolved:</p>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px' }}>
            <li>City updated address after second request in December 2025</li>
            <li>Regular monthly invoicing resumed</li>
            <li>Delinquent balance is being paid through arrangement with City of Houston</li>
            <li>No ongoing water crisis; issue is administrative/financial, not operational</li>
          </ul>
        </CalloutBox>
      </div>

      {/* What This Means */}
      <div style={{ marginBottom: '40px', background: COLORS.background, borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ color: COLORS.navy, marginTop: 0, marginBottom: '8px' }}>What This Means for You</h3>
        <p style={{ color: COLORS.muted, marginBottom: '16px', fontSize: '13px' }}>Practical implications for household budgeting and HOA operations</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <h4 style={{ color: COLORS.accent, fontSize: '14px', margin: '0 0 8px 0' }}>No Leak or Overage</h4>
            <p style={{ color: COLORS.muted, margin: 0, lineHeight: '1.5', fontSize: '13px' }}>The $7,486 delinquent balance is not because of broken pipes or high usage. Water consumption has been normal. This is purely a billing/administrative matter.</p>
          </div>
          <div>
            <h4 style={{ color: COLORS.accent, fontSize: '14px', margin: '0 0 8px 0' }}>Monthly Impact</h4>
            <p style={{ color: COLORS.muted, margin: 0, lineHeight: '1.5', fontSize: '13px' }}>Regular monthly water bills average {fmt(avgMonthlyBill)} based on single-month billing periods. This is now properly budgeted in the dues analysis using a normalized $1,200/month.</p>
          </div>
          <div>
            <h4 style={{ color: COLORS.accent, fontSize: '14px', margin: '0 0 8px 0' }}>Payment Plan Required</h4>
            <p style={{ color: COLORS.muted, margin: 0, lineHeight: '1.5', fontSize: '13px' }}>The delinquent balance must be paid through a formal arrangement with the City. This impacts available cash and requires urgent dues increase or special assessment.</p>
          </div>
        </div>
      </div>

      <div style={{
        paddingTop: '16px',
        fontSize: '13px',
        color: COLORS.muted,
        borderTop: `1px solid ${COLORS.border}`
      }}>
        <p style={{ margin: '16px 0 0 0' }}>Last Updated: April 8, 2026 | Data Source: City of Houston water accounts, LLA management records</p>
      </div>
    </div>
  );
}
