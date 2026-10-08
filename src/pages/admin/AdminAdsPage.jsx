import React, { useState } from 'react';
import { Megaphone, ExternalLink, Image as ImageIcon, Plus, X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminAdsPage = () => {
  const { addToast } = useApp();
  const [ads, setAds] = useState([
    { id: 'ad-1', title: 'Commercial Kitchen Equipment Financing Showcase', sponsor: 'Rational USA Partner Network', placement: 'Borrower Dashboard / Equipment Loan Category', impressions: '4,280 views', status: 'ACTIVE', cpc: '$4.50' },
    { id: 'ad-2', title: 'Fleet Truck Telematics & ELD Hardware Bundle', sponsor: 'Omnitracs Logistics Gear', placement: 'Freight & Trucking Capital Portal', impressions: '2,940 views', status: 'ACTIVE', cpc: '$3.80' },
    { id: 'ad-3', title: 'Dental CBCT 3D Scanner Lease Program', sponsor: 'Carestream Dental Capital', placement: 'Healthcare Practice Loans', impressions: '1,120 views', status: 'PAUSED', cpc: '$5.20' },
  ]);

  const [editingAd, setEditingAd] = useState(null);
  const [adForm, setAdForm] = useState({ title: '', sponsor: '', placement: '', status: 'ACTIVE' });

  const handleOpenEdit = (ad) => {
    setEditingAd(ad);
    setAdForm({ title: ad.title, sponsor: ad.sponsor, placement: ad.placement, status: ad.status });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!adForm.title.trim()) return;

    setAds(ads.map(a => a.id === editingAd.id ? {
      ...a,
      title: adForm.title,
      sponsor: adForm.sponsor,
      placement: adForm.placement,
      status: adForm.status
    } : a));

    addToast('Ad Campaign Updated [SIMULATED]', `Updated placement parameters for "${adForm.sponsor}".`, 'success');
    setEditingAd(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

        <button
          onClick={() => {
            const newId = `ad-${ads.length + 1}`;
            const newAd = { id: newId, title: 'New Franchise Advisory Sponsorship', sponsor: 'Franchise Times Network', placement: 'Franchise Financing Portal', impressions: '0 views', status: 'PAUSED', cpc: '$4.00' };
            setAds([...ads, newAd]);
            addToast('Ad Placement Added [SIMULATED]', 'Created new partner sponsored placement in paused state.', 'info');
          }}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Sponsor Placement</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {ads.map((ad) => (
          <div key={ad.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{ad.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ad.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {ad.status}
                </span>
              </div>
              <div className="text-xs text-blue-600 font-semibold mt-0.5">{ad.sponsor}</div>
              <div className="text-xs text-slate-400 mt-0.5">{ad.placement} • {ad.impressions} • Target CPC: {ad.cpc}</div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => {
                  const updatedStatus = ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
                  setAds(ads.map(a => a.id === ad.id ? { ...a, status: updatedStatus } : a));
                  addToast('Status Toggled [SIMULATED]', `Campaign "${ad.title}" set to ${updatedStatus}.`, 'info');
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition-colors"
              >
                {ad.status === 'ACTIVE' ? 'Pause' : 'Activate'}
              </button>
              <button
                onClick={() => handleOpenEdit(ad)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors"
              >
                Edit Placement
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Placement Modal */}
      {editingAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Configure Sponsored Banner Placement</h3>
              <button onClick={() => setEditingAd(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Headline</label>
                <input
                  type="text"
                  value={adForm.title}
                  onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sponsor / Equipment Partner</label>
                <input
                  type="text"
                  value={adForm.sponsor}
                  onChange={(e) => setAdForm({ ...adForm, sponsor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Placement Portal</label>
                <input
                  type="text"
                  value={adForm.placement}
                  onChange={(e) => setAdForm({ ...adForm, placement: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Status</label>
                <select
                  value={adForm.status}
                  onChange={(e) => setAdForm({ ...adForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="ACTIVE">ACTIVE (Running)</option>
                  <option value="PAUSED">PAUSED (Inactive)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Save Placement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

