import React from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const LenderBillingPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Lender Subscriptions & Placement Billing
          </h1>
          <VerifyBadge note="Client confirmation pending for exact institutional tier pricing and success fee percentages" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Manage your exchange seat licenses, monthly working-deal claim capacity, and closing fee invoices.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D5B66A] text-slate-950 uppercase">
            Active Institutional Tier
          </span>
          <h2 className="text-2xl font-bold font-heading text-white">
            Enterprise Capital Tier
          </h2>
          <p className="text-xs text-slate-300 max-w-md leading-relaxed">
            Includes unlimited marketplace deal reviews, priority AI Lead Alerts, and up to 10 concurrent active working-deal claims.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
            <span>Billing: <strong>$1,950 / month</strong></span>
            <span>•</span>
            <span>Renews: <strong>Nov 01, 2026</strong></span>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors self-start md:self-auto">
          Manage Subscription
        </button>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Recent Origination Fee Invoices</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { id: 'INV-2026-904', desc: 'Enterprise Platform Subscription — Oct 2026', amount: '$1,950.00', status: 'PAID', date: 'Oct 01, 2026' },
            { id: 'INV-2026-881', desc: 'Grace Community Fellowship Deal Success Fee', amount: '$4,750.00', status: 'PAID', date: 'Sep 25, 2026' },
          ].map((inv) => (
            <div key={inv.id} className="p-4 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{inv.desc}</span>
                <span className="text-[11px] text-slate-400">{inv.id} • {inv.date}</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-900 block">{inv.amount}</span>
                <span className="text-[10px] text-emerald-600 font-bold">{inv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
