import { COLORS } from '../data/constants';

export default function ChartCard({ title, children, height = 400 }) {
  return (
    <div style={{
      background: COLORS.cardBg,
      border: `1px solid ${COLORS.border}`,
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      {title && (
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: COLORS.navy,
          margin: '0 0 20px 0'
        }}>{title}</h3>
      )}
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}
