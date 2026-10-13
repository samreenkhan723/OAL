import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FileText, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepLoanRequestsPage = () => {
  const { applications, currentUser } = useApp();

  const assignedRequests = (applications || []).filter((a) => {
    if (currentUser?.role === 'admin') return true;
    return (
      a.assignedRep &&
      (a.assignedRep.id === currentUser?.id ||
       (a.assignedRep.email && currentUser?.email && a.assignedRep.email.toLowerCase() === currentUser?.email.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#002060]">
          Representative Loan Requests
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct applications received from assigned borrowers needing initial KYC verification and scoring review.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {assignedRequests.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No loan requests currently assigned to your placement desk.
          </div>
        ) : (
          assignedRequests.slice(0, 5).map((req) => (
            <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{req.id}</span>
                  <StatusBadge status={req.status} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{req.businessName}</h3>
                <p className="text-xs text-slate-500">{req.programName} • ${req.amount.toLocaleString()}</p>
              </div>

              <Link
                to="/rep/messages"
                className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold transition-all w-full sm:w-auto text-center cursor-pointer"
              >
                Mediate File
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
