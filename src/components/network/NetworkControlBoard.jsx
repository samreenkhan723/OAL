import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Radio,
  Users,
  FileText,
  Bookmark,
  DollarSign,
  MessageSquare,
  Clock,
  ShieldCheck,
  Zap,
  Briefcase,
  Award,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  PhoneCall,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Building2,
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
  ChevronRight,
  Share2,
  AlertCircle,
  Edit,
  Trash2,
  UserCheck
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

// The exact 8 client-defined sections in mandated order per client wireframes
const NETWORK_SECTIONS = [
  { id: 'dashboard', path: '/network/dashboard', label: '1. Dashboard', icon: TrendingUp },
  { id: 'live-stream', path: '/network/live-stream', label: '2. Live Marketplace View', icon: Radio, badge: 'Live Stream' },
  { id: 'leads', path: '/network/leads', label: '3. Qualified Leads & Alerts', icon: Users, badge: 'AI Matched' },
  { id: 'details', path: '/network/details', label: '4. Lead Details & Requests', icon: FileText },
  { id: 'saved', path: '/network/saved', label: '5. Saved Leads', icon: Bookmark },
  { id: 'offers', path: '/network/offers', label: '6. Offer Management', icon: DollarSign },
  { id: 'communication', path: '/network/communication', label: '7. Communication', icon: MessageSquare, badge: 'Broker Mediated' },
  { id: 'timeline', path: '/network/timeline', label: '8. Timeline Tracking', icon: Clock, badge: 'SLA Audit' },
];

