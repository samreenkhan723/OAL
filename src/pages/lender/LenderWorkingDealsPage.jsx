import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Briefcase, DollarSign, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderWorkingDealsPage = () => {
  const { applications, currentUser } = useApp();

  // Find deals claimed by current lender
  const myClaimedApps = applications.filter(a =>
    a.workingDeals?.claims?.some(c => c.lenderId === currentUser.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Active Working Deals
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase">
              Rule FR-08 (Max 3/Deal)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Commercial applications where your fund holds an exclusive concurrent underwriting slot.
          </p>
        </div>

        <Link
          to="/lender/leads"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          Claim New Working Deals
        </Link>
      </div>

      {myClaimedApps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No Active Working Deals Claimed</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse qualified marketplace leads and claim up to 3 slots per commercial file to begin underwriting.
          </p>
          <Link
            to="/lender/leads"
            className="inline-block mt-2 text-xs font-bold text-blue-600 hover:underline"
          >
            Browse Marketplace Leads &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myClaimedApps.map((deal) => {
            const claims = deal.workingDeals?.claims || [];
            return (
              <div
                key={deal.id}
                className="bg-white rounded-2xl border border-purple-200/90 p-6 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{deal.id}</span>
                    <StatusBadge status={deal.status} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{deal.businessName}</h3>
                  <p className="text-xs text-slate-500">{deal.programName} • {deal.loanPurpose}</p>

                  <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Principal:</span>
                      <strong className="text-slate-900 font-extrabold">${deal.amount.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Investment IQ:</span>
                      <strong className="text-[#D5B66A] bg-[#0B1730] px-2 py-0.5 rounded text-[11px] font-bold">
                        {deal.investmentIQ?.total || '154'} / 180
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Working Deal Capacity:</span>
                      <span className="font-bold text-purple-700">{claims.length} of 3 Slots Filled</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    to="/lender/messages"
                    className="p-2 text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    <span>Message Rep</span>
                  </Link>

                  <Link
                    to={`/lender/leads/${deal.id}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Manage / Issue Offer</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
