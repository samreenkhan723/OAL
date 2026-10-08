import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bookmark, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepSavedLeadsPage = () => {
  const { applications } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Saved Leads
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pinned borrower accounts monitored for lender offers or updated bank statement uploads.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {applications.slice(0, 3).map((lead) => (
          <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-mono font-bold text-slate-400">{lead.id}</span>
                <StatusBadge status={lead.status} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{lead.businessName}</h3>
              <p className="text-xs text-slate-500">{lead.programName} • ${lead.amount.toLocaleString()}</p>
            </div>

            <Link
              to="/rep/offers"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all self-end sm:self-center"
            >
              Examine
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
