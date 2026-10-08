import React from 'react';
import { Briefcase, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminLendersPage = () => {
  const lenders = [
    { id: 'usr_l1', name: 'Apex Horizon Capital LLC', type: 'Direct Commercial Credit Fund', contact: 'underwriting@apexhorizoncap.com', activeWorkingDeals: 2, totalPlaced: '$3.8M', status: 'ACCREDITED' },
    { id: 'usr_l2', name: 'Hospitality Capital Partners', type: 'Specialized Restaurant Fund', contact: 'deals@hospitalitycap.com', activeWorkingDeals: 1, totalPlaced: '$2.1M', status: 'ACCREDITED' },
    { id: 'usr_l3', name: 'MedVest Healthcare Lending', type: 'Medical & Dental Credit Facility', contact: 'intake@medvestlending.com', activeWorkingDeals: 1, totalPlaced: '$1.4M', status: 'ACCREDITED' },
    { id: 'usr_l4', name: 'Horizon Healthcare Credit', type: 'Institutional Private Credit', contact: 'credit@horizonhealthcare.com', activeWorkingDeals: 0, totalPlaced: '$850k', status: 'ACCREDITED' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Institutional Lenders Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Accredited institutional capital partners, credit facilities, and active working deal allocations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{lenders.length} Participating Underwriter Seats</span>
          <span className="text-purple-700 font-bold">Rule FR-08 Cap Monitored</span>
        </div>

        <div className="divide-y divide-slate-100">
          {lenders.map((l) => (
            <div key={l.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{l.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {l.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600">{l.type} • {l.contact}</div>
                <div className="text-xs text-purple-700 font-semibold pt-1">
                  Active Working Deals: {l.activeWorkingDeals} • Total Placed: {l.totalPlaced}
                </div>
              </div>

              <button className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors self-end sm:self-center">
                Review Accreditation
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
