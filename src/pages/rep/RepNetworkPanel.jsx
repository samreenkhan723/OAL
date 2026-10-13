import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Redirects Rep Network Panel navigation to dedicated /network/dashboard workspace
 */
export const RepNetworkPanel = () => {
  return <Navigate to="/network/dashboard" replace />;
};

export default RepNetworkPanel;
