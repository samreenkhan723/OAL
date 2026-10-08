import React, { useState } from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, Play, RefreshCw, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminLeadDistributionPage = () => {
  const { addToast, applications } = useApp();
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [rules, setRules] = useState({
    minIQForMarketplace: 130,
    concurrencyCap: 3,
    autoAssignRep: true,
    anonymizeUntilClaim: true
  });

  const handleRunSimulation = () => {
    setIsRunningSim(true);
    setTimeout(() => {
      setIsRunningSim(false);
      addToast(
        'Lead Distribution Simulation Complete [SIMULATED]',
        `Processed ${applications.length} loan files against 4 institutional underwriter buy-boxes. 3 leads matched and alerted.`,
        'success'
      );
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Marketplace Lead Distribution Engine
            </h1>
            <VerifyBadge note="Client confirmation pending for automated lender matching algorithms and priority queue weighting" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure matching rules, track AI lead delivery logs, and enforce working-deal atomic limits.
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isRunningSim}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          {isRunningSim ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          <span>{isRunningSim ? 'Simulating Matches...' : 'Run Simulation Test'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Distribution Rules & Safety Invariants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Rule FR-08 Concurrency Cap</span>
            <p className="text-slate-500">Atomic locking stops claims after 3 active working deals.</p>
            <span className="text-emerald-700 font-bold block pt-1">Enforced (3 Lenders Max)</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Redaction Guard</span>
            <p className="text-slate-500">Sensitive applicant PII is withheld until a deal is claimed.</p>
            <span className="text-emerald-700 font-bold block pt-1">Active Anonymization</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Rep Intermediary Routing</span>
            <p className="text-slate-500">All matched leads assign to licensed placement specialists.</p>
            <span className="text-emerald-700 font-bold block pt-1">Supervised Mediation</span>
          </div>
        </div>

        {/* Engine Parameters */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Live Matching Thresholds</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 block">Minimum Investment IQ for Marketplace</span>
                <span className="text-[11px] text-slate-500">Applicants below this score undergo KYC remediation</span>
              </div>
              <span className="font-mono font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">
                {rules.minIQForMarketplace} / 180
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 block">Maximum Lenders per Deal Slot</span>
                <span className="text-[11px] text-slate-500">Non-negotiable PRD Rule FR-08 cap</span>
              </div>
              <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-lg">
                {rules.concurrencyCap} Slots
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

