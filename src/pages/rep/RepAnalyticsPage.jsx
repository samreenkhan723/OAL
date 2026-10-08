import React from 'react';
import { TrendingUp, Users, DollarSign, Award, CheckCircle2 } from 'lucide-react';

export const RepAnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Pipeline Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Conversion metrics across borrower registration, KYC completion, working-deal velocity, and accepted offers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Funded Volume</span>
          <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">$2.15M</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">YTD Placed Capital</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Offer Acceptance Rate</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1 font-heading">68.4%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Competitive multi-offer yield</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Avg. KYC Turnaround</span>
          <div className="text-3xl font-extrabold text-purple-700 mt-1 font-heading">18 Hours</div>
          <span className="text-[11px] text-purple-700 mt-1 block">Within compliance SLA</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Rep Commission</span>
          <div className="text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">$32,450</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Accrued placement earnings</span>
        </div>
      </div>
    </div>
  );
};
