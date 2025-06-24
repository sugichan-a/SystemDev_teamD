import React from 'react';
import StoreInfo from './StoreInfo';

const HeaderNav = () => {
  return (
    <header
      style={{
        width: '100%',
        height: 56,
        background: '#1A2550',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', // 右寄せ
        padding: '0 32px',
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: 1,
      }}
    >
      <StoreInfo />
    </header>
  );
};

export default HeaderNav;
