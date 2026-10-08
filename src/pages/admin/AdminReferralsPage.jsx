import React, { useState } from 'react';
import { Share2, Users, DollarSign, Award, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminReferralsPage = () => {
  const { addToast } = useApp();
  const [affiliates, setAffiliates] = useState([
    { id: 'aff-1', partner: 'Marcus Vance', code: 'OAL-MARCUS-892', referred: '3 Files', earned: '$1,750', status: 'PAID' },
    { id: 'aff-2', partner: 'Commercial Broker Syndicate NW', code: 'OAL-NW-501', referred: '12 Files', earned: '$8,400', status: 'SCHEDULED' },
    { id: 'aff-3', partner: 'Fleet Logistics Advisory Group', code: 'OAL-FLEET-33', referred: '6 Files', earned: '$4,100', status: 'PENDING' },
  ]);

  const handleDisburse = (partner) => {
    addToast('Payout Disbursed [SIMULATED]', `ACH direct deposit released to ${partner}.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

        <button
          onClick={() => addToast('Affiliate Report Exported [SIMULATED]', 'Exported full affiliate commission settlement audit.', 'info')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Commission Ledger</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Total Affiliate Payouts</span>
          <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">$14,250</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">YTD Disbursed via ACH</span>
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

      {/* Affiliates Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Active Commercial Affiliates</span>
          <span className="text-blue-600 font-bold">0.50% Origination Basis Points</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {affiliates.map((a) => (
            <div key={a.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">{a.partner}</span>
                <span className="text-[11px] text-slate-400 font-mono">Code: {a.code} • {a.referred}</span>
              </div>
              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="font-extrabold text-slate-900 block">{a.earned}</span>
                  <span className={`text-[10px] font-bold ${a.status === 'PAID' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {a.status}
                  </span>
                </div>
                {a.status !== 'PAID' && (
                  <button
                    onClick={() => handleDisburse(a.partner)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                  >
                    Disburse ACH
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

