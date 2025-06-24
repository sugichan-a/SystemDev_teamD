import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    // 初期データ（OrderListPageの初期データと同じ）
    { id: 1, name: 'フラワーショップブルーム', date: '2025/6/7', status: '未納品' },
    { id: 2, name: 'ブックカフェ ライブラリー', date: '2025/5/11', status: '納品済' },
    { id: 3, name: '森本友香', date: '2025/4/30', status: '納品済' },
    { id: 4, name: 'コーヒーラウンジ レイユ', date: '2025/1/7', status: '納品済' },
    { id: 5, name: '木原パオロ隼人', date: '2024/12/7', status: 'キャンセル済' },
    { id: 6, name: 'キューズモール森ノ宮', date: '2024/8/7', status: '削除済' },
  ]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const removeOrders = (ids) => {
    setOrders(prev => prev.filter(order => !ids.includes(order.id)));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
