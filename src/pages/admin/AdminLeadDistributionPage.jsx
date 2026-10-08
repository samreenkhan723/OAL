import React from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminLeadDistributionPage = () => {
  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Distribution Rules & Safety Invariants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Rule FR-08 Concurrency Cap</span>
            <p className="text-slate-500">Atomic locking stops claims after 3 active working deals.</p>
            <span className="text-emerald-700 font-bold block pt-1">Enforced</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Redaction Guard</span>
            <p className="text-slate-500">Sensitive applicant PII is withheld until a deal is claimed.</p>
            <span className="text-emerald-700 font-bold block pt-1">Active</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Rep Intermediary Routing</span>
            <p className="text-slate-500">All matched leads assign to licensed placement specialists.</p>
            <span className="text-emerald-700 font-bold block pt-1">Supervised</span>
          </div>
        </div>
      </div>
    </div>
  );
};
