import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import HeaderNav from '../components/HeaderNav';

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

export default function CustomerInfo() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <style>{`
        .stats-table { width: 100%; max-width: 800px; margin: 0 auto; border-collapse: separate; border-spacing: 0; font-size: 15px; }
        .stats-tr { display: table-row; }
        .stats-th, .stats-td { padding: 10px; border: none; }
        .stats-th { background: #6b7280; color: #fff; text-align: center; font-weight: bold; }
        .stats-td { background: #e5e7eb; color: #222; text-align: center; }
        .stats-th-2 { background: #6b7280; color: #fff; text-align: center; font-weight: bold; border-right: 2px solid #fff; }
        .stats-td-2 { background: #e5e7eb; color: #222; text-align: center; border-right: 2px solid #fff; }
        .stats-th-label { background: #6b7280; color: #fff; text-align: center; font-weight: bold; }
        .stats-td-label { background: #e5e7eb; color: #222; text-align: center; }
        .stats-th-multi { background: #6b7280; color: #fff; text-align: center; font-weight: bold; border-bottom: 2px solid #fff; }
        .stats-td-multi { background: #e5e7eb; color: #222; text-align: center; border-bottom: 2px solid #fff; }
      `}</style>
      {/* パンくずリスト */}
      <div className="text-base mb-6 flex items-center gap-2 font-bold">
        <span>ホーム画面</span>
        <span className="mx-1">/</span>
        <span>統計情報管理</span>
        <span className="mx-1">/</span>
        <span className="text-blue-500 underline cursor-pointer">売上高・リードタイム画面</span>
      </div>
      {/* ボタン */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button onClick={() => navigate('/orders')}>受注管理</Button>
        <Button onClick={() => navigate('/deliveries')}>納品管理</Button>
        <Button onClick={() => navigate('/stats')}>統計情報管理</Button>
      </div>
      {/* 情報テーブル */}
      <table className="stats-table">
        <tbody>
          <tr className="stats-tr">
            <th className="stats-th">顧客名</th>
            <td className="stats-td" colSpan={3}>{customerInfo.name}</td>
          </tr>
          <tr className="stats-tr">
            <th className="stats-th-2" rowSpan={2} colSpan={2} style={{verticalAlign:'middle'}}>
              <div>売上高</div>
              <div style={{marginTop:'16px'}}>リードタイム</div>
            </th>
            <td className="stats-td-2" colSpan={2}>{customerInfo.sales}</td>
          </tr>
          <tr className="stats-tr">
            <td className="stats-td-2" colSpan={2}>{customerInfo.leadTime}</td>
          </tr>
          <tr className="stats-tr">
            <th className="stats-th">担当者名</th>
            <td className="stats-td">{customerInfo.staff}</td>
            <th className="stats-th">電話番号</th>
            <td className="stats-td">{customerInfo.phone}</td>
          </tr>
          <tr className="stats-tr">
            <th className="stats-th">住所</th>
            <td className="stats-td" colSpan={3}>{customerInfo.address}</td>
          </tr>
          <tr className="stats-tr">
            <th className="stats-th">配送先条件等</th>
            <td className="stats-td">{customerInfo.deliveryCondition}</td>
            <th className="stats-th">顧客登録日</th>
            <td className="stats-td">{customerInfo.registerDate}</td>
          </tr>
          <tr className="stats-tr">
            <th className="stats-th">備考</th>
            <td className="stats-td" colSpan={3}>{customerInfo.note}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}