import { useState } from 'react';
import { COLORS } from '../data/constants';

export default function DataTable({ columns, data, searchable = false, filters = {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(0);
  const pageSize = 50;

  let filteredData = data.filter(row => {
    if (!searchable) return true;
    return columns.some(col =>
      String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort
  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      const comparison = aVal > bVal ? 1 : -1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setPage(0);
  };

  const formatValue = (value, column) => {
    if (column.type === 'currency' && typeof value === 'number') {
      return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    if (column.type === 'number' && typeof value === 'number') {
      return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    return value;
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '16px',
            fontFamily: 'Inter, sans-serif'
          }}
        />
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '13px'
        }}>
          <thead>
            <tr style={{
              background: COLORS.tableHeader,
              borderBottom: `1px solid ${COLORS.border}`
            }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding: '12px',
                    textAlign: col.type === 'currency' || col.type === 'number' ? 'right' : 'left',
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: COLORS.navy,
                    userSelect: 'none'
                  }}
                >
                  {col.label} {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  background: idx % 2 === 0 ? COLORS.cardBg : COLORS.background,
                  borderBottom: `1px solid ${COLORS.border}`
                }}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    style={{
                      padding: '12px',
                      textAlign: col.type === 'currency' || col.type === 'number' ? 'right' : 'left',
                      color: COLORS.navy,
                      fontVariantNumeric: col.type === 'currency' || col.type === 'number' ? 'tabular-nums' : 'normal'
                    }}
                  >
                    {formatValue(row[col.key], col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          fontSize: '13px',
          color: COLORS.muted
        }}>
          <span>Showing {page * pageSize + 1} to {Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              style={{
                padding: '6px 12px',
                background: page === 0 ? COLORS.border : COLORS.accent,
                color: page === 0 ? COLORS.muted : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: page === 0 ? 'default' : 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Previous
            </button>
            <span>{page + 1} / {totalPages}</span>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: '6px 12px',
                background: page >= totalPages - 1 ? COLORS.border : COLORS.accent,
                color: page >= totalPages - 1 ? COLORS.muted : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: page >= totalPages - 1 ? 'default' : 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
