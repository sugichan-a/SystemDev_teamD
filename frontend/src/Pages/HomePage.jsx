import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ホーム</h1>
      <p className="text-gray-600 mb-6">各種管理画面へのナビゲーション</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button onClick={() => navigate('/orders')}>受注管理</Button>
        <Button onClick={() => navigate('/deliveries')}>納品管理</Button>
        <Button onClick={() => navigate('/stats')}>統計情報管理</Button>
      </div>
    </div>
  );
};

export default HomePage;
