import React from 'react';
import { Layers, ShieldCheck, Check } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminSubscriptionsPage = () => {
  const plans = [
    { name: 'Standard Underwriter Tier', price: '$850 / month', deals: 'Up to 3 Active Working Deals', alerts: 'Standard AI alerts', status: 'ACTIVE' },
    { name: 'Enterprise Institutional Tier', price: '$1,950 / month', deals: 'Up to 10 Active Working Deals', alerts: 'Priority AI alerts + Rep hotline', status: 'ACTIVE' },
    { name: 'Syndicate Sovereign Tier', price: '$4,500 / month', deals: 'Unlimited Active Deals', alerts: 'First-look 24hr exclusivity review', status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Subscription Plans & Lender Tiers
          </h1>
          <VerifyBadge note="Client confirmation pending for subscription price elasticity, seat limits, and cancellation policies (PRD FR-15)" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Configure institutional access tiers and monthly working-deal capacity limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase">
                {p.status}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">{p.name}</h3>
              <div className="text-2xl font-extrabold text-[#0B1730] mt-1 font-heading">{p.price}</div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{p.deals}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{p.alerts}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors">
              Configure Tier Limits
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
