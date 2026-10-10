import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import {
  UtensilsCrossed,
  Truck,
  Store,
  Smile,
  Container,
  Building2,
  Landmark,
  Hammer,
  Award,
  Users,
  ShieldCheck,
  Lock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  UserCheck,
  FileText,
  Banknote,
  DollarSign,
  UserPlus,
  LogIn,
  X,
  Clock,
  Briefcase,
  TrendingUp,
  Star,
  Check,
  ArrowUpRight,
  Shield,
  Layers,
  Building
} from 'lucide-react';

export const HomePage = () => {
  const { isAuthenticated, currentRole, addToast } = useApp();
  const navigate = useNavigate();
  const [applyModalProg, setApplyModalProg] = useState(null);

  // Category imagery and visual metadata mapping
  const getCategoryVisuals = (id) => {
    switch (id) {
      case 'restaurant':
        return {
          image: '/images/loan_restaurant.jpg',
          badge: 'GOOD & BAD CREDIT',
          badgeColor: 'bg-white text-[#002060] border-slate-300',
          scope: '$10,000 – $500M+ • 24–72 Hr Wire',
          subtitle: 'Kitchen Equipment & Dining Remodels',
          tags: ['Commercial Kitchens', 'Dining Remodels']
        };
      case 'food-truck':
        return {
          image: '/images/loan_food_truck.jpg',
          badge: 'GOOD & BAD CREDIT',
          badgeColor: 'bg-white text-[#002060] border-slate-300',
          scope: '$10,000 – $500M+ • Fast Approval',
          subtitle: 'Mobile Outfitting & Vehicle Acquisitions',
          tags: ['Chassis & Kitchen', 'Fire Suppression']
        };
      case 'franchise':
        return {
          image: '/images/loan_franchise.jpg',
          badge: 'WE CAN HELP',
          badgeColor: 'bg-[#FFD200] text-[#002060] font-black border-amber-300',
          scope: 'New & Existing Territories',
          subtitle: 'Initial Fees & Standardized Buildouts',
          tags: ['Franchise Fees', 'Store Buildout']
        };
      case 'dental':
        return {
          image: '/images/loan_dental.jpg',
          badge: 'SPECIAL FOR DOCTORS',
          badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold',
          scope: 'Practice Expansion Capital',
          subtitle: 'Operatories, 3D Imaging & Acquisitions',
          tags: ['Operatory Chairs', '3D Cone Beam']
        };
      case 'freight-trucking':
        return {
          image: '/images/loan_trucking.jpg',
          badge: '2–24 HR APPROVAL',
          badgeColor: 'bg-sky-50 text-[#0070C0] font-black border-sky-300',
          scope: 'Commercial Fleet & Freight',
          subtitle: 'Semi-Trucks, Reefers & Dry Vans',
          tags: ['Semi-Truck Purchases', 'Reefer Trailers']
        };
      case 'hospitality':
        return {
          image: '/images/loan_hospitality.jpg',
          badge: 'HOTEL & AIRBNB',
          badgeColor: 'bg-white text-[#002060] border-slate-300',
          scope: 'Motel, Hotel & Short-Term Stays',
          subtitle: 'PIP Remodels & Property Acquisitions',
          tags: ['PIP Renovations', 'Lobby Upgrades']
        };
      case 'church':
        return {
          image: '/images/loan_church.jpg',
          badge: 'FAITH COMMUNITY',
          badgeColor: 'bg-white text-[#002060] border-slate-300',
          scope: 'Sanctuaries & Multi-Purpose',
          subtitle: 'Worship Facilities & Capital Expansions',
          tags: ['Sanctuary Expansions', 'Sound & Media Gear']
        };
      case 'fix-and-flip':
        return {
          image: '/images/loan_fix_flip.jpg',
          badge: '2–24 HR APPROVAL',
          badgeColor: 'bg-[#FFD200] text-[#002060] font-black border-amber-300',
          scope: 'Bridge & Rehab Capital',
          subtitle: 'Residential & Commercial Renovations',
          tags: ['100% Rehab Budget', 'Fast Closing Wire']
        };
      default:
        return {
          image: '/images/loan_franchise.jpg',
          badge: 'COMMERCIAL CAPITAL',
          badgeColor: 'bg-white text-[#002060] border-slate-300',
          scope: '$10,000 – $500M+',
          subtitle: 'Enterprise Working Capital',
          tags: ['Working Capital', 'Equipment']
        };
    }
  };

  const handleApplyClick = (prog) => {
    if (isAuthenticated && currentRole === 'borrower') {
      navigate(`/borrower/applications/new?program=${prog.slug}`);
    } else if (isAuthenticated) {
      addToast(
        'Borrower Account Required',
        `You are currently signed in as ${currentRole.toUpperCase()}. Commercial loan applications require a Borrower account.`,
        'warning'
      );
    } else {
      setApplyModalProg(prog);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 space-y-16 sm:space-y-24 pb-20 selection:bg-[#00B0F0]/25 selection:text-[#002060]">

      {/* 1. HERO SECTION — TWO-COLUMN EDITORIAL COMPOSITION WITH BALANCED PROPORTIONS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F9FF] via-white to-[#F8FAFC] pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200">
        
        {/* Subtle background ambient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD200]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column (55%): Clear Value Proposition & High Contrast Typography */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              {/* Nationwide Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#00B0F0]/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FFD200] ring-4 ring-[#FFD200]/25" />
                <span className="text-xs font-bold tracking-wide text-[#002060] uppercase">
                  OPM ASAP Loans NetWORK <span className="text-[#0070C0] mx-1">•</span> <span className="text-[#0070C0] font-extrabold">Servicing All 50 States</span>
                </span>
              </div>

              {/* Dominant Headline: 42px–56px Responsive Scale */}
              <div className="space-y-2.5">
                <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-heading font-black tracking-tight text-[#002060] leading-[1.12]">
                  Commercial Lending <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070C0] via-[#00B0F0] to-[#002060]">
                    Engineered for Growth.
                  </span>
                </h1>

                {/* Subtitle Value Proposition with High Contrast */}
                <p className="text-base sm:text-lg font-bold text-[#002060] tracking-tight">
                  Shop for Money, Get Approved • <span className="text-[#0070C0] underline decoration-[#FFD200] decoration-4 underline-offset-4 font-black">$10,000 to $500 Million+</span> • 24–72 Hours Funding
                </p>
              </div>

              {/* Authoritative Body Description (WCAG AA Compliant Slate-700) */}
              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Direct access to institutional commercial underwriters. Protect your credit under <strong className="text-[#002060] font-bold">Rule FR-08</strong> (maximum 3 concurrent lenders), calculate your proprietary <strong className="text-[#002060] font-bold">180-Point Investment IQ™</strong>, and close deals with dedicated OAL Representative mediation.
              </p>

              {/* Action Buttons: High-Conversion Yellow Primary */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/apply"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm sm:text-base font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-md shadow-amber-400/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer border border-amber-300"
                >
                  <span>Apply for a Loan</span>
                  <ArrowRight className="w-4 h-4 text-[#002060]" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#002060] bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0070C0] shadow-xs transition-all"
                >
                  <span>Explore How It Works</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </Link>
              </div>

              {/* Trust Strip Below CTAs */}
              <div className="pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#002060]">Good &amp; Bad Credit</h4>
                    <p className="text-xs text-slate-600 font-medium">All enterprise tiers</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0070C0] border border-sky-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#002060]">Rule FR-08 Safe</h4>
                    <p className="text-xs text-slate-600 font-medium">Max 3 lenders per deal</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#002060]">24–72 Hr Wire</h4>
                    <p className="text-xs text-slate-600 font-medium">Direct disbursement</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (45%): Balanced Commercial Finance Photograph */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Clean container without excessive decorative clutter */}
                <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <img
                    src="/images/hero_finance.jpg"
                    alt="OAL Network Commercial Finance Underwriting"
                    className="w-full h-72 sm:h-96 lg:h-[380px] object-cover rounded-xl"
                  />
                </div>

                {/* Floating Information Badge */}
                <div className="mt-3 sm:absolute sm:-bottom-4 sm:left-4 bg-white border border-slate-300 p-3.5 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#002060] text-[#FFD200] flex items-center justify-center shrink-0 font-black shadow-xs">
                    <DollarSign className="w-5 h-5 text-[#FFD200]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0070C0] block">
                      Marketplace Scope
                    </span>
                    <strong className="text-xs sm:text-sm font-extrabold text-[#002060] block">
                      $10K to $500M+ Nationwide
                    </strong>
                    <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      24–72 Hour Direct Wire
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LOAN PROGRAMS SHOWCASE — BALANCED 160PX PHOTO CARDS WITH CLEAR TYPOGRAPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00B0F0]" />
            <span>Commercial Loan Blueprint Catalog</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-[#002060] tracking-tight">
            Purpose-Built Commercial Lending Programs
          </h2>
          
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Institutional underwriting across 8 targeted commercial categories and our investor club. Nationwide coverage from $10,000 to $500 Million+ welcoming good and bad credit borrowers.
          </p>
        </div>

        {/* 3-Column Desktop Grid with Compact 160px Photography & Equal Card Heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          
          {/* CARD 1: THE MONEY CLUB FOR INVESTORS [POWERED BY LENDERS] */}
          <div className="bg-gradient-to-br from-[#001744] via-[#002060] to-[#003882] text-white rounded-2xl border-2 border-[#0070C0]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5 overflow-hidden h-full">
            
            {/* Top Visual Area: 160px Height */}
            <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-900 shrink-0">
              <img
                src="/images/loan_money_club.jpg"
                alt="The Money Club for Investors Syndicate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001744] via-[#001744]/30 to-transparent" />
              
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 rounded-full bg-[#FFD200] text-[#002060] font-black text-xs uppercase tracking-wider shadow-sm border border-amber-300">
                  FREE TO JOIN
                </span>
              </div>
            </div>

            {/* Spacious Content Area (20–24px padding) */}
            <div className="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#00B0F0] uppercase tracking-wider block">
                  [ Powered By Lenders ] • Deal Syndicate
                </span>
                <h3 className="text-xl font-heading font-extrabold text-white group-hover:text-[#00B0F0] transition-colors leading-tight">
                  The Money Club for Investors
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-normal line-clamp-2">
                  Gain priority access to qualified commercial loans and private debt syndications evaluated on the 180-Point Investment IQ standard.
                </p>
              </div>

              {/* 2 Concise Membership Tags */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="text-xs font-semibold text-white bg-white/15 px-2.5 py-1 rounded-md border border-white/25">
                  VIP Diamond (175+)
                </span>
                <span className="text-xs font-semibold text-white bg-white/15 px-2.5 py-1 rounded-md border border-white/25">
                  MVP Money Club
                </span>
              </div>

              {/* Action Area */}
              <div className="pt-3 border-t border-white/15 space-y-2">
                <Link
                  to="/investment-club"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
                >
                  <span>Click here to join || FREE ||</span>
                  <ArrowRight className="w-4 h-4 text-[#002060]" />
                </Link>

                <Link
                  to="/investment-club"
                  className="w-full py-0.5 text-center text-xs font-bold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1"
                >
                  <span>View Club Accreditation Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* CARDS 2–9: THE 8 TARGETED COMMERCIAL LOAN PROGRAMS */}
          {LOAN_PROGRAMS.map((prog) => {
            const visual = getCategoryVisuals(prog.id);

            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#00B0F0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5 overflow-hidden h-full"
              >
                {/* Top Visual Area: 160px Height Clean Category Photo */}
                <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={visual.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge in Top Corner (High Contrast) */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border ${visual.badgeColor}`}>
                      {visual.badge}
                    </span>
                  </div>
                </div>

                {/* Content Area (20–24px padding) */}
                <div className="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider block">
                      {visual.scope}
                    </span>
                    <h3 className="text-xl font-heading font-extrabold text-[#002060] group-hover:text-[#0070C0] transition-colors leading-tight">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal line-clamp-2">
                      {prog.description}
                    </p>
                  </div>

                  {/* 2 Concise Use-Case Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {visual.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300"
                      >
                        • {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Area */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleApplyClick(prog)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#002060] hover:bg-[#0070C0] text-white text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group-hover:bg-[#0070C0]"
                    >
                      <span>Apply for {prog.title}</span>
                      <ArrowRight className="w-4 h-4 text-[#FFD200]" />
                    </button>

                    <Link
                      to={`/loan-programs/${prog.slug}`}
                      className="w-full py-0.5 text-center text-xs font-semibold text-slate-600 hover:text-[#0070C0] transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Program Requirements &amp; Checklist</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* View All Programs Link */}
        <div className="mt-10 text-center">
          <Link
            to="/loan-programs"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white border-2 border-slate-200 hover:border-[#0070C0] text-sm font-bold text-[#002060] hover:text-[#0070C0] shadow-xs transition-all"
          >
            <span>Explore Complete Marketplace Catalog Across All 8 Programs</span>
            <ArrowRight className="w-4 h-4 text-[#0070C0]" />
          </Link>
        </div>

      </section>

      {/* 3. USA PATRIOT ACT MANDATORY NOTICE — FROM CLIENT BLUEPRINT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
            <ShieldCheck className="w-7 h-7 text-amber-700" />
          </div>

          <div className="space-y-1 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Federal Regulatory Compliance (USA PATRIOT ACT SECTION 326)
            </span>
            <h4 className="text-base font-bold text-amber-950">
              Very Important Detail: Procedure for Opening a New Account
            </h4>
            <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed font-normal">
              To help the government fight the funding of terrorism and money laundering activities, Federal law requires all financial institutions to obtain, verify, and record information that identifies each person or business entity that opens an account. What this means for you: When you register on OAL Network, legal corporate identity and authorized signer details are verified before loan applications are distributed.
            </p>
          </div>

          <Link
            to="/auth/register"
            className="px-5 py-3 rounded-xl bg-[#002060] hover:bg-[#0070C0] text-white text-xs sm:text-sm font-bold whitespace-nowrap shadow-xs transition-all self-stretch md:self-center text-center"
          >
            Register Verified Account &rarr;
          </Link>
        </div>
      </section>

      {/* 4. THE 6-STEP WORKFLOW — CONNECTED VISUALLY GUIDED PROCESS */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">
              End-to-End Underwriting Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#002060] tracking-tight">
              The 6-Step Borrower to Funding Workflow
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Clear milestone progression governed by role isolation, verified documentation, and atomic deal locking.
            </p>
          </div>

          {/* Connected Process Grid with Step Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Register & Authenticate',
                desc: 'Establish your account profile with multi-factor phone and email verification before loan creation.',
                icon: <UserCheck className="w-5 h-5 text-[#0070C0]" />
              },
              {
                num: '02',
                title: 'Loan Intake & KYC',
                desc: 'Submit your loan requirements, corporate identity, and provide 6 months of corporate bank statements.',
                icon: <FileText className="w-5 h-5 text-[#00B0F0]" />
              },
              {
                num: '03',
                title: '180-Point IQ Scoring',
                desc: 'Proprietary automated evaluation scores credit, cash flow, collateral, business plan, and risk.',
                icon: <Award className="w-5 h-5 text-[#FFD200]" />
              },
              {
                num: '04',
                title: 'Sanitized Discovery',
                desc: 'Institutional lenders evaluate scrubbed summaries in the marketplace with borrower confidentiality protected.',
                icon: <Users className="w-5 h-5 text-[#0070C0]" />
              },
              {
                num: '05',
                title: 'Working Deals (Max 3)',
                desc: 'Rule FR-08 limits concurrent underwriting claims to at most 3 institutional lenders simultaneously.',
                icon: <Lock className="w-5 h-5 text-amber-700" />
              },
              {
                num: '06',
                title: 'Compare & Fund',
                desc: 'Review binding terms with your dedicated OAL Representative and receive funding wire in 24–72 hours.',
                icon: <Banknote className="w-5 h-5 text-emerald-700" />
              }
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-[#0070C0] hover:bg-white transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#0070C0]/35 font-heading group-hover:text-[#0070C0]/50 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                </div>
                <h4 className="text-base font-bold text-[#002060]">{step.title}</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0070C0] hover:text-[#002060] transition-colors"
            >
              <span>Explore Complete Process Workflow &amp; Rules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. INVESTMENT IQ PRODUCT SHOWCASE — CONCISE PRODUCT FEATURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00B0F0]/15 text-[#0070C0] uppercase tracking-wider inline-block border border-[#00B0F0]/30">
                Audited Underwriting Standard
              </span>

              <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#002060] tracking-tight">
                The 180-Point Investment IQ™ System
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Unlike traditional banks that rely solely on arbitrary credit scores, OAL Network evaluates commercial loans against a comprehensive 180-point objective rubric across 5 core pillars.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Pillar 1</span>
                  <strong className="text-sm font-bold text-[#002060]">Credit Profile</strong>
                  <span className="text-xs text-[#0070C0] block font-bold">70 Points Max</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Pillar 2</span>
                  <strong className="text-sm font-bold text-[#002060]">Cash Flow &amp; DSCR</strong>
                  <span className="text-xs text-[#0070C0] block font-bold">50 Points Max</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Pillar 3</span>
                  <strong className="text-sm font-bold text-[#002060]">Hard Collateral</strong>
                  <span className="text-xs text-[#0070C0] block font-bold">30 Points Max</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Pillar 4</span>
                  <strong className="text-sm font-bold text-[#002060]">Business Plan</strong>
                  <span className="text-xs text-[#0070C0] block font-bold">20 Points Max</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block uppercase">Pillar 5</span>
                  <strong className="text-sm font-bold text-[#002060]">Risk Assessment</strong>
                  <span className="text-xs text-[#0070C0] block font-bold">10 Points Max</span>
                </div>

                <div className="p-3 rounded-xl bg-[#002060] text-white border border-[#002060]">
                  <span className="text-xs font-bold text-[#FFD200] block uppercase">Total Standard</span>
                  <strong className="text-sm font-black text-white">180 Maximum</strong>
                  <span className="text-xs text-sky-200 block font-bold">5 Tiers Qualified</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/investment-iq"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#002060] text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
                >
                  <span>Open Interactive Investment IQ Scoring Calculator</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD200]" />
                </Link>
              </div>
            </div>

            {/* Right Side: Score Tier Showcase */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#001744] to-[#002060] text-white p-6 sm:p-7 rounded-2xl border border-[#0070C0]/40 space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/20">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Accreditation Tiers</h3>
                <span className="text-xs font-extrabold text-[#FFD200]">LINV IQ</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between border border-white/15">
                  <div>
                    <strong className="text-sm font-black text-[#FFD200]">VIP Diamond Tier</strong>
                    <p className="text-xs text-slate-200">Ultra-high net worth &amp; institution</p>
                  </div>
                  <span className="font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded-md text-xs">
                    175+ Pts
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between border border-white/15">
                  <div>
                    <strong className="text-sm font-extrabold text-white">MVP Money Club</strong>
                    <p className="text-xs text-slate-200">Prime borrower &amp; investor status</p>
                  </div>
                  <span className="font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded-md text-xs">
                    140–164 Pts
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between border border-white/15">
                  <div>
                    <strong className="text-sm font-extrabold text-white">OAL Club Tier</strong>
                    <p className="text-xs text-slate-200">Standard verified deal access</p>
                  </div>
                  <span className="font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded-md text-xs">
                    59–139 Pts
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between border border-white/15">
                  <div>
                    <strong className="text-sm font-bold text-slate-200">Team Get Money (TGM)</strong>
                    <p className="text-xs text-slate-300">Credit builder &amp; advisory path</p>
                  </div>
                  <span className="font-mono font-bold text-slate-200 bg-white/15 px-2 py-0.5 rounded-md text-xs">
                    0–58 Pts
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. MARKETPLACE GOVERNANCE & INTEGRITY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#001438] via-[#002060] to-[#0070C0] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFD200] text-[#002060] uppercase tracking-wider inline-block">
                Marketplace Governance &amp; Integrity
              </span>

              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                Engineered for Integrity, Privacy &amp; Speed
              </h2>

              <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl font-normal">
                OAL Network implements strict structural safeguards to protect your business credit score and maintain confidentiality throughout the entire lending cycle:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
                    <h4 className="text-sm font-bold text-white">Rule FR-08: Max 3 Lenders</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                    A borrower file can be claimed by at most three institutional lenders simultaneously, preventing excessive credit inquiries and predatory bidding wars.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#FFD200]" />
                    <h4 className="text-sm font-bold text-white">Rule FR-09: Mediated Oversight</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                    Direct communication is supervised by your dedicated OAL Representative. Borrowers are protected from unsolicited solicitor phone calls.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <Link
                to="/borrower/applications/new"
                className="w-full py-3.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-sm font-extrabold text-center shadow-md transition-all hover:scale-[1.01] active:scale-95 border border-amber-300"
              >
                Start Borrower Loan Request
              </Link>

              <Link
                to="/lender/dashboard"
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-bold text-center transition-all"
              >
                Institutional Lender Portal &rarr;
              </Link>

              <Link
                to="/iso-program"
                className="w-full py-2 text-xs text-[#00B0F0] hover:text-white font-bold text-center transition-colors"
              >
                Broker &amp; ISO Referral Partner Program
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. APPLICANT AUTHENTICATION ENTRY MODAL (Strictly preserved flow) */}
      {applyModalProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setApplyModalProg(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B0F0]/15 text-[#0070C0] text-xs font-bold border border-[#00B0F0]/30">
                <span>Selected Loan Program</span>
                <span>•</span>
                <span>{applyModalProg.title}</span>
              </div>
              <h3 className="text-xl font-heading font-black text-[#002060]">
                Apply for {applyModalProg.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                As required by federal commercial lending compliance and OAL security rules, all borrowers must create an authenticated account before starting the loan application intake wizard.
              </p>
            </div>

            <div className="space-y-3">
              {/* Option 1: New Visitor -> Create Account */}
              <button
                type="button"
                onClick={() => {
                  const progSlug = applyModalProg.slug;
                  setApplyModalProg(null);
                  navigate('/auth/register', {
                    state: {
                      program: progSlug,
                      programTitle: applyModalProg.title,
                      from: { pathname: '/borrower/applications/new', search: `?program=${progSlug}` }
                    }
                  });
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-[#00B0F0] bg-sky-50/50 hover:bg-sky-50 transition-all flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0070C0] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#002060] group-hover:text-[#0070C0]">
                      Create Account (New Borrower)
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#002060] bg-[#FFD200] px-2.5 py-0.5 rounded-full">
                      Step 1
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Register your business name, email, phone, and secure password to initiate this application.
                  </p>
                </div>
              </button>

              {/* Option 2: Existing Borrower -> Sign In */}
              <button
                type="button"
                onClick={() => {
                  const progSlug = applyModalProg.slug;
                  setApplyModalProg(null);
                  navigate('/auth/login', {
                    state: {
                      program: progSlug,
                      programTitle: applyModalProg.title,
                      from: { pathname: '/borrower/applications/new', search: `?program=${progSlug}` },
                      message: `Sign in to continue your application for ${applyModalProg.title}.`
                    }
                  });
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-[#00B0F0] bg-white hover:bg-slate-50 transition-all flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-[#00B0F0]/15 group-hover:text-[#0070C0] flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <LogIn className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-[#0070C0]">
                    Sign In (Existing Borrower)
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Already registered? Sign in to jump straight into the application wizard with {applyModalProg.title} pre-selected.
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Want to review requirements first?</span>
              <Link
                to={`/loan-programs/${applyModalProg.slug}`}
                onClick={() => setApplyModalProg(null)}
                className="font-bold text-[#0070C0] hover:underline inline-flex items-center gap-1"
              >
                <span>Program Terms &amp; Checklist</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
