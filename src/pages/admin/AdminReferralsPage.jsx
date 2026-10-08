import React from 'react';
import { Share2, Users, DollarSign, Award } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminReferralsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Referrals & Affiliate Program Management
          </h1>
          <VerifyBadge note="Client confirmation pending for affiliate commission rules, tracking attribution, and payout limits (PRD FR-15)" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Monitor borrower and partner affiliate attributions, referral link registrations, and commission payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Total Affiliate Payouts</span>
          <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">$14,250</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">YTD Disbursed</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Referred Applications</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1 font-heading">24 Files</div>
          <span className="text-[11px] text-slate-500 mt-1 block">6 Funded Commercial Loans</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Active Affiliates</span>
          <div className="text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">18 Partners</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Registered Influencers & Brokers</span>
        </div>
      </div>
    </div>
  );
};
