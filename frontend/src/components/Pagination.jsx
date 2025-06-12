import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          style={{
            minWidth: 36,
            height: 36,
            borderRadius: 18,
            border: 'none',
            background: currentPage === i + 1 ? '#ec4899' : '#fff',
            color: currentPage === i + 1 ? '#fff' : '#374151',
            fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
            boxShadow: currentPage === i + 1 ? '0 2px 8px #ec489955' : '0 1px 3px #0001',
            cursor: 'pointer',
            transition: 'all 0.15s',
            fontSize: 16,
            outline: 'none',
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
