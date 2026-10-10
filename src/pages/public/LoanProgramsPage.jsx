import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import { Search, ShieldCheck, Clock, CheckCircle2, ArrowRight, DollarSign, Sparkles } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const LoanProgramsPage = () => {
  const [search, setSearch] = useState('');

  const filteredPrograms = LOAN_PROGRAMS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.tagline.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header with Light Blue + Yellow branding */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#00B0F0]" />
          <span>Institutional Lending Catalog • All 50 States</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#002060]">
          Commercial Loan Programs
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          OPM ASAP Loans NetWORK connects enterprises directly with institutional underwriters across 8 targeted commercial loan categories. Featuring fast 24–72 hour funding, amounts from $10,000 to $500M+, and solutions for good and bad credit.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0070C0]" />
            <input
              type="text"
              placeholder="Search loans (e.g. Restaurant, Freight, Dental, Franchise)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-[#00B0F0]/40 rounded-xl focus:ring-2 focus:ring-[#00B0F0] focus:border-[#0070C0] focus:outline-none shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Program Grid */}
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
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-sm shadow-amber-300/40 hover:scale-105 active:scale-95 transition-all"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
