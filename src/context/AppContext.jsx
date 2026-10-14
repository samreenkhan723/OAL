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
  INITIAL_NETWORK_ACTIVITY,
  INITIAL_REPS,
  INITIAL_INVESTOR_VERIFICATIONS
} from '../data/initialData';
import {
  MOCK_USERS,
  authenticatePrototypeUser,
  authenticateMockUser,
  findMockUserByEmail,
  findRegisteredUserByEmail,
  isEmailRegistered,
  computeSimulatedAuthToken
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

// Seed sample pending applications for demonstration in Admin Verification Center
const INITIAL_ACCOUNT_APPLICATIONS = [
  {
    id: 'usr_lender_pending_01',
    name: 'David Vance',
    company: 'Summit Commercial Debt Fund LLC',
    email: 'dvance@summitcreditfund.com',
    phone: '+1 (555) 782-9012',
    role: 'lender',
    title: 'Managing Partner / Underwriter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    mfaVerified: true,
    verificationStatus: 'PENDING_APPROVAL',
    isPrototypeAccount: true,
    createdAt: '2026-10-12T09:30:00.000Z',
    businessInfo: {
      entityType: 'Direct Commercial Credit Fund',
      taxId: 'XX-XXX8921',
      corporateStructure: 'Limited Liability Company (LLC)',
      jurisdiction: 'Delaware, USA'
    },
    documents: [
      {
        id: 'DOC-LIC-01',
        name: 'Articles_of_Incorporation_Summit_LLC.pdf',
        category: 'Business License & Registration',
        size: '2.4 MB',
        uploadedAt: '2026-10-12T09:30:00.000Z'
      },
      {
        id: 'DOC-TAX-01',
        name: 'IRS_EIN_Confirmation_Letter_CP575.pdf',
        category: 'Federal Tax ID Verification',
        size: '1.1 MB',
        uploadedAt: '2026-10-12T09:30:00.000Z'
      }
    ]
  },
  {
    id: 'usr_rep_pending_01',
    name: 'Robert C. Caldwell',
    company: 'Caldwell Commercial Capital Brokerage',
    email: 'r.caldwell@caldwellbrokers.com',
    phone: '+1 (555) 341-8890',
    role: 'rep',
    title: 'Senior Commercial Placement Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    mfaVerified: true,
    verificationStatus: 'PENDING_APPROVAL',
    isPrototypeAccount: true,
    createdAt: '2026-10-12T11:15:00.000Z',
    repInfo: {
      experienceYears: '8+ Years Commercial Lending & Brokerage',
      specialty: 'Commercial Real Estate, SBA 7(a) & Equipment Leasing',
      certifications: 'NMLS Licensed (#198204), Certified Commercial Finance Broker (CCFB)'
    },
    documents: [
      {
        id: 'DOC-REP-ID-01',
        name: 'State_Drivers_License_Verification.pdf',
        category: 'Identity Verification (Government ID)',
        size: '1.8 MB',
        uploadedAt: '2026-10-12T11:15:00.000Z'
      },
      {
        id: 'DOC-REP-CERT-01',
        name: 'NMLS_Certification_License_Copy.pdf',
        category: 'Professional Brokerage Credential',
        size: '950 KB',
        uploadedAt: '2026-10-12T11:15:00.000Z'
      }
    ]
  }
];

export const AppProvider = ({ children }) => {
  // Prototype Registered Users stored in localStorage with backward-compatibility migration
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure all existing items have a verificationStatus
          const normalized = parsed.map(u => ({
            ...u,
            verificationStatus: u.verificationStatus || 'ACTIVE'
          }));
          // Merge initial seed applications if not already present
          const existingIds = new Set(normalized.map(u => u.id));
          const toAdd = INITIAL_ACCOUNT_APPLICATIONS.filter(init => !existingIds.has(init.id));
          return [...normalized, ...toAdd];
        }
      }
      return INITIAL_ACCOUNT_APPLICATIONS;
    } catch (e) {
      return INITIAL_ACCOUNT_APPLICATIONS;
    }
  });

  // Authentication state (Mock/Prototype frontend session via React state + localStorage)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('oal_is_authenticated') === 'true';
  });

  const [activeUser, setActiveUser] = useState(() => {
    const isAuth = localStorage.getItem('oal_is_authenticated') === 'true';
    if (!isAuth) return null;
    const saved = localStorage.getItem('oal_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          const savedReg = localStorage.getItem('oal_registered_users');
          const allReg = savedReg ? JSON.parse(savedReg) : [];
          const live = allReg.find(u => u.id === parsed.id || (u.email && parsed.email && u.email.toLowerCase() === parsed.email.toLowerCase()));
          if (live) {
            return { ...parsed, ...live, verificationStatus: live.verificationStatus || parsed.verificationStatus || 'ACTIVE' };
          }
          return {
            ...parsed,
            verificationStatus: parsed.verificationStatus || 'ACTIVE'
          };
        }
      } catch (e) { /* ignore */ }
    }
    const savedRole = localStorage.getItem('oal_active_role') || 'borrower';
    const fallback = MOCK_USERS.find(u => u.role === savedRole) || MOCK_USERS[0];
    return { ...fallback, verificationStatus: fallback.verificationStatus || 'ACTIVE' };
  });

  // Active Role
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('oal_active_role') || 'borrower';
  });

  // Active user object with safe guest fallback to prevent runtime crashes (defined early for all hooks)
  const currentUser = activeUser || (isAuthenticated ? (MOCK_USERS.find(u => u.role === currentRole) || MOCK_USERS[0]) : GUEST_USER);

  // Data collections with localStorage persistence
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch (e) {
      return INITIAL_APPLICATIONS;
    }
  });

  const [offers, setOffers] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_offers');
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch (e) {
      return INITIAL_OFFERS;
    }
  });

  const [documents, setDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_documents');
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch (e) {
      return INITIAL_DOCUMENTS;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch (e) {
      return INITIAL_MESSAGES;
    }
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch (e) {
      return INITIAL_TICKETS;
    }
  });

  const [kbArticles, setKbArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_kb_articles');
      return saved ? JSON.parse(saved) : INITIAL_KB_ARTICLES;
    } catch (e) {
      return INITIAL_KB_ARTICLES;
    }
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch (e) {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [networkActivity, setNetworkActivity] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_network_activity');
      return saved ? JSON.parse(saved) : INITIAL_NETWORK_ACTIVITY;
    } catch (e) {
      return INITIAL_NETWORK_ACTIVITY;
    }
  });

  // Reps Roster state with localStorage persistence
  const [reps, setReps] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_reps');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_REPS;
    } catch (e) {
      return INITIAL_REPS;
    }
  });

  // Accredited Investor Verification requests state with localStorage persistence
  const [investorVerifications, setInvestorVerifications] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_investor_verifications');
      return saved ? JSON.parse(saved) : INITIAL_INVESTOR_VERIFICATIONS;
    } catch (e) {
      return INITIAL_INVESTOR_VERIFICATIONS;
    }
  });

  // Lead Distribution Settings with localStorage persistence (AUTO | MANUAL)
  const [distributionSettings, setDistributionSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_distribution_settings');
      if (saved) {
        return JSON.parse(saved);
      }
      return {
        mode: 'MANUAL', // 'AUTO' | 'MANUAL'
        lastChangedAt: new Date().toISOString(),
        changedBy: 'System Default'
      };
    } catch (e) {
      return {
        mode: 'MANUAL',
        lastChangedAt: new Date().toISOString(),
        changedBy: 'System Default'
      };
    }
  });

  // Persistent simulated notification records
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('oal_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User-scoped saved leads state with safe, non-destructive legacy fallback
  const loadUserSavedLeads = (userId) => {
    if (!userId) return [];
    try {
      const userScoped = localStorage.getItem(`oal_saved_lead_ids_${userId}`);
      if (userScoped) return JSON.parse(userScoped);

      // Non-destructive fallback: check legacy shared key
      const legacy = localStorage.getItem('oal_saved_lead_ids');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    // Seed default bookmarks for primary demo accounts
    return userId === 'usr_lender_01' || userId === 'usr_rep_01' ? ['APP-2026-1094', 'APP-2026-1082'] : [];
  };

  const [savedLeadIds, setSavedLeadIds] = useState(() => loadUserSavedLeads(activeUser?.id || currentUser?.id));

  // Sync saved leads whenever active user changes
  useEffect(() => {
    const currentId = activeUser?.id || currentUser?.id;
    if (currentId) {
      setSavedLeadIds(loadUserSavedLeads(currentId));
    }
  }, [activeUser?.id, currentUser?.id]);

  // Toggle bookmark / save lead scoped to current user
  const toggleSaveLead = (leadId) => {
    if (!leadId) return;
    const currentId = activeUser?.id || currentUser?.id || 'usr_lender_01';
    setSavedLeadIds(prev => {
      const isSaved = prev.includes(leadId);
      const updated = isSaved ? prev.filter(id => id !== leadId) : [...prev, leadId];
      try {
        localStorage.setItem(`oal_saved_lead_ids_${currentId}`, JSON.stringify(updated));
        // Keep legacy key updated if primary lender
        if (currentRole === 'lender' || currentId === 'usr_lender_01') {
          localStorage.setItem('oal_saved_lead_ids', JSON.stringify(updated));
        }
      } catch (e) {}

      if (isSaved) {
        addToast('Removed from Saved Leads', `Deal #${leadId} removed from your watch list.`, 'info');
      } else {
        addToast('Deal Saved to Watch List', `Deal #${leadId} added to your saved leads section.`, 'success');
      }
      return updated;
    });
  };

  const isLeadSaved = (leadId) => savedLeadIds.includes(leadId);

  // In-app toasts
  const [toasts, setToasts] = useState([]);

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('oal_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to sync registered users', e);
    }
  }, [registeredUsers]);

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

  useEffect(() => {
    localStorage.setItem('oal_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('oal_reps', JSON.stringify(reps));
    } catch (e) {
      console.error('Failed to sync reps', e);
    }
  }, [reps]);

  useEffect(() => {
    try {
      localStorage.setItem('oal_distribution_settings', JSON.stringify(distributionSettings));
    } catch (e) {
      console.error('Failed to sync distribution settings', e);
    }
  }, [distributionSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('oal_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to sync notifications', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('oal_investor_verifications', JSON.stringify(investorVerifications));
    } catch (e) {
      console.error('Failed to sync investor verifications', e);
    }
  }, [investorVerifications]);

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

  // Check if an email is available for new registration
  const validateEmailAvailability = (email) => {
    if (!email) return false;
    return !isEmailRegistered(email, registeredUsers);
  };

  // Register new prototype user record (Supports Borrower, Lender, and OAL Representative)
  const registerPrototypeUser = (formData) => {
    const emailNormalized = (formData.email || '').trim().toLowerCase();

    // Check duplicate email against prototype accounts and demo aliases
    if (isEmailRegistered(emailNormalized, registeredUsers)) {
      addToast('Registration Notice', 'An account with this email address already exists. Please sign in.', 'error');
      return { success: false, error: 'An account with this email address already exists.' };
    }

    // Role support per PRD: 'borrower', 'lender', or 'rep'
    const allowedRoles = ['borrower', 'lender', 'rep'];
    const assignedRole = allowedRoles.includes(formData.role) ? formData.role : 'borrower';
    const isBorrower = assignedRole === 'borrower';

    // Verification status model: Borrowers are ACTIVE; Lenders & Reps require Admin Compliance approval
    const verificationStatus = isBorrower ? 'ACTIVE' : (formData.verificationStatus || 'PENDING_APPROVAL');

    const userId = formData.id || `usr_${assignedRole}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const authToken = formData.simulatedAuthToken || computeSimulatedAuthToken(emailNormalized, formData.password || 'Password123!');

    const newUser = {
      id: userId,
      name: (formData.name || formData.fullName || 'Registered User').trim(),
      email: emailNormalized,
      phone: (formData.phone || '').trim(),
      company: (formData.company || formData.companyName || `${formData.name || formData.fullName || 'Member'} Holdings`).trim(),
      role: assignedRole,
      title: formData.title || (
        assignedRole === 'lender'
          ? 'Managing Partner / Underwriter'
          : assignedRole === 'rep'
          ? 'Commercial Placement Specialist'
          : 'Principal / Business Owner'
      ),
      avatar: formData.avatar || (
        assignedRole === 'lender'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
          : assignedRole === 'rep'
          ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      ),
      verified: Boolean(formData.verified),
      mfaEnabled: true,
      mfaVerified: Boolean(formData.mfaVerified),
      verificationStatus,
      rejectionReason: null,
      businessInfo: formData.businessInfo || null,
      repInfo: formData.repInfo || null,
      documents: formData.documents || [],
      isPrototypeAccount: true,
      createdAt: formData.createdAt || new Date().toISOString(),
      simulatedAuthToken: authToken
    };

    const updatedList = [...registeredUsers, newUser];
    setRegisteredUsers(updatedList);
    try {
      localStorage.setItem('oal_registered_users', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error saving registered users to localStorage', e);
    }

    // Set session state
    setIsAuthenticated(true);
    setActiveUser(newUser);
    setCurrentRole(newUser.role);
    localStorage.setItem('oal_is_authenticated', 'true');
    localStorage.setItem('oal_current_user', JSON.stringify(newUser));
    localStorage.setItem('oal_active_role', newUser.role);

    if (isBorrower) {
      addToast('Account Registered', `Welcome, ${newUser.name}! Your Borrower profile is active.`, 'success');
    } else {
      addToast('Application Submitted', `Application received! Your ${newUser.role.toUpperCase()} credentials are awaiting compliance review.`, 'info');
    }

    return { success: true, user: newUser };
  };

  // Approve pending applicant account (Admin Action)
  const approveUserAccount = (userId) => {
    let targetUserName = '';
    let targetRole = '';
    setRegisteredUsers(prev => prev.map(u => {
      if (u.id === userId) {
        targetUserName = u.name;
        targetRole = u.role;
        return {
          ...u,
          verificationStatus: 'ACTIVE',
          rejectionReason: null,
          approvedAt: new Date().toISOString(),
          reviewedBy: activeUser?.name || 'Victoria Sterling (Compliance Officer)'
        };
      }
      return u;
    }));

    // If currently logged-in user is the one being approved, update activeUser as well
    if (activeUser?.id === userId) {
      const updated = { ...activeUser, verificationStatus: 'ACTIVE', rejectionReason: null };
      setActiveUser(updated);
      localStorage.setItem('oal_current_user', JSON.stringify(updated));
    }

    // Sync Reps roster if approved user is a rep
    setReps(prev => prev.map(r => {
      if (r.id === userId || (r.aliases && r.aliases.includes(userId))) {
        return { ...r, verificationStatus: 'ACTIVE', status: 'ACTIVE' };
      }
      return r;
    }));

    // Log in Audit Trail
    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: activeUser?.name || 'Compliance Officer',
      action: 'USER_ACCOUNT_APPROVED',
      target: userId,
      details: `Approved ${targetRole.toUpperCase()} credentials for ${targetUserName || userId}. Account activated with full portal privileges.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Account Approved', `Application for ${targetUserName || userId} approved. Portal access activated.`, 'success');
  };

  // Reject applicant account with reason (Admin Action)
  const rejectUserAccount = (userId, reason) => {
    let targetUserName = '';
    let targetRole = '';
    const rejectionNote = reason?.trim() || 'Incomplete credential documentation or compliance criteria not satisfied.';

    setRegisteredUsers(prev => prev.map(u => {
      if (u.id === userId) {
        targetUserName = u.name;
        targetRole = u.role;
        return {
          ...u,
          verificationStatus: 'REJECTED',
          rejectionReason: rejectionNote,
          rejectedAt: new Date().toISOString(),
          reviewedBy: activeUser?.name || 'Victoria Sterling (Compliance Officer)'
        };
      }
      return u;
    }));

    if (activeUser?.id === userId) {
      const updated = { ...activeUser, verificationStatus: 'REJECTED', rejectionReason: rejectionNote };
      setActiveUser(updated);
      localStorage.setItem('oal_current_user', JSON.stringify(updated));
    }

    // Sync Reps roster if rejected user is a rep
    setReps(prev => prev.map(r => {
      if (r.id === userId || (r.aliases && r.aliases.includes(userId))) {
        return { ...r, verificationStatus: 'REJECTED', status: 'INACTIVE' };
      }
      return r;
    }));

    // Log in Audit Trail
    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: activeUser?.name || 'Compliance Officer',
      action: 'USER_ACCOUNT_REJECTED',
      target: userId,
      details: `Rejected ${targetRole.toUpperCase()} application for ${targetUserName || userId}. Reason: "${rejectionNote}"`,
      severity: 'WARNING'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Application Rejected', `Registration for ${targetUserName || userId} declined with formal compliance note.`, 'warning');
  };

  // Phase 2.4A: Guarded Admin Lead Distribution Mode Action (AUTO | MANUAL)
  const updateDistributionMode = (newMode) => {
    if (currentRole !== 'admin') {
      addToast('Access Denied', 'Only administrators are authorized to update lead distribution mode.', 'error');
      return { success: false, message: 'Unauthorized: Admin role required.' };
    }

    const cleanMode = (newMode || '').toUpperCase().trim();
    if (cleanMode !== 'AUTO' && cleanMode !== 'MANUAL') {
      addToast('Invalid Mode', 'Lead distribution mode must be either AUTO or MANUAL.', 'warning');
      return { success: false, message: 'Invalid distribution mode. Expected AUTO or MANUAL.' };
    }

    const previousMode = distributionSettings.mode || 'MANUAL';
    if (previousMode === cleanMode) {
      return { success: true, message: `Distribution mode is already ${cleanMode}.`, mode: cleanMode };
    }

    const updated = {
      mode: cleanMode,
      lastChangedAt: new Date().toISOString(),
      changedBy: currentUser?.name || 'Victoria Sterling (Compliance Officer)'
    };

    setDistributionSettings(updated);

    const log = {
      id: `AUD-DIST-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Victoria Sterling'} (Admin)`,
      action: 'DISTRIBUTION_MODE_UPDATED',
      target: 'LEAD_DISTRIBUTION_ENGINE',
      details: `Lead distribution routing mode changed from ${previousMode} to ${cleanMode}. No automatic reassignments executed per Phase 2.4A specification.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast(
      'Distribution Mode Updated',
      `Lead distribution routing policy transitioned to ${cleanMode}.`,
      'success'
    );

    return { success: true, mode: cleanMode, previousMode };
  };

  // Phase 2.4A: Guarded Admin Rep Routing & Caseload Policy Action
  const updateRepRouting = (repId, repData) => {
    if (currentRole !== 'admin') {
      addToast('Access Denied', 'Only administrators can update representative caseload rules.', 'error');
      return { success: false, message: 'Unauthorized: Admin role required.' };
    }

    let updatedRepName = '';
    setReps(prev => prev.map(r => {
      if (r.id === repId || r.email === repId || (r.aliases && r.aliases.includes(repId))) {
        updatedRepName = r.name;
        return {
          ...r,
          maxCapacity: repData.maxCapacity !== undefined ? Number(repData.maxCapacity) : r.maxCapacity,
          status: repData.status || r.status
        };
      }
      return r;
    }));

    const log = {
      id: `AUD-REP-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Victoria Sterling'} (Admin)`,
      action: 'REP_ROUTING_UPDATED',
      target: repId,
      details: `Updated routing policies for ${updatedRepName || repId}. Ceiling: ${repData.maxCapacity || 'unchanged'} files | Status: ${repData.status || 'unchanged'}.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Routing Rules Saved', `Updated routing policies for ${updatedRepName || repId}.`, 'success');
    return { success: true };
  };

  // Phase 2.4A: Lead Assignment State, Rep Access Control & Audit Integration
  const assignOrReassignLead = (applicationId, repId, reason = '') => {
    // 1. Guard: Only the active Admin role may execute through application UI and Context guard
    if (currentRole !== 'admin') {
      addToast('Access Denied', 'Only administrators can assign or reassign leads.', 'error');
      return { success: false, message: 'Unauthorized: Only administrators can assign or reassign leads.' };
    }

    // 2. Verify the application exists
    if (!applicationId || typeof applicationId !== 'string') {
      return { success: false, message: 'Invalid or missing application ID.' };
    }
    const cleanAppId = applicationId.trim();
    const app = (applications || []).find(a => a.id === cleanAppId);
    if (!app) {
      addToast('Assignment Error', `Application #${cleanAppId} does not exist.`, 'error');
      return { success: false, message: `Application ${cleanAppId} not found.` };
    }

    // 3. Verify the selected Rep exists
    if (!repId || typeof repId !== 'string') {
      return { success: false, message: 'Invalid or missing representative ID.' };
    }
    const cleanRepId = repId.trim();

    // Look up rep in centralized reps list, registeredUsers, or MOCK_USERS
    const targetRep =
      (reps || []).find(r =>
        r.id === cleanRepId ||
        r.email?.toLowerCase() === cleanRepId.toLowerCase() ||
        (r.aliases && r.aliases.includes(cleanRepId))
      ) ||
      (registeredUsers || []).find(u =>
        u.role === 'rep' &&
        (u.id === cleanRepId || u.email?.toLowerCase() === cleanRepId.toLowerCase())
      ) ||
      (MOCK_USERS || []).find(u =>
        u.role === 'rep' &&
        (u.id === cleanRepId || u.email?.toLowerCase() === cleanRepId.toLowerCase() || (u.aliases && u.aliases.includes(cleanRepId)))
      );

    if (!targetRep) {
      addToast('Assignment Error', `Representative '${cleanRepId}' was not found.`, 'error');
      return { success: false, message: `Representative ${cleanRepId} not found.` };
    }

    // 4. Verify selected Rep has an approved, active account (reject pending, rejected, unapproved)
    const repVerificationStatus = targetRep.verificationStatus || 'ACTIVE';
    if (repVerificationStatus !== 'ACTIVE') {
      addToast(
        'Assignment Blocked',
        `Cannot assign to ${targetRep.name}. Account compliance status is ${repVerificationStatus}.`,
        'error'
      );
      return {
        success: false,
        message: `Representative ${targetRep.name} has not been approved by compliance (Status: ${repVerificationStatus}).`
      };
    }

    // 5. Reject assignments to paused, pending, rejected or inactive Reps
    const repStatus = targetRep.status || 'ACTIVE';
    if (repStatus === 'PAUSED') {
      addToast(
        'Queue Paused',
        `Representative ${targetRep.name}'s intake queue is currently PAUSED (caseload saturated).`,
        'error'
      );
      return {
        success: false,
        message: `Representative ${targetRep.name} queue is currently PAUSED.`
      };
    }
    if (repStatus !== 'ACTIVE') {
      addToast(
        'Inactive Representative',
        `Representative ${targetRep.name} is currently ${repStatus} and cannot accept leads.`,
        'error'
      );
      return {
        success: false,
        message: `Representative ${targetRep.name} status is ${repStatus}.`
      };
    }

    // 6. Prevent duplicate or unnecessary assignments
    const currentRep = app.assignedRep || null;
    const isAlreadyAssignedToThisRep =
      currentRep &&
      (currentRep.id === targetRep.id ||
       (currentRep.email && targetRep.email && currentRep.email.toLowerCase() === targetRep.email.toLowerCase()));

    if (isAlreadyAssignedToThisRep) {
      addToast(
        'Duplicate Assignment',
        `Application #${cleanAppId} is already assigned to ${targetRep.name}.`,
        'info'
      );
      return {
        success: false,
        message: `Application ${cleanAppId} is already assigned to ${targetRep.name}.`
      };
    }

    // 7. Respect existing Rep caseload limits & reject assignments exceeding available capacity
    const maxCapacity = Number(targetRep.maxCapacity) || 20;
    const currentCaseload = (applications || []).filter(a =>
      a.id !== cleanAppId &&
      a.assignedRep &&
      (a.assignedRep.id === targetRep.id ||
       (a.assignedRep.email && targetRep.email && a.assignedRep.email.toLowerCase() === targetRep.email.toLowerCase()))
    ).length;

    if (currentCaseload >= maxCapacity) {
      addToast(
        'Capacity Limit Reached',
        `Representative ${targetRep.name} has reached maximum caseload limit (${currentCaseload}/${maxCapacity} files).`,
        'error'
      );
      return {
        success: false,
        message: `Representative ${targetRep.name} has reached maximum capacity (${currentCaseload}/${maxCapacity} files).`
      };
    }

    // 8. Determine assignment vs reassignment & record previous/new Rep identities
    const isReassignment = Boolean(currentRep && currentRep.id);
    const eventType = isReassignment ? 'LEAD_REASSIGNED' : 'LEAD_ASSIGNED';

    const newAssignedRep = {
      id: targetRep.id,
      name: targetRep.name,
      email: targetRep.email
    };

    // 9. Update the application's assignedRep information immutably, preserving every unrelated property
    setApplications(prev => prev.map(a => {
      if (a.id === cleanAppId) {
        return {
          ...a,
          assignedRep: newAssignedRep,
          updatedAt: new Date().toISOString()
        };
      }
      return a;
    }));

    // 10. Update Reps roster active load
    setReps(prev => prev.map(r => {
      const isTarget = r.id === targetRep.id || (r.email && targetRep.email && r.email.toLowerCase() === targetRep.email.toLowerCase());
      const isPrevious = currentRep && (r.id === currentRep.id || (r.email && currentRep.email && r.email.toLowerCase() === currentRep.email.toLowerCase()));

      if (isTarget) {
        return { ...r, activeBorrowers: (r.activeBorrowers || 0) + 1 };
      }
      if (isPrevious) {
        return { ...r, activeBorrowers: Math.max(0, (r.activeBorrowers || 0) - 1) };
      }
      return r;
    }));

    // 11. Assignment Audit Trail (Event type: LEAD_ASSIGNED or LEAD_REASSIGNED)
    const auditRecord = {
      id: `AUD-ASSIGN-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Victoria Sterling'} (Admin)`,
      action: eventType,
      target: cleanAppId,
      details: isReassignment
        ? `Application #${cleanAppId} reassigned from ${currentRep.name} (${currentRep.id}) to ${targetRep.name} (${targetRep.id}).${reason?.trim() ? ` Reason: "${reason.trim()}"` : ''}`
        : `Application #${cleanAppId} assigned to ${targetRep.name} (${targetRep.id}).${reason?.trim() ? ` Reason: "${reason.trim()}"` : ''}`,
      applicationId: cleanAppId,
      previousRepId: currentRep?.id || null,
      previousRepName: currentRep?.name || null,
      newRepId: targetRep.id,
      newRepName: targetRep.name,
      actingAdminId: currentUser?.id || 'usr_admin_01',
      reason: reason?.trim() || null,
      severity: 'INFO'
    };
    setAuditLogs(prev => [auditRecord, ...(prev || [])]);

    // 12. Frontend Notifications (Simulated notifications for target Rep and previous Rep)
    const targetRepNotif = {
      id: `notif-${Date.now()}-assign`,
      title: isReassignment
        ? `Lead Reassigned: ${app.businessName || cleanAppId}`
        : `New Lead Assigned: ${app.businessName || cleanAppId}`,
      category: 'deals',
      timestamp: 'Just now',
      read: false,
      priority: 'high',
      recipientId: targetRep.id,
      recipientRole: 'rep',
      description: `Placement #${cleanAppId} (${app.programName}, $${(app.amount || 0).toLocaleString()}) has been assigned to your placement desk by Admin.${reason?.trim() ? ` Note: "${reason.trim()}"` : ''}`,
      actionLink: '/rep/messages',
      actionLabel: 'Open Placement Chat'
    };

    setNotifications(prev => [targetRepNotif, ...(prev || [])]);

    if (isReassignment && currentRep) {
      const prevRepNotif = {
        id: `notif-${Date.now()}-reassign-prev`,
        title: `Lead Transferred: ${app.businessName || cleanAppId}`,
        category: 'deals',
        timestamp: 'Just now',
        read: false,
        priority: 'normal',
        recipientId: currentRep.id,
        recipientRole: 'rep',
        description: `Placement #${cleanAppId} was reassigned to ${targetRep.name} by Admin.${reason?.trim() ? ` Note: "${reason.trim()}"` : ''}`,
        actionLink: '/rep/leads',
        actionLabel: 'View Pipeline'
      };
      setNotifications(prev => [prevRepNotif, ...(prev || [])]);
    }

    // 13. Clear Admin success message
    addToast(
      isReassignment ? 'Lead Reassigned' : 'Lead Assigned',
      `Application #${cleanAppId} successfully ${isReassignment ? 'reassigned' : 'assigned'} to ${targetRep.name}.`,
      'success'
    );

    // 14. Return clear success/failure result
    return {
      success: true,
      message: `Application #${cleanAppId} successfully ${isReassignment ? 'reassigned' : 'assigned'} to ${targetRep.name}.`,
      applicationId: cleanAppId,
      previousRepId: currentRep?.id || null,
      previousRepName: currentRep?.name || null,
      newRepId: targetRep.id,
      newRepName: targetRep.name,
      auditId: auditRecord.id
    };
  };

  // Retrieve verification status for a user
  const getUserVerificationStatus = (userId) => {
    if (!userId) return { status: 'PENDING_APPROVAL', rejectionReason: null, user: null };
    const user = registeredUsers.find(u => u.id === userId || (u.email && activeUser && u.email.toLowerCase() === activeUser.email?.toLowerCase())) ||
      MOCK_USERS.find(u => u.id === userId);
    if (!user) {
      return { status: 'PENDING_APPROVAL', rejectionReason: null, user: null };
    }
    const status = user.verificationStatus || 'ACTIVE';
    return {
      status,
      rejectionReason: user.rejectionReason || null,
      user
    };
  };

  // Login with credentials (Prototype lookup: registered users first, then demo accounts)
  const login = (email, password) => {
    const res = authenticatePrototypeUser(email, password, registeredUsers);
    if (res.success) {
      const enrichedUser = {
        ...res.user,
        verificationStatus: res.user.verificationStatus || 'ACTIVE'
      };

      setIsAuthenticated(true);
      setActiveUser(enrichedUser);
      setCurrentRole(enrichedUser.role);
      localStorage.setItem('oal_is_authenticated', 'true');
      localStorage.setItem('oal_current_user', JSON.stringify(enrichedUser));
      localStorage.setItem('oal_active_role', enrichedUser.role);

      if (enrichedUser.verificationStatus === 'PENDING_APPROVAL') {
        addToast('Application Under Review', `Welcome back, ${enrichedUser.name}. Your account is awaiting compliance review.`, 'warning');
      } else if (enrichedUser.verificationStatus === 'REJECTED') {
        addToast('Application Declined', `Registration application for ${enrichedUser.name} was not approved.`, 'error');
      } else {
        addToast('Welcome Back', `Signed in as ${enrichedUser.name} (${enrichedUser.role.toUpperCase()})`, 'success');
      }

      return { success: true, user: enrichedUser };
    }
    addToast('Sign In Failed', res.error, 'error');
    return { success: false, error: res.error };
  };

  // Logout - Clears active session & state (preserves registered user records in localStorage)
  const logout = () => {
    setIsAuthenticated(false);
    setActiveUser(null);
    setCurrentRole('borrower');
    localStorage.removeItem('oal_is_authenticated');
    localStorage.removeItem('oal_current_user');
    localStorage.removeItem('oal_active_role');
    addToast('Signed Out', 'You have been signed out of your session.', 'info');
  };

  // Switch Active User / Role (Strictly for Demo Role Switcher widget)
  const switchRole = (role) => {
    const matched = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setIsAuthenticated(true);
    setActiveUser(matched);
    setCurrentRole(matched.role);
    localStorage.setItem('oal_is_authenticated', 'true');
    localStorage.setItem('oal_current_user', JSON.stringify(matched));
    localStorage.setItem('oal_active_role', matched.role);
    addToast('Demo Perspective Switched', `Active demo profile: ${matched.name} (${matched.role.toUpperCase()})`, 'info');
  };

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
      lenderId: currentUser?.id || 'usr_lender_01',
      lenderAlias: `Lender #${Math.floor(4000 + Math.random() * 5000)} (${currentUser?.company || 'Commercial Capital Fund'})`,
      amount: Number(offerData.amount),
      interestRate: Number(offerData.interestRate),
      termMonths: Number(offerData.termMonths),
      monthlyPayment: Number(offerData.monthlyPayment || Math.round((Number(offerData.amount) * (1 + 0.08 * (Number(offerData.termMonths) / 12))) / Number(offerData.termMonths))),
      originationFeePercent: Number(offerData.originationFeePercent || 1.5),
      closingCosts: Math.round(Number(offerData.amount) * 0.015),
      prepaymentPenalty: offerData.prepaymentPenalty || 'None after 12 months',
      requiredConditions: offerData.requiredConditions || ['Standard UCC filing and active commercial insurance verification.'],
      status: 'PENDING_BORROWER_REVIEW',
      sharedWithBorrower: false,
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
      actor: currentUser?.name || 'Institutional Lender',
      action: 'OFFER_SUBMITTED',
      target: offerData.applicationId,
      details: `New offer ${newOfferId} created for $${Number(offerData.amount).toLocaleString()} @ ${offerData.interestRate}%.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Offer Submitted', `Offer ${newOfferId} submitted. The representative has been notified to review and mediate.`, 'success');
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
      actor: `${currentUser?.name || 'Borrower'} (Borrower)`,
      action: 'OFFER_ACCEPTED',
      target: offer.applicationId,
      details: `Borrower accepted offer ${offerId} ($${offer.amount.toLocaleString()} @ ${offer.interestRate}%). Moving to loan processing.`,
      severity: 'SUCCESS'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Offer Accepted!', `Congratulations! Offer ${offerId} has been accepted. Your OAL Rep is initiating processing.`, 'success');
  };

  // 4b. Update / Edit Offer (Lender who created it, or Admin)
  const updateOffer = (offerId, updatedFields) => {
    if (currentRole === 'rep') {
      addToast('Permission Denied', 'OAL Representatives have view-only access and cannot edit lender offers (PRD FR-10).', 'error');
      return { success: false, message: 'Rep cannot edit offers' };
    }

    setOffers(prev => prev.map(o => {
      if (o.id === offerId) {
        return {
          ...o,
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));

    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Lender'} (${currentRole})`,
      action: 'OFFER_UPDATED',
      target: offerId,
      details: `Updated offer parameters (Principal: $${updatedFields.amount || 'N/A'}, Rate: ${updatedFields.interestRate || 'N/A'}%).`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Offer Terms Updated', `Successfully updated terms for offer ${offerId}.`, 'success');
    return { success: true };
  };

  // 4c. Withdraw Offer (Lender author, or Admin)
  const withdrawOffer = (offerId) => {
    if (currentRole === 'rep') {
      addToast('Permission Denied', 'Representatives have view-only access and cannot withdraw lender offers.', 'error');
      return { success: false, message: 'Rep cannot withdraw offers' };
    }

    const offer = offers.find(o => o.id === offerId);
    if (!offer) {
      addToast('Error', 'Offer not found', 'error');
      return { success: false, message: 'Offer not found' };
    }

    setOffers(prev => prev.map(o => {
      if (o.id === offerId) {
        return {
          ...o,
          status: 'WITHDRAWN',
          withdrawnAt: new Date().toISOString()
        };
      }
      return o;
    }));

    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Lender'} (${currentRole})`,
      action: 'OFFER_WITHDRAWN',
      target: offerId,
      details: `Withdrew offer ${offerId} from active borrower review.`,
      severity: 'WARNING'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Offer Withdrawn', `Offer ${offerId} has been withdrawn from consideration.`, 'warning');
    return { success: true };
  };

  // 4d. Share Offer with Borrower (OAL Rep or Admin only)
  const shareOfferWithBorrower = (offerId) => {
    if (currentRole === 'lender') {
      addToast('Permission Denied', 'Rule FR-09: Lenders cannot directly share offers with borrowers.', 'error');
      return { success: false, message: 'Lender cannot directly share' };
    }

    const offer = offers.find(o => o.id === offerId);
    if (!offer) {
      addToast('Error', 'Offer not found', 'error');
      return { success: false, message: 'Offer not found' };
    }

    setOffers(prev => prev.map(o => {
      if (o.id === offerId) {
        return {
          ...o,
          sharedWithBorrower: true,
          sharedAt: new Date().toISOString()
        };
      }
      return o;
    }));

    const log = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'OAL Rep'} (${currentRole})`,
      action: 'OFFER_SHARED_WITH_BORROWER',
      target: offerId,
      details: `Representative shared term sheet ${offerId} ($${offer.amount.toLocaleString()} @ ${offer.interestRate}%) with borrower.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [log, ...prev]);

    addToast('Term Sheet Shared', `Offer ${offerId} ($${offer.amount.toLocaleString()}) has been securely dispatched to the borrower waiting room.`, 'success');
    return { success: true };
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
    if (docData.replaceDocId) {
      setDocuments(prev => prev.map(d => {
        if (d.id === docData.replaceDocId) {
          return {
            ...d,
            title: docData.title || d.title,
            category: docData.category || d.category,
            fileName: docData.fileName || d.fileName,
            fileSize: docData.fileSize || d.fileSize,
            status: 'IN_REVIEW',
            reviewerNotes: null,
            uploadedAt: new Date().toISOString()
          };
        }
        return d;
      }));
      addToast('Document Replaced', `${docData.title} re-submitted for underwriting review.`, 'success');
      return;
    }

    const newDoc = {
      id: `DOC-${Date.now()}`,
      applicationId: docData.applicationId || 'APP-2026-1082',
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

  // 7. Mediated Messaging & Multi-Channel Communications (Chat, Email, SMS)
  const sendMessage = ({
    conversationId,
    text,
    applicationId,
    receiverRole,
    receiverId,
    receiverName,
    type = 'chat',
    subject = '',
    metadata = {}
  }) => {
    // 1. Text validity check
    if (!text || typeof text !== 'string' || !text.trim()) {
      return { success: false, message: 'Message text cannot be empty' };
    }

    // 2. Authentication check - Sender identity MUST come strictly from authenticated state
    if (!currentUser || !currentUser.id) {
      addToast('Authentication Required', 'You must be logged in to send messages.', 'error');
      return { success: false, message: 'Unauthenticated dispatch rejected' };
    }

    const cleanAppId = applicationId || 'APP-2026-1082';

    // 3. Strict Role-based Destination & Invariant Enforcement
    let targetReceiverRole = receiverRole;
    let targetReceiverId = receiverId;
    let targetReceiverName = receiverName;
    let canonicalConvId = '';

    if (currentRole === 'borrower') {
      // Borrower can ONLY message an authorized Rep
      if (receiverRole && receiverRole !== 'rep') {
        addToast(
          'Security Violation (FR-09)',
          'Borrowers are restricted to communicating exclusively with their designated OAL Representative.',
          'error'
        );
        return { success: false, message: 'Unauthorized recipient for borrower role' };
      }
      targetReceiverRole = 'rep';
      targetReceiverId = receiverId || 'usr_rep_01';
      targetReceiverName = receiverName || 'Elena Rostova (OAL Rep)';
      canonicalConvId = conversationId || `CONV_BORROWER_REP_${cleanAppId}`;
    } else if (currentRole === 'lender') {
      // Lender can ONLY message an authorized Rep
      if (receiverRole && receiverRole !== 'rep') {
        addToast(
          'Security Violation (FR-09)',
          'Institutional Lenders are restricted to communicating exclusively with their designated OAL Representative.',
          'error'
        );
        return { success: false, message: 'Unauthorized recipient for lender role' };
      }
      targetReceiverRole = 'rep';
      targetReceiverId = receiverId || 'usr_rep_01';
      targetReceiverName = receiverName || 'Elena Rostova (OAL Rep)';
      canonicalConvId = conversationId || `CONV_LENDER_REP_${cleanAppId}_${currentUser.id}`;
    } else if (currentRole === 'rep') {
      // Rep can message authorized Borrower or authorized Lender
      if (receiverRole === 'borrower') {
        targetReceiverRole = 'borrower';
        targetReceiverId = receiverId || 'usr_borrower_01';
        targetReceiverName = receiverName || 'Marcus Vance';
        canonicalConvId = conversationId || `CONV_BORROWER_REP_${cleanAppId}`;
      } else if (receiverRole === 'lender') {
        targetReceiverRole = 'lender';
        targetReceiverId = receiverId || 'usr_lender_01';
        targetReceiverName = receiverName || 'Apex Horizon Capital LLC';
        canonicalConvId = conversationId || `CONV_LENDER_REP_${cleanAppId}_${targetReceiverId}`;
      } else {
        addToast('Invalid Recipient', 'OAL Representatives must select either Borrower or Lender recipient.', 'error');
        return { success: false, message: 'Invalid recipient role for representative' };
      }
    } else if (currentRole === 'admin') {
      // Admin supervisor can participate on either designated channel
      if (receiverRole === 'lender') {
        targetReceiverRole = 'lender';
        targetReceiverId = receiverId || 'usr_lender_01';
        targetReceiverName = receiverName || 'Apex Horizon Capital LLC';
        canonicalConvId = conversationId || `CONV_LENDER_REP_${cleanAppId}_${targetReceiverId}`;
      } else {
        targetReceiverRole = 'borrower';
        targetReceiverId = receiverId || 'usr_borrower_01';
        targetReceiverName = receiverName || 'Marcus Vance';
        canonicalConvId = conversationId || `CONV_BORROWER_REP_${cleanAppId}`;
      }
    } else {
      addToast('Unauthorized Role', 'Current user role is not authorized to dispatch messages.', 'error');
      return { success: false, message: 'Unauthorized role' };
    }

    // Direct Borrower <-> Lender chat invariant (FR-09)
    if (
      (currentRole === 'borrower' && targetReceiverRole === 'lender') ||
      (currentRole === 'lender' && targetReceiverRole === 'borrower')
    ) {
      addToast('Security Restriction', 'Direct Borrower ↔ Lender communication is strictly prohibited per OAL Network governance (FR-09). All communications must be mediated by an OAL Representative.', 'error');
      return { success: false, message: 'Direct communication prohibited' };
    }

    // Create normalized message with authenticated sender identity
    const newMsg = {
      id: `MSG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      conversationId: canonicalConvId,
      senderRole: currentRole,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverRole: targetReceiverRole,
      receiverId: targetReceiverId,
      receiverName: targetReceiverName,
      applicationId: cleanAppId,
      type: type || 'chat',
      subject: subject || '',
      text: text.trim(),
      metadata: metadata || {},
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages(prev => [...prev, newMsg]);

    // Task 5: Non-sensitive Activity Audit Log (Chat, Email, or SMS)
    let actionName = 'MESSAGE_DISPATCHED';
    if (type === 'email') actionName = 'EMAIL_SIMULATED_DISPATCH';
    if (type === 'sms') actionName = 'SMS_SIMULATED_DISPATCH';

    const auditEntry = {
      id: `AUD-MSG-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser.name} (${currentRole.toUpperCase()})`,
      action: actionName,
      target: cleanAppId,
      details: `Role: ${currentRole.toUpperCase()} | Type: ${(type || 'chat').toUpperCase()} | Application: ${cleanAppId} | Conversation: ${canonicalConvId} | Recipient: ${targetReceiverRole} (${targetReceiverId})`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [auditEntry, ...(prev || [])]);

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
    const savedRegUsers = localStorage.getItem('oal_registered_users');
    localStorage.clear();
    if (savedRegUsers) {
      localStorage.setItem('oal_registered_users', savedRegUsers);
    }
    setApplications(INITIAL_APPLICATIONS);
    setOffers(INITIAL_OFFERS);
    setDocuments(INITIAL_DOCUMENTS);
    setMessages(INITIAL_MESSAGES);
    setTickets(INITIAL_TICKETS);
    setKbArticles(INITIAL_KB_ARTICLES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNetworkActivity(INITIAL_NETWORK_ACTIVITY);
    setReps(INITIAL_REPS);
    setDistributionSettings({
      mode: 'MANUAL',
      lastChangedAt: new Date().toISOString(),
      changedBy: 'System Initializer'
    });
    setNotifications([]);
    setCurrentRole('borrower');
    addToast('Demo Reset', 'All demo data restored to factory defaults.', 'info');
  };

  // Accredited Investor Verification Handlers (Investment IQ - Investment Club PRD)
  const getBorrowerInvestorStatus = (borrowerId) => {
    const targetId = borrowerId || currentUser?.id;
    if (!targetId) return { status: 'NOT_APPLIED', verification: null };
    const found = (investorVerifications || []).find(v => v.borrowerId === targetId);
    if (!found) return { status: 'NOT_APPLIED', verification: null };
    return { status: found.status, verification: found };
  };

  const submitInvestorVerification = (formData) => {
    const reqId = `INV-REQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const newReq = {
      id: reqId,
      borrowerId: currentUser?.id || 'usr_borrower_01',
      borrowerName: currentUser?.name || 'Marcus Vance',
      borrowerEmail: currentUser?.email || 'marcus@blueharborseafood.com',
      company: currentUser?.company || 'Blue Harbor Seafood Bistro LLC',
      applicantType: formData.applicantType || 'individual', // 'individual' | 'joint' | 'corporate'
      netWorthExceeds1M: Boolean(formData.netWorthExceeds1M),
      annualIncome200k: Boolean(formData.annualIncome200k),
      jointIncome300k: Boolean(formData.jointIncome300k),
      corporateAssetsExceeds5M: Boolean(formData.corporateAssetsExceeds5M),
      entityAccreditedOwnership: Boolean(formData.entityAccreditedOwnership),
      finraLicense: formData.finraLicense || 'none', // 'series7' | 'series65' | 'series82' | 'none'
      licenseNumber: formData.licenseNumber || '',
      estimatedNetWorth: formData.estimatedNetWorth || '',
      estimatedIncome: formData.estimatedIncome || '',
      corporateAssets: formData.corporateAssets || '',
      documents: formData.documents || [],
      declarationsAcknowledged: Boolean(formData.declarationsAcknowledged),
      consentToVerify: Boolean(formData.consentToVerify),
      status: 'PENDING_REVIEW', // 'NOT_APPLIED' | 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED'
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null
    };

    setInvestorVerifications(prev => {
      const filtered = (prev || []).filter(v => v.borrowerId !== newReq.borrowerId);
      return [newReq, ...filtered];
    });

    const auditRecord = {
      id: `AUD-INV-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Marcus Vance'} (Borrower)`,
      action: 'ACCREDITED_INVESTOR_APPLIED',
      target: reqId,
      details: `Submitted accredited investor verification request (${newReq.applicantType.toUpperCase()}, FINRA: ${newReq.finraLicense.toUpperCase()}). Attached ${newReq.documents.length} supporting documents.`,
      severity: 'INFO'
    };
    setAuditLogs(prev => [auditRecord, ...(prev || [])]);

    addToast('Verification Request Submitted', `Application ${reqId} received. Compliance team will review your accredited investor credentials.`, 'success');
    return { success: true, verification: newReq };
  };

  const approveInvestorVerification = (verificationId) => {
    let applicantName = '';
    setInvestorVerifications(prev => prev.map(v => {
      if (v.id === verificationId) {
        applicantName = v.borrowerName;
        return {
          ...v,
          status: 'VERIFIED',
          reviewedAt: new Date().toISOString(),
          reviewedBy: currentUser?.name || 'Victoria Sterling (Compliance Officer)',
          rejectionReason: null
        };
      }
      return v;
    }));

    const auditRecord = {
      id: `AUD-INV-APP-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Victoria Sterling'} (Admin)`,
      action: 'ACCREDITED_INVESTOR_APPROVED',
      target: verificationId,
      details: `Approved accredited investor credentials for ${applicantName || verificationId}. Verified Accredited Investor green-check badge issued.`,
      severity: 'SUCCESS'
    };
    setAuditLogs(prev => [auditRecord, ...(prev || [])]);

    addToast('Investor Approved', `Accredited investor credentials approved for ${applicantName || verificationId}. Green-check badge issued.`, 'success');
    return { success: true };
  };

  const rejectInvestorVerification = (verificationId, reason = '') => {
    let applicantName = '';
    const rejectionNote = reason?.trim() || 'Supporting documentation does not satisfy SEC Rule 501 / FINRA qualification criteria.';

    setInvestorVerifications(prev => prev.map(v => {
      if (v.id === verificationId) {
        applicantName = v.borrowerName;
        return {
          ...v,
          status: 'REJECTED',
          reviewedAt: new Date().toISOString(),
          reviewedBy: currentUser?.name || 'Victoria Sterling (Compliance Officer)',
          rejectionReason: rejectionNote
        };
      }
      return v;
    }));

    const auditRecord = {
      id: `AUD-INV-REJ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser?.name || 'Victoria Sterling'} (Admin)`,
      action: 'ACCREDITED_INVESTOR_REJECTED',
      target: verificationId,
      details: `Declined accredited investor application for ${applicantName || verificationId}. Reason: "${rejectionNote}"`,
      severity: 'WARNING'
    };
    setAuditLogs(prev => [auditRecord, ...(prev || [])]);

    addToast('Investor Application Declined', `Accredited investor application declined with formal compliance note.`, 'warning');
    return { success: true };
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      currentRole,
      currentUser,
      activeUser,
      setActiveUser,
      registeredUsers,
      registerPrototypeUser,
      validateEmailAvailability,
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
      reps,
      setReps,
      distributionSettings,
      notifications,
      toasts,
      addToast,
      removeToast,
      savedLeadIds,
      toggleSaveLead,
      isLeadSaved,
      createApplication,
      claimWorkingDeal,
      submitOffer,
      updateOffer,
      withdrawOffer,
      shareOfferWithBorrower,
      acceptOffer,
      advanceApplicationStatus,
      uploadDocument,
      updateDocumentStatus,
      approveUserAccount,
      rejectUserAccount,
      getUserVerificationStatus,
      sendMessage,
      createTicket,
      replyTicket,
      closeTicket,
      updateDistributionMode,
      updateRepRouting,
      assignOrReassignLead,
      resetDemoData,
      investorVerifications,
      getBorrowerInvestorStatus,
      submitInvestorVerification,
      approveInvestorVerification,
      rejectInvestorVerification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
