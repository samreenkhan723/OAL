import React, { useState } from 'react';
import { Layers, ShieldCheck, Check, Edit, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminSubscriptionsPage = () => {
  const { addToast } = useApp();
  const [plans, setPlans] = useState([
    { id: 'tier-1', name: 'Standard Underwriter Tier', price: '$850 / month', deals: 'Up to 3 Active Working Deals', alerts: 'Standard AI alerts', status: 'ACTIVE', maxDeals: 3 },
    { id: 'tier-2', name: 'Enterprise Institutional Tier', price: '$1,950 / month', deals: 'Up to 10 Active Working Deals', alerts: 'Priority AI alerts + Rep hotline', status: 'ACTIVE', maxDeals: 10 },
    { id: 'tier-3', name: 'Syndicate Sovereign Tier', price: '$4,500 / month', deals: 'Unlimited Active Deals', alerts: 'First-look 24hr exclusivity review', status: 'ACTIVE', maxDeals: 99 },
  ]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [tierForm, setTierForm] = useState({ name: '', price: '', deals: '', alerts: '', maxDeals: 3 });

  const handleOpenConfig = (p) => {
    setSelectedPlan(p);
    setTierForm({ name: p.name, price: p.price, deals: p.deals, alerts: p.alerts, maxDeals: p.maxDeals });
  };

  const handleSaveTier = (e) => {
    e.preventDefault();
    setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...tierForm } : p));
    addToast('Subscription Tier Configured [SIMULATED]', `Updated policies and capacity limits for ${tierForm.name}.`, 'success');
    setSelectedPlan(null);
  };

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
        {plans.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
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

            <button
              onClick={() => handleOpenConfig(p)}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Configure Tier Limits</span>
            </button>
          </div>
        ))}
      </div>

      {/* Configure Tier Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Configure Institutional Tier Limits</h3>
              <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTier} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tier Name</label>
                <input
                  type="text"
                  value={tierForm.name}
                  onChange={(e) => setTierForm({ ...tierForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly License Fee</label>
                <input
                  type="text"
                  value={tierForm.price}
                  onChange={(e) => setTierForm({ ...tierForm, price: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Max Concurrent Working Deals</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={tierForm.maxDeals}
                  onChange={(e) => setTierForm({ ...tierForm, maxDeals: Number(e.target.value), deals: `Up to ${e.target.value} Active Working Deals` })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Alerts & Support Feature</label>
                <input
                  type="text"
                  value={tierForm.alerts}
                  onChange={(e) => setTierForm({ ...tierForm, alerts: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Save Tier Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

