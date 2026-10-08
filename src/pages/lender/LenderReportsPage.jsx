import React, { useState } from 'react';
import { FileSpreadsheet, Download, Calendar, ShieldCheck, Plus, X, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LenderReportsPage = () => {
  const { addToast } = useApp();
  const [reports, setReports] = useState([
    { id: 'rep-1', title: 'Q3 2026 Institutional Placement Ledger', date: '2026-10-01', type: 'CSV / Excel', size: '2.4 MB' },
    { id: 'rep-2', title: 'Working Deal Claim Audit & Win Rate Analysis', date: '2026-10-05', type: 'PDF Summary', size: '1.1 MB' },
    { id: 'rep-3', title: 'Monthly Origination Fees & Surcharge Statement', date: '2026-10-01', type: 'PDF Statement', size: '840 KB' },
    { id: 'rep-4', title: 'Investment IQ Correlation with Default Risk Index', date: '2026-09-28', type: 'Research Whitepaper', size: '3.6 MB' },
  ]);

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genForm, setGenForm] = useState({
    title: 'Custom Underwriting Portfolio Audit',
    format: 'CSV / Excel',
    dateRange: 'Past 30 Days'
  });

  const handleDownload = (rep) => {
    const isCsv = typeof rep === 'object' ? (rep.type && rep.type.toLowerCase().includes('csv')) : false;
    const title = typeof rep === 'object' ? rep.title : rep;
    
    let content = '';
    let fileName = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${isCsv ? 'csv' : 'txt'}`;
    let mimeType = isCsv ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8';

    if (isCsv) {
      content = `LOAN_ID,BORROWER_BUSINESS,REQUESTED_AMOUNT,IQ_SCORE,UNDERWRITING_DECISION,CAPITAL_TIER
APP-2026-1082,Blue Harbor Logistics,$450000,168,CLAIMED,SENIOR_SECURED
APP-2026-1085,Apex Precision Tooling,$280000,172,OFFER_SUBMITTED,EQUIPMENT_FINANCE
APP-2026-1094,Nova Core Tech Labs,$750000,154,CLAIMED,REVOLVING_CREDIT
`;
    } else {
      content = `================================================================================
OAL NETWORK - LENDER PORTFOLIO REPORT: ${title}
================================================================================
Generated Date   : ${new Date().toISOString().split('T')[0]}
Lender Partner   : Institutional Capital Partner
Audit Standard   : ECOA / Fair Lending Validated
Deal Slots       : 3 Simultaneous Working Deals Max Policy Enforced
================================================================================
PORTFOLIO SUMMARY:
- 100% Verified Commercial Borrower Financials
- Encrypted Electronic Document Vault Access
- Working Deal Collision Prevention Guaranteed
================================================================================
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

    addToast('Report Downloaded', `Downloaded: ${title}`, 'success');
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    const newRep = {
      id: `rep-${reports.length + 1}`,
      title: genForm.title.trim() || 'Custom Underwriting Portfolio Audit',
      date: new Date().toISOString().split('T')[0],
      type: genForm.format,
      size: '1.8 MB'
    };
    setReports([newRep, ...reports]);
    handleDownload(newRep);
    setShowGenerateModal(false);
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

        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Custom Report</span>
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
                <h3 className="text-xs font-bold text-slate-900">{rep.title}</h3>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Published: {rep.date} • {rep.type} • {rep.size}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(rep.title)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>

      {/* Generate Custom Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Compile Custom Ledger Report</h3>
              <button onClick={() => setShowGenerateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Report Heading</label>
                <input
                  type="text"
                  value={genForm.title}
                  onChange={(e) => setGenForm({ ...genForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Time Period</label>
                <select
                  value={genForm.dateRange}
                  onChange={(e) => setGenForm({ ...genForm, dateRange: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Past 7 Days">Past 7 Days</option>
                  <option value="Past 30 Days">Past 30 Days</option>
                  <option value="Current Quarter (Q3 2026)">Current Quarter (Q3 2026)</option>
                  <option value="Year to Date 2026">Year to Date 2026</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">File Format</label>
                <select
                  value={genForm.format}
                  onChange={(e) => setGenForm({ ...genForm, format: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="CSV / Excel">CSV / Excel Spreadsheet</option>
                  <option value="PDF Summary">PDF Summary Report</option>
                  <option value="JSON Raw Feed">JSON Audit Log Feed</option>
                </select>
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
                  Compile & Export
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

