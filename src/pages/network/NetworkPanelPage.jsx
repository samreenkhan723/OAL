import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { NetworkControlBoard } from '../../components/network/NetworkControlBoard';
import { useApp } from '../../context/AppContext';

/**
 * Dedicated standalone page wrapper for /network/* routes
 * Supports:
 * - /network/dashboard
 * - /network/live-stream
 * - /network/leads
 * - /network/details & /network/details/:id
 * - /network/saved
 * - /network/offers
 * - /network/communication
 * - /network/timeline & /network/timeline/:id
 */
export const NetworkPanelPage = ({ section: propSection }) => {
  const { id } = useParams();
  const location = useLocation();
  const { currentRole } = useApp();

  // Determine section from prop or URL pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pathSection = pathParts[1] || 'dashboard';
  const activeSection = propSection || pathSection;

  return (
    <NetworkControlBoard
      panelType={currentRole || 'lender'}
      initialSection={activeSection}
      selectedId={id}
      isStandaloneRoute={true}
    />
  );
};

export default NetworkPanelPage;
