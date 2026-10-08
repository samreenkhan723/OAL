import React from 'react';
import { FileSpreadsheet, Download, Calendar, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LenderReportsPage = () => {
  const { addToast } = useApp();

  const reports = [
    { title: 'Q3 2026 Institutional Placement Ledger', date: '2026-10-01', type: 'CSV / Excel', size: '2.4 MB' },
    { title: 'Working Deal Claim Audit & Win Rate Analysis', date: '2026-10-05', type: 'PDF Summary', size: '1.1 MB' },
    { title: 'Monthly Origination Fees & Surcharge Statement', date: '2026-10-01', type: 'PDF Statement', size: '840 KB' },
    { title: 'Investment IQ Correlation with Default Risk Index', date: '2026-09-28', type: 'Research Whitepaper', size: '3.6 MB' },
  ];

  const handleDownload = (title) => {
    addToast('Report Exported', `Generated and downloaded: ${title}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Underwriting & Portfolio Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Export compliant audit logs, loan disbursement ledgers, and credit risk assessments.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {reports.map((rep, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{rep.title}</h3>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Published: {rep.date} • {rep.type} • {rep.size}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(rep.title)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 self-end sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
