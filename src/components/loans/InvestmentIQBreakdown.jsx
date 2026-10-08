import React from 'react';
import { Award, CheckCircle2, AlertCircle, Info, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { VerifyBadge } from '../common/VerifyBadge';

export const InvestmentIQBreakdown = ({ investmentIQ, showDetailedExplanations = true }) => {
  if (!investmentIQ) {
    return (
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center">
        <Award className="w-10 h-10 text-slate-400 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-slate-700">Investment IQ Pending</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Scoring is automatically computed once KYC identity documents and bank statements are submitted and verified.
        </p>
      </div>
    );
  }

  const { total = 0, max = 180, breakdown = {}, version = 'v2.4-Standard', assessedAt, explanation } = investmentIQ;
  const percentage = Math.round((total / max) * 100);

  const components = [
    {
      key: 'creditHistory',
      label: 'Credit History',
      score: breakdown.creditHistory ?? 62,
      max: 70,
      color: 'bg-blue-600',
      description: 'Historical credit profile, debt utilization, payment history, and public records.'
    },
    {
      key: 'cashFlow',
      label: 'Cash Flow & DSCR',
      score: breakdown.cashFlow ?? 44,
      max: 50,
      color: 'bg-emerald-600',
      description: 'Monthly operational cash flow, DSCR capacity (>1.25x), and bank daily balance stability.'
    },
    {
      key: 'collateral',
      label: 'Collateral & Assets',
      score: breakdown.collateral ?? 22,
      max: 30,
      color: 'bg-purple-600',
      description: 'Real property equity, machinery invoices, inventory appraisal, and UCC lien positions.'
    },
    {
      key: 'businessPlan',
      label: 'Business Plan & Viability',
      score: breakdown.businessPlan ?? 18,
      max: 20,
      color: 'bg-amber-600',
      description: 'Market positioning, executive operational resume, customer retention, and budget model.'
    },
    {
      key: 'riskAssessment',
      label: 'Overall Risk Assessment',
      score: breakdown.riskAssessment ?? 8,
      max: 10,
      color: 'bg-teal-600',
      description: 'Industry-specific risk indexes, market volatility factors, and regulatory standing.'
    }
  ];

  const getScoreTier = (score) => {
    if (score >= 165) return { label: 'Tier-1 Institutional Prime', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (score >= 140) return { label: 'Tier-2 Preferred Commercial', color: 'text-blue-700 bg-blue-50 border-blue-300' };
    if (score >= 110) return { label: 'Tier-3 Standard Commercial', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    return { label: 'Under Review / Developing', color: 'text-slate-700 bg-slate-50 border-slate-300' };
  };

  const tier = getScoreTier(total);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-[#0B1730] to-[#172B4D] text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D5B66A] text-slate-950 uppercase tracking-wider">
                180-Point Assessment
              </span>
              <VerifyBadge note="Client confirmation pending for exact credit bands and mathematical weighting formulas" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mt-2">Investment IQ™ Scoring</h3>
            <p className="text-xs text-slate-300 mt-1">
              Engine Version: {version} • Evaluated {assessedAt ? new Date(assessedAt).toLocaleDateString() : 'Recent'}
            </p>
          </div>

          {/* Big Score Dial */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15">
            <div className="text-right">
              <div className="text-3xl font-extrabold text-[#D5B66A] tracking-tight">{total}</div>
              <div className="text-[11px] text-slate-300 font-medium">Out of {max} Max</div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-[#D5B66A] flex items-center justify-center font-bold text-xs text-white">
              {percentage}%
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${tier.color}`}>
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            {tier.label}
          </span>
          <span className="text-[11px] text-slate-300">
            *Objective market readiness standard. Not a credit guarantee.
          </span>
        </div>
      </div>

      {/* Component Breakdowns */}
      <div className="p-6 space-y-5">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          5 Core Scoring Pillars (Sum = {max} Points)
        </h4>

        <div className="space-y-4">
          {components.map((comp) => {
            const compPercent = Math.round((comp.score / comp.max) * 100);
            return (
              <div key={comp.key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{comp.label}</span>
                    <span className="text-[10px] text-slate-600 font-medium">(Max {comp.max} pts)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{comp.score}</span>
                    <span className="text-[11px] text-slate-600">/ {comp.max}</span>
                    <span className="text-[10px] font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {compPercent}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${comp.color}`}
                    style={{ width: `${compPercent}%` }}
                  />
                </div>

                {showDetailedExplanations && (
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    {comp.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Narrative Underwriter Summary */}
        {explanation && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <strong className="font-semibold block mb-0.5">Scoring Underwriter Summary:</strong>
              {explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
