import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getIndustryBySlug, INDUSTRY_LOANS } from '../../data/industryLoans';
import {
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  AlertCircle,
  FileText,
  Layers,
  TrendingUp,
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
  HelpCircle,
  Share2,
  Hotel,
  HeartPulse,
  Clapperboard,
  Car,
  GraduationCap,
  Sprout,
  Hammer,
  Zap,
  Landmark,
  UtensilsCrossed
} from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const IndustryDetailPage = () => {
  const { slug } = useParams();
  const { isAuthenticated, currentRole, addToast } = useApp();
  const navigate = useNavigate();

  const industry = getIndustryBySlug(slug) || INDUSTRY_LOANS[0];

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

  const IconComponent = getIndustryIcon(industry.iconName);

  // Find next and previous industry for pagination
  const currentIndex = INDUSTRY_LOANS.findIndex(i => i.id === industry.id);
  const prevIndustry = currentIndex > 0 ? INDUSTRY_LOANS[currentIndex - 1] : INDUSTRY_LOANS[INDUSTRY_LOANS.length - 1];
  const nextIndustry = currentIndex < INDUSTRY_LOANS.length - 1 ? INDUSTRY_LOANS[currentIndex + 1] : INDUSTRY_LOANS[0];

  const handleApplyClick = () => {
    const targetProgram = industry.slug || industry.id;
    const targetSearch = `?program=${targetProgram}`;

    if (!isAuthenticated) {
      // Route unauthenticated visitor via standard register or apply redirection
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0070C0] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/industries" className="hover:text-[#0070C0] transition-colors">Loans by Industry</Link>
          <span>/</span>
          <span className="text-[#002060] font-bold">{industry.shortName}</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/industries/${prevIndustry.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0070C0] hover:border-[#0070C0] bg-white transition-all shadow-xs"
            title={`Previous: ${prevIndustry.title}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev: {prevIndustry.shortName}</span>
          </Link>
          <Link
            to={`/industries/${nextIndustry.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0070C0] hover:border-[#0070C0] bg-white transition-all shadow-xs"
            title={`Next: ${nextIndustry.title}`}
          >
            <span className="hidden sm:inline">Next: {nextIndustry.shortName}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001744] via-[#002060] to-[#0070C0] text-white shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FFD200]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#FFD200] text-[#002060] shadow-sm">
                {industry.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-sky-200 border border-white/15">
                Loans by Industry
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>180-Point LINV IQ Eligible</span>
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#FFD200] shadow-inner">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white">
                  {industry.title}
                </h1>
              </div>
              <p className="text-base sm:text-xl text-[#00B0F0] font-bold tracking-tight">
                {industry.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              {industry.description}
            </p>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-[11px] font-medium text-slate-300 block uppercase">Funding Range</span>
                <span className="text-sm sm:text-base font-extrabold text-white">$10K - $500M+</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-[11px] font-medium text-slate-300 block uppercase">Decision Speed</span>
                <span className="text-sm sm:text-base font-extrabold text-[#FFD200]">24 - 72 Hours</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-[11px] font-medium text-slate-300 block uppercase">Underwriting</span>
                <span className="text-sm sm:text-base font-extrabold text-white">Competitive</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-[11px] font-medium text-slate-300 block uppercase">Market Scope</span>
                <span className="text-sm sm:text-base font-extrabold text-sky-300">All 50 States</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleApplyClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-sm text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-lg shadow-amber-400/25 active:scale-95 transition-all cursor-pointer border border-amber-300"
              >
                <span>Apply for {industry.shortName} Loan</span>
                <ArrowRight className="w-4 h-4 text-[#002060]" />
              </button>

              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
              >
                <span>How OAL Works</span>
              </Link>
            </div>

          </div>

          {/* Right Card: Quick Qualification Box with Industry Photo */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden text-white shadow-xl flex flex-col justify-between">
            {/* Industry Photo Banner */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900/50">
              <img
                src={industry.image}
                alt={industry.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001744] via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase bg-white/95 text-[#002060] shadow-sm">
                  {industry.badge}
                </span>
              </div>
            </div>

            <div className="p-6 pt-3 space-y-4 flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-2 pb-3 border-b border-white/15">
                <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
                <h3 className="font-bold text-sm tracking-wide uppercase text-white">Application Highlights</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B0F0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">No Initial Hard Credit Inquiry</span>
                    <span className="text-slate-300 text-[11px]">Browse marketplace without damaging personal or commercial credit.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B0F0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Maximum 3 Lenders Lock</span>
                    <span className="text-slate-300 text-[11px]">Strict protection ensures deals are worked by up to 3 verified lenders.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B0F0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">OAL Representative Guided</span>
                    <span className="text-slate-300 text-[11px]">Dedicated sales broker mediates offers to guarantee security.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[11px] text-slate-300 block">Typical Funding Timeline</span>
                  <span className="text-lg font-black text-[#FFD200]">24 - 72 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primary Financing Needs Bar */}
      <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#0070C0]" />
          <h2 className="text-lg font-extrabold text-[#002060]">
            Core Financing Needs & Popular Use of Capital
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Businesses in the <strong className="text-slate-800">{industry.shortName}</strong> sector most frequently secure commercial loans for the following strategic requirements:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {industry.primaryPurposes.map((purpose, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-sky-200/60 shadow-xs hover:border-[#0070C0] transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0070C0] flex items-center justify-center shrink-0 text-xs font-black mt-0.5">
                {idx + 1}
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug">
                {purpose}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Complete Client Explanatory Sections from Original DOCX Documents */}
      {industry.contentSections && industry.contentSections.length > 0 && (
        <div className="space-y-8">
          {industry.contentSections.map((sec) => (
            <div key={sec.id} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Section Header */}
              <div className="border-b border-slate-100 pb-4">
                {sec.sectionBadge && (
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0070C0] block mb-1">
                    {sec.sectionBadge}
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl font-heading font-black text-[#002060]">
                  {sec.sectionTitle}
                </h2>
                {sec.introParagraphs && sec.introParagraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Subsections Cards */}
              {sec.subsections && sec.subsections.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sec.subsections.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[#0070C0] transition-colors space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0070C0]" />
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#002060]">
                          {sub.title}
                        </h3>
                      </div>
                      {sub.description && (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {sub.description}
                        </p>
                      )}
                      {sub.bulletHeader && (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0070C0] block pt-1">
                          {sub.bulletHeader}
                        </span>
                      )}
                      {sub.bullets && sub.bullets.length > 0 && (
                        <ul className="space-y-2 pt-1 border-t border-slate-200/60">
                          {sub.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="text-xs text-slate-700 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0070C0] shrink-0 mt-0.5" />
                              <div>
                                {typeof b === 'string' ? (
                                  <span>{b}</span>
                                ) : (
                                  <span>
                                    <strong className="text-[#002060] font-bold">{b.label}:</strong>{' '}
                                    <span className="text-slate-600">{b.text}</span>
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Concluding Paragraph */}
              {sec.concludingParagraph && (
                <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-100 text-xs sm:text-sm text-[#002060] font-medium leading-relaxed flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#0070C0] shrink-0 mt-0.5" />
                  <p>{sec.concludingParagraph}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 5. Exact Client-Provided Tables from Original DOCX Documents */}
      {industry.clientTables && industry.clientTables.map((table, tIdx) => (
        <div key={table.id || tIdx} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0070C0]">
              Client Specification • Table {tIdx + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-[#002060] mt-1">
              {table.title}
            </h2>
            {table.subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {table.subtitle}
              </p>
            )}
          </div>

          {/* Responsive Table matching exact DOCX columns and rows */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#002060] text-white">
                <tr>
                  {table.columns.map((colName, cIdx) => (
                    <th key={cIdx} className="py-3.5 px-4 font-bold uppercase tracking-wider text-xs">
                      {colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-sky-50/50 transition-colors">
                    {row.map((cellText, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={`py-4 px-4 align-top ${
                          cellIdx === 0
                            ? 'font-extrabold text-[#002060] whitespace-nowrap sm:whitespace-normal'
                            : 'text-slate-600 leading-relaxed'
                        }`}
                      >
                        {cellIdx === 0 && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#0070C0] shrink-0" />
                            <span>{cellText}</span>
                          </div>
                        )}
                        {cellIdx > 0 && (
                          <div className="whitespace-pre-line">
                            {cellText}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* 5. Logistics-Specific Operational Supply Chain Flow (from DOCX) */}
      {industry.logisticsActivities && (
        <div className="bg-gradient-to-br from-slate-900 to-[#001744] text-white rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFD200]">
              Operational Supply Chain Flow
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
              Common Types of Logistics Activities Supported
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Logistics encompasses various activities essential for the movement and management of goods:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industry.logisticsActivities.map((act, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#FFD200]">{act.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">0{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{act.definition}</p>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 block mb-1.5">
                    Key Activities:
                  </span>
                  <ul className="space-y-1">
                    {act.keyActivities.map((ka, kidx) => (
                      <li key={kidx} className="text-xs text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#00B0F0] shrink-0" />
                        <span>{ka}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. OAL Network Platform Guidance & Underwriting Requirements (Preserved Separately) */}
      <div className="pt-4 border-t border-slate-200">
        <div className="mb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Platform Enhancements • OAL Network Standards
          </span>
          <h3 className="text-lg font-heading font-extrabold text-[#002060]">
            Recommended Facilities & Verification Checklist
          </h3>
          <p className="text-xs text-slate-500">
            Standard commercial financing facilities and verification documentation required under OAL Network evaluation:
          </p>
        </div>
      </div>

      {/* 7. Loan Facilities & Required Documentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Available Loan Types */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <DollarSign className="w-5 h-5 text-[#0070C0]" />
            <h3 className="text-lg font-bold text-[#002060]">
              Recommended Financing Facilities
            </h3>
          </div>
          <div className="space-y-3.5">
            {industry.loanTypes.map((lt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-1">
                <span className="font-extrabold text-sm text-[#002060] block">{lt.name}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{lt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Required Documents */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <FileText className="w-5 h-5 text-[#0070C0]" />
            <h3 className="text-lg font-bold text-[#002060]">
              Standard Verification Documents
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Having these ready expedites your Investment IQ evaluation and leads to faster 24-72 hr funding:
          </p>
          <ul className="space-y-2.5">
            {industry.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 8. Bottom Sticky CTA Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#002060] via-[#0070C0] to-[#002060] text-white p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#FFD200] text-[#002060]">
            Ready to secure capital?
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
            Apply for {industry.title}
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
            Takes less than 10 minutes. Get your verified 180-point Investment IQ score and connect with up to 3 competing commercial lenders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleApplyClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-xl shadow-amber-400/25 active:scale-95 transition-all cursor-pointer border border-amber-300 text-center"
          >
            Start Application Now &rarr;
          </button>
          <Link
            to="/industries"
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 text-center transition-all"
          >
            Back to Directory
          </Link>
        </div>
      </div>

    </div>
  );
};
