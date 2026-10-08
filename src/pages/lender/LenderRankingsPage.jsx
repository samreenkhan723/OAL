import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ListOrdered, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderRankingsPage = () => {
  const { applications } = useApp();

  // Sort applications by Investment IQ descending
  const sortedApps = [...applications].sort((a, b) => {
    const scoreA = a.investmentIQ?.total || 0;
    const scoreB = b.investmentIQ?.total || 0;
    return scoreB - scoreA;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Borrower Rankings & Investment IQ Standings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Standardized marketplace ranking of active commercial borrowers sorted by composite readiness score (180 Max).
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>Ranked Across 5 Underwriting Pillars</span>
          <span className="text-[11px] text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Engine v2.4-Standard
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedApps.map((app, idx) => {
            const score = app.investmentIQ?.total || 0;
            return (
              <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                    #{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                      <StatusBadge status={app.status} />
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                      {app.businessName}
                    </h3>

                    <div className="text-xs text-slate-500">
                      {app.programName} • Requested ${app.amount.toLocaleString()} • Rev: ${app.annualRevenue ? (app.annualRevenue / 1000).toLocaleString() + 'k' : '$1M'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto self-start sm:self-center">
                  <div className="text-left sm:text-right">
                    <div className="text-xl font-extrabold text-[#D5B66A] bg-[#0B1730] px-3 py-1 rounded-xl inline-block">
                      {score} <span className="text-xs text-slate-400 font-normal">/ 180</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Composite Score</span>
                  </div>

                  <Link
                    to={`/lender/leads/${app.id}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all text-center shrink-0"
                  >
                    Examine
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
