import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const HeaderNav = () => {
  // localStorageから店舗名を取得
  const storeName = localStorage.getItem('selectedStore') || '';
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="navbar-brand">Midorin</div>
      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: 16, background: '#e57d94', borderRadius: 12, padding: '6px 18px', marginRight: 12 }}>
        {storeName ? `店舗: ${storeName}` : ''}
      </div>
    </nav>
  );
};

export default HeaderNav;
