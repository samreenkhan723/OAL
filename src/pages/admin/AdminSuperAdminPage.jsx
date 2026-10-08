import React from 'react';
import { Lock, ShieldCheck, Check, X, AlertTriangle } from 'lucide-react';

export const AdminSuperAdminPage = () => {
  const matrix = [
    { action: 'Submit Own Loan Application', borrower: true, lender: false, rep: false, admin: 'Oversight' },
    { action: 'View Anonymized Marketplace Summary', borrower: false, lender: 'Qualified', rep: 'Assigned', admin: true },
    { action: 'View Full Private Borrower Docs', borrower: 'Own', lender: 'Claimed Only', rep: 'Assigned', admin: true },
    { action: 'Claim Working Deal Slot (Max 3)', borrower: false, lender: 'Yes (≤ 3)', rep: false, admin: 'Audit' },
    { action: 'Create / Edit Lender Offer Terms', borrower: false, lender: 'Own Offer', rep: 'FORBIDDEN (FR-10)', admin: 'Audit' },
    { action: 'Compare & Accept Offer', borrower: 'Yes (Own)', lender: false, rep: 'Read-Only', admin: 'Audit' },
    { action: 'Direct Borrower ↔ Lender Chat', borrower: 'FORBIDDEN', lender: 'FORBIDDEN', rep: 'Mediated Only (FR-09)', admin: 'Audit' },
    { action: 'Review KYC & Verify Documents', borrower: false, lender: false, rep: 'Review', admin: true },
    { action: 'Super Admin Security Controls', borrower: false, lender: false, rep: false, admin: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Super Admin Root Permissions Matrix
        </h1>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
          Root RBAC Policy
        </span>
      </div>

      <p className="text-xs text-slate-500">
        Enterprise role authorization boundaries defined by PRD Section 2 and Wireframe Section 13.
      </p>

      {/* Permissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-900">
          Enforced RBAC Invariant Matrix
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Platform Action / Resource</th>
                <th className="p-3.5">Borrower</th>
                <th className="p-3.5">Lender</th>
                <th className="p-3.5">OAL Representative</th>
                <th className="p-3.5">Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrix.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">{row.action}</td>
                  
                  <td className="p-3.5">
                    {row.borrower === true ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Allowed</span>
                    ) : row.borrower === false ? (
                      <span className="text-slate-400">Restricted</span>
                    ) : (
                      <span className={`font-semibold ${row.borrower === 'FORBIDDEN' ? 'text-rose-600 font-bold' : 'text-blue-700'}`}>{row.borrower}</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    {row.lender === true ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Allowed</span>
                    ) : row.lender === false ? (
                      <span className="text-slate-400">Restricted</span>
                    ) : (
                      <span className={`font-semibold ${row.lender === 'FORBIDDEN' ? 'text-rose-600 font-bold' : 'text-purple-700'}`}>{row.lender}</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    {row.rep === true ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Allowed</span>
                    ) : row.rep === false ? (
                      <span className="text-slate-400">Restricted</span>
                    ) : (
                      <span className={`font-semibold ${row.rep.includes('FORBIDDEN') ? 'text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded' : 'text-amber-700'}`}>{row.rep}</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {row.admin === true ? 'Full Root' : row.admin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
