import React, { useState } from 'react';
import '../App.css';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';

const DeliveryListPage = () => {
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

        <div className="search-form">
          <input type="text" placeholder="顧客名" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
          <div className="date-range">
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} /> ～ <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div className="status-filters">
            {Object.keys(statusFilters).map(status => (
              <label key={status}><input type="checkbox" checked={statusFilters[status]} onChange={() => toggleStatus(status)} /> {status}</label>
            ))}
          </div>
          <button className="search-button" onClick={e => e.preventDefault()}>この条件で検索する</button>
        </div>

        <div className="action-buttons">
          <button className="danger" onClick={deleteSelected}>選んだ項目を削除</button>
          <div className="right-actions">
            <button className="primary">納品書作成</button>
            <div className="sort-buttons">
              <button className={`sort-button ascending ${sortOrder==='asc'? 'active':''}`} onClick={() => setSortOrder('asc')}>昇順</button>
              <button className={`sort-button descending ${sortOrder==='desc'? 'active':''}`} onClick={() => setSortOrder('desc')}>降順</button>
            </div>
          </div>
        </div>

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

export default DeliveryListPage;