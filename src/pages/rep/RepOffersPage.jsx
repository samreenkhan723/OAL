import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, DollarSign, ShieldAlert, CheckCircle2, Clock, Edit3, X, Check } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepOffersPage = () => {
  const { offers, applications, updateOffer } = useApp();
  const [editingOffer, setEditingOffer] = useState(null);
  const [offerForm, setOfferForm] = useState({
    amount: '',
    interestRate: '',
    termMonths: '',
    status: 'PENDING_REVIEW',
    mediationNotes: ''
  });

  const handleOpenEdit = (offer) => {
    setEditingOffer(offer);
    setOfferForm({
      amount: offer.amount,
      interestRate: offer.interestRate,
      termMonths: offer.termMonths,
      status: offer.status,
      mediationNotes: offer.mediationNotes || 'Verified applicant cash flows. Terms tailored to seasonal commercial revenue.'
    });
  };

  const handleSaveOffer = (e) => {
    e.preventDefault();
    if (!editingOffer) return;

    const amount = Number(offerForm.amount) || editingOffer.amount;
    const rate = Number(offerForm.interestRate) || editingOffer.interestRate;
    const term = Number(offerForm.termMonths) || editingOffer.termMonths;
    const monthlyPayment = Math.round((amount * (1 + (rate / 100) * (term / 12))) / term);

    if (updateOffer) {
      updateOffer(editingOffer.id, {
        amount,
        interestRate: rate,
        termMonths: term,
        monthlyPayment,
        status: offerForm.status,
        mediationNotes: offerForm.mediationNotes
      });
    }

    setEditingOffer(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Offer Oversight & Compliance Audit
          </h1>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            REP MEDIATION & OVERSIGHT ACTIVE
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Monitor and adjust terms issued by institutional underwriters. As an OAL Representative, you may mediate term sheets, update rate concessions, and synchronize fiduciary adjustments.
        </p>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Active Commercial Term Sheets ({offers.length})</span>
          <span className="text-[11px] text-blue-600 font-bold">Interactive Mediation Mode</span>
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

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(offer)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 w-full md:w-auto cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Offer Terms</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Offer Terms Modal */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Edit Commercial Term Sheet</h3>
                <span className="text-xs font-mono text-slate-400">{editingOffer.id} • {editingOffer.lenderAlias}</span>
              </div>
              <button onClick={() => setEditingOffer(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Amount ($)</label>
                  <input
                    type="number"
                    value={offerForm.amount}
                    onChange={(e) => setOfferForm({ ...offerForm, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Interest Rate (% APR)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={offerForm.interestRate}
                    onChange={(e) => setOfferForm({ ...offerForm, interestRate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Months)</label>
                  <input
                    type="number"
                    value={offerForm.termMonths}
                    onChange={(e) => setOfferForm({ ...offerForm, termMonths: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Status</label>
                  <select
                    value={offerForm.status}
                    onChange={(e) => setOfferForm({ ...offerForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="PENDING_REVIEW">Pending Review</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="DECLINED">Declined</option>
                    <option value="EXPIRED">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Representative Mediation / Audit Notes</label>
                <textarea
                  rows={2}
                  value={offerForm.mediationNotes}
                  onChange={(e) => setOfferForm({ ...offerForm, mediationNotes: e.target.value })}
                  placeholder="Record underwriting adjustments and borrower consultation notes..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 cursor-pointer text-center"
                >
                  Save Offer Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
