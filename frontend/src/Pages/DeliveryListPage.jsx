import React, { useState } from 'react';
import '../App.css';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';
import CustomerSelectModal from '../components/CustomerSelectModal';
import { useNavigate } from 'react-router-dom';
import { useDeliveryContext } from '../contexts/DeliveryContext';

const DeliveryListPage = () => {
  const { deliveries, removeDeliveries } = useDeliveryContext();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [nameFilter, setNameFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilters, setStatusFilters] = useState({
    '未配達': false,
    '配達済': false,
    'キャンセル済': false,
    '削除済': false,
  });
  const [sortOrder, setSortOrder] = useState('desc');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

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
    if (!selectedIds.size) return;
    if (window.confirm('選択した納品書を削除しますか？')) {
      removeDeliveries(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };
  const toggleStatus = status => {
    setStatusFilters(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const filteredData = deliveries
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
                    <input id="dateFrom" type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="order-date-input" />
                    <span style={{fontWeight:'bold', color:'#2d2d4b', fontSize:'1.2em'}}>～</span>
                    <input id="dateTo" type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="order-date-input" />
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
          {/* 右側：納品書作成＋ソート */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <button className="primary-button" style={{ borderRadius: '24px', fontWeight: 'bold', fontSize: '1.1rem', padding: '14px 36px', background: '#1b2a58', color: '#fff', border: 'none' }} onClick={() => setShowModal(true)}>
              納品書作成
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
          onSelect={customer => {
            setSelectedCustomer(customer);
            setShowModal(false);
            navigate('/deliveries/select', { state: { customer } });
          }}
        />

        {/* 納品テーブル */}
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e57d9410', maxWidth: 900, margin: '32px auto 0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead style={{ background: '#F3F3F6' }}>
              <tr>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 60 }}><input type="checkbox" checked={filteredData.length>0 && selectedIds.size===filteredData.length} onChange={toggleSelectAll} /></th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>顧客名</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 120 }}>納品日</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 120 }}>配達状況</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 120 }}>明細</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item=> (
                <tr key={item.id} className={selectedIds.has(item.id) ? 'selected-row' : ''} style={{ borderBottom: '1px solid #f3c1ce' }}>
                  <td style={{ textAlign: 'center', padding: '10px 8px' }}><input type="checkbox" checked={selectedIds.has(item.id)} onChange={()=>toggleSelectId(item.id)} /></td>
                  <td style={{ textAlign: 'left', fontWeight: 600, color: '#2d2d4b', fontSize: 15, padding: '10px 8px' }}>{item.name}</td>
                  <td style={{ textAlign: 'center', color: '#2d2d4b', fontSize: 15, padding: '10px 8px' }}>{item.date}</td>
                  <td style={{ textAlign: 'center', padding: '10px 8px' }}><span className={`badge ${item.status}`}>{item.status === '未納品' ? '未配達' : item.status === '納品済' ? '配達済' : item.status}</span></td>
                  <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <button
                        style={{ background: '#7ec6ee', color: '#fff', borderRadius: '16px', border: 'none', padding: '4px 12px', minWidth: 36, fontWeight: 'bold', fontSize: 13, cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#5fa6c9'}
                        onMouseOut={e => e.currentTarget.style.background = '#7ec6ee'}
                      >出力</button>
                      <button
                        style={{ background: '#e57d94', color: '#fff', borderRadius: '16px', border: 'none', padding: '4px 12px', minWidth: 36, fontWeight: 'bold', fontSize: 13, cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#c95d7a'}
                        onMouseOut={e => e.currentTarget.style.background = '#e57d94'}
                        onClick={() => navigate('/deliveries/select/edit', { state: { delivery: item, customer: { name: item.name }, date: item.date } })}
                      >編集</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button className="active">1</button><span>/</span><button>2</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryListPage;