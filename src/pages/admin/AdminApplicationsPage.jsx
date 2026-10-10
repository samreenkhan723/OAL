import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, ArrowRight, CheckCircle2, ChevronRight, Search, ShieldCheck, Award } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminApplicationsPage = () => {
  const { applications, advanceApplicationStatus, addToast } = useApp();
  const [search, setSearch] = useState('');

  const filteredApps = applications.filter(a =>
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.businessName.toLowerCase().includes(search.toLowerCase()) ||
    a.programName.toLowerCase().includes(search.toLowerCase())
  );

  const ALL_STATUSES = [
    'SUBMITTED',
    'KYC_REVIEW',
    'SCORED',
    'QUALIFIED',
    'WORKING_DEAL',
    'OFFER_RECEIVED',
    'OFFER_ACCEPTED',
    'PROCESSING',
    'APPROVED',
    'FUNDING',
    'FUNDED',
    'DECLINED'
  ];

  const handleAdvance = (appId, newStatus) => {
    advanceApplicationStatus(appId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Master Loan Applications Register
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Supervise all active loan files and test lifecycle milestone transitions.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by application ID, business name, or program..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{filteredApps.length} Commercial Files Logged</span>
          <span className="text-blue-600 font-bold">Lifecycle State Machine Active</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredApps.map((app) => (
            <div key={app.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                  <StatusBadge status={app.status} />
                  <span className="text-[11px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1 shadow-xs">
                    <Award className="w-3 h-3 text-[#002060] shrink-0" />
                    <span>IQ {app.investmentIQ?.total || '150'}/180</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{app.businessName}</h3>
                
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                  <span>{app.programName}</span>
                  <span>•</span>
                  <span>Principal: <strong>${app.amount.toLocaleString()}</strong></span>
                  <span>•</span>
                  <span>Borrower: <strong>{app.borrowerName}</strong></span>
                  <span>•</span>
                  <span>Working Claims: <strong className="text-purple-700">{app.workingDeals?.claimedLendersCount || 0}/3</strong></span>
                </div>
              </div>

              {/* Status Transition Control */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
                  <span className="text-[11px] font-bold text-slate-500 pl-1">Transition State:</span>
                  <select
                    value={app.status}
                    onChange={(e) => handleAdvance(app.id, e.target.value)}
                    className="px-2 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 flex-1 sm:flex-initial"
                  >
                    {ALL_STATUSES.map(st => (
                      <option key={st} value={st}>{st.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
