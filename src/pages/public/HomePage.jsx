import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import {
  ShieldCheck,
  ArrowRight,
  Award,
  Users,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Lock,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  Building2,
  PhoneCall,
  UserPlus,
  LogIn,
  X
} from 'lucide-react';

export const HomePage = () => {
  const { isAuthenticated, currentRole, addToast } = useApp();
  const navigate = useNavigate();
  const [applyModalProg, setApplyModalProg] = useState(null);

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
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001744] via-[#002060] to-[#0070C0] text-white pt-20 pb-28">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FFD200]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#00B0F0]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FFD200] animate-pulse" />
                <span className="text-xs font-bold text-[#FFD200] uppercase tracking-wider">
                  OPM ASAP Loans NetWORK • Servicing All 50 States
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-sm uppercase tracking-widest font-extrabold text-[#00B0F0] block">
                  WELCOME TO
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
                  OAL Network
                </h1>
                <p className="text-lg sm:text-xl font-bold text-[#FFD200] tracking-wide pt-1">
                  -- Shop for Money, Get Approved, $10,000 to $500 Million+, 24 – 72 Hours Funding --
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                A secure, multi-role commercial lending network. Evaluate your 180-point Investment IQ, discover eligible institutional underwriters, and compare binding offers with zero uncoordinated bidding.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#F5C500] active:scale-95 shadow-xl shadow-amber-400/25 transition-all hover:scale-[1.02] border border-amber-300"
                >
                  <span>Apply for a Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                >
                  <span>Explore How It Works</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
                  <span>Max 3 Lenders per Deal (FR-08)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00B0F0]" />
                  <span>Mediated Rep Oversight (FR-09)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FFD200]" />
                  <span>180-Point Investment IQ</span>
                </div>
              </div>
            </div>

            {/* Right Live Application Mockup Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FFD200] text-[#002060] flex items-center justify-center font-extrabold text-xs">
                      IQ
                    </div>
                    <div>
                      <div className="text-xs font-bold">Investment IQ™ Live Score</div>
                      <div className="text-[10px] text-slate-300">Audited Evaluation Engine</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#002060] bg-[#FFD200] px-3 py-1 rounded-full">
                    154 / 180 Max
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-200">Credit History (Max 70):</span>
                      <span className="font-bold">62 / 70</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#00B0F0] h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-200">Cash Flow &amp; DSCR (Max 50):</span>
                      <span className="font-bold">44 / 50</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-200">Collateral (Max 30):</span>
                      <span className="font-bold">22 / 30</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#FFD200] h-full rounded-full" style={{ width: '73%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-200">Marketplace Working Deals:</span>
                    <span className="font-bold text-[#FFD200]">2 of 3 Slots Filled (Rule FR-08)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-200">Received Binding Offers:</span>
                    <span className="font-bold text-emerald-400">2 Offers Active</span>
                  </div>
                </div>

                <Link
                  to="/borrower/dashboard"
                  className="w-full py-2.5 rounded-xl bg-white text-[#002060] text-xs font-bold text-center block hover:bg-slate-100 transition-colors"
                >
                  View Borrower Dashboard Simulation &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ALL 9 BLUEPRINT COMMERCIAL CATEGORIES & INVESTOR CLUB SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">
            Commercial Loan Blueprint
          </span>
          <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
            Purpose-Built Commercial Lending Programs
          </h2>
          <p className="text-sm text-slate-600">
            $10,000 to $500 Million+ nationwide funding capacity. Easy approval workflows accommodating both Good and Bad Credit profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: The Money Club for Investors (DOCX Blueprint item 1) */}
          <div className="bg-gradient-to-br from-[#002060] via-[#003380] to-[#0070C0] text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between border-2 border-[#FFD200]/50 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#FFD200] text-[#002060] uppercase tracking-wider">
                  FREE TO JOIN
                </span>
                <span className="text-xs font-bold text-[#00B0F0]">[ Powered By Lenders ]</span>
              </div>

              <div>
                <h3 className="text-xl font-heading font-extrabold text-white">
                  The Money Club for Investors
                </h3>
                <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                  Join our exclusive verified investor community. Access institutional commercial deal flow rated on the 180-point Investment IQ scale.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
                <span className="font-bold text-[#FFD200] block mb-0.5">Accredited &amp; Preferred Tiers</span>
                <span>VIP Diamond Club (175+ LINV IQ), MVP Money Club (140-164), OAL Club &amp; TGM.</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15">
              <Link
                to="/investment-club"
                className="w-full py-3 px-4 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Click Here to Join || FREE ||</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Cards 2-9: The 8 Commercial Loan Categories from Blueprint */}
          {LOAN_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#0070C0] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    prog.creditRequirement === 'GOOD & BAD CREDIT'
                      ? 'bg-amber-50 text-amber-800 border border-amber-300'
                      : 'bg-sky-50 text-[#0070C0] border border-[#00B0F0]/40'
                  }`}>
                    {prog.creditRequirement}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {prog.approvalTime}
                  </span>
                </div>

                <Link
                  to={`/loan-programs/${prog.slug}`}
                  className="block text-lg font-heading font-extrabold text-[#002060] hover:text-[#0070C0] transition-colors"
                >
                  {prog.title}
                </Link>

                <p className="text-xs font-semibold text-[#0070C0]">
                  {prog.subtitle}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {prog.tagline}
                </p>

                {/* Uses of funds preview */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Eligible Purposes:
                  </span>
                  <ul className="text-[11px] text-slate-600 space-y-1">
                    {prog.eligiblePurposes.slice(0, 2).map((use, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#00B0F0] font-bold">•</span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => handleApplyClick(prog)}
                  className="w-full py-3 px-3 rounded-xl bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>|| APPLY ||</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFD200]" />
                </button>
                <Link
                  to={`/loan-programs/${prog.slug}`}
                  className="w-full py-1 text-center text-xs font-semibold text-slate-500 hover:text-[#0070C0] transition-colors flex items-center justify-center gap-1"
                >
                  <span>Program Details &amp; Checklist</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/loan-programs"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0070C0] hover:text-[#002060]"
          >
            <span>Explore All 8 Commercial Loan Programs in Full Detail</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. PATRIOT ACT MANDATORY NOTICE FROM CLIENT DOCX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-6 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0 mt-1">
            <ShieldCheck className="w-6 h-6 text-amber-700" />
          </div>
          <div className="space-y-2 flex-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">
              Very Important Detail: Concerning the Procedure for Opening a New Account
            </span>
            <p className="text-xs text-amber-950 leading-relaxed">
              To aid the government in the fight against terrorism financing and money laundering, federal regulations require that all financial institutions obtain, verify, and record information that identifies each individual who opens an account.
            </p>
            <p className="text-xs text-amber-900/90 leading-relaxed font-medium">
              What this means for applicants: When you register on OAL Network, we verify your legal name, business EIN, phone number, and email via multi-factor authentication (MFA) before loan intake begins.
            </p>
          </div>
          <Link
            to="/auth/register"
            className="px-5 py-3 rounded-xl bg-[#002060] hover:bg-[#0070C0] text-white text-xs font-bold whitespace-nowrap shadow-md self-start md:self-center transition-all"
          >
            Create Verified Account &rarr;
          </Link>
        </div>
      </section>

      {/* 4. HOW IT WORKS 6-STEP WORKFLOW */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">
              Auditable Architecture
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              The End-to-End Borrower to Funding Workflow
            </h2>
            <p className="text-sm text-slate-600">
              Clear milestone progression governed by role isolation, KYC verification, and strict claim concurrency rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { num: '01', title: 'Register & MFA', desc: 'Secure profile creation and multi-factor phone/email verification.' },
              { num: '02', title: 'Apply & KYC', desc: '6-step wizard intake and verified bank statements upload.' },
              { num: '03', title: 'Investment IQ', desc: 'Proprietary 180-point readiness score computed across 5 pillars.' },
              { num: '04', title: 'Lender Discovery', desc: 'Anonymized marketplace matching with strict privacy preservation.' },
              { num: '05', title: 'Working Deal (≤3)', desc: 'Up to 3 institutional lenders claim active slots under rule FR-08.' },
              { num: '06', title: 'Offers & Funding', desc: 'Compare binding terms, accept offer, and track wire completion.' },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative">
                <span className="text-2xl font-extrabold text-[#0070C0]/25 block font-heading mb-2">
                  {step.num}
                </span>
                <h4 className="text-xs font-bold text-[#002060] mb-1.5">{step.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GOVERNANCE RULES CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#002060] to-[#0070C0] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFD200] text-[#002060] uppercase tracking-wider">
                Enterprise Marketplace Governance
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Engineered for Integrity, Privacy &amp; Speed
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                Unlike open lead-generation platforms that blast your contact information across the web, OAL Network implements strict cryptographic privacy and structural intermediaries:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <h4 className="text-xs font-bold text-[#FFD200]">Rule FR-08: Max 3 Lenders</h4>
                  <p className="text-[11px] text-slate-200 mt-1">
                    No application can be claimed by more than 3 lenders simultaneously. Eliminates race conditions and decision fatigue.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <h4 className="text-xs font-bold text-[#FFD200]">Rule FR-09: Mediated Oversight</h4>
                  <p className="text-[11px] text-slate-200 mt-1">
                    All communications are supervised via licensed OAL Representatives. Direct borrower-lender harassment is structurally blocked.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 text-center sm:text-left">
              <Link
                to="/borrower/applications/new"
                className="w-full py-3.5 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] text-xs font-extrabold text-center shadow-lg transition-all"
              >
                Start Borrower Loan Request
              </Link>
              <Link
                to="/lender/dashboard"
                className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold text-center transition-all"
              >
                Institutional Lender Portal
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. INVESTMENT CLUB TEASER WITH VERIFY NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-50/70 border border-[#00B0F0]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">
                Investment Club Classification
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#002060]">
              VIP Diamond Club &amp; Money Club Tiers
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Explore platform membership classification across VIP Diamond (175+ LINV IQ), MVP Money Club (140–164), OAL Club (59+), and Team Get Money (0–58).
            </p>
          </div>

          <Link
            to="/investment-club"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#002060] bg-[#FFD200] hover:bg-[#F5C500] shadow-sm transition-all whitespace-nowrap"
          >
            Review Club Rules &amp; Clarifications &rarr;
          </Link>
        </div>
      </section>

      {/* 6. APPLICANT AUTHENTICATION ENTRY MODAL (FR-01 & Sitemap Blueprint compliance) */}
      {applyModalProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setApplyModalProg(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                <span>Selected Loan Program</span>
                <span>•</span>
                <span>{applyModalProg.title}</span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-[#0B1730]">
                Begin Commercial Loan Application
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Per federal lending regulations and OAL security standards, borrowers must create an account and complete mock identity verification before starting the loan application.
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
                className="w-full text-left p-4 rounded-xl border-2 border-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-all flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-blue-600/30">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      Create Account (New Visitor)
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      Step 1
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    New to OAL Network? Register your legal name, business email, phone, and secure password to begin.
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
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <LogIn className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                    Sign In (Existing Borrower)
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Already registered? Sign in to jump straight into the 6-step application wizard with {applyModalProg.title} selected.
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Want to review requirements first?</span>
              <Link
                to={`/loan-programs/${applyModalProg.slug}`}
                onClick={() => setApplyModalProg(null)}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
              >
                <span>Program Terms & Documents</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
