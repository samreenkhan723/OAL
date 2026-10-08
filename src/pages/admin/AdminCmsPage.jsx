import React from 'react';
import { BookOpen, Edit, FileText, Globe } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminCmsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Content Management System (CMS)
          </h1>
          <VerifyBadge note="Client confirmation pending for CMS publishing workflows and marketing content roles (PRD FR-15)" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Edit marketing copy, manage public loan program descriptions, and publish compliance updates.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {[
          { page: 'Homepage Hero & Statistics', path: '/', lastUpdated: '2026-10-06' },
          { page: 'Loan Programs Catalog (8 Categories)', path: '/loan-programs', lastUpdated: '2026-10-04' },
          { page: 'Investment IQ Methodology Explainer', path: '/investment-iq', lastUpdated: '2026-10-02' },
          { page: 'Help Desk & FAQ Knowledge Base', path: '/help', lastUpdated: '2026-10-05' },
        ].map((item, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-900 block">{item.page}</span>
              <span className="text-[11px] text-slate-400 font-mono">{item.path} • Updated {item.lastUpdated}</span>
            </div>
            <button className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-colors">
              Edit Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
