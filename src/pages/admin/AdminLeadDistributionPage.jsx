import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  RefreshCw,
  Users,
  UserCheck,
  UserX,
  AlertCircle,
  ArrowRightLeft,
  Search,
  FileText,
  Award,
  DollarSign,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Check,
  AlertTriangle,
  Sliders,
  History,
  Building2,
  ShieldAlert,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminLeadDistributionPage = () => {
  const {
    applications,
    reps,
    distributionSettings,
    updateDistributionMode,
    assignOrReassignLead,
    auditLogs,
    addToast
  } = useApp();

  // Simulation test state
  const [isRunningSim, setIsRunningSim] = useState(false);

  // Search & Filter state for Master Lead Assignment Table
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ASSIGNED' | 'UNASSIGNED'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State for Assign / Reassign Lead
  const [modalApp, setModalApp] = useState(null);
  const [modalRepId, setModalRepId] = useState('');
  const [modalReason, setModalReason] = useState('');
  const [modalError, setModalError] = useState('');

  // 1. Dynamic Summary Calculations
  const totalAppsCount = applications?.length || 0;
  const assignedAppsCount = useMemo(() => {
    return (applications || []).filter(a => !!a.assignedRep).length;
  }, [applications]);
  const unassignedAppsCount = totalAppsCount - assignedAppsCount;

  const activeRepsCount = useMemo(() => {
    return (reps || []).filter(
      r => (r.verificationStatus || 'ACTIVE') === 'ACTIVE' && r.status === 'ACTIVE'
    ).length;
  }, [reps]);

  const totalCapacity = useMemo(() => {
    return (reps || []).reduce((acc, r) => acc + (r.maxCapacity || 20), 0);
  }, [reps]);

  // 2. Filtered Applications for Master Table
  const filteredApps = useMemo(() => {
    return (applications || []).filter((app) => {
      // Status filter (Assigned / Unassigned / All)
      if (statusFilter === 'ASSIGNED' && !app.assignedRep) return false;
      if (statusFilter === 'UNASSIGNED' && !!app.assignedRep) return false;

      // Search Query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchId = app.id?.toLowerCase().includes(q);
      const matchBiz = app.businessName?.toLowerCase().includes(q);
      const matchBorrower = app.borrowerName?.toLowerCase().includes(q);
      const matchProgram = app.programName?.toLowerCase().includes(q);
      const matchRep = app.assignedRep?.name?.toLowerCase().includes(q);

      return matchId || matchBiz || matchBorrower || matchProgram || matchRep;
    });
  }, [applications, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage) || 1;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredApps.slice(start, start + itemsPerPage);
  }, [filteredApps, currentPage, itemsPerPage]);

  // 3. Assignment History from Audit Logs
  const assignmentAuditEvents = useMemo(() => {
    return (auditLogs || []).filter(
      (log) =>
        log.action === 'LEAD_ASSIGNED' ||
        log.action === 'LEAD_REASSIGNED' ||
        log.action === 'DISTRIBUTION_MODE_UPDATED'
    ).slice(0, 8);
  }, [auditLogs]);

  // Open Modal Handler
  const handleOpenAssignModal = (app) => {
    setModalApp(app);
    setModalRepId('');
    setModalReason('');
    setModalError('');
  };

  // Close Modal Handler
  const handleCloseModal = () => {
    setModalApp(null);
    setModalRepId('');
    setModalReason('');
    setModalError('');
  };

  // Submit Assignment Handler
  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    if (!modalApp || !modalRepId) {
      setModalError('Please choose a licensed representative.');
      return;
    }

    const result = assignOrReassignLead(modalApp.id, modalRepId, modalReason);
    if (result.success) {
      handleCloseModal();
    } else {
      setModalError(result.error || result.message || 'Assignment failed. Please verify representative status.');
    }
  };

  // Run Simulation Handler
  const handleRunSimulation = () => {
    setIsRunningSim(true);
    setTimeout(() => {
      setIsRunningSim(false);
      addToast(
        'Lead Distribution Simulation Complete [SIMULATED]',
        `Simulated buy-box matching for ${totalAppsCount} loan files across ${activeRepsCount} active placement desks. 3 files prioritized for underwriter review.`,
        'success'
      );
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-[1920px] mx-auto min-w-0">
      {/* =========================================================================
          1. DASHBOARD HEADER
          ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-heading font-extrabold text-[#002060]">
              Lead Distribution & Assignment
            </h1>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${
              distributionSettings?.mode === 'AUTO'
                ? 'bg-blue-50 text-[#0070C0] border-blue-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${distributionSettings?.mode === 'AUTO' ? 'bg-[#0070C0] animate-pulse' : 'bg-emerald-500'}`} />
              <span>{distributionSettings?.mode === 'AUTO' ? 'AUTO DISTRIBUTION CONFIGURED' : 'MANUAL ASSIGNMENT ACTIVE'}</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Administrative console for governing commercial borrower file routing, representative caseload balancing, and supervised mediation assignments across OAL Network.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/admin/representatives"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0]" />
            <span>Representatives Roster ({activeRepsCount})</span>
          </Link>

          <button
            onClick={handleRunSimulation}
            disabled={isRunningSim}
            className="px-4 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isRunningSim ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" /> : <Play className="w-3.5 h-3.5 text-white" />}
            <span>{isRunningSim ? 'Simulating Routing...' : 'Run Routing Simulation'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. SUMMARY KPI CARDS (DYNAMIC CONTEXT DERIVED)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Applications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Applications
            </span>
            <div className="text-3xl font-heading font-extrabold text-[#002060] mt-1">
              {totalAppsCount}
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Commercial Deal Pipeline
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0070C0] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Assigned Applications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Assigned Applications
            </span>
            <div className="text-3xl font-heading font-extrabold text-emerald-700 mt-1">
              {assignedAppsCount}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
              {totalAppsCount > 0 ? Math.round((assignedAppsCount / totalAppsCount) * 100) : 0}% Allocated to Reps
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Unassigned Applications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Unassigned Leads
            </span>
            <div className={`text-3xl font-heading font-extrabold mt-1 ${unassignedAppsCount > 0 ? 'text-amber-600' : 'text-slate-800'}`}>
              {unassignedAppsCount}
            </div>
            <span className="text-[11px] text-amber-700 font-semibold mt-0.5 block">
              {unassignedAppsCount > 0 ? 'Awaiting Rep Routing' : 'All Leads Assigned'}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs ${
            unassignedAppsCount > 0
              ? 'bg-amber-50 text-amber-600 border-amber-200'
              : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}>
            <UserX className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Active Placement Reps */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Active Representatives
            </span>
            <div className="text-3xl font-heading font-extrabold text-[#002060] mt-1">
              {activeRepsCount}
            </div>
            <span className="text-[11px] text-[#0070C0] font-semibold mt-0.5 block">
              {Math.max(0, totalCapacity - assignedAppsCount)} Caseload Slots Open
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#002060] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. AUTO / MANUAL DISTRIBUTION CONTROLS & POLICY BANNER
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0070C0]" />
              <span>Lead Distribution Policy Mode</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select between automatic rule-based lead routing or supervised manual assignment by compliance administrators.
            </p>
          </div>

          {/* Segmented Mode Control */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold shrink-0 self-start sm:self-auto">
            <button
              type="button"
              id="dist-mode-manual-btn"
              onClick={() => updateDistributionMode('MANUAL')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                distributionSettings?.mode === 'MANUAL'
                  ? 'bg-[#002060] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Manual Distribution</span>
            </button>

            <button
              type="button"
              id="dist-mode-auto-btn"
              onClick={() => updateDistributionMode('AUTO')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                distributionSettings?.mode === 'AUTO'
                  ? 'bg-[#0070C0] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Auto Distribution</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mode Explanatory Notice */}
        {distributionSettings?.mode === 'AUTO' ? (
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-blue-900">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0070C0] flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-[#002060] flex items-center gap-2">
                  <span>Auto Distribution Configured</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-900 font-mono">
                    Pending Client Priority Weights
                  </span>
                </div>
                <p className="text-blue-950/80 leading-relaxed text-[11px] max-w-4xl">
                  Automatic assignment is configured in state; however, automated execution is held pending final client confirmation regarding whether geographic territory, loan category specialization, or round-robin caseload balancing takes precedence. Manual assignment and reassignments remain active. Mode transitions never alter existing placements.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-white border border-blue-200 px-3 py-1 rounded-lg shrink-0 self-start md:self-auto">
              Safe Non-Destructive Mode
            </span>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span>Manual Distribution Active</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Supervised Admin Routing
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px] max-w-4xl">
                  Administrators manually allocate commercial loan applications to approved OAL Representatives using the Master Lead Assignment Table below. Caseload limits and account verification statuses are strictly enforced by the assignment guard.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-lg shrink-0 self-start md:self-auto">
              Administrator Direct Control
            </span>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. REP WORKLOAD & CAPACITY MONITORING SECTION
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0070C0]" />
              <span>Representative Workload & Caseload Saturation</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live capacity utilization across approved commercial placement specialists. Saturated desks cannot receive new leads.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {reps?.length || 0} Licensed Representatives Registered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(reps || []).map((rep) => {
            // Calculate live load from actual applications
            const currentLoad = (applications || []).filter(a =>
              a.assignedRep &&
              (a.assignedRep.id === rep.id ||
               (a.assignedRep.email && rep.email && a.assignedRep.email.toLowerCase() === rep.email.toLowerCase()) ||
               (rep.aliases && rep.aliases.includes(a.assignedRep.id)))
            ).length;

            const maxCap = rep.maxCapacity || 20;
            const availableCapacity = Math.max(0, maxCap - currentLoad);
            const utilPercent = Math.min(100, Math.round((currentLoad / maxCap) * 100));

            const isPaused = rep.status === 'PAUSED';
            const isPending = rep.verificationStatus && rep.verificationStatus !== 'ACTIVE';
            const isFull = currentLoad >= maxCap;

            // Color indicator for progress bar
            let barColor = 'bg-emerald-500';
            if (utilPercent >= 90) barColor = 'bg-rose-500';
            else if (utilPercent >= 70) barColor = 'bg-amber-500';

            return (
              <div
                key={rep.id}
                className={`p-4 rounded-xl border transition-all ${
                  isPending
                    ? 'bg-amber-50/40 border-amber-200'
                    : isPaused
                    ? 'bg-rose-50/30 border-rose-200'
                    : isFull
                    ? 'bg-slate-50 border-amber-300'
                    : 'bg-white border-slate-200 hover:border-[#0070C0] hover:shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {rep.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold truncate">
                      {rep.title || 'Placement Specialist'}
                    </p>
                    <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                      {rep.email}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    isPending
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : isPaused
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {isPending ? 'APPROVAL PENDING' : rep.status || 'ACTIVE'}
                  </span>
                </div>

                {/* Caseload Metric & Progress Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Active Placements:</span>
                    <strong className="text-slate-900 font-mono">
                      {currentLoad} / {maxCap} files ({utilPercent}%)
                    </strong>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${utilPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-500">Available Headroom:</span>
                    <span className={`font-bold ${isFull ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {availableCapacity} {availableCapacity === 1 ? 'Slot' : 'Slots'} Open
                    </span>
                  </div>

                  {(isPaused || isPending || isFull) && (
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] font-bold text-amber-800 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>
                        {isPending
                          ? 'Unapproved: Blocked from lead routing'
                          : isPaused
                          ? 'Queue Paused: Intake suspended'
                          : 'Caseload Saturated: Max limit reached'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          5. MASTER LEAD ASSIGNMENT TABLE
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Table Top Header & Search/Filter Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0070C0]" />
                <span>Commercial Placement Directory</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign unassigned applicant files or reassign existing placements to balance representative workloads.
              </p>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-800">{filteredApps.length}</strong> of <strong className="text-slate-800">{totalAppsCount}</strong> applications
            </div>
          </div>

          {/* Search bar and Filter Segmented Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold shrink-0">
              <button
                type="button"
                id="filter-all-leads-btn"
                onClick={() => { setStatusFilter('ALL'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-white text-[#002060] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Applications ({totalAppsCount})
              </button>
              <button
                type="button"
                id="filter-assigned-leads-btn"
                onClick={() => { setStatusFilter('ASSIGNED'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'ASSIGNED'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Assigned ({assignedAppsCount})
              </button>
              <button
                type="button"
                id="filter-unassigned-leads-btn"
                onClick={() => { setStatusFilter('UNASSIGNED'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'UNASSIGNED'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unassigned ({unassignedAppsCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-leads-input"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search by Application ID, Business, Borrower, or Rep..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop / Tablet Table View (md:block) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Application ID</th>
                <th className="py-3.5 px-4">Business / Borrower</th>
                <th className="py-3.5 px-4">Program & Principal</th>
                <th className="py-3.5 px-4">Status & IQ</th>
                <th className="py-3.5 px-4">Assigned Representative</th>
                <th className="py-3.5 px-4 text-right">Assignment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-slate-700 text-sm">No applications found</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      No applications matched the current search query or filter selection.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedApps.map((app) => {
                  const isAssigned = !!app.assignedRep;
                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* 1. App ID */}
                      <td className="py-4 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {app.id}
                      </td>

                      {/* 2. Business & Borrower */}
                      <td className="py-4 px-4 min-w-[200px]">
                        <div className="font-bold text-slate-900">
                          {app.businessName}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          Borrower: {app.borrowerName}
                        </div>
                      </td>

                      {/* 3. Program & Principal */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">
                          ${(app.amount || 0).toLocaleString()}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {app.programName}
                        </div>
                      </td>

                      {/* 4. Status & IQ */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <StatusBadge status={app.status} />
                          <span className="text-[10px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            <Award className="w-2.5 h-2.5" />
                            <span>IQ {app.investmentIQ?.total || '150'}</span>
                          </span>
                        </div>
                      </td>

                      {/* 5. Assigned Representative */}
                      <td className="py-4 px-4 min-w-[180px]">
                        {isAssigned ? (
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0070C0] flex items-center justify-center font-bold text-xs shrink-0">
                              {app.assignedRep.name?.charAt(0) || 'R'}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-[#002060] block truncate">
                                {app.assignedRep.name}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {app.assignedRep.email}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                            <span>Unassigned</span>
                          </span>
                        )}
                      </td>

                      {/* 6. Assignment Action */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        {isAssigned ? (
                          <button
                            type="button"
                            id={`reassign-btn-${app.id}`}
                            onClick={() => handleOpenAssignModal(app)}
                            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
                            <span>Reassign</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            id={`assign-btn-${app.id}`}
                            onClick={() => handleOpenAssignModal(app)}
                            className="px-4 py-1.5 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold shadow-xs hover:shadow-md shadow-[#0070C0]/25 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Assign Rep</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Responsive Stacked Cards (<768px) */}
        <div className="md:hidden divide-y divide-slate-100">
          {paginatedApps.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700 text-sm">No applications found</p>
            </div>
          ) : (
            paginatedApps.map((app) => {
              const isAssigned = !!app.assignedRep;
              return (
                <div key={app.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-slate-900 text-xs">{app.id}</span>
                    <StatusBadge status={app.status} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{app.businessName}</h3>
                    <p className="text-xs text-slate-500">{app.borrowerName} • {app.programName}</p>
                    <div className="text-xs font-bold text-slate-800 mt-1">
                      ${(app.amount || 0).toLocaleString()} • IQ {app.investmentIQ?.total || '150'}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Assigned Specialist:</span>
                      {isAssigned ? (
                        <span className="font-bold text-[#002060] text-xs">{app.assignedRep.name}</span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-700">Unassigned</span>
                      )}
                    </div>

                    {isAssigned ? (
                      <button
                        type="button"
                        onClick={() => handleOpenAssignModal(app)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        <span>Reassign</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenAssignModal(app)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0070C0] text-white text-xs font-bold shadow-xs flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Assign</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
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
                id="pagination-prev-btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                id="pagination-next-btn"
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

      {/* =========================================================================
          6. ASSIGNMENT HISTORY & AUDIT TRAIL
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-[#0070C0]" />
            <span>Recent Lead Assignment Audit Trail</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            System Event Log
          </span>
        </div>

        {assignmentAuditEvents.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No lead assignment audit records logged yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {assignmentAuditEvents.map((evt) => {
              const isReassign = evt.action === 'LEAD_REASSIGNED';
              const isModeUpdate = evt.action === 'DISTRIBUTION_MODE_UPDATED';

              return (
                <div key={evt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isModeUpdate
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : isReassign
                          ? 'bg-blue-50 text-[#0070C0] border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {evt.action}
                      </span>
                      {evt.applicationId && (
                        <span className="font-mono font-bold text-slate-700">{evt.applicationId}</span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        by {evt.actor || evt.performedBy || 'Admin'}
                      </span>
                    </div>

                    <div className="text-slate-600 text-[11px]">
                      {isModeUpdate ? (
                        evt.details
                      ) : (
                        <span>
                          Transferred: <strong className="text-slate-800">{evt.previousRepName || 'Unassigned'}</strong> &rarr; <strong className="text-[#002060]">{evt.newRepName}</strong>
                          {evt.reason && <span className="text-slate-500 italic ml-1">("{evt.reason}")</span>}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 shrink-0 self-start sm:self-auto">
                    {evt.timestamp ? new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Recently'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          7. ASSIGN / REASSIGN MODAL
          ========================================================================= */}
      {modalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {modalApp.assignedRep ? 'Reassign Commercial Lead' : 'Assign Commercial Lead'}
                </h3>
                <span className="text-xs font-mono text-slate-500">{modalApp.id} • {modalApp.businessName}</span>
              </div>
              <button
                type="button"
                id="close-assignment-modal-btn"
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Banner inside Modal */}
            {modalError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Assignment Guard Error:</strong> {modalError}
                </div>
              </div>
            )}

            <form onSubmit={handleConfirmAssignment} className="space-y-4 text-xs">
              {/* Application Details Summary */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-800">{modalApp.borrowerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Loan Program:</span>
                  <span className="font-semibold text-slate-800">{modalApp.programName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Principal Requested:</span>
                  <span className="font-bold text-slate-900">${(modalApp.amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Currently Assigned:</span>
                  <span className={`font-bold ${modalApp.assignedRep ? 'text-[#002060]' : 'text-amber-700'}`}>
                    {modalApp.assignedRep?.name || 'Unassigned (No Rep Assigned)'}
                  </span>
                </div>
              </div>

              {/* Select Rep Dropdown */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Select Target Representative *
                </label>
                <select
                  id="target-rep-select"
                  value={modalRepId}
                  onChange={(e) => { setModalRepId(e.target.value); setModalError(''); }}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none font-medium text-xs bg-white"
                  required
                >
                  <option value="">-- Choose Representative --</option>
                  {(reps || []).map((r) => {
                    const currentLoad = (applications || []).filter(a =>
                      a.id !== modalApp.id &&
                      a.assignedRep &&
                      (a.assignedRep.id === r.id ||
                       (a.assignedRep.email && r.email && a.assignedRep.email.toLowerCase() === r.email.toLowerCase()) ||
                       (r.aliases && r.aliases.includes(a.assignedRep.id)))
                    ).length;

                    const isCurrent = modalApp.assignedRep?.id === r.id;
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
                        {isCurrent ? ' [CURRENT ASSIGNEE]' : ''}
                        {isPending ? ' [UNAPPROVED]' : ''}
                        {isPaused ? ' [PAUSED]' : ''}
                        {isFull && !isCurrent ? ' [CAPACITY FULL]' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Live Rep Workload Preview when Rep is chosen */}
              {modalRepId && (
                (() => {
                  const targetRep = (reps || []).find(r => r.id === modalRepId);
                  if (!targetRep) return null;
                  const currentLoad = (applications || []).filter(a =>
                    a.id !== modalApp.id &&
                    a.assignedRep &&
                    (a.assignedRep.id === targetRep.id ||
                     (a.assignedRep.email && targetRep.email && a.assignedRep.email.toLowerCase() === targetRep.email.toLowerCase()))
                  ).length;
                  const projectedLoad = currentLoad + 1;
                  const maxCap = targetRep.maxCapacity || 20;

                  return (
                    <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1 text-[11px] text-blue-950">
                      <div className="flex justify-between font-semibold">
                        <span>Projected Caseload for {targetRep.name}:</span>
                        <strong className="text-[#002060] font-mono">{projectedLoad} / {maxCap} files</strong>
                      </div>
                      <div className="text-slate-600">
                        Remaining Headroom after Assignment: <strong>{Math.max(0, maxCap - projectedLoad)} slots</strong>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Administrative Reason */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Administrative Reason / Audit Note (Optional)
                </label>
                <textarea
                  id="assignment-reason-input"
                  rows={2}
                  value={modalReason}
                  onChange={(e) => setModalReason(e.target.value)}
                  placeholder="e.g. Specialty fit for franchise expansion; workload rebalancing..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none text-xs"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  id="cancel-assignment-modal-btn"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 w-full sm:w-auto cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="confirm-assignment-submit-btn"
                  className="px-5 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white font-bold shadow-md shadow-[#0070C0]/25 w-full sm:w-auto cursor-pointer disabled:opacity-50"
                  disabled={!modalRepId}
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

export default AdminLeadDistributionPage;
