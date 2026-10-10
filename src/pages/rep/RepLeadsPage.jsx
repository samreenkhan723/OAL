import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, ArrowRight, MessageSquare, DollarSign, Award } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepLeadsPage = () => {
  const { applications } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Lead Pipeline
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Assigned commercial applicant files requiring document follow-ups, borrower onboarding, or lender coordination.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {applications.map((lead) => (
          <div key={lead.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">{lead.id}</span>
                <StatusBadge status={lead.status} />
                <span className="text-[11px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1 shadow-xs">
                  <Award className="w-3 h-3 text-[#002060] shrink-0" />
                  <span>IQ {lead.investmentIQ?.total || '150'}/180</span>
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{lead.businessName}</h3>
              <p className="text-xs text-slate-500">
                {lead.programName} • Requested ${lead.amount.toLocaleString()} • Borrower: {lead.borrowerName}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
              <Link
                to="/rep/messages"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message</span>
              </Link>
              <Link
                to="/rep/offers"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 text-center"
              >
                <span>Inspect File</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
