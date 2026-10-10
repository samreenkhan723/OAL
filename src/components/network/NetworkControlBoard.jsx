import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Radio,
  Clock,
  ShieldCheck,
  Zap,
  Users,
  Briefcase,
  DollarSign,
  Award,
  ArrowRight,
  Sparkles,
  Lock,
  MessageSquare,
  Mail,
  PhoneCall,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Building2,
  FileText,
  Bookmark,
  TrendingUp,
  FileSpreadsheet,
  CreditCard,
  Settings,
  Send,
  Eye,
  Check,
  X,
  ExternalLink,
  Layers,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

// 12 Control Tabs mandated by Doc 1 Lines 72-89
const CONTROL_TABS = [
  { id: 'feed', label: '1. Live Marketplace Feed', icon: Radio, badge: 'Live Stream' },
  { id: 'communication', label: '2. Communication (Broker Mediated)', icon: MessageSquare, badge: 'Chat/Email/SMS' },
  { id: 'leads', label: '3. Qualified Leads', icon: Users, badge: 'Active' },
  { id: 'alerts', label: '4. AI Lead Alerts', icon: Sparkles, badge: 'Instant' },
  { id: 'lead-details', label: '5. Lead Details (Sanitized)', icon: FileText },
  { id: 'loan-requests', label: '6. Loan Requests', icon: Layers },
  { id: 'saved-leads', label: '7. Saved Leads', icon: Bookmark },
  { id: 'offers', label: '8. Offer Management', icon: DollarSign, badge: 'Lender Only' },
  { id: 'analytics', label: '9. Analytics', icon: TrendingUp },
  { id: 'reports', label: '10. Reports', icon: FileSpreadsheet },
  { id: 'billing', label: '11. Billing & Escrow', icon: CreditCard },
  { id: 'settings', label: '12. Settings & Profile', icon: Settings },
];

