import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, DollarSign, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepOffersPage = () => {
  const { offers, applications } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Offer Oversight & Compliance Audit
          </h1>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-600" />
            READ-ONLY ACCESS (Rule FR-10)
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Monitor terms issued by institutional underwriters. As an OAL Representative, you may inspect all active term sheets but cannot edit, modify, or submit offers on behalf of lenders.
        </p>
      </div>

      {/* Mandatory Rule Restriction Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Non-Negotiable RBAC Restriction (PRD FR-10):</strong> Representatives have strict read-only access to lender term sheets to preserve impartial fiduciary mediation. If an offer modification is requested by the borrower, relay the request to the underwriter via the Communication Hub.
        </div>
      </div>

      {/* Offers Read-Only Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Active Commercial Term Sheets ({offers.length})</span>
          <span className="text-[11px] text-slate-400">Read-Only Auditing Mode</span>
        </div>

        <div className="divide-y divide-slate-100">
          {offers.map((offer) => {
            const linkedApp = applications.find(a => a.id === offer.applicationId);
            return (
              <div key={offer.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{offer.id}</span>
                    <StatusBadge status={offer.status} />
                    <span className="text-xs text-slate-400">
                      Application: {offer.applicationId}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {linkedApp?.businessName || 'Commercial Applicant'}
                  </h3>

                  <div className="text-xs text-slate-500">
                    Lender: <strong className="text-slate-700">{offer.lenderAlias || 'Institutional Partner'}</strong>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div>
                      <span className="text-slate-400">Principal:</span>{' '}
                      <strong className="text-slate-900 font-extrabold">${offer.amount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Rate:</span>{' '}
                      <strong className="text-blue-600 font-bold">{offer.interestRate}% APR</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Duration:</span>{' '}
                      <span className="font-semibold">{offer.termMonths} Months</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Monthly Debt Service:</span>{' '}
                      <span className="font-bold text-slate-900">${offer.monthlyPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-xs font-semibold border border-slate-200 cursor-not-allowed flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Edit Disabled (Rep Read-Only)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
