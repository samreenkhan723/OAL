import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { INDUSTRY_LOANS } from '../../data/industryLoans';
import { SPECIALTY_PROGRAMS } from '../../data/loanPrograms';
import {
  Search,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Sparkles,
  Building2,
  Briefcase,
  Truck,
  Building,
  Boxes,
  Radio,
  Factory,
  Heart,
  Cpu,
  ShoppingBag,
  Filter,
  Layers,
  ChevronRight,
  UtensilsCrossed,
  Store,
  Smile,
  Container,
  Landmark,
  Hammer,
  Hotel,
  HeartPulse,
  Clapperboard,
  Car,
  GraduationCap,
  Sprout,
  Zap
} from 'lucide-react';

export const IndustryDirectoryPage = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all-industries'); // 'all-industries' | 'specialty'
  const { isAuthenticated, currentRole, addToast } = useApp();
  const navigate = useNavigate();

  // Helper to map icon name to Lucide component
  const getIndustryIcon = (name) => {
    switch (name) {
      case 'Truck': return Truck;
      case 'Briefcase': return Briefcase;
      case 'Building': return Building;
      case 'Boxes': return Boxes;
      case 'Radio': return Radio;
      case 'Factory': return Factory;
      case 'Heart': return Heart;
      case 'Cpu': return Cpu;
      case 'ShoppingBag': return ShoppingBag;
      case 'Hotel': return Hotel;
      case 'HeartPulse': return HeartPulse;
      case 'Clapperboard': return Clapperboard;
      case 'Car': return Car;
      case 'GraduationCap': return GraduationCap;
      case 'Sprout': return Sprout;
      case 'Hammer': return Hammer;
      case 'Zap': return Zap;
      case 'Landmark': return Landmark;
      case 'UtensilsCrossed': return UtensilsCrossed;
      default: return Building2;
    }
  };

  // Helper to map specialty icon name to Lucide component
  const getSpecialtyIcon = (name) => {
    switch (name) {
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'Truck': return Truck;
      case 'Store': return Store;
      case 'Smile': return Smile;
      case 'Container': return Container;
      case 'Building2': return Building2;
      case 'Landmark': return Landmark;
      case 'Hammer': return Hammer;
      default: return Sparkles;
    }
  };

  // Helper to retrieve professional photography image for specialty programs
  const getSpecialtyImage = (prog) => {
    if (prog.image) return prog.image;
    switch (prog.id || prog.slug) {
      case 'restaurant': return '/images/loan_restaurant.jpg';
      case 'food-truck': return '/images/loan_food_truck.jpg';
      case 'franchise': return '/images/loan_franchise.jpg';
      case 'dental':
      case 'dental-practice': return '/images/loan_dental.jpg';
      case 'freight-trucking': return '/images/loan_trucking.jpg';
      case 'hospitality':
      case 'hotel-motel-airbnb': return '/images/loan_hospitality.jpg';
      case 'church':
      case 'church-facility': return '/images/loan_church.jpg';
      case 'fix-and-flip': return '/images/loan_fix_flip.jpg';
      default: return '/images/hero_finance.jpg';
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setSearch('');
  };

  const filteredIndustries = INDUSTRY_LOANS.filter(ind => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      ind.title.toLowerCase().includes(q) ||
      ind.shortName.toLowerCase().includes(q) ||
      ind.subtitle.toLowerCase().includes(q) ||
      ind.description.toLowerCase().includes(q)
    );
  }).sort((a, b) => a.title.localeCompare(b.title));

  const filteredSpecialty = SPECIALTY_PROGRAMS.filter(prog => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      prog.title.toLowerCase().includes(q) ||
      prog.subtitle.toLowerCase().includes(q) ||
      prog.tagline.toLowerCase().includes(q) ||
      prog.description.toLowerCase().includes(q) ||
      (prog.badge && prog.badge.toLowerCase().includes(q))
    );
  }).sort((a, b) => a.title.localeCompare(b.title));

  const handleApplyClick = (slug) => {
    const targetSearch = `?program=${slug}`;
    if (!isAuthenticated) {
      navigate(`/apply${targetSearch}`);
    } else if (currentRole === 'borrower') {
      navigate(`/borrower/applications/new${targetSearch}`);
    } else {
      addToast(
        'Borrower Account Required',
        `You are currently signed in as ${currentRole.toUpperCase()}. Commercial loan applications require a Borrower account.`,
        'warning'
      );
      const roleDashboards = {
        lender: '/lender/dashboard',
        rep: '/rep/dashboard',
        admin: '/admin/dashboard',
        support: '/support/tickets'
      };
      navigate(roleDashboards[currentRole] || '/borrower/dashboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001744] via-[#002060] to-[#0070C0] text-white shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FFD200]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (Content & Value Props) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" />
              <span>Commercial Lending Directory — All 50 States</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
              Commercial Business Loans by Industry
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Connect with specialized verified commercial lenders tailored to your specific industry sector. Explore core industry sectors supported by the OAL Network exchange with 24-72 hour funding timelines.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#FFD200]" />
                <span>$10,000 to $500 Million+</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#FFD200]" />
                <span>180-Point Investment IQ Rating</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#FFD200]" />
                <span>No Initial Hard Credit Pull</span>
              </div>
            </div>
          </div>

          {/* Right Column (Showcase Image) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#001744]/70 group">
              <img
                src="/images/hero_finance.jpg"
                alt="Commercial Business Loans by Industry Underwriting"
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
                  <span className="text-xs font-bold text-white">Commercial Industry Sectors</span>
                  <span className="text-[10px] font-black uppercase text-[#FFD200] bg-[#FFD200]/20 px-2 py-0.5 rounded border border-[#FFD200]/30">
                    All 50 States
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Direct underwriting syndications across 20 key industry sectors.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Directory Navigation Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        
        {/* Toggle between All 9 Industries and Specialty Programs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            type="button"
            onClick={() => handleTabChange('all-industries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all-industries'
                ? 'bg-white text-[#002060] shadow-sm'
                : 'text-slate-600 hover:text-[#002060]'
            }`}
          >
            Loans by Industry (20 Core Sectors)
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('specialty')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'specialty'
                ? 'bg-white text-[#002060] shadow-sm'
                : 'text-slate-600 hover:text-[#002060]'
            }`}
          >
            Specialty Blueprint Programs (8 Programs)
          </button>
        </div>

        {/* Live Search with Context-Aware Placeholder */}
        <div className="relative min-w-[260px] sm:min-w-[340px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === 'all-industries'
                ? 'Search 20 industry loan sectors (e.g. Trucking, Telecom)...'
                : 'Search 8 specialty programs (e.g. Restaurant, Dental)...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#0070C0] focus:ring-2 focus:ring-sky-100 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

      </div>

      {/* 3. Section: 20 Core Industry Pages Grid */}
      {activeTab === 'all-industries' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-[#002060]">
              20 Core Commercial Industry Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your sector to review common business types, financing needs, and apply for loan capital:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndustries.map((ind) => {
              const IconComp = getIndustryIcon(ind.iconName);
              return (
                <div
                  key={ind.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0070C0] transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-0.5"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase bg-white/95 text-[#002060] shadow-sm border border-slate-200">
                        {ind.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0070C0] group-hover:bg-[#002060] group-hover:text-[#FFD200] flex items-center justify-center shrink-0 transition-colors border border-sky-100 shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">
                        {ind.fundingScope || '$10K – $500M+'}
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="text-lg font-heading font-extrabold text-[#002060] group-hover:text-[#0070C0] transition-colors">
                        {ind.title}
                      </h3>
                      <p className="text-xs text-[#0070C0] font-semibold mt-0.5">
                        {ind.subtitle}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {ind.description}
                    </p>

                    {/* Common Purposes Badges */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Popular Loan Purposes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ind.primaryPurposes.slice(0, 2).map((purp, pidx) => (
                          <span
                            key={pidx}
                            className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-100 font-medium truncate max-w-full"
                          >
                            {purp}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      to={`/industries/${ind.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0070C0] hover:text-[#002060] hover:bg-sky-50 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleApplyClick(ind.slug)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-black text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-sm active:scale-95 transition-all cursor-pointer border border-amber-300"
                    >
                      <span>Apply Now</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredIndustries.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-slate-600 font-bold">No industry matched your search term "{search}".</p>
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-xs text-[#0070C0] font-semibold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. Section: Specialty Blueprint Programs */}
      {activeTab === 'specialty' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-[#002060]">
              Specialty Commercial Loan Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dedicated loan facilities aligned with our foundational OAL Blueprint catalog:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecialty.map((prog) => {
              const IconComp = getSpecialtyIcon(prog.icon);
              const programImg = getSpecialtyImage(prog);
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0070C0] transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-0.5"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={programImg}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase bg-white/95 text-[#002060] shadow-sm border border-slate-200">
                        {prog.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0070C0] group-hover:bg-[#002060] group-hover:text-[#FFD200] flex items-center justify-center shrink-0 transition-colors border border-sky-100 shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">
                        $10K – $500M+
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="text-lg font-heading font-extrabold text-[#002060] group-hover:text-[#0070C0] transition-colors">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-[#0070C0] font-semibold mt-0.5">
                        {prog.subtitle}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>

                    {/* Eligible Loan Purposes Badges */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Eligible Loan Purposes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(prog.eligiblePurposes || []).slice(0, 2).map((purp, pidx) => (
                          <span
                            key={pidx}
                            className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-100 font-medium truncate max-w-full"
                          >
                            {purp}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      to={`/loan-programs/${prog.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0070C0] hover:text-[#002060] hover:bg-sky-50 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleApplyClick(prog.slug)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-black text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-sm active:scale-95 transition-all cursor-pointer border border-amber-300"
                    >
                      <span>Apply Now</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredSpecialty.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-slate-600 font-bold">No specialty loan program matched your search term "{search}".</p>
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-xs text-[#0070C0] font-semibold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Comparison Overview Table (Shown EXCLUSIVELY on Loans by Industry Tab) */}
      {activeTab === 'all-industries' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0070C0]">
              At A Glance Directory
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-[#002060] mt-1">
              Industry Loan Matrix & Decision Profiles
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#002060] text-white">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Industry Sector</th>
                  <th className="py-3.5 px-4 font-bold">Primary Financing Target</th>
                  <th className="py-3.5 px-4 font-bold">Turnaround</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredIndustries.map((ind) => (
                  <tr key={ind.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-extrabold text-[#002060]">
                      <Link to={`/industries/${ind.slug}`} className="hover:text-[#0070C0]">
                        {ind.title}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {ind.subtitle}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold whitespace-nowrap">
                      {ind.approvalTime}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/industries/${ind.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0070C0] hover:underline mr-3"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleApplyClick(ind.slug)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-[#FFD200] text-[#002060] hover:bg-[#ffe040] cursor-pointer"
                      >
                        Apply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
