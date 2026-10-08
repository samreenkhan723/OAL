import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import {
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Calendar,
  FileText,
  ArrowRight,
  ChevronLeft,
  Info,
  Clock,
  Sparkles,
  AlertCircle,
  UserPlus,
  LogIn,
  X
} from 'lucide-react';

export const LoanProgramDetailPage = () => {
  const { slug } = useParams();
  const { isAuthenticated, currentRole, addToast } = useApp();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const program = LOAN_PROGRAMS.find(p => p.slug === slug || p.id === slug) || LOAN_PROGRAMS[0];

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/loan-programs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Loan Programs Catalog</span>
        </Link>
      </div>

      {/* Program Hero Header */}
      <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D5B66A] text-xs font-bold uppercase tracking-wider">
            <span>Specialized Commercial Debt</span>
            <span>•</span>
            <span>{program.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
            {program.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {program.tagline}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div>
              <span className="block text-slate-400 text-[10px] uppercase">Financing Volume</span>
              <strong className="text-sm font-bold text-white">
                ${(program.minAmount / 1000).toLocaleString()}k – ${(program.maxAmount / 1000000).toFixed(1)}M
              </strong>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase">Indicative Rate</span>
              <strong className="text-sm font-bold text-[#D5B66A]">
                {program.typicalRate}
              </strong>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase">Term Length</span>
              <strong className="text-sm font-bold text-white">
                {program.termMonths}
              </strong>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={handleApplyClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Apply for {program.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Program Details & Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Eligible Uses */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Approved Financing Purposes
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Underwriters will verify quotes and invoices aligned with the following capital expenditures:
          </p>

          <ul className="space-y-3 pt-2">
            {program.eligiblePurposes.map((purpose, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span>{purpose}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Mandatory KYC & Document Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Required Underwriting Documents
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ensure you have these electronic files prepared to complete KYC and qualify for the marketplace:
          </p>

          <ul className="space-y-3 pt-2">
            {program.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Underwriting Architecture Note */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600" />
          OAL Underwriting Integrity Standard
        </h4>
        <p className="leading-relaxed">
          Submitting an application triggers an automated 180-point Investment IQ evaluation. Once KYC identity documents are approved, your sanitized profile becomes visible to eligible lenders. Maximum 3 institutional lenders may concurrently claim working underwriting deals under rule FR-08.
        </p>
      </div>

      {/* Bottom Apply for This Program CTA Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1730] to-[#172B4D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl font-heading font-bold text-white">
            Ready to apply for {program.title}?
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Complete the secure 6-step intake to generate your 180-point Investment IQ and connect with verified lenders.
          </p>
        </div>
        <button
          type="button"
          onClick={handleApplyClick}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
        >
          <span>Apply for This Program</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Auth Entry Modal for Unauthenticated Applicants */}
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
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                <span>Selected Loan Program</span>
                <span>•</span>
                <span>{program.title}</span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-[#0B1730]">
                Apply for {program.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To aid in federal compliance and verify identity, all applicants must establish an authenticated account before starting the loan application wizard.
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
                    Register with your legal name, business email, phone, and secure password to initiate this application.
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
                    Already have an account? Sign in to jump straight into the application wizard with {program.title} selected.
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
