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
    const title = genTitle.trim() || 'Representative Pipeline Statement';
    const newRep = {
      id: `r${reports.length + 1}`,
      title,
      date: new Date().toISOString().split('T')[0],
      size: '1.2 MB',
      type: 'PDF Summary'
    };
    setReports([newRep, ...reports]);
    handleDownloadReport(newRep);
    setShowGenerateModal(false);
  };

  const handleDownloadReport = (rep) => {
    if (!rep) return;
    const isCsv = rep.type && rep.type.toLowerCase().includes('csv');

    let content = '';
    let fileName = `${rep.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${isCsv ? 'csv' : 'txt'}`;
    let mimeType = isCsv ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8';

    if (isCsv) {
      content = `REPORT_ID,REP_NAME,CASELOAD_CLOSED,AVERAGE_CYCLE_DAYS,TOTAL_ORIGINATIONS,STATUS
${rep.id},Elena Rostova,18,4.2,$8450000,SETTLED
${rep.id}-02,Marcus Vance,14,5.1,$6200000,SETTLED
${rep.id}-03,Sarah Lin,22,3.8,$11300000,SETTLED
`;
    } else {
      content = `================================================================================
OAL NETWORK - REPRESENTATIVE PERFORMANCE REPORT: ${rep.title}
================================================================================
Generated Date   : ${rep.date}
Format           : ${rep.type}
Payload Size     : ${rep.size}
Supervising Lead : Elena Rostova (Senior Deal Desk Rep)
================================================================================
PERFORMANCE HIGHLIGHTS:
- Deal Intake to Credit Decision: Average 3.8 days (Beat 5.0 day target)
- Complete File Verification Ratio: 98.4%
- Zero KYC Compliance Deficiencies Reported
================================================================================
CONFIDENTIAL - OAL FINANCIAL NETWORK DEAL DESK
`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Report Downloaded', `Downloaded: ${rep.title}`, 'success');
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
              onClick={() => handleDownloadReport(rep)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
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

              <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 w-full sm:w-auto"
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

