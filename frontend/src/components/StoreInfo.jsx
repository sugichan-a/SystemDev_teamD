import React from 'react';

const StoreInfo = () => {
  const storeName = localStorage.getItem('selectedStore');
  if (!storeName) return null;
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingRight: 0, // 右端ぴったり
        fontSize: 18,
        fontWeight: 600, // Figma寄せ
        color: '#fff',
        letterSpacing: 1,
      }}
    >
      {storeName}でログイン中
    </div>
  );
};

export default StoreInfo;
