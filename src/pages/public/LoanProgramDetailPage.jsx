import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Sparkles
} from 'lucide-react';

export const LoanProgramDetailPage = () => {
  const { slug } = useParams();
  const program = LOAN_PROGRAMS.find(p => p.slug === slug || p.id === slug) || LOAN_PROGRAMS[0];

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
      <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D5B66A] text-xs font-bold uppercase tracking-wider">
            <span>Specialized Commercial Debt</span>
            <span>•</span>
            <span>{program.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            {program.title}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
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
            <Link
              to={`/apply?program=${program.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>Apply for {program.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
    </div>
  );
};
