import React from 'react';
import { Megaphone, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminAdsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Platform Advertisements & Sponsored Banners
          </h1>
          <VerifyBadge note="Client confirmation pending for ad placement specs, pricing, and advertiser eligibility (PRD FR-15)" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Manage promotional banner placements and partner equipment finance sponsorships.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {[
          { title: 'Commercial Kitchen Equipment Financing Showcase', sponsor: 'Rational USA Partner Network', placement: 'Borrower Dashboard / Equipment Loan Category', impressions: '4,280 views', status: 'ACTIVE' },
          { title: 'Fleet Truck Telematics & ELD Hardware Bundle', sponsor: 'Omnitracs Logistics Gear', placement: 'Freight & Trucking Capital Portal', impressions: '2,940 views', status: 'ACTIVE' },
        ].map((ad, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{ad.title}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {ad.status}
                </span>
              </div>
              <div className="text-xs text-blue-600 font-semibold">{ad.sponsor}</div>
              <div className="text-xs text-slate-400 mt-0.5">{ad.placement} • {ad.impressions}</div>
            </div>

            <button className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors self-end sm:self-center">
              Edit Placement
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
