import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MessageSquare,
  DollarSign,
  Award,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepDashboard = () => {
  const { applications, offers, messages, currentUser } = useApp();

  const assignedApps = applications; // in prototype context, Elena oversees these files
  const activeOffers = offers;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0B1730] to-[#172B4D] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Placement Agent Workspace
            </span>
            <span className="text-xs text-slate-300">
              Senior Commercial Placement Agent: {currentUser.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2">
            OAL Representative Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Supervise commercial applicant pipelines, coordinate mediated underwriter inquiries, and track offer progress with strict <strong>read-only offer governance</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/rep/messages"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 shadow-md transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Mediation Inbox</span>
          </Link>
          <Link
            to="/rep/offers"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Offers Audit (Read-Only)</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Assigned Borrowers</span>
          <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">{assignedApps.length}</div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Active Placement Files</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Underwriter Working Deals</span>
          <div className="text-3xl font-extrabold text-purple-700 mt-1 font-heading">
            {assignedApps.reduce((acc, a) => acc + (a.workingDeals?.claimedLendersCount || 0), 0)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Active Underwriting Claims</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Offers Issued</span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1 font-heading">{activeOffers.length}</div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block flex items-center gap-1">
            <Lock className="w-3 h-3" /> Read-Only Oversight (FR-10)
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Mediated Messages</span>
          <div className="text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">{messages.length}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Supervised Participant Threads</span>
        </div>
      </div>

      {/* Mediated Communication Highlight Banner */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Mediated Communication Authority (PRD FR-09)
          </h4>
          <p className="leading-relaxed">
            As an OAL Representative, you supervise both sides of the transaction: Borrower &harr; Representative &harr; Lender. Direct Borrower-to-Lender chat is locked. All offer terms are drafted directly by institutional lenders, preserving objective fiduciary separation.
          </p>
        </div>
        <Link
          to="/rep/messages"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold whitespace-nowrap shadow-xs"
        >
          Open Mediation Hub &rarr;
        </Link>
      </div>

      {/* Assigned Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Active Placement Pipeline ({assignedApps.length} Files)
          </h3>
          <Link to="/rep/leads" className="text-xs font-bold text-blue-600 hover:underline">
            View All Leads &rarr;
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {assignedApps.slice(0, 5).map((app) => (
            <div key={app.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                  <StatusBadge status={app.status} />
                  <span className="text-[11px] font-extrabold text-[#D5B66A] bg-[#0B1730] px-2 py-0.5 rounded">
                    IQ {app.investmentIQ?.total || '150'}/180
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{app.businessName}</h4>
                <div className="text-xs text-slate-500">
                  {app.programName} • Requested ${app.amount.toLocaleString()} • Borrower: {app.borrowerName}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <Link
                  to="/rep/messages"
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Coordinate
                </Link>

                <Link
                  to="/rep/offers"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
                >
                  Inspect Offers
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
