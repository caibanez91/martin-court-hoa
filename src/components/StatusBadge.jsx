import { COLORS } from '../data/constants';

export default function StatusBadge({ status, label }) {
  const getStatusStyle = (status) => {
    switch(status) {
      case 'success':
        return { background: '#ECFDF5', color: COLORS.positive, border: `1px solid ${COLORS.positive}` };
      case 'warning':
        return { background: '#FFFBEB', color: COLORS.warning, border: `1px solid ${COLORS.warning}` };
      case 'danger':
        return { background: '#FEF2F2', color: COLORS.negative, border: `1px solid ${COLORS.negative}` };
      default:
        return { background: '#F3F4F6', color: COLORS.muted, border: `1px solid ${COLORS.border}` };
    }
  };

  const style = getStatusStyle(status);

  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: '600',
      ...style
    }}>
      {label}
    </span>
  );
}
