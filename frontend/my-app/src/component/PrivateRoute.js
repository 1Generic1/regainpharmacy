import React from 'react';
import { Navigate } from 'react-router-dom';

//for user protected route 
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || null;

  //return token ? children : <Navigate to="/login" />;
  if (!token || !user || user.role !== 'user') {
    return <Navigate to="/login" />;
  }

  return children;
};


export default PrivateRoute; 

// for admin and user protected route
/*
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Assuming the user info is stored in localStorage

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user is trying to access an Admin route
  if (children.type.name.includes('Admin') && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />; // Non-admins can't access admin pages
  }

  // If all checks pass, render the children components
  return children;
}; 

export default PrivateRoute; */
