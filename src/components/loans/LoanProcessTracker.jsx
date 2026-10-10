import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileEdit,
  Send,
  ShieldCheck,
  Award,
  Users,
  Search,
  Briefcase,
  DollarSign,
  CheckCircle2,
  Cpu,
  Layers,
  Banknote,
  Check,
  History,
  ExternalLink
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

const STAGES = [
  { key: 'DRAFT', label: 'Draft Started', icon: FileEdit, desc: 'Initial details entered' },
  { key: 'SUBMITTED', label: 'Application Submitted', icon: Send, desc: 'Logged with unique timestamp' },
  { key: 'KYC_REVIEW', label: 'KYC & Document Review', icon: ShieldCheck, desc: 'Identity & statements audited' },
  { key: 'SCORED', label: 'Investment IQ Scored', icon: Award, desc: '180-point evaluation calculated' },
  { key: 'QUALIFIED', label: 'Marketplace Qualified', icon: Users, desc: 'Published to anonymized exchange' },
  { key: 'WORKING_DEAL', label: 'Working Deals (Max 3)', icon: Briefcase, desc: 'Lenders actively underwriting' },
  { key: 'OFFER_RECEIVED', label: 'Offers Received', icon: DollarSign, desc: 'Competitive terms available' },
  { key: 'OFFER_ACCEPTED', label: 'Offer Accepted', icon: CheckCircle2, desc: 'Locked with chosen lender' },
  { key: 'PROCESSING', label: 'Processing & Underwriting', icon: Layers, desc: 'Final closing docs & UCC' },
  { key: 'APPROVED', label: 'Credit Approved', icon: ShieldCheck, desc: 'Underwriting committee signoff' },
  { key: 'FUNDING', label: 'Funding Stage', icon: Banknote, desc: 'Wire execution initiated' },
  { key: 'FUNDED', label: 'Disbursed / Funded', icon: Check, desc: 'Capital deposited into account' },
  { key: 'POST_FUNDING', label: 'Post-Funding Servicing', icon: History, desc: 'Amortization & debt servicing' },
];

export const LoanProcessTracker = ({ currentStatus = 'SUBMITTED', application }) => {
  const getStageIndex = (status) => {
    switch (status) {
      case 'DRAFT': return 0;
      case 'SUBMITTED': return 1;
      case 'KYC_REVIEW': return 2;
      case 'SCORED': return 3;
      case 'QUALIFIED': return 4;
      case 'WORKING_DEAL': return 5;
      case 'OFFER_RECEIVED': return 6;
      case 'OFFER_ACCEPTED': return 7;
      case 'PROCESSING': return 8;
      case 'APPROVED': return 9;
      case 'FUNDING': return 10;
      case 'FUNDED': return 11;
      case 'POST_FUNDING': return 12;
      default: return 1;
    }
  };

  const currentIndex = getStageIndex(currentStatus);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-heading font-bold text-slate-900">
              Loan Process Lifecycle Tracker
            </h3>
            <StatusBadge status={currentStatus} />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Application #{application?.id || 'APP-2026-1082'} • Automated milestone transitions per PRD FR-11
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Stage {currentIndex + 1} of {STAGES.length}
        </div>
      </div>

      {/* Horizontal Desktop Timeline */}
      <div className="hidden lg:grid grid-cols-6 gap-y-8 gap-x-3 pt-8 pb-4 relative">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          return (
            <div key={stage.key} className="flex flex-col items-center text-center relative group">
              {/* Connector line */}
              {idx % 6 !== 5 && idx < STAGES.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 z-0 ${
                    idx < currentIndex ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}

              {/* Node Icon */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center relative z-10 transition-all ${
                  isDone
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isCurrent
                    ? 'bg-[#0B1730] text-[#D5B66A] ring-4 ring-blue-600/20 shadow-lg'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
              </div>

              {/* Label & Description */}
              <div className="mt-2.5">
                <span className={`text-[11px] font-bold block ${
                  isCurrent ? 'text-blue-600' : isDone ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {stage.label}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block max-w-[120px] leading-tight">
                  {stage.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical Mobile & Tablet Stepper */}
      <div className="lg:hidden space-y-4 pt-6">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.key} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isDone
                    ? 'bg-blue-600 text-white'
                    : isCurrent
                    ? 'bg-[#0B1730] text-[#D5B66A] ring-2 ring-blue-500'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${
                    isCurrent ? 'text-blue-600' : isDone ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {stage.label}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                      Current Milestone
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage 13 Post-Funding Servicing Hub Quick Link */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50/70 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#D5B66A]" />
          <div>
            <strong className="text-slate-900 block">Stage 13: Post-Funding Commercial Servicing</strong>
            <span className="text-[11px] text-slate-500">Amortization schedules, wire receipts, ACH auto-pay & 30-day payoff quotes.</span>
          </div>
        </div>

        <Link
          to="/borrower/post-funding"
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-xs inline-flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Open Post-Funding Dashboard</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
