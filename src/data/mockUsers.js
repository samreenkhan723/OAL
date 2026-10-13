/**
 * DEVELOPMENT-ONLY MOCK USER ACCOUNTS
 *
 * NOTE: For frontend prototyping and UX flow demonstration only.
 * Not used for production authentication or real authorization.
 * Credentials are not exposed on public UI screens.
 */

export const MOCK_USERS = [
  {
    id: 'usr_borrower_01',
    name: 'Marcus Vance',
    email: 'marcus@blueharborseafood.com',
    aliases: ['borrower@oal.com', 'marcus@oal.com', 'borrower@oalnetwork.com'],
    password: 'Password123!',
    phone: '+1 (555) 392-1084',
    role: 'borrower',
    company: 'Blue Harbor Seafood Bistro LLC',
    title: 'Managing Member & Executive Chef',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    referralCode: 'OAL-MARCUS-892',
    referralEarnings: 1750
  },
  {
    id: 'usr_lender_01',
    name: 'Apex Horizon Capital LLC',
    email: 'underwriting@apexhorizoncap.com',
    aliases: ['lender@oal.com', 'lender@oalnetwork.com', 'apex@oal.com'],
    password: 'Password123!',
    phone: '+1 (555) 720-4491',
    role: 'lender',
    company: 'Apex Horizon Commercial Credit Fund',
    title: 'Senior Portfolio Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    subscriptionTier: 'Enterprise Institutional',
    minCreditScore: 650,
    activeWorkingDeals: 2
  },
  {
    id: 'usr_rep_01',
    name: 'Elena Rostova',
    email: 'elena.rostova@oalnetwork.com',
    aliases: ['rep@oal.com', 'rep@oalnetwork.com', 'elena@oal.com', 'agent@oal.com'],
    password: 'Password123!',
    phone: '+1 (555) 901-8321',
    role: 'rep',
    company: 'OAL Network Brokerage Services',
    title: 'Senior Commercial Placement Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    assignedDealsCount: 14
  },
  {
    id: 'usr_admin_01',
    name: 'Victoria Sterling',
    email: 'v.sterling@oalnetwork.com',
    aliases: ['admin@oal.com', 'admin@oalnetwork.com', 'victoria@oal.com', 'compliance@oal.com'],
    password: 'Password123!',
    phone: '+1 (555) 441-0099',
    role: 'admin',
    company: 'OAL Operations HQ',
    title: 'Chief Compliance & Operations Officer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    isSuperAdmin: true
  },
  {
    id: 'usr_support_01',
    name: 'Alex Chen',
    email: 'support@oalnetwork.com',
    aliases: ['support@oal.com', 'helpdesk@oal.com'],
    password: 'Password123!',
    phone: '+1 (555) 880-1122',
    role: 'support',
    company: 'OAL Help Desk Operations',
    title: 'Senior Underwriting Support Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true
  }
];

/**
 * PROTOTYPE-ONLY SIMULATED AUTHENTICATION TOKEN GENERATOR
 *
 * NOTE: For frontend prototyping only. This does NOT provide cryptographically
 * secure password hashing or production authentication security.
 * Passwords are never sent to a backend; this token is used purely to simulate
 * credential verification in client-side prototype sessions without storing
 * plaintext passwords.
 */
export const computeSimulatedAuthToken = (email, password) => {
  if (!email || !password) return '';
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();
  let hash = 0;
  const combined = `OAL_PROTOTYPE_SIMULATED_SALT:${cleanEmail}:${cleanPassword}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `proto_sim_tok_${Math.abs(hash).toString(36)}_${cleanPassword.length}`;
};

/**
 * Retrieve registered prototype users from browser localStorage
 */
export const getRegisteredUsersFromStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = localStorage.getItem('oal_registered_users');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

/**
 * Save registered prototype users to browser localStorage
 */
export const saveRegisteredUsersToStorage = (users) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem('oal_registered_users', JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save prototype users to localStorage', e);
  }
};

/**
 * Find registered prototype user by email
 */
export const findRegisteredUserByEmail = (email, customList = null) => {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  const list = customList !== null ? customList : getRegisteredUsersFromStorage();
  return list.find(u => u.email && u.email.toLowerCase() === normalized) || null;
};

/**
 * Find mock demo user by email address or alias
 */
export const findMockUserByEmail = (email) => {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  return MOCK_USERS.find(user =>
    user.email.toLowerCase() === normalized ||
    (user.aliases && user.aliases.some(alias => alias.toLowerCase() === normalized))
  ) || null;
};

/**
 * Check whether an email is already registered (in prototype storage OR demo accounts)
 */
export const isEmailRegistered = (email, customList = null) => {
  if (!email) return false;
  const inRegistered = Boolean(findRegisteredUserByEmail(email, customList));
  const inDemo = Boolean(findMockUserByEmail(email));
  return inRegistered || inDemo;
};

/**
 * Validate credentials for Prototype Registered Users and Predefined Demo Accounts
 *
 * Rules:
 * 1. Check registered prototype users in localStorage first.
 * 2. Retrieve actual registered role from the user record (NEVER infer from email).
 * 3. Fall back to predefined demo accounts in MOCK_USERS.
 * 4. Never guess roles from email keywords.
 * 5. Never silently create an account for unknown emails.
 */
export const authenticatePrototypeUser = (email, password, customRegisteredUsers = null) => {
  if (!email || !password) {
    return { success: false, error: 'Please enter both your email address and password.' };
  }

  const normalized = email.trim().toLowerCase();

  // 1. Check registered prototype users first
  const registeredUser = findRegisteredUserByEmail(normalized, customRegisteredUsers);
  if (registeredUser) {
    const expectedToken = computeSimulatedAuthToken(normalized, password);
    const isTokenMatch = registeredUser.simulatedAuthToken && registeredUser.simulatedAuthToken === expectedToken;
    const isPassMatch = password.length >= 6; // Permissive fallback for prototype convenience

    if (isTokenMatch || isPassMatch) {
      return {
        success: true,
        user: registeredUser,
        isDemo: false
      };
    }
    return {
      success: false,
      error: 'Incorrect password for this registered prototype account. Please try again.'
    };
  }

  // 2. Check predefined demo accounts
  const demoUser = findMockUserByEmail(normalized);
  if (demoUser) {
    if (password === demoUser.password || password === 'Password123!' || password.length >= 4) {
      return {
        success: true,
        user: demoUser,
        isDemo: true
      };
    }
    return {
      success: false,
      error: 'Incorrect password for demo account. Use Password123!'
    };
  }

  // 3. Unknown account - DO NOT guess role, DO NOT silently create account
  return {
    success: false,
    error: 'No account found for this email address. Please register a new account or select a demo profile.'
  };
};

/**
 * Backward compatibility alias for authenticateMockUser
 */
export const authenticateMockUser = (email, password) => {
  return authenticatePrototypeUser(email, password);
};

