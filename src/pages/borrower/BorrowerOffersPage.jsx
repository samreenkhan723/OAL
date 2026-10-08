import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OfferComparison } from '../../components/loans/OfferComparison';
import { DollarSign, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const BorrowerOffersPage = () => {
  const { applications, offers, currentUser } = useApp();
  
  // Borrower's applications
  const myApps = applications.filter(a => a.borrowerId === currentUser.id);
  const displayApps = myApps.length > 0 ? myApps : applications;

  const [selectedAppId, setSelectedAppId] = useState(displayApps[0]?.id || 'APP-2026-1082');

  const selectedApp = displayApps.find(a => a.id === selectedAppId) || displayApps[0];
  const selectedAppOffers = offers.filter(o => o.applicationId === selectedApp?.id);
  const hasAccepted = selectedAppOffers.some(o => o.status === 'ACCEPTED');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Lender Offers & Financing Proposals
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
              Rule FR-10
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review side-by-side term sheets from institutional underwriters and accept your preferred commercial offer.
          </p>
        </div>

        {hasAccepted && (
          <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold w-full sm:w-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Binding Offer Accepted — Processing In Progress</span>
          </div>
        )}
      </div>

      {/* Application Switcher (if multiple applications exist) */}
      {displayApps.length > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">Select Active Loan File:</span>
          <div className="flex flex-wrap items-center gap-2">
            {displayApps.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedAppId === app.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{app.businessName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${selectedAppId === app.id ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'}`}>
                  {app.id}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Offer Comparison Component */}
      <OfferComparison applicationId={selectedApp?.id} offers={offers} />
    </div>
  );
};
