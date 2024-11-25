import React from 'react';
import { Navigate } from 'react-router-dom';

 const ProtectedRoute = ({ children, allowedRoles }) => {
  const currentUser = localStorage.getItem('teacher'); // Retrieve current user
  const isStudent = localStorage.getItem('is_student'); // Retrieve user role

  // Check if user exists and role matches
  if ( allowedRoles && allowedRoles.includes(isStudent)) {
    return <Navigate to="/getCourses" replace />; // Redirect to login
  }

  return children; // Render protected content
};
export default ProtectedRoute;
