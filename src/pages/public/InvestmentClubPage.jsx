import React from 'react';
import { Award, AlertTriangle, ShieldAlert, CheckCircle2, Lock, HelpCircle, Sparkles, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const InvestmentClubPage = () => {
  const tiers = [
    {
      name: 'VIP Diamond Club',
      scoreRange: '175+ LINV IQ',
      color: 'border-[#FFD200] bg-amber-50/60',
      badge: 'Tier-1 Institutional',
      desc: 'Exclusive premier network tier. Access to high-yield proprietary co-investments and private syndications.'
    },
    {
      name: 'MVP Money Club',
      scoreRange: '140 – 164 LINV IQ',
      color: 'border-[#00B0F0] bg-sky-50/60',
      badge: 'Tier-2 Preferred',
      desc: 'Mid-market commercial syndicate opportunities with priority allocation and quarterly investment forums.'
    },
    {
      name: 'OAL Club',
      scoreRange: '59+ LINV IQ',
      color: 'border-[#0070C0]/40 bg-blue-50/40',
      badge: 'Standard Access',
      desc: 'General platform participant club. Access to marketplace insights and commercial business workshops.'
    },
    {
      name: 'Team Get Money',
      scoreRange: '0 – 58 LINV IQ',
      color: 'border-slate-200 bg-slate-50',
      badge: 'Foundational',
      desc: 'Educational tier focused on credit remediation, DSCR optimization, and business plan restructuring.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-bold text-[#002060] bg-[#FFD200] px-3 py-1 rounded-full uppercase tracking-wider">
            Network Classification Program
          </span>
          <VerifyBadge note="Client confirmation pending for overlapping score ranges (59+ vs 140+), missing 165-174 bracket, and LINV IQ definition." />
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#002060]">
          The Money Club for Investors [Powered By Lenders]
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          The Money Club groups participants according to investment capabilities and financial readiness tiers. As stated in the client blueprint, membership is 100% free for accredited and participating investors.
        </p>

        {/* Free Membership Banner from DOCX Card 1 */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/auth/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] font-extrabold text-xs shadow-md shadow-amber-300/40 hover:scale-105 active:scale-95 transition-all"
          >
            <UserPlus className="w-4 h-4 text-[#002060]" />
            <span>Click Here to Join The Money Club || FREE ||</span>
            <ArrowRight className="w-4 h-4 text-[#002060]" />
          </Link>

          <Link
            to="/borrower/money-club"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
            <span>Enter Logged-In Member Club Portal &rarr;</span>
          </Link>
        </div>
      </div>

      {/* CRITICAL VERIFY BLOCKER ALERT PER PRD FR-14 & CLIENT DOCS */}
      <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-3 text-amber-900">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          <h3 className="text-base font-bold">
            [VERIFY: Business Rule Clarification Pending Client Confirmation]
          </h3>
        </div>

        <div className="text-xs text-amber-950/90 leading-relaxed space-y-2 pl-9">
          <p>
            As documented in the original client document <code>Investment IQ - Investment Club.docx</code>, the stated score ranges contain mathematical ambiguities:
          </p>
          <ul className="list-disc list-inside space-y-1 font-medium">
            <li>
              <strong>Overlapping Tiers:</strong> "OAL Club (59+)" mathematically overlaps with higher tiers (140–164 and 175+).
            </li>
            <li>
              <strong>Unallocated Gap:</strong> The range <strong>165–174</strong> is not assigned to any club tier in the source document.
            </li>
            <li>
              <strong>LINV IQ vs Borrower IQ:</strong> Clarification is pending whether <em>LINV IQ</em> is a distinct investor qualification score or identical to the borrower 180-point Investment IQ.
            </li>
          </ul>
          <p className="pt-2 text-amber-900 font-bold">
            Engineering Note: Frontend renders the tiers exactly as documented by the client, with automated club gate enforcement safely pending client confirmation of exact brackets.
          </p>
        </div>
      </div>

      {/* Tier Cards as Stated in Source Summary */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#002060]">
          Stated Client Membership Tiers (Subject to Reconciled Ranges)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border-2 transition-all space-y-3 hover:shadow-md ${t.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-[#002060] border border-slate-200">
                  {t.badge}
                </span>
                <span className="text-xs font-bold text-[#0070C0] font-mono">
                  {t.scoreRange}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#002060]">{t.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditation Notice */}
      <div className="p-6 rounded-2xl bg-sky-50/50 border border-[#00B0F0]/30 text-xs text-slate-700 space-y-2">
        <h4 className="font-bold text-[#002060] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#0070C0]" />
          Accredited Investor Regulatory Notice (SEC Rule 501)
        </h4>
        <p className="leading-relaxed text-slate-600">
          Accredited investor status under SEC Rule 501 of Regulation D cannot be inferred or certified solely from an Investment IQ calculation. Independent income ($200k+ individual / $300k+ joint), net worth ($1M+ excluding primary residence), or professional licensing (Series 7, 65, 82) verification is legally mandatory prior to syndication participation.
        </p>
      </div>
    </div>
  );
};
