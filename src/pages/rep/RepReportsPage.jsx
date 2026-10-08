import React from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RepReportsPage = () => {
  const { addToast } = useApp();

  const reports = [
    { title: 'Monthly Placement Pipeline Summary', date: '2026-10-01', size: '1.8 MB' },
    { title: 'Borrower Verification & Turnaround Times', date: '2026-10-05', size: '920 KB' },
    { title: 'Commission Accrual Statement — Q3 2026', date: '2026-10-01', size: '640 KB' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Representative Performance Reports
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Export pipeline progression ledgers, turnaround audit logs, and commission reconciliations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {reports.map((rep, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{rep.title}</h3>
                <div className="text-[11px] text-slate-400 mt-0.5">Published: {rep.date} • PDF Export • {rep.size}</div>
              </div>
            </div>

            <button
              onClick={() => addToast('Report Downloaded', `Downloaded: ${rep.title}`, 'success')}
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
