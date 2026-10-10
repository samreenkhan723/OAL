import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, DollarSign, ShieldAlert, CheckCircle2, Clock, Eye, Share2, X, Check, Download, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepOffersPage = () => {
  const { offers, applications, addToast } = useApp();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [offerToShare, setOfferToShare] = useState(null);

  // Read-only inspect modal
  const handleInspectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  // Share Offer with Borrower (Doc 1 - Line 61)
  const handleOpenShare = (offer) => {
    setOfferToShare(offer);
    setShowShareModal(true);
  };

  const handleConfirmShare = () => {
    if (!offerToShare) return;
    setShowShareModal(false);
    if (addToast) {
      addToast(
        'Term Sheet Shared with Borrower',
        `Offer ${offerToShare.id} ($${offerToShare.amount.toLocaleString()}) has been securely dispatched to the borrower's offers portal and notification inbox.`,
        'success'
      );
    }
    setOfferToShare(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Offer Management & Fiduciary Oversight
          </h1>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-700" />
            READ-ONLY GOVERNANCE (DOC 1 MANDATE)
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Supervise institutional term sheets issued by participating underwriters. Per Doc 1, Offer Management is exclusively formulated by Lenders; OAL Representatives have read-only audit privileges and the ability to share term sheets with borrowers.
        </p>
      </div>

      {/* Strict Fiduciary Rule Notice (Doc 1 - Line 61) */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              Doc 1 Rule: Exclusive Lender Offer Formulations
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed max-w-3xl mt-0.5">
              "Reps can view the Offer Management, but they cannot make any edits. The Offer Management is a feature exclusively for Lenders. Reps do have the ability to share the Offer Management results page with the borrower."
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white text-amber-900 border border-amber-200 shrink-0 self-start sm:self-auto">
          Fiduciary Policy Enforced
        </span>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Active Commercial Term Sheets ({offers.length})</span>
          <span className="text-[11px] text-blue-600 font-bold">Read-Only Audit & Share Mode</span>
        </div>

        <div className="divide-y divide-slate-100">
          {offers.map((offer) => {
            const linkedApp = applications.find(a => a.id === offer.applicationId);
            return (
              <div key={offer.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
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
                    Underwriting Fund: <strong className="text-slate-700">{offer.lenderAlias || 'Institutional Partner'}</strong>
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

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => handleInspectOffer(offer)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Inspect Terms</span>
                  </button>

                  {/* Share with Borrower Action (Doc 1 - Line 61) */}
                  <button
                    type="button"
                    onClick={() => handleOpenShare(offer)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share with Borrower</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Read-Only Term Sheet Inspection Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{selectedOffer.id}</span>
                  <StatusBadge status={selectedOffer.status} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Institutional Term Sheet Dossier (Read-Only)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOffer(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Underwriting Fund:</span>
                <span className="font-bold text-slate-900">{selectedOffer.lenderAlias}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Facility Principal:</span>
                <span className="font-extrabold text-slate-900">${selectedOffer.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interest Rate:</span>
                <span className="font-bold text-blue-600">{selectedOffer.interestRate}% Fixed APR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amortization Period:</span>
                <span className="font-semibold text-slate-800">{selectedOffer.termMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Debt Service:</span>
                <span className="font-bold text-slate-900">${selectedOffer.monthlyPayment.toLocaleString()} / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Origination Fee:</span>
                <span className="font-semibold text-slate-800">{selectedOffer.originationFeePercent || 2}%</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong className="block font-bold mb-0.5">Read-Only Policy Notice:</strong>
              Under PRD Rule FR-10 and Doc 1, placement representatives cannot alter terms, rates, or covenants set by underwriters. You may share this official term sheet with the borrower or consult the lender via the broker mediation hub.
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setSelectedOffer(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close View
              </button>

              <button
                type="button"
                onClick={() => {
                  const target = selectedOffer;
                  setSelectedOffer(null);
                  handleOpenShare(target);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Borrower</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share with Borrower Confirmation Modal (Doc 1 - Line 61) */}
      {showShareModal && offerToShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Share Term Sheet with Borrower
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You are about to transmit the commercial term sheet from <strong>{offerToShare.lenderAlias}</strong> to the borrower.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Loan Facility:</span>
                <span className="font-bold text-slate-900">${offerToShare.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interest Rate:</span>
                <span className="font-semibold text-blue-600">{offerToShare.interestRate}% APR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Payment:</span>
                <span className="font-bold text-slate-900">${offerToShare.monthlyPayment.toLocaleString()} / mo</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Borrower will receive an instant portal alert and SMS notification allowing them to review side-by-side terms.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowShareModal(false);
                  setOfferToShare(null);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmShare}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Confirm & Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

