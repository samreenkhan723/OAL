import React from 'react';
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
  MessageSquare
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoanProcessTracker } from '../../components/loans/LoanProcessTracker';

export const BorrowerDashboard = () => {
  const { currentUser, applications, offers, messages } = useApp();

  // Find active application or fallback to first
  const activeApp = applications.find(a => a.borrowerId === currentUser.id) || applications[0];
  const appOffers = offers.filter(o => o.applicationId === activeApp?.id);
  const pendingOffers = appOffers.filter(o => o.status === 'PENDING_BORROWER_REVIEW');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B1730] to-[#172B4D] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D5B66A] text-slate-950 uppercase tracking-wider">
              Commercial Borrower Workspace
            </span>
            <span className="text-xs text-slate-300">
              Assigned Rep: Elena Rostova
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {activeApp ? (
              <>Your commercial application for <strong>{activeApp.businessName}</strong> has received <strong>{appOffers.length} institutional lender offers</strong>.</>
            ) : (
              'Ready to secure commercial financing for your enterprise?'
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/borrower/offers"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 shadow-md transition-all flex items-center gap-1.5"
          >
            <DollarSign className="w-4 h-4" />
            <span>Review Offers ({pendingOffers.length})</span>
          </Link>

          <Link
            to="/borrower/applications/new"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Loan Request</span>
          </Link>
        </div>
      </div>

      {/* KPI 4 Cards Grid (Per Wireframe Section 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: My Investment IQ */}
        <Link
          to="/borrower/investment-iq"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Investment IQ</span>
            <Award className="w-4 h-4 text-[#D5B66A] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-[#0B1730] font-heading">
            {activeApp?.investmentIQ?.total || 154}
            <span className="text-sm font-normal text-slate-400"> / 180</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> High Commercial Readiness
          </div>
        </Link>

        {/* KPI 2: Active Application */}
        <Link
          to={`/borrower/applications/${activeApp?.id || 'APP-2026-1082'}`}
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Active Request</span>
            <FileText className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#0B1730] font-heading">
            ${activeApp?.amount ? (activeApp.amount / 1000).toLocaleString() + 'k' : '$450k'}
          </div>
          <div className="mt-2">
            <StatusBadge status={activeApp?.status || 'OFFER_RECEIVED'} />
          </div>
        </Link>

        {/* KPI 3: Reviewing Lenders */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Working Deals</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-[#0B1730] font-heading">
            {activeApp?.workingDeals?.claimedLendersCount || 2}
            <span className="text-sm font-normal text-slate-400"> of 3 Max</span>
          </div>
          <div className="text-[11px] font-semibold text-purple-700 mt-2">
            Rule FR-08 Cap Enforced
          </div>
        </div>

        {/* KPI 4: Offers Received */}
        <Link
          to="/borrower/offers"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Offers Received</span>
            <DollarSign className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-heading">
            {appOffers.length}
          </div>
          <div className="text-[11px] font-semibold text-blue-600 mt-2 flex items-center gap-1">
            Compare & Accept Terms &rarr;
          </div>
        </Link>
      </div>

      {/* Loan Process Tracker Preview */}
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

            <div className="grid grid-cols-3 gap-3 pt-2">
              <Link
                to="/borrower/offers"
                className="p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-center transition-colors"
              >
                <DollarSign className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-blue-900 block">Compare Offers</span>
                <span className="text-[10px] text-blue-600">{appOffers.length} Available</span>
              </Link>

              <Link
                to="/borrower/documents"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-900 block">Documents & KYC</span>
                <span className="text-[10px] text-emerald-600">4 Verified</span>
              </Link>

              <Link
                to="/borrower/investment-iq"
                className="p-3 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 text-center transition-colors"
              >
                <Award className="w-4 h-4 text-amber-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-amber-900 block">Investment IQ</span>
                <span className="text-[10px] text-amber-700">{activeApp?.investmentIQ?.total || 154}/180</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Col: Dedicated OAL Representative & Direct Communication */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Dedicated OAL Representative
            </h3>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Elena Rostova</h4>
                <div className="text-xs text-blue-600 font-medium">Senior Placement Agent</div>
                <div className="text-[10px] text-slate-400">elena.rostova@oalnetwork.com</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Elena mediates all underwriting inquiries and terms adjustments with your active lenders.
            </p>

            <Link
              to="/borrower/messages"
              className="w-full py-2.5 rounded-xl bg-[#0B1730] hover:bg-[#172B4D] text-white text-xs font-bold text-center block shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-[#D5B66A]" />
              <span>Message Elena Rostova</span>
            </Link>
          </div>

          {/* Quick Help Ticket Card */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Need Underwriting Guidance?
            </h4>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Have questions regarding equipment invoices or prepayment terms?
            </p>
            <Link
              to="/help"
              className="text-xs font-bold text-blue-600 hover:underline block pt-1"
            >
              Visit Help Desk & Knowledge Base &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
