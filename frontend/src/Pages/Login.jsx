import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs';
import '../App.css';

const stores = [
  { id: 'imazato', name: '今里店' },
  { id: 'fukaebashi', name: '深江橋店' },
  { id: 'midoribashi', name: '緑橋本店' },
];

const Login = () => {
  const [selectedStore, setSelectedStore] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedStore) {
      setError('店舗を選択してください');
      return;
    }
    if (!password) {
      setError('パスワードを入力してください');
      return;
    }
    setError('');
    localStorage.setItem('selectedStore', selectedStore);
    localStorage.setItem('userToken', 'dummy_token'); // 認証トークンを保存
    navigate('/home');
  };

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
      <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24, textAlign: 'center' }}>店舗を選択してログイン</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600 }}>店舗選択</label>
            <select
              value={selectedStore}
              onChange={e => setSelectedStore(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 8, borderRadius: 6, border: '1px solid #ccc' }}
            >
              <option value="">-- 店舗を選択 --</option>
              {stores.map(store => (
                <option key={store.id} value={store.name}>{store.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 8, borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
              autoComplete="current-password"
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              background: '#192550',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
