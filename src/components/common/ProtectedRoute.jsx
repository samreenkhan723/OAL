import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, currentRole } = useApp();
  const location = useLocation();

  // Allow new loan application form to open directly for applicants without requiring prior login
  if (!isAuthenticated && location.pathname.startsWith('/borrower/applications/new')) {
    return children;
  }

  // Redirect unauthenticated visitors to login, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If role is specified and does not match user's role, route to their own dashboard
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    const roleDashboards = {
      borrower: '/borrower/dashboard',
      lender: '/lender/dashboard',
      rep: '/rep/dashboard',
      admin: '/admin/dashboard',
      support: '/support/tickets'
    };
    return <Navigate to={roleDashboards[currentRole] || '/borrower/dashboard'} replace />;
  }

  return children;
};
