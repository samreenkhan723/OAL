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
      title: reportTitle.trim() || 'Executive Audit Report',
      date: new Date().toISOString().split('T')[0],
      size: '3.2 MB',
      format: 'PDF Audit Dossier'
    };
    setReports([newRep, ...reports]);
    handleDownloadReport(newRep);
    setShowCompileModal(false);
  };

  const handleDownloadReport = (rep) => {
    if (!rep) return;
    const isCsv = rep.format && rep.format.toLowerCase().includes('csv');
    
    let content = '';
    let mimeType = '';
    let fileName = '';

    if (isCsv) {
      content = `ID,REPORT_NAME,AUDIT_DATE,STATUS,ORIGINATION_VOLUME,ECOA_COMPLIANCE,WORKING_DEALS_CLAIMED
${rep.id},"${rep.title}",${rep.date},VERIFIED,$48200000,100%,142
AR-2026-01,Secured Revolver Baseline,2026-10-01,AUDITED,$12500000,100%,38
AR-2026-02,Asset Backed Term Facility,2026-10-02,AUDITED,$19800000,100%,54
AR-2026-03,Equipment Leasing Tranche,2026-10-03,AUDITED,$15900000,100%,50
`;
      mimeType = 'text/csv;charset=utf-8';
      fileName = `${rep.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`;
    } else {
      content = `================================================================================
OAL NETWORK PLATFORM REPORT & FINANCIAL AUDIT
================================================================================
Report ID       : ${rep.id}
Report Title    : ${rep.title}
Generated Date  : ${rep.date}
Format Standard : ${rep.format}
Payload Size    : ${rep.size}
Compliance Class: Board Level / Regulatory ECOA Audited
Encryption Std  : AES-256 GCM Storage Standard
================================================================================
EXECUTIVE SUMMARY & OPERATIONAL METRICS:
1. Total Origination Volume: $48,200,000 across verified lending partners.
2. Fair Lending & ECOA Compliance: 100% adherence to adverse action standards.
3. Working Deal Pipeline: 142 total institutional claims processed with zero collision.
4. Risk & Default Parameters: 1.2% platform default index (within target threshold).
================================================================================
CONFIDENTIAL - OAL FINANCIAL NETWORK REPOSITORY
`;
      mimeType = 'text/plain;charset=utf-8';
      fileName = `${rep.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
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

    addToast('Report Downloaded', `Downloaded ${rep.title}`, 'success');
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
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Compile Executive Audit</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {reports.map((rep) => (
          <div key={rep.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 break-words">{rep.title}</h4>
                <div className="text-[11px] text-slate-400 mt-0.5 break-words">{rep.date} • {rep.format} • {rep.size}</div>
              </div>
            </div>

            <button
              onClick={() => handleDownloadReport(rep)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto w-full sm:w-auto cursor-pointer"
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
              <button onClick={() => setShowCompileModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
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

              <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCompileModal(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 cursor-pointer text-center"
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

