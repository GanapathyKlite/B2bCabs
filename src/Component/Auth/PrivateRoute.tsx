// src/Component/Auth/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo }) => {
  const { authToken } = useAuth();

  return authToken ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
