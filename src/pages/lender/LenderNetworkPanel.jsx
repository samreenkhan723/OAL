import React from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, Clock, ShieldCheck, Zap, Users, Briefcase, DollarSign, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LenderNetworkPanel = () => {
  const { networkActivity, applications } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Network Activity Panel
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Marketplace
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time auditable stream of applicant entries, Investment IQ updates, and working-deal slot claims (FR-07).
          </p>
        </div>
      </div>

      {/* Real-time Event Feed */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Realtime Exchange Activity Feed
          </h3>
          <span className="text-xs text-slate-400">
            Privacy Filter: Active (Competing lender identities obscured)
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {networkActivity.map((act) => (
            <div key={act.id} className="p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Radio className="w-5 h-5 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{act.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {act.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{act.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
