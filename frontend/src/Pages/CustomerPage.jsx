import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import NavButton from '../components/button/NavButton';
import Breadcrumbs from '../components/breadcrumbs';

const customerInfo = {
  name: "ギャラリーカフェ ループ",
  sales: "120,515円",
  leadTime: "13.5日",
  staff: "中島葵",
  phone: "050-9467-7580",
  address: "大阪市東成区大今里4-5-2",
  deliveryCondition: "日中不在",
  registerDate: "1995/8/13",
  note: "ボックス内に代金あり"
};

export default function StatsPage() {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <style>{`
        .stats-table { width: 100%; max-width: 900px; margin: 0 auto; border-collapse: separate; border-spacing: 0; font-size: 17px; }
        .stats-th, .stats-td { padding: 16px 10px; border: none; }
        .stats-th { background: #6b7280; color: #fff; text-align: center; font-weight: bold; }
        .stats-td { background: #e5e7eb; color: #222; text-align: center; }
        .stats-th-2 { background: #6b7280; color: #fff; text-align: center; font-weight: bold; border-right: 2px solid #fff; }
        .stats-td-2 { background: #e5e7eb; color: #222; text-align: center; border-right: 2px solid #fff; }
      `}</style>

      {/* パンくずリスト */}
      <div className="App">
      <nav className="navbar"><div className="navbar-brand">Midorin</div></nav>
      <nav className="breadcrumb"><Breadcrumbs /></nav>
      </div>

      {/* ナビゲーションボタン（受注・納品・統計） */}
      <div className="main-content column-layout">
        <div className="tab-buttons">
          <NavButton to="/orders">受注管理</NavButton>
          <NavButton to="/deliveries">納品管理</NavButton>
          <NavButton to="/stats">統計情報管理</NavButton>
        </div>
      </div>
      {/* 情報テーブル */}
      <table className="stats-table">
        <tbody>
          <tr>
            <th className="stats-th">顧客名</th>
            <td className="stats-td" colSpan={3}>{customerInfo.name}</td>
          </tr>
          <tr>
            <th className="stats-th-2" rowSpan={2} colSpan={2} style={{verticalAlign:'middle', fontSize:'18px'}}>
              <div>売上高</div>
              <div style={{marginTop:'18px'}}>リードタイム</div>
            </th>
            <td className="stats-td-2" colSpan={2}>{customerInfo.sales}</td>
          </tr>
          <tr>
            <td className="stats-td-2" colSpan={2}>{customerInfo.leadTime}</td>
          </tr>
          <tr>
            <th className="stats-th">担当者名</th>
            <td className="stats-td">{customerInfo.staff}</td>
            <th className="stats-th">電話番号</th>
            <td className="stats-td">{customerInfo.phone}</td>
          </tr>
          <tr>
            <th className="stats-th">住所</th>
            <td className="stats-td" colSpan={3}>{customerInfo.address}</td>
          </tr>
          <tr>
            <th className="stats-th">配送先条件等</th>
            <td className="stats-td">{customerInfo.deliveryCondition}</td>
            <th className="stats-th">顧客登録日</th>
            <td className="stats-td">{customerInfo.registerDate}</td>
          </tr>
          <tr>
            <th className="stats-th">備考</th>
            <td className="stats-td" colSpan={3}>{customerInfo.note}</td>
          </tr>
        </tbody>
      </table>
        </div>
  );
}