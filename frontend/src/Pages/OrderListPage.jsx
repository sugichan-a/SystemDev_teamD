import React, { useState, useEffect } from 'react';
import '../App.css';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';
import HeaderNav from '../components/HeaderNav';
import CustomerSelectModal from '../components/CustomerSelectModal';
import { useNavigate } from 'react-router-dom';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
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
  const navigate = useNavigate();

  // ✅ APIからデータ取得
  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
      .then(res => {
        if (!res.ok) throw new Error('サーバーエラー');
        return res.json();
      })
      .then(data => {
        console.log('Fetched orders:', data);
        setOrders(data);
      })
      .catch(err => {
        console.error('API error:', err);
      });
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredData.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredData.map(item => item.id)));
  };

  const toggleSelectId = id => {
    const newSet = new Set(selectedIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleStatus = status => {
    setStatusFilters(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const deleteSelected = () => {
    if (selectedIds.size === 0) {
      window.alert('削除する項目を選択してください。');
      return;
    }
    if (!window.confirm('選択した注文を削除しますか？')) return;
    setOrders(prev => prev.filter(item => !selectedIds.has(item.id)));
    setSelectedIds(new Set());
  };

  const filteredData = orders
    .filter(item => {
      if (nameFilter && !item.customer_name.includes(nameFilter)) return false;
      if (dateFrom && new Date(item.order_date) < new Date(dateFrom)) return false;
      if (dateTo && new Date(item.order_date) > new Date(dateTo)) return false;
      const active = Object.entries(statusFilters).filter(([, v]) => v).map(([k]) => k);
      if (active.length && !active.includes(item.status)) return false;
      return true;
    })
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.order_date) - new Date(b.order_date)
        : new Date(b.order_date) - new Date(a.order_date)
    );

  const handleCustomerSelect = (customer) => {
    setShowModal(false);
    setSelectedCustomer(customer);
    navigate('/orders/create', { state: { customer } });
  };

  return (
    <div className="App">
      <HeaderNav />
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
                    <span>～</span>
                    <input id="dateTo" type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                  </div>
                </td>
              </tr>
              <tr>
                <th>注文状態</th>
                <td>
                  <div className="status-filters">
                    {Object.keys(statusFilters).map(status => (
                      <label key={status}>
                        <input type="checkbox" checked={statusFilters[status]} onChange={() => toggleStatus(status)} /> {status}
                      </label>
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

        <div className="action-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button onClick={deleteSelected}>選んだ項目を削除</button>
          <div>
            <button onClick={() => setShowModal(true)}>注文書作成</button>
            <button onClick={() => setSortOrder('asc')}>昇順</button>
            <button onClick={() => setSortOrder('desc')}>降順</button>
          </div>
        </div>

        {/* ✅ データテーブル */}
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" checked={filteredData.length > 0 && selectedIds.size === filteredData.length} onChange={toggleSelectAll} /></th>
              <th>顧客名</th>
              <th>受注日</th>
              <th>状態</th>
              <th>合計金額</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelectId(item.id)} /></td>
                <td>{item.customer_name}</td>
                <td>{item.order_date}</td>
                <td>{item.status}</td>
                <td>{item.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomerSelectModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleCustomerSelect}
      />
    </div>
  );
};

export default OrderListPage;
