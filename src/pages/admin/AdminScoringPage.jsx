import React from 'react';
import { Cpu, Award, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminScoringPage = () => {
  const pillars = [
    { name: 'Credit History', max: 70, share: '38.9%', rule: 'Scale: 580 – 850 FICO mapped linearly to 25 – 70 pts.' },
    { name: 'Cash Flow & DSCR', max: 50, share: '27.8%', rule: 'DSCR > 1.25x required for 40+ points. Bank balance volatility penalized.' },
    { name: 'Collateral Assets', max: 30, share: '16.7%', rule: 'First-position real estate / machinery awards up to 30 pts.' },
    { name: 'Business Plan & Viability', max: 20, share: '11.1%', rule: '> 3 years profitable commercial operating history awards 18+ pts.' },
    { name: 'Overall Risk Assessment', max: 10, share: '5.5%', rule: 'Macroeconomic and industry volatility scoring index.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            AI Scoring Engine Oversight (180-Point Model)
          </h1>
          <VerifyBadge note="Client confirmation pending for exact scoring formulas and manual underwriter override permissions" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Algorithmic model rules governing the composite Investment IQ standard.
        </p>
      </div>

      {/* Engine Status Banner */}
      <div className="bg-gradient-to-r from-[#0B1730] to-[#172B4D] rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D5B66A] text-slate-950 uppercase">
            Active Algorithmic Version
          </span>
          <h2 className="text-xl font-bold font-heading text-white mt-1">
            Engine Version: v2.4-Standard
          </h2>
          <p className="text-xs text-slate-300">
            Validated against historical commercial debt performance ledgers.
          </p>
        </div>

        <div className="text-right">
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
              <div className="flex items-center gap-2">
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
  );
};
