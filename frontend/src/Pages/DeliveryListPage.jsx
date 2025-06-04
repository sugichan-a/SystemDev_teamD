import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import Checkbox from '../components/Checkbox';
import DateInput from '../components/DateInput';
import OrderTable from '../components/OrderTable';

const generateDummyOrders = (count) => {
  const customers = ['大阪情報専門学校', '森ノ宮図書館', '緑橋病院', '天王寺高校'];
  const statuses = ['済', '未'];
  const notes = ['', '至急', '要確認'];

  const orders = [];
  for (let i = 1; i <= count; i++) {
    const date = new Date(2024, 11, Math.floor(Math.random() * 30) + 1);
    const formattedDate = date.toISOString().split('T')[0];

    orders.push({
      id: i,
      orderNumber: `D-${String(i).padStart(3, '0')}`,
      customer: customers[i % customers.length],
      date: formattedDate,
      status: statuses[i % statuses.length],
      notes: notes[i % notes.length],
      deleted: i % 10 === 0,
    });
  }
  return orders;
};

const DeliveryListPage = () => {
  const navigate = useNavigate();
  const ordersPerPage = 50;
  const [orders] = useState(generateDummyOrders(150));
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [hasNotes, setHasNotes] = useState(false);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSearch = () => {
    const filtered = orders.filter((order) => {
      const matchesText =
        searchText === '' ||
        order.customer.includes(searchText) ||
        order.orderNumber.includes(searchText) ||
        order.notes.includes(searchText);
      const matchesFrom = fromDate === '' || order.date >= fromDate;
      const matchesTo = toDate === '' || order.date <= toDate;
      const matchesNotes = !hasNotes || order.notes !== '';
      const matchesDeleted = includeDeleted || !order.deleted;
      return (
        matchesText &&
        matchesFrom &&
        matchesTo &&
        matchesNotes &&
        matchesDeleted
      );
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleClearConditions = () => {
    setSearchText('');
    setFromDate('');
    setToDate('');
    setHasNotes(false);
    setIncludeDeleted(false);
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * ordersPerPage;
    const end = start + ordersPerPage;
    return filteredOrders.slice(start, end);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleDelete = (id) => {
    setFilteredOrders(prev => prev.filter(order => order.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/deliveries/edit/${id}`);
  };

  const handleCheckItem = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(currentOrders.map((o) => o.id));
    } else {
      setCheckedItems([]);
    }
  };

  const handleBulkDelete = () => {
    if (checkedItems.length === 0) return alert('削除対象が選択されていません');
    if (window.confirm(`${checkedItems.length} 件を削除しますか？`)) {
      const remaining = filteredOrders.filter((o) => !checkedItems.includes(o.id));
      setFilteredOrders(remaining);
      setCheckedItems([]);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-roboto">
      <h1 className="text-2xl font-bold mb-6">納品管理画面</h1>

      <div className="bg-gray-100 p-4 rounded-md mb-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">検索条件を指定してください</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">フリーワード</label>
          <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">納品日付管理</span>
          <DateInput value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <span>～</span>
          <DateInput value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>

        <div className="flex items-center gap-6">
          <Checkbox label="備考あり" checked={hasNotes} onChange={(e) => setHasNotes(e.target.checked)} name="hasNotes" />
          <Checkbox label="削除データを含む" checked={includeDeleted} onChange={(e) => setIncludeDeleted(e.target.checked)} name="includeDeleted" />
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handleSearch} className="bg-pink-500 hover:bg-pink-600">この条件で検索する</Button>
          <Button onClick={handleClearConditions} className="bg-gray-400">検索条件をクリア</Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button className="bg-red-500" onClick={handleBulkDelete}>選択項目を削除</Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/deliveries/create')} className="bg-pink-500 hover:bg-pink-600">納品書作成</Button>
        </div>
      </div>

      <OrderTable
        orders={currentOrders}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCheck={{
          all: handleCheckAll,
          item: handleCheckItem,
        }}
        checkedItems={checkedItems}
      />

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1 ? 'bg-pink-500 text-white' : 'bg-white text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeliveryListPage;
