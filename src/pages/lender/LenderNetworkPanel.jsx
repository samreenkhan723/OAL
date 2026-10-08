import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, Clock, ShieldCheck, Zap, Users, Briefcase, DollarSign, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LenderNetworkPanel = () => {
  const { networkActivity } = useApp();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filterTabs = [
    { id: 'ALL', label: 'All Activity' },
    { id: 'Marketplace', label: 'Live Marketplace' },
    { id: 'Working Deal', label: 'Working Deals' },
    { id: 'Offers', label: 'Offers' },
    { id: 'Funded', label: 'Funded' },
  ];

  const getBadgeRoute = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'marketplace':
        return '/lender/leads';
      case 'working deal':
        return '/lender/working-deals';
      case 'offers':
        return '/lender/offers';
      case 'funded':
        return '/lender/analytics';
      default:
        return '/lender/leads';
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'marketplace':
        return 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100';
      case 'working deal':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100';
      case 'offers':
        return 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100';
      case 'funded':
        return 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200';
    }
  };

  const getIconForBadge = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'marketplace':
        return <Zap className="w-4 h-4 text-blue-600" />;
      case 'working deal':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'offers':
        return <DollarSign className="w-4 h-4 text-amber-600" />;
      case 'funded':
        return <Award className="w-4 h-4 text-purple-600" />;
      default:
        return <Radio className="w-4 h-4 text-blue-600" />;
    }
  };

  const getIconBg = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'marketplace':
        return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
      case 'working deal':
        return 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200';
      case 'offers':
        return 'bg-amber-50 hover:bg-amber-100 border-amber-200';
      case 'funded':
        return 'bg-purple-50 hover:bg-purple-100 border-purple-200';
      default:
        return 'bg-slate-50 hover:bg-slate-100 border-slate-200';
    }
  };

  const filteredActivity = networkActivity.filter(act => {
    if (activeFilter === 'ALL') return true;
    return act.badge?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Network Activity Panel
            </h1>
            <Link
              to="/lender/leads"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors shadow-xs cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Marketplace</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time auditable stream of applicant entries, Investment IQ updates, and working-deal slot claims (FR-07).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Real-time Event Feed */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
          <h3 className="text-sm font-bold text-slate-900">
            Realtime Exchange Activity Feed ({filteredActivity.length})
          </h3>
          <span className="text-[11px] sm:text-xs text-slate-400">
            Privacy Filter: Active (Competing lender identities obscured)
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredActivity.map((act) => (
            <div key={act.id} className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-slate-50/50 transition-colors">
              {/* Working Round Button */}
              <Link
                to={getBadgeRoute(act.badge)}
                title={`Open ${act.badge}`}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-2xs ${getIconBg(act.badge)}`}
              >
                {getIconForBadge(act.badge)}
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="text-xs font-bold text-slate-900 break-words">{act.title}</span>
                    <Link
                      to={getBadgeRoute(act.badge)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors cursor-pointer ${getBadgeStyle(act.badge)}`}
                    >
                      {act.badge}
                    </Link>
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-400 shrink-0">{act.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
                  {act.description}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Link
                    to={getBadgeRoute(act.badge)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    <span>View {act.badge}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {filteredActivity.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No network broadcasts found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
