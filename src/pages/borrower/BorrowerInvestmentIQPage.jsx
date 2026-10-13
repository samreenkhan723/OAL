import React from 'react';
import { useApp } from '../../context/AppContext';
import { InvestmentIQBreakdown } from '../../components/loans/InvestmentIQBreakdown';
import { Award, TrendingUp, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BorrowerInvestmentIQPage = () => {
  const { applications, currentUser } = useApp();
  const activeApp = applications.find(a => a.borrowerId === currentUser.id) || applications[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#002060]">
          My Investment IQ™ Score
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Objective 180-point commercial debt readiness rating evaluated by the OAL Scoring Engine.
        </p>
      </div>

      {/* Main Breakdown Component */}
      <InvestmentIQBreakdown investmentIQ={activeApp?.investmentIQ} />

      {/* The Money Club Syndicate Contextual Access */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] rounded-2xl p-5 text-white shadow-md border border-[#003882] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FFD200] text-[#002060]">
              VIP / MVP Tier
            </span>
            <span className="text-xs text-sky-200 font-semibold">Tier 1 Syndicate Access</span>
          </div>
          <h4 className="text-base font-bold text-white">The Money Club Member Portal</h4>
          <p className="text-xs text-sky-100 max-w-xl">
            Borrowers scoring 150+ qualify for institutional syndicate pools, private debt vaults, and pre-underwritten term sheets.
          </p>
        </div>
        <Link
          to="/borrower/money-club"
          className="px-4 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <span>Enter Member Portal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Actionable Tips to Improve Score */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Strategies to Elevate Your Commercial Readiness Score
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">1. Maintain DSCR &gt; 1.35x</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Maintain consistent monthly end-of-month cash balances. Lenders heavily weigh debt-service coverage from bank deposits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">2. Document Equipment Assets</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Providing itemized invoices for commercial equipment adds up to 30 points to your physical collateral score.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">3. Resolve Secondary UCC Liens</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Clearing older junior merchant cash advance (MCA) filings restores first-position status and boosts risk evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
