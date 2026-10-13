import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Redirects Lender Network Panel navigation to dedicated /network/dashboard workspace
 */
export const LenderNetworkPanel = () => {
  return <Navigate to="/network/dashboard" replace />;
};

export default LenderNetworkPanel;
