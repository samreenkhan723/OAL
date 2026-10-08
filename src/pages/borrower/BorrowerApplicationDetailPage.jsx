import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  DollarSign,
  Award,
  Users,
  Briefcase,
  GitBranch,
  FolderOpen,
  ChevronLeft,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoanProcessTracker } from '../../components/loans/LoanProcessTracker';
import { InvestmentIQBreakdown } from '../../components/loans/InvestmentIQBreakdown';
import { WorkingDealSlots } from '../../components/loans/WorkingDealSlots';
import { OfferComparison } from '../../components/loans/OfferComparison';

export const BorrowerApplicationDetailPage = () => {
  const { id } = useParams();
  const { applications, offers, documents } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const app = applications.find(a => a.id === id) || applications[0];
  const appOffers = offers.filter(o => o.applicationId === app?.id);
  const appDocs = documents.filter(d => d.applicationId === app?.id);

  if (!app) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-lg font-bold text-slate-800">Application not found</h2>
        <Link to="/borrower/applications" className="text-blue-600 font-bold text-xs mt-2 inline-block">
          &larr; Back to applications
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview & Terms', icon: FileText },
    { id: 'tracker', label: 'Loan Tracker', icon: GitBranch },
    { id: 'iq', label: 'Investment IQ (180)', icon: Award },
    { id: 'workingDeals', label: 'Working Deals (Max 3)', icon: Briefcase },
    { id: 'offers', label: `Lender Offers (${appOffers.length})`, icon: DollarSign },
    { id: 'docs', label: `KYC Documents (${appDocs.length})`, icon: FolderOpen },
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/borrower/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Applications</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
            <StatusBadge status={app.status} />
            <span className="text-xs text-slate-400">
              Submitted: {new Date(app.submittedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl font-bold font-heading text-slate-900 mt-1">
            {app.businessName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
            <div>
              <span className="text-slate-400">Program:</span>{' '}
              <strong className="text-blue-600">{app.programName}</strong>
            </div>
            <div>
              <span className="text-slate-400">Requested Capital:</span>{' '}
              <strong className="text-slate-900 font-extrabold">${app.amount.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-400">Assigned Rep:</span>{' '}
              <strong className="text-slate-900">{app.assignedRep?.name || 'Elena Rostova'}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/borrower/offers"
            className="px-5 py-2.5 rounded-xl bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <DollarSign className="w-4 h-4" />
            <span>View Offers ({appOffers.length})</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex space-x-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Commercial Financial Profile</h3>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Annual Gross Revenue:</span>
                  <span className="font-bold text-slate-900">${app.annualRevenue?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Monthly Operating Cash Flow:</span>
                  <span className="font-bold text-slate-900">${app.monthlyCashFlow?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Operating History:</span>
                  <span className="font-semibold">{app.yearsInBusiness} Years</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">FICO Score Stated:</span>
                  <span className="font-bold text-emerald-700">{app.creditScore}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Stated Purpose & Use of Funds</h3>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                <strong className="block text-slate-900 mb-1">Purpose (FR-03 &le; 20 Words):</strong>
                {app.loanPurpose}
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                <strong className="block text-slate-900 mb-1">Use of Proceeds:</strong>
                {app.useOfFunds}
              </div>
            </div>
          </div>

          {/* Quick tracker preview */}
          <LoanProcessTracker currentStatus={app.status} application={app} />
        </div>
      )}

      {activeTab === 'tracker' && (
        <LoanProcessTracker currentStatus={app.status} application={app} />
      )}

      {activeTab === 'iq' && (
        <InvestmentIQBreakdown investmentIQ={app.investmentIQ} />
      )}

      {activeTab === 'workingDeals' && (
        <WorkingDealSlots application={app} />
      )}

      {activeTab === 'offers' && (
        <OfferComparison applicationId={app.id} offers={offers} />
      )}

      {activeTab === 'docs' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Verified Underwriting Evidence</h3>
              <p className="text-xs text-slate-500">All documents required for compliance approval.</p>
            </div>
            <Link
              to="/borrower/documents"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
            >
              Upload / Replace File
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {appDocs.map((doc) => (
              <div key={doc.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-slate-900">{doc.title}</div>
                  <div className="text-[11px] text-slate-400">{doc.fileName} • {doc.fileSize}</div>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
