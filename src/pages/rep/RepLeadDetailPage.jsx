import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  DollarSign,
  Briefcase,
  ShieldCheck,
  Award,
  Users,
  MessageSquare,
  Lock,
  ArrowRight,
  User,
  Building2,
  FileText,
  Clock,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { InvestmentIQBreakdown } from '../../components/loans/InvestmentIQBreakdown';

export const RepLeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, offers, currentUser } = useApp();

  // Strict Rep scoping: Rep only inspects files assigned to their placement desk
  const assignedApps = useMemo(() => {
    if (currentUser?.role === 'admin') return applications || [];
    return (applications || []).filter(
      (a) =>
        a.assignedRep &&
        (a.assignedRep.id === currentUser?.id ||
         (a.assignedRep.email && currentUser?.email && a.assignedRep.email.toLowerCase() === currentUser?.email.toLowerCase()))
    );
  }, [applications, currentUser]);

  // Current lead being inspected
  const currentLead = useMemo(() => {
    if (!assignedApps.length) return null;
    if (id) {
      const match = assignedApps.find(a => a.id === id);
      if (match) return match;
    }
    return assignedApps[0];
  }, [assignedApps, id]);

  const dealOffers = useMemo(() => {
    if (!currentLead) return [];
    return (offers || []).filter(o => o.applicationId === currentLead.id);
  }, [offers, currentLead]);

  if (!currentLead) {
    return (
      <div className="space-y-6">
        <div>
          <Link
            to="/rep/leads"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0070C0] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Lead Pipeline</span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0070C0] flex items-center justify-center mx-auto mb-3">
            <Users className="w-7 h-7" />
          </div>
          <h2 className="text-base font-bold text-slate-900">No Assigned Commercial Placements</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Your placement desk currently has 0 assigned files. Leads assigned to you by the Administrator will appear here for un-anonymized inspection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/rep/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0070C0] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Assigned Leads Pipeline</span>
        </Link>

        {/* Lead Switcher for Rep */}
        {assignedApps.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Inspecting File:</span>
            <select
              value={currentLead.id}
              onChange={(e) => navigate(`/rep/lead-details/${e.target.value}`)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#002060] focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
            >
              {assignedApps.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — {a.businessName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Un-Anonymized Placement Header (Doc 1 Mandate: Rep views full applicant identity) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">{currentLead.id}</span>
            <StatusBadge status={currentLead.status} />
            <span className="text-[11px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
              <Award className="w-3 h-3 text-[#002060]" />
              <span>IQ {currentLead.investmentIQ?.total || '150'}/180</span>
            </span>
            <span className="text-xs text-slate-400">
              Submitted: {new Date(currentLead.submittedAt || Date.now()).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl font-bold font-heading text-slate-900">
            {currentLead.businessName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">Borrower:</span>{' '}
              <strong className="text-slate-900">{currentLead.borrowerName}</strong>
            </div>
            <div>
              <span className="text-slate-400">Program:</span>{' '}
              <strong className="text-blue-600">{currentLead.programName}</strong>
            </div>
            <div>
              <span className="text-slate-400">Requested Principal:</span>{' '}
              <strong className="text-emerald-700">${(currentLead.amount || 0).toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/rep/messages"
            className="px-4 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold transition-all shadow-md shadow-[#0070C0]/25 flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>LetsWork Chat Hub</span>
          </Link>
          <Link
            to="/rep/offers"
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4 text-amber-600" />
            <span>Audit / Share Offers ({dealOffers.length})</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Details & Underwriting Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Un-Anonymized Business Profile */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0070C0]" />
              <span>Commercial Applicant Profile & Financials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 block">Annual Revenue</span>
                <strong className="text-base text-slate-900 font-bold">
                  ${(currentLead.annualRevenue || 0).toLocaleString()}
                </strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 block">Monthly Cash Flow</span>
                <strong className="text-base text-emerald-700 font-bold">
                  ${(currentLead.monthlyCashFlow || 0).toLocaleString()}/mo
                </strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 block">Years in Business</span>
                <strong className="text-base text-slate-900 font-bold">
                  {currentLead.yearsInBusiness || '3.5'} Years
                </strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 block">Credit Score Indicator</span>
                <strong className="text-base text-blue-600 font-bold">
                  {currentLead.creditScore || '720'} FICO
                </strong>
              </div>
            </div>

            <div className="pt-2 space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-700">Loan Purpose:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {currentLead.loanPurpose || 'Working capital and operational equipment acquisition.'}
                </p>
              </div>
              <div>
                <span className="font-bold text-slate-700">Use of Funds Breakdown:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {currentLead.useOfFunds || 'Capital will be dedicated to expansion inventory and facility upgrades.'}
                </p>
              </div>
            </div>
          </div>

          {/* Investment IQ Breakdown */}
          {currentLead.investmentIQ && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0070C0]" />
                <span>Investment IQ 180-Point Scoring Breakdown</span>
              </h2>
              <InvestmentIQBreakdown investmentIQ={currentLead.investmentIQ} />
            </div>
          )}
        </div>

        {/* Right Column: Participating Lenders & Active Bids */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0070C0]" />
              <span>Participating Underwriters (Rule FR-08)</span>
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              Up to 3 institutional funds can claim a Working Deal slot on this placement concurrently.
            </p>

            <div className="space-y-2 text-xs">
              {currentLead.workingDeals?.claims?.length > 0 ? (
                currentLead.workingDeals.claims.map((claim, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <strong className="text-slate-800 block">{claim.lenderAlias || `Underwriter #${idx + 1}`}</strong>
                      <span className="text-[10px] text-slate-400">Claim Status: {claim.status || 'ACTIVE'}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#002060]">
                      Slot {idx + 1}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-400">
                  0 of 3 lenders claimed this file yet
                </div>
              )}
            </div>
          </div>

          {/* Active Offers Issued */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Term Sheets Issued ({dealOffers.length})</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Read-Only
              </span>
            </div>

            {dealOffers.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">
                No institutional term sheets formulated for this placement yet.
              </p>
            ) : (
              <div className="space-y-2.5">
                {dealOffers.map(o => (
                  <div key={o.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>${o.amount?.toLocaleString()}</span>
                      <span className="text-blue-600">{o.interestRate}% APR</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>{o.lenderAlias || 'Fund'}</span>
                      <span>{o.termMonths} Mo</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepLeadDetailPage;
