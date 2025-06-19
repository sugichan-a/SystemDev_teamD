import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const HeaderNav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 bg-gray-100 px-6 py-3 border-b mb-4">
      <Button onClick={() => navigate('/orders')}>受注管理</Button>
      <Button onClick={() => navigate('/deliveries')}>納品管理</Button>
      <Button onClick={() => navigate('/stats')}>統計情報管理</Button>
    </div>
  );
};

export default HeaderNav;
