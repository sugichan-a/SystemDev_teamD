import React, { useState } from 'react';
import './CustomerSelectModal.css';

const customers = [
  { id: 1, name: 'フラワーショップブルーム', person: '山田太郎' },
  { id: 2, name: 'ブックカフェ ライブラリー', person: '佐藤花子' },
  { id: 3, name: '森本友香', person: '森本友香' },
  { id: 4, name: 'コーヒーラウンジ レイユ', person: '鈴木一郎' },
  { id: 5, name: '木原パオロ隼人', person: '木原パオロ隼人' },
  { id: 6, name: 'キューズモール森ノ宮', person: '田中健' },
];

const CustomerSelectModal = ({ visible, onClose, onSelect }) => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const filtered = customers.filter(c =>
    c.name.includes(search) || c.person.includes(search)
  );
  if (!visible) return null;
  return (
    <div className="csm-modal-overlay">
      <div className="csm-modal-content csm-modal-list">
        <h2 className="csm-title">顧客を選択してください</h2>
        <input
          className="csm-search-box"
          type="text"
          placeholder="顧客名・担当者名で検索"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ul className="csm-list-view">
          {filtered.map(c => (
            <li
              key={c.id}
              className={`csm-list-item${selectedId === c.id ? ' csm-selected' : ''}`}
              onClick={() => setSelectedId(c.id)}
              style={{ cursor: 'pointer' }}
            >
              <span className="csm-list-name">{c.name}</span>
              <span className="csm-list-person">（担当: {c.person}）</span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="csm-list-item csm-no-result">該当する顧客が見つかりません</li>
          )}
        </ul>
        <div className="csm-btn-row">
          <button className="csm-cancel-btn" onClick={onClose}>キャンセル</button>
          <button
            className="csm-create-btn primary-button"
            onClick={() => {
              const selectedCustomer = customers.find(c => c.id === selectedId);
              if (selectedCustomer) {
                onSelect(selectedCustomer);
              }
            }}
            disabled={selectedId === null}
          >この顧客で作成</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelectModal;
