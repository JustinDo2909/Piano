import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const user = useSelector((state) => state.authUser.authUser);
  const { token } = user;

  return token ? <Component {...rest} /> : <Navigate to="/404" replace />;
};

export default ProtectedRoute;