import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, CheckCircle2, ShieldCheck, AlertCircle, Clock, Calendar, Check, X, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StatusBadge } from '../common/StatusBadge';
import { VerifyBadge } from '../common/VerifyBadge';

export const OfferComparison = ({ applicationId, offers = [] }) => {
  const { currentRole, currentUser, acceptOffer, submitOffer } = useApp();
  const [selectedOfferForAccept, setSelectedOfferForAccept] = useState(null);
  const [showNewOfferModal, setShowNewOfferModal] = useState(false);

  // New offer form state for Lender
  const [newOfferData, setNewOfferData] = useState({
    amount: 450000,
    interestRate: 7.95,
    termMonths: 60,
    monthlyPayment: 9120,
    originationFeePercent: 1.5,
    prepaymentPenalty: 'None after 12 months',
    conditionsText: 'First-position UCC lien on equipment; quarterly financial disclosure.'
  });

  const appOffers = offers.filter(o => !applicationId || o.applicationId === applicationId);
  const hasAcceptedOffer = appOffers.some(o => o.status === 'ACCEPTED');

  const handleConfirmAccept = () => {
    if (!selectedOfferForAccept) return;
    acceptOffer(selectedOfferForAccept.id);
    setSelectedOfferForAccept(null);

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleLenderSubmitOffer = (e) => {
    e.preventDefault();
    submitOffer({
      applicationId,
      amount: newOfferData.amount,
      interestRate: newOfferData.interestRate,
      termMonths: newOfferData.termMonths,
      monthlyPayment: newOfferData.monthlyPayment,
      originationFeePercent: newOfferData.originationFeePercent,
      prepaymentPenalty: newOfferData.prepaymentPenalty,
      requiredConditions: [newOfferData.conditionsText]
    });
    setShowNewOfferModal(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Lender Offers & Terms Comparison
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {appOffers.length} {appOffers.length === 1 ? 'Offer' : 'Offers'} Received
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare term durations, rates, monthly debt service, and covenant requirements side-by-side.
          </p>
        </div>

        {/* Rep Read-Only notice or Lender create button */}
        <div className="flex items-center gap-2">
          {currentRole === 'rep' && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>READ-ONLY: Representative Mediation View</span>
            </div>
          )}

          {currentRole === 'lender' && (
            <button
              onClick={() => setShowNewOfferModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <DollarSign className="w-4 h-4" />
              <span>Draft & Submit Offer</span>
            </button>
          )}
        </div>
      </div>

      {/* Offers Cards / Comparison Grid */}
      {appOffers.length === 0 ? (
        <div className="p-12 text-center text-slate-500">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-700">No Offers Issued Yet</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Participating lenders are currently reviewing credit files and business financials. Qualified offers will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appOffers.map((offer) => {
            const isAccepted = offer.status === 'ACCEPTED';
            const isPending = offer.status === 'PENDING_BORROWER_REVIEW';

            return (
              <div
                key={offer.id}
                className={`rounded-2xl border transition-all flex flex-col justify-between ${
                  isAccepted
                    ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Top Banner */}
                <div className="p-5 border-b border-slate-100/90">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider">
                      {offer.id}
                    </span>
                    <StatusBadge status={offer.status} />
                  </div>

                  <div className="text-xs font-bold text-slate-900 truncate">
                    {/* Anonymized alias to preserve privacy */}
                    {offer.lenderAlias || 'Institutional Commercial Fund'}
                  </div>

                  <div className="mt-3">
                    <div className="text-2xl font-extrabold text-slate-950 tracking-tight">
                      ${offer.amount.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold text-blue-600 mt-0.5">
                      {offer.interestRate}% Fixed APR • {offer.termMonths} Months
                    </div>
                  </div>
                </div>

                {/* Term Matrix */}
                <div className="p-5 space-y-3 flex-1 text-xs text-slate-700">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Monthly Payment:</span>
                    <span className="font-bold text-slate-900">${offer.monthlyPayment.toLocaleString()} / mo</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Origination Fee:</span>
                    <span className="font-semibold">{offer.originationFeePercent}% (${Math.round(offer.amount * (offer.originationFeePercent / 100)).toLocaleString()})</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Closing Costs Est.:</span>
                    <span className="font-semibold">${offer.closingCosts?.toLocaleString() || 'N/A'}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Prepayment Policy:</span>
                    <span className="font-medium text-slate-800 text-right max-w-[160px] truncate" title={offer.prepaymentPenalty}>
                      {offer.prepaymentPenalty}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Closing Conditions:
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                      {offer.requiredConditions?.map((cond, i) => (
                        <li key={i} className="line-clamp-2">{cond}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-2 border-t border-slate-100/90 bg-slate-50/50 rounded-b-2xl">
                  {isAccepted ? (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Offer Accepted & Locked</span>
                    </div>
                  ) : currentRole === 'borrower' ? (
                    <button
                      onClick={() => setSelectedOfferForAccept(offer)}
                      disabled={hasAcceptedOffer}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        hasAcceptedOffer
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-600/20'
                      }`}
                    >
                      {hasAcceptedOffer ? 'Another Offer Accepted' : 'Accept This Offer'}
                    </button>
                  ) : currentRole === 'rep' ? (
                    <div className="w-full py-2 text-center text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl">
                      Read-Only Mediation View
                    </div>
                  ) : (
                    <div className="w-full py-2 text-center text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl">
                      Lender Portfolio Offer
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Accept Offer Confirmation Modal */}
      {selectedOfferForAccept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Confirm Offer Acceptance
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              You are about to accept the funding offer of <strong className="text-slate-900">${selectedOfferForAccept.amount.toLocaleString()} at {selectedOfferForAccept.interestRate}%</strong> for {selectedOfferForAccept.termMonths} months.
            </p>

            <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Debt Service:</span>
                <span className="font-bold text-slate-900">${selectedOfferForAccept.monthlyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lender Alias:</span>
                <span className="font-medium text-slate-800">{selectedOfferForAccept.lenderAlias}</span>
              </div>
              <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                *Accepting this offer locks your loan into the Processing & Approval stage. Other active offers will be declined.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedOfferForAccept(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAccept}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                Confirm & Accept Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lender New Offer Modal */}
      {showNewOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Submit Formal Lender Offer
              </h3>
              <button onClick={() => setShowNewOfferModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLenderSubmitOffer} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Offered Principal Amount ($)</label>
                <input
                  type="number"
                  value={newOfferData.amount}
                  onChange={(e) => setNewOfferData({ ...newOfferData, amount: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interest Rate (% APR)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newOfferData.interestRate}
                    onChange={(e) => setNewOfferData({ ...newOfferData, interestRate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Term Length (Months)</label>
                  <select
                    value={newOfferData.termMonths}
                    onChange={(e) => setNewOfferData({ ...newOfferData, termMonths: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value={12}>12 Months</option>
                    <option value={24}>24 Months</option>
                    <option value={36}>36 Months</option>
                    <option value={48}>48 Months</option>
                    <option value={60}>60 Months</option>
                    <option value={84}>84 Months</option>
                    <option value={120}>120 Months</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Monthly Payment ($)</label>
                  <input
                    type="number"
                    value={newOfferData.monthlyPayment}
                    onChange={(e) => setNewOfferData({ ...newOfferData, monthlyPayment: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Origination Fee (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newOfferData.originationFeePercent}
                    onChange={(e) => setNewOfferData({ ...newOfferData, originationFeePercent: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Prepayment Penalty Structure</label>
                <input
                  type="text"
                  value={newOfferData.prepaymentPenalty}
                  onChange={(e) => setNewOfferData({ ...newOfferData, prepaymentPenalty: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Closing Conditions</label>
                <textarea
                  rows={2}
                  value={newOfferData.conditionsText}
                  onChange={(e) => setNewOfferData({ ...newOfferData, conditionsText: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewOfferModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
                >
                  Submit Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
