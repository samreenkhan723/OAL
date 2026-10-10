import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MessageSquare,
  DollarSign,
  Award,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Send,
  PhoneCall,
  Mail,
  Layers,
  Radio,
  FileText,
  Briefcase,
  AlertTriangle,
  Check
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const RepDashboard = () => {
  const { applications, offers, messages, currentUser, sendMessage, addToast } = useApp();

  const assignedApps = applications; // In prototype context, Elena oversees these files
  const activeOffers = offers;

  // Tri-party communication state (Doc 1 - Line 61: OAL LetsWork Portal)
  const [triPartyTarget, setTriPartyTarget] = useState('both'); // 'both' | 'borrower' | 'lender'
  const [triPartyInput, setTriPartyInput] = useState('');
  const [activeChatLead, setActiveChatLead] = useState(assignedApps[0]?.id || 'APP-2026-1082');

  const selectedApp = assignedApps.find(a => a.id === activeChatLead) || assignedApps[0];

  // Tri-Party Send Handler
  const handleSendTriPartyMessage = (e) => {
    e.preventDefault();
    if (!triPartyInput.trim()) return;

    if (triPartyTarget === 'both') {
      sendMessage({
        conversationId: `CONV_TRIPARTY_${selectedApp.id}`,
        text: `[Tri-Party Mediation Broadcast]: ${triPartyInput}`,
        applicationId: selectedApp.id,
        receiverRole: 'broadcast',
        receiverId: 'all_parties',
        receiverName: `${selectedApp.borrowerName} & Participating Underwriters`
      });
      if (addToast) {
        addToast(
          'Tri-Party Message Broadcast',
          `Dispatched simultaneous message to Borrower (${selectedApp.borrowerName}) and active Institutional Lenders.`,
          'success'
        );
      }
    } else if (triPartyTarget === 'borrower') {
      sendMessage({
        conversationId: `CONV_BORROWER_REP_${selectedApp.id}`,
        text: triPartyInput,
        applicationId: selectedApp.id,
        receiverRole: 'borrower',
        receiverId: 'usr_borrower_01',
        receiverName: selectedApp.borrowerName
      });
      if (addToast) {
        addToast('Message Sent to Borrower', `Direct message sent to ${selectedApp.borrowerName}.`, 'success');
      }
    } else {
      sendMessage({
        conversationId: `CONV_LENDER_REP_${selectedApp.id}`,
        text: triPartyInput,
        applicationId: selectedApp.id,
        receiverRole: 'lender',
        receiverId: 'usr_lender_01',
        receiverName: 'Apex Horizon Capital LLC'
      });
      if (addToast) {
        addToast('Message Sent to Underwriter', 'Direct mediated stip sent to Lender.', 'success');
      }
    }

    setTriPartyInput('');
  };

  // Direct Share with Borrower from Dashboard (Doc 1 - Line 61)
  const handleShareOfferWithBorrower = (offer) => {
    if (addToast) {
      addToast(
        'Term Sheet Shared with Borrower',
        `Offer ${offer.id} ($${offer.amount.toLocaleString()}) has been securely forwarded to the borrower's offers portal and SMS notification queue.`,
        'success'
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-[#003882]/70">
        {/* Decorative lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0070C0]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#FFD200] text-[#002060] border border-amber-300 uppercase tracking-wider">
              Placement Agent Workspace
            </span>
            <span className="text-xs text-slate-300">
              Senior Commercial Placement Agent: <strong>{currentUser.name}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>OAL LetsWork Mediation Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            OAL Representative Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Supervise commercial applicant pipelines, mediate borrower–lender discussions, and audit term sheets with strict <strong>read-only offer governance (Doc 1 Mandate)</strong>.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/rep/messages"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] border border-amber-300 shadow-md shadow-amber-400/25 transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-[#002060]" />
            <span>Mediation Inbox</span>
          </Link>
          <Link
            to="/rep/offers"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4 text-[#FFD200]" />
            <span>Offers Audit (Read-Only)</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/rep/leads"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#0070C0] hover:shadow-md transition-all group"
        >
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Assigned Borrowers</span>
          <div className="text-3xl font-extrabold text-[#002060] mt-1 font-heading">{assignedApps.length}</div>
          <span className="text-[11px] text-[#0070C0] font-semibold mt-1 block group-hover:translate-x-0.5 transition-transform">
            Active Placement Files &rarr;
          </span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Underwriter Working Deals</span>
          <div className="text-3xl font-extrabold text-purple-700 mt-1 font-heading">
            {assignedApps.reduce((acc, a) => acc + (a.workingDeals?.claimedLendersCount || 0), 0)}
          </div>
          <span className="text-[11px] text-purple-700 font-semibold mt-1 block">
            Max 3 Claims/Deal Enforced (FR-08)
          </span>
        </div>

        <Link
          to="/rep/offers"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Offers Issued</span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1 font-heading">{activeOffers.length}</div>
          <span className="text-[11px] text-amber-800 font-semibold mt-1 block flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-700" /> Read-Only • Share Ready &rarr;
          </span>
        </Link>

        <Link
          to="/rep/messages"
          className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#0070C0] hover:shadow-md transition-all group"
        >
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Mediated Messages</span>
          <div className="text-3xl font-extrabold text-[#002060] mt-1 font-heading">{messages.length}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Supervised Tri-Party Threads &rarr;
          </span>
        </Link>
      </div>

      {/* 24–72 Hours Turnaround SLA Clock (Doc 3 Line 12 & Doc 6 Line 6) */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] text-white rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 border border-[#003882]/70">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Clock className="w-5 h-5 text-[#FFD200] shrink-0" />
            <h3 className="text-base font-heading font-bold text-white">
              Commercial Placement SLA: 24 – 72 Hours Turnaround
            </h3>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 whitespace-nowrap">
              Active Placement Clock
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Doc 3 benchmark: All qualified loan packages target underwriter engagement and term sheet closing within <strong>24 to 72 hours</strong>. Track borrower milestones and mediate underwriter terms promptly.
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <span className="text-[11px] text-slate-400 block uppercase">Median Placement Time</span>
          <span className="text-2xl font-mono font-extrabold text-[#FFD200]">31.2 Hours</span>
        </div>
      </div>

      {/* Main 2-Column Split: Active Pipeline & Tri-Party Communication Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Pipeline, Loan Requests vs Qualified Leads, and Offer Share Hub */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Placement Pipeline Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Active Commercial Placement Pipeline ({assignedApps.length} Files)
                </h3>
                <p className="text-xs text-slate-500">
                  Direct Borrower files assigned for underwriting coordination and term sheet delivery.
                </p>
              </div>

              <Link to="/rep/leads" className="text-xs font-bold text-blue-600 hover:underline shrink-0">
                View All Leads &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {assignedApps.slice(0, 4).map((app) => {
                const claimsCount = app.workingDeals?.claimedLendersCount || 0;
                const appOfferList = offers.filter(o => o.applicationId === app.id);

                return (
                  <div
                    key={app.id}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">{app.id}</span>
                        <StatusBadge status={app.status} />
                        <span className="text-[11px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1 shadow-xs">
                          <Award className="w-3 h-3 text-[#002060] shrink-0" />
                          <span>IQ {app.investmentIQ?.total || '150'}/180</span>
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {claimsCount} of 3 Lenders Active
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{app.businessName}</h4>

                      <div className="text-xs text-slate-500">
                        {app.programName} • Requested <strong>${app.amount.toLocaleString()}</strong> • Borrower: {app.borrowerName}
                      </div>

                      {appOfferList.length > 0 && (
                        <div className="text-[11px] text-emerald-700 font-semibold pt-0.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{appOfferList.length} Term Sheet{appOfferList.length > 1 ? 's' : ''} Ready for Borrower Review</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveChatLead(app.id)}
                        className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                          activeChatLead === app.id
                            ? 'bg-[#0070C0] text-white shadow-xs'
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>LetsWork Chat</span>
                      </button>

                      <Link
                        to="/rep/offers"
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 text-center"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#FFD200]" />
                        <span>Audit / Share</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Clarification: "Loan Requests" vs "Qualified Leads" (Doc 1 - Lines 34, 57) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Workflow Architecture: Loan Requests vs Qualified Leads (Doc 1 Clarification)</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Operational Framework
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>1. Loan Requests Tab</span>
                </div>
                <p className="text-blue-950/80 leading-relaxed text-[11px]">
                  <strong>Intake & Packaging Phase:</strong> Direct applications submitted by borrowers. As an OAL Representative, you review documentation, verify financials, and audit Investment IQ readiness before approving for exchange publication.
                </p>
                <Link to="/rep/loan-requests" className="text-blue-600 font-bold hover:underline block pt-1 text-[11px]">
                  Open Loan Requests Queue &rarr;
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-purple-900">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>2. Qualified Leads Tab</span>
                </div>
                <p className="text-purple-950/80 leading-relaxed text-[11px]">
                  <strong>Marketplace Underwriting Phase:</strong> Sanitized files published to verified institutional funds. Lenders claim working deals (up to 3 slots) and draft term sheets without direct borrower contact.
                </p>
                <Link to="/rep/leads" className="text-purple-700 font-bold hover:underline block pt-1 text-[11px]">
                  Open Marketplace Qualified Pipeline &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: OAL LetsWork Tri-Party Message Box & Multi-Channel Console */}
        <div className="space-y-6">
          {/* OAL LetsWork Portal: Tri-Party Message Box (Doc 1 - Line 61) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  OAL LetsWork Tri-Party Chat
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live Console
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Doc 1 Mandate: <em>"In the OAL LetsWork portal include a message box where the OAL Rep can chat, message with both the Lender and the borrower at the same time."</em>
            </p>

            {/* Target Selector: Both | Borrower | Lender */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTriPartyTarget('both')}
                className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  triPartyTarget === 'both' ? 'bg-[#002060] text-[#FFD200] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Broadcast (Both)
              </button>
              <button
                type="button"
                onClick={() => setTriPartyTarget('borrower')}
                className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  triPartyTarget === 'borrower' ? 'bg-[#0070C0] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Borrower Only
              </button>
              <button
                type="button"
                onClick={() => setTriPartyTarget('lender')}
                className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  triPartyTarget === 'lender' ? 'bg-purple-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lenders Only
              </button>
            </div>

            {/* Current Active File Context */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Active File:</span>
                <span className="font-bold text-slate-900">{selectedApp.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Borrower:</span>
                <span className="font-semibold text-slate-800">{selectedApp.borrowerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Recipient:</span>
                <span className="font-bold text-blue-700">
                  {triPartyTarget === 'both' ? 'Simultaneous Broadcast (Borrower & Lenders)' : triPartyTarget === 'borrower' ? 'Borrower Line (Marcus Vance)' : 'Underwriter Desk (Apex Horizon)'}
                </span>
              </div>
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendTriPartyMessage} className="space-y-2">
              <textarea
                rows={3}
                value={triPartyInput}
                onChange={(e) => setTriPartyInput(e.target.value)}
                placeholder={
                  triPartyTarget === 'both'
                    ? 'Enter tri-party message to broadcast to both borrower & lenders...'
                    : triPartyTarget === 'borrower'
                    ? 'Message borrower regarding document requirements or term sheets...'
                    : 'Message participating underwriters regarding stipulations or closing date...'
                }
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold transition-all shadow-md shadow-[#0070C0]/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {triPartyTarget === 'both' ? 'Broadcast to Both Parties' : 'Dispatch Message'}
                </span>
              </button>
            </form>
          </div>

          {/* Multi-Channel Console (Chat, Email, SMS) (Doc 1 Lines 50-53) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Multi-Channel Broker Console</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Doc 1: Chat, Email, and SMS communication channels active between Rep and Lenders.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  In-App Chat
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  Underwriter Email Desk
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Connected</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
                  SMS Fast-Track Relay
                </span>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Ready</span>
              </div>
            </div>

            <Link
              to="/rep/messages"
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold text-center block transition-colors"
            >
              Open Full Communication Hub &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

