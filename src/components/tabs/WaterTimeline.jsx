import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import DataTable from '../DataTable';
import { COLORS, WATER_BALANCE, WATER_PER_HOUSEHOLD } from '../../data/constants';
import { WATER_BILLS, WATER_TIMELINE_EVENTS } from '../../data/waterBills';

export default function WaterTimeline() {
  // Calculate totals
  const totalBilled = WATER_BILLS.reduce((sum, bill) => sum + bill.amount, 0);
  const totalConsumption = WATER_BILLS.reduce((sum, bill) => sum + (bill.consumption || 0), 0);
  const billedMonths = WATER_BILLS.length;

  // Timeline chart data
  const timelineData = WATER_BILLS.map(bill => ({
    date: bill.date,
    amount: bill.amount,
    consumption: bill.consumption || 0,
    period: bill.period
  }));

  // Consumption chart
  const consumptionData = WATER_BILLS.filter(b => b.consumption).map(bill => ({
    date: bill.date,
    consumption: bill.consumption,
    amount: bill.amount
  }));

  const tableData = WATER_BILLS.map(bill => ({
    date: bill.date,
    period: bill.period,
    consumption: bill.consumption ? `${bill.consumption.toLocaleString()} gal` : 'N/A',
    amount: bill.amount,
    status: bill.status,
    notes: bill.notes
  }));

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Water Bill Timeline & Crisis Resolution</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Total Water Balance"
          value={`$${WATER_BALANCE.toFixed(2)}`}
          sublabel="Delinquent"
          status="negative"
        />
        <KpiCard
          label="Per Household Debt"
          value={`$${WATER_PER_HOUSEHOLD.toFixed(2)}`}
          sublabel="16 households"
          status="negative"
        />
        <KpiCard
          label="Bills Issued"
          value={billedMonths}
          sublabel="Since account setup"
          status="neutral"
        />
        <KpiCard
          label="Total Water Billed"
          value={`$${totalBilled.toFixed(2)}`}
          sublabel="All time"
          status="negative"
        />
        <KpiCard
          label="Total Consumption"
          value={`${totalConsumption.toLocaleString()} gal`}
          sublabel="Metered"
          status="neutral"
        />
        <KpiCard
          label="Avg Monthly Bill"
          value={`$${(totalBilled / WATER_BILLS.filter(b => b.consumption).length).toFixed(2)}`}
          sublabel="Since regular billing"
          status="warning"
        />
      </div>

      {/* Timeline Events */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Crisis Timeline & Resolution</h3>
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

      {/* Billing Chart */}
      <ChartCard title="Water Bill Amounts Over Time" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Bar dataKey="amount" fill={COLORS.negative} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Consumption Analysis */}
      {consumptionData.length > 0 && (
        <ChartCard title="Water Consumption Analysis" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} gallons`} />
              <Line type="monotone" dataKey="consumption" stroke={COLORS.accent} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Water Bills Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Detailed Water Bill History</h3>
        <DataTable
          columns={[
            { key: 'date', label: 'Bill Date', type: 'text' },
            { key: 'period', label: 'Period', type: 'text' },
            { key: 'consumption', label: 'Consumption', type: 'text' },
            { key: 'amount', label: 'Amount', type: 'currency' },
            { key: 'status', label: 'Status', type: 'text' }
          ]}
          data={tableData}
        />
      </div>

      {/* Root Cause Analysis */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Root Cause Analysis</h3>
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
      <div style={{ marginTop: '40px', background: COLORS.background, borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ color: COLORS.navy, marginTop: 0 }}>What This Means for You</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <h4 style={{ color: COLORS.accent, fontSize: '14px', margin: '0 0 8px 0' }}>No Leak or Overage</h4>
            <p style={{ color: COLORS.muted, margin: 0, lineHeight: '1.5', fontSize: '13px' }}>The $7,486 delinquent balance is not because of broken pipes or high usage. Water consumption has been normal. This is purely a billing/administrative matter.</p>
          </div>
          <div>
            <h4 style={{ color: COLORS.accent, fontSize: '14px', margin: '0 0 8px 0' }}>Monthly Impact</h4>
            <p style={{ color: COLORS.muted, margin: 0, lineHeight: '1.5', fontSize: '13px' }}>Regular monthly water bills are now ~$1,200-1,500/month (normalized). This is now properly budgeted in the dues analysis. Expect ongoing water costs at this level.</p>
          </div>
          <div>
            <h4 style={{ color: COLORS.accent, fontSize: '14px', margin: '0 0 8px 0' }}>Payment Plan Required</h4>
            <p style={{ color: COLORS.muted, margin: 0, lineHeight: '1.5', fontSize: '13px' }}>The delinquent balance must be paid through a formal arrangement with the City. This impacts available cash and requires urgent dues increase or special assessment.</p>
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
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: City of Houston water accounts, LLA management records</p>
      </div>
    </div>
  );
}
