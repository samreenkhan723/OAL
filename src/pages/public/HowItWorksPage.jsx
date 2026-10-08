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
  HelpCircle
} from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const HowItWorksPage = () => {
  const steps = [
    {
      step: '01',
      title: 'Registration & Identity Authentication',
      role: 'Borrower',
      desc: 'Create your enterprise borrower profile with legal company information, EIN, executive identity, and multi-factor authentication (MFA).',
      badge: 'Account Setup',
      points: [
        'Secure email & SMS phone verification',
        'Company ownership verification',
        'Direct connection to an assigned OAL Representative'
      ]
    },
    {
      step: '02',
      title: '6-Step Loan Application Wizard',
      role: 'Borrower',
      desc: 'Submit your financing request through our structured intake wizard, tailored to your commercial loan program.',
      badge: 'Intake Engine',
      points: [
        'Select from 8 purpose-built commercial debt categories',
        'Targeted loan amount, purpose (<= 20 words), and revenue',
        'Draft auto-save and continuous resume capability'
      ]
    },
    {
      step: '03',
      title: 'KYC & Document Verification',
      role: 'Compliance Admin',
      desc: 'Upload 6 months of bank statements, tax returns, and equipment invoices. Our compliance team verifies authenticity before marketplace release.',
      badge: 'KYC Audit',
      points: [
        'AES-256 encrypted electronic document repository',
        'Cash-flow stability and DSCR capacity confirmation',
        'Sensitive PII withheld from initial marketplace browsing'
      ]
    },
    {
      step: '04',
      title: '180-Point Investment IQ Assessment',
      role: 'Scoring Engine',
      desc: 'Our algorithmic scoring engine calculates your objective commercial readiness score up to 180 points across 5 essential pillars.',
      badge: 'Proprietary Score',
      points: [
        'Credit History (70 pts) & Cash Flow (50 pts)',
        'Collateral (30 pts), Business Plan (20 pts), Risk (10 pts)',
        'Clear breakdown explanation with improvement roadmap'
      ]
    },
    {
      step: '05',
      title: 'Qualified Marketplace & Max 3 Working Deals',
      role: 'Institutional Lenders',
      desc: 'Qualified applications appear in our sanitized lender exchange. Under Rule FR-08, at most 3 lenders can simultaneously claim working deals.',
      badge: 'Rule FR-08',
      points: [
        'Anonymized applicant profile protects borrower privacy',
        'Atomic claim locking strictly enforces 3-lender maximum',
        'Competing lender identities hidden from each other'
      ]
    },
    {
      step: '06',
      title: 'Mediated Offers & Funding Disbursal',
      role: 'Borrower & Rep',
      desc: 'Review and compare binding offers side-by-side. Communicate securely via your OAL Representative, accept the optimal offer, and track funding.',
      badge: 'Funding Stage',
      points: [
        'Transparent comparison of APR, fees, and monthly debt service',
        'Strict Rule FR-09: Rep-mediated communications prevent friction',
        'Full status timeline tracking straight through to funding wire'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Marketplace Operational Blueprint
        </span>
        <h1 className="text-4xl font-heading font-extrabold text-[#0B1730]">
          How OAL Network Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          From first application to bank disbursement, our workflow ensures institutional underwriting rigor, fair competition, and strict data privacy.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-8">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Step Number Badge */}
            <div className="lg:col-span-3 flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
              <span className="text-5xl font-extrabold text-blue-600/30 font-heading">
                {item.step}
              </span>
              <div className="mt-4">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                  {item.badge}
                </span>
                <div className="text-xs font-semibold text-slate-500 mt-2">
                  Primary Actor: <strong className="text-slate-900">{item.role}</strong>
                </div>
              </div>
            </div>

            {/* Description & Points */}
            <div className="lg:col-span-9 space-y-3">
              <h3 className="text-xl font-bold text-[#0B1730]">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                {item.points.map((pt, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">
          Ready to Connect with Qualified Institutional Lenders?
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Begin your application now. Save your draft anytime, view your Investment IQ, and receive competitive terms tailored to your balance sheet.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/borrower/applications/new"
            className="px-7 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/30 transition-all"
          >
            Start Loan Application &rarr;
          </Link>
          <Link
            to="/investment-iq"
            className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
          >
            Learn About Investment IQ Scoring
          </Link>
        </div>
      </div>
    </div>
  );
};
