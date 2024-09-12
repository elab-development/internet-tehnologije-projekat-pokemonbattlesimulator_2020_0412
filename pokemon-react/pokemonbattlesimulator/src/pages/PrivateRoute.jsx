import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const role = localStorage.getItem('userRole');
  const isAuthenticated = !!localStorage.getItem('authToken');


  return (
    <Route
      {...rest}
      element={
        isAuthenticated && role === requiredRole ? (
          Component
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

     
