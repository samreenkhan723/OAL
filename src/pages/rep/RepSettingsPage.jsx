import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Bell, ShieldCheck } from 'lucide-react';

export const RepSettingsPage = () => {
  const { currentUser, addToast } = useApp();
  const [form, setForm] = useState({
    name: currentUser?.name || 'Elena Rostova',
    email: currentUser?.email || 'elena.rostova@oalnetwork.com',
    phone: currentUser?.phone || '+1 (555) 901-8321',
    notifications: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Settings Saved', 'Representative profile details updated.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Account Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Placement agent credentials, contact details, and routing preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Brokerage Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 text-center"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};
