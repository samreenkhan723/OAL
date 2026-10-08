import React from 'react';
import { useApp } from '../../context/AppContext';
import { MediatedChat } from '../../components/loans/MediatedChat';

export const LenderMessagesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Communications
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Secure mediated messaging channel with OAL Placement Agent Elena Rostova. Direct borrower contact is restricted under Rule FR-09.
        </p>
      </div>

      <MediatedChat applicationId="APP-2026-1082" />
    </div>
  );
};
