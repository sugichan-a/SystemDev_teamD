import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('selectedStore');
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: '#e57d94',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '8px 20px',
        fontWeight: 'bold',
        fontSize: 15,
        cursor: 'pointer',
        marginLeft: 16
      }}
    >
      ログアウト
    </button>
  );
};

export default LogoutButton;