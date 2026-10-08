import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, CheckCircle2, Info, ArrowRight, HelpCircle, Calculator } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const InvestmentIQExplainerPage = () => {
  // Interactive test calculator
  const [calcInputs, setCalcInputs] = useState({
    creditScore: 720,
    annualRevenue: 1200000,
    yearsInBusiness: 4,
    hasCollateral: true
  });

  const calcCreditPts = Math.min(70, Math.max(25, Math.round(((calcInputs.creditScore - 580) / 270) * 70)));
  const calcCashFlowPts = Math.min(50, Math.max(20, Math.round((calcInputs.annualRevenue / 1500000) * 50)));
  const calcBusinessPlanPts = calcInputs.yearsInBusiness >= 3 ? 18 : 14;
  const calcCollateralPts = calcInputs.hasCollateral ? 24 : 14;
  const calcRiskPts = 8;
  const calcTotal = calcCreditPts + calcCashFlowPts + calcBusinessPlanPts + calcCollateralPts + calcRiskPts;

  const components = [
    {
      title: 'Credit History',
      max: 70,
      share: '38.9%',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      desc: 'Evaluates personal guarantor credit score, commercial trade line history, on-time payment records, public filings, and debt utilization ratios.'
    },
    {
      title: 'Cash Flow & DSCR',
      max: 50,
      share: '27.8%',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      desc: 'Audits monthly operational cash flow from business bank statements, average daily balances, and Debt-Service Coverage Ratio (DSCR > 1.25x).'
    },
    {
      title: 'Collateral & Hard Assets',
      max: 30,
      share: '16.7%',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      desc: 'Considers physical machinery, fleet vehicles, commercial property equity, inventory appraisals, and existing primary lien encumbrances.'
    },
    {
      title: 'Business Plan & Viability',
      max: 20,
      share: '11.1%',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      desc: 'Assesses executive operational track record, market competitive positioning, customer concentration, and stated 3-year revenue forecast.'
    },
    {
      title: 'Overall Risk Assessment',
      max: 10,
      share: '5.5%',
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      desc: 'Industry-specific macroeconomic stability, regulatory compliance standing, supply chain vulnerability, and geographic resilience.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-bold text-[#D5B66A] bg-[#0B1730] px-3 py-1 rounded-full uppercase tracking-wider">
            Proprietary Underwriting Standard
          </span>
          <VerifyBadge note="Client confirmation pending for exact mathematical formulas and score qualification cutoffs" />
        </div>

        <h1 className="text-4xl font-heading font-extrabold text-[#0B1730]">
          The 180-Point Investment IQ™
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The OAL Network Investment IQ assesses commercial financing readiness on a transparent 180-point scale. It gives institutional underwriters an immediate, standardized measure of creditworthiness without exposing unredacted personal information.
        </p>
      </div>

      {/* 5 Components Table / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            5 Scoring Pillars (Total: 180 Points)
          </h2>
          <span className="text-xs text-slate-500">Engine Version: v2.4-Standard</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.color}`}>
                  Max {c.max} Pts
                </span>
                <span className="text-xs font-semibold text-slate-400">{c.share}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}

          {/* Sum Card */}
          <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-2xl p-6 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold text-[#D5B66A] uppercase tracking-wider block mb-2">
                Unified Composite Total
              </span>
              <div className="text-4xl font-extrabold text-[#D5B66A] font-heading">
                180 PTS
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Scores &ge; 140 indicate high commercial readiness and prompt priority alerts to participating institutional lenders.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 text-[11px] text-slate-300">
              *Not an automatic loan approval guarantee. Subject to verified documents.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Calculator */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Interactive Investment IQ Estimator
            </h3>
            <p className="text-xs text-slate-500">
              Adjust sample financial inputs to simulate how your score is calculated.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
                <span>Estimated Personal Credit Score</span>
                <span className="text-blue-600">{calcInputs.creditScore} FICO</span>
              </label>
              <input
                type="range"
                min="580"
                max="850"
                value={calcInputs.creditScore}
                onChange={(e) => setCalcInputs({ ...calcInputs, creditScore: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
                <span>Annual Commercial Revenue</span>
                <span className="text-blue-600">${calcInputs.annualRevenue.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="100000"
                max="3000000"
                step="50000"
                value={calcInputs.annualRevenue}
                onChange={(e) => setCalcInputs({ ...calcInputs, annualRevenue: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Has Collateral Asset?</span>
                <span className="text-[10px] text-slate-500">Real estate or equipment backing</span>
              </div>
              <input
                type="checkbox"
                checked={calcInputs.hasCollateral}
                onChange={(e) => setCalcInputs({ ...calcInputs, hasCollateral: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>
          </div>

          {/* Result Dial */}
          <div className="bg-[#0B1730] text-white p-6 rounded-2xl flex flex-col items-center text-center justify-between space-y-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Estimated Investment IQ
            </span>
            <div className="text-5xl font-extrabold text-[#D5B66A] font-heading">
              {calcTotal}
              <span className="text-base text-slate-400 font-normal"> / 180</span>
            </div>

            <div className="w-full grid grid-cols-3 gap-2 text-center text-[10px] border-t border-white/10 pt-3">
              <div>
                <span className="text-slate-400 block">Credit:</span>
                <strong className="text-white">{calcCreditPts}/70</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Cash Flow:</span>
                <strong className="text-white">{calcCashFlowPts}/50</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Collateral:</span>
                <strong className="text-white">{calcCollateralPts}/30</strong>
              </div>
            </div>

            <Link
              to="/borrower/applications/new"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center transition-colors"
            >
              Apply with this Profile &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
