import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import DateInput from '../components/DateInput';
import Checkbox from '../components/Checkbox';

const OrderListPage = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [hasNotes, setHasNotes] = useState(false);
    const [includeDeleted, setIncludeDeleted] = useState(false);



  const handleSearch = () => {
    console.log('検索ワード:', keyword);
    // 検索ロジック追加予定
  };

  return (
    <div className="p-4">

      {/* ナビゲーションボタン */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button onClick={() => navigate('/orders')}>受注管理</Button>
        <Button onClick={() => navigate('/deliveries')}>納品管理</Button>
        <Button onClick={() => navigate('/stats')}>統計情報管理</Button>
      </div>

      {/* ラベル */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label className="block text-sm font-medium text-gray-700">
          検索条件を指定して検索してください
        </label>
      </div>


      {/* 検索エリア */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6 space-y-4">
        <div className="flex flex-col gap-4">
         <label className="block text-sm font-medium text-gray-700">
          フリーワード
        </label>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
      </div>

      {/* 日付管理 */}
      <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">受注日付管理</span>
          <DateInput value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <span>～</span>
          <DateInput value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>

      {/* 備考・削除データ欄 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <label className="block text-sm font-medium text-gray-700">
          備考
        </label>
          <Checkbox 
            label="備考あり" 
            checked={hasNotes} 
            onChange={(e) => setHasNotes(e.target.checked)} 
            name="hasNotes" 
          />
       <label className="block text-sm font-medium text-gray-700">
          削除データ
        </label>
          <Checkbox 
            label="削除データを含む" 
            checked={includeDeleted} 
            onChange={(e) => setIncludeDeleted(e.target.checked)} 
            name="includeDeleted" 
          />
      </div>

      {/* ボタン群 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1rem',
      }}>

        {/* 上段：中央＋右 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          
          {/* 中央に配置 */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            minWidth: '200px'
          }}>
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: '#ec407a',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              この条件で検索する
            </button>
          </div>

          {/* 注文書作成（右上） */}
          <div>
            <button
              onClick={() => console.log('注文書作成')}
              style={{
                backgroundColor: '#ec407a',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              注文書作成
            </button>
          </div>
        </div>

        {/* 下段：左＋右 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          
          {/* 左：削除 */}
          <div>
            <button
              onClick={() => console.log('選んだ項目を削除')}
              style={{
                backgroundColor: '#ec407a',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              選んだ項目を削除
            </button>
          </div>

          {/* 右：昇順／降順 */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => console.log('昇順')}
              style={{
                backgroundColor: '#ef6c00',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              昇順
            </button>
            <button
              onClick={() => console.log('降順')}
              style={{
                backgroundColor: '#039be5',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              降順
            </button>
          </div>
        </div>


          </div>
        </div>
      

     {/* 結果一覧（未実装） */}
      <div className="text-gray-500 text-sm">検索結果はここに表示されます。</div>
   </div>
  );
};


export default OrderListPage;
