import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import DataTable from '../DataTable';
import { COLORS, MONTHLY_DUES, TOTAL_HOUSEHOLDS, fmt, fmtShort } from '../../data/constants';
import { NORMALIZED_MONTHLY, TOTAL_MONTHLY, PER_HOUSEHOLD_MONTHLY, MONTHLY_SHORTFALL } from '../../data/normalizedExpenses';

export default function WhereDuesGo() {
  const [sliderValue, setSliderValue] = useState(MONTHLY_DUES);

  const duesBreakdown = NORMALIZED_MONTHLY.map((item, idx) => ({
    ...item,
    monthlyPerHousehold: item.monthly / TOTAL_HOUSEHOLDS
  }));

  const barChartData = NORMALIZED_MONTHLY.map(item => ({
    category: item.category.split(' (')[0],
    monthly: item.monthly
  }));

  const sliderIncome = sliderValue * TOTAL_HOUSEHOLDS;
  const shortfall = TOTAL_MONTHLY - sliderIncome;
  const breakEvenAmount = TOTAL_MONTHLY / TOTAL_HOUSEHOLDS;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '8px' }}>Where Dues Go</h2>
      <p style={{ color: COLORS.muted, marginBottom: '24px' }}>Complete breakdown of monthly HOA expenses and funding requirements</p>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Current Monthly Dues"
          value={fmt(MONTHLY_DUES)}
          sublabel="Per household"
          status="neutral"
        />
        <KpiCard
          label="Actual Monthly Costs"
          value={fmt(TOTAL_MONTHLY)}
          sublabel="Total for 16 households"
          status="warning"
        />
        <KpiCard
          label="Per Household Actual"
          value={fmt(PER_HOUSEHOLD_MONTHLY)}
          sublabel="Required to break even"
          status="negative"
        />
        <KpiCard
          label="Monthly Shortfall"
          value={fmt(MONTHLY_SHORTFALL)}
          sublabel="Per household per month"
          status="negative"
        />
      </div>

      {/* Interactive Dues Slider */}
      <div style={{
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '40px'
      }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Interactive: What if dues were different?</h3>
        <p style={{ color: COLORS.muted, marginBottom: '20px' }}>Adjust the slider to explore how different dues levels would impact the budget shortfall. Break-even is {fmt(breakEvenAmount)} per household.</p>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: COLORS.navy, fontWeight: '600' }}>Monthly Dues per Household</span>
            <span style={{ fontSize: '20px', fontWeight: '700', color: COLORS.accent }}>{fmt(sliderValue)}</span>
          </label>
          <input
            type="range"
            min="150"
            max="300"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
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
            <span>${breakEvenAmount.toFixed(0)} (Break-even)</span>
            <span>$300</span>
          </div>
        </div>

        {/* Slider Results */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{
            background: COLORS.background,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Total Monthly Income</p>
            <p style={{ color: COLORS.navy, fontSize: '24px', fontWeight: '700', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
              {fmt(sliderValue * TOTAL_HOUSEHOLDS)}
            </p>
          </div>
          <div style={{
            background: COLORS.background,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Monthly Shortfall/Surplus</p>
            <p style={{
              color: shortfall > 0 ? COLORS.negative : COLORS.positive,
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              fontVariantNumeric: 'tabular-nums'
            }}>
              {shortfall > 0 ? '-' : '+'} {fmt(Math.abs(shortfall))}
            </p>
          </div>
          <div style={{
            background: COLORS.background,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: COLORS.muted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Annual Impact</p>
            <p style={{
              color: shortfall > 0 ? COLORS.negative : COLORS.positive,
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              fontVariantNumeric: 'tabular-nums'
            }}>
              {shortfall > 0 ? '-' : '+'} {fmt(Math.abs(shortfall * 12))}
            </p>
          </div>
        </div>
      </div>

      {/* Expense Categories Bar Chart */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Expenses by Category</h3>
        <p style={{ color: COLORS.muted, marginBottom: '16px' }}>Normalized monthly cost by category — based on 2025 actuals, verified contracts, and insurance policy documentation</p>
        <ChartCard height={400}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis type="number" tickFormatter={(v) => fmtShort(v)} />
              <YAxis dataKey="category" type="category" width={190} />
              <Tooltip formatter={(value) => fmt(value)} />
              <Bar dataKey="monthly" fill={COLORS.accent} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Per-Household Breakdown Table */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '8px' }}>Monthly Cost Breakdown (Per Household)</h3>
        <p style={{ color: COLORS.muted, marginBottom: '16px' }}>Detailed expense breakdown showing both total and per-household amounts</p>
        <DataTable
          columns={[
            { key: 'category', label: 'Expense Category', type: 'text' },
            { key: 'monthly', label: 'Total Monthly', type: 'currency' },
            { key: 'monthlyPerHousehold', label: 'Per Household', type: 'currency' },
            { key: 'annual', label: 'Annual Total', type: 'currency' }
          ]}
          data={duesBreakdown}
        />
      </div>

      {/* Key Findings */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Key Findings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <CalloutBox type="warning" title="Water: The Largest Expense">
            <p>Water represents 39.9% of monthly costs ({fmt(1200)}/month). Normalized over 12 months but highly variable. Previous delinquency issues due to city billing errors have been resolved.</p>
          </CalloutBox>
          <CalloutBox type="info" title="Property Management Fee">
            <p>Property Management charges {fmt(525)}/month (17.5% of budget). This is a fixed management contract cost that ensures consistent HOA operations and compliance.</p>
          </CalloutBox>
          <CalloutBox type="info" title="Insurance Coverage">
            <p>Annual premium of {fmt(2061)} per year ({fmt(171.75)}/month) verified from USLI policy document. Covers liability and property damage for all common areas.</p>
          </CalloutBox>
          <CalloutBox type="negative" title="Dues Must Increase">
            <p>To break even at current expense levels, dues must increase from {fmt(168)} to at least {fmt(188)}/month. For adequate reserves, increase to {fmt(225)}/month would provide 3-month operating cushion.</p>
          </CalloutBox>
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
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Normalized monthly expenses, bank statements, verified contracts</p>
      </div>
    </div>
  );
}
