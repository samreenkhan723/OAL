import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  DollarSign,
  Briefcase,
  FileText,
  Download,
  Filter,
  Check,
  X,
  Upload,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Building2,
  Users,
  Lock,
  Calendar,
  Layers,
  MessageSquare,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

// 4 Official Tiers from Doc 4 Lines 13-22
const TIERS = [
  {
    key: 'VIP_DIAMOND',
    name: 'VIP Diamond Club',
    scoreRange: '175+ LINV IQ',
    minScore: 175,
    subtitle: 'Preferred Investor (Very Important Professionals)',
    badgeColor: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950',
    borderColor: 'border-amber-400',
    perks: [
      'Tier-1 Proprietary High-Yield Co-Investments',
      'Zero-Fee Direct Allocation Rights',
      'Direct Private Roundtable with OAL Placement Committee',
      'Quarterly In-Person Executive Investment Forums'
    ]
  },
  {
    key: 'MVP_MONEY',
    name: 'MVP Money Club',
    scoreRange: '140 – 164 LINV IQ',
    minScore: 140,
    subtitle: 'Advanced Professional Investors',
    badgeColor: 'bg-emerald-500 text-slate-950 font-bold',
    borderColor: 'border-emerald-500',
    perks: [
      'Mid-Market Commercial Syndicate Access (10-12% Yield)',
      'Priority Co-Investment Allocation in Working Deals',
      'INV-IQ Verified Certified Investor Green Check Badge',
      'Dedicated Placement Agent Servicing Desk (Elena Rostova)'
    ]
  },
  {
    key: 'OAL_CLUB',
    name: 'OAL Club',
    scoreRange: '59+ LINV IQ',
    minScore: 59,
    subtitle: 'Advanced Finance Training & Relations',
    badgeColor: 'bg-blue-600 text-white',
    borderColor: 'border-blue-400',
    perks: [
      'Marketplace Deal Insights & Syndication Webinars',
      'Financial Modeling & Balance Sheet Training',
      'TGM Club Graduate Networking Pool',
      'Standard Commercial Marketplace Access'
    ]
  },
  {
    key: 'TGM',
    name: 'Team Get Money (TGM)',
    scoreRange: '0 – 58 LINV IQ',
    minScore: 0,
    subtitle: 'Financial Development Program for Beginners',
    badgeColor: 'bg-slate-700 text-slate-200',
    borderColor: 'border-slate-300',
    perks: [
      'Credit Profile Remediation Coaching',
      'Business Plan & 20-Word Mission Restructuring',
      'DSCR Cash Flow Optimization Workshops',
      'Pathway to OAL Club Graduation'
    ]
  }
];

// Mock Private Syndicated Co-Investment Opportunities
const INITIAL_SYNDICATES = [
  {
    id: 'SYN-2026-4401',
    title: 'Atlantic Maritime Cold-Storage Infrastructure',
    industry: 'Freight & Logistics',
    location: 'Savannah, GA',
    targetCapital: 1250000,
    pledgedCapital: 1000000,
    minTicket: 25000,
    annualYield: 11.8,
    termMonths: 36,
    collateralType: '1st Lien Industrial Real Estate & Commercial Ammonia Freezers',
    dscr: '1.64x',
    sponsor: 'Apex Horizon Commercial Credit Fund',
    status: 'ACTIVE_SYNDICATION',
    closingInDays: 9,
    summary: 'Senior secured debt financing for a 45,000 sq ft deep-freeze distribution hub servicing major coastal freight carriers.'
  },
  {
    id: 'SYN-2026-4408',
    title: 'SmileCraft Multi-Operatory Dental Surgery Center',
    industry: 'Healthcare',
    location: 'Scottsdale, AZ',
    targetCapital: 850000,
    pledgedCapital: 552500,
    minTicket: 10000,
    annualYield: 10.5,
    termMonths: 48,
    collateralType: '1st Security Interest in 3D CBCT Imaging Equipment & Receivables',
    dscr: '1.58x',
    sponsor: 'MedVest Commercial Credit Fund',
    status: 'ACTIVE_SYNDICATION',
    closingInDays: 14,
    summary: 'Expansion financing for specialized implant surgical suite with verifiable private insurance receivables.'
  },
  {
    id: 'SYN-2026-4415',
    title: 'Waterfront Heritage Boutique Hotel & Spa Wing',
    industry: 'Hospitality',
    location: 'Charleston, SC',
    targetCapital: 2100000,
    pledgedCapital: 1890000,
    minTicket: 50000,
    annualYield: 12.4,
    termMonths: 60,
    collateralType: '1st Deed of Trust on 4.2-Acre Waterfront Parcel & Historic Inn',
    dscr: '1.49x',
    sponsor: 'Apex Horizon Commercial Credit Fund',
    status: 'ACTIVE_SYNDICATION',
    closingInDays: 4,
    summary: 'Luxury resort thermal mineral bath addition and expansion of 18 heritage suites with high historical occupancy.'
  }
];

