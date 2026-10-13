import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  ShieldCheck,
  Check,
  Building2,
  UserCheck,
  Clock,
  Eye,
  X,
  FileCheck2,
  AlertTriangle,
  Lock,
  Search,
  Filter
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { VerifyBadge } from '../../components/common/VerifyBadge';

/**
 * Robust document size formatter handling strings, bytes, undefined, and legacy values safely
 */
export const formatDocumentSize = (rawSize) => {
  if (rawSize === null || rawSize === undefined || rawSize === '') {
    return '2.1 MB';
  }
  if (typeof rawSize === 'string') {
    const trimmed = rawSize.trim();
    if (!trimmed || trimmed.toLowerCase().includes('nan')) {
      return '2.1 MB';
    }
    // If already has unit e.g. "2.4 MB", "1.1 MB", "500 KB", "45 B"
    if (/^\d+(\.\d+)?\s*(mb|kb|gb|bytes?|b)$/i.test(trimmed)) {
      return trimmed;
    }
    const parsed = parseFloat(trimmed);
    if (!isNaN(parsed) && parsed > 0) {
      if (parsed >= 1024 * 1024) return `${(parsed / (1024 * 1024)).toFixed(1)} MB`;
      if (parsed >= 1024) return `${(parsed / 1024).toFixed(1)} KB`;
      return `${Math.round(parsed)} B`;
    }
    return trimmed;
  }
  if (typeof rawSize === 'number' && !isNaN(rawSize) && rawSize > 0) {
    if (rawSize >= 1024 * 1024) return `${(rawSize / (1024 * 1024)).toFixed(1)} MB`;
    if (rawSize >= 1024) return `${(rawSize / 1024).toFixed(1)} KB`;
    return `${Math.round(rawSize)} B`;
  }
  return '2.1 MB';
};

