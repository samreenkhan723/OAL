import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  DollarSign,
  Banknote,
  Lock,
  ArrowRight,
  FileCheck2,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const HowItWorksPage = () => {
  const steps = [
    {
      step: '01',
      title: 'Registration & Identity Authentication',
      role: 'Borrower',
      desc: 'Create your enterprise borrower profile with legal company information, executive identity, and multi-factor authentication (MFA).',
      badge: 'Step 1: Account Setup',
      points: [
        'Secure email & SMS phone verification',
        'Company ownership verification',
        'Direct connection to an assigned OAL Representative'
      ]
    },
    {
      step: '02',
      title: 'Loan Application Intake Wizard',
      role: 'Borrower',
      desc: 'Submit your commercial financing request through our structured intake wizard, tailored to your commercial loan program.',
      badge: 'Step 2: Intake Engine',
      points: [
        'Select from 8 purpose-built commercial debt categories',
        'Targeted loan amount ($10,000 to $500M+)',
        'Draft auto-save and continuous resume capability'
      ]
    },
    {
      step: '03',
      title: 'KYC & Document Verification',
      role: 'Compliance & Representative',
      desc: 'Upload bank statements, tax returns, and equipment invoices. Compliance checks verify document legitimacy before deal release.',
      badge: 'Step 3: Verification',
      points: [
        'Encrypted electronic document storage',
        'Cash-flow stability and capacity confirmation',
        'Sensitive borrower identity withheld from initial marketplace browsing'
      ]
    },
    {
      step: '04',
      title: '180-Point Investment IQ Assessment',
      role: 'Underwriting Engine',
      desc: 'Algorithmic scoring evaluates commercial readiness across the 5 client pillars: Credit (70), Cash Flow (50), Collateral (30), Business Plan (20), and Risk (10).',
      badge: 'Step 4: 180-Pt Scoring',
      points: [
        'Credit History (70 pts) & Cash Flow (50 pts)',
        'Collateral (30 pts), Business Plan (20 pts), Risk (10 pts)',
        'VIP Diamond, MVP, OAL Club tier qualification'
      ]
    },
    {
      step: '05',
      title: 'Rule FR-08: Max 3 Working Deals',
      role: 'Institutional Lenders',
      desc: 'Qualified applications appear in our sanitized lender exchange. Under Rule FR-08, at most 3 institutional lenders can simultaneously claim working deals.',
      badge: 'Step 5: Rule FR-08',
      points: [
        'Anonymized applicant profile protects borrower privacy',
        'Atomic claim locking strictly enforces 3-lender maximum',
        'Competing lender identities hidden from each other'
      ]
    },
    {
      step: '06',
      title: 'Mediated Offers & Funding Disbursal',
      role: 'Borrower & OAL Representative',
      desc: 'Review and compare binding offers side-by-side. Communicate securely via your OAL Representative, accept the optimal offer, and track 24-72 hour funding.',
      badge: 'Step 6: Funding Stage',
      points: [
        'Side-by-side comparison of loan offers, terms, and requirements',
        'Representative-mediated communications prevent unsolicited broker spam',
        'Full status timeline tracking straight through to funding wire'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#00B0F0]" />
          <span>Marketplace Operational Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#002060]">
          How OAL Network Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          From first application to bank disbursement in 24 to 72 hours, our workflow ensures institutional underwriting rigor, fair competition, and strict data privacy.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-6">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#00B0F0]/50 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Step Number Badge */}
            <div className="lg:col-span-3 flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
              <span className="text-5xl font-extrabold text-[#00B0F0]/40 font-heading">
                {item.step}
              </span>
              <div className="mt-4">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30 uppercase tracking-wider">
                  {item.badge}
                </span>
                <div className="text-xs font-semibold text-slate-500 mt-2">
                  Primary Actor: <strong className="text-[#002060]">{item.role}</strong>
                </div>
              </div>
            </div>

            {/* Description & Points */}
            <div className="lg:col-span-9 space-y-3">
              <h3 className="text-xl font-bold text-[#002060]">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {item.points.map((pt, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#002060] via-[#003882] to-[#0070C0] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Ready to Connect with Qualified Institutional Lenders?
          </h2>
          <p className="text-sm text-slate-200">
            Begin your application today. Explore all 8 commercial loan categories, create your account, view your Investment IQ, and receive competitive terms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/loan-programs"
              className="px-7 py-3 rounded-xl text-xs font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] shadow-md shadow-amber-300/40 hover:scale-105 active:scale-95 transition-all"
            >
              Explore Loan Programs &rarr;
            </Link>
            <Link
              to="/investment-iq"
              className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              Learn About Investment IQ Scoring
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
