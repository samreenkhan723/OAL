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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAdForm, setNewAdForm] = useState({
    title: '',
    sponsor: '',
    placement: '',
    cpc: '$4.20',
    status: 'ACTIVE'
  });

  const handleOpenCreate = () => {
    const nextNum = ads.length + 1;
    setNewAdForm({
      title: `Commercial Equipment Financing Program #${nextNum}`,
      sponsor: 'Penske Commercial Fleet Capital',
      placement: 'Borrower Dashboard / Equipment Loan Category',
      cpc: '$4.20',
      status: 'ACTIVE'
    });
    setShowCreateModal(true);
  };

  const handleCreateAd = (e) => {
    e.preventDefault();
    if (!newAdForm.title.trim()) return;

    const newAd = {
      id: `ad-${Date.now()}`,
      title: newAdForm.title.trim(),
      sponsor: newAdForm.sponsor.trim() || 'Partner Sponsor',
      placement: newAdForm.placement.trim() || 'Borrower Dashboard / General Category',
      impressions: '0 views',
      status: newAdForm.status,
      cpc: newAdForm.cpc || '$3.50'
    };

    setAds([newAd, ...ads]);
    addToast('Sponsor Placement Added', `Created new partner campaign for "${newAd.sponsor}".`, 'success');
    setShowCreateModal(false);
  };

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

    addToast('Ad Campaign Updated', `Updated placement parameters for "${adForm.sponsor}".`, 'success');
    setEditingAd(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
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
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Sponsor Placement</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {ads.map((ad) => (
          <div key={ad.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 break-words">{ad.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ad.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {ad.status}
                </span>
              </div>
              <div className="text-xs text-blue-600 font-semibold mt-0.5">{ad.sponsor}</div>
              <div className="text-xs text-slate-400 mt-0.5">{ad.placement} • {ad.impressions} • Target CPC: {ad.cpc}</div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center w-full sm:w-auto">
              <button
                onClick={() => {
                  const updatedStatus = ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
                  setAds(ads.map(a => a.id === ad.id ? { ...a, status: updatedStatus } : a));
                  addToast('Status Toggled', `Campaign "${ad.title}" set to ${updatedStatus}.`, 'info');
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition-colors flex-1 sm:flex-none text-center cursor-pointer"
              >
                {ad.status === 'ACTIVE' ? 'Pause' : 'Activate'}
              </button>
              <button
                onClick={() => handleOpenEdit(ad)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex-1 sm:flex-none text-center cursor-pointer"
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Configure Sponsored Banner Placement</h3>
              <button onClick={() => setEditingAd(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
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

              <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 cursor-pointer text-center"
                >
                  Save Placement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Sponsor Placement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Sponsor Placement</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Headline</label>
                <input
                  type="text"
                  value={newAdForm.title}
                  onChange={(e) => setNewAdForm({ ...newAdForm, title: e.target.value })}
                  placeholder="e.g. Commercial Fleet & Equipment Leasing Showcase"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sponsor / Equipment Partner</label>
                <input
                  type="text"
                  value={newAdForm.sponsor}
                  onChange={(e) => setNewAdForm({ ...newAdForm, sponsor: e.target.value })}
                  placeholder="e.g. Penske Commercial Fleet Capital"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Placement Portal</label>
                <input
                  type="text"
                  value={newAdForm.placement}
                  onChange={(e) => setNewAdForm({ ...newAdForm, placement: e.target.value })}
                  placeholder="e.g. Borrower Dashboard / Equipment Category"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target CPC</label>
                  <input
                    type="text"
                    value={newAdForm.cpc}
                    onChange={(e) => setNewAdForm({ ...newAdForm, cpc: e.target.value })}
                    placeholder="$4.00"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campaign Status</label>
                  <select
                    value={newAdForm.status}
                    onChange={(e) => setNewAdForm({ ...newAdForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="ACTIVE">ACTIVE (Running)</option>
                    <option value="PAUSED">PAUSED (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 cursor-pointer text-center"
                >
                  Create Sponsor Placement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

