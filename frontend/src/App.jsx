import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';

// ページをインポート
import HomePage from './Pages/HomePage';
import OrderListPage from './Pages/OrderListPage';
import OrderCreatePage from './Pages/OrderCreatePage';
import OrderEditPage from './Pages/OrderEditPage';
import DeliveryListPage from './Pages/DeliveryListPage';
import DeliveryCreatePage from './Pages/DeliveryCreatePage';
import DeliveryEditPage from './Pages/DeliveryEditPage';
import DeliverySelectPage from './Pages/DeliverySelectPage';
import StatsPage from './Pages/StatsPage';
import CustomerPage from './Pages/CustomerPage';
import LoginPage from './Pages/Login';
import { OrderProvider } from './contexts/OrderContext';
import { DeliveryProvider } from './contexts/DeliveryContext';

const App = () => {
  return (
    <OrderProvider>
      <DeliveryProvider>
        <Router>
          <HeaderNav />
          <div className="p-4">
            <Routes>
              {/* ✅ 初期画面は /login にリダイレクト */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/orders" element={<OrderListPage />} />
              <Route path="/orders/create" element={<OrderCreatePage />} />
              <Route path="/orders/edit" element={<OrderEditPage />} />
              <Route path="/deliveries" element={<DeliveryListPage />} />
              <Route path="/deliveries/select" element={<DeliverySelectPage />} />
              <Route path="/deliveries/select/create" element={<DeliveryCreatePage />} />
              <Route path="/deliveries/select/edit" element={<DeliveryEditPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/customers" element={<CustomerPage />} />
            </Routes>
          </div>
        </Router>
      </DeliveryProvider>
    </OrderProvider>
  );
};

export default App;
