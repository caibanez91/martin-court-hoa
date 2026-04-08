import { COLORS } from '../data/constants';

export default function KpiCard({ label, value, sublabel, status = 'neutral', icon: Icon }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'positive': return COLORS.positive;
      case 'negative': return COLORS.negative;
      case 'warning': return COLORS.warning;
      default: return COLORS.muted;
    }
  };

  return (
    <div style={{
      background: COLORS.cardBg,
      border: `1px solid ${COLORS.border}`,
      borderRadius: '12px',
      padding: '20px',
      flex: '1',
      minWidth: '200px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <p style={{
          fontSize: '12px',
          fontWeight: '600',
          color: COLORS.muted,
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>{label}</p>
        {Icon && <Icon size={20} color={getStatusColor(status)} />}
      </div>
      <p style={{
        fontSize: '28px',
        fontWeight: '700',
        margin: '8px 0',
        color: COLORS.navy,
        fontVariantNumeric: 'tabular-nums'
      }}>{value}</p>
      {sublabel && (
        <p style={{
          fontSize: '13px',
          color: getStatusColor(status),
          margin: 0,
          fontWeight: '500'
        }}>{sublabel}</p>
      )}
    </div>
  );
}
