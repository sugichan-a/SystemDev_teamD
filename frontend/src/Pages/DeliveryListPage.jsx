// 納品管理画面のコンポーネント
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import Checkbox from '../components/Checkbox';
import DateInput from '../components/DateInput';
import OrderTable from '../components/OrderTable';
import Pagination from '../components/Pagination';
import SearchPanel from '../components/SearchPanel';
// import rawData from '../components/info_order.json';
// 仮データ（info_order.jsonが無い場合のダミーデータ）
const rawData = [
  {
    delivery_name: '株式会社ブックウェイ',
    order_date: '2025-05-15',
    remarks: '次回入荷は未定'
  },
  {
    delivery_name: 'ひまわり書房',
    order_date: '2025-05-18',
    remarks: ''
  },
  {
    delivery_name: 'ページワン',
    order_date: '2025-05-20',
    remarks: '2025年度版'
  }
];
import HeaderNav from '../components/HeaderNav';
import NavButton from '../components/button/NavButton';

// JSONデータを表示用に変換する（idやorderNumberを追加）
const transformData = (data) => {
  return data.map((item, index) => ({
    id: index + 1,
    orderNumber: `D-${String(index + 1).padStart(3, '0')}`,
    customer: item.delivery_name,
    date: item.order_date,
    status: index % 2 === 0 ? '済' : '未', // 偶数番目を"済"、奇数番目を"未"にする仮実装
    notes: item.remarks || '',
  }));
};

const DeliveryListPage = () => {
  const navigate = useNavigate();
  const ordersPerPage = 50;
  const [orders] = useState(transformData(rawData));
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [hasNotes, setHasNotes] = useState(false);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [checkedItems, setCheckedItems] = useState([]);

  // 検索ボタンを押した時のフィルター処理
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

  // 検索条件クリア処理
  const handleClearConditions = () => {
    setSearchText('');
    setFromDate('');
    setToDate('');
    setHasNotes(false);
    setIncludeDeleted(false);
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  // ページネーション：現在表示する50件を切り出す
  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * ordersPerPage;
    const end = start + ordersPerPage;
    return filteredOrders.slice(start, end);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // 個別削除処理
  const handleDelete = (id) => {
    setFilteredOrders(prev => prev.filter(order => order.id !== id));
  };

  // 編集ページへ遷移
  const handleEdit = (id) => {
    navigate(`/deliveries/edit/${id}`);
  };

  // チェックボックス：1件の選択
  const handleCheckItem = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // チェックボックス：全選択
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(currentOrders.map((o) => o.id));
    } else {
      setCheckedItems([]);
    }
  };

  // チェックされた行を一括削除
  const handleBulkDelete = () => {
    if (checkedItems.length === 0) return alert('削除対象が選択されていません');
    if (window.confirm(`${checkedItems.length} 件を削除しますか？`)) {
      const remaining = filteredOrders.filter((o) => !checkedItems.includes(o.id));
      setFilteredOrders(remaining);
      setCheckedItems([]);
    }
  };

  return (
    <div style={{ background: '#F9E6ED', minHeight: '100vh', width: '100%', paddingTop: 40, paddingBottom: 40 }}>
      {/* ナビゲーションボタン（受注・納品・統計） */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32, justifyContent: 'center' }}>
        <NavButton to="/orders">受注管理</NavButton>
        <NavButton to="/deliveries">納品管理</NavButton>
        <NavButton to="/stats">統計情報管理</NavButton>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ textAlign: 'center', marginBottom: 32 }}>納品管理画面</h1>

      {/* 検索条件エリア */}
      <SearchPanel style={{ margin: '0 auto 40px auto', boxShadow: '0 2px 8px #0001' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#374151', marginBottom: 24 }}>検索条件を指定してください</h2>
        {/* 顧客名 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <label style={{
            width: 60,
            height: 24,
            color: '#192550',
            fontFamily: 'Abhaya Libre ExtraBold',
            fontSize: 20,
            fontWeight: 800,
            lineHeight: 'normal',
            marginRight: 20,
            display: 'flex',
            alignItems: 'center',
          }}>顧客名</label>
          <div style={{
            width: 850,
            height: 40,
            background: '#EBE8E8',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
          }}>
            <SearchInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="顧客名を入力"
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 18,
                color: '#222',
              }}
            />
          </div>
        </div>
        {/* 受注日付 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <label style={{ width: 100, fontWeight: 500, color: '#222' }}>受注日付</label>
          <DateInput value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <span style={{ margin: '0 12px' }}>～</span>
          <DateInput value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        {/* チェック条件 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <label style={{ width: 100, fontWeight: 500, color: '#222' }}>注文状態</label>
          <div style={{ display: 'flex', gap: 32 }}>
            <Checkbox label="備考あり" checked={hasNotes} onChange={(e) => setHasNotes(e.target.checked)} name="hasNotes" />
            <Checkbox label="削除データを含む" checked={includeDeleted} onChange={(e) => setIncludeDeleted(e.target.checked)} name="includeDeleted" />
          </div>
        </div>
        {/* ボタン */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
          <Button onClick={handleSearch} className="bg-pink-500 hover:bg-pink-600" style={{ minWidth: 200, fontWeight: 700, fontSize: 16, borderRadius: 24, background: '#192040' }}>この条件で検索する</Button>
          <Button onClick={handleClearConditions} className="bg-gray-400" style={{ minWidth: 200, fontWeight: 700, fontSize: 16, borderRadius: 24 }}>検索条件をクリア</Button>
        </div>
      </SearchPanel>

      {/* 操作ボタン：一括削除と納品書作成 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button className="bg-red-500" onClick={handleBulkDelete}>選択項目を削除</Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/deliveries/create')} className="bg-pink-500 hover:bg-pink-600">納品書作成</Button>
        </div>
      </div>

      {/* テーブル表示エリア */}
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

      {/* ページネーション */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DeliveryListPage;
