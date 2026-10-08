// Initial Seed Data for OAL Network Mock Store

export const INITIAL_USERS = {
  borrower: {
    id: 'usr_borrower_01',
    name: 'Marcus Vance',
    email: 'marcus@blueharborseafood.com',
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
  lender: {
    id: 'usr_lender_01',
    name: 'Apex Horizon Capital LLC',
    email: 'underwriting@apexhorizoncap.com',
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
  rep: {
    id: 'usr_rep_01',
    name: 'Elena Rostova',
    email: 'elena.rostova@oalnetwork.com',
    phone: '+1 (555) 901-8321',
    role: 'rep',
    company: 'OAL Network Brokerage Services',
    title: 'Senior Commercial Placement Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    assignedDealsCount: 14
  },
  admin: {
    id: 'usr_admin_01',
    name: 'Victoria Sterling',
    email: 'v.sterling@oalnetwork.com',
    phone: '+1 (555) 441-0099',
    role: 'admin',
    company: 'OAL Operations HQ',
    title: 'Chief Compliance & Operations Officer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true,
    isSuperAdmin: true
  },
  support: {
    id: 'usr_support_01',
    name: 'David Kim',
    email: 'david.kim@oalnetwork.com',
    phone: '+1 (555) 302-8812',
    role: 'support',
    company: 'OAL Help Desk Center',
    title: 'Support Desk Team Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    mfaEnabled: true
  }
};

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-2026-1082',
    borrowerId: 'usr_borrower_01',
    borrowerName: 'Marcus Vance',
    businessName: 'Blue Harbor Seafood Bistro LLC',
    loanType: 'restaurant',
    programName: 'Restaurant Financing',
    amount: 450000,
    loanPurpose: 'Kitchen equipment overhaul and waterfront terrace seating expansion',
    useOfFunds: 'Procure commercial combi ovens, refrigeration walk-in, and expand covered patio capacity by 45 seats.',
    status: 'OFFER_RECEIVED', // 'DRAFT' | 'SUBMITTED' | 'KYC_REVIEW' | 'SCORED' | 'QUALIFIED' | 'LENDER_REVIEW' | 'WORKING_DEAL' | 'OFFER_RECEIVED' | 'OFFER_ACCEPTED' | 'PROCESSING' | 'APPROVED' | 'FUNDING' | 'FUNDED'
    investmentIQ: {
      total: 154,
      max: 180,
      breakdown: {
        creditHistory: 62, // max 70
        businessPlan: 18,  // max 20
        cashFlow: 44,      // max 50
        collateral: 22,    // max 30
        riskAssessment: 8  // max 10
      },
      assessedAt: '2026-10-02T11:20:00Z',
      version: 'v2.4-Standard',
      explanation: 'Strong cash flow generated from 4-year coastal operation. Steady debt-service coverage ratio of 1.42x. Good collateral in owned fixtures, slightly reduced due to secondary equipment lien.'
    },
    workingDeals: {
      claimedLendersCount: 2,
      maxSlots: 3,
      claims: [
        {
          lenderId: 'usr_lender_01',
          lenderAlias: 'Lender #4812 (Direct Commercial Fund)',
          claimedAt: '2026-10-03T09:15:00Z',
          status: 'ACTIVE_OFFER'
        },
        {
          lenderId: 'usr_lender_02',
          lenderAlias: 'Lender #9203 (Hospitality Capital Partners)',
          claimedAt: '2026-10-03T14:40:00Z',
          status: 'ACTIVE_OFFER'
        }
      ]
    },
    assignedRep: {
      id: 'usr_rep_01',
      name: 'Elena Rostova',
      email: 'elena.rostova@oalnetwork.com'
    },
    creditScore: 718,
    annualRevenue: 1850000,
    monthlyCashFlow: 38400,
    yearsInBusiness: 4.5,
    submittedAt: '2026-10-01T14:30:00Z',
    updatedAt: '2026-10-06T16:22:00Z'
  },
  {
    id: 'APP-2026-1094',
    borrowerId: 'usr_borrower_02',
    borrowerName: 'Anonymized Applicant #1094',
    businessName: 'Apex Heavy Freight Logistics Inc.',
    loanType: 'freight-trucking',
    programName: 'Freight & Trucking Capital',
    amount: 780000,
    loanPurpose: 'Acquiring 4 new Freightliner Cascadia trucks to fulfill dedicated supply chain contract',
    useOfFunds: 'Down payment and lease purchase of 4 Class 8 highway tractors with collision mitigation gear.',
    status: 'QUALIFIED',
    investmentIQ: {
      total: 162,
      max: 180,
      breakdown: {
        creditHistory: 66,
        businessPlan: 19,
        cashFlow: 45,
        collateral: 24,
        riskAssessment: 8
      },
      assessedAt: '2026-10-04T10:10:00Z',
      version: 'v2.4-Standard',
      explanation: 'Exceptional freight volume and signed Fortune 500 carrier contracts. Clean DOT compliance history for 6 years.'
    },
    workingDeals: {
      claimedLendersCount: 1,
      maxSlots: 3,
      claims: [
        {
          lenderId: 'usr_lender_01',
          lenderAlias: 'Lender #4812 (Direct Commercial Fund)',
          claimedAt: '2026-10-05T08:30:00Z',
          status: 'UNDER_REVIEW'
        }
      ]
    },
    assignedRep: {
      id: 'usr_rep_01',
      name: 'Elena Rostova',
      email: 'elena.rostova@oalnetwork.com'
    },
    creditScore: 742,
    annualRevenue: 3400000,
    monthlyCashFlow: 65200,
    yearsInBusiness: 6.0,
    submittedAt: '2026-10-03T18:00:00Z',
    updatedAt: '2026-10-05T08:30:00Z'
  },
  {
    id: 'APP-2026-1105',
    borrowerId: 'usr_borrower_03',
    borrowerName: 'Dr. Aaron Meyer DDS',
    businessName: 'SmileCraft Modern Dental Studio',
    loanType: 'dental',
    programName: 'Dental Practice Financing',
    amount: 320000,
    loanPurpose: '3D CBCT imaging suite upgrade and opening second operatory chair suite',
    useOfFunds: 'Planmeca 3D digital scanner acquisition, software integration, and operatory chair plumbing installation.',
    status: 'PROCESSING',
    investmentIQ: {
      total: 148,
      max: 180,
      breakdown: {
        creditHistory: 64,
        businessPlan: 17,
        cashFlow: 40,
        collateral: 20,
        riskAssessment: 7
      },
      assessedAt: '2026-09-28T15:00:00Z',
      version: 'v2.4-Standard',
      explanation: 'Consistent patient insurance receivables with low default rates. Professional credentials verified.'
    },
    workingDeals: {
      claimedLendersCount: 3,
      maxSlots: 3,
      claims: [
        {
          lenderId: 'usr_lender_01',
          lenderAlias: 'Lender #4812 (Direct Commercial Fund)',
          claimedAt: '2026-09-29T11:00:00Z',
          status: 'OFFER_ACCEPTED'
        },
        {
          lenderId: 'usr_lender_03',
          lenderAlias: 'Lender #7109 (MedVest Lending)',
          claimedAt: '2026-09-29T12:30:00Z',
          status: 'DECLINED'
        },
        {
          lenderId: 'usr_lender_04',
          lenderAlias: 'Lender #1550 (Horizon Healthcare Credit)',
          claimedAt: '2026-09-29T14:10:00Z',
          status: 'DECLINED'
        }
      ]
    },
    assignedRep: {
      id: 'usr_rep_01',
      name: 'Elena Rostova',
      email: 'elena.rostova@oalnetwork.com'
    },
    creditScore: 730,
    annualRevenue: 1250000,
    monthlyCashFlow: 31000,
    yearsInBusiness: 3.5,
    submittedAt: '2026-09-26T12:00:00Z',
    updatedAt: '2026-10-07T09:45:00Z'
  },
  {
    id: 'APP-2026-1120',
    borrowerId: 'usr_borrower_04',
    borrowerName: 'Chloe Bennett',
    businessName: 'Urban Crumb Mobile Bakery LLC',
    loanType: 'food-truck',
    programName: 'Food Truck Funding',
    amount: 115000,
    loanPurpose: 'Custom food truck fabrication and commercial generator installation',
    useOfFunds: '22ft step van custom buildout with convection deck ovens and mobile prep counters.',
    status: 'KYC_REVIEW',
    investmentIQ: {
      total: 138,
      max: 180,
      breakdown: {
        creditHistory: 58,
        businessPlan: 16,
        cashFlow: 38,
        collateral: 18,
        riskAssessment: 8
      },
      assessedAt: '2026-10-06T14:00:00Z',
      version: 'v2.4-Standard',
      explanation: 'Strong pop-up market demand and solid personal credit rating. Collateral limited to custom chassis build.'
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
    creditScore: 685,
    annualRevenue: 290000,
    monthlyCashFlow: 9200,
    yearsInBusiness: 2.0,
    submittedAt: '2026-10-05T17:15:00Z',
    updatedAt: '2026-10-07T11:00:00Z'
  },
  {
    id: 'APP-2026-1133',
    borrowerId: 'usr_borrower_05',
    borrowerName: 'Rev. Samuel Thorne',
    businessName: 'Grace Community Fellowship',
    loanType: 'church',
    programName: 'Church & Religious Facility',
    amount: 950000,
    loanPurpose: 'Sanctuary structural roof replacement and youth ministry education wing renovation',
    useOfFunds: 'Commercial roofing membranes, HVAC unit replacements, and 6 classrooms modernization.',
    status: 'FUNDED',
    investmentIQ: {
      total: 168,
      max: 180,
      breakdown: {
        creditHistory: 68,
        businessPlan: 19,
        cashFlow: 46,
        collateral: 26,
        riskAssessment: 9
      },
      assessedAt: '2026-09-15T11:00:00Z',
      version: 'v2.4-Standard',
      explanation: 'Exceptional 12-year historical parish tithes, low debt profile, and high unencumbered real property appraisal.'
    },
    workingDeals: {
      claimedLendersCount: 3,
      maxSlots: 3,
      claims: [
        {
          lenderId: 'usr_lender_01',
          lenderAlias: 'Lender #4812 (Direct Commercial Fund)',
          claimedAt: '2026-09-16T10:00:00Z',
          status: 'COMPLETED_FUNDED'
        }
      ]
    },
    assignedRep: {
      id: 'usr_rep_01',
      name: 'Elena Rostova',
      email: 'elena.rostova@oalnetwork.com'
    },
    creditScore: 760,
    annualRevenue: 1400000,
    monthlyCashFlow: 42000,
    yearsInBusiness: 12.0,
    submittedAt: '2026-09-12T09:00:00Z',
    updatedAt: '2026-10-01T15:00:00Z'
  },
  {
    id: 'APP-2026-1148',
    borrowerId: 'usr_borrower_06',
    borrowerName: 'Evelyn St. Claire',
    businessName: 'Coastal Heritage Bed & Breakfast',
    loanType: 'hospitality',
    programName: 'Hotel, Motel & Airbnb Capital',
    amount: 620000,
    loanPurpose: 'Historic inn preservation, new luxury suite additions, and commercial spa wing',
    useOfFunds: 'Renovation of 5 existing heritage suites and adding private thermal pools for guest amenity.',
    status: 'SUBMITTED',
    investmentIQ: null, // Scored after KYC
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
    creditScore: 710,
    annualRevenue: 850000,
    monthlyCashFlow: 24000,
    yearsInBusiness: 5.0,
    submittedAt: '2026-10-07T19:20:00Z',
    updatedAt: '2026-10-07T19:20:00Z'
  },
  {
    id: 'APP-2026-1152',
    borrowerId: 'usr_borrower_07',
    borrowerName: 'Tariq Al-Mansoor',
    businessName: 'Precision Lube & Auto Franchise #4',
    loanType: 'franchise',
    programName: 'Franchise Financing',
    amount: 280000,
    loanPurpose: 'Opening 4th authorized quick-lube automotive bay facility',
    useOfFunds: 'Hydraulic lift installations, diagnostic computers, and initial corporate inventory order.',
    status: 'QUALIFIED',
    investmentIQ: {
      total: 142,
      max: 180,
      breakdown: {
        creditHistory: 60,
        businessPlan: 18,
        cashFlow: 39,
        collateral: 18,
        riskAssessment: 7
      },
      assessedAt: '2026-10-06T15:30:00Z',
      version: 'v2.4-Standard',
      explanation: 'Proven franchise operator with 3 existing profitable units. High cash flow stability.'
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
    creditScore: 705,
    annualRevenue: 1600000,
    monthlyCashFlow: 32500,
    yearsInBusiness: 7.0,
    submittedAt: '2026-10-05T11:00:00Z',
    updatedAt: '2026-10-06T16:00:00Z'
  },
  {
    id: 'APP-2026-1160',
    borrowerId: 'usr_borrower_08',
    borrowerName: 'Bradley Cooper',
    businessName: 'Oakridge Residential Revival LLC',
    loanType: 'fix-and-flip',
    programName: 'Fix & Flip Commercial Lending',
    amount: 540000,
    loanPurpose: 'Acquisition and complete gut renovation of distressed historic triplex',
    useOfFunds: 'Purchase price funding ($380,000) and construction escrow draws ($160,000).',
    status: 'SCORED',
    investmentIQ: {
      total: 151,
      max: 180,
      breakdown: {
        creditHistory: 65,
        businessPlan: 17,
        cashFlow: 41,
        collateral: 21,
        riskAssessment: 7
      },
      assessedAt: '2026-10-07T12:00:00Z',
      version: 'v2.4-Standard',
      explanation: 'Strong investor flip track record (8 completed rehabs). Realistic Scope of Work and licensed contractor.'
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
    creditScore: 725,
    annualRevenue: 980000,
    monthlyCashFlow: 29000,
    yearsInBusiness: 4.0,
    submittedAt: '2026-10-06T16:45:00Z',
    updatedAt: '2026-10-07T12:00:00Z'
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'OFFER-8801',
    applicationId: 'APP-2026-1082',
    lenderId: 'usr_lender_01',
    lenderAlias: 'Lender #4812 (Direct Commercial Fund)',
    amount: 450000,
    interestRate: 7.85,
    termMonths: 48,
    monthlyPayment: 10948,
    originationFeePercent: 1.5,
    closingCosts: 6750,
    prepaymentPenalty: 'None after 12 months',
    requiredConditions: [
      'First-position UCC lien on new commercial kitchen equipment',
      'Proof of hazard & general liability insurance coverage',
      'Satisfactory final inspection upon equipment delivery'
    ],
    status: 'PENDING_BORROWER_REVIEW', // 'PENDING_BORROWER_REVIEW' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'WITHDRAWN'
    createdAt: '2026-10-05T14:10:00Z',
    expiresAt: '2026-10-19T23:59:59Z'
  },
  {
    id: 'OFFER-8802',
    applicationId: 'APP-2026-1082',
    lenderId: 'usr_lender_02',
    lenderAlias: 'Lender #9203 (Hospitality Capital Partners)',
    amount: 425000,
    interestRate: 8.25,
    termMonths: 60,
    monthlyPayment: 8670,
    originationFeePercent: 2.0,
    closingCosts: 8500,
    prepaymentPenalty: '2% year 1, 1% year 2, none thereafter',
    requiredConditions: [
      'Personal guarantee from majority owner',
      'Quarterly revenue reporting covenant (DSCR > 1.25x)',
      'Escrow deposit of 2 months monthly payments'
    ],
    status: 'PENDING_BORROWER_REVIEW',
    createdAt: '2026-10-06T09:30:00Z',
    expiresAt: '2026-10-20T23:59:59Z'
  },
  {
    id: 'OFFER-8719',
    applicationId: 'APP-2026-1105',
    lenderId: 'usr_lender_01',
    lenderAlias: 'Lender #4812 (Direct Commercial Fund)',
    amount: 320000,
    interestRate: 6.95,
    termMonths: 84,
    monthlyPayment: 4824,
    originationFeePercent: 1.25,
    closingCosts: 4000,
    prepaymentPenalty: 'None',
    requiredConditions: [
      'Verification of active state dental board license',
      'UCC filing on Planmeca 3D scanner hardware'
    ],
    status: 'ACCEPTED',
    createdAt: '2026-09-30T10:00:00Z',
    acceptedAt: '2026-10-02T16:15:00Z',
    expiresAt: '2026-10-14T23:59:59Z'
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: 'DOC-101',
    applicationId: 'APP-2026-1082',
    borrowerId: 'usr_borrower_01',
    title: 'Business Bank Statements (Past 6 Months)',
    category: 'Financial Statements',
    fileName: 'BlueHarbor_BankStatements_Apr_Sep2026.pdf',
    fileSize: '4.8 MB',
    status: 'VERIFIED', // 'REQUIRED' | 'UPLOADED' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED' | 'NEEDS_REPLACEMENT'
    uploadedAt: '2026-10-01T15:20:00Z',
    verifiedAt: '2026-10-02T09:40:00Z',
    reviewedBy: 'Victoria Sterling (Compliance Admin)',
    reviewerNotes: 'Verified healthy average daily balance of $48,200 with zero non-sufficient fund charges.'
  },
  {
    id: 'DOC-102',
    applicationId: 'APP-2026-1082',
    borrowerId: 'usr_borrower_01',
    title: 'Prior 2 Years Corporate Tax Returns',
    category: 'Tax Filings',
    fileName: 'BlueHarbor_Form1120S_2024_2025.pdf',
    fileSize: '7.1 MB',
    status: 'VERIFIED',
    uploadedAt: '2026-10-01T15:22:00Z',
    verifiedAt: '2026-10-02T10:15:00Z',
    reviewedBy: 'Victoria Sterling (Compliance Admin)',
    reviewerNotes: 'Adjusted EBITDA verified at $282,000 for FY2025.'
  },
  {
    id: 'DOC-103',
    applicationId: 'APP-2026-1082',
    borrowerId: 'usr_borrower_01',
    title: 'Commercial Kitchen Equipment Invoices & Quotes',
    category: 'Collateral / Equipment',
    fileName: 'Rational_Combi_Traulsen_Quotes_Oct2026.pdf',
    fileSize: '2.3 MB',
    status: 'VERIFIED',
    uploadedAt: '2026-10-01T15:25:00Z',
    verifiedAt: '2026-10-02T11:00:00Z',
    reviewedBy: 'Victoria Sterling (Compliance Admin)',
    reviewerNotes: 'New commercial kitchen hardware invoices match requested line items.'
  },
  {
    id: 'DOC-104',
    applicationId: 'APP-2026-1082',
    borrowerId: 'usr_borrower_01',
    title: 'Commercial Waterfront Lease Agreement',
    category: 'Legal Agreements',
    fileName: 'BlueHarbor_MasterLease_Expires2031.pdf',
    fileSize: '3.6 MB',
    status: 'VERIFIED',
    uploadedAt: '2026-10-01T15:30:00Z',
    verifiedAt: '2026-10-02T11:15:00Z',
    reviewedBy: 'Victoria Sterling (Compliance Admin)',
    reviewerNotes: 'Lease has 5 years remaining with two 5-year extensions.'
  },
  {
    id: 'DOC-105',
    applicationId: 'APP-2026-1120',
    borrowerId: 'usr_borrower_04',
    title: 'Food Vendor Health Department Permit',
    category: 'Licensing & Compliance',
    fileName: 'UrbanCrumb_HealthDept_DraftPermit.pdf',
    fileSize: '1.2 MB',
    status: 'NEEDS_REPLACEMENT',
    uploadedAt: '2026-10-05T17:30:00Z',
    reviewedBy: 'Victoria Sterling (Compliance Admin)',
    reviewerNotes: 'Submitted document is an expired temporary inspection notice. Please upload the active county annual operating permit.'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'MSG-301',
    conversationId: 'CONV_BORROWER_REP_1082',
    senderRole: 'borrower',
    senderId: 'usr_borrower_01',
    senderName: 'Marcus Vance',
    receiverRole: 'rep',
    receiverId: 'usr_rep_01',
    receiverName: 'Elena Rostova (OAL Rep)',
    applicationId: 'APP-2026-1082',
    text: 'Hi Elena, I see two lender offers on my dashboard today. Is the first offer from Lender #4812 able to waive the 12-month prepayment fee if we pay down early?',
    timestamp: '2026-10-06T10:14:00Z',
    read: true
  },
  {
    id: 'MSG-302',
    conversationId: 'CONV_BORROWER_REP_1082',
    senderRole: 'rep',
    senderId: 'usr_rep_01',
    senderName: 'Elena Rostova (OAL Rep)',
    receiverRole: 'borrower',
    receiverId: 'usr_borrower_01',
    receiverName: 'Marcus Vance',
    applicationId: 'APP-2026-1082',
    text: 'Good morning Marcus! Let me coordinate directly with the underwriting team at Lender #4812 through our secure representative bridge. I will check their prepayment flexibility and post their update right here.',
    timestamp: '2026-10-06T10:35:00Z',
    read: true
  },
  {
    id: 'MSG-303',
    conversationId: 'CONV_LENDER_REP_1082',
    senderRole: 'rep',
    senderId: 'usr_rep_01',
    senderName: 'Elena Rostova (OAL Rep)',
    receiverRole: 'lender',
    receiverId: 'usr_lender_01',
    receiverName: 'Apex Horizon Capital LLC',
    applicationId: 'APP-2026-1082',
    text: 'Hello Apex Underwriting. The borrower for deal APP-2026-1082 is reviewing your offer #OFFER-8801. They asked if the 12-month prepayment restriction could be shortened to 6 months. Can your committee grant this flexibility?',
    timestamp: '2026-10-06T11:02:00Z',
    read: true
  },
  {
    id: 'MSG-304',
    conversationId: 'CONV_LENDER_REP_1082',
    senderRole: 'lender',
    senderId: 'usr_lender_01',
    senderName: 'Apex Horizon Capital LLC',
    receiverRole: 'rep',
    receiverId: 'usr_rep_01',
    receiverName: 'Elena Rostova (OAL Rep)',
    applicationId: 'APP-2026-1082',
    text: 'Hi Elena. We reviewed the file: because their Investment IQ is 154 with clean cash flow, our risk committee can approve a 6-month prepayment clause if they close before the 19th.',
    timestamp: '2026-10-06T13:40:00Z',
    read: true
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'TCK-2026-041',
    subject: 'Question regarding equipment invoice upload format',
    category: 'Document Verification',
    priority: 'Normal',
    status: 'IN_PROGRESS',
    assignedTo: 'David Kim',
    userRole: 'Borrower',
    userName: 'Chloe Bennett',
    userEmail: 'chloe@urbanbreadtruck.com',
    createdAt: '2026-10-06T09:00:00Z',
    lastUpdated: '2026-10-06T11:30:00Z',
    messages: [
      {
        sender: 'Chloe Bennett',
        role: 'Borrower',
        text: 'Hello, our equipment supplier gave us a multi-page PDF with 4 separate invoices. Can I merge them into a single upload, or must each item be attached separately?',
        timestamp: '2026-10-06T09:00:00Z'
      },
      {
        sender: 'David Kim (Support Lead)',
        role: 'Support',
        text: 'Hi Chloe, merging all 4 invoices into a single comprehensive PDF under the "Collateral / Equipment Invoices" category is completely acceptable and speeds up the KYC verification team.',
        timestamp: '2026-10-06T11:30:00Z'
      }
    ],
    aiSuggestion: 'Hello Chloe! A single merged PDF containing all equipment itemizations is fully supported and preferred by our KYC compliance officers. Make sure each page clearly displays the supplier tax ID and serial/quote numbers.'
  },
  {
    id: 'TCK-2026-039',
    subject: 'Clarification on Working Deal claim limit policy',
    category: 'Marketplace Operations',
    priority: 'High',
    status: 'RESOLVED',
    assignedTo: 'David Kim',
    userRole: 'Lender',
    userName: 'Horizon Healthcare Credit',
    userEmail: 'deals@horizonhealthcare.com',
    createdAt: '2026-10-04T14:15:00Z',
    lastUpdated: '2026-10-05T10:00:00Z',
    messages: [
      {
        sender: 'Horizon Healthcare Credit',
        role: 'Lender',
        text: 'We attempted to claim working deal for APP-2026-1105 and received a DEAL_FULL error code. Could you clarify why?',
        timestamp: '2026-10-04T14:15:00Z'
      },
      {
        sender: 'David Kim (Support Lead)',
        role: 'Support',
        text: 'Under OAL Network marketplace rules (FR-08), each qualified application permits a maximum of 3 concurrent lender working deals to maintain borrower focus and avoid fragmented underwriting. Deal APP-2026-1105 already reached its 3 active lender claim cap.',
        timestamp: '2026-10-05T10:00:00Z'
      }
    ],
    aiSuggestion: 'Per platform policy FR-08, working deals are capped at 3 simultaneous institutional lenders. You will receive an AI Lead Alert if any existing claimant releases their slot.'
  }
];

export const INITIAL_KB_ARTICLES = [
  {
    id: 'KB-01',
    category: 'Borrower Guide',
    title: 'How is the 180-Point Investment IQ Calculated?',
    views: 1420,
    readTime: '4 min',
    summary: 'Understanding the 5 key pillars: Credit History (70), Cash Flow (50), Collateral (30), Business Plan (20), and Risk Assessment (10).',
    content: `The OAL Network Investment IQ is a proprietary assessment standard that rates commercial financing readiness up to a maximum of 180 points:
1. Credit History (Max 70 points): Examines personal and business credit reporting, payment histories, derogatory marks, and public filings.
2. Cash Flow (Max 50 points): Evaluates debt-service coverage ratio (DSCR), monthly operating cash flow consistency, and bank balance stability.
3. Collateral (Max 30 points): Accounts for physical asset value, real property equity, equipment invoices, and secondary liens.
4. Business Plan (Max 20 points): Assesses operational viability, management experience, revenue model, and target market forecast.
5. Overall Risk Assessment (Max 10 points): Industry risk factors, macroeconomic volatility, and regulatory compliance.

*Note: The score is an objective evaluation of marketplace readiness and does not constitute a guaranteed loan approval.`
  },
  {
    id: 'KB-02',
    category: 'Lender Rules',
    title: 'Understanding the 3-Lender Working Deal Limit',
    views: 890,
    readTime: '3 min',
    summary: 'Why OAL Network limits concurrent lender activity to 3 participants per deal and how atomic claims protect underwriters.',
    content: `Under OAL Network rule FR-08, no more than three institutional lenders can simultaneously hold an active Working Deal claim on any single loan application.

Benefits of the 3-Lender Cap:
- Prevents borrower fatigue and ensures high offer engagement.
- Protects lender underwriting time by eliminating overcrowded bidding wars.
- Anonymity is preserved: competing lender names are strictly obscured from other lenders.
- Slots are managed atomically to prevent race conditions.`
  },
  {
    id: 'KB-03',
    category: 'Compliance & Safety',
    title: 'Mediated Communication Architecture',
    views: 650,
    readTime: '3 min',
    summary: 'Why borrowers and lenders communicate exclusively through authorized OAL Representatives.',
    content: `To ensure regulatory compliance, fair lending practices, and clear audit records, the OAL Network implements mediated communications.
- Borrowers communicate directly with their dedicated OAL Representative.
- Lenders communicate directly with the OAL Representative handling the deal.
- Direct borrower-to-lender chat is strictly prohibited and structurally blocked on the platform.`
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-9901',
    timestamp: '2026-10-07T12:00:00Z',
    actor: 'System Scoring Engine (v2.4)',
    action: 'INVESTMENT_IQ_ASSESSED',
    target: 'APP-2026-1160',
    details: 'Calculated score 151/180 across 5 components. Application state transitioned to SCORED.',
    severity: 'INFO'
  },
  {
    id: 'AUD-9902',
    timestamp: '2026-10-06T16:22:00Z',
    actor: 'Lender #9203 (Hospitality Capital)',
    action: 'OFFER_SUBMITTED',
    target: 'APP-2026-1082',
    details: 'Offer #OFFER-8802 submitted for $425,000 @ 8.25%. OAL Rep notified in read-only mode.',
    severity: 'INFO'
  },
  {
    id: 'AUD-9903',
    timestamp: '2026-10-05T08:30:00Z',
    actor: 'Apex Horizon Capital LLC',
    action: 'WORKING_DEAL_CLAIMED',
    target: 'APP-2026-1094',
    details: 'Claimed slot 1 of 3 on Apex Heavy Freight Logistics application.',
    severity: 'INFO'
  },
  {
    id: 'AUD-9904',
    timestamp: '2026-10-02T16:15:00Z',
    actor: 'Marcus Vance (Borrower)',
    action: 'OFFER_ACCEPTED',
    target: 'APP-2026-1105',
    details: 'Accepted offer #OFFER-8719 from Lender #4812 ($320,000 @ 6.95%). Loan state transitioned to PROCESSING.',
    severity: 'SUCCESS'
  },
  {
    id: 'AUD-9905',
    timestamp: '2026-10-02T10:15:00Z',
    actor: 'Victoria Sterling (Compliance Admin)',
    action: 'KYC_DOCUMENT_VERIFIED',
    target: 'DOC-102 (APP-2026-1082)',
    details: 'Verified 2-year Corporate Tax Returns. Adjusted EBITDA verified at $282,000.',
    severity: 'INFO'
  }
];

export const INITIAL_NETWORK_ACTIVITY = [
  {
    id: 'ACT-01',
    timestamp: '2 mins ago',
    type: 'NEW_QUALIFIED_LEAD',
    title: 'New Qualified Lead in Marketplace',
    description: 'Oakridge Residential Revival ($540k Fix & Flip) scored 151/180 IQ and entered the lender marketplace.',
    badge: 'Marketplace'
  },
  {
    id: 'ACT-02',
    timestamp: '18 mins ago',
    type: 'WORKING_DEAL_CLAIM',
    title: 'Working Deal Claimed',
    description: 'An institutional lender claimed working slot 2 of 3 on Blue Harbor Seafood Bistro ($450,000).',
    badge: 'Working Deal'
  },
  {
    id: 'ACT-03',
    timestamp: '1 hour ago',
    type: 'OFFER_SUBMITTED',
    title: 'Lender Offer Issued',
    description: 'New commercial offer submitted for $425,000 at 8.25% fixed. Borrower notified.',
    badge: 'Offers'
  },
  {
    id: 'ACT-04',
    timestamp: '3 hours ago',
    type: 'LOAN_FUNDED',
    title: 'Application Successfully Funded',
    description: 'Grace Community Fellowship ($950,000 Church Expansion) funding completed and disbursed.',
    badge: 'Funded'
  }
];
