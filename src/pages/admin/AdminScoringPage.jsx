import React, { useState } from 'react';
import { Cpu, Award, ShieldCheck, AlertCircle, CheckCircle2, UserCheck, Building2, Check, Sparkles } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminScoringPage = () => {
  const [activeTab, setActiveTab] = useState('standard'); // 'standard' | 'investor'

  const pillars = [
    { name: 'Credit History', max: 70, share: '38.9%', rule: 'Scale: 580 – 850 FICO mapped linearly to 25 – 70 pts.' },
    { name: 'Cash Flow & DSCR', max: 50, share: '27.8%', rule: 'DSCR > 1.25x required for 40+ points. Bank balance volatility penalized.' },
    { name: 'Collateral Assets', max: 30, share: '16.7%', rule: 'First-position real estate / machinery awards up to 30 pts.' },
    { name: 'Business Plan & Viability', max: 20, share: '11.1%', rule: '> 3 years profitable commercial operating history awards 18+ pts.' },
    { name: 'Overall Risk Assessment', max: 10, share: '5.5%', rule: 'Macroeconomic and industry volatility scoring index.' },
  ];

  const investorPillars = [
    {
      category: 'Individual Net Worth',
      score: '25 / 25 Pts',
      requirement: 'Net worth exceeding $1,000,000, strictly excluding primary personal residence (Doc 4 Line 75).'
    },
    {
      category: 'Annual Income Thresholds',
      score: '15 / 15 Pts',
      requirement: 'Individual > $200,000 in each of the last 2 years, or Joint with spouse/partner > $300,000 (Doc 4 Line 77).'
    },
    {
      category: 'Corporate Entity Criteria',
      score: '25 / 25 Pts',
      requirement: 'Corporate assets exceeding $5,000,000, or 100% equity owners are accredited investors (Doc 4 Line 80).'
    },
    {
      category: 'Professional Credentials (FINRA)',
      score: '10 / 10 Pts',
      requirement: 'Series 7 (General Securities), Series 65 (Investment Adviser), or Series 82 in good standing (Doc 4 Line 91).'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            AI Scoring Engine Oversight (Dual Model Architecture)
          </h1>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
            Doc 1 Line 96 Architecture
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Admin oversight for algorithmic models: Standard 180-Point Model for regular loan seekers, and the Special Scoring Engine for verified applicant investors completing the special accredited form.
        </p>
      </div>

      {/* Tab Switcher: Standard vs Special Investor */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl w-full sm:w-auto self-start">
        <button
          type="button"
          onClick={() => setActiveTab('standard')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Standard 180-Pt Regular Applicant Model
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('investor')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'investor' ? 'bg-[#0B1730] text-[#D5B66A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-[#D5B66A]" />
          <span>2. Special Verified Investor Form Engine (Doc 4)</span>
        </button>
      </div>

      {/* VIEW 1: STANDARD MODEL */}
      {activeTab === 'standard' && (
        <div className="space-y-6">
          {/* Engine Status Banner */}
          <div className="bg-gradient-to-r from-[#0B1730] to-[#172B4D] rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D5B66A] text-slate-950 uppercase">
                Active Algorithmic Version
              </span>
              <h2 className="text-xl font-bold font-heading text-white mt-1">
                Standard Engine: v2.4-Standard
              </h2>
              <p className="text-xs text-slate-300">
                Automated 180-point evaluation calculated upon borrower application submission.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-3xl font-extrabold text-[#D5B66A] font-heading">180 PTS</div>
              <span className="text-xs text-slate-300">Max Composite Score</span>
            </div>
          </div>

          {/* Pillars Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
            <div className="p-4 font-bold text-xs text-slate-700 uppercase tracking-wider">
              5 Core Mathematical Pillars (PRD FR-05)
            </div>

            {pillars.map((p, idx) => (
              <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Max {p.max} Points ({p.share})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{p.rule}</p>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  Automated
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: SPECIAL INVESTOR FORM ENGINE (Doc 1 Line 96 & Doc 4) */}
      {activeTab === 'investor' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-950 to-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD200] text-[#002060] uppercase">
                Special Scoring Engine (Doc 1 Line 96)
              </span>
              <h2 className="text-xl font-bold font-heading text-white mt-1">
                Accredited Investor Form & Verification Engine
              </h2>
              <p className="text-xs text-slate-300">
                Special assessment applied when a loan seeker joins the Investors Club and completes the accredited form.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-3xl font-extrabold text-[#D5B66A] font-heading">LINV IQ</div>
              <span className="text-xs text-slate-300">Investor Rating Standard</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
            <div className="p-4 font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Doc 4 Accredited Investor Evaluation Criteria</span>
              <span className="text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Green Check Badge Issued on Approval
              </span>
            </div>

            {investorPillars.map((item, idx) => (
              <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{item.category}</h4>
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {item.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{item.requirement}</p>
                </div>

                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 self-start sm:self-auto">
                  Verified Intake
                </span>
              </div>
            ))}
          </div>

          {/* Club Tiers Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#D5B66A]">
              The Money Club Tier Hierarchy Resulting From Special Scoring (Doc 4 Lines 4-11)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/10 border border-amber-400/40 space-y-1">
                <span className="text-[#FFD200] font-bold block text-sm">VIP Diamond Club</span>
                <span className="text-slate-300 block font-semibold">175+ LINV IQ</span>
                <p className="text-[11px] text-slate-400">Preferred Accredited Investor status with proprietary co-investment access.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-sky-400/40 space-y-1">
                <span className="text-sky-300 font-bold block text-sm">MVP Money Club</span>
                <span className="text-slate-300 block font-semibold">140 – 164 LINV IQ</span>
                <p className="text-[11px] text-slate-400">Advanced professional investors with commercial syndicate allocation.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-blue-400/40 space-y-1">
                <span className="text-blue-300 font-bold block text-sm">OAL Club</span>
                <span className="text-slate-300 block font-semibold">59+ LINV IQ</span>
                <p className="text-[11px] text-slate-400">Advance finance training and relations for TGM Club graduates.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-slate-400/40 space-y-1">
                <span className="text-slate-300 font-bold block text-sm">Team Get Money</span>
                <span className="text-slate-400 block font-semibold">0 – 58 LINV IQ</span>
                <p className="text-[11px] text-slate-400">Financial development and credit foundation program for beginners.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

