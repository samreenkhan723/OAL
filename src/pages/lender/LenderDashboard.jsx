import React from 'react';
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
  ExternalLink
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderDashboard = () => {
  const { currentUser, applications, offers, claimWorkingDeal } = useApp();

  const qualifiedLeads = applications.filter(a => a.status === 'QUALIFIED' || a.status === 'WORKING_DEAL' || a.status === 'OFFER_RECEIVED');
  const myWorkingDeals = applications.filter(a => a.workingDeals?.claims?.some(c => c.lenderId === currentUser.id));
  const myOffers = offers.filter(o => o.lenderId === currentUser.id);

  return (
    <div className="space-y-8">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-[#0B1730] to-[#172B4D] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              Institutional Capital Exchange
            </span>
            <span className="text-xs text-slate-300">
              Tier: Enterprise Institutional Fund
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2">
            Lender Underwriting Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Logged in as <strong>{currentUser.name}</strong> ({currentUser.company}). Currently underwriting <strong>{myWorkingDeals.length} active deals</strong> with <strong>{qualifiedLeads.length} qualified leads</strong> available in marketplace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/lender/leads"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Browse Marketplace Leads</span>
          </Link>
          <Link
            to="/lender/network"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Live Network Feed</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/lender/leads"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Qualified Leads</span>
            <Users className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-[#0B1730] font-heading">{qualifiedLeads.length}</div>
          <div className="text-[11px] font-semibold text-blue-600 mt-2 flex items-center gap-1">
            Browse Sanitized Profiles &rarr;
          </div>
        </Link>

        <Link
          to="/lender/working-deals"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-purple-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Working Deals</span>
            <Briefcase className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-purple-700 font-heading">{myWorkingDeals.length}</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-2">
            Max 3 Concurrent Claims (FR-08)
          </div>
        </Link>

        <Link
          to="/lender/offers"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Submitted Offers</span>
            <DollarSign className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-heading">{myOffers.length}</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-2">
            1 Accepted & Processing
          </div>
        </Link>

        <Link
          to="/lender/alerts"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">AI Lead Alerts</span>
            <Sparkles className="w-4 h-4 text-[#D5B66A] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-[#D5B66A] font-heading">3 New</div>
          <div className="text-[11px] font-semibold text-amber-700 mt-2">
            &ge; 140 Investment IQ Filtered
          </div>
        </Link>
      </div>

      {/* Main 2-Column Split: Marketplace Feed & AI Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Sanitized Marketplace Table Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Lender Marketplace Leads
                </h3>
                <p className="text-xs text-slate-500">
                  Anonymized commercial borrower summaries ready for working deal claims.
                </p>
              </div>

              <Link
                to="/lender/leads"
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View All ({qualifiedLeads.length}) &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {qualifiedLeads.slice(0, 4).map((lead) => {
                const claimsCount = lead.workingDeals?.claimedLendersCount || 0;
                const isFull = claimsCount >= 3;
                const userHasClaimed = lead.workingDeals?.claims?.some(c => c.lenderId === currentUser.id);

                return (
                  <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">{lead.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {lead.programName}
                        </span>
                        <span className="text-[11px] font-extrabold text-[#D5B66A] bg-[#0B1730] px-2 py-0.5 rounded">
                          IQ {lead.investmentIQ?.total || '150'}/180
                        </span>
                      </div>

                      <div className="text-sm font-bold text-slate-900">
                        {/* Anonymized title */}
                        {lead.businessName}
                      </div>

                      <div className="text-xs text-slate-500">
                        Requested: <strong className="text-slate-900 font-bold">${lead.amount.toLocaleString()}</strong> • Revenue: ${lead.annualRevenue ? (lead.annualRevenue / 1000).toLocaleString() + 'k/yr' : '$1.2M'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right hidden sm:block">
                        <span className={`text-[11px] font-bold block ${
                          isFull ? 'text-rose-600' : 'text-purple-700'
                        }`}>
                          {claimsCount} of 3 Slots Filled
                        </span>
                        <span className="text-[10px] text-slate-400">Rule FR-08</span>
                      </div>

                      <Link
                        to={`/lender/leads/${lead.id}`}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all"
                      >
                        {userHasClaimed ? 'Active Deal' : 'View File'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: AI Lead Alerts & Policy Invariants */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D5B66A]" />
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
                { title: 'Oakridge Triplex Rehab', amount: '$540,000 Fix & Flip', iq: '151 IQ', match: '98% Match' },
                { title: 'Apex Heavy Trucking Fleet', amount: '$780,000 Freight', iq: '162 IQ', match: '95% Match' },
                { title: 'Blue Harbor Seafood Terrace', amount: '$450,000 Restaurant', iq: '154 IQ', match: '92% Match' },
              ].map((alert, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
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
              className="text-xs font-bold text-blue-600 hover:underline block text-center pt-2"
            >
              Configure Underwriting AI Criteria &rarr;
            </Link>
          </div>

          {/* Anonymity & Compliance Box */}
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-2 text-xs text-purple-950">
            <h4 className="font-bold flex items-center gap-1.5 text-purple-900">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              Lender Privacy Guard
            </h4>
            <p className="text-[11px] text-purple-900/80 leading-relaxed">
              Your institutional identity, rate quotes, and deal notes are strictly hidden from competing lenders on all working deals.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
