import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Briefcase,
  DollarSign,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Radio,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  MessageSquare,
  PhoneCall,
  Mail,
  RefreshCw,
  Database,
  Check,
  X,
  Filter,
  AlertTriangle,
  Zap,
  History
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderDashboard = () => {
  const { currentUser, applications, offers, claimWorkingDeal, addToast } = useApp();

  // Filter state for Marketplace table
  const [activeFilter, setActiveFilter] = useState('ALL');

  // ERP Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2 mins ago');

  const qualifiedLeads = applications.filter(
    a => a.status === 'QUALIFIED' || a.status === 'WORKING_DEAL' || a.status === 'OFFER_RECEIVED'
  );
  const myWorkingDeals = applications.filter(
    a => a.workingDeals?.claims?.some(c => c.lenderId === currentUser.id)
  );
  const myOffers = offers.filter(o => o.lenderId === currentUser.id);

  // Trigger CRM / ERP manual sync (Doc 1 - Line 48)
  const handleTriggerErpSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Just now');
      if (addToast) {
        addToast(
          'CRM / ERP Synchronized',
          'Successfully synced 14 loan pipeline records with OAL CRM nErgy & Salesforce Financial Cloud.',
          'success'
        );
      }
    }, 1200);
  };

  // Direct "WORKING DEAL" claim from dashboard table (Doc 3 - Line 10)
  const handleDirectClaim = (leadId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = claimWorkingDeal(leadId);
    if (!res.success && addToast) {
      addToast('Working Deal Notice', res.message, 'warning');
    }
  };

  // Filtered Leads
  const filteredLeads = qualifiedLeads.filter(lead => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'MY_DEALS') {
      return lead.workingDeals?.claims?.some(c => c.lenderId === currentUser.id);
    }
    if (activeFilter === 'AVAILABLE_SLOTS') {
      return (lead.workingDeals?.claimedLendersCount || 0) < 3;
    }
    if (activeFilter === 'HIGH_IQ') {
      return (lead.investmentIQ?.total || 0) >= 140;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-[#003882]/70">
        {/* Decorative lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0070C0]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#FFD200] text-[#002060] border border-amber-300 uppercase tracking-wider">
              Institutional Capital Exchange
            </span>
            <span className="text-xs text-slate-300">
              Tier: Enterprise Institutional Underwriting Fund
            </span>

            {/* CRM/ERP Sync Status Badge (Doc 1 - Line 48) */}
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CRM nErgy Sync: {lastSyncTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Lender Underwriting Portal
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Logged in as <strong>{currentUser.name}</strong> ({currentUser.company}). Currently underwriting <strong>{myWorkingDeals.length} active working deals</strong> with <strong>{qualifiedLeads.length} qualified leads</strong> live on the exchange.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link
            to="/lender/leads"
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0070C0] hover:bg-[#005a9e] text-white shadow-md shadow-[#0070C0]/25 transition-all flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Browse Marketplace Leads</span>
          </Link>

          <Link
            to="/lender/network"
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Live Network Feed</span>
          </Link>

          <Link
            to="/lender/post-funding"
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] border border-amber-300 shadow-md shadow-amber-400/25 transition-all flex items-center gap-1.5"
          >
            <History className="w-4 h-4 text-[#002060]" />
            <span>Post-Funding Portfolio</span>
          </Link>

          <button
            type="button"
            onClick={handleTriggerErpSync}
            disabled={isSyncing}
            className="w-full sm:w-auto justify-center px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Sync deal analytics with CRM/ERP"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#FFD200]' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync ERP'}</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/lender/leads"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#0070C0] hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Qualified Leads</span>
            <Users className="w-4 h-4 text-[#0070C0] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-[#002060] font-heading">{qualifiedLeads.length}</div>
          <div className="text-[11px] font-semibold text-[#0070C0] mt-2 flex items-center gap-1">
            Browse Sanitized Profiles &rarr;
          </div>
        </Link>

        <Link
          to="/lender/working-deals"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#0070C0] hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Working Deals</span>
            <Briefcase className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-purple-700 font-heading">{myWorkingDeals.length}</div>
          <div className="text-[11px] font-semibold text-purple-700 mt-2">
            Max 3 Concurrent Claims (Rule FR-08)
          </div>
        </Link>

        <Link
          to="/lender/offers"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Submitted Term Sheets</span>
            <DollarSign className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-heading">{myOffers.length}</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-2">
            1 Accepted & In Processing
          </div>
        </Link>

        <Link
          to="/lender/alerts"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">AI Lead Alerts</span>
            <Sparkles className="w-4 h-4 text-[#FFD200] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-[#002060] font-heading">3 New</div>
          <div className="text-[11px] font-semibold text-amber-700 mt-2">
            &ge; 140 LINV IQ Filtered
          </div>
        </Link>
      </div>

      {/* 24–72 Hours Turnaround SLA Speed Benchmark (Doc 3 Line 12 & Doc 6 Line 6) */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#003882]/70">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FFD200]" />
            <h3 className="text-base font-heading font-bold text-white">
              Institutional Turnaround SLA Benchmark: 24 – 72 Hours
            </h3>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Target Met: 94.2%
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Per Doc 3 guidelines, commercial business loans typically close in <strong>24 to 72 hours</strong>. Claiming a file with the <strong>WORKING DEAL</strong> button locks the candidate so your underwriting desk can formulate term sheets without competing against more than 2 other funds.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase">Portfolio Avg. Close</span>
            <span className="text-2xl font-mono font-extrabold text-[#FFD200]">26.4 Hours</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FFD200]/20 flex items-center justify-center text-[#FFD200]">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Marketplace Feed & Underwriter Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Sanitized Marketplace Table with WORKING DEAL Lock Button & Concurrent Reviewers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            {/* Table Header & Filter Tabs */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Lender Marketplace Leads
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {filteredLeads.length} Available
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Anonymized commercial summaries • Credit checks masked per Doc 3 • Max 3 concurrent underwriters.
                </p>
              </div>

              <Link
                to="/lender/leads"
                className="text-xs font-bold text-[#0070C0] hover:underline shrink-0"
              >
                View Full Registry &rarr;
              </Link>
            </div>

            {/* Quick Filter Pills (Doc 4 - LINV IQ & Accredited Tiers) */}
            <div className="px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {[
                { id: 'ALL', label: 'All Qualified' },
                { id: 'AVAILABLE_SLOTS', label: 'Slots Open (< 3)' },
                { id: 'MY_DEALS', label: 'My Working Deals' },
                { id: 'HIGH_IQ', label: 'LINV IQ ≥ 140 (MVP/VIP)' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === f.id
                      ? 'bg-[#0070C0] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Leads List */}
            <div className="divide-y divide-slate-100">
              {filteredLeads.slice(0, 5).map(lead => {
                const claimsCount = lead.workingDeals?.claimedLendersCount || 0;
                const isFull = claimsCount >= 3;
                const userHasClaimed = lead.workingDeals?.claims?.some(c => c.lenderId === currentUser.id);
                const score = lead.investmentIQ?.total || 150;
                const isHighIQ = score >= 140;

                return (
                  <div
                    key={lead.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">{lead.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {lead.programName}
                        </span>

                        {/* LINV IQ Badge with Tier Label (Doc 4 - Lines 7-11) */}
                        <span className="text-[11px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1 shadow-xs">
                          <Award className="w-3 h-3 text-[#002060] shrink-0" />
                          <span>IQ {score}/180</span>
                        </span>

                        {isHighIQ && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>MVP Money Club</span>
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-bold text-slate-900">
                        {lead.businessName}
                      </div>

                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                        <span>
                          Target: <strong className="text-slate-900 font-bold">${lead.amount.toLocaleString()}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Revenue: <strong>${lead.annualRevenue ? (lead.annualRevenue / 1000).toLocaleString() + 'k/yr' : '$1.2M'}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Cash Flow: <strong>${lead.monthlyCashFlow ? lead.monthlyCashFlow.toLocaleString() : '38,400'}/mo</strong>
                        </span>
                      </div>

                      {/* Concurrent Reviewers Indicator (Doc 3 - Line 23) */}
                      <div className="pt-1 flex items-center gap-2 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                        <span className="font-semibold text-purple-900">
                          {claimsCount === 0
                            ? 'No lenders in file yet (Exclusive opportunity)'
                            : claimsCount === 1
                            ? '1 lender actively reviewing profile'
                            : `${claimsCount} lenders in file reviewing candidate profile`}
                        </span>
                        <span className="text-slate-400">({claimsCount} of 3 Slots Filled)</span>
                      </div>
                    </div>

                    {/* Action Block with WORKING DEAL Lock Button (Doc 3 - Line 10) */}
                    <div className="flex flex-col sm:items-end justify-between gap-2.5 w-full sm:w-auto self-start sm:self-center shrink-0">
                      <div className="text-left sm:text-right">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-block ${
                            isFull
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {isFull ? 'FILE LOCKED (3/3 MAX)' : `${3 - claimsCount} Slot${3 - claimsCount > 1 ? 's' : ''} Open`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {userHasClaimed ? (
                          <Link
                            to={`/lender/leads/${lead.id}`}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all text-center flex items-center gap-1.5 shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active Deal</span>
                          </Link>
                        ) : isFull ? (
                          <button
                            disabled
                            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed flex items-center gap-1.5"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>File Locked</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={e => handleDirectClaim(lead.id, e)}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5 cursor-pointer"
                            title="Lock this file to formulate your term sheet (Rule FR-08)"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>WORKING DEAL [LOCK FILE]</span>
                          </button>
                        )}

                        <Link
                          to={`/lender/leads/${lead.id}`}
                          className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CRM / ERP Underwriting Integration Module (Doc 1 - Line 48) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    CRM & ERP Automated Pipeline Integration
                  </h4>
                  <p className="text-xs text-slate-500">
                    Doc 1 Mandate: Seamless synchronization for lender analytics, underwriting models, and reporting ledgers.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <Check className="w-3 h-3" /> 2-Way Sync Active
                </span>
                <button
                  type="button"
                  onClick={handleTriggerErpSync}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Sync Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[11px]">Integrated Platform:</span>
                <strong className="text-slate-900 block">OAL CRM nErgy / Salesforce</strong>
                <span className="text-[10px] text-emerald-600 font-semibold">Live Webhook Connected</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[11px]">Synced Lead Pipeline:</span>
                <strong className="text-slate-900 block">{qualifiedLeads.length} Active Records</strong>
                <span className="text-[10px] text-slate-500">Auto-Refreshed Hourly</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[11px]">Export Format:</span>
                <strong className="text-slate-900 block">JSON / CSV Dossier API</strong>
                <span className="text-[10px] text-blue-600 font-semibold">Audit Logs Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Multi-Channel Broker Hub & AI Lead Alerts */}
        <div className="space-y-6">
          {/* Multi-Channel Broker Mediation Hub (Doc 1 Lines 37-40, Doc 3 Line 8) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Broker Liaison Mediation Hub
                </h3>
              </div>
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
                <div className="text-xs text-blue-600 font-medium">Senior Commercial Placement Rep</div>
                <div className="text-[10px] text-slate-400">Direct Broker Liaison Desk</div>
              </div>
            </div>

            {/* Strict Fiduciary Communication Policy Notice (Doc 1 Lines 38-40, Doc 3 Line 8) */}
            <div className="text-xs text-amber-950 bg-amber-50 p-3.5 rounded-xl border border-amber-200/80 leading-relaxed space-y-1">
              <strong className="block text-amber-900 font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-700" /> Fiduciary Separation Invariant:
              </strong>
              <p className="text-[11px]">
                Doc 3 Mandate: <strong>"THERE IS NO DIRECT COMMUNICATION BETWEEN BORROWERS AND LENDERS."</strong>
              </p>
              <p className="text-[11px] text-amber-900/90">
                All inquiries, additional stip requests, and rate quotes are mediated through Elena Rostova.
              </p>
            </div>

            {/* 3 Active Channels: Chat, Email, SMS (Doc 1 Lines 38-40) */}
            <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  In-App Chat:
                </span>
                <span className="font-bold text-emerald-600">Active Channel</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  Broker Email Desk:
                </span>
                <span className="font-semibold text-slate-800">elena.rostova@oal...</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
                  SMS Fast-Track:
                </span>
                <span className="font-semibold text-slate-800">+1 (555) 720-4491</span>
              </div>
            </div>

            <Link
              to="/lender/messages"
              className="w-full py-2.5 rounded-xl bg-[#002060] hover:bg-[#001744] text-white text-xs font-bold text-center block shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-[#FFD200]" />
              <span>Open Broker Mediation Desk</span>
            </Link>
          </div>

          {/* AI Lead Alerts (Doc 1 Line 28) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD200]" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  AI Lead Alerts
                </h3>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                Live Engine
              </span>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Oakridge Triplex Rehab', amount: '$540,000 Fix & Flip', iq: '151 IQ', match: '98% Match', tag: 'MVP Club' },
                { title: 'Apex Heavy Trucking Fleet', amount: '$780,000 Freight', iq: '162 IQ', match: '95% Match', tag: 'Fast-Track' },
                { title: 'Blue Harbor Seafood Terrace', amount: '$450,000 Restaurant', iq: '154 IQ', match: '92% Match', tag: 'Equipment' }
              ].map((alert, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 hover:border-amber-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{alert.title}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {alert.match}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>{alert.amount}</span>
                    <span className="font-semibold text-slate-700">{alert.iq}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/lender/alerts"
              className="text-xs font-bold text-[#0070C0] hover:underline block text-center pt-2"
            >
              Configure Underwriting AI Criteria &rarr;
            </Link>
          </div>

          {/* Anonymity & Compliance Box */}
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-2 text-xs text-purple-950">
            <h4 className="font-bold flex items-center gap-1.5 text-purple-900">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              Lender Privacy Guard (Doc 1 Line 71)
            </h4>
            <p className="text-[11px] text-purple-900/80 leading-relaxed">
              Your institutional fund identity, rate quotes, and deal notes are strictly hidden from competing lenders on all working deals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

