import React, { useState } from 'react';
import '../App.css';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';
import CustomerSelectModal from '../components/CustomerSelectModal';

const OrderListPage = () => {
  const initialData = [
    { id: 1, name: 'フラワーショップブルーム', date: '2025/6/7',  status: '未納品' },
    { id: 2, name: 'ブックカフェ ライブラリー', date: '2025/5/11', status: '納品済' },
    { id: 3, name: '森本友香',               date: '2025/4/30', status: '納品済' },
    { id: 4, name: 'コーヒーラウンジ レイユ', date: '2025/1/7',  status: '納品済' },
    { id: 5, name: '木原パオロ隼人',         date: '2024/12/7', status: 'キャンセル済' },
    { id: 6, name: 'キューズモール森ノ宮',   date: '2024/8/7',  status: '削除済' }
  ];
  const [ordersData, setOrdersData] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [nameFilter, setNameFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilters, setStatusFilters] = useState({
    '未納品': false,
    '納品済': false,
    'キャンセル済': false,
    '削除済': false,
  });
  const [sortOrder, setSortOrder] = useState('desc');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredData.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredData.map(item => item.id)));
  };
  const toggleSelectId = id => {
    const newSet = new Set(selectedIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedIds(newSet);
  };
  const deleteSelected = () => {
    setOrdersData(prev => prev.filter(item => !selectedIds.has(item.id)));
    setSelectedIds(new Set());
  };
  const toggleStatus = status => {
    setStatusFilters(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const filteredData = ordersData
    .filter(item => {
      if (nameFilter && !item.name.includes(nameFilter)) return false;
      if (dateFrom && item.date < dateFrom) return false;
      if (dateTo && item.date > dateTo) return false;
      const active = Object.entries(statusFilters).filter(([,v]) => v).map(([k]) => k);
      if (active.length && !active.includes(item.status)) return false;
      return true;
    })
    .sort((a, b) => sortOrder === 'asc'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="App">
      <nav className="navbar"><div className="navbar-brand">Midorin</div></nav>
      <nav className="breadcrumb"><Breadcrumbs /></nav>

      <div className="main-content column-layout">
        <div className="tab-buttons">
          <NavButton to="/orders">受注管理</NavButton>
          <NavButton to="/deliveries">納品管理</NavButton>
          <NavButton to="/stats">統計情報管理</NavButton>
        </div>

        <form className="search-form" onSubmit={e => e.preventDefault()}>
          <table className="search-form-table">
            <tbody>
              <tr>
                <th><label htmlFor="customerName">顧客名</label></th>
                <td><input id="customerName" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)} /></td>
              </tr>
              <tr>
                <th><label htmlFor="dateFrom">受注日付</label></th>
                <td>
                  <div className="date-range">
                    <input id="dateFrom" type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                    <span style={{fontWeight:'bold', color:'#2d2d4b', fontSize:'1.2em'}}>～</span>
                    <input id="dateTo" type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                  </div>
                </td>
              </tr>
              <tr>
                <th>注文状態</th>
                <td>
                  <div className="status-filters">
                    {Object.keys(statusFilters).map(status => (
                      <label key={status}><input type="checkbox" checked={statusFilters[status]} onChange={() => toggleStatus(status)} /> {status}</label>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="search-form-bottom">
            <button className="search-button" type="submit">この条件で検索する</button>
          </div>
        </form>

        <div className="action-buttons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', maxWidth: 800, margin: '40px auto 0 auto' }}>
          {/* 左側：削除ボタン */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <button className="danger" style={{ borderRadius: '24px', fontWeight: 'bold', fontSize: '1.1rem', padding: '14px 36px', background: '#e57d94', color: '#fff', border: 'none' }} onClick={deleteSelected}>
              選んだ項目を削除
            </button>
          </div>
          {/* 右側：注文書作成＋ソート */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <button className="primary-button" style={{ borderRadius: '24px', fontWeight: 'bold', fontSize: '1.1rem', padding: '14px 36px', background: '#1b2a58', color: '#fff', border: 'none' }} onClick={() => setShowModal(true)}>
              注文書作成
            </button>
            <div className="sort-buttons" style={{ marginTop: 10, display: 'flex', gap: 8 }}>
              <button className="sort-button ascending" style={{ background: '#e57d94', color: '#fff', borderRadius: '16px', border: 'none', padding: '6px 18px', fontWeight: 'bold' }} onClick={() => setSortOrder('asc')}>昇順</button>
              <button className="sort-button descending" style={{ background: '#7ec6ee', color: '#fff', borderRadius: '16px', border: 'none', padding: '6px 18px', fontWeight: 'bold' }} onClick={() => setSortOrder('desc')}>降順</button>
            </div>
          </div>
        </div>
        {/* 顧客選択モーダル */}
        <CustomerSelectModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSelect={setSelectedCustomer}
        />

        <table className="order-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={filteredData.length>0 && selectedIds.size===filteredData.length} onChange={toggleSelectAll} /></th>
              <th>顧客名</th><th>受注日</th><th>注文状態</th><th>明細</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item=> (
              <tr key={item.id}>
                <td><input type="checkbox" checked={selectedIds.has(item.id)} onChange={()=>toggleSelectId(item.id)} /></td>
                <td>{item.name}</td><td>{item.date}</td>
                <td><span className={`badge ${item.status}`}>{item.status}</span></td>
                <td><button className="mini-button">出力</button><button className="mini-button">編集</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination"><button>1</button><span>/</span><button>2</button></div>
      </div>
    </div>
  );
};

export default OrderListPage;