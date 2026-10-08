import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

export const RepAlertsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Pipeline Alerts
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          High-priority notifications requiring immediate borrower outreach or underwriting mediation.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { title: 'New Underwriting Offer Submitted', app: 'APP-2026-1082 (Blue Harbor Seafood)', time: '10m ago', desc: 'Lender #9203 submitted an offer for $425,000 at 8.25% fixed. Schedule follow-up with borrower Marcus Vance.' },
          { title: 'Working Deal Claimed', app: 'APP-2026-1094 (Apex Heavy Freight)', time: '2h ago', desc: 'Apex Horizon Capital claimed slot 1 of 3. Underwriter requested 2 broker rate confirmations.' },
          { title: 'KYC Action Required', app: 'APP-2026-1120 (Urban Crumb Bakery)', time: '1d ago', desc: 'County operating permit was rejected for expiration. Contact borrower Chloe Bennett to request renewal document.' },
        ].map((alt, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D5B66A]" />
                <h3 className="text-xs font-bold text-slate-900">{alt.title}</h3>
                <span className="text-[10px] text-slate-400">• {alt.time}</span>
              </div>
              <div className="text-xs font-bold text-blue-600">{alt.app}</div>
              <p className="text-xs text-slate-500">{alt.desc}</p>
            </div>

            <Link
              to="/rep/messages"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all self-end md:self-auto"
            >
              Action Alert
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
