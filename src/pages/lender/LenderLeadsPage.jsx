import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Briefcase, Award, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import { StatusBadge } from '../../components/common/StatusBadge';

export const LenderLeadsPage = () => {
  const { applications, currentUser, claimWorkingDeal } = useApp();
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('ALL');
  const [minIQ, setMinIQ] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredLeads = applications.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(search.toLowerCase()) ||
                          app.businessName.toLowerCase().includes(search.toLowerCase()) ||
                          app.programName.toLowerCase().includes(search.toLowerCase());
    const matchesProg = programFilter === 'ALL' || app.loanType === programFilter;
    const matchesIQ = !minIQ || (app.investmentIQ?.total || 0) >= Number(minIQ);
    return matchesSearch && matchesProg && matchesIQ;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleProgramChange = (e) => {
    setProgramFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleIQChange = (e) => {
    setMinIQ(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Qualified Marketplace Leads
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified commercial applications ready for working-deal underwriting and term sheet creation.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by ID or industry..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <select
            value={programFilter}
            onChange={handleProgramChange}
            className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="ALL">All Commercial Programs (8)</option>
            {LOAN_PROGRAMS.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={minIQ}
            onChange={handleIQChange}
            className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value={0}>Any Investment IQ Score</option>
            <option value={140}>&ge; 140 Investment IQ (Tier-2+)</option>
            <option value={155}>&ge; 155 Investment IQ (Tier-1 Prime)</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>Displaying {paginatedLeads.length} of {filteredLeads.length} Qualified Commercial Applications</span>
          <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            Rule FR-08 (Max 3 claims per deal)
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {paginatedLeads.map((lead) => {
            const claimsCount = lead.workingDeals?.claimedLendersCount || 0;
            const isFull = claimsCount >= 3;
            const userHasClaimed = lead.workingDeals?.claims?.some(c => c.lenderId === currentUser.id);

            return (
              <div key={lead.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{lead.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {lead.programName}
                    </span>
                    <span className="text-[11px] font-black text-[#002060] bg-[#FFD200] border border-amber-400 px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1 shadow-xs">
                      <Award className="w-3 h-3 text-[#002060] shrink-0" />
                      <span>IQ {lead.investmentIQ?.total || '150'}/180</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {lead.businessName}
                  </h3>

                  <p className="text-xs text-slate-500 truncate max-w-xl">
                    {lead.loanPurpose}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <div>
                      <span className="text-slate-400">Requested:</span>{' '}
                      <strong className="text-slate-900 font-extrabold">${lead.amount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Revenue:</span>{' '}
                      <strong className="text-slate-700">${lead.annualRevenue ? (lead.annualRevenue / 1000).toLocaleString() + 'k' : '$1.2M'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Operating:</span>{' '}
                      <span className="font-semibold">{lead.yearsInBusiness} yrs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 w-full md:w-auto self-start md:self-center">
                  <div className="text-left md:text-right">
                    <span className={`text-xs font-bold block ${
                      isFull ? 'text-rose-600' : 'text-purple-700'
                    }`}>
                      {claimsCount} of 3 Slots Filled
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {userHasClaimed ? 'Your Active Deal' : isFull ? 'Claims Locked' : 'Available to Claim'}
                    </span>
                  </div>

                  <Link
                    to={`/lender/leads/${lead.id}`}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Underwrite</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50/50">
            <span className="text-slate-500">
              Page <strong className="text-slate-800">{currentPage}</strong> of <strong className="text-slate-800">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
