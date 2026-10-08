import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Share2, Copy, CheckCircle2, DollarSign, Users, Award, Gift } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const BorrowerReferralsPage = () => {
  const { currentUser, addToast } = useApp();
  const [copied, setCopied] = useState(false);
  const referralCode = currentUser?.referralCode || 'OAL-MARCUS-892';
  const referralUrl = `https://oalnetwork.com/apply?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    addToast('Referral Link Copied', 'Share this link with other commercial business owners.', 'info');
    setTimeout(() => setCopied(false), 3000);
  };

  const referrals = [
    { name: 'Redwood Craft Brewery', program: 'Restaurant Financing', status: 'FUNDED', bonus: '$1,000', date: '2026-09-15' },
    { name: 'Apex Fast Freight fleet #2', program: 'Freight Trucking', status: 'PROCESSING', bonus: 'Pending $750', date: '2026-10-02' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Referrals & Partner Affiliates
            </h1>
            <VerifyBadge note="Client confirmation pending for exact commercial referral commission tiers and payout frequency" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Earn origination referral bonuses when other commercial business owners fund their debt through OAL Network.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Earned</span>
          <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">${currentUser?.referralEarnings || 1750}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Paid via Direct ACH</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Referrals</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1 font-heading">2 Businesses</div>
          <span className="text-[11px] text-slate-500 mt-1 block">1 Funded, 1 in Processing</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Commission Tier</span>
          <div className="text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">Tier-2 Affiliate</div>
          <span className="text-[11px] text-slate-500 mt-1 block">0.50% Origination Basis Points</span>
        </div>
      </div>

      {/* Share Box */}
      <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-2xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#D5B66A]" />
          <h3 className="text-base font-bold text-white">Your Unique Referral Link</h3>
        </div>
        <p className="text-xs text-slate-300 max-w-xl">
          Share your custom referral URL with partners, suppliers, and fellow operators. Once their commercial application achieves funding status, your affiliate commission is credited automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 max-w-xl">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 px-4 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white font-mono"
          />
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Referral History</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {referrals.map((r, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 text-xs">
              <div className="min-w-0">
                <span className="font-bold text-slate-900 block break-words">{r.name}</span>
                <span className="text-[11px] text-slate-400 break-words">{r.program} • Referred {r.date}</span>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <span className="font-extrabold text-slate-900 block">{r.bonus}</span>
                <span className="text-[10px] text-emerald-600 font-bold">{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
