import React from 'react';
import { useApp } from '../../context/AppContext';
import { MediatedChat } from '../../components/loans/MediatedChat';

export const BorrowerMessagesPage = () => {
  const { applications, currentUser } = useApp();
  const activeApp = applications.find(a => a.borrowerId === currentUser.id) || applications[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Messages & Communications
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct mediated line with Elena Rostova, your Senior OAL Placement Agent.
        </p>
      </div>

      <MediatedChat applicationId={activeApp?.id || 'APP-2026-1082'} />
    </div>
  );
};
