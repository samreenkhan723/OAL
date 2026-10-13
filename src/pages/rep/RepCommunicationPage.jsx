import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  isBorrowerThreadMessage,
  isLenderThreadMessage
} from '../../components/loans/MediatedChat';
import {
  MessageSquare,
  Mail,
  Smartphone,
  History,
  Send,
  Lock,
  Building2,
  User,
  DollarSign,
  Clock,
  Share2,
  Search,
  FileText,
  X,
  Sparkles,
  Users,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  Columns,
  Check,
  Paperclip,
  PanelLeftClose,
  PanelLeftOpen,
  Info
} from 'lucide-react';

export const RepCommunicationPage = () => {
  const {
    currentUser,
    applications,
    offers,
    messages,
    sendMessage,
    addToast
  } = useApp();

  // Responsive Screen Width Detection
  const [windowWidth, setWindowWidth] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 1440;
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dual View is strictly permitted only on wide desktop monitors (>= 1440px)
  // On standard laptops and tablets (< 1440px), vertical stacking is eliminated in favor of focused single channels
  const canShowDualSplit = windowWidth >= 1440;

  // 1. Applications assigned to Rep (ONLY assigned applications for rep; admin sees all)
  const repApplications = useMemo(() => {
    if (currentUser?.role === 'admin') return applications || [];
    return (applications || []).filter(
      (a) =>
        a.assignedRep &&
        (a.assignedRep.id === currentUser?.id ||
         (a.assignedRep.email && currentUser?.email && a.assignedRep.email.toLowerCase() === currentUser?.email.toLowerCase()))
    );
  }, [applications, currentUser]);

  // Active Deal Selection
  const [selectedDealId, setSelectedDealId] = useState(() => {
    return repApplications[0]?.id || null;
  });

  // Ensure switching roles/rep resets or aligns selectedDealId
  useEffect(() => {
    if (repApplications.length === 0) {
      if (selectedDealId !== null) setSelectedDealId(null);
    } else if (!repApplications.some((a) => a.id === selectedDealId)) {
      setSelectedDealId(repApplications[0].id);
    }
  }, [repApplications, selectedDealId]);

  // Selected Application object
  const selectedApp = useMemo(() => {
    if (repApplications.length === 0) return null;
    return (
      repApplications.find((a) => a.id === selectedDealId) ||
      repApplications[0] ||
      null
    );
  }, [repApplications, selectedDealId]);

  // Search and Filter State for Left Sidebar
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ACTIVE_OFFERS' | 'IN_REVIEW' | 'QUALIFIED'

  // Collapsible Placements Sidebar state to maximize conversation space on laptops
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filtered Deals for Left Sidebar
  const filteredDeals = useMemo(() => {
    return repApplications.filter((app) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.id.toLowerCase().includes(q) ||
        (app.businessName && app.businessName.toLowerCase().includes(q)) ||
        (app.borrowerName && app.borrowerName.toLowerCase().includes(q)) ||
        (app.programName && app.programName.toLowerCase().includes(q)) ||
        (app.loanType && app.loanType.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (statusFilter === 'ACTIVE_OFFERS') {
        return (
          app.status === 'OFFER_RECEIVED' || app.status === 'OFFER_ACCEPTED'
        );
      }
      if (statusFilter === 'IN_REVIEW') {
        return (
          app.status === 'KYC_REVIEW' ||
          app.status === 'LENDER_REVIEW' ||
          app.status === 'WORKING_DEAL' ||
          app.status === 'SUBMITTED'
        );
      }
      if (statusFilter === 'QUALIFIED') {
        return (
          app.status === 'QUALIFIED' ||
          app.status === 'SCORED' ||
          app.status === 'PROCESSING'
        );
      }

      return true;
    });
  }, [repApplications, searchQuery, statusFilter]);

  // =========================================================================
  // MULTI-LENDER CLAIMS & SELECTION (RULE FR-08: MAX 3 LENDERS)
  // =========================================================================
  const participatingLenders = useMemo(() => {
    return selectedApp?.workingDeals?.claims || [];
  }, [selectedApp]);

  const [selectedLenderId, setSelectedLenderId] = useState(null);

  // Automatically select the first participating lender when deal changes
  useEffect(() => {
    if (participatingLenders.length > 0) {
      setSelectedLenderId(participatingLenders[0].lenderId);
    } else {
      setSelectedLenderId(null);
    }
  }, [selectedApp?.id, participatingLenders]);

  const activeLender = useMemo(() => {
    if (!participatingLenders.length) return null;
    return (
      participatingLenders.find((l) => l.lenderId === selectedLenderId) ||
      participatingLenders[0] ||
      null
    );
  }, [participatingLenders, selectedLenderId]);

  // Short label helper to guarantee compact, unclipped multi-lender tab pills
  const getLenderShortLabel = (claim) => {
    if (!claim) return 'Lender';
    const numMatch = claim.lenderAlias?.match(/Lender\s*#\d+/i);
    if (numMatch) return numMatch[0];
    if (claim.lenderId) {
      const suffix = claim.lenderId.replace(/^usr_lender_0?/, '');
      return `Lender #${suffix || '01'}`;
    }
    return claim.lenderAlias?.split(' ')[0] || 'Lender';
  };

  // Full name for tooltips / Rep inspector views
  const getLenderFullName = (claim) => {
    if (!claim) return '';
    return claim.lenderAlias || `Lender #${claim.lenderId}`;
  };

  // =========================================================================
  // COMMUNICATION MODE & CHANNEL VIEW
  // =========================================================================
  const [commMode, setCommMode] = useState('chat'); // 'chat' | 'email' | 'sms' | 'history'

  // Chat View Mode: 'borrower' | 'lender' | 'split'
  // On screens < 1440px, default to 'borrower' focused channel to eliminate vertical stacking
  const [channelViewMode, setChannelViewMode] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 1440
      ? 'split'
      : 'borrower';
  });

  // Ensure channelViewMode never stays in 'split' on narrow screens
  useEffect(() => {
    if (!canShowDualSplit && channelViewMode === 'split') {
      setChannelViewMode('borrower');
    }
  }, [canShowDualSplit, channelViewMode]);

  // Mobile / Tablet navigation tab: 'deals' | 'chat'
  const [mobileTab, setMobileTab] = useState('chat');

  // Collapsible Deal Inspector Drawer: CLOSED by default
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Message Composing inputs for Chat
  const [borrowerInputText, setBorrowerInputText] = useState('');
  const [lenderInputText, setLenderInputText] = useState('');

  // Email Mode State (Frontend Simulation)
  const [emailRecipientType, setEmailRecipientType] = useState('borrower'); // 'borrower' | 'lender'
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // SMS Mode State (Frontend Simulation)
  const [smsRecipientType, setSmsRecipientType] = useState('borrower'); // 'borrower' | 'lender'
  const [smsText, setSmsText] = useState('');

  // History Filter State
  const [historyTypeFilter, setHistoryTypeFilter] = useState('ALL'); // 'ALL' | 'CHAT' | 'EMAIL' | 'SMS'

  // Relay Modal State
  const [showRelayModal, setShowRelayModal] = useState(false);
  const [relaySourceMsg, setRelaySourceMsg] = useState(null);
  const [relayDraftText, setRelayDraftText] = useState('');

  // Share Offer Modal State
  const [showShareOfferModal, setShowShareOfferModal] = useState(false);
  const [offerToShare, setOfferToShare] = useState(null);

  // Auto-scroll references
  const borrowerChatEndRef = useRef(null);
  const lenderChatEndRef = useRef(null);

  // =========================================================================
  // DYNAMIC CONTEXT SYNCHRONIZATION ON DEAL CHANGE
  // Prevents stale deal references in pending drafts
  // =========================================================================
  useEffect(() => {
    if (!selectedApp?.id) return;

    // Dynamically replace any stale APP-2026-xxxx references in pending drafts
    setSmsText((prev) => {
      if (!prev) return prev;
      return prev.replace(/APP-2026-[A-Z0-9]+/gi, selectedApp.id);
    });

    setEmailSubject((prev) => {
      if (!prev) return prev;
      return prev.replace(/APP-2026-[A-Z0-9]+/gi, selectedApp.id);
    });

    setEmailBody((prev) => {
      if (!prev) return prev;
      return prev.replace(/APP-2026-[A-Z0-9]+/gi, selectedApp.id);
    });

    // If switching to an application without participating lenders, safely fall back to borrower
    if (participatingLenders.length === 0) {
      if (emailRecipientType === 'lender') setEmailRecipientType('borrower');
      if (smsRecipientType === 'lender') setSmsRecipientType('borrower');
      if (channelViewMode === 'lender') setChannelViewMode('borrower');
    }
  }, [selectedApp?.id, participatingLenders.length]);

  // All Messages for currently selected application
  const dealMessages = useMemo(() => {
    if (!selectedApp) return [];
    const targetId = selectedApp.id;
    const cleanTarget = targetId.replace(/^APP-2026-/, '');

    return (messages || []).filter((m) => {
      if (!m) return false;
      if (m.applicationId === targetId) return true;
      if (m.applicationId && cleanTarget) {
        const cleanMsgApp = m.applicationId.replace(/^APP-2026-/, '');
        if (cleanMsgApp === cleanTarget) return true;
      }
      return false;
    });
  }, [messages, selectedApp]);

  // Channel 1: Borrower Thread Messages
  const borrowerChatMessages = useMemo(() => {
    if (!selectedApp) return [];
    return dealMessages.filter(
      (m) =>
        (m.type === 'chat' || !m.type) &&
        isBorrowerThreadMessage(m, selectedApp.id)
    );
  }, [dealMessages, selectedApp]);

  // Channel 2: Lender Thread Messages for the currently selected lender
  const lenderChatMessages = useMemo(() => {
    if (!selectedApp || !activeLender) return [];
    return dealMessages.filter(
      (m) =>
        (m.type === 'chat' || !m.type) &&
        isLenderThreadMessage(m, selectedApp.id, activeLender.lenderId)
    );
  }, [dealMessages, selectedApp, activeLender]);

  // Email messages for current deal
  const dealEmailMessages = useMemo(() => {
    return dealMessages.filter((m) => m.type === 'email');
  }, [dealMessages]);

  // SMS messages for current deal
  const dealSmsMessages = useMemo(() => {
    return dealMessages.filter((m) => m.type === 'sms');
  }, [dealMessages]);

  // Offers for currently selected application (View-Only)
  const dealOffers = useMemo(() => {
    if (!selectedApp) return [];
    return (offers || []).filter((o) => o.applicationId === selectedApp.id);
  }, [offers, selectedApp]);

  // Count messages per deal for sidebar indicators
  const getDealMessageStats = (dealId) => {
    const cleanId = dealId.replace(/^APP-2026-/, '');
    const dMsgs = (messages || []).filter(
      (m) =>
        m.applicationId === dealId ||
        (m.applicationId &&
          m.applicationId.replace(/^APP-2026-/, '') === cleanId)
    );
    const bCount = dMsgs.filter((m) => isBorrowerThreadMessage(m, dealId)).length;
    const lCount = dMsgs.filter((m) => isLenderThreadMessage(m, dealId)).length;
    return { total: dMsgs.length, borrower: bCount, lender: lCount };
  };

  // Count messages for a specific lender on current deal
  const getLenderMessageCount = (lenderId) => {
    if (!selectedApp) return 0;
    return dealMessages.filter((m) =>
      isLenderThreadMessage(m, selectedApp.id, lenderId)
    ).length;
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    borrowerChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [borrowerChatMessages.length]);

  useEffect(() => {
    lenderChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lenderChatMessages.length]);

  // =========================================================================
  // SEND ACTIONS
  // =========================================================================
  const handleSendToBorrower = (e) => {
    e.preventDefault();
    if (!borrowerInputText.trim() || !selectedApp) return;

    sendMessage({
      conversationId: `CONV_BORROWER_REP_${selectedApp.id}`,
      text: borrowerInputText.trim(),
      applicationId: selectedApp.id,
      receiverRole: 'borrower',
      receiverId: selectedApp.borrowerId || 'usr_borrower_01',
      receiverName: selectedApp.borrowerName || 'Marcus Vance',
      type: 'chat'
    });

    setBorrowerInputText('');
  };

  const handleSendToLender = (e) => {
    e.preventDefault();
    if (!lenderInputText.trim() || !selectedApp || !activeLender) return;

    sendMessage({
      conversationId: `CONV_LENDER_REP_${selectedApp.id}_${activeLender.lenderId}`,
      text: lenderInputText.trim(),
      applicationId: selectedApp.id,
      receiverRole: 'lender',
      receiverId: activeLender.lenderId,
      receiverName: activeLender.lenderAlias || 'Participating Institutional Underwriter',
      type: 'chat'
    });

    setLenderInputText('');
  };

  const handleSendSimulatedEmail = (e) => {
    e.preventDefault();
    if (!emailSubject.trim() || !emailBody.trim() || !selectedApp) {
      if (addToast) addToast('Validation Error', 'Please provide both an email subject and body.', 'warning');
      return;
    }

    const isBorrower = emailRecipientType === 'borrower';
    if (!isBorrower && !activeLender) {
      if (addToast) addToast('Recipient Unavailable', 'No participating underwriter claimed on this placement.', 'error');
      return;
    }

    const targetId = isBorrower
      ? selectedApp.borrowerId || 'usr_borrower_01'
      : activeLender.lenderId;
    const targetName = isBorrower
      ? selectedApp.borrowerName || 'Marcus Vance'
      : activeLender.lenderAlias || 'Institutional Underwriter';
    const targetRole = isBorrower ? 'borrower' : 'lender';
    const convId = isBorrower
      ? `CONV_BORROWER_REP_${selectedApp.id}`
      : `CONV_LENDER_REP_${selectedApp.id}_${targetId}`;

    sendMessage({
      conversationId: convId,
      text: emailBody.trim(),
      applicationId: selectedApp.id,
      receiverRole: targetRole,
      receiverId: targetId,
      receiverName: targetName,
      type: 'email',
      subject: emailSubject.trim()
    });

    if (addToast) {
      addToast(
        'Simulated Email Dispatched',
        `Demo Mode: Email recorded for ${targetName}'s mock correspondence inbox.`,
        'success'
      );
    }

    setEmailSubject('');
    setEmailBody('');
  };

  const handleSendSimulatedSms = (e) => {
    e.preventDefault();
    if (!smsText.trim() || !selectedApp) {
      if (addToast) addToast('Validation Error', 'Please enter a non-empty SMS message.', 'warning');
      return;
    }

    const isBorrower = smsRecipientType === 'borrower';
    if (!isBorrower && !activeLender) {
      if (addToast) addToast('Recipient Unavailable', 'No participating lender mobile device claimed on this placement.', 'error');
      return;
    }

    const targetId = isBorrower
      ? selectedApp.borrowerId || 'usr_borrower_01'
      : activeLender.lenderId;
    const targetName = isBorrower
      ? selectedApp.borrowerName || 'Marcus Vance'
      : activeLender.lenderAlias || 'Institutional Underwriter';
    const targetRole = isBorrower ? 'borrower' : 'lender';
    const convId = isBorrower
      ? `CONV_BORROWER_REP_${selectedApp.id}`
      : `CONV_LENDER_REP_${selectedApp.id}_${targetId}`;

    sendMessage({
      conversationId: convId,
      text: smsText.trim(),
      applicationId: selectedApp.id,
      receiverRole: targetRole,
      receiverId: targetId,
      receiverName: targetName,
      type: 'sms'
    });

    if (addToast) {
      addToast(
        'Simulated SMS Dispatched',
        `Demo Mode: SMS dispatched to ${targetName}'s simulated verified MFA device.`,
        'success'
      );
    }

    setSmsText('');
  };

  // Safe Relay Action
  const handleOpenRelay = (lenderMsg) => {
    setRelaySourceMsg(lenderMsg);
    const rawText = lenderMsg.text || '';
    const sanitizedText = rawText
      .replace(/Apex Horizon Capital LLC/gi, 'Institutional Underwriting Desk')
      .replace(/Apex Horizon Commercial Credit Fund/gi, 'Direct Credit Committee')
      .replace(/Lender #\d+/gi, 'The underwriting team');

    const suggestedDraft = `Underwriter Status Update for Placement ${selectedApp?.id}: The credit committee reviewed your submission. ${sanitizedText}`;
    setRelayDraftText(suggestedDraft);
    setShowRelayModal(true);
  };

  const handleConfirmRelay = () => {
    if (!relayDraftText.trim() || !selectedApp) return;

    sendMessage({
      conversationId: `CONV_BORROWER_REP_${selectedApp.id}`,
      text: relayDraftText.trim(),
      applicationId: selectedApp.id,
      receiverRole: 'borrower',
      receiverId: selectedApp.borrowerId || 'usr_borrower_01',
      receiverName: selectedApp.borrowerName || 'Marcus Vance',
      type: 'chat'
    });

    if (addToast) {
      addToast(
        'Relay Update Dispatched',
        `Sanitized intermediary update delivered to ${selectedApp.borrowerName} without disclosing private lender metadata.`,
        'success'
      );
    }

    setShowRelayModal(false);
    setRelaySourceMsg(null);
    setRelayDraftText('');
  };

  // Share Offer Action
  const handleOpenShareOffer = (offer) => {
    setOfferToShare(offer);
    setShowShareOfferModal(true);
  };

  const handleConfirmShareOffer = () => {
    if (!offerToShare || !selectedApp) return;

    const offerSummaryText = `Formal Term Sheet Issued: Offer #${offerToShare.id} has been posted for $${offerToShare.amount.toLocaleString()} at ${offerToShare.interestRate}% APR (${offerToShare.termMonths} months). Estimated monthly debt service: $${offerToShare.monthlyPayment.toLocaleString()}/mo. You can review the full term sheet in your Offers portal.`;

    sendMessage({
      conversationId: `CONV_BORROWER_REP_${selectedApp.id}`,
      text: offerSummaryText,
      applicationId: selectedApp.id,
      receiverRole: 'borrower',
      receiverId: selectedApp.borrowerId || 'usr_borrower_01',
      receiverName: selectedApp.borrowerName || 'Marcus Vance',
      type: 'chat'
    });

    if (addToast) {
      addToast(
        'Offer Shared with Borrower',
        `Term sheet summary #${offerToShare.id} posted to borrower channel under Rule FR-08.`,
        'success'
      );
    }

    setShowShareOfferModal(false);
    setOfferToShare(null);
  };

  // Dynamic Email Templates
  const applyEmailTemplate = (templateKey) => {
    if (templateKey === 'KYC_DOCS') {
      setEmailSubject(`[Action Required] KYC Verification Documents for Placement ${selectedApp?.id}`);
      setEmailBody(`Dear ${selectedApp?.borrowerName},\n\nOur placement underwriting desk has reviewed your preliminary submission for ${selectedApp?.businessName}. To finalize Investment IQ scoring and expedite lender committee review, please upload the following documents:\n\n1. Most recent 2-year Corporate Tax Returns (complete with schedules)\n2. Past 6 months Business Bank Statements\n3. Equipment Invoices / Collateral schedules\n\nPlease submit these directly through your verification portal.\n\nBest regards,\nElena Rostova\nSenior Placement Specialist\nOAL Network Brokerage Desk`);
    } else if (templateKey === 'PREPAY_WAIVER') {
      setEmailSubject(`[Underwriting Inquiry] Prepayment Covenant Review for Placement ${selectedApp?.id}`);
      setEmailBody(`Hello Underwriting Committee,\n\nThe applicant for placement ${selectedApp?.id} (${selectedApp?.businessName}) has requested consideration regarding the prepayment restriction on offer #${dealOffers[0]?.id || '8801'}.\n\nGiven the borrower's verified Investment IQ of ${selectedApp?.investmentIQ?.total || '154'} and debt-service coverage ratio, can your credit committee consider reducing the restriction clause?\n\nSincerely,\nElena Rostova\nOAL Placement Specialist`);
    } else if (templateKey === 'CLOSING_WINDOW') {
      setEmailSubject(`[SLA Notification] 24–72h Turnaround Window Active for Placement ${selectedApp?.id}`);
      setEmailBody(`Attention Commercial Placement Stakeholders,\n\nDeal reference ${selectedApp?.id} has entered active processing. Under OAL SLA standards, final term sheet acceptances and escrow preparations must be acknowledged within the active 24–72 hour closing turnaround.\n\nPlease review your portal dashboard for outstanding stipulations.\n\nOAL Operations Desk`);
    }
  };

  // Dynamic SMS Templates
  const applySmsTemplate = (templateKey) => {
    if (templateKey === 'TERM_SHEET') {
      setSmsText(`OAL Alert: An institutional term sheet has been posted for placement ${selectedApp?.id}. Review terms in your portal.`);
    } else if (templateKey === 'KYC_UPLOAD') {
      setSmsText(`OAL Notice: Please upload 2-year tax returns to your KYC portal to proceed with underwriter scoring for ${selectedApp?.id}.`);
    } else if (templateKey === 'CLOSING_SLA') {
      setSmsText(`SLA Alert: 24–72h closing turnaround active for placement ${selectedApp?.id}. Prompt acknowledgment required.`);
    }
  };

  if (repApplications.length === 0) {
    return (
      <div className="space-y-4 max-w-[1920px] mx-auto min-w-0">
        <div className="bg-white rounded-xl border border-slate-200/90 px-4 py-3 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#001744] to-[#0070C0] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-heading font-extrabold text-[#002060]">
                OAL LetsWork Portal
              </h1>
              <p className="text-xs text-slate-500">
                Representative Communication Desk • {currentUser?.name || 'Authorized Representative'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            0 Assigned Placements
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[460px]">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-[#0070C0] flex items-center justify-center mb-4 shadow-xs">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            No Assigned Loan Placements
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            There are currently no commercial loan applications assigned to your placement desk. As soon as an Administrator routes an institutional borrower file to your account under Phase 2.4 Lead Distribution, your mediated chat channels, lender bid desks, and safe-relay tools will activate here automatically.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-medium">
              Representative: <strong className="text-slate-800">{currentUser?.name || 'Licensed Rep'}</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Desk Active & Ready for Assignment
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-[1920px] mx-auto min-w-0">
      {/* =========================================================================
          TOP COMPACT HEADER
          ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200/90 px-3.5 sm:px-4 py-2.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#001744] to-[#0070C0] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm sm:text-base font-heading font-extrabold text-[#002060] tracking-tight">
                OAL LetsWork Portal
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0070C0] border border-blue-200 whitespace-nowrap">
                FR-09 Mediated Hub
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hidden md:inline-flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> 24–72h SLA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Placement:{' '}
              <strong className="text-slate-800 font-semibold">
                {selectedApp?.businessName || selectedApp?.borrowerName}
              </strong>{' '}
              <span className="font-mono text-slate-400">({selectedApp?.id})</span> •{' '}
              ${selectedApp?.amount?.toLocaleString()} ({selectedApp?.programName})
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {/* Mobile / Tablet Toggle between Placements List & Communication Workspace */}
          <button
            type="button"
            id="mobile-view-toggle-btn"
            onClick={() => setMobileTab(mobileTab === 'deals' ? 'chat' : 'deals')}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#002060] text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{mobileTab === 'deals' ? 'Open Workdesk' : 'Placements List'}</span>
          </button>

          <button
            type="button"
            id="open-deal-inspector-btn"
            onClick={() => setIsInspectorOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002060] hover:bg-[#001744] text-white text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#FFD200]" />
            <span>View Deal Details</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900 text-blue-200 font-mono">
              {dealOffers.length} {dealOffers.length === 1 ? 'Bid' : 'Bids'}
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN WORKSPACE LAYOUT
          Left: Assigned Placements (Collapsible with 1-click toggle to maximize space)
          Right: Communication Workspace (Chat / Email / SMS / History)
          ========================================================================= */}
      <div className="flex flex-col lg:flex-row gap-3 min-w-0 items-start">
        {/* =======================================================================
            SECTION A: ASSIGNED PLACEMENTS SIDEBAR
            Collapsible state allows Reps on 1280px / 1366px laptops to expand chat width
            ======================================================================= */}
        {isSidebarCollapsed ? (
          /* Collapsed Sidebar Rail */
          <div
            className={`hidden lg:flex w-14 shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-xs flex-col h-[750px] max-h-[calc(100vh-140px)] min-h-[580px] items-center py-3 justify-between ${
              mobileTab === 'deals' ? 'hidden' : 'lg:flex'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                id="expand-placements-sidebar-btn"
                onClick={() => setIsSidebarCollapsed(false)}
                title="Expand Assigned Placements list"
                className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#002060] flex items-center justify-center transition-colors cursor-pointer border border-blue-200 shadow-2xs"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-700">
                {filteredDeals.length}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-bold -rotate-90 whitespace-nowrap tracking-wider uppercase mb-8">
              Placements
            </div>

            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(false)}
              className="p-2 text-slate-400 hover:text-slate-700 transition-colors"
              title="Expand Placements List"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Expanded Placements Sidebar */
          <div
            className={`w-full lg:w-[250px] xl:w-[260px] 2xl:w-[275px] shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col h-[750px] max-h-[calc(100vh-140px)] min-h-[580px] overflow-hidden ${
              mobileTab === 'deals' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header, Search & Collapse Toggle */}
            <div className="p-2.5 sm:p-3 border-b border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#002060]" />
                  <h2 className="text-xs font-bold text-[#002060] uppercase tracking-wider">
                    Assigned Placements
                  </h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-[#002060]">
                    {filteredDeals.length}
                  </span>
                  <button
                    type="button"
                    id="collapse-placements-sidebar-btn"
                    onClick={() => setIsSidebarCollapsed(true)}
                    title="Collapse placements list to maximize conversation space"
                    className="hidden lg:flex p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    <PanelLeftClose className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search deal ID, name..."
                  className="w-full pl-8 pr-6 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0070C0]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Quick Status Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] no-scrollbar">
                {['ALL', 'ACTIVE_OFFERS', 'IN_REVIEW', 'QUALIFIED'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStatusFilter(tab)}
                    className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      statusFilter === tab
                        ? 'bg-[#002060] text-white shadow-2xs'
                        : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab === 'ALL'
                      ? 'All'
                      : tab === 'ACTIVE_OFFERS'
                      ? 'Offers'
                      : tab === 'IN_REVIEW'
                      ? 'In Review'
                      : 'Qualified'}
                  </button>
                ))}
              </div>
            </div>

            {/* Placement Cards List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredDeals.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  <FileText className="w-7 h-7 mx-auto mb-1.5 text-slate-300" />
                  <p className="font-semibold text-slate-600">No placements match</p>
                  <p className="text-[10px] mt-0.5">Try clearing filters.</p>
                </div>
              ) : (
                filteredDeals.map((deal) => {
                  const isSelected = selectedDealId === deal.id;
                  const stats = getDealMessageStats(deal.id);
                  const claimsCount = deal.workingDeals?.claimedLendersCount || 0;

                  return (
                    <button
                      key={deal.id}
                      type="button"
                      onClick={() => {
                        setSelectedDealId(deal.id);
                        setMobileTab('chat');
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex flex-col gap-1 min-w-0 ${
                        isSelected
                          ? 'bg-blue-50/90 border-2 border-[#0070C0] shadow-xs'
                          : 'bg-white hover:bg-slate-50 border border-slate-200/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-mono font-bold text-[#002060]">
                          {deal.id}
                        </span>
                        <StatusBadge status={deal.status} className="text-[9px] px-1.5 py-0" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">
                          {deal.businessName || deal.borrowerName}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate">
                          {deal.borrowerName} • {deal.programName || deal.loanType}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100/70">
                        <span className="font-extrabold text-slate-900 text-xs">
                          ${deal.amount?.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1 text-[9px]">
                          <span className="px-1.5 py-0.2 rounded bg-blue-100 text-[#002060] font-semibold">
                            B: {stats.borrower}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-semibold">
                            L: {stats.lender} ({claimsCount}/3)
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="p-2 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 text-center">
              Elena Rostova • Senior Placement Desk
            </div>
          </div>
        )}

        {/* =======================================================================
            SECTION B: MAIN COMMUNICATION WORKSPACE
            Supports Chat, Email (Demo), SMS (Demo), and History Timeline
            ======================================================================= */}
        <div
          className={`flex-1 min-w-0 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col h-[750px] max-h-[calc(100vh-140px)] min-h-[580px] overflow-hidden ${
            mobileTab === 'chat' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Subheader: Mode Switcher & Channel Controls */}
          <div className="px-3.5 sm:px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 min-w-0">
            {/* Communication Mode Switcher */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs shrink-0">
              <button
                type="button"
                id="comm-mode-chat-btn"
                onClick={() => setCommMode('chat')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  commMode === 'chat'
                    ? 'bg-[#002060] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>

              <button
                type="button"
                id="comm-mode-email-btn"
                onClick={() => setCommMode('email')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  commMode === 'email'
                    ? 'bg-[#0070C0] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email (Demo)</span>
              </button>

              <button
                type="button"
                id="comm-mode-sms-btn"
                onClick={() => setCommMode('sms')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  commMode === 'sms'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>SMS (Demo)</span>
              </button>

              <button
                type="button"
                id="comm-mode-history-btn"
                onClick={() => setCommMode('history')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  commMode === 'history'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="View Unified Communication History"
              >
                <History className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">History</span>
              </button>
            </div>

            {/* Chat Mode Channel Switcher (High-Contrast Segmented Tabs) */}
            {commMode === 'chat' && (
              <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs shrink-0">
                {/* Borrower Channel Tab */}
                <button
                  type="button"
                  id="channel-view-borrower-btn"
                  onClick={() => setChannelViewMode('borrower')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    channelViewMode === 'borrower'
                      ? 'bg-[#0070C0] text-white shadow-2xs ring-1 ring-[#0070C0]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Borrower Channel</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    channelViewMode === 'borrower'
                      ? 'bg-blue-900 text-blue-100'
                      : 'bg-blue-100 text-[#0070C0]'
                  }`}>
                    {borrowerChatMessages.length}
                  </span>
                </button>

                {/* Lender Desk Tab */}
                <button
                  type="button"
                  id="channel-view-lender-btn"
                  onClick={() => setChannelViewMode('lender')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    channelViewMode === 'lender'
                      ? 'bg-[#002060] text-white shadow-2xs ring-1 ring-[#002060]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Lender Desk</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    channelViewMode === 'lender'
                      ? 'bg-blue-950 text-blue-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {lenderChatMessages.length}
                  </span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold hidden md:inline">
                    {participatingLenders.length}/3
                  </span>
                </button>

                {/* Optional Dual Split View — ONLY rendered on wide monitors (>= 1440px) */}
                {canShowDualSplit && (
                  <button
                    type="button"
                    id="channel-view-split-btn"
                    onClick={() => setChannelViewMode('split')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                      channelViewMode === 'split'
                        ? 'bg-[#002060] text-white shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="View Borrower and Lender channels side-by-side (Available on wide desktop displays)"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>Dual View</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ===================================================================
              MODE 1: REAL-TIME CHAT MODE (WITH MULTI-LENDER ISOLATION)
              - Standard Laptops & Tablets (< 1440px): Shows ONE focused conversation at a time
                (eliminating the confusing, cramped vertical stacking)
              - Large Desktops (>= 1440px): When 'split' is chosen, renders side-by-side columns
              =================================================================== */}
          {commMode === 'chat' && (
            <div className="flex-1 overflow-hidden min-w-0">
              <div
                className={`h-full min-w-0 overflow-hidden ${
                  channelViewMode === 'split' && canShowDualSplit
                    ? 'grid grid-cols-2 divide-x divide-slate-200'
                    : 'flex flex-col'
                }`}
              >
                {/* -------------------------------------------------------------
                    CHANNEL 1: BORROWER CHANNEL
                    ------------------------------------------------------------- */}
                <div
                  className={`flex flex-col h-full overflow-hidden min-w-0 ${
                    channelViewMode === 'lender' && !(channelViewMode === 'split' && canShowDualSplit)
                      ? 'hidden'
                      : 'flex'
                  }`}
                >
                  {/* Channel Header */}
                  <div className="p-3 bg-gradient-to-r from-blue-50/80 to-sky-50/80 border-b border-blue-100 flex items-center justify-between gap-2 shrink-0 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#0070C0] text-white flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-[#002060] flex items-center gap-1.5 truncate">
                          <span>Borrower Channel</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-200 text-blue-900 font-bold shrink-0">
                            {borrowerChatMessages.length} Messages
                          </span>
                        </h3>
                        <p className="text-[10px] text-slate-600 truncate">
                          {selectedApp?.borrowerName} • Verified Applicant Line
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                      Private Bridge
                    </span>
                  </div>

                  <div className="px-3 py-1 bg-amber-50/70 border-b border-amber-100 text-[10px] text-amber-900 flex items-center gap-1.5 shrink-0">
                    <Lock className="w-3 h-3 text-amber-700 shrink-0" />
                    <span className="truncate">Lender company names and internal underwriting notes strictly hidden.</span>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-slate-50/50 min-w-0">
                    {borrowerChatMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                        <MessageSquare className="w-8 h-8 mb-1.5 text-slate-300" />
                        <p className="text-xs font-semibold text-slate-600">No applicant messages yet</p>
                        <p className="text-[10px] max-w-xs mt-0.5">
                          Send a message to update {selectedApp?.borrowerName} on placement status.
                        </p>
                      </div>
                    ) : (
                      borrowerChatMessages.map((msg) => {
                        const isRep = msg.senderRole === 'rep';
                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col max-w-[85%] ${
                              isRep ? 'ml-auto items-end' : 'mr-auto items-start'
                            }`}
                          >
                            <div className="flex items-center gap-1 mb-0.5 px-1">
                              <span className="text-[10px] font-bold text-slate-700 truncate max-w-[180px]">
                                {isRep ? 'Elena Rostova (You)' : `${selectedApp?.borrowerName} (Applicant)`}
                              </span>
                              <span className="text-[8px] text-slate-400 shrink-0">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <div
                              className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs break-words whitespace-pre-wrap ${
                                isRep
                                  ? 'bg-[#0070C0] text-white rounded-tr-none'
                                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={borrowerChatEndRef} />
                  </div>

                  {/* Quick Prompts */}
                  <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[10px] shrink-0 no-scrollbar">
                    <span className="text-slate-400 text-[9px] shrink-0 font-medium">Draft:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setBorrowerInputText(
                          `Hi ${selectedApp?.borrowerName}, participating underwriters are reviewing your file. Please confirm if additional equipment invoices are ready.`
                        )
                      }
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap cursor-pointer"
                    >
                      Request KYC Invoices
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBorrowerInputText(
                          `Good news! Two institutional lenders have claimed working deal slots on your placement.`
                        )
                      }
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap cursor-pointer"
                    >
                      Working Deal Notice
                    </button>
                  </div>

                  {/* Composer */}
                  <form
                    onSubmit={handleSendToBorrower}
                    className="p-2.5 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0 min-w-0"
                  >
                    <input
                      type="text"
                      id="borrower-chat-input"
                      value={borrowerInputText}
                      onChange={(e) => setBorrowerInputText(e.target.value)}
                      placeholder={`Message ${selectedApp?.borrowerName} (Borrower)...`}
                      className="flex-1 min-w-0 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0070C0]"
                    />
                    <button
                      type="submit"
                      id="borrower-chat-send-btn"
                      disabled={!borrowerInputText.trim()}
                      className="p-2 bg-[#0070C0] hover:bg-[#005a9e] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* -------------------------------------------------------------
                    CHANNEL 2: LENDER CHANNEL (WITH MULTI-LENDER PRIVATE DESKS)
                    ------------------------------------------------------------- */}
                <div
                  className={`flex flex-col h-full overflow-hidden min-w-0 ${
                    channelViewMode === 'borrower' && !(channelViewMode === 'split' && canShowDualSplit)
                      ? 'hidden'
                      : 'flex'
                  }`}
                >
                  {/* Channel Header */}
                  <div className="p-3 bg-gradient-to-r from-slate-100 to-slate-200/80 border-b border-slate-200 flex flex-col gap-2 shrink-0 min-w-0">
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-[#002060] text-white flex items-center justify-center shrink-0">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs font-bold text-[#002060] flex items-center gap-1.5 truncate">
                            <span>Institutional Underwriter Desk</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-300 text-slate-900 font-bold shrink-0">
                              {participatingLenders.length}/3 Claims
                            </span>
                          </h3>
                          <p className="text-[10px] text-slate-600 truncate">
                            {activeLender
                              ? `${getLenderFullName(activeLender)} • Private Channel`
                              : 'No Active Underwriter Claim'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded shrink-0">
                        FR-08 Governed
                      </span>
                    </div>

                    {/* COMPACT MULTI-LENDER SELECTOR TABS & WORKING DEAL SLOTS */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-300/60 no-scrollbar min-w-0">
                      <span className="text-[10px] text-slate-500 font-bold shrink-0">
                        Lender Desks:
                      </span>
                      {participatingLenders.length === 0 ? (
                        <span className="text-[11px] text-slate-400 italic">
                          No claims yet
                        </span>
                      ) : (
                        participatingLenders.map((claim) => {
                          const isSelected = activeLender?.lenderId === claim.lenderId;
                          const msgCount = getLenderMessageCount(claim.lenderId);
                          const shortLabel = getLenderShortLabel(claim);
                          const fullName = getLenderFullName(claim);

                          return (
                            <button
                              key={claim.lenderId}
                              type="button"
                              onClick={() => setSelectedLenderId(claim.lenderId)}
                              title={fullName}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                                isSelected
                                  ? 'bg-[#002060] text-white shadow-2xs ring-1 ring-[#002060]'
                                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300/80'
                              }`}
                            >
                              <span>{shortLabel}</span>
                              <span
                                className={`text-[9px] px-1 py-0.2 rounded-full font-bold ${
                                  isSelected
                                    ? 'bg-blue-900 text-blue-200'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {msgCount}
                              </span>
                              {claim.status && (
                                <span className={`text-[8px] px-1 py-0.2 rounded uppercase font-semibold ${
                                  claim.status === 'ACTIVE_OFFER'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {claim.status === 'ACTIVE_OFFER' ? 'Offer' : 'Review'}
                                </span>
                              )}
                            </button>
                          );
                        })
                      )}

                      {/* Remaining Slot Indicators confirming Rule FR-08 (Max 3 Lenders) */}
                      {Array.from({ length: Math.max(0, 3 - participatingLenders.length) }).map((_, idx) => (
                        <span
                          key={`slot-${idx}`}
                          className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-dashed border-slate-300 whitespace-nowrap shrink-0"
                          title="Rule FR-08: Maximum 3 simultaneous lender working deal claims allowed per placement"
                        >
                          Slot {participatingLenders.length + idx + 1}: Open
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-3 py-1 bg-slate-100 border-b border-slate-200 text-[10px] text-slate-600 flex items-center gap-1.5 shrink-0">
                    <Lock className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">
                      Competing lenders are strictly isolated and cannot view each other's messages.
                    </span>
                  </div>

                  {/* Message Stream */}
                  <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-slate-50/50 min-w-0">
                    {participatingLenders.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                        <Building2 className="w-9 h-9 mb-2 text-slate-300" />
                        <p className="text-xs font-bold text-slate-700">No Participating Lenders Claimed</p>
                        <p className="text-[11px] max-w-sm mt-1 text-slate-500 leading-relaxed">
                          Under Rule FR-08, up to 3 institutional lenders can claim active working deals on this qualified application. Individual private channels will appear automatically when claims are registered.
                        </p>
                      </div>
                    ) : lenderChatMessages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                        <Building2 className="w-8 h-8 mb-1.5 text-slate-300" />
                        <p className="text-xs font-semibold text-slate-600">
                          No messages with {getLenderShortLabel(activeLender)} yet
                        </p>
                        <p className="text-[10px] max-w-xs mt-0.5">
                          Send an inquiry to initiate private mediated underwriting discussions.
                        </p>
                      </div>
                    ) : (
                      lenderChatMessages.map((msg) => {
                        const isRep = msg.senderRole === 'rep';

                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col max-w-[85%] ${
                              isRep ? 'ml-auto items-end' : 'mr-auto items-start'
                            }`}
                          >
                            <div className="flex items-center gap-1 mb-0.5 px-1">
                              <span className="text-[10px] font-bold text-slate-700 truncate max-w-[180px]">
                                {isRep
                                  ? 'Elena Rostova (You)'
                                  : msg.senderName || getLenderShortLabel(activeLender)}
                              </span>
                              <span className="text-[8px] text-slate-400 shrink-0">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <div
                              className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs break-words whitespace-pre-wrap ${
                                isRep
                                  ? 'bg-[#002060] text-slate-100 rounded-tr-none border border-slate-700'
                                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                              }`}
                            >
                              {msg.text}

                              {/* Relay Action Button */}
                              {!isRep && (
                                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenRelay(msg)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0070C0] text-[10px] font-bold transition-colors cursor-pointer"
                                  >
                                    <Share2 className="w-3 h-3" />
                                    <span>Relay Update to Borrower</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={lenderChatEndRef} />
                  </div>

                  {/* Quick Prompts */}
                  <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[10px] shrink-0 no-scrollbar">
                    <span className="text-slate-400 text-[9px] shrink-0 font-medium">Draft:</span>
                    <button
                      type="button"
                      disabled={!activeLender}
                      onClick={() =>
                        setLenderInputText(
                          `Hello Underwriting. Borrower is requesting consideration regarding the prepayment restriction. Can the committee evaluate a 6-month compromise?`
                        )
                      }
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      Prepayment Inquiry
                    </button>
                    <button
                      type="button"
                      disabled={!activeLender}
                      onClick={() =>
                        setLenderInputText(
                          `Confirming that updated 2-year tax returns and KYC verification are fully verified for placement ${selectedApp?.id}.`
                        )
                      }
                      className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      Confirm Tax Returns
                    </button>
                  </div>

                  {/* Composer */}
                  <form
                    onSubmit={handleSendToLender}
                    className="p-2.5 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0 min-w-0"
                  >
                    <input
                      type="text"
                      id="lender-chat-input"
                      disabled={!activeLender}
                      value={lenderInputText}
                      onChange={(e) => setLenderInputText(e.target.value)}
                      placeholder={
                        activeLender
                          ? `Message ${getLenderShortLabel(activeLender)} privately...`
                          : 'No participating lenders claimed on this placement...'
                      }
                      className="flex-1 min-w-0 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002060] disabled:bg-slate-100"
                    />
                    <button
                      type="submit"
                      id="lender-chat-send-btn"
                      disabled={!lenderInputText.trim() || !activeLender}
                      className="p-2 bg-[#002060] hover:bg-[#001744] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              MODE 2: SIMULATED EMAIL CORRESPONDENCE WORKSPACE
              =================================================================== */}
          {commMode === 'email' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50 space-y-4 min-w-0">
              {/* Notice Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
                <Mail className="w-4 h-4 text-[#0070C0] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Demo Mode Notice:</strong> Email correspondence is simulated locally in frontend state. No real outbound email is dispatched to external mail servers.
                </div>
              </div>

              {/* Compose Workspace Card */}
              <form
                onSubmit={handleSendSimulatedEmail}
                className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3.5 min-w-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-[#002060] uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0070C0]" />
                    Compose Business Email
                  </h3>

                  {/* Recipient Role Toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                    <button
                      type="button"
                      id="email-to-borrower-btn"
                      onClick={() => setEmailRecipientType('borrower')}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        emailRecipientType === 'borrower'
                          ? 'bg-[#0070C0] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      To Borrower
                    </button>
                    <button
                      type="button"
                      id="email-to-lender-btn"
                      onClick={() => setEmailRecipientType('lender')}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        emailRecipientType === 'lender'
                          ? 'bg-[#002060] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      To Participating Lender
                    </button>
                  </div>
                </div>

                {/* Recipient Validation Warning if Lender Mode is chosen but no claim exists */}
                {emailRecipientType === 'lender' && !activeLender && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>No Lender Claim Active:</strong> There are no participating lenders claimed on placement {selectedApp?.id}. Sending to underwriter is disabled.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailRecipientType('borrower')}
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300 text-[10px] shrink-0 cursor-pointer"
                    >
                      Switch to Borrower
                    </button>
                  </div>
                )}

                {/* Email Meta Fields */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-slate-500 font-semibold shrink-0">From:</span>
                    <span className="font-mono text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200 flex-1 truncate">
                      Elena Rostova &lt;elena.rostova@oalnetwork.com&gt; (OAL Representative Desk)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-16 text-slate-500 font-semibold shrink-0">To:</span>
                    <span className="font-mono text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200 flex-1 truncate">
                      {emailRecipientType === 'borrower'
                        ? `${selectedApp?.borrowerName} <marcus@blueharborseafood.com>`
                        : activeLender
                        ? `${getLenderFullName(activeLender)} <underwriting@creditfund.com>`
                        : 'No Active Lender Claimed on Placement'}
                    </span>
                  </div>

                  {/* Dynamic Subject & Template presets */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="w-16 text-slate-500 font-semibold shrink-0">Templates:</span>
                    <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] no-scrollbar flex-1">
                      <button
                        type="button"
                        onClick={() => applyEmailTemplate('KYC_DOCS')}
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer"
                      >
                        KYC Request ({selectedApp?.id})
                      </button>
                      <button
                        type="button"
                        onClick={() => applyEmailTemplate('PREPAY_WAIVER')}
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer"
                      >
                        Prepayment Review ({selectedApp?.id})
                      </button>
                      <button
                        type="button"
                        onClick={() => applyEmailTemplate('CLOSING_WINDOW')}
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer"
                      >
                        24–72h Closing Window SLA
                      </button>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      id="email-subject-input"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Subject: Enter business correspondence title..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0070C0]"
                    />
                  </div>
                </div>

                {/* Email Body */}
                <div>
                  <textarea
                    rows={6}
                    id="email-body-input"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Compose formal correspondence body..."
                    className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0070C0] font-sans leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] truncate mr-2">
                    <Paperclip className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Auto-attached: OAL_Placement_Brief_{selectedApp?.id}.pdf</span>
                  </div>

                  <button
                    type="submit"
                    id="email-send-btn"
                    disabled={
                      !emailSubject.trim() ||
                      !emailBody.trim() ||
                      (emailRecipientType === 'lender' && !activeLender)
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0070C0] hover:bg-[#005a9e] disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Simulated Email</span>
                  </button>
                </div>
              </form>

              {/* Email Sent History for this deal */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#002060] uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-slate-500" />
                  Sent Email Correspondence ({dealEmailMessages.length})
                </h4>

                {dealEmailMessages.length === 0 ? (
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
                    No simulated emails dispatched for this placement yet.
                  </div>
                ) : (
                  dealEmailMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1.5 shadow-2xs text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <strong className="text-slate-900 block font-bold">
                            {msg.subject || 'No Subject'}
                          </strong>
                          <span className="text-[10px] text-slate-500">
                            To: {msg.receiverName} ({msg.receiverRole}) •{' '}
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          SIMULATED_SENT
                        </span>
                      </div>
                      <p className="text-slate-700 text-[11px] whitespace-pre-wrap leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {msg.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ===================================================================
              MODE 3: SIMULATED DIRECT SMS DESK
              =================================================================== */}
          {commMode === 'sms' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50 space-y-4 min-w-0">
              {/* Notice Banner */}
              <div className="bg-slate-900 text-white rounded-xl p-3 flex items-start gap-2.5 text-xs shadow-xs">
                <Smartphone className="w-4 h-4 text-[#FFD200] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-[#FFD200]">Demo Mode Notice:</strong> Direct SMS is simulated locally. No carrier delivery or third-party SMS gateway is contacted. Private phone numbers remain masked.
                </div>
              </div>

              {/* SMS Compose Workspace Card */}
              <form
                onSubmit={handleSendSimulatedSms}
                className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3.5 min-w-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-[#002060] uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#002060]" />
                    Direct Intermediary SMS
                  </h3>

                  {/* Recipient Role Toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                    <button
                      type="button"
                      id="sms-to-borrower-btn"
                      onClick={() => setSmsRecipientType('borrower')}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        smsRecipientType === 'borrower'
                          ? 'bg-[#0070C0] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      To Borrower Device
                    </button>
                    <button
                      type="button"
                      id="sms-to-lender-btn"
                      onClick={() => setSmsRecipientType('lender')}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        smsRecipientType === 'lender'
                          ? 'bg-[#002060] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      To Lender Device
                    </button>
                  </div>
                </div>

                {/* Recipient Validation Warning if Lender Mode is chosen but no claim exists */}
                {smsRecipientType === 'lender' && !activeLender && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>No Lender Mobile Route:</strong> There are no participating lenders claimed on placement {selectedApp?.id}. SMS dispatch is disabled.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSmsRecipientType('borrower')}
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300 text-[10px] shrink-0 cursor-pointer"
                    >
                      Switch to Borrower
                    </button>
                  </div>
                )}

                {/* Recipient Representation */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-semibold">Recipient:</span>
                    <strong className="text-slate-800">
                      {smsRecipientType === 'borrower'
                        ? `${selectedApp?.borrowerName} (Verified Borrower)`
                        : activeLender
                        ? `${getLenderFullName(activeLender)} (Lead Underwriter)`
                        : 'No Active Lender Claim'}
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Routing: +1 (555) ***-{selectedApp?.id?.slice(-4) || '8921'} (Masked)
                  </span>
                </div>

                {/* Quick SMS Prompt Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
                  <span className="text-slate-400 font-medium shrink-0">Templates:</span>
                  <button
                    type="button"
                    onClick={() => applySmsTemplate('TERM_SHEET')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer"
                  >
                    Term Sheet Alert ({selectedApp?.id})
                  </button>
                  <button
                    type="button"
                    onClick={() => applySmsTemplate('KYC_UPLOAD')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer"
                  >
                    KYC Upload Reminder ({selectedApp?.id})
                  </button>
                  <button
                    type="button"
                    onClick={() => applySmsTemplate('CLOSING_SLA')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer"
                  >
                    24h Closing Alert ({selectedApp?.id})
                  </button>
                </div>

                {/* Textarea with Character Counter */}
                <div>
                  <textarea
                    rows={4}
                    id="sms-text-input"
                    value={smsText}
                    maxLength={320}
                    onChange={(e) => setSmsText(e.target.value)}
                    placeholder="Enter short text message (max 320 characters)..."
                    className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#002060] leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>
                      {smsText.length} / 160 characters •{' '}
                      <strong>{Math.ceil(smsText.length / 160) || 1} SMS Segment(s)</strong>
                    </span>
                    <span className="text-[10px] text-slate-400">Carrier standard simulated</span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    id="sms-send-btn"
                    disabled={
                      !smsText.trim() ||
                      (smsRecipientType === 'lender' && !activeLender)
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Simulated SMS</span>
                  </button>
                </div>
              </form>

              {/* SMS Sent History */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#002060] uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-slate-500" />
                  Sent SMS Records ({dealSmsMessages.length})
                </h4>

                {dealSmsMessages.length === 0 ? (
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
                    No simulated SMS records for this placement yet.
                  </div>
                ) : (
                  dealSmsMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white rounded-xl border border-slate-200 p-3 space-y-1 shadow-2xs text-xs flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-bold text-slate-800">{msg.receiverName}</span>
                          <span className="text-[9px] text-slate-400">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-700 text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100">
                          "{msg.text}"
                        </p>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                        SIMULATED_DELIVERED
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ===================================================================
              MODE 4: UNIFIED COMMUNICATION AUDIT TIMELINE
              =================================================================== */}
          {commMode === 'history' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50 space-y-4 min-w-0">
              {/* Header Card with Filter Buttons */}
              <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                <div>
                  <h3 className="text-xs font-bold text-[#002060] uppercase tracking-wider flex items-center gap-1.5">
                    <History className="w-4 h-4 text-amber-600" />
                    Unified Communication Audit Timeline
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Placement {selectedApp?.id} • Chronological multi-channel records
                  </p>
                </div>

                {/* Filter Chips with Real Counts */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                  {[
                    { id: 'ALL', label: 'All', count: dealMessages.length },
                    {
                      id: 'CHAT',
                      label: 'Chat',
                      count: dealMessages.filter((m) => m.type === 'chat' || !m.type).length
                    },
                    {
                      id: 'EMAIL',
                      label: 'Email',
                      count: dealEmailMessages.length
                    },
                    {
                      id: 'SMS',
                      label: 'SMS',
                      count: dealSmsMessages.length
                    }
                  ].map((filterTab) => (
                    <button
                      key={filterTab.id}
                      type="button"
                      onClick={() => setHistoryTypeFilter(filterTab.id)}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                        historyTypeFilter === filterTab.id
                          ? 'bg-[#002060] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{filterTab.label}</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded-full font-bold ${
                        historyTypeFilter === filterTab.id
                          ? 'bg-blue-900 text-blue-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {filterTab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline List or Professional Empty State */}
              {(() => {
                const filteredHistory = dealMessages.filter((m) => {
                  if (historyTypeFilter === 'ALL') return true;
                  if (historyTypeFilter === 'CHAT') return m.type === 'chat' || !m.type;
                  if (historyTypeFilter === 'EMAIL') return m.type === 'email';
                  if (historyTypeFilter === 'SMS') return m.type === 'sms';
                  return true;
                });

                if (filteredHistory.length === 0) {
                  return (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-2xs max-w-lg mx-auto my-6">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-2xs">
                        <History className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#002060]">
                          No Communication Records Yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                          No logged interactions match the filter <strong className="text-slate-700">"{historyTypeFilter}"</strong> for placement <strong className="font-mono text-slate-700">{selectedApp?.id}</strong>.
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1.5 max-w-sm mx-auto">
                          Dispatched chat messages, simulated emails, and MFA SMS notifications will appear here automatically in full audit order.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCommMode('chat')}
                          className="px-3.5 py-2 rounded-xl bg-[#002060] hover:bg-[#001744] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Open Chat</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCommMode('email')}
                          className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0070C0] text-xs font-bold border border-blue-200 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Compose Email</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCommMode('sms')}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Send Direct SMS</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="space-y-2.5">
                    {filteredHistory.map((m) => {
                      const mType = m.type || 'chat';

                      return (
                        <div
                          key={m.id}
                          className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1.5 shadow-2xs text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                  mType === 'email'
                                    ? 'bg-blue-50 text-[#0070C0] border-blue-200'
                                    : mType === 'sms'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                {mType}
                              </span>
                              <span className="font-bold text-slate-800">
                                {m.senderName} &rarr; {m.receiverName}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                ({m.applicationId})
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {new Date(m.timestamp).toLocaleString()}
                            </span>
                          </div>

                          {m.subject && (
                            <div className="font-semibold text-slate-900 text-xs">
                              Subject: {m.subject}
                            </div>
                          )}

                          <p className="text-slate-600 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap leading-relaxed">
                            {m.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          COLLAPSIBLE DEAL INSPECTOR SLIDE-OVER DRAWER
          Closed by default. Opens on clicking "View Deal Details"
          ========================================================================= */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity cursor-pointer"
            onClick={() => setIsInspectorOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#002060] text-white flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#FFD200]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#002060]">
                      Deal Inspector & Audit
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {selectedApp?.id} • FR-08 Governed View
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-amber-700" />
                    View-Only
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsInspectorOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {/* Application Details Summary */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Application Reference:</span>
                    <span className="font-mono font-bold text-[#002060]">
                      {selectedApp?.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Applicant Business:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedApp?.businessName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Primary Contact:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedApp?.borrowerName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Loan Program:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedApp?.programName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Requested Amount:</span>
                    <span className="font-extrabold text-base text-[#002060]">
                      ${selectedApp?.amount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Marketplace Status:</span>
                    <StatusBadge status={selectedApp?.status} className="text-[10px]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Monthly Cash Flow:</span>
                    <span className="font-semibold text-emerald-700">
                      ${selectedApp?.monthlyCashFlow?.toLocaleString()}/mo
                    </span>
                  </div>
                </div>

                {/* Investment IQ 180-Point Meter */}
                <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-xl p-3.5 border border-blue-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#002060] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#0070C0]" />
                      Investment IQ Score
                    </span>
                    <span className="font-extrabold text-lg text-[#002060]">
                      {selectedApp?.investmentIQ?.total || 'N/A'}{' '}
                      <span className="text-xs text-slate-500 font-normal">/ 180</span>
                    </span>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0070C0] to-emerald-500 transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            ((selectedApp?.investmentIQ?.total || 0) / 180) * 100
                          )
                        )}%`
                      }}
                    />
                  </div>

                  {selectedApp?.investmentIQ?.breakdown && (
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="bg-white/80 p-2 rounded-lg border border-blue-100">
                        <span className="text-slate-500 block text-[10px]">Credit History:</span>
                        <strong className="text-slate-800">
                          {selectedApp.investmentIQ.breakdown.creditHistory}/70
                        </strong>
                      </div>
                      <div className="bg-white/80 p-2 rounded-lg border border-blue-100">
                        <span className="text-slate-500 block text-[10px]">Cash Flow:</span>
                        <strong className="text-slate-800">
                          {selectedApp.investmentIQ.breakdown.cashFlow}/50
                        </strong>
                      </div>
                      <div className="bg-white/80 p-2 rounded-lg border border-blue-100">
                        <span className="text-slate-500 block text-[10px]">Collateral:</span>
                        <strong className="text-slate-800">
                          {selectedApp.investmentIQ.breakdown.collateral}/30
                        </strong>
                      </div>
                      <div className="bg-white/80 p-2 rounded-lg border border-blue-100">
                        <span className="text-slate-500 block text-[10px]">Business Plan:</span>
                        <strong className="text-slate-800">
                          {selectedApp.investmentIQ.breakdown.businessPlan}/20
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3-Lender Working Deals Pool (Rule FR-08) */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">
                      3-Lender Working Deals Pool
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      {selectedApp?.workingDeals?.claimedLendersCount || 0} /{' '}
                      {selectedApp?.workingDeals?.maxSlots || 3} Claimed
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {(selectedApp?.workingDeals?.claims || []).length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic">
                        No institutional lenders have claimed working deal slots yet.
                      </p>
                    ) : (
                      selectedApp.workingDeals.claims.map((claim, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-slate-800 block truncate">
                              {getLenderFullName(claim)}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Claimed: {new Date(claim.claimedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <StatusBadge status={claim.status} className="text-[9px]" />
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Available Lender Term Sheets (Strictly View-Only) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">
                      Lender Term Sheets ({dealOffers.length})
                    </span>
                    <span className="text-[9px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      FR-08 Audit
                    </span>
                  </div>

                  {dealOffers.length === 0 ? (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
                      No term sheets issued for this application yet.
                    </div>
                  ) : (
                    dealOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className="bg-white rounded-xl p-3.5 border border-slate-200 space-y-2.5 shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#002060]">
                              {offer.id}
                            </span>
                            <p className="text-xs font-semibold text-slate-800">
                              {offer.lenderAlias || 'Participating Lender'}
                            </p>
                          </div>
                          <StatusBadge status={offer.status} className="text-[9px]" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Amount:</span>
                            <strong className="text-slate-900">
                              ${offer.amount.toLocaleString()}
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Rate:</span>
                            <strong className="text-slate-900">
                              {offer.interestRate}% APR
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Term:</span>
                            <strong className="text-slate-900">{offer.termMonths} Mo</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Payment:</span>
                            <strong className="text-emerald-700">
                              ${offer.monthlyPayment.toLocaleString()}/mo
                            </strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenShareOffer(offer)}
                          className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#0070C0] text-xs font-bold rounded-lg border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share Summary with Borrower</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Fiduciary Notice */}
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                  <p className="font-semibold flex items-center gap-1 mb-0.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    Doc 1 Mandate — View-Only Governance:
                  </p>
                  Representatives cannot edit interest rates, loan terms, or approval decisions formulated by institutional underwriters.
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-3 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-400 text-center">
                OAL Network Placement Governance • ID: REP-SEC-2026
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: SAFE RELAY REVIEW & SANITIZE
          ========================================================================= */}
      {showRelayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0070C0] text-white flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#002060]">
                    Relay Update to Borrower
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Mandatory Intermediary Review (Rule FR-09)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRelayModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Original Underwriter Note (Confidential):
              </span>
              <p className="text-slate-700 italic">{relaySourceMsg?.text}</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 flex items-start gap-2">
              <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Compliance Pre-Filter:</strong> Lender names and internal covenants have been scrubbed. Review and adjust the draft below before dispatching to {selectedApp?.borrowerName}.
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Borrower-Facing Message Draft:
              </label>
              <textarea
                rows={4}
                value={relayDraftText}
                onChange={(e) => setRelayDraftText(e.target.value)}
                className="w-full p-3 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowRelayModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRelay}
                disabled={!relayDraftText.trim()}
                className="px-4 py-2 text-xs font-bold bg-[#0070C0] hover:bg-[#005a9e] disabled:bg-slate-300 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Send to Borrower</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: SHARE TERM SHEET SUMMARY WITH BORROWER
          ========================================================================= */}
      {showShareOfferModal && offerToShare && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#002060]">
                    Share Term Sheet Summary
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Deliver Offer #{offerToShare.id} to Borrower Channel
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowShareOfferModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Lender:</span>
                <span className="font-semibold text-slate-800">
                  {offerToShare.lenderAlias || 'Participating Lender'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Loan Amount:</span>
                <strong className="text-slate-900">${offerToShare.amount.toLocaleString()}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Interest Rate:</span>
                <span className="font-semibold text-slate-800">{offerToShare.interestRate}% APR</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Amortization:</span>
                <span className="font-semibold text-slate-800">{offerToShare.termMonths} Months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Est. Monthly Debt:</span>
                <strong className="text-emerald-700">
                  ${offerToShare.monthlyPayment.toLocaleString()}/mo
                </strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Confirming will generate a summary term sheet bulletin directly inside the Borrower Channel for {selectedApp?.borrowerName}.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowShareOfferModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmShareOffer}
                className="px-4 py-2 text-xs font-bold bg-[#0070C0] hover:bg-[#005a9e] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm & Post Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
