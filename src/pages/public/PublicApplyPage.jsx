import React from 'react';
import { ApplicationWizard } from '../../components/loans/ApplicationWizard';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicApplyPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Top Breadcrumb / Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Institutional Lending Exchange &bull; Direct Application</span>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-2 pb-2">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Commercial Loan Intake
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B1730]">
          Commercial Financing Application
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Complete the intake steps below. No prior account required to start your loan application.
        </p>
      </div>

      <ApplicationWizard />
    </div>
  );
};
