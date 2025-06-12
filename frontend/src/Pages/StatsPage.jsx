import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const initialCustomerData = [
  {
    id: 1,
    name: 'ギャラリーカフェ ループ',
    revenue: '120,515円',
    leadTime: '13.5日',
  },
  {
    id: 2,
    name: '情報専門学校',
    revenue: '90,500円',
    leadTime: '11.5日',
  },
  {
    id: 3,
    name: '森ノ宮図書館',
    revenue: '10,0100円',
    leadTime: '14日',
  },
  {
    id: 4,
    name: '緑橋病院　担当者野木',
    revenue: '50,453円',
    leadTime: '7日',
  },
  {
    id: 5,
    name: '看護専門学校',
    revenue: '15,500円',
    leadTime: '5日',
  },
];

const parseLeadTime = (leadTime) => parseFloat(leadTime.replace('日', ''));

const StatsPage = () => {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState(
    [...initialCustomerData].sort((a, b) => parseLeadTime(b.leadTime) - parseLeadTime(a.leadTime))
  );
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // 検索
  const handleSearch = () => {
    setData(
      [...initialCustomerData]
        .filter((item) => item.name.includes(keyword))
        .sort((a, b) => parseLeadTime(b.leadTime) - parseLeadTime(a.leadTime)) // 検索後もリードタイム降順
    );
    setSelected([]);
  };

  // 並び替え
  const handleSort = (order) => {
    const sorted = [...data].sort((a, b) =>
      order === 'asc'
        ? parseLeadTime(a.leadTime) - parseLeadTime(b.leadTime)
        : parseLeadTime(b.leadTime) - parseLeadTime(a.leadTime)
    );
    setData(sorted);
  };

  // Excelアップロード（ダミー）
  const handleExcelUpload = () => {
    alert('Excelアップロード（ダミー）');
  };

  // チェックボックス選択
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 bg-gray-100 space-y-6">
      {/* ナビゲーションボタン */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Button onClick={() => navigate('/orders')}>受注管理</Button>
        <Button onClick={() => navigate('/deliveries')}>納品管理</Button>
        <Button onClick={() => navigate('/stats')}>統計情報管理</Button>
      </div>

      {/* 検索条件 */}
      <div className="bg-gray-400 p-4 text-white text-center text-lg font-semibold rounded">
        検索条件を指定して検索してください
      </div>
      <div className="flex items-center bg-gray-200 p-4 space-x-2 rounded">
        <label className="w-24 bg-gray-500 text-white text-center py-2 rounded">顧客名</label>
        <input
          type="text"
          className="flex-1 border border-gray-300 px-4 py-2 rounded"
          placeholder="顧客名を入力"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* ボタン */}
      <div className="flex space-x-4 px-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleExcelUpload}>
          Excelアップロード
        </button>
        <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={handleSearch}>
          この条件で検索する
        </button>
        <button className="bg-orange-400 text-white px-4 py-2 rounded" onClick={() => handleSort('asc')}>
          昇順
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSort('desc')}>
          降順
        </button>
      </div>

      {/* 顧客データテーブル */}
      <div className="bg-gray-300 p-2 font-bold text-center">
        顧客データ【{data.length}件表示】
      </div>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="p-2 border">選択</th>
            <th className="p-2 border">納品先</th>
            <th className="p-2 border">売上高</th>
            <th className="p-2 border">リードタイム</th>
            <th className="p-2 border">顧客情報</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.id} className="bg-white text-center border-t">
              <td className="p-2 border">
                <input
                  type="checkbox"
                  checked={selected.includes(customer.id)}
                  onChange={() => handleSelect(customer.id)}
                />
              </td>
              <td className="p-2 border">{customer.name}</td>
              <td className="p-2 border">{customer.revenue}</td>
              <td className="p-2 border">{customer.leadTime}</td>
              <td className="p-2 border">
                <button
                  className="bg-gray-300 px-4 py-1 rounded"
                  onClick={() => navigate('/customers')}
                >
                  参照
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;