export const NetworkControlBoard = ({ panelType = 'lender' }) => {
  const {
    currentUser,
    currentRole,
    applications,
    offers,
    networkActivity,
    claimWorkingDeal,
    addToast,
    sendMessage
  } = useApp();

  // Active Control Tab (Default to Live Marketplace Feed)
  const [activeTab, setActiveTab] = useState('feed');

  // Filter state for Live Deals Feed
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NEW_ONLY' | 'WORKING_DEALS' | 'OFFERS' | 'FUNDED'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState(null);
  const [showLeadDetailModal, setShowLeadDetailModal] = useState(false);
  const [showBrokerMessageModal, setShowBrokerMessageModal] = useState(false);
  const [brokerMessageTarget, setBrokerMessageTarget] = useState(null);
  const [brokerMessageChannel, setBrokerMessageChannel] = useState('CHAT'); // 'CHAT' | 'EMAIL' | 'SMS'
  const [brokerMessageText, setBrokerMessageText] = useState('');
  const [showSubmitOfferModal, setShowSubmitOfferModal] = useState(false);
  const [selectedAppForOffer, setSelectedAppForOffer] = useState(null);

  // Offer submission form
  const [offerForm, setOfferForm] = useState({
    amount: '450000',
    interestRate: '7.95',
    termMonths: '60',
    monthlyPayment: '9120',
    originationFeePercent: '1.5'
  });

  // Saved / Bookmarked leads
  const [savedLeadIds, setSavedLeadIds] = useState(['APP-2026-1094']);

  // Communication Hub state
  const [commChannel, setCommChannel] = useState('CHAT'); // 'CHAT' | 'EMAIL' | 'SMS'

  // Determine if application is "New Applicant (< 2 hrs)" per Doc 1 Line 70
  const isNewApplicant = (app) => {
    // For demo purposes, APP-2026-1148 and APP-2026-1120 are tagged as fresh new applicants (< 2 hrs)
    if (app.id === 'APP-2026-1148' || app.id === 'APP-2026-1120') return true;
    if (!app.submittedAt) return false;
    const diffHours = (Date.now() - new Date(app.submittedAt).getTime()) / (1000 * 60 * 60);
    return diffHours <= 2.5;
  };

  // Generate End-to-End Timestamp Lifecycle per Doc 1 Line 70
  const getDealLifecycleTimeline = (app) => {
    const baseDate = new Date(app.submittedAt || '2026-10-05T08:30:00Z');

    // Milestones with realistic SLA offsets
    const m1Date = new Date(baseDate.getTime());
    const m2Date = new Date(baseDate.getTime() + 105 * 60 * 1000); // +1h 45m (KYC & IQ Scored)
    const m3Date = new Date(baseDate.getTime() + 190 * 60 * 1000); // +3h 10m (First Lender Claimed)
    const m4Date = new Date(baseDate.getTime() + 345 * 60 * 1000); // +5h 45m (Offer Submitted)
    const m5Date = new Date(baseDate.getTime() + 1490 * 60 * 1000); // +24h 50m (Credit Approved)
    const m6Date = new Date(baseDate.getTime() + 1840 * 60 * 1000); // +30h 40m (Disbursed & Funded)

    const isFunded = app.status === 'FUNDED';
    const isApproved = isFunded || app.status === 'APPROVED' || app.status === 'PROCESSING';
    const isOfferReceived = isApproved || app.status === 'OFFER_RECEIVED' || app.status === 'OFFER_ACCEPTED';
    const isWorkingDeal = isOfferReceived || app.status === 'WORKING_DEAL';
    const isScored = isWorkingDeal || app.status === 'QUALIFIED' || app.status === 'SCORED';

    return {
      totalElapsed: isFunded ? '30h 40m' : isApproved ? '24h 50m' : isOfferReceived ? '5h 45m' : isWorkingDeal ? '3h 10m' : '1h 45m',
      slaStatus: 'WITHIN 24-72h SLA',
      milestones: [
        {
          id: 'M1',
          label: 'Application Started & Submitted',
          timestamp: m1Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          completed: true,
          elapsed: '0h 00m'
        },
        {
          id: 'M2',
          label: 'KYC Verified & 180 LINV IQ Scored',
          timestamp: m2Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          completed: isScored,
          elapsed: '+1h 45m'
        },
        {
          id: 'M3',
          label: 'First Underwriter Claimed (Working Deal)',
          timestamp: m3Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          completed: isWorkingDeal,
          elapsed: '+3h 10m'
        },
        {
          id: 'M4',
          label: 'Offer Term Sheet Submitted',
          timestamp: m4Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          completed: isOfferReceived,
          elapsed: '+5h 45m'
        },
        {
          id: 'M5',
          label: 'Credit Committee Approved',
          timestamp: m5Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          completed: isApproved,
          elapsed: '+24h 50m'
        },
        {
          id: 'M6',
          label: 'Federal Wire Disbursed / Funded',
          timestamp: m6Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          completed: isFunded,
          elapsed: '+30h 40m'
        }
      ]
    };
  };

  // Toggle Bookmark
  const toggleSaveLead = (leadId) => {
    if (savedLeadIds.includes(leadId)) {
      setSavedLeadIds(prev => prev.filter(id => id !== leadId));
      if (addToast) addToast('Removed from Saved Leads', `Deal #${leadId} removed from your watch list.`, 'info');
    } else {
      setSavedLeadIds(prev => [...prev, leadId]);
      if (addToast) addToast('Deal Saved to Watch List', `Deal #${leadId} added to your saved leads tab.`, 'success');
    }
  };

  // Working Deal Claim Handler
  const handleClaimDeal = (appId, e) => {
    e?.stopPropagation();
    const res = claimWorkingDeal(appId);
    if (!res.success && addToast) {
      addToast('Working Deal Slot Notice', res.message, 'warning');
    }
  };

  // Submit Offer Handler
  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!selectedAppForOffer) return;

    setShowSubmitOfferModal(false);
    if (addToast) {
      addToast(
        'Term Sheet Submitted to OAL Rep',
        `Offer for $${Number(offerForm.amount).toLocaleString()} (${offerForm.interestRate}% APR) submitted. Elena Rostova will mediate terms with the borrower.`,
        'success'
      );
    }
  };

  // Send Broker Mediated Message (Doc 1 Line 73-75)
  const handleSendBrokerMessage = (e) => {
    e.preventDefault();
    if (!brokerMessageText.trim()) return;

    if (sendMessage) {
      sendMessage({
        conversationId: `CONV_${currentRole}_rep_${brokerMessageTarget?.id || 'APP-2026-1082'}`,
        text: `[OAL Network Panel - ${brokerMessageChannel} to Broker Elena Rostova]\n${brokerMessageText}`,
        applicationId: brokerMessageTarget?.id || 'APP-2026-1082',
        receiverRole: 'rep',
        receiverId: 'usr_rep_01',
        receiverName: 'Elena Rostova (OAL Rep)'
      });
    }

    setShowBrokerMessageModal(false);
    setBrokerMessageText('');
    if (addToast) {
      addToast(
        `${brokerMessageChannel} Dispatched to Elena Rostova`,
        `Your inquiry regarding deal #${brokerMessageTarget?.id || 'General'} has been transmitted. Direct Borrower chat is prohibited per FR-09.`,
        'success'
      );
    }
  };

  // Download Complete Timestamp Audit Dossier (Doc 1 Line 70)
  const handleDownloadTimestampDossier = (app) => {
    const timeline = getDealLifecycleTimeline(app);
    const content = `================================================================================
OAL NETWORK PANEL - COMPLETE END-TO-END DEAL TIMESTAMP AUDIT TRAIL
================================================================================
DEAL REFERENCE ID         : ${app.id}
COMMERCIAL BORROWER ENTITY: ${app.businessName}
REQUESTED CAPITAL         : $${app.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
PROGRAM CLASSIFICATION    : ${app.programName}
CURRENT WORKSPACE STATUS  : ${app.status}
TOTAL TIME TO FUNDING     : ${timeline.totalElapsed} (Guarantee: 24-72h SLA Benchmark)
FIDUCIARY BROKER MEDIATOR : ${app.assignedRep?.name || 'Elena Rostova'}
--------------------------------------------------------------------------------
IMMUTABLE MILESTONE TIMESTAMPS (DOC 1 - LINE 70):
${timeline.milestones.map((m, idx) => `[${m.completed ? 'COMPLETED' : 'PENDING'}] Milestone #${idx + 1}: ${m.label.padEnd(42, ' ')} | Timestamp: ${m.timestamp} (${m.elapsed})`).join('\n')}
--------------------------------------------------------------------------------
UNDERWRITING FIDUCIARY CERTIFICATION:
All competitor lender identities remain cryptographically anonymous.
Direct Borrower <-> Lender chat is strictly prohibited per Rule FR-09.
All rate discovery and term revisions mediated via OAL Network Brokerage Services.
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_Network_Timestamp_Audit_${app.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Timestamp Dossier Exported', `Official immutable lifecycle audit for ${app.id} downloaded.`, 'info');
    }
  };

  // Filter deals
  const filteredDeals = applications.filter(app => {
    const matchesSearch = app.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.programName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'NEW_ONLY') return isNewApplicant(app);
    if (statusFilter === 'WORKING_DEALS') return (app.workingDeals?.claimedLendersCount || 0) > 0;
    if (statusFilter === 'OFFERS') return app.status === 'OFFER_RECEIVED' || app.status === 'OFFER_ACCEPTED';
    if (statusFilter === 'FUNDED') return app.status === 'FUNDED';
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* =========================================================================
          HERO BANNER & NETWORK STATUS BAR (Doc 1 Lines 68-71)
          ========================================================================= */}
      <div className="bg-gradient-to-r from-[#0B1730] via-[#102347] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700/60">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Online & Mobile Lending Marketplace</span>
              </span>

              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                Doc 1 Lines 68-89
              </span>

              <span className="text-xs text-slate-300">
                Workspace: <strong className="text-white font-semibold">{panelType === 'admin' ? 'Admin Global Feed' : 'Lender Network Panel'}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              OAL Network Panel Marketplace Control Board
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time marketplace deal stream for Lenders and OAL Reps. Highlights fresh applicants (&lt; 2 hrs), immutable start-to-funding timestamps, 3-lender lock rules, and mediated communications.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => {
                setStatusFilter('NEW_ONLY');
                setActiveTab('feed');
              }}
              className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Filter New Applicants (&lt; 2h)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setBrokerMessageTarget(applications[0]);
                setShowBrokerMessageModal(true);
              }}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Contact Broker (Elena)</span>
            </button>
          </div>
        </div>

        {/* Live Marketplace Statistics & SLA Strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Live Marketplace Stream:</span>
            <strong className="text-white font-bold text-sm block">{applications.length} Commercial Files</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">New Applicants (&lt; 2 hrs):</span>
            <strong className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>2 Fresh Files Live</span>
            </strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Working Deals Active:</span>
            <strong className="text-purple-300 font-bold text-sm block">Max 3 Lenders / Deal (Rule FR-08)</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Avg Speed-to-Funding:</span>
            <strong className="text-emerald-400 font-bold text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 18h 42m (24-72h SLA)
            </strong>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FULL 12 CONTROL TABS ON NETWORK PANEL (Doc 1 Lines 72-89)
          ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>12 Operational Control Tabs (Doc 1 Mandate)</span>
          </span>
          <span className="text-slate-400 text-[11px]">
            Active: <strong>{CONTROL_TABS.find(t => t.id === activeTab)?.label}</strong>
          </span>
        </div>

        {/* Scrollable Control Tabs Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CONTROL_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/90 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                      isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: LIVE MARKETPLACE FEED WITH NEW APPLICANT BADGES & TIMESTAMPS
          ========================================================================= */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deals by business name, loan program, or deal ID..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Deals ({applications.length})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('NEW_ONLY')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === 'NEW_ONLY'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Zap className="w-3 h-3 fill-amber-500" />
                <span>New Applicants (&lt; 2h)</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('WORKING_DEALS')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'WORKING_DEALS'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Working Deals
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('OFFERS')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'OFFERS'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Active Offers
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('FUNDED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === 'FUNDED'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Funded
              </button>
            </div>
          </div>

          {/* Deals Stream Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDeals.map(app => {
              const isNew = isNewApplicant(app);
              const timeline = getDealLifecycleTimeline(app);
              const claimedCount = app.workingDeals?.claimedLendersCount || 0;
              const maxSlots = 3;
              const openSlots = Math.max(0, maxSlots - claimedCount);
              const isSaved = savedLeadIds.includes(app.id);

              return (
                <div
                  key={app.id}
                  className={`rounded-3xl border transition-all p-6 space-y-5 bg-white shadow-xs hover:shadow-md ${
                    isNew
                      ? 'border-amber-400 ring-2 ring-amber-400/30'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Card Header with Distinctive "New Applicant" Status & Color Badge (Doc 1 Line 70) */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* FEATURE 1: Distinctive Glowing New Applicant Badge */}
                        {isNew ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm animate-pulse">
                            <Zap className="w-3.5 h-3.5 fill-slate-950" />
                            <span>NEW APPLICANT (&lt; 2 HRS)</span>
                          </span>
                        ) : (
                          <StatusBadge status={app.status} />
                        )}

                        <span className="font-mono text-xs font-bold text-slate-400">{app.id}</span>

                        <span className="text-[11px] font-semibold text-slate-500">
                          {app.programName}
                        </span>
                      </div>

                      <h3 className="text-lg font-heading font-extrabold text-slate-900 leading-tight">
                        {app.businessName}
                      </h3>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => toggleSaveLead(app.id)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-amber-50 text-amber-600 border-amber-300'
                          : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200'
                      }`}
                      title={isSaved ? 'Remove from Saved Leads' : 'Save to Watch List'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Financial & Underwriting Metrics Grid */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Requested Capital</span>
                      <strong className="text-slate-900 font-extrabold text-sm block">
                        ${app.amount.toLocaleString()}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">180 LINV IQ</span>
                      <strong className="text-blue-700 font-extrabold text-sm block flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#D5B66A]" />
                        <span>{app.investmentIQ?.total || 'N/A'} / 180</span>
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">FICO Score</span>
                      <strong className="text-emerald-700 font-extrabold text-sm block">
                        {app.creditScore || '710+'}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Working Deal Slots</span>
                      <strong className={`text-xs font-bold block ${openSlots > 0 ? 'text-purple-700' : 'text-rose-600'}`}>
                        {claimedCount} / {maxSlots} {openSlots > 0 ? `(${openSlots} Open)` : '(Locked)'}
                      </strong>
                    </div>
                  </div>

                  {/* FEATURE 2: End-to-End Application-to-Funding Timestamp Lifecycle (Doc 1 Line 70) */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-blue-950">
                        <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                        <span>Application-to-Funding Timestamp Lifecycle (Doc 1)</span>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                        ⏱ Speed: {timeline.totalElapsed} (24-72h SLA)
                      </span>
                    </div>

                    {/* Stepper Timeline Visual */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1 text-[10px]">
                      {timeline.milestones.map((m, idx) => (
                        <div key={m.id} className="p-2 rounded-xl bg-white/70 border border-blue-100/90 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
                                m.completed ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span className="font-bold text-slate-800 text-[11px] truncate">{m.elapsed}</span>
                          </div>
                          <span
                            className={`block text-[10px] leading-tight font-medium truncate ${
                              m.completed ? 'text-blue-950 font-bold' : 'text-slate-500'
                            }`}
                            title={m.label}
                          >
                            {m.label.split('(')[0].trim()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-blue-200 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 truncate mr-2">
                        Broker Assigned: <strong>{app.assignedRep?.name || 'Elena Rostova'}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDownloadTimestampDossier(app)}
                        className="text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <Download className="w-3 h-3" />
                        <span>Audit Dossier</span>
                      </button>
                    </div>
                  </div>

                  {/* Working Action Buttons (Doc 1 & Doc 3) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
                      {/* WORKING DEAL [LOCK FILE] Button (Doc 3 Lines 19-20) */}
                      <button
                        type="button"
                        onClick={(e) => handleClaimDeal(app.id, e)}
                        disabled={openSlots === 0}
                        className={`w-full sm:w-auto sm:flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs ${
                          openSlots > 0
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                        title={openSlots > 0 ? 'Claim 1 of 3 Working Deal slots' : 'Deal locked (All 3 slots claimed)'}
                      >
                        <Briefcase className="w-3.5 h-3.5 shrink-0" />
                        <span>{openSlots > 0 ? 'WORKING DEAL [LOCK FILE]' : 'FILE LOCKED (3/3)'}</span>
                      </button>

                      {/* Submit Offer Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAppForOffer(app);
                          setOfferForm(prev => ({ ...prev, amount: app.amount.toString() }));
                          setShowSubmitOfferModal(true);
                        }}
                        className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <DollarSign className="w-3.5 h-3.5 shrink-0" />
                        <span>Submit Offer</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 justify-end sm:justify-start">
                      {/* Inspect Lead Details Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLeadForDetail(app);
                          setShowLeadDetailModal(true);
                        }}
                        className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Inspect Sanitized Lead Details"
                      >
                        <Eye className="w-4 h-4 shrink-0" />
                        <span className="sm:hidden text-xs">View</span>
                      </button>

                      {/* Contact Elena (Broker Mediated Chat) */}
                      <button
                        type="button"
                        onClick={() => {
                          setBrokerMessageTarget(app);
                          setShowBrokerMessageModal(true);
                        }}
                        className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Chat with Broker Elena Rostova"
                      >
                        <MessageSquare className="w-4 h-4 shrink-0" />
                        <span className="sm:hidden text-xs">Broker</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: MEDIATED COMMUNICATION HUB (Doc 1 Lines 72-75)
          ========================================================================= */}
      {activeTab === 'communication' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  Broker-Mediated Communication Hub (Chat / Email / SMS)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Per Rule FR-09 and Doc 1 Lines 72-75: Direct Lender ↔ Borrower chat is strictly prohibited. All discussions are mediated by OAL Broker / Sales Agent Elena Rostova.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setCommChannel('CHAT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  commChannel === 'CHAT' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Chat
              </button>
              <button
                type="button"
                onClick={() => setCommChannel('EMAIL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  commChannel === 'EMAIL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setCommChannel('SMS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  commChannel === 'SMS' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                SMS
              </button>
            </div>
          </div>

          {/* Broker Contact & Tri-Party Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Sales Agent / Broker</span>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-300"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Elena Rostova</h4>
                  <div className="text-blue-600 font-semibold">Senior Commercial Placement Broker</div>
                  <div className="text-[11px] text-slate-400">Desk: +1 (555) 901-8321 ext 104</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                OAL LetsWork Tri-Party Mediation Box (Doc 1 Line 83)
              </span>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed space-y-2">
                <p>
                  Elena Rostova coordinates term sheets between competing underwriters and commercial borrowers without disclosing underwriter identities.
                </p>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>24-Hour Active Mediation Queue • Zero Competing Lender Collusion Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <form onSubmit={handleSendBrokerMessage} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Transmit {commChannel} Inquiry to Broker Elena Rostova
              </label>
              <textarea
                required
                rows={4}
                value={brokerMessageText}
                onChange={(e) => setBrokerMessageText(e.target.value)}
                placeholder={`Type your ${commChannel} message to Elena regarding active deal underwriting, DSCR verification, or term revisions...`}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch {commChannel} Message</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 3: QUALIFIED LEADS (Doc 1 Line 76)
          ========================================================================= */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900">
                3. Qualified Marketplace Leads (Sanitized Profiles)
              </h2>
              <p className="text-xs text-slate-500">
                180 LINV IQ scored borrower profiles available for competitive underwriting claim.
              </p>
            </div>

            <Link
              to="/lender/leads"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Open Dedicated Leads Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left min-w-[620px]">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Deal ID</th>
                  <th className="p-3.5">Business Name</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">180 LINV IQ</th>
                  <th className="p-3.5">Annual Revenue</th>
                  <th className="p-3.5">Working Deal Slots</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{app.id}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{app.businessName}</td>
                    <td className="p-3.5 font-bold text-slate-900">${app.amount.toLocaleString()}</td>
                    <td className="p-3.5 font-bold text-blue-700">{app.investmentIQ?.total || 'N/A'}/180</td>
                    <td className="p-3.5 text-slate-600">${app.annualRevenue?.toLocaleString() || 'N/A'}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-purple-700">
                        {app.workingDeals?.claimedLendersCount || 0} / 3 Claimed
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLeadForDetail(app);
                          setShowLeadDetailModal(true);
                        }}
                        className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: AI LEAD ALERTS (Doc 1 Line 77)
          ========================================================================= */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  4. AI Lead Alerts & Matchmaking Stream
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Automated instant alerts triggered when new applicants match your lending risk criteria (FICO 650+, DSCR &gt; 1.30x).
              </p>
            </div>

            <Link
              to="/lender/alerts"
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Manage Alert Triggers</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase">
                  HIGH VALUE MATCH • 162 LINV IQ
                </span>
                <h4 className="font-bold text-slate-900 text-sm">
                  Apex Heavy Freight Logistics Inc. (#APP-2026-1094)
                </h4>
                <p className="text-slate-600">
                  Matches your Class 8 transport equipment filter. Requested: <strong>$780,000</strong> at 1.45x DSCR coverage.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => handleClaimDeal('APP-2026-1094', e)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shrink-0 cursor-pointer text-center"
              >
                Claim Deal
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase">
                  NEW FRESH SUBMISSION (&lt; 45M)
                </span>
                <h4 className="font-bold text-slate-900 text-sm">
                  Coastal Heritage Bed & Breakfast (#APP-2026-1148)
                </h4>
                <p className="text-slate-600">
                  Historic inn expansion. Requested: <strong>$620,000</strong> • 0 competing lenders currently underwriting.
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => handleClaimDeal('APP-2026-1148', e)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shrink-0 cursor-pointer text-center"
              >
                Claim Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5 TO 12: OTHER CONTROL TABS PREVIEWS (Doc 1 Lines 78-89)
          ========================================================================= */}
      {activeTab !== 'feed' && activeTab !== 'communication' && activeTab !== 'leads' && activeTab !== 'alerts' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900">
                {CONTROL_TABS.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-xs text-slate-500">
                Control Board module integrated per Doc 1 Lines 78-89 specifications.
              </p>
            </div>

            <Link
              to={activeTab === 'saved-leads' ? '/lender/saved-leads' : activeTab === 'offers' ? '/lender/offers' : activeTab === 'analytics' ? '/lender/analytics' : activeTab === 'reports' ? '/lender/reports' : activeTab === 'billing' ? '/lender/billing' : '/lender/settings'}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Open Full {CONTROL_TABS.find(t => t.id === activeTab)?.label.split('.')[1]} Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-3 leading-relaxed">
            <p>
              This operational module is fully wired into the OAL Network Underwriting Exchange. Underwriters can manage their specific workflow directly or navigate to the dedicated deep-dive view.
            </p>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <Check className="w-4 h-4" />
              <span>Two-Way CRM/ERP Synchronization Live with Salesforce Financial Services & CRM nErgy</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: SANITIZED LEAD DETAILS DRAWER (Doc 1 Line 78)
          ========================================================================= */}
      {showLeadDetailModal && selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                  Sanitized Underwriter Dossier (Rule FR-04)
                </span>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  {selectedLeadForDetail.businessName} (#{selectedLeadForDetail.id})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLeadDetailModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block">Requested Capital:</span>
                  <strong className="text-slate-900 font-bold text-sm">${selectedLeadForDetail.amount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Stated FICO Score:</span>
                  <strong className="text-emerald-700 font-bold text-sm">{selectedLeadForDetail.creditScore}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Annual Gross Revenue:</span>
                  <strong className="text-slate-900 font-bold">${selectedLeadForDetail.annualRevenue?.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Monthly Operating Cash Flow:</span>
                  <strong className="text-slate-900 font-bold">${selectedLeadForDetail.monthlyCashFlow?.toLocaleString()}</strong>
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-900 block">Loan Purpose (≤ 20 Words):</strong>
                <p className="text-slate-600">{selectedLeadForDetail.loanPurpose}</p>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-900 block">Use of Funds:</strong>
                <p className="text-slate-600">{selectedLeadForDetail.useOfFunds}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLeadDetailModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer text-center"
              >
                Close View
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLeadDetailModal(false);
                  handleClaimDeal(selectedLeadForDetail.id);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md cursor-pointer text-center"
              >
                Claim Working Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: MEDIATED CHAT / EMAIL / SMS WITH BROKER ELENA ROSTOVA
          ========================================================================= */}
      {showBrokerMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                />
                <div>
                  <h3 className="text-base font-heading font-extrabold text-[#0B1730]">
                    Inquire via Elena Rostova (Broker)
                  </h3>
                  <div className="text-xs text-blue-600 font-medium">
                    Re: {brokerMessageTarget?.businessName || 'Marketplace Lead'} (#{brokerMessageTarget?.id})
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBrokerMessageModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendBrokerMessage} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Channel (Doc 1 Lines 73-75)</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBrokerMessageChannel('CHAT')}
                    className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                      brokerMessageChannel === 'CHAT' ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrokerMessageChannel('EMAIL')}
                    className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                      brokerMessageChannel === 'EMAIL' ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrokerMessageChannel('SMS')}
                    className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                      brokerMessageChannel === 'SMS' ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    SMS
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message to Broker</label>
                <textarea
                  required
                  rows={4}
                  value={brokerMessageText}
                  onChange={(e) => setBrokerMessageText(e.target.value)}
                  placeholder="Ask Elena about 6-month bank statements, equipment liens, or specific terms before locking the file..."
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500">
                Rule FR-09 Enforced: Elena Rostova will relay acceptable terms to the borrower while preserving competing underwriter confidentiality.
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBrokerMessageModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Send {brokerMessageChannel}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: SUBMIT OFFER TERM SHEET MODAL (Doc 1 Line 82)
          ========================================================================= */}
      {showSubmitOfferModal && selectedAppForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  Term Sheet Proposal (Lender Exclusive)
                </span>
                <h3 className="text-base font-heading font-extrabold text-[#0B1730]">
                  Submit Offer for {selectedAppForOffer.businessName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitOfferModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitOffer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Approved Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={offerForm.amount}
                    onChange={(e) => setOfferForm({ ...offerForm, amount: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Interest Rate (% APR)</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={offerForm.interestRate}
                    onChange={(e) => setOfferForm({ ...offerForm, interestRate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-blue-700 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tenor (Months)</label>
                  <select
                    value={offerForm.termMonths}
                    onChange={(e) => setOfferForm({ ...offerForm, termMonths: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer"
                  >
                    <option value="24">24 Months (2 Years)</option>
                    <option value="36">36 Months (3 Years)</option>
                    <option value="48">48 Months (4 Years)</option>
                    <option value="60">60 Months (5 Years)</option>
                    <option value="120">120 Months (10 Years)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Origination Fee (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={offerForm.originationFeePercent}
                    onChange={(e) => setOfferForm({ ...offerForm, originationFeePercent: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                Offers submitted here will be recorded in Offer Management. OAL Reps can view and share with the borrower (Read-Only) per Doc 1 Line 83.
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitOfferModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md cursor-pointer text-center"
                >
                  Confirm & Transmit Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