export const AdminVerificationPage = () => {
  const {
    documents,
    updateDocumentStatus,
    registeredUsers,
    approveUserAccount,
    rejectUserAccount,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('borrower'); // 'borrower' | 'lender' | 'rep'
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [actionNotes, setActionNotes] = useState('');

  // Rejection modal state
  const [rejectingUser, setRejectingUser] = useState(null);
  const [rejectionReasonPreset, setRejectionReasonPreset] = useState(
    'Business registration documentation cannot be verified with Secretary of State'
  );
  const [rejectionCustomNote, setRejectionCustomNote] = useState('');

  // Approval confirmation modal state
  const [approvingUser, setApprovingUser] = useState(null);

  // Safe document preview modal state
  const [previewDoc, setPreviewDoc] = useState(null);

  // Filter state for applicants
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED'
  const [searchQuery, setSearchQuery] = useState('');

  // Handle document decision for Borrower KYC
  const handleDocDecision = (docId, newStatus) => {
    updateDocumentStatus(
      docId,
      newStatus,
      actionNotes || 'Verified compliance with commercial underwriting standards.'
    );
    setSelectedDoc(null);
    setActionNotes('');
  };

  // Data sets for Lenders and Representatives
  const lenderUsers = (registeredUsers || []).filter((u) => u.role === 'lender');
  const repUsers = (registeredUsers || []).filter((u) => u.role === 'rep');

  const pendingLendersCount = lenderUsers.filter(
    (u) => (u.verificationStatus || 'PENDING_APPROVAL') === 'PENDING_APPROVAL'
  ).length;
  const pendingRepsCount = repUsers.filter(
    (u) => (u.verificationStatus || 'PENDING_APPROVAL') === 'PENDING_APPROVAL'
  ).length;

  // Filter helper for users list
  const filterUsers = (userList) => {
    return userList.filter((u) => {
      const uStatus = u.verificationStatus || 'PENDING_APPROVAL';
      if (statusFilter !== 'ALL' && uStatus !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = u.name?.toLowerCase().includes(q);
        const matchesEmail = u.email?.toLowerCase().includes(q);
        const matchesEntity = u.businessInfo?.entityType?.toLowerCase().includes(q);
        const matchesSpec = u.repInfo?.specialty?.toLowerCase().includes(q);
        return matchesName || matchesEmail || matchesEntity || matchesSpec;
      }
      return true;
    });
  };

  const filteredLenders = filterUsers(lenderUsers);
  const filteredReps = filterUsers(repUsers);

  // Confirm Approval
  const handleConfirmApproval = () => {
    if (!approvingUser) return;
    approveUserAccount(approvingUser.id);
    setApprovingUser(null);
  };

  // Confirm Rejection
  const handleConfirmRejection = (e) => {
    e.preventDefault();
    if (!rejectingUser) return;
    const finalReason =
      rejectionReasonPreset === 'OTHER'
        ? rejectionCustomNote.trim() || 'Application rejected by compliance committee.'
        : rejectionReasonPreset + (rejectionCustomNote.trim() ? ` — Note: ${rejectionCustomNote.trim()}` : '');

    rejectUserAccount(rejectingUser.id, finalReason);
    setRejectingUser(null);
    setRejectionCustomNote('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#002060]">
              Compliance &amp; Verification Center
            </h1>
            <VerifyBadge note="Client confirmation pending for mandatory third-party KYC automation providers and retention periods" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Super-Admin compliance verification clearinghouse for Borrower loan KYC, Institutional Lender admissions, and OAL Representative credentialing.
          </p>
        </div>
      </div>

      {/* 3 Primary Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-1.5 flex flex-col sm:flex-row gap-1.5">
        <button
          onClick={() => {
            setActiveTab('borrower');
            setStatusFilter('ALL');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'borrower'
              ? 'bg-[#002060] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4 text-[#FFD200]" />
          <span>1. Borrower KYC Documents</span>
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
            activeTab === 'borrower' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {documents.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('lender');
            setStatusFilter('ALL');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'lender'
              ? 'bg-[#002060] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#00B0F0]" />
          <span>2. Institutional Lender Applications</span>
          {pendingLendersCount > 0 && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono font-bold animate-pulse">
              {pendingLendersCount} Pending
            </span>
          )}
          {pendingLendersCount === 0 && (
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
              activeTab === 'lender' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {lenderUsers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('rep');
            setStatusFilter('ALL');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'rep'
              ? 'bg-[#002060] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>3. OAL Representative Applications</span>
          {pendingRepsCount > 0 && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono font-bold animate-pulse">
              {pendingRepsCount} Pending
            </span>
          )}
          {pendingRepsCount === 0 && (
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
              activeTab === 'rep' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {repUsers.length}
            </span>
          )}
        </button>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: BORROWER KYC (PRESERVED COMPLETE ORIGINAL LOGIC) */}
      {/* ============================================================ */}
      {activeTab === 'borrower' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Borrower Verification Queue ({documents.length} Files)</span>
            <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Commercial Loan KYC Underwriting
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {documents.map((doc) => {
              const isVerified = doc.status === 'VERIFIED';

              return (
                <div
                  key={doc.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{doc.id}</span>
                      <StatusBadge status={doc.status} />
                      <span className="text-xs text-slate-400">Target: {doc.applicationId}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                    <div className="text-xs text-slate-500">
                      File: <span className="font-mono text-slate-600">{doc.fileName}</span> • {doc.fileSize} • Category: {doc.category}
                    </div>

                    {doc.reviewerNotes && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 mt-2">
                        <strong>Audit Log Note ({doc.reviewedBy}):</strong> {doc.reviewerNotes}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    {!isVerified && (
                      <button
                        onClick={() => handleDocDecision(doc.id, 'VERIFIED')}
                        className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1 w-full sm:w-auto cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve (Verify)</span>
                      </button>
                    )}

                    {doc.status !== 'NEEDS_REPLACEMENT' && (
                      <button
                        onClick={() => handleDocDecision(doc.id, 'NEEDS_REPLACEMENT')}
                        className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-1 w-full sm:w-auto cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Request Replace</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 2: INSTITUTIONAL LENDER APPLICATIONS                */}
      {/* ============================================================ */}
      {activeTab === 'lender' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search lenders by name, email, or entity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#0070C0]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Filter Status:</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
                {['ALL', 'PENDING_APPROVAL', 'ACTIVE', 'REJECTED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-white text-[#002060] shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st === 'ALL' ? 'All' : st === 'PENDING_APPROVAL' ? 'Pending' : st === 'ACTIVE' ? 'Active' : 'Rejected'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* List of Lender Applications */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Institutional Lender Queue ({filteredLenders.length} Applicants)</span>
              <span className="text-[#002060] font-bold">Rule FR-08 Lending Admissions Audit</span>
            </div>

            {filteredLenders.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No lender applications found matching the selected filter criteria.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredLenders.map((user) => {
                  const uStatus = user.verificationStatus || 'PENDING_APPROVAL';
                  const isPending = uStatus === 'PENDING_APPROVAL';
                  const isActive = uStatus === 'ACTIVE';
                  const isRejected = uStatus === 'REJECTED';

                  return (
                    <div key={user.id} className="p-5 space-y-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Lender Details */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-400">{user.id}</span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : isRejected
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {isActive ? 'ACTIVE & VERIFIED' : isRejected ? 'REJECTED' : 'PENDING APPROVAL'}
                            </span>
                            {user.isSeedApplication && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-[#0070C0] border border-sky-200">
                                Demo Application
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-slate-900">{user.name}</h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                            <div>
                              <span className="text-slate-400 block text-[11px]">Entity Type</span>
                              <strong className="text-slate-800">{user.businessInfo?.entityType || 'Registered Lender'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[11px]">Contact &amp; Phone</span>
                              <span>{user.email} &bull; {user.phone || 'Phone on file'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[11px]">Tax ID / EIN</span>
                              <span className="font-mono font-bold text-slate-700">
                                {user.businessInfo?.taxId ? `***-**-${user.businessInfo.taxId.slice(-4)}` : 'XX-XXXXX01'}
                              </span>
                            </div>
                          </div>

                          {/* Submission Date & Note */}
                          <div className="text-[11px] text-slate-400 pt-0.5">
                            Application Submitted:{' '}
                            <span className="font-medium text-slate-600">
                              {user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : '2026-10-10'}
                            </span>
                          </div>

                          {/* Rejection Note if Rejected */}
                          {isRejected && user.rejectionReason && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1 mt-2">
                              <div className="font-bold flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Rejection Reason Logged:</span>
                              </div>
                              <p className="font-mono text-[11px]">{user.rejectionReason}</p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 justify-end shrink-0">
                          {isPending && (
                            <>
                              <button
                                onClick={() => setApprovingUser(user)}
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Approve Account</span>
                              </button>

                              <button
                                onClick={() => {
                                  setRejectingUser(user);
                                  setRejectionReasonPreset('Business registration documentation cannot be verified with Secretary of State');
                                  setRejectionCustomNote('');
                                }}
                                className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reject Applicant</span>
                              </button>
                            </>
                          )}

                          {isActive && (
                            <button
                              onClick={() => {
                                setRejectingUser(user);
                                setRejectionReasonPreset('Compliance review revocation — credentials suspended.');
                                setRejectionCustomNote('');
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Suspend / Revoke
                            </button>
                          )}

                          {isRejected && (
                            <button
                              onClick={() => setApprovingUser(user)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Re-evaluate &amp; Approve
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Submitted Verification Document Strip */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="w-4 h-4 text-[#0070C0] shrink-0" />
                          <span className="font-bold text-slate-700">Verification Document:</span>
                          {user.documents && user.documents.length > 0 ? (
                            user.documents.map((d, i) => (
                              <span key={i} className="font-mono text-slate-600">
                                {d.name} ({formatDocumentSize(d.size)})
                              </span>
                            ))
                          ) : (
                            <span className="font-mono text-slate-600">
                              business_license_{user.id}.pdf (1.8 MB)
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const docData = user.documents && user.documents[0] ? user.documents[0] : {
                              name: `business_license_${user.id}.pdf`,
                              docType: 'Business License & Articles of Organization',
                              size: 1845000,
                              uploadDate: user.registrationDate || new Date().toISOString()
                            };
                            setPreviewDoc({
                              ...docData,
                              applicantName: user.name,
                              applicantRole: 'Institutional Lender'
                            });
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0070C0] hover:text-[#002060] transition-colors cursor-pointer shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Safe Document Preview</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 3: OAL REPRESENTATIVE APPLICATIONS                   */}
      {/* ============================================================ */}
      {activeTab === 'rep' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search representatives by name, email, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#0070C0]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Filter Status:</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
                {['ALL', 'PENDING_APPROVAL', 'ACTIVE', 'REJECTED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-white text-[#002060] shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st === 'ALL' ? 'All' : st === 'PENDING_APPROVAL' ? 'Pending' : st === 'ACTIVE' ? 'Active' : 'Rejected'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* List of Rep Applications */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>OAL Representative Agent Queue ({filteredReps.length} Applicants)</span>
              <span className="text-emerald-700 font-bold">Fiduciary Placement Credentialing</span>
            </div>

            {filteredReps.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No representative applications found matching the selected filter criteria.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredReps.map((user) => {
                  const uStatus = user.verificationStatus || 'PENDING_APPROVAL';
                  const isPending = uStatus === 'PENDING_APPROVAL';
                  const isActive = uStatus === 'ACTIVE';
                  const isRejected = uStatus === 'REJECTED';

                  return (
                    <div key={user.id} className="p-5 space-y-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Rep Details */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-400">{user.id}</span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : isRejected
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {isActive ? 'ACTIVE & VERIFIED' : isRejected ? 'REJECTED' : 'PENDING APPROVAL'}
                            </span>
                            {user.isSeedApplication && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Demo Application
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-slate-900">{user.name}</h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                            <div>
                              <span className="text-slate-400 block text-[11px]">Experience &amp; Specialty</span>
                              <strong className="text-slate-800">
                                {user.repInfo?.experience || 'Licensed Advisor'} &bull; {user.repInfo?.specialty || 'Commercial Placement'}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[11px]">Contact &amp; Phone</span>
                              <span>{user.email} &bull; {user.phone || 'Phone on file'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[11px]">Licensing / Certifications</span>
                              <span className="font-medium text-slate-700">
                                {user.repInfo?.certifications || 'Series 79, SME Commercial Debt Specialist'}
                              </span>
                            </div>
                          </div>

                          {/* Submission Date */}
                          <div className="text-[11px] text-slate-400 pt-0.5">
                            Application Submitted:{' '}
                            <span className="font-medium text-slate-600">
                              {user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : '2026-10-11'}
                            </span>
                          </div>

                          {/* Rejection Note if Rejected */}
                          {isRejected && user.rejectionReason && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1 mt-2">
                              <div className="font-bold flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Rejection Reason Logged:</span>
                              </div>
                              <p className="font-mono text-[11px]">{user.rejectionReason}</p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 justify-end shrink-0">
                          {isPending && (
                            <>
                              <button
                                onClick={() => setApprovingUser(user)}
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Approve Agent</span>
                              </button>

                              <button
                                onClick={() => {
                                  setRejectingUser(user);
                                  setRejectionReasonPreset('Unverifiable professional licensing / credentials');
                                  setRejectionCustomNote('');
                                }}
                                className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reject Applicant</span>
                              </button>
                            </>
                          )}

                          {isActive && (
                            <button
                              onClick={() => {
                                setRejectingUser(user);
                                setRejectionReasonPreset('Fiduciary license suspension or compliance audit request.');
                                setRejectionCustomNote('');
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Suspend / Revoke
                            </button>
                          )}

                          {isRejected && (
                            <button
                              onClick={() => setApprovingUser(user)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Re-evaluate &amp; Approve
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Submitted Verification Document Strip */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-700">Verification Document:</span>
                          {user.documents && user.documents.length > 0 ? (
                            user.documents.map((d, i) => (
                              <span key={i} className="font-mono text-slate-600">
                                {d.name} ({formatDocumentSize(d.size)})
                              </span>
                            ))
                          ) : (
                            <span className="font-mono text-slate-600">
                              identity_credentials_{user.id}.pdf (2.1 MB)
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const docData = user.documents && user.documents[0] ? user.documents[0] : {
                              name: `identity_credentials_${user.id}.pdf`,
                              docType: 'Government Photo ID & Advisory License',
                              size: 2150000,
                              uploadDate: user.registrationDate || new Date().toISOString()
                            };
                            setPreviewDoc({
                              ...docData,
                              applicantName: user.name,
                              applicantRole: 'OAL Representative'
                            });
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0070C0] hover:text-[#002060] transition-colors cursor-pointer shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Safe Document Preview</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: CONFIRM APPROVAL                                    */}
      {/* ============================================================ */}
      {approvingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#002060]">Confirm Account Approval</h3>
                <p className="text-xs text-slate-500">OAL Compliance Clearinghouse</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to approve <strong className="text-slate-900">{approvingUser.name}</strong> as an active{' '}
              <strong className="text-[#002060]">
                {approvingUser.role === 'lender' ? 'Institutional Lender' : 'OAL Representative'}
              </strong>
              ?
            </p>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <strong className="block font-bold">Privileges Granted:</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Access to authorized workspace dashboard.</li>
                <li>Clearance to participate in live commercial loan routing.</li>
                <li>Digital compliance badge appended to audit log.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setApprovingUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm &amp; Activate Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: REJECT APPLICANT WITH MANDATORY REASON              */}
      {/* ============================================================ */}
      {rejectingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <form
            onSubmit={handleConfirmRejection}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Reject Application</h3>
                  <p className="text-xs text-slate-500">Applicant: {rejectingUser.name} ({rejectingUser.email})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRejectingUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Compliance Rejection Reason *
                </label>
                <select
                  value={rejectionReasonPreset}
                  onChange={(e) => setRejectionReasonPreset(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                >
                  <option value="Business registration documentation cannot be verified with Secretary of State">
                    Business registration documentation cannot be verified with Secretary of State
                  </option>
                  <option value="Tax ID (EIN) does not match legal entity filing">
                    Tax ID (EIN) does not match legal entity filing
                  </option>
                  <option value="Unverifiable professional licensing / credentials">
                    Unverifiable professional licensing / credentials
                  </option>
                  <option value="Incomplete identity verification documents or illegible copy">
                    Incomplete identity verification documents or illegible copy
                  </option>
                  <option value="Entity does not meet commercial underwriting liquidity threshold">
                    Entity does not meet commercial underwriting liquidity threshold
                  </option>
                  <option value="OTHER">Other / Custom Compliance Determination</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Detailed Notes / Instructions for Applicant (Optional)
                </label>
                <textarea
                  rows={3}
                  value={rejectionCustomNote}
                  onChange={(e) => setRejectionCustomNote(e.target.value)}
                  placeholder="Provide specific corrective guidance that will be visible to the applicant on their status portal..."
                  className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200 text-[11px] text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                Rejecting will immediately restrict this applicant's workspace dashboard access. The user will view this determination on their Pending Approval status page.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectingUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Confirm Rejection</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: SAFE DOCUMENT PREVIEW                               */}
      {/* ============================================================ */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0070C0] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#002060]">Safe Document Preview</h3>
                  <p className="text-xs text-slate-500">{previewDoc.docType || 'Verification Credential'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Details Metadata */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">File Name:</span>
                  <span className="font-mono font-bold text-slate-800">{previewDoc.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Applicant:</span>
                  <span className="font-semibold text-slate-800">
                    {previewDoc.applicantName} ({previewDoc.applicantRole})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Payload Size:</span>
                  <span className="font-mono text-slate-700">
                    {formatDocumentSize(previewDoc.size)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Encrypted Hash:</span>
                  <span className="font-mono text-[10px] text-slate-500">
                    SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f...
                  </span>
                </div>
              </div>

              {/* Simulated Safe Document Visual Container */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-100/70 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto text-[#0070C0]">
                  <FileCheck2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{previewDoc.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    Staged verification credential (client prototype mode).
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staged Document Metadata &bull; Non-Sensitive Prototype</span>
                </div>
              </div>

              {/* Security Banner */}
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-[11px] text-[#002060] flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#0070C0] shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Security Policy:</strong> In accordance with strict development rules, raw binary documents and unmasked Tax IDs are never persisted to localStorage. In production, this file streams directly from an encrypted S3/GCS bucket via presigned URL.
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
