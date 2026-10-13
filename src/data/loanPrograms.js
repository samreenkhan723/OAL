import { INDUSTRY_LOANS } from './industryLoans.js';

// Master Blueprint Loan Programs catalog strictly aligned with Client Sitemap Blueprint DOCX
export const BLUEPRINT_SPECIALTY_PROGRAMS = [
  {
    id: 'restaurant',
    slug: 'restaurant',
    title: 'Restaurant Loans',
    subtitle: 'Restaurants Loans',
    tagline: 'GOOD & BAD CREDIT • Commercial kitchen equipment, dining renovations, and leasehold improvements.',
    creditRequirement: 'GOOD & BAD CREDIT',
    approvalTime: 'Easy Approval Process',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Specialized commercial financing for full-service restaurants, bistros, and culinary establishments looking to purchase commercial kitchen appliances, expand dining seating, or manage seasonal inventory cash flows. Easy approval process accommodating both good and bad credit profiles.',
    icon: 'UtensilsCrossed',
    image: '/images/loan_restaurant.jpg',
    badge: 'GOOD & BAD CREDIT',
    eligiblePurposes: [
      'Commercial kitchen equipment purchases & leasehold improvements',
      'Dining room renovation, expansions, and outdoor seating',
      'Inventory, food & beverage reserves, and seasonal working capital',
      'Refinancing high-cost debt or vendor lines',
      'Second location acquisition or lease deposits'
    ],
    requiredDocuments: [
      'Last 6 months business bank statements',
      'Prior 2 years business tax returns (if operating > 2 years)',
      'Food service / local health department license',
      'Current commercial lease agreement',
      'Equipment purchase invoice (for equipment funding)'
    ]
  },
  {
    id: 'food-truck',
    slug: 'food-truck',
    title: 'Food Truck Loans',
    subtitle: 'Food Truck Loans',
    tagline: 'GOOD & BAD CREDIT • Custom vehicle purchase, commercial outfitting, generator systems, and prep inventory.',
    creditRequirement: 'GOOD & BAD CREDIT',
    approvalTime: 'Easy Approval Process',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Dedicated mobile food and beverage debt funding covering custom chassis fabrication, exhaust hood installations, commissary prep kitchen deposits, and initial operations. Easy approval process welcoming good and bad credit borrowers.',
    icon: 'Truck',
    image: '/images/loan_food_truck.jpg',
    badge: 'GOOD & BAD CREDIT',
    eligiblePurposes: [
      'Food truck vehicle purchase / chassis down payment',
      'Kitchen outfitting & certified fire suppression systems',
      'Commissary kitchen access fees & deposits',
      'Point-of-Sale (POS) & onboard commercial generator gear',
      'Permits, vinyl wraps & mobile route marketing launch'
    ],
    requiredDocuments: [
      'Last 4 months business bank statements (or personal for startups)',
      'Vehicle title / build quote from certified builder',
      'Mobile food vendor operating permit',
      'Driver license and government-issued ID',
      'Operating budget & estimated route forecast'
    ]
  },
  {
    id: 'franchise',
    slug: 'franchise',
    title: 'Buy A Franchise',
    subtitle: 'Buy New or Expansion — We Can Help',
    tagline: 'Buy New or Expansion • We Can Help • Initial franchise fees, territorial buildouts, and brand compliance.',
    creditRequirement: 'New & Established Franchisees',
    approvalTime: 'Easy Approval Process',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Tailored capital solutions for new and seasoned franchisees across retail, automotive, fitness, and quick-service restaurant (QSR) brands. Whether acquiring territory rights or completing mandatory brand remodels, our network connects you with specialized franchise lenders.',
    icon: 'Store',
    image: '/images/loan_franchise.jpg',
    badge: 'We Can Help',
    eligiblePurposes: [
      'Initial franchise fee payment and territorial licensing',
      'Standardized corporate store buildout & architectural packages',
      'Approved equipment and POS packages per franchisor guidelines',
      'Multi-territory rights acquisition',
      'Mandatory corporate remodel & brand refresh compliance'
    ],
    requiredDocuments: [
      'Franchise Disclosure Document (FDD)',
      'Signed Franchise Agreement or pre-approval certificate',
      'Personal financial statement (PFS)',
      '3-year financial projections and business plan',
      'General contractor store buildout estimate'
    ]
  },
  {
    id: 'dental',
    slug: 'dental-practice',
    title: 'Dental Practice Financing',
    subtitle: 'Startup, Equipment Upgrades, Purchases of Existing Practices',
    tagline: 'Startup, Equipment Upgrades, purchases of existing practices • CBCT 3D scanners, chair suites, and buy-ins.',
    creditRequirement: 'Practicing Dentists & Startups',
    approvalTime: 'Easy Approval Process',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Comprehensive financing for general dentists, orthodontists, pediatric dentists, and oral surgeons. Covers starting a new practice, purchasing an existing clinical practice, acquiring partner equity, or upgrading to 3D CBCT digital imaging suites.',
    icon: 'Smile',
    image: '/images/loan_dental.jpg',
    badge: 'Healthcare Specialist',
    eligiblePurposes: [
      'Purchases of existing dental practices or partner buyout',
      'Startup clinic buildout and architectural retrofits',
      '3D CBCT digital imaging, autoclave & operatory chair upgrades',
      'Commercial real estate acquisition for private practice',
      'Working capital during patient onboarding and insurance ramp-up'
    ],
    requiredDocuments: [
      'Current state dental license verification',
      'Prior 3 years practice tax returns or production history',
      'Practice production / collections reports',
      'Existing equipment valuation & liens list',
      'Practice valuation appraisal or purchase contract'
    ]
  },
  {
    id: 'freight-trucking',
    slug: 'freight-trucking',
    title: 'General Freight and Trucking',
    subtitle: 'Fleet Trucks / Owner Operator — GOOD & BAD CREDIT',
    tagline: 'Fleet Trucks / Owner Operator • GOOD & BAD CREDIT • Semi-tractors, reefer trailers, and fuel reserves.',
    creditRequirement: 'GOOD & BAD CREDIT',
    approvalTime: 'Typical approval Time: 2-24 hours',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Commercial transport debt financing for owner-operators and logistics fleets. Designed to handle diesel fuel volatility, Class 8 tractor purchases, maintenance overhauls, and freight factoring needs with fast 2-24 hour approvals.',
    icon: 'Container',
    image: '/images/loan_trucking.jpg',
    badge: '2-24 Hr Approval',
    eligiblePurposes: [
      'Class 8 semi-tractor & dry van / reefer trailer acquisitions',
      'Engine overhaul, transmission repairs & emissions equipment',
      'Fuel card funding & cash flow gap stabilization',
      'Commercial auto liability down payments',
      'Fleet telematics, cameras & ELD hardware compliance'
    ],
    requiredDocuments: [
      'Active DOT & MC authority certificates',
      'Last 6 months business bank statements',
      'Fleet equipment list with VIN numbers & mileage',
      'Driver loss runs & insurance certificates',
      'Sample freight broker rate confirmations'
    ]
  },
  {
    id: 'hospitality',
    slug: 'hotel-motel-airbnb',
    title: 'Hotels / Motels / Airbnb',
    subtitle: 'Buy New, Purchases of Existing, Repair, Renovate, Remodel',
    tagline: 'Buy New, Purchases of Existing, Repair, Renovate, Remodel • Boutique hotels, motels, and Airbnb portfolios.',
    creditRequirement: 'Commercial Real Estate Borrowers',
    approvalTime: 'Easy Approval Process',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Commercial debt for boutique hotels, flagged motels, and short-term rental (Airbnb / VRBO) portfolios. Covers new construction acquisitions, purchases of existing properties, and comprehensive repair, renovation, and remodeling programs (PIP).',
    icon: 'Building2',
    image: '/images/loan_hospitality.jpg',
    badge: 'Hospitality Capital',
    eligiblePurposes: [
      'Purchases of existing hotel, motel, or Airbnb properties',
      'Buy new hospitality assets or vacant commercial buildings',
      'Repair, renovate, and remodel suites, roofing, and lobbies',
      'Property Improvement Plans (PIP) for franchised flags',
      'FF&E (Furniture, Fixtures & Equipment) updates'
    ],
    requiredDocuments: [
      'Historical occupancy, RevPAR, and booking platform statements',
      'Recent property appraisal & physical condition report',
      'Franchise PIP inspection report (if flagged hotel/motel)',
      'Operating income statements & rent rolls',
      'Principal sponsor real estate resume & portfolio track record'
    ]
  },
  {
    id: 'church',
    slug: 'church-facility',
    title: 'Church Loans',
    subtitle: 'Purchases of Existing, Repairs, Renovate, Equipment Purchases',
    tagline: 'Purchases of Existing, Repairs, Renovate, Equipment Purchases • Sanctuaries, sound systems, and youth halls.',
    creditRequirement: 'Religious & Faith Organizations',
    approvalTime: 'Easy Approval Process',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Respectful, mission-aligned commercial financing for houses of worship and nonprofit religious institutions. Specializing in purchasing existing church facilities, sanctuary expansions, structural repairs, and modern audiovisual sound gear.',
    icon: 'Landmark',
    image: '/images/loan_church.jpg',
    badge: 'Faith-Based Financing',
    eligiblePurposes: [
      'Purchases of existing church properties and worship facilities',
      'Structural repairs, HVAC upgrades, and roof renovations',
      'Sanctuary remodeling and increased seating capacity',
      'Audiovisual, sound lighting, and live broadcast system purchases',
      'Refinancing high balloon mortgages or private loans'
    ],
    requiredDocuments: [
      '501(c)(3) tax exemption determination letter',
      '3 years of church financial statements or CPA reviews',
      'Tithe & donation history (giving units records)',
      'Church board / trustee resolution approving borrowing',
      'Property title deed & current casualty insurance policy'
    ]
  },
  {
    id: 'fix-and-flip',
    slug: 'fix-and-flip',
    title: 'Fix & Flip Loans',
    subtitle: 'Real Estate Properties — GOOD & BAD CREDIT',
    tagline: 'Real Estate Properties • GOOD & BAD CREDIT • Fast bridge, acquisition, and rehab capital.',
    creditRequirement: 'GOOD & BAD CREDIT',
    approvalTime: 'Typical approval Time: 2-24 hours',
    fundingScope: '$10,000 to $500 Million+ (Network Scope)',
    minAmount: 10000,
    maxAmount: 500000000,
    termMonths: 'Flexible Commercial Terms',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tailored terms based on 180-point Investment IQ evaluation and competitive lender offers',
    description: 'Speed-focused bridge and rehabilitation debt for residential (1-4 unit) and commercial real estate investors. Designed to fund acquisitions at distressed prices with fast 2-24 hour approvals, regardless of credit challenges, based on after-repair asset value.',
    icon: 'Hammer',
    image: '/images/loan_fix_flip.jpg',
    badge: '2-24 Hr Approval',
    eligiblePurposes: [
      'Distressed property acquisition at auctions or off-market',
      '100% renovation budget escrow draws for repairs',
      'Short-term bridge financing prior to permanent refinance',
      'Multifamily cosmetic repositioning and modern upgrades',
      'Commercial property repositioning for resale'
    ],
    requiredDocuments: [
      'Purchase and Sale Agreement (PSA)',
      'Itemized Scope of Work (SOW) & contractor renovation budget',
      'As-Is & After-Repair-Value (ARV) appraisal report',
      'Investor track record of previously completed flip projects',
      'Proof of liquidity for down payment, closing costs, and reserves'
    ]
  }
];

