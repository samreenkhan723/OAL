import React from 'react';
import { TrendingUp, CheckCircle2, Clock, LifeBuoy, Users } from 'lucide-react';

export const SupportAnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Help Desk Support & Resolution Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Support metrics covering SLA response times, first-contact resolution rates, and CSAT scores.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase font-semibold">Average First Response</span>
          <div className="text-3xl font-extrabold text-[#0B1730] mt-1 font-heading">24 Mins</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Well within 1-hr SLA</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase font-semibold">Resolution Rate</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1 font-heading">94.8%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Commercial intake resolved</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase font-semibold">Customer CSAT</span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1 font-heading">4.9 / 5.0</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Based on 140 ratings</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <span className="text-xs text-slate-500 uppercase font-semibold">AI Suggestion Usage</span>
          <div className="text-3xl font-extrabold text-[#D5B66A] mt-1 font-heading">78.2%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Reviewed & dispatched</span>
        </div>
      </div>
    </div>
  );
};
