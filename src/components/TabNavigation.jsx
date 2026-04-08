import { COLORS } from '../data/constants';
import {
  FiBarChart2,
  FiTrendingUp,
  FiDollarSign,
  FiFileText,
  FiCreditCard,
  FiCalendar,
  FiDroplet,
  FiCrosshair,
  FiUsers
} from 'react-icons/fi';

const tabs = [
  { id: 'executive', label: 'Executive Summary', icon: FiBarChart2 },
  { id: 'health', label: 'Financial Health', icon: FiTrendingUp },
  { id: 'dues', label: 'Where Dues Go', icon: FiDollarSign },
  { id: 'pl', label: 'P&L Since Inception', icon: FiFileText },
  { id: 'bank', label: 'Bank Transactions', icon: FiCreditCard },
  { id: 'budget', label: 'Q1 Budget', icon: FiCalendar },
  { id: 'water', label: 'Water Timeline', icon: FiDroplet },
  { id: 'solutions', label: 'Proposed Solutions', icon: FiCrosshair },
  { id: 'vendors', label: 'Contracts & Vendors', icon: FiUsers }
];

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      borderBottom: `2px solid ${COLORS.border}`,
      background: COLORS.cardBg,
      gap: '8px',
      padding: '0 24px'
    }}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '16px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? '600' : '500',
              color: activeTab === tab.id ? COLORS.accent : COLORS.muted,
              borderBottom: activeTab === tab.id ? `3px solid ${COLORS.accent}` : 'none',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s'
            }}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
