import React from 'react';
import { ShieldCheck, UserCheck, Mail, Phone } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminRepPage = () => {
  const reps = [
    { id: 'usr_rep1', name: 'Elena Rostova', title: 'Senior Commercial Placement Specialist', email: 'elena.rostova@oalnetwork.com', phone: '+1 (555) 901-8321', activeBorrowers: 14, offersMediated: 28, status: 'ACTIVE' },
    { id: 'usr_rep2', name: 'Jonathan Pierce', title: 'Healthcare & Franchise Financing Agent', email: 'j.pierce@oalnetwork.com', phone: '+1 (555) 301-4412', activeBorrowers: 9, offersMediated: 15, status: 'ACTIVE' },
  ];

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
          <div key={r.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                Active Borrower Load: <strong>{r.activeBorrowers}</strong> • Offers Mediated: <strong>{r.offersMediated}</strong>
              </div>
            </div>

            <button className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors self-end sm:self-center">
              Manage Routing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
