import React, { useEffect, useState } from 'react';
import '../App.css';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';
import { useLocation, useNavigate } from 'react-router-dom';
import fukaeCustomers from '../components/Customer_Data_Fukae.json';
import midoriCustomers from '../components/Customer_Data_Midori.json';
import imazatoCustomers from '../components/Customer_Data_Imazato.json';
import { useOrderContext } from '../contexts/OrderContext';

const getCustomersByStore = (store) => {
  if (store === '深江橋店' || store === '深江') return fukaeCustomers;
  if (store === '緑橋本店' || store === '緑橋') return midoriCustomers;
  if (store === '今里店' || store === '今里') return imazatoCustomers;
  return [];
};

const getInitialCustomer = (customers) => customers.length > 0 ? customers[0] : { name: '', person: '' };

const initialRows = [
  { id: 1, name: '医療情報技師 医学医療編', quantity: 5, price: 2500, code: '987-486705138' },
];

const getToday = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

const OrderEditPage = () => {
  const location = useLocation();
  const orderFromState = location.state && location.state.order;
  const storeName = localStorage.getItem('selectedStore') || '';
  const customers = getCustomersByStore(storeName);
  const customerFromState = orderFromState ? { name: orderFromState.name, person: orderFromState.person } : (location.state && location.state.customer);
  const [customer, setCustomer] = useState(customerFromState || getInitialCustomer(customers));
  const [date, setDate] = useState(orderFromState ? (orderFromState.date ? orderFromState.date.replace(/\//g, '-') : '') : '');
  const [rows, setRows] = useState(orderFromState ? (orderFromState.rows || initialRows) : initialRows);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const { addOrder, cancelOrders, updateOrder } = useOrderContext();

  useEffect(() => {
    if (orderFromState) {
      setCustomer({
        name: orderFromState.name,
        person: orderFromState.person || getInitialCustomer(customers).person,
      });
      // 日付をYYYY-MM-DD形式に変換（ゼロ埋めも対応）
      if (orderFromState.date) {
        const parts = orderFromState.date.split('/');
        if (parts.length === 3) {
          const yyyy = parts[0];
          const mm = parts[1].padStart(2, '0');
          const dd = parts[2].padStart(2, '0');
          setDate(`${yyyy}-${mm}-${dd}`);
        } else {
          setDate(orderFromState.date);
        }
      } else {
        setDate('');
      }
      setRows(orderFromState.rows || initialRows);
    }
  }, [orderFromState, customers]);

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), name: '', quantity: 1, price: '', code: '' }]);
  };
  const handleDeleteRow = (id) => {
    setRows(rows.filter(r => r.id !== id));
    setSelected(selected.filter(sid => sid !== id));
  };
  const handleSelectRow = (id) => {
    setSelected(selected.includes(id) ? selected.filter(sid => sid !== id) : [...selected, id]);
  };
  const handleDeleteSelected = () => {
    setRows(rows.filter(r => !selected.includes(r.id)));
    setSelected([]);
  };
  const handleChange = (id, key, value) => {
    setRows(rows.map(r => r.id === id ? { ...r, [key]: value } : r));
  };
  const total = rows.reduce((sum, r) => sum + (r.status === 'キャンセル済' ? 0 : (Number(r.price) * Number(r.quantity) || 0)), 0);

  const validate = () => {
    if (!date) {
      window.alert('受注日付を入力してください。');
      return false;
    }
    if (rows.length === 0) {
      window.alert('商品を1件以上追加してください。');
      return false;
    }
    for (const row of rows) {
      if (!row.name || !row.quantity || !row.price) {
        window.alert('商品名・数量・単価はすべて入力してください。');
        return false;
      }
    }
    return true;
  };

  // 選択項目キャンセル
  const handleCancelSelected = () => {
    if (selected.length === 0) {
      window.alert('キャンセルする項目を選択してください。');
      return;
    }
    if (!window.confirm('選択した商品をキャンセルしますか？')) return;
    // 商品のstatusをキャンセル済みにする（rowsにstatus追加）
    setRows(rows.map(r => selected.includes(r.id) ? { ...r, status: 'キャンセル済' } : r));
    setSelected([]);
  };

  // 注文自体をキャンセル
  const handleCancelOrder = () => {
    if (!window.confirm('この注文をキャンセルしますか？')) return;
    if (orderFromState) {
      // 編集時は上書き
      const canceledOrder = {
        ...orderFromState,
        name: customer.name,
        date: date,
        status: 'キャンセル済',
        rows: [...rows],
      };
      updateOrder(canceledOrder);
    } else {
      // 新規作成時は追加
      const cancelOrder = {
        id: Date.now(),
        name: customer.name,
        date: date,
        status: 'キャンセル済',
        rows: [...rows],
      };
      addOrder(cancelOrder);
    }
    navigate('/orders');
  };

  const handleCreateOrder = () => {
    if (!validate()) return;
    const newOrder = {
      id: Date.now(),
      name: customer.name,
      date: date,
      status: '未納品',
      rows: [...rows],
    };
    addOrder(newOrder);
    navigate('/orders');
  };

  return (
    <div className="App" style={{ background: '#F9DDE2', minHeight: '100vh' }}>
      <nav className="navbar"><div className="navbar-brand">Midorin</div></nav>
      <nav className="breadcrumb"><Breadcrumbs /></nav>
      <div className="main-content column-layout">
        <div className="tab-buttons">
          <NavButton to="/orders">受注管理</NavButton>
          <NavButton to="/deliveries">納品管理</NavButton>
          <NavButton to="/stats">統計情報管理</NavButton>
        </div>
        {/* 注文作成フォーム */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '28px 32px', margin: '32px auto 0', maxWidth: 900, boxShadow: '0 2px 12px #e57d9420' }}>
          <div style={{ display: 'flex', gap: 40, alignItems: 'center', marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>顧客名</div>
              <div style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', margin: '6px 0 0 0' }}>{customer.name}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>担当者名</div>
              <div style={{ fontWeight: 'bold', fontSize: 16, color: '#2d2d4b', textAlign: 'center', margin: '6px 0 0 0' }}>{customer.person}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>受注日付</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="order-date-input"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 商品テーブル・操作ボタン */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, margin: '32px 0 8px 0', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          <button onClick={handleDeleteSelected} style={{ background: '#E57D94', color: '#fff', border: 'none', borderRadius: 22, padding: '8px 32px', fontWeight: 'bold', fontSize: 16, marginLeft: 0, transition: 'background 0.2s' }} disabled={selected.length === 0}>選んだ項目を削除</button>
          <button onClick={handleCancelSelected} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 22, padding: '8px 32px', fontWeight: 'bold', fontSize: 16, transition: 'background 0.2s' }} disabled={selected.length === 0}>選んだ項目をキャンセル</button>
          <button onClick={handleAddRow} style={{ background: '#E57D94', color: '#fff', border: 'none', borderRadius: 22, padding: '8px 32px', fontWeight: 'bold', fontSize: 16, marginRight: 0, transition: 'background 0.2s' }}>商品を追加</button>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e57d9410', maxWidth: 900, margin: '0 auto', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead style={{ background: '#F3F3F6' }}>
              <tr>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 60 }}>選択</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>商品名</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 80 }}>数量</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 100 }}>単価</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 120 }}>備考</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center', width: 80 }}>削除</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f3c1ce' }}>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={selected.includes(row.id)} onChange={() => handleSelectRow(row.id)} disabled={row.status === 'キャンセル済'} />
                  </td>
                  <td style={{ textAlign: 'left', fontWeight: 600, color: '#2d2d4b', fontSize: 15 }}>
                    <input type="text" value={row.name} onChange={e => handleChange(row.id, 'name', e.target.value)} style={{ border: 'none', background: 'transparent', width: '100%', fontWeight: 600, color: '#2d2d4b', fontSize: 15, textDecoration: row.status === 'キャンセル済' ? 'line-through' : 'none' }} disabled={row.status === 'キャンセル済'} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="number" min="1" value={row.quantity} onChange={e => handleChange(row.id, 'quantity', e.target.value)} style={{ border: 'none', background: 'transparent', width: 40, textAlign: 'center', fontSize: 15, textDecoration: row.status === 'キャンセル済' ? 'line-through' : 'none' }} disabled={row.status === 'キャンセル済'} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="number" min="0" value={row.price} onChange={e => handleChange(row.id, 'price', e.target.value)} style={{ border: 'none', background: 'transparent', width: 70, textAlign: 'right', fontSize: 15, textDecoration: row.status === 'キャンセル済' ? 'line-through' : 'none' }} disabled={row.status === 'キャンセル済'} />
                  </td>
                  <td style={{ textAlign: 'center', color: '#2d2d4b', fontSize: 15 }}>
                    <input type="text" value={row.code} onChange={e => handleChange(row.id, 'code', e.target.value)} style={{ border: 'none', background: 'transparent', width: 110, fontSize: 15, textDecoration: row.status === 'キャンセル済' ? 'line-through' : 'none' }} disabled={row.status === 'キャンセル済'} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => handleDeleteRow(row.id)} style={{ background: '#E57D94', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 16px', fontWeight: 'bold', fontSize: 14, cursor: 'pointer' }} disabled={row.status === 'キャンセル済'}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 合計金額・作成ボタン */}
        <div style={{ maxWidth: 900, margin: '32px auto 0' }}>
          <div style={{ fontWeight: 'bold', fontSize: 18, color: '#2d2d4b', marginBottom: 18, textAlign: 'center' }}>合計金額: <span style={{ color: '#E57D94', fontSize: 22 }}>{total.toLocaleString()} 円</span></div>
          <div style={{ textAlign: 'center', marginTop: 32, display: 'flex', justifyContent: 'center', gap: 32 }}>
            <button style={{ background: '#1B2A58', color: '#fff', border: 'none', borderRadius: 22, padding: '12px 48px', fontWeight: 'bold', fontSize: 18, letterSpacing: 1, boxShadow: '0 2px 8px #1b2a5810', transition: 'background 0.2s' }} onClick={handleCreateOrder}>この内容で作成する</button>
            <button style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 22, padding: '12px 48px', fontWeight: 'bold', fontSize: 18, letterSpacing: 1, boxShadow: '0 2px 8px #aaa8', transition: 'background 0.2s' }} onClick={handleCancelOrder}>この注文をキャンセルする</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEditPage;
