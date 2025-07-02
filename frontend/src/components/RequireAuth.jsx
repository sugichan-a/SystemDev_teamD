import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('userToken');
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
