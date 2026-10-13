import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bookmark, ArrowRight, Trash2, Eye } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepSavedLeadsPage = () => {
  const { applications, currentUser, savedLeadIds, toggleSaveLead } = useApp();

  const assignedSavedLeads = (applications || []).filter((a) => {
    const isAssigned =
      currentUser?.role === 'admin' ||
      (a.assignedRep &&
        (a.assignedRep.id === currentUser?.id ||
         (a.assignedRep.email && currentUser?.email && a.assignedRep.email.toLowerCase() === currentUser?.email.toLowerCase())));
    return isAssigned && savedLeadIds?.includes(a.id);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#002060]">
            Representative Saved Leads ({assignedSavedLeads.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pinned assigned borrower accounts monitored for lender term sheets and underwriting milestones.
          </p>
        </div>

        <Link
          to="/network/live-stream"
          className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Open Network Panel</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {assignedSavedLeads.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-2">
            <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">No saved borrower leads currently pinned to your placement desk.</p>
            <p className="text-slate-400">Bookmark any assigned lead in the Qualified Leads or Network Panel view to monitor it here.</p>
          </div>
        ) : (
          assignedSavedLeads.map((lead) => (
            <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSaveLead(lead.id)}
                    className="p-1 rounded-md text-amber-500 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-amber-500" />
                  </button>
                  <span className="text-xs font-mono font-bold text-slate-400">#{lead.id}</span>
                  <StatusBadge status={lead.status} />
                  <span className="text-[11px] font-bold text-[#002060] bg-blue-50 px-2 py-0.5 rounded">
                    IQ {lead.investmentIQ?.total || '155'}/180
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{lead.businessName}</h3>
                <p className="text-xs text-slate-500">{lead.programName || 'Commercial Loan'} • ${lead.amount?.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => toggleSaveLead(lead.id)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Unsave</span>
                </button>
                <Link
                  to={`/network/details/${lead.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#0070C0] text-white text-xs font-bold transition-all w-full sm:w-auto text-center cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Examine Dossier</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RepSavedLeadsPage;
