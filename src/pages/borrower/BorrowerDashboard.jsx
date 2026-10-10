import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  DollarSign,
  Award,
  Users,
  Briefcase,
  ArrowRight,
  Plus,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Lock,
  Check,
  ExternalLink,
  X,
  Radio,
  FileCheck,
  History,
  Sparkles,
  PhoneCall,
  Mail,
  Download,
  RefreshCw,
  CreditCard,
  Building2,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoanProcessTracker } from '../../components/loans/LoanProcessTracker';

export const BorrowerDashboard = () => {
  const { currentUser, applications, offers, messages, addToast } = useApp();

  // Active view tab: 'active-app' | 'post-funding'
  const [activeTab, setActiveTab] = useState('active-app');

  // Modal to inspect reviewing lenders in real time (Doc 3 - Line 18)
  const [showReviewingLendersModal, setShowReviewingLendersModal] = useState(false);

  // Find active application or fallback to first
  const activeApp = applications.find(a => a.borrowerId === currentUser.id) || applications[0];
  const appOffers = offers.filter(o => o.applicationId === activeApp?.id);
  const pendingOffers = appOffers.filter(o => o.status === 'PENDING_BORROWER_REVIEW');

  // Working deals claims data (Rule FR-08: Max 3 Lenders concurrent)
  const reviewingLenders = activeApp?.workingDeals?.claims || [
    {
      lenderId: 'usr_lender_01',
      lenderAlias: 'Institutional Fund #4812 (Direct Commercial Credit)',
      claimedAt: '2026-10-03T09:15:00Z',
      reviewFocus: 'Reviewing 6-Month Commercial Bank Statements & DSCR',
      status: 'UNDERWRITING_ACTIVE',
      lastActive: '12 mins ago'
    },
    {
      lenderId: 'usr_lender_02',
      lenderAlias: 'Institutional Fund #9203 (Hospitality & Equipment Capital)',
      claimedAt: '2026-10-03T14:40:00Z',
      reviewFocus: 'Reviewing Commercial Kitchen Equipment Invoices & UCC Position',
      status: 'OFFER_DRAFTED',
      lastActive: '38 mins ago'
    }
  ];

  const claimedCount = activeApp?.workingDeals?.claimedLendersCount || reviewingLenders.length;
  const maxSlots = activeApp?.workingDeals?.maxSlots || 3;
  const openSlots = Math.max(0, maxSlots - claimedCount);

  // Mock post-funding servicing data (Doc 1 - Line 129)
  const postFundingData = {
    loanId: activeApp?.id || 'APP-2026-1082',
    fundedAmount: activeApp?.amount || 450000,
    disbursedDate: 'October 02, 2026',
    disbursedTo: 'Wells Fargo Commercial Checking (****4819)',
    interestRate: 7.95,
    termMonths: 60,
    monthlyPayment: 9120,
    nextPaymentDate: 'November 01, 2026',
    principalRemaining: 441800,
    paymentsMade: 2,
    paymentsRemaining: 58,
    achStatus: 'ACTIVE_AUTOPAY',
    lenderPartner: 'Apex Horizon Commercial Credit Fund',
    onTimeRecord: '100% On-Time'
  };

  const handleDownloadClosingDossier = () => {
    const text = `================================================================================
OAL NETWORK POST-FUNDING COMMERCIAL DOSSIER & PROMISSORY RECORD
================================================================================
Loan Facility Reference : ${postFundingData.loanId}
Entity Name             : ${activeApp?.businessName || 'Blue Harbor Seafood Bistro LLC'}
Principal Funded        : $${postFundingData.fundedAmount.toLocaleString()}
Disbursement Date       : ${postFundingData.disbursedDate}
Disbursement Destination: ${postFundingData.disbursedTo}
Interest Rate           : ${postFundingData.interestRate}% Fixed APR
Term Duration           : ${postFundingData.termMonths} Months
Monthly Debt Service    : $${postFundingData.monthlyPayment.toLocaleString()} / month
Next Scheduled Due Date : ${postFundingData.nextPaymentDate}
ACH Auto-Debit Status   : ${postFundingData.achStatus} (Pre-Authorized)
Underwriting Fund       : ${postFundingData.lenderPartner}
Assigned Placement Rep  : Elena Rostova (Senior OAL Representative)
================================================================================
Post-Funding Servicing Help Desk: 1-800-555-OAL-NET | support@oalnetwork.com
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `post_funding_dossier_${postFundingData.loanId.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Closing Dossier Downloaded', 'Post-funding loan documentation downloaded.', 'success');
    }
  };

  const handleRequestPayoffQuote = () => {
    if (addToast) {
      addToast('Payoff Quote Requested', 'Your 30-day official payoff calculation will be prepared by Elena Rostova within 4 hours.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner with Investor Club Badge (Doc 4 & Doc 6) */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-[#003882]/70">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B0F0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#FFD200] text-[#002060] border border-amber-300 uppercase tracking-wider shadow-xs">
              Commercial Borrower Workspace
            </span>

            {/* The Money Club Verified Check Badge (Doc 4 - Lines 3, 7-11) */}
            <Link
              to="/borrower/money-club"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all cursor-pointer"
              title="Open The Money Club Member Portal"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>INV-IQ Certified Investor • MVP Money Club (154 LINV IQ) &rarr;</span>
            </Link>

            <span className="text-xs text-sky-100">
              Assigned Rep: <strong>Elena Rostova</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
            Welcome back, {currentUser.name}
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
            {activeApp ? (
              <>Your commercial file for <strong>{activeApp.businessName}</strong> is active in the institutional marketplace with <strong>{appOffers.length} term sheets available</strong>.</>
            ) : (
              'Ready to secure commercial financing for your enterprise?'
            )}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link
            to="/borrower/offers"
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] shadow-md shadow-amber-400/25 border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <DollarSign className="w-4 h-4 text-[#002060]" />
            <span>Review Offers ({pendingOffers.length})</span>
          </Link>

          <Link
            to="/borrower/applications/new"
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0070C0] hover:bg-[#005a9e] text-white shadow-md shadow-[#0070C0]/30 border border-[#00B0F0]/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Loan Request</span>
          </Link>
        </div>
      </div>

      {/* Mode Switcher: Active Application vs Post-Funding Servicing (Doc 1 - Line 129) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('active-app')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'active-app'
                ? 'bg-white text-[#002060] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-[#0070C0]" />
            <span>Active Application & Marketplace Workflow</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('post-funding')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'post-funding'
                ? 'bg-[#002060] text-[#FFD200] shadow-xs border border-[#FFD200]/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4 text-[#FFD200]" />
            <span>Post-Funding Servicing Dashboard (Stage 13)</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
              Funded
            </span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 px-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>MFA Protected Session • 256-bit Encrypted Portal</span>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: ACTIVE APPLICATION WORKFLOW (STAGES 1 - 12)
          ========================================================================= */}
      {activeTab === 'active-app' && (
        <div className="space-y-8">
          {/* USA PATRIOT Act & CIP Compliance Card (Doc 6 - Lines 37-38) */}
          <div className="bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-slate-900/5 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    USA PATRIOT Act & Customer Identification Program (CIP) Verified
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Federal Rule 31 CFR 1020.220
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed max-w-4xl">
                  To aid the government in the fight against terrorism financing and money laundering, federal regulations require that all financial institutions obtain, verify, and record information that identifies each individual and corporate entity opening an account.
                </p>
              </div>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                <Check className="w-3 h-3" /> Identity Verified & MFA Active
              </span>
            </div>
          </div>

          {/* 4 KPI Metrics Grid (With Live Reviewing Lenders Button - Doc 3 Line 18) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* KPI 1: My Investment IQ */}
            <Link
              to="/borrower/investment-iq"
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Investment IQ</span>
                <Award className="w-4 h-4 text-[#FFD200] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-extrabold text-[#002060] font-heading">
                {activeApp?.investmentIQ?.total || 154}
                <span className="text-sm font-normal text-slate-400"> / 180</span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> MVP Money Club Tier (High)
              </div>
            </Link>

            {/* KPI 2: Active Application */}
            <Link
              to={`/borrower/applications/${activeApp?.id || 'APP-2026-1082'}`}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#0070C0] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Active Request</span>
                <FileText className="w-4 h-4 text-[#0070C0] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-extrabold text-[#002060] font-heading">
                ${activeApp?.amount ? (activeApp.amount / 1000).toLocaleString() + 'k' : '$450k'}
              </div>
              <div className="mt-2">
                <StatusBadge status={activeApp?.status || 'OFFER_RECEIVED'} />
              </div>
            </Link>

            {/* KPI 3: Live Reviewing Lenders Interactive Button (Doc 3 - Line 18) */}
            <button
              type="button"
              onClick={() => setShowReviewingLendersModal(true)}
              className="bg-white rounded-2xl border border-purple-200 p-5 shadow-xs hover:border-purple-500 hover:shadow-md transition-all text-left group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[11px] text-purple-900">
                  Reviewing Lenders
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
              </div>
              <div className="text-3xl font-extrabold text-purple-950 font-heading">
                {claimedCount}
                <span className="text-sm font-normal text-slate-400"> of {maxSlots} Max</span>
              </div>
              <div className="text-[11px] font-bold text-purple-700 mt-2 flex items-center justify-between">
                <span>Inspect Active Reviewers</span>
                <span className="text-purple-600 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </button>

            {/* KPI 4: Offers Received */}
            <Link
              to="/borrower/offers"
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[11px]">Offers Received</span>
                <DollarSign className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-700 font-heading">
                {appOffers.length}
              </div>
              <div className="text-[11px] font-semibold text-[#0070C0] mt-2 flex items-center gap-1">
                Compare & Accept Terms &rarr;
              </div>
            </Link>
          </div>

          {/* Dedicated Institutional Waiting Room & 24-72 Hours Turnaround SLA (Doc 1 Line 22, Doc 3 Line 12) */}
          <div className="bg-gradient-to-br from-[#001744] via-[#002060] to-[#003882] text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4 border border-[#003882]/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[#FFD200] flex items-center justify-center border border-amber-500/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-heading font-bold text-white">
                      Underwriting Waiting Room & 24–72 Hour Turnaround SLA
                    </h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Live Queue Active
                    </span>
                  </div>
                  <p className="text-xs text-sky-100">
                    Doc 3 Turnaround Benchmark: Institutional business programs typically close in <strong>24 to 72 hours</strong>.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-300 block">Elapsed Since Submission:</span>
                <span className="text-sm font-mono font-bold text-[#FFD200]">18 Hours : 42 Minutes</span>
              </div>
            </div>

            {/* Waiting Room Status Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Marketplace Exposure</span>
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                </div>
                <div className="text-sm font-bold text-white">Sanitized Profile Live</div>
                <p className="text-[11px] text-sky-100 leading-relaxed">
                  Your credit score and sensitive PII are strictly masked from competing funds.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Concurrent Underwriters</span>
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-sm font-bold text-white">{claimedCount} of {maxSlots} Locked Deals</div>
                <p className="text-[11px] text-sky-100 leading-relaxed">
                  {openSlots > 0 ? `${openSlots} open slot remains for eligible accredited institutional funds.` : 'All 3 working deal slots claimed. Additional lenders locked out.'}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Next Milestone</span>
                  <DollarSign className="w-3.5 h-3.5 text-[#FFD200]" />
                </div>
                <div className="text-sm font-bold text-[#FFD200]">{appOffers.length} Offers In Waiting Room</div>
                <p className="text-[11px] text-sky-100 leading-relaxed">
                  Compare side-by-side terms or consult Elena Rostova before choosing your preferred terms.
                </p>
              </div>
            </div>
          </div>

          {/* 13-Stage Loan Process Lifecycle Tracker */}
          {activeApp && (
            <LoanProcessTracker currentStatus={activeApp.status} application={activeApp} />
          )}

          {/* Main 2-Column Split: Active Loan Summary & Coordination/Rep Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Active Application Card & Quick Links */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-400">{activeApp?.id}</span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{activeApp?.businessName}</h3>
                    <p className="text-xs text-slate-500">{activeApp?.programName} • ${activeApp?.amount.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={activeApp?.status} />
                  </div>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <strong className="block text-slate-900 mb-1 font-semibold">Stated Capital Purpose:</strong>
                  {activeApp?.loanPurpose}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <Link
                    to="/borrower/offers"
                    className="p-3.5 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-center transition-colors group"
                  >
                    <DollarSign className="w-4 h-4 text-blue-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-blue-900 block">Compare Offers</span>
                    <span className="text-[10px] text-blue-600 font-semibold">{appOffers.length} Ready for Review</span>
                  </Link>

                  <Link
                    to="/borrower/documents"
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center transition-colors group"
                  >
                    <FileText className="w-4 h-4 text-slate-700 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-900 block">Documents & KYC</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">4 Verified Statements</span>
                  </Link>

                  <Link
                    to="/borrower/investment-iq"
                    className="p-3.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 text-center transition-colors group"
                  >
                    <Award className="w-4 h-4 text-amber-700 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-amber-900 block">Investment IQ</span>
                    <span className="text-[10px] text-amber-700 font-semibold">{activeApp?.investmentIQ?.total || 154}/180 Composite</span>
                  </Link>
                </div>
              </div>

              {/* The Money Club for Investors Privileges Card (Doc 4 & Doc 6) */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFD200] text-[#002060] uppercase">
                      Free Member Tier
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      The Money Club for Investors [Powered By Lenders]
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 max-w-xl">
                    As an active borrower with a <strong>154 LINV IQ</strong>, you qualify for <strong>MVP Money Club (Tier-2)</strong> benefits including fast-tracked 24-hour lender reviews and syndicated debt participation.
                  </p>
                </div>

                <Link
                  to="/investment-club"
                  className="px-4 py-2.5 rounded-xl bg-[#002060] hover:bg-[#003080] text-white text-xs font-bold transition-all shadow-xs shrink-0 text-center flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-[#FFD200]" />
                  <span>View Club Privileges</span>
                </Link>
              </div>
            </div>

            {/* Right Col: Dedicated OAL Representative & Multi-Channel Support (Doc 1 Lines 18-20, 50-53) */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Dedicated OAL Representative
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Online
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Elena Rostova"
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-600 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Elena Rostova</h4>
                    <div className="text-xs text-blue-600 font-medium">Senior Placement Agent</div>
                    <div className="text-[10px] text-slate-400">elena.rostova@oalnetwork.com</div>
                  </div>
                </div>

                {/* Strict Fiduciary Communication Policy Notice (Doc 1 Line 19, Doc 3 Line 8) */}
                <div className="text-xs text-amber-950 bg-amber-50 p-3.5 rounded-xl border border-amber-200/80 leading-relaxed">
                  <strong className="block text-amber-900 font-bold mb-0.5 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-700" /> Fiduciary Protection Rule:
                  </strong>
                  Borrowers communicate exclusively with OAL Representatives. Direct contact with lenders is forbidden to preserve competitive leverage.
                </div>

                {/* Multi-Channel Notification Status Indicators (Doc 1 Lines 20, 38-40) */}
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      In-Portal Chat:
                    </span>
                    <span className="font-bold text-emerald-600">Active</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
                      SMS Alerts:
                    </span>
                    <span className="font-semibold text-slate-800">+1 (555) 392-1084</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-600" />
                      Email Term Sheets:
                    </span>
                    <span className="font-semibold text-slate-800">marcus@blueharbor...</span>
                  </div>
                </div>

                <Link
                  to="/borrower/messages"
                  className="w-full py-2.5 rounded-xl bg-[#0B1730] hover:bg-[#172B4D] text-white text-xs font-bold text-center block shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-[#D5B66A]" />
                  <span>Message Elena Rostova</span>
                </Link>
              </div>

              {/* Help Desk Support Card (Doc 2) */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-2">
                <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Need Underwriting Guidance?
                </h4>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Have questions regarding equipment invoices, UCC subordination, or 24h closing timelines?
                </p>
                <Link
                  to="/support/tickets"
                  className="text-xs font-bold text-blue-600 hover:underline block pt-1"
                >
                  Visit AI Help Desk & Knowledge Base &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: POST-FUNDING SERVICING DASHBOARD (STAGE 13 - Doc 1 Line 129)
          ========================================================================= */}
      {activeTab === 'post-funding' && (
        <div className="space-y-6">
          {/* Post Funding Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wider">
                  Post-Funding Stage 13 Active
                </span>
                <span className="text-xs text-emerald-300">
                  Promissory Facility Closed
                </span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-white">
                Capital Disbursement & Active Debt Servicing
              </h2>
              <p className="text-xs text-slate-300 max-w-xl">
                Facility ID <strong>{postFundingData.loanId}</strong> is fully funded and active. View your repayment amortization schedule, automated ACH debt service, and payoff requests below.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/borrower/post-funding"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Dedicated Post-Funding Hub</span>
              </Link>

              <button
                type="button"
                onClick={handleDownloadClosingDossier}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D5B66A]" />
                <span>Download Closing Dossier</span>
              </button>

              <button
                type="button"
                onClick={handleRequestPayoffQuote}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Request Payoff Quote</span>
              </button>
            </div>
          </div>

          {/* 4 Servicing Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Capital Disbursed</span>
              <div className="text-3xl font-extrabold text-slate-900 mt-1 font-heading">
                ${postFundingData.fundedAmount.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Wired to {postFundingData.disbursedTo.split(' ')[0]}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Principal Remaining</span>
              <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">
                ${postFundingData.principalRemaining.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {postFundingData.paymentsMade} of {postFundingData.termMonths} Payments Completed
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Monthly Debt Service</span>
              <div className="text-3xl font-extrabold text-blue-700 mt-1 font-heading">
                ${postFundingData.monthlyPayment.toLocaleString()}
              </div>
              <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
                {postFundingData.interestRate}% Fixed APR
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Next Scheduled Due Date</span>
              <div className="text-2xl font-extrabold text-amber-700 mt-1 font-heading">
                {postFundingData.nextPaymentDate}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> ACH Auto-Debit Confirmed
              </span>
            </div>
          </div>

          {/* Servicing Ledger & Amortization Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Amortization & Debt Service Repayment Schedule
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fixed commercial term loan administered via {postFundingData.lenderPartner}.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {postFundingData.onTimeRecord}
                </span>
              </div>

              {/* Progress Bar of Loan Payoff */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Payoff Progress:</span>
                  <span className="text-emerald-700">3.3% Principal Amortized</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '3.3%' }} />
                </div>
              </div>

              {/* Upcoming Payments Ledger Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Payment #</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Principal</th>
                      <th className="p-3">Interest</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-emerald-50/40">
                      <td className="p-3 font-bold text-slate-900">#01</td>
                      <td className="p-3 text-slate-600">Oct 01, 2026</td>
                      <td className="p-3 font-bold text-slate-900">$9,120.00</td>
                      <td className="p-3 text-slate-600">$4,100.00</td>
                      <td className="p-3 text-slate-600">$5,020.00</td>
                      <td className="p-3"><span className="text-emerald-700 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Paid</span></td>
                    </tr>
                    <tr className="bg-emerald-50/40">
                      <td className="p-3 font-bold text-slate-900">#02</td>
                      <td className="p-3 text-slate-600">Nov 01, 2026</td>
                      <td className="p-3 font-bold text-slate-900">$9,120.00</td>
                      <td className="p-3 text-slate-600">$4,127.00</td>
                      <td className="p-3 text-slate-600">$4,993.00</td>
                      <td className="p-3"><span className="text-emerald-700 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Paid</span></td>
                    </tr>
                    <tr className="font-semibold bg-blue-50/30">
                      <td className="p-3 font-bold text-blue-900">#03</td>
                      <td className="p-3 text-blue-900 font-bold">Dec 01, 2026</td>
                      <td className="p-3 font-extrabold text-blue-900">$9,120.00</td>
                      <td className="p-3 text-slate-700">$4,154.00</td>
                      <td className="p-3 text-slate-700">$4,966.00</td>
                      <td className="p-3"><span className="text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded-full">Scheduled ACH</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">#04</td>
                      <td className="p-3 text-slate-500">Jan 01, 2027</td>
                      <td className="p-3 text-slate-700 font-medium">$9,120.00</td>
                      <td className="p-3 text-slate-500">$4,181.00</td>
                      <td className="p-3 text-slate-500">$4,939.00</td>
                      <td className="p-3 text-slate-400">Upcoming</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Col: Top-Up Capital & Servicing Assistance */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Additional Capital & Refinancing
                </h4>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Eligible for Line Increase in 4 Months</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    After completing 6 consecutive on-time monthly payments, you may request up to <strong>$200,000 in additional growth capital</strong> without resubmitting complete tax packages.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => addToast && addToast('Refinance Request Submitted', 'Elena Rostova has been notified of your interest in secondary line expansion.', 'success')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 text-center cursor-pointer"
                >
                  Request Pre-Approval for Expansion Capital
                </button>
              </div>

              {/* Dedicated Servicing Representative */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Post-Funding Loan Officer
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Elena Rostova"
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-600"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Elena Rostova</h5>
                    <div className="text-xs text-emerald-600 font-semibold">Senior Account Servicer</div>
                    <div className="text-[10px] text-slate-400">Direct Extension: #104</div>
                  </div>
                </div>

                <Link
                  to="/borrower/messages"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center block transition-all"
                >
                  Contact Servicing Rep
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          REVIEWING LENDERS MODAL (Doc 3 - Line 18 Requirement)
          ========================================================================= */}
      {showReviewingLendersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    Live Deal Review Monitor (Rule FR-08)
                  </span>
                </div>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  Active Institutional Underwriters in File #{activeApp?.id}
                </h3>
                <p className="text-xs text-slate-500">
                  Doc 3 Mandate: Lenders currently working this file are capped at <strong>no more than THREE (3) at the same time</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewingLendersModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Slot Counter & Cap Indicator */}
            <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-purple-900 block">
                  Concurrent Working Deals Cap Status:
                </span>
                <span className="text-purple-800">
                  {claimedCount} of {maxSlots} Slots Currently Underwritten
                </span>
              </div>
              <div className="px-3 py-1 bg-white rounded-xl font-bold text-purple-900 border border-purple-200 text-center">
                {openSlots > 0 ? `${openSlots} Slot Available` : 'Deal Locked to Other Lenders'}
              </div>
            </div>

            {/* List of Active Reviewing Lenders */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Reviewing Institutional Underwriters (Sanitized View)
              </h4>

              {reviewingLenders.map((lender, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                        #{i + 1}
                      </span>
                      <strong className="text-slate-900 text-sm">{lender.lenderAlias}</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Active In File ({lender.lastActive})
                    </span>
                  </div>

                  <div className="pl-8 text-slate-600 space-y-1">
                    <div>
                      <strong className="text-slate-700">Audit Scope:</strong> {lender.reviewFocus}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Claimed Working Deal Slot: {new Date(lender.claimedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}

              {openSlots > 0 && (
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 text-center text-xs text-slate-400 space-y-1">
                  <Lock className="w-5 h-5 text-slate-300 mx-auto" />
                  <span className="font-semibold block text-slate-600">Slot #3 — Open for Qualified Institutional Claim</span>
                  <span className="text-[11px] text-slate-400">Eligible lenders may view sanitized summary in the OAL Network Marketplace.</span>
                </div>
              )}
            </div>

            {/* Strict Fiduciary Notice (Doc 1 Line 19, Doc 3 Line 8) */}
            <div className="p-4 rounded-2xl bg-slate-100 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">Privacy & Fiduciary Guarantee:</strong>
              Competing institutional lenders cannot view each other's identity, quotes, or underwriting notes. Borrowers do not communicate directly with lenders; all rate negotiation is mediated via Elena Rostova to ensure optimal terms.
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowReviewingLendersModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Monitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

