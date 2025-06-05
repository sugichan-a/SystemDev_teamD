import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ページをインポート
import HomePage from './Pages/HomePage';
import OrderListPage from './Pages/OrderListPage';
import OrderCreatePage from './Pages/OrderCreatePage';
import OrderEditPage from './Pages/OrderEditPage';
import DeliveryListPage from './Pages/DeliveryListPage';
import DeliveryCreatePage from './Pages/DeliveryCreatePage';
import DeliveryEditPage from './Pages/DeliveryEditPage';
import StatsPage from './Pages/StatsPage';
import CustomerPage from './Pages/CustomerPage';

// パンくずリストをインポート
import Breadcrumbs from './components/breadcrumbs';

const App = () => {
  return (
    <Router>
      <div className="p-4"> {/* 全体のレイアウトラッパー */}
        <Breadcrumbs /> {/* 全ページ共通で表示 */}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/orders/create" element={<OrderCreatePage />} />
          <Route path="/orders/edit/:id" element={<OrderEditPage />} />
          <Route path="/deliveries" element={<DeliveryListPage />} />
          <Route path="/deliveries/create" element={<DeliveryCreatePage />} />
          <Route path="/deliveries/edit/:id" element={<DeliveryEditPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/customers" element={<CustomerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