// Map the 9 client-provided industry documents to standard loan program structure
export const INDUSTRY_PROGRAMS = INDUSTRY_LOANS.map(ind => ({
  id: ind.id,
  slug: ind.slug,
  title: ind.title,
  subtitle: ind.subtitle,
  tagline: ind.heroTagline,
  creditRequirement: 'Verified Commercial Underwriting',
  approvalTime: ind.approvalTime,
  fundingScope: ind.fundingScope,
  minAmount: ind.minAmount,
  maxAmount: ind.maxAmount,
  termMonths: 'Flexible Commercial Terms',
  typicalRate: 'Market Underwriting Rates',
  rateDescription: ind.rateDescription,
  description: ind.description,
  icon: ind.iconName,
  image: ind.image,
  badge: ind.badge,
  eligiblePurposes: ind.primaryPurposes,
  requiredDocuments: ind.requiredDocuments,
  isIndustryProgram: true
}));

// 10 Core Loan Types strictly aligned with Client requirement doc: "Loan Types – Home Page - OAL website .docx"
export const CORE_CLIENT_LOAN_TYPES = [
  {
    id: 'sba-loans',
    slug: 'sba-loans',
    title: 'SBA Loans – Financing',
    subtitle: 'SBA 7(a), 504 & Express Commercial Financing',
    tagline: 'Government-backed commercial financing with long repayment terms and low interest rates.',
    creditRequirement: 'Credit 650+ & 2+ Yrs Operations',
    approvalTime: '2–5 Business Days',
    fundingScope: '$50,000 to $5,000,000+',
    minAmount: 50000,
    maxAmount: 5000000,
    termMonths: '10 to 25 Years',
    typicalRate: 'Prime + 1.5% to Prime + 3.75%',
    rateDescription: 'Low government-subsidized rates underwritten with 180-Point Investment IQ evaluation',
    description: 'Small Business Administration (SBA) guaranteed financing providing low-cost capital for working capital, owner-occupied commercial real estate, equipment purchases, and business acquisitions.',
    icon: 'Landmark',
    image: '/images/loan_sba.jpg',
    badge: 'GOVERNMENT BACKED',
    eligiblePurposes: [
      'Commercial real estate acquisition or construction',
      'Long-term working capital and inventory stabilization',
      'Refinancing existing high-cost commercial debt',
      'Machinery, heavy equipment, and commercial vehicle purchases',
      'Business acquisition or partner buyout'
    ],
    requiredDocuments: [
      'Last 3 years business and personal tax returns',
      'Year-to-date Profit & Loss statement and balance sheet',
      'Schedule of existing business debt',
      'SBA Form 1919 (Borrower Information Form)',
      'Government-issued photo identification'
    ]
  },
  {
    id: 'business-line-of-credit',
    slug: 'business-line-of-credit',
    title: 'Business Line Of Credit',
    subtitle: 'Revolving Commercial Credit Line — Draw on Demand',
    tagline: 'GOOD & BAD CREDIT • Draw funds on demand, pay interest only on capital actively drawn.',
    creditRequirement: 'GOOD & BAD CREDIT',
    approvalTime: 'Typical approval: 2-24 hours',
    fundingScope: '$10,000 to $10,000,000+',
    minAmount: 10000,
    maxAmount: 10000000,
    termMonths: '12 to 36 Month Revolving',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Interest paid strictly on outstanding draw balance evaluated by 180-Point Investment IQ',
    description: 'A flexible, revolving commercial credit facility that gives business owners ongoing access to liquidity. Draw down capital as opportunities or cash flow gaps arise, repay to restore your credit line, and draw again.',
    icon: 'CreditCard',
    image: '/images/loan_line_of_credit.jpg',
    badge: 'REVOLVING CREDIT',
    eligiblePurposes: [
      'Immediate cash flow gap management during seasonal slowdowns',
      'Taking advantage of fast bulk inventory supplier discounts',
      'Emergency equipment repair and unanticipated payroll reserves',
      'Marketing campaign funding and new product launch liquidity',
      'Bridging delayed client payments and invoicing cycles'
    ],
    requiredDocuments: [
      'Last 4 months business bank statements',
      'Driver license or passport of principal owners',
      'Voided business check for direct draw wire setup',
      'Basic business entity formation documentation'
    ]
  },
  {
    id: 'working-capital',
    slug: 'working-capital',
    title: 'Working Capital Loans',
    subtitle: 'Short-Term Operational Liquidity & Payroll Reserves',
    tagline: 'GOOD & BAD CREDIT • Fast direct wire funding to cover daily operational expenses and growth.',
    creditRequirement: 'GOOD & BAD CREDIT',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$10,000 to $25,000,000+',
    minAmount: 10000,
    maxAmount: 25000000,
    termMonths: '6 to 24 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Competitively priced short-term commercial debt matching your business cash flow cycles',
    description: 'Short-term debt capital tailored to manage day-to-day operational expenses, payroll obligations, vendor payments, and inventory stocking without selling equity or tying up fixed physical assets.',
    icon: 'Banknote',
    image: '/images/loan_working_capital.jpg',
    badge: 'DAILY LIQUIDITY',
    eligiblePurposes: [
      'Meeting periodic payroll and subcontractor payments',
      'Purchasing high-volume inventory ahead of peak retail seasons',
      'Covering operational overhead and unexpected facility repairs',
      'Marketing, advertising, and customer acquisition campaigns',
      'Bridging cash flow gaps between project milestone billings'
    ],
    requiredDocuments: [
      'Last 6 months commercial bank statements',
      'Recent year-to-date Profit & Loss statement',
      'Government-issued ID of managing owners',
      'Commercial business lease or operating agreement'
    ]
  },
  {
    id: 'equipment-leasing',
    slug: 'equipment-leasing',
    title: 'Equipment Leasing Loans',
    subtitle: 'Machinery, Commercial Fleets & Technology Lease-to-Own',
    tagline: 'Finance 100% of new or used commercial equipment with tax-deductible payments.',
    creditRequirement: 'All Credit Tiers Welcomed',
    approvalTime: '24–48 Hours Fast Approval',
    fundingScope: '$25,000 to $50,000,000+',
    minAmount: 25000,
    maxAmount: 50000000,
    termMonths: '24 to 84 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Asset-secured equipment rates with flexible buyout structures ($1 or Fair Market Value)',
    description: 'Structured lease and loan financing that allows companies to acquire mission-critical equipment, yellow iron machinery, manufacturing assembly lines, medical hardware, or commercial fleets without large upfront capital expenditures.',
    icon: 'Wrench',
    image: '/images/loan_equipment_leasing.jpg',
    badge: 'EQUIPMENT FINANCE',
    eligiblePurposes: [
      '100% equipment cost financing including shipping & installation',
      'Manufacturing CNC machinery, robotics, and assembly gear',
      'Construction yellow iron excavators, loaders, and cranes',
      'Healthcare diagnostic imaging, dental chairs, and medical tools',
      'Commercial fleet vehicles, box trucks, and vocational chassis'
    ],
    requiredDocuments: [
      'Equipment vendor invoice or purchase quote',
      'Last 4 months commercial bank statements',
      'Business equipment application form',
      'Equipment specifications and warranty documentation'
    ]
  },
  {
    id: 'real-estate-loan',
    slug: 'real-estate',
    title: 'Real Estate Loans',
    subtitle: 'Commercial Property Acquisition, Refinance & Development',
    tagline: 'Institutional debt for commercial offices, multifamily, retail centers, and industrial facilities.',
    creditRequirement: 'Commercial Asset Underwriting',
    approvalTime: 'Easy Approval Process',
    fundingScope: '$100,000 to $500 Million+',
    minAmount: 100000,
    maxAmount: 500000000,
    termMonths: '5 to 30 Years (Bridge & Perm)',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Underwritten based on property Net Operating Income (NOI), debt yield, and sponsor track record',
    description: 'Comprehensive commercial real estate (CRE) capital for purchasing, refinancing, or expanding owner-occupied and investor properties across all 50 states, backed by institutional syndications and private funds.',
    icon: 'Building2',
    image: '/images/industry_real_estate.jpg',
    badge: 'COMMERCIAL REAL ESTATE',
    eligiblePurposes: [
      'Commercial office, retail plaza, and multifamily acquisitions',
      'Cash-out refinancing to unlock equity for other venture investments',
      'Industrial warehouse and distribution center purchases',
      'Ground-up commercial construction and mixed-use development',
      'Bridge loans to stabilize recently purchased commercial properties'
    ],
    requiredDocuments: [
      'Purchase and Sale Agreement or existing mortgage note',
      'Current rent roll and operating statement (past 2-3 years)',
      'Property appraisal and environmental phase 1 report (if available)',
      'Borrower personal financial statement and real estate schedule'
    ]
  },
  {
    id: 'merchant-cash-advance',
    slug: 'merchant-cash-advance',
    title: 'Merchant Cash Advance Loans',
    subtitle: 'Revenue-Based Future Receivables Advance',
    tagline: 'Bad Credit OK • No hard collateral required • Paid back through a percentage of daily sales.',
    creditRequirement: 'GOOD & BAD CREDIT (Revenue Based)',
    approvalTime: 'Same-Day to 24 Hours Funding',
    fundingScope: '$10,000 to $5,000,000+',
    minAmount: 10000,
    maxAmount: 5000000,
    termMonths: '3 to 18 Months',
    typicalRate: 'Factor Rate 1.15 to 1.38',
    rateDescription: 'Flexible automated daily or weekly remittance aligned with your actual credit card receivables',
    description: 'A rapid cash injection calculated on your historic credit card processing and monthly gross revenues. Instead of a fixed monthly interest rate, payments fluctuate proportionally with your daily sales volume.',
    icon: 'Zap',
    image: '/images/loan_merchant_cash_advance.jpg',
    badge: 'SAME-DAY CAPITAL',
    eligiblePurposes: [
      'Urgent working capital and same-day liquidity needs',
      'Overcoming temporary seasonal cash declines',
      'Purchasing bulk inventory at steep supplier discounts',
      'Emergency tax settlement or payroll shortfall resolution',
      'Storefront remodeling, POS upgrades, and marketing pushes'
    ],
    requiredDocuments: [
      'Last 4 months business bank statements',
      'Last 4 months merchant processing statements',
      'Driver license and voided check',
      'Government EIN tax confirmation letter'
    ]
  },
  {
    id: 'startup-loans',
    slug: 'startup-loans',
    title: 'Startup Loans',
    subtitle: 'New Business Launch, Franchise Setup & Early Stage Growth',
    tagline: 'Seed funding for new business ventures with solid business plans or founder credit backing.',
    creditRequirement: 'Founder Credit & Projections',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$10,000 to $2,500,000+',
    minAmount: 10000,
    maxAmount: 2500000,
    termMonths: '12 to 60 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Structured startup debt solutions evaluated via our proprietary 180-Point Investment IQ standard',
    description: 'Designed specifically for businesses operating under 2 years or launching fresh concepts. Lenders evaluate personal guarantor credit, business plans, and revenue forecasts to supply crucial startup liquidity.',
    icon: 'Rocket',
    image: '/images/loan_startup.jpg',
    badge: 'STARTUP CAPITAL',
    eligiblePurposes: [
      'Initial commercial lease security deposits and space buildout',
      'Initial inventory purchases and wholesale vendor accounts',
      'Core software development, marketing, and brand launch campaigns',
      'Initial staff onboarding, licensing fees, and legal documentation',
      'Working capital cushion while scaling toward positive cash flow'
    ],
    requiredDocuments: [
      'Comprehensive business plan with 3-year revenue projections',
      'Personal financial statement (PFS) of primary founders',
      'Last 2 years personal tax returns for owners with > 20% equity',
      'Personal credit report or consent for soft credit evaluation'
    ]
  },
  {
    id: 'asset-based',
    slug: 'asset-based',
    title: 'Asset Based Loans',
    subtitle: 'Collateralized Financing on Accounts Receivable & Inventory',
    tagline: 'Leverage balance sheet assets to secure large credit facilities regardless of credit history.',
    creditRequirement: 'Asset & Collateral Backed',
    approvalTime: '2–4 Business Days',
    fundingScope: '$100,000 to $100 Million+',
    minAmount: 100000,
    maxAmount: 100000000,
    termMonths: '12 to 36 Months Revolving',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Lower cost commercial borrowing structured on verified collateral liquidation values',
    description: 'Asset-based lending (ABL) unlocks substantial borrowing capacity secured by company accounts receivable (A/R), inventory, heavy machinery, or marketable balance sheet securities.',
    icon: 'ShieldCheck',
    image: '/images/loan_asset_based.jpg',
    badge: 'COLLATERAL BACKED',
    eligiblePurposes: [
      'Rapidly scaling commercial distribution and fulfillment operations',
      'Turnaround financing and restructuring during debt workouts',
      'Mergers, acquisitions, and leveraged buyout liquidity',
      'Financing seasonal inventory build without dilution',
      'Refinancing restrictive bank covenants into flexible asset lines'
    ],
    requiredDocuments: [
      'Detailed accounts receivable aging report',
      'Current inventory valuation and perpetual ledger',
      'Balance sheet and income statements for prior 2 fiscal years',
      'Schedule of existing plant, property, and equipment (PP&E)'
    ]
  },
  {
    id: 'bad-credit',
    slug: 'bad-credit',
    title: 'Bad Credit Business Loans',
    subtitle: 'Cash-Flow Qualified Financing for Challenged Credit',
    tagline: 'Credit scores under 600 accepted • Lenders focus on revenue and monthly cash flow.',
    creditRequirement: 'GOOD & BAD CREDIT Welcome',
    approvalTime: 'Typical approval: 2–24 Hours',
    fundingScope: '$10,000 to $2,000,000+',
    minAmount: 10000,
    maxAmount: 2000000,
    termMonths: '6 to 18 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Cash-flow underwritten loans designed to fund businesses and rebuild creditworthiness',
    description: 'Past personal or business credit difficulties should not stop a healthy, cash-generating business from growing. Our lenders underwrite primarily based on current bank deposits and revenue consistency.',
    icon: 'CheckCircle2',
    image: '/images/loan_bad_credit.jpg',
    badge: 'BAD CREDIT OK',
    eligiblePurposes: [
      'Bridging sudden cash flow shortages during revenue hiccups',
      'Settling overdue tax liens or resolving past vendor disputes',
      'Purchasing essential inventory to fulfill confirmed customer orders',
      'Upgrading worn machinery to avoid costly operational shutdowns',
      'Rebuilding enterprise credit history through timely repayment'
    ],
    requiredDocuments: [
      'Last 4 months commercial business bank statements',
      'Government photo ID of majority business owner',
      'Recent business tax return (if available, not always required)',
      'Proof of commercial address or business utility bill'
    ]
  },
  {
    id: 'alternative-energy',
    slug: 'alternative-energy',
    title: 'Alternative Energy Loans',
    subtitle: 'Solar, Wind, Battery Storage & Clean Energy Infrastructure',
    tagline: 'Financing for commercial solar, wind installations, EV fleets, and sustainable energy projects.',
    creditRequirement: 'Verified Commercial Underwriting',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$100,000 to $500 Million+',
    minAmount: 100000,
    maxAmount: 500000000,
    termMonths: '5 to 20 Years',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Structured green energy debt underwritten via 180-Point Investment IQ evaluation',
    description: 'Comprehensive debt financing for renewable energy developers, green infrastructure retrofits, solar power arrays, and commercial battery storage projects.',
    icon: 'Zap',
    image: '/images/loan_alternative_energy.jpg',
    badge: 'CLEAN ENERGY',
    eligiblePurposes: [
      'Commercial solar photovoltaic & microgrid installation',
      'Battery energy storage systems (BESS) financing',
      'EV commercial charging hub infrastructure',
      'Clean tech facility retrofits and energy efficiency upgrades'
    ],
    requiredDocuments: [
      'Project engineering and interconnection feasibility study',
      'Power Purchase Agreement (PPA) or off-taker contract',
      'Last 3 years audited commercial financials',
      'Equipment procurement and EPC contractor agreements'
    ]
  },
  {
    id: 'business-acquisition',
    slug: 'business-acquisition',
    title: 'Business Acquisition Loans',
    subtitle: 'Mergers, Acquisitions, Partner Buyouts & Turnarounds',
    tagline: 'Capital to purchase existing profitable companies, competitor acquisitions, and partner buyouts.',
    creditRequirement: 'Deal Underwriting & Sponsor Resume',
    approvalTime: '2–5 Business Days',
    fundingScope: '$100,000 to $100 Million+',
    minAmount: 100000,
    maxAmount: 100000000,
    termMonths: '5 to 10 Years',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Cash flow underwritten debt based on target EBITDA and historical profitability',
    description: 'Acquisition debt facility designed to support entrepreneurs, corporate buyers, and management teams acquiring established cash-flowing businesses or buying out equity partners.',
    icon: 'Briefcase',
    image: '/images/loan_business_acquisition.jpg',
    badge: 'M&A FINANCING',
    eligiblePurposes: [
      'Purchasing 100% equity or assets of an existing business',
      'Buying out retiring partners or minority equity shareholders',
      'Strategic roll-ups and competitor market consolidation',
      'Post-acquisition working capital and modernization ramp'
    ],
    requiredDocuments: [
      'Signed Letter of Intent (LOI) or Asset Purchase Agreement',
      'Target company 3-year historical financial statements & tax returns',
      'Buyer resume and industry operating experience profile',
      'Target company debt schedule and current receivables aging'
    ]
  },
  {
    id: 'cash-advance',
    slug: 'cash-advance',
    title: 'Cash Advance Loans',
    subtitle: 'Fast Short-Term Capital Against Future Revenue',
    tagline: 'Fast liquidity advance designed to bridge cash flow without fixed collateral.',
    creditRequirement: 'GOOD & BAD CREDIT Welcome',
    approvalTime: 'Same-Day to 24 Hours Funding',
    fundingScope: '$10,000 to $2,000,000+',
    minAmount: 10000,
    maxAmount: 2000000,
    termMonths: '3 to 18 Months',
    typicalRate: 'Factor Rate 1.15 to 1.35',
    rateDescription: 'Repaid automatically through fixed daily or weekly percentage remittances',
    description: 'Immediate liquidity solution allowing businesses to monetize upcoming sales inflows rapidly to seize time-sensitive opportunities or resolve temporary operating crunches.',
    icon: 'Coins',
    image: '/images/loan_cash_advance.jpg',
    badge: 'FAST CAPITAL',
    eligiblePurposes: [
      'Emergency operating liquidity during revenue dips',
      'Snapping up closeout bulk inventory from suppliers',
      'Crucial unexpected equipment repairs or replacements',
      'Bridging delayed vendor payments and contract deliverables'
    ],
    requiredDocuments: [
      'Last 4 months commercial bank statements',
      'Government-issued ID of managing owner',
      'Voided corporate check for fast direct wire transfer'
    ]
  },
  {
    id: 'commercial-bridge',
    slug: 'commercial-bridge',
    title: 'Commercial Bridge Loans',
    subtitle: 'Short-Term Commercial Real Estate & Transition Financing',
    tagline: 'Interim financing to seize quick opportunities or stabilize commercial assets prior to permanent takeout.',
    creditRequirement: 'Asset Underwriting & Exit Strategy',
    approvalTime: '2–4 Business Days',
    fundingScope: '$250,000 to $500 Million+',
    minAmount: 250000,
    maxAmount: 500000000,
    termMonths: '12 to 36 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Fast closing interest-only debt designed for asset repositioning or lease-up',
    description: 'Time-sensitive debt capital for acquisitions, quick closes, property repositioning, and transitional commercial real estate where conventional bank loans are too slow to execute.',
    icon: 'TrendingUp',
    image: '/images/loan_commercial_bridge.jpg',
    badge: 'INTERIM BRIDGE',
    eligiblePurposes: [
      'Fast commercial real estate closing at auction or off-market',
      'Property repositioning, tenant lease-up, and cosmetic capital',
      'Bridging short-term liquidity before permanent mortgage refinance',
      'Discounted commercial mortgage note purchases'
    ],
    requiredDocuments: [
      'Property Purchase & Sale contract or deed of trust',
      'Current property rent roll and operating budget',
      'Itemized property renovation and stabilization schedule',
      'Sponsor commercial real estate experience track record'
    ]
  },
  {
    id: 'construction-equipment',
    slug: 'construction-equipment',
    title: 'Construction Equipment Loans',
    subtitle: 'Heavy Machinery, Cranes, Excavators & Earthmoving Gear',
    tagline: 'Lease and debt financing for heavy earthmoving machinery, paving equipment, and jobsite tools.',
    creditRequirement: 'Equipment Secured Underwriting',
    approvalTime: '24–48 Hours Fast Approval',
    fundingScope: '$25,000 to $25,000,000+',
    minAmount: 25000,
    maxAmount: 25000000,
    termMonths: '24 to 72 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Asset-secured rates structured around machine life cycle and job backlog',
    description: 'Commercial equipment debt and lease options for general contractors, civil engineers, and specialty trades looking to acquire new or used excavators, bulldozers, cranes, and paving gear.',
    icon: 'Hammer',
    image: '/images/loan_construction_equipment.jpg',
    badge: 'HEAVY MACHINERY',
    eligiblePurposes: [
      'Acquiring new or pre-owned Caterpillar, Komatsu, or Deere machinery',
      'Major diesel engine overhaul and hydraulic rebuild financing',
      'Jobsite generator trailers, concrete batchers, and compressors',
      'Replacing rented equipment with balance sheet assets'
    ],
    requiredDocuments: [
      'Dealer invoice or private party equipment bill of sale',
      'Machine serial number, hours meter reading, and specs',
      'Last 4 months commercial bank statements',
      'Current active construction contractor license'
    ]
  },
  {
    id: 'debt-restructuring',
    slug: 'debt-restructuring',
    title: 'Debt Restructuring Loans',
    subtitle: 'Consolidate High-Interest Debt into Sustainable Terms',
    tagline: 'Lower your monthly commercial debt burden by refinancing multiple merchant advances or high-rate loans.',
    creditRequirement: 'All Debt Profiles Analyzed',
    approvalTime: '2–4 Business Days',
    fundingScope: '$50,000 to $50,000,000+',
    minAmount: 50000,
    maxAmount: 50000000,
    termMonths: '24 to 60 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Blended term rates reducing monthly debt service by up to 50%',
    description: 'Commercial debt recapitalization that rolls multiple daily or weekly high-interest loans, cash advances, and expensive vendor lines into a single, structured monthly payment with extended amortization.',
    icon: 'FileText',
    image: '/images/loan_debt_restructuring.jpg',
    badge: 'DEBT CONSOLIDATION',
    eligiblePurposes: [
      'Consolidating stacked Merchant Cash Advances (MCAs)',
      'Refinancing balloon mortgages or restrictive promissory notes',
      'Eliminating predatory daily bank account debits',
      'Freeing up net working capital to restore operational profitability'
    ],
    requiredDocuments: [
      'Itemized commercial debt schedule with payoff letters',
      'Last 6 months business bank statements',
      'Recent Profit & Loss statement showing debt burden',
      'Government photo ID of majority business principals'
    ]
  },
  {
    id: 'doctors-loans',
    slug: 'doctors-loans',
    title: 'Doctors Loans',
    subtitle: 'Medical Practice Expansion, Clinics & Surgical Centers',
    tagline: 'Specialized healthcare commercial financing for physicians, surgery centers, and specialty clinics.',
    creditRequirement: 'Licensed Medical Practitioners',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$50,000 to $20,000,000+',
    minAmount: 50000,
    maxAmount: 20000000,
    termMonths: '3 to 10 Years',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Preferred medical professional tiers underwritten on historical practice billing collections',
    description: 'Designed exclusively for medical doctors (MD, DO), surgeons, and clinic directors looking to purchase or expand private clinical facilities, buy out partners, or invest in surgical suites.',
    icon: 'Heart',
    image: '/images/loan_doctors.jpg',
    badge: 'HEALTHCARE SPECIALIST',
    eligiblePurposes: [
      'Purchasing existing clinical medical practices or partner buy-ins',
      'Private clinical outpatient surgery suite expansion',
      'Commercial medical office space buildout and leaseholds',
      'Working capital to bridge insurance credentialing periods'
    ],
    requiredDocuments: [
      'Active medical license and state board standing verification',
      'Last 3 years practice financial statements or collections history',
      'Practice lease agreement or real estate purchase contract',
      'CV and professional profile of doctor principals'
    ]
  },
  {
    id: 'fleet-truck',
    slug: 'fleet-truck',
    title: 'Fleet Truck Loans',
    subtitle: 'Class 8 Tractors, Box Trucks, Vocational Vehicles & Trailers',
    tagline: 'Fleet expansion and replacement financing for logistics operators and freight carriers.',
    creditRequirement: 'GOOD & BAD CREDIT Welcome',
    approvalTime: 'Typical approval: 2-24 hours',
    fundingScope: '$50,000 to $50,000,000+',
    minAmount: 50000,
    maxAmount: 50000000,
    termMonths: '24 to 60 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Commercial transportation debt structured around freight route revenue and ELD history',
    description: 'Dedicated fleet capital helping motor carriers, delivery contractors, and vocational transport fleets acquire late-model semi-tractors, dry vans, reefers, and straight trucks.',
    icon: 'Truck',
    image: '/images/loan_fleet_truck.jpg',
    badge: 'FLEET EXPANSION',
    eligiblePurposes: [
      'Multi-vehicle commercial fleet order additions',
      'Replacing older, high-maintenance trucks with fuel-efficient units',
      'Down payments on bulk carrier equipment orders',
      'Financing telematics, dash cams, and ELD compliance overhauls'
    ],
    requiredDocuments: [
      'Active DOT / MC operating authority certificate',
      'Vehicle specs, VIN list, and dealer invoices',
      'Last 6 months commercial bank statements',
      'Commercial auto liability loss run reports'
    ]
  },
  {
    id: 'medical-equipment',
    slug: 'medical-equipment',
    title: 'Medical Equipment Loans',
    subtitle: 'Diagnostic Imaging, Surgical Hardware & Diagnostic Labs',
    tagline: 'Finance 100% of advanced medical, diagnostic MRI/CT scanners, and surgical suite equipment.',
    creditRequirement: 'Medical Providers & Clinics',
    approvalTime: '24–48 Hours Fast Approval',
    fundingScope: '$25,000 to $25,000,000+',
    minAmount: 25000,
    maxAmount: 25000000,
    termMonths: '24 to 84 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Tax-deductible equipment leasing structures tailored for clinical technology upgrades',
    description: 'Asset financing designed for healthcare clinics, laboratories, and hospitals to acquire advanced medical devices, ultrasound units, digital X-rays, dialysis machines, and sterilization systems.',
    icon: 'ShieldCheck',
    image: '/images/loan_medical_equipment.jpg',
    badge: 'MEDICAL GEAR',
    eligiblePurposes: [
      '100% cost of MRI, CT scan, ultrasound, and digital X-ray suites',
      'Outpatient ambulatory surgery center surgical hardware',
      'Hospital-grade clinical patient monitors and laboratory analyzers',
      'Software, licensing, and installation integration costs'
    ],
    requiredDocuments: [
      'Medical equipment vendor quote or invoice',
      'Last 4 months commercial bank statements',
      'Clinical facility operating license',
      'Medical director board credentials'
    ]
  },
  {
    id: 'medical-working-capital',
    slug: 'medical-working-capital',
    title: 'Medical Working Capital Loans',
    subtitle: 'Healthcare Receivables, Insurance Delay Cushion & Operating Cash',
    tagline: 'Bridge insurance billing lags, Medicare reimbursements, and clinical operating payroll.',
    creditRequirement: 'GOOD & BAD CREDIT Welcome',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$25,000 to $10,000,000+',
    minAmount: 25000,
    maxAmount: 10000000,
    termMonths: '6 to 36 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Working capital matched to medical billing schedules and patient volume growth',
    description: 'Working capital tailored for medical groups, home healthcare providers, diagnostic labs, and pharmacies facing 60–90 day payment cycles from commercial insurers and government programs.',
    icon: 'Banknote',
    image: '/images/loan_medical_working_capital.jpg',
    badge: 'HEALTHCARE WORKING CAPITAL',
    eligiblePurposes: [
      'Maintaining nursing, clinical staff, and doctor payroll',
      'Purchasing clinical pharmaceuticals and medical consumable supplies',
      'Navigating delayed third-party insurance claims reimbursements',
      'Opening satellite clinical locations or expanded treatment suites'
    ],
    requiredDocuments: [
      'Last 6 months commercial bank statements',
      'Accounts receivable aging by insurance payer category',
      'Current clinical operating licenses',
      'Recent Profit & Loss summary statement'
    ]
  },
  {
    id: 'owner-operator-truck',
    slug: 'owner-operator-truck',
    title: 'Owner-Operator Truck Loans',
    subtitle: 'Semi-Tractor Purchase, Overhaul & Fuel Reserves',
    tagline: 'Dedicated commercial vehicle loans for independent truckers, CDL drivers, and owner-operators.',
    creditRequirement: 'GOOD & BAD CREDIT (CDL Holders)',
    approvalTime: 'Typical approval: 2-24 hours',
    fundingScope: '$10,000 to $1,000,000+',
    minAmount: 10000,
    maxAmount: 1000000,
    termMonths: '12 to 48 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Fast truck loans evaluated on driver CDL experience, hauling contracts, and deposits',
    description: 'Specialized financing for independent owner-operators purchasing their first Class 8 tractor, upgrading their trailer, or covering catastrophic engine and transmission overhaul repairs.',
    icon: 'Container',
    image: '/images/loan_owner_operator_truck.jpg',
    badge: 'OWNER OPERATOR',
    eligiblePurposes: [
      'Class 8 day cab or sleeper tractor purchase',
      'Dry van, flatbed, step-deck, or reefer trailer financing',
      'Engine rebuild, transmission overhaul, and emissions repairs',
      'Initial fuel card reserves and commercial insurance down payments'
    ],
    requiredDocuments: [
      'Valid Commercial Driver License (CDL)',
      'Last 4 months commercial or personal bank statements',
      'Vehicle invoice or private party bill of sale with VIN',
      'Copy of carrier lease agreement or active authority'
    ]
  },
  {
    id: 'revenue-based',
    slug: 'revenue-based',
    title: 'Revenue-Based Loans',
    subtitle: 'Flexible Repayment Tied to Monthly Enterprise Sales',
    tagline: 'Non-dilutive growth debt where monthly payments flex with your actual revenues.',
    creditRequirement: 'Revenue Verified Underwriting',
    approvalTime: '24–48 Hours Fast Funding',
    fundingScope: '$25,000 to $15,000,000+',
    minAmount: 25000,
    maxAmount: 15000000,
    termMonths: '12 to 36 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Fixed repayment cap with dynamic monthly payments matching fluctuating income',
    description: 'Growth capital for SaaS, e-commerce, and high-margin recurring revenue businesses. Payments adjust dynamically based on your monthly revenue receipts, protecting your cash reserves during slower months.',
    icon: 'TrendingUp',
    image: '/images/loan_revenue_based.jpg',
    badge: 'REVENUE FINANCING',
    eligiblePurposes: [
      'Product engineering, feature development, and infrastructure scaling',
      'Digital customer acquisition, paid marketing, and sales expansion',
      'Hiring senior technical and operational talent',
      'Non-dilutive bridge capital before institutional equity rounds'
    ],
    requiredDocuments: [
      'Last 6 months commercial bank statements',
      'Stripe, merchant, or accounting revenue dashboard access',
      'Monthly recurring revenue (MRR) and customer churn reports',
      'Basic entity formation and cap table summary'
    ]
  },
  {
    id: 'sale-and-leaseback',
    slug: 'sale-and-leaseback',
    title: 'Sale and Leaseback Loans',
    subtitle: 'Unlock Balance Sheet Equity from Real Estate & Machinery',
    tagline: 'Monetize owned corporate real estate or industrial equipment while retaining full operational use.',
    creditRequirement: 'Asset Underwriting & Lease Ability',
    approvalTime: '3–7 Business Days',
    fundingScope: '$250,000 to $100 Million+',
    minAmount: 250000,
    maxAmount: 100000000,
    termMonths: '5 to 20 Years NNN Lease',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Capital unlocked at full fair market value with tax-efficient leaseback structures',
    description: 'Enables companies to sell owned corporate real estate, warehouses, manufacturing facilities, or heavy machinery to institutional capital and immediately lease them back on a long-term triple-net (NNN) basis.',
    icon: 'Repeat',
    image: '/images/loan_sale_leaseback.jpg',
    badge: 'SALE LEASEBACK',
    eligiblePurposes: [
      'Unlocking 100% of illiquid equity tied up in physical assets',
      'Paying off expensive existing debt to clean up the balance sheet',
      'Funding major operational acquisitions without bank covenants',
      'Reinvesting real estate capital directly into core business operations'
    ],
    requiredDocuments: [
      'Property title deed or equipment asset register with serials',
      'Recent certified appraisal or broker price opinion (BPO)',
      'Last 3 years audited financial statements of the operating tenant',
      'Proposed lease terms and operational facility overview'
    ]
  },
  {
    id: 'securities-based',
    slug: 'securities-based',
    title: 'Securities-Based Loans',
    subtitle: 'Non-Purpose Liquidity Lines Backed by Marketable Securities',
    tagline: 'Access low-interest credit lines without liquidating your stock, bond, or mutual fund holdings.',
    creditRequirement: 'Marketable Securities Portfolio',
    approvalTime: '24–72 Hours Fast Funding',
    fundingScope: '$100,000 to $250 Million+',
    minAmount: 100000,
    maxAmount: 250000000,
    termMonths: 'Revolving Credit Line',
    typicalRate: 'SOFR + 1.25% to SOFR + 3.0%',
    rateDescription: 'Ultra-competitive revolving rates secured by verified liquid brokerage assets',
    description: 'Non-purpose credit lines that allow high-net-worth business owners and accredited investors to borrow against equities, bonds, treasuries, and mutual funds without triggering capital gains taxes or liquidating long-term positions.',
    icon: 'Coins',
    image: '/images/loan_securities_based.jpg',
    badge: 'SECURITIES BACKED',
    eligiblePurposes: [
      'Acquiring commercial business ventures or bridge equity investments',
      'Short-term commercial real estate earnest deposits and down payments',
      'Tax bill payments and liquidity events without selling securities',
      'Opportunistic business purchases requiring immediate wire delivery'
    ],
    requiredDocuments: [
      'Most recent custodian brokerage account statements (past 3 months)',
      'Proof of identity and legal ownership of securities portfolio',
      'Securities-based loan application and pledge authorization'
    ]
  },
  {
    id: 'solar-energy',
    slug: 'solar-energy',
    title: 'Solar Energy Loans',
    subtitle: 'Commercial Rooftop & Ground-Mounted Solar Arrays',
    tagline: 'Commercial solar installations, battery storage microgrids, and green tax credit monetization.',
    creditRequirement: 'Commercial Underwriting & PPA',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$50,000 to $100 Million+',
    minAmount: 50000,
    maxAmount: 100000000,
    termMonths: '5 to 25 Years',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Subsidized green energy debt leveraging federal Investment Tax Credits (ITC)',
    description: 'Dedicated debt capital for commercial property owners, industrial facilities, agricultural growers, and schools installing solar PV arrays, energy storage, and smart microgrids to reduce electrical overhead.',
    icon: 'Sun',
    image: '/images/loan_solar_energy.jpg',
    badge: 'SOLAR CAPITAL',
    eligiblePurposes: [
      '100% turnkey commercial solar photovoltaic array installations',
      'Commercial battery energy storage systems (BESS) integration',
      'Roof reinforcement, electrical panel upgrades, and inverter gear',
      'Monetizing Section 48 Investment Tax Credits (ITC)'
    ],
    requiredDocuments: [
      'Solar system engineering design and production estimates',
      'Commercial building utility bills for prior 12 months',
      'EPC contractor proposal and equipment warranty schedules',
      'Property ownership deed or landlord solar installation consent'
    ]
  },
  {
    id: 'unsecured-business',
    slug: 'unsecured-business',
    title: 'Unsecured Business Loans',
    subtitle: 'Fast Working Capital With No Hard Asset Collateral Required',
    tagline: 'Unsecured debt approved based on business cash flow, bank statements, and revenue performance.',
    creditRequirement: 'GOOD & BAD CREDIT (Revenue Verified)',
    approvalTime: 'Typical approval: 2–24 Hours',
    fundingScope: '$10,000 to $1,500,000+',
    minAmount: 10000,
    maxAmount: 1500000,
    termMonths: '6 to 24 Months',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Underwritten on monthly gross deposits with zero liens placed on physical property',
    description: 'Unsecured commercial financing for business owners who lack significant physical collateral or real estate. Approvals are driven by historical bank deposits, operational longevity, and cash flow consistency.',
    icon: 'ShieldCheck',
    image: '/images/loan_unsecured_business.jpg',
    badge: 'NO COLLATERAL',
    eligiblePurposes: [
      'Unrestricted business working capital and payroll stabilization',
      'Funding digital marketing, customer acquisition, and promotions',
      'Hiring new staff and expanding office or storefront locations',
      'Taking advantage of fast bulk supplier purchasing opportunities'
    ],
    requiredDocuments: [
      'Last 4 months commercial bank statements',
      'Government photo ID of majority business owner',
      'Voided corporate check for direct bank transfer'
    ]
  },
  {
    id: 'used-aircraft',
    slug: 'used-aircraft',
    title: 'Used Aircraft Loans',
    subtitle: 'General Aviation, Turboprops & Corporate Jet Financing',
    tagline: 'Asset-based debt for pre-owned corporate aircraft, helicopters, and freight turboprops.',
    creditRequirement: 'Aviation Asset Underwriting',
    approvalTime: '3–7 Business Days',
    fundingScope: '$100,000 to $50,000,000+',
    minAmount: 100000,
    maxAmount: 50000000,
    termMonths: '5 to 15 Years (Amortized to 20)',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Aviation collateral debt structured around airframe and engine logbook values',
    description: 'Specialized aviation debt capital for purchasing pre-owned piston twins, corporate turboprops, light jets, and cargo aircraft for commercial logistics and business executive travel.',
    icon: 'Plane',
    image: '/images/loan_used_aircraft.jpg',
    badge: 'AIRCRAFT CAPITAL',
    eligiblePurposes: [
      'Pre-owned corporate jet or turboprop acquisitions',
      'Scheduled engine overhaul, avionics upgrades, and ADS-B gear',
      'Aviation charter fleet expansion and fractional share financing',
      'Refinancing existing aviation debt notes into favorable rates'
    ],
    requiredDocuments: [
      'Aircraft specifications sheet, FAA N-number, and serial number',
      'Airframe, engine, and APU total time and logbook maintenance logs',
      'Purchase and Sale Agreement with pre-purchase inspection clause',
      'Borrower/Entity financial statements and flight usage overview'
    ]
  },
  {
    id: 'veterinarians',
    slug: 'veterinarians',
    title: 'Veterinarians Loans',
    subtitle: 'Veterinary Clinics, Animal Hospitals & Diagnostics',
    tagline: 'Practice acquisition, surgical suite outfitting, and working capital for veterinary doctors.',
    creditRequirement: 'Practicing DVMs & Startups',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$25,000 to $10,000,000+',
    minAmount: 25000,
    maxAmount: 10000000,
    termMonths: '3 to 10 Years',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Preferred clinical veterinary underwriting tier with flexible structured terms',
    description: 'Dedicated commercial financing for Doctor of Veterinary Medicine (DVM) practitioners. Designed for acquiring existing animal hospitals, opening emergency vet clinics, or purchasing diagnostic ultrasound and digital radiography suites.',
    icon: 'Heart',
    image: '/images/loan_veterinarians.jpg',
    badge: 'VET PRACTICE',
    eligiblePurposes: [
      'Purchasing an existing veterinary practice or partner buyout',
      'Digital X-ray, ultrasound, anesthesia, and surgical suites',
      'Clinic real estate purchase or commercial suite buildout',
      'Veterinary pharmacy inventory and initial working capital'
    ],
    requiredDocuments: [
      'Active DVM state veterinary license verification',
      'Last 3 years practice financial tax returns or production history',
      'Veterinary facility lease agreement or property purchase contract',
      'Equipment quote for veterinary diagnostic and surgery hardware'
    ]
  },
  {
    id: 'wind-energy',
    slug: 'wind-energy',
    title: 'Wind Energy Loans',
    subtitle: 'Commercial Wind Turbines & Clean Power Generation',
    tagline: 'Project debt financing for commercial wind turbine development and renewable power utilities.',
    creditRequirement: 'Utility & PPA Backed Underwriting',
    approvalTime: '24–72 Hours Funding',
    fundingScope: '$250,000 to $500 Million+',
    minAmount: 250000,
    maxAmount: 500000000,
    termMonths: '5 to 25 Years',
    typicalRate: 'Market Underwriting Rates',
    rateDescription: 'Project debt facility leveraged against long-term utility grid power purchase agreements',
    description: 'Structured capital solutions for commercial wind energy projects, distributed wind generation for industrial parks, and utility-scale turbine construction across rural and commercial energy corridors.',
    icon: 'Wind',
    image: '/images/loan_wind_energy.jpg',
    badge: 'WIND UTILITY',
    eligiblePurposes: [
      'Procurement of commercial wind turbines and tower structures',
      'Substation interconnection, transmission lines, and civil site work',
      'Pre-construction meteorological wind assessment and environmental permitting',
      'Monetizing renewable Production Tax Credits (PTC)'
    ],
    requiredDocuments: [
      'Wind resource assessment and meteorological tower historical data',
      'Executed Interconnection Agreement with regional utility grid',
      'Signed Power Purchase Agreement (PPA) with creditworthy off-taker',
      'EPC contractor build agreement and equipment manufacturer warranty'
    ]
  }
];

