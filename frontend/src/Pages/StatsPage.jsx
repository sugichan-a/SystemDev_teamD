import React, { useState } from 'react';
import '../App.css';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';
import HeaderNav from '../components/HeaderNav';
import { useDeliveryContext } from '../contexts/DeliveryContext';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const StatsPage = () => {
  const { deliveries } = useDeliveryContext();
  const [nameFilter, setNameFilter] = useState('');
  const navigate = useNavigate(); // 追加
  // 顧客ごとに集計（売上高・リードタイム例）
  const customerStats = deliveries
    .filter(item => !nameFilter || item.name.includes(nameFilter))
    .reduce((acc, item) => {
      if (!acc[item.name]) acc[item.name] = { sales: 0, leadTimes: [], details: [] };
      // 売上高計算（配達済のみ）
      if (item.status === '納品済' || item.status === '配達済') {
        const sum = (item.rows || []).reduce((s, r) => s + (Number(r.price) * Number(r.quantity) || 0), 0);
        acc[item.name].sales += sum;
        // リードタイム計算（受注日→納品日の日数差）
        if (item.orderDate && item.date) {
          const order = new Date(item.orderDate);
          const delivery = new Date(item.date);
          const diff = Math.round((delivery - order) / (1000 * 60 * 60 * 24));
          acc[item.name].leadTimes.push(diff);
        }
        acc[item.name].details.push(item);
      }
      return acc;
    }, {});
  // テーブル用データ
  const tableData = Object.entries(customerStats).map(([name, stat]) => ({
    name,
    sales: stat.sales,
    leadTime: stat.leadTimes.length ? (stat.leadTimes.reduce((a, b) => a + b, 0) / stat.leadTimes.length).toFixed(1) + '日' : '-',
    details: stat.details,
  }));
  return (
    <div className="App">
      {/* ヘッダー（店舗名表示付き） */}
      <HeaderNav />
      <nav
        className="breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Breadcrumbs />
      </nav>
      <div className="main-content column-layout">
        <div className="tab-buttons">
          <NavButton to="/orders">受注管理</NavButton>
          <NavButton to="/deliveries">納品管理</NavButton>
          <NavButton to="/stats">統計情報管理</NavButton>
        </div>
        <form className="search-form" onSubmit={e => e.preventDefault()} style={{ maxWidth: 500, margin: '32px auto 0' }}>
          <table className="search-form-table">
            <tbody>
              <tr>
                <th><label htmlFor="customerName">顧客名</label></th>
                <td><input id="customerName" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
        {/* 統計テーブル */}
        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 2px 12px #e57d9420', maxWidth: 660, margin: '32px auto 0', overflow: 'hidden', minWidth: 660 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 660 }}>
            <thead style={{ background: '#F3F3F6' }}>
              <tr>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>顧客名</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>売上高</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>リードタイム</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>明細</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                <tr key={row.name} style={{ borderBottom: '1px solid #f3c1ce' }}>
                  <td style={{ textAlign: 'left', fontWeight: 600, color: '#2d2d4b', fontSize: 15, padding: '10px 32px 10px 32px' }}>{row.name}</td>
                  <td style={{ textAlign: 'right', color: '#2d2d4b', fontSize: 15, padding: '10px 8px' }}>{row.sales.toLocaleString()} 円</td>
                  <td style={{ textAlign: 'center', color: '#2d2d4b', fontSize: 15, padding: '10px 8px' }}>{row.leadTime}</td>
                  <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                    <button
                      style={{ background: '#7ec6ee', color: '#fff', borderRadius: '16px', border: 'none', padding: '4px 12px', fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }}
                      onClick={() => navigate('/customers')}
                    >
                      明細
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default StatsPage;