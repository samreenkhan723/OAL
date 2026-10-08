import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, ShieldCheck, Lock, RotateCcw } from 'lucide-react';

export const AdminSettingsPage = () => {
  const { addToast, resetDemoData } = useApp();
  const [settings, setSettings] = useState({
    sessionTimeoutMins: 30,
    mfaMandatory: true,
    maxWorkingDealsCap: 3,
    autoKycThreshold: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('System Policies Updated', 'Core security invariants and session timeouts recorded.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          System Governance & Security Policies
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Master platform parameters, session durations, and cryptographic rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 block break-words">Working Deal Hard Concurrency Limit (Rule FR-08)</span>
              <span className="text-[11px] text-slate-500">Atomic locking stops claims after maximum concurrent lenders reached.</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-lg self-start sm:self-auto shrink-0">
              3 Lenders (Strict)
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 block break-words">Enforce Universal MFA Across All Institutional Accounts</span>
              <span className="text-[11px] text-slate-500">Requires 6-digit TOTP token upon session refresh.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.mfaMandatory}
              onChange={(e) => setSettings({ ...settings, mfaMandatory: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded shrink-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => addToast('Defaults Restored', 'Standard security baselines applied.', 'info')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 w-full sm:w-auto py-2 sm:py-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restore Default Policies
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer text-center"
          >
            Save System Policies
          </button>
        </div>
      </form>
    </div>
  );
};
