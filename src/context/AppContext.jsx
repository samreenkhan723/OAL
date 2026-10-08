import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_APPLICATIONS,
  INITIAL_OFFERS,
  INITIAL_DOCUMENTS,
  INITIAL_MESSAGES,
  INITIAL_TICKETS,
  INITIAL_KB_ARTICLES,
  INITIAL_AUDIT_LOGS,
  INITIAL_NETWORK_ACTIVITY
} from '../data/initialData';
import {
  MOCK_USERS,
  authenticateMockUser,
  findMockUserByEmail
} from '../data/mockUsers';

const AppContext = createContext();

const GUEST_USER = {
  id: 'guest',
  name: 'Guest User',
  email: '',
  role: 'borrower',
  company: '',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const AppProvider = ({ children }) => {
  // Authentication state (Mock frontend session via React state + localStorage)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('oal_is_authenticated') === 'true';
  });

  const [activeUser, setActiveUser] = useState(() => {
    const isAuth = localStorage.getItem('oal_is_authenticated') === 'true';
    if (!isAuth) return null;
    const saved = localStorage.getItem('oal_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    const savedRole = localStorage.getItem('oal_active_role') || 'borrower';
    return MOCK_USERS.find(u => u.role === savedRole) || MOCK_USERS[0];
  });

  // Active Role
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('oal_active_role') || 'borrower';
  });

  // Data collections with localStorage persistence
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('oal_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('oal_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('oal_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('oal_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('oal_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [kbArticles, setKbArticles] = useState(() => {
    const saved = localStorage.getItem('oal_kb_articles');
    return saved ? JSON.parse(saved) : INITIAL_KB_ARTICLES;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('oal_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [networkActivity, setNetworkActivity] = useState(() => {
    const saved = localStorage.getItem('oal_network_activity');
    return saved ? JSON.parse(saved) : INITIAL_NETWORK_ACTIVITY;
  });

  // In-app toasts
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('oal_active_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('oal_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('oal_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('oal_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('oal_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('oal_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Toast dispatch helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Login with mock credentials (FR-01 Frontend-only Mock Auth)
  const login = (email, password) => {
    const res = authenticateMockUser(email, password);
    if (res.success) {
      setIsAuthenticated(true);
      setActiveUser(res.user);
      setCurrentRole(res.user.role);
      localStorage.setItem('oal_is_authenticated', 'true');
      localStorage.setItem('oal_current_user', JSON.stringify(res.user));
      localStorage.setItem('oal_active_role', res.user.role);
      addToast('Welcome Back', `Signed in as ${res.user.name} (${res.user.role.toUpperCase()})`, 'success');
      return { success: true, user: res.user };
    }
    addToast('Sign In Failed', res.error, 'error');
    return { success: false, error: res.error };
  };

  // Logout - Clears mock session & state
  const logout = () => {
    setIsAuthenticated(false);
    setActiveUser(null);
    setCurrentRole('borrower');
    localStorage.removeItem('oal_is_authenticated');
    localStorage.removeItem('oal_current_user');
    localStorage.removeItem('oal_active_role');
    addToast('Signed Out', 'You have been signed out of your session.', 'info');
  };

  // Switch Active User / Role (Internal prototype helper)
  const switchRole = (role) => {
    const matched = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setIsAuthenticated(true);
    setActiveUser(matched);
    setCurrentRole(matched.role);
    localStorage.setItem('oal_is_authenticated', 'true');
    localStorage.setItem('oal_current_user', JSON.stringify(matched));
    localStorage.setItem('oal_active_role', matched.role);
    addToast('Role Switched', `Active profile: ${matched.name} (${matched.role.toUpperCase()})`, 'info');
  };

  // Active user object with safe guest fallback to prevent runtime crashes
  const currentUser = activeUser || (isAuthenticated ? (MOCK_USERS.find(u => u.role === currentRole) || MOCK_USERS[0]) : GUEST_USER);

  // 1. Create New Loan Application
  const createApplication = (formData) => {
    const newId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Calculate Investment IQ based on formData inputs (0-180 points)
    // Credit (max 70), Business Plan (max 20), Cash Flow (max 50), Collateral (max 30), Risk (max 10)
    const creditScore = Number(formData.creditScore) || 710;
    const creditHistoryPts = Math.min(70, Math.max(25, Math.round(((creditScore - 580) / 270) * 70)));
    const businessPlanPts = Math.min(20, Math.round((Number(formData.yearsInBusiness) > 3 ? 18 : 14)));
    const annualRev = Number(formData.annualRevenue) || 500000;
    const cashFlowPts = Math.min(50, Math.max(20, Math.round((annualRev / 1500000) * 50)));
    const collateralPts = formData.collateralType ? 24 : 15;
    const riskPts = 8;
    const totalScore = creditHistoryPts + businessPlanPts + cashFlowPts + collateralPts + riskPts;

    const newApp = {
      id: newId,
      borrowerId: currentUser.id,
      borrowerName: currentUser.name,
      businessName: formData.businessName || 'New Commercial Enterprise',
      loanType: formData.loanType,
      programName: formData.programName || 'Commercial Loan',
      amount: Number(formData.amount) || 250000,
      loanPurpose: formData.loanPurpose || 'Working capital and operational expansion',
      useOfFunds: formData.useOfFunds || 'Equipment and working capital',
      status: 'SUBMITTED',
      investmentIQ: {
        total: totalScore,
        max: 180,
        breakdown: {
          creditHistory: creditHistoryPts,
          businessPlan: businessPlanPts,
          cashFlow: cashFlowPts,
          collateral: collateralPts,
          riskAssessment: riskPts
        },
        assessedAt: new Date().toISOString(),
        version: 'v2.4-Standard',
        explanation: 'Initial automated assessment calculated from verified financial inputs and credit rating.'
      },
      workingDeals: {
        claimedLendersCount: 0,
        maxSlots: 3,
        claims: []
      },
      assignedRep: {
        id: 'usr_rep_01',
        name: 'Elena Rostova',
        email: 'elena.rostova@oalnetwork.com'
      },
      creditScore,
      annualRevenue: annualRev,
      monthlyCashFlow: Math.round(annualRev / 12 * 0.25),
      yearsInBusiness: Number(formData.yearsInBusiness) || 3,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);

    // Create required documents placeholders
    const newDocs = [
      {
        id: `DOC-${Date.now()}-1`,
        applicationId: newId,
        borrowerId: currentUser.id,
        title: 'Business Bank Statements (Past 6 Months)',
        category: 'Financial Statements',
        fileName: 'bank_statements_submitted.pdf',
        fileSize: '3.4 MB',
        status: 'IN_REVIEW',
        uploadedAt: new Date().toISOString()
      },
      {
        id: `DOC-${Date.now()}-2`,
        applicationId: newId,
        borrowerId: currentUser.id,
        title: 'Business Tax Returns (Prior 2 Years)',
        category: 'Tax Filings',
        fileName: 'corporate_tax_returns.pdf',
        fileSize: '5.2 MB',
        status: 'IN_REVIEW',
        uploadedAt: new Date().toISOString()
      }
    ];
    setDocuments(prev => [...newDocs, ...prev]);

    // Add Audit Log
    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser.name} (Borrower)`,
      action: 'APPLICATION_SUBMITTED',
      target: newId,
      details: `New application submitted for $${Number(formData.amount || 250000).toLocaleString()} (${formData.programName}). Initial IQ scored ${totalScore}/180.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    // Add Network feed item
    const feedItem = {
      id: `ACT-${Date.now()}`,
      timestamp: 'Just now',
      type: 'NEW_APPLICATION',
      title: 'New Commercial Loan Submitted',
      description: `${formData.businessName || 'Enterprise'} submitted application for $${Number(formData.amount || 250000).toLocaleString()}.`,
      badge: 'Application'
    };
    setNetworkActivity(prev => [feedItem, ...prev]);

    addToast('Application Submitted!', `Application #${newId} has been successfully recorded.`, 'success');
    return newApp;
  };

  // 2. Claim Working Deal (CRITICAL: Max 3 Lenders per Application)
  const claimWorkingDeal = (applicationId) => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) {
      addToast('Error', 'Application not found', 'error');
      return { success: false, message: 'Application not found' };
    }

    const currentClaims = app.workingDeals?.claims || [];
    
    // Check if lender already claimed this deal
    const alreadyClaimed = currentClaims.some(c => c.lenderId === currentUser.id);
    if (alreadyClaimed) {
      addToast('Already Claimed', 'You already have an active working deal on this application.', 'info');
      return { success: true, message: 'Already active' };
    }

    // Atomic enforcement of Rule FR-08: Maximum 3 lenders
    if (currentClaims.length >= 3) {
      addToast('DEAL_FULL', 'This deal has already reached its maximum limit of 3 concurrent working lenders.', 'error');
      return { success: false, message: 'Maximum 3 working deals already claimed (DEAL_FULL).' };
    }

    const newClaim = {
      lenderId: currentUser.id,
      lenderAlias: `Lender #${Math.floor(1000 + Math.random() * 9000)} (${currentUser.company || 'Direct Commercial Fund'})`,
      claimedAt: new Date().toISOString(),
      status: 'UNDER_REVIEW'
    };

    const updatedClaims = [...currentClaims, newClaim];

    setApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        return {
          ...a,
          status: a.status === 'QUALIFIED' ? 'WORKING_DEAL' : a.status,
          workingDeals: {
            ...a.workingDeals,
            claimedLendersCount: updatedClaims.length,
            claims: updatedClaims
          },
          updatedAt: new Date().toISOString()
        };
      }
      return a;
    }));

    // Audit log
    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.name || 'Institutional Lender',
      action: 'WORKING_DEAL_CLAIMED',
      target: applicationId,
      details: `Claimed slot ${updatedClaims.length} of 3 on application ${applicationId}.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Working Deal Claimed!', `Slot ${updatedClaims.length} of 3 secured. You may now draft an offer.`, 'success');
    return { success: true, message: 'Deal claimed successfully' };
  };

  // 3. Submit Lender Offer (Lender only, Rep is read-only)
  const submitOffer = (offerData) => {
    if (currentRole === 'rep') {
      addToast('Permission Denied', 'OAL Representatives have READ-ONLY offer access and cannot submit or edit offers (PRD FR-10).', 'error');
      return { success: false, message: 'Rep cannot edit offers' };
    }

    const newOfferId = `OFFER-${Math.floor(8000 + Math.random() * 1999)}`;
    const newOffer = {
      id: newOfferId,
      applicationId: offerData.applicationId,
      lenderId: currentUser.id,
      lenderAlias: `Lender #${Math.floor(4000 + Math.random() * 5000)} (${currentUser.company || 'Commercial Capital Fund'})`,
      amount: Number(offerData.amount),
      interestRate: Number(offerData.interestRate),
      termMonths: Number(offerData.termMonths),
      monthlyPayment: Number(offerData.monthlyPayment),
      originationFeePercent: Number(offerData.originationFeePercent || 1.5),
      closingCosts: Math.round(Number(offerData.amount) * 0.015),
      prepaymentPenalty: offerData.prepaymentPenalty || 'None after 12 months',
      requiredConditions: offerData.requiredConditions || ['Standard UCC filing and active commercial insurance verification.'],
      status: 'PENDING_BORROWER_REVIEW',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 14 * 86400000).toISOString()
    };

    setOffers(prev => [newOffer, ...prev]);

    // Update application status to OFFER_RECEIVED
    setApplications(prev => prev.map(a => {
      if (a.id === offerData.applicationId) {
        return {
          ...a,
          status: 'OFFER_RECEIVED',
          updatedAt: new Date().toISOString()
        };
      }
      return a;
    }));

    // Audit log
    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.name,
      action: 'OFFER_SUBMITTED',
      target: offerData.applicationId,
      details: `New offer ${newOfferId} created for $${Number(offerData.amount).toLocaleString()} @ ${offerData.interestRate}%.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Offer Submitted', `Offer ${newOfferId} submitted. The borrower and representative have been notified.`, 'success');
    return { success: true, offer: newOffer };
  };

  // 4. Accept Offer (Borrower only)
  const acceptOffer = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    // Update offer status
    setOffers(prev => prev.map(o => {
      if (o.id === offerId) {
        return { ...o, status: 'ACCEPTED', acceptedAt: new Date().toISOString() };
      }
      if (o.applicationId === offer.applicationId && o.id !== offerId) {
        return { ...o, status: 'DECLINED' };
      }
      return o;
    }));

    // Advance loan status to PROCESSING
    setApplications(prev => prev.map(a => {
      if (a.id === offer.applicationId) {
        return {
          ...a,
          status: 'OFFER_ACCEPTED',
          acceptedOfferId: offerId,
          updatedAt: new Date().toISOString()
        };
      }
      return a;
    }));

    // Audit log
    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser.name} (Borrower)`,
      action: 'OFFER_ACCEPTED',
      target: offer.applicationId,
      details: `Borrower accepted offer ${offerId} ($${offer.amount.toLocaleString()} @ ${offer.interestRate}%). Moving to loan processing.`,
      severity: 'SUCCESS'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Offer Accepted!', `Congratulations! Offer ${offerId} has been accepted. Your OAL Rep is initiating processing.`, 'success');
  };

  // 5. Progress Application Status (For Admin / Lifecycle testing)
  const advanceApplicationStatus = (appId, nextStatus) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: nextStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return a;
    }));

    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.name,
      action: 'STATUS_TRANSITION',
      target: appId,
      details: `Application advanced to status: ${nextStatus}`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Status Updated', `Application ${appId} transitioned to ${nextStatus}`, 'info');
  };

  // 6. Upload / Update Document
  const uploadDocument = (docData) => {
    const newDoc = {
      id: `DOC-${Date.now()}`,
      applicationId: docData.applicationId,
      borrowerId: currentUser.id,
      title: docData.title,
      category: docData.category || 'General Documents',
      fileName: docData.fileName || 'uploaded_document.pdf',
      fileSize: docData.fileSize || '2.1 MB',
      status: 'IN_REVIEW',
      uploadedAt: new Date().toISOString()
    };
    setDocuments(prev => [newDoc, ...prev]);
    addToast('Document Uploaded', `${docData.title} is now in review.`, 'success');
  };

  const updateDocumentStatus = (docId, newStatus, reviewerNotes) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: newStatus,
          reviewedBy: `${currentUser.name} (${currentUser.title || 'Reviewer'})`,
          reviewerNotes: reviewerNotes || d.reviewerNotes,
          verifiedAt: newStatus === 'VERIFIED' ? new Date().toISOString() : d.verifiedAt
        };
      }
      return d;
    }));
    addToast('KYC Decision Recorded', `Document status updated to ${newStatus}`, 'info');
  };

  // 7. Mediated Messaging (Enforce Borrower <-> Rep and Lender <-> Rep ONLY)
  const sendMessage = ({ conversationId, text, applicationId, receiverRole, receiverId, receiverName }) => {
    // Invariant validation: direct Borrower <-> Lender chat is rejected per FR-09
    if (
      (currentRole === 'borrower' && receiverRole === 'lender') ||
      (currentRole === 'lender' && receiverRole === 'borrower')
    ) {
      addToast('Security Restriction', 'Direct Borrower ↔ Lender communication is strictly prohibited per OAL Network governance (FR-09). All communications must be mediated by an OAL Representative.', 'error');
      return { success: false, message: 'Direct communication prohibited' };
    }

    const newMsg = {
      id: `MSG-${Date.now()}`,
      conversationId: conversationId || `CONV_${currentRole}_rep_${applicationId}`,
      senderRole: currentRole,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverRole: receiverRole || 'rep',
      receiverId: receiverId || 'usr_rep_01',
      receiverName: receiverName || 'Elena Rostova (OAL Rep)',
      applicationId: applicationId || 'APP-2026-1082',
      text,
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages(prev => [...prev, newMsg]);
    return { success: true, message: newMsg };
  };

  // 8. Help Desk Tickets
  const createTicket = (ticketData) => {
    const newTicket = {
      id: `TCK-2026-${Math.floor(100 + Math.random() * 900)}`,
      subject: ticketData.subject,
      category: ticketData.category || 'General Inquiries',
      priority: ticketData.priority || 'Normal',
      status: 'OPEN',
      assignedTo: 'Support Queue (Unassigned)',
      userRole: currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
      userName: currentUser.name,
      userEmail: currentUser.email,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: [
        {
          sender: currentUser.name,
          role: currentRole,
          text: ticketData.message,
          timestamp: new Date().toISOString()
        }
      ],
      aiSuggestion: 'Suggested response: Thank you for contacting OAL Network Support. Your request has been queued for immediate review by an assigned operations officer.'
    };

    setTickets(prev => [newTicket, ...prev]);
    addToast('Ticket Created', `Support ticket #${newTicket.id} opened.`, 'success');
    return newTicket;
  };

  const replyTicket = (ticketId, replyText, isAiSuggestion = false) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: currentRole === 'support' || currentRole === 'admin' ? 'IN_PROGRESS' : t.status,
          assignedTo: t.assignedTo.includes('Unassigned') ? currentUser.name : t.assignedTo,
          lastUpdated: new Date().toISOString(),
          messages: [
            ...t.messages,
            {
              sender: currentUser.name,
              role: currentRole,
              text: replyText,
              timestamp: new Date().toISOString(),
              isAiSuggestion
            }
          ]
        };
      }
      return t;
    }));
    addToast('Reply Sent', 'Your message has been added to the ticket.', 'info');
  };

  const closeTicket = (ticketId) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'CLOSED', lastUpdated: new Date().toISOString() };
      }
      return t;
    }));
    addToast('Ticket Closed', `Ticket #${ticketId} marked as resolved.`, 'info');
  };

  // Reset Demo State
  const resetDemoData = () => {
    localStorage.clear();
    setApplications(INITIAL_APPLICATIONS);
    setOffers(INITIAL_OFFERS);
    setDocuments(INITIAL_DOCUMENTS);
    setMessages(INITIAL_MESSAGES);
    setTickets(INITIAL_TICKETS);
    setKbArticles(INITIAL_KB_ARTICLES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNetworkActivity(INITIAL_NETWORK_ACTIVITY);
    setCurrentRole('borrower');
    addToast('Demo Reset', 'All data restored to factory defaults.', 'info');
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      currentRole,
      currentUser,
      login,
      logout,
      switchRole,
      applications,
      offers,
      documents,
      messages,
      tickets,
      kbArticles,
      auditLogs,
      networkActivity,
      toasts,
      addToast,
      removeToast,
      createApplication,
      claimWorkingDeal,
      submitOffer,
      acceptOffer,
      advanceApplicationStatus,
      uploadDocument,
      updateDocumentStatus,
      sendMessage,
      createTicket,
      replyTicket,
      closeTicket,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
