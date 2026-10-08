import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, ArrowRight, MessageSquare, DollarSign } from 'lucide-react';
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
                <span className="text-[11px] font-extrabold text-[#D5B66A] bg-[#0B1730] px-2 py-0.5 rounded">
                  IQ {lead.investmentIQ?.total || '150'}/180
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{lead.businessName}</h3>
              <p className="text-xs text-slate-500">
                {lead.programName} • Requested ${lead.amount.toLocaleString()} • Borrower: {lead.borrowerName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <Link
                to="/rep/messages"
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Message
              </Link>
              <Link
                to="/rep/offers"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
              >
                Inspect File
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
