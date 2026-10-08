import React, { useState } from 'react';
import { FileSpreadsheet, Download, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RepReportsPage = () => {
  const { addToast } = useApp();
  const [reports, setReports] = useState([
    { id: 'r1', title: 'Monthly Placement Pipeline Summary', date: '2026-10-01', size: '1.8 MB', type: 'PDF Export' },
    { id: 'r2', title: 'Borrower Verification & Turnaround Times', date: '2026-10-05', size: '920 KB', type: 'Excel Spreadsheet' },
    { id: 'r3', title: 'Commission Accrual Statement — Q3 2026', date: '2026-10-01', size: '640 KB', type: 'PDF Statement' },
  ]);

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genTitle, setGenTitle] = useState('Placement Agent Pipeline Reconciliation');

  const handleCreateReport = (e) => {
    e.preventDefault();
    const newRep = {
      id: `r${reports.length + 1}`,
      title: genTitle,
      date: new Date().toISOString().split('T')[0],
      size: '1.2 MB',
      type: 'PDF Summary'
    };
    setReports([newRep, ...reports]);
    addToast('Report Compiled [SIMULATED]', `Generated "${genTitle}".`, 'success');
    setShowGenerateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Representative Performance Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Export pipeline progression ledgers, turnaround audit logs, and commission reconciliations.
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Statement</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {reports.map((rep) => (
          <div key={rep.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{rep.title}</h3>
                <div className="text-[11px] text-slate-400 mt-0.5">Published: {rep.date} • {rep.type} • {rep.size}</div>
              </div>
            </div>

            <button
              onClick={() => addToast('Report Downloaded [SIMULATED]', `Downloaded: ${rep.title}`, 'success')}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 self-end sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Compile Representative Statement</h3>
              <button onClick={() => setShowGenerateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Statement Title</label>
                <input
                  type="text"
                  value={genTitle}
                  onChange={(e) => setGenTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Generate PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

