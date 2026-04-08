import { COLORS } from '../data/constants';

export default function CalloutBox({ type = 'info', title, children }) {
  const getTypeStyle = (type) => {
    switch(type) {
      case 'warning':
        return { bg: '#FFFBEB', border: COLORS.warning, icon: '⚠️' };
      case 'danger':
        return { bg: '#FEF2F2', border: COLORS.negative, icon: '🔴' };
      case 'success':
        return { bg: '#ECFDF5', border: COLORS.positive, icon: '✅' };
      default:
        return { bg: '#EFF6FF', border: COLORS.accent, icon: 'ℹ️' };
    }
  };

  const style = getTypeStyle(type);

  return (
    <div style={{
      background: style.bg,
      borderLeft: `4px solid ${style.border}`,
      padding: '16px',
      borderRadius: '8px',
      marginTop: '20px'
    }}>
      {title && (
        <h4 style={{
          margin: '0 0 8px 0',
          fontSize: '14px',
          fontWeight: '600',
          color: COLORS.navy
        }}>
          {style.icon} {title}
        </h4>
      )}
      <div style={{
        fontSize: '14px',
        color: COLORS.muted,
        lineHeight: '1.5'
      }}>
        {children}
      </div>
    </div>
  );
}
