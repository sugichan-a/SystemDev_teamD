import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    // 初期データ（OrderListPageの初期データと同じ）
    { id: 1, name: 'フラワーショップブルーム', date: '2025/6/7', orderDate: '2025/6/1', status: '未納品' },
    { id: 2, name: 'ブックカフェ ライブラリー', date: '2025/5/11', orderDate: '2025/5/5', status: '納品済' },
    { id: 3, name: '森本友香', date: '2025/4/30', orderDate: '2025/4/25', status: '納品済' },
    { id: 4, name: 'コーヒーラウンジ レイユ', date: '2025/1/7', orderDate: '2025/1/1', status: '納品済' },
    { id: 5, name: '木原パオロ紳人', date: '2024/12/7', orderDate: '2024/12/1', status: 'キャンセル済' },
    { id: 6, name: 'キューズモール森ノ宮', date: '2024/8/7', orderDate: '2024/8/1', status: '削除済' },
    { id: 7, name: 'カフェ・ド・ミドリン', date: '2025/6/15', orderDate: '2025/6/10', status: '未納品' },
    { id: 8, name: 'グリーン薬局', date: '2025/6/10', orderDate: '2025/6/2', status: '納品済' },
    { id: 9, name: '森のパン屋', date: '2025/5/28', orderDate: '2025/5/20', status: '納品済' },
    { id: 10, name: 'サクラ美容室', date: '2025/5/20', orderDate: '2025/5/15', status: '未納品' },
    { id: 11, name: 'フラワーショップブルーム', date: '2025/5/18', orderDate: '2025/5/10', status: '納品済' },
    { id: 12, name: 'グリーン薬局', date: '2025/5/5', orderDate: '2025/4/28', status: 'キャンセル済' },
    { id: 13, name: '森のパン屋', date: '2025/4/15', orderDate: '2025/4/10', status: '納品済' },
    { id: 14, name: 'カフェ・ド・ミドリン', date: '2025/3/30', orderDate: '2025/3/25', status: '納品済' },
    { id: 15, name: 'サクラ美容室', date: '2025/3/10', orderDate: '2025/3/1', status: '削除済' },
  ]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const removeOrders = (ids) => {
    setOrders(prev => prev.filter(order => !ids.includes(order.id)));
  };

  // キャンセル処理
  const cancelOrders = (ids) => {
    setOrders(prev => prev.map(order => ids.includes(order.id) ? { ...order, status: 'キャンセル済' } : order));
  };

  // 受注データの更新
  const updateOrder = (updatedOrder) => {
    setOrders(prev => prev.map(order =>
      order.id === updatedOrder.id ? { ...updatedOrder } : order
    ));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrders, cancelOrders, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
