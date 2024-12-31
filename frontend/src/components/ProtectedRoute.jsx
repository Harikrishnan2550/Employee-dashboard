import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, role, requiredRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