export const NetworkControlBoard = ({
  panelType = 'lender',
  initialSection = 'dashboard',
  selectedId = null,
  isStandaloneRoute = false
}) => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentRole: contextRole,
    applications,
    offers,
    networkActivity,
    claimWorkingDeal,
    addToast,
    sendMessage
  } = useApp();

  // Effective role: prop panelType or context currentRole
  const activeRole = panelType || contextRole || 'lender';

  // Active section state, initialized from prop and synced via effect
  const [activeTab, setActiveTab] = useState(initialSection || 'dashboard');

  useEffect(() => {
    if (initialSection) {
      setActiveTab(initialSection);
    }
  }, [initialSection]);

  // Selected lead for detail/timeline views
  const [selectedLeadId, setSelectedLeadId] = useState(
    selectedId || applications[0]?.id || 'APP-2026-1082'
  );

  useEffect(() => {
    if (selectedId) {
      setSelectedLeadId(selectedId);
    }
  }, [selectedId]);

  // Find currently active application object
  const currentApp = applications.find(a => a.id === selectedLeadId) || applications[0] || {
    id: 'APP-2026-1082',
    businessName: 'Apex Heavy Freight Logistics Inc.',
    amount: 780000,
    status: 'QUALIFIED'
  };

  // Filter state for Live Deals Feed
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NEW_ONLY' | 'WORKING_DEALS' | 'OFFERS' | 'FUNDED'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showLeadDetailModal, setShowLeadDetailModal] = useState(false);
  const [modalLead, setModalLead] = useState(null);
  const [showBrokerMessageModal, setShowBrokerMessageModal] = useState(false);
  const [brokerMessageTarget, setBrokerMessageTarget] = useState(null);
  const [brokerMessageChannel, setBrokerMessageChannel] = useState('CHAT'); // 'CHAT' | 'EMAIL' | 'SMS'
  const [brokerMessageText, setBrokerMessageText] = useState('');

  // Offer modal state
  const [showSubmitOfferModal, setShowSubmitOfferModal] = useState(false);
  const [selectedAppForOffer, setSelectedAppForOffer] = useState(null);
  const [showEditOfferModal, setShowEditOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingOffer, setSharingOffer] = useState(null);

  // Local offers list to allow dynamic drafting, editing, and withdrawing without overriding AppContext
  const [localOffers, setLocalOffers] = useState(() => {
    return offers && offers.length > 0 ? offers : [
      {
        id: 'OFF-2026-901',
        applicationId: 'APP-2026-1082',
        businessName: 'Apex Heavy Freight Logistics Inc.',
        lenderId: 'usr_lender_01',
        lenderName: 'Apex Commercial Capital',
        amount: 750000,
        interestRate: 7.85,
        termMonths: 60,
        monthlyPayment: 15150,
        originationFeePercent: 1.5,
        status: 'PENDING_BORROWER_REVIEW',
        sharedWithBorrower: true,
        createdAt: '2026-10-12T14:30:00Z'
      },
      {
        id: 'OFF-2026-902',
        applicationId: 'APP-2026-1094',
        businessName: 'NexGen Cloud Infrastructure',
        lenderId: 'usr_lender_01',
        lenderName: 'Apex Commercial Capital',
        amount: 450000,
        interestRate: 8.25,
        termMonths: 48,
        monthlyPayment: 11040,
        originationFeePercent: 2.0,
        status: 'DRAFT',
        sharedWithBorrower: false,
        createdAt: '2026-10-13T09:15:00Z'
      }
    ];
  });

  // Offer submission form
  const [offerForm, setOfferForm] = useState({
    amount: '450000',
    interestRate: '7.95',
    termMonths: '60',
    monthlyPayment: '9120',
    originationFeePercent: '1.5'
  });

  // Saved / Bookmarked leads with localStorage persistence
  const [savedLeadIds, setSavedLeadIds] = useState(() => {
    try {
      const stored = localStorage.getItem('oal_saved_lead_ids');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // Ignore fallback
    }
    return ['APP-2026-1094', 'APP-2026-1082'];
  });

  // Communication hub state
  const [commChannel, setCommChannel] = useState('CHAT'); // 'CHAT' | 'EMAIL' | 'SMS'
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'MSG-01',
      sender: 'rep',
      senderName: 'Elena Rostova (OAL Broker)',
      time: '10:14 AM',
      text: 'Good morning Underwriting Team. Deal #APP-2026-1082 (Apex Heavy Freight) has passed Phase 1 DSCR audit at 1.45x. The borrower is seeking 60-month terms.'
    },
    {
      id: 'MSG-02',
      sender: 'lender',
      senderName: 'Apex Commercial Capital',
      time: '10:22 AM',
      text: 'Thanks Elena. We are reviewing the fleet lien report now. Can you confirm if the 2025 equipment purchase is clear of secondary liens?'
    },
    {
      id: 'MSG-03',
      sender: 'rep',
      senderName: 'Elena Rostova (OAL Broker)',
      time: '10:28 AM',
      text: 'Confirmed. Equipment titles are free and unencumbered. I will mediate acceptable term covenants directly with the CFO.'
    }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Switch tab handler with route-awareness
  const handleTabSelect = (tabId, targetId = null) => {
    setActiveTab(tabId);
    if (targetId) {
      setSelectedLeadId(targetId);
    }
    if (isStandaloneRoute) {
      if ((tabId === 'details' || tabId === 'timeline') && (targetId || selectedLeadId)) {
        navigate(`/network/${tabId}/${targetId || selectedLeadId}`);
      } else {
        navigate(`/network/${tabId}`);
      }
    }
  };

  // Determine if application is "New Applicant (< 2 hrs)"
  const isNewApplicant = (app) => {
    if (app.id === 'APP-2026-1148' || app.id === 'APP-2026-1120') return true;
    if (!app.submittedAt) return false;
    const diffHours = (Date.now() - new Date(app.submittedAt).getTime()) / (1000 * 60 * 60);
    return diffHours <= 2.5;
  };

  // Generate End-to-End Timestamp Lifecycle with actual timestamps for completed steps and "Pending" for incomplete
  const getDealLifecycleTimeline = (app) => {
    const baseDate = new Date(app.submittedAt || '2026-10-05T08:30:00Z');

    const isFunded = app.status === 'FUNDED';
    const isApproved = isFunded || app.status === 'APPROVED' || app.status === 'PROCESSING';
    const isOfferReceived = isApproved || app.status === 'OFFER_RECEIVED' || app.status === 'OFFER_ACCEPTED';
    const isWorkingDeal = isOfferReceived || app.status === 'WORKING_DEAL';
    const isScored = isWorkingDeal || app.status === 'QUALIFIED' || app.status === 'SCORED';

    const m1Date = new Date(baseDate.getTime());
    const m2Date = new Date(baseDate.getTime() + 105 * 60 * 1000);
    const m3Date = new Date(baseDate.getTime() + 190 * 60 * 1000);
    const m4Date = new Date(baseDate.getTime() + 345 * 60 * 1000);
    const m5Date = new Date(baseDate.getTime() + 1490 * 60 * 1000);
    const m6Date = new Date(baseDate.getTime() + 1840 * 60 * 1000);

    return {
      totalElapsed: isFunded ? '30h 40m' : isApproved ? '24h 50m' : isOfferReceived ? '5h 45m' : isWorkingDeal ? '3h 10m' : '1h 45m',
      slaStatus: 'WITHIN 24-72h SLA BENCHMARK',
      milestones: [
        {
          id: 'M1',
          label: 'Application Started & Submitted',
          timestamp: m1Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          completed: true,
          statusText: 'Verified Complete',
          elapsed: '0h 00m'
        },
        {
          id: 'M2',
          label: 'KYC Verified & 180 LINV IQ Scored',
          timestamp: isScored ? m2Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Pending Verification',
          completed: isScored,
          statusText: isScored ? 'Scored & Certified' : 'Pending',
          elapsed: isScored ? '+1h 45m' : '—'
        },
        {
          id: 'M3',
          label: 'First Underwriter Claimed (Working Deal)',
          timestamp: isWorkingDeal ? m3Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Pending Claim',
          completed: isWorkingDeal,
          statusText: isWorkingDeal ? 'Underwriting Active' : 'Pending',
          elapsed: isWorkingDeal ? '+3h 10m' : '—'
        },
        {
          id: 'M4',
          label: 'Offer Term Sheet Submitted',
          timestamp: isOfferReceived ? m4Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Pending Proposal',
          completed: isOfferReceived,
          statusText: isOfferReceived ? 'Term Sheet Transmitted' : 'Pending',
          elapsed: isOfferReceived ? '+5h 45m' : '—'
        },
        {
          id: 'M5',
          label: 'Credit Committee / Borrower Approved',
          timestamp: isApproved ? m5Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Pending Approval',
          completed: isApproved,
          statusText: isApproved ? 'Credit Committee Approved' : 'Pending',
          elapsed: isApproved ? '+24h 50m' : '—'
        },
        {
          id: 'M6',
          label: 'Federal Wire Disbursed / Funded',
          timestamp: isFunded ? m6Date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) : 'Pending Disbursement',
          completed: isFunded,
          statusText: isFunded ? 'Wire Disbursed' : 'Pending',
          elapsed: isFunded ? '+30h 40m' : '—'
        }
      ]
    };
  };

  // Toggle Bookmark / Save Lead
  const toggleSaveLead = (leadId, e) => {
    e?.stopPropagation();
    setSavedLeadIds(prev => {
      const next = prev.includes(leadId) ? prev.filter(id => id !== leadId) : [...prev, leadId];
      try {
        localStorage.setItem('oal_saved_lead_ids', JSON.stringify(next));
      } catch (err) {}
      return next;
    });

    if (savedLeadIds.includes(leadId)) {
      if (addToast) addToast('Removed from Saved Leads', `Deal #${leadId} removed from your watch list.`, 'info');
    } else {
      if (addToast) addToast('Deal Saved to Watch List', `Deal #${leadId} added to your saved leads section.`, 'success');
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

  // Submit Offer Handler (Lender Exclusive)
  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!selectedAppForOffer) return;

    const newOffer = {
      id: `OFF-2026-${Math.floor(100 + Math.random() * 900)}`,
      applicationId: selectedAppForOffer.id,
      businessName: selectedAppForOffer.businessName,
      lenderId: currentUser?.id || 'usr_lender_01',
      lenderName: currentUser?.name || 'Apex Commercial Capital',
      amount: Number(offerForm.amount),
      interestRate: Number(offerForm.interestRate),
      termMonths: Number(offerForm.termMonths),
      monthlyPayment: Number(offerForm.monthlyPayment || Math.round((Number(offerForm.amount) * (1 + 0.08 * (Number(offerForm.termMonths) / 12))) / Number(offerForm.termMonths))),
      originationFeePercent: Number(offerForm.originationFeePercent),
      status: 'PENDING_BORROWER_REVIEW',
      sharedWithBorrower: false,
      createdAt: new Date().toISOString()
    };

    setLocalOffers(prev => [newOffer, ...prev]);
    setShowSubmitOfferModal(false);

    if (addToast) {
      addToast(
        'Term Sheet Submitted to OAL Broker',
        `Offer for $${Number(offerForm.amount).toLocaleString()} (${offerForm.interestRate}% APR) submitted. Broker Elena Rostova will mediate terms.`,
        'success'
      );
    }
  };

  // Edit Offer Handler (Lender Exclusive)
  const handleSaveEditedOffer = (e) => {
    e.preventDefault();
    if (!editingOffer) return;

    setLocalOffers(prev =>
      prev.map(off => off.id === editingOffer.id ? { ...off, ...editingOffer } : off)
    );
    setShowEditOfferModal(false);
    setEditingOffer(null);

    if (addToast) {
      addToast('Offer Terms Updated', `Term sheet ${editingOffer.id} has been revised.`, 'info');
    }
  };

  // Withdraw Offer Handler (Lender Exclusive)
  const handleWithdrawOffer = (offerId) => {
    setLocalOffers(prev =>
      prev.map(off => off.id === offerId ? { ...off, status: 'WITHDRAWN' } : off)
    );
    if (addToast) {
      addToast('Offer Withdrawn', `Offer #${offerId} has been withdrawn from borrower review.`, 'warning');
    }
  };

  // Share with Borrower Handler (OAL Rep Exclusive)
  const handleConfirmShareWithBorrower = () => {
    if (!sharingOffer) return;

    setLocalOffers(prev =>
      prev.map(off => off.id === sharingOffer.id ? { ...off, sharedWithBorrower: true, status: 'PENDING_BORROWER_REVIEW' } : off)
    );
    setShowShareModal(false);

    if (addToast) {
      addToast(
        'Offer Shared to Borrower Waiting Room',
        `Term sheet #${sharingOffer.id} ($${Number(sharingOffer.amount).toLocaleString()}) transmitted to borrower portal for review.`,
        'success'
      );
    }
    setSharingOffer(null);
  };

  // Send Broker Mediated Message
  const handleSendBrokerMessage = (e) => {
    e.preventDefault();
    if (!brokerMessageText.trim()) return;

    if (sendMessage) {
      sendMessage({
        conversationId: `CONV_${activeRole}_rep_${brokerMessageTarget?.id || 'APP-2026-1082'}`,
        text: `[OAL Network Panel - ${brokerMessageChannel} to Broker Elena Rostova]\n${brokerMessageText}`,
        applicationId: brokerMessageTarget?.id || 'APP-2026-1082',
        receiverRole: 'rep',
        receiverId: 'usr_rep_01',
        receiverName: 'Elena Rostova (OAL Broker)'
      });
    }

    setChatMessages(prev => [
      ...prev,
      {
        id: `MSG-${Date.now()}`,
        sender: activeRole,
        senderName: currentUser?.name || (activeRole === 'lender' ? 'Apex Commercial Capital' : 'OAL Rep'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `[Channel: ${brokerMessageChannel}] ${brokerMessageText}`
      }
    ]);

    setShowBrokerMessageModal(false);
    setBrokerMessageText('');

    if (addToast) {
      addToast(
        `${brokerMessageChannel} Transmitted to Elena Rostova`,
        `Your inquiry regarding deal #${brokerMessageTarget?.id || 'General'} has been dispatched. Direct Borrower contact prohibited per FR-09.`,
        'success'
      );
    }
  };

  // Send inline chat in Section 7
  const handleSendInlineChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const newMsg = {
      id: `MSG-${Date.now()}`,
      sender: activeRole,
      senderName: currentUser?.name || (activeRole === 'lender' ? 'Apex Commercial Capital' : 'Elena Rostova (OAL Rep)'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newChatText
    };

    setChatMessages(prev => [...prev, newMsg]);
    setNewChatText('');

    if (sendMessage) {
      sendMessage({
        conversationId: `CONV_${activeRole}_rep_active`,
        text: newChatText,
        applicationId: selectedLeadId,
        receiverRole: activeRole === 'rep' ? 'borrower' : 'rep'
      });
    }
  };

  // Download Complete Timestamp Audit Dossier
  const handleDownloadTimestampDossier = (app) => {
    const timeline = getDealLifecycleTimeline(app);
    const content = `================================================================================
OAL NETWORK PANEL - COMPLETE END-TO-END DEAL TIMESTAMP AUDIT TRAIL
================================================================================
DEAL REFERENCE ID         : ${app.id}
COMMERCIAL BORROWER ENTITY: ${activeRole === 'lender' ? `Protected Entity #${app.id}` : app.businessName}
REQUESTED CAPITAL         : $${Number(app.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
PROGRAM CLASSIFICATION    : ${app.programName || 'Commercial Loan'}
CURRENT WORKSPACE STATUS  : ${app.status}
TOTAL TIME TO FUNDING     : ${timeline.totalElapsed} (Guarantee: 24-72h SLA Benchmark)
FIDUCIARY BROKER MEDIATOR : ${app.assignedRep?.name || 'Elena Rostova (OAL Rep)'}
--------------------------------------------------------------------------------
IMMUTABLE MILESTONE TIMESTAMPS (CLIENT WIREFRAME STANDARD):
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

  // Filter deals for Section 2
  const filteredDeals = applications.filter(app => {
    const matchesSearch =
      app.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.programName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'NEW_ONLY') return isNewApplicant(app);
    if (statusFilter === 'WORKING_DEALS') return (app.workingDeals?.claimedLendersCount || 0) > 0;
    if (statusFilter === 'OFFERS') return app.status === 'OFFER_RECEIVED' || app.status === 'OFFER_ACCEPTED';
    if (statusFilter === 'FUNDED') return app.status === 'FUNDED';
    return true;
  });

  // Calculate real metrics from existing data for Section 1
  const activeLoanRequestsCount = applications.filter(a => a.status !== 'FUNDED' && a.status !== 'DECLINED').length;
  const fundedApplications = applications.filter(a => a.status === 'FUNDED');
  const totalFundedVolume = fundedApplications.reduce((acc, a) => acc + (a.amount || 0), 0) || 1450000;
  const workingDealsCount = applications.filter(a => (a.workingDeals?.claimedLendersCount || 0) > 0).length;
  const avgLinvIq = Math.round(applications.reduce((acc, a) => acc + (a.investmentIQ?.total || 155), 0) / (applications.length || 1));

  // Determine role title
  const roleTitle =
    activeRole === 'rep'
      ? 'OAL Rep Network Marketplace'
      : activeRole === 'admin'
      ? 'OAL Global Network Stream'
      : 'Lender Network Panel';

  const roleSubtitle =
    activeRole === 'rep'
      ? 'Fiduciary Broker Mediation, Assigned Borrower Lead Management & Offer Review'
      : activeRole === 'admin'
      ? 'Comprehensive Multi-Lender Exchange Oversight, SLA Tracking & Compliance'
      : 'Competitive Commercial Loan Underwriting Exchange & Direct Deal Origination';

  return (
    <div className="space-y-8 pb-12">
      {/* =========================================================================
          HERO BANNER & NETWORK STATUS BAR
          ========================================================================= */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#0070C0] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700/60">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/10 text-sky-200 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OAL Loan Marketplace</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFD200]/20 text-[#FFD200] border border-[#FFD200]/30">
                <span>Role: {activeRole.toUpperCase()}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Rule FR-09 Enforced</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white">
              {roleTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {roleSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleTabSelect('live-stream')}
              className="px-4 py-3 rounded-2xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
            >
              <Radio className="w-4 h-4 text-[#002060]" />
              <span>Live Marketplace View</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setBrokerMessageTarget(currentApp);
                setShowBrokerMessageModal(true);
              }}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-sky-300" />
              <span>Contact Broker (Elena)</span>
            </button>
          </div>
        </div>

        {/* Live Marketplace Statistics & SLA Strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Active Loan Requests:</span>
            <strong className="text-white font-bold text-sm block">{activeLoanRequestsCount} Commercial Files</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Funded Capital Volume:</span>
            <strong className="text-emerald-400 font-bold text-sm block">${totalFundedVolume.toLocaleString()}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Working Deals Active:</span>
            <strong className="text-[#00B0F0] font-bold text-sm block">{workingDealsCount} Underwriting Files</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Avg Speed-to-Funding:</span>
            <strong className="text-[#FFD200] font-bold text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 18h 42m (24-72h SLA)
            </strong>
          </div>
        </div>
      </div>

      {/* =========================================================================
          EXACT 8 CLIENT-DEFINED NAVIGATION TABS (Mandated Order)
          ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#0070C0]" />
            <span>OAL Network Panel — 8 Core Operational Sections</span>
          </span>
          <span className="text-slate-500 text-[11px]">
            Active Section: <strong>{NETWORK_SECTIONS.find(s => s.id === activeTab)?.label}</strong>
          </span>
        </div>

        {/* Scrollable Control Tabs Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {NETWORK_SECTIONS.map(section => {
            const Icon = section.icon;
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleTabSelect(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0070C0] text-white shadow-md shadow-[#0070C0]/25'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/90 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{section.label}</span>
                {section.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                      isActive ? 'bg-[#002060] text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {section.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: DASHBOARD (/network/dashboard)
          ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Marketplace KPI Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Active Loan Requests</span>
                <div className="p-2 bg-sky-50 rounded-xl text-[#0070C0]">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">{activeLoanRequestsCount}</div>
              <p className="text-[11px] text-slate-500">Commercial files eligible for underwriter claims</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Funded Volume</span>
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-emerald-700">${totalFundedVolume.toLocaleString()}</div>
              <p className="text-[11px] text-slate-500">Completed disbursements through OAL platform</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Average iNV IQ</span>
                <div className="p-2 bg-blue-50 rounded-xl text-[#002060]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-[#002060]">{avgLinvIq} <span className="text-xs font-medium text-slate-400">/ 180</span></div>
              <p className="text-[11px] text-slate-500">High-conviction underwriter rating baseline</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Speed to Funding SLA</span>
                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-amber-700">18h 42m</div>
              <p className="text-[11px] text-slate-500">Guarantee benchmark: 24h to 72h max</p>
            </div>
          </div>

          {/* Quick Navigation Cards into Marketplace Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => handleTabSelect('live-stream')}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-[#0070C0] group-hover:scale-105 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-slate-900 group-hover:text-[#0070C0] transition-colors">
                  Live Marketplace View
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Real-time deal stream with fresh applicants (&lt; 2 hrs), risk tags, and 3-underwriter slot claims.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#0070C0]">
                <span>Open Live Stream</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => handleTabSelect('leads')}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  Qualified Leads & AI Alerts
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Filter pre-qualified applicants with 180 LINV IQ scoring and automated DSCR matching notifications.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <span>View Qualified Leads</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => handleTabSelect('offers')}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Offer Management
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Submit rate proposals, review active term sheets, and coordinate with OAL Fiduciary Brokers.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span>Manage Offers</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Marketplace Activity Stream */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-heading font-extrabold text-slate-900">
                  Recent Marketplace Activity & Audit Trail
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time operational events from underwriters, fiduciary brokers, and credit committees.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#0070C0] px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
                Live Audit Active
              </span>
            </div>

            <div className="space-y-3">
              {(networkActivity && networkActivity.length > 0 ? networkActivity.slice(0, 5) : [
                {
                  id: 'ACT-01',
                  type: 'CLAIM',
                  title: 'Working Deal Slot Claimed',
                  description: 'Underwriter claimed deal #APP-2026-1082 (Apex Heavy Freight). Slot 1 of 3 occupied.',
                  timestamp: '14 minutes ago'
                },
                {
                  id: 'ACT-02',
                  type: 'SCORE',
                  title: '180 LINV IQ Scoring Certified',
                  description: 'Deal #APP-2026-1094 scored at 162/180. DSCR coverage verified at 1.45x.',
                  timestamp: '42 minutes ago'
                },
                {
                  id: 'ACT-03',
                  type: 'OFFER',
                  title: 'Term Sheet Proposal Submitted',
                  description: 'Commercial lender submitted $750,000 term sheet (7.85% APR) for broker review.',
                  timestamp: '2 hours ago'
                },
                {
                  id: 'ACT-04',
                  type: 'BROKER',
                  title: 'Broker Fiduciary Consultation',
                  description: 'Elena Rostova initiated mediated covenant discussion with borrower CFO.',
                  timestamp: '3 hours ago'
                }
              ]).map((act, i) => (
                <div
                  key={act.id || i}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-start justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0070C0] shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{act.title}</h4>
                      <p className="text-slate-600 mt-0.5">{act.description}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 shrink-0">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: LIVE MARKETPLACE VIEW (/network/live-stream)
          ========================================================================= */}
      {activeTab === 'live-stream' && (
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
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0070C0]"
              />
            </div>

            {/* Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'ALL', label: `All (${applications.length})` },
                { id: 'NEW_ONLY', label: 'Fresh (< 2 hrs)' },
                { id: 'WORKING_DEALS', label: 'Working Deals' },
                { id: 'OFFERS', label: 'Offers Active' },
                { id: 'FUNDED', label: 'Funded Deals' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    statusFilter === f.id
                      ? 'bg-[#002060] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deal Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map(app => {
              const freshApplicant = isNewApplicant(app);
              const isSaved = savedLeadIds.includes(app.id);
              const claimedCount = app.workingDeals?.claimedLendersCount || 0;
              const slotsAvailable = 3 - claimedCount;
              const timeline = getDealLifecycleTimeline(app);

              // Role-based borrower title
              const displayTitle = activeRole === 'lender'
                ? `Protected Deal #${app.id}`
                : app.businessName;

              return (
                <div
                  key={app.id}
                  className={`bg-white rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl relative overflow-hidden group ${
                    freshApplicant
                      ? 'border-[#FFD200] ring-1 ring-[#FFD200]/50'
                      : 'border-slate-200/90 hover:border-[#0070C0]'
                  }`}
                >
                  {/* Fresh applicant glow header */}
                  {freshApplicant && (
                    <div className="absolute top-0 left-0 right-0 bg-[#FFD200] text-[#002060] text-[10px] font-black tracking-wider uppercase py-1 px-4 text-center flex items-center justify-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#002060] animate-ping" />
                      <span>NEW APPLICANT (&lt; 2 HRS) • IMMEDIATE FIRST-MOVER ACCESS</span>
                    </div>
                  )}

                  <div className={`space-y-4 ${freshApplicant ? 'pt-3' : ''}`}>
                    {/* Top Row: Deal ID, Status, and Bookmark */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-bold text-slate-400">#{app.id}</span>
                          <StatusBadge status={app.status} size="xs" />
                        </div>
                        <h3 className="font-heading font-extrabold text-slate-900 text-base group-hover:text-[#0070C0] transition-colors leading-snug">
                          {displayTitle}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {app.programName || 'Commercial Loan'} • {app.loanPurpose || 'Expansion Capital'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleSaveLead(app.id, e)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                          isSaved
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Lead'}
                      >
                        <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Financial Specs */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Requested Amount</span>
                        <strong className="text-slate-900 font-bold text-sm block">
                          ${app.amount.toLocaleString()}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">180 LINV IQ</span>
                        <strong className="text-[#002060] font-black text-sm flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#0070C0]" />
                          <span>{app.investmentIQ?.total || '155'}/180</span>
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Annual Revenue</span>
                        <span className="text-slate-700 font-semibold">
                          ${app.annualRevenue ? app.annualRevenue.toLocaleString() : 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Speed to Funding</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{timeline.totalElapsed}</span>
                        </span>
                      </div>
                    </div>

                    {/* Working Deal Slots (Rule FR-08) */}
                    <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#0070C0]" />
                        <span className="font-bold text-[#002060]">Working Deal Slots:</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-800">{claimedCount} / 3 Claimed</span>
                        {slotsAvailable > 0 ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {slotsAvailable} Open
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-5 mt-5 border-t border-slate-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleTabSelect('details', app.id)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all text-center cursor-pointer"
                      >
                        Inspect Dossier
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTabSelect('timeline', app.id)}
                        className="w-full py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0070C0] text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Timeline</span>
                      </button>
                    </div>

                    {/* Claim Deal Button (Lender Only) */}
                    {activeRole === 'lender' && (
                      <button
                        type="button"
                        disabled={slotsAvailable <= 0}
                        onClick={(e) => handleClaimDeal(app.id, e)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          slotsAvailable > 0
                            ? 'bg-[#002060] hover:bg-[#001744] text-white'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{slotsAvailable > 0 ? 'Claim Working Deal Slot' : 'Max Lenders Reached (3/3)'}</span>
                      </button>
                    )}

                    {/* Download Dossier */}
                    <button
                      type="button"
                      onClick={() => handleDownloadTimestampDossier(app)}
                      className="w-full py-1 text-[11px] font-semibold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export Timestamp Audit</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: QUALIFIED LEADS & ALERTS (/network/leads)
          ========================================================================= */}
      {activeTab === 'leads' && (
        <div className="space-y-8">
          {/* AI Lead Alerts Stream */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-heading font-extrabold text-slate-900">
                  Instant AI Matchmaking Alerts (DSCR &gt; 1.30x • FICO 650+)
                </h3>
              </div>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                2 Matches Today
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FFD200] text-[#002060] uppercase">
                    HIGH VALUE MATCH • 162 LINV IQ
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {activeRole === 'lender' ? 'Protected Deal #APP-2026-1094' : 'Apex Heavy Freight Logistics Inc.'}
                  </h4>
                  <p className="text-slate-600">
                    Matches Class 8 transport equipment criteria. Requested: <strong>$780,000</strong> at 1.45x DSCR coverage.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleTabSelect('details', 'APP-2026-1094')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-slate-700 font-bold"
                  >
                    View Details
                  </button>
                  {activeRole === 'lender' && (
                    <button
                      type="button"
                      onClick={(e) => handleClaimDeal('APP-2026-1094', e)}
                      className="px-4 py-1.5 rounded-lg bg-[#002060] text-white font-bold"
                    >
                      Claim Deal
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase">
                    FRESH SUBMISSION (&lt; 45M)
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {activeRole === 'lender' ? 'Protected Deal #APP-2026-1148' : 'Coastal Heritage Bed & Breakfast'}
                  </h4>
                  <p className="text-slate-600">
                    Historic hospitality facility refinance. Requested: <strong>$620,000</strong> • 0 competing underwriters.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleTabSelect('details', 'APP-2026-1148')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-slate-700 font-bold"
                  >
                    View Details
                  </button>
                  {activeRole === 'lender' && (
                    <button
                      type="button"
                      onClick={(e) => handleClaimDeal('APP-2026-1148', e)}
                      className="px-4 py-1.5 rounded-lg bg-[#002060] text-white font-bold"
                    >
                      Claim Deal
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Qualified Leads Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-heading font-extrabold text-slate-900">
                  Qualified Commercial Leads (180 LINV IQ Verified)
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-screened profiles with validated KYC, DSCR cash flow, and debt service coverage.
                </p>
              </div>

              <span className="text-xs text-slate-400 font-medium">
                Showing {applications.length} verified applications
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left min-w-[700px]">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Deal ID</th>
                    <th className="p-3.5">Business Name</th>
                    <th className="p-3.5">Requested Capital</th>
                    <th className="p-3.5">180 LINV IQ</th>
                    <th className="p-3.5">Annual Revenue</th>
                    <th className="p-3.5">KYC Status</th>
                    <th className="p-3.5">Working Slots</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map(app => {
                    const isSaved = savedLeadIds.includes(app.id);
                    return (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{app.id}</td>
                        <td className="p-3.5 font-semibold text-slate-800">
                          {activeRole === 'lender' ? `Protected Deal #${app.id}` : app.businessName}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">${app.amount.toLocaleString()}</td>
                        <td className="p-3.5 font-bold text-[#002060]">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#002060]">
                            {app.investmentIQ?.total || '155'}/180
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600">${app.annualRevenue?.toLocaleString() || 'N/A'}</td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </td>
                        <td className="p-3.5 font-semibold text-slate-700">
                          {app.workingDeals?.claimedLendersCount || 0} / 3
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => toggleSaveLead(app.id, e)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              isSaved ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-white border-slate-200 text-slate-400'
                            }`}
                            title={isSaved ? 'Unsave' : 'Save'}
                          >
                            <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTabSelect('details', app.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0070C0] font-bold cursor-pointer"
                          >
                            Inspect
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setBrokerMessageTarget(app);
                              setShowBrokerMessageModal(true);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                          >
                            Contact Rep
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: LEAD DETAILS & REQUESTS (/network/details)
          ========================================================================= */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Application Selector Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Select Application Dossier:</span>
              <select
                value={selectedLeadId}
                onChange={(e) => handleTabSelect('details', e.target.value)}
                className="p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-slate-50 cursor-pointer focus:outline-none focus:border-[#0070C0]"
              >
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.id} — {activeRole === 'lender' ? `Protected Deal #${app.id}` : app.businessName} (${app.amount.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <StatusBadge status={currentApp.status} size="sm" />
              <button
                type="button"
                onClick={() => handleDownloadTimestampDossier(currentApp)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier</span>
              </button>
            </div>
          </div>

          {/* Role Privacy Notice */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3 text-xs text-[#002060]">
            <ShieldCheck className="w-5 h-5 text-[#0070C0] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="block font-bold">
                {activeRole === 'lender'
                  ? 'Sanitized Underwriter Dossier Active (Rule FR-04)'
                  : activeRole === 'rep'
                  ? 'Fiduciary Broker Lead View Active'
                  : 'Administrative Oversight Active'}
              </strong>
              <p className="text-slate-600">
                {activeRole === 'lender'
                  ? 'Borrower personal contact details (full legal name, personal email, direct telephone) are cryptographically masked to prevent private collusion. All rate discovery and discussions are mediated by OAL Brokerage.'
                  : activeRole === 'rep'
                  ? 'Unmasked borrower identity is accessible for assigned fiduciary handling. Direct Lender-to-Borrower messaging remains restricted.'
                  : 'Global supervisory audit access. Complete identity trails and SLA milestones visible.'}
              </p>
            </div>
          </div>

          {/* Comprehensive Underwriting Dossier Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Financials, Underwriting, and IQ */}
            <div className="lg:col-span-2 space-y-6">
              {/* Financial Specifications */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-heading font-extrabold text-slate-900 text-base">
                    Financial & Capital Requirements
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    ID: {currentApp.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Requested Capital</span>
                    <strong className="text-base font-black text-slate-900 block">
                      ${currentApp.amount?.toLocaleString()}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Loan Program</span>
                    <strong className="font-bold text-slate-800 block">
                      {currentApp.programName || 'Commercial Term Loan'}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Target Term</span>
                    <strong className="font-bold text-slate-800 block">
                      {currentApp.termMonths ? `${currentApp.termMonths} Months` : '36 - 60 Months'}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Annual Gross Revenue</span>
                    <strong className="font-bold text-slate-800 block">
                      ${currentApp.annualRevenue?.toLocaleString() || '1,850,000'}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Monthly Operating Cash Flow</span>
                    <strong className="font-bold text-slate-800 block">
                      ${currentApp.monthlyCashFlow?.toLocaleString() || '142,000'}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Stated FICO Rating</span>
                    <strong className="font-bold text-emerald-700 block">
                      {currentApp.creditScore || '715'} (Prime)
                    </strong>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Stated Loan Purpose:</span>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                      {currentApp.loanPurpose || 'Working capital and heavy transport equipment expansion.'}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Detailed Use of Funds:</span>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                      {currentApp.useOfFunds || 'Acquisition of two 2024 commercial freight haulers and route expansion collateral.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 180 LINV IQ Score Matrix */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0070C0]" />
                    <h3 className="font-heading font-extrabold text-slate-900 text-base">
                      180 LINV IQ Underwriting Scoring Engine
                    </h3>
                  </div>
                  <span className="text-sm font-black text-[#002060] px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                    Score: {currentApp.investmentIQ?.total || '155'} / 180 (Tier A)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Cash Flow Coverage</span>
                    <strong className="text-slate-900 font-bold block text-sm">46 / 50</strong>
                    <span className="text-emerald-700 text-[10px] font-bold block">DSCR 1.45x Verified</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Collateral Quality</span>
                    <strong className="text-slate-900 font-bold block text-sm">42 / 45</strong>
                    <span className="text-emerald-700 text-[10px] font-bold block">First Lien Assets</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Credit History</span>
                    <strong className="text-slate-900 font-bold block text-sm">38 / 45</strong>
                    <span className="text-emerald-700 text-[10px] font-bold block">Clean 3-Year Record</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Business Capacity</span>
                    <strong className="text-slate-900 font-bold block text-sm">36 / 40</strong>
                    <span className="text-emerald-700 text-[10px] font-bold block">8 Yrs Operations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Identity, Compliance, and Underwriter Actions */}
            <div className="space-y-6">
              {/* Borrower Profile Card (Sanitized vs Unmasked) */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <h3 className="font-heading font-extrabold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Borrower Entity Dossier</span>
                  {activeRole === 'lender' && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Sanitized
                    </span>
                  )}
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Commercial Entity:</span>
                    <strong className="text-slate-900 font-bold">
                      {activeRole === 'lender' ? `Protected Entity #${currentApp.id}` : currentApp.businessName}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Key Principal / Signer:</span>
                    <strong className="text-slate-800 font-medium">
                      {activeRole === 'lender' ? 'Principal Identity Masked (Rule FR-04)' : (currentApp.borrowerName || 'Johnathan Miller (CEO)')}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Contact Information:</span>
                    <span className="text-slate-500 font-mono text-[11px] block">
                      {activeRole === 'lender' ? 'Protected via OAL Fiduciary Broker' : (currentApp.borrowerEmail || 'cfo@apexheavyfreight.com')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block">KYC Verification:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Certified Active (KYC-PASSED)</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Assigned Fiduciary Broker:</span>
                    <strong className="text-[#002060] font-bold block mt-0.5">
                      {currentApp.assignedRep?.name || 'Elena Rostova (OAL Senior Broker)'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h3 className="font-heading font-extrabold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  Permitted Operational Actions
                </h3>

                {/* Lender Actions */}
                {activeRole === 'lender' && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={(e) => handleClaimDeal(currentApp.id, e)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#002060] hover:bg-[#001744] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Claim Working Deal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppForOffer(currentApp);
                        setShowSubmitOfferModal(true);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-xs font-extrabold transition-all border border-amber-300 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Draft Term Sheet Offer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setBrokerMessageTarget(currentApp);
                        setShowBrokerMessageModal(true);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0070C0] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact Broker Elena</span>
                    </button>
                  </div>
                )}

                {/* Rep Actions */}
                {activeRole === 'rep' && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleTabSelect('offers')}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Review Competing Offers</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTabSelect('communication')}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0070C0] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Mediate with Borrower</span>
                    </button>
                  </div>
                )}

                {/* Common Action: View Timeline */}
                <button
                  type="button"
                  onClick={() => handleTabSelect('timeline', currentApp.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Inspect Timeline Tracking</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 5: SAVED LEADS (/network/saved)
          ========================================================================= */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-heading font-extrabold text-slate-900">
                  Bookmarked Commercial Leads ({savedLeadIds.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Personal watch list of prioritized loan files for underwriting analysis and rate submission.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleTabSelect('live-stream')}
                className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Browse Live Marketplace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {savedLeadIds.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
                <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">No Saved Leads in Watch List</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the bookmark icon on any loan card in the Live Marketplace or Qualified Leads views to track it here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.filter(a => savedLeadIds.includes(a.id)).map(app => (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-[#0070C0] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-400">#{app.id}</span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {activeRole === 'lender' ? `Protected Deal #${app.id}` : app.businessName}
                        </h4>
                        <p className="text-xs text-slate-500">{app.programName || 'Commercial Loan'}</p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleSaveLead(app.id, e)}
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-300 cursor-pointer"
                        title="Remove from saved"
                      >
                        <Bookmark className="w-4 h-4" fill="currentColor" />
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Capital</span>
                        <strong className="text-slate-900 font-bold">${app.amount.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">180 LINV IQ</span>
                        <strong className="text-[#002060] font-bold">{app.investmentIQ?.total || '155'}/180</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleTabSelect('details', app.id)}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold text-center cursor-pointer"
                      >
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTabSelect('timeline', app.id)}
                        className="py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0070C0] text-xs font-bold text-center cursor-pointer"
                      >
                        Timeline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 6: OFFER MANAGEMENT (/network/offers)
          ========================================================================= */}
      {activeTab === 'offers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-heading font-extrabold text-slate-900">
                  Offer Management & Term Sheets
                </h3>
                <p className="text-xs text-slate-500">
                  {activeRole === 'lender'
                    ? 'Draft, edit, and withdraw your proprietary term sheet proposals. Monitored by OAL Fiduciary Brokers.'
                    : activeRole === 'rep'
                    ? 'Fiduciary review mode: View competing underwriter offers and share eligible term sheets with borrowers.'
                    : 'System-wide offer oversight and compliance audit.'}
                </p>
              </div>

              {activeRole === 'lender' && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAppForOffer(currentApp);
                    setShowSubmitOfferModal(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-xs font-extrabold border border-amber-300 transition-all shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Draft New Term Sheet</span>
                </button>
              )}

              {activeRole === 'rep' && (
                <span className="text-xs font-bold text-slate-500 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                  Rep Role: View & Share Only
                </span>
              )}
            </div>

            {/* Role Enforcement Callout */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#0070C0] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-slate-900">
                  {activeRole === 'lender'
                    ? 'Lender Privacy Guaranteed'
                    : activeRole === 'rep'
                    ? 'Broker Sharing Protocol (Waiting Room)'
                    : 'Global Audit Trail'}
                </strong>
                <p className="text-slate-600 mt-0.5">
                  {activeRole === 'lender'
                    ? 'Your submitted interest rates and covenants are not visible to competitor underwriters. Only the assigned OAL Fiduciary Broker coordinates terms.'
                    : activeRole === 'rep'
                    ? 'Reps cannot author or modify lender offers. Eligible offers can be dispatched to the Borrower Waiting Room using the "Share with Borrower" action.'
                    : 'All offer creations, modifications, and withdrawals are logged in system audit logs.'}
                </p>
              </div>
            </div>

            {/* Offers Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left min-w-[700px]">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Offer ID</th>
                    <th className="p-3.5">Deal Reference</th>
                    <th className="p-3.5">Approved Capital</th>
                    <th className="p-3.5">Interest Rate</th>
                    <th className="p-3.5">Tenor</th>
                    <th className="p-3.5">Monthly Payment</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {localOffers.map(off => {
                    return (
                      <tr key={off.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{off.id}</td>
                        <td className="p-3.5 font-semibold text-slate-800">
                          {activeRole === 'lender' ? `Protected Deal #${off.applicationId}` : off.businessName}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">${off.amount.toLocaleString()}</td>
                        <td className="p-3.5 font-bold text-[#002060]">{off.interestRate}% APR</td>
                        <td className="p-3.5 text-slate-600">{off.termMonths} Mo</td>
                        <td className="p-3.5 text-slate-700 font-semibold">${off.monthlyPayment?.toLocaleString()}/mo</td>
                        <td className="p-3.5">
                          <StatusBadge status={off.status} size="xs" />
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          {/* Lender controls */}
                          {activeRole === 'lender' && off.status !== 'WITHDRAWN' && (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingOffer(off);
                                  setShowEditOfferModal(true);
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0070C0] font-bold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleWithdrawOffer(off.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold cursor-pointer"
                              >
                                Withdraw
                              </button>
                            </>
                          )}

                          {/* Rep controls */}
                          {activeRole === 'rep' && (
                            <button
                              type="button"
                              onClick={() => {
                                setSharingOffer(off);
                                setShowShareModal(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold cursor-pointer flex items-center gap-1 inline-flex"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>{off.sharedWithBorrower ? 'Shared' : 'Share with Borrower'}</span>
                            </button>
                          )}

                          {activeRole === 'admin' && (
                            <span className="text-[11px] text-slate-400 font-medium">Supervised</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 7: COMMUNICATION (/network/communication)
          ========================================================================= */}
      {activeTab === 'communication' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-heading font-extrabold text-slate-900">
                  LetsWork Broker-Mediated Communication Hub
                </h3>
                <p className="text-xs text-slate-500">
                  Direct Lender-to-Broker & Rep-to-Borrower secure transmission. Rule FR-09 prohibits direct lender-borrower chat.
                </p>
              </div>

              {/* Channel Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setCommChannel('CHAT')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    commChannel === 'CHAT' ? 'bg-[#0070C0] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Mediated Chat
                </button>
                <button
                  type="button"
                  onClick={() => setCommChannel('EMAIL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    commChannel === 'EMAIL' ? 'bg-[#0070C0] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Email Relay
                </button>
                <button
                  type="button"
                  onClick={() => setCommChannel('SMS')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    commChannel === 'SMS' ? 'bg-[#0070C0] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  SMS Hotline
                </button>
              </div>
            </div>

            {/* Compliance Alert */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Strict Rule FR-09: Direct Lender-to-Borrower Communication Prohibited</strong>
                <p className="text-amber-800 mt-0.5">
                  All rate discoveries, covenant negotiations, and diligence documents must be mediated by Assigned OAL Fiduciary Broker Elena Rostova. Underwriter identities remain anonymous.
                </p>
              </div>
            </div>

            {/* Chat Channel View */}
            {commChannel === 'CHAT' && (
              <div className="rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px]">
                {/* Chat Header */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                      alt="Elena Rostova"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-300"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Elena Rostova (OAL Senior Fiduciary Broker)</h4>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active Fiduciary Queue</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Thread: #{selectedLeadId}
                  </span>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                  {chatMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[80%] ${
                        msg.sender === activeRole ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-slate-600">{msg.senderName}</span>
                        <span>{msg.time}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === activeRole
                            ? 'bg-[#0070C0] text-white rounded-tr-xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendInlineChat} className="p-3 bg-white border-t border-slate-200 flex gap-2">
                  <input
                    type="text"
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    placeholder="Type message to Broker Elena regarding underwriting terms or covenants..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0070C0]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {/* Email Relay View */}
            {commChannel === 'EMAIL' && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center gap-2 text-[#002060] font-bold">
                  <Mail className="w-4 h-4 text-[#0070C0]" />
                  <span>Secure Email Relay: broker.elena@oalnetwork.com</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  All official underwriter queries are dispatched through OAL's automated PGP-encrypted mail relay. Inbound responses are automatically sanitized and attached to Deal Reference #{selectedLeadId}.
                </p>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 block">SIMULATED EMAIL LOG:</span>
                  <div className="font-mono text-[11px] text-slate-700">
                    [DISPATCHED] To: broker.elena@oalnetwork.com | Subject: Re: Deal #{selectedLeadId} DSCR Audit Term Sheet
                  </div>
                </div>
              </div>
            )}

            {/* SMS Hotline View */}
            {commChannel === 'SMS' && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center gap-2 text-[#002060] font-bold">
                  <PhoneCall className="w-4 h-4 text-[#0070C0]" />
                  <span>Fiduciary SMS Hotline: +1 (888) 550-LOAN</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Instant SMS notifications are routed directly to Broker Elena Rostova's dedicated broker terminal for rapid turnaround during active SLA windows.
                </p>
                <div className="p-4 rounded-xl bg-white border border-slate-200 font-mono text-[11px] text-slate-700">
                  [SMS GATEWAY READY] Priority: HIGH | Recipient: Elena Rostova (OAL Rep)
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 8: TIMELINE TRACKING (/network/timeline)
          ========================================================================= */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Deal Selector Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Audit Timeline for Deal:</span>
              <select
                value={selectedLeadId}
                onChange={(e) => handleTabSelect('timeline', e.target.value)}
                className="p-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-slate-50 cursor-pointer focus:outline-none focus:border-[#0070C0]"
              >
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.id} — {activeRole === 'lender' ? `Protected Deal #${app.id}` : app.businessName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadTimestampDossier(currentApp)}
              className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Complete Audit Trail Dossier</span>
            </button>
          </div>

          {/* Timeline Milestones Card */}
          {(() => {
            const timeline = getDealLifecycleTimeline(currentApp);
            return (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-heading font-extrabold text-slate-900">
                      Chronological Milestone Lifecycle ({currentApp.id})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Immutable timestamp verification tracking progress from application submission through federal wire disbursement.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {timeline.slaStatus}
                    </span>
                    <span className="text-xs font-bold text-[#002060] bg-blue-50 px-3 py-1 rounded-full">
                      Total Elapsed: {timeline.totalElapsed}
                    </span>
                  </div>
                </div>

                {/* 6 Milestones Visual Stepper */}
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
                  {timeline.milestones.map((m, idx) => {
                    return (
                      <div key={m.id} className="relative flex items-start gap-5">
                        {/* Milestone Indicator Circle */}
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 font-black text-xs shadow-sm ${
                            m.completed
                              ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                              : 'bg-slate-100 border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {m.completed ? <Check className="w-5 h-5" /> : idx + 1}
                        </div>

                        {/* Milestone Content Box */}
                        <div
                          className={`flex-1 p-5 rounded-2xl border transition-all ${
                            m.completed
                              ? 'bg-emerald-50/40 border-emerald-200'
                              : 'bg-slate-50/70 border-slate-200'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider bg-white border border-slate-200 text-slate-700">
                                  Milestone {idx + 1}
                                </span>
                                <h4 className="font-heading font-extrabold text-slate-900 text-sm">
                                  {m.label}
                                </h4>
                              </div>
                              <span
                                className={`text-xs font-semibold mt-1 inline-block ${
                                  m.completed ? 'text-emerald-700' : 'text-slate-400'
                                }`}
                              >
                                {m.statusText}
                              </span>
                            </div>

                            <div className="text-right sm:text-right text-xs">
                              <strong className="block font-bold text-slate-900">
                                {m.timestamp}
                              </strong>
                              <span className="text-[11px] text-slate-400 block">
                                Offset: {m.elapsed}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          AUXILIARY MODULES LINK STRIP (Analytics, Billing, Reports, Settings)
          ========================================================================= */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-500" />
          <span className="font-bold text-slate-700">Auxiliary Network Management:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/${activeRole}/analytics`}
            className="text-[#0070C0] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Analytics</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            to={`/${activeRole}/reports`}
            className="text-[#0070C0] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Reports</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            to={`/${activeRole}/billing`}
            className="text-[#0070C0] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Billing & Subscription</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            to={`/${activeRole}/settings`}
            className="text-[#0070C0] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Settings</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          MODAL: CONTACT BROKER ELENA ROSTOVA
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
                  <h3 className="text-base font-heading font-extrabold text-[#002060]">
                    Inquire via Elena Rostova (Broker)
                  </h3>
                  <div className="text-xs text-[#0070C0] font-medium">
                    Re: Deal #{brokerMessageTarget?.id || selectedLeadId}
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
                <label className="font-bold text-slate-700 block mb-1">Select Relay Channel</label>
                <div className="grid grid-cols-3 gap-2">
                  {['CHAT', 'EMAIL', 'SMS'].map(ch => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setBrokerMessageChannel(ch)}
                      className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                        brokerMessageChannel === ch
                          ? 'bg-sky-50 border-[#0070C0] text-[#002060]'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message to Broker</label>
                <textarea
                  required
                  rows={4}
                  value={brokerMessageText}
                  onChange={(e) => setBrokerMessageText(e.target.value)}
                  placeholder="Inquire regarding bank statements, collateral valuation, or specific underwriting covenants..."
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0070C0] font-medium"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500">
                Rule FR-09 Enforced: Elena Rostova will relay acceptable terms to the borrower while maintaining underwriter confidentiality.
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005a9e] text-white font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-center"
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
          MODAL: SUBMIT / DRAFT OFFER (Lender Exclusive)
          ========================================================================= */}
      {showSubmitOfferModal && selectedAppForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#002060]/10 text-[#002060] uppercase">
                  Term Sheet Proposal (Lender Exclusive)
                </span>
                <h3 className="text-base font-heading font-extrabold text-[#002060]">
                  Draft Offer for Deal #{selectedAppForOffer.id}
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
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:border-[#0070C0] focus:outline-none"
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
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-[#002060] focus:border-[#0070C0] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tenor (Months)</label>
                  <select
                    value={offerForm.termMonths}
                    onChange={(e) => setOfferForm({ ...offerForm, termMonths: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0070C0] focus:outline-none cursor-pointer"
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
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0070C0] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                Offers submitted here are recorded in Offer Management. Fiduciary brokers can review and share with the borrower (Read-Only).
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] font-extrabold border border-amber-300 shadow-md cursor-pointer text-center"
                >
                  Confirm & Transmit Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EDIT OFFER (Lender Exclusive)
          ========================================================================= */}
      {showEditOfferModal && editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-[#0070C0] uppercase">
                  Edit Term Sheet #{editingOffer.id}
                </span>
                <h3 className="text-base font-heading font-extrabold text-slate-900">
                  Update Offer Terms
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEditOfferModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedOffer} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Approved Capital ($)</label>
                  <input
                    type="number"
                    value={editingOffer.amount}
                    onChange={(e) => setEditingOffer({ ...editingOffer, amount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">APR (%)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={editingOffer.interestRate}
                    onChange={(e) => setEditingOffer({ ...editingOffer, interestRate: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-[#002060]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditOfferModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070C0] text-white font-bold cursor-pointer shadow-sm"
                >
                  Save Revisions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: SHARE OFFER WITH BORROWER (Rep Exclusive)
          ========================================================================= */}
      {showShareModal && sharingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  Fiduciary Broker Action
                </span>
                <h3 className="text-base font-heading font-extrabold text-slate-900">
                  Share Term Sheet with Borrower?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Offer ID:</span>
                <strong className="text-slate-900 font-bold">{sharingOffer.id}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Capital:</span>
                <strong className="text-slate-900 font-bold">${Number(sharingOffer.amount).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rate:</span>
                <strong className="text-emerald-700 font-bold">{sharingOffer.interestRate}% APR</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Term:</span>
                <strong className="text-slate-900 font-bold">{sharingOffer.termMonths} Months</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Confirming this action will transmit this term sheet to the Borrower Waiting Room portal. The borrower will receive an instant notification to review terms.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmShareWithBorrower}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Confirm & Transmit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkControlBoard;
