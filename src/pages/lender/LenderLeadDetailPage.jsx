import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { InvestmentIQBreakdown } from '../../components/loans/InvestmentIQBreakdown';
import { WorkingDealSlots } from '../../components/loans/WorkingDealSlots';
import { OfferComparison } from '../../components/loans/OfferComparison';

export const LenderLeadDetailPage = () => {
  const { id } = useParams();
  const { applications, offers, currentUser, claimWorkingDeal } = useApp();

  const lead = applications.find(a => a.id === id) || applications[0];
  const claims = lead?.workingDeals?.claims || [];
  const userHasClaimed = claims.some(c => c.lenderId === currentUser?.id);
  const isFull = claims.length >= 3;

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/lender/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Marketplace Leads</span>
        </Link>
      </div>

      {/* Anonymized File Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">{lead.id}</span>
            <StatusBadge status={lead.status} />
            <span className="text-xs text-slate-400">
              Submitted: {new Date(lead.submittedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl font-bold font-heading text-slate-900 mt-1">
            {lead.businessName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
            <div>
              <span className="text-slate-400">Program:</span>{' '}
              <strong className="text-blue-600">{lead.programName}</strong>
            </div>
            <div>
              <span className="text-slate-400">Target Financing:</span>{' '}
              <strong className="text-slate-900 font-extrabold">${lead.amount.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-400">Stated Revenue:</span>{' '}
              <strong className="text-slate-900">${lead.annualRevenue ? (lead.annualRevenue / 1000).toLocaleString() + 'k/yr' : '$1.2M'}</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link
            to="/lender/messages"
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Message Rep (Elena)</span>
          </Link>
        </div>
      </div>

      {/* Critical Working Deal 3-Slot Claims Component */}
      <WorkingDealSlots application={lead} />

      {/* Investment IQ Breakdown */}
      <InvestmentIQBreakdown investmentIQ={lead.investmentIQ} />

      {/* Offer Management for this deal */}
      <OfferComparison applicationId={lead.id} offers={offers} />
    </div>
  );
};