export const MoneyClubMemberPortalPage = () => {
  const { currentUser, currentRole, addToast, sendMessage } = useApp();
  const navigate = useNavigate();

  // Active Tab: 'overview' | 'syndicates' | 'verification' | 'portfolio'
  const [activeTab, setActiveTab] = useState('overview');

  // Member's LINV IQ Score (Doc 4 Lines 5-7)
  const [memberScore, setMemberScore] = useState(154);
  const currentTier = TIERS.find(t => memberScore >= t.minScore) || TIERS[1];

  // Accreditation Status
  const [isAccredited, setIsAccredited] = useState(true);
  const [greenCheckBadge, setGreenCheckBadge] = useState(true);

  // Industry Filter for Syndicates
  const [selectedIndustry, setSelectedIndustry] = useState('ALL');

  // Modals
  const [selectedSyndicate, setSelectedSyndicate] = useState(null);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showContactElenaModal, setShowContactElenaModal] = useState(false);

  // Pledge Form State
  const [pledgeAmount, setPledgeAmount] = useState(25000);
  const [pledgeSignerName, setPledgeSignerName] = useState(currentUser?.name || 'Marcus Vance');
  const [pledgeConfirmedTerms, setPledgeConfirmedTerms] = useState(true);

  // User's Active Pledged Co-Investments
  const [myPledges, setMyPledges] = useState([
    {
      id: 'PLG-2026-8801',
      dealTitle: 'Atlantic Maritime Cold-Storage Infrastructure',
      amount: 25000,
      annualYield: 11.8,
      pledgedAt: '2026-10-04',
      status: 'CONFIRMED_COMMITTED',
      nextPayout: 'Nov 15, 2026',
      payoutAmount: 245.83
    }
  ]);

  // Special Accredited Investor Form State (Doc 4 Lines 74-99, 147-198)
  const [accreditationForm, setAccreditationForm] = useState({
    // Path 1: Individual Net Worth
    meetsNetWorth: true,
    netWorthExclHome: '1450000',
    // Path 2: Individual Income
    meetsIncome: true,
    income2024: '265000',
    income2025: '290000',
    jointSpouse: false,
    // Path 3: Entity
    isEntity: false,
    entityAssets: '6200000',
    entityName: currentUser?.company || 'Blue Harbor Bistro LLC',
    // Path 4: FINRA Licenses (Doc 4 Lines 139-146)
    hasSeries7: false,
    hasSeries65: true,
    hasSeries82: false,
    crdNumber: 'CRD-8821942',
    // Verification Evidence
    attestationType: 'CPA_LETTER', // 'CPA_LETTER' | 'W2_TAX_RETURNS' | 'FINRA_CRD' | 'BROKERAGE_STATEMENT'
    uploadedFileName: 'Marcus_Vance_CPA_Accreditation_Certification_2026.pdf',
    declarationAccepted: true
  });

  // Filtered Syndicates
  const filteredSyndicates = INITIAL_SYNDICATES.filter(deal => {
    if (selectedIndustry === 'ALL') return true;
    return deal.industry === selectedIndustry;
  });

  // Handlers for File Downloads (Creates real text/blob files and triggers direct download)
  const handleDownloadLinvIqDossier = () => {
    const content = `================================================================================
OAL NETWORK - THE MONEY CLUB 180 LINV IQ (LOAN INVESTMENT IQ) SCORE DOSSIER
================================================================================
MEMBER NAME               : ${currentUser?.name || 'Marcus Vance'}
COMPANY / ENTITY          : ${currentUser?.company || 'Blue Harbor Seafood Bistro LLC'}
MEMBER CLUB ID            : INV-CLUB-2026-9941
ISSUED DATE               : October 08, 2026
ACCREDITED INVESTOR       : ${isAccredited ? 'VERIFIED (SEC RULE 506(c))' : 'PENDING'}
GREEN CHECK BADGE         : ${greenCheckBadge ? 'ACTIVE & CERTIFIED' : 'INACTIVE'}
CURRENT CLUB TIER         : ${currentTier.name} (${currentTier.scoreRange})
--------------------------------------------------------------------------------
180 LINV IQ BREAKDOWN EVALUATION (DOC 4):
1. Credit History Score   : 62 / 70  (Strong Profile > 718 FICO • 0 Collections)
2. Business Plan Mission  : 18 / 20  (Concise 20-Word Mission & Multi-Year Strategy)
3. Operating Cash Flow    : 44 / 50  (Operating Cash Flow $38,400/mo • DSCR 1.42x)
4. Collateral Security    : 22 / 30  (Fixtures, Commercial Kitchen & Equipment)
5. Overall Risk Assessment: 08 / 10  (Low Default Profile • 4.5 Yrs Clean Operations)
--------------------------------------------------------------------------------
TOTAL 180 LINV IQ SCORE   : ${memberScore} / 180 (MVP MONEY CLUB ADVANCED TIER)
TIER ELEVATION TARGET     : 21 Points Required for VIP Diamond Club (175+ LINV IQ)
--------------------------------------------------------------------------------
CERTIFIED UNDERWRITING AUTHORITY:
Elena Rostova, Senior Commercial Placement Specialist
Victoria Sterling, Chief Compliance Officer, OAL Network HQ
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_180_LINV_IQ_Dossier_${currentUser?.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('LINV IQ Score Dossier Downloaded', '180-Point Investment IQ evaluation saved to your device.', 'success');
    }
  };

  const handleDownloadOfferingMemorandum = (deal) => {
    const content = `================================================================================
CONFIDENTIAL PRIVATE PLACEMENT MEMORANDUM & SYNDICATION OFFERING SUMMARY
================================================================================
DEAL REFERENCE ID         : ${deal.id}
DEAL TITLE                : ${deal.title}
FACILITY TYPE             : Senior Secured Commercial Debt Syndicate
ISSUING SPONSOR           : ${deal.sponsor}
TARGET CAPITAL TOTAL      : $${deal.targetCapital.toLocaleString('en-US', { minimumFractionDigits: 2 })}
PLEDGED / COMMITTED       : $${deal.pledgedCapital.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${((deal.pledgedCapital / deal.targetCapital) * 100).toFixed(1)}% Filled)
REMAINING CAPACITY        : $${(deal.targetCapital - deal.pledgedCapital).toLocaleString('en-US', { minimumFractionDigits: 2 })}
MINIMUM INVESTMENT TICKET : $${deal.minTicket.toLocaleString('en-US', { minimumFractionDigits: 2 })}
PROJECTED FIXED NET YIELD : ${deal.annualYield}% Annualized Fixed Return
TENOR / TERM              : ${deal.termMonths} Months (Quarterly Interest Distributions)
COLLATERAL SECURITY       : ${deal.collateralType}
DSCR COVERAGE             : ${deal.dscr}
LOCATION                  : ${deal.location}
--------------------------------------------------------------------------------
INVESTMENT OVERVIEW:
${deal.summary}
--------------------------------------------------------------------------------
REGULATORY NOTICE:
Offered strictly to Accredited Investors under SEC Rule 506(c) of Regulation D.
Verification managed by OAL Network Investment Club Servicing Division.
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_Syndicate_Offering_Memorandum_${deal.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Offering Memorandum Downloaded', `Confidential PPM for ${deal.id} saved to your device.`, 'info');
    }
  };

  const handleDownloadAccreditationCertificate = () => {
    const content = `================================================================================
CERTIFICATE OF ACCREDITED INVESTOR VERIFICATION (SEC RULE 506(c) / REG D)
================================================================================
CERTIFICATE REFERENCE     : SEC-506C-OAL-2026-884102
VERIFIED INVESTOR ENTITY  : ${currentUser?.name || 'Marcus Vance'}
ENTITY AFFILIATION        : ${currentUser?.company || 'Blue Harbor Seafood Bistro LLC'}
DATE OF VERIFICATION      : October 08, 2026
VALIDITY PERIOD           : Valid through October 08, 2027 (Annual Renewal Required)
VERIFICATION AGENT        : OAL Network Commercial Servicing & Compliance Division
--------------------------------------------------------------------------------
STATUTORY CRITERIA SATISFIED (DOC 4):
[X] Individual Net Worth Exceeding $1,000,000 (Excluding Primary Residence)
[X] Individual Annual Gross Income Exceeding $200,000 for Past 2 Years
[X] Professional FINRA Securities Registration: Series 65 (CRD #8821942)
[X] Certified Attestation Letter from Independent CPA on File
--------------------------------------------------------------------------------
INV-IQ BADGE DESIGNATION:
"INV-IQ Verified Certified Investor with Green Check Badge"
Tier Ranking: MVP Money Club (154 LINV IQ)
Access Level: Full Participation in Private Syndicated Commercial Debt Facilities
--------------------------------------------------------------------------------
ISSUING OFFICER SIGNATURE:
Victoria Sterling, Chief Compliance Officer
OAL Network Headquarters, New York, NY
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_Accredited_Investor_Certificate_${currentUser?.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Accredited Certificate Downloaded', 'Official SEC Rule 506(c) verification certificate saved.', 'success');
    }
  };

  // Submit Co-Investment Pledge
  const handleConfirmPledge = (e) => {
    e.preventDefault();
    if (!selectedSyndicate) return;

    const newPledge = {
      id: `PLG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      dealTitle: selectedSyndicate.title,
      amount: Number(pledgeAmount),
      annualYield: selectedSyndicate.annualYield,
      pledgedAt: new Date().toISOString().split('T')[0],
      status: 'CONFIRMED_COMMITTED',
      nextPayout: 'Nov 15, 2026',
      payoutAmount: Math.round(((Number(pledgeAmount) * (selectedSyndicate.annualYield / 100)) / 12) * 100) / 100
    };

    setMyPledges(prev => [newPledge, ...prev]);
    setShowPledgeModal(false);

    if (addToast) {
      addToast(
        'Co-Investment Allocation Pledged',
        `Successfully allocated $${Number(pledgeAmount).toLocaleString()} into ${selectedSyndicate.title}. Settlement closing docs dispatched to your email.`,
        'success'
      );
    }
  };

  // Submit Special Accredited Investor Verification Form (Doc 4 Lines 74-99)
  const handleSubmitAccreditation = (e) => {
    e.preventDefault();
    setIsAccredited(true);
    setGreenCheckBadge(true);
    setMemberScore(162); // +8 pts boost for verified accreditation credentials

    if (addToast) {
      addToast(
        'Accreditation Verified & Green Badge Issued',
        'Your accredited investor credentials have been verified. Your LINV IQ is elevated to 162/180.',
        'success'
      );
    }
    setShowCertificateModal(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* =========================================================================
          HERO BANNER & INV-IQ GREEN BADGE (Doc 4 & Doc 6)
          ========================================================================= */}
      <div className="bg-gradient-to-r from-[#0B1730] via-[#102347] to-[#064E3B] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700/60">
        {/* Glow styling */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            {/* INV-IQ Green Badge & Accreditations (Doc 4 Line 5, 7) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                <span>INV-IQ Verified Certified Investor with Green Check Badge</span>
              </span>

              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                Doc 4 & 6 Member Portal
              </span>

              <span className="text-xs text-slate-300">
                Member ID: <strong className="text-white font-mono">INV-CLUB-2026-9941</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              The Money Club & Investment Club Member Portal
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Private syndicate co-investments, 180 LINV IQ ranking progression, and SEC Rule 506(c) accredited investor verification workspace for high-value participants.
            </p>
          </div>

          {/* Quick Member Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={handleDownloadLinvIqDossier}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D5B66A]" />
              <span>Download 180 LINV IQ Dossier</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('verification')}
              className="px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Accreditation Center</span>
            </button>
          </div>
        </div>

        {/* Member KPI Strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Current Club Tier:</span>
            <strong className="text-[#D5B66A] font-bold text-sm block">{currentTier.name}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">180 LINV IQ Score:</span>
            <strong className="text-white font-bold text-sm flex items-center gap-1 font-heading">
              {memberScore} <span className="text-xs font-normal text-slate-400">/ 180 LINV IQ</span>
            </strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Accreditation Status:</span>
            <strong className="text-emerald-400 font-bold text-sm flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> SEC Rule 506(c) Verified
            </strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Active Syndications:</span>
            <strong className="text-white font-bold text-sm block">
              {myPledges.length} Facilities (${myPledges.reduce((acc, p) => acc + p.amount, 0).toLocaleString()})
            </strong>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PORTAL NAVIGATION TABS (Mobile Responsive)
          ========================================================================= */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>180 LINV IQ & Tier Ranking</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('syndicates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'syndicates'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Private Syndicated Deals Feed ({INITIAL_SYNDICATES.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('verification')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'verification'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Accredited Verification Intake</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'portfolio'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>My Syndicate Portfolio ({myPledges.length})</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: 180 LINV IQ SCORING & 4 TIERS MATRIX (Doc 4 Lines 1-36)
          ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top Score Breakdown Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h2 className="text-lg font-heading font-extrabold text-slate-900">
                    180 Loan Investment IQ (LINV IQ) Scoring Breakdown
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated 180-point evaluation calculated from verified financial inputs, creditworthiness, and operating cash flow (Doc 4 Lines 25-36).
                </p>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
                {currentTier.name} ({memberScore}/180)
              </div>
            </div>

            {/* 5-Category Point Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Credit History</span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  62 <span className="text-xs font-normal text-slate-400">/ 70 pts</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold block">718 FICO • 0 Collections</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Business Plan & Mission</span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  18 <span className="text-xs font-normal text-slate-400">/ 20 pts</span>
                </div>
                <span className="text-[11px] text-blue-600 font-semibold block">&le; 20-Word Mission Stated</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operating Cash Flow</span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  44 <span className="text-xs font-normal text-slate-400">/ 50 pts</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold block">DSCR 1.42x • $38.4k/mo</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Collateral Security</span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  22 <span className="text-xs font-normal text-slate-400">/ 30 pts</span>
                </div>
                <span className="text-[11px] text-slate-600 font-semibold block">Fixtures & Equipment</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overall Risk Rating</span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  08 <span className="text-xs font-normal text-slate-400">/ 10 pts</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold block">Low Default Profile</span>
              </div>
            </div>

            {/* Elevation Progress Bar to VIP Diamond */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-blue-950">Progression to VIP Diamond Club (175+ LINV IQ):</span>
                <span className="text-blue-800">
                  {memberScore} / 175 Points ({175 - memberScore} Points Needed)
                </span>
              </div>
              <div className="w-full bg-blue-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (memberScore / 175) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-blue-700">
                <span>Current Tier: MVP Money Club</span>
                <span>Next Milestone: Preferred VIP Diamond Syndicate Allocation</span>
              </div>
            </div>
          </div>

          {/* 4 Official Investment Club Tiers Matrix (Doc 4 Lines 13-22) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-extrabold text-slate-900">
                  The Money Club Network Tiers & Privileges
                </h3>
                <p className="text-xs text-slate-500">
                  Participants are grouped according to investment capabilities and LINV IQ financial readiness (Doc 4 Lines 1-22).
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500">
                100% Free Membership for Accredited Investors
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {TIERS.map(tier => {
                const isCurrent = currentTier.key === tier.key;
                return (
                  <div
                    key={tier.key}
                    className={`rounded-2xl border p-5 space-y-4 transition-all relative ${
                      isCurrent
                        ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase shadow-sm">
                        Your Active Tier
                      </span>
                    )}

                    <div className="space-y-1">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md inline-block ${tier.badgeColor}`}>
                        {tier.scoreRange}
                      </span>
                      <h4 className="text-base font-heading font-bold text-slate-900 mt-2">
                        {tier.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight">
                        {tier.subtitle}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Included Privileges:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {tier.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px]">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: PRIVATE SYNDICATED DEALS FEED (Doc 4 & Doc 6)
          ========================================================================= */}
      {activeTab === 'syndicates' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-heading font-extrabold text-slate-900">
                Institutional Private Syndication Pipeline [Powered by Lenders]
              </h3>
              <p className="text-xs text-slate-500">
                Co-investment commercial loans with verified liens, collateral UCC filings, and fixed annualized returns.
              </p>
            </div>

            {/* Filter by Industry */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-slate-100 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="ALL">All Industries</option>
                <option value="Freight & Logistics">Freight & Logistics</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Hospitality">Hospitality</option>
              </select>
            </div>
          </div>

          {/* Syndicated Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSyndicates.map(deal => {
              const percentFilled = Math.round((deal.pledgedCapital / deal.targetCapital) * 100);
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                        {deal.industry}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        {deal.closingInDays} Days Left
                      </span>
                    </div>

                    <h4 className="text-base font-heading font-bold text-slate-900 leading-snug">
                      {deal.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {deal.summary}
                    </p>

                    {/* Financial Specs */}
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Fixed Net Yield</span>
                        <strong className="text-emerald-700 font-black text-sm">{deal.annualYield}% APR</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Syndicate Term</span>
                        <strong className="text-slate-800 font-bold">{deal.termMonths} Months</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Min. Ticket</span>
                        <strong className="text-slate-800 font-bold">${deal.minTicket.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">DSCR Coverage</span>
                        <strong className="text-blue-700 font-bold">{deal.dscr}</strong>
                      </div>
                    </div>

                    {/* Progress Bar of Capital Pledged */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                        <span>Pledged: ${deal.pledgedCapital.toLocaleString()}</span>
                        <span>{percentFilled}% Filled</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSyndicate(deal);
                        setPledgeAmount(deal.minTicket);
                        setShowPledgeModal(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Pledge Co-Investment</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadOfferingMemorandum(deal)}
                      className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download Offering Memorandum (PPM)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: SPECIAL ACCREDITED INVESTOR VERIFICATION FORM (Doc 4 Lines 74-99)
          ========================================================================= */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  Special Accredited Investor Verification & Self-Service Intake Form
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Satisfy regulatory financial accreditation under SEC Rule 506(c) of Regulation D to unlock unrestricted private syndications (Doc 4 Lines 74-99 & 147-198).
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadAccreditationCertificate}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Rule 506(c) Certificate</span>
            </button>
          </div>

          <form onSubmit={handleSubmitAccreditation} className="space-y-8">
            {/* Criteria 1: Individual Investor Standards (Doc 4 Lines 147-156) */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                  Individual Net Worth & Income Criteria (Rule 501(a)(5))
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Doc 4 Line 147-156
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <label className="flex items-start gap-2.5 font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accreditationForm.meetsNetWorth}
                      onChange={(e) => setAccreditationForm({ ...accreditationForm, meetsNetWorth: e.target.checked })}
                      className="mt-0.5 w-4 h-4 accent-blue-600"
                    />
                    <span>Net Worth Exceeds $1,000,000 (Excluding Primary Residence)</span>
                  </label>
                  <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                    Must have a qualifying net worth exceeding $1M either individually or jointly with a spouse, strictly excluding personal primary home equity.
                  </p>
                  <div className="pl-6 pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold block">Declared Net Worth ($):</span>
                    <input
                      type="text"
                      value={accreditationForm.netWorthExclHome}
                      onChange={(e) => setAccreditationForm({ ...accreditationForm, netWorthExclHome: e.target.value })}
                      className="mt-1 p-2 w-full rounded-lg border border-slate-300 font-mono text-xs"
                      placeholder="$1,450,000"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <label className="flex items-start gap-2.5 font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accreditationForm.meetsIncome}
                      onChange={(e) => setAccreditationForm({ ...accreditationForm, meetsIncome: e.target.checked })}
                      className="mt-0.5 w-4 h-4 accent-blue-600"
                    />
                    <span>Annual Income &gt; $200k Individual / $300k Joint</span>
                  </label>
                  <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                    Income in excess of $200k in each of the past 2 years (or $300k combined with spouse) with reasonable expectation of matching this year.
                  </p>
                  <div className="pl-6 pt-1 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">2024 Gross ($):</span>
                      <input
                        type="text"
                        value={accreditationForm.income2024}
                        onChange={(e) => setAccreditationForm({ ...accreditationForm, income2024: e.target.value })}
                        className="mt-1 p-2 w-full rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">2025 Gross ($):</span>
                      <input
                        type="text"
                        value={accreditationForm.income2025}
                        onChange={(e) => setAccreditationForm({ ...accreditationForm, income2025: e.target.value })}
                        className="mt-1 p-2 w-full rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria 2: Professional FINRA Securities Licenses (Doc 4 Lines 139-146, 181-187) */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                  Professional FINRA Securities Licenses (Doc 4 Lines 139-146)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  +10 Points Each
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label className={`p-4 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  accreditationForm.hasSeries7 ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200'
                }`}>
                  <input
                    type="checkbox"
                    checked={accreditationForm.hasSeries7}
                    onChange={(e) => setAccreditationForm({ ...accreditationForm, hasSeries7: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-blue-600"
                  />
                  <div>
                    <strong className="text-slate-900 block">Series 7 License</strong>
                    <span className="text-[11px] text-slate-500">General Securities Representative</span>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  accreditationForm.hasSeries65 ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200'
                }`}>
                  <input
                    type="checkbox"
                    checked={accreditationForm.hasSeries65}
                    onChange={(e) => setAccreditationForm({ ...accreditationForm, hasSeries65: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-blue-600"
                  />
                  <div>
                    <strong className="text-slate-900 block">Series 65 License</strong>
                    <span className="text-[11px] text-slate-500">Investment Adviser Representative</span>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  accreditationForm.hasSeries82 ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200'
                }`}>
                  <input
                    type="checkbox"
                    checked={accreditationForm.hasSeries82}
                    onChange={(e) => setAccreditationForm({ ...accreditationForm, hasSeries82: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-blue-600"
                  />
                  <div>
                    <strong className="text-slate-900 block">Series 82 License</strong>
                    <span className="text-[11px] text-slate-500">Private Securities Offerings</span>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">FINRA / CRD Registration Number</label>
                  <input
                    type="text"
                    value={accreditationForm.crdNumber}
                    onChange={(e) => setAccreditationForm({ ...accreditationForm, crdNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:border-blue-600 focus:outline-none"
                    placeholder="CRD-8821942"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Attestation Verification Method</label>
                  <select
                    value={accreditationForm.attestationType}
                    onChange={(e) => setAccreditationForm({ ...accreditationForm, attestationType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:outline-none cursor-pointer"
                  >
                    <option value="CPA_LETTER">Licensed CPA / Attorney Attestation Letter</option>
                    <option value="W2_TAX_RETURNS">IRS Form 1040 / W-2 Past 2 Years</option>
                    <option value="BROKERAGE_STATEMENT">Financial Brokerage / Custody Statement</option>
                    <option value="FINRA_CRD">Active FINRA CRD BrokerCheck Records</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Document Verification Proof Upload Strip */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                  Verification Document Upload (Attestation Dossier)
                </h3>
                <span className="text-[10px] text-slate-400">PDF, JPG, PNG &le; 25MB</span>
              </div>

              <div className="p-4 rounded-xl bg-white border-2 border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">{accreditationForm.uploadedFileName}</strong>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready for Compliance Officer Review
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addToast && addToast('Document Selected', 'New verification evidence file uploaded.', 'info')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace Document</span>
                </button>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-600 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={accreditationForm.declarationAccepted}
                  onChange={(e) => setAccreditationForm({ ...accreditationForm, declarationAccepted: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-blue-600"
                />
                <span>
                  I solemnly declare and certify under penalty of perjury that the stated financial net worth and licensing statements are true, accurate, and comply with SEC Rule 501 of Regulation D.
                </span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Verification & Claim Green Check Badge</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 4: ACTIVE SYNDICATE PORTFOLIO
          ========================================================================= */}
      {activeTab === 'portfolio' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900">
                My Active Syndicate Allocations & Yield Ledger
              </h2>
              <p className="text-xs text-slate-500">
                Track your active co-investment commitments and quarterly interest distributions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('syndicates')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Browse New Opportunities</span>
            </button>
          </div>

          {/* Portfolio Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left min-w-[620px]">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Commitment ID</th>
                  <th className="p-3.5">Syndicate Facility</th>
                  <th className="p-3.5">Pledged Principal</th>
                  <th className="p-3.5">Net Yield</th>
                  <th className="p-3.5">Next Distribution</th>
                  <th className="p-3.5">Est. Monthly Payout</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myPledges.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{item.dealTitle}</td>
                    <td className="p-3.5 font-extrabold text-slate-900">
                      ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">{item.annualYield}% Fixed</td>
                    <td className="p-3.5 text-slate-600">{item.nextPayout}</td>
                    <td className="p-3.5 font-mono text-blue-700 font-bold">${item.payoutAmount.toFixed(2)}</td>
                    <td className="p-3.5 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: PLEDGE CO-INVESTMENT MODAL
          ========================================================================= */}
      {showPledgeModal && selectedSyndicate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                  Co-Investment Ticket Allocation
                </span>
                <h3 className="text-base font-heading font-extrabold text-[#0B1730]">
                  Pledge Capital into {selectedSyndicate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPledgeModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPledge} className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Allocation Amount ($ USD)</label>
                  <strong className="text-emerald-700 font-extrabold text-sm">
                    ${Number(pledgeAmount).toLocaleString()}
                  </strong>
                </div>
                <input
                  type="range"
                  min={selectedSyndicate.minTicket}
                  max={Math.min(250000, selectedSyndicate.targetCapital - selectedSyndicate.pledgedCapital)}
                  step={5000}
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Min Ticket: ${selectedSyndicate.minTicket.toLocaleString()}</span>
                  <span>Available Allocation: ${(selectedSyndicate.targetCapital - selectedSyndicate.pledgedCapital).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2 text-emerald-950">
                <div className="flex justify-between">
                  <span>Projected Annual Yield:</span>
                  <strong>{selectedSyndicate.annualYield}% Fixed Net Return</strong>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Monthly Interest:</span>
                  <strong>
                    ~${Math.round(((Number(pledgeAmount) * (selectedSyndicate.annualYield / 100)) / 12) * 100) / 100} / month
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Maturity Tenor:</span>
                  <strong>{selectedSyndicate.termMonths} Months</strong>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Authorized Investor Signer</label>
                <input
                  type="text"
                  required
                  value={pledgeSignerName}
                  onChange={(e) => setPledgeSignerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <label className="flex items-start gap-2.5 text-[11px] text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={pledgeConfirmedTerms}
                  onChange={(e) => setPledgeConfirmedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-emerald-600"
                />
                <span>
                  I confirm that I am an accredited investor under SEC Rule 506(c) and agree to execute the confidential loan participation agreement upon closing.
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPledgeModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md cursor-pointer"
                >
                  Confirm Allocation Pledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: CERTIFICATE ISSUANCE CONFIRMATION MODAL
          ========================================================================= */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                Accreditation Approved
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">
                Green Check Badge Successfully Issued!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your SEC Rule 506(c) accredited verification is on file. Your 180 LINV IQ score has been elevated to <strong>162/180</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1 text-left">
              <div className="flex justify-between">
                <span>Certified Badge:</span>
                <strong className="text-emerald-700">INV-IQ Certified Investor (Green Badge)</strong>
              </div>
              <div className="flex justify-between">
                <span>Certification Ref:</span>
                <strong className="font-mono">SEC-506C-OAL-2026-884102</strong>
              </div>
              <div className="flex justify-between">
                <span>Validity:</span>
                <strong>365 Days (Oct 2026 – Oct 2027)</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close Window
              </button>
              <button
                type="button"
                onClick={handleDownloadAccreditationCertificate}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
