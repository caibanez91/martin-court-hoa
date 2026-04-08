import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KpiCard from '../KpiCard';
import ChartCard from '../ChartCard';
import CalloutBox from '../CalloutBox';
import DataTable from '../DataTable';
import { COLORS, MONTHLY_DUES, TOTAL_HOUSEHOLDS } from '../../data/constants';
import { NORMALIZED_MONTHLY, TOTAL_MONTHLY, PER_HOUSEHOLD_MONTHLY, MONTHLY_SHORTFALL } from '../../data/normalizedExpenses';

export default function WhereDuesGo() {
  const [sliderValue, setSliderValue] = useState(MONTHLY_DUES);

  const duesBreakdown = NORMALIZED_MONTHLY.map((item, idx) => ({
    ...item,
    monthlyPerHousehold: item.monthly / TOTAL_HOUSEHOLDS
  }));

  const expenseData = NORMALIZED_MONTHLY.map(item => ({
    name: item.category.split(' (')[0],
    value: item.monthly
  }));

  const sliderIncome = sliderValue * TOTAL_HOUSEHOLDS;
  const shortfall = TOTAL_MONTHLY - sliderIncome;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ color: COLORS.navy, marginBottom: '20px' }}>Where Dues Go</h2>

      {/* KPI Grid */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <KpiCard
          label="Current Monthly Dues"
          value={`$${MONTHLY_DUES}`}
          sublabel="Per household"
          status="neutral"
        />
        <KpiCard
          label="Actual Monthly Costs"
          value={`$${TOTAL_MONTHLY.toFixed(2)}`}
          sublabel="Total for 16 households"
          status="warning"
        />
        <KpiCard
          label="Per Household Actual"
          value={`$${PER_HOUSEHOLD_MONTHLY.toFixed(2)}`}
          sublabel="Required to break even"
          status="negative"
        />
        <KpiCard
          label="Monthly Shortfall"
          value={`$${MONTHLY_SHORTFALL.toFixed(2)}`}
          sublabel="Per household per month"
          status="warning"
        />
        <KpiCard
          label="Highest Expense"
          value="Water"
          sublabel="$1,200/month (normalized)"
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
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Interactive: What if dues were different?</h3>
        <p style={{ color: COLORS.muted, marginBottom: '20px' }}>Adjust the slider to see how different dues levels would impact the budget shortfall:</p>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: COLORS.navy, fontWeight: '600' }}>Monthly Dues per Household</span>
            <span style={{ fontSize: '20px', fontWeight: '700', color: COLORS.accent }}>${sliderValue}</span>
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
            <span>$225 (Break-even)</span>
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
              ${(sliderValue * TOTAL_HOUSEHOLDS).toFixed(2)}
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
              {shortfall > 0 ? '-' : '+'} ${Math.abs(shortfall).toFixed(2)}
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
              {shortfall > 0 ? '-' : '+'} ${Math.abs(shortfall * 12).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Expense Breakdown Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <ChartCard title="Expense Breakdown (Pie Chart)" height={350}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[COLORS.accent, COLORS.positive, COLORS.warning, COLORS.negative, COLORS.muted][index % 5]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Expenses by Category (Bar Chart)" height={350}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseData} layout="vertical" margin={{ top: 5, right: 30, left: 250, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={240} />
              <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
              <Bar dataKey="value" fill={COLORS.accent} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Per-Household Breakdown Table */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: COLORS.navy, marginBottom: '16px' }}>Monthly Cost Breakdown (Per Household)</h3>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <CalloutBox type="info" title="Water: The Largest Expense">
          <p>Water represents 41.6% of monthly costs ($1,200/month). Normalized over 12 months, but highly variable. Key issue: previous delinquency due to city billing errors.</p>
        </CalloutBox>
        <CalloutBox type="warning" title="Property Management Fee">
          <p>LLA charges $525/month (18.2% of budget). This is a fixed management contract cost that ensures consistent HOA operations.</p>
        </CalloutBox>
        <CalloutBox type="info" title="Dues Must Increase">
          <p>To break even at current expense levels, dues must increase from $168 to at least $181/month (minimum). A further increase to $225/month would provide a 3-month reserve fund.</p>
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
        <p style={{ margin: 0 }}>Last Updated: April 8, 2026 | Data Source: Normalized monthly expenses, Bank statements</p>
      </div>
    </div>
  );
}
