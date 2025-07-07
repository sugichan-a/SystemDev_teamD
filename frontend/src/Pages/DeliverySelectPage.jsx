import React, { useEffect, useState } from 'react';
import ordersData from '../components/Orders.json';
import orderDetailsData from '../components/Order_Detail.json';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';
import { useLocation, useNavigate } from 'react-router-dom';

// 店舗ごとの顧客データをimport
import fukaeCustomers from '../components/Customer_Data_Fukae.json';
import midoriCustomers from '../components/Customer_Data_Midori.json';
import imazatoCustomers from '../components/Customer_Data_Imazato.json';

const getCustomersByStore = (store) => {
  if (store === '深江橋店' || store === '深江') return fukaeCustomers;
  if (store === '緑橋本店' || store === '緑橋') return midoriCustomers;
  if (store === '今里店' || store === '今里') return imazatoCustomers;
  return [];
};

const DeliverySelectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // localStorageから店舗名取得
  const storeName = localStorage.getItem('selectedStore') || '';
  const customers = getCustomersByStore(storeName);
  // ListPageや他ページからの遷移に対応し、customer情報を柔軟に取得
  let customer = location.state?.customer || location.state?.selectedCustomer;
  if (!customer && location.state?.delivery && location.state.delivery.name) {
    customer = { name: location.state.delivery.name };
  }
  const initialSelectedProductIds = location.state?.selectedProductIds || [];
  const [selectedProductIds, setSelectedProductIds] = useState(initialSelectedProductIds);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (Array.isArray(location.state?.selectedProductIds)) {
      setSelectedProductIds(location.state.selectedProductIds);
    }
  }, [location.state?.selectedProductIds]);

  if (!customer) {
    return <div>顧客情報がありません。</div>;
  }

  // 顧客IDで該当顧客の未納品注文データを取得
  // Orders/Order_Detail.jsonを使う場合の例
  // 顧客IDがなければ空配列
  let customerOrders = [];
  if (customer.customer_id) {
    // ordersData/orderDetailsDataはimportしておく前提
    const undeliveredOrders = ordersData.filter(
      (order) => order.customer_id === customer.customer_id && order.order_status !== '出荷済み' && order.order_status !== 'キャンセル'
    );
    customerOrders = undeliveredOrders.flatMap(order => {
      const detail = orderDetailsData[order.order_id - 1];
      return (detail?.items || []).map(item => ({
        ...item,
        orderId: order.order_id,
        orderDate: order.order_date,
      }));
    });
  } else {
    // 顧客IDがない場合はダミーデータを表示
    customerOrders = [
      {
        id: 1,
        book_title: '医療情報技師 医学医療編',
        book_quantity: 5,
        book_unitprice: 2500,
        book_note: 'コード: 987-486705138',
        orderId: 999,
        orderDate: '2025-07-01',
      },
      {
        id: 2,
        book_title: '日経ネットワーク',
        book_quantity: 3,
        book_unitprice: 2500,
        book_note: 'コード: 987-486705139',
        orderId: 999,
        orderDate: '2025-07-01',
      },
      {
        id: 3,
        book_title: '日経コンピュータ',
        book_quantity: 1,
        book_unitprice: 1320,
        book_note: 'コード: 987-486705140',
        orderId: 999,
        orderDate: '2025-07-01',
      },
      {
        id: 4,
        book_title: '医療情報技師 医療情報システム編',
        book_quantity: 2,
        book_unitprice: 3200,
        book_note: 'コード: 987-486705141',
        orderId: 999,
        orderDate: '2025-07-01',
      },
    ];
  }
  // ...既存の注文データ取得ロジックをここに移行...

  // 注文書ごとにグループ化
  const ordersGrouped = customerOrders.reduce((acc, item) => {
    if (!acc[item.orderId]) acc[item.orderId] = [];
    acc[item.orderId].push(item);
    return acc;
  }, {});

  // 選択された商品のみ抽出
  const getSelectedProducts = () => {
    const selected = [];
    Object.values(ordersGrouped).forEach(items => {
      items.forEach(item => {
        const itemKey = item.id ?? `${item.orderId}_${item.book_title}`;
        if (selectedProductIds.includes(itemKey)) {
          selected.push({
            ...item,
            quantity: quantities[itemKey] ?? item.book_quantity,
          });
        }
      });
    });
    return selected;
  };

  const handleSelect = (id) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="App" style={{ background: '#F9DDE2', minHeight: '100vh' }}>
      <nav className="navbar"><div className="navbar-brand">Midorin</div></nav>
      <nav className="breadcrumb"><Breadcrumbs /></nav>
      <div className="main-content column-layout" style={{ background: 'none', boxShadow: 'none', borderRadius: 0, padding: 0 }}>
        <div className="tab-buttons">
          <NavButton to="/orders">受注管理</NavButton>
          <NavButton to="/deliveries">納品管理</NavButton>
          <NavButton to="/stats">統計情報管理</NavButton>
        </div>
        {/* 顧客情報カード */}
        <div style={{
          margin: '1.5em 0',
          background: '#fff',
          borderRadius: 14,
          padding: '16px 28px',
          boxShadow: '0 2px 12px #e57d9420',
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: '#223366', marginBottom: 6, letterSpacing: 1 }}>顧客名</div>
            <div style={{ fontWeight: 'bold', fontSize: 17, color: '#223366', marginBottom: 0 }}>{customer?.customer_name || customer?.name || 'ー'}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: 15, color: '#223366', marginBottom: 6, letterSpacing: 1 }}>担当者名</div>
            <div style={{ color: '#222', fontSize: 15 }}>{customer?.customer_manager || customer?.person || 'ー'}</div>
          </div>
        </div>

        {/* 未納品商品リスト（注文書ごと） */}
        {Object.entries(ordersGrouped).map(([orderId, items]) => (
          <div key={orderId} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e57d9410', maxWidth: '1400px', minWidth: '1100px', margin: '0 auto 32px auto', overflow: 'auto', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 'bold' }}>注文番号　T{String(orderId).padStart(5, '0')}</div>
              <div>受注日付　{items[0]?.orderDate}</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '80px' }} />
                <col style={{ width: '40%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '22%' }} />
              </colgroup>
              <thead style={{ background: '#F3F3F6' }}>
                <tr>
                  <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>選択</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>商品名</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>数量</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>単価</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, color: '#888', fontSize: 15, textAlign: 'center' }}>備考</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, iidx) => {
                  const itemKey = item.id ?? `${item.orderId}_${item.book_title}`;
                  return (
                    <tr key={iidx} style={{ borderBottom: '1px solid #f3c1ce' }}>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedProductIds.includes(itemKey)}
                          onChange={() => handleSelect(itemKey)}
                          aria-label="選択"
                        />
                      </td>
                      <td style={{ textAlign: 'left', fontWeight: 600, color: '#2d2d4b', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.book_title}</td>
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>
                        <input
                          type="number"
                          min={0}
                          max={item.book_quantity}
                          value={quantities[itemKey] ?? item.book_quantity}
                          onChange={e => {
                            const val = Number(e.target.value);
                            setQuantities(q => ({ ...q, [itemKey]: val }));
                          }}
                          style={{ width: 48, padding: 2, borderRadius: 4, border: '1px solid #ccc', textAlign: 'right', fontSize: 15, background: '#f9f9f9' }}
                        />
                        <span style={{ marginLeft: 4, color: '#888', fontSize: '0.95em' }}>/ {item.book_quantity}</span>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>{item.book_unitprice}</td>
                      <td style={{ textAlign: 'center', color: '#2d2d4b', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.book_note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}

        {/* 決定ボタン */}
        <button
          style={{ background: '#FF8FA3', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: '1.1em', display: 'block', margin: '0 auto' }}
          onClick={() => {
            const selectedProducts = getSelectedProducts();
            if (selectedProducts.length === 0) {
              window.alert('商品を選択してください');
              return;
            }
            navigate('/deliveries/select/create', { state: { customer, selectedProducts } });
          }}
        >
          この商品で納品書作成
        </button>
      </div>
    </div>
  );
};

export default DeliverySelectPage;
