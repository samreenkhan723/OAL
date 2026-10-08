import React, { useState } from 'react';
import { FileSpreadsheet, Download, TrendingUp, Plus, X, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminReportsPage = () => {
  const { addToast } = useApp();
  const [reports, setReports] = useState([
    { id: 'ar1', title: 'Q3 2026 Master Volume & Origination Report', date: '2026-10-01', size: '4.8 MB', format: 'PDF Ledger' },
    { id: 'ar2', title: 'Equal Credit Opportunity Act (ECOA) Compliance Audit', date: '2026-09-30', size: '2.1 MB', format: 'PDF Ledger' },
    { id: 'ar3', title: 'Lender Working Deal Utilization & Drop-off Ledger', date: '2026-10-05', size: '1.4 MB', format: 'CSV Data' },
  ]);

  const [showCompileModal, setShowCompileModal] = useState(false);
  const [reportTitle, setReportTitle] = useState('Regulatory Compliance & Fair Lending Audit');

  const handleCompile = (e) => {
    e.preventDefault();
    const newRep = {
      id: `ar${reports.length + 1}`,
      title: reportTitle,
      date: new Date().toISOString().split('T')[0],
      size: '3.2 MB',
      format: 'PDF Audit Dossier'
    };
    setReports([newRep, ...reports]);
    addToast('Audit Report Compiled [SIMULATED]', `Generated executive dossier: ${reportTitle}`, 'success');
    setShowCompileModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Executive Platform Reports & Financials
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            System-wide volume, default analytics, underwriter conversion rates, and regulatory compliance reports.
          </p>
        </div>

        <button
          onClick={() => setShowCompileModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Compile Executive Audit</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {reports.map((rep) => (
          <div key={rep.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{rep.title}</h4>
                <div className="text-[11px] text-slate-400 mt-0.5">{rep.date} • {rep.format} • {rep.size}</div>
              </div>
            </div>

            <button
              onClick={() => addToast('Report Downloaded [SIMULATED]', `Exported: ${rep.title}`, 'success')}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 self-end sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>

      {/* Compile Modal */}
      {showCompileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Compile Executive Audit Report</h3>
              <button onClick={() => setShowCompileModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompile} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Dossier Subject</label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCompileModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Compile Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

