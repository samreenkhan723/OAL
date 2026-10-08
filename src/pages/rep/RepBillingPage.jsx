import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const RepBillingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Representative Billing & Commission Ledger
          </h1>
          <VerifyBadge note="Client confirmation pending for representative commission structures and disbursement schedules" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Review earned placement basis points, originating agent bonuses, and payout history.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Pending Payout</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1 font-heading">$8,450</div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Scheduled for Oct 15</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">YTD Disbursed</span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1 font-heading">$32,450</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Direct Deposit</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Commission Schedule</span>
          <div className="text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">1.0% - 1.5%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Funded Volume Basis</span>
        </div>
      </div>
    </div>
  );
};
