import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Redirects Admin Network Panel navigation to dedicated /network/dashboard workspace
 */
export const AdminNetworkPanel = () => {
  return <Navigate to="/network/dashboard" replace />;
};

export default AdminNetworkPanel;
