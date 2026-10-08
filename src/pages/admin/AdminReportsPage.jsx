import React from 'react';
import { FileSpreadsheet, Download, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminReportsPage = () => {
  const { addToast } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Executive Platform Reports & Financials
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          System-wide volume, default analytics, underwriter conversion rates, and regulatory compliance reports.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {[
          { title: 'Q3 2026 Master Volume & Origination Report', date: '2026-10-01', size: '4.8 MB' },
          { title: 'Equal Credit Opportunity Act (ECOA) Compliance Audit', date: '2026-09-30', size: '2.1 MB' },
          { title: 'Lender Working Deal Utilization & Drop-off Ledger', date: '2026-10-05', size: '1.4 MB' },
        ].map((rep, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{rep.title}</h4>
                <div className="text-[11px] text-slate-400 mt-0.5">{rep.date} • PDF Ledger • {rep.size}</div>
              </div>
            </div>

            <button
              onClick={() => addToast('Report Downloaded', `Exported: ${rep.title}`, 'success')}
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
