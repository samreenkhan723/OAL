import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FileText, Plus, ArrowRight, DollarSign, Award, Clock } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const BorrowerApplicationsPage = () => {
  const { applications, currentUser } = useApp();

  // Show borrower's applications (or all in demo context)
  const myApps = applications.filter(a => a.borrowerId === currentUser.id);
  const displayApps = myApps.length > 0 ? myApps : applications;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            My Loan Applications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track current progress, review working deal claims, and monitor offers.
          </p>
        </div>

        <Link
          to="/borrower/applications/new"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Commercial Request</span>
        </Link>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {displayApps.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                <StatusBadge status={app.status} />
                <span className="text-xs text-slate-400">
                  Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 break-words">{app.businessName}</h3>
              <p className="text-xs text-slate-500 break-words">{app.programName} • {app.loanPurpose}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2">
                <div>
                  <span className="text-slate-400">Requested:</span>{' '}
                  <strong className="text-slate-900 font-extrabold">${app.amount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Investment IQ:</span>{' '}
                  <strong className="text-[#D5B66A] bg-[#0B1730] px-2 py-0.5 rounded text-[11px] font-bold">
                    {app.investmentIQ?.total || 'Pending'} / 180
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400">Working Lenders:</span>{' '}
                  <strong className="text-purple-700">{app.workingDeals?.claimedLendersCount || 0} of 3</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 w-full lg:w-auto">
              <Link
                to={`/borrower/applications/${app.id}/tracker`}
                className="w-full sm:w-auto text-center px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View Tracker
              </Link>

              <Link
                to={`/borrower/applications/${app.id}`}
                className="w-full sm:w-auto justify-center px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
              >
                <span>Application Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
