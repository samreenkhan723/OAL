import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminDashboard = () => {
  const { applications, offers, documents, auditLogs } = useApp();

  const pendingKycDocs = documents.filter(d => d.status === 'IN_REVIEW');
  const activeWorkingDealsCount = applications.reduce((acc, a) => acc + (a.workingDeals?.claimedLendersCount || 0), 0);
  const fundedCount = applications.filter(a => a.status === 'FUNDED').length;

  return (
    <div className="space-y-8">
      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-[#0B1730] to-[#172B4D] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
              Super Admin Executive Console
            </span>
            <span className="text-xs text-slate-300">
              Chief Compliance & Operations: Victoria Sterling
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2">
            OAL Master Governance Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Complete platform oversight across commercial borrowers, institutional lenders, KYC verification queues, 180-pt scoring models, and immutable audit ledgers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/verification"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 shadow-md transition-all flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>KYC Queue ({pendingKycDocs.length})</span>
          </Link>
          <Link
            to="/admin/audit-logs"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center gap-1.5"
          >
            <History className="w-4 h-4" />
            <span>Audit Trail</span>
          </Link>
        </div>
      </div>

      {/* 6 Enterprise KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Link to="/admin/applications" className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-blue-400 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Applications</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-heading">{applications.length}</div>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 block">Active In Exchange</span>
        </Link>

        <Link to="/admin/verification" className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-amber-400 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">KYC In Review</span>
          <div className="text-2xl font-extrabold text-amber-700 mt-1 font-heading">{pendingKycDocs.length}</div>
          <span className="text-[10px] text-amber-700 font-semibold mt-1 block">Verification Queue</span>
        </Link>

        <Link to="/admin/offers" className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-purple-400 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Working Deals</span>
          <div className="text-2xl font-extrabold text-purple-700 mt-1 font-heading">{activeWorkingDealsCount}</div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Max 3/Deal Cap</span>
        </Link>

        <Link to="/admin/offers" className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-emerald-400 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Offers</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1 font-heading">{offers.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Underwriter Terms</span>
        </Link>

        <Link to="/admin/lenders" className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-blue-400 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Lenders</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-heading">14 Funds</div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Accredited Seats</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Funded Deals</span>
          <div className="text-2xl font-extrabold text-[#D5B66A] mt-1 font-heading">{fundedCount} Completed</div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">$1.27M Disbursed</span>
        </div>
      </div>

      {/* 2 Column Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Master Applications Register Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
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
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                      <StatusBadge status={app.status} />
                      <span className="text-[10px] font-bold bg-[#0B1730] text-[#D5B66A] px-2 py-0.5 rounded">
                        IQ {app.investmentIQ?.total || '150'}/180
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{app.businessName}</h4>
                    <div className="text-[11px] text-slate-500">
                      {app.programName} • ${app.amount.toLocaleString()} • Borrower: {app.borrowerName}
                    </div>
                  </div>

                  <Link
                    to={`/admin/applications`}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors self-end sm:self-center"
                  >
                    Examine File
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Recent Audit Trail */}
        <div className="space-y-4">
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
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">{log.action}</span>
                    <span className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold">{log.actor} &rarr; {log.target}</div>
                  <p className="text-[10px] text-slate-500 leading-tight">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
