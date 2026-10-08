import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import { Search, Filter, ArrowRight, ShieldCheck, DollarSign, Calendar, FileText } from 'lucide-react';

export const LoanProgramsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredPrograms = LOAN_PROGRAMS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.tagline.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Marketplace Debt Catalog
        </span>
        <h1 className="text-4xl font-heading font-extrabold text-[#0B1730]">
          Commercial Loan Programs
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          OAL Network connects qualified commercial enterprises with institutional underwriters across 8 targeted loan disciplines. Every program features tailored collateral structures and underwriting metrics.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by industry (e.g. Restaurant, Freight, Dental)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {prog.badge}
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  {prog.typicalRate} Fixed/Var
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0B1730]">{prog.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {prog.description}
              </p>

              {/* Specs */}
              <div className="my-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Financing Capacity:</span>
                  <span className="font-bold text-slate-900">
                    ${(prog.minAmount / 1000).toLocaleString()}k – ${(prog.maxAmount / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Typical Terms:</span>
                  <span className="font-semibold text-slate-800">{prog.termMonths}</span>
                </div>
              </div>

              {/* Sample Eligible Purposes */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Eligible Uses of Funds:
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {prog.eligiblePurposes.slice(0, 3).map((use, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                to={`/loan-programs/${prog.slug}`}
                className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
              >
                Full Program Requirements &rarr;
              </Link>

              <Link
                to={`/borrower/applications/new?program=${prog.id}`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all"
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
