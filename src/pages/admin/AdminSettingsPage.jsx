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
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Working Deal Hard Concurrency Limit (Rule FR-08)</span>
              <span className="text-[11px] text-slate-500">Atomic locking stops claims after maximum concurrent lenders reached.</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-lg">
              3 Lenders (Strict)
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Enforce Universal MFA Across All Institutional Accounts</span>
              <span className="text-[11px] text-slate-500">Requires 6-digit TOTP token upon session refresh.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.mfaMandatory}
              onChange={(e) => setSettings({ ...settings, mfaMandatory: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => addToast('Defaults Restored', 'Standard security baselines applied.', 'info')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restore Default Policies
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
          >
            Save System Policies
          </button>
        </div>
      </form>
    </div>
  );
};
