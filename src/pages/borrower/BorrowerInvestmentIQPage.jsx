import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InvestmentIQBreakdown } from '../../components/loans/InvestmentIQBreakdown';
import { AccreditedInvestorModal } from '../../components/loans/AccreditedInvestorModal';
import { Award, TrendingUp, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Clock, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BorrowerInvestmentIQPage = () => {
  const { applications, currentUser, getBorrowerInvestorStatus } = useApp();
  const activeApp = applications.find(a => a.borrowerId === currentUser?.id) || applications[0];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const investorStatus = getBorrowerInvestorStatus(currentUser?.id);
  const { status, verification } = investorStatus;

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

      {/* ACCREDITED INVESTOR VERIFICATION CARD (PRD: Investment IQ - Investment Club) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        {status === 'VERIFIED' && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm ring-4 ring-emerald-100">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-extrabold text-emerald-950 font-heading">
                    Verified Accredited Investor
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                    Green Check Certified
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-xl">
                  Accreditation credentials audited and verified by OAL Network Compliance on {verification?.reviewedAt ? new Date(verification.reviewedAt).toLocaleDateString() : 'Recent'}. VIP Diamond Club syndicate access unlocked.
                </p>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1 flex items-center gap-2">
                  <span>Category: {verification?.applicantType?.toUpperCase() || 'INDIVIDUAL'}</span>
                  <span>•</span>
                  <span>License: {verification?.finraLicense !== 'none' ? verification?.finraLicense?.toUpperCase() : 'Net Worth Accredited'}</span>
                </div>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
              Active Status
            </span>
          </div>
        )}

        {status === 'PENDING_REVIEW' && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/50 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm ring-4 ring-amber-100">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-extrabold text-amber-950 font-heading">
                    Accredited Investor Verification In Review
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                    Pending Compliance Audit
                  </span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed max-w-xl">
                  Application <span className="font-mono font-bold text-amber-900">{verification?.id}</span> submitted on {verification?.submittedAt ? new Date(verification.submittedAt).toLocaleDateString() : 'Today'}. Our underwriting compliance desk is reviewing your declarations and CPA / FINRA documentation.
                </p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs shrink-0 border border-amber-300">
              Under Audit
            </span>
          </div>
        )}

        {status === 'REJECTED' && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50 to-rose-100/50 border border-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm ring-4 ring-rose-100">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-extrabold text-rose-950 font-heading">
                    Accredited Verification Application Declined
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white shadow-xs">
                    Documentation Incomplete
                  </span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed max-w-xl">
                  {verification?.rejectionReason || 'Supporting documentation did not satisfy regulatory accreditation standards.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer shrink-0"
            >
              Re-Apply for Verification
            </button>
          </div>
        )}

        {status === 'NOT_APPLIED' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-2">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#002060]" />
                <h3 className="text-base font-bold text-slate-900">
                  Accredited Investor & LINV IQ Certification
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Declare SEC Rule 501 accreditation criteria (Net worth &gt; $1,000,000, annual income &gt; $200k/$300k, or FINRA Series 7/65/82 credentials) to earn the official Green Check Certified badge and qualify for VIP Diamond Club syndicates.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#002060] hover:bg-[#001744] text-[#FFD200] font-extrabold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <Award className="w-4 h-4 text-[#FFD200]" />
              <span>Apply for Accredited Investor Verification</span>
            </button>
          </div>
        )}
      </div>

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

      {/* Accredited Investor Application Modal */}
      <AccreditedInvestorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