// 6 non-overlapping blueprint programs (freight-trucking and hospitality omitted from loan catalog to prevent duplicates/overlap)
export const BLUEPRINT_CLEAN_PROGRAMS = BLUEPRINT_SPECIALTY_PROGRAMS.filter(p => 
  p.id !== 'freight-trucking' && p.id !== 'hospitality'
);

// All 34 Non-Overlapping Commercial Loan Programs strictly aligned with Client requirement doc:
// "Loan Types – Home Page - OAL website .docx"
export const CLEAN_34_LOAN_PROGRAMS = [
  ...BLUEPRINT_CLEAN_PROGRAMS,
  ...CORE_CLIENT_LOAN_TYPES
];

export const ORIGINAL_LOAN_PROGRAMS = [
  ...BLUEPRINT_SPECIALTY_PROGRAMS,
  ...CORE_CLIENT_LOAN_TYPES
];

// Front-page specialty commercial loan programs strictly kept to the 8 blueprint programs (HomePage is 100% untouched)
export const SPECIALTY_PROGRAMS = [...BLUEPRINT_SPECIALTY_PROGRAMS];

// Master catalog strictly containing the 34 non-duplicate, non-overlapping loan programs for /loan-programs
export const LOAN_PROGRAMS = [...CLEAN_34_LOAN_PROGRAMS];

// Full catalog for detail route lookups and backwards compatibility
export const ALL_LOAN_PROGRAMS = [
  ...BLUEPRINT_SPECIALTY_PROGRAMS,
  ...CORE_CLIENT_LOAN_TYPES,
  ...INDUSTRY_PROGRAMS
];

