import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { COLORS, fmt, fmtShort } from '../../data/constants';
import { NORMALIZED_MONTHLY, TOTAL_MONTHLY } from '../../data/normalizedExpenses';

export default function ContractsVendors() {
  const vendorData = [
    {
      vendor: 'City of Houston Water',
      service: 'Water & Drainage',
      monthlyRate: 1200,
      annualRate: 14400,
      contractType: 'Utility',
      status: 'Active',
      renewalDate: 'Monthly billing',
      percentage: 41.6,
      notes: 'Delinquent balance: $7,486.25. Billing resolution complete Jan 2026.'
    },
    {
      vendor: 'Lori Anderson (LLA)',
      service: 'Property Management',
      monthlyRate: 525,
      annualRate: 6300,
      contractType: 'Management',
      status: 'Active',
      renewalDate: 'Ongoing',
      percentage: 18.2,
      notes: 'Board-approved management company. Provides accounting, collection, legal coordination.'
    },
    {
      vendor: 'Texas Pride Disposal',
      service: 'Trash Collection',
      monthlyRate: 482.41,
      annualRate: 5788.89,
      contractType: 'Waste Management',
      status: 'Active',
      renewalDate: 'Annual renewal',
      percentage: 16.7,
      notes: 'Weekly residential pickup + bulk item service. Up for renewal in Q2 2026.'
    },
    {
      vendor: 'St. Clair & Sons',
      service: 'Landscaping',
      monthlyRate: 433.91,
      annualRate: 5206.89,
      contractType: 'Maintenance',
      status: 'Active',
      renewalDate: 'Monthly service',
      percentage: 15.0,
      notes: 'Common area maintenance. Seasonal spikes in spring/summer.'
    },
    {
      vendor: 'USLI (via Acrisure)',
      service: 'HOA Insurance (Property, Liability, D&O)',
      monthlyRate: 171.75,
      annualRate: 2061.00,
      contractType: 'Insurance',
      status: 'Active',
      renewalDate: 'Annual renewal',
      percentage: 5.7,
      notes: 'Annual premium: Commercial Property $524 + General Liability $500 + D&O $1,037. Carrier: USLI via Acrisure/Quickinsured.'
    },
    {
      vendor: 'Various',
      service: 'Electricity, Professional Fees, Gate Maintenance, Bank Fees, Property Tax',
      monthlyRate: 158.05,
      annualRate: 1896.55,
      contractType: 'Mixed',
      status: 'Active',
      renewalDate: 'Various',
      percentage: 5.3,
      notes: 'Includes: Electricity (94.31), Professional Fees/Anne Beauregard (28.09), Gate Maintenance (20.83), Bank Fees (12.64), Property Tax (2.18).'
    }
  ];

  const spendingData = vendorData.slice(0, 4).map(v => ({
    name: v.vendor,
    value: v.monthlyRate
  }));

  const totalMonthlyVendors = vendorData.reduce((sum, v) => sum + v.monthlyRate, 0);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Contracts & Vendors</h2>

      {/* KPI */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Total Monthly Vendor Spend"
          value={fmt(totalMonthlyVendors)}
          sublabel="All contracts and ongoing expenses"
          status="neutral"
        />
      </div>

      {/* Spending Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <ChartCard title="Monthly Spending by Major Vendor" height={300} subtitle="Top 4 vendor spend distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name.split(' ')[0]}: ${fmt(value)}`}
                outerRadius={100}
                dataKey="value"
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[COLORS.accent, COLORS.positive, COLORS.warning, COLORS.negative][index % 4]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => fmt(value)} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Spending by Vendor (Bar)" height={300} subtitle="Monthly spend comparison">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendingData} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis type="number" tickFormatter={(v) => fmtShort(v)} />
              <YAxis dataKey="name" type="category" width={140} />
              <Tooltip formatter={(value) => fmt(value)} />
              <Bar dataKey="value" fill={COLORS.accent} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Vendor Detail Cards */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Vendor Details & Contract Status</h3>
        <div style={{ display: 'grid', gap: '20px' }}>
          {vendorData.map((vendor, idx) => (
            <div
              key={idx}
              style={{
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ color: COLORS.navy, margin: '0 0 6px 0' }}>
                    {vendor.vendor}
                  </h4>
                  <p style={{ color: COLORS.muted, margin: 0, fontSize: '13px' }}>
                    {vendor.service}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: COLORS.accent, fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', fontVariantNumeric: 'tabular-nums' }}>
                    {vendor.percentage}%
                  </p>
                  <p style={{ color: COLORS.muted, fontSize: '11px', margin: 0 }}>of budget</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Monthly Rate</p>
                  <p style={{ color: COLORS.navy, fontSize: '16px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(vendor.monthlyRate)}
                  </p>
                </div>
                <div>
                  <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Annual Rate</p>
                  <p style={{ color: COLORS.navy, fontSize: '16px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(vendor.annualRate)}
                  </p>
                </div>
                <div>
                  <p style={{ color: COLORS.muted, fontSize: '11px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Renewal</p>
                  <p style={{ color: COLORS.navy, fontSize: '16px', fontWeight: '700', margin: 0 }}>
                    {vendor.renewalDate}
                  </p>
                </div>
              </div>

              <div style={{
                background: COLORS.background,
                borderRadius: '8px',
                padding: '12px',
                borderLeft: `3px solid ${vendor.status === 'Active' ? COLORS.positive : COLORS.warning}`
              }}>
                <p style={{ color: COLORS.muted, fontSize: '12px', margin: 0, lineHeight: '1.5' }}>
                  {vendor.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmarking & Recommendations */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Benchmarking & Recommendations</h3>
        <p style={{ color: COLORS.muted, fontSize: '14px', marginBottom: '16px' }}>Market analysis and cost optimization opportunities</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <CalloutBox type="info" title="Property Management Fee">
            <p><strong>$525/month ($6,300/year)</strong> is within market rate for a 16-unit HOA but warrants annual review. Consider: Does LLA provide adequate value? Are invoices itemized?</p>
          </CalloutBox>

          <CalloutBox type="info" title="Trash Services">
            <p><strong>Texas Pride: $482.41/month</strong> is reasonable. Up for renewal in Q2 2026. <strong>Action:</strong> Solicit competitive bids from 2-3 other haulers before renewal.</p>
          </CalloutBox>

          <CalloutBox type="warning" title="Landscaping Costs">
            <p><strong>St. Clair: $433.91/month base + seasonal spikes</strong>. March 2026 spike to $627.86 suggests seasonal work may be negotiable or deferrable.</p>
          </CalloutBox>

          <CalloutBox type="info" title="Water: Not a Vendor Contract">
            <p>Water is a utility billed directly by City of Houston. Cannot be renegotiated, but consumption can be monitored for any future leaks or waste.</p>
          </CalloutBox>

          <CalloutBox type="success" title="Bank Fees: Minimal">
            <p><strong>~$80/month in processing fees</strong> is efficiently managed. Continue ACH batch processing and consolidate transactions where possible.</p>
          </CalloutBox>

          <CalloutBox type="info" title="Insurance & Professional Fees">
            <p>Annual insurance premium (~$824) is lump-sum. Professional fees are variable ($0-200/month depending on needs). Both are essential; prioritize insurance compliance.</p>
          </CalloutBox>
        </div>
      </div>

      {/* Opportunities for Savings */}
      <div style={{ marginBottom: '40px' }}>
        <CalloutBox type="success" title="Potential Cost Reduction Opportunities">
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px', lineHeight: '1.7', color: COLORS.muted }}>
            <li><strong>Trash Service Rebid (Q2 2026):</strong> Potential 5-10% savings by competitive bidding = ~$250-500/year</li>
            <li><strong>Landscaping Optimization:</strong> Negotiate seasonal rates or defer non-essential work = ~$1,000-2,000/year</li>
            <li><strong>Property Management Review:</strong> Confirm itemized invoicing and efficiency; potential 10% reduction = ~$600/year</li>
            <li><strong>Water Conservation:</strong> Install smart meters or educate residents = ~$100-200/month potential savings</li>
            <li><strong>Bulk Assessment:</strong> Total potential savings: $2,000-3,500/year (7-12% budget reduction)</li>
          </ul>
        </CalloutBox>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '16px',
        background: COLORS.background,
        borderRadius: '8px',
        fontSize: '13px',
        color: COLORS.muted
      }}>
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Vendor invoices, Normalized expense analysis</p>
      </div>
    </div>
  );
}
