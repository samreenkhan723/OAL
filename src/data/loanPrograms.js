// Master Loan Programs catalog based on OAL Network PRD & Wireframe specifications
export const LOAN_PROGRAMS = [
  {
    id: 'restaurant',
    slug: 'restaurant',
    title: 'Restaurant Financing',
    tagline: 'Working capital, kitchen equipment, dining renovations, and leasehold improvements.',
    minAmount: 50000,
    maxAmount: 1500000,
    typicalRate: '7.2% - 11.5%',
    termMonths: '12 - 84 months',
    description: 'Designed for full-service restaurants, bistros, and culinary establishments looking to purchase commercial appliances, expand seating, or manage seasonal cash flow variations.',
    icon: 'UtensilsCrossed',
    badge: 'Popular',
    eligiblePurposes: [
      'Commercial kitchen equipment',
      'Dining room renovation & expansion',
      'Inventory & seasonal cash reserve',
      'Refinancing high-cost debt',
      'Second location expansion'
    ],
    requiredDocuments: [
      'Last 6 months business bank statements',
      'Prior 2 years business tax returns',
      'Food service / health department license',
      'Current commercial lease agreement',
      'Equipment purchase invoice (if equipment loan)'
    ]
  },
  {
    id: 'food-truck',
    slug: 'food-truck',
    title: 'Food Truck Funding',
    tagline: 'Custom vehicle purchase, commercial outfitting, generator systems, and prep inventory.',
    minAmount: 25000,
    maxAmount: 250000,
    typicalRate: '7.8% - 12.5%',
    termMonths: '12 - 60 months',
    description: 'Specialized mobile food and beverage funding covering custom chassis fabrication, exhaust hood installations, commissary prep kitchen deposits, and initial operations.',
    icon: 'Truck',
    badge: 'Fast Approval',
    eligiblePurposes: [
      'Food truck vehicle purchase / down payment',
      'Kitchen outfitting & fire suppression systems',
      'Commissary kitchen fees & deposits',
      'Point-of-Sale (POS) & generator power gear',
      'Permits, wraps & marketing launch'
    ],
    requiredDocuments: [
      'Last 4 months bank statements',
      'Vehicle title / build quote from manufacturer',
      'Mobile food vendor operating permit',
      'Driver license and personal credit report',
      'Operating budget & route forecast'
    ]
  },
  {
    id: 'franchise',
    slug: 'franchise',
    title: 'Franchise Financing',
    tagline: 'Initial franchise fees, territorial buildouts, multi-unit expansion, and brand compliance.',
    minAmount: 100000,
    maxAmount: 3000000,
    typicalRate: '6.9% - 9.8%',
    termMonths: '36 - 120 months',
    description: 'Tailored capital solutions for new and experienced franchisees across retail, automotive, fitness, and quick-service restaurant (QSR) brands.',
    icon: 'Store',
    badge: 'Enterprise',
    eligiblePurposes: [
      'Initial franchise fee payment',
      'Standardized corporate store buildout',
      'Approved equipment and POS packages',
      'Multi-territory rights acquisition',
      'Remodel & brand refresh mandate'
    ],
    requiredDocuments: [
      'Franchise Disclosure Document (FDD)',
      'Signed Franchise Agreement approval',
      'Personal financial statement (PFS)',
      '3-year financial projections',
      'General contractor buildout estimate'
    ]
  },
  {
    id: 'dental',
    slug: 'dental-practice',
    title: 'Dental Practice Financing',
    tagline: 'CBCT scanners, operatory chair suites, practice acquisitions, and buy-ins.',
    minAmount: 150000,
    maxAmount: 2500000,
    typicalRate: '5.9% - 8.4%',
    termMonths: '60 - 180 months',
    description: 'High-leverage financing for general dentists, orthodontists, and oral surgeons expanding operatories, buying into a partnership, or upgrading to 3D digital imaging.',
    icon: 'Smile',
    badge: 'Healthcare Tier',
    eligiblePurposes: [
      'Practice acquisition or partner buyout',
      '3D CBCT digital imaging & dental chairs',
      'Office buildout and architectural retrofits',
      'Commercial real estate acquisition',
      'Working capital during insurance transitions'
    ],
    requiredDocuments: [
      'Current state dental license verification',
      'Prior 3 years practice tax returns',
      'Practice production / collections reports',
      'Existing equipment valuation & liens',
      'Practice valuation or purchase contract'
    ]
  },
  {
    id: 'freight-trucking',
    slug: 'freight-trucking',
    title: 'Freight & Trucking Capital',
    tagline: 'Semi-truck fleet expansion, reefer trailers, maintenance reserves, and fuel factoring.',
    minAmount: 50000,
    maxAmount: 2000000,
    typicalRate: '7.5% - 11.9%',
    termMonths: '24 - 72 months',
    description: 'Dedicated commercial transport financing for owner-operators and mid-size fleet carriers navigating fuel cycles, equipment purchases, and freight contract expansion.',
    icon: 'Container',
    badge: 'Logistics',
    eligiblePurposes: [
      'Class 8 tractor & trailer acquisitions',
      'Engine overhaul & emissions repairs',
      'Fuel cards & cash flow stabilization',
      'Insurance down payments',
      'Fleet telematics & ELD hardware'
    ],
    requiredDocuments: [
      'Active DOT & MC authority certificates',
      'Last 6 months business bank statements',
      'Fleet equipment list with VIN numbers',
      'Driver loss runs & insurance certificates',
      'Sample broker rate confirmations'
    ]
  },
  {
    id: 'hospitality',
    slug: 'hotel-motel-airbnb',
    title: 'Hotel, Motel & Airbnb Capital',
    tagline: 'Property acquisition, PIP renovations, seasonal buffers, and short-term rental portfolios.',
    minAmount: 250000,
    maxAmount: 10000000,
    typicalRate: '6.8% - 10.2%',
    termMonths: '36 - 120 months',
    description: 'Commercial hospitality debt for boutique hotels, flagged motel renovations (PIP), and institutional short-term rental (STR) portfolio acquisitions.',
    icon: 'Building2',
    badge: 'Hospitality',
    eligiblePurposes: [
      'Property Improvement Plans (PIP)',
      'Boutique hotel / lodge acquisition',
      'STR multi-property portfolio purchase',
      'HVAC, roofing & swimming pool renovations',
      'FF&E (Furniture, Fixtures & Equipment)'
    ],
    requiredDocuments: [
      'STR historical occupancy & RevPAR data',
      'Recent property appraisal & condition report',
      'Franchise PIP inspection report (if flagged)',
      'Operating statements & rent rolls',
      'Sponsor real estate resume & track record'
    ]
  },
  {
    id: 'church',
    slug: 'church-facility',
    title: 'Church & Religious Facility',
    tagline: 'Sanctuary expansions, AV lighting systems, roof repair, and community centers.',
    minAmount: 100000,
    maxAmount: 5000000,
    typicalRate: '6.2% - 8.9%',
    termMonths: '60 - 240 months',
    description: 'Respectful, mission-aligned financing for houses of worship and nonprofit faith organizations seeking sanctuary expansions, land purchases, or structural repairs.',
    icon: 'Landmark',
    badge: 'Non-Profit',
    eligiblePurposes: [
      'Sanctuary expansion & balcony seating',
      'High-definition AV, sound & broadcast gear',
      'HVAC, roof & structural improvements',
      'Refinancing balloon mortgages',
      'Community outreach hall / youth annex'
    ],
    requiredDocuments: [
      '501(c)(3) tax determination letter',
      '3 years of audited church financial statements',
      'Tithe & donation history (giving units count)',
      'Church board resolution approving borrowing',
      'Property deed & current insurance coverage'
    ]
  },
  {
    id: 'fix-and-flip',
    slug: 'fix-and-flip',
    title: 'Fix & Flip Commercial Lending',
    tagline: 'Short-term acquisition and 100% rehab capital for residential & commercial investors.',
    minAmount: 100000,
    maxAmount: 3500000,
    typicalRate: '8.5% - 12.0%',
    termMonths: '6 - 24 months',
    description: 'Speed-focused bridge and rehab capital for real estate investors acquiring distressed residential (1-4 unit) or commercial properties for renovation and sale.',
    icon: 'Hammer',
    badge: 'Fast Close',
    eligiblePurposes: [
      'Distressed property acquisition (up to 90% LTC)',
      '100% renovation budget escrow draws',
      'Cash-out bridge prior to permanent financing',
      'Auction / off-market purchase funding',
      'Multi-family cosmetic repositioning'
    ],
    requiredDocuments: [
      'Purchase and Sale Agreement',
      'Itemized Scope of Work (SOW) & budget',
      'As-Is & After-Repair-Value (ARV) appraisal',
      'Investor track record (completed flips list)',
      'Proof of liquidity for down payment & reserves'
    ]
  }
];
