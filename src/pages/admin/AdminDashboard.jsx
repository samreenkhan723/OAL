import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  Briefcase,
  FileText,
  CheckCircle,
  FolderOpen,
  Cpu,
  Layers,
  History,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Database,
  Megaphone,
  Share2,
  RefreshCw,
  Award,
  Lock,
  Check,
  X,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminDashboard = () => {
  const { applications, offers, documents, auditLogs, addToast } = useApp();

  const [isSyncingCrm, setIsSyncingCrm] = useState(false);
  const [crmSyncTime, setCrmSyncTime] = useState('3 mins ago');
  const [showSpecialInvestorModal, setShowSpecialInvestorModal] = useState(false);

  const pendingKycDocs = documents.filter(d => d.status === 'IN_REVIEW');
  const activeWorkingDealsCount = applications.reduce(
    (acc, a) => acc + (a.workingDeals?.claimedLendersCount || 0),
    0
  );
  const fundedCount = applications.filter(a => a.status === 'FUNDED').length;

  // CRM / ERP Sync trigger (Doc 1 - Line 105)
  const handleTriggerCrmSync = () => {
    setIsSyncingCrm(true);
    setTimeout(() => {
      setIsSyncingCrm(false);
      setCrmSyncTime('Just now');
      if (addToast) {
        addToast(
          '3rd-Party CRM / ERP Synchronized',
          'Successfully synced affiliate leads and referral records with OAL CRM nErgy & Salesforce.',
          'success'
        );
      }
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-[#0B1730] to-[#172B4D] rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
              Super Admin Executive Console
            </span>
            <span className="text-xs text-slate-300">
              Chief Compliance & Operations: <strong>Victoria Sterling</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CRM nErgy Sync: {crmSyncTime}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-heading font-extrabold text-white">
            OAL Master Governance Console
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Complete platform oversight across commercial borrowers, institutional lenders, KYC verification pipelines, dual-engine AI scoring, and immutable audit ledgers.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <Link
            to="/admin/verification"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 shadow-md transition-all flex items-center justify-center gap-1.5 text-center"
          >
            <CheckCircle className="w-4 h-4" />
            <span>KYC Queue ({pendingKycDocs.length})</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowSpecialInvestorModal(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <Award className="w-4 h-4 text-[#D5B66A]" />
            <span>Special Investor Engine</span>
          </button>

          <Link
            to="/admin/audit-logs"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center justify-center gap-1.5 text-center"
          >
            <History className="w-4 h-4" />
            <span>Audit Trail</span>
          </Link>
        </div>
      </div>

      {/* 6 Enterprise KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <Link
          to="/admin/applications"
          className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs hover:border-blue-400 transition-all group"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Applications</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-heading">{applications.length}</div>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 block truncate">Active In Exchange &rarr;</span>
        </Link>

        <Link
          to="/admin/verification"
          className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs hover:border-amber-400 transition-all group"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">KYC In Review</span>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-700 mt-1 font-heading">{pendingKycDocs.length}</div>
          <span className="text-[10px] text-amber-700 font-semibold mt-1 block truncate">Verification Queue &rarr;</span>
        </Link>

        <Link
          to="/admin/offers"
          className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs hover:border-purple-400 transition-all group"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Working Deals</span>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-700 mt-1 font-heading">{activeWorkingDealsCount}</div>
          <span className="text-[10px] text-purple-700 font-semibold mt-1 block truncate">Max 3/Deal Cap &rarr;</span>
        </Link>

        <Link
          to="/admin/offers"
          className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs hover:border-emerald-400 transition-all group"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Active Offers</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1 font-heading">{offers.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block truncate">Underwriter Terms &rarr;</span>
        </Link>

        <Link
          to="/admin/lenders"
          className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs hover:border-blue-400 transition-all group"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Verified Lenders</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-heading">14 Funds</div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1 block truncate">Accredited Seats &rarr;</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Funded Deals</span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#D5B66A] mt-1 font-heading">{fundedCount} Closed</div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1 block truncate">$1.27M Disbursed</span>
        </div>
      </div>

      {/* Special AI Scoring Engine Dual-Architecture Banner (Doc 1 Line 96 & Doc 4) */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-[#172B4D] text-white rounded-3xl p-4 sm:p-7 shadow-lg space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-white/10">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40 shrink-0 mt-0.5 sm:mt-0">
              <Cpu className="w-5 h-5 text-[#D5B66A]" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-heading font-bold text-white">
                  AI Scoring Engine: Dual Scoring Architecture (Doc 1 & Doc 4)
                </h3>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-500/40 whitespace-nowrap">
                  Special Investor Engine Integrated
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Doc 1 Mandate: <em>"We can use the AI scoring for regular applicants, but I would like to implement a special scoring engine for qualified verified applicant investors by them completing a special form."</em>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSpecialInvestorModal(true)}
            className="w-full lg:w-auto px-4 py-2.5 rounded-xl bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 text-xs font-bold transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>Open Special Investor Form Engine</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <strong className="text-white text-sm font-bold">1. Standard 180-Point Regular Applicant Model</strong>
              <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded whitespace-nowrap">Engine v2.4</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Calculates FICO credit (70 pts), operating cash flow & DSCR (50 pts), equipment/property collateral (30 pts), business plan (20 pts), and risk factors (10 pts).
            </p>
            <Link to="/admin/scoring" className="text-blue-400 font-bold hover:underline block pt-1 text-[11px]">
              Inspect Standard 5 Pillars Oversight &rarr;
            </Link>
          </div>

          <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <strong className="text-[#D5B66A] text-sm font-bold">2. Special Verified Investor Form Engine (Doc 4)</strong>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded whitespace-nowrap">Accredited Intake</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Evaluates individual net worth (&gt;$1M excl. residence: 25 pts), annual income (&gt;$200k/$300k joint: 15 pts), entity assets (&gt;$5M: 25 pts), and FINRA Series 7/65/82 credentials.
            </p>
            <button
              type="button"
              onClick={() => setShowSpecialInvestorModal(true)}
              className="text-[#D5B66A] font-bold hover:underline block pt-1 text-[11px] cursor-pointer text-left"
            >
              Configure Special Investor Criteria & Form Fields &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Verification Center Standardized 5-Stage Pipeline (Doc 1 - Lines 97-98) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Verification Center: Standardized Compliance Process (Doc 1 Verification Process)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 whitespace-nowrap">
                Audit Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Answering Client Question: <em>"What's the process to verify?"</em> Standard 5-stage verification enforced on all files.
            </p>
          </div>

          <Link
            to="/admin/verification"
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all text-center shrink-0 flex items-center justify-center gap-1"
          >
            <span>Open Verification Queue ({pendingKycDocs.length}) &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-blue-600 block">STAGE 1</span>
            <strong className="text-slate-900 block font-bold">Identity & USA PATRIOT Act</strong>
            <p className="text-[10px] text-slate-500 leading-tight">CIP government ID & SSN verification (31 CFR 1020.220).</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-purple-600 block">STAGE 2</span>
            <strong className="text-slate-900 block font-bold">FinCEN & OFAC Screening</strong>
            <p className="text-[10px] text-slate-500 leading-tight">Automated watchlist check against anti-money laundering ledgers.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-600 block">STAGE 3</span>
            <strong className="text-slate-900 block font-bold">Corporate Entity Status</strong>
            <p className="text-[10px] text-slate-500 leading-tight">Secretary of State good standing & federal EIN registry audit.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-600 block">STAGE 4</span>
            <strong className="text-slate-900 block font-bold">Bank Statement & DSCR</strong>
            <p className="text-[10px] text-slate-500 leading-tight">Plaid cash flow verification & 1.25x debt coverage ratio check.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-mono font-bold text-indigo-600 block">STAGE 5</span>
            <strong className="text-slate-900 block font-bold">UCC Lien & Collateral Invoices</strong>
            <p className="text-[10px] text-slate-500 leading-tight">Public UCC search and serial equipment valuation approval.</p>
          </div>
        </div>
      </div>

      {/* 2 Column Operations Grid: Register Preview & Admin Controllers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Master Applications Register Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Master Commercial Applications Register
                </h3>
                <p className="text-xs text-slate-500">Live operational status and lifecycle milestone progression.</p>
              </div>

              <Link to="/admin/applications" className="text-xs font-bold text-blue-600 hover:underline">
                Manage All ({applications.length}) &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                      <StatusBadge status={app.status} />
                      <span className="text-[10px] font-bold bg-[#0B1730] text-[#D5B66A] px-2 py-0.5 rounded whitespace-nowrap inline-flex items-center gap-1">
                        IQ {app.investmentIQ?.total || '150'}/180
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{app.businessName}</h4>
                    <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5">
                      <span>{app.programName}</span>
                      <span>•</span>
                      <span>${Number(app.amount || 0).toLocaleString()}</span>
                      <span>•</span>
                      <span>Borrower: <strong className="text-slate-700">{app.borrowerName}</strong></span>
                    </div>
                  </div>

                  <Link
                    to={`/admin/applications`}
                    className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors self-stretch sm:self-center shrink-0 text-center"
                  >
                    Examine File
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Distribution Engine & Advertisements Structure (Doc 1 - Lines 101, 106-107) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Lead Distribution (Doc 1 Line 101) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Lead Distribution Engine</span>
                </h4>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Active</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Automated matching routes leads based on ticket size, industry, and LINV IQ scores. Enforces Rule FR-08 (Max 3 concurrent underwriter claims per deal).
              </p>
              <Link to="/admin/lead-distribution" className="text-xs font-bold text-purple-700 hover:underline block pt-1">
                Configure Routing Rules & Exclusivity Caps &rarr;
              </Link>
            </div>

            {/* Advertisements System Structure (Doc 1 Lines 106-107) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Megaphone className="w-4 h-4 text-blue-600" />
                  <span>Sponsor Placements & Ads</span>
                </h4>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">3 Banners</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Commercial kitchen equipment financing, fleet telematics, and dental lease placements. Impression tracking and CPC attribution active across dashboards.
              </p>
              <Link to="/admin/advertisements" className="text-xs font-bold text-blue-600 hover:underline block pt-1">
                Manage Ads & Sponsor Banners &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Right Col: CRM Sync & Audit Trail */}
        <div className="space-y-6">
          {/* 3rd-Party CRM / ERP Synchronization Hub (Doc 1 - Line 105) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-600" />
                <span>3rd-Party CRM / ERP Sync</span>
              </h4>
              <button
                type="button"
                onClick={handleTriggerCrmSync}
                disabled={isSyncingCrm}
                className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncingCrm ? 'animate-spin text-blue-600' : ''}`} />
                <span>Sync Now</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Doc 1: <em>"Referral & Affiliates: Will use 3rd party CRM / ERP company"</em>. Synchronizes partner payouts, affiliate conversions, and ISO commission ledgers.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600">Connected System:</span>
                <span className="font-bold text-slate-900">OAL CRM nErgy / Salesforce</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600">Last Webhook Sync:</span>
                <span className="font-semibold text-emerald-600">{crmSyncTime}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600">Affiliate Pipeline:</span>
                <span className="font-bold text-slate-900">Active (12 Partners)</span>
              </div>
            </div>

            <Link
              to="/admin/referrals"
              className="text-xs font-bold text-blue-600 hover:underline block pt-1 text-center"
            >
              Open Affiliate & Referral Ledger &rarr;
            </Link>
          </div>

          {/* Immutable Audit Trail */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-4 h-4 text-blue-600" />
                <span>Immutable Audit Trail</span>
              </h3>
              <Link to="/admin/audit-logs" className="text-[11px] text-blue-600 font-bold hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 text-[11px]">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-sans">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold break-words">{log.actor} &rarr; {log.target}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed break-words">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SPECIAL SCORING ENGINE INVESTOR MODAL (Doc 1 Line 96 & Doc 4)
          ========================================================================= */}
      {showSpecialInvestorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    Doc 1 & Doc 4 Feature
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD200] text-[#002060]">
                    The Money Club Standard
                  </span>
                </div>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730] mt-1">
                  Special Scoring Engine for Qualified Verified Applicant Investors
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Doc 1 Line 96 Mandate: Special evaluation criteria for applicants who complete the Accredited Investor Form.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSpecialInvestorModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Criteria defined in Doc 4 */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Special Investor Intake Form Scoring Grid (Doc 4 Specifications)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                  <span className="text-purple-700 font-bold block text-sm">Individual Net Worth: 25 / 25 Pts</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Net worth exceeding <strong>$1,000,000</strong>, strictly excluding primary personal residence.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                  <span className="text-blue-700 font-bold block text-sm">Annual Income: 15 / 15 Pts</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Individual &gt;<strong>$200,000</strong>/yr or Joint with spouse &gt;<strong>$300,000</strong>/yr in each of the last 2 years.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <span className="text-emerald-700 font-bold block text-sm">Corporate Entity Assets: 25 / 25 Pts</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Entity total balance sheet assets exceeding <strong>$5,000,000</strong> or 100% accredited equity owners.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <span className="text-amber-800 font-bold block text-sm">FINRA Securities Licenses: 10 / 10 Pts</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Active Series 7 (General Securities), Series 65 (Investment Adviser), or Series 82.
                  </p>
                </div>
              </div>

              {/* The 4 Club Tiers Hierarchy */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#D5B66A]">
                  Assigned Club Tier Hierarchy (Doc 4 Lines 4-11)
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-amber-400/40">
                    <span className="text-[#FFD200] font-bold block">VIP Diamond Club</span>
                    <span className="text-slate-300">175+ LINV IQ</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-sky-400/40">
                    <span className="text-sky-300 font-bold block">MVP Money Club</span>
                    <span className="text-slate-300">140 – 164 LINV IQ</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-blue-400/40">
                    <span className="text-blue-300 font-bold block">OAL Club</span>
                    <span className="text-slate-300">59+ LINV IQ</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-slate-400/40">
                    <span className="text-slate-300 font-bold block">Team Get Money</span>
                    <span className="text-slate-400">0 – 58 LINV IQ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSpecialInvestorModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Engine View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

