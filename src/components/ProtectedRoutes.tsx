// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  const { user, loading } = state;

  if (loading) return <p>Loading...</p>;
  return user ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;