import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, User, Bell, Lock, CheckCircle2, RotateCcw } from 'lucide-react';

export const BorrowerSettingsPage = () => {
  const { currentUser, addToast, resetDemoData } = useApp();
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Marcus Vance',
    email: currentUser?.email || 'marcus@blueharborseafood.com',
    phone: currentUser?.phone || '+1 (555) 392-1084',
    company: currentUser?.company || 'Blue Harbor Seafood Bistro LLC',
    emailAlerts: true,
    smsAlerts: true,
    mfaEnabled: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Profile Updated', 'Your settings and communication preferences have been saved.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Profile & Account Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your verified commercial identity, notification channels, and security credentials.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Executive & Business Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Commercial Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Verified Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone (for MFA & Alerts)</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Security & MFA Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            Security & Multi-Factor Authentication
          </h3>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Multi-Factor Authentication (MFA)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  Active
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Protects financial balance statements and sensitive loan disclosures.
              </div>
            </div>

            <input
              type="checkbox"
              checked={profile.mfaEnabled}
              onChange={(e) => setProfile({ ...profile, mfaEnabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>
        </div>

        {/* Notifications Preference */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            Underwriting & Offer Notification Channels
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <span className="text-xs text-slate-700">Receive email alerts when a lender issues a formal offer</span>
              <input
                type="checkbox"
                checked={profile.emailAlerts}
                onChange={(e) => setProfile({ ...profile, emailAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <span className="text-xs text-slate-700">Receive SMS notifications for urgent representative questions</span>
              <input
                type="checkbox"
                checked={profile.smsAlerts}
                onChange={(e) => setProfile({ ...profile, smsAlerts: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={resetDemoData}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Prototype Store
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
