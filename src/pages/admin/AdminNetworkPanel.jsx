import React from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminNetworkPanel = () => {
  const { networkActivity } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Admin Global Network Panel
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live System Broadcast
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Realtime exchange monitoring across all borrower registrations, KYC approvals, claims, and funding disbursements.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {networkActivity.map((act) => (
          <div key={act.id} className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Radio className="w-4 h-4 text-blue-600" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="text-xs font-bold text-slate-900 break-words">{act.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {act.badge}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 shrink-0">{act.timestamp}</span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
