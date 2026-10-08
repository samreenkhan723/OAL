import React, { useState } from 'react';
import { Briefcase, ShieldCheck, CheckCircle2, X, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLendersPage = () => {
  const { addToast } = useApp();
  const [lenders, setLenders] = useState([
    { id: 'usr_l1', name: 'Apex Horizon Capital LLC', type: 'Direct Commercial Credit Fund', contact: 'underwriting@apexhorizoncap.com', activeWorkingDeals: 2, totalPlaced: '$3.8M', status: 'ACCREDITED', secNumber: 'SEC-CR-90412', verifiedDate: '2026-08-15' },
    { id: 'usr_l2', name: 'Hospitality Capital Partners', type: 'Specialized Restaurant Fund', contact: 'deals@hospitalitycap.com', activeWorkingDeals: 1, totalPlaced: '$2.1M', status: 'ACCREDITED', secNumber: 'SEC-CR-88210', verifiedDate: '2026-07-22' },
    { id: 'usr_l3', name: 'MedVest Healthcare Lending', type: 'Medical & Dental Credit Facility', contact: 'intake@medvestlending.com', activeWorkingDeals: 1, totalPlaced: '$1.4M', status: 'ACCREDITED', secNumber: 'SEC-CR-79114', verifiedDate: '2026-09-01' },
    { id: 'usr_l4', name: 'Horizon Healthcare Credit', type: 'Institutional Private Credit', contact: 'credit@horizonhealthcare.com', activeWorkingDeals: 0, totalPlaced: '$850k', status: 'PENDING_AUDIT', secNumber: 'SEC-CR-99201', verifiedDate: '2026-10-02' },
  ]);

  const [selectedLender, setSelectedLender] = useState(null);

  const handleToggleAccreditation = (lenderId) => {
    setLenders(lenders.map(l => {
      if (l.id === lenderId) {
        const nextStatus = l.status === 'ACCREDITED' ? 'PROVISIONAL' : 'ACCREDITED';
        addToast('Accreditation Updated [SIMULATED]', `${l.name} status updated to ${nextStatus}.`, 'info');
        return { ...l, status: nextStatus };
      }
      return l;
    }));
    setSelectedLender(null);
  };

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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{l.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    l.status === 'ACCREDITED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {l.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600">{l.type} • {l.contact}</div>
                <div className="text-xs text-purple-700 font-semibold pt-1">
                  Active Working Deals: {l.activeWorkingDeals} • Total Placed: {l.totalPlaced}
                </div>
              </div>

              <button
                onClick={() => setSelectedLender(l)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors w-full sm:w-auto text-center"
              >
                Review Accreditation
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Review Accreditation Modal */}
      {selectedLender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Institutional Accreditation Audit</h3>
              </div>
              <button onClick={() => setSelectedLender(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-sm text-slate-900">{selectedLender.name}</h4>
              <p className="text-slate-500">{selectedLender.type}</p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Regulatory ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedLender.secNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Underwriting Contact:</span>
                  <span className="font-medium text-slate-800">{selectedLender.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Audit Date:</span>
                  <span className="font-medium text-slate-800">{selectedLender.verifiedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Accreditation State:</span>
                  <span className="font-bold text-emerald-700">{selectedLender.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedLender(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 text-xs w-full sm:w-auto"
              >
                Close Audit
              </button>
              <button
                type="button"
                onClick={() => handleToggleAccreditation(selectedLender.id)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors w-full sm:w-auto"
              >
                {selectedLender.status === 'ACCREDITED' ? 'Mark Provisional' : 'Confirm Accredited'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

