import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calculator,
  Activity,
  PlayCircle,
  FileCheck2,
  Star,
  Users,
  HeartHandshake,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
  ExternalLink,
  X,
  Clock,
  Check
} from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const ToolsAndResourcesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'calculators';
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videosList = [
    {
      id: 'underwriting-walkthrough',
      title: 'How OAL Network Underwriting Works',
      tag: 'Platform Walkthrough',
      desc: 'Understand the 6-step borrower intake, identity authentication, and the 180-point Investment IQ calculation.',
      duration: '4:20',
      thumbnail: '/images/hero_finance.jpg',
      youtubeId: 'eRqfwyIrpc4',
      chapters: [
        { time: '0:00', title: 'Commercial Lending Overview' },
        { time: '1:10', title: 'Identity & Multi-Factor KYC Verification' },
        { time: '2:25', title: '180-Point Investment IQ Evaluation' },
        { time: '3:40', title: 'Institutional Underwriter Placement' }
      ],
      keyPoints: [
        'Objective scoring across Credit (70), Cash Flow (50), Collateral (30), Business Plan (20), Risk (10)',
        'Masked personal information shields borrower identity during preliminary lender review',
        'Direct supervision with dedicated licensed OAL Representative'
      ]
    },
    {
      id: 'rule-fr08-deal-limit',
      title: 'Rule FR-08 & The 3-Lender Deal Limit',
      tag: 'Marketplace Rules',
      desc: 'Why OAL strictly restricts active working deals to three concurrent lenders to protect commercial borrowers.',
      duration: '3:15',
      thumbnail: '/images/loan_money_club.jpg',
      youtubeId: 'd1o5VlhjU50',
      chapters: [
        { time: '0:00', title: 'Risks of Uncontrolled Loan Lead Scattering' },
        { time: '0:55', title: 'Rule FR-08: Cap of 3 Concurrent Lenders' },
        { time: '1:50', title: 'Preventing Credit Pull Overkill & High Pressure' },
        { time: '2:40', title: 'Rule FR-09: Mediated Oversight Protocol' }
      ],
      keyPoints: [
        'Hard stop at 3 active working lenders prevents aggressive high-pressure bidding loops',
        'Underwriters invest genuine underwriting time knowing deal exclusivity is preserved',
        'All term sheets and inquiries recorded in auditable platform deal room'
      ]
    },
    {
      id: 'restaurant-freight-capital',
      title: 'Commercial Restaurant & Freight Capital',
      tag: 'Industry Focus',
      desc: 'Examining equipment debt, 24-72 hour funding workflows, and good & bad credit underwriting flexibility.',
      duration: '5:45',
      thumbnail: '/images/loan_trucking.jpg',
      youtubeId: 'H202TYop7O0',
      chapters: [
        { time: '0:00', title: 'High-Velocity Commercial Financing Overview' },
        { time: '1:15', title: 'Class 8 Freight & Fleet Equipment Debt' },
        { time: '2:35', title: 'Restaurant Kitchen & POS Modernization' },
        { time: '4:10', title: 'Good & Bad Credit Structuring (24–72 Hr Closing)' }
      ],
      keyPoints: [
        'Tailored programs for both Good and Bad credit commercial applicants',
        'Rapid 2-to-24 hour approvals based on operational revenue and collateral value',
        'Funding amounts from $10,000 to $500M+ across all 50 states'
      ]
    }
  ];

  // Calculator State
  const [loanCalc, setLoanCalc] = useState({
    amount: 250000,
    termMonths: 36,
    interestRate: 8.5
  });

  // Calculate monthly payment
  const monthlyRate = (loanCalc.interestRate / 100) / 12;
  const numPayments = loanCalc.termMonths;
  const monthlyPayment = monthlyRate > 0
    ? (loanCalc.amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loanCalc.amount / numPayments;
  const totalRepayment = monthlyPayment * numPayments;
  const totalInterest = totalRepayment - loanCalc.amount;

  // DSCR Calculator State
  const [dscrCalc, setDscrCalc] = useState({
    annualNoi: 180000,
    annualDebtService: 120000
  });
  const dscrRatio = dscrCalc.annualDebtService > 0 ? (dscrCalc.annualNoi / dscrCalc.annualDebtService).toFixed(2) : 0;

  // Biz Analyzer State
  const [analyzer, setAnalyzer] = useState({
    industry: 'restaurant',
    annualRev: 650000,
    monthlyBankBal: 45000,
    timeInBusinessYears: 3,
    creditTier: '680+'
  });

  const getAnalyzerRating = () => {
    let score = 0;
    if (analyzer.annualRev >= 500000) score += 35;
    else if (analyzer.annualRev >= 150000) score += 20;
    else score += 10;

    if (analyzer.monthlyBankBal >= 40000) score += 25;
    else if (analyzer.monthlyBankBal >= 15000) score += 15;
    else score += 5;

    if (analyzer.timeInBusinessYears >= 2) score += 20;
    else score += 10;

    if (analyzer.creditTier === '720+') score += 20;
    else if (analyzer.creditTier === '680+') score += 15;
    else score += 10;

    return score;
  };

  const navTabs = [
    { id: 'calculators', label: 'Financial Calculators' },
    { id: 'analyzer', label: 'Biz Analyzer' },
    { id: 'videos', label: 'Videos & Case Studies' },
    { id: 'reviews', label: 'Reviews & Testimonials' },
    { id: 'partners', label: 'Partners & Affiliates' }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001744] via-[#002060] to-[#0070C0] text-white pt-16 pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FFD200]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#00B0F0]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FFD200] animate-pulse" />
            <span className="text-xs font-bold text-[#FFD200] uppercase tracking-wider">
              Commercial Debt Tools &amp; Intelligence
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Tools, Resources &amp; Community
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Evaluate your debt capacity, calculate loan payments, simulate business health, and explore institutional partnership opportunities.
          </p>

          {/* Pill navigation */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {navTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setSearchParams({ tab: t.id })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#FFD200] text-[#002060] shadow-md shadow-amber-400/20 scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TAB 1: FINANCIAL CALCULATORS */}
        {activeTab === 'calculators' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Tool 1: Commercial Debt Service Calculator */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0070C0] flex items-center justify-center font-bold">
                    <Calculator className="w-5 h-5 text-[#00B0F0]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#002060]">Commercial Loan Payment Calculator</h3>
                    <p className="text-xs text-slate-500">Estimate estimated monthly debt service and amortization.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Loan Amount</span>
                      <span className="text-[#0070C0] font-mono">${loanCalc.amount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="5000000"
                      step="10000"
                      value={loanCalc.amount}
                      onChange={(e) => setLoanCalc({ ...loanCalc, amount: Number(e.target.value) })}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0070C0]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>$10,000</span>
                      <span>$5,000,000+</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Term (Months)</label>
                      <select
                        value={loanCalc.termMonths}
                        onChange={(e) => setLoanCalc({ ...loanCalc, termMonths: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0070C0]"
                      >
                        <option value="12">12 Months (1 Year)</option>
                        <option value="24">24 Months (2 Years)</option>
                        <option value="36">36 Months (3 Years)</option>
                        <option value="60">60 Months (5 Years)</option>
                        <option value="84">84 Months (7 Years)</option>
                        <option value="120">120 Months (10 Years)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Illustrative APR (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="3"
                        max="25"
                        value={loanCalc.interestRate}
                        onChange={(e) => setLoanCalc({ ...loanCalc, interestRate: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  {/* Payment Output Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#002060] to-[#0070C0] text-white space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD200]">
                      Estimated Monthly Debt Service
                    </span>
                    <div className="text-3xl font-extrabold text-white font-heading">
                      ${Math.round(monthlyPayment).toLocaleString()}
                      <span className="text-xs text-slate-300 font-normal"> / month</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-200">
                      <div>
                        <span className="text-slate-400 block">Total Interest:</span>
                        <strong>${Math.round(totalInterest).toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Total Repayment:</span>
                        <strong>${Math.round(totalRepayment).toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    *For illustrative planning purposes. Final terms depend on lender offers and 180-point Investment IQ evaluation.
                  </p>
                </div>
              </div>

              {/* Tool 2: DSCR (Debt Service Coverage Ratio) Calculator */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#002060]">DSCR Underwriting Ratio Calculator</h3>
                    <p className="text-xs text-slate-500">Measure debt coverage readiness as evaluated by commercial lenders.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Annual Net Operating Income (NOI)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                      <input
                        type="number"
                        value={dscrCalc.annualNoi}
                        onChange={(e) => setDscrCalc({ ...dscrCalc, annualNoi: Number(e.target.value) })}
                        className="w-full pl-7 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Total Annual Commercial Debt Service (Principal + Interest)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                      <input
                        type="number"
                        value={dscrCalc.annualDebtService}
                        onChange={(e) => setDscrCalc({ ...dscrCalc, annualDebtService: Number(e.target.value) })}
                        className="w-full pl-7 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  {/* DSCR Output Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Calculated DSCR:</span>
                      <span className={`text-2xl font-extrabold font-heading ${
                        Number(dscrRatio) >= 1.25 ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {dscrRatio}x
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      {Number(dscrRatio) >= 1.25 ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Strong Commercial Benchmark (&ge; 1.25x). Eligible for prime institutional debt programs.</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
                          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Moderate or Tight Coverage (&lt; 1.25x). Consider additional collateral or revenue expansion.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/investment-iq"
                      className="text-xs font-bold text-[#0070C0] hover:underline inline-flex items-center gap-1"
                    >
                      <span>How DSCR factors into the 50-point Cash Flow score &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: BIZ ANALYZER */}
        {activeTab === 'analyzer' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Automated Eligibility Diagnostic</span>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Commercial Biz Analyzer
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Test your business financial fundamentals against institutional underwriting parameters before submitting an official loan file.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-5">
                <h3 className="text-base font-bold text-[#002060]">Enter Business Fundamentals</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Loan Category</label>
                    <select
                      value={analyzer.industry}
                      onChange={(e) => setAnalyzer({ ...analyzer, industry: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="restaurant">Restaurant Loans</option>
                      <option value="food-truck">Food Truck Loans</option>
                      <option value="franchise">Buy A Franchise</option>
                      <option value="dental">Dental Practice Financing</option>
                      <option value="freight">General Freight &amp; Trucking</option>
                      <option value="hospitality">Hotels / Motels / Airbnb</option>
                      <option value="church">Church Loans</option>
                      <option value="fix-and-flip">Fix &amp; Flip Loans</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Years in Operation</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={analyzer.timeInBusinessYears}
                      onChange={(e) => setAnalyzer({ ...analyzer, timeInBusinessYears: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Annual Gross Revenue ($)</label>
                    <input
                      type="number"
                      value={analyzer.annualRev}
                      onChange={(e) => setAnalyzer({ ...analyzer, annualRev: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Avg. Monthly Bank Balance ($)</label>
                    <input
                      type="number"
                      value={analyzer.monthlyBankBal}
                      onChange={(e) => setAnalyzer({ ...analyzer, monthlyBankBal: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Personal / Guarantor Credit Profile</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Under 640 (Bad Credit)', '640 - 700 (Fair/Good)', '720+ (Strong)'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setAnalyzer({ ...analyzer, creditTier: tier })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          analyzer.creditTier === tier
                            ? 'border-[#0070C0] bg-sky-50 text-[#002060] font-bold'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diagnostic Score Result */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#002060] to-[#0070C0] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD200]">
                    Biz Analyzer Readiness Index
                  </span>
                  <div className="text-4xl font-extrabold font-heading mt-2">
                    {getAnalyzerRating()} <span className="text-sm font-normal text-slate-300">/ 100 Index</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-200">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                    <strong className="text-white block font-semibold mb-1">Underwriting Fit Assessment:</strong>
                    {getAnalyzerRating() >= 75 ? (
                      <p>Outstanding profile. High probability of multiple competing lender offers within 24–72 hours.</p>
                    ) : getAnalyzerRating() >= 50 ? (
                      <p>Qualified profile. Well suited for working capital, equipment finance, and good &amp; bad credit programs.</p>
                    ) : (
                      <p>Early-stage profile. Recommended for starter capital programs and Team Get Money credit development.</p>
                    )}
                  </div>
                </div>

                <Link
                  to={`/borrower/applications/new?program=${analyzer.industry}`}
                  className="w-full py-3.5 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] font-bold text-xs text-center block transition-all shadow-md"
                >
                  Apply with this Profile &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VIDEOS & CASE STUDIES */}
        {activeTab === 'videos' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Multimedia &amp; Insights</span>
                <VerifyBadge note="Verified interactive video library and case studies" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Videos &amp; Commercial Case Studies
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Learn how institutional underwriting functions, watch platform walkthroughs, and examine simulated loan funding outcomes across various industries. Click any video to play.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videosList.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setSelectedVideo(vid)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer border-t-4 border-t-[#0070C0]"
                >
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#00B0F0] group-hover:bg-[#FFD200] text-white group-hover:text-[#002060] flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-115">
                        <PlayCircle className="w-8 h-8 fill-current" />
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#002060] backdrop-blur-xs">
                      {vid.tag}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] text-white font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FFD200]" />
                      <span>{vid.duration}</span>
                    </span>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-[#002060] group-hover:text-[#0070C0] transition-colors leading-snug">
                        {vid.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {vid.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0070C0] group-hover:text-[#002060] inline-flex items-center gap-1.5 transition-colors">
                        <span>Watch Video Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        HD 1080p
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS & TESTIMONIALS */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Client Feedback</span>
                <VerifyBadge note="Representative review format; official verified reviews to be supplied by client" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Reviews &amp; Verified Testimonials
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Feedback from commercial borrowers, institutional debt underwriters, and licensed OAL representatives across all 50 states.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  author: 'Marcus Vance',
                  company: 'Blue Harbor Seafood Bistro LLC',
                  program: 'Restaurant Financing',
                  rating: 5,
                  text: 'Secured $380,000 for kitchen line upgrades and second-location expansion. Having the OAL Rep mediate negotiations kept everything calm, transparent, and prompt.'
                },
                {
                  author: 'Apex Horizon Capital LLC',
                  company: 'Institutional Debt Partner',
                  program: 'Lender Network Member',
                  rating: 5,
                  text: 'The 180-point Investment IQ gives our risk committee clean, objective data upfront. Rule FR-08 protects our underwriting team from redundant bidding wars.'
                },
                {
                  author: 'Elena Rostova',
                  company: 'Commercial Placement Specialist',
                  program: 'OAL Brokerage Team',
                  rating: 5,
                  text: 'The mediated chat and offer comparison tools streamline deals from inquiry to closing wire. Borrowers love the transparency and protection.'
                }
              ].map((rev, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-1 text-[#FFD200]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#FFD200]" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">"{rev.text}"</p>
                  <div className="pt-3 border-t border-slate-100">
                    <strong className="text-xs font-bold text-[#002060] block">{rev.author}</strong>
                    <span className="text-[11px] text-slate-500 block">{rev.company}</span>
                    <span className="text-[10px] text-[#0070C0] font-semibold block mt-0.5">{rev.program}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PARTNERS & AFFILIATES */}
        {activeTab === 'partners' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Ecosystem Collaboration</span>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Partners, Affiliates &amp; Referral Program
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Earn structured referral commissions and expand your commercial lending capabilities by partnering with OAL Network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0070C0] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6 text-[#00B0F0]" />
                </div>
                <h3 className="text-xl font-bold text-[#002060]">ISO &amp; Broker Partner Program</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Independent Sales Organizations (ISOs), loan brokers, accountants, and commercial advisors submit borrower files directly to our institutional network with dedicated tracking.
                </p>
                <div className="pt-2">
                  <Link
                    to="/iso-program"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold shadow-md"
                  >
                    <span>Explore ISO Partner Program</span>
                    <ArrowRight className="w-4 h-4 text-[#FFD200]" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#002060] to-[#0070C0] text-white rounded-3xl p-8 shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FFD200] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6 text-[#FFD200]" />
                </div>
                <h3 className="text-xl font-bold text-white">Borrower Referral Network</h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Every verified borrower on OAL Network receives a unique referral tracking code. Introduce fellow entrepreneurs and earn platform credits upon loan funding completion.
                </p>
                <div className="pt-2">
                  <Link
                    to="/borrower/referrals"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] text-xs font-bold shadow-md"
                  >
                    <span>View Borrower Referral Hub &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal Player */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[92vh]">
              
              {/* Modal Header */}
              <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFD200] text-[#002060]">
                    {selectedVideo.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                    {selectedVideo.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Player Body */}
              <div className="overflow-y-auto flex-1">
                {/* Responsive 16:9 Video Embed Player */}
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Video Details & Timestamps */}
                <div className="p-6 space-y-6 bg-slate-900 text-slate-200">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-white">{selectedVideo.title}</h4>
                      <span className="text-xs font-mono text-[#FFD200] bg-slate-800 px-2.5 py-1 rounded-md">
                        Duration: {selectedVideo.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedVideo.desc}
                    </p>
                  </div>

                  {/* Key Takeaways & Chapters Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                      <span className="text-xs font-bold text-[#00B0F0] uppercase tracking-wider block">
                        Video Chapters &amp; Timestamps
                      </span>
                      <div className="space-y-1.5 text-xs">
                        {selectedVideo.chapters.map((ch, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-slate-300">
                            <span className="font-mono text-[#FFD200] font-bold text-[11px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                              {ch.time}
                            </span>
                            <span>{ch.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                      <span className="text-xs font-bold text-[#FFD200] uppercase tracking-wider block">
                        Institutional Underwriting Standards
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {selectedVideo.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Switcher: Other Videos */}
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                      Switch to Another Video Case Study:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {videosList.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVideo(v)}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                            selectedVideo.id === v.id
                              ? 'bg-[#0070C0]/30 border-[#00B0F0] text-white ring-1 ring-[#00B0F0]'
                              : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <PlayCircle className={`w-5 h-5 shrink-0 ${selectedVideo.id === v.id ? 'text-[#FFD200]' : 'text-slate-500'}`} />
                          <div className="truncate">
                            <p className="text-xs font-bold truncate text-white">{v.title}</p>
                            <span className="text-[10px] text-slate-400">{v.duration} • {v.tag}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  OAL Network Institutional Media Center &bull; Verified 1080p Stream
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Player
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
