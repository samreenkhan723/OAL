import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Lock, CheckCircle2, AlertCircle, ShieldAlert, Users } from 'lucide-react';

export const WorkingDealSlots = ({ application, onClaimSuccess }) => {
  const { currentRole, currentUser, claimWorkingDeal } = useApp();

  const workingDeals = application?.workingDeals || { claimedLendersCount: 0, maxSlots: 3, claims: [] };
  const claims = workingDeals.claims || [];
  const claimedCount = claims.length;
  const maxSlots = 3;
  const slotsRemaining = Math.max(0, maxSlots - claimedCount);
  const isFull = claimedCount >= maxSlots;

  const userHasClaimed = claims.some(c => c.lenderId === currentUser?.id);

  const handleClaim = () => {
    const res = claimWorkingDeal(application.id);
    if (res.success && onClaimSuccess) {
      onClaimSuccess();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-purple-600" />
              Working Deal Underwriting Slots
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
              Rule FR-08 (Max 3)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            To prevent fragmented borrower terms, only up to 3 institutional lenders may concurrently underwrite this file.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isFull
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : claimedCount > 0
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            {claimedCount} of {maxSlots} Slots Filled
          </span>
        </div>
      </div>

      {/* Visual 3 Slots Representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[0, 1, 2].map((slotIdx) => {
          const claim = claims[slotIdx];
          const isSlotFilled = !!claim;
          const isMyClaim = claim?.lenderId === currentUser?.id;

          return (
            <div
              key={slotIdx}
              className={`p-4 rounded-xl border transition-all ${
                isSlotFilled
                  ? isMyClaim
                    ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200'
                  : 'bg-white border-dashed border-slate-300 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">
                  Slot #{slotIdx + 1}
                </span>
                {isSlotFilled ? (
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    Open Slot
                  </span>
                )}
              </div>

              {isSlotFilled ? (
                <div>
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {/* Anonymized per PRD: lenders never see competing lender real identities */}
                    {isMyClaim ? `${currentUser?.name} (You)` : claim.lenderAlias || `Institutional Lender #${8000 + slotIdx}`}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Claimed: {new Date(claim.claimedAt).toLocaleDateString()}
                  </div>
                  {claim.status && (
                    <div className="mt-2 text-[10px] font-medium text-slate-600 bg-white/80 px-2 py-1 rounded border border-slate-200 inline-block">
                      Status: {claim.status.replace(/_/g, ' ')}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-2 text-center">
                  <span className="text-xs text-slate-600 font-medium">Available for claiming</span>
                  <p className="text-[10px] text-slate-600 mt-0.5">Eligible lender only</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Claim Button for Lender Role */}
      {currentRole === 'lender' && (
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            {userHasClaimed ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> You have secured an active working deal on this application.
              </span>
            ) : isFull ? (
              <span className="text-rose-600 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Working deal limit reached (3 of 3 lenders active). New claims blocked.
              </span>
            ) : (
              <span>
                {slotsRemaining} slot{slotsRemaining > 1 ? 's' : ''} available. Claiming allows you to review private deal particulars and submit an offer.
              </span>
            )}
          </div>

          {!userHasClaimed && (
            <button
              onClick={handleClaim}
              disabled={isFull}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isFull
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-purple-600/20'
              }`}
            >
              {isFull ? 'Deal Full (3/3 Lenders)' : 'Claim Working Deal Slot'}
            </button>
          )}
        </div>
      )}

      {/* Invariant Note */}
      <div className="mt-3 text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
        <strong>Privacy Invariant:</strong> Competing lenders cannot inspect other underwriters' identities, credit models, or offers. Representative mediation manages all communications.
      </div>
    </div>
  );
};
