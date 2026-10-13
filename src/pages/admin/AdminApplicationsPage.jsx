import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Search, ShieldCheck, Award, UserCheck, UserX, X } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminApplicationsPage = () => {
  const { applications, reps, advanceApplicationStatus, assignOrReassignLead, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Assignment Modal State
  const [assignModalApp, setAssignModalApp] = useState(null);
  const [selectedRepId, setSelectedRepId] = useState('');
  const [assignReason, setAssignReason] = useState('');

  const filteredApps = applications.filter(a =>
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.businessName.toLowerCase().includes(search.toLowerCase()) ||
    a.programName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage) || 1;
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const ALL_STATUSES = [
    'SUBMITTED',
    'KYC_REVIEW',
    'SCORED',
    'QUALIFIED',
    'WORKING_DEAL',
    'OFFER_RECEIVED',
    'OFFER_ACCEPTED',
    'PROCESSING',
    'APPROVED',
    'FUNDING',
    'FUNDED',
    'DECLINED'
  ];

  const handleAdvance = (appId, newStatus) => {
    advanceApplicationStatus(appId, newStatus);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenAssignModal = (app) => {
    setAssignModalApp(app);
    // Default to first active rep if unassigned, or keep current
    const defaultRep = reps?.find(r => r.status === 'ACTIVE' && r.verificationStatus === 'ACTIVE');
    setSelectedRepId(app.assignedRep?.id || defaultRep?.id || '');
    setAssignReason('');
  };

  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    if (!assignModalApp || !selectedRepId) return;

    const res = assignOrReassignLead(assignModalApp.id, selectedRepId, assignReason);
    if (res.success) {
      setAssignModalApp(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#002060]">
            Master Loan Applications Register
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Supervise all active loan files, manage placement specialist assignments, and test lifecycle transitions.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by application ID, business name, or program..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Displaying {paginatedApps.length} of {filteredApps.length} Commercial Files</span>
          <span className="text-blue-600 font-bold">Lifecycle State Machine & Lead Routing Active</span>
        </div>

        <div className="divide-y divide-slate-100">
          {paginatedApps.map((app) => (
            <div key={app.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                  <StatusBadge status={app.status} />
                  <span className="text-[11px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1 shadow-xs">
                    <Award className="w-3 h-3 text-[#002060] shrink-0" />
                    <span>IQ {app.investmentIQ?.total || '150'}/180</span>
                  </span>
                  {app.assignedRep ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      <span>Rep: {app.assignedRep.name}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                      <UserX className="w-3 h-3" />
                      <span>Unassigned</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900">{app.businessName}</h3>
                
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                  <span>{app.programName}</span>
                  <span>•</span>
                  <span>Principal: <strong>${app.amount.toLocaleString()}</strong></span>
                  <span>•</span>
                  <span>Borrower: <strong>{app.borrowerName}</strong></span>
                  <span>•</span>
                  <span>Working Claims: <strong className="text-[#002060]">{app.workingDeals?.claimedLendersCount || 0}/3</strong></span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                {/* Assign / Reassign Button */}
                <button
                  type="button"
                  onClick={() => handleOpenAssignModal(app)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                    app.assignedRep
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#0070C0]" />
                  <span>{app.assignedRep ? 'Reassign Rep' : 'Assign Rep'}</span>
                </button>

                {/* Status Transition Control */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
                  <span className="text-[11px] font-bold text-slate-500 pl-1">Transition State:</span>
                  <select
                    value={app.status}
                    onChange={(e) => handleAdvance(app.id, e.target.value)}
                    className="px-2 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0070C0] text-slate-900 flex-1 sm:flex-initial"
                  >
                    {ALL_STATUSES.map(st => (
                      <option key={st} value={st}>{st.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50/50">
            <span className="text-slate-500">
              Page <strong className="text-slate-800">{currentPage}</strong> of <strong className="text-slate-800">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Lead Assignment Modal */}
      {assignModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {assignModalApp.assignedRep ? 'Reassign Commercial Lead' : 'Assign Commercial Lead'}
                </h3>
                <span className="text-xs font-mono text-slate-500">{assignModalApp.id} • {assignModalApp.businessName}</span>
              </div>
              <button
                type="button"
                onClick={() => setAssignModalApp(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssignment} className="space-y-3.5 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-800">{assignModalApp.borrowerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Principal Requested:</span>
                  <span className="font-bold text-slate-900">${assignModalApp.amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Currently Assigned:</span>
                  <span className="font-bold text-[#002060]">
                    {assignModalApp.assignedRep?.name || 'Unassigned'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Licensed Representative</label>
                <select
                  value={selectedRepId}
                  onChange={(e) => setSelectedRepId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none font-medium"
                  required
                >
                  <option value="">-- Choose Representative --</option>
                  {(reps || []).map((r) => {
                    const currentLoad = (applications || []).filter(a =>
                      a.id !== assignModalApp.id &&
                      a.assignedRep &&
                      (a.assignedRep.id === r.id ||
                       (a.assignedRep.email && r.email && a.assignedRep.email.toLowerCase() === r.email.toLowerCase()))
                    ).length;

                    const isCurrent = assignModalApp.assignedRep?.id === r.id;
                    const isPaused = r.status === 'PAUSED';
                    const isPending = r.verificationStatus && r.verificationStatus !== 'ACTIVE';
                    const isFull = currentLoad >= (r.maxCapacity || 20);

                    return (
                      <option
                        key={r.id}
                        value={r.id}
                        disabled={isPending || isPaused || isFull}
                      >
                        {r.name} ({currentLoad}/{r.maxCapacity || 20} files)
                        {isCurrent ? ' [CURRENT]' : ''}
                        {isPending ? ' [UNAPPROVED]' : ''}
                        {isPaused ? ' [PAUSED]' : ''}
                        {isFull && !isCurrent ? ' [CAPACITY FULL]' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Administrative Reason / Audit Note (Optional)</label>
                <textarea
                  rows={2}
                  value={assignReason}
                  onChange={(e) => setAssignReason(e.target.value)}
                  placeholder="e.g. Specialty fit for franchise expansion; caseload balancing re-route..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAssignModalApp(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 w-full sm:w-auto cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white font-bold shadow-md shadow-[#0070C0]/25 w-full sm:w-auto cursor-pointer"
                >
                  Confirm Lead Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplicationsPage;
