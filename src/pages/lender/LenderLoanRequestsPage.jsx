import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderLoanRequestsPage = () => {
  const { applications } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Incoming Loan Requests
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct applications received from assigned OAL representatives seeking institutional quotes.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {applications.slice(0, 4).map((req) => (
          <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">{req.id}</span>
                <StatusBadge status={req.status} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{req.businessName}</h3>
              <p className="text-xs text-slate-500">{req.programName} • ${req.amount.toLocaleString()}</p>
            </div>

            <Link
              to={`/lender/leads/${req.id}`}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all self-end sm:self-center"
            >
              Underwrite File
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
