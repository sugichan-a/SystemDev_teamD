import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import OrderTable from '../components/OrderTable';
import SearchInput from '../components/SearchInput';
import Checkbox from '../components/Checkbox';
import DateInput from '../components/DateInput';

const DeliveryListPage = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState({
    発送済み: false,
    準備中: false,
  });
  const [filterDate, setFilterDate] = useState('');
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'D-001',
      customer: '山田太郎',
      date: '2025-05-29',
      status: '発送済み',
      notes: '特になし',
    },
    {
      id: 2,
      orderNumber: 'D-002',
      customer: '佐藤花子',
      date: '2025-05-28',
      status: '準備中',
      notes: '急ぎ',
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('この納品データを削除しますか？')) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  const handleStatusChange = (e) => {
    setFilterStatus({
      ...filterStatus,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSearch = () => {
    const filtered = orders.filter((order) => {
      const matchesText =
        searchText === '' ||
        order.orderNumber.includes(searchText) ||
        order.customer.includes(searchText) ||
        order.notes.includes(searchText);

      const matchesStatus =
        !Object.values(filterStatus).includes(true) || filterStatus[order.status];

      const matchesDate = filterDate === '' || order.date === filterDate;

      return matchesText && matchesStatus && matchesDate;
    });

    setFilteredOrders(filtered);
  };

  const [filteredOrders, setFilteredOrders] = useState(orders);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">納品管理画面</h1>
      <p className="text-gray-600 mb-6">納品管理をするための画面</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button onClick={() => navigate('/orders')}>受注管理</Button>
        <Button onClick={() => navigate('/deliveries')}>納品管理</Button>
        <Button onClick={() => navigate('/stats')}>統計情報管理</Button>
        <Button onClick={() => navigate('/deliveries/create')}>納品書作成</Button>
      </div>

      {/* 検索条件入力欄 */}
      <div className="bg-gray-50 p-4 rounded-lg shadow mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <DateInput
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <div className="flex gap-4">
            <Checkbox
              label="発送済み"
              name="発送済み"
              checked={filterStatus["発送済み"]}
              onChange={handleStatusChange}
            />
            <Checkbox
              label="準備中"
              name="準備中"
              checked={filterStatus["準備中"]}
              onChange={handleStatusChange}
            />
          </div>
        </div>
        <Button onClick={handleSearch}>この条件で検索する</Button>
      </div>

      {/* 結果表示テーブル */}
      <OrderTable orders={filteredOrders} onDelete={handleDelete} />
    </div>
  );
};

export default DeliveryListPage;
