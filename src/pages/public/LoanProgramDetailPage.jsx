import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOAN_PROGRAMS, ALL_LOAN_PROGRAMS } from '../../data/loanPrograms';
import {
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Calendar,
  FileText,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  AlertCircle,
  UserPlus,
  LogIn,
  X
} from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';
import { IndustryDetailPage } from './IndustryDetailPage';

export const LoanProgramDetailPage = () => {
  const { slug } = useParams();
  const { isAuthenticated, currentRole, addToast } = useApp();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const program = (ALL_LOAN_PROGRAMS || LOAN_PROGRAMS).find(p => p.slug === slug || p.id === slug) || LOAN_PROGRAMS[0];

  if (program?.isIndustryProgram) {
    return <IndustryDetailPage />;
  }

  const getProgramImage = (idOrSlug) => {
    if (program?.image) return program.image;
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
      case 'money-club':
      case 'investment-club':
        return '/images/loan_money_club.jpg';
      default:
        return '/images/loan_restaurant.jpg';
    }
  };

  const handleApplyClick = () => {
    const targetProgram = program.slug || program.id;
    const targetSearch = `?program=${targetProgram}`;
    const targetPath = `/borrower/applications/new${targetSearch}`;

    if (!isAuthenticated) {
      // Unauthenticated visitor -> show clear Create Account / Sign In options modal
      setShowAuthModal(true);
    } else if (currentRole === 'borrower') {
      // Authenticated borrower -> navigate directly to loan wizard with selected program
      navigate(targetPath);
    } else {
      // Logged in under another role (Lender, Rep, Admin, Support) -> respect ProtectedRoute / show alert
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* 1. Breadcrumbs matching Client Doc */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0070C0] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/loan-programs" className="hover:text-[#0070C0] transition-colors">Types of Financing</Link>
          <span>/</span>
          <span className="text-[#002060] font-bold">{program.breadcrumbText || program.title}</span>
        </div>

        <Link
          to="/loan-programs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0070C0] transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-[#00B0F0]" />
          <span>Back to Commercial Loan Catalog</span>
        </Link>
      </div>

      {/* Program Hero Header with Deep Blue / Light Blue styling and Photography Image */}
      <div className="bg-gradient-to-br from-[#002060] via-[#003882] to-[#0070C0] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#00B0F0]/15 blur-2xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (Content & Stats) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-[#00B0F0]/40 text-xs font-bold uppercase tracking-wider">
              <span className="text-[#00B0F0]">Commercial Program</span>
              <span>•</span>
              <span className="text-[#FFD200]">{program.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              {program.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {program.tagline}
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-200">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <span className="block text-slate-300 text-[10px] uppercase font-semibold">Typical Loan Funding Size</span>
                <strong className="text-sm font-bold text-white">
                  {program.fundingScope || '$10,000 to $500M+'}
                </strong>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <span className="block text-slate-300 text-[10px] uppercase font-semibold">Credit Qualifications</span>
                <strong className="text-sm font-bold text-[#FFD200]">
                  {program.creditRequirement || 'GOOD & BAD CREDIT'}
                </strong>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                <span className="block text-slate-300 text-[10px] uppercase font-semibold">Typical Approval Speed</span>
                <strong className="text-sm font-bold text-[#00B0F0]">
                  {program.approvalTime || '2-24 Hours'}
                </strong>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleApplyClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-xs font-extrabold shadow-lg shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-amber-300"
              >
                <span>Apply for {program.title}</span>
                <ArrowRight className="w-4 h-4 text-[#002060]" />
              </button>
            </div>
          </div>

          {/* Right Column (Industry Photography Card) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#001744]/60 group">
              <img
                src={getProgramImage(program.slug || program.id)}
                alt={program.title}
                className="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002060]/90 via-[#002060]/20 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20">
                <div className="truncate pr-2">
                  <span className="block text-[10px] uppercase text-[#00B0F0] font-extrabold tracking-wider">Commercial Category</span>
                  <span className="text-white text-xs font-bold truncate">{program.subtitle || program.title}</span>
                </div>
                <span className="text-[#FFD200] bg-[#FFD200]/20 px-2 py-0.5 rounded-md shrink-0 font-extrabold text-[11px] border border-[#FFD200]/30">
                  {program.badge}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Complete Client Explanatory Sections from Original DOCX Documents */}
      {program.contentSections && program.contentSections.length > 0 && (
        <div className="space-y-8">
          {program.contentSections.map((sec) => (
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

      {/* 3. Exact Client-Provided Tables from Original DOCX Documents */}
      {program.clientTables && program.clientTables.map((table, tIdx) => (
        <div key={table.id || tIdx} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0070C0]">
              Client Specification • Table {tIdx + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-[#002060] mt-1">
              {table.title}
            </h2>
            {table.subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 mt-1">{table.subtitle}</p>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
              <thead className="bg-[#002060] text-white">
                <tr>
                  {table.columns.map((col, cIdx) => (
                    <th
                      key={cIdx}
                      className="py-3 px-4 sm:px-5 font-bold uppercase tracking-wider text-[11px] sm:text-xs"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {table.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`hover:bg-sky-50/50 transition-colors ${
                      rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                    }`}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`py-3.5 px-4 sm:px-5 leading-relaxed ${
                          cIdx === 0
                            ? 'font-bold text-[#002060] whitespace-nowrap'
                            : 'text-slate-700'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Program Details & Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Eligible Uses */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#002060] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Approved Financing Purposes
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Institutional underwriters in the OAL Network support the following commercial uses of capital:
          </p>

          <ul className="space-y-3 pt-2">
            {program.eligiblePurposes.map((purpose, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#00B0F0] mt-1.5 shrink-0" />
                <span>{purpose}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Mandatory KYC & Document Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#002060] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0070C0]" />
            Required Underwriting Documents
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Prepare these documentation files to complete identity verification and submit your deal to the marketplace:
          </p>

          <ul className="space-y-3 pt-2">
            {program.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#0070C0] shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Underwriting Architecture Note */}
      <div className="p-6 rounded-2xl bg-sky-50/60 border border-[#00B0F0]/30 text-xs text-slate-700 space-y-2">
        <h4 className="font-bold text-[#002060] flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#0070C0]" />
          OAL Underwriting Rules & Scoring Notice
        </h4>
        <p className="leading-relaxed text-slate-600">
          Submitting an application initiates an automated 180-point Investment IQ evaluation based on 5 core categories (Credit 70 pts, Cash Flow 50 pts, Collateral 30 pts, Business Plan 20 pts, Risk 10 pts). After contact verification, your profile is anonymized for lenders. Rule FR-08 ensures a maximum of 3 concurrent institutional lenders work on any single deal, with all communications mediated through your dedicated OAL Representative.
        </p>
      </div>

      {/* Bottom Apply for This Program CTA Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#002060] to-[#0070C0] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl font-heading font-bold text-white">
            Ready to apply for {program.title}?
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Complete the secure intake wizard to generate your 180-point Investment IQ score and access institutional lenders.
          </p>
        </div>
        <button
          type="button"
          onClick={handleApplyClick}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-xs font-extrabold shadow-lg shadow-amber-400/20 transition-all hover:scale-105 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
        >
          <span>Apply for This Program</span>
          <ArrowRight className="w-4 h-4 text-[#002060]" />
        </button>
      </div>

      {/* Auth Entry Modal for Unauthenticated Applicants (Preserves client requirement: create account before loan app) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00B0F0]/15 text-[#0070C0] text-[11px] font-bold border border-[#00B0F0]/30">
                <span>Selected Loan Program</span>
                <span>•</span>
                <span>{program.title}</span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-[#002060]">
                Apply for {program.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As required by federal commercial lending compliance and OAL Network security rules, all borrowers must create an authenticated account before starting the loan application intake wizard.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  const targetSlug = program.slug || program.id;
                  setShowAuthModal(false);
                  navigate('/auth/register', {
                    state: {
                      program: targetSlug,
                      programTitle: program.title,
                      from: { pathname: '/borrower/applications/new', search: `?program=${targetSlug}` }
                    }
                  });
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-[#00B0F0] bg-sky-50/50 hover:bg-sky-50 transition-all flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0070C0] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-[#0070C0]/30">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#002060] group-hover:text-[#0070C0]">
                      Create Account (New Borrower)
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#002060] bg-[#FFD200] px-2 py-0.5 rounded-full">
                      Step 1
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Register with your legal business name, email, phone, and secure password. You will proceed directly to the {program.title} application after mock verification.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  const targetSlug = program.slug || program.id;
                  setShowAuthModal(false);
                  navigate('/auth/login', {
                    state: {
                      program: targetSlug,
                      programTitle: program.title,
                      from: { pathname: '/borrower/applications/new', search: `?program=${targetSlug}` },
                      message: `Sign in to proceed with your application for ${program.title}.`
                    }
                  });
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-[#00B0F0] bg-white hover:bg-slate-50 transition-all flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-[#00B0F0]/15 group-hover:text-[#0070C0] flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <LogIn className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-[#0070C0]">
                    Sign In (Existing Borrower)
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Already have an account? Sign in to jump straight into the application wizard with {program.title} pre-selected.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
