import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import DateInput from '../components/DateInput';

// 共通の入力エリアセクション
const InputSection = ({ title, required = false, children }) => (
  <div style={{ flex: 1, border: '1px solid #aaa' }}>
    <div style={{
      backgroundColor: '#757575',
      color: 'white',
      textAlign: 'center',
      padding: '10px',
      fontWeight: 'bold',
      borderBottom: '1px solid #aaa',
    }}>
      {title}{required && '【必須項目】'}
    </div>
    <div style={{
      backgroundColor: '#e0e0e0',
      padding: '10px',
      textAlign: 'center',
    }}>
      {children}
    </div>
  </div>
);

// アクションボタン共通化
const ActionButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: '#ec407a',
      color: '#fff',
      padding: '8px 40px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    {label}
  </button>
);

// スタイル共通化
const inputStyle = {
  width: '90%',
  padding: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: 'white',
};

const numberInputStyle = {
  width: '60%',
  padding: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: 'white',
};

const OrderEditPage = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [deliveryDestination, setDeliveryDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  return (
    <div className="p-4">
      {/* ナビゲーション */}
      <HeaderNav />

      {/* 上部ボタン */}
      <div className="flex justify-between mt-6">
        <ActionButton label="戻る" onClick={() => navigate('/orders')} />
        <ActionButton label="注文書作成" onClick={() => navigate('/orders/create')} />
      </div>

      {/* 1行目：納品先・受注日付 */}
      <div style={{ display: 'flex', width: '100%' }}>
        <InputSection title="納品先" required>
          <input
            type="text"
            value={deliveryDestination}
            onChange={(e) => setDeliveryDestination(e.target.value)}
            placeholder="納品先を入力"
            style={inputStyle}
          />
        </InputSection>

          <InputSection title="受注日付" required>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DateInput value={selectedDate} onChange={handleDateChange} />
            </div>   
          </InputSection>

      </div>

      {/* 2行目：品名・数量・単価・摘要・備考 */}
      <div style={{ display: 'flex', width: '100%' }}>
        <InputSection title="品名">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="品名を入力"
            style={inputStyle}
          />
        </InputSection>

        <InputSection title="数量">
          <input type="number" style={numberInputStyle} />
        </InputSection>

        <InputSection title="単価">
          <input type="number" style={numberInputStyle} />
        </InputSection>

        <InputSection title="摘要">
          <input type="text" style={numberInputStyle} />
        </InputSection>

        <InputSection title="備考">
          <input type="text" style={numberInputStyle} />
        </InputSection>
      </div>

      {/* 固定表示の合計欄 */}
      <div style={{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        width: '250px',
        height: '100px',
        border: '1px solid #aaa',
        borderRadius: '8px',
        backgroundColor: '#e0e0e0',
        padding: '0',
        boxSizing: 'border-box',
        zIndex: 9999,
        display: 'flex'
      }}>
        {/* 合計数量 */}
        <div style={{ flex: 1, borderRight: '1px solid #aaa' }}>
          <div style={{
            backgroundColor: '#757575',
            color: 'white',
            textAlign: 'center',
            padding: '8px',
            fontWeight: 'bold',
            borderBottom: '1px solid #aaa'
          }}>
            合計数量
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px'
          }}>
            
          </div>
        </div>

        {/* 合計金額 */}
        <div style={{ flex: 1 }}>
          <div style={{
            backgroundColor: '#757575',
            color: 'white',
            textAlign: 'center',
            padding: '8px',
            fontWeight: 'bold',
            borderBottom: '1px solid #aaa'
          }}>
            合計金額
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px'
          }}>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEditPage;
