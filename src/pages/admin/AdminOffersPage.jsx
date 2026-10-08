import React from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminOffersPage = () => {
  const { offers, applications } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Master Offers & Term Sheets Oversight
          </h1>
          <VerifyBadge note="Client confirmation pending for admin authority to modify or cancel lender offers" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Platform-wide oversight of commercial term sheets submitted by all institutional lenders.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>{offers.length} Platform Offers Monitored</span>
          <span className="text-emerald-700 font-bold">1 Formally Accepted</span>
        </div>

        <div className="divide-y divide-slate-100">
          {offers.map((offer) => {
            const linkedApp = applications.find(a => a.id === offer.applicationId);
            return (
              <div key={offer.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{offer.id}</span>
                    <StatusBadge status={offer.status} />
                    <span className="text-xs text-slate-400">Target Application: {offer.applicationId}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{linkedApp?.businessName || 'Applicant'}</h3>
                  <div className="text-xs text-slate-500">Lender: <strong>{offer.lenderAlias}</strong></div>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div>
                      <span className="text-slate-400">Principal:</span>{' '}
                      <strong className="text-slate-900 font-extrabold">${offer.amount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Rate:</span>{' '}
                      <strong className="text-blue-600 font-bold">{offer.interestRate}%</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Term:</span>{' '}
                      <span className="font-semibold">{offer.termMonths} Mo.</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Monthly:</span>{' '}
                      <span className="font-bold text-slate-900">${offer.monthlyPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
