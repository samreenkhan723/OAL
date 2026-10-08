import React from 'react';
import { Link } from 'react-router-dom';
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
  PhoneCall
} from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1730] via-[#102246] to-[#172B4D] text-white pt-20 pb-28">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D5B66A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#D5B66A] animate-pulse" />
                <span className="text-xs font-semibold text-[#D5B66A] uppercase tracking-wider">
                  Enterprise Commercial Lending Marketplace
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
                Business Funding, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-[#D5B66A]">
                  Connected to the Right Lenders.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                A secure, multi-role commercial lending network. Evaluate your 180-point Investment IQ, discover eligible institutional underwriters, and compare binding offers with zero uncoordinated bidding.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/borrower/applications/new"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02]"
                >
                  <span>Apply for a Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
                >
                  <span>Explore How It Works</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D5B66A]" />
                  <span>Max 3 Lenders per Deal (FR-08)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#D5B66A]" />
                  <span>Mediated Rep Oversight (FR-09)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D5B66A]" />
                  <span>180-Point Investment IQ</span>
                </div>
              </div>
            </div>

            {/* Right Live Application Mockup Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#D5B66A] text-[#0B1730] flex items-center justify-center font-bold text-xs">
                      IQ
                    </div>
                    <div>
                      <div className="text-xs font-bold">Investment IQ™ Live Score</div>
                      <div className="text-[10px] text-slate-300">Audited Evaluation Engine</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#D5B66A] bg-white/10 px-2.5 py-1 rounded-full">
                    154 / 180 Max
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Credit History (Max 70):</span>
                      <span className="font-bold">62 / 70</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-400 h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Cash Flow & DSCR (Max 50):</span>
                      <span className="font-bold">44 / 50</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Collateral (Max 30):</span>
                      <span className="font-bold">22 / 30</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-purple-400 h-full rounded-full" style={{ width: '73%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">Marketplace Working Deals:</span>
                    <span className="font-bold text-[#D5B66A]">2 of 3 Slots Filled</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">Received Binding Offers:</span>
                    <span className="font-bold text-emerald-400">2 Offers Active</span>
                  </div>
                </div>

                <Link
                  to="/borrower/dashboard"
                  className="w-full py-2.5 rounded-xl bg-white text-[#0B1730] text-xs font-bold text-center block hover:bg-slate-100 transition-colors"
                >
                  View Borrower Dashboard Simulation &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LOAN PROGRAMS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Specialized Financing Categories
          </span>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1730]">
            8 Purpose-Built Commercial Loan Programs
          </h2>
          <p className="text-sm text-slate-600">
            Engineered around specific industry assets, seasonal revenue cycles, and equipment requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOAN_PROGRAMS.map((prog) => (
            <Link
              key={prog.id}
              to={`/borrower/applications/new?program=${prog.id}`}
              className="group bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-blue-400/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {prog.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Up to ${(prog.maxAmount / 1000000).toFixed(1)}M
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B1730] group-hover:text-blue-600 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {prog.tagline}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>View Program Terms</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/loan-programs"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <span>Explore All 8 Commercial Loan Programs in Detail</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. HOW IT WORKS 6-STEP WORKFLOW */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Auditable Architecture
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-[#0B1730]">
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
                <span className="text-2xl font-extrabold text-blue-600/20 block font-heading mb-2">
                  {step.num}
                </span>
                <h4 className="text-xs font-bold text-[#0B1730] mb-1.5">{step.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GOVERNANCE RULES CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#D5B66A] text-slate-950 uppercase tracking-wider">
                Enterprise Marketplace Governance
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Engineered for Integrity, Privacy & Speed
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Unlike open lead-generation platforms that blast your contact information across the web, OAL Network implements strict cryptographic privacy and structural intermediaries:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <h4 className="text-xs font-bold text-[#D5B66A]">Rule FR-08: Max 3 Lenders</h4>
                  <p className="text-[11px] text-slate-300 mt-1">
                    No application can be claimed by more than 3 lenders simultaneously. Eliminates race conditions and decision fatigue.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <h4 className="text-xs font-bold text-[#D5B66A]">Rule FR-09: Mediated Oversight</h4>
                  <p className="text-[11px] text-slate-300 mt-1">
                    All communications are supervised via licensed OAL Representatives. Direct borrower-lender harassment is structurally blocked.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 text-center sm:text-left">
              <Link
                to="/borrower/applications/new"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold text-center shadow-lg shadow-blue-600/30 transition-all"
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

      {/* 5. INVESTMENT CLUB TEASER WITH VERIFY NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Investment Club Classification
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              VIP Diamond Club & Money Club Tiers
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Explore platform membership classification across VIP Diamond (175+ LINV IQ), MVP Money Club (140–164), OAL Club (59+), and Team Get Money (0–58).
            </p>
          </div>

          <Link
            to="/investment-club"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 shadow-sm transition-all whitespace-nowrap"
          >
            Review Club Rules & Clarifications &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};
