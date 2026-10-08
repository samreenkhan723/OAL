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
 * Find mock user by email address or alias
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
 * Validate mock credentials
 */
export const authenticateMockUser = (email, password) => {
  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  const user = findMockUserByEmail(email);
  if (!user) {
    // For demo convenience, if email contains a role keyword, map to that role
    const normalized = email.trim().toLowerCase();
    let inferredRole = 'borrower';
    if (normalized.includes('lender')) inferredRole = 'lender';
    else if (normalized.includes('rep') || normalized.includes('agent')) inferredRole = 'rep';
    else if (normalized.includes('admin')) inferredRole = 'admin';
    else if (normalized.includes('support')) inferredRole = 'support';

    const fallbackTemplate = MOCK_USERS.find(u => u.role === inferredRole) || MOCK_USERS[0];
    const generatedUser = {
      ...fallbackTemplate,
      id: `usr_${inferredRole}_${Date.now()}`,
      email: normalized,
      name: normalized.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || fallbackTemplate.name
    };

    return { success: true, user: generatedUser };
  }

  // Accept correct password or mock password
  if (password === user.password || password.length >= 4) {
    return { success: true, user };
  }

  return { success: false, error: 'Incorrect password. Please try again.' };
};
