import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';
import { useLocation, useNavigate } from 'react-router-dom';

// コーヒーラウンジ レイユ用のダミー注文書データ
const dummyOrders = [
  // 注文書1（未納品）
  { id: 1, orderId: 101, customerId: 4, name: '医療情報技師 医学医療編', detail: '医療情報技師のための専門書', quantity: 5, price: 2500, delivered: false, code: '987-486705138' },
  { id: 2, orderId: 101, customerId: 4, name: '看護師国家試験対策 2025', detail: '看護師国家試験の最新対策本', quantity: 3, price: 3200, delivered: false, code: '978-476531234' },
  // 注文書2（未納品）
  { id: 3, orderId: 102, customerId: 4, name: '薬剤師のための実践薬学', detail: '薬剤師向けの実践的な薬学書', quantity: 2, price: 4100, delivered: false, code: '978-489234567' },
  { id: 4, orderId: 102, customerId: 4, name: '臨床検査技師テキスト', detail: '臨床検査技師のためのテキスト', quantity: 4, price: 2800, delivered: false, code: '978-476531235' },
  // 注文書3（納品済）
  { id: 5, orderId: 103, customerId: 4, name: '医療安全管理入門', detail: '医療安全管理の入門書', quantity: 1, price: 1800, delivered: true, code: '978-476531236' },
];

const DeliverySelectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state?.customer;
  // location.state.selectedProductIds を受け取る
  const initialSelectedProductIds = location.state?.selectedProductIds || [];
  const [selectedProductIds, setSelectedProductIds] = useState(initialSelectedProductIds);
  const [quantities, setQuantities] = useState({});

  // location.state.selectedProductIds が変わったら反映
  useEffect(() => {
    if (Array.isArray(location.state?.selectedProductIds)) {
      setSelectedProductIds(location.state.selectedProductIds);
    }
  }, [location.state?.selectedProductIds]);

  if (!customer) {
    return <div>顧客情報がありません。</div>;
  }

  // コーヒーラウンジ レイユ以外は空配列
  const customerOrders = customer.name === 'コーヒーラウンジ レイユ'
    ? dummyOrders.filter(o => !o.delivered)
    : [];

  // 注文書ごとにグループ化
  const ordersGrouped = customerOrders.reduce((acc, item) => {
    if (!acc[item.orderId]) acc[item.orderId] = [];
    acc[item.orderId].push(item);
    return acc;
  }, {});

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
        {/* 外側の白背景カードを削除し、sectionごとに必要な装飾のみ残す */}
        {/* 顧客情報セクション */}
        <section style={{ margin: '32px auto 32px auto', maxWidth: 700 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '1.1rem', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #e57d9420', tableLayout: 'fixed' }}>
            <tbody>
              <tr>
                <th style={{ color: '#888', fontWeight: 500, fontSize: 16, width: 160, textAlign: 'left', padding: '18px 18px', borderBottom: '1px solid #e0e0e0', whiteSpace: 'nowrap' }}>顧客名</th>
                <td style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', padding: '18px 0', borderBottom: '1px solid #e0e0e0', letterSpacing: 1, wordBreak: 'break-all' }}>{customer.name}</td>
              </tr>
              <tr>
                <th style={{ color: '#888', fontWeight: 500, fontSize: 16, width: 160, textAlign: 'left', padding: '18px 18px', whiteSpace: 'nowrap' }}>担当者名</th>
                <td style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', padding: '18px 0', letterSpacing: 1, wordBreak: 'break-all' }}>{customer.person}</td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* 商品テーブルセクション */}
        <section style={{ maxWidth: 700, margin: '0 auto' }}>
          {Object.entries(ordersGrouped).map(([orderId, items]) => (
            <div key={orderId} style={{ marginBottom: 40, background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #e57d9420', padding: 0, overflow: 'hidden', width: '95%', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '20px 32px 0 32px', fontWeight: 'bold', fontSize: 17, color: '#888' }}>
                <span style={{ marginRight: 32 }}>注文書番号　<span style={{ color: '#1b2a58', fontWeight: 700, fontSize: 18 }}>T{String(orderId).padStart(5, '0')}</span></span>
                <span style={{ marginRight: 32 }}>受注日付　<span style={{ color: '#1b2a58', fontWeight: 700, fontSize: 18 }}>2025/4/7</span></span>
              </div>
              <table style={{ width: '100%', margin: '18px 0 0 0', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', borderRadius: 0, boxShadow: 'none', fontSize: 16, tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '70px' }} />
                  <col style={{ width: '180px' }} />
                  <col style={{ width: '60px' }} />
                  <col style={{ width: '80px' }} />
                  <col style={{ width: '80px' }} />
                </colgroup>
                <thead style={{ background: '#f3f3f6' }}>
                  <tr>
                    <th style={{ padding: '14px 8px', fontWeight: 700, color: '#888', fontSize: 15, textAlign: 'center', border: 'none' }}>選択</th>
                    <th style={{ padding: '14px 8px', fontWeight: 700, color: '#888', fontSize: 15, textAlign: 'center', border: 'none' }}>商品名</th>
                    <th style={{ padding: '14px 8px', fontWeight: 700, color: '#888', fontSize: 15, textAlign: 'center', border: 'none' }}>数量</th>
                    <th style={{ padding: '14px 8px', fontWeight: 700, color: '#888', fontSize: 15, textAlign: 'center', border: 'none' }}>単価</th>
                    <th style={{ padding: '14px 8px', fontWeight: 700, color: '#888', fontSize: 15, textAlign: 'center', border: 'none' }}>納品数量</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #f3c1ce', background: '#fff' }}>
                      <td style={{ textAlign: 'center' }}>
                        <input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={() => handleSelect(product.id)} style={{ transform: 'scale(1.2)' }} />
                      </td>
                      <td style={{ textAlign: 'left', fontWeight: 700, color: '#2d2d4b', fontSize: 15, wordBreak: 'break-all' }}>{product.name}</td>
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>{product.quantity}</td>
                      <td style={{ textAlign: 'center', fontWeight: 500 }}>{product.price ? product.price.toLocaleString() : '2,500'}</td>
                      <td style={{ textAlign: 'center', fontWeight: 500, verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          <input
                            type="number"
                            min={1}
                            max={product.quantity}
                            value={quantities[product.id] ?? 1}
                            onChange={e => {
                              let val = Number(e.target.value);
                              if (val < 1) val = 1;
                              if (val > product.quantity) val = product.quantity;
                              setQuantities(q => ({ ...q, [product.id]: val }));
                            }}
                            style={{ width: 50, textAlign: 'center', fontSize: 15, border: '1px solid #ccc', borderRadius: 6, padding: '2px 4px' }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {customerOrders.length === 0 && (
            <div style={{ textAlign: 'center', color: '#888', background: '#fff', borderRadius: 16, padding: 32, marginTop: 32 }}>未納品の注文書がありません</div>
          )}
        </section>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            style={{ background: '#1b2a58', color: '#fff', borderRadius: 16, padding: '12px 32px', fontWeight: 'bold', fontSize: 16, border: 'none' }}
            disabled={selectedProductIds.length === 0}
            onClick={() => {
              const selectedProducts = customerOrders.filter(p => selectedProductIds.includes(p.id)).map(p => ({
                ...p,
                quantity: quantities[p.id] ?? p.quantity
              }));
              navigate('/deliveries/select/create', { state: { customer, selectedProducts } });
            }}
          >
            選択した商品で納品書作成へ進む
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliverySelectPage;
