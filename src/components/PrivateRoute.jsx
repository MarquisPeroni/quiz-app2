import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const user = useSelector(state => state.user);
  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
