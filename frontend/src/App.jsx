import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import RequireAuth from './components/RequireAuth';

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
              <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
              <Route path="/orders" element={<RequireAuth><OrderListPage /></RequireAuth>} />
              <Route path="/orders/create" element={<RequireAuth><OrderCreatePage /></RequireAuth>} />
              <Route path="/orders/edit" element={<RequireAuth><OrderEditPage /></RequireAuth>} />
              <Route path="/deliveries" element={<RequireAuth><DeliveryListPage /></RequireAuth>} />
              <Route path="/deliveries/select" element={<RequireAuth><DeliverySelectPage /></RequireAuth>} />
              <Route path="/deliveries/select/create" element={<RequireAuth><DeliveryCreatePage /></RequireAuth>} />
              <Route path="/deliveries/select/edit" element={<RequireAuth><DeliveryEditPage /></RequireAuth>} />
              <Route path="/stats" element={<RequireAuth><StatsPage /></RequireAuth>} />
              <Route path="/customers" element={<RequireAuth><CustomerPage /></RequireAuth>} />
            </Routes>
          </div>
        </Router>
      </DeliveryProvider>
    </OrderProvider>
  );
};

export default App;
