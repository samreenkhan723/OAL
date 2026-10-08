import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Mail, Phone, Edit, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminRepPage = () => {
  const { addToast } = useApp();
  const [reps, setReps] = useState([
    { id: 'usr_rep1', name: 'Elena Rostova', title: 'Senior Commercial Placement Specialist', email: 'elena.rostova@oalnetwork.com', phone: '+1 (555) 901-8321', activeBorrowers: 14, offersMediated: 28, status: 'ACTIVE', maxCapacity: 20 },
    { id: 'usr_rep2', name: 'Jonathan Pierce', title: 'Healthcare & Franchise Financing Agent', email: 'j.pierce@oalnetwork.com', phone: '+1 (555) 301-4412', activeBorrowers: 9, offersMediated: 15, status: 'ACTIVE', maxCapacity: 15 },
  ]);

  const [selectedRep, setSelectedRep] = useState(null);
  const [repForm, setRepForm] = useState({ maxCapacity: 20, status: 'ACTIVE' });

  const handleOpenRouting = (r) => {
    setSelectedRep(r);
    setRepForm({ maxCapacity: r.maxCapacity, status: r.status });
  };

  const handleSaveRouting = (e) => {
    e.preventDefault();
    setReps(reps.map(r => r.id === selectedRep.id ? { ...r, ...repForm } : r));
    addToast('Routing Rules Updated [SIMULATED]', `Updated caseload ceiling for ${selectedRep.name} to ${repForm.maxCapacity} files.`, 'success');
    setSelectedRep(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Representative Team Management
          </h1>
          <VerifyBadge note="Client confirmation pending for representative team administration menu and supervisor assignment rules" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Manage licensed OAL Representatives mediating communications between borrowers and lenders.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {reps.map((r) => (
          <div key={r.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{r.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {r.status}
                </span>
              </div>
              <div className="text-xs text-blue-600 font-semibold">{r.title}</div>
              <div className="text-xs text-slate-400">
                {r.email} • {r.phone}
              </div>
              <div className="text-xs text-slate-700 pt-1">
                Active Borrower Load: <strong>{r.activeBorrowers} / {r.maxCapacity} files</strong> • Offers Mediated: <strong>{r.offersMediated}</strong>
              </div>
            </div>

            <button
              onClick={() => handleOpenRouting(r)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors self-end sm:self-center"
            >
              Manage Routing
            </button>
          </div>
        ))}
      </div>

      {/* Manage Routing Modal */}
      {selectedRep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Manage Representative Lead Routing</h3>
              <button onClick={() => setSelectedRep(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRouting} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Representative</label>
                <input
                  type="text"
                  value={selectedRep.name}
                  disabled
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Maximum Concurrently Assigned Applications</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={repForm.maxCapacity}
                  onChange={(e) => setRepForm({ ...repForm, maxCapacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Queue Intake Status</label>
                <select
                  value={repForm.status}
                  onChange={(e) => setRepForm({ ...repForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="ACTIVE">ACTIVE (Accepting Leads)</option>
                  <option value="PAUSED">PAUSED (Queue Saturated)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRep(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Save Routing Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

