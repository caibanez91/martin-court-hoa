import { COLORS, HOA_NAME } from '../data/constants';

export default function Header() {
  return (
    <div style={{
      background: COLORS.navy,
      color: 'white',
      padding: '24px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        margin: '0 0 8px 0'
      }}>
        {HOA_NAME}
      </h1>
      <p style={{
        fontSize: '14px',
        margin: 0,
        opacity: 0.9
      }}>
        Financial Dashboard
      </p>
    </div>
  );
}
