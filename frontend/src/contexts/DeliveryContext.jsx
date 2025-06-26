import React, { createContext, useContext, useState } from 'react';

const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([
    // 初期データ（DeliveryListPageの初期データと同じ）
    { id: 1, name: 'フラワーショップブルーム', date: '2025/6/7', orderDate: '2025/6/1', status: '未納品', rows: [ { price: 1200, quantity: 2 }, { price: 800, quantity: 1 } ] },
    { id: 2, name: 'ブックカフェ ライブラリー', date: '2025/5/11', orderDate: '2025/5/5', status: '納品済', rows: [ { price: 1500, quantity: 1 }, { price: 500, quantity: 3 } ] },
    { id: 3, name: '森本友香', date: '2025/4/30', orderDate: '2025/4/25', status: '納品済', rows: [ { price: 2000, quantity: 1 } ] },
    { id: 4, name: 'コーヒーラウンジ レイユ', date: '2025/1/7', orderDate: '2025/1/1', status: '納品済', rows: [ { price: 900, quantity: 2 }, { price: 400, quantity: 5 } ] },
    { id: 5, name: '木原パオロ紳人', date: '2024/12/7', orderDate: '2024/12/1', status: 'キャンセル済', rows: [ { price: 1000, quantity: 1 } ] },
    { id: 6, name: 'キューズモール森ノ宮', date: '2024/8/7', orderDate: '2024/8/1', status: '削除済', rows: [ { price: 700, quantity: 2 } ] },
    { id: 7, name: 'カフェ・ド・ミドリン', date: '2025/6/15', orderDate: '2025/6/10', status: '未納品', rows: [ { price: 1100, quantity: 1 }, { price: 600, quantity: 2 } ] },
    { id: 8, name: 'グリーン薬局', date: '2025/6/10', orderDate: '2025/6/2', status: '納品済', rows: [ { price: 300, quantity: 10 } ] },
    { id: 9, name: '森のパン屋', date: '2025/5/28', orderDate: '2025/5/20', status: '納品済', rows: [ { price: 250, quantity: 8 }, { price: 500, quantity: 2 } ] },
    { id: 10, name: 'サクラ美容室', date: '2025/5/20', orderDate: '2025/5/15', status: '未納品', rows: [ { price: 2000, quantity: 1 } ] },
    { id: 11, name: 'フラワーショップブルーム', date: '2025/5/18', orderDate: '2025/5/10', status: '納品済', rows: [ { price: 1200, quantity: 1 }, { price: 800, quantity: 2 } ] },
    { id: 12, name: 'グリーン薬局', date: '2025/5/5', orderDate: '2025/4/28', status: 'キャンセル済', rows: [ { price: 300, quantity: 5 } ] },
    { id: 13, name: '森のパン屋', date: '2025/4/15', orderDate: '2025/4/10', status: '納品済', rows: [ { price: 250, quantity: 10 } ] },
    { id: 14, name: 'カフェ・ド・ミドリン', date: '2025/3/30', orderDate: '2025/3/25', status: '納品済', rows: [ { price: 1100, quantity: 2 } ] },
    { id: 15, name: 'サクラ美容室', date: '2025/3/10', orderDate: '2025/3/1', status: '削除済', rows: [ { price: 2000, quantity: 1 } ] },
  ]);

  const addDelivery = (delivery) => {
    setDeliveries(prev => [delivery, ...prev]);
  };

  const removeDeliveries = (ids) => {
    setDeliveries(prev => prev.filter(delivery => !ids.includes(delivery.id)));
  };

  const cancelDeliveries = (ids) => {
    setDeliveries(prev => prev.map(delivery => ids.includes(delivery.id) ? { ...delivery, status: 'キャンセル済' } : delivery));
  };

  const updateDelivery = (updatedDelivery) => {
    setDeliveries(prev => prev.map(delivery =>
      delivery.id === updatedDelivery.id ? { ...updatedDelivery } : delivery
    ));
  };

  return (
    <DeliveryContext.Provider value={{ deliveries, addDelivery, removeDeliveries, cancelDeliveries, updateDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDeliveryContext = () => useContext(DeliveryContext);
