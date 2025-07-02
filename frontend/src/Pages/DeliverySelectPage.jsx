import React, { useEffect, useState } from 'react';
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
  const customer = location.state?.customer;
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

  // 顧客IDで該当顧客の注文データを取得（ここでは仮で空配列）
  const customerOrders = [];
  // ...既存の注文データ取得ロジックをここに移行...

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
        {/* 顧客情報セクション・商品テーブルセクションはここで顧客データに基づき表示 */}
        {/* ...既存のUI/UX部分... */}
      </div>
    </div>
  );
};

export default DeliverySelectPage;
