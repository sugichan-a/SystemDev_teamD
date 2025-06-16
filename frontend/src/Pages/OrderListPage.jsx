import React from 'react';
import '../App.css';
import Breadcrumbs from '../components/breadcrumbs';
import NavButton from '../components/button/NavButton';

const OrderListPage = () => {
  const testData = [
    { name: 'フラワーショップブルーム', date: '2025/4/7', status: '納品待ち' },
    { name: 'ブックカフェ ライブラリー', date: '2025/4/7', status: '納品済' },
    { name: '酒本商会', date: '2025/4/7', status: '削除済' },
    { name: 'コーヒーラウンジ レイユ', date: '2025/4/7', status: '納品済' },
    { name: '木原バス団体', date: '2025/4/7', status: 'キャンセル済' },
    { name: 'キューモール嵐ノ宮', date: '2025/4/7', status: '削除済' }
  ];

  return (
    <div className="App">
      <nav className="navbar"><div className="navbar-brand">Midorin</div></nav>
      <nav className="breadcrumb"><Breadcrumbs /></nav>

      <div className="main-content column-layout">
        <div className="tab-buttons">
          <NavButton to="/orders">受注管理</NavButton>
          <NavButton to="/deliveries">納品管理</NavButton>
          <NavButton to="/stats">統計情報管理</NavButton>
      </div>

        <div className="search-form">
          <input type="text" placeholder="顧客名" />
          <div className="date-range">
            <input type="date" /> ～ <input type="date" />
          </div>
          <div className="status-filters">
            <label><input type="checkbox" /> 受領前</label>
            <label><input type="checkbox" /> 納品済</label>
            <label><input type="checkbox" /> 削除済</label>
            <label><input type="checkbox" /> キャンセル済</label>
          </div>
          <button className="search-button">この条件で検索する</button>
        </div>

        <div className="action-buttons">
          <button className="danger">選んだ項目を削除</button>
          <button className="primary">注文書作成</button>
        </div>

        <table className="order-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>顧客名</th>
              <th>受注日</th>
              <th>注文状態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((item, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`badge ${getBadgeColor(item.status)}`}>{item.status}</span>
                </td>
                <td><button>詳細</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button>1</button>
          <span>/</span>
          <button>2</button>
        </div>
      </div>
    </div>
  );
};

// 状態に応じてバッジ色を切り替える関数
function getBadgeColor(status) {
  switch (status) {
    case '納品済': return 'blue';
    case '納品待ち': return 'gray';
    case '削除済': return 'red';
    case 'キャンセル済': return 'red';
    default: return 'gray';
  }
}

export default OrderListPage;
