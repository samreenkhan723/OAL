import React from 'react';
import { TrendingUp, DollarSign, Award, Users, CheckCircle2, PieChart } from 'lucide-react';

export const LenderAnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Underwriting Analytics & Portfolio Yield
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Performance metrics covering deal claim conversions, acceptance velocity, and weighted average APR.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Debt Placed</span>
          <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">$4.25M</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">+18.4% QoQ Growth</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Weighted Avg. APR</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1 font-heading">7.65%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Fixed commercial debt</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Working Deal Win Rate</span>
          <div className="text-3xl font-extrabold text-purple-700 mt-1 font-heading">42.8%</div>
          <span className="text-[11px] text-purple-700 mt-1 block">Above peer median</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Avg. Time to Offer</span>
          <div className="text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">28 Hours</div>
          <span className="text-[11px] text-slate-500 mt-1 block">SLA: &lt; 48 hours</span>
        </div>
      </div>

      {/* Breakdown by Industry */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Portfolio Distribution by Loan Program</h3>
        <div className="space-y-3">
          {[
            { prog: 'Restaurant & Hospitality Debt', percent: 45, volume: '$1.91M', color: 'bg-blue-600' },
            { prog: 'Freight & Fleet Logistics', percent: 30, volume: '$1.28M', color: 'bg-emerald-600' },
            { prog: 'Healthcare & Dental Equipment', percent: 15, volume: '$640k', color: 'bg-purple-600' },
            { prog: 'Commercial Franchise Expansion', percent: 10, volume: '$420k', color: 'bg-amber-600' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{item.prog}</span>
                <span>{item.volume} ({item.percent}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
