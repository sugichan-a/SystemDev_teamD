import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* 上部の紺色ナビバー */}
      <nav className="navbar">
        <div className="navbar-brand">Midorin</div>
      </nav>

      {/* 白色のパンくずリスト風ナビバー */}
      <nav className="breadcrumb">
        <Breadcrumbs />
      </nav>

      {/* メインカードエリア */}
      <main className="cards-container">
        <div
          className="card"
          onClick={() => navigate('/orders')}
          style={{ cursor: 'pointer' }}
        >
          受注管理
        </div>
        <div
          className="card"
          onClick={() => navigate('/deliveries')}
          style={{ cursor: 'pointer' }}
        >
          納品管理
        </div>
        <div
          className="card"
          onClick={() => navigate('/stats')}
          style={{ cursor: 'pointer' }}
        >
          統計情報管理
        </div>
      </main>
    </div>
  );
};

export default HomePage;
