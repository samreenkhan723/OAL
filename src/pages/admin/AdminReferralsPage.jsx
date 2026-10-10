import React, { useState } from 'react';
import { Share2, Users, DollarSign, Award, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminReferralsPage = () => {
  const { addToast } = useApp();
  const [affiliates, setAffiliates] = useState([
    { id: 'aff-1', partner: 'Marcus Vance', code: 'OAL-MARCUS-892', referred: '3 Files', earned: '$1,750', rawEarned: 1750, status: 'PAID', disbursedAt: 'Oct 02, 2026' },
    { id: 'aff-2', partner: 'Commercial Broker Syndicate NW', code: 'OAL-NW-501', referred: '12 Files', earned: '$8,400', rawEarned: 8400, status: 'SCHEDULED' },
    { id: 'aff-3', partner: 'Fleet Logistics Advisory Group', code: 'OAL-FLEET-33', referred: '6 Files', earned: '$4,100', rawEarned: 4100, status: 'PENDING' },
  ]);
  const [disbursingId, setDisbursingId] = useState(null);

  // Dynamic YTD payout calculation: base $12,500 historical + current paid
  const baseHistoricalPaid = 12500;
  const totalPaidAmount = affiliates
    .filter(a => a.status === 'PAID')
    .reduce((sum, a) => sum + a.rawEarned, baseHistoricalPaid);

  const handleDisburse = (affiliateId) => {
    const target = affiliates.find(a => a.id === affiliateId);
    if (!target) return;

    setDisbursingId(affiliateId);

    // Simulate direct ACH gateway execution
    setTimeout(() => {
      const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      setAffiliates(prev =>
        prev.map(a =>
          a.id === affiliateId
            ? { ...a, status: 'PAID', disbursedAt: todayFormatted }
            : a
        )
      );
      setDisbursingId(null);
      addToast(
        'ACH Payout Disbursed',
        `ACH direct deposit of ${target.earned} successfully released to ${target.partner} (Ref #ACH-${Math.floor(100000 + Math.random() * 900000)}).`,
        'success'
      );
    }, 600);
  };

  const handleExportReferrals = () => {
    const csvRows = [
      ['AFFILIATE_ID', 'PARTNER_NAME', 'REFERRAL_CODE', 'ACTIVITY', 'EARNED_COMMISSION', 'PAYOUT_STATUS', 'DISBURSED_DATE'],
      ...affiliates.map(a => [
        a.id,
        `"${a.partner}"`,
        a.code,
        `"${a.referred}"`,
        `"${a.earned}"`,
        a.status,
        a.disbursedAt || 'N/A'
      ])
    ];

    const csvContent = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oal_affiliate_commission_ledger_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Commission Ledger Exported', `Downloaded ${affiliates.length} affiliate partner records as CSV.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0B1730]">
              Referrals & Affiliate Program Management
            </h1>
            <VerifyBadge note="Client confirmation pending for affiliate commission rules, tracking attribution, and payout limits (PRD FR-15)" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitor borrower and partner affiliate attributions, referral link registrations, and commission payouts.
          </p>
        </div>

        <button
          onClick={handleExportReferrals}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Commission Ledger</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase">Total Affiliate Payouts</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">
            ${totalPaidAmount.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">YTD Disbursed via ACH</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase">Referred Applications</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1 font-heading">24 Files</div>
          <span className="text-[11px] text-slate-500 mt-1 block">6 Funded Commercial Loans</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase">Active Affiliates</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">18 Partners</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Registered Influencers & Brokers</span>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>Active Commercial Affiliates</span>
          <span className="text-blue-600 font-bold">0.50% Origination Basis Points</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {affiliates.map((a) => (
            <div key={a.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 text-sm block">{a.partner}</span>
                <span className="text-[11px] text-slate-500 font-mono block">Code: {a.code} • {a.referred}</span>
                {a.disbursedAt && (
                  <span className="text-[10px] text-emerald-600 font-semibold block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Disbursed via ACH on {a.disbursedAt}</span>
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-2.5 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                  <span className="font-extrabold text-slate-900 text-base sm:text-right">{a.earned}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    a.status === 'PAID'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : a.status === 'SCHEDULED'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {a.status}
                  </span>
                </div>
                {a.status !== 'PAID' ? (
                  <button
                    type="button"
                    disabled={disbursingId === a.id}
                    onClick={() => handleDisburse(a.id)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {disbursingId === a.id ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing ACH...</span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Disburse ACH</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200/80 w-full sm:w-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Disbursed</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

