import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import {
  Search,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Sparkles,
  Building2,
  Filter
} from 'lucide-react';

export const LoanProgramsPage = () => {
  const [search, setSearch] = useState('');

  // Industry Photography image mapper matching the master catalog
  const getProgramImage = (idOrSlug) => {
    switch (idOrSlug) {
      case 'restaurant':
        return '/images/loan_restaurant.jpg';
      case 'food-truck':
        return '/images/loan_food_truck.jpg';
      case 'franchise':
        return '/images/loan_franchise.jpg';
      case 'dental':
      case 'dental-practice':
        return '/images/loan_dental.jpg';
      case 'freight-trucking':
      case 'trucking':
        return '/images/loan_trucking.jpg';
      case 'hospitality':
      case 'hotel-motel-airbnb':
      case 'hotel':
        return '/images/loan_hospitality.jpg';
      case 'church':
      case 'church-facility':
        return '/images/loan_church.jpg';
      case 'fix-and-flip':
      case 'fix-flip':
        return '/images/loan_fix_flip.jpg';
      default:
        return '/images/hero_finance.jpg';
    }
  };

  const filteredPrograms = LOAN_PROGRAMS.filter(p => {
    const query = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Attractive Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001744] via-[#002060] to-[#0070C0] text-white shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FFD200]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (Content, Badges, Search & Value Props) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-[#00B0F0]/40 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FFD200] animate-pulse" />
              <span className="text-[#00B0F0]">Institutional Lending Catalog</span>
              <span className="text-white/40">•</span>
              <span className="text-[#FFD200]">All 50 States</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Commercial Loan Programs
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              OPM ASAP Loans NetWORK connects enterprises directly with institutional underwriters across 8 targeted commercial categories. Fast 24–72 hour direct wire funding, amounts from $10,000 to $500M+, welcoming good and bad credit profiles.
            </p>

            {/* Premium High-Contrast Search Bar */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0070C0]" />
                <input
                  type="text"
                  placeholder="Search by industry (e.g. Restaurant, Freight, Dental, Franchise, Hotel)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 text-sm bg-white text-slate-900 placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-[#FFD200] focus:outline-none shadow-lg border border-slate-200 font-medium"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Value Props Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#FFD200]" />
                <span>Good &amp; Bad Credit</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#00B0F0]" />
                <span>Rule FR-08 Safe (Max 3 Offers)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>24–72 Hr Funding</span>
              </div>
            </div>

          </div>

          {/* Right Column (Photography Showcase Card) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#001744]/70 group">
              <img
                src="/images/hero_finance.jpg"
                alt="Institutional Commercial Lending Exchange"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001744]/95 via-[#002060]/30 to-transparent" />
              
              {/* Floating Stat Badge */}
              <div className="absolute top-3.5 right-3.5 bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 rounded-xl text-right">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#00B0F0]">Marketplace Scope</span>
                <span className="text-xs font-extrabold text-[#FFD200]">$10K to $500M+</span>
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">8 Commercial Loan Categories</span>
                  <span className="text-[10px] font-black uppercase text-[#FFD200] bg-[#FFD200]/20 px-2 py-0.5 rounded border border-[#FFD200]/30">
                    All 50 States
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Direct underwriting syndications with 180-Point Investment IQ evaluation.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 2. Program Grid with Photography Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-heading font-black text-[#002060]">
              Commercial Loan Programs Catalog
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30">
              {filteredPrograms.length} Programs
            </span>
          </div>

          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] px-3.5 py-2 rounded-lg border border-amber-300 shadow-xs transition-transform hover:scale-105"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#00B0F0] shadow-xs hover:shadow-xl transition-all p-6 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30">
                    {prog.badge}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {prog.approvalTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#002060] group-hover:text-[#0070C0] transition-colors">
                  {prog.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {prog.description}
                </p>

                {/* Client Blueprint Specs */}
                <div className="my-5 p-3.5 rounded-xl bg-slate-50 border border-[#00B0F0]/20 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Network Scope:</span>
                    <span className="font-bold text-[#002060]">
                      $10,000 – $500M+
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Credit Evaluation:</span>
                    <span className="font-bold text-[#0070C0]">
                      {prog.creditRequirement}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Terms & Rates:</span>
                    <span className="font-medium text-slate-700 text-[11px]">
                      180-Pt Investment IQ Evaluated
                    </span>
                  </div>
                </div>

                {/* Sample Eligible Purposes */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Eligible Uses of Funds:
                  </span>
                  <ul className="text-[11px] text-slate-600 space-y-1.5">
                    {prog.eligiblePurposes.slice(0, 3).map((use, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#00B0F0] font-bold">•</span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/loan-programs/${prog.slug}`}
                  className="text-xs font-bold text-[#0070C0] hover:text-[#00B0F0] transition-colors"
                >
                  Full Details &rarr;
                </Link>

                <Link
                  to={`/loan-programs/${prog.slug}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-sm shadow-amber-300/40 hover:scale-105 active:scale-95 transition-all border border-amber-300"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
