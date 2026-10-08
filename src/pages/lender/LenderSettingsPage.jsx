import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, ShieldCheck, Filter, User } from 'lucide-react';

export const LenderSettingsPage = () => {
  const { currentUser, addToast } = useApp();
  const [criteria, setCriteria] = useState({
    minCreditScore: 650,
    minIQScore: 135,
    minLoanAmount: 50000,
    maxLoanAmount: 2500000,
    autoAlerts: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Criteria Saved', 'Your underwriter preferences have been updated.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Lender Underwriting Criteria & Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Define your credit buy-box to customize AI lead matching and marketplace alerts.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Filter className="w-4 h-4 text-purple-600" />
            Underwriting Buy-Box Filters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Minimum FICO Credit Score
              </label>
              <input
                type="number"
                value={criteria.minCreditScore}
                onChange={(e) => setCriteria({ ...criteria, minCreditScore: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Minimum Investment IQ (0–180)
              </label>
              <input
                type="number"
                value={criteria.minIQScore}
                onChange={(e) => setCriteria({ ...criteria, minIQScore: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Minimum Loan Amount ($)
              </label>
              <input
                type="number"
                value={criteria.minLoanAmount}
                onChange={(e) => setCriteria({ ...criteria, minLoanAmount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Maximum Loan Exposure ($)
              </label>
              <input
                type="number"
                value={criteria.maxLoanAmount}
                onChange={(e) => setCriteria({ ...criteria, maxLoanAmount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all text-center"
          >
            Save Underwriting Settings
          </button>
        </div>
      </form>
    </div>
  );
};
