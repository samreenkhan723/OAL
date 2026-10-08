import React from 'react';
import { useApp } from '../../context/AppContext';
import { OfferComparison } from '../../components/loans/OfferComparison';

export const BorrowerOffersPage = () => {
  const { applications, offers, currentUser } = useApp();
  const activeApp = applications.find(a => a.borrowerId === currentUser.id) || applications[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Lender Offers & Financing Proposals
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review side-by-side term sheets from institutional underwriters and accept your preferred commercial offer.
        </p>
      </div>

      <OfferComparison applicationId={activeApp?.id} offers={offers} />
    </div>
  );
};
