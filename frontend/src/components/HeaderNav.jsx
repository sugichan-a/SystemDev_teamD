
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import CustomerCsvUploadModal from './CustomerCsvUploadModal';


const HeaderNav = () => {
  // localStorageから店舗名を取得
  const storeName = localStorage.getItem('selectedStore') || '';
  const [showUpload, setShowUpload] = useState(false);

  // CSVアップロード時の処理例
  const handleCsvUpload = (csvText) => {
    // ここでcsvTextをパースして顧客データに反映する処理を追加可能
    alert('CSVアップロード完了!\n内容:\n' + csvText.slice(0, 200) + (csvText.length > 200 ? '...（省略）' : ''));
  };

  return (
    <>
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="navbar-brand">Midorin</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            style={{ background: '#7ec6ee', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: 12, padding: '6px 18px', fontSize: 15, marginRight: 4, cursor: 'pointer' }}
            onClick={() => setShowUpload(true)}
          >
            顧客CSVアップロード
          </button>
          <div style={{ fontWeight: 'bold', color: '#fff', fontSize: 16, background: '#e57d94', borderRadius: 12, padding: '6px 18px', marginRight: 12 }}>
            {storeName ? `店舗: ${storeName}` : ''}
          </div>
        </div>
      </nav>
      <CustomerCsvUploadModal
        visible={showUpload}
        onClose={() => setShowUpload(false)}
        onUpload={handleCsvUpload}
      />
    </>
  );
};

export default HeaderNav;
