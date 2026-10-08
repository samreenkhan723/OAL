import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DollarSign, CheckCircle2, Clock, Plus, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderOfferManagementPage = () => {
  const { offers, currentUser, applications } = useApp();

  const myOffers = offers.filter(o => o.lenderId === currentUser.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Offer Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track submitted commercial term sheets, borrower acceptance statuses, and conditions precedent.
          </p>
        </div>

        <Link
          to="/lender/working-deals"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          Draft New Offer from Working Deals
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{myOffers.length} Active Submitted Term Sheets</span>
          <span className="text-emerald-700 font-bold">1 Accepted</span>
        </div>

        <div className="divide-y divide-slate-100">
          {myOffers.map((offer) => {
            const linkedApp = applications.find(a => a.id === offer.applicationId);
            return (
              <div key={offer.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{offer.id}</span>
                    <StatusBadge status={offer.status} />
                    <span className="text-xs text-slate-400">
                      Target: {offer.applicationId}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {linkedApp?.businessName || 'Commercial Applicant'}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div>
                      <span className="text-slate-400">Principal:</span>{' '}
                      <strong className="text-slate-900 font-extrabold">${offer.amount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Rate:</span>{' '}
                      <strong className="text-blue-600 font-bold">{offer.interestRate}% Fixed</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Term:</span>{' '}
                      <span className="font-semibold">{offer.termMonths} Months</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Monthly Debt Service:</span>{' '}
                      <span className="font-bold text-slate-800">${offer.monthlyPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <Link
                    to={`/lender/leads/${offer.applicationId}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all"
                  >
                    View Deal
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
