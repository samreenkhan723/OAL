import React from 'react';
import { useApp } from '../../context/AppContext';
import { MediatedChat } from '../../components/loans/MediatedChat';
import { MessageSquare, ShieldCheck, Users, Briefcase } from 'lucide-react';

export const RepCommunicationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Tri-Party Mediation Hub
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Mediate discussions between commercial borrowers and participating institutional lenders under Rule FR-09.
        </p>
      </div>

      <MediatedChat applicationId="APP-2026-1082" />
    </div>
  );
};
