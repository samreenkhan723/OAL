import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatDocumentSize } from '../admin/AdminVerificationPage';
import {
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  FileText,
  Building2,
  UserCheck,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ArrowRight,
  Home,
  HelpCircle,
  FileCheck2,
  Lock
} from 'lucide-react';

export const PendingApprovalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentUser,
    currentRole,
    logout,
    getUserVerificationStatus,
    addToast,
    setActiveUser,
    registeredUsers
  } = useApp();

  // Retrieve user from router state, context, or persistent prototype storage
  const getStoredUser = () => {
    try {
      const saved = localStorage.getItem('oal_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  };

  const initialUser = location.state?.user || (currentUser?.id !== 'guest' ? currentUser : null) || getStoredUser();
  const [userState, setUserState] = useState(initialUser);
  const [checking, setChecking] = useState(false);

  const effectiveUserId = userState?.id || (currentUser?.id !== 'guest' ? currentUser?.id : null) || getStoredUser()?.id;
  const effectiveRole = userState?.role || (currentRole !== 'borrower' ? currentRole : null) || getStoredUser()?.role || 'lender';

  // Check current verification status from state
  const refreshStatus = () => {
    const targetUser = userState || (currentUser?.id !== 'guest' ? currentUser : null) || getStoredUser();
    const targetId = targetUser?.id !== 'guest' ? targetUser?.id : null;
    const targetEmail = targetUser?.email;

    setChecking(true);
    setTimeout(() => {
      let liveResult = null;
      if (targetId) {
        liveResult = getUserVerificationStatus(targetId);
      } else if (targetEmail && registeredUsers) {
        const found = registeredUsers.find(
          (u) => u.email && u.email.toLowerCase() === targetEmail.toLowerCase()
        );
        if (found) {
          liveResult = {
            status: found.verificationStatus || 'ACTIVE',
            rejectionReason: found.rejectionReason || null,
            user: found
          };
        }
      }

      setChecking(false);

      if (liveResult) {
        const resolvedStatus =
          (typeof liveResult === 'object' ? liveResult.status : liveResult) ||
          userState?.verificationStatus ||
          'PENDING_APPROVAL';
        const resolvedReason =
          typeof liveResult === 'object' ? liveResult.rejectionReason : null;
        const liveUserData =
          typeof liveResult === 'object' && liveResult.user ? liveResult.user : null;

        setUserState((prev) => ({
          ...(prev || {}),
          ...(liveUserData || {}),
          verificationStatus: resolvedStatus,
          rejectionReason: resolvedReason !== undefined ? resolvedReason : prev?.rejectionReason
        }));

        // Sync activeUser and localStorage so ProtectedRoute immediately recognizes updated status
        const updatedAuthUser = {
          ...(currentUser || {}),
          ...(liveUserData || {}),
          ...(userState || {}),
          verificationStatus: resolvedStatus,
          rejectionReason: resolvedReason
        };
        if (setActiveUser) {
          setActiveUser(updatedAuthUser);
        }
        try {
          localStorage.setItem('oal_current_user', JSON.stringify(updatedAuthUser));
        } catch (e) {
          /* ignore */
        }

        if (resolvedStatus === 'ACTIVE') {
          addToast(
            'Account Approved!',
            'Your credentials have been approved by compliance. You may now access your dashboard.',
            'success'
          );
        } else if (resolvedStatus === 'REJECTED') {
          addToast(
            'Application Update',
            `Application determination: REJECTED. ${resolvedReason ? `Reason: ${resolvedReason}` : ''}`,
            'error'
          );
        } else {
          addToast(
            'Application Under Review',
            'Your application is still in queue with the compliance underwriting committee.',
            'info'
          );
        }
      } else {
        addToast(
          'Application Under Review',
          'Your application is still in queue with the compliance underwriting committee.',
          'info'
        );
      }
    }, 350);
  };

  useEffect(() => {
    const targetUser = userState || (currentUser?.id !== 'guest' ? currentUser : null) || getStoredUser();
    const targetId = targetUser?.id !== 'guest' ? targetUser?.id : null;
    const targetEmail = targetUser?.email;

    if (targetId || targetEmail) {
      let live = targetId ? getUserVerificationStatus(targetId) : null;
      if (!live && targetEmail && registeredUsers) {
        const found = registeredUsers.find(
          (u) => u.email && u.email.toLowerCase() === targetEmail.toLowerCase()
        );
        if (found) {
          live = {
            status: found.verificationStatus || 'ACTIVE',
            rejectionReason: found.rejectionReason || null,
            user: found
          };
        }
      }

      if (live) {
        const resolvedStatus = typeof live === 'object' ? live.status : live;
        const resolvedReason = typeof live === 'object' ? live.rejectionReason : null;
        const liveUserData = typeof live === 'object' && live.user ? live.user : null;

        if (resolvedStatus && resolvedStatus !== userState?.verificationStatus) {
          setUserState((prev) => ({
            ...(prev || {}),
            ...(liveUserData || {}),
            verificationStatus: resolvedStatus,
            rejectionReason: resolvedReason
          }));

          const updatedAuthUser = {
            ...(currentUser || {}),
            ...(liveUserData || {}),
            verificationStatus: resolvedStatus,
            rejectionReason: resolvedReason
          };
          if (setActiveUser) setActiveUser(updatedAuthUser);
          try {
            localStorage.setItem('oal_current_user', JSON.stringify(updatedAuthUser));
          } catch (e) {
            /* ignore */
          }
        }
      }
    }
  }, [effectiveUserId, registeredUsers]);

  const status = userState?.verificationStatus || 'PENDING_APPROVAL';
  const roleTitle =
    effectiveRole === 'lender'
      ? 'Institutional Lender'
      : effectiveRole === 'rep'
      ? 'OAL Representative'
      : 'Commercial Partner';

  const handleProceedToDashboard = () => {
    if (effectiveRole === 'lender') {
      navigate('/lender/dashboard', { replace: true });
    } else if (effectiveRole === 'rep') {
      navigate('/rep/dashboard', { replace: true });
    } else {
      navigate('/borrower/dashboard', { replace: true });
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col justify-between antialiased">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200/90 shadow-2xs py-4 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002060] flex items-center justify-center text-white shadow-sm border border-[#FFD200]/50">
              <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl text-[#002060] block leading-none">
                OAL <span className="text-[#00B0F0]">NETWORK</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0070C0] block mt-0.5">
                Compliance &amp; Verification
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        {/* Status Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Header Banner depending on Status */}
          {status === 'ACTIVE' ? (
            <div className="bg-emerald-600 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold uppercase tracking-wider mb-1">
                    Approval Granted
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold">Account Active &amp; Verified</h1>
                  <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
                    Your {roleTitle} credentials have been verified by OAL Network Compliance.
                  </p>
                </div>
              </div>
              <button
                onClick={handleProceedToDashboard}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-800 font-heading font-bold text-sm shadow-md hover:bg-emerald-50 transition-all cursor-pointer shrink-0"
              >
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : status === 'REJECTED' ? (
            <div className="bg-rose-600 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold uppercase tracking-wider mb-1">
                    Review Concluded
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold">Application Rejected</h1>
                  <p className="text-rose-100 text-xs sm:text-sm mt-0.5">
                    Further verification or corrective action is required before dashboard access can be granted.
                  </p>
                </div>
              </div>
              <Link
                to="/company?tab=contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-rose-800 font-heading font-bold text-sm shadow-md hover:bg-rose-50 transition-all cursor-pointer shrink-0"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Contact Compliance</span>
              </Link>
            </div>
          ) : (
            <div className="bg-[#002060] text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B0F0]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
                    <Clock className="w-8 h-8 text-[#FFD200]" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 text-[#FFD200] text-xs font-bold uppercase tracking-wider mb-1">
                      Status: Pending Compliance Review
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                      Application Submitted Successfully
                    </h1>
                    <p className="text-slate-200 text-xs sm:text-sm mt-0.5">
                      Your application has been submitted successfully and is awaiting review by the OAL Network Compliance Team.
                    </p>
                  </div>
                </div>

                <button
                  onClick={refreshStatus}
                  disabled={checking}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all cursor-pointer shrink-0 disabled:opacity-50"
                  title="Check live approval status"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                  <span>{checking ? 'Checking...' : 'Refresh Status'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Rejection Alert Box */}
          {status === 'REJECTED' && (
            <div className="m-6 sm:m-8 p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Compliance Committee Determination &amp; Rejection Reason:</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-700 bg-white p-3 rounded-xl border border-rose-100 font-mono">
                {userState?.rejectionReason ||
                  'Identity verification or institutional accreditation documentation could not be validated. Please contact OAL Network Underwriting with updated credentials.'}
              </p>
              <p className="text-[11px] text-rose-600">
                To appeal this decision or resubmit amended corporate documents, please email{' '}
                <a href="mailto:compliance@oalnetwork.com" className="font-bold underline">
                  compliance@oalnetwork.com
                </a>{' '}
                with your reference number.
              </p>
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Applicant Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Applicant Account
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-slate-900">{userState?.name || 'Registered Partner'}</div>
                  <div className="text-xs text-slate-600">{userState?.email || 'email@company.com'}</div>
                  <div className="text-xs text-slate-600">{userState?.phone || 'Phone on file'}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Registration Category
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#002060]">{roleTitle}</div>
                  <div className="text-xs text-slate-600">
                    {effectiveRole === 'lender'
                      ? `Entity: ${userState?.businessInfo?.entityType || 'Registered Lending Entity'} • Tax ID: ${userState?.businessInfo?.taxId ? '***-**-****' : 'Submitted'}`
                      : `Experience: ${userState?.repInfo?.experience || 'Licensed Advisor'} • Placement: ${userState?.repInfo?.specialty || 'General Placement'}`}
                  </div>
                  <div className="text-xs text-slate-500">
                    Submitted on:{' '}
                    {userState?.registrationDate ? new Date(userState.registrationDate).toLocaleDateString() : 'Today'}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Documents Metadata Checklist */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#0070C0]" />
                <span>Submitted Verification Documents</span>
              </h3>
              <div className="space-y-2">
                {userState?.documents && userState.documents.length > 0 ? (
                  userState.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0070C0] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{doc.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {doc.docType || 'Verification Credential'} &bull; {formatDocumentSize(doc.size)}
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Document Received (Prototype Mode)</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0070C0] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {effectiveRole === 'lender'
                            ? 'Business License & Articles of Organization'
                            : 'Government Photo ID & Professional Credentials'}
                        </div>
                        <div className="text-[11px] text-slate-500">Compliance file package uploaded</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Staged for Review</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps & Timeline */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0070C0]" />
                <span>Compliance Workflow Timeline</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Step 1</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Application Intake</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Contact information, credentials, and digital staging finalized.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-1.5 ${
                    status === 'ACTIVE'
                      ? 'bg-emerald-50/70 border-emerald-200/80'
                      : 'bg-sky-50/70 border-sky-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0070C0]">Step 2</span>
                    {status === 'ACTIVE' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#0070C0] animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">KYB / Credentials Audit</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    OAL Underwriting validates business registry, EIN, and agent certifications.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-1.5 ${
                    status === 'ACTIVE'
                      ? 'bg-emerald-50/70 border-emerald-200/80'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step 3</span>
                    {status === 'ACTIVE' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Exchange Authorization</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Marketplace routing unlocks deal feed and institutional matching pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Informational Guidance Footer */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block font-bold">Standard Review Turnaround: 24 to 48 Hours</strong>
                <p className="text-amber-800 leading-relaxed text-[11px]">
                  Institutional lenders and fiduciary representatives must pass compliance verification before placing offers or browsing live borrower financials. You will receive an email confirmation once compliance approval is finalized.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#002060] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Return to Public Homepage</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={refreshStatus}
                disabled={checking}
                className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                <span>{checking ? 'Checking...' : 'Check Approval Status'}</span>
              </button>

              {status === 'ACTIVE' && (
                <button
                  onClick={handleProceedToDashboard}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Launch Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} OAL Network Commercial Lending Marketplace. All rights reserved. &bull; Enterprise Compliance Portal (Prototype Simulation)
      </footer>
    </div>
  );
};
