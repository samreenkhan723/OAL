import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const LenderAlertsPage = () => {
  const { applications } = useApp();

  const alerts = [
    {
      id: 'ALT-101',
      title: 'High-IQ Restaurant Deal in Prime Geographic Market',
      appId: 'APP-2026-1082',
      matchScore: '94% Match',
      amount: '$450,000 Restaurant Capital',
      iq: '154 / 180',
      reason: 'Matches portfolio preference for hospitality debt with DSCR > 1.35x and owned equipment collateral.',
      time: '12m ago'
    },
    {
      id: 'ALT-102',
      title: 'Logistics Fleet Expansion with Fortune 500 Carrier Contracts',
      appId: 'APP-2026-1094',
      matchScore: '96% Match',
      amount: '$780,000 Class-8 Trucking Capital',
      iq: '162 / 180',
      reason: 'Exceptional 6-year operational track record with zero DOT safety infractions.',
      time: '1h ago'
    },
    {
      id: 'ALT-103',
      title: 'Dental Operatory Suite & 3D Imaging Expansion',
      appId: 'APP-2026-1105',
      matchScore: '91% Match',
      amount: '$320,000 Dental Debt',
      iq: '148 / 180',
      reason: 'Low default rate healthcare receivables with established doctor production history.',
      time: '4h ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              AI Lead Alerts
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
              Algorithmic Matching
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time notifications triggered when new applicants fulfill your underwriting buy-box criteria.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alt) => (
          <div
            key={alt.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {alt.matchScore}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{alt.appId}</span>
                <span className="text-xs text-slate-400">{alt.time}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{alt.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{alt.reason}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <span className="text-slate-500 font-semibold">{alt.amount}</span>
                <span className="text-[#D5B66A] font-extrabold bg-[#0B1730] px-2 py-0.5 rounded text-[11px]">
                  Investment IQ: {alt.iq}
                </span>
              </div>
            </div>

            <Link
              to={`/lender/leads/${alt.appId}`}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 self-end md:self-center"
            >
              <span>Inspect Lead</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
