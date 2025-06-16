import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import DateInput from '../components/DateInput';
import Checkbox from '../components/Checkbox';
import HeaderNav from '../components/HeaderNav';
//import OrderCreatePage from './Pages/OrderCreatePage';
 
 
 
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
      {/* ナビゲーション */}
      <HeaderNav />
 
      {/* 検索条件ラベル */}
      <div
        style={{
          backgroundColor: '#616161',
          color: 'white',
          textAlign: 'center',
          padding: '15px',
          fontWeight: 'bold',
          borderRadius: '6px 6px 0 0',
          width: '115%',
        }}
      >
        検索条件を指定して検索してください
      </div>
 
      {/* 検索エリア */}
      <div
        style={{
          backgroundColor: '#e0e0e0',
          padding: '16px 16px 5px',
          borderRadius: '0 0 6px 6px',
          width: '113%',
         
        }}
      >
        {/* フリーワード */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.1rem' }}>
          <div
            style={{
              width: '120px',
              backgroundColor: '#757575',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '-15px',
              marginLeft: '-15px'
            }}
          >
            フリーワード
          </div>
 
            {/* キーワード入力欄 */}
           <div>
             <SearchInput keyword={keyword} setKeyword={setKeyword} />
           </div>
 
        </div>
 
        {/* 受注日付管理 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.1rem' }}>
          <div
            style={{
              width: '120px',
              backgroundColor: '#757575',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginLeft: '-15px'
            }}
          >
            受注日付管理
          </div>
          <DateInput value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <span style={{ margin: '0 10px' }}>～</span>
          <DateInput value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
 
        {/* 備考と削除データ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div
            style={{
              width: '120px',
              backgroundColor: '#757575',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginLeft: '-15px',
            }}
          >
            備考
          </div>
          <Checkbox
            label="備考あり"
            checked={hasNotes}
            onChange={(e) => setHasNotes(e.target.checked)}
            name="hasNotes"
          />
 
          <div
            style={{
              width: '120px',
              backgroundColor: '#757575',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            削除データ
          </div>
          <Checkbox
            label="削除データを含む"
            checked={includeDeleted}
            onChange={(e) => setIncludeDeleted(e.target.checked)}
            name="includeDeleted"
          />
        </div>
      </div>
 
      {/* ボタン群 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {/* 上段ボタン：検索 & 注文書作成 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              minWidth: '200px',
            }}
          >
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: '#ec407a',
                color: '#fff',
                padding: '8px 40px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              この条件で検索する
            </button>
          </div>
 
          <div>
            <button
              onClick={() => navigate('/orders/create')}
              style={{
                backgroundColor: '#ec407a',
                color: '#fff',
                padding: '8px 30px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              注文書作成
            </button>
          </div>
        </div>
 
        {/* 下段ボタン：削除 & 昇順・降順 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <button
              onClick={() => console.log('選んだ項目を削除')}
              style={{
                backgroundColor: '#ec407a',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              選んだ項目を削除
            </button>
          </div>
 
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => console.log('昇順')}
              style={{
                backgroundColor: '#ef6c00',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
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
                cursor: 'pointer',
              }}
            >
              降順
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default OrderListPage;