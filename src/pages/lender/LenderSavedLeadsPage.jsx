import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bookmark, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderSavedLeadsPage = () => {
  const { applications } = useApp();
  const savedLeads = applications.slice(0, 3); // Bookmarked leads

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Saved Marketplace Leads
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Bookmarked commercial applicants monitored for score changes or working deal availability.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {savedLeads.map((lead) => (
          <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600 shrink-0" />
                <span className="text-xs font-mono font-bold text-slate-400">{lead.id}</span>
                <StatusBadge status={lead.status} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">{lead.businessName}</h3>
              <p className="text-xs text-slate-500 break-words">{lead.programName} • ${lead.amount.toLocaleString()} requested</p>
            </div>

            <Link
              to={`/lender/leads/${lead.id}`}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all self-start sm:self-center w-full sm:w-auto text-center"
            >
              Open File
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
